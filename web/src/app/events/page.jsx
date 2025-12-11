"use client";

import {
  Calendar,
  Camera,
  Video,
  Mic,
  MapPin,
  CheckCircle,
} from "lucide-react";
import Button from "@/components/Button";
import { useLanguage } from "@/utils/useLanguage";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";

export default function EventsPage() {
  const { language } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-black via-[#1a0000] to-black text-white py-24 md:py-32">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[#FF0000] mb-6 flex justify-center">
            <Calendar size={64} />
          </div>
          <h1 className="font-montserrat font-bold text-5xl md:text-6xl mb-6">
            {language === "pt" ? "Cobertura de" : "Event"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Eventos" : "Coverage"}
            </span>
          </h1>
          <p className="font-poppins text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            {language === "pt"
              ? "Foto, vídeo e streaming que captam a energia do seu evento — sem falhas."
              : "Photo, video, and live streaming that capture your event’s energy — without a hitch."}
          </p>
          <div className="inline-block bg-[#FF0000] text-white px-6 py-2 rounded font-montserrat font-bold mb-6">
            {language === "pt"
              ? "Faz já o teu pedido"
              : "Make your request now"}
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-4xl mb-12 text-center">
            {language === "pt" ? "Tipos de" : "Types of"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Eventos" : "Events"}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              language === "pt"
                ? "Corporativos & Conferências"
                : "Corporate & Conferences",
              language === "pt"
                ? "Festivais & Concertos"
                : "Festivals & Concerts",
              language === "pt" ? "Desportivos & Outdoor" : "Sports & Outdoor",
              language === "pt"
                ? "Institucionais & Públicos"
                : "Institutional & Public",
            ].map((title, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 border-2 border-black hover:border-[#FF0000] transition-all"
              >
                <div className="text-[#FF0000] mb-3">
                  {i % 2 === 0 ? <Video size={40} /> : <Camera size={40} />}
                </div>
                <h3 className="font-montserrat font-bold text-xl mb-2">
                  {title}
                </h3>
                <p className="font-poppins text-gray-700">
                  {language === "pt"
                    ? "Cobertura completa com foto, vídeo e som. Registo integral, highlights e conteúdos prontos para redes sociais."
                    : "Full coverage with photo, video and audio. Full recording, highlights and social-ready assets."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-4xl mb-12 text-center">
            {language === "pt" ? "O Que" : "What’s"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Inclui" : "Included"}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              language === "pt"
                ? "Equipa de Foto & Vídeo"
                : "Photo & Video Team",
              language === "pt"
                ? "Captação de Áudio Profissional"
                : "Pro Audio Capture",
              language === "pt"
                ? "Drones (se aplicável)"
                : "Drones (when allowed)",
              language === "pt"
                ? "Streaming Multiplataforma"
                : "Multi-platform Streaming",
              language === "pt"
                ? "Highlights em 24-72h"
                : "Highlights in 24-72h",
              language === "pt"
                ? "Entrega Cloud & Arquivo"
                : "Cloud Delivery & Archiving",
            ].map((item, i) => (
              <div key={i} className="flex items-start">
                <CheckCircle
                  className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                  size={24}
                />
                <p className="font-poppins text-gray-700">{item}</p>
              </div>
            ))}
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
            {language === "pt"
              ? "Pronto para Cobrir o seu"
              : "Ready to Cover Your"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Evento?" : "Event?"}
            </span>
          </h2>
          <p className="font-poppins text-xl text-gray-300 mb-8">
            {language === "pt"
              ? "Fale connosco sobre datas, logística e pacotes à medida."
              : "Talk to us about dates, logistics and tailored packages."}
          </p>
          <Button href="/events-onboarding" size="large">
            {language === "pt"
              ? "Faz já o teu pedido"
              : "Make your request now"}
          </Button>
        </div>
      </section>
    </div>
  );
}
