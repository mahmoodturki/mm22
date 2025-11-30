import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  isClosable?: boolean;
  onClose?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  title, 
  icon,
  isClosable,
  onClose
}) => {
  return (
    <div className={`backdrop-blur-xl bg-glass border border-glassBorder rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${className}`}>
      {(title || isClosable) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-glassBorder bg-white/5">
          <div className="flex items-center gap-2 text-brand-400 font-bold">
            {icon && <span className="text-brand-500">{icon}</span>}
            <span>{title}</span>
          </div>
          {isClosable && (
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          )}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};