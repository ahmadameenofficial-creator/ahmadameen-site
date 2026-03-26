export interface Brief {
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
}

const SECTORS = [
  {
    id: "f&b",
    name: "قطاع الأغذية والمشروبات",
    names: ["زعفران", "لقمة", "مذاق", "نكهة", "أصل"],
    sub: ["مطعم سحابي", "كافيه مختص", "مخبز حرفي"],
    query: "restaurant,food",
  },
  {
    id: "beauty",
    name: "قطاع التجميل والعناية",
    names: ["نضارة", "توليب", "سديم", "مخمل", "نور"],
    sub: ["براند عطور نيش", "منتجات عناية طبيعية", "صالون تجميل فاخر"],
    query: "perfume,beauty",
  },
  {
    id: "tech",
    name: "قطاع التقنية والمال",
    names: ["نواة", "مدى", "أفق", "سد", "رقمي"],
    sub: ["تطبيق Fintech", "منصة تعليمية", "شركة حلول برمجية"],
    query: "technology,app",
  },
  {
    id: "fashion",
    name: "قطاع الموضة والأزياء",
    names: ["خيط", "إرث", "طراز", "نسيج", "قماش"],
    sub: ["براند ملابس مستدامة", "متجر عبايات مودرن", "براند جلود يدوية"],
    query: "fashion,clothing",
  },
];

const LOCATIONS = [
  { n: "القاهرة، مصر", context: "سوق مزدحم، تنافسية عالية، جمهور متنوع، ثقافة استهلاكية غنية." },
  { n: "الرياض، السعودية", context: "نمو سريع، قوة شرائية عالية، توازن بين التراث والحداثة، جمهور متطور." },
  { n: "دبي، الإمارات", context: "عالمية، فخامة، ابتكار بصري غير محدود، معايير عالية جداً." },
  { n: "جدة، السعودية", context: "روح بحرية، انفتاح ثقافي، جمهور ذواق، تأثيرات عالمية." },
];

const CHALLENGES = [
  "البراند يعاني من صورة ذهنية 'قديمة' ويريد جذب جيل الشباب دون فقدان عملائه الحاليين. التحدي: إيجاد توازن بين الحنين والابتكار.",
  "المنتج محلي بجودة عالمية، والتحدي هو إقناع العميل بدفع سعر 'Premium' مقابل صناعة محلية. الحل: تصميم يعكس الحرفية والقيمة.",
  "دخول منافس عالمي للسوق، والمطلوب هو إبراز 'الأصالة' والروح المحلية كعنصر قوة. الفرصة: تحويل الاختلاف إلى ميزة تنافسية.",
  "البراند يعتمد على البساطة المتناهية في سوق يحب التفاصيل الكثيرة. التحدي: إيجاد توازن بين الـ Minimalism والـ Richness البصري.",
];

const ART_DIRECTOR_INSIGHTS = [
  "كـ Art Director، أرى أن القوة الحقيقية تكمن في الـ Restraint. لا تستخدم كل الألوان، بل اختر 2-3 ألوان رئيسية وأتقن استخدامها. الـ Negative Space هو أقوى سلاح في يدك.",
  "الـ Typography ليست مجرد خطوط، هي هوية البراند. اختر خط واحد قوي وأتقن استخدامه في أحجام مختلفة. تذكر: الخط الواحد المختار بذكاء أقوى من 5 خطوط عشوائية.",
  "الصور ليست ديكور، هي جزء من الرسالة. اختر صوراً تحكي قصة، وليس صوراً جميلة فقط. كل صورة يجب أن تضيف معنى وليس مساحة فقط.",
  "الـ Color Psychology مهمة جداً. الذهب ليس فقط لون، هو رسالة عن الفخامة والقيمة. الأسود ليس فقط خلفية، هو بيان عن الاحترافية والثقة.",
  "الـ Consistency هي مفتاح النجاح. كل عنصر يجب أن يتحدث بنفس اللغة البصرية. من الـ Logo إلى الـ Social Media، يجب أن يكون هناك انسجام كامل.",
];

const DESIGN_STRATEGIES = [
  "استخدم الـ Hierarchy البصرية بذكاء: ما الذي تريد المشاهد أن يراه أولاً؟ ثانياً؟ ثالثاً؟ كل عنصر يجب أن يكون له وزن بصري واضح.",
  "الـ White Space ليس فراغ، هو تنفس للعين. استخدمه لإرشاد المشاهد وإعطاء الـ Design مساحة للتنفس. الـ Crowding هو عدو الـ Elegance.",
  "الـ Contrast هو ما يخلق الحيوية. لا تخاف من الاختلافات الجريئة بين العناصر. لكن تذكر: الـ Contrast يجب أن يكون مقصوداً وليس عشوائياً.",
  "الـ Consistency في الـ Details صنع الفرق. الـ Padding، الـ Border Radius، الـ Shadows - كل شيء يجب أن يتبع نظام واضح. هذا ما يفصل بين الـ Amateur والـ Professional.",
  "الـ Emotion هي أساس الـ Design الناجح. ما الشعور الذي تريد أن يشعر به المشاهد؟ Luxury؟ Trust؟ Innovation؟ كل قرار تصميمي يجب أن يخدم هذا الشعور.",
];

