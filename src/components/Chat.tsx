import React, { useState, useEffect, useRef } from 'react';
import { Message, KnowledgeBase } from '../types';
import { loadKnowledgeBase, findAnswer } from '../utils/knowledgeBase';
import { addLog } from '../utils/csvLogger';
import MessageBubble from './MessageBubble';
import LoadingBubble from './LoadingBubble';
import InputArea from './InputArea';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadKnowledgeBase().then(setKnowledgeBase);
    
    // Add welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: "Hello! I'm Verbo, your chatbot assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!knowledgeBase) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Show loading
    setIsLoading(true);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Get bot response
    const answer = findAnswer(text, knowledgeBase);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: answer,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);

    // Log the interaction
    addLog({
      timestamp: new Date().toISOString(),
      question: text,
      answer: answer
    });
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map(message => (
          <MessageBubble 
            key={message.id} 
            message={message} 
          />
        ))}
        {isLoading && <LoadingBubble />}
        <div ref={messagesEndRef} />
      </div>
      <InputArea onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default Chat;