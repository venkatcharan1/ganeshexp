
import { useState } from "react";
import { ExternalLink, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  video_file_path: string;
  youtube_url?: string;
  category: 'shorts' | 'full';
  index?: number;
}

const VideoCard = ({ title, description, thumbnail_url, video_file_path, youtube_url, category, index = 0 }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 animate-fade-in hover:scale-105 transform perspective-1000 hover:rotate-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={thumbnail_url || "/placeholder.svg"} 
            alt={title}
            className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <Button
              size="icon"
              variant="secondary"
              className="opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 bg-white/90 hover:bg-white shadow-xl"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-5 w-5 text-blue-600" /> : <Play className="h-5 w-5 text-blue-600" />}
            </Button>
          </div>
          <div className="absolute top-2 left-2 animate-slide-in-left" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
            <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
              category === 'shorts' 
                ? 'bg-red-600/90 text-white shadow-red-600/25' 
                : 'bg-blue-600/90 text-white shadow-blue-600/25'
            } shadow-lg`}>
              {category === 'shorts' ? 'Short' : 'Full Video'}
            </span>
          </div>
        </div>
        
        <div className="p-6 space-y-4 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 animate-slide-in-right" style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed animate-fade-in" style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>
            {description}
          </p>
          
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
            {isPlaying && (
              <video
                controls
                className="w-full rounded-lg shadow-lg animate-scale-in"
                src={video_file_path}
                onEnded={() => setIsPlaying(false)}
              />
            )}
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 bg-white/70 dark:bg-slate-700/70"
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              {youtube_url && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(youtube_url, '_blank')}
                  className="flex-1 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-105 bg-white/70 dark:bg-slate-700/70"
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
