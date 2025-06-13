/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      nome: string;
      email?: string;
      role: string;
      accessToken: string;
    };
  }

  interface User {
    nome: string;
    email: string;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    nome: string;
    email: string;
    role: string;
    accessToken: string;
  }
}
