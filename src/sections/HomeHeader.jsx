import DropDownFilter from "@/components/DropDownFilter";
import { Button } from "@/components/ui/button";
import { citiesOptions, priceOptions, provincesOptions } from "@/lib/utils";
import { useFilterStore } from "@/zustand/store";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const HomeHeader = () => {
  const changeProvince = useFilterStore((state) => state.changeProvince);
  const selectedProvince = useFilterStore((state) => state.province);

  return (
    <header className="homepage__header rounded-xl after:rounded-xl h-96 grid place-items-center">
      <div className="wrapper">
        <h1 className="text-3xl md:text-5xl font-bold">
          Discover the top real
          <br />
          estate in South Africa
        </h1>
        <p className="text-balance text-sm md:text-inherit -mb-16 md:mb-0">
          Discover the Finest Real Estate Properties in South Africa <br /> From
          Coastal Retreats to Urban Luxury
        </p>
      </div>

      {/* Homepage Filters */}
      {/* Mobile */}
      <Drawer>
        <DrawerTrigger variant='secondary' className="bg-secondary text-secondary-foreground py-2 px-3 font-bold rounded-md md:hidden m-0">
          Find Your Dream Home
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Find Your Next Dream Home</DrawerTitle>
            <DrawerDescription>Filter though our property listings.</DrawerDescription>
          </DrawerHeader>

          <div className="wrapper flex flex-col items-center gap-4 w-full px-6">
          {/* Province */}
          <DropDownFilter
            type={"province"}
            selectedProvince={selectedProvince}
            data={provincesOptions}
            onChange={changeProvince}
          />

          {/* city */}
          <DropDownFilter
            type={"city"}
            data={citiesOptions}
            selectedProvince={selectedProvince}
          />

          {/* max price */}
          <DropDownFilter type={"max price"} data={priceOptions} />
        </div>

          <DrawerFooter>
          <Button className="flex items-center gap-3">
            <Link to={"/properties"}>Search</Link> <FaSearch />
          </Button>
            <DrawerClose>
              <Button className="w-full" variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Desktop */}
      <div className="hidden md:grid w-4/5 homepage-filters absolute bottom-[-1.5rem] bg-white shadow-slate-300 rounded-lg shadow-md min-w-2/3 h-20 place-items-center">
        <div className="wrapper flex items-center gap-4 w-full px-6">
          {/* Province */}
          <DropDownFilter
            type={"province"}
            selectedProvince={selectedProvince}
            data={provincesOptions}
            onChange={changeProvince}
          />

          {/* city */}
          <DropDownFilter
            type={"city"}
            data={citiesOptions}
            selectedProvince={selectedProvince}
          />

          {/* max price */}
          <DropDownFilter type={"max price"} data={priceOptions} />

          <Button className="flex items-center gap-3">
            <Link to={"/properties"}>Search</Link> <FaSearch />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
