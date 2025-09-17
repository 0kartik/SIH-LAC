import { KnowledgeBase, KnowledgeBaseEntry } from '../types';

let knowledgeBase: KnowledgeBase | null = null;

export const loadKnowledgeBase = async (): Promise<KnowledgeBase> => {
  if (knowledgeBase) {
    return knowledgeBase;
  }

  try {
    const response = await fetch('/knowledge_base.json');
    knowledgeBase = await response.json();
    return knowledgeBase!;
  } catch (error) {
    console.error('Failed to load knowledge base:', error);
    return { questions: [] };
  }
};

export const findAnswer = (question: string, kb: KnowledgeBase): string => {
  const lowerQuestion = question.toLowerCase();
  
  // First try exact match
  for (const entry of kb.questions) {
    if (entry.keywords.some(keyword => 
      lowerQuestion.includes(keyword.toLowerCase())
    )) {
      return entry.answer;
    }
  }
  
  // If no match found
  return "Sorry, I don't know that yet. Please contact admin.";
};