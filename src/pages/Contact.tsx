
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Youtube, Menu, Mail } from "lucide-react";

const Contact = () => {
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

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container mx-auto px-2 sm:px-4 max-w-4xl">
          <div className="animate-fade-in text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white">Contact Us</h1>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10 max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                <Mail className="h-12 w-12 sm:h-16 sm:w-16 text-blue-400" />
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Get in Touch</h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6">
                    Have questions about dropshipping? Need help with our tutorials? We're here to help!
                  </p>
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                    <p className="text-gray-300 text-sm sm:text-base mb-2">Send us an email at:</p>
                    <a 
                      href="mailto:telugudropshipper@gmail.com"
                      className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors break-all"
                    >
                      telugudropshipper@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 text-center">
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-2">
                We typically respond within 24-48 hours. For the fastest response, please include as much detail as possible about your question or issue.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
