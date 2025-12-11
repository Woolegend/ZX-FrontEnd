import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export default function PageContainer({
  children,
  as: Component = 'div',
  className,
  ...props
}: Props) {
  return (
    <Component
      className={cn([
        'mx-auto w-[clamp(24rem,100%,64rem)] p-8',
        'tablet:bg-amber-200', //FIXME -  remove tablet breakpoint style
        'laptop:bg-cyan-200', //FIXME - remove laptop breakpoint style
        'desktop:bg-lime-200', //FIXME - remove desktop breakpoint style
        className,
      ])}
      {...props}
    >
      {children}
    </Component>
  );
}
