import React from 'react';
import { Bell, Search, User, LogOut, Menu, Settings, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useUIStore } from '../../hooks/useUI';
import { useAuthStore } from '../../hooks/useAuth';
import { useNotificationStore } from '../../hooks/useNotificationStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { ThemeToggle } from './ThemeToggle';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';

export function Navbar() {
  const { toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search issues, users, or sensors..."
            className="w-full bg-muted/50 border-none pl-8 md:w-[300px] lg:w-[400px] focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-[10px]">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="p-4 border-b flex items-center justify-between">
              <h4 className="font-semibold">Notifications</h4>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
            <ScrollArea className="max-h-[350px]">
              {notifications.length > 0 ? (
                <div className="flex flex-col">
                  {notifications.map((n) => (
                    <DropdownMenuItem 
                      key={n.id} 
                      className={cn(
                        "flex flex-col items-start gap-1 p-4 cursor-pointer border-b last:border-0",
                        !n.read && "bg-muted/30"
                      )}
                      onClick={() => markAsRead(n.id)}
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {getNotificationIcon(n.type)}
                          <span className={cn("font-semibold text-sm", !n.read && "text-primary")}>
                            {n.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 pl-6">
                        {n.message}
                      </p>
                    </DropdownMenuItem>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No new notifications</p>
                </div>
              )}
            </ScrollArea>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary font-medium py-3">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon" className="rounded-full border overflow-hidden">
              <div className="h-8 w-8 bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {user?.name.charAt(0)}
              </div>
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
