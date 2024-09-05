import React from 'react';
import { DollarSign } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <DollarSign className="h-8 w-8 text-blue-500" />
      <span className="text-xl font-bold text-gray-800">FinTrack</span>
    </div>
  );
};

export default Logo;