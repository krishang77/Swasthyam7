
import React, { useState, useEffect } from 'react';
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

const DEFAULT_API_KEY = "AIzaSyC8uE4Iv3Bz15CsE1yAj9G49giYmr2obmE";

const ChatbotSettings: React.FC = () => {
  const { apiKey, isConfigured, saveApiKey, clearApiKey } = useChatbotApi();
  const [newApiKey, setNewApiKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isUsingDefaultKey, setIsUsingDefaultKey] = useState(false);

  // Check if we're using the default API key
  useEffect(() => {
    if (apiKey === DEFAULT_API_KEY) {
      setIsUsingDefaultKey(true);
    } else {
      setIsUsingDefaultKey(false);
    }
  }, [apiKey]);

  // Set input field to match current API key when dialog opens
  useEffect(() => {
    if (isOpen && apiKey) {
      setNewApiKey(apiKey);
    }
  }, [isOpen, apiKey]);

  const handleSave = () => {
    if (saveApiKey(newApiKey)) {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    if (clearApiKey()) {
      setNewApiKey(DEFAULT_API_KEY);
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
          <DialogTitle>Gemini API Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Gemini API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              placeholder={isConfigured ? '••••••••••••••••••••••' : 'Enter your API key'}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {isUsingDefaultKey ? (
              <p>Using the default API key. You can update it with your own key.</p>
            ) : (
              <p>Using your custom API key. You can reset to the default key.</p>
            )}
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            {!isUsingDefaultKey && (
              <Button variant="outline" onClick={handleClear}>
                Reset to Default
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
