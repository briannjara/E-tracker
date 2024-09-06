import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Menu, X, Home, DollarSign, BarChart2, MessageSquare, TrendingUp, Lock } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Budgets", href: "/dashboard/budgets", icon: DollarSign },
    { name: "Expenses", href: "/dashboard/expenses", icon: BarChart2 },
    { name: "Chat AI", href: "/dashboard/chatai", icon: MessageSquare, premium: true },
    { name: "Upgrade", href: "/dashboard/upgrade", icon: TrendingUp },
  ];

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                item.premium ? (
                  <div
                    key={item.name}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 cursor-not-allowed flex items-center"
                  >
                    {item.name}
                    <Lock className="ml-1 h-3 w-3 text-yellow-400" />
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              item.premium ? (
                <div
                  key={item.name}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                    <Lock className="ml-1 h-3 w-3 text-yellow-400" />
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                </Link>
              )
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}