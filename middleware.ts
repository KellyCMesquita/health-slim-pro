/**
 * Middleware - Route Protection
 * Protege rotas do dashboard e redireciona usuários não autenticados
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/home', '/login', '/register', '/forgot-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Rotas de API não precisam de middleware de autenticação aqui
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Se está tentando acessar rota protegida sem token
  if (pathname.startsWith('/dashboard') && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Se está autenticado e tentando acessar login/register, redireciona para dashboard
  if (token && (pathname === '/login' || pathname === '/register')) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Redireciona raiz para home
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
