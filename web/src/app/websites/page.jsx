"use client";

import { Code, Zap, Users, CheckCircle } from "lucide-react";
import Button from "@/components/Button";
import { useLanguage } from "@/utils/useLanguage";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";

export default function WebsitesPage() {
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
            <Code size={64} />
          </div>
          <h1 className="font-montserrat font-bold text-5xl md:text-6xl mb-6">
            {t.websites.hero.title}{" "}
            <span className="text-[#FF0000]">
              {t.websites.hero.titleHighlight}
            </span>
          </h1>
          <p className="font-poppins text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            {t.websites.hero.subtitle}
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
            {language === "pt" ? "A Nossa" : "Our"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Abordagem" : "Approach"}
            </span>
          </h2>
          <p className="font-poppins text-lg text-gray-700 mb-6 text-center">
            {language === "pt"
              ? "De portfolios elegantes a soluções de e-commerce completas – construímos websites que ficam ótimos e funcionam ainda melhor. O nosso processo combina estratégia, branding, design UX/UI e desenvolvimento moderno para criar experiências digitais que geram resultados."
              : "From sleek portfolios to full e-commerce solutions – we build websites that look great and work even better. Our process combines strategy, branding, UX/UI design, and modern development to create digital experiences that drive results."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-[#FF0000] mb-4 flex justify-center">
                <Zap size={48} />
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3">
                {language === "pt" ? "Estratégia Primeiro" : "Strategy First"}
              </h3>
              <p className="font-poppins text-gray-700">
                {language === "pt"
                  ? "Começamos por entender o seu negócio, público e objetivos antes de desenhar um único pixel."
                  : "We start with understanding your business, audience, and goals before we design a single pixel."}
              </p>
            </div>

            <div className="text-center">
              <div className="text-[#FF0000] mb-4 flex justify-center">
                <Code size={48} />
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3">
                {language === "pt" ? "Construído à Medida" : "Custom Built"}
              </h3>
              <p className="font-poppins text-gray-700">
                {language === "pt"
                  ? "Sem templates, sem atalhos. Cada website é adaptado à sua marca e otimizado para conversões."
                  : "No templates, no shortcuts. Every website is tailored to your brand and optimized for conversions."}
              </p>
            </div>

            <div className="text-center">
              <div className="text-[#FF0000] mb-4 flex justify-center">
                <Users size={48} />
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3">
                {language === "pt" ? "Centrado no Utilizador" : "User-Centered"}
              </h3>
              <p className="font-poppins text-gray-700">
                {language === "pt"
                  ? "Design bonito não significa nada se os utilizadores não conseguem navegar. Priorizamos a UX em cada passo."
                  : "Beautiful design means nothing if users can't navigate it. We prioritize UX at every step."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-4xl mb-12 text-center">
            {language === "pt" ? "O Que Está Normalmente" : "What's Typically"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Incluído" : "Included"}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start">
              <CheckCircle
                className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                size={24}
              />
              <div>
                <h3 className="font-poppins font-bold mb-2">
                  {language === "pt"
                    ? "Design & Desenvolvimento Personalizado"
                    : "Custom Design & Development"}
                </h3>
                <p className="font-poppins text-gray-700">
                  {language === "pt"
                    ? "Design único e responsivo construído de raiz"
                    : "Unique, responsive design built from scratch"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle
                className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                size={24}
              />
              <div>
                <h3 className="font-poppins font-bold mb-2">
                  {language === "pt"
                    ? "Abordagem Mobile-First"
                    : "Mobile-First Approach"}
                </h3>
                <p className="font-poppins text-gray-700">
                  {language === "pt"
                    ? "Otimizado para todos os dispositivos e tamanhos de ecrã"
                    : "Optimized for all devices and screen sizes"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle
                className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                size={24}
              />
              <div>
                <h3 className="font-poppins font-bold mb-2">
                  {language === "pt" ? "Fundação SEO" : "SEO Foundation"}
                </h3>
                <p className="font-poppins text-gray-700">
                  {language === "pt"
                    ? "Construído com otimização para motores de busca em mente"
                    : "Built with search engine optimization in mind"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle
                className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                size={24}
              />
              <div>
                <h3 className="font-poppins font-bold mb-2">
                  {language === "pt"
                    ? "Gestão de Conteúdo"
                    : "Content Management"}
                </h3>
                <p className="font-poppins text-gray-700">
                  {language === "pt"
                    ? "CMS fácil de usar para atualizar o seu site"
                    : "Easy-to-use CMS for updating your site"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle
                className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                size={24}
              />
              <div>
                <h3 className="font-poppins font-bold mb-2">
                  {language === "pt"
                    ? "Pronto para E-Commerce"
                    : "E-Commerce Ready"}
                </h3>
                <p className="font-poppins text-gray-700">
                  {language === "pt"
                    ? "Funcionalidade completa de loja online quando precisar"
                    : "Full online store functionality when you need it"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle
                className="text-[#FF0000] mr-3 mt-1 flex-shrink-0"
                size={24}
              />
              <div>
                <h3 className="font-poppins font-bold mb-2">
                  {language === "pt"
                    ? "Formação & Suporte"
                    : "Training & Support"}
                </h3>
                <p className="font-poppins text-gray-700">
                  {language === "pt"
                    ? "Mostramos-lhe como gerir o seu novo site"
                    : "We'll show you how to manage your new site"}
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
            {language === "pt" ? "Pronto para um" : "Ready for a"}{" "}
            <span className="text-[#FF0000]">Website</span>{" "}
            {language === "pt" ? "que Funciona?" : "That Works?"}
          </h2>
          <p className="font-poppins text-xl text-gray-300 mb-8">
            {language === "pt"
              ? "Entre em contacto para discutir pacotes, preços e prazos"
              : "Get in touch to discuss packages, pricing, and timelines"}
          </p>
          <Button href="/websites-onboarding" size="large">
            {language === "pt"
              ? "Faz já o teu pedido"
              : "Make your request now"}
          </Button>
          <p className="font-poppins text-sm text-gray-400 mt-6">
            🚀{" "}
            {language === "pt"
              ? "Detalhes completos de pacotes, preços e sistema de reservas em breve neste mini-site"
              : "Full package details, pricing tiers, and booking system coming soon to this mini-site"}
          </p>
        </div>
      </section>
    </div>
  );
}
