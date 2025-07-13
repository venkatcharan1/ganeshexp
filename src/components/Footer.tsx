import { Link } from "react-router-dom";
import { Youtube, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Youtube className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold">GaneshEXP</span>
            </div>
            <p className="text-muted-foreground">
              Your ultimate guide to successful dropshipping. Learn strategies, tips, and techniques to build a profitable online business.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block hover:text-red-600 transition-colors">Home</Link>
              <Link to="/privacy-policy" className="block hover:text-red-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="block hover:text-red-600 transition-colors">Terms & Conditions</Link>
              <Link to="/disclaimer" className="block hover:text-red-600 transition-colors">Disclaimer</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Dropshipping</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Product Research</p>
              <p className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Store Setup</p>
              <p className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Marketing Tips</p>
              <p className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Success Stories</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Youtube className="h-6 w-6 hover:text-red-600 transition-colors cursor-pointer" />
              <Facebook className="h-6 w-6 hover:text-blue-600 transition-colors cursor-pointer" />
              <Twitter className="h-6 w-6 hover:text-blue-400 transition-colors cursor-pointer" />
              <Instagram className="h-6 w-6 hover:text-pink-600 transition-colors cursor-pointer" />
              <Linkedin className="h-6 w-6 hover:text-blue-700 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>© 2024 GaneshEXP. All rights reserved. Built for dropshipping success.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
