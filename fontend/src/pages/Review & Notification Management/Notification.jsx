import React, { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link, useParams } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const {name} = useParams()

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/notifications/detailsByName/${name}`)
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setNotificationToDelete(id);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    // Call API to delete the notification
    axios.delete(`http://localhost:5000/notifications/${notificationToDelete}`)
      .then(() => {
        // Filter out the deleted notification
        setNotifications(notifications.filter(notification => notification._id !== notificationToDelete));
        setShowPopup(false);
      })
      .catch(error => {
        console.log(error);
        setShowPopup(false);
      });
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

      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', color: '#28a745', marginBottom: '20px', marginTop: '60px' }}>My Notification</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {notifications.map((notification, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', border: '1px solid #d3d3d3', backgroundColor: 'rgb(210, 219, 210)', padding: '10px', borderRadius: '7px' }}>
                <div style={{ flex: '1' }}>{notification.message}</div>

                {notification.onClickPath && (
                  <div style={{ color: '#11b239', marginRight: '50px', fontSize: 'large' }}>
                    <Link to={`/reviews/create/${notification.ordernumber}`} style={{ color: 'inherit', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>
                      {notification.onClickPath}
                    </Link>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button style={{ cursor: 'pointer', borderRadius: '20px', padding: '8px 12px', border: '1px solid #11b239' }}>
                    <Link to={`/notifications/details/${notification._id}`} style={{ color: 'inherit', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>
                      View Full Notification
                    </Link>
                  </button>
                  <button style={{ cursor: 'pointer', borderRadius: '20px', padding: '8px 12px', color: '#f30b2e', border: '1px solid #c50f0f', marginLeft: '10px', ':hover': { textDecoration: 'underline' } }} onClick={() => handleDelete(notification._id)}>
                    Delete Notification
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {showPopup && (
          <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', textAlign: 'center' }}>
              <p>Are you sure you want to delete this notification?</p>
              <div style={{ marginTop: '20px' }}>
                <button style={{ color: 'rgb(20, 18, 18)', padding: '3px 10px', border: '2px solid red', borderRadius: '8px', marginRight: '10px' }} onClick={confirmDelete}>Yes</button>
                <button style={{ color: 'rgb(20, 18, 18)', padding: '3px 10px', border: '2px solid rgb(37, 34, 34)', borderRadius: '8px' }} onClick={() => setShowPopup(false)}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;