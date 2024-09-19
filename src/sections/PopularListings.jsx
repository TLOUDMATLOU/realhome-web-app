import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { IoChevronForward } from "react-icons/io5";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionTitle from "@/components/SectionTitle";
import PropertiesCarousel from "@/components/PropertiesCarousel";
import { useState } from "react";
import supabase from "@/lib/supabase";



const PopularListings = ({listings, seeMoreButton = true, className=''}) => {

  const [properties, setProperties] = useState([])

  useEffect(() => {
    const fetchProperties = async () => {
      const {data, error} = await supabase.from('properties').select().order('created_at', {ascending: false})
      
      if(error){
        console.log(error)
        setProperties(listings)
        return;
      }

      setProperties(data)

    }

    fetchProperties()
  
  }, [])
  

  return (
    <section className={`text-left my-16 ${className}`}>
    <SectionTitle title="Popular" button={seeMoreButton}/>
      {/* Carousel of Listings */}
      <PropertiesCarousel properties={properties}/>
    </section>
  );
};

export default PopularListings;
