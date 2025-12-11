"use client";

import { Camera, Mic, Monitor, Sun } from "lucide-react";
import Button from "@/components/Button";
import { useLanguage } from "@/utils/useLanguage";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

// Studio location: Rua Pinheiro, 363, 4410-037 Serzedo
const STUDIO_LOCATION = { lat: 41.0356, lng: -8.5494 };

export default function StudioPage() {
  const { language } = useLanguage();
  const t = language === "pt" ? pt : en;

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
            <Camera size={64} />
          </div>
          <h1 className="font-montserrat font-bold text-5xl md:text-6xl mb-6">
            {t.studio.hero.title}{" "}
            <span className="text-[#FF0000]">
              {t.studio.hero.titleHighlight}
            </span>
          </h1>
          <p className="font-poppins text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            {t.studio.hero.subtitle}
          </p>
          <div className="inline-block bg-[#FF0000] text-white px-6 py-2 rounded font-montserrat font-bold mb-6">
            {language === "pt"
              ? "Faz já o teu pedido"
              : "Make your request now"}
          </div>
        </div>
      </section>

      {/* Brief Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-4xl mb-8 text-center">
            {language === "pt" ? "O Nosso" : "Our"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Espaço Criativo" : "Creative Space"}
            </span>
          </h2>
          <p className="font-poppins text-lg text-gray-700 mb-6 text-center">
            {t.studio.description}
          </p>
        </div>
      </section>

      {/* Space Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-4xl mb-12 text-center">
            {t.studio.features.title.split(" ")[0]}{" "}
            <span className="text-[#FF0000]">
              {t.studio.features.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Photo/Video Studio */}
            <div className="bg-white p-8 border-2 border-black">
              <div className="text-[#FF0000] mb-4">
                <Camera size={56} />
              </div>
              <h3 className="font-montserrat font-bold text-2xl mb-4">
                {t.studio.features.video.title}
              </h3>
              <ul className="space-y-3 font-poppins text-gray-700">
                <li className="flex items-start">
                  <Sun
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>
                    {language === "pt"
                      ? "Setups de iluminação profissional (softboxes, painéis LED, ring lights)"
                      : "Professional lighting setups (softboxes, LED panels, ring lights)"}
                  </span>
                </li>
                <li className="flex items-start">
                  <Monitor
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>
                    {language === "pt"
                      ? "Várias opções de fundo (branco, preto, green screen)"
                      : "Multiple backdrop options (white, black, green screen)"}
                  </span>
                </li>
                <li className="flex items-start">
                  <Camera
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>
                    {language === "pt"
                      ? "Espaço amplo para sessões de produto, retratos e conteúdo de vídeo"
                      : "Ample space for product shoots, portraits, and video content"}
                  </span>
                </li>
              </ul>
              <p className="font-poppins text-sm text-gray-600 mt-6 italic">
                {language === "pt"
                  ? "Perfeito para: Fotografia de produto, sessões de marca, conteúdo de vídeo, entrevistas, sessões criativas"
                  : "Perfect for: Product photography, brand shoots, video content, interviews, creative sessions"}
              </p>
            </div>

            {/* Audio Room */}
            <div className="bg-white p-8 border-2 border-black">
              <div className="text-[#FF0000] mb-4">
                <Mic size={56} />
              </div>
              <h3 className="font-montserrat font-bold text-2xl mb-4">
                {t.studio.features.audio.title}
              </h3>
              <ul className="space-y-3 font-poppins text-gray-700">
                <li className="flex items-start">
                  <Mic
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>
                    {language === "pt"
                      ? "Microfones de alta qualidade e interface de áudio"
                      : "High-quality microphones and audio interface"}
                  </span>
                </li>
                <li className="flex items-start">
                  <Monitor
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>
                    {language === "pt"
                      ? "Tratamento acústico para som limpo e profissional"
                      : "Acoustic treatment for clean, professional sound"}
                  </span>
                </li>
                <li className="flex items-start">
                  <Camera
                    className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>
                    {language === "pt"
                      ? "Setup de vídeo para gravação de podcasts e streaming"
                      : "Video setup for podcast recording and streaming"}
                  </span>
                </li>
              </ul>
              <p className="font-poppins text-sm text-gray-600 mt-6 italic">
                {language === "pt"
                  ? "Perfeito para: Podcasts, voiceovers, entrevistas, gravação de música, criação de conteúdo áudio"
                  : "Perfect for: Podcasts, voiceovers, interviews, music recording, audio content creation"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-4xl mb-8">
            {language === "pt" ? "Opções Flexíveis de" : "Flexible"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Aluguer" : "Rental Options"}
            </span>
          </h2>
          <p className="font-poppins text-lg text-gray-700 mb-8">
            {language === "pt"
              ? "Oferecemos opções de aluguer por hora, meio dia e dia completo para se adequar às suas necessidades e orçamento. O equipamento pode ser fornecido, ou traga o seu -- somos flexíveis."
              : "We offer hourly, half-day, and full-day rental options to suit your needs and budget. Equipment can be provided, or bring your own -- we're flexible."}
          </p>
          <div className="bg-gray-50 p-8 border-2 border-[#FF0000] rounded">
            <p className="font-poppins text-gray-700 mb-4">
              📅{" "}
              <strong>
                {language === "pt"
                  ? "Preços detalhados, calendário de disponibilidade e reserva online em breve"
                  : "Detailed pricing, availability calendar, and online booking coming soon"}
              </strong>
            </p>
            <p className="font-poppins text-sm text-gray-600">
              {language === "pt"
                ? "Por agora, entre em contacto para verificar disponibilidade e discutir o seu projeto"
                : "For now, get in touch to check availability and discuss your project"}
            </p>
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
            {t.studio.booking.title.split(" ")[0]}{" "}
            <span className="text-[#FF0000]">
              {t.studio.booking.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="font-poppins text-xl text-gray-300 mb-8">
            {t.studio.booking.description}
          </p>

          {/* Map */}
          <div className="mb-8 border-2 border-[#FF0000] rounded overflow-hidden">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
              <Map
                style={{ width: "100%", height: "400px" }}
                defaultCenter={STUDIO_LOCATION}
                defaultZoom={15}
                gestureHandling={"greedy"}
                disableDefaultUI={false}
              >
                <Marker position={STUDIO_LOCATION} />
              </Map>
            </APIProvider>
          </div>

          <div className="mb-8">
            <p className="font-poppins text-lg mb-2">
              📍 Rua Pinheiro, 363, 4410-037 Serzedo
            </p>
            <p className="font-poppins text-gray-300">
              📧 geral@mindframe.media | ☎️ +351 928 044 666
            </p>
          </div>

          <Button href="/studio-onboarding" size="large">
            {language === "pt"
              ? "Faz já o teu pedido"
              : "Make your request now"}
          </Button>
          <p className="font-poppins text-sm text-gray-400 mt-6">
            🚀{" "}
            {language === "pt"
              ? "Galeria completa do estúdio, lista de equipamento, preços e calendário de reservas em breve"
              : "Full studio gallery, equipment list, pricing, and booking calendar coming soon"}
          </p>
        </div>
      </section>
    </div>
  );
}
