
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Play, Users, Award, TrendingUp, BookOpen } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string | null;
  video_file_path: string;
  thumbnail_url: string | null;
  youtube_url: string | null;
  category: 'shorts' | 'full';
  created_at: string;
  updated_at: string;
}

const Index = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'shorts' | 'full'>('all');
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching videos:', error);
        return;
      }

      if (data) {
        const typedVideos: Video[] = data.map(video => ({
          ...video,
          category: video.category as 'shorts' | 'full'
        }));
        setVideos(typedVideos);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = videos.filter(video => {
    if (activeCategory === 'all') return true;
    return video.category === activeCategory;
  });

  const displayedVideos = filteredVideos.slice(0, displayCount);

  const loadMore = () => {
    setDisplayCount(prev => prev + 10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dropshipping</span> Success
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Dropshipping Free course available here
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Start Learning Now
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg font-semibold">
                Watch Free Videos
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <BookOpen className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Free Course</h3>
                <p className="text-gray-300">Complete dropshipping training</p>
              </div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Proven Strategies</h3>
                <p className="text-gray-300">Learn from successful case studies</p>
              </div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Expert Guidance</h3>
                <p className="text-gray-300">Step-by-step instructions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Categories Filter */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1">
              <div className="flex space-x-1">
                {[
                  { key: 'all', label: 'All Videos' },
                  { key: 'shorts', label: 'Shorts' },
                  { key: 'full', label: 'Full Videos' }
                ].map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key as 'all' | 'shorts' | 'full')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category.key
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Videos</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Learn from our comprehensive dropshipping tutorials and grow your business
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <VideoCard 
                      id={video.id}
                      title={video.title}
                      description={video.description || ''}
                      thumbnail_url={video.thumbnail_url || undefined}
                      video_file_path={video.video_file_path}
                      youtube_url={video.youtube_url || undefined}
                      category={video.category}
                      index={index}
                    />
                  </div>
                ))}
              </div>

              {displayedVideos.length < filteredVideos.length && (
                <div className="text-center mt-12">
                  <Button
                    onClick={loadMore}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  >
                    Load More Videos
                  </Button>
                </div>
              )}

              {filteredVideos.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">No videos available in this category yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dropshipping Journey?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of successful entrepreneurs who have built profitable dropshipping businesses with our proven strategies.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full text-xl font-semibold transform hover:scale-105 transition-all duration-300">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
