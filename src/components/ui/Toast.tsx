"use client";

import React from "react";
import { X, Check, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useToastStore, ToastType } from "@/stores/toastStore";

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <Check size={18} className="text-white" />,
  error: <AlertCircle size={18} className="text-white" />,
  info: <Info size={18} className="text-white" />,
  warning: <AlertTriangle size={18} className="text-white" />,
};

const bgColorMap: Record<ToastType, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-yellow-500",
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-white rounded-lg shadow-lg border border-gray-100 p-4 min-w-[300px] max-w-[400px] animate-slide-in"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColorMap[toast.type]}`}
          >
            {iconMap[toast.type]}
          </div>
          <p className="flex-1 text-gray-800 text-sm font-medium">
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
