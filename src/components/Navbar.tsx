
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import Button from './Button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    // Only scroll if we're on the home page
    if (window.location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    } else {
      // If not on home page, navigate to home and then scroll
      navigate(`/#${sectionId}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-white/80 backdrop-blur-md shadow-sm dark:bg-background/80' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">PixelHost</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className="navbar-link">Home</Link>
          <button onClick={() => scrollToSection('pricing')} className="navbar-link">Pricing</button>
          <button onClick={() => scrollToSection('features')} className="navbar-link">Features</button>
          <Link to="/about" className="navbar-link">About</Link>
          <button onClick={() => scrollToSection('contact')} className="navbar-link">Contact</button>
          {user && <Link to="/dashboard" className="navbar-link">Dashboard</Link>}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="px-4 flex items-center gap-2">
                  <User size={16} />
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()}>Logout</Button>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
        
        <button 
          className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute w-full bg-background border-b border-border transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
          <Link to="/" className="block py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <button onClick={() => scrollToSection('pricing')} className="block py-2 hover:text-primary text-left">Pricing</button>
          <button onClick={() => scrollToSection('features')} className="block py-2 hover:text-primary text-left">Features</button>
          <Link to="/about" className="block py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>About</Link>
          <button onClick={() => scrollToSection('contact')} className="block py-2 hover:text-primary text-left">Contact</button>
          {user && <Link to="/dashboard" className="block py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>}
          
          <div className="flex flex-col space-y-2 pt-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Dashboard</Button>
                </Link>
                <Button className="w-full" onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
