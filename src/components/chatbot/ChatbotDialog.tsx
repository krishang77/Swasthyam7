
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
import ChatbotSettings from './ChatbotSettings';
import { useToast } from '@/hooks/use-toast';
import { useChatbotApi } from '@/hooks/use-chatbot-api';
import { getChatCompletion } from '@/services/chatbotService';

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
      content: "Hi there! I'm your health assistant powered by Gemini AI. How can I help you today?",
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
        title: 'API Key Required',
        description: 'Please configure your Gemini API key in settings.',
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
      
      const response = await getChatCompletion({
        messages: recentMessages,
        apiKey: apiKey || ''
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
        description: 'Failed to get a response from Gemini. Please check your API key and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isConfigured, messages, apiKey, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[80vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-center">Gemini Health Assistant</DialogTitle>
          <ChatbotSettings />
        </DialogHeader>
        
        <ScrollArea className="flex-grow py-4 px-4 h-[350px]">
          <div className="space-y-4 min-h-[300px]">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {!isConfigured && (
          <div className="bg-muted/50 p-3 mx-4 rounded-md mb-4 text-sm">
            Please configure your Gemini API key in settings to enable the health assistant.
          </div>
        )}
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 p-4 border-t"
        >
          <Input
            ref={inputRef}
            placeholder="Ask Gemini about health and fitness..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading || !isConfigured}
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !isConfigured || !inputMessage.trim()}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;
