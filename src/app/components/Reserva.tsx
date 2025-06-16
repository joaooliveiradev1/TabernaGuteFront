"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { AxiosError } from "axios";

export function Reserva() {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    data: "",
    hora: "",
    qtnAdultos: 1,
    qtnCriancas: 0,
    hasPets: false,
    pedidoPrevios: [],
    observacoes: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.accessToken) {
      setMensagem("Usuário não autenticado.");
      return;
    }

    const dataHora = new Date(`${form.data}T${form.hora}:00`);

    const payload = {
      clienteId: session.user.id, // certifique-se que o `session.user` tenha `id` disponível
      dataHora: dataHora.toISOString(),
      qtnAdultos: Number(form.qtnAdultos),
      qtnCriancas: Number(form.qtnCriancas),
      hasPets: form.hasPets,
      observacoes: form.observacoes,
    };

    try {
      console.log(payload);
      console.log(session.user);
      const res = await api("/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(payload),
      });

      if (!res.data) {
        throw new Error("Servidor não está respondendo. Tente mais tarde");
      }

      setMensagem("Reserva realizada com sucesso!");
      setForm({
        data: "",
        hora: "",
        qtnAdultos: 1,
        qtnCriancas: 0,
        pedidoPrevios: [],
        hasPets: false,
        observacoes: "",
      });

      // Redireciona para página de reservas ou mostra mensagem de sucesso
      router.push("/minhas-reservas");
    } catch (err) {
      const error = err as AxiosError;

      // Captura mensagem vinda do backend
      const mensagem =
        error.response?.data && typeof error.response.data === "string"
          ? error.response.data
          : "Erro ao fazer reserva. Tente novamente.";

      console.error("Erro na reserva:", error);
      setMensagem(mensagem);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 relative inline-block after:content-[''] after:block after:h-1 after:w-16 after:bg-blue-800 after:mx-auto after:mt-2">
          Reserve sua Mesa
        </h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Planeje sua visita à Taberna do Gute e tenha uma experiência gastronômica
          inesquecível.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data</label>
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
            <label className="block text-sm font-medium text-gray-700">Hora</label>
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
            <label className="block text-sm font-medium text-gray-700">Adultos</label>
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
            <label className="block text-sm font-medium text-gray-700">Crianças</label>
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
            <label className="block text-sm font-medium text-gray-700">Observações</label>
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
      </div>
    </section>
  );
}
