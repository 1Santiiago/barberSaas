"use client";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthScreen from "./components/AuthScreen";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LayoutComponent } from "./components/Layout";
import HomeScreen from "./components/HomeScreen";
import ClientPage from "./components/ClientsPage";
import { Appointment } from "./components/Appointment";
import { Plans } from "./components/Plans";

// Cria o client uma única vez (fora do componente)
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Tela de login */}
          <Route path="/login" element={<AuthScreen />} />

          {/* Dashboard principal */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LayoutComponent>
                  <HomeScreen />
                </LayoutComponent>
              </ProtectedRoute>
            }
          />

          {/* Clientes */}
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <LayoutComponent>
                  <ClientPage />
                </LayoutComponent>
              </ProtectedRoute>
            }
          />

          {/* Agendamentos */}
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <LayoutComponent>
                  <Appointment />
                </LayoutComponent>
              </ProtectedRoute>
            }
          />

          {/* Planos */}
          <Route
            path="/plans"
            element={
              <ProtectedRoute>
                <LayoutComponent>
                  <Plans />
                </LayoutComponent>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
