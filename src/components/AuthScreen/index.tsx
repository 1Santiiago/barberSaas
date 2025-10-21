import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Scissors } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, _] = useTransition();

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        console.log("✅ Login sucesso");
        navigate("/");
      } else {
        setError("Credenciais inválidas!");
      }
    } catch (err) {
      console.error(err);
      setError("Erro inesperado.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-950/60 backdrop-blur-md border border-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-full shadow-lg">
            <Scissors size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mt-4 tracking-tight">
            BarberManager
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Faça login para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Usuário ou E-mail
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ex: admin@barber.com"
              className="w-full rounded-lg border border-gray-700 bg-gray-900 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-700 bg-gray-900 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center mt-2">{error}</div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`w-full flex justify-center items-center gap-2 py-2 rounded-lg font-semibold transition-colors ${
              isPending
                ? "bg-blue-800 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isPending ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm">
          <a
            href="#"
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            Esqueci minha senha
          </a>
        </div>
      </div>
    </div>
  );
}