const VISUAL_DIRECTIONS = [
  "اتجاه Luxury Minimalism: استخدم الـ Negative Space بسخاء، ركز على الـ Typography القوية، استخدم الألوان بحذر، وأضف لمسات من الـ Texture الدقيقة. الهدف: Elegance من خلال البساطة.",
  "اتجاه Modern Heritage: ادمج العناصر الهندسية الإسلامية بطريقة معاصرة، استخدم الألوان الدافئة مع الأسود، أضف عمق من خلال الـ Layering. الهدف: احترام التراث مع احتضان الحداثة.",
  "اتجاه Bold & Confident: استخدم الألوان الجريئة، الـ Typography الكبيرة، الـ Contrast العالي. لا تخاف من الفراغ الأقل، بل ركز على التأثير البصري القوي. الهدف: جذب الانتباه والثقة.",
  "اتجاه Sophisticated Playfulness: ادمج العناصر الجادة مع لمسات من المرح والإبداع، استخدم الألوان المنسقة بذكاء، أضف Micro-interactions. الهدف: احترافية مع شخصية.",
];

const CLIENT_TONES = [
  "عميل يثق في ذوقك تماماً ويبحث عن الابتكار - أعطه الحرية والجرأة، لكن ادعمها بـ Strategy واضحة.",
  "عميل دقيق جداً ويركز على التفاصيل الصغيرة - اهتم بـ Padding، الـ Alignment، الـ Kerning، كل شيء يجب أن يكون مثالياً.",
  "عميل مستعجل يحتاج لنتائج مبهرة في وقت قياسي - ركز على التأثير البصري الفوري، استخدم الـ Bold Moves.",
  "عميل تقليدي يحتاج لإقناعه بالأفكار الجديدة - اشرح كل قرار تصميمي بـ Logic واضحة وأمثلة من السوق.",
];

const TASKS = {
  branding: [
    "تصميم شعار أساسي (Primary Logo) يعكس جوهر البراند - يجب أن يعمل بحجم صغير وكبير.",
    "تصميم شعار أيقوني (Icon/Mark) يمكن استخدامه بشكل مستقل - يجب أن يكون قابلاً للتذكر.",
    "بناء نظام لوحة ألوان (Color System) مع درجات مختلفة - لكل لون دور واضح في الـ Hierarchy.",
    "اختيار نظام Typography محكم - خط واحد للـ Headlines، خط واحد للـ Body، بأوزان مختلفة.",
    "تصميم 3 تطبيقات واقعية: بزنس كارد، ورق رسمي، موكاب على منتج فعلي.",
    "إنشاء Brand Guidelines توضح كيفية استخدام كل عنصر - هذا يضمن الـ Consistency.",
  ],
  social: [
    "تصميم 3 منشورات إعلانية (Product Showcase) - كل واحدة تحكي جزء من القصة.",
    "تصميم منشور تعليمي (Carousel) من 5 صفحات - يجب أن يكون مفيداً وليس مجرد جميل.",
    "تصميم قالب (Template) موحد للستوريز اليومية - يجب أن يسهل الاستخدام المتكرر.",
    "تحديد نمط معالجة الصور (Image Treatment) - فلاتر، تأثيرات، أسلوب واحد متسق.",
    "تصميم Graphics للـ Reels والـ Videos - يجب أن تكون متحركة وجذابة.",
    "إنشاء Asset Library - كل الـ Icons، الـ Illustrations، الـ Patterns التي ستحتاجها.",
  ],
  packaging: [
    "رسم الـ Dieline الخاص بالعبوة - يجب أن يكون دقيقاً وقابلاً للطباعة.",
    "تصميم الواجهة الأمامية والخلفية مع مراعاة البيانات القانونية - الـ Hierarchy مهمة جداً هنا.",
    "تصميم تجربة الـ Unboxing - ورق التغليف، الـ Stickers، كرت الشكر، كل شيء يحكي القصة.",
    "عمل موكاب (Mockup) واقعي على منتج فعلي - يجب أن يظهر الملمس والـ Lighting بشكل صحيح.",
    "تصميم الـ Secondary Packaging - الكرتونة الخارجية، الـ Labels، كل شيء.",
    "إنشاء Packaging Guidelines - كيفية استخدام الـ Design على أحجام مختلفة.",
  ],
  poster: [
    "تصميم بوستر تشويقي (Teaser) يعتمد على الرمزية - يجب أن يثير الفضول دون أن يكشف كل شيء.",
    "تصميم بوستر معلوماتي يوضح تفاصيل الحدث/المنتج - الـ Information Architecture مهمة جداً.",
    "توزيع العناصر البصرية بناءً على قاعدة التسلسل الهرمي (Hierarchy) - ما الأهم؟",
    "اختيار Typography قوية تعكس طبيعة الحدث - الخط يجب أن يتحدث بنفس لغة الصورة.",
    "استخدام الـ Negative Space بذكاء - لا تملأ كل المساحة، دع العين تستريح.",
    "تجهيز الملف للطباعة بمقاس A2 ونظام ألوان CMYK - الألوان ستبدو مختلفة، تأكد من الـ Proofs.",
  ],
};

