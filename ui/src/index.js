import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProductForm from './OwnerUI/ProductForm';
import Mess from './OwnerUI/Mess'
import ImageUploader from './OwnerUI/ImageUploader ';
import 'react-toastify/dist/ReactToastify.css';
// import ImageUploader from './OwnerUI/ImageUploader ';
import CardComponent from './CardComponent'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductForm />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals