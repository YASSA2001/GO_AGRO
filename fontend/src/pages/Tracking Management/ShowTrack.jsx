import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import StepperWithDropdown from './Stepper'; // Corrected import
import { useReactToPrint } from "react-to-print";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

const ShowTrack = () => {
  const [track, setTrack] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams('');
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'TrackDelivery-data',
    onAfterPrint: () => alert('Print success')
  });


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/tracks/${id}`)
      .then((response) => {
        setTrack(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <div ref={componentRef} style={{ width: '100%', height: window.innerHeight}}>

        <div className='p-4'>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '78vh', paddingTop: '50px' }}>
            <div >
              <h1 className='text-3xl my-4'>Your Order Tracking System !</h1>
              {loading ? (
                <Spinner />
              ) : (
                <div className='flex flex-col border-2 border-green-200 rounded-xl w-fit p-4' >
                  <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'><strong>Track Id: </strong></span>
                    <span>{track._id}</span>
                  </div>
                  <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'><strong>Address: </strong></span>
                    <span>{track.address}</span>
                  </div>
                  <StepperWithDropdown editable={false} /> {/* Render Stepper component */}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className='flex justify-center mt-4'>
        <Button
          className="bg-green-800 text-white mt-5 mb-4 rounded-lg w-fit"
          onClick={() => handlePrint()}
        >
          Print this
        </Button>
      </div>
    </>
  );
};

export default ShowTrack;