function KalimantanBaratOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute grid rotate-12 grid-cols-4 gap-2 opacity-[0.08] ${className}`} aria-hidden="true">
      {Array.from({ length: 16 }).map((_, index) => (
        <span key={index} className="h-8 w-8 rotate-45 rounded-sm border-2 border-[#6e5337] p-2">
          <span className="block h-full w-full rounded-full bg-[#6e5337]" />
        </span>
      ))}
    </div>
  );
}

function SulawesiBaratOrnament({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none absolute opacity-[0.09] ${className}`} viewBox="0 0 240 140" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <path
          key={index}
          d={`M ${10 + index * 40} 120 Q ${27 + index * 40} 35 ${44 + index * 40} 120 Z`}
          fill="none"
          stroke="#6e5337"
          strokeWidth="4"
        />
      ))}
      <path d="M4 122 H236" stroke="#6e5337" strokeWidth="4" />
      <path d="M14 132 H226" stroke="#6e5337" strokeWidth="2" strokeDasharray="8 6" />
    </svg>
  );
}

function CulturalDivider({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`mx-auto flex w-full max-w-sm items-center gap-3 py-5 ${light ? "text-[#eadfc8]" : "text-[#765a3c]"}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-current opacity-30" />
      <span className="h-2 w-2 rotate-45 border border-current" />
      <span className="h-3 w-3 rotate-45 bg-current" />
      <span className="h-2 w-2 rotate-45 border border-current" />
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  );
}

export { KalimantanBaratOrnament, SulawesiBaratOrnament, CulturalDivider };
