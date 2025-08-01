// components/Layout/MainLayout.tsx
import React, { useState } from 'react';
import { ZenithHeader } from './Header';
import { ZenithSidebar } from './Sidebar';
import { ChatInterface } from '../Chat/ChatInterface';

interface MainLayoutProps {
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  className = ''
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className={`h-screen bg-gray-50 flex flex-col ${className}`}>
      {/* Top Header */}
      <ZenithHeader 
        onMenuClick={toggleSidebar}
        onNewChat={() => setSelectedChatId(null)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <ZenithSidebar 
          isOpen={sidebarOpen}
          selectedChatId={selectedChatId}
          onChatSelect={setSelectedChatId}
          onNewChat={() => setSelectedChatId(null)}
          onToggleSidebar={toggleSidebar}
        />

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          <ChatInterface 
            chatId={selectedChatId}
            key={selectedChatId} // Force re-render when chat changes
          />
        </div>
      </div>
    </div>
  );
};