import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '../ui/sidebar';
import { MainSidebar } from './sidebar';
import { SidebarLogo } from '../logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarLogo />
        </SidebarHeader>
        <SidebarContent>
          <MainSidebar />
        </SidebarContent>
        <SidebarFooter className="items-center">
            <div className="flex w-full items-center justify-between p-2 group-data-[collapsible=icon]:justify-center">
                <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                        <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                        <span className="text-sm font-semibold text-sidebar-foreground">User</span>
                        <span className="text-xs text-sidebar-foreground/70">user@email.com</span>
                    </div>
                </div>
                <Button asChild variant="ghost" size="icon" className="group-data-[collapsible=icon]:hidden text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <Link href="/">
                      <LogOut size={18} />
                    </Link>
                </Button>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center border-b bg-background/50 px-4 backdrop-blur-sm md:px-6">
          <SidebarTrigger />
          <h1 className="ml-4 font-headline text-2xl font-semibold">
            {/* This could be dynamic based on route */}
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
