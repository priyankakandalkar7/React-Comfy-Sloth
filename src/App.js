import React, { useEffect } from 'react'

import { Navbar, Sidebar, Footer } from './components'
import styled from 'styled-components'
import { BrowserRouter, Switch,Route } from 'react-router-dom'
import {Home,Products,SingleProduct,Error,About,Private,Cart,Register} from './pages'
import { useDispatch } from 'react-redux'
import { fetchProducts } from './Features/ProductsSlice'
import { products_url as url } from './utils/constants'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const dispatch=useDispatch();

  useEffect(()=>{
 dispatch(fetchProducts())
  },[])
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/product/:id">
            <SingleProduct />
          </Route>
          <Route exact path="/cart">
            <Private>
              <Cart />
            </Private>
          </Route>
          
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  );
}

export default App
