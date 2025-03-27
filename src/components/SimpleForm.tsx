
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SimpleForm: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log('Input value changed:', e.target.value); // Add logging to debug
  };
  
  return (
    <div className="p-4 border rounded-md mt-4">
      <h3 className="text-lg font-medium mb-2">Test Input Field</h3>
      <p className="mb-2">You typed: {inputValue}</p>
      <Input 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Type here to test..." 
        className="mb-2"
      />
      <Button onClick={() => setInputValue('')}>Clear</Button>
    </div>
  );
};

export default SimpleForm;
