import React from 'react'

import { NgoSidebarComponent } from "@/components";
import { Outlet } from "react-router-dom";
import { ParticlesBackground } from '@/components';

function NGODashboard() {
  return (
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
       <ParticlesBackground/>
        {/* <SidebarComponent isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}/> */}
        <NgoSidebarComponent/>
        {/* Main Content Area */}
        <Outlet/>
      </div>
    );
}

export default NGODashboard
