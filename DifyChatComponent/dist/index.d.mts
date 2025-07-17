import React from 'react';
import * as zustand from 'zustand';

interface DifyConfig {
    apiKey: string;
    endpoint: string;
    user?: string;
}
interface DifyChatComponentProps {
    config: DifyConfig;
    className?: string;
    title?: string;
}

declare const DifyChatComponent: React.FC<DifyChatComponentProps>;

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

export { DifyChatComponent, type DifyChatComponentProps, type DifyConfig, useChatStore };
