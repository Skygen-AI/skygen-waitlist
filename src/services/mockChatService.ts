import { ChatMessage } from '@/types/chat';
import { mockAgentResponse, mockFlightBookingPlan, mockReceiptFile } from '@/data/mockFlightPlan';

/**
 * Mock chat service that returns predefined response
 * with NYC flight booking plan
 */
export class MockChatService {
  /**
   * Mock method for sending message with context
   * Returns flight booking plan response to any user message
   */
  async sendMessageWithContext(
    userMessage: string, 
    conversationHistory: ChatMessage[] = []
  ): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Generate response with plan in format that ToolRenderer can parse
    const planToolCall = `<tool_call>
<tool_name>plan_executor</tool_name>
<parameters>
<tasks>${JSON.stringify(mockFlightBookingPlan)}</tasks>
</parameters>
</tool_call>`;

    return `${mockAgentResponse}

${planToolCall}`;
  }

  /**
   * Alternative method for simple messages without context
   */
  async sendMessage(userMessage: string): Promise<string> {
    return this.sendMessageWithContext(userMessage, []);
  }

  /**
   * Method to get mock plan directly (if needed)
   */
  getMockFlightPlan() {
    return mockFlightBookingPlan;
  }

  /**
   * Method to generate file attachment message
   */
  generateFileMessage(): string {
    const fileToolCall = `<tool_call>
<tool_name>file_attachment</tool_name>
<parameters>
<file>${JSON.stringify(mockReceiptFile)}</file>
</parameters>
</tool_call>`;

    return `Flight booking completed! Here's your receipt:

${fileToolCall}`;
  }
}

// Export service instance
export const mockChatService = new MockChatService();
