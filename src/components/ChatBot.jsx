import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_RESPONSES = {
  algorithms: [
    "Yo! Algorithms are basically step-by-step instructions for solving problems. Think of it like a recipe but for code! 🍳",
    "Algorithms are just fancy ways of saying 'here's how to solve this problem efficiently.' Big O notation tells you how fast it runs! ⚡",
  ],
  datastructures: [
    "Data structures are like containers for your data! Arrays, linked lists, stacks, queues - they're all different ways to organize stuff 📦",
    "Think of data structures as different types of storage. Array = bookshelf, Tree = family tree, Graph = social network! 🌳",
  ],
  javascript: [
    "JavaScript is THE language for web dev! It's what makes websites interactive and fun. Plus, async/await is lowkey a game changer 🎮",
    "JS is everywhere ngl - frontend, backend (Node.js), mobile apps. It's like the Swiss Army knife of programming! 🔧",
  ],
  python: [
    "Python is super beginner-friendly! Clean syntax, tons of libraries, great for AI/ML. It's giving easy mode vibes 🐍✨",
    "Python slaps for data science, automation, and backend stuff. Plus the community is massive so you'll find help everywhere! 💪",
  ],
  css: [
    "CSS is art meets code! Flexbox and Grid are your best friends for layouts. Don't sleep on CSS animations either! 🎨",
    "CSS can be tricky but once you get it, you'll be making sites look fire 🔥 Pro tip: learn Tailwind, it's a vibe",
  ],
  react: [
    "React is basically THE frontend framework rn. Components, hooks, virtual DOM - it's all about making UIs efficiently! ⚛️",
    "React hooks changed the game fr fr. useState, useEffect - they make state management so much cleaner! 🪝",
  ],
  database: [
    "Databases are where you store all your data! SQL for structured stuff, NoSQL for flexibility. Both hit different 🗄️",
    "Think of databases as organized filing cabinets for your app's data. MongoDB, PostgreSQL - pick your fighter! 💾",
  ],
  default: [
    "That's a solid CS question! Let me break it down for you... 🤔",
    "Ooh interesting question! Here's the tea on that topic... ☕",
    "Bet! Let me explain this in a way that makes sense... 💡",
  ]
};

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Yooo! 👋 I'm your CS study buddy! Hit me with any comp sci questions - algorithms, data structures, web dev, whatever! No cap, I gotchu! 💯",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'online', 'fallback', 'error'
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
    
    // Check if API key is configured
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here' || apiKey.trim() === '') {
      console.warn('API key not configured, using fallback mode');
      setApiStatus('fallback');
    } else {
      console.log('API key configured, online mode ready');
      setApiStatus('online');
    }
  }, []);

  const detectTopic = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.match(/algorithm|sorting|searching|complexity|big o/)) return 'algorithms';
    if (lowerText.match(/data structure|array|tree|graph|stack|queue|linked list/)) return 'datastructures';
    if (lowerText.match(/javascript|js|node|async|promise/)) return 'javascript';
    if (lowerText.match(/python|django|flask|pandas/)) return 'python';
    if (lowerText.match(/css|styling|flexbox|grid|tailwind/)) return 'css';
    if (lowerText.match(/react|component|hook|jsx|state/)) return 'react';
    if (lowerText.match(/database|sql|mongodb|postgres|mysql/)) return 'database';
    return 'default';
  };

  const getFallbackResponse = (userMessage) => {
    const topic = detectTopic(userMessage);
    const responses = FALLBACK_RESPONSES[topic] || FALLBACK_RESPONSES.default;
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    return `${response}\n\n(Btw, I'm running on backup mode rn since the AI service is down, but I still got the basics covered! 🔋)`;
  };

  const callGeminiAPI = async (userMessage, conversationHistory) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    console.log('API Key present:', !!apiKey);
    
    if (!apiKey || apiKey === 'your_api_key_here' || apiKey.trim() === '') {
      console.error('API key not configured properly');
      throw new Error('API key not configured');
    }

    const systemPrompt = `You are a Gen-Z computer science tutor chatbot. Your personality:
- Use casual, friendly Gen-Z slang (lowkey, highkey, no cap, fr fr, slaps, hits different, etc.)
- Be enthusiastic and encouraging with emojis
- Explain CS concepts clearly but keep it real and relatable
- Use analogies and examples students can relate to
- Keep responses concise but informative (2-4 paragraphs max)
- Always be helpful and patient with questions

Topics you help with: algorithms, data structures, programming languages (Python, JavaScript, Java, C++), web development, databases, computer networks, operating systems, software engineering, etc.`;

    const prompt = conversationHistory 
      ? `${systemPrompt}\n\nPrevious conversation:\n${conversationHistory}\n\nUser: ${userMessage}\n\nAssistant:`
      : `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`;

    console.log('Calling Gemini API...');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      }),
    });

    console.log('API Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', errorData);
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    if (data.candidates && data.candidates[0]?.finishReason === 'SAFETY') {
      throw new Error('Response blocked by safety filters');
    }
    
    console.error('Invalid response format:', data);
    throw new Error('Invalid API response format');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Build conversation history (last 6 messages for context)
      const conversationHistory = messages
        .slice(-6)
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');

      // Try Gemini API first
      const responseText = await callGeminiAPI(userMessage, conversationHistory);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      }]);
      setApiStatus('online');
      
    } catch (error) {
      console.error('Gemini API error:', error);
      
      // Use fallback response
      const fallbackResponse = getFallbackResponse(userMessage);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date(),
        isFallback: true,
      }]);
      setApiStatus('fallback');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed bottom-6 right-6 w-[420px] h-[600px] bg-slate-900 border-2 border-purple-500/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot size={32} className="text-white" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-purple-600"
            />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">CS Study Buddy</h3>
            <p className="text-purple-100 text-xs flex items-center gap-1">
              {apiStatus === 'checking' && (
                <>
                  <Sparkles size={12} /> Initializing...
                </>
              )}
              {apiStatus === 'online' && (
                <>
                  <Sparkles size={12} /> AI Powered
                </>
              )}
              {apiStatus === 'fallback' && (
                <>
                  <AlertCircle size={12} /> Backup Mode
                </>
              )}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X size={24} className="text-white" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : message.isFallback
                    ? 'bg-slate-800 text-slate-100 border border-yellow-500/30'
                    : 'bg-slate-800 text-slate-100'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800 rounded-2xl p-3">
              <div className="flex gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  className="w-2 h-2 bg-purple-500 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  className="w-2 h-2 bg-purple-500 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  className="w-2 h-2 bg-purple-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about CS... 💭"
            className="flex-1 bg-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatBot;
