import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // ShadCN utility for class merging
import { FeaturedArticles, ParticlesBackground } from "@/components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const petCategories = [
  { name: "Dogs", bgColor: "bg-blue-500", nav:"/user-dashboard/pet-list/dogs" }, //FIXME:
  { name: "Cats", bgColor: "bg-yellow-500" , nav:"/user-dashboard/pet-list/cats"},
  { name: "Rabbits", bgColor: "bg-green-500", nav:"/user-dashboard/pet-list/rabbits"},
  { name: "Birds", bgColor: "bg-red-500", nav:"/user-dashboard/pet-list/birds"},
];

// Background images for hero section
const backgroundImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg",
  "/images/hero5.jpg",
  "/images/hero6.jpg",
];

function UserHome() {
  // const [isOpen, setIsOpen] = useState(false); // Controls sidebar state //TODO: require state Management
    const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [bgIndex, setBgIndex] = useState(0); // Controls background image index
  const navigate = useNavigate();

  // Automatically change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen">
      <div
        className={cn(
          "flex-1 transition-all",
          isOpen ? "sm:ml-64" : "sm:ml-16"
        )}
      >
        {/* Hero Section with Sliding Background */}
        <div
          className="relative flex items-center justify-center h-[60vh] shadow-md bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${backgroundImages[bgIndex]})`,
          }}
        >
          {/* Dark Overlay*/}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <h1 className="relative text-primary text-3xl md:text-6xl font-bold">
            Welcome, UserName
          </h1>
        </div>
        <hr />



        {/* Pet Categories */}
        <div className="container mx-auto px-4 py-8 text-primary">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            🐾 Browse Pet Categories
          </h2>
          <br />
          <div className="flex flex-wrap justify-center gap-6 pb-12">
            {petCategories.map((pet, index) => (
              <div key={index} className="relative group">
                <Card className="w-40 md:w-48 lg:w-56 rounded-xl shadow-lg transition-transform transform group-hover:scale-105 group-hover:-translate-y-1 overflow-hidden border border-gray-700 group-hover:shadow-xl group-hover:shadow-yellow-500/50" onClick={()=>{navigate(pet.nav)}}>
                  {/* Gradient Border Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Pet Card Content */}
                  <CardContent 
                    className={`p-6 flex items-center justify-center ${pet.bgColor} h-32 relative z-10`}
                  >
                    <span className="text-xl font-semibold text-white">
                      {pet.name}
                    </span>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <FeaturedArticles />

        <br />

        <br />
        <br />

        <footer className="bg-secondary text-white py-4 px-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} PetVantage. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default UserHome;
