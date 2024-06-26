import React from 'react';

const DeletePage = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="card1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '20px', padding: '60px', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)', backgroundColor: 'rgba(0, 150, 0, 0.4)' }}>
        <h3 style={{ fontSize: '1.875rem', color: '#dc2626' }}>Your review deleted successfully!</h3>
        <div style={{ display: 'flex' }}>
          <a href="/farmer/:email" style={{ justifyContent: 'center', alignItems: 'center', borderRadius: '8px', padding: '8px 16px', marginRight: '10px', border: '3px solid rgba(255, 255, 255, 0.3)', fontSize: 'large', marginTop: '20px', backgroundColor: '#0fa06bcf', display: 'flex' }}>Back to Home Page</a>
        </div>
      </div>
    </div>
  );
}

export default DeletePage;
