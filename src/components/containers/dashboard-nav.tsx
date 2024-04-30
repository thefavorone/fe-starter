import { Icons } from "@ui/icons";
import { cn } from "@/lib/utils";

const DashboardNav = () => {
  const Icon = Icons["dashboard"];
  return (
    <nav className="grid items-start gap-2">
      <a href="#" className="bg-gray-100 rounded-lg active:bg-gray-100 bg-opacity-70">
        <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
        </span>
      </a>
    </nav>
  )
}

export default DashboardNav;
