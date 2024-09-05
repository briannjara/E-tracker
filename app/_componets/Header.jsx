"use client";
import React from "react";
import Button from "../../components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Button onClick={handleGetStarted}>Get Started</Button>
      )}
    </div>
  );
};

export default Header;
