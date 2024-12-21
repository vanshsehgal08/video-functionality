import React from 'react';
import { VideoResult } from '../types';
import { ExternalLink, Clock } from 'lucide-react';
import { formatTimestamp } from '../utils/timeFormatter';

interface VideoCardProps {
  video: VideoResult;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{video.description}</p>
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <Clock className="w-4 h-4 mr-1" />
        <span>Starts at {formatTimestamp(video.timestamp)}</span>
      </div>
      <p className="text-sm text-indigo-600 mb-3">
        Why this section: {video.relevanceNote}
      </p>
      <a
        href={`https://www.youtube.com/watch?v=${video.videoId}&t=${video.timestamp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        Watch this section
        <ExternalLink className="w-4 h-4 ml-1" />
      </a>
    </div>
  );
}