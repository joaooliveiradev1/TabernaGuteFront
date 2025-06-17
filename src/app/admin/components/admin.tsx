"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Clock,
  CalendarCheck2,
  Users,
  LogOut,
  User2,
  Download,
  ChartColumnIncreasing,
  CheckSquare,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Reserva } from "@/types";
import api from "@/lib/axios";

export default function PainelReservasAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await api.get("/reserva");
        setReservas(response.data);
      } catch (error) {
        console.error("Erro ao carregar reservas", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservas();
  }, []);

  async function atualizarStatusReserva(
    id: number,
    acao: "aprovar" | "rejeitar" | "pendente" | "finaliza",
    observacao?: string
  ) {
    try {
      const url = `/controle/${id}/${acao}`;
      if (acao === "rejeitar") {
        await api.post(url, observacao);
      } else {
        await api.post(url);
      }

      // Atualizar lista
      const { data } = await api.get<Reserva[]>("/reserva");
      setReservas(data);
    } catch (error) {
      console.error(`Erro ao ${acao} reserva #${id}`, error);
      alert("Ops! Houve um erro ao atualizar o status.");
    }
  }

  const excluirReserva = async (id: string | number) => {
    const confirmacao = confirm("Tem certeza que deseja excluir esta reserva?");
    if (!confirmacao) return;

    try {
      await api.delete(`/reserva/${id}`);
      setReservas((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir reserva.");
    }
  };
  
  

  const totalPendentes = reservas.filter((r) => r.reservaStatus === "PENDENTE").length;
  const totalConfirmadas = reservas.filter(
    (r) => r.reservaStatus === "CONFIRMADA"
  ).length;
  const totalReservas = reservas.length;

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between pb-5 border-b-1">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-sm text-muted-foreground">Bem-vindo, Administrador</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center rounded-lg border px-4 py-1 bg-yellow-200/75 gap-3">
            <Clock color="oklch(85.2% 0.199 91.936)" />
            <div className="grid items-center">
              <span>Pendentes</span>
              <span className="text-yellow-600 text-xl">{totalPendentes}</span>
            </div>
          </div>
          <div className="flex justify-center items-center rounded-lg border px-4 py-1 bg-green-200/75 gap-3">
            <CalendarCheck2 color="oklch(79.2% 0.209 151.711)" />
            <div className="grid items-center">
              <span>Confirmadas</span>
              <span className="text-green-600 text-xl">{totalConfirmadas}</span>
            </div>
          </div>
          <div className="flex justify-center items-center rounded-lg border px-4 py-1 bg-blue-200/75 gap-5">
            <Users color="oklch(70.7% 0.165 254.624)" />
            <div className="grid items-center">
              <span>Total</span>
              <span className="text-blue-600 text-xl">{totalReservas}</span>
            </div>
          </div>

          <Link href={"/"}>
            <div className="flex flex-row justify-center items-center rounded-sm border px-4 h-10 gap-3 shadow">
              <LogOut size={20} />
              <span className="text-zinc-950 text-lg">sair</span>
            </div>
          </Link>
        </div>
      </div>

      <section className="flex justify-evenly items-center gap-15">
        <div className="acoes p-6 pb-30">
          <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>

          <div className="grid grid-cols-2 gap-4 w-80 h-60 ">
            <div className="border rounded-md p-4 w-40 h-40 shadow-sm gap-4 ">
              <User2 />
              <p>Novo admin</p>
            </div>
            <div className="border rounded-md p-4 w-40 h-40 shadow-sm">
              <Download />
              <p>Exportar</p>
            </div>
            <div className="border rounded-md p-4 w-40 h-40 shadow-sm">
              <ChartColumnIncreasing />
              <p>Relatórios</p>
            </div>
            <div className="border rounded-md p-4 w-40 h-40 shadow-sm">
              <Settings />
              <p>Configurações</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              Todas <span className="ml-2 text-blue-600">{totalReservas}</span>
            </Button>
            <Button variant="outline">
              <Clock className="mr-1 h-4 w-4" />
              Pendentes <span className="ml-1">{totalPendentes}</span>
            </Button>
            <Button variant="outline">
              <CalendarCheck2 className="mr-1 h-4 w-4" />
              Confirmadas <span className="ml-1">{totalConfirmadas}</span>
            </Button>
            <Button variant="outline">
              Concluídas{" "}
              <span className="ml-1">
                {reservas.filter((r) => r.reservaFinalizada).length}
              </span>
            </Button>
            <Button variant="outline">
              Rejeitadas{" "}
              <span className="ml-1">
                {reservas.filter((r) => r.reservaStatus === "REJEITADA").length}
              </span>
            </Button>
            <Button variant="outline">
              Canceladas{" "}
              <span className="ml-1">
                {reservas.filter((r) => r.reservaStatus === "CANCELADA").length}
              </span>
            </Button>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 items-center mt-4">
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              className="w-full"
            />
          </div>

          <Card className="mt-6 flex flex-1 min-h-[200px] max-h-[24rem] overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
                <span className="ml-3 text-gray-600">Carregando reservas...</span>
              </div>
            ) : reservas.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                Nenhuma reserva encontrada.
              </p>
            ) : (
              <ul className="flex flex-col space-y-4 overflow-y-auto max-h-[22rem] p-4">
                {reservas.map((reserva) => (
                  <li
                    key={reserva.id}
                    className="border p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="font-semibold text-lg text-blue-800">
                        🧾 Reserva #{reserva.id}
                      </h2>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          reserva.reservaStatus === "PENDENTE"
                            ? "bg-yellow-100 text-yellow-800"
                            : reserva.reservaStatus === "CONFIRMADA"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {reserva.reservaStatus}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                      <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                        <CalendarCheck2 className="w-4 h-4 text-blue-600" />
                        {new Date(reserva.dataHora).toLocaleDateString()} às{" "}
                        {new Date(reserva.dataHora).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>

                      <span className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded">
                        <Users className="w-4 h-4 text-purple-600" />
                        {reserva.qtnAdultos} adultos, {reserva.qtnCriancas} crianças
                      </span>

                      <span className="flex items-center gap-1 bg-pink-50 px-2 py-1 rounded">
                        🐾 {reserva.hasPets ? "Com pets" : "Sem pets"}
                      </span>

                      <span className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                        💬 {reserva.observacoes || "Sem observações"}
                      </span>

                      <span
                        className={`flex items-center gap-1 px-2 py-1 rounded ${
                          reserva.reservaFinalizada
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <CheckSquare className="w-4 h-4" />
                        {reserva.reservaFinalizada ? "Finalizada" : "Não finalizada"}
                      </span>

                      {/* Nome e contato do usuário */}
                      <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                        👤 {reserva.cliente.nome || "Sem nome"}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                        📧 {reserva.cliente.email || "Sem email"}
                      </span>
                      {reserva.cliente.telefone && (
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                          📞 {reserva.cliente.telefone}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap mt-4 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-300 hover:bg-green-100"
                        onClick={() => atualizarStatusReserva(reserva.id, "aprovar")}
                      >
                        ✅ Aprovar
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="text-yellow-600 border-yellow-300 hover:bg-yellow-100"
                        onClick={() => {
                          const obs = prompt("Informe observação (pendente):");
                          if (obs !== null) {
                            atualizarStatusReserva(reserva.id, "pendente", obs);
                          }
                        }}
                      >
                        ⏳ Pendente
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-100"
                        onClick={() => {
                          const obs = prompt("Motivo da rejeição:");
                          if (obs !== null) {
                            atualizarStatusReserva(reserva.id, "rejeitar", obs);
                          }
                        }}
                      >
                        ❌ Rejeitar
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-600 border-blue-300 hover:bg-blue-100"
                        onClick={() => atualizarStatusReserva(reserva.id, "finaliza")}
                      >
                        🏁 Finalizar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-white bg-red-600 hover:bg-red-700"
                        onClick={() => excluirReserva(reserva.id)}
                      >
                        🗑️ Excluir
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </section>
    </section>
  );
}
