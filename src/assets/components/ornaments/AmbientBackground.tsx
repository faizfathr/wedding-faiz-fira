export default function AmbientBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -left-20 top-[12%] h-64 w-64 rounded-full bg-theme-accent/35 blur-3xl" />
      <div className="absolute -right-20 bottom-[8%] h-72 w-72 rounded-full bg-theme-accent/45 blur-3xl" />
    </div>
  );
}