"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/DifyMultiagentChat.tsx
var _react = require('react');

// src/ChatWindow/index.tsx

var _markdowntojsx = require('markdown-to-jsx'); var _markdowntojsx2 = _interopRequireDefault(_markdowntojsx);

// src/ChatWindow/ChatWindow.module.css
var ChatWindow_default = {};

// src/constants/agents.ts
var ALLOWED_AGENTS = [
  "Orchestrator",
  "IC agent",
  "MD agent",
  "Store sales agent",
  "Marketing agent",
  "GMD agent"
];
var AGENT_ICONS = {
  "Orchestrator": "/dify-icons/fr-orchestrator.svg",
  "IC agent": "/dify-icons/fr-ic-agent.svg",
  "MD agent": "/dify-icons/fr-md-agent.svg",
  "Store sales agent": "/dify-icons/fr-store-sales-agent.svg",
  "Marketing agent": "/dify-icons/fr-marketing-agent.svg",
  "GMD agent": "/dify-icons/fr-gmd-agent.svg"
};

// src/ChatWindow/index.tsx
var _jsxruntime = require('react/jsx-runtime');
var ChatWindow = ({
  messages,
  speakers = [],
  onExport,
  className = "",
  maxHeight = "400px",
  showTimestamps = true,
  showSpeakers = true,
  title = "Chat"
}) => {
  const messagesEndRef = _react.useRef.call(void 0, null);
  const speakerMap = _react.useMemo.call(void 0, () => {
    const map = /* @__PURE__ */ new Map();
    speakers.forEach((speaker) => {
      map.set(speaker.id, speaker);
    });
    return map;
  }, [speakers]);
  _react.useEffect.call(void 0, () => {
    _optionalChain([messagesEndRef, 'access', _ => _.current, 'optionalAccess', _2 => _2.scrollIntoView, 'call', _3 => _3({ behavior: "smooth" })]);
  }, [messages]);
  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }).format(timestamp);
  };
  const handleExport = () => {
    if (onExport) {
      onExport(messages);
    } else {
      const exportData = messages.map((msg) => ({
        timestamp: msg.timestamp.toISOString(),
        speaker: msg.speaker,
        speakerDisplayName: msg.speakerDisplayName,
        content: msg.content,
        duration: msg.duration
      }));
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `chat-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `${ChatWindow_default.container} ${className}`, children: [
    title && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: ChatWindow_default.header, children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h3", { className: ChatWindow_default.title, children: title }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "button",
        {
          onClick: handleExport,
          className: ChatWindow_default.exportButton,
          disabled: messages.length === 0,
          title: "Export chat as JSON",
          children: "Export"
        }
      )
    ] }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "div",
      {
        className: ChatWindow_default.messagesContainer,
        style: { maxHeight },
        children: messages.length === 0 ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: ChatWindow_default.emptyState, children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: ChatWindow_default.emptyIcon, children: "\u{1F4AC}" }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: ChatWindow_default.emptyText, children: "No messages yet" }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: ChatWindow_default.emptySubtext, children: "Messages will appear here when sent" })
        ] }) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
          messages.map((message) => {
            const speaker = speakerMap.get(message.speaker);
            const displayName = message.speakerDisplayName || _optionalChain([speaker, 'optionalAccess', _4 => _4.displayName]) || message.speaker;
            const isUser = message.speaker === "user";
            const speakerIconPath = !isUser ? AGENT_ICONS[message.speaker] || "/dify-icons/default-speaker.svg" : null;
            return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: isUser ? ChatWindow_default.messageGroupUser : ChatWindow_default.messageGroup, children: [
              showSpeakers && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: isUser ? ChatWindow_default.messageHeaderUser : ChatWindow_default.messageHeader, children: [
                !isUser && speakerIconPath && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                  "img",
                  {
                    src: speakerIconPath,
                    alt: `${displayName} icon`,
                    className: ChatWindow_default.speakerIcon,
                    onError: (e) => {
                      e.currentTarget.src = "/dify-icons/default-speaker.svg";
                    }
                  }
                ),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: ChatWindow_default.speakerName, children: displayName }),
                showTimestamps && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: ChatWindow_default.timestamp, children: formatTimestamp(message.timestamp) })
              ] }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: isUser ? ChatWindow_default.messageContentUser : ChatWindow_default.messageContent, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _markdowntojsx2.default, { children: message.content }) })
            ] }, message.id);
          }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ref: messagesEndRef })
        ] })
      }
    )
  ] });
};
var ChatWindow_default2 = ChatWindow;

// src/components/ChatInput.tsx


// src/styles/DifyMultiagentChat.module.css
var DifyMultiagentChat_default = {};

// src/components/ChatInput.tsx

var ChatInput = ({
  onSendMessage,
  isLoading,
  placeholder = "Type your message..."
}) => {
  const [message, setMessage] = _react.useState.call(void 0, "");
  const textareaRef = _react.useRef.call(void 0, null);
  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  _react.useEffect.call(void 0, () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: DifyMultiagentChat_default.inputContainer, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: DifyMultiagentChat_default.inputWrapper, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "textarea",
      {
        ref: textareaRef,
        value: message,
        onChange: (e) => setMessage(e.target.value),
        onKeyDown: handleKeyDown,
        placeholder,
        className: DifyMultiagentChat_default.messageInput,
        rows: 1,
        disabled: isLoading
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        onClick: handleSend,
        disabled: isLoading || !message.trim(),
        className: DifyMultiagentChat_default.sendButton,
        title: "Send message",
        children: isLoading ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { style: {
          width: "16px",
          height: "16px",
          border: "2px solid transparent",
          borderTop: "2px solid white",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        } }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", { width: "18", height: "18", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) })
      }
    )
  ] }) });
};

// src/hooks/useDifyStream.ts

var _eventsourceparser = require('eventsource-parser');

// src/store/chatStore.ts
var _zustand = require('zustand');
var useChatStore = _zustand.create.call(void 0, (set) => ({
  messages: [],
  isLoading: false,
  conversationId: "",
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message]
    }));
  },
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
  appendStreamingMessage: (text, speaker, speakerDisplayName) => {
    const newMessage = {
      id: `${Date.now()}-${Math.random()}`,
      content: text,
      timestamp: /* @__PURE__ */ new Date(),
      speaker: speaker || "assistant",
      speakerDisplayName: speakerDisplayName || speaker || "Assistant"
    };
    set((state) => ({
      messages: [...state.messages, newMessage]
    }));
  },
  completeStreamingMessage: () => {
  },
  setConversationId: (id) => {
    set({ conversationId: id });
  },
  reset: () => {
    set({
      messages: [],
      isLoading: false,
      conversationId: ""
    });
  }
}));

// src/hooks/useDifyStream.ts
var useDifyStream = (config) => {
  const {
    setLoading,
    appendStreamingMessage,
    completeStreamingMessage,
    conversationId,
    setConversationId
  } = useChatStore();
  const sendMessage = _react.useCallback.call(void 0, async (message) => {
    setLoading(true);
    try {
      const requestBody = {
        inputs: {},
        query: message,
        response_mode: "streaming",
        conversation_id: conversationId,
        user: config.user || "user-001"
      };
      console.log("[useDifyStream] Start fetching for body ", requestBody);
      const response = await fetch(`${config.endpoint}/v1/chat-messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const reader = _optionalChain([response, 'access', _5 => _5.body, 'optionalAccess', _6 => _6.getReader, 'call', _7 => _7()]);
      if (!reader) {
        throw new Error("No response body reader available");
      }
      const decoder = new TextDecoder();
      const parser = _eventsourceparser.createParser.call(void 0, {
        onEvent: (ev) => {
          if (true) {
            try {
              const eventData = JSON.parse(ev.data);
              switch (eventData.event) {
                // case 'message':
                //   if (eventData.answer) {
                //     streamingText += eventData.answer;
                //     updateStreamingMessage(streamingText);
                //   }
                //   break;
                case "node_finished":
                  console.log("Node finished:", eventData);
                  if (_optionalChain([eventData, 'access', _8 => _8.data, 'optionalAccess', _9 => _9.outputs, 'optionalAccess', _10 => _10.text]) && eventData.data.node_type == "llm" && _optionalChain([eventData, 'access', _11 => _11.data, 'optionalAccess', _12 => _12.title]) && ALLOWED_AGENTS.includes(eventData.data.title)) {
                    const speaker = eventData.data.title;
                    console.log("Speaker: ", speaker);
                    appendStreamingMessage(eventData.data.outputs.text, speaker, speaker);
                  }
                  break;
                case "message_end":
                  console.log("message_end:", eventData.event, eventData);
                  completeStreamingMessage();
                  if (eventData.conversation_id && eventData.conversation_id !== conversationId) {
                    setConversationId(eventData.conversation_id);
                  }
                  break;
                case "workflow_started":
                case "workflow_finished":
                  console.log("Workflow event:", eventData.event, eventData);
                  break;
              }
            } catch (parseError) {
              console.log("SSE parse error:", parseError);
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
      console.log("Dify API error:", error);
    } finally {
      setLoading(false);
    }
  }, [config, conversationId, setLoading, appendStreamingMessage, completeStreamingMessage, setConversationId]);
  return { sendMessage };
};

// src/DifyMultiagentChat.tsx

var DifyMultiagentChat = ({
  config,
  className = "",
  title = "Dify Chat",
  iconName,
  iconAlt
}) => {
  const {
    messages,
    isLoading
  } = useChatStore();
  const { sendMessage } = useDifyStream(config);
  const speakers = _react.useMemo.call(void 0, () => [
    { id: "user", displayName: "You", color: "#3B82F6" },
    { id: "assistant", displayName: "Assistant", color: "#6B7280" }
  ], []);
  const handleSendMessage = async (message) => {
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      timestamp: /* @__PURE__ */ new Date(),
      speaker: "user",
      speakerDisplayName: "You"
    };
    useChatStore.getState().addMessage(userMessage);
    await sendMessage(message);
  };
  const displayMessages = _react.useMemo.call(void 0, () => {
    return [...messages];
  }, [messages]);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `${DifyMultiagentChat_default.container} ${className}`, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: DifyMultiagentChat_default.customHeader, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: DifyMultiagentChat_default.titleWithLogo, children: [
      iconName && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "img",
        {
          src: `/dify-icons/${iconName}`,
          alt: iconAlt,
          className: DifyMultiagentChat_default.logo
        }
      ),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h3", { className: DifyMultiagentChat_default.customTitle, children: title })
    ] }) }),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: DifyMultiagentChat_default.chatWindowContainer, children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        ChatWindow_default2,
        {
          messages: displayMessages,
          speakers,
          showTimestamps: true,
          showSpeakers: true
        }
      ),
      isLoading && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: DifyMultiagentChat_default.streamingIndicator, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: DifyMultiagentChat_default.streamingText, children: "Assistant is thinking..." }) })
    ] }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      ChatInput,
      {
        onSendMessage: handleSendMessage,
        isLoading,
        placeholder: "Ask me anything..."
      }
    )
  ] });
};
var DifyMultiagentChat_default2 = DifyMultiagentChat;



exports.DifyMultiagentChat = DifyMultiagentChat_default2; exports.useChatStore = useChatStore;
//# sourceMappingURL=index.js.map