import React from 'react'
import Amenity from './Amenity'
import { IoBedSharp } from 'react-icons/io5'
import { SlSizeFullscreen } from 'react-icons/sl'
import { FaSwimmingPool } from 'react-icons/fa'
import { PiGarageFill, PiPottedPlant } from 'react-icons/pi'
import { LucideBath } from 'lucide-react'

function Amenities({property}) {
  return (
    <section className="amenities-grid grid grid-cols-3 gap-4 w-full md:w-[500px] ">
            <Amenity title='Bedrooms' text={property?.bedrooms} icon={<IoBedSharp />}/>
            <Amenity title='Bathrooms' text={property?.bathrooms} icon={<LucideBath />}/>
            <Amenity title='Square Meters' text={property?.square_meters} icon={<SlSizeFullscreen />}/>
            {property?.swimming_pool && <Amenity title='Swimming Pool' icon={<FaSwimmingPool />}/>}
            {property?.garden && <Amenity title='Garden' icon={<PiPottedPlant />}/>}
            {property?.garage && <Amenity title='Garage' icon={<PiGarageFill />}/>}
          </section>
  )
}

export default Amenities