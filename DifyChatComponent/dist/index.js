"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/DifyChatComponent.tsx
var _react = require('react');

// src/ChatWindow/index.tsx


// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (!css || typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/ChatWindow/ChatWindow.module.css
styleInject(".container {\n  display: flex;\n  flex-direction: column;\n  background: #ffffff;\n  border: 1px solid #e1e5e9;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 16px;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e1e5e9;\n}\n.title {\n  font-size: 16px;\n  font-weight: 600;\n  color: #495057;\n  margin: 0;\n}\n.exportButton {\n  padding: 6px 12px;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 12px;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.exportButton:hover:not(:disabled) {\n  background: #0056b3;\n}\n.exportButton:disabled {\n  background: #6c757d;\n  cursor: not-allowed;\n}\n.messagesContainer {\n  flex: 1;\n  overflow-y: auto;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  max-height: 400px;\n}\n.messageGroup {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.messageHeader {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 4px;\n}\n.speakerName {\n  font-weight: 600;\n  font-size: 14px;\n  color: #007bff;\n}\n.timestamp {\n  font-size: 12px;\n  color: #6c757d;\n}\n.messageContent {\n  background: #f8f9fa;\n  padding: 8px 12px;\n  border-radius: 12px;\n  font-size: 14px;\n  line-height: 1.4;\n  color: #212529;\n  word-wrap: break-word;\n  max-width: 80%;\n}\n.emptyState {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  text-align: center;\n  color: #6c757d;\n}\n.emptyIcon {\n  font-size: 48px;\n  margin-bottom: 12px;\n  opacity: 0.5;\n}\n.emptyText {\n  font-size: 16px;\n  margin-bottom: 4px;\n}\n.emptySubtext {\n  font-size: 14px;\n  opacity: 0.7;\n}\n.messagesContainer::-webkit-scrollbar {\n  width: 6px;\n}\n.messagesContainer::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 3px;\n}\n.messagesContainer::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 3px;\n}\n.messagesContainer::-webkit-scrollbar-thumb:hover {\n  background: #a8a8a8;\n}\n");

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
  const speakerMap = _react.useMemo.call(void 0, () => {
    const map = /* @__PURE__ */ new Map();
    speakers.forEach((speaker) => {
      map.set(speaker.id, speaker);
    });
    return map;
  }, [speakers]);
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
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `container ${className}`, children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "header", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h3", { className: "title", children: title }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "button",
        {
          onClick: handleExport,
          className: "exportButton",
          disabled: messages.length === 0,
          title: "Export chat as JSON",
          children: "Export"
        }
      )
    ] }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "div",
      {
        className: "messagesContainer",
        style: { maxHeight },
        children: messages.length === 0 ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "emptyState", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "emptyIcon", children: "\u{1F4AC}" }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "emptyText", children: "No messages yet" }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "emptySubtext", children: "Messages will appear here when sent" })
        ] }) : messages.map((message) => {
          const speaker = speakerMap.get(message.speaker);
          const displayName = message.speakerDisplayName || _optionalChain([speaker, 'optionalAccess', _ => _.displayName]) || message.speaker;
          const speakerColor = _optionalChain([speaker, 'optionalAccess', _2 => _2.color]) || "#007bff";
          return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "messageGroup", children: [
            showSpeakers && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "messageHeader", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                "span",
                {
                  className: "speakerName",
                  style: { color: speakerColor },
                  children: displayName
                }
              ),
              showTimestamps && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "timestamp", children: formatTimestamp(message.timestamp) })
            ] }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "messageContent", children: message.content })
          ] }, message.id);
        })
      }
    )
  ] });
};
var ChatWindow_default = ChatWindow;

// src/components/ChatInput.tsx


// src/styles/DifyChatComponent.module.css
styleInject(".container {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-width: 100%;\n  background: #ffffff;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.chatWindowContainer {\n  flex: 1;\n  overflow: hidden;\n}\n.inputContainer {\n  padding: 16px;\n  border-top: 1px solid #e0e0e0;\n  background: #f9f9f9;\n}\n.inputWrapper {\n  display: flex;\n  gap: 8px;\n  align-items: flex-end;\n}\n.messageInput {\n  flex: 1;\n  min-height: 20px;\n  max-height: 120px;\n  padding: 12px 16px;\n  border: 1px solid #d0d0d0;\n  border-radius: 24px;\n  font-family: inherit;\n  font-size: 14px;\n  line-height: 1.4;\n  resize: none;\n  outline: none;\n  transition: border-color 0.2s ease;\n}\n.messageInput:focus {\n  border-color: #007bff;\n}\n.messageInput:disabled {\n  background-color: #f5f5f5;\n  cursor: not-allowed;\n}\n.sendButton {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 48px;\n  height: 48px;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 50%;\n  cursor: pointer;\n  font-size: 18px;\n  transition: background-color 0.2s ease, transform 0.1s ease;\n}\n.sendButton:hover:not(:disabled) {\n  background: #0056b3;\n  transform: scale(1.05);\n}\n.sendButton:disabled {\n  background: #ccc;\n  cursor: not-allowed;\n  transform: none;\n}\n.streamingIndicator {\n  padding: 8px 16px;\n  background: #f0f8ff;\n  border-left: 4px solid #007bff;\n  margin: 8px 16px;\n  border-radius: 4px;\n  font-size: 14px;\n  color: #666;\n  font-style: italic;\n}\n.streamingText {\n  color: #333;\n  font-style: normal;\n}\n");

// src/components/ChatInput.tsx

