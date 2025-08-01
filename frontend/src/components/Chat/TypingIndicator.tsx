// components/Chat/TypingIndicator.tsx
import React from 'react';
import * as ChatTypes from '../../types/chat';
import { Avatar } from '../UI/Avatar';

interface TypingIndicatorProps {
  typingUsers: ChatTypes.TypingUser[];
  className?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  typingUsers,
  className = ''
}) => {
  if (typingUsers.length === 0) return null;

  const getTypingText = () => {
    const count = typingUsers.length;
    const names = typingUsers.map(user => user.username);

    if (count === 1) {
      return `${names[0]} กำลังพิมพ์...`;
    } else if (count === 2) {
      return `${names[0]} และ ${names[1]} กำลังพิมพ์...`;
    } else {
      return `${names[0]} และอีก ${count - 1} คน กำลังพิมพ์...`;
    }
  };

  return (
    <div className={`flex items-center gap-3 p-4 ${className}`}>
      {/* Show avatars for typing users (max 3) */}
      <div className="flex -space-x-2">
        {typingUsers.slice(0, 3).map((user) => (
          <Avatar
            key={user.userId}
            username={user.username}
            size="small"
            className="border-2 border-white"
          />
        ))}
      </div>

      {/* Typing bubble */}
      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          {/* Typing text */}
          <span className="text-sm text-gray-600 mr-2">
            {getTypingText()}
          </span>

          {/* Animated dots */}
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                 style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                 style={{ animationDelay: '200ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                 style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS for typing animation (add to your global CSS or Tailwind config)
export const typingAnimationCSS = `
  @keyframes typingPulse {
    0%, 60%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    30% {
      transform: scale(1.2);
      opacity: 1;
    }
  }

  .typing-dot {
    animation: typingPulse 1.4s infinite;
  }

  .typing-dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-dot:nth-child(3) {
    animation-delay: 0.4s;
  }
`;