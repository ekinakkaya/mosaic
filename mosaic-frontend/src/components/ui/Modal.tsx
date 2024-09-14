// src/components/ui/Modal.tsx
import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
