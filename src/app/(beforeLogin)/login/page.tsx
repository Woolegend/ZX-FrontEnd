'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const handleGoogleLogin = () => {
    signIn('google', {
      callbackUrl: '/home',
    });
  };

  return (
    <div>
      <div>Login Page</div>
      <div className='p-4" mx-auto mt-12 flex w-[320px] flex-col gap-4 bg-[#333333]'>
        <Button onClick={handleGoogleLogin}>Google로 로그인</Button>
      </div>
    </div>
  );
}
