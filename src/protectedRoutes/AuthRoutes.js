import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const AuthRoutes = (props) => {
  const navigate = useNavigate();
  
  const user = localStorage.getItem('user');

  useEffect(()=>{
    if(user){
       navigate('/home');
    }
  },[user])
  
  return <Outlet/>
}

export default AuthRoutes