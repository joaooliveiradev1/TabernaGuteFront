'use client';

import React, { useState } from 'react';

export default function admin (){
    const [reservas, setReservas] = useState([
    { id: 1, nome: 'João Silva', data: '2025-06-20', hora: '19:00', status: 'Pendente' },
    { id: 2, nome: 'Maria Souza', data: '2025-06-21', hora: '20:00', status: 'Pendente' },]);

  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'João Silva', email: 'joao@email.com' },
    { id: 2, nome: 'Maria Souza', email: 'maria@email.com' }, ]);

  const [novaReserva, setNovaReserva] = useState({ nome: '', data: '', hora: '' });

  const atualizarReserva = (id, status) => {
    setReservas(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  const editarReserva = (id, campo, valor) => {
    setReservas(prev =>
      prev.map(r => (r.id === id ? { ...r, [campo]: valor } : r))
    );
  };

  const criarReserva = () => {
    const nova = {
      id: Date.now(),
      nome: novaReserva.nome,
      data: novaReserva.data,
      hora: novaReserva.hora,
      status: 'Pendente',
    };
    setReservas([...reservas, nova]);
    setNovaReserva({ nome: '', data: '', hora: '' });
  };

  return (
            <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold text-center mb-10 font-cormorant">Painel do Administrador</h1>

            <section className="bg-white rounded-lg shadow p-6 mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-blue-800">Usuários Cadastrados</h2>
                <table className="w-full table-auto">
                <thead>
                    <tr className="text-left border-b">
                    <th className="p-2">ID</th>
                    <th className="p-2">Nome</th>
                    <th className="p-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(user => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{user.id}</td>
                        <td className="p-2">{user.nome}</td>
                        <td className="p-2">{user.email}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </section>

            <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-4 text-blue-800">Reservas Abertas</h2>

                <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Nome do cliente"
                    className="p-2 border rounded-md"
                    value={novaReserva.nome}
                    onChange={(e) => setNovaReserva({ ...novaReserva, nome: e.target.value })}
                />
                <input
                    type="date"
                    className="p-2 border rounded-md"
                    value={novaReserva.data}
                    onChange={(e) => setNovaReserva({ ...novaReserva, data: e.target.value })}
                />
                <input
                    type="time"
                    className="p-2 border rounded-md"
                    value={novaReserva.hora}
                    onChange={(e) => setNovaReserva({ ...novaReserva, hora: e.target.value })}
                />
                <button
                    onClick={criarReserva}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md px-4 py-2"
                >
                    Criar Reserva
                </button>
                </div>

                    <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left border-b">
                        <th className="p-2">ID</th>
                        <th className="p-2">Nome</th>
                        <th className="p-2">Data</th>
                        <th className="p-2">Hora</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva) => (
                        <tr key={reserva.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{reserva.id}</td>
                            <td className="p-2">
                            <input
                                className="w-full border rounded p-1"
                                value={reserva.nome}
                                onChange={(e) =>
                                editarReserva(reserva.id, 'nome', e.target.value)
                                }
                            />
                            </td>
                            <td className="p-2">
                            <input
                                type="date"
                                className="w-full border rounded p-1"
                                value={reserva.data}
                                onChange={(e) =>
                                editarReserva(reserva.id, 'data', e.target.value)
                                }
                            />
                            </td>
                            <td className="p-2">
                            <input
                                type="time"
                                className="w-full border rounded p-1"
                                value={reserva.hora}
                                onChange={(e) =>
                                editarReserva(reserva.id, 'hora', e.target.value)
                                }
                            />
                            </td>
                            <td className="p-2">{reserva.status}</td>
                            <td className="p-2 flex gap-2">
                            <button
                                onClick={() => atualizarReserva(reserva.id, 'Aceita')}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                            >
                                Aceitar
                            </button>
                            <button
                                onClick={() => atualizarReserva(reserva.id, 'Recusada')}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                            >
                                Recusar
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
            </section>
            </div>
        );
}