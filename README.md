
### Comfy Sloth Ecommerce React Application

#### This react application is utilizing essential react features and some useful libraries like React Hooks,React Router DOM,Redux Toolkit,Toastify,ThunkApi(middleware), for Styling it is using Styled components


## Tech Stack

**Client:** React,ReduxToolkit,Javascript,Styled Components

**Server:** Open Source API's


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference



```http 
- To fetch List of all products
  GET https://course-api.com/react-store-products
```



```http 
- To fetch the single product details
  GET https://course-api.com/react-store-single-product?id=${id}

```
```http 
- To register user to the comfy sloth ecommerce website

Post Method
https://jobify-prod.herokuapp.com/api/v1/toolkit/auth/register

value-{name:'user',email:'user@gmail.com',password:'password'}

sends back the user object with token
```

```http 
- To login user to the comfy sloth ecommerce website
Post Method
https://jobify-prod.herokuapp.com/api/v1/toolkit/auth/login

value-{email:'user@gmail.com',password:'password'}

sends back the user object with token
```









## Features

- Filters and Sorting
- Authentication
- Device compatible



## Toastify - Library to display pop-up messages

- To install 

```bash
npm install toastify

```


```js
In App.js

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

  <ToastContainer position="top-center" />
      </BrowserRouter>

```

## Index.js

```js
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



import { Provider } from 'react-redux';
import store from './store'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
## App.js

```js
import Home from './HomePage'
import About from './AboutPage'
import  Error  from './ErrorPage'
import Products from './ProductsPage'
import SingleProduct from './SingleProductPage'
import Cart from './CartPage'

import Private from './PrivateRoute'
import Register from './RegisterPage'

export {
    Home,
    About,
    Error,
    Products,
    SingleProduct,
    Cart,
    
    Private,
    Register,


}

```
## Navbar.js


```js
import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import CartButtons from './CartButtons'

import { useDispatch } from 'react-redux'
import { openSidebar} from '../Features/ProductsSlice'

const Nav = () => {
  const dispatch=useDispatch();
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" >
            <img src={logo} />
          </Link>
          <button
            className="nav-toggle"
            onClick={() => dispatch(openSidebar())}
          >
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((item) => {
            const { id, text, url } = item;
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
        </ul>
        <div className="cart-btn-wrapper">
          <CartButtons />
        </div>
      </div>
    </NavContainer>
  );
}

```


### CartButtons.js

```js
import React from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'



import { useDispatch, useSelector } from 'react-redux'
import { closeSidebar } from '../Features/ProductsSlice'
import { logOut } from '../Features/UserSlice'

const CartButtons = () => {
  const dispatch=useDispatch();
  const {user}=useSelector((store)=>store.user)
  const {cart}=useSelector((store)=>store.cart);

  const handleLoginButton=()=>{
    if(!user){
      dispatch(closeSidebar())
    }
    else{
      dispatch(logOut())
      dispatch(closeSidebar())
    }

  }
  return (
    <Wrapper className="cart-btn-wrapper">
      {user && <Link
        to="/cart"
        className="cart-btn"
        onClick={() => dispatch(closeSidebar())}
      >
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{cart.length}</span>
        </span>
      </Link>
      }
      <Link
        to="/register"
        className="auth-btn"
        onClick={handleLoginButton}
      >
        {user?'Logout':'Login'} {user?<FaUserMinus/>:<FaUserPlus/>}
      </Link>
    </Wrapper>
  );
}

```
## Sidebar.js


```js
import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

import { FaTimes } from 'react-icons/fa'
import { links } from '../utils/constants'
import styled from 'styled-components'
import CartButtons from './CartButtons'

import { useDispatch, useSelector } from 'react-redux'
import { closeSidebar } from '../Features/ProductsSlice'

const Sidebar = () => {
  const {isSidebarOpen}=useSelector((store)=>store.products);
  const dispatch=useDispatch()
  return <SidebarContainer>
    <aside className={ isSidebarOpen ? 'sidebar show-sidebar' :'sidebar'} >
    <div className='sidebar-header'>
      <img src={logo}/>
      <button className='close-btn' onClick={()=>dispatch(closeSidebar())}><FaTimes/></button>
    </div>
    <ul className='links'>
      {links.map((item)=>{
        const {id,text,url}=item;
        return <li onClick={()=>dispatch(closeSidebar())} key={id}><Link to={url}>{text}</Link></li>
      })}
    </ul>
    <div className='cart-btn-wrapper'>
      <CartButtons/>
    </div>

    </aside>
  </SidebarContainer>
}

```

### CartButtons.js-Refer Navbar.js section
## Pages


1.HomePage

```js
import React from 'react'
import { FeaturedProducts, Hero, Services, Contact } from '../components'
const HomePage = () => {
  return <>
  <Hero/>
  <FeaturedProducts/>
  <Services/>
  <Contact/>

  </>
}

export default HomePage
```

2.About Page

```js
import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      <PageHero obj={{title:'About',bool:false}} />
      <Wrapper className="page section section-center">
        <img src={aboutImg} />
        <article>
          <div className="title">
            <h2>Our story</h2>
            <div className="underline"></div>
            <p>
              I have never known a Jack that was in good enough shape to name
              bodybuilding after himIf you work for an ad agency and getting
              paid for it aren't you the one who is being influenced by
              advertising?I started a sensory deprivation chamber business - it
              involves really dark curtains, ear plugs, and a sleeping mask
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  );
}
export default AboutPage
```

3.Error Page

```js
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return <Wrapper className='page-100'>
    <section>
      <h1>404 </h1>
      <h3>Sorry the page you tried cannot be found</h3>
      <Link to='/' className='btn'>back home</Link>
    </section>
  </Wrapper>
}

