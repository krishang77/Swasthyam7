
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

// Default API key that will be used if no user-provided key is available
const DEFAULT_API_KEY = "AIzaSyC8uE4Iv3Bz15CsE1yAj9G49giYmr2obmE";

export const useChatbotApi = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const { toast } = useToast();

  // Load API key from localStorage on component mount
  useEffect(() => {
    try {
      const storedApiKey = localStorage.getItem('gemini_api_key');
      
      // If there's a stored API key, use it
      if (storedApiKey) {
        setApiKey(storedApiKey);
        setIsConfigured(true);
      } else {
        // If no stored API key, use the default key
        setApiKey(DEFAULT_API_KEY);
        setIsConfigured(true);
        // Save the default key to localStorage
        localStorage.setItem('gemini_api_key', DEFAULT_API_KEY);
      }
    } catch (error) {
      console.error('Error loading API key:', error);
      // Fall back to the default key if there's an error
      setApiKey(DEFAULT_API_KEY);
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
      localStorage.setItem('gemini_api_key', key);
      setApiKey(key);
      setIsConfigured(true);
      toast({
        title: "Success",
        description: "Gemini API key saved successfully",
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

  // Clear API key from localStorage and reset to default
  const clearApiKey = () => {
    try {
      localStorage.removeItem('gemini_api_key');
      setApiKey(DEFAULT_API_KEY);
      // Still considered configured with the default key
      setIsConfigured(true);
      localStorage.setItem('gemini_api_key', DEFAULT_API_KEY);
      toast({
        title: "Success",
        description: "Custom API key removed, using default key",
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
