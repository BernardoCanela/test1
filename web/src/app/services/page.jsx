"use client";

import {
  Target,
  Palette,
  Globe,
  Camera,
  CheckCircle,
  Calendar,
} from "lucide-react";
import Button from "@/components/Button";
import { useLanguage } from "@/utils/useLanguage";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = language === "pt" ? pt : en;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-black via-[#1a0000] to-black text-white py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-montserrat font-bold text-5xl md:text-6xl mb-6">
            {t.services.hero.title}{" "}
            <span className="text-[#FF0000]">
              {t.services.hero.titleHighlight}
            </span>
          </h1>
          <p className="font-poppins text-xl text-gray-300 max-w-3xl mx-auto">
            {t.services.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Pillar 1: Business Consulting */}
      <section id="consulting" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[#FF0000] mb-4">
                <Target size={64} />
              </div>
              <h2 className="font-montserrat font-bold text-4xl mb-6">
                {t.services.consulting.title}
              </h2>
              <p className="font-poppins text-lg text-gray-700 mb-6">
                {t.services.consulting.description}
              </p>
              <ul className="space-y-3 font-poppins text-gray-700">
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.consulting.feature1}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.consulting.feature2}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.consulting.feature3}</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
                alt="Business Consulting"
                className="w-full h-96 object-cover border-4 border-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2: Branding & Identity */}
      <section id="branding" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800"
                alt="Branding & Identity"
                className="w-full h-96 object-cover border-4 border-black"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-[#FF0000] mb-4">
                <Palette size={64} />
              </div>
              <h2 className="font-montserrat font-bold text-4xl mb-6">
                {t.services.branding.title}
              </h2>
              <p className="font-poppins text-lg text-gray-700 mb-6">
                {t.services.branding.description}
              </p>
              <ul className="space-y-3 font-poppins text-gray-700">
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.branding.feature1}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.branding.feature2}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.branding.feature3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3: Websites & Social Media */}
      <section id="websites" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[#FF0000] mb-4">
                <Globe size={64} />
              </div>
              <h2 className="font-montserrat font-bold text-4xl mb-6">
                {t.services.websites.title}
              </h2>
              <p className="font-poppins text-lg text-gray-700 mb-6">
                {t.services.websites.description}
              </p>
              <ul className="space-y-3 font-poppins text-gray-700 mb-6">
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.websites.feature1}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.websites.feature2}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.websites.feature3}</span>
                </li>
              </ul>
              <Button href="/websites">{t.services.websites.button}</Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
                alt="Websites & Social Media"
                className="w-full h-96 object-cover border-4 border-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 4: Content Creation */}
      <section id="content" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800"
                alt="Content Creation"
                className="w-full h-96 object-cover border-4 border-black"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-[#FF0000] mb-4">
                <Camera size={64} />
              </div>
              <h2 className="font-montserrat font-bold text-4xl mb-6">
                {t.services.content.title}
              </h2>
              <p className="font-poppins text-lg text-gray-700 mb-6">
                {t.services.content.description}
              </p>
              <ul className="space-y-3 font-poppins text-gray-700 mb-6">
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.content.feature1}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.content.feature2}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{t.services.content.feature3}</span>
                </li>
              </ul>
              <Button href="/content">{t.services.content.button}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* New: Studio Rental Section */}
      <section id="studio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[#FF0000] mb-4">
                <Camera size={64} />
              </div>
              <h2 className="font-montserrat font-bold text-4xl mb-6">
                {language === "pt" ? "Aluguer de Estúdio" : "Studio Rental"}
              </h2>
              <p className="font-poppins text-lg text-gray-700 mb-6">
                {language === "pt"
                  ? "Estúdio totalmente equipado para foto e vídeo + sala de áudio. Reserva por hora, meio dia ou dia completo."
                  : "Fully-equipped photo/video studio + audio room. Book by the hour, half-day, or full day."}
              </p>
              <Button href="/studio">
                {language === "pt" ? "Ver Estúdio" : "View Studio"}
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"
                alt="Studio Rental"
                className="w-full h-96 object-cover border-4 border-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New: Event Coverage Section */}
      <section id="events" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"
                alt="Event Coverage"
                className="w-full h-96 object-cover border-4 border-black"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-[#FF0000] mb-4">
                <Calendar size={64} />
              </div>
              <h2 className="font-montserrat font-bold text-4xl mb-6">
                {language === "pt" ? "Cobertura de Eventos" : "Event Coverage"}
              </h2>
              <p className="font-poppins text-lg text-gray-700 mb-6">
                {language === "pt"
                  ? "Foto, vídeo e streaming para eventos corporativos, conferências, festivais e desportivos."
                  : "Photo, video and live streaming for corporate events, conferences, festivals and sports."}
              </p>
              <Button href="/events">
                {language === "pt" ? "Ver Eventos" : "View Events"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-br from-black via-[#1a0000] to-black text-white py-20">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
          }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-4xl mb-6">
            {t.services.cta.title}{" "}
            <span className="text-[#FF0000]">
              {t.services.cta.titleHighlight}
            </span>
          </h2>
          <p className="font-poppins text-xl text-gray-300 mb-8">
            {t.services.cta.subtitle}
          </p>
          <Button href="/contact" size="large">
            {t.services.cta.button}
          </Button>
        </div>
      </section>
    </div>
  );
}
