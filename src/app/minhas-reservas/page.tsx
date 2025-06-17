/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, PawPrint, User, Users, PlusCircle } from "lucide-react";
import api from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reserva } from "@/types";


export default function ReservaPage() {
  const { data: session, status } = useSession();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [open, setOpen] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [form, setForm] = useState({
    data: "",
    hora: "",
    qtnAdultos: 1,
    qtnCriancas: 0,
    hasPets: false,
    observacoes: "",
  });

  const fetchReservas = async () => {
    if (session?.user?.id) {
      try {
        const res = await api.get(`/reserva/cliente/${session.user.id}`);
        setReservas(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchReservas();
    }
  }, [status]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMensagem("");

    try {
      const dataHora = new Date(`${form.data}T${form.hora}:00`);
      const payload = {
        clienteId: session?.user?.id,
        dataHora,
        qtnAdultos: form.qtnAdultos,
        qtnCriancas: form.qtnCriancas,
        hasPets: form.hasPets,
        observacoes: form.observacoes,
      };

      await api.post("/reserva", payload);
      setOpen(false);
      setForm({
        data: "",
        hora: "",
        qtnAdultos: 1,
        qtnCriancas: 0,
        hasPets: false,
        observacoes: "",
      });

      fetchReservas();
    } catch (error: any) {
      setMensagem(error.response?.data?.message || "Erro ao criar reserva.");
    }
  };

  const excluirReserva = async (id: number) => {
    if (!confirm("Deseja mesmo cancelar esta reserva?")) return;
    try {
      await api.delete(`/reserva/${id}`);
      setReservas((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert("Erro ao cancelar reserva.");
    }
  };

  return (
    <section className="px-6 py-10 max-w-4xl mx-auto ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl">Minhas Reservas</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-yellow-300 text-black hover:bg-yellow-400">
              <PlusCircle className="w-5 h-5" />
              Nova Reserva
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Reserva</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="text-sm font-medium text-gray-700">Data</label>
                <input
                  type="date"
                  name="data"
                  value={form.data}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Hora</label>
                <select
                  name="hora"
                  value={form.hora}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-md px-4 py-2"
                >
                  <option value="">Selecione</option>
                  <option value="11:30">11:30</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Adultos</label>
                <input
                  type="number"
                  name="qtnAdultos"
                  value={form.qtnAdultos}
                  onChange={handleChange}
                  min={1}
                  required
                  className="mt-1 w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Crianças</label>
                <input
                  type="number"
                  name="qtnCriancas"
                  value={form.qtnCriancas}
                  onChange={handleChange}
                  min={0}
                  className="mt-1 w-full border rounded-md px-4 py-2"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hasPets"
                  checked={form.hasPets}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label className="text-sm text-gray-700">Levarei pets</label>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Observações</label>
                <textarea
                  name="observacoes"
                  rows={4}
                  value={form.observacoes}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-4 py-2"
                  placeholder="Ex: cadeira para criança, alergia, etc."
                />
              </div>

              <div className="md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="bg-yellow-300 text-black px-6 py-3 rounded-md hover:bg-yellow-400 transition"
                >
                  Confirmar Reserva
                </button>
              </div>

              {mensagem && (
                <div className="md:col-span-2 text-center text-sm text-red-600 mt-2">
                  {mensagem}
                </div>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {reservas.length == 0 ? (
          <Card className="flex flex-col text-xl p-30 items-center gap-5 mt-10">
            <p>Sem nenhuma reserva</p>
            <p>Faça suas Reservas agora😊</p>
          </Card>
        ) : (
          reservas.map((reserva) => (
            <Card key={reserva.id}>
              <CardContent className="p-6 space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">
                    Reserva #{reserva.id} -{" "}
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        reserva.reservaStatus === "PENDENTE"
                          ? "bg-yellow-200 text-yellow-800"
                          : reserva.reservaStatus === "APROVADA"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {reserva.reservaStatus}
                    </span>
                  </h2>
                  {reserva.reservaStatus === "PENDENTE" && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => excluirReserva(reserva.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  )}
                </div>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(reserva.dataHora).toLocaleDateString("pt-BR")} às{" "}
                  {new Date(reserva.dataHora).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <Users className="inline w-4 h-4" /> Adultos: {reserva.qtnAdultos}{" "}
                  &nbsp;
                  <User className="inline w-4 h-4" /> Crianças: {reserva.qtnCriancas}{" "}
                  &nbsp;
                  {reserva.hasPets && (
                    <PawPrint className="inline w-4 h-4 text-gray-700" />
                  )}
                </p>
                {reserva.observacoes && (
                  <p>
                    <strong>Obs:</strong> {reserva.observacoes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
