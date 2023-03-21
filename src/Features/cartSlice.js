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
})


export const {addToCart,loadCartProducts,clearCart,getTotal,removeCartItem,updateCartAmount}=CartSlice.actions
export default CartSlice.reducer