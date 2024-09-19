import supabase from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Circles } from 'react-loader-spinner'
import { toast } from 'react-toastify';


function AgentCard({id}) {

    const [agent, setAgent] = useState(null)
    const [loading, setLoading] = useState(true)

// Get the details of an agent
useEffect(() => {

    const getAgent = async () => {
        setLoading(true)
        const {data, error} = await supabase
        .from("agents")
        .select('*, profiles(*)')
        .eq('id', `${id}`)

        error && console.log(error)
        if (data){
            console.log(data)
            setAgent(data[0])
        } 
        setLoading(false)

    }

    if (id !== undefined) {getAgent()}

}, [id])


function handleSubmit(e){
    e.preventDefault();
    toast.success(`message sent! ${agent.first_name} will contact you shortly.`)
    
}



  return loading ? (
    <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  ) : (
    <div className='bg-gray-100 rounded-lg p-3 cursor-pointer'>
      <div className="avatar flex items-center sm:flex-row flex-col gap-4">
        {/* Agent Title Bar */}
        <Avatar className="aspect-square md:h-24 md:w-24 h-16 w-16">
          <AvatarImage src={agent?.profiles?.profile_picture} />
          <AvatarFallback>{`${agent?.profiles?.first_name[0]}${agent?.profiles?.last_name[0]}`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h3 className="font-bold text-base md:text-xl">{`${agent?.profiles?.first_name} ${agent?.profiles?.last_name}`}</h3>
          <p className='text-xs md:text-base'>{agent.agency}</p>
        </div>
      </div>
    </div>
  );
}

export default AgentCard