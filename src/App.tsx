import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./pages/DashboardLayout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const DashboardPage = lazy(() => import("./pages/Index"));
const AssetsPage = lazy(() => import("./pages/AssetsPage"));
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const ImportPage = lazy(() => import("./pages/ImportPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const CriptoPage = lazy(() => import("./pages/CriptoPage"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <Router>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                Carregando...
              </div>
            }
          >
            <Routes>
              {/* Rotas de autenticação */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Rotas protegidas */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="assets" element={<AssetsPage />} />
                <Route path="crypto" element={<CriptoPage />} />
                <Route path="transactions" element={<TransactionsPage />} />
                <Route path="import" element={<ImportPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Redireciona para a página de login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;