'use client'
import Image from "next/image";
//import DifyChatComponent from 
import { DifyChatComponent, DifyConfig } from '@your-scope/dify-chat-component';

export default function Home() {
  const config: DifyConfig = {
  apiKey: 'app-dCcgIA2rSWejZZkRUxxpEFOO',
  endpoint: 'http://localhost',
  user: 'test-user'
};

  return (
    <div className="bg-white rounded-lg shadow-lg" style={{ height: '100vh' }}>
      <DifyChatComponent config={config}/>
    </div>
  );
}
