export interface DifyConfig {
  apiKey: string;
  endpoint: string;
  user?: string;
}

export interface DifyMultiagentChatProps {
  config: DifyConfig;
  className?: string;
  title?: string;
}

export interface DifySSEEvent {
  event: string;
  task_id?: string;
  workflow_run_id?: string;
  message_id?: string;
  conversation_id?: string;
  answer?: string;
  data?: {
    id?: string;
    node_id?: string;
    node_type?: string;
    title?: string;
    index?: number;
    predecessor_node_id?: string;
    inputs?: Record<string, unknown>;
    outputs?: {
      text?: string;
      [key: string]: unknown;
    };
    status?: string;
    elapsed_time?: number;
    execution_metadata?: Record<string, unknown>;
    created_at?: number;
    [key: string]: unknown;
  };
  created_at?: number;
}

export interface DifyRequestBody {
  inputs: Record<string, unknown>;
  query: string;
  response_mode: 'streaming';
  conversation_id: string;
  user: string;
  files?: Array<{
    type: string;
    transfer_method: string;
    url: string;
  }>;
}
