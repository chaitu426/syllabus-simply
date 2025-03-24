
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if current location is homepage
  const isHomepage = location.pathname === '/';

  // Update header styling on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomepage 
          ? 'py-3 glass' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={closeMobileMenu}
        >
          <span className="font-heading text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            PaperLabs
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <Link 
            to="/dashboard" 
            className="btn-primary"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full py-6 px-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <NavLinks mobile closeMenu={closeMobileMenu} />
            <Link 
              to="/dashboard" 
              className="btn-primary text-center"
              onClick={closeMobileMenu}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLinks = ({ mobile, closeMenu }) => {
  const links = [
    { name: 'Features', path: '/#features' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Pricing', path: '/#pricing' },
  ];

  return links.map((link) => (
    <Link
      key={link.name}
      to={link.path}
      className={`relative text-foreground/90 hover:text-foreground transition-colors ${
        mobile ? 'py-2 px-4 hover:bg-secondary rounded-lg' : 'story-link'
      }`}
      onClick={closeMenu}
    >
      {link.name}
    </Link>
  ));
};

export default Header;