export default ErrorPage

```

4.Products Page

```js
import React from 'react'
import styled from 'styled-components'
import { Filters, ProductList, Sort, PageHero } from '../components'

const ProductsPage = () => {
  return <main>
    <PageHero obj={{title:"Products",bool:false}}/>
    <Wrapper className='page'>
      <div className='section-center products'>
        <Filters/>
        <div>
          <Sort/>
          <ProductList/>
        </div>
      </div>
    </Wrapper>
  </main>
}

export default ProductsPage

```

5.Single Product Page

```js

import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { singleItem } from "../Features/ProductsSlice";

const SingleProductPage = () => {
  const { id } = useParams();
  const { product, product_loading } = useSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleItem(`${url}${id}`));
  }, []);

  if (product_loading) {
    return <Loading />;
  }
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product;

  return (
    <Wrapper>
      <PageHero obj={{ title: name, bool: true }} />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available:</span>
              {stock > 0 ? "In stock" : "out of stock"}
              <span>Brand:</span>
              {company}
            </p>
            <hr />
            {stock && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleProductPage
```

6.Cart Page

```js
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

export default CartPage

```

7.Register User Page

```js
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect,useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components'
import logo from "../assets/logo.svg";
import FormRow from '../components/FormRow';
import { loginUser, registerUser } from '../Features/UserSlice';


const initialState={
    name:'',
    email:'',
    password:'',
    isMember:'',
}

const RegisterPage = () => {
    const [values,setValues]=useState(initialState)
    const {isLoading,user}=useSelector((store)=>store.user)
    const dispatch=useDispatch();
    let history=useHistory()
    
    const handleChange=(e)=>{
       const {name,value}=e.target;
      
       setValues({...values,[name]:value})

    }

   useEffect(()=>{
    if(user){
      setTimeout(()=>{
          history.push('/')
      },3000)
  
    }
   },[user,isLoading])
    const handleSubmit=(e)=>{
        e.preventDefault();
       const {name,email,password,isMember}=values;

       if(!email || !password || (!isMember && !name)){
        toast.warning('Please fill out all fields')
        return;
       }
       if(isMember){
        dispatch(loginUser({email,password}))
       return;

       }
       
       dispatch(registerUser({name,email,password}))
       
      

    }
    const toggleMember=()=>{
      setValues({...values,isMember:!values.isMember})
    }
    
  return (
    <Wrapper className="page-2">
      <form className="form-main" onSubmit={handleSubmit}>
        <img className="logo" src={logo} />
        <h3>{values.isMember?'Login':'Register'}</h3>
        {!values.isMember && <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
         {isLoading?'Please Wait..':'Submit'}
        </button>
        <p>
          {values.isMember?'Not a Member?':'Already a Member?'}
          <button className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

```

8.Private Route -To prevent user access to Cart Page without authentication

```js
import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

// will remove later


const PrivateRoute = ({children}) => {
  const {user}=useSelector((store)=>store.user)
  if(!user){
    return <Redirect to='/register'/>

  }
  return children
};
export default PrivateRoute;
```
9.index.js - This is used to make imports of above Pages
easier in other components

```js

import Home from './HomePage'
import About from './AboutPage'
import  Error  from './ErrorPage'
import Products from './ProductsPage'
import SingleProduct from './SingleProductPage'
import Cart from './CartPage'

import Private from './PrivateRoute'
import Register from './RegisterPage'

export {
    Home,
    About,
    Error,
    Products,
    SingleProduct,
    Cart,
    
    Private,
    Register,


}

```





## Store.js

- First install redux toolkit library using below command

```bash
npm install @reduxjs/toolkit
```
- Store.js File - Store.js allows users to access all the states available in react application
```js
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

```

## ProductSlice.js

```js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    isSidebarOpen:false,
    products:[],
    loading:true,
    product:{},
    product_loading:true,

}
const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers:{

  },
  extraReducers:{
      
  }

})

export default ProductsSlice.reducer
```

- Fetch All Products

```js

export const fetchProducts=createAsyncThunk('/products',async()=>{
  const data=await fetch(url);
  const product=await data.json();
  return product
});

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
}

```
- Fetch single Products
```js
export const singleItem=createAsyncThunk('/singleProduct/id',async(singleUrl)=>{
 
  const data=await fetch(singleUrl);
  const response=await data.json();
  return response

  extraReducers:{
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

})
```

- Reducers

```js
reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
   closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    
  },
  export const {openSidebar,closeSidebar}=ProductsSlice.actions;

  ```
## FilterSlice.js

```js
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
        
    }

})
export default FilterSlice.reducer

