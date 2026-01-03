import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LocalizedRoutes from "@/components/LocalizedRoutes";
import { DEFAULT_SHORT_CODE } from "@/i18n";

// V3 Pages (Fusão Visual + Poética)
const IndexV3 = lazy(() => import("./pages/IndexV3"));

// V4 Pages (Horizontal Navigation)
const IndexHorizontal = lazy(() => import("./pages/IndexHorizontal"));

// V2 Pages (Futuro Ancestral) - lazy loaded
const IndexV2 = lazy(() => import("./pages/IndexV2"));

// Lazy load other pages
const Estudos = lazy(() => import("./pages/Estudos"));
const CinemaSemCameras = lazy(() => import("./pages/CinemaSemCameras"));
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
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Root redirect to default language */}
                <Route path="/" element={<Navigate to={`/${DEFAULT_SHORT_CODE}/`} replace />} />

                {/* Localized routes with language prefix */}
                <Route path="/:lang" element={<LocalizedRoutes />}>
                  {/* Home */}
                  <Route index element={<IndexV3 />} />

                  {/* Main pages - PT routes */}
                  <Route path="escola" element={<Estudos />} />
                  <Route path="escola/cinema-sem-cameras" element={<CinemaSemCameras />} />
                  <Route path="studio" element={<StudioV2 />} />
                  <Route path="playground" element={<Archive />} />
                  <Route path="arquivo" element={<Archive />} />
                  <Route path="contato" element={<ContactV2 />} />

                  {/* Main pages - EN routes (aliases) */}
                  <Route path="school" element={<Estudos />} />
                  <Route path="school/cinema-without-cameras" element={<CinemaSemCameras />} />
                  <Route path="archive" element={<Archive />} />
                  <Route path="contact" element={<ContactV2 />} />

                  {/* Legacy/utility routes */}
                  <Route path="galeria" element={<Archive />} />
                  <Route path="horizontal" element={<IndexHorizontal />} />
                  <Route path="journal" element={<Journal />} />
                  <Route path="manifesto" element={<Manifesto />} />

                  {/* Auth */}
                  <Route path="login" element={<Login />} />

                  {/* Clone Chat */}
                  <Route path="chat/:cloneId" element={<CloneChatPage />} />

                  {/* LORE (Protected) */}
                  <Route path="lore" element={
                    <ProtectedRoute>
                      <LoreDemo />
                    </ProtectedRoute>
                  } />

                  {/* 404 within language */}
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Legacy routes without language prefix - redirect to PT */}
                <Route path="/escola" element={<Navigate to="/pt/escola" replace />} />
                <Route path="/escola/*" element={<Navigate to="/pt/escola" replace />} />
                <Route path="/studio" element={<Navigate to="/pt/studio" replace />} />
                <Route path="/contato" element={<Navigate to="/pt/contato" replace />} />
                <Route path="/contact" element={<Navigate to="/pt/contato" replace />} />
                <Route path="/playground" element={<Navigate to="/pt/playground" replace />} />
                <Route path="/galeria" element={<Navigate to="/pt/arquivo" replace />} />
                <Route path="/journal" element={<Navigate to="/pt/journal" replace />} />
                <Route path="/manifesto" element={<Navigate to="/pt/manifesto" replace />} />
                <Route path="/login" element={<Navigate to="/pt/login" replace />} />
                <Route path="/lore" element={<Navigate to="/pt/lore" replace />} />
                <Route path="/chat/:cloneId" element={<Navigate to="/pt/chat/:cloneId" replace />} />

                {/* Version routes for reference (keep without lang prefix for dev) */}
                <Route path="/v1" element={<Index />} />
                <Route path="/v2" element={<IndexV2 />} />
                <Route path="/horizontal" element={<IndexHorizontal />} />

                {/* Global 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
