import React from 'react';
import { VideoResult } from '../types';
import { ExternalLink, Clock } from 'lucide-react';
import { VideoCard } from './VideoCard';

interface VideoListProps {
  videos: VideoResult[];
}

export function VideoList({ videos }: VideoListProps) {
  return (
    <div className="w-full max-w-2xl space-y-4">
      {videos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
}