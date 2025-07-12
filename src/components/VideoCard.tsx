
import { useState } from "react";
import { ExternalLink, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  youtubeUrl?: string;
  category: 'shorts' | 'full';
}

const VideoCard = ({ title, description, thumbnail, videoUrl, youtubeUrl, category }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 animate-fade-in">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={thumbnail || "/placeholder.svg"} 
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <Button
              size="icon"
              variant="secondary"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${
              category === 'shorts' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
            }`}>
              {category === 'shorts' ? 'Short' : 'Full Video'}
            </span>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-red-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-3">
            {description}
          </p>
          
          <div className="space-y-2">
            {isPlaying && (
              <video
                controls
                className="w-full rounded-md"
                src={videoUrl}
                onEnded={() => setIsPlaying(false)}
              />
            )}
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1"
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              {youtubeUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(youtubeUrl, '_blank')}
                  className="flex-1"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  YouTube
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
