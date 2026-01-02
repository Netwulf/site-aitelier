import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// V3 Pages (Fusão Visual + Poética)
const IndexV3 = lazy(() => import("./pages/IndexV3"));

// V4 Pages (Horizontal Navigation)
const IndexHorizontal = lazy(() => import("./pages/IndexHorizontal"));

// V2 Pages (Futuro Ancestral) - lazy loaded
const IndexV2 = lazy(() => import("./pages/IndexV2"));

// Lazy load other pages
const Campo = lazy(() => import("./pages/Campo"));
const Estudos = lazy(() => import("./pages/Estudos"));
const StudioV2 = lazy(() => import("./pages/StudioV2"));
const Archive = lazy(() => import("./pages/Archive"));
const ContactV2 = lazy(() => import("./pages/ContactV2"));

// Legacy pages (keep for backward compatibility)
const Index = lazy(() => import("./pages/Index"));
const Studio = lazy(() => import("./pages/Studio"));
const Contact = lazy(() => import("./pages/Contact"));
const Journal = lazy(() => import("./pages/Journal"));
const Manifesto = lazy(() => import("./pages/Manifesto"));
const NotFound = lazy(() => import("./pages/NotFound"));

// LORE - AI Knowledge Base Demo
const LoreDemo = lazy(() => import("./pages/LoreDemo"));
const Login = lazy(() => import("./pages/Login"));

// Clone Chat - Fullscreen AI conversations
const CloneChatPage = lazy(() => import("./pages/CloneChatPage"));

const queryClient = new QueryClient();

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-void-black flex items-center justify-center">
    <div className="text-warm-ivory font-mono-v2 text-sm">...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
            {/* V3 Routes (Site Completo) - Home */}
            <Route path="/" element={<IndexV3 />} />
            <Route path="/horizontal" element={<IndexHorizontal />} /> {/* Menu teste */}
            <Route path="/atelier" element={<Campo />} />
            <Route path="/escola" element={<Estudos />} />
            <Route path="/studio" element={<StudioV2 />} />
            <Route path="/playground" element={<Archive />} />
            <Route path="/galeria" element={<Archive />} /> {/* Legacy redirect */}
            <Route path="/contato" element={<ContactV2 />} />

            {/* Version routes for reference */}
            <Route path="/v1" element={<Index />} />
            <Route path="/v2" element={<IndexV2 />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/manifesto" element={<Manifesto />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />

            {/* Clone Chat - Fullscreen AI conversations */}
            <Route path="/chat/:cloneId" element={<CloneChatPage />} />

            {/* LORE - AI Knowledge Base (Protected) */}
            <Route path="/lore" element={
              <ProtectedRoute>
                <LoreDemo />
              </ProtectedRoute>
            } />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
