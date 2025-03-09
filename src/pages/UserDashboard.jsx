import React, { useState } from "react";
import { Home, ShoppingCart, MessageSquare, FileText, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // ShadCN utility for class merging

const petCategories = [
  { name: "Dogs", bgColor: "bg-blue-500" },
  { name: "Cats", bgColor: "bg-yellow-500" },
  { name: "Rabbits", bgColor: "bg-green-500" },
  { name: "Birds", bgColor: "bg-red-500" },
];

export default function UserDashboard() {
  const [isOpen, setIsOpen] = useState(true); // Controls sidebar state
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Controls mobile sidebar

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="relative">
        {/* Mobile Toggle Button */}
        <button 
          className="sm:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-md"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Sidebar Container */}
        <div
          className={cn(
            "fixed top-0 left-0 h-full bg-secondary text-white p-4 hidden sm:flex flex-col transition-all duration-300",
            isMobileOpen ? "w-64 translate-x-0" : "w-16 sm:translate-x-0",
            isOpen ? "sm:w-64" : "sm:w-16"
          )}
        >
          {/* Collapse Button */}
          <button 
            className="hidden sm:flex items-center justify-center absolute -right-5 top-6 w-10 h-10 text-black bg-primary rounded-full shadow-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* Sidebar Content */}
          <h2 className={cn("text-xl font-bold transition-all", isOpen ? "opacity-100" : "opacity-0 hidden")}>
            🐾 Pet Dashboard
          </h2>

          <nav className="mt-14 space-y-4 flex flex-col items-start">
            <SidebarItem icon={<Home size={24} />} text="Home" href="/" isOpen={isOpen} />
            <SidebarItem icon={<ShoppingCart size={24} />} text="Marketplace" href="/marketplace" isOpen={isOpen} />
            <SidebarItem icon={<MessageSquare size={24} />} text="Community" href="/community" isOpen={isOpen} />
            <SidebarItem icon={<FileText size={24} />} text="Blog" href="/blog" isOpen={isOpen} />
          </nav>
        </div>

        {/* Overlay for Mobile */}
        {isMobileOpen && <div className="fixed inset-0 bg-black bg-opacity-50 sm:hidden" onClick={() => setIsMobileOpen(false)}></div>}
      </div>

      {/* Main Content Area */}
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
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, text, href, isOpen }) => (
  <a 
    href={href} 
    className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition relative group"
  >
    {icon}
    <span className={cn("transition-all", isOpen ? "opacity-100" : "opacity-0 hidden")}>{text}</span>

    {/* Tooltip when collapsed */}
    {!isOpen && (
      <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-1 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
        {text}
      </span> 
    )}
  </a>
);
