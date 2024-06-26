import React from 'react'
import { NavBar2 } from '../components/navbar/NavBar2'
import './login1.css'
import { Link } from 'react-router-dom'


export const Login = () => {
  return (
    <>

     <NavBar2 />

    <div className="flex flex-col w-full min-h-screen border-none">
    
      <h1 className="text-5xl text-center font-serif mt-20 mb-20">Logins</h1>
      <div className="flex-grow flex flex-row items-center justify-center">
        <Link to="/farmerlogin"><button className="b1 text-white mb-4">Farmer</button></Link>
        <Link to="/millownerlogin"><button className="b1 text-white mb-4">Mill Owner</button></Link>
        <Link to="/shopownerlogin"><button className="b1 text-white mb-4">Shop Owner</button></Link>
      </div>

      <footer style={{background:"#1A4133"}} className="text-center mt-auto p-4 text-white text-xl ">
        &copy; 2024 GO AGRO. All Rights Reserved.
      </footer>
      
    </div>

   
  
    </>
    

      

   
  )
}
