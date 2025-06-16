// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

const IdadeToken = 1 * 24 * 60 * 60 // 1 dia

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: IdadeToken,

  },
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cpfOrEmail: { label: "CPF ou Email", type: "text" },
        senhaOuDataNascimento: { label: "Senha ou Data de Nascimento", type: "text" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cpfOrEmail: credentials?.cpfOrEmail,
            senhaOuDataNascimento: credentials?.senhaOuDataNascimento,
          }),
        });

        const user = await res.json();

        if (!res.ok || !user?.token) return null;

        return {
          id: user.id, // obrigatório
          email: user.email,
          nome: user.nome,
          role: user.role,
          token: user.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id
        token.role = user.role;
        token.nome = user.nome;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.nome = token.nome;
      return session;
    },
  },
  pages: {
    signIn: "/login", // opcional
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
