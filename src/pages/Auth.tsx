
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LoginForm, { LoginFormValues } from '@/components/auth/LoginForm';
import RegisterForm, { RegisterFormValues } from '@/components/auth/RegisterForm';
import AuthHeader from '@/components/auth/AuthHeader';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const onLoginSubmit = async (values: LoginFormValues) => {
    try {
      // Update state to save the email across form switches
      setFormValues(prevValues => ({
        ...prevValues,
        email: values.email,
      }));
      await signIn(values.email, values.password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    try {
      // Update state to save the email across form switches
      setFormValues(prevValues => ({
        ...prevValues,
        email: values.email,
      }));
      await signUp(values.email, values.password, values.fullName);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Button 
        variant="ghost" 
        className="absolute top-4 left-4 flex items-center"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Button>
      
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="w-full max-w-md bg-background rounded-xl shadow-sm border p-8">
          <AuthHeader 
            title={isLogin ? "Welcome Back" : "Create Account"}
            description={isLogin 
              ? "Sign in to manage your Minecraft servers" 
              : "Join us and start hosting your Minecraft servers"}
          />

          {isLogin ? (
            <LoginForm 
              onSubmit={onLoginSubmit}
              isLoading={isLoading}
              defaultValues={{ email: formValues.email, password: "" }}
            />
          ) : (
            <RegisterForm 
              onSubmit={onRegisterSubmit}
              isLoading={isLoading}
              defaultValues={{ 
                email: formValues.email, 
                password: "", 
                confirmPassword: "", 
                fullName: "" 
              }}
            />
          )}

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-primary hover:underline text-sm"
              onClick={handleToggleMode}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