```

- Reducers-

```js
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
```

## CartSlice.js

```js
import { createSlice } from "@reduxjs/toolkit"




const identifier=JSON.parse(localStorage.getItem('cart'))

const initialState={
    cart: identifier ? identifier : [],
    total:0,
    cartProducts:[],
    shippingFee:400,
}



const CartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{

    }

})
export default CartSlice.reducer

```

- Reducers-
```js
reducers:{
      addToCart:(state,{payload})=>{
        const {id,amount}=payload
        const ids=state.cart.find((item)=>item.id===id)
        const product=state.cartProducts.find((item)=>item.id===id)
        
        if(!ids){
            state.cart=[...state.cart,{...product,quantity:amount}]
        }
        else{
            state.cart=state.cart.map((item)=>{
                const {quantity}=item
                if(item.id===payload){
                    return {...item,quantity:quantity+1}
                }
                else{
                    return item
                }
            })
        }
        localStorage.setItem('cart',JSON.stringify(state.cart))
       
        
      },
      loadCartProducts:(state)=>{
        const products = JSON.parse(localStorage.getItem("productsList"));
       
        state.cartProducts = products;
      },
      clearCart:(state)=>{
        state.cart=[]
      },
      getTotal:(state)=>{
        const totalAmount=state.cart.reduce((acc,item)=>{
            acc+=item.price * item.quantity
            return acc
        },0)
        state.total=totalAmount
      },
      removeCartItem:(state,{payload})=>{
        state.cart=state.cart.filter((item)=>item.id!==payload)

      },
      updateCartAmount:(state,{payload})=>{
        const {id,value}=payload
        state.cart=state.cart.map((item)=>{
          if(item.id===id && value==='inc'){
            return {...item,quantity:item.quantity+1}
          }
          else if(item.id===id && value==='dec'){
            const newAmount=item.quantity-1
            if(newAmount<1){
              newAmount=1
            }
           return {...item,quantity:newAmount}
            
          }
          else{
            return item
          }
        })
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    } 
    export const {addToCart,loadCartProducts,clearCart,getTotal,removeCartItem,updateCartAmount}=CartSlice.actions
```

## UserSlice.js

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    user:identifier?identifier:null
}

const UserSlice = createSlice({
  name: "user",
  initialState,
  extraReducers:{

  },
  reducers:{

  }
})
export default UserSlice.reducer


```

- RegisterUser

```js
export const registerUser=createAsyncThunk('user/registerUser',async (user,thunkAPI)=>{
     try {
      const resp=await customFetch.post('/auth/register',user)
      return resp.data
      
     } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
     }
})

extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      toast.success(`Hello ${user.name}`);
      localStorage.setItem('user',JSON.stringify(user))
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
}

```

- Login User

```js
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
   
   try {
     const resp = await customFetch.post("/auth/login", user);
     return resp.data;
   } catch (error) {
     return thunkAPI.rejectWithValue(error.response.data.msg);
   }
    
  }
);



extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      toast.success(`Welcome ${user.name}`);
      localStorage.setItem("user", JSON.stringify(user));
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

  },

```

- Reducers-

```js
reducers:{
    logOut:(state)=>{
      state.user=null;
      localStorage.removeItem('user')
      localStorage.removeItem('cart')
    }
  }
});

export const {logOut}=UserSlice.actions

```


## homePageComponents

### 1)Hero.js

```js
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import heroBcg from '../assets/hero-bcg.jpeg'
import heroBcg2 from '../assets/hero-bcg-2.jpeg'


const Hero = () => {
 
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h1>
          Design your <br />
          comfort zone
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit.
        </p>
        <Link to="/products" className="btn hero-btn">
          shop now
        </Link>
      </article>
      <article className="img-container">
        <img src={heroBcg} className="main-img" />
        <img src={heroBcg2} className="accent-img" />
      </article>
    </Wrapper>
  );
}
export default Hero

```

### 2) FeaturedProduct.js

```js
import React from 'react'
import styled from 'styled-components'
import Loading from './Loading'
import Product from './Product'
import { useSelector } from 'react-redux'

const FeaturedProducts = () => {
  const {products,loading}=useSelector((store)=>store.products);
  const featuredProducts=products.filter((item)=>item.featured===true).slice(0,3);
  if(loading){
    return <Loading/>
  }
  return <Wrapper className='section'>
    <div className='title'>
      <h2>Featured Products</h2>
      <div className='underline'>

      </div>
      <div className='section-center featured'>
        {featuredProducts.map((item)=>{
          return <Product key={item.id} {...item}/>
        })}
      </div>
    </div>
  </Wrapper>
}
export default FeaturedProduct
```

### i)Product.js

```js
import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Product = ({image,name,price,id}) => {
  return <Wrapper>
    <div className='container'>
      <img src={image}/>
      <Link to={`/product/${id}`} className='link'>
        <FaSearch/>
      </Link>
    </div>
    <footer>
      <h5>{name}</h5>
      <p>{formatPrice(price)}</p>
    </footer>
  </Wrapper>
}
export default Product
```

### 3). Services.js

```js
import React from 'react'
import styled from 'styled-components'
import { services } from '../utils/constants'

const Services = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <article className="header">
          <h3>
            custom furniture <br /> built only for you
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
        </article>
        <div className='services-center'>
          {services.map((item)=>{
            const {id,icon,title,text}=item;
            return <article key={id} className='service'>
              <span className='icon'>{icon}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          })}
        </div>
      </div>
    </Wrapper>
  );
}
export default Services
```

### 4)Contact.js

```js
import React from 'react'
import styled from 'styled-components'

const Contact = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>Join Our newsleeter and get 20% off</h3>
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
          <form className='contact-form'>
            <input type='email' className='form-input' placeholder='enter email'/>
            <button type='submit' className='submit-btn'>subscribe</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}
export default Contact
```
## AboutPageComponents

### 1).PageHero.js- This component is used in other pages component as well.

```js
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const PageHero = (prop) => {
  const {obj:{title,bool}}=prop
  
 
  return <Wrapper>
    <div className='section-center'>
      <h3><Link to='/'>Home</Link>{bool && <Link to='/products'>/Products</Link>}/{title}</h3>
    </div>
  </Wrapper>
}

```
## ProductsPageComponents

### 1). PageHero.js-Refer AboutPagecomponents Section

### 2).Filters.js

```js
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

```

### 3).Sort.js

```js
import React from 'react'

import { BsFillGridFill, BsList } from 'react-icons/bs'
import { useSelector,useDispatch } from 'react-redux'
import styled from 'styled-components'
import { openGridView,openListView ,selectSort} from "../Features/FilterSlice";

const Sort = () => {
  
  const {gridView,sort,filteredProducts}=useSelector((store)=>store.filters);
  const dispatch=useDispatch();
  
const tempFunc=(name,value)=>{
  const obj={name,value}
  dispatch(selectSort(obj))

}





  return (
    <Wrapper>
      <div className="btn-container">
        <button
          className={` ${gridView && "active"}`}
          onClick={() => dispatch(openGridView())}
        >
          <BsFillGridFill />
        </button>
        <button
          className={`${!gridView && "active"}`}
          onClick={() => dispatch(openListView())}
        >
          <BsList />
        </button>
      </div>
      <p>{filteredProducts.length} products found</p>
      <hr />
      <form>
        <label htmlFor="sort">sort by</label>
        <select name="sort" id="sort" className="sort-input" value={sort} onChange={(e)=>tempFunc(e.target.name,e.target.value)}>
          <option value="price-lowest">price (lowest)</option>
          <option value="price-highest">price (highest)</option>
          <option value="name-a">name(A-Z)</option>
          <option value="name-z">name(Z-A)</option>
        </select>
      </form>
    </Wrapper>
  );
}

```

### 4).ProductList.js

```js
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

```

 ### i).Loading.js

 ```js
import React from 'react'

const Loading = () => {
  return <div className='section section-center'>
    <div className='loading'></div>
  </div>
}

export default Loading
 ```

 ### ii).GridView.js

 ```js
import React from 'react'
import styled from 'styled-components'
import Product from './Product'

const GridView = ({products}) => {
  
console.log(products)
  return <Wrapper>
    <div className='products-container'>
      {products.map((item)=>{

        return <Product key={item.id} {...item}/>
      })}
    </div>
  </Wrapper>
}

 ```
 ### a).Product.js

```js
import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Product = ({image,name,price,id}) => {
  return <Wrapper>
    <div className='container'>
      <img src={image}/>
      <Link to={`/product/${id}`} className='link'>
        <FaSearch/>
      </Link>
    </div>
    <footer>
      <h5>{name}</h5>
      <p>{formatPrice(price)}</p>
    </footer>
  </Wrapper>
}

```

 ### iii).ListView.js

 ```js
import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
const ListView = ({products}) => {


  return <Wrapper>
    {products.map((item)=>{
      const {id,image,name,price,description}=item;

      return <article key={id}>
        <img src={image}/>
        <div>
          <h4>{name}</h4>
          <h5 className='price'>{formatPrice(price)}</h5>
          <p>{description.substr(0,100)}</p>
          <Link to={`/product/${id}`} className='btn'>Read more</Link>
        </div>
      </article>

    })}
  </Wrapper>
}
 ```
## SingleProductPageComponents


### 1). PageHero.js - Refer AboutPageComponents 

### 2).ProductImages.js

```js
import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({images}) => {
  const [index,setIndex]=useState(0);
  console.log(images)
  
  return <Wrapper>
  <main>
    <img src={images[index].url}/>
  </main>
  <div className='gallery'>
    {images.map((item,index)=>{
      const {id,url}=item;
      return <img src={url} key={id} onClick={()=>setIndex(index)}/>
    })}
  </div>

  </Wrapper>
}

```

### 3).Stars.js

```js
import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars,reviews}) => {
  const tempStars=Array.from({length:5},(_,index)=>{
    const number=index+0.5
    return (
      <span>
        {stars >=index +1 ? (
          <BsStarFill/> ): stars>=number ? (<BsStarHalf/>): (<BsStar/>)}
        
      </span>
    )
  })
  return <Wrapper>
  <div className='stars'>{tempStars}</div>
  <p className='reviews'>{reviews}</p>

  </Wrapper>
}
```

### 4).AddToCart.js

```js
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
  )
```
  ### i). AmountButtons.js

  ```js
import React from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

const AmountButtons = ({amount,increase,decrease}) => {
  return <Wrapper>
    <button onClick={decrease}><FaMinus/></button>
    <h2>{amount}</h2>
    <button onClick={increase}><FaPlus/></button>
  </Wrapper>
}

  ```
    
## CartPageComponents


### 1).PageHero.js-Refer aboutPageComponets section

### 2).CartContent.js

```js
import { Link } from 'react-router-dom'
import CartColumns from './CartColumns'
import CartItem from './CartItem'
import CartTotals from './CartTotals'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../Features/cartSlice'

const CartContent = () => {
  const {cart}=useSelector((store)=>store.cart);
  const dispatch=useDispatch()
  return <Wrapper className='section section-center'>
  <CartColumns/>
  {cart.map((item)=>{
    return <CartItem key={item.id} {...item}/>
  })}
  <hr/>
  <div className='link-container'>
    <Link to='/products' className='btn'>continue shopping</Link>
    <button className='link-btn clear-btn' type='button' onClick={()=>dispatch(clearCart())} >clear cart</button>
  </div>
  <CartTotals/>

  </Wrapper>
}

```
   ### i).CartColumn.js

   ```js
import React from 'react'
import styled from 'styled-components'

const CartColumns = () => {
  return (
    <Wrapper>
      <div className="content">
        <h5>item</h5>
        <h5>price</h5>
        <h5>quantity</h5>
        <h5>subtotal</h5>
        <span></span>
      </div>
      <hr />
    </Wrapper>
  );
}

   ```

   ### ii).CartItems.js

   ```js
import React, { useState } from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import AmountButtons from './AmountButtons'
import { FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { removeCartItem, updateCartAmount } from '../Features/cartSlice'

const CartItem = ({id,image,name,color,price,quantity}) => {

  

  
  const dispatch=useDispatch()
  const increase=()=>{
    
    dispatch(updateCartAmount({id,value:'inc'}))

  }
  const decrease=()=>{
    dispatch(updateCartAmount({id,value:'dec'}))
    
    

  }

  return <Wrapper>
    <div className='title'>
    <img src={image}/>
    <div>
      <h5 className='name'>{name}</h5>
      <p className='color'>
        color:<span style={{background:color}}></span>
      </p>
      <h5 className='price-small'>{formatPrice(price)}</h5>
    </div>


    </div>
    <h5 className='price'>{formatPrice(price)}</h5>
    <AmountButtons amount={quantity} increase={increase} decrease={decrease}/>
    <h5 className='subtotal'>{formatPrice(price*quantity)}</h5>
    <button type='button' className='remove-btn' onClick={()=>dispatch(removeCartItem(id))}><FaTrash/></button>
  </Wrapper>
}

   ```

   ### iii).CartTotal.js

   ```js
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
   ```

   


## RegisterPageComponents

### 1).FormRow.js

```js
import React from 'react'

const FormRow = ({type,name,value,handleChange,labelText}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
}

export default FormRow

```