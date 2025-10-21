import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuthCookie } from "@/utils/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomeScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuthCookie();
    console.log("🧩 Cookie lido:", auth);
    if (!auth) {
      navigate("/login");
    } else {
      setUser(auth.user);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-8 flex-grow mb-20">
      <h1 className="text-xl font-semibold">Bem-vindo, {user}!</h1>
      <Card>
        <CardHeader>
          <CardTitle>Faturamento Mensal</CardTitle>
          <CardContent>R$: 0</CardContent>
        </CardHeader>
      </Card>
    </main>
  );
}
