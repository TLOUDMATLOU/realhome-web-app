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

function FavouritesTable({ favourites = [], editable=false, className='' }) {

    const user = useAuthStore((state) => state.user)

  const deleteProperty = async (id) => {
    if(user){
        const response = await supabase
  .from('favourites')
  .delete()
  .eq('property_id', id).eq('profile_id', user?.id)

  if(response.status == 204){
    toast.success(`Favourite removed successfully`)
  }else {
    toast.error(`Property ${id} could not be removed from favourites`)
    
  }
    }
  }

  const properties = favourites.length > 0 ? favourites.map((fave) => fave.properties) : []

//   console.log(favourites)

useEffect(() => {
  console.log(favourites)
}, [])


  return (
    <div className={`${className}`}>
      {properties.length == 0 ? (
        <p className="text-center italic">No data available</p>
      ) : (
        <Table>
          <TableCaption>A list of your favourite properties.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Property</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Price</TableHead>
              
              { editable == true && <TableHead>Delete</TableHead> } 
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow>
                <TableCell className="font-medium line-clamp-1">{property.id}</TableCell>
                <TableCell className="">{property.title}</TableCell>
                <TableCell >{property.description}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>{property.city}</TableCell>
                <TableCell className="text-right w-32">R{formattedNumber(property.price)}</TableCell>
                
                { editable == true && <TableCell> <RiDeleteBack2Fill className="text-red-700 scale-125 cursor-pointer" onClick={() => {deleteFavourite(property.id)}} /> </TableCell> }
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default FavouritesTable;
