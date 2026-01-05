import { SessionProvider } from 'next-auth/react';

import ReactQueryProvider from '@/components/ReactQueryProvider';

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionProvider>
  );
}
