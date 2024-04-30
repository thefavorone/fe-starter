import React from "react";
import { cn } from "@/lib/utils";
import DashboardNav from "@/components/containers/dashboard-nav";

const Sidebar: React.FC = () => {
  return (
    <nav className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <DashboardNav />
          </div>
        </div>
      </div>
    </nav>
  )
};

export default Sidebar;

