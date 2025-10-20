import "./App.css";
import { Appointment } from "./components/Appointment";
import ClientPage from "./components/ClientsPage";
import HomeScreen from "./components/HomeScreen";
import { LayoutComponent } from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router";
import { Plans } from "./components/Plans";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutComponent>
              <HomeScreen />
            </LayoutComponent>
          }
        />
        <Route
          path="/clients"
          element={
            <LayoutComponent>
              <ClientPage />
            </LayoutComponent>
          }
        />
        <Route
          path="/appointments"
          element={
            <LayoutComponent>
              <Appointment />
            </LayoutComponent>
          }
        />
        <Route
          path="/plans"
          element={
            <LayoutComponent>
              <Plans />
            </LayoutComponent>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
