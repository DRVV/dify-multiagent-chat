import { create } from 'zustand';
import { ChatMessage } from '../ChatWindow/types';

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

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  conversationId: '',
  
  addMessage: (message: ChatMessage) => {
    set((state) => ({
      messages: [...state.messages, message]
    }));
  },
  
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  
  appendStreamingMessage: (text: string, speaker?: string, speakerDisplayName?: string) => {
    const newMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      content: text,
      timestamp: new Date(),
      speaker: speaker || 'assistant',
      speakerDisplayName: speakerDisplayName || speaker || 'Assistant'
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage]
    }));
  },
  
  completeStreamingMessage: () => {
    // This function is now mainly for handling conversation ID logic
    // No need to do anything with streaming messages since they're added immediately
  },
  
  setConversationId: (id: string) => {
    set({ conversationId: id });
  },
  
  reset: () => {
    set({
      messages: [],
      isLoading: false,
      conversationId: ''
    });
  }
}));
