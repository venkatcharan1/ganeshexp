import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Play, TrendingUp, Users, Award, ArrowRight, Grid, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  video_file_path: string;
  youtube_url?: string;
  category: 'shorts' | 'full';
  created_at: string;
}
const Index = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'shorts' | 'full'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const videosPerPage = 10;
  useEffect(() => {
    fetchVideos();
  }, []);
  useEffect(() => {
    filterVideos();
  }, [videos, activeCategory]);
  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const {
        data,
        error
      } = await supabase.from('videos').select('*').order('created_at', {
        ascending: false
      });
      if (error) {
        console.error('Error fetching videos:', error);
        return;
      }

      // Cast the data to ensure proper typing
      const typedVideos: Video[] = (data || []).map(video => ({
        ...video,
        category: video.category as 'shorts' | 'full'
      }));
      setVideos(typedVideos);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const filterVideos = () => {
    if (activeCategory === 'all') {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(videos.filter(video => video.category === activeCategory));
    }
    setCurrentPage(1);
  };
  const stats = [{
    icon: Play,
    label: "Videos Published",
    value: videos.length.toString()
  }, {
    icon: TrendingUp,
    label: "Success Rate",
    value: "95%"
  }, {
    icon: Users,
    label: "Students Helped",
    value: "10K+"
  }, {
    icon: Award,
    label: "Years Experience",
    value: "5+"
  }];
  const paginatedVideos = filteredVideos.slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const categoryButtons = [{
    key: 'all',
    label: 'All Videos',
    count: videos.length
  }, {
    key: 'shorts',
    label: 'Shorts',
    count: videos.filter(v => v.category === 'shorts').length
  }, {
    key: 'full',
    label: 'Full Videos',
    count: videos.filter(v => v.category === 'full').length
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 animate-pulse"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-up leading-tight">
              Master Dropshipping with Ganeshdrsr
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-up" style={{
            animationDelay: '0.2s'
          }}>
              Learn proven strategies and techniques to build a successful dropshipping business. 
              Watch comprehensive tutorials, get insider tips, and transform your entrepreneurial journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-up" style={{
            animationDelay: '0.4s'
          }}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8 py-6 text-lg">
                Start Learning <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105 px-8 py-6 text-lg border-2">
                Watch Latest Videos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => <div key={index} className="text-center space-y-4 group animate-fade-in hover:scale-110 transition-all duration-500" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="relative">
                  <stat.icon className="h-12 w-12 mx-auto text-blue-600 group-hover:text-indigo-600 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl group-hover:bg-indigo-600/30 transition-all duration-300"></div>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">About Academy </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your trusted guide in the world of dropshipping
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-slide-in-left">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Empowering Entrepreneurs Worldwide</h3>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                  <p>GaneshEXP is dedicated to helping aspiring entrepreneurs succeed in dropshipping. With years of experience and proven strategies, we provide comprehensive tutorials, market insights, and practical tips that actually work.</p>
                  <p>
                    Our mission is to democratize e-commerce education and make dropshipping accessible 
                    to everyone, regardless of their background or experience level. Join thousands of 
                    successful students who have transformed their lives through our guidance.
                  </p>
                </div>
                <div className="space-y-6">
                  {["Proven dropshipping strategies that generate real results", "Step-by-step tutorials for beginners and advanced users", "Market research and product selection guidance", "Marketing and scaling techniques for sustainable growth"].map((item, index) => <div key={index} className="flex items-center space-x-4 animate-slide-in-right" style={{
                  animationDelay: `${index * 0.1}s`
                }}>
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                    </div>)}
                </div>
              </div>
              
              <div className="relative animate-slide-in-right">
                <div className="aspect-square bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/50 dark:border-slate-700/50">
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                      <span className="text-white text-4xl font-bold">G</span>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">GaneshEXP</h4>
                    <p className="text-muted-foreground text-lg">Dropshipping Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Latest Videos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch our latest dropshipping tutorials and insights
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-in-up">
            {categoryButtons.map((category, index) => <Button key={category.key} variant={activeCategory === category.key ? "default" : "outline"} onClick={() => setActiveCategory(category.key as 'all' | 'shorts' | 'full')} className={`px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 ${activeCategory === category.key ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800'} animate-fade-in`} style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <Filter className="h-4 w-4 mr-2" />
                {category.label} ({category.count})
              </Button>)}
          </div>
          
          {isLoading ? <div className="text-center py-16 animate-fade-in">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-muted-foreground mt-4">Loading videos...</p>
            </div> : filteredVideos.length > 0 ? <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                {paginatedVideos.map((video, index) => <VideoCard key={video.id} {...video} index={index} />)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && <div className="flex justify-center items-center gap-4 animate-fade-in">
                  <Button variant="outline" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800">
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    {Array.from({
                length: totalPages
              }, (_, i) => i + 1).map(page => <Button key={page} variant={currentPage === page ? "default" : "outline"} onClick={() => setCurrentPage(page)} className={`w-10 h-10 ${currentPage === page ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800'}`}>
                        {page}
                      </Button>)}
                  </div>
                  
                  <Button variant="outline" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800">
                    Next
                  </Button>
                </div>}
            </> : <div className="text-center py-16 animate-fade-in">
              <Grid className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
              <p className="text-2xl text-muted-foreground mb-4">No videos available yet</p>
              <p className="text-muted-foreground text-lg">Check back soon for exciting dropshipping content!</p>
            </div>}
        </div>
      </section>

      {/* Dropshipping Info Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center space-y-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Why Dropshipping?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the benefits of dropshipping and why it's the perfect business model for modern entrepreneurs
            </p>
            
            <div className="grid md:grid-cols-3 gap-12 mt-16">
              {[{
              icon: TrendingUp,
              title: "Low Startup Costs",
              description: "Start your business with minimal investment. No need for inventory or warehouse storage."
            }, {
              icon: Users,
              title: "Global Reach",
              description: "Sell to customers worldwide without geographical limitations or shipping complexities."
            }, {
              icon: Award,
              title: "Scalable Business",
              description: "Scale your business rapidly without the constraints of traditional retail models."
            }].map((item, index) => <div key={index} className="space-y-6 group animate-slide-in-up hover:scale-105 transition-all duration-500" style={{
              animationDelay: `${index * 0.2}s`
            }}>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <item.icon className="h-10 w-10 text-blue-600" />
                    </div>
                    <div className="absolute inset-0 bg-blue-600/20 rounded-2xl blur-xl group-hover:bg-indigo-600/30 transition-all duration-300"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <section className="py-12 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-white to-gray-50 dark:from-slate-700 dark:to-gray-700 rounded-2xl p-12 text-center shadow-xl animate-fade-in">
            <div className="h-40 flex items-center justify-center">
              <div className="w-full max-w-4xl h-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-600 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-blue-600 text-lg font-medium">Advertisement Space</div>
                  <div className="text-muted-foreground text-sm">Premium placement available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;