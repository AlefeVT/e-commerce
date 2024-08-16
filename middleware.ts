import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { apiAuthPrefix, authRoutes, publicRoutes, storeRoutes } from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isDashboardRoute = nextUrl.pathname
    .toLowerCase()
    .includes('/dashboard');

  const isStoreRoute = storeRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (!isLoggedIn && isDashboardRoute) {
    if (!isStoreRoute) {
      return Response.redirect(new URL('/', nextUrl));
    }
  } else if (!isLoggedIn && isAuthRoute) {
    return null;
  }

  return null;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
