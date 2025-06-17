import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Middleware principal
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    console.log("[Middleware Token]:", token);

    if (!token) {
      return NextResponse.redirect(new URL("/"));
    }

    // Se estiver tentando acessar /admin sem ser ADMIN
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/404", req.url));
    }

    if (pathname.startsWith("/minhas-reservas") && !token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Permite ou bloqueia a rota
    },
  }
);

// Define quais rotas a middleware será aplicada
export const config = {
  matcher: ["/admin/:path*", "/minhas-reservas/:path*"],
};
