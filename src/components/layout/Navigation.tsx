
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  PieChart,
  LineChart,
  BarChart3,
  FilePlus,
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Settings,
} from "lucide-react";

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

function NavItem({ to, label, icon }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

export function Navigation() {
  return (
    <div className="flex w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold tracking-tight">
          Portfolio Manager
        </h2>
      </div>
      <nav className="flex-1 overflow-auto py-4 px-4">
        <div className="space-y-1">
          <NavItem 
            to="/"
            label="Dashboard"
            icon={<LayoutDashboard className="h-5 w-5" />}
          />
          <NavItem 
            to="/assets"
            label="Assets"
            icon={<Wallet className="h-5 w-5" />}
          />
          <NavItem 
            to="/transactions"
            label="Transactions"
            icon={<ArrowLeftRight className="h-5 w-5" />}
          />
          <NavItem 
            to="/import"
            label="Import Data"
            icon={<FilePlus className="h-5 w-5" />}
          />
          <NavItem 
            to="/reports"
            label="Reports"
            icon={<BarChart3 className="h-5 w-5" />}
          />
          <NavItem 
            to="/settings"
            label="Settings"
            icon={<Settings className="h-5 w-5" />}
          />
        </div>
      </nav>
    </div>
  );
}
