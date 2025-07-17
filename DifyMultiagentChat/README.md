# @drvv/dify-multiagent-chat

A React chat component for Dify multi-agent conversations with real-time streaming support.

## Features

- 🤖 **Multi-agent Support** - Handle conversations with multiple Dify agents
- 🔄 **Real-time Streaming** - Server-sent events for live conversation updates
- ⚡ **TypeScript Support** - Full TypeScript definitions included
- 🎨 **Customizable UI** - Easy styling and theming options
- 📱 **Responsive Design** - Works seamlessly across devices
- 🔌 **Simple Integration** - Drop-in component for React applications

## Installation

```bash
npm install @drvv/dify-multiagent-chat
```

## Quick Start

```tsx
import { DifyMultiagentChat } from '@drvv/dify-multiagent-chat';

function App() {
  const config = {
    apiKey: 'your-dify-api-key',
    endpoint: 'https://your-dify-instance.com/v1',
    user: 'user-identifier' // optional
  };

  return (
    <DifyMultiagentChat
      config={config}
      title="Multi-Agent Chat"
      className="my-chat-component"
    />
  );
}
```

## Configuration

### DifyConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `apiKey` | `string` | ✅ | Your Dify API key |
| `endpoint` | `string` | ✅ | Dify API endpoint URL |
| `user` | `string` | ❌ | User identifier for conversation tracking |

### DifyMultiagentChatProps

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `config` | `DifyConfig` | - | Dify configuration object |
| `className` | `string` | `''` | Additional CSS classes |
| `title` | `string` | `'Dify Chat'` | Chat window title |

## Usage Examples

### Basic Usage

```tsx
import { DifyMultiagentChat } from '@drvv/dify-multiagent-chat';

const config = {
  apiKey: process.env.NEXT_PUBLIC_DIFY_API_KEY,
  endpoint: 'https://api.dify.ai/v1'
};

export default function ChatPage() {
  return (
    <div style={{ height: '600px', width: '400px' }}>
      <DifyMultiagentChat config={config} />
    </div>
  );
}
```

### With Custom Styling

```tsx
import { DifyMultiagentChat } from '@drvv/dify-multiagent-chat';

const config = {
  apiKey: 'your-api-key',
  endpoint: 'https://your-dify-instance.com/v1',
  user: 'john-doe'
};

export default function CustomChat() {
  return (
    <DifyMultiagentChat
      config={config}
      title="AI Assistant"
      className="custom-chat-styles"
    />
  );
}
```

### Advanced State Management

```tsx
import { DifyMultiagentChat, useChatStore } from '@drvv/dify-multiagent-chat';

function ChatWithControls() {
  const { messages, clearMessages } = useChatStore();

  return (
    <div>
      <button onClick={clearMessages}>Clear Chat</button>
      <DifyMultiagentChat config={config} />
      <div>Messages: {messages.length}</div>
    </div>
  );
}
```

## API Reference

### Exported Components

- `DifyMultiagentChat` - Main chat component
- `useChatStore` - Zustand store hook for chat state management

### Types

- `DifyMultiagentChatProps` - Component props interface
- `DifyConfig` - Configuration object interface
- `DifySSEEvent` - Server-sent event data structure

## Requirements

- React 16.8+
- TypeScript 4.5+ (for TypeScript projects)

## License

MIT © [drvv](https://github.com/drvv)

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/drvv/dify-multiagent-chat).
