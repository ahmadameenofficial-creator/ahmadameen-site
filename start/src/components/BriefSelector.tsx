import { useState } from "react";
import { Zap, Palette, Package, BookOpen, Shield, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BriefSelectorProps {
  onGenerate: (type: string, level: string) => void;
  isLoading: boolean;
}

const DESIGN_TYPES = [
  { id: "branding", name: "هوية بصرية", icon: Palette, desc: "Logo & Brand" },
  { id: "social", name: "سوشال ميديا", icon: BookOpen, desc: "Social Posts" },
  { id: "packaging", name: "تغليف", icon: Package, desc: "Packaging" },
  { id: "poster", name: "بوستر", icon: Zap, desc: "Poster Design" },
];

const LEVELS = [
  { id: "beginner", name: "مبتدأ", icon: Shield, desc: "لسه بتتعلم" },
  { id: "pro", name: "محترف", icon: Flame, desc: "خبرة متقدمة" },
];

export default function BriefSelector({ onGenerate, isLoading }: BriefSelectorProps) {
  const [selectedType, setSelectedType] = useState("branding");
  const [selectedLevel, setSelectedLevel] = useState("beginner");

  return (
    <section id="selector" className="bg-background py-16 md:py-24">
      <div className="container">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl md:text-4xl font-black text-white">
            اختر نوع التصميم ومستواك
          </h2>
          <p className="text-gray-400">سيتغير البريف تماماً حسب اختيارك</p>
        </div>

        {/* Design Types */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">نوع التصميم</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {DESIGN_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`group relative overflow-hidden rounded-lg border-2 p-4 transition-all duration-300 ${
                    isSelected
                      ? "border-amber-500 bg-gradient-to-br from-amber-500/20 to-amber-600/10 shadow-lg shadow-amber-500/20"
                      : "border-border/50 bg-card/50 hover:border-amber-500/50 hover:bg-card/80"
                  }`}
                >
                  {/* Glow effect on hover */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}

                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <Icon className={`h-6 w-6 transition-colors ${isSelected ? "text-amber-500" : "text-gray-400 group-hover:text-amber-500"}`} />
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">{type.name}</div>
                      <div className="text-xs text-gray-500">{type.desc}</div>
                    </div>
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Levels */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">مستواك</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:max-w-md">
            {LEVELS.map((level) => {
              const Icon = level.icon;
              const isSelected = selectedLevel === level.id;
              return (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`group relative overflow-hidden rounded-lg border-2 p-4 transition-all duration-300 ${
                    isSelected
                      ? level.id === "beginner"
                        ? "border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20"
                        : "border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/20"
                      : "border-border/50 bg-card/50 hover:border-amber-500/50"
                  }`}
                >
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <Icon className={`h-6 w-6 transition-colors ${
                      isSelected 
                        ? level.id === "beginner" 
                          ? "text-green-500" 
                          : "text-rose-500"
                        : "text-gray-400"
                    }`} />
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">{level.name}</div>
                      <div className="text-xs text-gray-500">{level.desc}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => onGenerate(selectedType, selectedLevel)}
            disabled={isLoading}
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6 text-lg font-bold text-black shadow-lg shadow-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/60 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  جاري البناء...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  ولّد البريف الآن
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
