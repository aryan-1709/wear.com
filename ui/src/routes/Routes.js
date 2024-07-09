import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { CartProvider } from "../Contexts/CartContext";
import { User } from "../Contexts/userContext";
import ProductForm from "../OwnerUI/ProductForm";
import CollectionsPage from "../components/CollectionsPage";
import HeroSection from "../components/HeroSection";
import RecommendedProducts from "../components/RecommendedProducts ";
import CartPage from "../pages/CartPage";
import ProductDescription from "../pages/ProductDescription ";
import Navbar from "../components/Navbar";
import ImageUpload from "../OwnerUI/ImageUpload";
import Login from "../components/Authentication/Login/Login";
import Register from "../components/Authentication/Register/Register";
import ServerErrorPage from "../pages/ServerErrorPage";

const Routers = () => {
  const Divi = () => {
    return (
      <main className="flex-grow flex flex-col">
        <div className="flex-grow-0 flex-shrink-0 h-[450px]">
          <HeroSection />
        </div>
        <div className="flex-grow-0 flex-shrink-0">
          <RecommendedProducts />
        </div>
      </main>
    );
  };

  const CenteredLogin = () => {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{
          backgroundImage: `url('https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Login />
      </div>
    );
  };

  const CenteredRegister = () => {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{
          backgroundImage: `url('https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Register />
      </div>
    );
  };

  return (
    <User>
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route exact path="/login" element={<CenteredLogin />} />
            <Route exact path="/signup" element={<CenteredRegister />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route exact path="/admin" element={<ProductForm />} />
            <Route path="/" element={<Divi />} />
            <Route exact path="/collections" element={<CollectionsPage />} />
            <Route exact path="/cart" element={<CartPage />} />
            <Route exact path="/description" element={<ProductDescription />} />
            <Route exact path="/serverError" element={<ServerErrorPage />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </User>
  );
};
export default Routers;
