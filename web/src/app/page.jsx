"use client";

import { useEffect, useState } from "react";
import {
  Lightbulb,
  Target,
  Globe,
  Video,
  Camera,
  Palette,
  Code,
  Calendar,
} from "lucide-react";
import Button from "@/components/Button";
import ServiceCard from "@/components/ServiceCard";
import MiniSiteCard from "@/components/MiniSiteCard";
import PortfolioCard from "@/components/PortfolioCard";
import { useLanguage } from "@/utils/useLanguage";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const { language } = useLanguage();
  const t = language === "pt" ? pt : en;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects/list?featured=true");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setFeaturedProjects(data.projects.slice(0, 6));
      } catch (error) {
        console.error("Error fetching featured projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-[#1a0000] to-black text-white py-24 md:py-32 overflow-hidden">
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-montserrat font-bold text-5xl md:text-7xl mb-6">
            <span className="text-white">{t.home.hero.title}</span>
            <br />
            <span className="text-[#FF0000]">{t.home.hero.titleHighlight}</span>
          </h1>
          <p className="font-poppins text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            {t.home.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="large">
              {t.home.hero.cta}
            </Button>
            <Button href="/portfolio" variant="outline" size="large">
              {t.home.featured.viewPortfolio}
            </Button>
          </div>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">
              {t.home.services.title}{" "}
              <span className="text-[#FF0000]">
                {t.home.services.titleHighlight}
              </span>
            </h2>
            <p className="font-poppins text-lg text-gray-700 max-w-2xl mx-auto">
              {language === "pt"
                ? "Não apenas executamos – fazemos parceria consigo para resolver problemas, construir marcas e criar conteúdo que ressoa."
                : "We don't just execute – we partner with you to solve problems, build brands, and create content that resonates."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Target size={48} />}
              title={t.home.services.consulting.title}
              description={t.home.services.consulting.description}
            />
            <ServiceCard
              icon={<Palette size={48} />}
              title={t.home.services.branding.title}
              description={t.home.services.branding.description}
            />
            <ServiceCard
              icon={<Globe size={48} />}
              title={t.home.services.websites.title}
              description={t.home.services.websites.description}
            />
            <ServiceCard
              icon={<Camera size={48} />}
              title={t.home.services.content.title}
              description={t.home.services.content.description}
            />
          </div>

          <div className="text-center mt-12">
            <Button href="/services" variant="secondary">
              {t.home.services.viewAll}
            </Button>
          </div>
        </div>
      </section>

      {/* Mini-Site Cards Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">
              {language === "pt" ? "Do Que" : "What Do You"}{" "}
              <span className="text-[#FF0000]">
                {language === "pt" ? "Precisa?" : "Need?"}
              </span>
            </h2>
            <p className="font-poppins text-lg text-gray-700">
              {language === "pt"
                ? "Escolha o seu caminho para o impacto"
                : "Choose your path to impact"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MiniSiteCard
              title={
                language === "pt" ? "Precisa de um Website?" : "Need a Website?"
              }
              description={
                language === "pt"
                  ? "De portfolios elegantes a lojas online completas – construímos websites que ficam ótimos e funcionam ainda melhor."
                  : "From sleek portfolios to full online stores – we build websites that look great and work even better."
              }
              href="/websites"
              icon={<Code size={48} />}
            />
            <MiniSiteCard
              title={
                language === "pt" ? "Precisa de um Estúdio?" : "Need a Studio?"
              }
              description={
                language === "pt"
                  ? "Alugue o nosso estúdio totalmente equipado de foto/vídeo e sala de áudio em Vila Nova de Gaia por hora, meio dia ou dia completo."
                  : "Rent our fully-equipped photo/video studio and audio room in Vila Nova de Gaia by the hour, half-day, or full day."
              }
              href="/studio"
              icon={<Camera size={48} />}
            />
            <MiniSiteCard
              title={
                language === "pt" ? "Precisa de Conteúdo?" : "Need Content?"
              }
              description={
                language === "pt"
                  ? "De vídeos corporativos a podcasts e fotografia de marca – damos vida à sua visão."
                  : "From corporate videos to podcasts and brand photography – we bring your vision to life."
              }
              href="/content"
              icon={<Video size={48} />}
            />
            <MiniSiteCard
              title={
                language === "pt" ? "Cobertura de Eventos" : "Event Coverage"
              }
              description={
                language === "pt"
                  ? "Foto, vídeo e streaming para eventos corporativos, conferências e mais."
                  : "Photo, video, and live streaming for corporate events, conferences, and more."
              }
              href="/events"
              icon={<Calendar size={48} />}
            />
          </div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">
              {t.home.featured.title}{" "}
              <span className="text-[#FF0000]">
                {t.home.featured.titleHighlight}
              </span>
            </h2>
            <p className="font-poppins text-lg text-gray-700">
              {language === "pt"
                ? "Projetos que marcaram a diferença"
                : "Projects that made an impact"}
            </p>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Lightbulb size={64} className="mx-auto mb-4 opacity-30" />
              <p className="font-poppins">
                {language === "pt"
                  ? "A carregar projetos em destaque..."
                  : "Loading featured projects..."}
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button href="/portfolio" variant="secondary">
              {t.home.featured.viewPortfolio}
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative bg-gradient-to-br from-black via-[#1a0000] to-black text-white py-20">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
          }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6">
            {t.home.cta.title}{" "}
            <span className="text-[#FF0000]">{t.home.cta.titleHighlight}</span>
          </h2>
          <p className="font-poppins text-xl text-gray-300 mb-8">
            {t.home.cta.subtitle}
          </p>
          <Button href="/contact" size="large">
            {t.home.cta.button}
          </Button>
        </div>
      </section>
    </div>
  );
}
