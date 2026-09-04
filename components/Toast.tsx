'use client';

import { useEffect } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export type ToastType = 'error' | 'success' | 'info';

export interface ToastData {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toast: ToastData | null;
  onDismiss: () => void;
}

export default function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDismiss, 3200);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const styles: Record<ToastType, string> = {
    error: 'bg-red-500',
    success: 'bg-brand-orange',
    info: 'bg-brand-gray',
  };

  return (
    <div
      className="fixed inset-x-0 top-4 z-[60] flex justify-center px-4"
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`flex max-w-md items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-white shadow-lg animate-pop-in ${styles[toast.type]}`}
      >
        {toast.type === 'success' ? (
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
        ) : (
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
        )}
        <span>{toast.message}</span>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="閉じる"
          className="ml-1 flex h-5 w-5 items-center justify-center rounded-full transition hover:bg-white/25"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
