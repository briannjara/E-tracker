"use client";
import Image from "next/image";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Hero = () => {
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
    <section className="bg-gray-900 text-white flex flex-col items-center">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manage your Expenses.
            <strong className="font-extrabold text-primary sm:block mt-2">
              Control your Money.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-gray-300">
            Save time and money by using our platform to manage your expenses.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 transition duration-300 outline-none sm:w-auto"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <Image
        src="/hero-2.jpg"
        alt="Hero Image"
        width={1000}
        height={700}
        className="-mt-10 rounded-xl border-2 border-gray-700 shadow-2xl"
      />
    </section>
  );
};

export default Hero;
