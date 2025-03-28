'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChatListItem } from './components/chat-list';
import { ChatMessage } from './components/chat-message';
import { Search, Send } from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  messages: {
    id: string;
    content: string;
    sender: {
      name: string;
      avatar?: string;
      isOnline?: boolean;
    };
    timestamp: string;
    isOutgoing?: boolean;
  }[];
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    lastMessage: 'Looking forward to the event!',
    timestamp: '2min ago',
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: '1',
        content: 'Hi! I have a question about the upcoming event.',
        sender: {
          name: 'Alice Johnson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
          isOnline: true,
        },
        timestamp: '10:30 AM',
      },
      {
        id: '2',
        content: 'Sure, what would you like to know?',
        sender: {
          name: 'You',
          isOnline: true,
        },
        timestamp: '10:31 AM',
        isOutgoing: true,
      },
      {
        id: '3',
        content: 'Looking forward to the event!',
        sender: {
          name: 'Alice Johnson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
          isOnline: true,
        },
        timestamp: '10:32 AM',
      },
    ],
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    lastMessage: 'Can you help me with registration?',
    timestamp: '1hr ago',
    isOnline: false,
    messages: [
      {
        id: '1',
        content: 'Hello, I need help with event registration.',
        sender: {
          name: 'Bob Smith',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        },
        timestamp: '9:45 AM',
      },
    ],
  },
  {
    id: '3',
    name: 'Carol White',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
    lastMessage: 'Thanks for your help!',
    timestamp: '3hrs ago',
    isOnline: true,
    messages: [
      {
        id: '1',
        content: 'Thanks for your help with the tickets!',
        sender: {
          name: 'Carol White',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
          isOnline: true,
        },
        timestamp: '8:15 AM',
      },
    ],
  },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        name: 'You',
        isOnline: true,
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOutgoing: true,
    };

    selectedChat.messages.push(message);
    selectedChat.lastMessage = newMessage;
    selectedChat.timestamp = '1s ago';

    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Separator />
        <ScrollArea className="flex-1">
          <div className="p-3">
            {filteredChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                {...chat}
                isSelected={selectedChat?.id === chat.id}
                onClick={() => setSelectedChat(chat)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{selectedChat.name}</span>
              {selectedChat.isOnline && (
                <span className="text-xs text-muted-foreground">
                  • Online
                </span>
              )}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {selectedChat.messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
}
