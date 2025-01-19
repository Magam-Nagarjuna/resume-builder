import React from 'react';

interface AlertProps {
  message: string;
  type?: 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, type = 'error' }) => {
  const alertStyles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`p-4 rounded ${alertStyles[type]}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;
