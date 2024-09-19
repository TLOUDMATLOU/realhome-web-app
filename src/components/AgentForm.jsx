import React, { useState } from "react";
import { Button } from "./ui/button";
import { ThreeDots } from "react-loader-spinner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/zustand/store";
import supabase from "@/lib/supabase";
import { toast } from "react-toastify";

function AgentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setLoading] = useState(false);
  const [isFormSuccess, setFormSuccess] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setAgent = useAuthStore((state) => state.setAgent);

  const onSubmit = async (formData) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("agents")
      .upsert({ profile_id: user.id, ...formData })
      .select();

      if(error){
        toast.success('Failed to create agent account: ' + error.message)
        return;
    }
    setAgent(data[0])
    toast.success('Agent created successfully 🏡')
    setFormSuccess(true)

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-left">
      <h1 className="font-bold text-4xl">Create An Agent Account</h1>
      <Separator className="my-4" />

      <h2 className="font-bold text-2xl mb-4">Agent Details</h2>

      <div className="grid md:grid-cols-1 gap-4 mb-6">
        <div className="flex flex-col gap-4 ">
          <Label htmlFor="first name" className="text-left">
            Agency
          </Label>
          <Input
            id="agency"
            placeholder="National Real Estate"
            className=""
            {...register("agency", { required: true })}
          />
          {errors.agency && (
            <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
              * This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col gap-4 ">
          <Label htmlFor="years of experience" className="text-left">
            Years of experience
          </Label>
          <Input
            type="number"
            min="0"
            max="99"
            id="years_of_experience"
            placeholder="3"
            className=""
            {...register("years_of_experience", { required: true })}
          />
          {errors.years_of_experience && (
            <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
              * This field is required
            </span>
          )}
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className={`${isFormSuccess && 'bg-green-800'}`}>
        {isLoading ? (
          <ThreeDots
            visible={true}
            width={80}
            color="#fff"
            radius="2"
            ariaLabel="three-dots-loading"
          />
        ) : isFormSuccess ? "Agent Account Created" : (
          "Create Agent Account"
        )}
      </Button>
    </form>
  );
}

export default AgentForm;
