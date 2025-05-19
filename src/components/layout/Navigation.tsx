
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
  Bitcoin,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

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

export default function Navigation() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold tracking-tight">
          Gestor de Portfólio
        </h2>
      </div>
      <nav className="flex-1 overflow-auto py-4 px-4">
        <div className="space-y-1">
          <NavItem 
            to="/"
            label="Painel"
            icon={<LayoutDashboard className="h-5 w-5" />}
          />
          <NavItem 
            to="/assets"
            label="Ativos"
            icon={<Wallet className="h-5 w-5" />}
          />
          <NavItem 
            to="/crypto"
            label="Criptomoedas"
            icon={<Bitcoin className="h-5 w-5" />}
          />
          <NavItem 
            to="/transactions"
            label="Transações"
            icon={<ArrowLeftRight className="h-5 w-5" />}
          />
          <NavItem 
            to="/import"
            label="Importar Dados"
            icon={<FilePlus className="h-5 w-5" />}
          />
          <NavItem 
            to="/reports"
            label="Relatórios"
            icon={<BarChart3 className="h-5 w-5" />}
          />
          <NavItem 
            to="/settings"
            label="Configurações"
            icon={<Settings className="h-5 w-5" />}
          />
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center py-2 px-4 text-muted-foreground hover:text-primary hover:bg-accent rounded-md w-full"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </button>
      </nav>
    </div>
  );
}
