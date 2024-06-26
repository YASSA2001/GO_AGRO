import React from 'react';
import { Link } from 'react-router-dom';
import { BsCheckCircle } from 'react-icons/bs';
import { MillOwner } from '../Mill owner Managment/MillOwner';
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'

const SubmitPage = () => {

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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '20px', padding: '60px', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)', backgroundColor: 'rgba(0, 150, 0, 0.4)' }}>
          <div className="title-container" style={{ display: 'flex', alignItems: 'center' }}>
            <BsCheckCircle className="icon" style={{ marginBottom: '40px', marginLeft: '4px', fontSize: '22px', color: '#1b8b35' }} />
            <h3 className="title" style={{ fontSize: '1.3rem', marginBottom: '40px', marginLeft: '4px', color: '#0d2511', fontWeight: 'bold' }}>Review Submitted </h3>
          </div>
          <h4 className="sub-title" style={{ fontSize: '15px', marginBottom: '20px', color: '#0d2511' }}>
            Thank You for your kind feedback!
            Your insights will help <br /> other users make informed purchases.
          </h4>
          <div className="btn-container" style={{ display: 'flex' }}>
            <a href="/" className="btn btn-primary-h" style={{ marginTop: '20px', backgroundColor: '#0fa06bcf', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', padding: '8px 16px', marginRight: '10px', border: '3px solid rgba(255, 255, 255, 0.3)', fontSize: 'large' }}>Home</a>
            <Link to={`/reviews/show/${MillOwner.name}`} className="btn btn-primary-r" style={{ marginTop: '20px', backgroundColor: '#0ecddbcf', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', padding: '8px 16px', marginRight: '0', border: '3px solid rgba(255, 255, 255, 0.3)', fontSize: 'large' }}>Check My Reviews</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmitPage;