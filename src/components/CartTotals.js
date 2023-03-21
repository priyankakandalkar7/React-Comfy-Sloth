import React, { useEffect } from 'react'
import styled from 'styled-components'

import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTotal } from '../Features/cartSlice'

const CartTotals = () => {
   const dispatch=useDispatch();
   const {cart,total,shippingFee}=useSelector((store)=>store.cart)
   

   useEffect(()=>{
    dispatch(getTotal())
   },[cart])
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            Subtotal : <span>{formatPrice(total)}</span>
          </h5>
          <p>
            shippingFee : <span>{formatPrice(shippingFee)}</span>
          </p>
          <hr/>
          <h4>order Total : <span>{formatPrice(total+shippingFee)}</span></h4>
        </article>
        
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`

export default CartTotals
