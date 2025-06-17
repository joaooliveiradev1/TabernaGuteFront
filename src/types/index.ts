export interface Reserva {
  id: number;
  cliente: Omit<Cliente, "reservas">; // evita recursão infinita
  dataHora: string;
  qtnAdultos: number;
  qtnCriancas: number;
  hasPets: boolean;
  observacoes: string;
  reservaStatus: "PENDENTE" | "APROVADA" | "REJEITADA" | string; // pode refinar se enum for fixo
  reservaFinalizada: boolean;
  usuario: Cliente;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
}

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  senha: string | null;
  dataCadastro: string;
  cpf: string;
  dataNascimento: string; // formato: yyyy-mm-dd
  telefone: string;
  reservas: Reserva[];
}