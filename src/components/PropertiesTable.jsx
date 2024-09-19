import React from "react";
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

function PropertiesTable({ properties = [], editable=false, className='' }) {

  const deleteProperty = async (id) => {
    const response = await supabase
  .from('properties')
  .delete()
  .eq('id', id)

  if(response.status == 204){
    toast.success(`Property ${id} deleted successfully`)
  }else {
    toast.error(`Property ${id} could not be deleted`)
    
  }
  }

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
              
              { editable == true && <TableHead>Edit</TableHead> }
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
                
                { editable == true && <TableCell> <FaRegEdit className="scale-125 cursor-pointer" onClick={() => {}} /> </TableCell> }
                { editable == true && <TableCell> <RiDeleteBack2Fill className="text-red-700 scale-125 cursor-pointer" onClick={() => {deleteProperty(property.id)}} /> </TableCell> }
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default PropertiesTable;
