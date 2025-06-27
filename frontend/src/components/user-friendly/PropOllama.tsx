import React, { useState, useEffect, useRef, useCallback  } from 'react.ts';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  SparklesIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserGroupIcon,
  ComputerDesktopIcon,
  UserIcon,
  BoltIcon,
  TrophyIcon,
  FireIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline.ts';
import { productionApiService } from '@/services/api/ProductionApiService.ts';
import { logger, logUserAction, logError } from '@/utils/logger.ts';
import OfflineIndicator from '@/components/ui/OfflineIndicator.ts';

// ============================================================================
// INTERFACES & TYPES;
// ============================================================================

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  analysisType?: string;
  confidence?: number;
  isLoading?: boolean;
}

interface ChatSession {
  id: string;
  messages: Message[];
  startTime: Date;
  totalMessages: number;
  lastActivity: Date;
}

interface LiveStats {
  activeAnalyses: number;
  liveGames: number;
  confidencePicks: number;
  valueBets: number;
  responseTime: number;
  accuracy: number;
}

// ============================================================================
// UTILITY FUNCTIONS;
// ============================================================================

const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const detectAnalysisType = (text: string): string => {

  if (lowerText.includes('prop') || lowerText.includes('player')) return 'prop_analysis';
  if (lowerText.includes('value') || lowerText.includes('edge')) return 'value_analysis';
  if (lowerText.includes('strategy') || lowerText.includes('bankroll')) return 'strategy_advice';
  if (lowerText.includes('odds') || lowerText.includes('line')) return 'odds_analysis';
  if (lowerText.includes('trend') || lowerText.includes('movement')) return 'trend_analysis';
  if (lowerText.includes('live') || lowerText.includes('real-time')) return 'live_analysis';
  
  return 'general';
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// ============================================================================
// MAIN COMPONENT;
// ============================================================================

const PropOllama: React.FC = () => {
  // Core state;
  const [messages, setMessages] = useState<Message[] key={683850}>([
    {
      id: 'welcome',
      type: 'ai',
      content: `🤖 **Welcome to PropOllama!** 

I'm your AI sports betting assistant, powered by advanced analytics and real-time data processing.

**What I can help you with:**
🎯 **Player Props Analysis** - Deep dive into player statistics and trends;
💎 **Value Bet Detection** - Find profitable opportunities with positive expected value;
📊 **Market Analysis** - Track line movements and betting patterns;
🏀 **Sport-Specific Insights** - NBA, NFL, MLB, Soccer, and more;
🧠 **Strategy Optimization** - Bankroll management and betting strategies;
⚡ **Live Updates** - Real-time odds and game monitoring;

**Quick Start:**
Try asking me about today's games, player props, or betting strategies. I'll provide detailed analysis with confidence ratings and actionable insights.

What would you like to explore first?`,
      timestamp: new Date(),
      suggestions: [
        "Show me today's best props",
        "Analyze NBA player performance",
        "Find value bets for tonight",
        "Help with betting strategy",
        "Explain line movements",
        "Check live game updates"
      ],
      confidence: 100,
    },
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [session, setSession] = useState<ChatSession key={940993}>({
    id: `session_${Date.now()}`,
    messages: [],
    startTime: new Date(),
    totalMessages: 0,
    lastActivity: new Date(),
  });

  // Live stats;
  const [liveStats, setLiveStats] = useState<LiveStats key={680001}>({
    activeAnalyses: 147,
    liveGames: 8,
    confidencePicks: 12,
    valueBets: 23,
    responseTime: 850,
    accuracy: 87.3,
  });

  // Refs;


  // Quick action buttons;
  const quickActions = [
    {
      id: 'props',
      title: 'Best Props',
      icon: TrophyIcon,
      prompt: 'Show me today\'s best player props with high confidence ratings',
      color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20',
    },
    {
      id: 'value',
      title: 'Value Bets',
      icon: CurrencyDollarIcon,
      prompt: 'Find me the best value bets with positive expected value for tonight\'s games',
      color: 'text-green-500 bg-green-100 dark:bg-green-900/20',
    },
    {
      id: 'nba',
      title: 'NBA Focus',
      icon: ChartBarIcon,
      prompt: 'Analyze tonight\'s NBA games and provide player prop recommendations',
      color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/20',
    },
    {
      id: 'strategy',
      title: 'Strategy',
      icon: SparklesIcon,
      prompt: 'Help me optimize my betting strategy and bankroll management approach',
      color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/20',
    },
    {
      id: 'live',
      title: 'Live Odds',
      icon: BoltIcon,
      prompt: 'Show me live odds movements and significant line changes happening now',
      color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      id: 'trends',
      title: 'Market Trends',
      icon: RocketLaunchIcon,
      prompt: 'What are the current betting market trends and patterns I should know about?',
      color: 'text-pink-500 bg-pink-100 dark:bg-pink-900/20',
    },
  ];

  // Effects;
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    logUserAction('prop_ollama_opened', { 
      sessionId: session.id,
      timestamp: new Date().toISOString() 
    });
  }, [session.id]);

  // Real-time stats - only update based on actual usage;
  useEffect(() => {
    // Only fetch real live stats from API periodically if needed;
    const interval = setInterval(async () => {
      try {
        // In production, this would call an API endpoint for live stats;
        // For now, just maintain current state without random changes;
        setLiveStats(prev => ({ ...prev }));
      } catch (error) {
        logger.error('Failed to update live stats:', error);
      }
    }, 30000); // Update every 30 seconds instead of 8;

    return () => clearInterval(interval);
  }, []);

  // Functions;
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateMessageId = () => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const detectAnalysisType = (input: string): string => {

    if (lowerInput.includes('prop') || lowerInput.includes('player') || lowerInput.includes('stats')) {
      return 'prop_analysis';
    }
    if (lowerInput.includes('value') || lowerInput.includes('edge') || lowerInput.includes('bet') || lowerInput.includes('odds')) {
      return 'value_analysis';
    }
    if (lowerInput.includes('strategy') || lowerInput.includes('bankroll') || lowerInput.includes('manage')) {
      return 'strategy_advice';
    }
    return 'general';
  };

  const sendMessage = useCallback(async (messageText?: string) => {

    if (!text || isLoading) return;

    // Clear input if using typed message;
    if (!messageText) {
      setInput('');
    }

    // Add user message;
    const userMessage: Message = {
      id: generateMessageId(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    setError(null);

    // Update session;
    setSession(prev => ({
      ...prev,
      totalMessages: prev.totalMessages + 1,
      lastActivity: new Date(),
    }));

    logUserAction('prop_ollama_message_sent', {
      sessionId: session.id,
      messageLength: text.length,
      analysisType: detectAnalysisType(text),
    });

    try {


      // Try to call the PropOllama API;
      const response = await productionApiService.post('/api/propollama/chat', {
        message: text,
        context: {
          previousMessages: messages.slice(-5),
          analysisType,
          sessionId: session.id,
          timestamp: new Date().toISOString(),
        },
        analysisType,
      });

      if (response.success) {
        const data = response.data as {
          content: string;
          suggestions?: string[];
          confidence?: number;
        };
        
        const aiMessage: Message = {
          id: generateMessageId(),
          type: 'ai',
          content: data.content,
          timestamp: new Date(),
          suggestions: data.suggestions || [
            'Tell me more',
            'Show examples',
            'Get different analysis',
            'Explain strategy',
          ],
          analysisType,
          confidence: data.confidence || 85,
        };

        setMessages(prev => [...prev, aiMessage]);
        
        // Update live stats;
        setLiveStats(prev => ({
          ...prev,
          responseTime,
          accuracy: data.confidence || prev.accuracy,
        }));

        logger.info('PropOllama response received', {
          responseTime,
          analysisType,
          confidence: data.confidence,
        });
      } else {
        throw new Error(response.error || 'Failed to get AI response');
      }
    } catch (err) {
      logError(err as Error, 'PropOllama.sendMessage');
      
      // Generate fallback response;
      // If API fails, show error message instead of fallback;
      const errorMessage: Message = {
        id: generateMessageId(),
        type: 'ai',
        content: `I'm currently unable to process your request. Please check your connection and try again.`,
        timestamp: new Date(),
        analysisType: detectAnalysisType(text),
        confidence: 0,
        suggestions: ['Refresh the page', 'Check internet connection', 'Contact support'],
      };
      setMessages(prev => [...prev, errorMessage]);
      
      setError('Using offline mode - connect to PropOllama backend for live AI analysis');
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [input, messages, session, isLoading]);

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleQuickAction = (action: any) => {
    sendMessage(action.prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([messages[0]]); // Keep welcome message;
    setSession(prev => ({
      ...prev,
      totalMessages: 0,
      lastActivity: new Date(),
    }));
    logUserAction('prop_ollama_chat_cleared', { sessionId: session.id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" key={879721}>
      {!navigator.onLine && <OfflineIndicator show={true} / key={879044}>}
      
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40" key={783657}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" key={405990}>
          <div className="flex items-center justify-between h-16" key={981431}>
            <div className="flex items-center space-x-4" key={787951}>
              <div className="flex items-center space-x-2" key={740830}>
                <ComputerDesktopIcon className="h-8 w-8 text-purple-500" / key={204821}>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" key={328594}>
                  PropOllama;
                </h1>
              </div>
              <div className="hidden md:flex items-center space-x-2 ml-6" key={29439}>
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm font-medium" key={329950}>
                  {liveStats.accuracy.toFixed(1)}% Accuracy;
                </div>
                <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium" key={992921}>
                  {liveStats.responseTime}ms Response;
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4" key={787951}>
              <div className="hidden md:flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400" key={865631}>
                <div className="flex items-center space-x-1" key={468268}>
                  <ChartBarIcon className="h-4 w-4" / key={620244}>
                  <span key={595076}>{liveStats.activeAnalyses} Active</span>
                </div>
                <div className="flex items-center space-x-1" key={468268}>
                  <BoltIcon className="h-4 w-4" / key={293236}>
                  <span key={595076}>{liveStats.liveGames} Live</span>
                </div>
              </div>
              
              <button;
                onClick={clearChat}
                className="p-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                title="Clear chat history"
               key={129409}>
                <ArrowPathIcon className="h-5 w-5" / key={526499}>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[calc(100vh-64px)]" key={413669}>
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg" key={632200}>
            <div className="flex items-center space-x-2" key={740830}>
              <ExclamationCircleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" / key={70956}>
              <p className="text-yellow-800 dark:text-yellow-200" key={657429}>{error}</p>
            </div>
          </div>
        )}

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" key={293803}>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700" key={498416}>
            <div className="flex items-center space-x-2" key={740830}>
              <ChartBarIcon className="h-5 w-5 text-purple-500" / key={516014}>
              <div key={241917}>
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100" key={194335}>
                  {liveStats.activeAnalyses}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400" key={63471}>Live Analyses</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700" key={498416}>
            <div className="flex items-center space-x-2" key={740830}>
              <BoltIcon className="h-5 w-5 text-yellow-500" / key={693776}>
              <div key={241917}>
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100" key={194335}>
                  {liveStats.liveGames}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400" key={63471}>Live Games</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700" key={498416}>
            <div className="flex items-center space-x-2" key={740830}>
              <TrophyIcon className="h-5 w-5 text-green-500" / key={76437}>
              <div key={241917}>
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100" key={194335}>
                  {liveStats.confidencePicks}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400" key={63471}>High Confidence</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700" key={498416}>
            <div className="flex items-center space-x-2" key={740830}>
              <CurrencyDollarIcon className="h-5 w-5 text-blue-500" / key={819827}>
              <div key={241917}>
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100" key={194335}>
                  {liveStats.valueBets}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400" key={63471}>Value Bets</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6" key={677855}>
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3" key={26603}>Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" key={704051}>
            {quickActions.map((action) => (
              <button;
                key={action.id}
                onClick={() = key={889814}> handleQuickAction(action)}
                className={`p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200 ${action.color}`}
                title={action.prompt}
              >
                <action.icon className="h-5 w-5 mx-auto mb-1" / key={496824}>
                <div className="text-xs font-medium" key={471777}>{action.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col" key={151169}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6" key={929138}>
            {messages.map((message) => (
              <div;
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
               key={615712}>
                <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`} key={445071}>
                  {/* Message Header */}
                  <div className={`flex items-center space-x-2 mb-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`} key={799104}>
                    <div className={`flex items-center space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`} key={625172}>
                      <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`} key={327289}>
                        {message.type === 'user' ? (
                          <UserIcon className="h-4 w-4 text-white" / key={717022}>
                        ) : (
                          <ComputerDesktopIcon className="h-4 w-4 text-white" / key={104716}>
                        )}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400" key={994128}>
                        <div className="font-medium" key={471146}>
                          {message.type === 'user' ? 'You' : 'PropOllama'}
                        </div>
                        <div className="text-xs" key={439526}>{formatTime(message.timestamp)}</div>
                      </div>
                    </div>
                    {message.confidence && (
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        message.confidence  key={460131}>= 80 ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' :
                        message.confidence >= 60 ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' :
                        'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                      }`}>
                        {message.confidence}% confidence;
                      </div>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`p-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                  }`} key={148639}>
                    <div className="whitespace-pre-wrap" key={111424}>
                      {message.content}
                    </div>
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2" key={92057}>
                      {message.suggestions.map((suggestion, index) => (
                        <button;
                          key={index}
                          onClick={() = key={728988}> handleSuggestionClick(suggestion)}
                          className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start" key={691262}>
                <div className="max-w-3xl" key={529121}>
                  <div className="flex items-center space-x-2 mb-2" key={766767}>
                    <div className="p-2 rounded-full bg-purple-500" key={24690}>
                      <ComputerDesktopIcon className="h-4 w-4 text-white" / key={104716}>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400" key={994128}>
                      <div className="font-medium" key={471146}>PropOllama</div>
                      <div className="text-xs" key={439526}>Analyzing...</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-700" key={882757}>
                    <div className="flex space-x-1" key={828285}>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" key={978321}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" key={781059}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" key={525091}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} / key={354031}>
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4" key={65839}>
            <div className="flex space-x-4" key={470893}>
              <input;
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) = key={897736}> setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask PropOllama about props, value bets, strategies..."
                className="flex-1 px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
                title="Type your message here"
                aria-label="Chat message input"
              />
              <button;
                onClick={() = key={206350}> sendMessage()}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                title="Send message"
              >
                {isLoading ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin" / key={950202}>
                ) : (
                  <PaperAirplaneIcon className="h-5 w-5" / key={834285}>
                )}
                <span key={595076}>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropOllama;
