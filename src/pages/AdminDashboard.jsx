import React from 'react'

import { AdminSidebar } from "@/components";
import { Outlet } from "react-router-dom";
import { ParticlesBackground } from '@/components';

function AdminDashboard() {
  return (
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
       <ParticlesBackground/>
        {/* <SidebarComponent isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}/> */}
        <AdminSidebar/>
        {/* Main Content Area */}
        <Outlet/>
      </div>
    );
}

export default AdminDashboard
