
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
        className="rounded-full p-3 h-12 w-12 fixed bottom-6 right-6 shadow-lg z-40"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open health assistant"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>

      <ChatbotDialog 
        isOpen={isChatOpen} 
        onOpenChange={setIsChatOpen} 
      />
    </>
  );
};

export default ChatbotButton;
