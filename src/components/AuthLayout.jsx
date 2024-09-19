import Footer from "@/sections/Footer";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function AuthLayout() {
  return (
    <div>
      {/* NAV */}
      <nav className="navbar flex justify-between items-center">
    <Link to={'/'}>
    <h1 className="font-extrabold text-left line">REAL HOME 
      <br /> 
    <span className="font-light text-sm">Real Estate</span>
    </h1>
    </Link>
    <ul className="navbar-links flex gap-8">
      <li><Link>Home</Link></li>
      <li><Link to="properties">Properties</Link></li>
      <li><Link to="agents">Our Agents</Link></li>
      <li><Link to="contact">Contact Us</Link></li>
    </ul>

  </nav>

      {/* PAGES */}
      <Outlet />

      {/* FOOTER */}
      <Footer />
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
        theme="light"
        transition="Bounce"
      />
    </div>
  );
}

export default AuthLayout;
