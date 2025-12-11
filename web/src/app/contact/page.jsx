"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "@/components/Button";
import { useLanguage } from "@/utils/useLanguage";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

// Studio location: Rua Pinheiro, 363, 4410-037 Serzedo
const STUDIO_LOCATION = { lat: 41.0356, lng: -8.5494 };

export default function ContactPage() {
  const { language } = useLanguage();
  const t = language === "pt" ? pt : en;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `When fetching /api/contact/send, the response was [${response.status}] ${text}`,
        );
      }

      setStatus({
        type: "success",
        message:
          language === "pt"
            ? "Mensagem enviada com sucesso! Em breve entraremos em contacto."
            : "Message sent successfully! We'll be in touch soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        type: "error",
        message:
          language === "pt"
            ? "Erro ao enviar mensagem. Por favor tente novamente."
            : "Error sending message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

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
            {t.contact.hero.title}{" "}
            <span className="text-[#FF0000]">
              {t.contact.hero.titleHighlight}
            </span>
          </h1>
          <p className="font-poppins text-xl text-gray-300 max-w-3xl mx-auto">
            {t.contact.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-montserrat font-bold text-3xl mb-6">
                {language === "pt"
                  ? "Envie-nos uma Mensagem"
                  : "Send Us a Message"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-poppins font-medium mb-2"
                  >
                    {t.contact.form.name} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-[#FF0000] focus:outline-none font-poppins"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-poppins font-medium mb-2"
                  >
                    {t.contact.form.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-[#FF0000] focus:outline-none font-poppins"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block font-poppins font-medium mb-2"
                  >
                    {t.contact.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-[#FF0000] focus:outline-none font-poppins"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-poppins font-medium mb-2"
                  >
                    {language === "pt"
                      ? "Como podemos ajudar?"
                      : "How can we help?"}{" "}
                    *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-[#FF0000] focus:outline-none font-poppins"
                  ></textarea>
                </div>

                {status.message && (
                  <div
                    className={`p-4 rounded ${
                      status.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } font-poppins`}
                  >
                    {status.message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center"
                >
                  {loading ? (
                    t.contact.form.sending
                  ) : (
                    <>
                      {t.contact.form.submit}{" "}
                      <Send className="ml-2" size={20} />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-montserrat font-bold text-3xl mb-6">
                {t.contact.info.title}
              </h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <Mail
                    className="text-[#FF0000] mt-1 mr-4 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <h3 className="font-poppins font-bold mb-1">
                      {t.contact.info.email}
                    </h3>
                    <a
                      href="mailto:geral@mindframe.media"
                      className="font-poppins text-gray-700 hover:text-[#FF0000]"
                    >
                      geral@mindframe.media
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone
                    className="text-[#FF0000] mt-1 mr-4 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <h3 className="font-poppins font-bold mb-1">
                      {t.contact.info.phone}
                    </h3>
                    <a
                      href="tel:+351928044666"
                      className="font-poppins text-gray-700 hover:text-[#FF0000]"
                    >
                      +351 928 044 666
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin
                    className="text-[#FF0000] mt-1 mr-4 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <h3 className="font-poppins font-bold mb-1">
                      {t.contact.info.address}
                    </h3>
                    <p className="font-poppins text-gray-700">
                      Rua Pinheiro, 363
                      <br />
                      4410-037 Serzedo, Vila Nova de Gaia
                      <br />
                      Portugal
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mb-8 border-2 border-gray-300 rounded overflow-hidden">
                <APIProvider
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                >
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

              <div className="bg-gradient-to-br from-black to-[#1a0000] p-8 text-white rounded">
                <h3 className="font-montserrat font-bold text-2xl mb-4">
                  {language === "pt"
                    ? "Horário de Funcionamento"
                    : "Office Hours"}
                </h3>
                <p className="font-poppins mb-4">
                  {language === "pt"
                    ? "Todos os dias, excepto Sábados"
                    : "Every day, except Saturdays"}
                </p>
                <div className="flex">
                  <Button
                    href="https://linktr.ee/mindframe.media"
                    variant="secondary"
                    target="_blank"
                  >
                    {language === "pt"
                      ? "Agendamento Obrigatório"
                      : "Booking Required"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
