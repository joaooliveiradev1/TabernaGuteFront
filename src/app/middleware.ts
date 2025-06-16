import { NextResponse } from "next/server";
import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";

export async function middleware(req: NextRequestWithAuth) {
  console.log("[MIDDLEWARE_NEXTAUTH_TOKEN]: ", req.nextauth);
  const { pathname } = req.nextUrl;
  const user = req.nextauth.token;

  // Loga a sessão no terminal do servidor a cada request
  console.log("Session Middleware:", user);
  console.log("oii");

  // Se não estiver logado e tentando acessar rota privada
  if (!user?.accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/admin") && user.role !== "COORDENACAO") {
    return Response.redirect(new URL("/404", req.url));
  }

  // Se estiver logado, segue normalmente
  return NextResponse.next();
}

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

// Define em quais rotas o middleware será aplicado
export const config = {
  matcher: ["/admin/:path*", "/reserva/:path*"], 
};
