import React from 'react'
import styled from 'styled-components'

import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilters,clearFilters } from '../Features/FilterSlice'

const Filters = () => {
  const {loading,products}=useSelector((store)=>store.products);
  const dispatch=useDispatch()
  const {filters:{searchValue,category,
    company,
    colors,
    min_price,
    max_price,
    price,
    freeShipping}}=useSelector((store)=>store.filters)
   const handleSubmit=(e)=>{
    e.preventDefault()


   }
   const changeFilters=(name,value)=>{
    const obj={name,value}
     dispatch(selectFilters(obj))

   }
   const getUniqueValues=(products,field)=>{
    let uniqueValues;
    if(field==='colors'){
      uniqueValues=['all',...new Set(products.map((item)=>item[field]))].flat(3)
      uniqueValues=new Set(uniqueValues)
      uniqueValues=Array.from(uniqueValues)
    }
    else{
     uniqueValues=['all',...new Set(products.map((item)=>item[field]))]
    }

    return uniqueValues
     
   }
   const categories=getUniqueValues(products,'category')
   const companies = getUniqueValues(products, "company");
   const colorsValues = getUniqueValues(products, "colors");
    
console.log(colorsValues)
   
  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              className="search-input"
              name="searchValue"
              placeholder="search"
              onChange={(e) => changeFilters(e.target.name, e.target.value)}
            />
          </div>
          <div className="form-control">
            <h5>Categories</h5>
            {categories.map((item) => {
              return (
                <button
                  className={item === category ? "active" : null}
                  key={item}
                  onClick={(e) =>
                    dispatch(changeFilters("category", e.target.textContent))
                  }
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div className="form-control">
            <h5>Companies</h5>
            <select
              className="company"
              name="company"
              value={company}
              onChange={(e) => changeFilters("company", e.target.value)}
            >
              {companies.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
          <div className="form-control">
            <h5>Price Range</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              min={min_price}
              max={max_price}
              onChange={(e) => changeFilters(e.target.name, e.target.value)}
              name="price"
              value={price}
            ></input>
          </div>
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {colorsValues.map((item) => {
                console.log(item);
                if (item === "all") {
                  return (
                    <button
                      key={item}
                      className={`all-btn ${item === colors && "active"}`}
                      data-id={item}
                      style={{ background: `${item}` }}
                      onClick={(e) =>
                        changeFilters("colors", e.target.dataset.id)
                      }
                    >
                      {item}
                    </button>
                  );
                }

                return (
                  <button
                    key={item}
                    className={`color-btn ${item == colors && "active"}`}
                    data-id={item}
                    style={{ background: `${item}` }}
                    onClick={(e) =>
                      changeFilters("colors", e.target.dataset.id)
                    }
                  >
                    {item === colors && <FaCheck />}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="form-control shipping">
            <label htmlFor="shipping">Free shipping</label>
            <input type="checkbox" name="shipping" id="shipping" onChange={(e)=>changeFilters(e.target.name,e.target.checked)}></input>
          </div>
        </form>
        <button type='button' className='clear-btn' onClick={()=>dispatch(clearFilters())} >clear</button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
