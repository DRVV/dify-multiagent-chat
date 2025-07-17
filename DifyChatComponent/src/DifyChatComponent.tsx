'use client';

import React, { useMemo } from 'react';
import ChatWindow from './ChatWindow';
import { ChatInput } from './components/ChatInput';
import { useDifyStream } from './hooks/useDifyStream';
import { useChatStore } from './store/chatStore';
import { DifyChatComponentProps } from './types';
import { SpeakerConfig } from './ChatWindow/types';
import './styles/DifyChatComponent.module.css';

const DifyChatComponent: React.FC<DifyChatComponentProps> = ({
  config,
  className = '',
  title = 'Dify Chat'
}) => {
  const { 
    messages, 
    isLoading 
  } = useChatStore();
  
  const { sendMessage } = useDifyStream(config);

  // Default speakers for user and assistant
  const speakers: SpeakerConfig[] = useMemo(() => [
    { id: 'user', displayName: 'You', color: '#007bff' },
    { id: 'assistant', displayName: 'Assistant', color: '#28a745' }
  ], []);

  const handleSendMessage = async (message: string) => {
    // Add user message immediately
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      speaker: 'user',
      speakerDisplayName: 'You'
    };
    
    useChatStore.getState().addMessage(userMessage);
    
    // Send to Dify
    await sendMessage(message);
  };

  // Now just use messages directly since streaming messages are added immediately
  const displayMessages = useMemo(() => {
    return [...messages];
  }, [messages]);

  return (
    <div className={`container ${className}`}>
      <div className={`chatWindowContainer`}>
        <ChatWindow
          messages={displayMessages}
          speakers={speakers}
          title={title}
          showTimestamps={true}
          showSpeakers={true}
        />
        {isLoading && (
          <div className="streamingIndicator">
            Assistant is thinking...
          </div>
        )}
      </div>
      
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        placeholder="Ask me anything..."
      />
    </div>
  );
};

export default DifyChatComponent;
export type { DifyChatComponentProps, DifyConfig } from './types';
