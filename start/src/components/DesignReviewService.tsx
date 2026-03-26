import { useState, useRef } from "react";
import { Star, Zap, CheckCircle, AlertCircle, Send, ArrowRight, Copy, Check } from "lucide-react";
import { toast } from "sonner";

type Step = "personal" | "payment" | "confirmation";

interface FormData {
  name: string;
  email: string;
  phone: string;
  paymentMethod: string;
  transactionId: string;
}

interface PaymentMethod {
  id: string;
  label: string;
  details: string[];
  copyText: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "mobile",
    label: "Instapay و Vodafone Cash",
    details: ["الرقم: 01090912747"],
    copyText: "01090912747",
  },
  {
    id: "bank",
    label: "الحساب البنكي",
    details: [
      "IBAN: EG440046020200000059100911887",
      "Account: 059100911887",
    ],
    copyText: "EG440046020200000059100911887",
  },
];

export default function DesignReviewService() {
  const [step, setStep] = useState<Step>("personal");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
    transactionId: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("تم النسخ!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isPersonalValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim()
    );
  };

  const isPaymentValid = () => {
    return (
      formData.paymentMethod &&
      formData.transactionId.trim()
    );
  };

  const handleSubmit = () => {
    if (!isPaymentValid()) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    const message = `
مرحباً! لدي طلب تقييم تصميم

📋 البيانات الشخصية:
الاسم: ${formData.name}
الإيميل: ${formData.email}
الهاتف: ${formData.phone}

💳 طريقة الدفع: ${formData.paymentMethod}
🔖 رقم العملية: ${formData.transactionId}

📸 يرجى إرسال:
1. سكرين شوت للدفع
2. المشروع المراد تقييمه

✨ سيقيمه مصمم بخبرة 11+ سنة في المجال
    `.trim();

    const phone = "201090912747";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setStep("confirmation");
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-background to-background pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
            <Star className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-bold text-amber-400">خدمة احترافية</span>
          </div>
          <h2 className="mb-4 text-4xl md:text-5xl font-black text-white">
            قيّم تصميمك الآن
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            احصل على تقييم احترافي من مصمم بخبرة 11+ سنة
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-card via-card to-card/80 border border-amber-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10">
            {/* Progress Indicator */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b border-amber-500/20 px-8 py-4">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className={`flex flex-col items-center ${step === "personal" ? "opacity-100" : "opacity-50"}`}>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${step === "personal" ? "bg-amber-500 text-black" : "bg-green-500 text-white"}`}>
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <span className="text-xs font-bold">البيانات</span>
                </div>

                <div className={`flex-1 h-1 mx-2 ${step !== "personal" ? "bg-green-500" : "bg-gray-600"}`} />

                <div className={`flex flex-col items-center ${step === "payment" ? "opacity-100" : "opacity-50"}`}>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${step === "payment" ? "bg-amber-500 text-black" : step === "confirmation" ? "bg-green-500 text-white" : "bg-gray-600 text-white"}`}>
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <span className="text-xs font-bold">الدفع</span>
                </div>

                <div className={`flex-1 h-1 mx-2 ${step === "confirmation" ? "bg-green-500" : "bg-gray-600"}`} />

                <div className={`flex flex-col items-center ${step === "confirmation" ? "opacity-100" : "opacity-50"}`}>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${step === "confirmation" ? "bg-green-500 text-white" : "bg-gray-600 text-white"}`}>
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold">تأكيد</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Step 1: Personal Info */}
              {step === "personal" && (
                <>
                  <h3 className="text-lg font-bold text-white mb-6">الخطوة 1: بيانات التواصل</h3>

                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="أحمد محمد"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="01090912747"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => isPersonalValid() && setStep("payment")}
                    disabled={!isPersonalValid()}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 font-bold text-black hover:shadow-lg hover:shadow-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    التالي
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Step 2: Payment */}
              {step === "payment" && (
                <>
                  <h3 className="text-lg font-bold text-white mb-6">الخطوة 2: الدفع</h3>

                  {/* Price Summary */}
                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">السعر:</span>
                      <span className="text-2xl font-black text-amber-500">$3</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-amber-500 mb-4">💳 اختر طريقة الدفع</h4>
                    <div className="space-y-3 mb-6">
                      {PAYMENT_METHODS.map((method) => (
                        <label
                          key={method.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.paymentMethod === method.id
                              ? "border-amber-500 bg-amber-500/10"
                              : "border-border/30 bg-background/50 hover:border-border/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={formData.paymentMethod === method.id}
                              onChange={handleFormChange}
                              className="w-4 h-4 mt-1"
                            />
                            <div className="flex-1">
                              <div className="font-semibold text-white mb-2">{method.label}</div>
                              <div className="space-y-2">
                                {method.details.map((detail, idx) => (
                                  <div key={idx} className="flex items-center justify-between bg-background/50 p-2 rounded">
                                    <span className="text-sm text-gray-300">{detail}</span>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        copyToClipboard(method.copyText, `${method.id}-${idx}`);
                                      }}
                                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-semibold transition-colors"
                                    >
                                      {copiedId === `${method.id}-${idx}` ? (
                                        <>
                                          <Check className="h-3 w-3" />
                                          تم
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="h-3 w-3" />
                                          نسخ
                                        </>
                                      )}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Transaction ID */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        رقم العملية / الإيصال
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleFormChange}
                        placeholder="أدخل رقم العملية من تطبيق الدفع"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("personal")}
                      className="flex-1 px-6 py-3 rounded-lg border border-border/50 text-white font-bold hover:bg-border/30 transition-colors"
                    >
                      رجوع
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!isPaymentValid()}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-bold text-black hover:shadow-lg hover:shadow-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send className="h-4 w-4" />
                      إرسال الطلب
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Confirmation */}
              {step === "confirmation" && (
                <div className="text-center py-8">
                  <div className="mb-6 inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 border border-green-500/30">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">تم إرسال الطلب بنجاح! ✅</h3>
                  <p className="text-gray-400 mb-6">
                    شكراً لاختيارك خدمتنا. يرجى إرسال سكرين شوت للدفع والمشروع المراد تقييمه عبر WhatsApp.
                  </p>

                  <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-4 mb-6 text-left">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">الاسم:</span>
                        <span className="text-white font-semibold">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">طريقة الدفع:</span>
                        <span className="text-white font-semibold">{formData.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">السعر:</span>
                        <span className="text-amber-500 font-bold">$3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">المقيّم:</span>
                        <span className="text-green-400 font-semibold">مصمم بخبرة 11+ سنة</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setStep("personal");
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        paymentMethod: "",
                        transactionId: "",
                      });
                    }}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 font-bold text-black hover:shadow-lg hover:shadow-amber-500/40 transition-all"
                  >
                    طلب تقييم جديد
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          {step !== "confirmation" && (
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-indigo-300 mb-1">معلومة مهمة</div>
                  <p className="text-sm text-gray-300">
                    التقييم يتم من قبل مصمم بخبرة 11+ سنة في المجال. ستحصل على تقرير مفصل مع نقاط قوة وتحسين وخطوات عملية لتطوير مستواك.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
