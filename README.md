# DifyMultiagentChat Demo

A minimal working example of the `@drvv/dify-multiagent-chat` React component.

## Overview

This Next.js project demonstrates how to integrate and use the DifyMultiagentChat in your React applications. It serves as a live example and testing environment for the npm package.

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/drvv/dify-multiagent-chat.git
   cd dify-multiagent-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your Dify settings**
   - Copy your Dify API key and endpoint
   - Update the configuration in `app/page.tsx`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Package Information

The actual npm package is located in the `DifyMultiagentChat/` directory:

- **Package Name**: `@drvv/dify-multiagent-chat`
- **Documentation**: See [DifyMultiagentChat/README.md](./DifyMultiagentChat/README.md)
- **Source Code**: `DifyMultiagentChat/src/`

## 🏗️ Project Structure

```
dify-chat-component-test/
├── README.md                    # This file - demo project documentation
├── app/
│   └── page.tsx                 # Demo implementation
├── DifyMultiagentChat/           # The actual npm package
│   ├── README.md               # Package documentation
│   ├── package.json            # Package configuration
│   ├── LICENSE                 # MIT license
│   ├── src/                    # Source code
│   └── dist/                   # Built package (after npm run build)
└── package.json                # Demo project dependencies
```

## 🎯 What This Demo Shows

- Basic integration of the DifyMultiagentChat
- Real-time chat with Dify multi-agent conversations
- Streaming message support
- Customizable styling and configuration
- TypeScript implementation example

## 🔧 Development

### Building the Package

To build the DifyMultiagentChat package:

```bash
cd DifyMultiagentChat
npm run build
```

### Testing Changes

After making changes to the component:

1. Build the package: `cd DifyMultiagentChat && npm run build`
2. Run the demo: `npm run dev`
3. Test your changes at `http://localhost:3000`

## 📋 Configuration

The demo uses the DifyMultiagentChat with the following configuration:

```tsx
const config = {
  apiKey: 'your-dify-api-key',
  endpoint: 'https://your-dify-instance.com/v1',
  user: 'demo-user'
};
```

Update these values in `app/page.tsx` to connect to your Dify instance.

## 🚀 Using the Package

To use this component in your own project:

```bash
npm install @drvv/dify-multiagent-chat
```

See the [package documentation](./DifyMultiagentChat/README.md) for detailed usage instructions.

## 📄 License

MIT © [drvv](https://github.com/drvv)
