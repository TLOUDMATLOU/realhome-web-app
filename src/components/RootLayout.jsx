import React from 'react'
import Navbar from './Navbar'
import Footer from '@/sections/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

function RootLayout() {
  return (
    <div>
        {/* NAV */}
        <Navbar />


        {/* PAGES */}
        <Outlet /> 
        
        
        {/* FOOTER */}
        <Footer />
        <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
transition="Bounce"/>
    </div>
  )
}

export default RootLayout