import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formattedNumber } from "@/lib/utils";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import supabase from "@/lib/supabase";
import { toast } from "react-toastify";
import { useAuthStore } from "@/zustand/store";
import PropertyCard from "./PropertyCard";

function WishlistGrid({ wishlist = [], editable=false, className='' }) {

    const user = useAuthStore((state) => state.user)

  const deleteProperty = async (id) => {
    if(user){
        const response = await supabase
  .from('wishlist')
  .delete()
  .eq('property_id', id).eq('profile_id', user?.id)

  if(response.status == 204){
    toast.success(`property removed successfully`)
  }else {
    toast.error(`Property ${id} could not be removed from wishlist`)
    
  }
    }
  }

  const properties = wishlist.length > 0 ? wishlist.map((fave) => fave.properties) : []

//   console.log(wishlist)

useEffect(() => {
  console.log(wishlist)
}, [])


  return (
    <div className={`${className}`}>
      {properties.length == 0 ? (
        <p className="text-center italic">No data available</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 md:justify-between">
         {
            properties.map((property) => (<PropertyCard key={property.id} property={property} wishListed={true}/>))
         }   
        </div>
      )}
    </div>
  );
}

export default WishlistGrid;
