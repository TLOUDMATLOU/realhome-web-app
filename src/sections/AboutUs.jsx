import SectionTitle from "@/components/SectionTitle";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { PiHouseSimple } from "react-icons/pi";
import { TbPigMoney } from "react-icons/tb";
import { GiGlassBall } from "react-icons/gi";
import { PiNeedle } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="about-us md:my-24 flex items-center text-left">
      <div className="hidden left flex-1 md:flex items-center gap-10">

        <img src="https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?cs=srgb&dl=pexels-falling4utah-1080696.jpg&fm=jpg&w=640&h=960" alt="" 
        className="h-[400px] w-[200px] object-cover"
        />
        
        <img src="https://images.pexels.com/photos/3639540/pexels-photo-3639540.jpeg?cs=srgb&dl=pexels-lina-3639540.jpg&fm=jpg&w=640&h=960" alt="" 
        className="h-[400px] w-[200px] object-cover -mt-12"
        />

      </div>

      <div className="right flex-1">
        <PiHouseSimple className="aspect-square text-4xl mb-2" />
        <SectionTitle
          button={false}
          title={"Comfort is our top priority for you"}
        />
        <p className="text-balance mb-8 text-gray-600 leading-8">
          We’re your trusted partners in finding your dream home, selling your
          property, or making savvy investment decisions. Our team of
          experienced professionals is committed to providing personalized
          service, market expertise, and unwavering support throughout your real
          estate journey.
        </p>
        <div className="why-us grid grid-cols-2 gap-6 mb-8">
          <p className="uppercase font-extrabold text-[10px] flex items-center gap-2">
            <PiHouseSimple size={16}/>
            Local Knowledge
          </p>
          <p className="uppercase font-extrabold text-[10px] flex items-center gap-2">
            <PiNeedle  size={16}/>
            Tailored Solutions
          </p>
          <p className="uppercase font-extrabold text-[10px] flex items-center gap-2">
            <GiGlassBall size={16}/>
            Transparency
          </p>
          <p className="uppercase font-extrabold text-[10px] flex items-center gap-2">
            <TbPigMoney size={16}/>
            Results-Driven
          </p>
        </div>
        <Link to="/properties">
        <Button>Explore Properties</Button>
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
