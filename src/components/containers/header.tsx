import React from "react";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <div className="h-10 w-10 bg-primary-400 rounded-full text-xs flex items-center justify-center text-white">
            LOGO
          </div>
        </div>

        <div className={cn("block lg:!hidden")}>
          {/* <MobileSidebar /> */}
        </div>
      </nav>
    </div>
  )
};

export default Header;

