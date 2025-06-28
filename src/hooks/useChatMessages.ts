// hooks/useChatMessages.ts
import { useState, useEffect } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_messages_${sessionId}`);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error('Error loading saved messages:', error);
      }
    }
  }, [sessionId]);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_messages_${sessionId}`, JSON.stringify(messages));
    }
  }, [messages, sessionId]);

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare conversation history for OpenAI
      const conversationHistory = [...messages, userMessage];
      const recentMessages = conversationHistory.slice(-6); // Keep last 6 messages for context

      const openaiMessages = [
        {
          role: 'system',
          content: `You are Voltly Assistant, a helpful AI assistant specializing in HVAC (Heating, Ventilation, and Air Conditioning) solutions. 
          You help customers with:
          - HVAC system recommendations
          - Energy efficiency advice
          - Troubleshooting common issues
          - Maintenance tips
          - Product information
          
          Always be helpful, professional, and provide accurate information. Keep responses concise and actionable. If you're unsure about something technical, recommend contacting a professional technician.`
        },
        ...recentMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      // Make direct API call to OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // or 'gpt-3.5-turbo' for lower cost
          messages: openaiMessages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact our support team at (844) 629-4333.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(`chat_messages_${sessionId}`);
  };

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading,
    sessionId,
  };
};