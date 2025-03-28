'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatListItemProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export function ChatListItem({
  name,
  avatar,
  lastMessage,
  timestamp,
  unreadCount,
  isOnline,
  isSelected,
  onClick,
}: ChatListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 cursor-pointer hover:bg-accent rounded-lg transition-colors",
        isSelected && "bg-accent"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        {isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <span className="font-medium truncate">{name}</span>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {timestamp}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {lastMessage}
        </p>
      </div>
      {unreadCount ? (
        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
          <span className="text-xs text-primary-foreground">
            {unreadCount}
          </span>
        </div>
      ) : null}
    </div>
  );
}
