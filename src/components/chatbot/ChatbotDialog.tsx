
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { useToast } from '@/hooks/use-toast';
import { useChatbotApi } from '@/hooks/use-chatbot-api';
import { getChatCompletion } from '@/services/chatbotService';
import ChatbotSettings from './ChatbotSettings';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
}

interface ChatbotDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatbotDialog: React.FC<ChatbotDialogProps> = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your health assistant powered by Gemini AI. How can I help you today? Ask me anything about health, fitness, nutrition, or wellness!",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { apiKey, isConfigured } = useChatbotApi();
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change - optimized with useCallback
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Add small delay to ensure the dialog is fully rendered
      setTimeout(scrollToBottom, 100);
      
      // Focus the input field after dialog opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 150);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle sending message - optimized with useCallback
  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;
    
    if (!isConfigured) {
      toast({
        title: 'Cannot connect to Gemini',
        description: 'There was an issue with the API connection. Please try again later.',
        variant: 'destructive',
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Only send the last few messages to reduce payload size
      const recentMessages = messages
        .slice(-5) // Only include the last 5 messages for context
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      // Add the new user message
      recentMessages.push({
        role: 'user',
        content: userMessage.content
      });
      
      // Make sure we have a valid API key
      if (!apiKey) {
        throw new Error('No API key available');
      }
      
      const response = await getChatCompletion({
        messages: recentMessages,
        apiKey: apiKey
      });
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again or check the API key in settings.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isConfigured, messages, apiKey, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[80vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-primary/10 relative">
          <DialogTitle className="text-center font-bold text-primary">Health Assistant</DialogTitle>
          <ChatbotSettings />
        </DialogHeader>
        
        <ScrollArea className="flex-grow py-4 px-4 h-[400px] bg-gradient-to-b from-background to-background/80">
          <div className="space-y-6 min-h-[300px]">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 p-4 border-t bg-muted/30"
        >
          <Input
            ref={inputRef}
            placeholder="Ask about health and wellness..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1 shadow-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (inputMessage.trim()) {
                  handleSendMessage();
                }
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon"
            className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            disabled={isLoading || !inputMessage.trim()}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;
