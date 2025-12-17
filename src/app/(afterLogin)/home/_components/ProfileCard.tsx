import profileImage from '@/../public/default-profile.png';

import { auth } from '@/auth';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import LogoutButton from '@/components/LogoutButton';
import { cn } from '@/lib/utils';

export default async function ProfileCard() {
  const session = await auth();

  return (
    <div className="bg-card p-8 shadow-md">
      <div className={cn(['flex', 'gap-4'])}>
        <div className="relative size-28">
          <ImageWithFallback
            src={session?.user?.image || profileImage.src}
            alt={session?.user?.name || 'user profile cover'}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-3xl">{session?.user?.name || ''}</div>
          <div className="text-sm">{session?.user?.email || ''}</div>
        </div>
      </div>
      <div className="flex justify-end">
        <LogoutButton />
      </div>
    </div>
  );
}
