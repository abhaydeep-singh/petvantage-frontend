import React, { useState } from "react";

import { SidebarComponent } from "@/components";
import { Outlet } from "react-router-dom";


export default function UserDashboard() {

//   const [isMobileOpen, setIsMobileOpen] = useState(false); // Controls mobile sidebar

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
     
      {/* <SidebarComponent isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}/> */}
      <SidebarComponent/>

      {/* Main Content Area */}
      <Outlet/>
    </div>
  );
}
