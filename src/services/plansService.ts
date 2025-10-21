const BASE_URL = "http://localhost:3001";

export async function createPlan(plan: {
  nome: string;
  preco: string;
  servicos: { nome: string; limite: number }[]; // muda para number
}) {
  const response = await fetch(`${BASE_URL}/planos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan),
  });
  if (!response.ok) throw new Error("Erro ao criar plano");
  return response.json();
}

export async function getPlans() {
  const response = await fetch(`${BASE_URL}/planos`);
  if (!response.ok) throw new Error("Erro ao buscar planos");
  return response.json();
}
