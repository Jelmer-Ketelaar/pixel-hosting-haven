
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-white/80 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">PixelHost</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/" className="navbar-link">Pricing</Link>
          <Link to="/" className="navbar-link">Features</Link>
          <Link to="/" className="navbar-link">About</Link>
          <Link to="/" className="navbar-link">Contact</Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm">Login</Button>
          <Button>Get Started</Button>
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
          <Link to="/" className="block py-2 hover:text-primary" onClick={toggleMenu}>Home</Link>
          <Link to="/" className="block py-2 hover:text-primary" onClick={toggleMenu}>Pricing</Link>
          <Link to="/" className="block py-2 hover:text-primary" onClick={toggleMenu}>Features</Link>
          <Link to="/" className="block py-2 hover:text-primary" onClick={toggleMenu}>About</Link>
          <Link to="/" className="block py-2 hover:text-primary" onClick={toggleMenu}>Contact</Link>
          <div className="flex flex-col space-y-2 pt-2">
            <Button variant="outline" className="w-full">Login</Button>
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
