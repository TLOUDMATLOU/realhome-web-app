import React from 'react'
import { Button } from './ui/button'
import { IoChevronForward } from 'react-icons/io5'

const SectionTitle = ({title, button=true, buttonText="See More", onButtonClick=null ,className=''}) => {

  const handleClick = () => {
    if (onButtonClick != null){
      onButtonClick()
    }
  }

  return (
    <div className={`wrapper mb-6 flex items-center justify-between ${className}`}>
    <h1 className="text-2xl md:text-3xl font-bold w-[300px] text-left">{title}</h1>
    {button && (<Button onClick={handleClick}
     className="flex items-center gap-2 border-2 bg-transparent text-black hover:text-white">
      {buttonText} <IoChevronForward />
    </Button>)}
  </div>
  )
}

export default SectionTitle