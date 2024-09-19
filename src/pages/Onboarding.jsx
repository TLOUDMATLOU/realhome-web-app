import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import AgentForm from "@/components/AgentForm";
import { useNavigate } from "react-router-dom";


function Onboarding() {

  const navigate = useNavigate();
  const [api, setApi] = React.useState()
  const [formDisabled, setFormDisabled] = useState(false)

  React.useEffect(() => {
    if (!api) {
      return
    }
 
    api.on("select", () => {
      // Do something on select.
    })
  }, [api])


  return (
    <div className="onboarding">
      <Carousel setApi={setApi} className="w-full h-full flex flex-col justify-center">
        <CarouselContent>
            <CarouselItem className='grid sm:grid-cols-2 gap-8 relative' >
              <img className="hidden sm:flex rounded-lg" src="https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?cs=srgb&dl=pexels-pixabay-462235.jpg&fm=jpg&w=1280&h=1920" alt="" srcset="" />
                <ProfileForm disabled={formDisabled}/>
                <Button onClick={() => {api && api.scrollNext(); setFormDisabled(true)}} variant="outline" className="absolute bottom-0 right-0 flex items-center gap-4">Next <FaArrowRight />
                </Button>
            </CarouselItem>
            {/* Agent Form */}
            <CarouselItem className='grid sm:grid-cols-2 gap-8 relative' >
              <img className="hidden sm:flex rounded-lg h-full" src="https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?cs=srgb&dl=pexels-kathekth-3049121.jpg&fm=jpg&w=1920&h=2560" alt="" srcset="" />
                <AgentForm />
                <Button onClick={() => {navigate('/dashboard')}} variant="outline" className="absolute bottom-0 right-0 flex items-center gap-4">Done <FaCheck/>
                </Button>
            </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Onboarding;
