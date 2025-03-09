import { Button } from "@/components/ui/button";
import React from "react";
import dog from "../assets/images/dog1.jpg";
import shopkeeper from "../assets/svg/shopkeeper.svg";
import fish from "../assets/svg/fish.svg";
import tips from "../assets/svg/tips.svg";
import { Navbar } from "@/components";

function Landing() {
  return (
    <>

    <Navbar/>

      {/* Upper/Hero Section */}
      <div className="flex flex-col md:flex-row md:justify-center md:gap-3 xl:gap-8 md:items-center h-[80vh] md:h-[60vh] lg:h-[70vh] w-full p-4 border">
        <div className="text text-foreground my-6 ">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-primary">
            FIND YOUR
            <br />
            PERFECT PET
            <br />
            COMPANION TODAY
          </h1>
          <p className="my-2 xl:my-4 xl:text-xl ">
            Adopt/Buy and Care All in One Place
          </p>
          <div className="my-2 flex gap-3">
            <Button className="" variant="outline">
              Browse Pets
            </Button>
            <Button className="">Join Now</Button>
          </div>
        </div>
    <br />
        <div className="img border md:w-[30%]">
          <img
            src={dog}
            className="rounded-2xl w-[80%] m-auto md:w-full"
            alt=""
          />
        </div>
      </div>



      {/* Why Choose Us Section */}
      <div className="flex flex-col gap-6 h-[130vh] md:h-[50vh] w-full md:my-6">
        <h1 className="text-primary text-center w-full font text-4xl">
          WHY CHOOSE US?
        </h1>
        <div className="card-box flex flex-col md:flex-row lg:w-[80%] mx-auto gap-6 items-center text-white">
          <div className="card bg-secondary p-2 flex flex-col gap-3 items-center justify-center w-[90%] h-[350px] md:h-[250px] xl:h-[300px] 2xl:h-[350px] border rounded-xl">
            <img src={fish} className="w-[60%]" alt="" />
            <p className="text-primary font-semibold text-2xl">
              Wide Variety of Pets
            </p>
          </div>
          <div className="card bg-secondary p-2 flex flex-col gap-3 items-center justify-center w-[90%] h-[350px] md:h-[250px] xl:h-[300px] 2xl:h-[350px] border rounded-xl">
            <img src={shopkeeper} className="w-[60%]" alt="" />
            <p className="text-primary font-semibold text-2xl">
              Trusted Shopkeepers
            </p>
          </div>
          <div className="card p-2 bg-secondary flex flex-col gap-3 items-center justify-center w-[90%] h-[350px] md:h-[250px] xl:h-[300px] 2xl:h-[350px] border rounded-xl">
            <img src={tips} className="w-[60%]" alt="" />
            <p className="text-primary font-semibold text-2xl">
              Pet Care Tips & Community
            </p>
          </div>
        </div>
      </div>
      <hr /> <br />



      {/* CTA Section */}
      <div className="flex flex-col">
        <div>
          <h2 className="text-center text-primary font-semibold text-2xl p-2">
            Are You a pet lover? or Shop Owner?
          </h2>
          <h3 className="text-center text-foreground text-xl">Join us Today</h3>
        </div>
        <br />
        <br />
        <div className="card-box flex flex-col w-full md:flex-row lg:w-[80%] items-center justify-center mx-auto gap-6 text-white">
          <div className="card bg-secondary p-2 flex flex-col gap-3 items-center justify-evenly w-[80%] xl:w-[40%] h-[250px] md:h-[250px] xl:h-[300px] border rounded-3xl">
            {/* <img src={fish} className="w-[60%]" alt="" /> */}
            <p className="text-primary font-semibold text-4xl underline underline-offset-8">
              For Pet Owners
            </p>
            <p className="text-white text-xl">Find Your New Best Friend</p>

            <Button>Join Now</Button>
          </div>

          <div className="card bg-secondary p-2 flex flex-col gap-3 items-center justify-evenly w-[80%] xl:w-[40%] h-[250px] md:h-[250px] xl:h-[300px] border rounded-3xl">
            {/* <img src={fish} className="w-[60%]" alt="" /> */}
            <p className="text-primary font-semibold text-4xl underline underline-offset-8">
              For Shopkeepers
            </p>
            <p className="text-white text-xl text-center">
              List Pets, Get Verified and Grow Your Bussiness
            </p>

            <Button>Join Now</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
