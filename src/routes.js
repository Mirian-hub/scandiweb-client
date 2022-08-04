import React from 'react'
import {Switch, Route, } from 'react-router-dom'
import ProductDesktop from './Comonents/ProductDesktop'

const Routes = () => (
  <Switch>
    <Route  exact path="/"> <ProductDesktop/> </Route>  
  </Switch>
)

export default Routes