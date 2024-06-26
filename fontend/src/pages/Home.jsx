import React from 'react'
import { ImageSlider } from '../components/ImageSlider'
import './Home.css'
import { NavBar2 } from '../components/navbar/NavBar2'

import { PaddyList } from '../components/Paddy List/PaddyList'
import { ImageSwiper2 } from '../components/image swiper/ImageSwiper2'


export const Home = () => {
  return (
    <>
      <NavBar2 />

      <div className="m-2" >
      <ImageSlider />
      </div>

     <div className='mb-5'>
     <ImageSwiper2/>
     </div>

      
      <div className="content">

        <PaddyList/>
       
        <div className='description-item'>
          
          <h1>About Our Paddy Sales Management System</h1>
          <p>Our Paddy Sales Management System serves as a vital tool in the heart of Sri Lanka's agriculture sector, particularly in the realm of rice production. Designed to streamline and optimize the intricate process of paddy sales, our system caters to the needs of key stakeholders: mill owners, shop owners, and farmers.</p>
          <h1>Empowering Sri Lankan Agriculture</h1>
          <p>In the vibrant tapestry of Sri Lankan agriculture, rice holds a position of unparalleled significance. As the staple food of the nation, rice cultivation plays a pivotal role in sustaining livelihoods and ensuring food security. Our system recognizes this importance and steps forward to enhance the efficiency and effectiveness of the rice production cycle.</p>
          <h1>Facilitating Collaboration</h1>
          <p>At its core, our system fosters collaboration among stakeholders, bringing mill owners, shop owners, and farmers onto a unified platform. By facilitating seamless communication and coordination, it ensures that every aspect of the paddy sales process flows smoothly, from cultivation to consumption.</p>
          <h1>A Bridge Between Tradition and Technology</h1>
          <p>In a landscape where tradition meets innovation, our system serves as a bridge, leveraging cutting-edge technology to augment age-old agricultural practices. Through intuitive interfaces and advanced functionalities, it empowers stakeholders to navigate the complexities of modern market dynamics while staying rooted in traditional farming wisdom.</p>
          <h1>Driving Growth and Sustainability</h1>
          <p>By harnessing the power of data analytics and real-time insights, our system enables informed decision-making, driving growth and sustainability across the agricultural value chain. Whether it's optimizing yield, managing inventory, or fostering fair trade practices, our system stands as a beacon of progress in Sri Lanka's agricultural landscape.</p>
          <h1>Together Towards a Prosperous Future</h1>
          <p>As Sri Lanka embarks on a journey towards agricultural prosperity, our Paddy Sales Management System stands ready to journey alongside, supporting and empowering stakeholders every step of the way. Together, let us cultivate a future where the fields flourish, the markets thrive, and the spirit of Sri Lankan agriculture continues to flourish.</p>

         
        </div>
      </div>
      <footer className="footer">
            &copy; 2024 GO AGRO. All Rights Reserved.
          </footer>
    </>
  )
}

