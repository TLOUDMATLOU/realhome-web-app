import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { useForm } from 'react-hook-form'
import { FaRegBuilding } from 'react-icons/fa'

function ContactUs() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm(); 

  return (
    <div className='page my-4 grid  md:grid-cols-2 gap-4'>
         <section className="my-4 text-left">
        <h1 className="font-bold text-lg md:text-4xl">Get in Touch</h1>
        <form action="" className="w-full max-w-md my-4">
          <div className="grid md:grid-cols-1 gap-4 mb-6">
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="email" className="text-left">
                Contact number
              </Label>
              <Input
                id="contact"
                placeholder="Your cell number"
                className=""
                {...register("contact", { required: true })}
              />
              {errors.contact && (
                <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
                  * This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                type="email"
                
                id="email"
                placeholder="bruce@wayne.com"
                className=""
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
                  * This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="message" className="text-left">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type in your message here"
                className=""
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
                  * This field is required
                </span>
              )}
            </div>
          </div>
          <Button type="submit">Send</Button>
        </form>

              <div className="mt-8 space-y-6 text-gray-500">
                <div className="email flex gap-4 items-center">
                <MdOutlineMail size={24}/>
                <a href='mailto:info@realcom.com' className="text-gray-500">info@realhome.com</a>
                </div>
                <div className="phone flex gap-4 items-center">
                <MdOutlinePhone />
                <p className="text-gray-500">012 584 3658</p>
                </div>
                <div className="address flex gap-4 items-center">
                <FaRegBuilding />

                    <address>
                        31 Bendor Drive, Polokwane
                        ZA
                    </address>
                </div>

              </div>

      </section>
      <img 
      className='hidden md:block object-cover object-center rounded-lg h-full filter brightness-75'
      src="https://images.pexels.com/photos/920025/pexels-photo-920025.jpeg?cs=srgb&dl=pexels-kevinmenajang-920025.jpg&fm=jpg&w=1280&h=1920" alt="" />
    </div>
  )
}

export default ContactUs