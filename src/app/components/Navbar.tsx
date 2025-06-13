"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, UserCircle2 } from "lucide-react";



export function Navbar() {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  const [open, setOpen] = useState(false);

  // Estado de cadastro
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    email: "",
  });

  // Estado de login
  const [loginForm, setLoginForm] = useState({
    cpfOrEmail: "",
    senhaOuDataNascimento: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleReservar = () => {
    if (isAuthenticated) {
      alert("Você já está autenticado como: " + session.user.nome + "\n" + session.user.email)
    } else {
      setOpen(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.text();

      if (!response.ok) {
        setMensagem("Erro: " + data);
      } else {
        setMensagem("Cadastro realizado com sucesso!");
        setForm({ nome: "", cpf: "", dataNascimento: "", telefone: "", email: "" });
        setTimeout(() => setOpen(false), 2000);
      }
    } catch (error) {
      setMensagem("Erro ao enviar dados.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    const res = await signIn("credentials", {
      redirect: false,
      cpfOrEmail: loginForm.cpfOrEmail,
      senhaOuDataNascimento: loginForm.senhaOuDataNascimento,
    });

    if (res?.error) {
      setMensagem("Credenciais inválidas");
    } else {
      setMensagem("Login realizado com sucesso!");
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
  };

  return (
    <header className="bg-[#0B0E17] text-white h-16 flex items-center justify-between px-16 z-50 relative">
      <h1 className="text-yellow-400 font-bold text-lg">Taberna do Gute</h1>

      <nav className="flex items-center gap-10">
        <ul className="flex gap-6 text-sm font-medium">
          <li className="hover:text-yellow-400 cursor-pointer">Início</li>
          <li className="hover:text-yellow-400 cursor-pointer">Cardápio</li>
          <li className="hover:text-yellow-400 cursor-pointer">Sobre</li>
          <li className="hover:text-yellow-400 cursor-pointer">Galeria</li>
        </ul>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>
                  <UserCircle2 className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white text-black shadow-lg">
              <DropdownMenuLabel className="text-sm">
                {session.user.nome}
              </DropdownMenuLabel>
              <DropdownMenuItem disabled>{session.user.email}</DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  window.location.href = "/reserva"; // ou use useRouter
                }}
                className="cursor-pointer"
              >
                Minhas Reservas
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleReservar}
                className="bg-yellow-300 text-black text-sm px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
              >
                Reservar Mesa
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black max-w-md w-full p-6 rounded-md shadow-xl z-[9999]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold mb-4">
                  Faça sua autenticação 😊
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="register" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="register">Registro</TabsTrigger>
                  <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>

                {/* FORMULÁRIO DE REGISTRO */}
                <TabsContent value="register">
                  <form className="space-y-4" onSubmit={handleRegister}>
                    <div>
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input
                        id="nome"
                        value={form.nome}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" value={form.cpf} onChange={handleChange} required />
                    </div>

                    <div>
                      <Label htmlFor="dataNascimento">Data de nascimento</Label>
                      <Input
                        id="dataNascimento"
                        type="date"
                        value={form.dataNascimento}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={form.telefone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {mensagem && (
                      <p className="text-sm text-center text-red-500">{mensagem}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-black"
                    >
                      Cadastrar
                    </Button>
                  </form>
                </TabsContent>

                {/* FORMULÁRIO DE LOGIN */}
                <TabsContent value="login">
                  <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                      <Label htmlFor="cpfOrEmail">CPF ou Email</Label>
                      <Input
                        id="cpfOrEmail"
                        value={loginForm.cpfOrEmail}
                        onChange={handleLoginChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="senhaOuDataNascimento">
                        Senha ou Data de Nascimento
                      </Label>
                      <Input
                        id="senhaOuDataNascimento"
                        value={loginForm.senhaOuDataNascimento}
                        onChange={handleLoginChange}
                        type="text"
                        required
                      />
                    </div>

                    {mensagem && (
                      <p className="text-sm text-center text-red-500">{mensagem}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-black"
                    >
                      Entrar
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </nav>
    </header>
  );
}
