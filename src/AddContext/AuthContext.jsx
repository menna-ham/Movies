import { createContext } from "react";
import { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';



export let AuthContext = createContext(0);

export default function AuthContextProvider(props){
    const [User, setUser] = useState(null)
    let getUserToken=()=>{
      let token = localStorage.getItem('token')
      let data = jwt_decode(token);
      // console.log(data);
      setUser(data)
    }
  
    useEffect(()=>{
  
      if(localStorage.getItem('token')!=null){
        getUserToken()
      }
    },[])
  
    let LogOut=async()=>{
      localStorage.removeItem('token');
      setUser(null);
      <Navigate to={'/login'}/>;
  
    }
  
    let ProtectedRouter = (props)=>{
      if(localStorage.getItem('token')==null){
        return <Navigate to='/login' />
      }else{
  
        return props.children
      }
    }

    return(
        <AuthContext.Provider value={{User,LogOut,ProtectedRouter,getUserToken}}>
            {props.children}

        </AuthContext.Provider>
    )
}
