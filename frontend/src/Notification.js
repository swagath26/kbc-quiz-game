import React, { useEffect } from 'react';

const Notification = ({ notification, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div style={{maxWidth: '15em', fontSize: '19px', fontWeight: '500', backgroundColor: '#004400', color: '#eeeeee', position: 'absolute', top: '80vh', right: '3em', padding: '1em 2em', borderRadius: '20px', textAlign: 'center'}}>
        {notification}
    </div>
  );
};

export default Notification;