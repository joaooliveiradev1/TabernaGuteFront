/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nome: string;
      email?: string;
      role: string;
      accessToken: string;
    };
  }

  interface User {
    id: string;
    nome: string;
    email: string;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nome: string;
    email: string;
    role: string;
    accessToken: string;
  }
}
