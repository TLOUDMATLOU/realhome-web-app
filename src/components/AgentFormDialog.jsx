import React, { useEffect, useState } from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/zustand/store'
import { ThreeDots } from 'react-loader-spinner'
import supabase from '@/lib/supabase'
import { toast } from 'react-toastify'

function AgentFormDialog() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setLoading] = useState(false);
  const [isFormSuccess, setFormSuccess] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setAgent = useAuthStore((state) => state.setAgent);
  const fetchUser = useAuthStore((state) => state.fetchUser)

  useEffect(() => {
    fetchUser()
  }, [])
  

  const onSubmit = async (formData) => {
    setLoading(true);

    console.log(user)

    const { data, error } = await supabase
      .from("agents")
      .upsert({ profile_id: user.id, ...formData })
      .select();

      if(error){
        console.log(error)
        toast.success('Failed to create agent account: ' + error.message)
        setLoading(false);
        return;
    }
    setAgent(data[0])
    toast.success('Agent created successfully 🏡')
    setFormSuccess(true)
    setLoading(false);

  };

  return (
    <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Become An Agent</DialogTitle>
                <DialogDescription>
                  Create your agent account.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Agency
                  </Label>
                  <Input id="agency" placeholder="Private" className="col-span-3" {...register('agency', {required: true})}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Years of Experience
                  </Label>
                  <Input
                    id="years_of_experience"
                    placeholder="4"
                    className="col-span-3"
                    {...register('years_of_experience', {required: true})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading || isFormSuccess} >
                  {isLoading ?  <ThreeDots
            visible={true}
            width={80}
            color="#fff"
            radius="2"
            ariaLabel="three-dots-loading"
          /> : isFormSuccess ? "Agent Account Created" : "Create Agent Account"}
                </Button>
              </DialogFooter>
    </form>
            </DialogContent>
  )
}

export default AgentFormDialog