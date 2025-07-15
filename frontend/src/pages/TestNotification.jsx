import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useNotification } from '../components/ui/Notification';

function Test() {
  const { showNotification, NotificationContainer } = useNotification();

  const handleAddToCart = () => {
    showNotification('Item added to cart!', 'success');
  };

  const handleError = () => {
    showNotification('Something went wrong!', 'error');
  };

  const handleWarning = () => {
    showNotification('Stock is running low!', 'warning');
  };

  const handleInfo = () => {
    showNotification('New features available!', 'info');
  };

  return (
    <div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleError}>Show Error</button>
      <button onClick={handleWarning}>Show Warning</button>
      <button onClick={handleInfo}>Show Info</button>

      <NotificationContainer />
    </div>
  );
}
function AAAPage() {

  return (
     <Test/>
  );
}

export default AAAPage;
