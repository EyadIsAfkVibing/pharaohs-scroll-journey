import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DynastyPage from "./pages/DynastyPage";
import NotFound from "./pages/NotFound";
import { AncientAnimationProvider } from "./components/animations/AncientAnimationProvider";
import CreditsPage from "@/pages/CreditsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AncientAnimationProvider>
          <Routes>
            <Route path="/credits" element={<CreditsPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/dynasty/:id" element={<DynastyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AncientAnimationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;