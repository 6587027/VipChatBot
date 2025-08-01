// components/Chat/MessageBubble.tsx
import React from 'react';
// ✅ ใช้ namespace import เหมือน ChatHeader
import * as ChatTypes from '../../types/chat';
import { Avatar } from '../UI/Avatar';

interface MessageBubbleProps {
  message: ChatTypes.Message;
  isOwn: boolean;
  showAvatar?: boolean;
  showTimestamp?: boolean;
  className?: string;
  onClick?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  showAvatar = true,
  showTimestamp = true,
  className = '',
  onClick
}) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return formatTime(date);
    }
    
    return messageDate.toLocaleDateString('th-TH', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const containerClasses = `
    flex gap-3 max-w-4xl w-full
    ${isOwn ? 'justify-end flex-row-reverse' : 'justify-start'}
    ${className}
  `;

  const bubbleClasses = `
    relative max-w-xs lg:max-w-md px-4 py-3 
    shadow-sm hover:shadow-md transition-all duration-200
    transform hover:-translate-y-0.5
    ${isOwn 
      ? `
        bg-gradient-to-r from-blue-500 to-blue-600 text-white 
        rounded-2xl rounded-br-md ml-auto
      ` 
      : `
        bg-white text-gray-900 border border-gray-200
        rounded-2xl rounded-bl-md mr-auto
      `
    }
  `;

  const getMessageTypeIcon = () => {
    switch (message.type) {
      case 'image':
        return '🖼️';
      case 'file':
        return '📎';
      case 'system':
        return '🔔';
      default:
        return null;
    }
  };

  // System messages have different styling
  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          <span className="mr-2">🔔</span>
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses} onClick={onClick}>
      {/* Avatar */}
      {showAvatar && !isOwn && (
        <Avatar
          src={message.sender.avatar}
          username={message.sender.username}
          size="medium"
          isOnline={message.sender.isOnline}
        />
      )}

      {/* Message Content */}
      <div className="flex flex-col">
        {/* Sender Name (for received messages) */}
        {!isOwn && (
          <div className="text-xs text-gray-500 mb-1 px-1">
            {message.sender.username}
          </div>
        )}

        {/* Message Bubble */}
        <div className={bubbleClasses}>
          {/* Message Type Icon */}
          {getMessageTypeIcon() && (
            <span className="inline-block mr-2">
              {getMessageTypeIcon()}
            </span>
          )}

          {/* Message Content */}
          <div className="leading-relaxed break-words">
            {message.content}
          </div>

          {/* Edited Indicator */}
          {message.isEdited && (
            <div className={`
              text-xs mt-1 italic
              ${isOwn ? 'text-blue-100' : 'text-gray-500'}
            `}>
              แก้ไขแล้ว
            </div>
          )}

          {/* Timestamp */}
          {showTimestamp && (
            <div className={`
              text-xs mt-1 text-right
              ${isOwn ? 'text-blue-100' : 'text-gray-500'}
            `}>
              {formatDate(message.timestamp)}
            </div>
          )}
        </div>

        {/* Message Status (for sent messages) */}
        {isOwn && (
          <div className="flex justify-end mt-1 px-1">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              {/* Read Status Icon */}
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>ส่งแล้ว</span>
            </div>
          </div>
        )}
      </div>

      {/* Own Avatar */}
      {showAvatar && isOwn && (
        <Avatar
          src={message.sender.avatar}
          username={message.sender.username}
          size="medium"
          isOnline={message.sender.isOnline}
        />
      )}
    </div>
  );
};