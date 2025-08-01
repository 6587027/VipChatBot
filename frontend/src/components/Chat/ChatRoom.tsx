// components/Chat/ChatRoom.tsx
import React, { useState, useEffect } from 'react';
// ✅ ใช้ alias เพื่อหลีกเลี่ยง naming conflict
import * as ChatTypes from '../../types/chat';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

interface ChatRoomProps {
  room?: ChatTypes.ChatRoom;
  currentUser?: ChatTypes.User;
  className?: string;
}

// ✅ เปลี่ยนชื่อ component เป็น ChatRoomComponent แล้ว export เป็น ChatRoom
export const ChatRoom: React.FC<ChatRoomProps> = ({
  room,
  currentUser,
  className = ''
}) => {
  // State Management
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Mock current user if not provided
  const mockCurrentUser: User = currentUser || {
    id: 'user-1',
    username: 'วิป',
    email: 'vip@mahidol.ac.th',
    avatar: '/assets/icons/vip-avatar.png',
    isOnline: true
  };

  // Mock chat room if not provided
  const mockRoom: ChatTypes.ChatRoom = room || {
    id: 'room-1',
    name: 'VipChatBot Assistant',
    description: 'AI-powered chat assistant for Mahidol University students',
    avatar: '/assets/icons/chatbot-avatar.png',
    members: [
      mockCurrentUser,
      {
        id: 'bot-1',
        username: 'ChatBot Assistant',
        email: 'bot@vipchatbot.com',
        avatar: '/assets/icons/bot-avatar.png',
        isOnline: true
      }
    ],
    unreadCount: 0,
    isPrivate: false,
    createdAt: new Date()
  };

  // Mock initial messages
  useEffect(() => {
    const mockMessages: ChatTypes.Message[] = [
      {
        id: 'msg-1',
        content: 'สวัสดีครับวิป! ยินดีต้อนรับสู่ VipChatBot ครับ 👋',
        sender: {
          id: 'bot-1',
          username: 'ChatBot Assistant',
          email: 'bot@vipchatbot.com',
          avatar: '/assets/icons/bot-avatar.png',
          isOnline: true
        },
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: 'text'
      },
      {
        id: 'msg-2',
        content: 'สวัสดีครับ! ผมเพิ่งเริ่มใช้งานระบบนี้ครับ',
        sender: mockCurrentUser,
        timestamp: new Date(Date.now() - 4 * 60 * 1000),
        type: 'text'
      },
      {
        id: 'msg-3',
        content: 'เยี่ยมเลยครับ! ผมพร้อมช่วยเหลือคุณในเรื่องต่าง ๆ เช่น:\n\n🔷 การเขียนโปรแกรม\n🔷 การออกแบบเว็บไซต์\n🔷 การเรียนรู้เทคโนโลยีใหม่ ๆ\n🔷 การแก้ไขปัญหาโค้ด\n🔷 และอื่น ๆ อีกมากมาย!\n\nมีอะไรให้ผมช่วยไหมครับ? 😊',
        sender: {
          id: 'bot-1',
          username: 'ChatBot Assistant',
          email: 'bot@vipchatbot.com',
          avatar: '/assets/icons/bot-avatar.png',
          isOnline: true
        },
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        type: 'text'
      }
    ];

    setMessages(mockMessages);
    setIsConnected(true);
  }, [mockCurrentUser]);

  // Handle sending messages
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    // Create user message
    const userMessage: ChatTypes.Message = {
      id: `msg-${Date.now()}`,
      content: content.trim(),
      sender: mockCurrentUser,
      timestamp: new Date(),
      type: 'text'
    };

    // Add user message to list
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot typing
    setTypingUsers([{
      userId: 'bot-1',
      username: 'ChatBot Assistant',
      timestamp: new Date()
    }]);

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse: ChatTypes.Message = {
        id: `msg-bot-${Date.now()}`,
        content: generateBotResponse(content),
        sender: {
          id: 'bot-1',
          username: 'ChatBot Assistant',
          email: 'bot@vipchatbot.com',
          avatar: '/assets/icons/bot-avatar.png',
          isOnline: true
        },
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botResponse]);
      setTypingUsers([]);
    }, 1500 + Math.random() * 1000);
  };

  // Simple bot response generator
  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('สวัสดี') || message.includes('hello') || message.includes('hi')) {
      return 'สวัสดีครับ! ยินดีที่ได้พูดคุยกับคุณ 😊 มีอะไรให้ช่วยไหมครับ?';
    }
    
    if (message.includes('ชื่อ') || message.includes('name')) {
      return 'ผมชื่อ ChatBot Assistant ครับ เป็น AI ที่พัฒนาโดย วิป นักศึกษา ICT มหาวิทยาลัยมหิดล! 🤖✨';
    }
    
    if (message.includes('ช่วย') || message.includes('help')) {
      return 'ผมสามารถช่วยคุณได้หลายเรื่องครับ:\n\n🔷 ตอบคำถามเกี่ยวกับการเขียนโปรแกรม\n🔷 แนะนำเทคโนโลยีใหม่ ๆ\n🔷 ช่วยดีบัก code\n🔷 อธิบายแนวคิดทางเทคนิค\n🔷 แนะนำ learning path\n\nลองถามอะไรมาดูครับ! 😄';
    }
    
    if (message.includes('เวลา') || message.includes('time')) {
      return `ตอนนี้เวลา ${new Date().toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })} ครับ ⏰`;
    }
    
    if (message.includes('วันนี้') || message.includes('today')) {
      return `วันนี้เป็นวัน${new Date().toLocaleDateString('th-TH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })} ครับ 📅`;
    }
    
    if (message.includes('react') || message.includes('javascript') || message.includes('typescript')) {
      return 'เยี่ยมเลยครับ! คุณสนใจเรื่อง React/JavaScript/TypeScript ใช่ไหม? 🚀\n\nผมสามารถช่วยได้เรื่อง:\n• อธิบายแนวคิด React Hooks\n• ช่วยดีบัก JavaScript code\n• แนะนำ TypeScript best practices\n• ออกแบบ component architecture\n\nมีคำถามอะไรเฉพาะเจาะจงไหมครับ? 💻';
    }
    
    if (message.includes('mahidol') || message.includes('มหิดล')) {
      return 'โอ้! คุณเป็นคนมหิดลด้วยหรือครับ? 🎓\n\nมหาวิทยาลัยมหิดลเป็นมหาวิทยาลัยที่ยอดเยี่ยมเลยครับ! วิปที่สร้างผมก็เป็นนักศึกษา ICT มหิดลเหมือนกัน\n\nคุณเรียนคณะอะไรครับ? 😊';
    }
    
    if (message.includes('vip') || message.includes('วิป')) {
      return 'คุณรู้จักวิปหรือครับ? 😄\n\nวิป (ภัทร วงศ์ทรัพย์สกุล) เป็นนักศึกษา ICT ปี 3 มหาวิทยาลัยมหิดล ที่สร้างผมขึ้นมา! เขาเป็นคนที่มีความสามารถด้าน Frontend Development และกำลังเรียนรู้ Full-stack Development อยู่ครับ 👨‍💻✨';
    }

    // Default responses
    const defaultResponses = [
      'น่าสนใจมากครับ! ขอบคุณที่แบ่งปันความคิดเห็น 😊 มีอะไรอื่นที่อยากสอบถามไหมครับ?',
      'เข้าใจแล้วครับ! ผมกำลังเรียนรู้และพัฒนาตัวเองอยู่เรื่อย ๆ เร็ว ๆ นี้จะสามารถตอบคำถามได้หลากหลายมากขึ้น 🤖',
      'ขอบคุณสำหรับข้อความครับ! ถ้ามีคำถามเกี่ยวกับเทคโนโลยี การเขียนโปรแกรม หรือเรื่องอื่น ๆ ถามมาได้เลยนะครับ 💡',
      'ผมยังเรียนรู้อยู่ครับ! แต่ถ้ามีอะไรที่ผมช่วยได้ บอกมาเลยนะครับ ผมจะพยายามช่วยให้ดีที่สุด 😊',
      'ว้าว! เรื่องนี้น่าสนใจจัง ขอบคุณที่แชร์นะครับ มีอะไรอื่นที่อยากคุยกันไหม? 🌟'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Handle typing events
  const handleTypingStart = () => {
    console.log('User started typing');
  };

  const handleTypingStop = () => {
    console.log('User stopped typing');
  };

  // Handle other actions
  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  const handleSearchClick = () => {
    console.log('Search clicked');
  };

  const handleVideoCallClick = () => {
    console.log('Video call clicked');
  };

  const handleVoiceCallClick = () => {
    console.log('Voice call clicked');
  };

  const handleMessageClick = (message: ChatTypes.Message) => {
    console.log('Message clicked:', message);
  };

  const handleLoadMore = () => {
    console.log('Load more messages');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`flex flex-col h-full bg-gray-50 ${className}`}>
      {/* Chat Header */}
      <ChatHeader
        room={mockRoom}
        currentUser={mockCurrentUser}
        onSettingsClick={handleSettingsClick}
        onSearchClick={handleSearchClick}
        onVideoCallClick={handleVideoCallClick}
        onVoiceCallClick={handleVoiceCallClick}
      />

      {/* Messages Area */}
      <MessageList
        messages={messages}
        currentUserId={mockCurrentUser.id}
        typingUsers={typingUsers}
        isLoading={isLoading}
        hasMoreMessages={messages.length > 3}
        onLoadMore={handleLoadMore}
        onMessageClick={handleMessageClick}
        className="flex-1"
      />

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        onTypingStart={handleTypingStart}
        onTypingStop={handleTypingStop}
        disabled={!isConnected}
        placeholder="พิมพ์ข้อความถึง ChatBot Assistant..."
        maxLength={2000}
      />

      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-yellow-50 border-t border-yellow-200 px-4 py-2 text-center">
          <p className="text-yellow-800 text-sm flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-600 border-t-transparent" />
            🔄 กำลังเชื่อมต่อ...
          </p>
        </div>
      )}
    </div>
  );
};