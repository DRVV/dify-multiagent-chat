import { useCallback, useMemo } from 'react';
import { createParser, EventSourceMessage } from 'eventsource-parser';
import { DifyConfig, DifySSEEvent, DifyRequestBody, AgentConfig } from '../types';
import { useChatStore } from '../store/chatStore';

export const useDifyStream = (config: DifyConfig, agents?: AgentConfig[]) => {
  const { 
    setLoading, 
    appendStreamingMessage,
    completeStreamingMessage,
    conversationId,
    setConversationId 
  } = useChatStore();

  const agentMap = useMemo(() => {
    const map = new Map<string, AgentConfig>();
    if (agents) {
      agents.forEach(agent => {
        map.set(agent.name, agent);
      });
    }
    return map;
  }, [agents]);

  const sendMessage = useCallback(async (message: string) => {
    setLoading(true);
    // No need to clear streaming message since each chunk creates a new message
    
    try {
      const requestBody: DifyRequestBody = {
        inputs: {},
        query: message,
        response_mode: 'streaming',
        conversation_id: conversationId,
        user: config.user || 'user-001'
      };

      console.log("[useDifyStream] Start fetching for body ", requestBody);

      const response = await fetch(`${config.endpoint}/v1/chat-messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body reader available');
      }

      const decoder = new TextDecoder();
      // let streamingText = '';

      const parser = createParser({
        onEvent: (ev: EventSourceMessage) => {
          if (true || ev.event === 'message' || ev.event === 'node_finished' || ev.event === 'message_end' || ev.event === 'workflow_started' || ev.event === 'workflow_finished') {
            try {
              const eventData = JSON.parse(ev.data) as DifySSEEvent;

              //console.log('[useDifyStream] eventData:', eventData);
              
              // Handle different event types
              switch (eventData.event) {
                // case 'message':
                //   if (eventData.answer) {
                //     streamingText += eventData.answer;
                //     updateStreamingMessage(streamingText);
                //   }
                //   break;
                  
                case 'node_finished':
                  // Primary event type for processing completion
                  console.log('Node finished:', eventData);
                  if (
                    eventData.data?.outputs?.text
                    && eventData.data.node_type == 'llm'  
                    && eventData.data?.title
                  ) {
                    const shouldAcceptAgent = agents
                      ? agentMap.has(eventData.data.title)
                      : true;
                    
                    if (shouldAcceptAgent) {
                      const speaker = eventData.data.title;
                      const agentInfo = agentMap.get(speaker);
                      const displayName = agentInfo?.displayName || speaker;

                      // Create a new message entry for each streaming chunk
                      console.log("Speaker: ", speaker, "Display name:", displayName);
                      appendStreamingMessage(eventData.data.outputs.text, speaker, displayName);
                    } else {
                      console.log("Filtered out agent:", eventData.data.title);
                    }
                  }
                  break;
                  
                case 'message_end':
                  console.log('message_end:', eventData.event, eventData);  
                  completeStreamingMessage();
                  if (eventData.conversation_id && eventData.conversation_id !== conversationId) {
                    setConversationId(eventData.conversation_id);
                  }
                  break;
                  
                case 'workflow_started':
                case 'workflow_finished':
                  console.log('Workflow event:', eventData.event, eventData);
                  break;
              }
            } catch (parseError) {
              console.log('SSE parse error:', parseError);
            }
          }
        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        parser.feed(chunk);
      }
    } catch (error) {
      console.log('Dify API error:', error);
    } finally {
      setLoading(false);
    }
  }, [config, conversationId, setLoading, appendStreamingMessage, completeStreamingMessage, setConversationId, agentMap]);

  return { sendMessage };
};
