import { useState } from "react";
import { Check, Copy } from "lucide-react";

function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-[#bba887] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#644e38] transition hover:bg-[#594437] hover:text-white"
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? "Tersalin" : "Salin rekening"}
    </button>
  );
}

export { scrollToSection, CopyButton };