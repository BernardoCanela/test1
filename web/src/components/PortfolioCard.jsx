export default function PortfolioCard({ project }) {
  return (
    <div className="group relative overflow-hidden bg-black border-2 border-black hover:border-[#FF0000] transition-all">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.media_urls?.[0] || project.media_url}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
        <div>
          <h3 className="font-montserrat font-bold text-white text-xl mb-2">
            {project.title}
          </h3>
          {project.client && (
            <p className="font-poppins text-gray-300 text-sm mb-2">
              {project.client}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.type_tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs font-poppins bg-[#FF0000] text-white px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          {project.description && (
            <p className="font-poppins text-gray-300 text-sm line-clamp-3">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
