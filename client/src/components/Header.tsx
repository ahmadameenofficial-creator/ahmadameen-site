import { Sparkles, ExternalLink } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30">
          <img src="/favicon.svg" alt="Logo" className="h-6 w-6 text-black" /></div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white">ابدأ تصميم</span>
            <span className="text-xs text-amber-500/80 font-semibold">من خلال بريف واضح</span>
          </div>
        </div>

        {/* Center - Counter */}
        <div className="hidden md:flex flex-col items-center gap-1">
          <div className="text-sm font-bold text-amber-500">
            <span id="briefCounter">0</span> بريف
          </div>
          <div className="text-xs text-muted-foreground">تم إنشاؤه</div>
        </div>

        {/* Right - CTA Button */}
        <a
          href="https://ahmadameen.space/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-black hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
        >
          <ExternalLink className="h-4 w-4" />
          أحمد أمين
        </a>
      </div>
    </header>
  );
}
