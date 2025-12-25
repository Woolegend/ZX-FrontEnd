import { auth } from '@/auth';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, AtSignIcon, Calendar } from 'lucide-react';

export default async function ProfileCard() {
  const session = await auth();

  //TODO - session suspense

  return (
    <div className="bg-background-primary border-border-primary flex flex-col gap-2 rounded-xs border p-6">
      {/* SECTION - header */}
      <div className="flex items-center justify-between">
        <span className="text-text-neutral-secondary text-xs leading-none">
          프로필
        </span>
        <Button
          className="dark:hover:bg-background-primary-hover stroke-icon-neutral-primary rounded-xl"
          variant="ghost"
          size="icon"
        >
          <ArrowUpRight />
        </Button>
      </div>
      {/* !SECTION - header */}

      {/* SECTION - content */}
      <div className="flex items-center gap-4">
        <div className="relative size-25.5 overflow-hidden rounded-sm">
          <ImageWithFallback
            className="size-full"
            src={session?.user?.image || ''}
            alt={session?.user?.name || 'user profile cover'}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col gap-1">
            <div className="text-text-neutral-primary text-xl leading-none font-semibold">
              {session?.user?.name || ''}
            </div>
            <div className="text-text-neutral-tertiary text-sm leading-none font-light">
              {session?.user?.email || ''}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 p-1">
              <AtSignIcon className="stroke-icon-neutral-primary" size={16} />
              <span className="text-text-neutral-primary text-xs leading-none">
                이메일
              </span>
              <span className="text-text-neutral-tertiary text-xs leading-none">
                {session?.user?.email || ''}
              </span>
            </div>
            <div className="flex items-center gap-1 p-1">
              <Calendar className="stroke-icon-neutral-primary" size={16} />
              <span className="text-text-neutral-primary text-xs leading-none">
                가입일
              </span>
              <span className="text-text-neutral-tertiary text-xs leading-none">
                {'2000.07.29.'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* !SECTION - content */}

      {/* SECTION - footer */}
      <div className="flex justify-end gap-2.5">
        <div className="flex items-center gap-2 px-1.5 py-1">
          <span className="text-text-neutral-tertiary text-xl leading-none font-semibold">
            {'000'}
          </span>
          <span className="text-text-brand-tertiary text-sm leading-none">
            완독
          </span>
        </div>
        <div className="flex items-center gap-2 px-1.5 py-1">
          <span className="text-text-neutral-tertiary text-xl leading-none font-semibold">
            {'000'}
          </span>
          <span className="text-text-brand-tertiary text-sm leading-none">
            독서 시간
          </span>
        </div>
      </div>
      {/* !SECTION - footer */}
    </div>
  );
}