const PALETTES = [
  { colors: ["#0a0a0a", "#f0a500", "#f7c04a", "#ffffff"], name: "Luxury Gold" },
  { colors: ["#1a1a1a", "#4ade80", "#22c55e", "#f5f0e8"], name: "Modern Green" },
  { colors: ["#2d2d2d", "#fb7185", "#f43f5e", "#ffffff"], name: "Bold Rose" },
  { colors: ["#111111", "#38bdf8", "#0ea5e9", "#f0f9ff"], name: "Tech Blue" },
  { colors: ["#1a1400", "#ffd97d", "#f0a500", "#ffffff"], name: "Warm Amber" },
];

const MESSAGES = [
  "التصميم هنا ليس فقط شكل جميل - هو استراتيجية بصرية. كل لون، كل خط، كل مسافة يجب أن تخدم هدفاً واضحاً. فكر كـ Art Director، ليس كـ Designer.",
  "الجمهور في هذه المنطقة ذوقه عالي جداً وخبرته بصرية غنية. لا تستخدم الحلول السهلة. ابحث عن الـ Unique Angle الذي يجعل هذا البراند مختلفاً.",
  "تذكر: 'الأقل هو الأكثر' ليست مجرد قاعدة، هي فلسفة. كل عنصر تضيفه يجب أن يكون ضرورياً. إذا شككت، احذفه.",
  "الثقافة العربية غنية بالعناصر الهندسية والرمزية. استخدمها بذكاء وليس بشكل سطحي. الـ Authenticity يأتي من الفهم العميق.",
  "العميل ده بيقدر الابتكار، لكنه يريده مدعوماً بـ Strategy. لا تجرب فكرة مجنونة بدون سبب واضح. كل قرار يجب أن يكون له منطق.",
];

const INSPIRATIONS = [
  "ابحث عن أعمال Pentagram و Wolff Olins - ادرس كيفية بناء الـ Brand Systems.",
  "ادرس أعمال Mucho و Bunch - انظر كيفية استخدام الـ Color والـ Typography بقوة.",
  "انظر إلى تصاميم Ogilvy و Wieden+Kennedy - فهم كيفية ربط الـ Strategy بالـ Design.",
  "ادرس الـ Minimalism من خلال أعمال Dieter Rams - البساطة ليست سهولة.",
  "انظر إلى الـ Cultural Design - كيفية احترام الثقافة المحلية في الـ Global Context.",
];

const TYPE_LABELS: Record<string, string> = {
  branding: "هوية بصرية",
  social: "سوشال ميديا",
  packaging: "تغليف",
  poster: "بوستر",
};

const LEVEL_LABELS: Record<string, string> = {
  beginner: "مبتدأ",
  pro: "محترف",
};

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateBrief(type: string, level: string): Brief {
  const sector = getRandomItem(SECTORS);
  const subSector = getRandomItem(sector.sub);
  const brandName = getRandomItem(sector.names);
  const location = getRandomItem(LOCATIONS);
  const challenge = getRandomItem(CHALLENGES);
  const tone = getRandomItem(CLIENT_TONES);
  const tasks = TASKS[type as keyof typeof TASKS] || TASKS.branding;
  const palette = getRandomItem(PALETTES);
  const message = getRandomItem(MESSAGES);
  const artDirectorInsight = getRandomItem(ART_DIRECTOR_INSIGHTS);
  const designStrategy = getRandomItem(DESIGN_STRATEGIES);
  const visualDirection = getRandomItem(VISUAL_DIRECTIONS);
  const inspiration = getRandomItem(INSPIRATIONS);

  return {
    title: `تصميم ${TYPE_LABELS[type] || type} لـ ${brandName}`,
    subtitle: `${subSector} يقع في ${location.n}. ${location.context}`,
    type: TYPE_LABELS[type] || type,
    level: LEVEL_LABELS[level] || level,
    challenge,
    artDirectorInsights: artDirectorInsight,
    designStrategy,
    visualDirection,
    details: [
      { k: "اسم البراند", v: brandName },
      { k: "الموقع الجغرافي", v: location.n },
      { k: "نبرة صوت العميل", v: tone },
      { k: "المطلوب تنفيذه", v: TYPE_LABELS[type] || type },
      { k: "المواصفات الفنية", v: type === "poster" ? "A2 | CMYK | 300 DPI" : "1080x1080 | RGB | 72 DPI" },
      { k: "المدة المتوقعة", v: level === "pro" ? "4-6 أيام" : "2-3 أيام" },
    ],
    checklist: tasks.map((t) => ({
      t: t.split("(")[0].trim(),
      d: t,
    })),
    palette: palette.colors,
    message,
    tags: [LEVEL_LABELS[level] || level, TYPE_LABELS[type] || type, "سوق حقيقي", "Art Director Brief"],
    inspiration,
  };
}
