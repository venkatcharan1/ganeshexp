import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [{
    name: "Home",
    href: "/"
  }, {
    name: "Privacy Policy",
    href: "/privacy-policy"
  }, {
    name: "Terms & Conditions",
    href: "/terms-conditions"
  }, {
    name: "Disclaimer",
    href: "/disclaimer"
  }, {
    name: "Contact",
    href: "/contact"
  }];
  return <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-white/10 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Youtube className="h-6 md:h-8 w-6 md:w-8 text-red-600" />
            <span className="text-lg md:text-2xl font-bold text-white">Dropshipping Academy</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map(item => <Link key={item.name} to={item.href} className="text-gray-300 hover:text-white transition-colors duration-200 relative group text-sm lg:text-base">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>)}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:bg-white/10">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && <div className="md:hidden py-4 animate-fade-in bg-slate-900/95 backdrop-blur-sm rounded-b-lg border-t border-white/10">
            <nav className="flex flex-col space-y-4 px-4">
              {navItems.map(item => <Link key={item.name} to={item.href} className="text-gray-300 hover:text-white transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>)}
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;