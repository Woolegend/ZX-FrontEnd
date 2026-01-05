'use client';

import { useSidebarStore } from '@/stores/useSidebarStore';
import {
  BarChart2Icon,
  BookIcon,
  ChevronRight,
  HomeIcon,
  MailIcon,
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

interface Props {
  children: React.ReactNode;
}

export default function Sidebar({ children }: Props) {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <div className="flex">
      <div
        className={cn([
          'flex flex-col',
          'bg-background-secondary',
          'h-dvh w-16',
          'transition-all duration-300',
          'data-[open=true]:w-48',
        ])}
        data-open={isOpen}
      >
        {/* SECTION - sidebar header */}
        <div className="flex h-16 items-center justify-between px-3.5">
          <div
            className={cn([
              'flex items-center gap-2',
              'transition-all duration-300',
              'overflow-hidden',
              isOpen ? 'w-fit' : 'w-0',
            ])}
          >
            <div className="bg-brand size-4.5" />
            <span className="text-xl leading-none">DOKHU</span>
          </div>
          <Button
            className="py-0 has-[>svg]:px-2.5"
            variant="ghost"
            onClick={toggle}
          >
            <ChevronRight
              className={cn([
                'transition-all, duration-300',
                isOpen ? 'rotate-180' : '',
              ])}
            />
          </Button>
        </div>
        {/* !SECTION - sidebar header */}
        <Separator />
        <div className="flex flex-col gap-2 px-3 py-4">
          <SidebarButton>
            <HomeIcon className="stroke-icon-neutral-tertiary" size={24} />
            <span className="text-text-neutral-tertiary" hidden={!isOpen}>
              홈
            </span>
          </SidebarButton>

          <SidebarButton>
            <BookIcon className="stroke-icon-neutral-tertiary" size={24} />
            <span className="text-text-neutral-tertiary" hidden={!isOpen}>
              서재
            </span>
          </SidebarButton>

          <SidebarButton>
            <BarChart2Icon className="stroke-icon-neutral-tertiary" size={24} />
            <span className="text-text-neutral-tertiary" hidden={!isOpen}>
              통계
            </span>
          </SidebarButton>

          <SidebarButton>
            <MailIcon className="stroke-icon-neutral-tertiary" size={24} />
            <span className="text-text-neutral-tertiary" hidden={!isOpen}>
              우편
            </span>
          </SidebarButton>
        </div>
      </div>
      <div className="grow">{children}</div>
    </div>
  );
}

interface SidebarButtonProps {
  children: React.ReactNode;
}

function SidebarButton({ children }: SidebarButtonProps) {
  return (
    <button className="hover:bg-background-tertiary-hover flex items-center justify-start gap-2 p-2">
      {children}
    </button>
  );
}
