
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />

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
