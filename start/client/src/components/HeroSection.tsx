import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-[500px] overflow-hidden bg-background py-20"
      style={{
        backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663463312579/gr2aLd55vgAkNBrCVyp7T9/hero-background-Fd5iYpeFXPhHzHQHB9C4j7.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-96 bg-gradient-to-b from-amber-500/20 to-transparent rounded-full blur-3xl" />

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center text-center">
        {/* Tag */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 animate-fade-up">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-semibold text-amber-400">أداة احترافية لتوليد بريفات التصميم</span>
        </div>

        {/* Main Title */}
        <h1 className="mb-4 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white animate-fade-up animation-delay-100">
          ولّد بريفات تصميم
          <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            احترافية وواقعية
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-8 max-w-2xl text-lg text-gray-300 leading-relaxed animate-fade-up animation-delay-200">
          أداة ذكية تساعدك في إنشاء بريفات تصميم احترافية وواقعية تعكس احتياجات السوق الحقيقية والعملاء المحترفين
        </p>

        {/* CTA Button */}
        <button 
          onClick={() => document.getElementById('selector')?.scrollIntoView({ behavior: 'smooth' })}
          className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 font-bold text-black shadow-lg shadow-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/60 hover:scale-105 active:scale-95 animate-fade-up animation-delay-300"
        >
          ابدأ الآن
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
