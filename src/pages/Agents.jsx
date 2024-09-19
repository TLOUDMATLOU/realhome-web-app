import AgentCard from '@/components/AgentCard'
import supabase from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Agents() {
  const [agents, setAgents] = useState([])

  // fetch agents ids on load
  useEffect(() => {
    const fetchAgents = async () => {
      const {data, error} = await supabase.from('agents').select('id');

      if(error){
        console.log(error)
        return
      }

      console.log(data)
      setAgents(data)

    } 
  
    fetchAgents()
   
  }, [])
  

  return (
    <main className='my-4'>
        <div className="greeting text-left">
        <h1 className="greeting text-4xl font-bold text-gray-900 mt-4">
          Meet our finest <span className="text-gray-400">Agents</span>
        </h1>
        <p className="text-gray-400 text-sm">
          We will help you find what you are looking for
        </p>
      </div>

      {agents.length == 0 ? (<p className='text-center italic text-gray-400 my-4'>No Agents listed yet.</p>) : (
        <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-4'>
          {agents.map((agent) => <Link key={agent.id} to={`/agents/${agent.id}`}><AgentCard id={agent.id}/></Link>)}
      </section>)}

    </main>
  )
}

export default Agents