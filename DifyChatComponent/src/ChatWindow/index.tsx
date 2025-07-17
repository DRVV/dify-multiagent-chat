'use client';

import React, { useMemo } from 'react';
import { ChatWindowProps, ChatMessage, SpeakerConfig } from './types';
import './ChatWindow.module.css';

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
  // Create speaker lookup for efficient access
  const speakerMap = useMemo(() => {
    const map = new Map<string, SpeakerConfig>();
    speakers.forEach(speaker => {
      map.set(speaker.id, speaker);
    });
    return map;
  }, [speakers]);

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
    <div className={`container ${className}`}>
      <div className="header">
        <h3 className="title">{title}</h3>
        <button
          onClick={handleExport}
          className="exportButton"
          disabled={messages.length === 0}
          title="Export chat as JSON"
        >
          Export
        </button>
      </div>

      <div 
        className="messagesContainer"
        style={{ maxHeight }}
      >
        {messages.length === 0 ? (
          <div className="emptyState">
            <div className="emptyIcon">💬</div>
            <div className="emptyText">No messages yet</div>
            <div className="emptySubtext">Messages will appear here when sent</div>
          </div>
        ) : (
          messages.map((message) => {
            const speaker = speakerMap.get(message.speaker);
            const displayName = message.speakerDisplayName || speaker?.displayName || message.speaker;
            const speakerColor = speaker?.color || '#007bff';

            return (
              <div key={message.id} className="messageGroup">
                {showSpeakers && (
                  <div className="messageHeader">
                    <span 
                      className="speakerName"
                      style={{ color: speakerColor }}
                    >
                      {displayName}
                    </span>
                    {showTimestamps && (
                      <span className="timestamp">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    )}
                  </div>
                )}
                <div className="messageContent">
                  {message.content}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
export type { ChatWindowProps, ChatMessage, SpeakerConfig };
