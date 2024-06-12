import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import RecommendedProducts from "./components/RecommendedProducts ";
import CollectionsPage from "./components/CollectionsPage";
import CartPage from "./pages/CartPage";
import ProductDescription from "./pages/ProductDescription ";
import { CartProvider } from "./pages/CartContext";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const Divi = () => {
    return (
      <main className="flex-grow flex flex-col">
        <div className="flex-grow-0 flex-shrink-0 h-[450px]" >
          <HeroSection />
        </div>
        <div className="flex-grow-0 flex-shrink-0">
          <RecommendedProducts />
        </div>
      </main>
    );
  };

  return (
    <CartProvider>
      <Router className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Divi />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/description" element={<ProductDescription />} />
        </Routes>
        {/* <ProductDescription /> */}
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
