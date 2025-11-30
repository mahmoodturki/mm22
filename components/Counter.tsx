import React, { useEffect, useState } from 'react';

interface CounterProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  highlight?: boolean;
}

export const Counter: React.FC<CounterProps> = ({ value, label, size = 'md', highlight = false }) => {
  const [displayValue, setDisplayValue] = useState(value);

  // Simple animation effect for number changes
  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.floor(start + (end - start) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className="flex flex-col items-center">
      <span className={`font-mono font-bold tracking-wider ${sizeClasses[size]} ${highlight ? 'text-brand-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-white'}`}>
        {displayValue.toLocaleString()}
      </span>
      {label && <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">{label}</span>}
    </div>
  );
};