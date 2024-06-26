import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


export const DeleteFarmers = () => {

    
    const {id} = useParams()

    const handleDeleteBook = () =>{

        axios
          .delete(`http://localhost:5000/farmers/${id}`)
          .then(()=>{
           
            alert("Delete Successful")
          })
          .catch((error)=>{
            alert("there is error")
            console.log(error)
          })
      }
  return (
    <div className='p-4'>
    
        <h1 className='text-3xl my-4'>Delete Book</h1>   
       

        <div className='flex  flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto' >
            <h3 className='text-2xl'>Are you sure  You want to delete this account</h3>

            <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>
              Yes Delete it
            </button>
        </div>

          
    </div>
  )
}
