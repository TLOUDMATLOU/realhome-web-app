import React from "react";
import { GoDotFill } from "react-icons/go";

const TestimonialCard = ({ testimonial }) => {
  const { name, image, id, status, testimony } = testimonial;

  return (
    <article className="testimonial-card flex items-center gap-4">
      <img
        src={image}
        alt="customer"
        className="h-44 object-cover rounded-xl aspect-square"
      />
      <div className="testimonial-card__content w-80 text-left space-y-4">
        <h2 className="font-black text-lg">{name}</h2>
        <p className="text-gray-500 text-sm text-balance">{testimony}</p>
        <p className="uppercase font-extrabold text-[10px] flex items-center gap-2">
          <GoDotFill />
          happy {status}
        </p>
      </div>
    </article>
  );
};

export default TestimonialCard;
