import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { useUI } from '../context/UIContext';
import { destinations } from '../data/destinations';
import { chatWithHuggingFaceAI } from '../services/aiService';
import {
  Bot,
  User,
  Send,
  Sparkles,
  Compass,
  ArrowRight,
  Trash2,
  MapPin,
  Calendar,
  Wallet
} from 'lucide-react';

const REQUIRED_PROMPTS = [
  'What should I visit tomorrow?',
  'Suggest a cheaper activity.',
  'What should I pack?',
  'Which activity can I remove to reduce cost?',
  'Suggest local food.',
  'Suggest a budget hotel.'
];

export const TravelAssistant = () => {
  const { currentTrip } = useTrip();
  const { showSuccess, showInfo } = useUI();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const activeDest = destinations.find(d => d.id === (currentTrip ? currentTrip.destinationId : 'goa')) || destinations[0];

  useEffect(() => {
    // Initial welcome message
    const welcome = {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello traveler! I am **TripMate Assistant**, powered by Hugging Face AI and real-time destination knowledge.\n\nI am synced with your active trip: **${currentTrip ? currentTrip.destinationName : 'Goa'}**.\n\nYou can ask me for smart day-by-day activity suggestions, budget optimization, local cuisine recommendations, or custom packing advice!`,
      chips: REQUIRED_PROMPTS,
      timestamp: new Date().toISOString()
    };
    setMessages([welcome]);
  }, [currentTrip]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Context-aware rule-based response generator (Requirement 24)
  const generateRuleBasedReply = (query) => {
    const q = query.toLowerCase();
    const destName = currentTrip ? currentTrip.destinationName : activeDest.name;
    const dest = destinations.find(d => d.id === (currentTrip ? currentTrip.destinationId : activeDest.id)) || activeDest;

    if (q.includes('visit tomorrow') || q.includes('visit') || q.includes('what should i visit')) {
      const topPlaces = dest.places?.slice(0, 2).map(p => `• **${p.name}** (${p.category}) - ${p.description}`).join('\n') || '• Explore historical center and local bazaars.';
      return `For tomorrow in **${destName}**, here are top recommendations:\n\n${topPlaces}\n\n*Tip: Start around 09:00 AM to enjoy pleasant weather and fewer crowds.*`;
    }

    if (q.includes('cheaper activity') || q.includes('reduce cost') || q.includes('remove')) {
      const freePlace = dest.places?.find(p => p.price === 0);
      const freeMsg = freePlace ? `You can visit **${freePlace.name}** which has **free entry**!` : 'Opt for scenic public parks or walking tours.';
      return `To reduce expenses on your **${destName}** trip:\n\n1. ${freeMsg}\n2. Choose self-guided walking tours rather than paid group buses.\n3. Grab snacks from authentic local bakeries instead of hotel room service.`;
    }

    if (q.includes('pack') || q.includes('what should i pack')) {
      const intlMsg = dest.isInternational ? '\n• **Passport (6+ months validity)** and **Universal Power Adapter**' : '';
      return `Here is what to pack for **${destName}**:\n• Comfortable walking shoes${intlMsg}\n• Lightweight breathable outfits\n• Portable 10,000mAh Power Bank\n• Sun protection (SPF 50+ sunscreen & sunglasses)\n\nCheck your **Packing Checklist** tab for full details!`;
    }

    if (q.includes('food') || q.includes('restaurant') || q.includes('eat')) {
      const foodItems = dest.foods?.map(f => `• **${f.name}** (${f.category}) - Price: ${f.price} at ${f.location}`).join('\n') || '• Delicious local regional specialties and street cafes.';
      return `Here is top-rated authentic local gastronomy in **${destName}**:\n\n${foodItems}`;
    }

    if (q.includes('hotel') || q.includes('stay') || q.includes('accommodation')) {
      const stayItems = dest.stays?.map(s => `• **${s.name}** (${s.type}) - ${dest.currencySymbol || '₹'}${s.price}/night [${s.amenities.join(', ')}]`).join('\n') || `• Budget stays start from ${dest.currencySymbol || '₹'}${dest.hotelRate}/night.`;
      return `Recommended verified stays in **${destName}**:\n\n${stayItems}\n\n*All bookings can be previewed in Demo Mode.*`;
    }

    return `I can help customize your **${destName}** trip! You can ask about tomorrow's itinerary, cheaper alternatives, local cuisine, packing advice, or stay options.`;
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    setInputText('');

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setIsTyping(true);

    try {
      const aiReply = await chatWithHuggingFaceAI(text, currentTrip);
      const reply = aiReply || generateRuleBasedReply(text);
      const assistantMsg = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        chips: REQUIRED_PROMPTS.filter(p => p !== text).slice(0, 3),
        timestamp: new Date().toISOString()
      };
      setMessages([...nextHistory, assistantMsg]);
    } catch (e) {
      const reply = generateRuleBasedReply(text);
      const assistantMsg = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        chips: REQUIRED_PROMPTS.filter(p => p !== text).slice(0, 3),
        timestamp: new Date().toISOString()
      };
      setMessages([...nextHistory, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-600/25">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>TripMate AI Travel Assistant</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 border border-amber-300/60 shadow-2xs">
                🤗 Hugging Face AI
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              Synced with {currentTrip ? currentTrip.destinationName : 'all destinations'} • Real-time AI guidance
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setMessages([]);
            showInfo('Chat history cleared');
          }}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title="Clear Chat"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col h-[65vh]">
        
        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isAsst = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAsst ? 'items-start' : 'items-end justify-end'}`}
              >
                {isAsst && (
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs space-y-2 leading-relaxed ${
                  isAsst
                    ? 'bg-slate-50 border border-slate-200/70 text-slate-800'
                    : 'bg-slate-900 text-white shadow-sm'
                }`}>
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Suggestion Chips */}
                  {isAsst && msg.chips && msg.chips.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-200/50">
                      {msg.chips.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(chip)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:border-sky-500 hover:text-sky-700 text-[11px] transition-colors"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {!isAsst && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-sky-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-sky-600 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-sky-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything (e.g. Suggest a cheaper activity, What should I pack?)..."
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium focus:border-sky-500 focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white transition-colors disabled:opacity-40 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default TravelAssistant;
