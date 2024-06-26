import React, { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link, useParams } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import jspdf from "jspdf";
import "jspdf-autotable";
import debounce from "lodash.debounce";

const Show = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [noDataMessage, setNoDataMessage] = useState('');
  const { name } = useParams('')

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/reviews`)
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching review:", error);
        setError("An error occurred while fetching the review.");
        setLoading(false);
      });
  }, []);

  // Search function
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/searchreview?search=${searchQuery}`);
      console.log("Search response:", response);
      if (response.data.length === 0) {
        console.log("No matching reviews found.");
        setNoDataMessage('No matching reviews found.');
      } else {
        console.log("Matching reviews found:", response.data);
        setNoDataMessage('');
        setReviews(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setLoading(false);
    }
  };

  // Apply search filter
  const applySearchFilter = (review) => {

    const content = review.content ? review.content.toLowerCase() : '';
    const ordernumber = review.ordernumber ? review.ordernumber.toLowerCase() : '';
    const publishDate = review.publishDate ? review.publishDate.toLowerCase() : '';
    const ordername = review.ordername ? review.ordername.toLowerCase() : '';
    const name = review.name ? review.name.toLowerCase() : '';

    return (
      content.includes(searchQuery.toLowerCase()) ||
      ordernumber.includes(searchQuery.toLowerCase()) ||
      publishDate.includes(searchQuery.toLowerCase()) ||
      ordername.includes(searchQuery.toLowerCase()) ||
      name.includes(searchQuery.toLowerCase())
    );
  };

  // Filter reviews based on search query
  const filteredReviews = reviews.filter(applySearchFilter);

  // Function to generate PDF
  const generatePDF = () => {
    if (filteredReviews.length === 0) {
      console.log("Sorry. No reviews to generate PDF.");
      return;
    }
    const doc = new jspdf();
    const tableColumn = [
      "ID",
      "User Name",
      "Order ID",
      "Name of Order",
      "Review",
      "Published Date",
      "Star Rating",
    ];
    const tableRows = filteredReviews.map((review, index) => [
      index + 1,
      review.name,
      review.ordernumber,
      review.ordername,
      review.content,
      review.publishDate,
      review.rating,
    ]);
    const date = new Date().toLocaleDateString();

    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor('green');
    doc.text("Go Agro", 60, 15);
    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Feedback Details Report", 65, 25);
    doc.setFont("times", "normal").setFontSize(15).setTextColor(100, 100, 100);
    doc.text(`Report Generated Date: ${date}`, 65, 35);
    doc.setFont("courier", "normal").setFontSize(12).setTextColor(150, 150, 150);
    doc.text("www.go_agro.lk", 30, 45);
    doc.text(
      "--------------------------------------------------------------------------------------------------",
      0,
      49
    );
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: { fontSize: 9 },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    doc.save(`Review-Details-Report_${date}.pdf`);
  };

  return (

    <>
      <nav className='nav1 pt-4 pb-4  '>
        <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>

        <ul className='list1 flex flex-row gap-10 text-lg  text-white  font-extralight font-serif'>

          <Link to={``}  ><li>Home</li></Link>
          <Link to={``}><li >Make Complaints</li></Link>
          <Link to="/"><li>Logout</li></Link>
          <Link to="/"><li>Contact Us</li></Link>

          <Link to="/#"><li className='mt-2'><FaBell /></li></Link>
          <Link to="/#"><li className='mt-2'><FaUserLarge /></li></Link>
        </ul>
      </nav>

      <div className='p-8'>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            name="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here..."
            className="mr-2 border border-gray-400 p-2 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
        {noDataMessage && (
          <p className="text-red-500 text-center">{noDataMessage}</p>
        )}
        <div className="flex justify-center mb-5">
          <button
            onClick={generatePDF}
            className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Generate Report
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-slate-600 rounded-md text-green-500 bg-green-100 p-2' style={{ width: '0.1%', fontSize: '18px' }}>ID</th>
                <th className='border border-slate-600 rounded-md text-green-500 bg-green-100 p-2' style={{ width: '3%', fontSize: '18px' }}>Order Number</th>
                <th className='border border-slate-600 rounded-md text-green-500 bg-green-100 p-2' style={{ width: '3%', fontSize: '18px' }}>Order Details</th>
                <th className='border border-slate-600 rounded-md text-green-500 bg-green-100 p-2' style={{ width: '3%', fontSize: '18px' }}>Username</th>
                <th className='border border-slate-600 rounded-md text-green-500 bg-green-100 p-2' style={{ width: '3%', fontSize: '18px' }}>Review</th>
                <th className='border border-slate-600 rounded-md text-green-500 bg-green-100 p-2' style={{ width: '2.5%', fontSize: '18px' }}>Level of Rating(out of 5)</th>
                <th className='border border-slate-600 rounded-md text-green-500 bg-green-100 p-2' style={{ width: '3%', fontSize: '18px' }}>Published Date</th>
                
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {filteredReviews.map((review, index) => (
                <tr key={index} className='h-9'>
                  <td className='border rounded-md text-center shadow-lg' style={{ fontSize: '14px' }}>
                    {index + 1}
                  </td>
                  <td className='border rounded-md text-center shadow-lg' style={{ fontSize: '14px' }}>
                    {review.ordernumber}
                  </td>
                  <td className='border rounded-md text-center shadow-lg' style={{ fontSize: '14px' }}>
                    {review.ordername}
                  </td>
                  <td className='border rounded-md text-center shadow-lg' style={{ fontSize: '14px' }}>
                    {review.name}
                  </td>
                  <td className='border rounded-md text-center shadow-lg' style={{ fontSize: '14px' }}>
                    {review.content}
                  </td>
                  <td className='border rounded-md text-center shadow-lg' style={{ fontSize: '14px' }}>
                    {review.rating}
                  </td>
                  <td className='border rounded-md text-center shadow-lg' style={{ fontSize: '14px' }}>
                    {review.publishDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Show;