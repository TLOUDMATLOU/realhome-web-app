import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "react-toastify";
import supabase from "@/lib/supabase";
import { ThreeDots } from "react-loader-spinner";
import { useAuthStore } from "@/zustand/store";

function ProfileForm({disabled=false}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user)
  const setProfile = useAuthStore((state) => state.setProfile)

  const onSubmit = async (formData) => {
    // start loading animation
    setLoading(true)

    // Upload the image and return the url to be recorded into the db
    const imagePicker = document.getElementById("imagePicker");
    const file = imagePicker.files[0] ?? null;
    const { data, error } = await supabase.storage
      .from("pictures")
      .upload(`public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      toast.error("Something went wrong: " + error.message);
      setLoading(false);
      return;
    }

    const imagePath = data.path;
   
    // record the full record into the profiles table
    const {
      data: { publicUrl },
    } = supabase.storage.from("pictures").getPublicUrl(imagePath);

    const recordData = { id: user.user.id,...formData, profile_picture: publicUrl };
    console.log(recordData);

    try {
      const { data, error } = await supabase
  .from('profiles')
  .upsert(recordData)
  .select()

  if(error){
    toast.error("Failed to update profile: " + error.message)
    return;
  }
  
  setProfile(data)

    } catch (error) {
      
    }

    // Stop Loading
    setLoading(false)
    toast.info("Profile updated successfully.")

  };

  const handleFileSelect = (event) => {
    const imagePicker = document.getElementById("imagePicker");
    const file = imagePicker.files[0] ?? null;
    console.log(file);

    const reader = new FileReader();
    reader.onload = function (e) {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file)
    console.log(previewImage)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-left px-1">
      <h1 className="font-bold text-4xl">Profile</h1>
      <Separator className="my-4" />

      <h2 className="font-bold text-2xl mb-4">Personal Details</h2>

      <div className="mb-6">
        <Label htmlFor="imagePicker" className="flex gap-6 items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={previewImage}
              className="object-cover object-center"
            />
            <AvatarFallback>RH</AvatarFallback>
          </Avatar>
          <p className="text-lg">Upload a profile picture</p>
        </Label>
        <Input
          id="imagePicker"
          name="imagePicker"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileSelect}
          disabled={disabled}
        />
      </div>

      {/* NAMES */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-4 ">
          <Label htmlFor="first name" className="text-left">
            First Name
          </Label>
          <Input
          disabled={disabled}
            id="first_name"
            placeholder="Bruce"
            className=""
            {...register("first_name", { required: true })}
          />
          {errors.first_name && (
            <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
              * This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col gap-4 ">
          <Label htmlFor="last name" className="text-left">
            Last Name
          </Label>
          <Input
          disabled={disabled}
            id="first_name"
            placeholder="Wayne"
            className=""
            {...register("last_name", { required: true })}
          />
          {errors.last_name && (
            <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
              * This field is required
            </span>
          )}
        </div>
      </div>

      {/* Contacts */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-4 ">
          <Label htmlFor="Contact No" className="text-left">
            Phone
          </Label>
          <Input
          disabled={disabled}
            id="phone"
            placeholder="0875451258"
            className=""
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
              * This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col gap-4 ">
          <Label htmlFor="email" className="text-left">
            Email Address
          </Label>
          <Input
          disabled={disabled}
            // disabled
            id="email"
            placeholder="brucewayne@wayne-enterprise.co.za"
            className=""
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
              * This field is required
            </span>
          )}
        </div>
      </div>
      <Button type="submit" disabled={isLoading}>{isLoading ? (<ThreeDots
  visible={true}
  width={80}

  color="#fff"
  radius="2"
  ariaLabel="three-dots-loading"
  />) : 'Create Profile'}</Button>
    </form>
  );
}

export default ProfileForm;
