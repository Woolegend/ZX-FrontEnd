'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { Button } from './ui/button';


export default function LogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    await signOut({ redirect: false }).then(() => {
      router.push('/');
    });
  };

  return (
    <Button onClick={onLogout}>
      <LogOut />
      <span>로그아웃</span>
    </Button>
  );
}
