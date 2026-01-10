import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import PlaceOrder from "./Pages/PlaceOrder";
import Orders from "./Pages/Orders";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col font-outfit">
      <ToastContainer />
      <NavBar />
      <div className="flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
