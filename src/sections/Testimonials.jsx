import SectionTitle from '@/components/SectionTitle'
import TestimonialCard from '@/components/TestimonialCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from '@/components/ui/carousel';
import React from 'react'


// Sample Testimonials
const testimonials = [
    {
        id: 1,
        image: "https://images.pexels.com/photos/2232981/pexels-photo-2232981.jpeg?cs=srgb&dl=pexels-bharatkuiper-2232981.jpg&fm=jpg&w=640&h=960",
        name: "John Doe",
        testimony: "I had an excellent experience working with this real estate agency. Their team was professional, responsive, and helped me find my dream home.",
        status: "Buyer"
    },
    {
        id: 2,
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=pexels-olly-774909.jpg&fm=jpg&w=640&h=960",
        name: "Jane Smith",
        testimony: "Selling my property was stress-free thanks to this agency. They marketed it effectively, negotiated well, and got me a great deal.",
        status: "Seller"
    },
    {
        id: 3,
        image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?cs=srgb&dl=pexels-creationhill-1681010.jpg&fm=jpg&w=640&h=960",
        name: "Michael Johnson",
        testimony: "As an investor, I appreciate their market insights and strategic advice. They helped me make informed decisions and maximize my returns.",
        status: "Investor"
    }
];


const Testimonials = () => {
  return (
    <section>
        <SectionTitle title="What Our Customers Say About Us" button={false}/>
        <Carousel>
        <CarouselContent className="-mr-4">
          {/* Loop Over Each Listing */}
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pr-4 basis-auto cursor-pointer w-full md:w-auto ">
            <TestimonialCard testimonial={testimonial}/>
          </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="hidden md:flex"/>
      </Carousel>
        
    </section>
  )
}

export default Testimonials 