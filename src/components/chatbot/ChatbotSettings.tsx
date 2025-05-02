
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';
import { useChatbotApi } from '@/hooks/use-chatbot-api';

const ChatbotSettings: React.FC = () => {
  const { apiKey, isConfigured, saveApiKey, clearApiKey } = useChatbotApi();
  const [newApiKey, setNewApiKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (saveApiKey(newApiKey)) {
      setNewApiKey('');
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    if (clearApiKey()) {
      setNewApiKey('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-2 right-2"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chatbot API Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              placeholder={isConfigured ? '••••••••••••••••••••••' : 'Enter your API key'}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {isConfigured ? (
              <p>API key is configured. You can update or remove it.</p>
            ) : (
              <p>Please enter your chatbot API key to enable the health assistant.</p>
            )}
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            {isConfigured && (
              <Button variant="outline" onClick={handleClear}>
                Remove API Key
              </Button>
            )}
            <Button onClick={handleSave}>
              {isConfigured ? 'Update API Key' : 'Save API Key'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotSettings;
