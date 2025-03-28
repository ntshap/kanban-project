'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  sender: {
    name: string;
    avatar?: string;
    isOnline?: boolean;
  };
  timestamp: string;
  isOutgoing?: boolean;
}

export function ChatMessage({ content, sender, timestamp, isOutgoing }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isOutgoing ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={sender.avatar} alt={sender.name} />
        <AvatarFallback>
          {sender.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div className={cn(
        "flex flex-col max-w-[70%]",
        isOutgoing ? "items-end" : "items-start"
      )}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">{sender.name}</span>
          {sender.isOnline && (
            <span className="h-2 w-2 rounded-full bg-green-500" />
          )}
        </div>
        <div className={cn(
          "rounded-lg px-4 py-2 text-sm",
          isOutgoing
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}>
          {content}
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {timestamp}
        </span>
      </div>
    </div>
  );
}
