// components/Chat/MessageList.tsx
import React, { useEffect, useRef, useState } from 'react';
// ✅ ใช้ namespace import เหมือนไฟล์อื่น ๆ
import * as ChatTypes from '../../types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { Button } from '../UI/Button';

interface MessageListProps {
  messages: ChatTypes.Message[];
  currentUserId?: string;
  typingUsers?: ChatTypes.TypingUser[];
  isLoading?: boolean;
  hasMoreMessages?: boolean;
  onLoadMore?: () => void;
  onMessageClick?: (message: ChatTypes.Message) => void;
  className?: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  typingUsers = [],
  isLoading = false,
  hasMoreMessages = false,
  onLoadMore,
  onMessageClick,
  className = ''
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages, typingUsers, autoScroll]);

  // Handle scroll events
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      
      setShowScrollButton(!isNearBottom);
      setAutoScroll(isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
      setAutoScroll(true);
    }
  };

  const handleLoadMore = () => {
    if (onLoadMore && !isLoading) {
      onLoadMore();
    }
  };

  // Group messages by date
  const groupMessagesByDate = (messages: ChatTypes.Message[]) => {
    const groups: { [key: string]: ChatTypes.Message[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'วันนี้';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'เมื่อวาน';
    } else {
      return date.toLocaleDateString('th-TH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className={`relative flex-1 overflow-hidden ${className}`}>
      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="h-full overflow-y-auto scroll-smooth"
        style={{ paddingBottom: '1rem' }}
      >
        <div className="max-w-4xl mx-auto px-4">
          {/* Load More Button */}
          {hasMoreMessages && (
            <div className="text-center py-4">
              <Button
                onClick={handleLoadMore}
                loading={isLoading}
                variant="ghost"
                size="small"
                className="text-blue-600"
              >
                {isLoading ? 'กำลังโหลด...' : 'โหลดข้อความเก่า'}
              </Button>
            </div>
          )}

          {/* Messages by Date Groups */}
          {Object.entries(messageGroups).map(([dateString, dayMessages]) => (
            <div key={dateString} className="mb-6">
              {/* Date Header */}
              <div className="text-center mb-4">
                <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                  {formatDateHeader(dateString)}
                </div>
              </div>

              {/* Messages for this date */}
              <div className="space-y-4">
                {dayMessages.map((message, index) => {
                  const isOwn = message.sender.id === currentUserId;
                  const prevMessage = dayMessages[index - 1];
                  const nextMessage = dayMessages[index + 1];
                  
                  // Show avatar only for first message in a group from same sender
                  const showAvatar = !prevMessage || prevMessage.sender.id !== message.sender.id;
                  
                  // Show timestamp if it's been more than 5 minutes since last message
                  const showTimestamp = !nextMessage || 
                    nextMessage.sender.id !== message.sender.id ||
                    (new Date(nextMessage.timestamp).getTime() - new Date(message.timestamp).getTime()) > 300000;

                  return (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isOwn={isOwn}
                      showAvatar={showAvatar}
                      showTimestamp={showTimestamp}
                      className="cursor-pointer"
                      onClick={() => onMessageClick?.(message)}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {messages.length === 0 && !isLoading && (
            <div className="flex-1 flex items-center justify-center text-center py-12">
              <div className="max-w-sm">
                <div className="w-24 h-24 mx-auto mb-6 text-blue-300">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  เริ่มการสนทนา
                </h3>
                <p className="text-gray-500 mb-6">
                  ส่งข้อความเพื่อเริ่มแชทกับ AI Assistant ของเรา
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['สวัสดี', 'ช่วยเหลือ', 'เกี่ยวกับคุณ'].map(suggestion => (
                    <Button
                      key={suggestion}
                      variant="ghost"
                      size="small"
                      className="text-blue-600 bg-blue-50 hover:bg-blue-100"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Typing Indicator */}
          {typingUsers.length > 0 && (
            <TypingIndicator typingUsers={typingUsers} />
          )}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <div className="absolute bottom-4 right-4">
          <Button
            onClick={scrollToBottom}
            variant="primary"
            size="medium"
            className="rounded-full shadow-lg hover:shadow-xl p-3"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            }
          />
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && messages.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent" />
            <span>กำลังโหลดข้อความ...</span>
          </div>
        </div>
      )}
    </div>
  );
};