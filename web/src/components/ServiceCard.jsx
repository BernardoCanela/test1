export default function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white border-2 border-black p-6 hover:border-[#FF0000] transition-all group">
      <div className="text-[#FF0000] mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-montserrat font-bold text-xl mb-3">{title}</h3>
      <p className="font-poppins text-gray-700">{description}</p>
    </div>
  );
}
