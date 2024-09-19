import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import supabase from "@/lib/supabase";
import { toast } from "react-toastify";



function SignUp() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (credentials) => {
    console.log(credentials)
    
    setLoading(true)

    let {data, error} = await supabase.auth.signUp(credentials)

    if(error){
      toast.error(error.message)
      return;
    }

    if(data){
      console.log(data)
      navigate('/confirm-signup')
    }

  }

  return (
    <div className="SignIn px-8 text-left">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="SignIn_form flex flex-col items-center w-full gap-4"
      >
        {/* IMAGE */}
        <img src="/assets/logo192.png" alt="logo" className="h-80 pointer-events-none" />

        <div className="grid gap-4 py-4 w-full max-w-80 -mt-10">
          {/* New Property Form */}
          <div className="flex flex-col gap-4">
            <Label htmlFor="username" className="text-left">
              Username
            </Label>
            <Input
              id="title"
              placeholder="Type your email address"
              className=""
              {...register("email", { required: true })}
            />
            {errors.email && <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">* This field is required</span>}
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="password" className="text-left">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Type your password"
              className=""
              {...register("password", { required: true })}
            />
             {errors.password && <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">* This field is required</span>}
          </div>
          <Button
            type="submit"    
            disabled={isLoading}   
          >
            Sign Up
          </Button>
          <p className="text-gray-500 text-center">
            Already have an account?
            <Link
              to="/signin"
              className="text-gray-900 font-semibold underline"
            >
              {" "}
              Sign In
            </Link>
          </p>
          <p className="text-red-500 text-center text-sm underline">
            forgot password
                      </p>
        </div>

        {/* Submit Button */}
      </form>
    </div>
  );
}

export default SignUp;
