import React from 'react'

import { NgoSidebarComponent, SidebarComponent } from "@/components";
import { Outlet } from "react-router-dom";

function NGODashboard() {
  return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
       
        {/* <SidebarComponent isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}/> */}
        <NgoSidebarComponent/>
        {/* Main Content Area */}
        <Outlet/>
      </div>
    );
}

export default NGODashboard
