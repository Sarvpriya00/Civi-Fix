import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import About from "./pages/About";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
// Citizen pages
import CitizenDashboard from "./pages/citizen/Dashboard";
import CitizenReport from "./pages/citizen/Report";
import CitizenReports from "./pages/citizen/MyReports";
import CitizenExplore from "./pages/citizen/Explore";
// Staff pages
import StaffDashboard from "./pages/staff/Dashboard";
import StaffMap from "./pages/staff/Map";
import StaffQueue from "./pages/staff/Queue";
// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminConfig from "./pages/admin/Config";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<Help />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* Citizen routes */}
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route path="/citizen/report" element={<CitizenReport />} />
          <Route path="/citizen/my-reports" element={<CitizenReports />} />
          <Route path="/citizen/explore" element={<CitizenExplore />} />
          
          {/* Staff routes */}
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/staff/map" element={<StaffMap />} />
          <Route path="/staff/queue" element={<StaffQueue />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/config" element={<AdminConfig />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
