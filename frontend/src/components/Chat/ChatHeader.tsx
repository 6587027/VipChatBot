// components/Chat/ChatHeader.tsx
import React from 'react';
// ✅ ลองใช้ import แบบ explicit
import type { ChatRoom, User } from '../../types/chat';
import { Avatar } from '../UI/Avatar';
import { Button } from '../UI/Button';

interface ChatHeaderProps {
  room?: ChatRoom;
  currentUser?: User;
  onSettingsClick?: () => void;
  onSearchClick?: () => void;
  onVideoCallClick?: () => void;
  onVoiceCallClick?: () => void;
  className?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  room,
  currentUser,
  onSettingsClick,
  onSearchClick,
  onVideoCallClick,
  onVoiceCallClick,
  className = ''
}) => {
  const getOnlineCount = () => {
    if (!room?.members) return 0;
    return room.members.filter(member => member.isOnline).length;
  };

  const getRoomStatus = () => {
    if (!room) return 'ไม่ได้เชื่อมต่อ';
    
    if (room.isPrivate && room.members.length === 2) {
      const otherUser = room.members.find(member => member.id !== currentUser?.id);
      return otherUser?.isOnline ? 'ออนไลน์' : `ออนไลน์ล่าสุด ${formatLastSeen(otherUser?.lastSeen)}`;
    }
    
    const onlineCount = getOnlineCount();
    return `${onlineCount} คนออนไลน์จาก ${room.members.length} คน`;
  };

  const formatLastSeen = (lastSeen?: Date) => {
    if (!lastSeen) return 'ไม่ทราบ';
    
    const now = new Date();
    const diff = now.getTime() - new Date(lastSeen).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'เมื่อสักครู่';
    if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
    if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
    return `${days} วันที่แล้ว`;
  };

  return (
    <div className={`
      sticky top-0 z-10 bg-white/95 backdrop-blur-md 
      border-b border-gray-200 shadow-sm
      ${className}
    `}>
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Room Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="medium"
              className="p-2 lg:hidden"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }
            />

            {/* Room Avatar */}
            <Avatar
              src={room?.avatar}
              username={room?.name || 'ChatBot'}
              size="large"
              isOnline={room ? getOnlineCount() > 0 : false}
            />

            {/* Room Info */}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 truncate">
                {room?.name || 'VipChatBot Assistant'}
              </h2>
              <p className="text-sm text-gray-500 truncate">
                {getRoomStatus()}
              </p>
            </div>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="medium"
              onClick={onSearchClick}
              className="p-2 hidden sm:flex"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />

            {/* Voice Call Button */}
            <Button
              variant="ghost"
              size="medium"
              onClick={onVoiceCallClick}
              className="p-2 hidden sm:flex"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />

            {/* Video Call Button */}
            <Button
              variant="ghost"
              size="medium"
              onClick={onVideoCallClick}
              className="p-2 hidden sm:flex"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
            />

            {/* Settings Button */}
            <Button
              variant="ghost"
              size="medium"
              onClick={onSettingsClick}
              className="p-2"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              }
            />

            {/* More Options */}
            <Button
              variant="ghost"
              size="medium"
              className="p-2"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Room Description (if exists) */}
        {room?.description && (
          <div className="mt-2 text-sm text-gray-600 px-1">
            {room.description}
          </div>
        )}
      </div>
    </div>
  );
};