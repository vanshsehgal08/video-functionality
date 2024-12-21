import { GoogleGenerativeAI } from '@google/generative-ai';
import { ProcessedQuery } from '../types';
import { parseGeminiResponse } from '../utils/responseParser';

const GEMINI_API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function processQuery(query: string): Promise<ProcessedQuery> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `You are a video content analyzer. For the query: "${query}", provide:
1. Relevant YouTube search terms
2. Typical timestamps where this content appears in educational videos

Respond ONLY with a JSON object in this exact format (no other text):
{"searchTerms":"term1,term2,term3","likelyTimestamps":[{"start":120,"end":180,"reason":"explanation"}]}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return parseGeminiResponse(response.text());
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to process query with Gemini');
  }
}