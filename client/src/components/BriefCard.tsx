import { Copy, CheckCircle, Lightbulb, Palette, Eye } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { generateBriefPDF } from "@/lib/pdfGenerator";

interface BriefCardProps {
  brief: {
    title: string;
    subtitle: string;
    type: string;
    level: string;
    challenge: string;
    artDirectorInsights: string;
    designStrategy: string;
    visualDirection: string;
    details: Array<{ k: string; v: string }>;
    checklist: Array<{ t: string; d: string }>;
    palette: string[];
    message: string;
    tags: string[];
    inspiration: string;
  };
}

export default function BriefCard({ brief }: BriefCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `
${brief.title}

${brief.subtitle}

التحدي:
${brief.challenge}

رؤية Art Director:
${brief.artDirectorInsights}

الاستراتيجية التصميمية:
${brief.designStrategy}

الاتجاه البصري:
${brief.visualDirection}

التفاصيل:
${brief.details.map((d) => `${d.k}: ${d.v}`).join("\n")}

المهام:
${brief.checklist.map((c) => `• ${c.t}: ${c.d}`).join("\n")}

الرسالة:
${brief.message}

الإلهام:
${brief.inspiration}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("تم النسخ إلى الحافظة");
      setTimeout(() => setCopied(false), 2000);
    });
  };



  return (
    <div className="bg-card border border-border/50 rounded-lg overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border-b border-border/50 p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400">
            {brief.type}
          </span>
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${
            brief.level === "مبتدأ"
              ? "bg-green-500/20 border-green-500/30 text-green-400"
              : "bg-rose-500/20 border-rose-500/30 text-rose-400"
          }`}>
            {brief.level}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{brief.title}</h2>
        <p className="text-gray-400">{brief.subtitle}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Art Director Insights */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-purple-300 mb-2">رؤية Art Director</h3>
              <p className="text-gray-300 leading-relaxed">{brief.artDirectorInsights}</p>
            </div>
          </div>
        </div>

        {/* Design Strategy */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <Palette className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-300 mb-2">الاستراتيجية التصميمية</h3>
              <p className="text-gray-300 leading-relaxed">{brief.designStrategy}</p>
            </div>
          </div>
        </div>

        {/* Visual Direction */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <Eye className="h-5 w-5 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-300 mb-2">الاتجاه البصري</h3>
              <p className="text-gray-300 leading-relaxed">{brief.visualDirection}</p>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-500 mb-4">
            <div className="h-1 w-1 rounded-full bg-amber-500" />
            لوحة الألوان
          </h3>
          <div className="flex gap-3">
            {brief.palette.map((color, i) => (
              <div
                key={i}
                className="group relative"
                title={color}
              >
                <div
                  className="h-12 w-12 rounded-lg border border-border/50 shadow-md transition-transform group-hover:scale-110"
                  style={{ backgroundColor: color }}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {color}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-500 mb-4">
            <div className="h-1 w-1 rounded-full bg-amber-500" />
            التحدي الحقيقي
          </h3>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 text-gray-300">
            {brief.challenge}
          </div>
        </div>

        {/* Details */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-500 mb-4">
            <div className="h-1 w-1 rounded-full bg-amber-500" />
            تفاصيل المشروع
          </h3>
          <div className="space-y-3">
            {brief.details.map((detail, i) => (
              <div key={i} className="flex justify-between items-start border-b border-border/30 pb-3 last:border-0">
                <span className="font-semibold text-gray-400">{detail.k}</span>
                <span className="text-white text-right">{detail.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-500 mb-4">
            <div className="h-1 w-1 rounded-full bg-amber-500" />
            قائمة المهام
          </h3>
          <div className="space-y-3">
            {brief.checklist.map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{item.t}</div>
                  <div className="text-sm text-gray-400">{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspiration */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-5">
          <h3 className="font-bold text-indigo-300 mb-2">💡 الإلهام والمراجع</h3>
          <p className="text-gray-300 leading-relaxed">{brief.inspiration}</p>
        </div>

        {/* Message */}
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-lg p-6">
          <div className="text-lg italic text-gray-300 mb-4">
            "{brief.message}"
          </div>
          <div className="text-sm text-amber-400 font-semibold">— فريق ابدأ تصميم</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {brief.tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full bg-border/50 px-3 py-1 text-xs font-semibold text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-border/30">
          <button
            onClick={handleCopy}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-bold transition-all ${
              copied
                ? "bg-green-500/20 border-green-500/30 text-green-400"
                : "bg-amber-500/20 border-amber-500/30 text-amber-400 hover:bg-amber-500/30 hover:border-amber-500/50"
            }`}
          >
            <Copy className="h-4 w-4" />
            {copied ? "تم النسخ بنجاح!" : "نسخ البريف"}
          </button>
        </div>
      </div>
    </div>
  );
}
