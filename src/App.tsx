import "./App.css";
import { Appointment } from "./components/Appointment";
import ClientPage from "./components/ClientsPage";
import HomeScreen from "./components/HomeScreen";
import { LayoutComponent } from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router";
import { Plans } from "./components/Plans";
import AuthScreen from "./components/AuthScreen";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthScreen />} />

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
  );
}

export default App;
