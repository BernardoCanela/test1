import { ArrowRight } from "lucide-react";

export default function MiniSiteCard({ title, description, href, icon }) {
  return (
    <a
      href={href}
      className="block bg-gradient-to-br from-black to-[#1a0000] p-8 border-2 border-[#FF0000] hover:scale-105 transition-transform group relative overflow-hidden"
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="relative z-10">
        <div className="text-[#FF0000] mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="font-montserrat font-bold text-2xl text-white mb-3">
          {title}
        </h3>
        <p className="font-poppins text-gray-300 mb-4">{description}</p>
        <div className="flex items-center text-[#FF0000] font-montserrat font-bold group-hover:translate-x-2 transition-transform">
          Learn More <ArrowRight className="ml-2" size={20} />
        </div>
      </div>
    </a>
  );
}
