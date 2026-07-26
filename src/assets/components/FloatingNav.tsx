import { useEffect, useState } from "react";

const menus = [
  { id: "home", label: "Home" },
  { id: "tentang", label: "Tentang" },
  { id: "brides", label: "Mempelai" },
  { id: "gallery", label: "Galeri" },
  { id: "location", label: "Lokasi" },
];

export default function FloatingNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2, // 60% masuk baru dianggap aktif
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:max-w-md overflow-y-hidden">
      <div className="flex gap-2 bg-white/80 backdrop-blur-md shadow-lg px-3 py-2 rounded-full">

        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => handleScroll(menu.id)}
            className={`px-4 py-2 text-sm rounded-full transition-all duration-300
              ${
                active === menu.id
                  ? "bg-black text-white scale-105"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
          >
            {menu.label}
          </button>
        ))}

      </div>
    </div>
  );
}