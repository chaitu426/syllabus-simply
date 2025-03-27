import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Settings, LogIn, UserPlus, User } from 'lucide-react';

const Header = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('https://syllabus-simply.onrender.com/api/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          console.error('Invalid token, logging out...');
          handleLogout();
          return;
        }

        if (!response.ok) throw new Error('Failed to fetch user');

        const data = await response.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data)); // Store user in local storage
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/'); // Redirect to home
  };

  const isHomepage = location.pathname === '/';

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
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button 
                  onClick={handleLogout} 
                  className="text-foreground/90 hover:text-foreground transition-colors"
                >
                  Logout
                </button>
                <Link to="/Settings" className="text-foreground/90 hover:text-foreground transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center space-x-1 text-foreground/90 hover:text-foreground transition-colors">
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="btn-primary">
                  <span className="flex items-center">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </span>
                </Link>
              </>
            )}
          </div>
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
            {user ? (
              <>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center space-x-2 py-2 px-4 hover:bg-secondary rounded-lg"
                >
                  Logout
                </button>
                <Link 
                  to="/Settings" 
                  className="flex items-center space-x-2 py-2 px-4 hover:bg-secondary rounded-lg"
                  onClick={closeMobileMenu}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 py-2 px-4 hover:bg-secondary rounded-lg"
                  onClick={closeMobileMenu}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/signup" 
                  className="btn-primary text-center"
                  onClick={closeMobileMenu}
                >
                  <span className="flex items-center justify-center">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </span>
                </Link>
              </>
            )}
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
