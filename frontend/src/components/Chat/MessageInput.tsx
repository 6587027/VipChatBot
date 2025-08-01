// components/Chat/MessageInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../UI/Button';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onTypingStart?: () => void;
  onTypingStop?: () => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onTypingStart,
  onTypingStop,
  disabled = false,
  placeholder = "พิมพ์ข้อความ...",
  maxLength = 2000,
  className = ''
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Handle typing indicators
  useEffect(() => {
    if (message.trim() && !isTyping) {
      setIsTyping(true);
      onTypingStart?.();
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        onTypingStop?.();
      }
    }, 2000);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [message, isTyping, onTypingStart, onTypingStop]);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
      setIsTyping(false);
      onTypingStop?.();
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
    }
  };

  const remainingChars = maxLength - message.length;
  const isNearLimit = remainingChars <= 100;

  return (
    <div className={`bg-white border-t border-gray-200 p-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Input Area */}
        <div className="flex items-end gap-3">
          {/* File Upload Button */}
          <Button
            variant="ghost"
            size="medium"
            disabled={disabled}
            className="flex-shrink-0 p-2 hover:bg-gray-100"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            }
          />

          {/* Text Input Area */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className={`
                w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200
                rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent transition-all duration-200
                resize-none max-h-32 min-h-[48px]
                disabled:opacity-50 disabled:cursor-not-allowed
                ${message.length > 0 ? 'border-blue-300' : ''}
              `}
              style={{ 
                paddingTop: '12px',
                paddingBottom: '12px',
                lineHeight: '1.5'
              }}
            />

            {/* Emoji Button */}
            <button
              type="button"
              disabled={disabled}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            variant="primary"
            size="medium"
            className="flex-shrink-0 p-3 aspect-square"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            }
          />
        </div>

        {/* Character Counter & Quick Actions */}
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="flex items-center gap-2">
            {/* Quick Actions */}
            <div className="hidden sm:flex items-center gap-1">
              <button className="text-xs text-gray-500 hover:text-blue-600 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                @AI
              </button>
              <button className="text-xs text-gray-500 hover:text-blue-600 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                /help
              </button>
            </div>
          </div>

          {/* Character Counter */}
          {isNearLimit && (
            <span className={`text-xs ${remainingChars <= 20 ? 'text-red-500' : 'text-yellow-600'}`}>
              {remainingChars} ตัวอักษรเหลือ
            </span>
          )}
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="text-xs text-gray-400 mt-1 px-1 hidden sm:block">
          กด Enter เพื่อส่ง • Shift + Enter เพื่อขึ้นบรรทัดใหม่
        </div>
      </div>
    </div>
  );
};