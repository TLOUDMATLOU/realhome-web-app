import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import PropertyCard from './PropertyCard'

function PropertiesCarousel({properties=[]}) {
  return (
    <Carousel>
        <CarouselContent className="-mr-4">
          {/* Loop Over Each Listing */}
          {properties.map((property) => (
            <CarouselItem key={property.id} className="pr-4 basis-auto cursor-pointer">
            <PropertyCard property={property} />
          </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex"/>
        <CarouselNext className="hidden md:flex"/>
      </Carousel>
  )
}

export default PropertiesCarousel