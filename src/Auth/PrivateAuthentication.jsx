import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '../Components/Loading'

export default function PrivateAuthentication({children}) {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
  
  if(loading){
    return <Loading /> 
  }

  if(user){
    return children
  } else {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }
}  