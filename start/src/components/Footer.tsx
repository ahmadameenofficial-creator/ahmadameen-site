import { ExternalLink, Coffee, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const handleCoffeeClick = () => {
    const message = `مرحباً! أنا أحب تصميمك وأود أن أعزمك على قهوة ☕`;
    const phone = "201090912747";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText("01090912747").then(() => {
      toast.success("تم نسخ رقم الهاتف!");
    });
  };

  const handlePayment = (method: string) => {
    const message = `أريد أن أعزمك على قهوة عبر ${method}`;
    const phone = "201090912747";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-background/80">
      {/* Main Footer */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">ابدأ تصميم</h3>
            <p className="text-gray-400 leading-relaxed">
              أداة احترافية لتوليد بريفات التصميم من منظور Art Director عالمي. ساعد المصممين على فهم احتياجات السوق الحقيقية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">الروابط السريعة</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://ahmadameen.space/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  البورتفولي والأعمال
                </a>
              </li>
              <li>
                <a
                  href="https://ahmadameen.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  الموقع الشخصي
                </a>
              </li>
            </ul>
          </div>

          {/* Coffee Section */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <Coffee className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-white">اعزمني على قهوة</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              إذا أعجبك الموقع، يمكنك أن تعزمني على قهوة من خلال:
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handlePayment("Instapay")}
                className="w-full px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-semibold hover:bg-blue-500/30 transition-colors"
              >
                Instapay
              </button>
              <button
                onClick={() => handlePayment("Vodafone Cash")}
                className="w-full px-3 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-colors"
              >
                Vodafone Cash
              </button>
              <button
                onClick={copyPhoneNumber}
                className="w-full px-3 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-semibold hover:bg-amber-500/30 transition-colors"
              >
                01090912747
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">من $1 فقط</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 ابدأ تصميم. صُنع بواسطة{" "}
            <a
              href="https://ahmadameen.space/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              أحمد أمين
            </a>
          </p>

          {/* WhatsApp Button */}
          <button
            onClick={handleCoffeeClick}
            className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
          >
            <MessageCircle className="h-4 w-4" />
            تواصل عبر WhatsApp
          </button>
        </div>
      </div>

      {/* Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-amber-500 text-black shadow-lg shadow-amber-500/40 hover:bg-amber-600 transition-all hover:scale-110 flex items-center justify-center font-bold z-40"
      >
        ↑
      </button>
    </footer>
  );
}
