import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import GridView from './GridView'
import ListView from './ListView'
import {Loading} from '../components'
import { changeSort, loadProducts } from '../Features/FilterSlice'
import { loadCartProducts } from '../Features/cartSlice'




const ProductList = () => {
  const {loading,products}=useSelector((store)=>store.products);
  const {gridView,sort,filteredProducts,filters}=useSelector((store)=>store.filters);
  
  const dispatch=useDispatch()

  useEffect(()=>{
    if(loading) return
    dispatch(loadProducts())
    dispatch(changeSort())
    dispatch(loadCartProducts())
    
  },[loading,sort])

 
  if(loading){
    return <Loading/>
  }
  if(filteredProducts.length==0){
    return <div>
      <h2>no products available</h2>
    </div>
  }
  
  return <>{gridView ? <GridView products={filteredProducts} />:<ListView products={filteredProducts}/>}</>;
}

export default ProductList
