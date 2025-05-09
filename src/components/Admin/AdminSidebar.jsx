import React, { useEffect, useState } from "react";
import {
  Home,
  ShoppingCart,
  SquareCheck,
  MessageSquare,
  FileText,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Plus,
  Dog,
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
import { ToastContainer, toast } from "react-toastify";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false); // Desktop Sidebar
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile Sidebar
  const navigate = useNavigate();

  // useEffect(()=>{
  //   navigate("/user-dashboard/user-home")
  // },[])
  function handleLogout() {
    toast.success("Logout Succesfull!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });
    console.log("logout");

    sessionStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        // transition={Bounce}
      />
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
            🐾 Admin Dashboard
          </h2>

          <nav className="mt-14 space-y-4 flex flex-col items-start">
            <SidebarItem
              icon={<Home />}
              text="Home"
              onClick={() => navigate("/admin/admin-home")}
              showText={isOpen}
            />
            <SidebarItem
              icon={<SquareCheck />}
              text="Monitor all Requests"
              onClick={() => navigate("/admin/requests")}
              showText={isOpen}
            />
            <SidebarItem
              icon={<Dog />}
              text="Monitor all Pets"
              onClick={() => navigate("/admin/pets")}
              showText={isOpen}
            />
            <SidebarItem
              icon={<MessageSquare />}
              text="Community"
              onClick={() => navigate("/admin/community")}
              showText={isOpen}
            />
            <SidebarItem
              icon={<FileText />}
              text="Blog"
              onClick={() => navigate("/admin/blog")}
              showText={isOpen}
            />
            <SidebarItem
              icon={<Plus />}
              text="Add Blog"
              onClick={() => navigate("/admin/editor")}
              showText={isOpen}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <SidebarItem
                  icon={<LogOut />}
                  text="Logout"
                  showText={isOpen}
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure to Logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will have to login again using resgitered Email and
                    Password.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </nav>
        </div>

        {/* Mobile Sidebar */}
        {isMobileOpen && (
          <>
            <div className="fixed top-0 left-0 h-full w-64 bg-secondary text-white p-4 flex flex-col z-50 sm:hidden">
              <h2 className="text-xl font-bold">🐾 Admin Dashboard</h2>

              <nav className="mt-14 space-y-4 flex flex-col items-start">
                <SidebarItem
                  icon={<Home />}
                  text="Home"
                  onClick={() => navigate("/admin/admin-home")}
                  showText={true}
                />
                <SidebarItem
                  icon={<SquareCheck />}
                  text="Monitor all Requests"
                  onClick={() => navigate("/admin/requests")}
                  showText={true}
                />
                <SidebarItem
                  icon={<Dog />}
                  text="Monitor all Pets"
                  onClick={() => navigate("/admin/pets")}
                  showText={true}
                />
                <SidebarItem
                  icon={<MessageSquare />}
                  text="Community"
                  onClick={() => navigate("/admin/community")}
                  showText={true}
                />
                <SidebarItem
                  icon={<FileText />}
                  text="Blog"
                  onClick={() => navigate("/admin/blog")}
                  showText={true}
                />
                <SidebarItem
                  icon={<Plus />}
                  text="Add Blog"
                  onClick={() => navigate("/admin/editor")}
                  showText={true}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <SidebarItem icon={<LogOut />} text="Logout" showText />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure to Logout?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You will have to login again using resgitered Email and
                        Password.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Continue
                      </AlertDialogAction>
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

export default AdminSidebar;

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
