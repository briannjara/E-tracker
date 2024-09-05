import React from 'react';
import { useUser } from '@clerk/nextjs';

const WelcomeMessage = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="mb-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <h1 className="text-3xl font-bold text-white mb-2">
        Welcome back, {user.firstName}!
      </h1>
      <p className="text-gray-300">
        Here's an overview of your financial status.
      </p>
    </div>
  );
};

export default WelcomeMessage;