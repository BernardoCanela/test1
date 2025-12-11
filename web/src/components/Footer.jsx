"use client";

import { Instagram, Linkedin, Facebook } from "lucide-react";
import { useLanguage } from "@/utils/useLanguage";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";

export default function Footer() {
  const { language } = useLanguage();
  const t = language === "pt" ? pt : en;

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <img
              src="https://ucarecdn.com/7b2ce1db-127b-490b-891e-4d927b0ce4e3/-/format/auto/"
              alt="Mindframe Media"
              className="h-10 w-auto mb-4"
            />
            <p className="font-poppins text-sm text-gray-400">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-bold text-[#FF0000] mb-4">
              {language === "pt" ? "Links Rápidos" : "Quick Links"}
            </h4>
            <ul className="space-y-2 font-poppins text-sm">
              <li>
                <a
                  href="/about"
                  className="hover:text-[#FF0000] transition-colors"
                >
                  {t.header.about}
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-[#FF0000] transition-colors"
                >
                  {t.header.services}
                </a>
              </li>
              <li>
                <a
                  href="/portfolio"
                  className="hover:text-[#FF0000] transition-colors"
                >
                  {t.header.portfolio}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#FF0000] transition-colors"
                >
                  {t.header.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-montserrat font-bold text-[#FF0000] mb-4">
              {language === "pt" ? "O Que Fazemos" : "What We Do"}
            </h4>
            <ul className="space-y-2 font-poppins text-sm">
              <li>
                <a
                  href="/websites"
                  className="hover:text-[#FF0000] transition-colors"
                >
                  Websites
                </a>
              </li>
              <li>
                <a
                  href="/studio"
                  className="hover:text-[#FF0000] transition-colors"
                >
                  {language === "pt" ? "Aluguer de Estúdio" : "Studio Rental"}
                </a>
              </li>
              <li>
                <a
                  href="/content"
                  className="hover:text-[#FF0000] transition-colors"
                >
                  {language === "pt"
                    ? "Produção de Conteúdo"
                    : "Content Production"}
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="hover:text-[#FF0000] transition-colors"
                >
                  {language === "pt"
                    ? "Cobertura de Eventos"
                    : "Event Coverage"}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-montserrat font-bold text-[#FF0000] mb-4">
              {language === "pt" ? "Entre em Contacto" : "Get In Touch"}
            </h4>
            <ul className="space-y-2 font-poppins text-sm text-gray-400">
              <li>Rua Pinheiro, 363</li>
              <li>4410-037 Serzedo, Vila Nova de Gaia</li>
              <li>
                <a
                  href="mailto:geral@mindframe.media"
                  className="hover:text-[#FF0000] transition-colors"
                >
                  geral@mindframe.media
                </a>
              </li>
              <li>
                <a
                  href="tel:+351928044666"
                  className="hover:text-[#FF0000] transition-colors"
                >
                  +351 928 044 666
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF0000] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF0000] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF0000] transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center font-poppins text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Mindframe Media. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
