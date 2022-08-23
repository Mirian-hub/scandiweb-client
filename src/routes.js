import React from 'react'
import {Switch, Route, Routes as RoutesGroup } from 'react-router-dom'
import Cart from './scenes/Cart'
import PDP from './scenes/PDP'
import ProductDesktop from './scenes/ProductsDesktop'

const Routes = () => (
  <RoutesGroup>
    <Route  path={"/"}  element={<ProductDesktop/>}>  </Route>  
    <Route  path={"/category"}  element={<ProductDesktop/>}>  </Route>  
    <Route  path={"/product/:id"}  element={<PDP/>}>  </Route>  
    <Route  path={"/cart"}  element={<Cart/>}>  </Route>  
  </RoutesGroup>
)

export default Routes