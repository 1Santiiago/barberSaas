import "./App.css";
import ClientPage from "./components/ClientsPage";
import HomeScreen from "./components/HomeScreen";
import { LayoutComponent } from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
