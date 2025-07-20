import { AgentConfig } from "../../types";

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  speaker: string;
  speakerDisplayName?: string;
  duration?: number;
}

export interface SpeakerConfig {
  id: string;
  displayName: string;
  color?: string;
}

export interface ChatWindowProps {
  // Data props
  messages: ChatMessage[];
  speakers?: SpeakerConfig[];
  
  // Optional callback for export
  onExport?: (messages: ChatMessage[]) => void;
  
  // Display props
  agents?: AgentConfig[];
  className?: string;
  maxHeight?: string;
  showTimestamps?: boolean;
  showSpeakers?: boolean;
  title?: string;
}
