"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";

interface FileAttachmentProps {
  file: {
    name: string;
    size: string;
    type: string;
    url?: string;
    downloadUrl?: string;
    timestamp: Date;
    description?: string;
  };
  isTypingComplete?: boolean;
}

export function FileAttachment({ file, isTypingComplete = true }: FileAttachmentProps) {
  if (!isTypingComplete) {
    return null;
  }

  // Scroll to bottom when file attachment becomes visible
  useEffect(() => {
    if (isTypingComplete) {
      const timer = setTimeout(() => {
        // Find the messages container and scroll to bottom
        const messagesContainer = document.querySelector('[data-messages-container]');
        if (messagesContainer) {
          messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 600); // Wait for animation to complete

      return () => clearTimeout(timer);
    }
  }, [isTypingComplete]);

  const handleDownload = () => {
    if (file.downloadUrl) {
      const link = document.createElement('a');
      link.href = file.downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = () => {
    if (file.type.includes('pdf')) {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    return <FileText className="h-8 w-8 text-blue-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: 0.5,
        ease: "easeOut"
      }}
      className="mt-4 p-4 bg-neutral-50 border border-neutral-200 rounded-lg dark:bg-neutral-700 dark:border-neutral-600"
    >
      <div className="flex items-start gap-3">
        {/* File Icon */}
        <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm dark:bg-neutral-600">
          {getFileIcon()}
        </div>
        
        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium text-neutral-900 dark:text-white truncate">
              {file.name}
            </h4>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
              {formatTime(file.timestamp)}
            </span>
          </div>
          
          {file.description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
              {file.description}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {file.type} • {file.size}
            </span>
            
            <div className="flex items-center gap-2">
              {file.url && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(file.url, '_blank')}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open
                </motion.button>
              )}
              
              {file.downloadUrl && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-green-600 bg-green-50 hover:bg-green-100 rounded transition-colors dark:text-green-400 dark:bg-green-900/30 dark:hover:bg-green-900/50"
                >
                  <Download className="h-3 w-3" />
                  Download
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
