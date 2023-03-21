import { createSlice } from "@reduxjs/toolkit";



const initialState={
    gridView:true,
    filters:{
    searchValue:'',
    category:'all',
    company:'all',
    colors:'all',
    min_price:0,
    max_price:0,
    price:0,
    shipping:false,
    },
    sort:'price-lowest',
    filteredProducts:[],
    products:[]
    

}

const FilterSlice=createSlice({
    name:'filters',
    initialState,
    reducers:{
    loadProducts:(state)=>{
      const products=JSON.parse(localStorage.getItem('productsList'))
      state.filteredProducts=products
      let max_price=products.map((item)=>item.price);
      max_price=Math.max(...max_price);
      state.filters.price=max_price;
      state.filters.max_price=max_price
      state.products=products
      
    },
     
      openGridView:(state)=>{
        state.gridView=true
      },
      openListView:(state)=>{
         state.gridView=false
      },
      selectSort:(state,{payload})=>{
        const {name,value}=payload;
        state.sort=value
      },
      changeSort:(state)=>{
        const val=state.sort
        const products = state.filteredProducts
        let tempProducts=[...products]
        if(val==='price-lowest'){
          tempProducts=tempProducts.sort((a,b)=>a.price-b.price)
        }
         if (val === "price-highest") {
           tempProducts = tempProducts.sort((a, b) => b.price - a.price);
         }
          if (val === "name-a") {
            tempProducts = tempProducts.sort((a, b) => {
              return a.name.localeCompare(b.name)
            });
          }
           if (val === "name-z") {
             tempProducts = tempProducts.sort((a, b) => {
               return b.name.localeCompare(a.name);
             });
           }
        
        state.filteredProducts=tempProducts
       
      },
      selectFilters:(state,{payload})=>{
        const {name,value}=payload
        const products=state.filteredProducts;
        let tempProducts=[...products]
        if(name==='searchValue'){
          state.filters.searchValue=value;
          state.filteredProducts=state.products
          tempProducts=state.filteredProducts.filter((item)=>item.name.includes(value))
          

          
        }
        if (name === "category") {
          state.filters.category = value;
          state.filteredProducts=state.products
         if(value==='all'){
          tempProducts=state.products
         }
         else{
          tempProducts=state.filteredProducts.filter((item)=>item.category===value);
         }
        }
        if (name === "company") {
          state.filters.company = value;
          state.filteredProducts=state.products;
          if(value==='all'){
            tempProducts=state.products
          }
          else{
            tempProducts=state.filteredProducts.filter((item)=>item.company==value)
          }
        }
        if (name === "colors") {
          state.filters.colors=value;
          state.filteredProducts=state.products
          
          if(value==='all'){
            tempProducts=state.products
          }
          else{
            tempProducts=state.filteredProducts.filter((item)=>item.colors.includes(value))
          }

        }
        
        if (name === "price") {
          state.filters.price = value;
          state.filteredProducts=state.products
          tempProducts=state.filteredProducts.filter((item)=>item.price<=value)
        }
        if(name==='shipping'){
          state.filters.shipping = value;
          if(value===true){
            tempProducts=state.filteredProducts.filter((item)=>item.shipping===true)
          }
         if(value===false){
          tempProducts=state.products
         }
          
        }
        state.filteredProducts=tempProducts
      },
      clearFilters:(state)=>{
        state.filteredProducts=state.products
      }

      

      
    }
})

export const {openGridView,openListView,selectSort,loadProducts,changeSort,selectFilters,clearFilters}=FilterSlice.actions


export default FilterSlice.reducer