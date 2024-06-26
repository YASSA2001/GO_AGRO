import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import { MdOutlineArrowForwardIos ,  MdOutlineArrowBackIosNew } from "react-icons/md"
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';

export const ImageSwiper = () => {
    const [lists, setLists] = useState([]);
    


    useEffect(() => {
        
        axios.get('http://localhost:5000/lists')
            .then((response) => {
                setLists(response.data);
                
            })
            .catch((error) => {
                console.log(error);
                
            });
    }, []);

    


    return (
  
        <>

    <div className=' m-10  relative  justify-center content-center text-center items-center'>
            <div style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)'}} className="w-full flex justify-between items-center p-4">
        <MdOutlineArrowBackIosNew  size={50} className="text-gray-800 cursor-pointer" style={{position: 'absolute', left: 0}} />
        <MdOutlineArrowForwardIos  size={50} className="text-gray-800 cursor-pointer" style={{position: 'absolute', right: 0}} />
        </div>
    <Swiper className='m-10 w-full' modules={[Virtual]} spaceBetween={10} slidesPerView={4} virtual>
        {lists.map((slideContent, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
                <img className='w-72 h-52 rounded-lg' src={`http://localhost:5000/${slideContent.image}`} alt={`Slide ${index}`} />
            </SwiperSlide>
        ))}
    </Swiper>

   <div className='w-full  flex  justify-center'>
   <PiDotsThreeOutlineLight className='  ' size={50}/>
   </div>
    
    </div>
        
        </>
    );
};
