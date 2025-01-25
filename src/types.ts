export interface Journal {
  id: number;
  Name: string;
  JIF: number;
  Category: string;
  Keywords: string[]; // Ensure this matches the processed format (as an array)
  Publisher: string;
  Decision_Time: number;
}


export interface FilterCriteria {
  impactFactor: number;
  firstDecisionTime: number;
  publisher: string;
  llmModel: string;
}

export type LLMModel = 'faiss' | 'gemini-pro' | 'groq' | 'mixtral' | 'openai';