import React, { useEffect } from 'react';

const ActionConfirmationMessage = ({ message, show, onClose, colour }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down`}>
      {message}
    </div>
  );
};

export default ActionConfirmationMessage;
