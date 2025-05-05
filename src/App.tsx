
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import Activity from "./pages/Activity";
import Nutrition from "./pages/Nutrition";
import Sleep from "./pages/Sleep";
import Workouts from "./pages/Workouts";
import Goals from "./pages/Goals";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ChatbotButton from "./components/chatbot/ChatbotButton";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected routes with layout */}
            <Route path="/" element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    <Index />
                  </main>
                  <Footer />
                  <ChatbotButton />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/activity" element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    <Activity />
                  </main>
                  <Footer />
                  <ChatbotButton />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/nutrition" element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    <Nutrition />
                  </main>
                  <Footer />
                  <ChatbotButton />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/sleep" element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    <Sleep />
                  </main>
                  <Footer />
                  <ChatbotButton />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/workouts" element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    <Workouts />
                  </main>
                  <Footer />
                  <ChatbotButton />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/goals" element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    <Goals />
                  </main>
                  <Footer />
                  <ChatbotButton />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    <Profile />
                  </main>
                  <Footer />
                  <ChatbotButton />
                </div>
              </ProtectedRoute>
            } />
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
