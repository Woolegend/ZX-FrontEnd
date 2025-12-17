import { SessionProvider } from 'next-auth/react';

import SidebarLayout from '@/layouts/SidebarLayout';

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <SidebarLayout>{children}</SidebarLayout>
    </SessionProvider>
  );
}
