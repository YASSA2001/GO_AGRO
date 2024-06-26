import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import Spinner from '../../components/Spinner';

const FullNotification = () => {
  const [notification, setNotification] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5000/notifications/details/${id}`)
      .then((res) => {
        setNotification(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]); // Added id to dependency array to refetch data when id changes

  return (
    <div style={styles.container}>
      <div className='flex'>
        <Link
          to="/notification"
          className='bg-green-800 text-white px-4 py-1 rounded-lg w-fit absolute  left-4'
        >
          <BsArrowLeft className='text-2xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.notificationContent}>
          <div style={styles.notificationMessage}>{notification.message}</div>
          <div style={styles.notificationFullMsg}>{notification.fullMsg}</div>
          <button style={styles.notificationButton} onClick={() => { window.location.href = `/reviews/create/${notification._id}`; }}>
            {notification.onClickPath}
          </button>
          <div style={styles.notificationCreateTime}>
            <span style={styles.timeLabel}>Create Time:</span>
            <span style={styles.timeValue}>{new Date(notification.createdAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullNotification;

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',

  },
  notificationContent: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '800px',
    marginTop: '70px',

  },
  notificationMessage: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    marginTop: '10px',
  },
  notificationFullMsg: {
    fontSize: '16px',
    marginBottom: '20px',
    fontWeight: 'normal', // Unbolded
  },
  notificationButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    marginTop: '50px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  notificationCreateTime: {
    marginTop: '30px',
  },
  timeLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  timeValue: {
    marginLeft: '10px',
    fontSize: '16px',
  },
};

