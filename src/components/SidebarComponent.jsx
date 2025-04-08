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
import { cn } from "@/lib/utils";
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

function SidebarComponent() {
  const [isOpen, setIsOpen] = useState(false); // Desktop Sidebar
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile Sidebar
  const navigate = useNavigate();

  return (
    <>
      <div className="relative">
        {/* Mobile Toggle Button */}
        <button
          className="sm:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-md"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Sidebar */}
        <div
          className={cn(
            "hidden sm:flex fixed top-0 left-0 h-full bg-secondary text-white p-4 flex-col transition-all duration-300 z-50",
            isOpen ? "w-64" : "w-16"
          )}
        >
          {/* Collapse Button */}
          <button
            className="absolute -right-5 top-6 w-10 h-10 text-black bg-primary rounded-full shadow-md flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          <h2
            className={cn(
              "text-xl font-bold transition-all",
              isOpen ? "opacity-100" : "opacity-0 hidden"
            )}
          >
            🐾 User Dashboard
          </h2>

          <nav className="mt-14 space-y-4 flex flex-col items-start">
            <SidebarItem icon={<Home />} text="Home" onClick={() => navigate("/user-dashboard/user-home")} showText={isOpen} />
            <SidebarItem icon={<SquareCheck />} text="View Requests" onClick={() => navigate("/user-dashboard/requests")} showText={isOpen} />
            <SidebarItem icon={<ShoppingCart />} text="Marketplace" onClick={() => navigate("/user-dashboard/marketplace")} showText={isOpen} />
            <SidebarItem icon={<MessageSquare />} text="Community" showText={isOpen} />
            <SidebarItem icon={<FileText />} text="Blog" onClick={() => navigate("/user-dashboard/blog")} showText={isOpen} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <SidebarItem icon={<LogOut />} text="Logout" showText={isOpen} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your account and remove your data.
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

        {/* Mobile Sidebar */}
        {isMobileOpen && (
          <>
            <div className="fixed top-0 left-0 h-full w-64 bg-secondary text-white p-4 flex flex-col z-50 sm:hidden">
              <h2 className="text-xl font-bold">🐾 User Dashboard</h2>

              <nav className="mt-14 space-y-4 flex flex-col items-start">
                <SidebarItem icon={<Home />} text="Home" onClick={() => navigate("/user-dashboard/user-home")} showText />
                <SidebarItem icon={<SquareCheck />} text="View Requests" onClick={() => navigate("/user-dashboard/requests")} showText />
                <SidebarItem icon={<ShoppingCart />} text="Marketplace" onClick={() => navigate("/user-dashboard/marketplace")} showText />
                <SidebarItem icon={<MessageSquare />} text="Community" showText />
                <SidebarItem icon={<FileText />} text="Blog" onClick={() => navigate("/user-dashboard/blog")} showText />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <SidebarItem icon={<LogOut />} text="Logout" showText />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your account and remove your data.
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

            {/* Overlay to close mobile sidebar */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileOpen(false)}
            ></div>
          </>
        )}
      </div>
    </>
  );
}

export default SidebarComponent;

// Sidebar Item Component
const SidebarItem = ({ icon, text, showText, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition relative group w-full text-left"
  >
    <span className="w-6 flex justify-center">{icon}</span>
    {showText && <span className="transition-all">{text}</span>}
  </button>
);
