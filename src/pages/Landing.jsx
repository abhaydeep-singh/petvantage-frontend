import { Button } from "@/components/ui/button";
import React from "react";
import dog from "../assets/images/dog1.jpg";
import aboutus from "../assets/images/aboutus.jpg"; // <- New image for About Us
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
    <div className="relative flex flex-col md:flex-row md:justify-center md:gap-8 md:items-center h-auto md:h-[70vh] w-full px-4 pt-20 md:pt-0 border-t overflow-hidden">
      
      {/* Background Blob */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:top-1/2 md:-translate-y-1/2 z-0">
        <div className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-primary/20 blur-3xl rounded-full"></div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 text-foreground z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
          FIND YOUR <br className="hidden md:block" />
          PERFECT PET <br className="hidden md:block" />
          COMPANION TODAY
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Adopt/Buy and Care All in One Place
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">Browse Pets</Button>
          <Button>Join Now</Button>
        </div>
      </div>

      {/* Image */}
      <div className="mt-8 md:mt-0 md:w-[35%] flex justify-center z-10">
        <img
          src={dog}
          className="rounded-2xl w-[80%] md:w-full"
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

      {/* About Us Section */}
      <div id="about" className="flex flex-col md:flex-row items-center justify-center gap-8 w-full py-12 md:py-16 lg:py-20 px-4 border-t">
        <div className="md:w-[40%] border rounded-2xl overflow-hidden">
          <img
            src={aboutus}
            className="w-full h-full object-cover"
            alt="About us image"
          />
        </div>
        <div className="md:w-[50%] text-foreground">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            About Us
          </h2>
          <p className="text-base xl:text-lg leading-relaxed text-muted-foreground">
            At PetVantage, we are passionate about connecting loving families with their perfect pet companions. 
            Whether you're looking to adopt, buy, or simply learn more about pet care, our platform is designed to 
            make your journey seamless and joyful. Trusted by top NGOs, we aim to build a strong, caring community 
            for pets and their future owners.
          </p>
        </div>
      </div>


      <h2 className="text-2xl lg:text-4xl font-semibold text-center my-8 text-primary">
        Trusted by Leading NGOs
      </h2>
      <TrustedBy className="my-8" />



      {/* Contact Us Section */}
      <div id="contact" className="flex flex-col items-center gap-6 w-full py-12 md:py-16 lg:py-20 px-4 border-t">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center">
          Contact Us
        </h2>
        <p className="text-center text-muted-foreground text-base xl:text-lg max-w-2xl">
          Have questions, suggestions, or need help? We'd love to hear from you! 
          Feel free to reach out at <span className="text-primary font-semibold mr-1">support@petvantage.com</span> 
          or connect with us through our social media platforms.
        </p>
        <div className="flex gap-4">
          <Button variant="outline">Email Us</Button>
          <Button>Follow on Instagram</Button>
        </div>
      </div>


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
            {/* <Link href="#" className="hover:underline">About Us</Link>
            <Link href="#" className="hover:underline">Contact Us</Link> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
