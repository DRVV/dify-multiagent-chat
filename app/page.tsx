'use client'
import DifyMultiagentChat, { DifyConfig } from '../DifyMultiagentChat/src/DifyMultiagentChat';

export default function Home() {
  const config: DifyConfig = {
    apiKey: 'your-dify-api-key-here',
    endpoint: 'http://localhost:<port>',
    user: 'test-user'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto h-[calc(100vh-2rem)]">
        <DifyMultiagentChat 
          config={config}
          title="Dify AI Assistant"
          className="h-full"
        />
      </div>
    </div>
  );
}
