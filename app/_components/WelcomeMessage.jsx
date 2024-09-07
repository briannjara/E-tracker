import React from "react";
import { useUser } from "@clerk/nextjs";
import { AlertCircleIcon } from "lucide-react";

const WelcomeMessage = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="mb-8 bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">
          <span className="bg-clip-text text-transparent  bg-gradient-to-r from-green-400 to-blue-500">
            Welcome back, {user.fullName}!
          </span>{" "}
          <span>👋</span>
        </h1> 
        
        <div className="flex items-center gap-2 text-slate-400 font-semibold">
          <AlertCircleIcon className="w-5 h-5 text-blue-400" />
          <p>Click the start tour button below in the dashboard to start the tour</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
