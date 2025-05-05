
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
} from 'lucide-react';
import ChatbotDialog from './ChatbotDialog';

const ChatbotButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Button
        className={`
          rounded-full p-3 h-14 w-14 fixed bottom-6 right-6 shadow-lg z-40 
          bg-primary hover:bg-primary/90 
          transition-all duration-300 ease-in-out
          ${isHovered ? 'scale-110 rotate-3' : 'scale-100'}
          ${!isChatOpen && 'animate-bounce'}
        `}
        onClick={() => setIsChatOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Open health assistant"
      >
        <MessageCircle className={`h-6 w-6 transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`} />
      </Button>

      <ChatbotDialog 
        isOpen={isChatOpen} 
        onOpenChange={setIsChatOpen} 
      />
    </>
  );
};

export default ChatbotButton;
