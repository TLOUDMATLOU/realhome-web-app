import React, { Children } from "react";
import { useMediaQuery } from "react-responsive";


function Banner({
  title,
  text,
  image = "/assets/tower-2.png",
  bgColor = "bg-gray-100",
  children,
  className = "",
  imageStyle = "",
}) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div
      className={`banner h-[300px] mt-8 bg-gray-100 rounded-lg relative flex flex-col justify-center px-6 text-left ${className}`}
    >
      <div className="banner-content md:w-1/2 space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
        <p className="">{text}</p>
        {/* -------------------------------------------------------------------------------------- */}
        <div className="">{children}</div>
        {/* -------------------------------------------------------------------------------------- */}
      </div>
      {!isMobile && (<img
        src={image}
        alt="banner Image"
        className={`hidden sm:block sm:max-w-lg md:max-w-max absolute bottom-0 -right-10 sm:right-0 ${imageStyle}`}
      />)}
    </div>
  );
}

export default Banner;
