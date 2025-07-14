
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import VideoCard from "@/components/VideoCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Users, Award, TrendingUp, BookOpen, Youtube, Menu, X } from "lucide-react";

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

  const scrollToVideos = () => {
    const videosSection = document.getElementById('videos-section');
    if (videosSection) {
      videosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2 text-base sm:text-xl md:text-2xl font-bold text-white">
              <Youtube className="h-5 sm:h-6 md:h-8 w-5 sm:w-6 md:w-8 text-red-600" />
              <span className="text-sm sm:text-base md:text-xl lg:text-2xl">Dropshipping Academy</span>
            </div>
            <div className="hidden md:flex space-x-3 lg:space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Home</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Contact</Link>
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Privacy Policy</Link>
              <Link to="/terms-conditions" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Terms & Conditions</Link>
              <Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">Disclaimer</Link>
            </div>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <details className="dropdown">
                <summary className="text-white cursor-pointer list-none">
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </summary>
                <div className="absolute right-2 sm:right-4 top-12 sm:top-16 bg-slate-900 rounded-lg p-3 sm:p-4 space-y-2 border border-white/10 z-50 min-w-[200px]">
                  <Link to="/" className="block text-gray-300 hover:text-white transition-colors text-sm">Home</Link>
                  <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors text-sm">Contact</Link>
                  <Link to="/privacy-policy" className="block text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</Link>
                  <Link to="/terms-conditions" className="block text-gray-300 hover:text-white transition-colors text-sm">Terms & Conditions</Link>
                  <Link to="/disclaimer" className="block text-gray-300 hover:text-white transition-colors text-sm">Disclaimer</Link>
                </div>
              </details>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 px-2 sm:px-4 mt-14 sm:mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
              Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dropshipping</span> Course
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              Learn everything about dropshipping from product research to scaling your business. Free comprehensive course available here with step-by-step tutorials, proven strategies, and real case studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-2">
              <Button 
                onClick={scrollToVideos}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 md:px-8 py-3 rounded-full text-sm sm:text-base md:text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                Start Learning Dropshipping
              </Button>
              <Button 
                variant="outline" 
                onClick={scrollToVideos}
                className="w-full sm:w-auto border-blue-400/50 text-blue-300 bg-blue-950/30 hover:bg-blue-600 hover:text-white hover:border-blue-500 px-4 sm:px-6 md:px-8 py-3 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300"
              >
                Watch Free Dropshipping Videos
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 px-2">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <BookOpen className="h-10 sm:h-12 w-10 sm:w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Free Dropshipping Course</h3>
                <p className="text-sm sm:text-base text-gray-300">Complete dropshipping training from beginner to advanced level</p>
              </div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <TrendingUp className="h-10 sm:h-12 w-10 sm:w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Proven Dropshipping Strategies</h3>
                <p className="text-sm sm:text-base text-gray-300">Learn winning product research, store setup, and marketing techniques</p>
              </div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <Award className="h-10 sm:h-12 w-10 sm:w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Expert Dropshipping Guidance</h3>
                <p className="text-sm sm:text-base text-gray-300">Step-by-step tutorials for successful dropshipping business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropshipping Course Benefits Section */}
      <section className="py-12 sm:py-16 px-2 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-2">
              Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dropshipping Course</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-2">
              Our comprehensive dropshipping course covers everything you need to know to build a profitable online business. From finding winning products to scaling your store, we provide practical strategies that work in today's competitive e-commerce landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Product Research Mastery</h3>
              <p className="text-sm sm:text-base text-gray-300">Learn advanced techniques to find winning products using proven research methods and tools. Discover trending niches and validate product demand before investing.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Store Setup & Design</h3>
              <p className="text-sm sm:text-base text-gray-300">Build professional-looking dropshipping stores that convert visitors into customers. Learn about themes, page optimization, and user experience best practices.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Marketing & Advertising</h3>
              <p className="text-sm sm:text-base text-gray-300">Master Facebook ads, Google ads, and organic marketing strategies. Learn how to create compelling ad creatives and optimize your campaigns for maximum ROI.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Supplier Management</h3>
              <p className="text-sm sm:text-base text-gray-300">Find reliable suppliers, negotiate better prices, and establish strong relationships. Learn about quality control and shipping optimization strategies.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Customer Service Excellence</h3>
              <p className="text-sm sm:text-base text-gray-300">Provide outstanding customer support to build trust and increase repeat sales. Handle returns, refunds, and customer inquiries professionally.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Scaling & Automation</h3>
              <p className="text-sm sm:text-base text-gray-300">Scale your dropshipping business efficiently using automation tools and proven systems. Learn how to manage multiple products and increase profit margins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Categories Filter */}
      <section className="py-6 sm:py-8 px-2 sm:px-4">
        <div className="container mx-auto">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 w-full max-w-2xl">
              <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1">
                {[
                  { key: 'all', label: 'All Dropshipping Videos' },
                  { key: 'shorts', label: 'Shorts' },
                  { key: 'full', label: 'Complete Tutorials' }
                ].map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key as 'all' | 'shorts' | 'full')}
                    className={`w-full sm:flex-1 px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
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
      <section id="videos-section" className="py-8 sm:py-12 px-2 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-2">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dropshipping Videos</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg px-2">
              Learn from our comprehensive dropshipping tutorials and grow your e-commerce business with proven strategies
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16 sm:py-20">
              <div className="animate-spin rounded-full h-10 sm:h-12 w-10 sm:w-12 border-b-2 border-blue-400"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
                <div className="text-center mt-8 sm:mt-12 px-2">
                  <Button
                    onClick={loadMore}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base md:text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  >
                    Load More Dropshipping Videos
                  </Button>
                </div>
              )}

              {filteredVideos.length === 0 && (
                <div className="text-center py-16 sm:py-20">
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg px-2">No dropshipping videos available in this category yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-2 sm:px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dropshipping Journey?</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Join thousands of successful entrepreneurs who have built profitable dropshipping businesses with our proven strategies and comprehensive training materials.
            </p>
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full text-sm sm:text-base md:text-xl font-semibold transform hover:scale-105 transition-all duration-300">
              Start Your Dropshipping Business Today
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
