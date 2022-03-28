import React from "react";
import {Grid} from "@material-ui/core"

import Product from "./Product/Product";
const products = [
    {id:1, name:'Shoes', description:'Running shoes', price: '$5', image: 'https://media.self.com/photos/5ea9d5ffbb9c6b75996c7ef7/master/pass/running_shoes_woman.jpg', },
    {id:2, name:'Macbook', description: 'Apple macbook', price: '$10', image: 'https://images.idgesg.net/images/idge/imported/imageapi/2021/10/18/20/14-16-inch-macbook-pro-2021-100907465-large.jpg?auto=webp&quality=85,70'}
]

const Products = () => {

    return(
            <main>
                <Grid container justify="center" spacing={4}>
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} md={4} lg={3}>
                            <Product product={product}/>
                        </Grid>
                    ))}
                </Grid>
            </main>
    )
    
}

export default Products;

