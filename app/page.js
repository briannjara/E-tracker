"use client";
import Header from "./_componets/Header";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white">
        <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col items-center">
          <div className="max-w-3xl text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Manage your Expenses.
              <span className="block mt-2 text-primary">
                Control your Money.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Save time and money by using our platform to manage your expenses.
            </p>
            <button
              className="px-8 py-3 bg-primary text-white font-medium rounded-full text-lg shadow-lg hover:bg-blue-700 transition duration-300"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
          <Image
            src="/hero-2.jpg"
            alt="Hero Image"
            width={1000}
            height={600}
            className="rounded-xl shadow-2xl"
          />
        </section>
      </main>
    </div>
  );
}
