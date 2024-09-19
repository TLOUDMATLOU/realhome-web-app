import { formattedNumber } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";
import { useAuthStore } from "@/zustand/store";
import supabase from "@/lib/supabase";
import { toast } from "react-toastify";

const PropertyCard = ({ property, liked = false, wishListed = false }) => {
  const [isLiked, setisLiked] = useState(liked);
  const [isWishlisted, setisWishListed] = useState(wishListed);
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        const { session } = await supabase.auth.getSession();
        if (session) {
          fetchUser();
        }
      }
    };

    const cardEngagements = async () => {
      const { data: liked, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("property_id", property.id)
        .eq('profile_id', user.id)

        if(liked.length > 0){
            setisLiked(true)
        }

        const { data, errorWishlist } = await supabase
        .from("wishlist")
        .select("*")
        .eq("property_id", property.id)
        .eq('profile_id', user.id)

        if(data.length > 0){
            setisWishListed(true)
        }
    };

    checkUser();
    cardEngagements()
  }, [user]);

  const handleWishlisting = async () => {
    console.log({
      property_id: property.id,
      profile_id: user.id,
    });

    if (isWishlisted) {
      const { data, error } = await supabase
        .from("wishlist")
        .delete()
        .eq("property_id", property.id)
        .eq("profile_id", user.id);

      if (error) {
        toast.error("Could not remove property from wishlist");
        console.log(error);
        return;
      }
      toast.success("removed from wishlist 🏡");

      setisWishListed(!isWishlisted);
    } else {
      const { data, error } = await supabase.from("wishlist").insert({
        property_id: property.id,
        profile_id: user.id,
      });

      if (error) {
        toast.error("Could not add property to wishlist");
        console.log(error);
        return;
      }
      toast.error("Added to wishlist 🏡");

      setisWishListed(!isWishlisted);
    }
  };

  const handleLiked = async () => {
    if (!isLiked) {
      const { data, error } = await supabase.from("favourites").insert({
        property_id: property.id,
        profile_id: user.id,
      });

      if (error) {
        toast.error("Could not add property to favourites");
        console.log(error);
        return;
      }
      toast.error("Added to favourites ♥");
    } else {
      const { data, error } = await supabase
        .from("favourites")
        .delete()
        .eq("property_id", property.id)
        .eq("profile_id", user.id);

      if (error) {
        toast.error("Could not remove property from favourites");
        console.log(error);
        return;
      }
      toast.error("Removed from favourites ♥");
    }

    setisLiked(!isLiked);
  };

  return (
    <article className="property-card max-w-80 w-full text-left animate-in">
      <Link to={`/properties/${property.id}`}>
        <div className="relative  h-[340px]  object-cover cursor-pointer">
          <img
            src={property.cover_img}
            alt="property"
            className=" rounded-2xl filter object-cover brightness-50 h-full w-full"
          />
          <h2 className="absolute bottom-4 left-4 font-extrabold text-white text-base md:text-lg line-clamp-2 w-[80%]">
            {property.title}
          </h2>
        </div>
      </Link>
      {/* Price */}
      <p className="mt-2 text-gray-600 font-bold">
        R{formattedNumber(property.price)}
      </p>
      {/* Description */}
      <p className="text-sm text-gray-400 line-clamp-2">
        {property.description}
      </p>
      {user && (
        <div className="flex items-center justify-between py-3 top-0 left-0 z-40 w-full">
          <div className="" onClick={handleLiked}>
            {isLiked ? (
              <FaHeart className="text-red-600 hover:text-red-300" size={20} />
            ) : (
              <FaRegHeart
                className="text-gray-500 hover:text-red-600"
                size={20}
              />
            )}
          </div>
          <div
            className="text-xs text-gray-500 flex items-center gap-2"
            onClick={() => {
              handleWishlisting();
            }}
          >
            {isWishlisted ? (
              <>
                Remove from wishlist{" "}
                <PiBookmarkSimpleFill size={20} className="text-orange-600" />
              </>
            ) : (
              <>
                Add to wishlist{" "}
                <PiBookmarkSimpleBold
                  size={20}
                  className="hover:text-orange-600"
                />
              </>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default PropertyCard;
