'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Trash2, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getChatResponse, ChatMessage } from '../../lib/gemini';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your empathetic campus support companion. I'm here to listen and help you find resources. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        type: 'bot',
        content: "Chat cleared. I'm ready to listen whenever you need.",
        timestamp: new Date()
      }
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Convert internal message format to API format
      const history: ChatMessage[] = messages
        .filter(m => m.id !== '1') // Skip the initial greeting to keep context clean or include it if prefered
        .map(m => ({
          role: m.type === 'bot' ? 'model' : 'user',
          parts: m.content
        }));

      const responseText = await getChatResponse(history, userText);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I'm having trouble connecting to the service. Please check your internet connection and try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-[600px] border border-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full">
            <Heart className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-white">
            <h3 className="text-lg font-semibold">Campus Assistant</h3>
            <p className="text-xs opacity-90">Powered by AI • Private & Safe</p>
          </div>
        </div>
        <button
          onClick={handleClearChat}
          className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Clear Chat"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${message.type === 'bot'
              ? 'bg-purple-100'
              : 'bg-blue-100'
              }`}>
              {message.type === 'bot' ? (
                <Bot className="w-5 h-5 text-purple-600" />
              ) : (
                <User className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${message.type === 'bot'
                ? 'bg-slate-50 text-slate-800 border border-slate-100'
                : 'bg-blue-600 text-white'
                }`}
            >
              {message.type === 'bot' ? (
                <div className="prose prose-sm max-w-none text-slate-800 break-words">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              )}
              <span className={`text-[10px] mt-2 block opacity-70 ${message.type === 'bot' ? 'text-slate-500' : 'text-blue-100'
                }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-600" />
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-100 p-4 bg-slate-50/50 rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={isTyping}
            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600 bg-white transition-all disabled:opacity-60"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-md shadow-purple-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-3 text-center">
          Crisis? Call 988 or text "CAMPUS" to 741741. This AI is for support, not medical advice.
        </p>
      </div>
    </div>
  );
}
