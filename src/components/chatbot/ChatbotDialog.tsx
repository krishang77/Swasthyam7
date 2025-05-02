
import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
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

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending message
  const handleSendMessage = async () => {
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
      // Prepare the API request with all previous messages for context
      const chatMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the new user message
      chatMessages.push({
        role: 'user',
        content: userMessage.content
      });
      
      const response = await getChatCompletion({
        messages: chatMessages,
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Gemini Health Assistant</DialogTitle>
        </DialogHeader>
        
        <ChatbotSettings />
        
        <ScrollArea className="flex-grow py-4 px-1">
          <div className="space-y-4 min-h-[300px]">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {!isConfigured && (
          <div className="bg-muted/50 p-3 rounded-md mb-4 text-sm">
            Please configure your Gemini API key in settings to enable the health assistant.
          </div>
        )}
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-2 border-t"
        >
          <Input
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
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;
