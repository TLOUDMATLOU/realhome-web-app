import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionTitle from "@/components/SectionTitle";
import supabase from "@/lib/supabase";



const LatestListings = ({listings}) => {

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
    <section className="text-left md:my-16 my-8">
      <SectionTitle title={"Latest Properties"} onButtonClick={() => navigate('/properties')}/>
      {/* Carousel of Listings */}
      <Carousel>
        <CarouselContent className="-mr-4">
          {/* Loop Over Each Listing */}
          {properties.map((property) => (
            <CarouselItem key={property.id} className="pr-4 basis-auto cursor-pointer">
            <PropertyCard property={property} />
          </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex ml-2"/>
        <CarouselNext className="hidden md:flex mr-2"/>
      </Carousel>
    </section>
  );
};

export default LatestListings;
