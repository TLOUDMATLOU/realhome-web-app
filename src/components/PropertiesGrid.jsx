/* eslint-disable react/prop-types */
import React from 'react'
import PropertyCard from './PropertyCard'

function PropertiesGrid({listings = [], className=''}) {
    console.log("GRID LISTINGS:", listings )
  return (
    <main className={`${className}`}>
        {listings.length == 0 && <h1>No Properties Available</h1>}
        
        {/* DISPLAY ALL PROPERTIES */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 md:justify-between">
         {
            listings.map((property) => (<PropertyCard key={property.id} property={property}/>))
         }   
        </div>
    </main>
  )
}

export default PropertiesGrid