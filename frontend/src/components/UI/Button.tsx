// components/UI/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-medium 
    rounded-xl transition-all duration-200 transform
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-500 to-blue-600 text-white
      hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:-translate-y-0.5
      focus:ring-blue-500
    `,
    secondary: `
      bg-white text-blue-600 border-2 border-blue-600
      hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5
      focus:ring-blue-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600 text-white
      hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:-translate-y-0.5
      focus:ring-red-500
    `,
    ghost: `
      bg-transparent text-gray-600 hover:bg-gray-100
      hover:shadow-sm focus:ring-gray-500
    `
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const finalClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={finalClasses}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
          Loading...
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};