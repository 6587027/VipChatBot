// components/UI/Avatar.tsx
import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
  username?: string;
  isOnline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  username,
  isOnline,
  className = '',
  onClick
}) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  const baseClasses = `
    relative inline-flex items-center justify-center
    rounded-full bg-gradient-to-br from-blue-400 to-blue-600
    text-white font-semibold shadow-md
    ${onClick ? 'cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105' : ''}
    ${sizeClasses[size]}
    ${className}
  `;

  // Generate initials from username
  const getInitials = (name?: string) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate consistent color from username
  const getAvatarColor = (name?: string) => {
    if (!name) return 'from-gray-400 to-gray-600';
    
    const colors = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600', 
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-indigo-400 to-indigo-600',
      'from-yellow-400 to-yellow-600',
      'from-red-400 to-red-600',
      'from-teal-400 to-teal-600'
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const colorClass = getAvatarColor(username);

  return (
    <div className="relative">
      <div 
        className={`${baseClasses} bg-gradient-to-br ${colorClass}`}
        onClick={onClick}
      >
        {src ? (
          <img
            src={src}
            alt={alt || username || 'Avatar'}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <span className="select-none">
            {getInitials(username)}
          </span>
        )}
      </div>
      
      {/* Online Status Indicator */}
      {isOnline !== undefined && (
        <div className={`
          absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white
          ${isOnline ? 'bg-green-500' : 'bg-gray-400'}
          ${size === 'small' ? 'w-3 h-3' : 'w-4 h-4'}
        `} />
      )}
    </div>
  );
};