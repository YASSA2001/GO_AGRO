import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import debounce from 'lodash/debounce';
import "./Orders.css"; // Import CSS file

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/orders')
      .then((response) => {
        setOrders(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Function to handle search
  const handleSearch = debounce(() => {
    const filteredLists = orders.filter(list =>
      applySearchFilter(list, searchQuery)
    );
    setOrders(filteredLists);
  }, 300);

  const applySearchFilter = (list, query) => {
    const lowerCaseQuery = query.toLowerCase();
    return (
      String(list.no).toLowerCase().includes(lowerCaseQuery) ||
      String(list.buyername).toLowerCase().includes(lowerCaseQuery) ||
      String(list.type).toLowerCase().includes(lowerCaseQuery) ||
      String(list.sellername).toLowerCase().includes(lowerCaseQuery) ||
      String(list.quantity).toLowerCase().includes(lowerCaseQuery) ||
      String(list.price).toLowerCase().includes(lowerCaseQuery)

    );
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };



  // Function to generate report
  const handleGenerateReport = () => {
    const input = document.getElementById("orders-table");

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 5, 5, imgWidth, imgHeight);
        pdf.save("OrdersReport.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (

    <div className='p-4 table-container'>
      <div className="search-bar-container">
        <input
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Orders List</h1>
        <div className='flex items-center'>

          <button onClick={handleGenerateReport} className='btn-generate-report'>
            Generate Report
          </button>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='orders-table' id="orders-table">
          <thead>
            <tr>
              <th>No</th>
              <th className='hidden sm:table-cell'>Buyername</th>
              <th className='hidden sm:table-cell'>Sellername</th>
              <th className='hidden sm:table-cell'>Type</th>
              <th className='hidden sm:table-cell'>Quantity</th>
              <th className='hidden sm:table-cell'>Price</th>
              <th className='operations-column'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td className='hidden sm:table-cell'>{order.buyername}</td>
                <td className='hidden sm:table-cell'>{order.sellername}</td>
                <td className='hidden sm:table-cell'>{order.type}</td>
                <td className='hidden sm:table-cell'>{order.quantity}</td>
                <td className='hidden sm:table-cell'>{order.price}</td>
                <td>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/orders/details/${order._id}`}>
                      <BsInfoCircle className='text-green-600 hover:text-green-800 cursor-pointer' />
                    </Link>
                    <Link to={`/orders/edit/${order._id}`}>
                      <AiOutlineEdit className='text-yellow-600 hover:text-yellow-800 cursor-pointer' />
                    </Link>
                    <Link to={`/orders/delete/${order._id}`}>
                      <MdOutlineDelete className='text-red-600 hover:text-red-800 cursor-pointer' />
                    </Link>
                  </div>
                </td>

                <td><Link to={`/createpayment/${order._id}`}><button className="bg-green-950 text-white w-16 rounded-md ">Pay</button></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
