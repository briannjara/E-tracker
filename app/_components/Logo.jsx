import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/dashboard" className="flex items-center space-x-2 group">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white transition-transform duration-300 ease-in-out group-hover:scale-110"
      >
        <path
          d="M20 3L3 11.5L20 20L37 11.5L20 3Z"
          className="fill-current animate-pulse"
        />
        <path
          d="M3 28.5L20 37L37 28.5V11.5L20 20L3 11.5V28.5Z"
          className="fill-current opacity-70"
        />
        <path
          d="M15 22V30L20 32.5L25 30V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw"
        />
      </svg>
      <span className="text-2xl font-bold text-white transition-colors duration-300 ease-in-out group-hover:text-blue-300">
        FinanSmart
      </span>
    </Link>
  );
};

export default Logo;

// Add this CSS to your global styles or a separate CSS module
`
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.animate-draw {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw 2s ease-in-out infinite alternate;
}
`