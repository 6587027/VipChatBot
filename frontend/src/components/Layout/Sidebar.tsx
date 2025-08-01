// components/Layout/Sidebar.tsx
import React, { useState, useEffect } from 'react';

interface ChatItem {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  unread?: boolean;
}

interface ZenithSidebarProps {
  isOpen: boolean;
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onToggleSidebar?: () => void; // Add toggle function
  className?: string;
}

export const ZenithSidebar: React.FC<ZenithSidebarProps> = ({
  isOpen,
  selectedChatId,
  onChatSelect,
  onNewChat,
  onToggleSidebar,
  className = ''
}) => {
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load chat history from API/localStorage
  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/chats');
      // const chats = await response.json();
      
      // For now, load from localStorage
      const saved = localStorage.getItem('zenith_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        setChatHistory(parsed.map((chat: any) => ({
          ...chat,
          timestamp: new Date(chat.timestamp)
        })));
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteChatHistory = async (chatId: string) => {
    try {
      // Remove from chat history list
      const updatedHistory = chatHistory.filter(chat => chat.id !== chatId);
      setChatHistory(updatedHistory);
      
      // Update localStorage
      localStorage.setItem('zenith_chat_history', JSON.stringify(updatedHistory));
      
      // Delete the actual chat messages
      localStorage.removeItem(`zenith_chat_${chatId}`);
      
      // If deleting the currently selected chat, clear selection
      if (selectedChatId === chatId) {
        onNewChat();
      }
      
      console.log(`Chat ${chatId} deleted successfully`);
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const clearAllHistory = () => {
    if (window.confirm('คุณต้องการลบประวัติการสนทนาทั้งหมดหรือไม่?')) {
      setChatHistory([]);
      localStorage.removeItem('zenith_chat_history');
      
      // Clear all individual chat data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('zenith_chat_')) {
          localStorage.removeItem(key);
        }
      });
      
      onNewChat();
      console.log('All chat history cleared');
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('th-TH', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (days === 1) {
      return 'เมื่อวาน';
    } else if (days < 7) {
      return `${days} วันที่แล้ว`;
    } else {
      return date.toLocaleDateString('th-TH', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (!isOpen) {
    return (
      <div className="w-0 lg:w-16 bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 overflow-hidden">
        <div className="hidden lg:flex flex-col items-center py-4 space-y-4">
          {/* Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            title="เปิด Sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            className="p-3 bg-zenith-navy-500 text-white rounded-xl hover:bg-zenith-navy-600 transition-colors"
            title="New Chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Recent Chats (Icons only) */}
          <div className="space-y-2">
            {chatHistory.slice(0, 3).map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className={`
                  relative p-2 rounded-lg transition-colors
                  ${selectedChatId === chat.id 
                    ? 'bg-zenith-navy-100 text-zenith-navy-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
                title={chat.title}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {chat.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-zenith-orange-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0
      absolute lg:relative inset-y-0 left-0 z-40 lg:z-0
      transform lg:transform-none transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      ${className}
    `}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {/* Toggle & New Chat Container */}
          <div className="flex items-center gap-2 flex-1">
            {/* Toggle Sidebar Button */}
            <button
              onClick={onToggleSidebar}
              className="
                p-2 text-gray-600 hover:bg-gray-100 rounded-lg 
                transition-colors flex-shrink-0
              "
              title="ปิด Sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>

            {/* New Chat Button */}
            <button
              onClick={onNewChat}
              className="
                flex-1 flex items-center justify-center gap-2 px-4 py-3
                bg-zenith-navy-500 hover:bg-zenith-navy-600 text-white
                rounded-xl transition-all duration-200 font-medium
                hover:shadow-lg hover:-translate-y-0.5
              "
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Chat</span>
            </button>
          </div>
          
          {/* Clear All Button */}
          {chatHistory.length > 0 && (
            <button
              onClick={clearAllHistory}
              className="
                ml-2 p-3 text-red-500 hover:bg-red-50 rounded-xl 
                transition-colors duration-200 flex-shrink-0
              "
              title="ลบประวัติทั้งหมด"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-12 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : chatHistory.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-sm">ยังไม่มีประวัติการสนทนา</p>
            <p className="text-xs text-gray-400 mt-1">เริ่มแชทใหม่เพื่อเริ่มต้น</p>
          </div>
        ) : (
          <div className="p-2">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className={`
                  w-full text-left p-3 rounded-lg mb-1 transition-all duration-200
                  hover:bg-gray-50 group relative
                  ${selectedChatId === chat.id ? 'bg-zenith-navy-50 border border-zenith-navy-200' : ''}
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className={`
                      font-medium text-sm truncate mb-1
                      ${selectedChatId === chat.id ? 'text-zenith-navy-700' : 'text-gray-900'}
                      ${chat.unread ? 'font-semibold' : ''}
                    `}>
                      {chat.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {truncateText(chat.preview)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1 ml-2">
                    <span className="text-xs text-gray-400">
                      {formatTimestamp(chat.timestamp)}
                    </span>
                    {chat.unread && (
                      <div className="w-2 h-2 bg-zenith-orange-500 rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* Delete Button (shows on hover) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`คุณต้องการลบการสนทนา "${chat.title}" หรือไม่?`)) {
                      deleteChatHistory(chat.id);
                    }
                  }}
                  className="
                    absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100
                    hover:bg-red-100 text-red-500 rounded-lg transition-all duration-200
                    z-10
                  "
                  title="ลบการสนทนา"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-zenith-orange-400 to-zenith-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">V</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">วิป (Phatra)</p>
            <p className="text-xs text-gray-500">MUICT Internship Student</p>
          </div>
          <button className="p-1 hover:bg-gray-200 rounded transition-colors">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};