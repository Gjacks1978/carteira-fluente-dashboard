
import { Outlet } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen min-h-screen bg-background">
      <Navigation />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        <footer className="border-t p-4">
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portfolio Manager. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
