import Loading from '@/components/Loading';
import { useAuth } from '@/context/AuthContext';
import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const {currentUser,loading}=useAuth();
  if(loading){
    return <Loading/>
  }
  if(currentUser){
    return children;
  }
  return <Navigate to={"/login"} replace='true'></Navigate>
}

export default PrivateRoute