// components/UI/Input.tsx
import React, { forwardRef } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'search';
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  autoFocus?: boolean;
  maxLength?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeholder,
  value,
  onChange,
  onKeyPress,
  type = 'text',
  disabled = false,
  error,
  icon,
  iconPosition = 'left',
  className = '',
  autoFocus = false,
  maxLength
}, ref) => {
  const inputClasses = `
    w-full px-4 py-3 bg-gray-50 border-2 border-gray-200
    rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 
    focus:border-transparent transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${icon && iconPosition === 'left' ? 'pl-12' : ''}
    ${icon && iconPosition === 'right' ? 'pr-12' : ''}
    ${className}
  `.trim();

  const containerClasses = `
    relative ${label ? 'space-y-2' : ''}
  `;

  return (
    <div className={containerClasses}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={`
            absolute top-1/2 transform -translate-y-1/2 
            ${iconPosition === 'left' ? 'left-4' : 'right-4'}
            text-gray-400 pointer-events-none
          `}>
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          className={inputClasses}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});