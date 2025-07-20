import React from 'react';
import * as zustand from 'zustand';

interface DifyConfig {
    apiKey: string;
    endpoint: string;
    user?: string;
}
interface DifyMultiagentChatProps {
    config: DifyConfig;
    className?: string;
    title?: string;
    iconName?: string;
    iconAlt?: string;
}

declare const DifyMultiagentChat: React.FC<DifyMultiagentChatProps>;

interface ChatMessage {
    id: string;
    content: string;
    timestamp: Date;
    speaker: string;
    speakerDisplayName?: string;
    duration?: number;
}

interface ChatState {
    messages: ChatMessage[];
    isLoading: boolean;
    conversationId: string;
    addMessage: (message: ChatMessage) => void;
    setLoading: (loading: boolean) => void;
    appendStreamingMessage: (text: string, speaker?: string, speakerDisplayName?: string) => void;
    completeStreamingMessage: () => void;
    setConversationId: (id: string) => void;
    reset: () => void;
}
declare const useChatStore: zustand.UseBoundStore<zustand.StoreApi<ChatState>>;

export { type DifyConfig, DifyMultiagentChat, type DifyMultiagentChatProps, useChatStore };
