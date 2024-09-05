import React from 'react';
import { useUser } from '@clerk/nextjs';

const WelcomeMessage = () => {
  const { user } = useUser();

  if (!user) return null;

  const firstName = user.firstName || 'there';

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md mb-6">
      <h1 className="text-3xl font-bold">Welcome, {firstName}!</h1>
      <p className="mt-2 text-blue-100">Let's manage your finances today.</p>
    </div>
  );
};

export default WelcomeMessage;