import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "./ui/switch";
import { toast } from "react-toastify";
import { useAuthStore } from "@/zustand/store";
import supabase from "@/lib/supabase";
import { ThreeDots } from "react-loader-spinner";

function NewPropertyFormDialog() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [previewImages, setPreviewImages] = useState([]);
  const [coverImgIndex, setCoverImgIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const agent = useAuthStore((state) => state.agent);
  const fetchAgent = useAuthStore((state) => state.fetchAgent);

  // Fetch Agent details when page loads
  useEffect(() => {
    if (!agent) {
      fetchAgent();
    }
  }, []);

  const onSubmit = async (formdata) => {
    setLoading(true);
    const imagePicker = document.getElementById("imagePicker");
    const files = imagePicker.files;
    // upload images and get urls
    const images = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const { data, error } = await supabase.storage
        .from("pictures")
        .upload(`public/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        toast.error(
          `Something went wrong uploading ${file.name}: ` + error.message
        );
        setLoading(false);
        return;
      }

      const imagePath = data.path;

      // record the full record into the profiles table
      const {
        data: { publicUrl },
      } = supabase.storage.from("pictures").getPublicUrl(imagePath);
      //add the public url to the images array
      images.push(publicUrl);
    }

    const recordData = { agent_id: agent.id,images: images,cover_img: images[coverImgIndex], ...formdata }
    console.log(recordData);
    
    // Writ to the database
    const {data, error} = await supabase.from('properties').insert(recordData).select()
    if (error) {
      toast.error('Failed to create new property')
      console.log(error)
      setLoading(false);
      return;
    } else {
      toast.success('Property listing created successfully')
    }
    setLoading(false);
  };

  const handleFileSelect = (event) => {
    const imagePicker = event.target;
    const files = imagePicker.files;

    // Clear any existing preview images
    setPreviewImages([]);

    if (!files.length) {
      toast.info("No files selected");
      return;
    } // Handle no files selected gracefully

    const previewImages = []; // Array to store preview URLs
    const allowedMimeTypes = ["image/jpeg", "image/png"]; // Allowed image types

    // Loop through selected files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file type
      if (!allowedMimeTypes.includes(file.type)) {
        toast.warn(`Invalid file type: ${file.name}`);
        console.error(`Invalid file type: ${file.name}`);
        continue; // Skip to next file if invalid type
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.push(e.target.result);
        setPreviewImages(previewImages); // Update preview state after all files are processed
      };
      reader.readAsDataURL(file); // Read the file into a data URL for preview
    }
    // set the first image as the cover image
    setCoverImgIndex(0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Property</Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] sm:max-w-[425px] md:max-w-[600px] max-h-[90vh] overflow-y-scroll">
        <DialogHeader className="text-left">
          <DialogTitle>New Property</DialogTitle>
          <DialogDescription>Create a new property listing</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* New Property Form */}
            <div className="flex flex-col gap-4">
              <Label htmlFor="title" className="text-left">
                Property Title
              </Label>
              <Input
                id="title"
                placeholder="Mountainside Manor"
                className=""
                {...register("title", { required: true })}
              />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-4">
              <Label htmlFor="description" className="">
                Description
              </Label>
              <Textarea
                id="description"
                className="resize-none"
                placeholder="Describe your property in detail. Make it compelling for potential clients and buyers"
                {...register("description", { required: true })}
              />
            </div>
            {/* Price */}
            <div className="flex flex-col gap-4">
              <Label htmlFor="price" className="">
                Selling Price
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                max="9999999999.99"
                className=""
                placeholder="0"
                {...register("price", { required: true })}
              />
            </div>

            <Separator />

            <div className="">
              <h2 className="font-semibold text-lg">Address</h2>
              <p className="text-sm text-gray-500">
                Where can we find this property?
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="street_address">Street Address</Label>
                <Input
                  id="address"
                  placeholder="65 Nelson Mandela drive"
                  {...register("address", { required: true })}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Sandton"
                  {...register("city", { required: true })}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  placeholder="Gauteng"
                  {...register("province", { required: true })}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="zip code">Zip Code</Label>
                <Input id="zipcode" placeholder="0699" maxLength="5" />
              </div>
            </div>

            <Separator />

            <div className="">
              <h2 className="font-semibold text-lg">Property Specification</h2>
              <p className="text-sm text-gray-500">
                Let's get into the specifics
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="property type">Property Type</Label>
              <Controller
                name="property_type"
                control={control}
                defaultValue="House"
                render={({ field }) => (
                  <Select {...field}>
                    <SelectTrigger className="w-full" onChange={(value) => {field.value = value}}>
                      <SelectValue placeholder="Select a property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TownHouse">Town House</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="1"
                  max="99"
                  placeholder="1"
                  {...register("bedrooms", { required: true })}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="1"
                  max="99"
                  placeholder="1"
                  {...register("bathrooms", { required: true })}
                />
              </div>
              <div className="col-span-4 flex flex-col gap-4">
                <Label htmlFor="square meters">Square Meters</Label>
                <Input
                  id="square_meters"
                  type="number"
                  min="5"
                  max="99999"
                  placeholder="100"
                  {...register("square_meters", { required: true })}
                />
              </div>
            </div>

            <Separator />

            <div className="">
              <h2 className="font-semibold text-lg">Amenities</h2>
              <p className="text-sm text-gray-500">
                Some nice extras on the property
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex gap-2 items-center">
                <Label htmlFor="garage">Garage</Label>
                <Switch id="garage" {...register("garage", {onChange: (e) => {e.value = e.checked}})} />
              </div>
              <div className="flex gap-2 items-center">
                <Label htmlFor="garden">Garden</Label>
                <Switch id="garden" {...register("garden", {onChange: (e) => {e.value = e.checked}})} />
              </div>
              <div className="flex gap-2 items-center">
                <Label htmlFor="swimming_pool">Pool</Label>
                <Switch id="swimming_pool" {...register("swimming_pool", {onChange: (e) => {e.value = e.checked}})} />
              </div>
            </div>

            <Separator />

            <div className="">
              <h2 className="font-semibold text-lg">Images</h2>
              <p className="text-sm text-gray-500">
                Finally, add some images to make your listing stand out
              </p>

              <div class="flex items-center justify-center w-full">
                <label
                  for="imagePicker"
                  class="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="imagePicker"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileSelect}
                    multiple
                    className="hidden"
                  />
                </label>
              </div>
              {/* Preview Images */}
              {previewImages.length > 0 && (
                <>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                    {previewImages.map((previewImage, index) => (
                      <li key={index}>
                        <img
                          onClick={() => {
                            setCoverImgIndex(index);
                          }}
                          src={previewImage}
                          alt={`Uploaded image ${index + 1}`}
                          className={`${
                            coverImgIndex === index &&
                            "border border-green-500 shadow-lg shadow-green-300"
                          } object-cover object-center rounded-md shadow-sm h-48 w-full shadow-slate-400 animate-in fade-in-25 ease-in-out`}
                        />
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-400 italic mt-3">
                    * Selected image will be used as the cover image
                  </p>
                </>
              )}
              {/* ------------------------------------ */}
            </div>
          </div>
          <DialogFooter>
          <Button type="submit" disabled={loading}>{loading ? (<ThreeDots
  visible={true}
  width={80}

  color="#fff"
  radius="2"
  ariaLabel="three-dots-loading"
  />) : 'Create new property'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewPropertyFormDialog;
