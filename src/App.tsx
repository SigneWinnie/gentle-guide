import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppDataProvider } from "@/context/AppDataContext";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import StudentsPage from "@/pages/StudentsPage";
import RegistrationsPage from "@/pages/RegistrationsPage";
import CoursesPage from "@/pages/CoursesPage";
import GradesPage from "@/pages/GradesPage";
import RoomsPage from "@/pages/RoomsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppDataProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/registrations" element={<RegistrationsPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/grades" element={<GradesPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
