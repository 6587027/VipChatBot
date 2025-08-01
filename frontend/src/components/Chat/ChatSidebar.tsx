// components/Chat/ChatSidebar.tsx
import React, { useState } from 'react';
import * as ChatTypes from '../../types/chat';
import { Avatar } from '../UI/Avatar';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

interface ChatSidebarProps {
  currentUser?: ChatTypes.User;
  chatRooms?: ChatTypes.ChatRoom[]; 
  activeRoomId?: string;
  onRoomSelect?: (roomId: string) => void;
  onNewChat?: () => void;
  onSettingsClick?: () => void;
  className?: string;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  currentUser,
  chatRooms = [],
  activeRoomId,
  onRoomSelect,
  onNewChat,
  onSettingsClick,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mock current user if not provided
  const mockCurrentUser: ChatTypes.User = currentUser || {
    id: 'user-1',
    username: 'วิป',
    email: 'vip@mahidol.ac.th',
    avatar: '/assets/icons/vip-avatar.png',
    isOnline: true
  };

  // Mock chat rooms if not provided
  const mockChatRooms: ChatTypes.ChatRoom[] = chatRooms.length > 0 ? chatRooms : [
    {
      id: 'room-1',
      name: 'VipChatBot Assistant',
      description: 'AI-powered assistant',
      avatar: '/assets/icons/chatbot-avatar.png',
      members: [mockCurrentUser],
      lastMessage: {
        id: 'msg-last',
        content: 'สวัสดีครับ! มีอะไรให้ช่วยไหมครับ?',
        sender: {
          id: 'bot-1',
          username: 'ChatBot',
          email: 'bot@vipchatbot.com',
          isOnline: true
        },
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: 'text'
      },
      unreadCount: 0,
      isPrivate: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 'room-2',
      name: 'Code Helper Bot',
      description: 'Programming assistance',
      avatar: '/assets/icons/code-bot.png',
      members: [mockCurrentUser],
      lastMessage: {
        id: 'msg-last-2',
        content: 'ผมช่วยเรื่อง coding ได้ครับ!',
        sender: {
          id: 'bot-2',
          username: 'Code Helper',
          email: 'code@vipchatbot.com',
          isOnline: true
        },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'text'
      },
      unreadCount: 2,
      isPrivate: false,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000)
    },
    {
      id: 'room-3',
      name: 'Study Buddy',
      description: 'Academic support',
      avatar: '/assets/icons/study-bot.png',
      members: [mockCurrentUser],
      lastMessage: {
        id: 'msg-last-3',
        content: 'มาเรียนกันเถอะ! 📚',
        sender: {
          id: 'bot-3',
          username: 'Study Buddy',
          email: 'study@vipchatbot.com',
          isOnline: false
        },
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        type: 'text'
      },
      unreadCount: 0,
      isPrivate: false,
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000)
    }
  ];

  // Filter rooms based on search query
  const filteredRooms = mockChatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format time for last message
  const formatLastMessageTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'เมื่อสักครู่';
    if (minutes < 60) return `${minutes}นที`;
    if (hours < 24) return `${hours}ชม`;
    if (days === 1) return 'เมื่อวาน';
    if (days < 7) return `${days}วัน`;
    
    return new Date(timestamp).toLocaleDateString('th-TH', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Truncate message content
  const truncateMessage = (content: string, maxLength: number = 40) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (isCollapsed) {
    return (
      <div className={`w-16 bg-white border-r border-gray-200 flex flex-col ${className}`}>
        {/* Collapsed Header */}
        <div className="p-4 border-b border-gray-200">
          <Button
            variant="ghost"
            size="medium"
            onClick={() => setIsCollapsed(false)}
            className="p-2 w-full"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            }
          />
        </div>

        {/* Collapsed Room List */}
        <div className="flex-1 overflow-y-auto">
          {mockChatRooms.slice(0, 5).map((room) => (
            <div key={room.id} className="p-3 hover:bg-gray-50 cursor-pointer relative">
              <Avatar
                src={room.avatar}
                username={room.name}
                size="medium"
                onClick={() => onRoomSelect?.(room.id)}
                className="mx-auto"
              />
              {room.unreadCount > 0 && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* Collapsed User Profile */}
        <div className="p-3 border-t border-gray-200">
          <Avatar
            src={mockCurrentUser.avatar}
            username={mockCurrentUser.username}
            size="medium"
            isOnline={mockCurrentUser.isOnline}
            className="mx-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-80 bg-white border-r border-gray-200 flex flex-col ${className}`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">แชท</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="medium"
              onClick={onNewChat}
              className="p-2"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            />
            <Button
              variant="ghost"
              size="medium"
              onClick={() => setIsCollapsed(true)}
              className="p-2"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Search */}
        <Input
          placeholder="ค้นหาการสนทนา..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
          iconPosition="left"
          className="text-sm"
        />
      </div>

      {/* Room List */}
      <div className="flex-1 overflow-y-auto">
        {filteredRooms.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <div className="text-4xl mb-2">🔍</div>
            <p>ไม่พบการสนทนา</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => onRoomSelect?.(room.id)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeRoomId === room.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Room Avatar */}
                  <div className="relative">
                    <Avatar
                      src={room.avatar}
                      username={room.name}
                      size="medium"
                      isOnline={room.members.some(member => member.isOnline)}
                    />
                    {room.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {room.unreadCount > 9 ? '9+' : room.unreadCount}
                      </div>
                    )}
                  </div>

                  {/* Room Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium truncate ${
                        room.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {room.name}
                      </h3>
                      {room.lastMessage && (
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {formatLastMessageTime(room.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>

                    {/* Last Message */}
                    {room.lastMessage && (
                      <p className={`text-sm truncate ${
                        room.unreadCount > 0 ? 'text-gray-600 font-medium' : 'text-gray-500'
                      }`}>
                        {room.lastMessage.sender.username === mockCurrentUser.username
                          ? 'คุณ: '
                          : ''}
                        {truncateMessage(room.lastMessage.content)}
                      </p>
                    )}

                    {/* Room Description (if no last message) */}
                    {!room.lastMessage && room.description && (
                      <p className="text-sm text-gray-500 truncate">
                        {room.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <Avatar
            src={mockCurrentUser.avatar}
            username={mockCurrentUser.username}
            size="medium"
            isOnline={mockCurrentUser.isOnline}
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">
              {mockCurrentUser.username}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {mockCurrentUser.isOnline ? 'ออนไลน์' : 'ออฟไลน์'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="medium"
            onClick={onSettingsClick}
            className="p-2 flex-shrink-0"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};