"use client";

import { Users, Lightbulb, Heart, Zap } from "lucide-react";
import Button from "@/components/Button";
import { useLanguage } from "@/utils/useLanguage";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = language === "pt" ? pt : en;

  return (
    <div>
      {/* Hero Section */}
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
            {t.about.hero.title}{" "}
            <span className="text-[#FF0000]">
              {t.about.hero.titleHighlight}
            </span>
          </h1>
          <p className="font-poppins text-xl text-gray-300 max-w-3xl mx-auto">
            {language === "pt"
              ? "Criadores, Estrategas, Contadores de Histórias – baseados em Vila Nova de Gaia, Portugal"
              : "Creators, Strategists, Storytellers – based in Vila Nova de Gaia, Portugal"}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-4xl mb-8 text-center">
            {t.about.story.title.split(" ")[0]}{" "}
            <span className="text-[#FF0000]">
              {t.about.story.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <div className="font-poppins text-lg text-gray-700 space-y-6">
            <p>{t.about.story.p1}</p>
            <p>{t.about.story.p2}</p>
            <p>
              {language === "pt"
                ? "De consultoria de negócio e branding a websites, redes sociais e produção audiovisual, reunimos estratégia, criatividade e experiência técnica para ajudar os nossos clientes a darem o próximo passo ousado."
                : "From business consulting and branding to websites, social media, and audiovisual production, we bring together strategy, creativity, and technical expertise to help our clients take the next bold step."}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-4xl mb-12 text-center">
            {language === "pt" ? "Pelos Que" : "What We"}{" "}
            <span className="text-[#FF0000]">
              {language === "pt" ? "Lutamos" : "Stand For"}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-[#FF0000] mb-4 flex justify-center">
                <Heart size={56} />
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3">
                {language === "pt" ? "Autênticos" : "Authentic"}
              </h3>
              <p className="font-poppins text-gray-700">
                {language === "pt"
                  ? "Somos reais, não corporativos. Sem jargões, apenas criatividade honesta e parcerias genuínas."
                  : "We're real, not corporate. No buzzwords, just honest creativity and genuine partnerships."}
              </p>
            </div>

            <div className="text-center">
              <div className="text-[#FF0000] mb-4 flex justify-center">
                <Lightbulb size={56} />
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3">
                {language === "pt" ? "Curiosos" : "Curious"}
              </h3>
              <p className="font-poppins text-gray-700">
                {language === "pt"
                  ? "Fazemos perguntas, exploramos possibilidades e nunca paramos de aprender com cada projeto."
                  : "We ask questions, explore possibilities, and never stop learning from every project."}
              </p>
            </div>

            <div className="text-center">
              <div className="text-[#FF0000] mb-4 flex justify-center">
                <Zap size={56} />
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3">
                {language === "pt" ? "Motivacionais" : "Motivational"}
              </h3>
              <p className="font-poppins text-gray-700">
                {language === "pt"
                  ? "Inspiramos ação e ajudamos-te a dar o próximo passo ousado com confiança."
                  : "We inspire action and help you take that next bold step with confidence."}
              </p>
            </div>

            <div className="text-center">
              <div className="text-[#FF0000] mb-4 flex justify-center">
                <Users size={56} />
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3">
                {language === "pt" ? "Apoiantes" : "Supportive"}
              </h3>
              <p className="font-poppins text-gray-700">
                {language === "pt"
                  ? "Estamos aqui para te ajudar a ter sucesso. As tuas vitórias são as nossas vitórias."
                  : "We're here to help you succeed. Your wins are our wins."}
              </p>
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
            {t.about.cta.title}{" "}
            <span className="text-[#FF0000]">{t.about.cta.titleHighlight}</span>
          </h2>
          <p className="font-poppins text-xl text-gray-300 mb-8">
            {t.about.cta.subtitle}
          </p>
          <Button href="/contact" size="large">
            {t.about.cta.button}
          </Button>
        </div>
      </section>
    </div>
  );
}
