
// Chatbot service for Google's Gemini API integration

export interface ChatMessage {
  content: string;
  role: 'user' | 'assistant' | 'system';
}

export interface ChatCompletionRequest {
  messages: ChatMessage[];
  apiKey: string;
}

export interface ChatCompletionResponse {
  response: string;
}

// Cache to store recent responses and avoid redundant API calls
const responseCache = new Map<string, string>();

export const getChatCompletion = async (
  request: ChatCompletionRequest
): Promise<ChatCompletionResponse> => {
  try {
    // Find the last user message
    const lastUserMessage = request.messages
      .filter(m => m.role === 'user')
      .pop();

    if (!lastUserMessage) {
      throw new Error('No user message found');
    }

    // Create a simple cache key based on the message content
    const cacheKey = lastUserMessage.content.trim().toLowerCase();
    
    // Check if we have a cached response
    if (responseCache.has(cacheKey)) {
      console.log('Using cached response');
      return {
        response: responseCache.get(cacheKey) || ''
      };
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${request.apiKey}`;
    
    // Optimize the payload structure with improved instructions
    const geminiPayload = {
      contents: [{
        parts: [{ 
          text: `You are a helpful health and wellness assistant. Provide concise, well-formatted answers about nutrition, fitness, wellness, or medical information. 
                  Use paragraphs for better readability. Always be friendly and supportive.
                  
                  User question: ${lastUserMessage.content}` 
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.95
      }
    };

    // Call the Gemini API with optimized settings
    console.log('Calling Gemini API...');
    const controller = new AbortController();
    
    // Set a timeout to cancel the request if it takes too long
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geminiPayload),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status}`, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Extract and format the response text from the Gemini API response
    let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                      'I apologize, but I couldn\'t generate a response at the moment. Please try again.';
    
    // Format the response for better readability
    responseText = responseText.trim();
    
    // Cache the response for future use
    responseCache.set(cacheKey, responseText);
    
    // Limit cache size to avoid memory issues
    if (responseCache.size > 100) {
      const firstKey = responseCache.keys().next().value;
      responseCache.delete(firstKey);
    }
    
    return {
      response: responseText
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Provide a more helpful error message
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          response: 'The request took too long to complete. Please try again or check your internet connection.'
        };
      }
      
      if (error.message.includes('API key')) {
        return {
          response: 'There seems to be an issue with the API connection. Please try again later.'
        };
      }
    }
    
    throw error;
  }
};

// Function to validate API key format (basic check)
export const validateApiKey = (key: string): boolean => {
  return /^[A-Za-z0-9_-]{30,}$/.test(key);
};
