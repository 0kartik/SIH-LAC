export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface KnowledgeBaseEntry {
  id: number;
  question: string;
  keywords: string[];
  answer: string;
}

export interface KnowledgeBase {
  questions: KnowledgeBaseEntry[];
}

export interface LogEntry {
  timestamp: string;
  question: string;
  answer: string;
}