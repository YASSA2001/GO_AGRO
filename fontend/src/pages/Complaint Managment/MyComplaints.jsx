import React, {useState, useEffect} from 'react'
import { useParams, Link} from 'react-router-dom';
import axios from 'axios'
import {FaBell} from 'react-icons/fa'
import {FaUserLarge} from 'react-icons/fa6'
import '../../components/navbar/NavBar3.css'

export const MyComplaints = () => {

    const [mycomplaints , setMycomplaints] = useState([]) 
    const { email } = useParams();   

    useEffect(()=>{
        axios
            .get(`http://localhost:5000/complaints/email/${email}`)
            .then((res)=>{
                setMycomplaints(res.data.data)
                console.log(res.data.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    },[])

   
  return (

    <div className=''>
        <nav className='nav1 pt-4 pb-4  '>
            <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>
            
            <ul className='list1 flex flex-row gap-10 text-lg  text-white  font-extralight font-serif'>

                
                <Link to={`/complaint/`}><li>Make Complaints</li></Link>
                <Link to="/"><li>Logout</li></Link>
                <Link to="/"><li>Contact Us</li></Link>
                                
                <Link to="/#"><li className='mt-2'><FaBell/></li></Link>
                <Link to="/#"><li className='mt-2'><FaUserLarge/></li></Link>
            
                

            </ul>
        </nav>
        

        <div className='text-4xl items-center justify-center text-center mt-20 font-serif'>
            <h1>My Complaints</h1>

        </div>

        <table className='w-full border-separate border-spacing-6'>
            <thead>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>ID</th>
                        <th className='border border-slate-600 rounded-md'>Name</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Email</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Photo</th>
                        <th className='border border-slate-600 rounded-md '>Description</th>
                        <th className='border border-slate-600 rounded-md '>Reply</th>
            </thead>

            <tbody>
                {mycomplaints.map((mycomplaint, index)=>(
                    <tr key={mycomplaint._id}>
                        <td className='border border-slate-700 rounded-md text-center'> {index +1} </td>
                        <td className='border border-slate-700 rounded-md text-center'> {mycomplaint._id} </td>
                        <td className='border border-slate-700 rounded-md text-center'> {mycomplaint.name} </td>
                        <td className='border border-slate-700 rounded-md text-center'> {mycomplaint.email} </td>
                        <td className='border border-slate-700 rounded-md text-center'><img src={mycomplaint.photo} alt="" /></td>
                        <td className='border border-slate-700 rounded-md text-center'> {mycomplaint.description} </td>
                        <td className='border border-slate-700 rounded-md text-center'> {mycomplaint.reply} </td>
                        <td className=''> 
                            <Link to={`/updatecomplaint/${mycomplaint._id}`}><button className='bg-green-950 rounded-md w-20 text-white mr-2' >Update</button></Link>
                            <Link to={`/deletecomplaints/${mycomplaint._id}`}><button className='bg-red-700 rounded-md w-20 text-white'>Delete</button></Link>
                        </td>
                        
                        

                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
