export interface TimestampInfo {
  start: number;
  end: number;
  reason: string;
}

export interface ProcessedQuery {
  searchTerms: string;
  likelyTimestamps: TimestampInfo[];
}

export interface VideoResult {
  videoId: string;
  title: string;
  timestamp: number;
  description: string;
  relevanceNote: string;
}

export interface SearchResponse {
  results: VideoResult[];
  error?: string;
}