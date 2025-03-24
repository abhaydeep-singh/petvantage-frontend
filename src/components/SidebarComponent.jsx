import React, { useState } from "react";
import {
  Home,
  ShoppingCart,
  SquareCheck,
  MessageSquare,
  FileText,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils"; // ShadCN utility for class merging
import { useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// import { Sidebar } from "@/components";

// { isMobileOpen, setIsMobileOpen }
function SidebarComponent() {
  const [isOpen, setIsOpen] = useState(false); //TODO: I did Flase here
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="relative">
        {/* Mobile Toggle Button / Hamburger*/}
        <button
          className="sm:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-md"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Sidebar Container */}
        {/* <div
          className={cn(
            "fixed top-0 left-0 h-full bg-secondary text-white p-4 hidden sm:flex flex-col transition-all duration-300",
            isMobileOpen ? "w-64 translate-x-0" : "w-16 sm:translate-x-0",
            isOpen ? "sm:w-64" : "sm:w-16"
          )}
        > */}

        <div
          className={cn(
            "fixed top-0 left-0 h-full bg-secondary text-white p-4 flex flex-col transition-all duration-300 z-50", // Add z-50
            isMobileOpen ? "w-64 translate-x-0" : "w-16 sm:translate-x-0",
            isOpen ? "sm:w-64" : "sm:w-16",
            !isMobileOpen && "hidden sm:flex"
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
          <h2
            className={cn(
              "text-xl font-bold transition-all",
              isOpen ? "opacity-100" : "opacity-0 hidden"
            )}
          >
            🐾 User Dashboard
          </h2>

          <nav className="mt-14 space-y-4 flex flex-col items-start">
            <SidebarItem
              icon={<Home size={24} />}
              text="Home"
              // href="/"
              onClick={() => navigate("/user-dashboard/user-home")}
              isOpen={isOpen}
            />
            <SidebarItem
              icon={<SquareCheck size={24} />}
              text="View Requests"
              onClick={()=>navigate("/user-dashboard/requests")}
              // href="/marketplace"
              isOpen={isOpen}
            />
            <SidebarItem
              icon={<MessageSquare size={24} />}
              text="Community"
              // href="/community"
              isOpen={isOpen}
            />
            <SidebarItem
              icon={<FileText size={24} />}
              text="Blog"
              // href="/blog"
              onClick={() => navigate("/user-dashboard/blog")}
              isOpen={isOpen}
            />
            {/*Logout Alert Dialog   FIXME: Add dark mode*/}
            <AlertDialog>
              {/* asChild let us add custom button instead of default one */}
              <AlertDialogTrigger asChild>
                <SidebarItem
                  icon={<LogOut size={24} />}
                  text="Logout"
                  // href="/blog"
                  // onClick={}
                  isOpen={isOpen}
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </nav>
        </div>

        {/* Overlay for Mobile */}
        {/* {isMobileOpen && <div className="fixed inset-0 bg-black bg-opacity-50 sm:hidden" onClick={() => setIsMobileOpen(false)}></div>} */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-40" // Ensure z-40 is here
            onClick={() => setIsMobileOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
}

export default SidebarComponent;

// Internal Functional Component
const SidebarItem = ({ icon, text, isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition relative group w-full text-left"
  >
    {/* Fix: Prevent shrinking */}
    <span className="w-6 flex justify-center flex-shrink-0">{icon}</span>

    {/* Sidebar Text (Will disappear on collapse) */}
    <span
      className={cn(
        "transition-all",
        isOpen ? "opacity-100" : "opacity-0 hidden"
      )}
    >
      {text}
    </span>

    {/* Tooltip when collapsed */}
    {!isOpen && (
      <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-1 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
        {text}
      </span>
    )}
  </button>
);
