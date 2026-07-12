import React, { useState, useContext, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';

const AIChatPage = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am SurakshaAI, your financial safety assistant. Ask me anything about suspicious messages, banking safely, or identifying scams.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { language } = useContext(LanguageContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      // NOTE: For a real production app, you would have a specific endpoint for chat that maintains context.
      // Here we will use the message analysis endpoint as a fallback for the chat to demonstrate AI capability.
      const formData = new URLSearchParams();
      formData.append('message', "User Question: " + userMessage);
      formData.append('language', language);
      
      const res = await api.post('/analysis/message', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      const aiResponse = res.data.detailed_explanation + "\n\nTip: " + (res.data.prevention_tips?.[0] || "");
      
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm sorry, I am having trouble connecting right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex-1 flex flex-col overflow-hidden">
          
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center">
            <Bot className="h-6 w-6 text-primary-500 mr-2" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Financial Safety Assistant</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-primary-500 ml-3' : 'bg-gray-200 dark:bg-gray-700 mr-3'}`}>
                    {msg.role === 'user' ? <UserIcon className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-600'
                  }`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                    <Bot className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-700 rounded-tl-none border border-gray-200 dark:border-gray-600 flex items-center">
                    <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a suspicious call or message..."
                className="flex-1 input-field"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-primary-600 text-white rounded-lg px-4 py-2 hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex flex-col justify-center"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;
