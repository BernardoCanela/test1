"use client";

import { useEffect, useState } from "react";
import { Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import PortfolioCard from "@/components/PortfolioCard";
import { useLanguage } from "@/utils/useLanguage";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const { language } = useLanguage();
  const t = language === "pt" ? pt : en;

  const filters = [
    { key: "All", label: t.portfolio.filters.all },
    { key: "Branding", label: t.portfolio.filters.branding },
    { key: "Web", label: t.portfolio.filters.web },
    { key: "Video", label: t.portfolio.filters.video },
    { key: "Photography", label: t.portfolio.filters.photo },
    { key: "Social Media", label: "Social Media" },
    { key: "Marketing", label: "Marketing" },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects/list");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data.projects);
        setFilteredProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    if (filterKey === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.type_tags && project.type_tags.includes(filterKey),
      );
      setFilteredProjects(filtered);
    }
  };

  const openLightbox = (project, photoIndex = 0) => {
    setCurrentProject(project);
    setCurrentPhotoIndex(photoIndex);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentProject(null);
    setCurrentPhotoIndex(0);
    document.body.style.overflow = "auto";
  };

  const nextPhoto = () => {
    if (
      currentProject &&
      currentProject.media_urls &&
      currentProject.media_urls.length > 1
    ) {
      setCurrentPhotoIndex((prev) =>
        prev < currentProject.media_urls.length - 1 ? prev + 1 : prev,
      );
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentPhotoIndex]);

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
            {t.portfolio.hero.title}{" "}
            <span className="text-[#FF0000]">
              {t.portfolio.hero.titleHighlight}
            </span>
          </h1>
          <p className="font-poppins text-xl text-gray-300 max-w-3xl mx-auto">
            {t.portfolio.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Filters & Portfolio Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <Filter className="text-[#FF0000] mr-2" size={24} />
              <span className="font-montserrat font-bold text-lg">
                {language === "pt"
                  ? "Filtrar por Serviço"
                  : "Filter by Service"}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleFilterChange(filter.key)}
                  className={`px-6 py-2 rounded font-poppins font-medium transition-all ${
                    activeFilter === filter.key
                      ? "bg-[#FF0000] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          {loading ? (
            <div className="text-center py-20 text-gray-500">
              <p className="font-poppins text-lg">
                {language === "pt"
                  ? "A carregar projetos..."
                  : "Loading projects..."}
              </p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => openLightbox(project, 0)}
                  className="cursor-pointer"
                >
                  <PortfolioCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p className="font-poppins text-lg">
                {language === "pt"
                  ? "Nenhum projeto encontrado para esta categoria."
                  : "No projects found for this category."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Gallery */}
      {lightboxOpen && currentProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-[#FF0000] transition-colors z-50"
          >
            <X size={32} />
          </button>

          {/* Photo Counter */}
          {currentProject.media_urls &&
            currentProject.media_urls.length > 1 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-poppins z-50">
                Photo {currentPhotoIndex + 1} of{" "}
                {currentProject.media_urls.length}
              </div>
            )}

          {/* Navigation Arrows */}
          {currentProject.media_urls &&
            currentProject.media_urls.length > 1 && (
              <>
                {currentPhotoIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevPhoto();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#FF0000] transition-colors z-50"
                  >
                    <ChevronLeft size={48} />
                  </button>
                )}
                {currentPhotoIndex < currentProject.media_urls.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextPhoto();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#FF0000] transition-colors z-50"
                  >
                    <ChevronRight size={48} />
                  </button>
                )}
              </>
            )}

          {/* Image */}
          <img
            src={
              currentProject.media_urls?.[currentPhotoIndex] ||
              currentProject.media_url
            }
            alt={currentProject.title}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}
