import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Paperclip,
  Settings,
  Maximize2,
  Minimize2,
  X,
  User,
  Bot,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share,
  Volume2,
  VolumeX,
  Loader2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';
import { Input } from './Input';
import { Badge } from './Badge';

export interface AIAssistantProps {
  variant?: 'default' | 'floating' | 'sidebar' | 'fullscreen' | 'mini';
  theme?: 'light' | 'dark' | 'neon' | 'glass' | 'gradient';
  capabilities?: ('text' | 'voice' | 'image' | 'file' | 'code' | 'search')[];
  personality?: 'professional' | 'friendly' | 'technical' | 'creative' | 'educational';
  language?: string;
  voiceEnabled?: boolean;
  autoSuggest?: boolean;
  contextAware?: boolean;
  onMessage?: (message: string, type: 'user' | 'assistant') => void;
  onVoiceToggle?: (enabled: boolean) => void;
  onSettingsChange?: (settings: Record<string, unknown>) => void;
  className?: string;
  disabled?: boolean;
  maxHeight?: number;
  showBranding?: boolean;
  customPrompts?: string[];
  integrations?: ('calendar' | 'email' | 'docs' | 'analytics')[];
}

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  attachments?: File[];
  metadata?: {
    confidence?: number;
    processingTime?: number;
    tokens?: number;
    model?: string;
  };
  reactions?: ('like' | 'dislike')[];
  isTyping?: boolean;
}

