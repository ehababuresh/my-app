import React from 'react';
import '../style/Notification.css';

function Notification({ message, isSuccess }) {
  return (
    <div className={`notification ${isSuccess ? 'success' : 'error'}`}>
      {message}
    </div>
  );
}

export default Notification;
