import Cookies from "js-cookie";

export function useAuth() {
  const isAuthenticated = !!Cookies.get("authToken");

  const login = (email: string, password: string) => {
    if (email === "admin@barber.com" && password === "123456") {
      Cookies.set("authToken", "fake_token_123", { expires: 1 }); // 1 dia
      return true;
    }
    return false;
  };

  const logout = () => {
    Cookies.remove("authToken");
  };

  return { isAuthenticated, login, logout };
}
