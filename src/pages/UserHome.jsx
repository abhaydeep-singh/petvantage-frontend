import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // ShadCN utility for class merging

const petCategories = [
  { name: "Dogs", bgColor: "bg-blue-500" },
  { name: "Cats", bgColor: "bg-yellow-500" },
  { name: "Rabbits", bgColor: "bg-green-500" },
  { name: "Birds", bgColor: "bg-red-500" },
];

const NGOCategories = [
  { name: "Dogs", bgColor: "bg-blue-500" },
  { name: "Cats", bgColor: "bg-yellow-500" },
  { name: "Rabbits", bgColor: "bg-green-500" },
  { name: "Birds", bgColor: "bg-red-500" }, 
  { name: "Dogs", bgColor: "bg-blue-500" },
  { name: "Cats", bgColor: "bg-yellow-500" },
  { name: "Rabbits", bgColor: "bg-green-500" },
  { name: "Birds", bgColor: "bg-red-500" }, 
  { name: "Dogs", bgColor: "bg-blue-500" },
  { name: "Cats", bgColor: "bg-yellow-500" },
  { name: "Rabbits", bgColor: "bg-green-500" },
  { name: "Birds", bgColor: "bg-red-500" },
];

function UserHome() {
    const [isOpen, setIsOpen] = useState(false); // Controls sidebar state //TODO: require state Management
  return (
    <>
     <div className={cn("flex-1 transition-all", isOpen ? "sm:ml-64" : "sm:ml-16")}>
        {/* Hero Section */}
        <div className="flex items-center justify-center h-[40vh] shadow-md">
          <h1 className="text-primary text-3xl font-bold">Welcome, UserName</h1>
        </div>
        <hr />

        {/* Pet Categories */}
        <div className="container mx-auto px-4 py-8 text-primary">
          <h2 className="text-2xl font-bold text-center mb-6">🐾 Browse Pet Categories</h2>
          <br />
          <div className="flex flex-wrap justify-center gap-6 pb-12">
            {petCategories.map((pet, index) => (
              <div key={index} className="relative group">
                <Card className="w-40 md:w-48 lg:w-56 rounded-xl shadow-lg transition-transform transform group-hover:scale-105 group-hover:-translate-y-1 overflow-hidden border border-gray-700 group-hover:shadow-xl group-hover:shadow-yellow-500/50">
                  {/* Gradient Border Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Pet Card Content */}
                  <CardContent className={`p-6 flex items-center justify-center ${pet.bgColor} h-32 relative z-10`}>
                    <span className="text-xl font-semibold text-white">{pet.name}</span>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
<hr />

      {/* Featured Articles */}
      


       




      </div> 
    </>
  )
}

export default UserHome
