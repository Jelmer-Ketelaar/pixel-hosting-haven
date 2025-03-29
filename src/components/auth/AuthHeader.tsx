
import React from 'react';

interface AuthHeaderProps {
  title: string;
  description: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>
      <p className="text-muted-foreground mt-2">
        {description}
      </p>
    </div>
  );
};

export default AuthHeader;
