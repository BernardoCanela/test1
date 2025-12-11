"use client";

import useAuth from "@/utils/useAuth";
import { useEffect } from "react";

function MainComponent() {
  const { signOut } = useAuth();

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    };
    handleSignOut();
  }, [signOut]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
        <h1 className="mb-4 text-3xl font-bold text-black font-montserrat">
          Signing <span className="text-[#FF0000]">Out</span>
        </h1>
        <p className="text-gray-600 font-poppins">Please wait...</p>
      </div>
    </div>
  );
}

export default MainComponent;
