
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Play, TrendingUp, Users, Award, ArrowRight } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  youtubeUrl?: string;
  category: 'shorts' | 'full';
  createdAt: string;
}

const Index = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const savedVideos = localStorage.getItem('ganeshdrsr-videos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    }
  }, []);

  const stats = [
    { icon: Play, label: "Videos Published", value: videos.length.toString() },
    { icon: TrendingUp, label: "Success Rate", value: "95%" },
    { icon: Users, label: "Students Helped", value: "10K+" },
    { icon: Award, label: "Years Experience", value: "5+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Master Dropshipping with Ganeshdrsr
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn proven strategies and techniques to build a successful dropshipping business. 
              Watch comprehensive tutorials, get insider tips, and transform your entrepreneurial journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Start Learning <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Latest Videos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2 group animate-fade-in">
                <stat.icon className="h-8 w-8 mx-auto text-red-600 group-hover:scale-110 transition-transform" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Ganeshdrsr</h2>
              <p className="text-xl text-muted-foreground">
                Your trusted guide in the world of dropshipping
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-semibold">Empowering Entrepreneurs Worldwide</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ganeshdrsr is dedicated to helping aspiring entrepreneurs succeed in dropshipping. 
                  With years of experience and proven strategies, we provide comprehensive tutorials, 
                  market insights, and practical tips that actually work.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to democratize e-commerce education and make dropshipping accessible 
                  to everyone, regardless of their background or experience level. Join thousands of 
                  successful students who have transformed their lives through our guidance.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>Proven dropshipping strategies that generate real results</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>Step-by-step tutorials for beginners and advanced users</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>Market research and product selection guidance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>Marketing and scaling techniques for sustainable growth</span>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-fade-in">
                <div className="aspect-square bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-2xl font-bold">G</span>
                    </div>
                    <h4 className="text-xl font-semibold">Ganeshdrsr</h4>
                    <p className="text-muted-foreground">Dropshipping Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Videos</h2>
            <p className="text-xl text-muted-foreground">
              Watch our latest dropshipping tutorials and insights
            </p>
          </div>
          
          {videos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <Play className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground mb-4">No videos available yet</p>
              <p className="text-muted-foreground">Check back soon for exciting dropshipping content!</p>
            </div>
          )}
        </div>
      </section>

      {/* Dropshipping Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">Why Dropshipping?</h2>
            <p className="text-xl text-muted-foreground">
              Discover the benefits of dropshipping and why it's the perfect business model for modern entrepreneurs
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Low Startup Costs</h3>
                <p className="text-muted-foreground">
                  Start your business with minimal investment. No need for inventory or warehouse storage.
                </p>
              </div>
              
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Global Reach</h3>
                <p className="text-muted-foreground">
                  Sell to customers worldwide without geographical limitations or shipping complexities.
                </p>
              </div>
              
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Scalable Business</h3>
                <p className="text-muted-foreground">
                  Scale your business rapidly without the constraints of traditional retail models.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 text-center">
            <div className="h-32 flex items-center justify-center">
              <div className="w-full max-w-2xl h-24 bg-white/50 dark:bg-black/20 rounded border-2 border-dashed border-gray-300 dark:border-gray-600"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
