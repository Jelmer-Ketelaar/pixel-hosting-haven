
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        
        <Link to="/">
          <Button 
            leftIcon={<ArrowLeft size={16} />}
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
