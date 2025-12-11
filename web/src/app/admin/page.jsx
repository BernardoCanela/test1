"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/utils/useUser";
import useAuth from "@/utils/useAuth";

export default function AdminLoginPage() {
  const { data: user, loading } = useUser();
  const { signInWithCredentials } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Se já está autenticado como admin, redireciona
  useEffect(() => {
    if (!loading && user?.email === "geral@mindframe.media") {
      window.location.href = "/admin/dashboard";
    }
  }, [user, loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Verifica se é o email do admin
    if (email !== "geral@mindframe.media") {
      setError("Access denied. Admin only.");
      return;
    }

    setIsLoading(true);

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/admin/dashboard",
        redirect: true,
      });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (user?.email === "geral@mindframe.media") {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-montserrat mb-2">
            Admin <span className="text-[#FF0000]">Login</span>
          </h1>
          <p className="text-gray-400 font-poppins">
            Mindframe Media Dashboard
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2 font-poppins"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0000] font-poppins"
              placeholder="geral@mindframe.media"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2 font-poppins"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0000] font-poppins"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF0000] text-white py-3 rounded-lg font-semibold font-poppins hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
