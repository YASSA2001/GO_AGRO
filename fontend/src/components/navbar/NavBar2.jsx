import React, { useContext } from 'react'
import './NavBar2.css'
import { Link } from 'react-router-dom'
import { FaUserLarge } from "react-icons/fa6";
import  UserContext from '../../UserContext'

export const NavBar2 = () => {

  const {currentUser} =useContext(UserContext)
  return (

    <nav className='nav1 pt-4 pb-4  '>
      <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>

      {currentUser?.token &&<ul className='list flex flex-row gap-10 text-lg text-white  font-extralight font-serif'>

        <Link to="/"><li>Home</li></Link>
        <Link to="/"><li>Services</li></Link>
        <Link to="/contact"><li>Contact Us</li></Link>
        <Link to="/signup"><li>Sign Up</li></Link>
        <Link to="/login"><li className='mt-2'><FaUserLarge /></li></Link>
        <Link to="#"><li className='mt-2'>Logout</li></Link>

      </ul>}

      {!currentUser?.token &&<ul className='list flex flex-row gap-10 text-lg text-white ml-64 font-extralight font-serif'>

        <Link to="/"><li>Home</li></Link>
        <Link to="/"><li>Services</li></Link>
        <Link to="/contact"><li>Contact Us</li></Link>
        <Link to="/signup"><li>Sign Up</li></Link>
        <Link to="/login"><li className='mt-2'><FaUserLarge /></li></Link>
       

        

</ul>}
    </nav>

  )
}
