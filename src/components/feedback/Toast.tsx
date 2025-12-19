/**
 * Toast Component
 * Componente de notificação toast
 */

"use client";

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export function Toast({ 
  message, 
  type = 'info', 
  duration = 5000,
  onClose 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800'
  };

  if (!isVisible) return null;

  return (
    <div className={`
      fixed top-4 right-4 z-50 
      flex items-center gap-3 
      px-4 py-3 rounded-lg border-l-4 shadow-lg
      animate-in slide-in-from-right
      ${colors[type]}
    `}>
      {icons[type]}
      <p className="font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Hook para usar toast
export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; props: ToastProps }>>([]);

  const showToast = (props: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, props }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return { toasts, showToast, removeToast };
}
