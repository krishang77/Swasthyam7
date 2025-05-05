
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from './ChatbotDialog';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  // Format message content to handle paragraphs correctly
  const formatContent = (content: string) => {
    if (!content) return '';
    
    // Split text by paragraphs
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className={`${index > 0 ? 'mt-2' : ''}`}>
        {paragraph}
      </p>
    ));
  };
  
  return (
    <div className={cn(
      "flex w-full",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex items-start gap-3 max-w-[85%] group animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <div className={cn(
          "flex items-center justify-center rounded-full w-8 h-8 mt-1 shadow-sm transition-transform group-hover:scale-110",
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        
        <div className={cn(
          "rounded-lg px-4 py-3 shadow-sm transition-all duration-200 group-hover:shadow-md",
          isUser ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-secondary text-foreground rounded-tl-none",
          "border border-transparent",
          isUser ? "border-primary/20" : "border-secondary/20"
        )}>
          <div className="text-sm leading-relaxed">
            {formatContent(message.content)}
          </div>
          <div className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-right" : "text-left"
          )}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
