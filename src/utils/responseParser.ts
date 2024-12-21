import { ProcessedQuery } from '../types';

export function parseGeminiResponse(response: string): ProcessedQuery {
  try {
    // Remove any potential markdown formatting or extra characters
    const cleanResponse = response.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleanResponse);
    
    // Validate the response structure
    if (!parsed.searchTerms || !Array.isArray(parsed.likelyTimestamps)) {
      throw new Error('Invalid response structure');
    }
    
    return {
      searchTerms: parsed.searchTerms,
      likelyTimestamps: parsed.likelyTimestamps.map(timestamp => ({
        start: Number(timestamp.start),
        end: Number(timestamp.end),
        reason: String(timestamp.reason)
      }))
    };
  } catch (error) {
    console.error('Failed to parse Gemini response:', error);
    // Return a fallback response
    return {
      searchTerms: 'educational content',
      likelyTimestamps: [{
        start: 0,
        end: 60,
        reason: 'Introduction section'
      }]
    };
  }
}