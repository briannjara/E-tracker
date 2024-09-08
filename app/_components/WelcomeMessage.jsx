import React from "react";
import { useUser } from "@clerk/nextjs";
import { AlertCircleIcon, AlertTriangleIcon } from "lucide-react";

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

        <div className="flex items-start gap-5 p-4">
          <AlertCircleIcon className="w-10 h-10 text-blue-400 flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <p className="font-semibold text-xl text-white">
              Click the start tour button below in the dashboard to start the
              tour
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-yellow-200 bg-yellow-500/10 p-3 rounded-md flex items-center gap-3">
                <AlertTriangleIcon className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                This app is currently in beta. Some features may be experimental
                or under development.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
