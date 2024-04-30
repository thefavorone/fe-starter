import * as React from "react"; 
import Lottie from "lottie-react";
import { cn } from "@/lib/utils";
import { LayoutDashboardIcon, LucideIcon, X } from "lucide-react";

const IconLottie = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & any
>(({ className, animationData, ...props }, ref) => (
  <Lottie 
		loop={true} 
		animationData={animationData} 
		{...props}
		ref={ref}
		className={cn(className)}
	/>
));
IconLottie.displayName = "Icon Lottie";

export type Icon = LucideIcon;

const Icons = {
	close: X,
	dashboard: LayoutDashboardIcon
}

export { Icons, IconLottie };
