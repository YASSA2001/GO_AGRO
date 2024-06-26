import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const ShowReview = () => {
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/reviews/${id}`)
      .then((response) => {
        setReview(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex'>
        <Link
          to="/reviews/show"
          className='bg-green-800 text-white px-4 py-1 rounded-lg w-fit absolute  left-4'
        >
          <BsArrowLeft className='text-2xl' />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className='flex items-center justify-center mt-10'>
          <div className='flex flex-col border border-gray-300 rounded-xl shadow-md p-4 max-w-[800px] '>
            <h1 className='text-3xl my-4 text-center text-green-700'>Your Review</h1>
            <div className='my-4'>
              <span className='text-lg text-gray-700 font-semibold '>Id:</span>
              <span className='ml-4'>{review._id}</span>
            </div>
              <div className='my-4'>
              <span className='text-lg text-gray-700 font-semibold font-montserrat'>Order Number:</span>
              <span className='ml-4'>{review.ordernumber}</span>
            </div>
            <div className='my-4'>
              <span className='text-lg text-gray-700 font-semibold font-montserrat'>Order Details:</span>
              <span className='ml-4'>{review.ordername}</span>
            </div>
            <div className='my-4'>
              <span className='text-lg text-gray-700 font-semibold font-montserrat'>Username:</span>
              <span className='ml-4'>{review.name}</span>
            </div>
            <div className='my-4'>
              <span className='text-lg text-gray-700 font-semibold font-montserrat'>Review Content:</span>
              <span className='ml-4'>{review.content}</span>
            </div>
            <div className='my-4'>
              <span className='text-lg text-gray-700 font-semibold font-montserrat'>Rating (out of 5):</span>
              <span className='ml-4'>{review.rating}</span>
            </div>
            <div className='my-4'>
              <span className='text-lg text-gray-700 font-semibold font-montserrat'>Published Date:</span>
              <span className='ml-4'>{review.publishDate}</span>
            </div>
            <div className='my-4'>
              <span className='text-lg text-gray-700 font-semibold font-montserrat'>Create Time:</span>
              <span className='ml-4'>{new Date(review.createdAt).toLocaleString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-lg text-gray-700 font-semibold font-montserrat'>Last Update Time:</span>
              <span className='ml-4'>{new Date(review.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}


    </div>


  );
};

export default ShowReview;