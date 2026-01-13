import { HeartPulse } from 'lucide-react';
import { cn } from '../lib/utils';

export function Logo({ className }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <HeartPulse className="h-6 w-6 text-primary" />
      <span className="font-headline text-xl font-bold text-primary">HealthNode</span>
    </div>
  );
}

export function SidebarLogo({ className }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <HeartPulse className="h-6 w-6 text-sidebar-foreground" />
      <span className="font-headline text-xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
        HealthNode
      </span>
    </div>
  );
}
