import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './Features/ProductsSlice'
import filterReducer from './Features/FilterSlice'
import cartReducer from './Features/cartSlice'
import userReducer from './Features/UserSlice'

const store=configureStore({
    reducer:{
        products:productsReducer,
        filters:filterReducer,
        cart:cartReducer,
        user:userReducer
    }
})

export default store