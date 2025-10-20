"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const Plans = () => {
  const [showModal, setShowModal] = useState(false);
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceLimit, setServiceLimit] = useState("");
  const [services, setServices] = useState<{ name: string; limit: string }[]>(
    []
  );

  const handleAddService = () => {
    if (serviceName.trim() === "" || serviceLimit.trim() === "") return;
    setServices([...services, { name: serviceName, limit: serviceLimit }]);
    setServiceName("");
    setServiceLimit("");
  };

  const handleSavePlan = () => {
    console.log("Novo plano criado:", {
      planName,
      price,
      services,
    });
    setShowModal(false);
    setPlanName("");
    setPrice("");
    setServices([]);
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
          <Plus className="w-4 h-4" />
          Novo Plano
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
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Detalhes do Plano
            </h3>
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

            {/* Serviços Inclusos */}
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Serviços Inclusos
            </h3>
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

            {/* Lista de serviços adicionados */}
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

            {/* BOTÕES */}
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
        <div className="text-gray-500 dark:text-gray-400 text-center py-20">
          Nenhum plano cadastrado ainda.
          <br />
          <span className="text-sm">
            Clique em{" "}
            <span className="font-medium text-blue-600">“Novo Plano”</span> para
            adicionar um.
          </span>
        </div>
      </section>
    </div>
  );
};
