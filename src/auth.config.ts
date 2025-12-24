import { NextAuthConfig } from 'next-auth';

/**
 * TODO - route 비교 로직 수정
 * 현재는 큰 문제 없겠지만 나중에는 아래와 같은 문제 발생 가능
 * `/bookshelf` === startWith(`/books`)
 * 그래서 좀 더 정확하게 로직을 변경할 필요가 있음
 */
const PROTECTED_ROUTES = ['/home', '/books'];
const GUEST_ROUTES = ['/login', '/signup'];

/**
 * NOTE NextAuth 설정 파일 분할
 * Edge Runtime이 Node.js의 모든 모듈을 처리하지 못함
 * crypto, bcrypto, mongoDB 등이 이에 해당함
 */
export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/signup',
    //TODO - Error 페이지 추가
  },
  // middleware(Edge Runtime)에서는
  // DB 연결이나 Node.js 전용 모듈을 포함한
  // Provider 로직을 실행할 수 없으므로 빈 배열로 둡니다.
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isGuestRoute = GUEST_ROUTES.includes(nextUrl.pathname);

      if (isLoggedIn && isGuestRoute) {
        // 홈으로 강제 이동 (Response.redirect 사용)
        return Response.redirect(new URL('/home', nextUrl));
      }

      const isProtected = PROTECTED_ROUTES.some((route) =>
        nextUrl.pathname.startsWith(route),
      );

      if (isProtected) {
        if (isLoggedIn) return true;
        //nextauth 에서 비로그인 자동처리
        return false;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
