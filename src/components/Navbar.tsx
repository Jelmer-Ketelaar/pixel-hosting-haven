
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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

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
          <button onClick={() => scrollToSection('home')} className="navbar-link">Home</button>
          <button onClick={() => scrollToSection('pricing')} className="navbar-link">Pricing</button>
          <button onClick={() => scrollToSection('control')} className="navbar-link">Server Control</button>
          <button onClick={() => scrollToSection('features')} className="navbar-link">Features</button>
          <button onClick={() => scrollToSection('testimonials')} className="navbar-link">Testimonials</button>
          <button onClick={() => scrollToSection('contact')} className="navbar-link">Contact</button>
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
          <button onClick={() => scrollToSection('home')} className="block py-2 hover:text-primary">Home</button>
          <button onClick={() => scrollToSection('pricing')} className="block py-2 hover:text-primary">Pricing</button>
          <button onClick={() => scrollToSection('control')} className="block py-2 hover:text-primary">Server Control</button>
          <button onClick={() => scrollToSection('features')} className="block py-2 hover:text-primary">Features</button>
          <button onClick={() => scrollToSection('testimonials')} className="block py-2 hover:text-primary">Testimonials</button>
          <button onClick={() => scrollToSection('contact')} className="block py-2 hover:text-primary">Contact</button>
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
