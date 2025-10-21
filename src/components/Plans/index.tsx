import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlans, createPlan } from "@/services/plansService";

export const Plans = () => {
  const [showModal, setShowModal] = useState(false);
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceLimit, setServiceLimit] = useState("");
  const [services, setServices] = useState<{ name: string; limit: string }[]>(
    []
  );

  const queryClient = useQueryClient();

  const handleAddService = () => {
    if (!serviceName.trim() || !serviceLimit.trim()) return;
    setServices((prev) => [
      ...prev,
      { name: serviceName, limit: serviceLimit },
    ]);
    setServiceName("");
    setServiceLimit("");
  };

  const handleSavePlan = async () => {
    try {
      await createPlan({
        nome: planName,
        preco: price,
        servicos: services.map((s) => ({
          nome: s.name,
          limite: Number(s.limit), // converte string para number
        })),
      });

      queryClient.invalidateQueries({ queryKey: ["planos"] });

      setShowModal(false);
      setPlanName("");
      setPrice("");
      setServices([]);
    } catch (err) {
      console.error("Erro ao criar plano:", err);
      alert("Erro ao criar plano. Verifique os dados e tente novamente.");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["planos"],
    queryFn: getPlans,
  });

  const plansArray = data ? Object.values(data) : [];

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="text-center text-gray-500 dark:text-gray-400 py-20">
          Carregando planos...
        </div>
      );
    if (isError)
      return (
        <div className="text-center text-red-500 py-20">
          Erro ao carregar os planos. Tente novamente.
        </div>
      );
    if (!plansArray.length)
      return (
        <div className="text-gray-500 dark:text-gray-400 text-center py-20">
          Nenhum plano cadastrado ainda.
          <br />
          <span className="text-sm">
            Clique em{" "}
            <span className="font-medium text-blue-600">“Novo Plano”</span> para
            adicionar um.
          </span>
        </div>
      );

    return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plansArray.map((plan: any, i) => (
          <li
            key={i}
            className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-gray-50 dark:bg-gray-900 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {plan.nome}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-3">
              R$ {Number(plan.preco).toFixed(2)}
            </p>

            {plan.servicos?.length > 0 && (
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {plan.servicos.map((srv: any) => (
                  <li key={srv.id} className="flex justify-between">
                    <span>{srv.nome}</span>
                    <span className="text-gray-500">{srv.limite}/m</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <header className="flex sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Planos
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Crie e gerencie planos personalizados com serviços inclusos.
          </p>
        </div>

        <Button
          variant="default"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-4 h-4" /> Novo Plano
        </Button>
      </header>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Novo Plano
            </h2>

            {/* Detalhes do Plano */}
            <div className="flex flex-col gap-3 mb-4">
              <Input
                placeholder="Nome do Plano"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
              <Input
                placeholder="Preço Mensal (ex: 59.90)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Serviços */}
            <div className="flex items-center gap-2 mb-3">
              <Input
                placeholder="Nome do Serviço"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
              <Input
                placeholder="Limite/m"
                value={serviceLimit}
                onChange={(e) => setServiceLimit(e.target.value)}
                className="w-24"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleAddService}
                className="bg-gray-100 dark:bg-gray-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {services.length > 0 && (
              <ul className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-3 space-y-2">
                {services.map((s, i) => (
                  <li
                    key={i}
                    className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span>{s.name}</span>
                    <span className="text-gray-500">{s.limit}/m</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleSavePlan}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
              >
                Salvar Plano
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <section className="rounded-2xl bg-white dark:bg-gray-800 shadow-sm p-6 min-h-[400px] transition-colors">
        {renderContent()}
      </section>
    </div>
  );
};
