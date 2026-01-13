'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../ui/sidebar';
import {
  Bot,
  Calculator,
  Dumbbell,
  LayoutDashboard,
  MessageSquare,
  ShoppingCart,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
  { href: '/meal-planner', icon: <UtensilsCrossed />, label: 'Meal Planner' },
  { href: '/chatbot', icon: <Bot />, label: 'AI Coach' },
  { href: '/chat-trainer', icon: <MessageSquare />, label: 'Chat with Trainer' },
  { href: '/exercises', icon: <Dumbbell />, label: 'Exercises' },
  { href: '/calculator', icon: <Calculator />, label: 'Calculator' },
  { href: '/trainers', icon: <Users />, label: 'Find a Trainer' },
  { href: '/store', icon: <ShoppingCart />, label: 'Store' },
];

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <Link href={item.href}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
