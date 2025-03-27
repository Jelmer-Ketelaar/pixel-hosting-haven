
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const AuthVerify: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Link to="/">
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>
      </Link>
      
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="w-full max-w-md bg-background rounded-xl shadow-sm border p-8 text-center">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Check your email</h1>
          
          <p className="text-muted-foreground mb-6">
            We've sent you a verification link. Please check your email and click the link to verify your account.
          </p>
          
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/auth">
                Return to Login
              </Link>
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Didn't receive an email? Check your spam folder or contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthVerify;
