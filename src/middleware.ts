import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export async function middleware() {
  const session = await auth();
  if (!session) {
    const url = new URL('/login', process.env.NEXT_PUBLIC_BASE_URL);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/home', '/library', '/books'],
};
