import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuthCookie } from "../../utils/auth";

function HomeScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuthCookie();
    if (!auth) {
      navigate("/login");
    } else {
      setUser(auth.user);
    }
  }, [navigate]);

  if (!user) return null;
  return (
    <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-8 flex-grow mb-20 ">
      <Card>
        <CardHeader>
          <CardTitle>Faturamento Mensal</CardTitle>
          <CardContent>R$: 0 </CardContent>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Assinantes</CardTitle>
          <CardContent>0</CardContent>
        </CardHeader>
      </Card>
    </main>
  );
}

export default HomeScreen;
