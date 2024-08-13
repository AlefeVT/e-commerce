import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';
import { currentUser } from './lib/auth';
import { redirect } from 'next/navigation';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  const user = await currentUser(); 

  if (isAuthRoute) {
    if (isLoggedIn && user?.email === "alefevt@gmail.com") {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_ADMIN, nextUrl));
    } else if(isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);

//     return Response.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
//     );
//   }

//   return null;
});

// Opcionalmente, não invoque o Middleware em alguns caminhos
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
