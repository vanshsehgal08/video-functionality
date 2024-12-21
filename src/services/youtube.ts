import axios from 'axios';
import { VideoResult, SearchResponse, ProcessedQuery } from '../types';

const YOUTUBE_API_KEY = import.meta.env.VITE_API_KEY;

export async function searchVideos(processedQuery: ProcessedQuery): Promise<SearchResponse> {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          maxResults: 5,
          q: processedQuery.searchTerms,
          type: 'video',
          key: YOUTUBE_API_KEY
        }
      }
    );

    const results: VideoResult[] = response.data.items.map((item: any) => {
      // Get a random timestamp from the likely timestamps
      const timestamp = processedQuery.likelyTimestamps[
        Math.floor(Math.random() * processedQuery.likelyTimestamps.length)
      ];

      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        timestamp: timestamp.start,
        description: item.snippet.description,
        relevanceNote: timestamp.reason
      };
    });

    return { results };
  } catch (error) {
    console.error('YouTube API Error:', error);
    return { results: [], error: 'Failed to fetch videos' };
  }
}