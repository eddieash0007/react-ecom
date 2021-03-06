import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import {Products, Navbar, Cart, Checkout} from './components'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const fetchProducts = async () => {
    const {data} = await commerce.products.list()

    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity)
    setCart(response.cart)
  }

  const handleRemove = async (productId) => {
    const response = await commerce.cart.remove(productId)
    setCart(response.cart)
  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty()
    setCart(response.cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenID, newOrder) => {
    try{
      const incommingOrder = await commerce.checkout.capture(checkoutTokenID, newOrder);
      setOrder(incommingOrder)
      refreshCart()
    }catch (error){
      setErrorMessage(error.data.error.message)
      console.log(error.data.error.message)
    }
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, {quantity})
    setCart(response.cart)
  }

  useEffect(() => {
    fetchProducts();
    fetchCart()
  }, [])


  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}/>
        <Routes>
          <Route path="/" caseSensitive={false} element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
          <Route path="/cart" caseSensitive={false} element={ 
          <Cart 
            cart={cart}
            handleRemove = {handleRemove}
            handleUpdateCartQty = {handleUpdateCartQty}
            handleEmptyCart = {handleEmptyCart}
          />
          }/>
          <Route path="/checkout" caseSensitive={false} element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>}/>
        </Routes>
        
      </div>
    </Router>
    
  )
}

export default App