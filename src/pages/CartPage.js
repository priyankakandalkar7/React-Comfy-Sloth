import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'
import { useSelector } from 'react-redux'

const CartPage = () => {
  const {cart}=useSelector((store)=>store.cart)
  
  if(cart.length<1){
    return <Wrapper className='page-100'>
 <div className='empty'>
  <h2>Your cart is empty</h2>
  <Link to='./products' className='btn'>Buy some products</Link>
 </div>
    </Wrapper>
  }
  return <main>
    <PageHero obj={{title:'cart',bool:false}}/>
    <Wrapper className='page'>
      <CartContent/>
    </Wrapper>
  </main>
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage
