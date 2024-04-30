import { Outlet } from "react-router-dom";
import Header from "@/components/containers/header";
import Sidebar from "@/components/containers/sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16 px-2">
          <Outlet />
        </main>
      </div>
    </>
  )
};

export default DashboardLayout;
