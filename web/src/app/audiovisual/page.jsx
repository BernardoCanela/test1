"use client";

import { Video, Camera, Mic, Film } from "lucide-react";
import Button from "@/components/Button";
import { useLanguage } from "@/utils/useLanguage";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";

export default function AudiovisualPage() {
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
            <Video size={64} />
          </div>
          <h1 className="font-montserrat font-bold text-5xl md:text-6xl mb-6">
            {t.audiovisual.hero.title}{" "}
            <span className="text-[#FF0000]">
              {t.audiovisual.hero.titleHighlight}
            </span>
          </h1>
          <p className="font-poppins text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            {t.audiovisual.hero.subtitle}
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
            {language === "pt" ? "A Dar Vida à Sua" : "Bringing Your"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Visão" : "Vision to Life"}
            </span>
          </h2>
          <p className="font-poppins text-lg text-gray-700 mb-6 text-center">
            {language === "pt"
              ? "De vídeos corporativos a podcasts e fotografia de marca – criamos conteúdo audiovisual que conta a sua história com impacto. A nossa equipa trata de tudo, desde o desenvolvimento do conceito até à entrega final, garantindo que a sua mensagem ressoa com o seu público."
              : "From corporate videos to podcasts and brand photography – we create audiovisual content that tells your story with impact. Our team handles everything from concept development to final delivery, ensuring your message resonates with your audience."}
          </p>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-4xl mb-12 text-center">
            {language === "pt" ? "O Que" : "What We"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Criamos" : "Create"}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video Production */}
            <div className="bg-white p-8 border-2 border-black hover:border-[#FF0000] transition-all">
              <div className="text-[#FF0000] mb-4">
                <Film size={56} />
              </div>
              <h3 className="font-montserrat font-bold text-2xl mb-4">
                {t.audiovisual.video.title}
              </h3>
              <ul className="space-y-2 font-poppins text-gray-700">
                <li>• {t.audiovisual.video.corporate}</li>
                <li>• {t.audiovisual.video.commercial}</li>
                <li>• {t.audiovisual.video.social}</li>
                <li>• {t.audiovisual.video.events}</li>
                <li>
                  •{" "}
                  {language === "pt"
                    ? "Demonstrações de produtos & explicadores"
                    : "Product demos & explainers"}
                </li>
              </ul>
            </div>

            {/* Photography */}
            <div className="bg-white p-8 border-2 border-black hover:border-[#FF0000] transition-all">
              <div className="text-[#FF0000] mb-4">
                <Camera size={56} />
              </div>
              <h3 className="font-montserrat font-bold text-2xl mb-4">
                {t.audiovisual.photo.title}
              </h3>
              <ul className="space-y-2 font-poppins text-gray-700">
                <li>
                  •{" "}
                  {language === "pt"
                    ? "Fotografia de marca & lifestyle"
                    : "Brand & lifestyle photography"}
                </li>
                <li>• {t.audiovisual.photo.product}</li>
                <li>• {t.audiovisual.photo.events}</li>
                <li>• {t.audiovisual.photo.corporate}</li>
                <li>
                  •{" "}
                  {language === "pt"
                    ? "Sessões para redes sociais"
                    : "Social media content shoots"}
                </li>
              </ul>
            </div>

            {/* Podcast Production */}
            <div className="bg-white p-8 border-2 border-black hover:border-[#FF0000] transition-all">
              <div className="text-[#FF0000] mb-4">
                <Mic size={56} />
              </div>
              <h3 className="font-montserrat font-bold text-2xl mb-4">
                {t.audiovisual.podcast.title}
              </h3>
              <ul className="space-y-2 font-poppins text-gray-700">
                <li>
                  •{" "}
                  {language === "pt"
                    ? "Gravação completa de podcasts"
                    : "Full podcast recording"}
                </li>
                <li>• {t.audiovisual.podcast.editing}</li>
                <li>
                  •{" "}
                  {language === "pt"
                    ? "Setup de podcast em vídeo"
                    : "Video podcast setup"}
                </li>
                <li>
                  •{" "}
                  {language === "pt"
                    ? "Suporte à publicação de episódios"
                    : "Episode publishing support"}
                </li>
                <li>
                  •{" "}
                  {language === "pt"
                    ? "Criação de intro/outro"
                    : "Intro/outro creation"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-4xl mb-12 text-center">
            {language === "pt" ? "O Nosso" : "Our"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Processo" : "Process"}
            </span>
          </h2>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-[#FF0000] text-white font-montserrat font-bold w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                1
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-xl mb-2">
                  {language === "pt" ? "Pré-Produção" : "Pre-Production"}
                </h3>
                <p className="font-poppins text-gray-700">
                  {language === "pt"
                    ? "Começamos com o desenvolvimento do conceito, escrita de guião, storyboarding e planeamento de cada detalhe para garantir que a sua visão ganha vida."
                    : "We start with concept development, scripting, storyboarding, and planning every detail to ensure your vision comes to life."}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#FF0000] text-white font-montserrat font-bold w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                2
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-xl mb-2">
                  {language === "pt" ? "Produção" : "Production"}
                </h3>
                <p className="font-poppins text-gray-700">
                  {language === "pt"
                    ? "A nossa equipa trata de todas as filmagens, fotografia ou gravações com equipamento profissional e experiência."
                    : "Our team handles all filming, photography, or recording with professional equipment and expertise."}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#FF0000] text-white font-montserrat font-bold w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                3
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-xl mb-2">
                  {language === "pt" ? "Pós-Produção" : "Post-Production"}
                </h3>
                <p className="font-poppins text-gray-700">
                  {language === "pt"
                    ? "Edição, correção de cor, design de som e toques finais para entregar conteúdo polido e pronto a publicar."
                    : "Editing, color grading, sound design, and final touches to deliver polished, ready-to-publish content."}
                </p>
              </div>
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
            {t.audiovisual.cta.title}{" "}
            <span className="text-[#FF0000]">
              {t.audiovisual.cta.titleHighlight}
            </span>
          </h2>
          <p className="font-poppins text-xl text-gray-300 mb-8">
            {t.audiovisual.cta.subtitle}
          </p>
          <Button href="/contact" size="large">
            {t.audiovisual.cta.button}
          </Button>
          <p className="font-poppins text-sm text-gray-400 mt-6">
            🚀{" "}
            {language === "pt"
              ? "Showreel completo, estudos de caso e detalhamento de serviços em breve neste mini-site"
              : "Full showreel, case studies, and detailed service breakdown coming soon to this mini-site"}
          </p>
        </div>
      </section>
    </div>
  );
}
