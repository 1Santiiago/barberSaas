import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

export const Appointment = () => {
  // simulando usn client, que virao via api
  const clients = ["João Silva", "Maria Souza", "Pedro Oliveira", "Ana Costa"];
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSchedule = () => {
    console.log("Agendamento:", { selectedClient, date, time });
    setShowModal(false);
  };
  return (
    <div className="w-full">
      {/* HEADER */}
      <header className="flex sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Agendamentos
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Tenha controle da sua agenda e crie novos agendamentos facilmente.
          </p>
        </div>

        {/* Botão abre o modal */}
        <Button
          variant="default"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-4 h-4" />
          Novo
        </Button>
      </header>

      {/* MODAL SIMPLES */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Novo Agendamento
            </h2>

            <div className="flex flex-col gap-4 py-2 z-50">
              {/* CLIENTE */}
              <Select onValueChange={(val) => setSelectedClient(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-700 rounded-md shadow-lg dark:text-white">
                  {clients.map((client: any) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* DATA */}
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              {/* HORA */}
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleSchedule}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
              >
                Agendar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <section className="rounded-3xl bg-white dark:bg-gray-800 shadow-sm p-6 min-h-[400px] transition-colors">
        <div className="text-gray-500 dark:text-gray-400 text-center py-20">
          Nenhum agendamento cadastrado ainda.
          <br />
          <span className="text-sm">
            Clique em <span className="font-medium text-blue-600">“Novo”</span>{" "}
            para adicionar um.
          </span>
        </div>
      </section>
    </div>
  );
};
