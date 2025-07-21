
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
    
    // Scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    // Observe all sections with scroll-animate class
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach((el) => observer.observe(el));

    // Load Visme forms script after component mounts
    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      // Clean up script if component unmounts
      const existingScript = document.querySelector('script[src="https://static-bundles.visme.co/forms/vismeforms-embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
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
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2 text-base sm:text-xl md:text-2xl font-bold text-white">
              <Youtube className="h-6 sm:h-8 md:h-10 lg:h-12 w-6 sm:w-8 md:w-10 lg:w-12 text-red-600" />
              <span className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Dropshipping Academy</span>
            </div>
            <div className="hidden md:flex space-x-2 lg:space-x-4 xl:space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors text-xs lg:text-sm xl:text-base">Home</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-xs lg:text-sm xl:text-base">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-xs lg:text-sm xl:text-base">Contact</Link>
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-xs lg:text-sm xl:text-base">Privacy Policy</Link>
              <Link to="/terms-conditions" className="text-gray-300 hover:text-white transition-colors text-xs lg:text-sm xl:text-base">Terms & Conditions</Link>
              <Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors text-xs lg:text-sm xl:text-base">Disclaimer</Link>
            </div>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <details className="dropdown">
                <summary className="text-white cursor-pointer list-none">
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </summary>
                <div className="absolute right-1 sm:right-2 top-10 sm:top-12 bg-slate-900 rounded-lg p-2 sm:p-3 space-y-1 sm:space-y-2 border border-white/10 z-50 min-w-[180px] sm:min-w-[200px]">
                  <Link to="/" className="block text-gray-300 hover:text-white transition-colors text-sm">Home</Link>
                  <Link to="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">About</Link>
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
      <section className="scroll-animate opacity-0 translate-y-8 relative overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 px-2 sm:px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight px-1 sm:px-2">
              Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dropshipping</span> Course
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto px-1 sm:px-2">
              Learn everything about dropshipping from product research to scaling your business. Free comprehensive course available here with step-by-step tutorials, proven strategies, and real case studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center items-center mb-8 sm:mb-10 md:mb-14 px-1 sm:px-2">
              <Button 
                onClick={scrollToVideos}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 rounded-full text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold transform hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-2 h-4 sm:h-6 md:h-7 w-4 sm:w-6 md:w-7" />
                Start Learning Dropshipping
              </Button>
              <Button 
                variant="outline" 
                onClick={scrollToVideos}
                className="w-full sm:w-auto border-blue-400 text-blue-300 bg-blue-600/30 hover:bg-blue-600 hover:text-white hover:border-blue-500 px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 rounded-full text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold transition-all duration-300"
              >
                Watch Free Dropshipping Videos
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-8 sm:mt-12 md:mt-16 px-1 sm:px-2">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <BookOpen className="h-10 sm:h-12 md:h-14 lg:h-16 w-10 sm:w-12 md:w-14 lg:w-16 text-blue-400 mx-auto mb-3 sm:mb-5" />
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">Free Dropshipping Course</h3>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300">Complete dropshipping training from beginner to advanced level</p>
              </div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <TrendingUp className="h-10 sm:h-12 md:h-14 lg:h-16 w-10 sm:w-12 md:w-14 lg:w-16 text-green-400 mx-auto mb-3 sm:mb-5" />
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">Proven Dropshipping Strategies</h3>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300">Learn winning product research, store setup, and marketing techniques</p>
              </div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <Award className="h-10 sm:h-12 md:h-14 lg:h-16 w-10 sm:w-12 md:w-14 lg:w-16 text-yellow-400 mx-auto mb-3 sm:mb-5" />
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">Expert Dropshipping Guidance</h3>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300">Step-by-step tutorials for successful dropshipping business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropshipping Course Benefits Section */}
      <section className="scroll-animate opacity-0 translate-y-8 py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-1 sm:px-2">
              Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dropshipping Course</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto px-1 sm:px-2">
              Our comprehensive dropshipping course covers everything you need to know to build a profitable online business. From finding winning products to scaling your store, we provide practical strategies that work in today's competitive e-commerce landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-1 sm:px-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-5">Product Research Mastery</h3>
              <p className="text-sm sm:text-lg md:text-xl text-gray-300">Learn advanced techniques to find winning products using proven research methods and tools. Discover trending niches and validate product demand before investing.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-5">Store Setup & Design</h3>
              <p className="text-sm sm:text-lg md:text-xl text-gray-300">Build professional-looking dropshipping stores that convert visitors into customers. Learn about themes, page optimization, and user experience best practices.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-5">Marketing & Advertising</h3>
              <p className="text-sm sm:text-lg md:text-xl text-gray-300">Master Facebook ads, Google ads, and organic marketing strategies. Learn how to create compelling ad creatives and optimize your campaigns for maximum ROI.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-5">Supplier Management</h3>
              <p className="text-sm sm:text-lg md:text-xl text-gray-300">Find reliable suppliers, negotiate better prices, and establish strong relationships. Learn about quality control and shipping optimization strategies.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-5">Customer Service Excellence</h3>
              <p className="text-sm sm:text-lg md:text-xl text-gray-300">Provide outstanding customer support to build trust and increase repeat sales. Handle returns, refunds, and customer inquiries professionally.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-5">Scaling & Automation</h3>
              <p className="text-sm sm:text-lg md:text-xl text-gray-300">Scale your dropshipping business efficiently using automation tools and proven systems. Learn how to manage multiple products and increase profit margins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Categories Filter */}
      <section className="scroll-animate opacity-0 translate-y-8 py-6 sm:py-8 md:py-10 px-2 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center space-y-6 sm:space-y-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
              Choose Your Learning Path
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
              {[
                { key: 'all', label: 'All Dropshipping Videos', icon: BookOpen, count: videos.length },
                { key: 'shorts', label: 'Shorts', icon: Play, count: videos.filter(v => v.category === 'shorts').length },
                { key: 'full', label: 'Full Videos', icon: TrendingUp, count: videos.filter(v => v.category === 'full').length }
              ].map((category) => {
                const IconComponent = category.icon;
                const isActive = activeCategory === category.key;
                return (
                  <div
                    key={category.key}
                    onClick={() => setActiveCategory(category.key as 'all' | 'shorts' | 'full')}
                    className={`group relative cursor-pointer p-4 sm:p-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/30 border-2 border-blue-400/50'
                        : 'bg-slate-800/70 backdrop-blur-sm text-gray-300 hover:bg-slate-700/80 hover:text-white border-2 border-slate-700/50 hover:border-slate-600/50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <IconComponent className={`h-6 sm:h-8 w-6 sm:w-8 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                      <span className="text-center font-medium text-sm sm:text-base">{category.label}</span>
                      <div className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-700/50 text-gray-400 group-hover:bg-slate-600/50 group-hover:text-gray-300'
                      }`}>
                        {category.count} videos
                      </div>
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos-section" className="scroll-animate opacity-0 translate-y-8 py-8 sm:py-10 md:py-14 px-2 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-1 sm:px-2">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dropshipping Videos</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg md:text-xl lg:text-2xl px-1 sm:px-2">
              Learn from our comprehensive dropshipping tutorials and grow your e-commerce business with proven strategies
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
              <div className="animate-spin rounded-full h-10 sm:h-12 md:h-14 w-10 sm:w-12 md:w-14 border-b-2 border-blue-400"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
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
                <div className="text-center mt-8 sm:mt-10 md:mt-14 px-1 sm:px-2">
                  <Button
                    onClick={loadMore}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold transform hover:scale-105 transition-all duration-300"
                  >
                    Load More Dropshipping Videos
                  </Button>
                </div>
              )}

              {filteredVideos.length === 0 && (
                <div className="text-center py-12 sm:py-16 md:py-20">
                  <p className="text-gray-400 text-sm sm:text-lg md:text-xl lg:text-2xl px-1 sm:px-2">No dropshipping videos available in this category yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="scroll-animate opacity-0 translate-y-8 py-12 sm:py-16 md:py-20 px-2 sm:px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 px-1 sm:px-2">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dropshipping Journey?</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-1 sm:px-2">
              Join thousands of successful entrepreneurs who have built profitable dropshipping businesses with our proven strategies and comprehensive training materials.
            </p>
            <div className="flex justify-center px-1 sm:px-2">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold transform hover:scale-105 transition-all duration-300 max-w-xs sm:max-w-sm md:max-w-md text-center">
                Start Your Dropshipping Business Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="scroll-animate opacity-0 translate-y-8 py-12 sm:py-16 md:py-20 px-2 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-1 sm:px-2">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Touch</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto px-1 sm:px-2">
              Have questions about our dropshipping course? Want to share your success story? We'd love to hear from you!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-2xl">
              <div 
                className="visme_d rounded-xl sm:rounded-2xl overflow-hidden" 
                data-title="Contact Form" 
                data-url="koeqq00k-contact-form" 
                data-domain="forms" 
                data-full-page="false" 
                data-min-height="500px" 
                data-form-id="136299"
                style={{
                  width: '100%',
                  minHeight: '500px',
                  borderRadius: '1rem'
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
