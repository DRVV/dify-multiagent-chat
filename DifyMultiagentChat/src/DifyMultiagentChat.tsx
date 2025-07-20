'use client';

import React, { useMemo } from 'react';
import ChatWindow from './ChatWindow';
import { ChatInput } from './components/ChatInput';
import { useDifyStream } from './hooks/useDifyStream';
import { useChatStore } from './store/chatStore';
import { DifyMultiagentChatProps } from './types';
import { SpeakerConfig } from './ChatWindow/types';
import styles from './styles/DifyMultiagentChat.module.css';

const DifyMultiagentChat: React.FC<DifyMultiagentChatProps> = ({
  config,
  className = '',
  title = 'Dify Chat',
  iconName,
  iconAlt,
  agents,
}) => {
  const { 
    messages, 
    isLoading 
  } = useChatStore();
  
  const { sendMessage } = useDifyStream(config, agents);

  // Default speakers for user and assistant
  const speakers: SpeakerConfig[] = useMemo(() => [
    { id: 'user', displayName: 'You', color: '#3B82F6' },
    { id: 'assistant', displayName: 'Assistant', color: '#6B7280' }
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
    <div className={`${styles.container} ${className}`}>
      {/* 独自ヘッダー */}
      <div className={styles.customHeader}>
        <div className={styles.titleWithLogo}>
          {iconName && (
            <img 
              src={`/dify-icons/${iconName}`} 
              alt={iconAlt} 
              className={styles.logo} 
            />
          )}
          <h3 className={styles.customTitle}>{title}</h3>
        </div>
      </div>
      
      <div className={styles.chatWindowContainer}>
        <ChatWindow
          messages={displayMessages}
          speakers={speakers}
          agents={agents}
          showTimestamps={true}
          showSpeakers={true}
        />
        {isLoading && (
          <div className={styles.streamingIndicator}>
            <span className={styles.streamingText}>Assistant is thinking...</span>
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

export default DifyMultiagentChat;
export type { DifyMultiagentChatProps, DifyConfig, AgentConfig } from './types';
