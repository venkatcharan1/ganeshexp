import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Users, Award, BookOpen, Target, TrendingUp } from "lucide-react";
const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const features = [{
    icon: BookOpen,
    title: "Comprehensive Training",
    description: "Complete dropshipping course from beginner to advanced level with practical examples"
  }, {
    icon: Target,
    title: "Proven Strategies",
    description: "Learn winning product research techniques and marketing strategies that actually work"
  }, {
    icon: Users,
    title: "Expert Guidance",
    description: "Step-by-step tutorials and mentorship from successful dropshipping entrepreneurs"
  }, {
    icon: TrendingUp,
    title: "Business Growth",
    description: "Scale your dropshipping business with advanced automation and optimization techniques"
  }];
  const stats = [{
    number: "10,000+",
    label: "Students Trained"
  }, {
    number: "95%",
    label: "Success Rate"
  }, {
    number: "5 Years",
    label: "Experience"
  }, {
    number: "24/7",
    label: "Support"
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className={`py-16 lg:py-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                About Dropshipping Academy
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                Your trusted partner in building a successful dropshipping business from the ground up
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className={`py-12 lg:py-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                    Our Mission
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
                    We believe that everyone deserves the opportunity to build a successful online business. 
                    Our mission is to provide comprehensive, practical dropshipping education that transforms 
                    beginners into confident entrepreneurs.
                  </p>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    Through proven strategies, hands-on training, and ongoing support, we've helped thousands 
                    of students build profitable dropshipping businesses that provide financial freedom and 
                    lifestyle flexibility.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">What Sets Us Apart</h3>
                  <ul className="space-y-3">
                    {["Real-world experience from successful entrepreneurs", "Updated strategies that work in today's market", "Comprehensive support from start to scale", "Proven track record with 10,000+ students"].map((item, index) => <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-300">{item}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - The responsive part you mentioned */}
        <section className={`py-12 lg:py-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {features.map((feature, index) => <div key={index} className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-red-500 mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        

        {/* CTA Section */}
        <section className={`py-12 lg:py-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-red-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8">
                  Join thousands of successful entrepreneurs who have transformed their lives through dropshipping
                </p>
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 lg:px-12 rounded-full text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
                  Get Started Today
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default About;