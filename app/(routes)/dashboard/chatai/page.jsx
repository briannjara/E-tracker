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
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 p-6 bg-gray-800 shadow-md">Chat with Fin</h1>
      <div className="flex-1 overflow-y-auto mb-4 px-6">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <Bot size={64} className="mx-auto mb-4 text-blue-500" />
            <p className="text-xl">Hi, I'm Fin! How can I help with your finances today?</p>
          </div>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-4 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-200 border border-gray-700'
            }`}>
              <div className="flex items-center mb-2">
                {message.sender === 'user' ? (
                  <User size={20} className="mr-2 text-gray-300" />
                ) : (
                  <Bot size={20} className="mr-2 text-blue-400" />
                )}
                <span className="font-semibold">{message.sender === 'user' ? 'You' : 'Fin'}</span>
              </div>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Fin about your finances..."
            className="flex-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={`bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
