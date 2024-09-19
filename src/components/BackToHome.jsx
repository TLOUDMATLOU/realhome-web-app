import React from 'react'
import { Button } from './ui/button'
import { PiHouseSimple } from 'react-icons/pi'
import { Link } from 'react-router-dom'

function BackToHome() {
  return (
    <Link to={'/'}>
            <Button className="text-lg mt-6"> 
                <PiHouseSimple className="mr-3"/> Go Home
            </Button>
        </Link>
  )
}

export default BackToHome