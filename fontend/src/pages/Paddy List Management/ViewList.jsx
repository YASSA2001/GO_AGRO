//for mill owners use
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'
import '../../components/navbar/NavBar3.css'
import './ViewList.css';

const ViewList = () => {
    const [list, setList] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/lists/${id}`)
            .then((response) => {
                setList(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    const handleGeneratePDF = () => {
        const input = document.getElementById("paddy-details");

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF();
                const imgWidth = 190;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                pdf.addImage(imgData, "PNG", 5, 5, imgWidth, imgHeight);
                pdf.save("PaddyDetails.pdf");
            })
            .catch((error) => {
                console.error("Error generating PDF:", error);
            });
    };

    return (
        <>
            <nav className='nav1 pt-4 pb-4  '>
                <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>

                <ul className='list1 flex flex-row gap-10 text-lg  text-white  font-extralight font-serif'>

                    <Link to={''}  ><li>Home</li></Link>
                    <Link to={``}><li >Make Complaints</li></Link>
                    <Link to="/"><li>Logout</li></Link>
                    <Link to="/"><li>Contact Us</li></Link>
                    <Link to="/#"><li className='mt-2'><FaBell /></li></Link>
                    <Link to="/#"><li className='mt-2'><FaUserLarge /></li></Link>


                </ul>
            </nav>

            <div className='container'>

                <h1 className='heading'>Product Details</h1>
                {loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div className='border-2 border-green-400 rounded-2xl w-fit p-4 center'>
                        {list.image && (
                            <div className="image-container">
                                <img src={`http://localhost:5000/${list.image}`} alt="Uploaded" className="image" />
                            </div>
                        )}
                        <div id="paddy-details">
                            <div className='item'>
                                <span>Id :</span>
                                <span>{list._id}</span>
                            </div>
                            <div className='item'>
                                <span>Paddy Type :</span>
                                <span>{list.paddyType}</span>
                            </div>
                            <div className='item'>
                                <span>Quantity(Kg) :</span>
                                <span>{list.quantity}</span>
                            </div>
                            <div className='item'>
                                <span>Price Per 1KG(Rs) :</span>
                                <span>{list.pricePer1kg}</span>
                            </div>
                            <div className='item'>
                                <span>Create Time :</span>
                                <span>{new Date(list.createdAt).toString()}</span>
                            </div>
                            <div className='item'>
                                <span>Last Update Time :</span>
                                <span>{new Date(list.updatedAt).toString()}</span>
                            </div>
                        </div>
                        <button className='btn-print' onClick={handleGeneratePDF}>Print</button>
                    </div>
                )}
            </div>
        </>

    );
};

export default ViewList;
