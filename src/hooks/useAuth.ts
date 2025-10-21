import { useEffect, useState } from "react";
import { getAuthCookie, setAuthCookie, clearAuthCookie } from "@/utils/auth";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuthCookie();
    if (auth) {
      setIsAuthenticated(true);
      setUser(auth.user);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // ✅ Adiciona a função de login
  function login(email: string, password: string) {
    // exemplo simples, substitua pela sua lógica real
    if (email === "admin@barber.com" && password === "123456") {
      const payload = { user: email, token: "fake-token" };
      setAuthCookie(payload);
      setIsAuthenticated(true);
      setUser(email);
      return true;
    }
    return false;
  }

  function logout() {
    clearAuthCookie();
    setIsAuthenticated(false);
    setUser(null);
  }

  return { isAuthenticated, user, login, logout };
}
