"use client";

import React from "react";
import { motion } from "framer-motion";
import Plan from "./Plan";
import { FileAttachment } from "./FileAttachment";
import { ParsedTool, parsePlanData, parseFileData } from "@/utils/toolParser";

interface ToolRendererProps {
  tools: ParsedTool[];
  isTypingComplete: boolean;
  onPlanCompleted?: () => void;
}

export function ToolRenderer({ tools, isTypingComplete, onPlanCompleted }: ToolRendererProps) {
  if (!isTypingComplete || tools.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-3">
      {tools.map((tool, index) => (
        <motion.div
          key={`${tool.name}-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: 0.2 + (index * 0.1),
            ease: "easeOut"
          }}
        >
          {renderTool(tool, onPlanCompleted)}
        </motion.div>
      ))}
    </div>
  );
}

function renderTool(tool: ParsedTool, onPlanCompleted?: () => void): React.ReactNode {
  const toolName = tool.name.toLowerCase().trim();
  
  switch (toolName) {
    case 'plan':
    case 'planning':
    case 'planner':
    case 'task':
    case 'tasks':
    case 'plan_executor':
      return renderPlanTool(tool, onPlanCompleted);
    
    case 'file':
    case 'file_attachment':
    case 'attachment':
      return renderFileTool(tool);
    
    default:
      // Show placeholder for unknown tools
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm font-medium text-yellow-800 mb-1">
            Unknown tool: {tool.name}
          </div>
          <pre className="text-xs text-yellow-700 overflow-auto">
            {tool.content}
          </pre>
        </div>
      );
  }
}

function renderPlanTool(tool: ParsedTool, onPlanCompleted?: () => void): React.ReactNode {
  const planData = parsePlanData(tool.content);
  
  if (!planData) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-sm font-medium text-red-800 mb-1">
          Plan parsing error
        </div>
        <div className="text-xs text-red-700">
          Failed to parse plan data. Please check format.
        </div>
      </div>
    );
  }

  return <Plan tasks={planData.tasks} onAllTasksCompleted={onPlanCompleted} />;
}

function renderFileTool(tool: ParsedTool): React.ReactNode {
  const fileData = parseFileData(tool.content);
  
  if (!fileData) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-sm font-medium text-red-800 mb-1">
          File parsing error
        </div>
        <div className="text-xs text-red-700">
          Failed to parse file data. Please check format.
        </div>
      </div>
    );
  }

  return <FileAttachment file={fileData} isTypingComplete={true} />;
}
