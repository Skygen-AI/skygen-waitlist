"use client";

import React, { useState, useEffect } from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface AnimatedMarkdownProps {
  text: string;
  typingSpeed?: number;
  onComplete?: () => void;
  className?: string;
}

export function AnimatedMarkdown({ 
  text, 
  typingSpeed = 5, 
  onComplete,
  className = '' 
}: AnimatedMarkdownProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else if (currentIndex >= text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, typingSpeed, onComplete]);

  useEffect(() => {
    // Сбрасываем состояние при изменении текста
    setCurrentIndex(0);
    setDisplayedText('');
  }, [text]);

  // Render plain text with cursor during animation, markdown when complete
  if (currentIndex < text.length) {
    return (
      <div className={className}>
        <span className="inline">
          {displayedText}
          <span className="inline-block w-0.5 h-4 bg-neutral-800 dark:bg-neutral-200 animate-pulse ml-0.5">|</span>
        </span>
      </div>
    );
  }

  // Show final markdown when animation is complete
  return (
    <div className={className}>
      <MarkdownRenderer content={displayedText} />
    </div>
  );
}
