"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ArrowRight, DollarSign, BarChart2, Lock, Play } from "lucide-react";

import Logo from "./Logo";

export default function HomeContent() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Logo />
        
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          {isSignedIn ? "Dashboard" : "Get Started"}
        </button>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Master Your Finances with Ease
            </h1>
            <p className="text-xl mb-8 text-gray-400">
              Take control of your budget, track expenses, and achieve your financial goals with FinanSmart.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <video
                src="/dashboard-video.mp4"
                width={600}
                height={400}
                autoPlay
                muted
                playsInline
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold mb-1">FinanSmart Dashboard</h3>
                  <p className="text-sm text-gray-300">Experience intuitive financial management</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition duration-300">
                  <Play className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg transform rotate-3">
              <p className="font-bold">Trusted by 10,000+ users</p>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6 bg-gray-800">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose FinanSmart?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <DollarSign className="h-12 w-12 text-green-500" />, title: "Easy Budgeting", description: "Create and manage budgets with intuitive tools and visualizations." },
                { icon: <BarChart2 className="h-12 w-12 text-blue-500" />, title: "Insightful Analytics", description: "Gain valuable insights into your spending habits and financial trends." },
                { icon: <Lock className="h-12 w-12 text-purple-500" />, title: "Secure & Private", description: "Your financial data is encrypted and protected with bank-level security." },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-300 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
            <p className="text-xl mb-8 text-blue-200">Join thousands of users who have already improved their financial health with FinanSmart.</p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-blue-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300 flex items-center justify-center mx-auto"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-sm text-gray-400">
                &copy; 2024 FinanSmart. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}