'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { ChatWindowProps, ChatMessage, SpeakerConfig } from './types';
import styles from './ChatWindow.module.css';

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  speakers = [],
  onExport,
  className = '',
  maxHeight = '400px',
  showTimestamps = true,
  showSpeakers = true,
  title = 'Chat',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create speaker lookup for efficient access
  const speakerMap = useMemo(() => {
    const map = new Map<string, SpeakerConfig>();
    speakers.forEach(speaker => {
      map.set(speaker.id, speaker);
    });
    return map;
  }, [speakers]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp
  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(timestamp);
  };

  // Default export handler
  const handleExport = () => {
    if (onExport) {
      onExport(messages);
    } else {
      // Built-in export functionality
      const exportData = messages.map(msg => ({
        timestamp: msg.timestamp.toISOString(),
        speaker: msg.speaker,
        speakerDisplayName: msg.speakerDisplayName,
        content: msg.content,
        duration: msg.duration,
      }));

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `chat-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button
          onClick={handleExport}
          className={styles.exportButton}
          disabled={messages.length === 0}
          title="Export chat as JSON"
        >
          Export
        </button>
      </div>

      {/* Messages Container */}
      <div 
        className={styles.messagesContainer}
        style={{ maxHeight }}
      >
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💬</div>
            <div className={styles.emptyText}>No messages yet</div>
            <div className={styles.emptySubtext}>Messages will appear here when sent</div>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const speaker = speakerMap.get(message.speaker);
              const displayName = message.speakerDisplayName || speaker?.displayName || message.speaker;
              const isUser = message.speaker === 'user';

              return (
                <div key={message.id} className={isUser ? styles.messageGroupUser : styles.messageGroup}>
                  {showSpeakers && (
                    <div className={isUser ? styles.messageHeaderUser : styles.messageHeader}>
                      <span className={styles.speakerName}>
                        {displayName}
                      </span>
                      {showTimestamps && (
                        <span className={styles.timestamp}>
                          {formatTimestamp(message.timestamp)}
                        </span>
                      )}
                    </div>
                  )}
                  <div className={isUser ? styles.messageContentUser : styles.messageContent}>
                    {message.content}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
export type { ChatWindowProps, ChatMessage, SpeakerConfig };
