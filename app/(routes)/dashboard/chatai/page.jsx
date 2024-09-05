"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI model
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function ChatAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages]);

  const aiPersonality = `You're a friendly AI assistant named Fin. You help with budgeting, saving money, and general financial advice. Keep your responses brief and casual. When relevant, refer back to information from earlier in the conversation.`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      const newUserMessage = { text: input, sender: 'user' };
      setMessages(prev => [...prev, newUserMessage]);
      setInput('');

      try {
        const chat = model.startChat({
          history: messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          })),
        });

        // Include the entire conversation history in the context
        const conversationHistory = messages.map(msg => `${msg.sender === 'user' ? 'User' : 'Fin'}: ${msg.text}`).join('\n');
        const fullPrompt = `${aiPersonality}\n\nConversation history:\n${conversationHistory}\n\nUser: ${input}`;

        const result = await chat.sendMessage(fullPrompt);
        setMessages(prev => [...prev, { text: result.response.text(), sender: 'ai' }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { text: "Sorry, I'm having trouble right now. Can you try again?", sender: 'ai' }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 p-4 bg-white shadow">Chat with Fin</h1>
      <div className="flex-1 overflow-y-auto mb-4 px-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot size={48} className="mx-auto mb-4" />
            <p>Hi, I'm Fin! How can I help with your finances today?</p>
          </div>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-black shadow'}`}>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Fin about your finances..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={`bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatAi;
