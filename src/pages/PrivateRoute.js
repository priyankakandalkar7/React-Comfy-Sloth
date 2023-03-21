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
