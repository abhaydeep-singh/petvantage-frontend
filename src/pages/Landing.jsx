import { Button } from "@/components/ui/button";
import React from "react";
import dog from "../assets/images/dog1.jpg";
import shopkeeper from "../assets/svg/shopkeeper.svg";
import fish from "../assets/svg/fish.svg";
import tips from "../assets/svg/tips.svg";
import { Navbar, ParticlesBackground, TrustedBy } from "@/components";
import { Link, useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <ParticlesBackground />
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:justify-center md:gap-3 xl:gap-8 md:items-center h-[80vh] md:h-[60vh] lg:h-[70vh] w-full p-4 border-t">
        <div className="text text-foreground my-6">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-primary">
            FIND YOUR <br />
            PERFECT PET <br />
            COMPANION TODAY
          </h1>
          <p className="my-2 xl:my-4 xl:text-xl">
            Adopt/Buy and Care All in One Place
          </p>
          <div className="my-2 flex gap-3">
            <Button variant="outline">Browse Pets</Button>
            <Button>Join Now</Button>
          </div>
        </div>
        <div className="img border md:w-[30%]">
          <img
            src={dog}
            className="rounded-2xl w-[80%] m-auto md:w-full"
            alt="Cute dog"
          />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="flex flex-col gap-6 w-full py-8 md:my-6">
        <h1 className="text-primary text-center font text-4xl">
          WHY CHOOSE US?
        </h1>
        <div className="card-box flex flex-col md:flex-row lg:w-[80%] mx-auto gap-6 items-center text-white">
          <div className="card bg-secondary p-4 flex flex-col gap-3 items-center justify-center w-[90%] md:w-[30%] h-[350px] md:h-[250px] xl:h-[300px] 2xl:h-[350px] border rounded-xl">
            <img src={fish} className="w-[60%]" alt="Fish icon" />
            <p className="text-primary font-semibold text-2xl text-center">
              Wide Variety of Pets
            </p>
          </div>
          <div className="card bg-secondary p-4 flex flex-col gap-3 items-center justify-center w-[90%] md:w-[30%] h-[350px] md:h-[250px] xl:h-[300px] 2xl:h-[350px] border rounded-xl">
            <img src={shopkeeper} className="w-[60%]" alt="Shopkeeper icon" />
            <p className="text-primary font-semibold text-2xl text-center">
              Trusted NGOs
            </p>
          </div>
          <div className="card bg-secondary p-4 flex flex-col gap-3 items-center justify-center w-[90%] md:w-[30%] h-[350px] md:h-[250px] xl:h-[300px] 2xl:h-[350px] border rounded-xl">
            <img src={tips} className="w-[60%]" alt="Tips icon" />
            <p className="text-primary font-semibold text-2xl text-center">
              Pet Care Tips & Community
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl lg:text-4xl font-semibold text-center my-8 text-primary">
        Trusted by Leading NGOs
      </h2>
      <TrustedBy className="my-8" />

      {/* Footer Section */}
      <footer className="bg-background text-primary py-8 mt-8 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold">PetVantage</h2>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PetVantage. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="hover:underline">About Us</Link>
            {/* <Link href="#" className="hover:underline">Terms of Service</Link> */}
            <Link href="#" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
