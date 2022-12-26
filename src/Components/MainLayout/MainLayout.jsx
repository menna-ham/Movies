import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import '../../index.css'
export default function MainLayout({user,logOut}) {
  return (
    
    <>
    {/* <div className='position-relative'> */}
      <div className='darkLayer '>
      <Navbar user={user} logOut ={logOut}/> 
        <Outlet></Outlet>
        <Footer/>
      </div>
      {/* </div> */}
    </>

  )
}
