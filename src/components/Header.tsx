import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
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
  return <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Youtube className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">Dropshipping Academy</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <Link key={item.name} to={item.href} className="text-foreground/80 hover:text-foreground transition-colors duration-200 relative group">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>)}
            <ThemeToggle />
          </nav>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navItems.map(item => <Link key={item.name} to={item.href} className="text-foreground/80 hover:text-foreground transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>)}
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;