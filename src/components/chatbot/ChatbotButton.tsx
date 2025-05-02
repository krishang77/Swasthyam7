
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
} from 'lucide-react';
import ChatbotDialog from './ChatbotDialog';

const ChatbotButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full p-3 h-14 w-14 fixed bottom-6 right-6 shadow-lg z-40 bg-primary hover:bg-primary/90 animate-pulse"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open Gemini health assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <ChatbotDialog 
        isOpen={isChatOpen} 
        onOpenChange={setIsChatOpen} 
      />
    </>
  );
};

export default ChatbotButton;
