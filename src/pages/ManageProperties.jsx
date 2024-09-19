import Banner from '@/components/Banner'
import NewPropertyFormDialog from '@/components/NewPropertyFormDialog'
import PropertiesTable from '@/components/PropertiesTable'
import SectionTitle from '@/components/SectionTitle'
import supabase from '@/lib/supabase'
import { useAuthStore } from '@/zustand/store'
import React, { useEffect, useState } from 'react'

function ManageProperties() {

  const [properties,setProperties] = useState([]) 
  const agent = useAuthStore((state) => state.agent)
  const fetchAgent = useAuthStore((state) => state.fetchAgent)
  
  useEffect(() => {

    if(!agent){
      fetchAgent()
    }

    const getProperties = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select()
        .eq('agent_id', agent?.id)
        error ? console.error(error) : console.log(data);

        data && setProperties(data) 
      };
      
      getProperties()
      
    }, []);

  return (
    <main className='text-left'>
        <div className="heading">
        <h1 className="greeting text-4xl font-bold text-gray-900 mt-4">
        Manage Your <span className="text-gray-400">Properties</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Manage your listed properties
        </p>
      </div>

      <Banner title={"Create a new listing"}
      text={"Enlist your own private or agency properties with us and reach a greater audience like never before"}
      image="/assets/tower-2.png"  
      >
        <NewPropertyFormDialog />
      </Banner>

      <SectionTitle
        title={"Properties"}
        button={false}
        className="mt-12"
      />
      <PropertiesTable properties={properties} editable className='mb-6'/>

    </main>
  )
}

export default ManageProperties