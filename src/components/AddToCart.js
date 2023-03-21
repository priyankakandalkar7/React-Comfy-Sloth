import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

import AmountButtons from './AmountButtons'
import { addToCart } from '../Features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'


const AddToCart = ({product}) => {
  const {id,stock,colors}=product;
  const dispatch=useDispatch()
  const [mainColor,setColor]=useState(0);
  const [amount,setAmount]=useState(1);
  const {user}=useSelector((store)=>store.user)
  const history=useHistory()

  const addingOnCart=()=>{
    if(!user){
      history.push('/register')
    }
    else{
      dispatch(addToCart({ id, amount }));
    }

  }

  const increase=()=>{
    if(amount>=stock){
     setAmount(stock)
    }
    else{
      setAmount((old)=>{
        return old+1
      })
    }
  }
  const decrease = () => {
    if (amount <= 1) {
      setAmount(1);
    } else {
      setAmount((old) => {
        return old - 1;
      });
    }
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>Colors:</span>
        <div>
          {colors.map((item, index) => {
            return (
              <div
                className={`${
                  index === mainColor ? "color-btn active" : "color-btn"
                }`}
                style={{ background: item }}
                onClick={() => setColor(index)}
              >
                {index === mainColor && <FaCheck />}
              </div>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons amount={amount} increase={increase} decrease={decrease}  />
        <Link to="/cart" className="btn" onClick={addingOnCart}>
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
