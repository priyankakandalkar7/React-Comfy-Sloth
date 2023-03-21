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

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
    width: "100px";
  }

  .form-main {
    
    border-top: 5px solid var(--clr-primary-7);
  }
  h3 {
    text-align: center;
    color: var(--clr-primary-7);
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-7);
    cursor: pointer;
    padding-left:'0.25rem';
    letter-spacing: var(--spacing);
  }
`;

export default RegisterPage