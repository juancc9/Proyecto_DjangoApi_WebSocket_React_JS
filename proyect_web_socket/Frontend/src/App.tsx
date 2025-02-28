import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IndexPage from "@/pages/index";
import LoginForm from "@/pages/login";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import SensorForm from "@/pages/sensor_humedad";

function App() {
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<LoginForm />} path="/login" />
        <Route element={<SensorForm />} path="/iot/humedad" />
        <Route element={<PricingPage />} path="/pricing" />
        <Route element={<BlogPage />} path="/blog" />
        <Route element={<AboutPage />} path="/about" />
      </Routes>
    </>
  );
}

export default App;
