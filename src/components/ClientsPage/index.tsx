"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlans } from "@/services/plansService";

export default function ClientPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [nameClient, setNameClient] = useState("");
  const [phoneClient, setPhoneClient] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["planos"],
    queryFn: getPlans,
  });

  const plansArray = data ? Object.values(data) : [];

  return (
    <div className="w-full">
      {/* HEADER */}
      <header className="flex sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Clientes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Gerencie seus clientes e visualize informações detalhadas.
          </p>
        </div>

        {/* Botão abre o modal */}
        <Button
          variant="default"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-4 h-4" />
          Novo cliente
        </Button>
      </header>

      {/* MODAL SIMPLES */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-4xl p-6 relative">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Novo Cliente
            </h2>

            <div className="grid gap-4 py-2 w-full">
              <Input
                placeholder="Nome completo"
                value={nameClient}
                onChange={(e) => setNameClient(e.target.value)}
              />
              <Input
                type="phone"
                placeholder="Celular"
                value={phoneClient}
                onChange={(e) => setPhoneClient(e.target.value)}
              />
              <Select
                onValueChange={(value) => {
                  // busca o plano pelo nome selecionado
                  const plan = plansArray.find((p: any) => p.nome === value);
                  setSelectedPlan(plan ?? null);
                }}
              >
                {" "}
                <SelectTrigger className="w-full border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Plano" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-700 rounded-md shadow-lg">
                  {isLoading && (
                    <SelectItem value="loading" className="text-white">
                      Carregando...
                    </SelectItem>
                  )}
                  {isError && (
                    <SelectItem value="error" className="text-white">
                      Erro ao carregar
                    </SelectItem>
                  )}
                  {!isLoading &&
                    !isError &&
                    plansArray.map((plan: any, i) => (
                      <SelectItem
                        key={i}
                        value={plan.nome}
                        className="text-white"
                      >
                        {plan.nome} - R$ {plan.preco}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  console.log("Cliente criado:", {
                    nome: nameClient,
                    telefone: phoneClient,
                    plano: selectedPlan?.nome,
                    preco: selectedPlan?.preco,
                    servicos: selectedPlan?.servicos, 
                  });
                  setShowModal(false);
                }}
              >
                Salvar Cliente
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <section className="rounded-2xl bg-white dark:bg-gray-800 shadow-sm p-6 min-h-[400px] transition-colors">
        <div className="text-gray-500 dark:text-gray-400 text-center py-20">
          Nenhum cliente cadastrado ainda.
          <br />
          <span className="text-sm">
            Clique em{" "}
            <span className="font-medium text-blue-600">“Novo cliente”</span>{" "}
            para adicionar um.
          </span>
        </div>
      </section>
    </div>
  );
}