var ChatInput = ({
  onSendMessage,
  isLoading,
  placeholder = "Type your message..."
}) => {
  const [message, setMessage] = _react.useState.call(void 0, "");
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "inputContainer", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "inputWrapper", children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "textarea",
      {
        value: message,
        onChange: (e) => setMessage(e.target.value),
        onKeyDown: handleKeyDown,
        placeholder,
        className: "messageInput",
        rows: 1,
        disabled: isLoading
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        onClick: handleSend,
        disabled: !message.trim() || isLoading,
        className: "sendButton",
        title: "Send message",
        children: isLoading ? "\u23F3" : "\u27A4"
      }
    )
  ] }) });
};

// src/hooks/useDifyStream.ts


// ../../node_modules/eventsource-parser/dist/index.js
var ParseError = class extends Error {
  constructor(message, options) {
    super(message), this.name = "ParseError", this.type = options.type, this.field = options.field, this.value = options.value, this.line = options.line;
  }
};
function noop(_arg) {
}
function createParser(callbacks) {
  if (typeof callbacks == "function")
    throw new TypeError(
      "`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?"
    );
  const { onEvent = noop, onError = noop, onRetry = noop, onComment } = callbacks;
  let incompleteLine = "", isFirstChunk = true, id, data = "", eventType = "";
  function feed(newChunk) {
    const chunk = isFirstChunk ? newChunk.replace(/^\xEF\xBB\xBF/, "") : newChunk, [complete, incomplete] = splitLines(`${incompleteLine}${chunk}`);
    for (const line of complete)
      parseLine(line);
    incompleteLine = incomplete, isFirstChunk = false;
  }
  function parseLine(line) {
    if (line === "") {
      dispatchEvent();
      return;
    }
    if (line.startsWith(":")) {
      onComment && onComment(line.slice(line.startsWith(": ") ? 2 : 1));
      return;
    }
    const fieldSeparatorIndex = line.indexOf(":");
    if (fieldSeparatorIndex !== -1) {
      const field = line.slice(0, fieldSeparatorIndex), offset = line[fieldSeparatorIndex + 1] === " " ? 2 : 1, value = line.slice(fieldSeparatorIndex + offset);
      processField(field, value, line);
      return;
    }
    processField(line, "", line);
  }
  function processField(field, value, line) {
    switch (field) {
      case "event":
        eventType = value;
        break;
      case "data":
        data = `${data}${value}
`;
        break;
      case "id":
        id = value.includes("\0") ? void 0 : value;
        break;
      case "retry":
        /^\d+$/.test(value) ? onRetry(parseInt(value, 10)) : onError(
          new ParseError(`Invalid \`retry\` value: "${value}"`, {
            type: "invalid-retry",
            value,
            line
          })
        );
        break;
      default:
        onError(
          new ParseError(
            `Unknown field "${field.length > 20 ? `${field.slice(0, 20)}\u2026` : field}"`,
            { type: "unknown-field", field, value, line }
          )
        );
        break;
    }
  }
  function dispatchEvent() {
    data.length > 0 && onEvent({
      id,
      event: eventType || void 0,
      // If the data buffer's last character is a U+000A LINE FEED (LF) character,
      // then remove the last character from the data buffer.
      data: data.endsWith(`
`) ? data.slice(0, -1) : data
    }), id = void 0, data = "", eventType = "";
  }
  function reset(options = {}) {
    incompleteLine && options.consume && parseLine(incompleteLine), isFirstChunk = true, id = void 0, data = "", eventType = "", incompleteLine = "";
  }
  return { feed, reset };
}
function splitLines(chunk) {
  const lines = [];
  let incompleteLine = "", searchIndex = 0;
  for (; searchIndex < chunk.length; ) {
    const crIndex = chunk.indexOf("\r", searchIndex), lfIndex = chunk.indexOf(`
`, searchIndex);
    let lineEnd = -1;
    if (crIndex !== -1 && lfIndex !== -1 ? lineEnd = Math.min(crIndex, lfIndex) : crIndex !== -1 ? lineEnd = crIndex : lfIndex !== -1 && (lineEnd = lfIndex), lineEnd === -1) {
      incompleteLine = chunk.slice(searchIndex);
      break;
    } else {
      const line = chunk.slice(searchIndex, lineEnd);
      lines.push(line), searchIndex = lineEnd + 1, chunk[searchIndex - 1] === "\r" && chunk[searchIndex] === `
` && searchIndex++;
    }
  }
  return [lines, incompleteLine];
}

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
      const reader = _optionalChain([response, 'access', _3 => _3.body, 'optionalAccess', _4 => _4.getReader, 'call', _5 => _5()]);
      if (!reader) {
        throw new Error("No response body reader available");
      }
      const decoder = new TextDecoder();
      const parser = createParser({
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
                  if (_optionalChain([eventData, 'access', _6 => _6.data, 'optionalAccess', _7 => _7.outputs, 'optionalAccess', _8 => _8.text])) {
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

// src/DifyChatComponent.tsx

var DifyChatComponent = ({
  config,
  className = "",
  title = "Dify Chat"
}) => {
  const {
    messages,
    isLoading
  } = useChatStore();
  const { sendMessage } = useDifyStream(config);
  const speakers = _react.useMemo.call(void 0, () => [
    { id: "user", displayName: "You", color: "#007bff" },
    { id: "assistant", displayName: "Assistant", color: "#28a745" }
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
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `container ${className}`, children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `chatWindowContainer`, children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        ChatWindow_default,
        {
          messages: displayMessages,
          speakers,
          title,
          showTimestamps: true,
          showSpeakers: true
        }
      ),
      isLoading && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "streamingIndicator", children: "Assistant is thinking..." })
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
var DifyChatComponent_default = DifyChatComponent;



exports.DifyChatComponent = DifyChatComponent_default; exports.useChatStore = useChatStore;
//# sourceMappingURL=index.js.map