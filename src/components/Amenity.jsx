import React from 'react'

function Amenity({icon, title, text}) {
  return (
    <div>
        {text && <h4 className="font-bold mb-1">{title}</h4>}
        <div className="flex items-center gap-4">
            {icon} 
            {text ? <p>{text}</p> : <h4 className="font-bold mb-1">{title}</h4>}
        </div>
    </div>
  )
}

export default Amenity