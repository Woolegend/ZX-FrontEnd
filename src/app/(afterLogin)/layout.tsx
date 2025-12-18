import { SessionProvider } from 'next-auth/react';

import SidebarLayout from '@/layouts/SidebarLayout';
import ReactQueryProvider from '@/components/ReactQueryProvider';

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <SidebarLayout>{children}</SidebarLayout>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
