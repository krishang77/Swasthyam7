
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export const useChatbotApi = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const { toast } = useToast();

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('chatbot_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setIsConfigured(true);
    }
  }, []);

  // Save API key to localStorage
  const saveApiKey = (key: string) => {
    if (!key.trim()) {
      toast({
        title: "Error",
        description: "API key cannot be empty",
        variant: "destructive",
      });
      return false;
    }

    try {
      localStorage.setItem('chatbot_api_key', key);
      setApiKey(key);
      setIsConfigured(true);
      toast({
        title: "Success",
        description: "Chatbot API key saved successfully",
      });
      return true;
    } catch (error) {
      console.error('Error saving API key:', error);
      toast({
        title: "Error",
        description: "Failed to save API key",
        variant: "destructive",
      });
      return false;
    }
  };

  // Clear API key from localStorage
  const clearApiKey = () => {
    try {
      localStorage.removeItem('chatbot_api_key');
      setApiKey(null);
      setIsConfigured(false);
      toast({
        title: "Success",
        description: "Chatbot API key removed successfully",
      });
      return true;
    } catch (error) {
      console.error('Error clearing API key:', error);
      toast({
        title: "Error",
        description: "Failed to remove API key",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    apiKey,
    isConfigured,
    saveApiKey,
    clearApiKey
  };
};
