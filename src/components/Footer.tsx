import { Link } from "react-router-dom";
import { Youtube, Facebook, Send, Instagram, Linkedin, Mail } from "lucide-react";
const Footer = () => {
  return <footer className="bg-slate-900/50 border-t border-white/10">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Youtube className="h-6 md:h-8 w-6 md:w-8 text-red-600" />
              <span className="text-lg md:text-2xl font-bold text-white">Dropshipping Academy</span>
            </div>
            <p className="text-gray-300 text-sm md:text-base">
              Your ultimate guide to successful dropshipping. Learn proven strategies, tips, and techniques to build a profitable dropshipping business from scratch.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <Mail className="h-4 w-4 text-blue-400" />
              <a href="mailto:contact@dropshippingacademy.com" className="text-sm md:text-base hover:text-blue-400 transition-colors">contact: telugudropshipper@gmail.com</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white text-sm md:text-base">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block hover:text-red-600 transition-colors text-gray-300 text-sm md:text-base">Home</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-xs lg:text-sm xl:text-base">About</Link>
              <Link to="/contact" className="block hover:text-red-600 transition-colors text-gray-300 text-sm md:text-base">Contact</Link>
              <Link to="/privacy-policy" className="block hover:text-red-600 transition-colors text-gray-300 text-sm md:text-base">Privacy Policy</Link>
              <Link to="/terms-conditions" className="block hover:text-red-600 transition-colors text-gray-300 text-sm md:text-base">Terms & Conditions</Link>
              <Link to="/disclaimer" className="block hover:text-red-600 transition-colors text-gray-300 text-sm md:text-base">Disclaimer</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white text-sm md:text-base">Dropshipping Resources</h3>
            <div className="space-y-2">
              <p className="text-gray-300 hover:text-white transition-colors cursor-pointer text-sm md:text-base">Product Research Tools</p>
              <p className="text-gray-300 hover:text-white transition-colors cursor-pointer text-sm md:text-base">Store Setup Guide</p>
              <p className="text-gray-300 hover:text-white transition-colors cursor-pointer text-sm md:text-base">Marketing Strategies</p>
              <p className="text-gray-300 hover:text-white transition-colors cursor-pointer text-sm md:text-base">Success Case Studies</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white text-sm md:text-base">Follow Our Dropshipping Journey</h3>
            <div className="flex space-x-4">
              <Youtube className="h-5 w-5 md:h-6 md:w-6 hover:text-red-600 transition-colors cursor-pointer text-gray-300" />
              <Facebook className="h-5 w-5 md:h-6 md:w-6 hover:text-blue-600 transition-colors cursor-pointer text-gray-300" />
              <Send className="h-5 w-5 md:h-6 md:w-6 hover:text-blue-400 transition-colors cursor-pointer text-gray-300" />
              <Instagram className="h-5 w-5 md:h-6 md:w-6 hover:text-pink-600 transition-colors cursor-pointer text-gray-300" />
              <Linkedin className="h-5 w-5 md:h-6 md:w-6 hover:text-blue-700 transition-colors cursor-pointer text-gray-300" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-300">
          <p className="text-sm md:text-base">© 2025 Dropshipping Academy. All rights reserved. Built for dropshipping success and e-commerce education.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
