import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BriefSelector from "@/components/BriefSelector";
import BriefCard from "@/components/BriefCard";
import DesignReviewService from "@/components/DesignReviewService";
import Footer from "@/components/Footer";
import { generateBrief, Brief } from "@/lib/briefEngine";
import { toast } from "sonner";

export default function Home() {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [briefCount, setBriefCount] = useState(0);

  // Load brief count from localStorage
  useEffect(() => {
    const count = localStorage.getItem("briefCount");
    if (count) {
      setBriefCount(parseInt(count));
    }
  }, []);

  const handleGenerate = (type: string, level: string) => {
    setIsLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      try {
        const newBrief = generateBrief(type, level);
        setBrief(newBrief);
        
        // Update counter
        const newCount = briefCount + 1;
        setBriefCount(newCount);
        localStorage.setItem("briefCount", newCount.toString());
        
        // Update header counter
        const counterEl = document.getElementById("briefCounter");
        if (counterEl) {
          counterEl.textContent = newCount.toString();
        }
        
        toast.success("تم إنشاء البريف بنجاح!");
        
        // Scroll to brief
        setTimeout(() => {
          document.getElementById("brief-result")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } catch (error) {
        toast.error("حدث خطأ أثناء إنشاء البريف");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="pt-20">
      <HeroSection />
      <BriefSelector onGenerate={handleGenerate} isLoading={isLoading} />
      
      {brief && (
        <section id="brief-result" className="bg-background py-16 md:py-24">
          <div className="container">
            <BriefCard brief={brief} />
          </div>
        </section>
      )}
      
      {/* Learning Section */}
      {brief && (
        <section className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-y border-indigo-500/20 py-12 md:py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                تريد تعلم جرافيك من الصفر؟
              </h3>
              <p className="text-gray-400 mb-6">
                انضم إلى ورشة أمين واتعلم من الخبير نفسه كل أساسيات التصميم والـ Art Direction
              </p>
              <a
                href="https://ahmadameen.space"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 font-bold text-white hover:bg-indigo-600 transition-colors"
              >
                ادخل ورشة أمين
              </a>
            </div>
          </div>
        </section>
      )}
      
      {/* Design Review Service */}
      <DesignReviewService />

      {/* Footer */}
      <Footer />
      </main>
    </div>
  );
}
