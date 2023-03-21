import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { products_url as url } from "../utils/constants";


const initialState={
    isSidebarOpen:false,
    products:[],
    loading:true,
    product:{},
    product_loading:true,

}

export const fetchProducts=createAsyncThunk('/products',async()=>{
  const data=await fetch(url);
  const product=await data.json();
  return product
});


export const singleItem=createAsyncThunk('/singleProduct/id',async(singleUrl)=>{
 
  const data=await fetch(singleUrl);
  const response=await data.json();
  return response

})

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
   closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    
  },
  extraReducers:{
    [fetchProducts.pending]:(state)=>{
      state.loading=true
    },
    [fetchProducts.fulfilled]:(state,{payload})=>{
      state.products=payload;
      state.loading=false
      localStorage.setItem('productsList',JSON.stringify(state.products))
    },
    [fetchProducts.rejected]:(state)=>{
      state.loading=false
    },
    [singleItem.pending]:(state)=>{
state.product_loading=true;
    },
    [singleItem.fulfilled]:(state,{payload})=>{
      state.product=payload;
      state.product_loading=false
    },
    [singleItem.rejected]:(state)=>{
      state.product_loading=false;
    }
  }
});

export const {openSidebar,closeSidebar}=ProductsSlice.actions;
export default ProductsSlice.reducer