import React from 'react';
// import TShirtCustomizer from './components/T-shirt/TShirtCustomizer';
// import TShirt3D from './components/T-shirt/TShirt3D';
// import PreviewImage from './pages/PreviewImage';
// import Payment from './Payment';
// import NewPreview from './pages/NewPreview';
// import PaymentPage from './pages/PaymentPage';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Routers from './routes/Routes';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Routers />
    // <PaymentPage />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals