import NextAuth from 'next-auth';
import authConfig from '@/lib/auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === '/login';
  const isSharePage = req.nextUrl.pathname.startsWith('/share/');
  const isAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');
  const isRegisterRoute = req.nextUrl.pathname === '/api/register';

  // Allow public routes
  if (isLoginPage || isSharePage || isAuthRoute || isRegisterRoute) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};