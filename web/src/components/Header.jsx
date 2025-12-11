"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/utils/useLanguage";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = language === "pt" ? pt : en;

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-[#FF0000]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="https://ucarecdn.com/7b2ce1db-127b-490b-891e-4d927b0ce4e3/-/format/auto/"
              alt="Mindframe Media"
              className="h-24 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="font-poppins hover:text-[#FF0000] transition-colors"
            >
              {t.header.home}
            </a>
            <a
              href="/about"
              className="font-poppins hover:text-[#FF0000] transition-colors"
            >
              {t.header.about}
            </a>
            <a
              href="/services"
              className="font-poppins hover:text-[#FF0000] transition-colors"
            >
              {t.header.services}
            </a>
            <a
              href="/portfolio"
              className="font-poppins hover:text-[#FF0000] transition-colors"
            >
              {t.header.portfolio}
            </a>
            <a
              href="/contact"
              className="bg-[#FF0000] text-white px-6 py-2 rounded font-montserrat font-bold hover:bg-[#CC0000] transition-colors"
            >
              {t.header.contact}
            </a>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 border-l border-gray-600 pl-6">
              <button
                onClick={() => setLanguage("pt")}
                className={`font-poppins transition-colors ${
                  language === "pt"
                    ? "text-[#FF0000] font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                PT
              </button>
              <span className="text-gray-600">|</span>
              <button
                onClick={() => setLanguage("en")}
                className={`font-poppins transition-colors ${
                  language === "en"
                    ? "text-[#FF0000] font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:text-[#FF0000] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#FF0000]">
            <div className="flex flex-col space-y-4">
              <a
                href="/"
                className="font-poppins hover:text-[#FF0000] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.header.home}
              </a>
              <a
                href="/about"
                className="font-poppins hover:text-[#FF0000] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.header.about}
              </a>
              <a
                href="/services"
                className="font-poppins hover:text-[#FF0000] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.header.services}
              </a>
              <a
                href="/portfolio"
                className="font-poppins hover:text-[#FF0000] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.header.portfolio}
              </a>
              <a
                href="/contact"
                className="bg-[#FF0000] text-white px-6 py-2 rounded font-montserrat font-bold hover:bg-[#CC0000] transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.header.contact}
              </a>

              {/* Language Switcher Mobile */}
              <div className="flex items-center justify-center space-x-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setLanguage("pt")}
                  className={`font-poppins transition-colors ${
                    language === "pt"
                      ? "text-[#FF0000] font-bold"
                      : "text-gray-400"
                  }`}
                >
                  PT
                </button>
                <span className="text-gray-600">|</span>
                <button
                  onClick={() => setLanguage("en")}
                  className={`font-poppins transition-colors ${
                    language === "en"
                      ? "text-[#FF0000] font-bold"
                      : "text-gray-400"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
