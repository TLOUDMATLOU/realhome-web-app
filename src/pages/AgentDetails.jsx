import PropertiesGrid from "@/components/PropertiesGrid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function AgentDetails() {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get the details of an agent
  useEffect(() => {
    const getAgent = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("agents")
        .select("*, profiles(*), properties(*)")
        .eq("id", `${params.id}`);

      error && console.log(error);
      if (data) {
        console.log(data);
        setAgent(data[0]);
      }
      setLoading(false);
    };

    if (!agent) {
      getAgent();
    }
  }, [agent]);

  return (
    <div className="px-1 my-6 text-left">
      <div className="avatar flex items-center flex-row gap-4">
        <Avatar className="aspect-square md:h-24 md:w-24 h-16 w-16">
          <AvatarImage src={agent?.profiles?.profile_picture} />
          <AvatarFallback>{`${agent?.profiles?.first_name[0]}${agent?.profiles?.last_name[0]}`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-left">
          <h3 className="font-bold text-base md:text-3xl">{`${agent?.profiles?.first_name} ${agent?.profiles?.last_name}`}</h3>
          <p className="text-xs md:text-base">{agent?.agency}</p>
        </div>
      </div>

      {/* PORTFOLIO */}
        <section className="my-4">
         <h1 className="font-bold text-lg md:text-2xl">My Portfolio</h1>
         {agent?.properties?.length == 0 ? (<p className="italic text-center text-gray-400 my-4">No properties available yet</p>) : (
          <>
          <PropertiesGrid listings={agent?.properties} className="mt-4"/>
         </>)}
        </section>



      {/* CONTACT */}

      <section className="my-4">
        <h1 className="font-bold text-lg md:text-2xl">Get in Touch</h1>
        <form action="" className="max-w-md my-4">
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
      </section>
    </div>
  );
}

export default AgentDetails;
