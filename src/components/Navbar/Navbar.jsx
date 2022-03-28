import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'

const Navbar = () => {
  return (
    <div>
        <AppBar position='fixed' className='classes.appBar'></AppBar>
    </div>
  )
}

export default Navbar