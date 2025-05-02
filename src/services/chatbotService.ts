
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

export const getChatCompletion = async (
  request: ChatCompletionRequest
): Promise<ChatCompletionResponse> => {
  try {
    // Format messages for Gemini API
    const lastUserMessage = request.messages
      .filter(m => m.role === 'user')
      .pop();

    if (!lastUserMessage) {
      throw new Error('No user message found');
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${request.apiKey}`;
    
    const geminiPayload = {
      contents: [{
        parts: [{ text: lastUserMessage.content }]
      }]
    };

    // Call the Gemini API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geminiPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Extract the response text from the Gemini API response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        'I apologize, but I couldn\'t generate a response at the moment. Please try again.';
    
    return {
      response: responseText
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};