interface Suggestion {
  id: string;
  text: string;
  category: 'quick' | 'smart' | 'context';
  icon?: React.ReactNode;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  variant = 'default',
  theme = 'light',
  capabilities = ['text', 'voice'],
  personality = 'professional',
  language = 'en',
  autoSuggest = true,
  onMessage,
  onVoiceToggle,
  className,
  disabled = false,
  maxHeight = 600,
  showBranding = true,
  customPrompts = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'assistant',
        content: getWelcomeMessage(),
        timestamp: new Date(),
        metadata: {
          confidence: 1.0,
          model: 'GPT-4'
        }
      };
      setMessages([welcomeMessage]);
      
      // Set initial suggestions
      setSuggestions(getInitialSuggestions());
    }
  }, [personality, language]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getWelcomeMessage = () => {
    const messages = {
      professional: "Hello! I'm your AI assistant. How can I help you today?",
      friendly: "Hey there! 👋 I'm here to help with whatever you need!",
      technical: "AI Assistant initialized. Ready to process your queries and provide technical assistance.",
      creative: "✨ Welcome to your creative AI companion! Let's bring your ideas to life!",
      educational: "Welcome, learner! I'm here to help you understand and explore new concepts."
    };
    return messages[personality] || messages.professional;
  };

  const getInitialSuggestions = (): Suggestion[] => {
    const baseSuggestions = [
      { id: '1', text: 'What can you help me with?', category: 'quick' as const, icon: <User className="w-4 h-4" /> },
      { id: '2', text: 'Explain a concept', category: 'smart' as const, icon: <Bot className="w-4 h-4" /> },
      { id: '3', text: 'Help me write something', category: 'smart' as const, icon: <Share className="w-4 h-4" /> }
    ];

    if (customPrompts.length > 0) {
      return [
        ...baseSuggestions,
        ...customPrompts.map((prompt, index) => ({
          id: `custom-${index}`,
          text: prompt,
          category: 'context' as const
        }))
      ].slice(0, 6);
    }

    return baseSuggestions;
  };

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachments([]);
    setIsProcessing(true);

    onMessage?.(content, 'user');

    // Simulate AI processing
    const processingStart = Date.now();
    
    // Add typing indicator
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };

    setMessages(prev => [...prev, typingMessage]);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      const assistantResponse = await generateResponse(content, userMessage.attachments);
      const processingTime = Date.now() - processingStart;

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: assistantResponse,
        timestamp: new Date(),
        metadata: {
          confidence: 0.85 + Math.random() * 0.15,
          processingTime,
          tokens: Math.floor(assistantResponse.length * 0.75),
          model: 'GPT-4'
        }
      };

      setMessages(prev => prev.filter(m => !m.isTyping).concat(assistantMessage));
      onMessage?.(assistantResponse, 'assistant');

      // Update suggestions based on context
      if (autoSuggest) {
        setSuggestions(generateContextualSuggestions());
      }

    } catch {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: 'system',
        content: 'I apologize, but I encountered an error while processing your request. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => prev.filter(m => !m.isTyping).concat(errorMessage));
    } finally {
      setIsProcessing(false);
    }
  }, [attachments, autoSuggest, isProcessing, onMessage]);

  const generateResponse = async (userInput: string, attachments?: File[]): Promise<string> => {
    // Enhanced response generation with context awareness
    const responses = {
      greeting: [
        "Hello! I'm here to help. What would you like to know?",
        "Hi there! How can I assist you today?",
        "Welcome! What can I help you with?"
      ],
      help: [
        "I can help you with a wide variety of tasks including answering questions, writing, analysis, coding, and creative projects. What specific assistance do you need?",
        "I'm capable of helping with research, writing, problem-solving, explanations, and much more. What would you like to work on?",
        "I offer assistance with information, creative writing, analysis, coding, and general problem-solving. How can I help?"
      ],
      technical: [
        "That's an interesting technical question. Let me break it down for you step by step.",
        "From a technical perspective, here's how I would approach this:",
        "Let me provide you with a comprehensive technical explanation."
      ],
      creative: [
        "What an exciting creative challenge! Let me help you explore some innovative ideas.",
        "I love creative projects! Here are some interesting approaches we could take:",
        "Let's unleash some creativity! Here are my suggestions:"
      ],
      default: [
        "That's a great question! Let me think about this and provide you with a comprehensive answer.",
        "I understand what you're asking. Here's my analysis and recommendations:",
        "Thank you for that question. Let me provide you with detailed insights."
      ]
    };

    // Simple keyword-based response selection
    const input = userInput.toLowerCase();
    let responseCategory = 'default';

    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      responseCategory = 'greeting';
    } else if (input.includes('help') || input.includes('what can you')) {
      responseCategory = 'help';
    } else if (input.includes('code') || input.includes('technical') || input.includes('algorithm')) {
      responseCategory = 'technical';
    } else if (input.includes('creative') || input.includes('write') || input.includes('story')) {
      responseCategory = 'creative';
    }

    const categoryResponses = responses[responseCategory as keyof typeof responses] || responses.default;
    const baseResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];

    // Add personality-specific modifications
    let personalizedResponse = baseResponse;
    
    switch (personality) {
      case 'friendly':
        personalizedResponse += " 😊";
        break;
      case 'technical':
        personalizedResponse = personalizedResponse.replace(/!/g, '.');
        break;
      case 'creative':
        personalizedResponse += " ✨";
        break;
      case 'educational':
        personalizedResponse += " Let's explore this together!";
        break;
    }

    // Handle attachments
    if (attachments && attachments.length > 0) {
      personalizedResponse += `\n\nI see you've attached ${attachments.length} file(s). I can help analyze and work with your uploaded content.`;
    }

    return personalizedResponse;
  };

  const generateContextualSuggestions = (): Suggestion[] => {
    // Generate smart suggestions based on conversation context
    const contextSuggestions: Suggestion[] = [
      { id: 'follow-1', text: 'Tell me more about this', category: 'context', icon: <User className="w-4 h-4" /> },
      { id: 'follow-2', text: 'Can you give an example?', category: 'context', icon: <Bot className="w-4 h-4" /> },
      { id: 'follow-3', text: 'How does this relate to...', category: 'context', icon: <Share className="w-4 h-4" /> }
    ];

    return contextSuggestions;
  };

  const handleVoiceToggle = useCallback(async () => {
    if (!capabilities.includes('voice')) return;

    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          // In a real implementation, the audio blob would be sent to a speech-to-text API
          const transcribedText = await mockSpeechToText();
          if (transcribedText) {
            setInputValue(transcribedText);
          }
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }

    onVoiceToggle?.(!isRecording);
  }, [isRecording, capabilities, onVoiceToggle]);

  const mockSpeechToText = async (): Promise<string> => {
    // Mock speech-to-text implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockTranscriptions = [
      "Hello, how are you today?",
      "Can you help me with my project?",
      "What's the weather like?",
      "Tell me about artificial intelligence",
      "How do I solve this problem?"
    ];
    return mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  }, []);

  const removeAttachment = useCallback((index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSuggestionClick = useCallback((suggestion: Suggestion) => {
    setInputValue(suggestion.text);
    inputRef.current?.focus();
  }, []);

  const copyMessage = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
  }, []);

  const reactToMessage = useCallback((messageId: string, reaction: 'like' | 'dislike') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
        : msg
    ));
  }, []);

  const getThemeClasses = () => {
    const themes = {
      light: 'bg-white border-gray-200 text-gray-900',
      dark: 'bg-gray-900 border-gray-700 text-white',
      neon: 'bg-black border-cyan-400 text-cyan-400 shadow-cyan-400/25',
      glass: 'bg-white/95 backdrop-blur-md border-white/20 text-gray-900',
      gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 border-purple-200 text-gray-900'
    };
    return themes[theme] || themes.light;
  };

  const getVariantClasses = () => {
    const variants = {
      default: 'relative w-full max-w-2xl mx-auto',
      floating: 'fixed bottom-4 right-4 w-80 shadow-2xl rounded-xl',
      sidebar: 'fixed left-0 top-0 h-full w-80 shadow-xl',
      fullscreen: 'fixed inset-0 z-50',
      mini: 'w-64'
    };
    return variants[variant] || variants.default;
  };

  if (variant === 'floating' && !isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-2xl"
        variant="default"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        getVariantClasses(),
        getThemeClasses(),
        'border rounded-xl overflow-hidden',
        isFullscreen && 'w-full h-full rounded-none',
        className
      )}
      style={{ maxHeight: isFullscreen ? '100vh' : maxHeight }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isProcessing ? 'Thinking...' : 'Online'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {capabilities.includes('voice') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSpeaking(!isSpeaking)}
              className={cn(isSpeaking && 'text-blue-500')}
            >
              {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4" />
          </Button>
          
          {variant !== 'fullscreen' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          )}
          
          {variant === 'floating' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: maxHeight - 200 }}>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'flex gap-3',
              message.type === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.type === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={cn(
              'max-w-[80%] rounded-lg p-3',
              message.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : message.type === 'system'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
            )}>
              {message.isTyping ? (
                <div className="flex items-center gap-1">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              ) : (
                <>
                  <p className="text-sm">{message.content}</p>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs opacity-75">
                          <Paperclip className="w-3 h-3" />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {message.metadata && message.type === 'assistant' && (
                    <div className="mt-2 flex items-center gap-4 text-xs opacity-60">
                      {message.metadata.confidence && (
                        <span>Confidence: {(message.metadata.confidence * 100).toFixed(0)}%</span>
                      )}
                      {message.metadata.processingTime && (
                        <span>{(message.metadata.processingTime / 1000).toFixed(1)}s</span>
                      )}
                    </div>
                  )}
                </>
              )}
              
              {!message.isTyping && message.type === 'assistant' && (
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyMessage(message.content)}
                    className="h-6 px-2"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => reactToMessage(message.id, 'like')}
                    className="h-6 px-2"
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => reactToMessage(message.id, 'dislike')}
                    className="h-6 px-2"
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            
            {message.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">U</span>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Badge
                key={suggestion.id}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-xs"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.icon}
                <span className="ml-1">{suggestion.text}</span>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1">
                <Paperclip className="w-3 h-3" />
                <span className="text-xs">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAttachment(index)}
                  className="h-4 w-4 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={disabled || isProcessing}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }
              }}
              rightIcon={
                <div className="flex items-center gap-1">
                  {capabilities.includes('file') && (
                    <>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.txt"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-6 w-6 p-0"
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  
                  {capabilities.includes('voice') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceToggle}
                      className={cn(
                        'h-6 w-6 p-0',
                        isRecording && 'text-red-500 animate-pulse'
                      )}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
              }
            />
          </div>
          
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || disabled || isProcessing}
            size="sm"
          >
            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Branding */}
      {showBranding && (
        <div className="px-4 py-2 text-center">
          <p className="text-xs text-gray-400">
            Powered by Advanced AI • {new Date().getFullYear()}
          </p>
        </div>
      )}
    </motion.div>
  );
}; 