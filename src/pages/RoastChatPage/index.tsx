import React, { useState, useEffect, useRef } from 'react';
import { BackButton } from '../../components/ui/BackButton';
import { getRandomRoast, getIdleRoast } from '../../utils/roasts';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const RoastChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "INITIALIZING ROASTBOT-3000... 🤖\nPreparing sass modules...\nLoading insult database...\nCalibrating ego destruction...\nSystems ready! What's on your mind, human?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [theme, setTheme] = useState<'default' | 'angry' | 'sassy' | 'glitch'>('default');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Idle roast timer
  useEffect(() => {
    const idleTimer = setInterval(() => {
      const idleTime = Date.now() - lastActivity;
      if (idleTime > 30000) { // 30 seconds
        const idleRoast = getIdleRoast();
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: idleRoast,
          sender: 'bot',
          timestamp: new Date()
        }]);
        setLastActivity(Date.now());
      }
    }, 10000);

    return () => clearInterval(idleTimer);
  }, [lastActivity]);

  // Theme rotation
  useEffect(() => {
    const themes: ('default' | 'angry' | 'sassy' | 'glitch')[] = ['default', 'angry', 'sassy', 'glitch'];
    const themeInterval = setInterval(() => {
      setTheme(prev => {
        const currentIndex = themes.indexOf(prev);
        return themes[(currentIndex + 1) % themes.length];
      });
    }, 10000);

    return () => clearInterval(themeInterval);
  }, []);

  const getThemeClasses = () => {
    switch (theme) {
      case 'angry':
        return 'from-red-500 to-orange-500';
      case 'sassy':
        return 'from-pink-500 to-purple-500';
      case 'glitch':
        return 'from-cyan-500 to-blue-500';
      default:
        return 'from-purple-500 to-red-500';
    }
  };

  const getMessageStyle = (sender: 'user' | 'bot') => {
    if (sender === 'user') {
      return 'bg-gradient-to-r from-purple-500 to-red-500 text-white';
    }

    switch (theme) {
      case 'angry':
        return 'bg-white border-2 border-red-500 text-gray-800';
      case 'sassy':
        return 'bg-white border-2 border-pink-500 text-gray-800';
      case 'glitch':
        return 'bg-white border-2 border-cyan-500 text-gray-800';
      default:
        return 'bg-white border-2 border-purple-500 text-gray-800';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLastActivity(Date.now());
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const roast = getRandomRoast(userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: roast,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <BackButton to="/" />
            <div className="text-center">
              <h1 className={`text-2xl font-bold bg-gradient-to-r ${getThemeClasses()} bg-clip-text text-transparent`}>
                RoastBot-3000
              </h1>
              <p className="text-sm text-gray-500">Current Mode: {theme.charAt(0).toUpperCase() + theme.slice(1)}</p>
            </div>
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 mt-1 mr-2">
                    <div className={`w-full h-full rounded-full bg-gradient-to-r ${getThemeClasses()} flex items-center justify-center text-white text-sm`}>
                      🤖
                    </div>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-md transform transition-all duration-300 hover:scale-[1.02] ${
                    getMessageStyle(message.sender)
                  }`}
                >
                  <p className="text-lg whitespace-pre-line leading-relaxed">{message.text}</p>
                  <p className="text-xs mt-1 text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 mt-1 ml-2">
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-sm">
                      👤
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 mt-1 mr-2">
                  <div className={`w-full h-full rounded-full bg-gradient-to-r ${getThemeClasses()} flex items-center justify-center text-white text-sm`}>
                    🤖
                  </div>
                </div>
                <div className={`rounded-2xl px-4 py-2 shadow-md ${getMessageStyle('bot')}`}>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Tell me about your life (if you dare)...`}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={`px-6 py-2 bg-gradient-to-r ${getThemeClasses()} text-white rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg`}
            >
              Roast Me
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
