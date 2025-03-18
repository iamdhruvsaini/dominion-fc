import React from 'react'
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {

  const token=localStorage.getItem('token');
  const role=localStorage.getItem('role');
 
  if(token && role){
    return children;
  }
  return <Navigate to={"/admin"} replace='true'></Navigate>
}

export default AdminRoute