
import Footer from "@/components/Footer";
import { Mail, Youtube, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xl md:text-2xl font-bold text-white">
              <Youtube className="h-6 md:h-8 w-6 md:w-8 text-red-600" />
              <span>Dropshipping Academy</span>
            </div>
            <div className="hidden md:flex space-x-4 lg:space-x-6">
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
                  <Menu className="h-6 w-6" />
                </summary>
                <div className="absolute right-4 top-16 bg-slate-900 rounded-lg p-4 space-y-2 border border-white/10">
                  <Link to="/" className="block text-gray-300 hover:text-white transition-colors">Home</Link>
                  <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
                  <Link to="/privacy-policy" className="block text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
                  <Link to="/terms-conditions" className="block text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
                  <Link to="/disclaimer" className="block text-gray-300 hover:text-white transition-colors">Disclaimer</Link>
                </div>
              </details>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Contact Us</h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Have questions about dropshipping? Need help with your e-commerce journey? 
                We're here to help you succeed in building your profitable dropshipping business.
              </p>
            </div>

            {/* Email Contact Only */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white">Get in Touch</h2>
              <p className="text-gray-300 mb-6 text-sm md:text-base">
                For all inquiries about our dropshipping courses, business guidance, and support, 
                reach out to us directly via email:
              </p>
              <div className="bg-blue-600/20 rounded-lg p-4 md:p-6 mb-6">
                <a 
                  href="mailto:telugudropshipper@gmail.com" 
                  className="text-blue-400 hover:text-blue-300 text-lg md:text-xl font-medium transition-colors break-all"
                >
                  telugudropshipper@gmail.com
                </a>
              </div>
              <div className="space-y-3 text-gray-300 text-sm md:text-base">
                <p>
                  <strong className="text-white">Response Time:</strong> We typically respond within 24 hours during business days
                </p>
                <p>
                  <strong className="text-white">What we help with:</strong> Product research, store setup, marketing strategies, supplier management, and scaling your dropshipping business
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
