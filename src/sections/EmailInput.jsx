import { Button } from '@/components/ui/button';
import React from 'react';

const EmailInput = ({className=''}) => {
  return (
    <section className={`bg-slate-900 text-white p-6 md:p-12 md:mt-24 my-10 text-left rounded-lg relative ${className}`}>
      <h2 className="text-2xl md:text-4xl font-semibold mb-2 md:mb-4">Do you have any questions?</h2>
      <p className="mb-4">Enter your email below and let's get started.</p>
      <div className="bg-white h-10 md:h-14 w-full md:w-[600px] p-2 gap-2 flex items-center">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          className="flex-1 md:px-4 px-1"
        />
        <Button className="uppercase tracking-wider text-xs md:text-base h-full">Continue</Button>
        <img src="/assets/Tower.png" alt="" className="hidden md:block absolute right-28 bottom-0 h-[400px]" />
      </div>
    </section>
  );
};

export default EmailInput;
