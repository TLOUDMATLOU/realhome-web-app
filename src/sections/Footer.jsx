import React from "react";


const Footer = () => {

  return (
<>
    <footer className={` grid md:grid-cols-4 grid-cols-2  gap-8 justify-between text-left`}>
      {/* BRANDING ------------------------------------------------------- */}
      <div className="Branding">
        <h1 className="font-extrabold text-left line mb-4">
          REAL HOME
          <br />
          <span className="font-light text-sm">Real Estate</span>
        </h1>
        <p className="text-sm text-gray-500">
          RealHome is a Service Provider Site For Finding The Best Places To
          Live On The Planet
        </p>
      </div>

    {/* OUR SERVICES --------------------------------------------------------*/}
    <div className="our-services flex flex-col">
        <h3 className="font-extrabold mb-4 text-lg">Our Services</h3>
        <ul className="wrapper flex flex-col space-y-2 text-gray-600 tracking-wider font-light">
           <li>Buy</li>
           <li>Sell</li>
           <li>Rent</li> 
        </ul>
    </div>

    {/* Company --------------------------------------------------------*/}
    <div className="our-services flex flex-col">
        <h3 className="font-extrabold mb-4 text-lg">Company</h3>
        <ul className="wrapper flex flex-col space-y-2 text-gray-600 tracking-wider font-light">
           <li>About Us</li>
           <li>Our Agents</li>
           <li>FAQ</li> 
        </ul>
    </div>

{/* Contact --------------------------------------------------------*/}
<div className="our-services flex flex-col">
        <h3 className="font-extrabold mb-4 text-lg">Get In Touch</h3>
        <ul className="wrapper flex flex-col space-y-2 text-gray-600 tracking-wider font-light">
           <li><a href="mailto:info@realhome.com">info@realhome.com</a></li>
           <li><address>31 Bendor Drive, Polokwane ZA</address></li> 
        </ul>
    </div>
    </footer>
        <hr className="my-8 block"/>
    <p className="copyright text-center">&copy; 2024 RealHome All Rights Reserved.</p>
    </>
  );
};

export default Footer;
