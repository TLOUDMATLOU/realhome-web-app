import HomeHeader from "@/sections/HomeHeader";
import LatestListings from "@/sections/LatestListings";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { listings } from "@/lib/utils";
import Testimonials from "@/sections/Testimonials";
import AboutUs from "@/sections/AboutUs";
import EmailInput from "@/sections/EmailInput";
import Banner from "@/components/Banner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="HomePage">
      {/* Nav */}

      <HomeHeader />
      <LatestListings listings={listings ?? []} />

      <AboutUs />

      <Banner
        title={"Meet Our Agents"}
        text={
          "Our expert range of agents specializing in all property segments are ready to help you find your next home or your next big investment"
        }
        image="assets/agent_person.png"
        imageStyle="h-[450px]"
        className="mb-8"
      >
        <Link to={'/agents'}>
          <Button>Find An Agent</Button>
        </Link>
      </Banner>

      <Testimonials />

      <EmailInput />
    </main>
  );
};

export default Home;
