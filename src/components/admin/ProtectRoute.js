import React, { useContext } from 'react'
import AuthContext from '../../store/AuthContext';
import { Outlet } from 'react-router-dom';
import { AdminLogin } from './AdminLogin';
export const ProtectRoute = () => {
  const AuthCtx = useContext(AuthContext);
  return (
    AuthCtx.isLoggedIn||localStorage.getItem('token') ? <Outlet/> : <AdminLogin/>
  )
}