import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { CartProvider } from "../controllers/CartContext";
import ProductForm from "../OwnerUI/ProductForm";
import CollectionsPage from "../components/CollectionsPage";
import HeroSection from "../components/HeroSection";
import RecommendedProducts from "../components/RecommendedProducts ";
import CartPage from "../pages/CartPage";
import ProductDescription from "../pages/ProductDescription ";
import Navbar from "../components/Navbar";
import ImageUpload from "../OwnerUI/ImageUpload";

const Routers = ()=> {
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

    return(
        <CartProvider>
            <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path="/upload" element={<ImageUpload />} />
                    <Route exact path="/admin" element={<ProductForm />}/>
                    <Route path="/" element={<Divi />} />
                    <Route path="/collections" element={<CollectionsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/description" element={<ProductDescription />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}
export default Routers;