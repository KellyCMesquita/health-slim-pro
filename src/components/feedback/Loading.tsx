/**
 * Loading Component
 * Componente de loading reutilizável
 */

"use client";

import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ 
  size = 'md', 
  text,
  fullScreen = false 
}: LoadingProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2 className={`${sizes[size]} animate-spin text-blue-600`} />
      {text && (
        <p className="text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}
