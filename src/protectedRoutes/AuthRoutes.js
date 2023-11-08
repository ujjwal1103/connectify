import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const AuthRoutes = () => {
  const navigate = useNavigate();
  
  const {user} = useAuth();

  useEffect(()=>{
    if(user){
       navigate('/home');
    }else{
      navigate('/');
    }
  },[user, navigate])
  
  
  return <Outlet/>
}

export default AuthRoutes