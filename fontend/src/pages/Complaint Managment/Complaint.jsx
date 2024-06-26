import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'
import '../../components/navbar/NavBar3.css'
import './complaint.css';
import image1 from '../../image/complaint.jpg';


export const Complaint = () => {
    const { email } = useParams();
    const [phone, setPhone] = useState('');
    const [farmer, setFarmer] = useState('')
    const [problem_type, setProblem] = useState('');
    const [photo, setphoto] = useState('');
    const [description, setDescription] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [millowner, setMillowner] = useState('')
    const name = farmer.name || millowner.name;
    const role = farmer.role || millowner.role

    useEffect(() => {
        axios.get(`http://localhost:5000/farmers/email/${email}`)
            .then((res) => {
                setFarmer(res.data.data);
                console.log(res.data.data);
            }).catch((error) => {
                console.log(error);
            });
    }, [email]);

    useEffect(() => {
        axios.get(`http://localhost:5000/millowners/email/${email}`)
            .then((res) => {
                setMillowner(res.data.data)
                console.log(res.data.data)
            }).catch((error) => {
                console.log(error)
            })
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePhone(phone)) {
            setValidationMessage('Phone number must be 10 digits long.');
            return;
        }

        axios.post("http://localhost:5000/complaints", {
            name,
            phone,
            email,
            problem_type,
            photo,
            description
        }).then(response => {
            console.log(response);
            alert("Complaint registered successfully");
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
    };


    const validatePhone = (phoneNumber) => {
        return phoneNumber.length === 10;
    };

    let linkPath;

    // Determine the link path based on the user's role
    if (role === 'farmer') {
        linkPath = `/farmer/${email}`;
    } else if (role === 'mill owner') {
        linkPath = `/millowner/${email}`;
    } else if (role == 'shop owner') {
        // Handle other cases, if necessary
        linkPath = `/shopowner/${email}`;
    }
    return (

        <>
            <nav className='nav1 pt-4 pb-4  '>
                <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>

                <ul className='list1 flex flex-row gap-10 text-lg  text-white  font-extralight font-serif'>

                    <Link to={linkPath}  ><li>Home</li></Link>
                    <Link to={``}><li >Make Complaints</li></Link>
                    <Link to="/"><li>Logout</li></Link>
                    <Link to="/"><li>Contact Us</li></Link>

                    <Link to="/#"><li className='mt-2'><FaBell /></li></Link>
                    <Link to="/#"><li className='mt-2'><FaUserLarge /></li></Link>



                </ul>
            </nav>

            <div className='container flex flex-row'>



                <div className='image border-none'>
                    <img src={image1} className='w-10/12 ml-7 mt-10' alt="" />
                </div>

                <div className=''>
                    <form className='form-y shadow-md shadow-gray-700 ml-32 mt-44 rounded-2xl mb-10  pt-14' onSubmit={handleSubmit}>
                        <h1 className='h1 text-4xl font-serif mb-14 ml-44'>Complaints</h1>


                        <div className='flex flex-col ml-20' style={{ border: '1px solid white' }}>

                            <label htmlFor="phone">Contact number:</label>
                            <input id='phone' type="text" onChange={(e) => setPhone(e.target.value)} value={phone} />
                            {validationMessage && <p className="error-message text-red-700 font-bold">{validationMessage}</p>}

                            <select className=' bg-transparent w-52 relative text-xl font-serif mt-10 border rounded-md text-black ' onChange={(e) => setProblem(e.target.value)} name='' id="">
                                <option value="">Problem type</option>
                                <option value="technical">Technical</option>
                                <option value="payment">Payment</option>
                                <option value="other">Other</option>
                            </select>
                            <label htmlFor='description' className='mt-5'>Description</label>
                            <textarea id='description' onChange={(e) => setDescription(e.target.value)} className='pl-5 mb-5 font-serif text-s outline-none bg-transparent border border-2 border-black rounded-md w-4/5 mt-2 bg-transparent '></textarea>
                            <label htmlFor="image">Add Image</label>
                            <input type="file" onChange={(e) => setphoto(e.target.value)} className='mb-10' />

                            <button type='submit' name='submit' className='bg-lime-950 text-white   w-24 h-8  rounded-md ml-28 mb-14  '>Submit</button>
                        </div>


                    </form>
                </div>
            </div>
        </>

    )
}
