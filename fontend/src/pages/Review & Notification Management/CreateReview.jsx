import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaStar } from 'react-icons/fa';
import '../../App.css';

const CreateReview = () => {

  const [notification, setNotification] = useState(null);
  const [content, setContent] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [rating, setRating] = useState(0);  
  const [ordername, setOrdername] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); //UX
  const [hover, setHover] = useState(null);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const { ordernumber } = useParams();

  // Fetch orders data on component mount
  useEffect(() => {
    axios.get(`http://localhost:5000/notifications/${ordernumber}`)
      .then((res) => {
        const data = res.data;
        console.log(res.data)
        setNotification(res.data);
        setOrdername(res.data.ordername);
        setName(res.data.name);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [ordernumber]);



  const handleSaveReview = () => {

    // Check if the publish date has been modified
    if (publishDate !== getCurrentDate()) {
      enqueueSnackbar("You cannot change the publish date.", { variant: 'error' });
      return; // Exit the function without proceeding further
    }

    // Check if any required fields are empty
    if (!content || !rating || !ordernumber || !publishDate  || !ordername || !name) {
      // Show a pop-up message informing the user to fill in all required fields
      enqueueSnackbar('Please fill in all required fields.', { variant: 'error' });
      return; // Exit the function without proceeding further
    }

    const data = {
      content,
      publishDate,
      rating,
      ordernumber,
      photo,
      name,
      ordername,
    };
    setLoading(true);
    axios
      .post('http://localhost:5000/reviews', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Review Created successfully', { variant: 'success' }); //UX
        navigate('/submit');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const toggleBoxSelection = (index) => {
    console.log("Toggle box selection called with index:", index);
    setSelectedBoxes((prevSelectedBoxes) => {
      if (prevSelectedBoxes.includes(index)) {
        return prevSelectedBoxes.filter((boxIndex) => boxIndex !== index);
      } else {
        return [...prevSelectedBoxes, index];
      }
    });
  };
  

  // Function to generate the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Set the initial value of publishDate to the current date
  useEffect(() => {
    setPublishDate(getCurrentDate());
  }, []);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setPhoto([...photo, ...files]); // Add new files to the existing array of photos
  };

  return (
    <div className='p-4'>
      <div className='flex'>
        <Link
          to="/notification"
          className='bg-green-800 text-white px-4 py-1 rounded-lg w-fit absolute  left-4'
        >
          <BsArrowLeft className='text-2xl' />
        </Link>
      </div>
      <h1 className='text-3xl my-5 text-center text-green-700'>Add My Review</h1>
      {loading ? <Spinner /> : ''}

      <div className='flex flex-col border-2 rounded-xl w-[950px] shadow-md p-8 mx-auto'>

        <div className='my-5 flex flex-col'>
          <label className='text-l mr-4 text-black-500'>Order Details</label>
          <input
            type='text'
            value={ordername}
              disabled 
              style={{
                borderWidth: '2px',
                borderColor: '#7173767f',
                padding: '0.5rem 1rem',
                width: '60%',
                borderRadius: '0.5rem',
              }}
              className='input-field mt-2'
          />
        </div>

        <div className='my-5 flex flex-col'>
          <label className='text-l mr-4 text-black-500'>Order Number</label>
          <input
            type='text'
            value={ordernumber}
             disabled 
             style={{
              borderWidth: '2px',
              borderColor: '#7173767f',
              padding: '0.5rem 1rem',
              width: '60%',
              borderRadius: '0.5rem',
            }}
             className='input-field mt-2'
          />
        </div>

        <div className='my-5 flex flex-col'>
          <label className='text-l mr-4 text-black-500'>Username</label>
          <input
            type='text'
            value={name}
            disabled 
            style={{
              borderWidth: '2px',
              borderColor: '#7173767f',
              padding: '0.5rem 1rem',
              width: '60%',
              borderRadius: '0.5rem',
            }}
            className='input-field mt-2'
          />
        </div>

        <div className='my-5 flex flex-col'>
          <label className='text-l mr-4 text-black-500'>Select Descriptions</label>
          <div className="description-boxes">
            <div
              className={`box ${selectedBoxes.includes(1) && 'selected'}`}
              onClick={() => toggleBoxSelection(1)}
              style={{
                backgroundColor: '#f2f2f2',
                padding: '15px',
                textAlign: 'center',
                width: '150px',
                height: '60px',
                borderRadius: '9px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                marginBottom: '15px',
                marginTop: '15px',
                display: 'inline-block',
                verticalAlign: 'top',
                marginRight: '18px',
              }}
            >
              Not as shown
            </div>
            <div
              className={`box ${selectedBoxes.includes(2) && 'selected'}`}
              onClick={() => toggleBoxSelection(2)}
              style={{
                backgroundColor: '#f2f2f2',
                padding: '15px',
                textAlign: 'center',
                width: '150px',
                height: '60px',
                borderRadius: '9px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                marginBottom: '15px',
                marginTop: '15px',
                display: 'inline-block',
                verticalAlign: 'top',
                marginRight: '18px',
              }}
            >
              Timely Delivery
            </div>
            <div
              className={`box ${selectedBoxes.includes(3) && 'selected'}`}
              onClick={() => toggleBoxSelection(3)}
              style={{
                backgroundColor: '#f2f2f2',
                padding: '15px',
                textAlign: 'center',
                width: '150px',
                height: '60px',
                borderRadius: '9px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                marginBottom: '15px',
                marginTop: '15px',
                display: 'inline-block',
                verticalAlign: 'top',
                marginRight: '18px',
              }}
            >
              Smooth Process
            </div>
            <div
              className={`box ${selectedBoxes.includes(4) && 'selected'}`}
              onClick={() => toggleBoxSelection(4)}
              style={{
                backgroundColor: '#f2f2f2',
                padding: '15px',
                textAlign: 'center',
                width: '150px',
                height: '60px',
                borderRadius: '9px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                marginBottom: '15px',
                marginTop: '15px',
                display: 'inline-block',
                verticalAlign: 'top',
                marginRight: '18px',
              }}
            >
              Good Quality
            </div>
            <div
              className={`box ${selectedBoxes.includes(5) && 'selected'}`}
              onClick={() => toggleBoxSelection(5)}
              style={{
                backgroundColor: '#f2f2f2',
                padding: '15px',
                textAlign: 'center',
                width: '150px',
                height: '60px',
                borderRadius: '9px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                marginBottom: '15px',
                marginTop: '15px',
                display: 'inline-block',
                verticalAlign: 'top',
                marginRight: '18px',
              }}
            >
              Trustworthy Supplier
            </div>
          </div>
        </div>

        <div className='my-5 flex flex-col'>
          <label className='text-l mr-4 text-black-500'>Add Written Review</label>
          <textarea
            value={content}
            placeholder="How's the quality of the product? Is it worth its price?"
            onChange={(e) => setContent(e.target.value)}
            className='input-field mt-2 h-60 resize-none'
            style={{
              borderWidth: '2px',
              borderColor: '#7173767f',
              padding: '0.5rem 1rem',
              width: '300px',
              borderRadius: '0.5rem',
            }}
            rows={4}
          />
        </div>

        <div className='my-5 flex items-center'>
          <label className='text-l mr-4 text-black-500'>Rating</label>
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index} className='flex items-center'>
                <input
                  type='radio'
                  name='rating'
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                  style={{ display: 'none' }}
                />

                <FaStar
                  className='star'
                  size={35}
                  color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                />

              </label>
            );
          })}
        </div>
        <div className='my-5 flex flex-col'>
          <label className='text-l mr-4 text-black-500'>Date</label>
          <input
            type='date'
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className='input-field mt-2'
            style={{
              borderWidth: '2px',
              borderColor: '#7173767f',
              padding: '0.5rem 1rem',
              width: '85%',
              borderRadius: '0.5rem',
            }}
          />
        </div>

        <div className='my-5 flex flex-col'>
          <label className='text-l mr-4 text-black-500'>Add one or more pictures</label>
          <input
            type='file'
            name='photo'
            accept='image/*'
            onChange={handlePhotoChange} 
            className='input-field mt-2' multiple
            style={{
              borderWidth: '2px',
              borderColor: '#7173767f',
              padding: '0.5rem 1rem',
              width: '80%',
              borderRadius: '0.5rem',
            }}
          />
          {photo.map((photo, index) => (
            <img key={index} 
            src={URL.createObjectURL(photo)}
             alt={`Selected Image ${index}`}
              className='mt-2' 
              style={{ maxWidth: '100px' }} />
          ))}
        </div>

        <div className='my-2 flex justify-center'> {/* Center the button horizontally */}
          <button 
          style={{
            padding: '0.5rem 2rem',
            backgroundColor: '#2AA244',
            color: 'white',
            borderRadius: '0.5rem',
          }}
          className='p-2 bg-green-800 m-8 rounded-xl w-[350px] text-white' onClick={handleSaveReview}>
            Add Review
          </button>
        </div>
      </div>
    </div>

  );
};

export default CreateReview;