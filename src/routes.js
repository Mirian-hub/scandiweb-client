import React from 'react'
import {Switch, Route, Routes as RoutesGroup } from 'react-router-dom'
import ProductDesktop from './Comonents/ProductDesktop'

const Routes = () => (
  <RoutesGroup>
    <Route  path={"/"}  element={<ProductDesktop/>}>  </Route>  
    <Route  path={"/all"}  element={<ProductDesktop/>}>  </Route>  
    <Route  path={"/clothes"}  element={<ProductDesktop/>}>  </Route>  
    <Route  path={"/tech"}  element={<ProductDesktop/>}>  </Route>  
  </RoutesGroup>
)

export default Routes