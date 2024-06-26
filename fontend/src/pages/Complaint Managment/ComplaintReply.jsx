import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'


export const ComplaintReply = () => {

    const {id} = useParams()
    const [complaint, setComplaint] = useState({})
    const [reply, setReply] = useState('')

    useEffect(()=>{
        axios
            .get(`http://localhost:5000/complaints/${id}`)
            .then((res) => {
                setComplaint(res.data.data);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }),[id]

    const handleReply = (e)=>{
        e.preventDefault();

        axios.put(`http://localhost:5000/complaints/${id}`, {
            reply
        }).then(response => {
            console.log(response);
            alert("Reply complete");
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });

    }


  return (
    <div className='flex flex-row'> 
        <div className='bg-gray-500  w-6/12 p-16 font-serif '>
                <h1 className='text-center ml-28 text-2xl border-b-2 w-56 '>Complaint Details</h1>

                <table className='mt-16 border-separate border-spacing-6 '>
                   <tbody>
                            <tr>
                                <td>ID : </td>
                                <td>{complaint._id}</td>
                            </tr>
                            <tr>
                                <td>Name : </td>
                                <td>{complaint.name}</td>
                            </tr>
                            <tr>
                                <td>Email : </td>
                                <td>{complaint.email}</td>
                            </tr>
                            <tr>
                                <td>Description : </td>
                                <td> {complaint.description}</td>
                            </tr>
                            
                            <tr>
                                <td>Create Date : </td>
                                <td>{complaint.createdAt}</td>
                            </tr>
                            <tr>
                                <td>Update Date : </td>
                                <td>{complaint.updatedAt}</td>
                            </tr>

                            <tr>
                                <td>Photo : </td>
                                <td> <img src={complaint.photo} alt="" /> </td>
                            </tr>
                            <tr>
                                <td>Reply : </td>
                                <td>{complaint.reply}</td>
                            </tr>
                   </tbody>

                </table>
        </div>
        <div className=' w-6/12 p-20'>
            <form action="" className='flex flex-col pl-20 pr-20 pt-14 pb-10 shadow-2xl rounded-2xl' onSubmit={handleReply}>
                <label htmlFor="reply" className='text-center mb-10 text-3xl font-serif  '>Reply</label>
                <textarea className='outline-none p-10 border border-slate-900  rounded-lg mb-5 ' onChange={(e)=>setReply(e.target.value)} value={reply} placeholder='Type reply' name="" id="" cols="30" rows="10"></textarea>
                <button className='h-8 w-20 rounded-lg text-white' style={{background:'#1A4133', marginLeft:130}} >Submit</button>
            </form>
        </div>
    </div>
  )
}
