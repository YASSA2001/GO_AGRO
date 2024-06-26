import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';

export const ImageSwiper2 = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/lists');
        const imageSlides = response.data
          .filter((item) => item.image) // Filter out items without an image
          .map((item, index) => ({
            key: index,
            content: (
              <img className='border border-black rounded-xl'
                src={`http://localhost:5000/${item.image}`}
                alt={`Slide ${index}`}
                style={{ width: '400px', maxHeight: '400px', objectFit: 'cover' }}
              />
            ),
          }));
        setSlides(imageSlides);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '80%', height: '500px', margin: '0 auto' }}>
      {slides.length > 0 ? (
        <Carousel slides={slides} offsetRadius={2} showNavigation={true} animationConfig={config.gentle} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
