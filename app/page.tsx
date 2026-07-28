"use client";

import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { useTibyanNavigation } from "../components/tibyan-shell";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const tibyanFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-tibyan",
  preload: true,
});

type Service = {
  title: string;
  description: string;
  href: string;
  badge: string;
  icon: ComponentType<IconProps>;
};


function AiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M9 3h6M12 3V1M8 7h8a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4Z" />
      <path d="M8.5 12h.01M15.5 12h.01M9 16h6M2 13H1M23 13h-1" />
    </svg>
  );
}


function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

function LabIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M9 3h6M10 3v6l-5.3 8.8A2 2 0 0 0 6.4 21h11.2a2 2 0 0 0 1.7-3.2L14 9V3" />
      <path d="M7.5 16h9M10 13h4" />
    </svg>
  );
}

function NutritionIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M4 11h16a8 8 0 0 1-16 0Z" />
      <path d="M8 7c1.5-2 3.5-2 5-4M14 8c1-1.8 2.8-2.2 4-3.5M7 19h10" />
    </svg>
  );
}

function PharmacyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="m8.5 4.5 11 11a4.24 4.24 0 0 1-6 6l-11-11a4.24 4.24 0 1 1 6-6Z" />
      <path d="m7 15 8-8" />
    </svg>
  );
}

function ConsultationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 13h3v3H8zM14 13h2M14 16h2" />
    </svg>
  );
}

function HeartPulseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M3 12h4l1.4-3 3.2 7 2.1-4H21" />
    </svg>
  );
}


function StethoscopeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M6 3v5a6 6 0 0 0 12 0V3" />
      <path d="M6 3H4M18 3h2M12 14v2a5 5 0 0 0 10 0v-1" />
      <circle cx="21" cy="12" r="2" />
    </svg>
  );
}

function ClipboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M9 5H6a2 2 0 0 0-2 2v13h16V7a2 2 0 0 0-2-2h-3" />
      <path d="M9 3h6v4H9zM8 12l1.5 1.5L12 11M14 12h3M8 17l1.5 1.5L12 16M14 17h3" />
    </svg>
  );
}

/**
 * شعار تبيان مرسوم بالكامل داخل الكود بصيغة SVG.
 * لا يعتمد على أي صورة خارجية، وتبقى الخلفية شفافة في جميع المقاسات.
 */
function TibyanLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-labelledby="tibyan-logo-title tibyan-logo-description"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="tibyan-logo-title">شعار مشروع تبيان الطبي</title>
      <desc id="tibyan-logo-description">
        علامة طبية تجمع الصليب والنبض والإنسان والورقة الصحية.
      </desc>

      <defs>
        <linearGradient id="tibyan-cross" x1="58" y1="53" x2="211" y2="257" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#12c7c4" />
          <stop offset="0.34" stopColor="#0789da" />
          <stop offset="0.72" stopColor="#0758ba" />
          <stop offset="1" stopColor="#073d91" />
        </linearGradient>

        <linearGradient id="tibyan-cross-light" x1="79" y1="62" x2="171" y2="203" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ee1dc" stopOpacity="0.62" />
          <stop offset="1" stopColor="#2e7be0" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="tibyan-body" x1="157" y1="118" x2="218" y2="252" gradientUnits="userSpaceOnUse">
          <stop stopColor="#166dd1" />
          <stop offset="0.52" stopColor="#0b82cc" />
          <stop offset="1" stopColor="#0755ad" />
        </linearGradient>

        <linearGradient id="tibyan-leaf" x1="225" y1="91" x2="247" y2="278" gradientUnits="userSpaceOnUse">
          <stop stopColor="#53d977" />
          <stop offset="0.52" stopColor="#28c87a" />
          <stop offset="1" stopColor="#00a99d" />
        </linearGradient>

        <linearGradient id="tibyan-leaf-shine" x1="250" y1="112" x2="232" y2="246" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a7f4b4" stopOpacity="0.82" />
          <stop offset="1" stopColor="#27c98a" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="tibyan-lower-swoosh" x1="118" y1="280" x2="286" y2="203" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0b69c7" />
          <stop offset="0.56" stopColor="#08aeb5" />
          <stop offset="1" stopColor="#37d16f" />
        </linearGradient>

        <radialGradient id="tibyan-head" cx="0" cy="0" r="1" gradientTransform="translate(154 84) rotate(57) scale(43)">
          <stop stopColor="#ffffff" />
          <stop offset="0.68" stopColor="#f8fdff" />
          <stop offset="1" stopColor="#deeff8" />
        </radialGradient>

        <filter id="tibyan-logo-shadow" x="-28%" y="-28%" width="156%" height="170%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="14" stdDeviation="13" floodColor="#075c9e" floodOpacity="0.22" />
        </filter>

        <filter id="tibyan-inner-glow" x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="out" result="glow" />
          <feColorMatrix
            in="glow"
            type="matrix"
            values="0 0 0 0 0.16 0 0 0 0 0.82 0 0 0 0 0.91 0 0 0 .42 0"
          />
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>

      <g filter="url(#tibyan-logo-shadow)">
        {/* كتلة الصليب الطبية — بنفس اتجاه الشعار الأصلي */}
        <path
          d="M105 40C86 40 71 55 71 74V104H43C25 104 11 118 11 136V185C11 203 25 217 43 217H78L67 277L126 224C131 219 137 217 144 217H163V187H195C213 187 227 173 227 155V136C227 118 213 104 195 104H163V74C163 55 148 40 129 40H105Z"
          fill="url(#tibyan-cross)"
        />

        <path
          d="M108 48C92 48 80 60 80 76V116H50C35 116 24 127 24 142V161C53 142 84 126 120 117C139 112 156 110 178 111V76C178 61 166 48 150 48H108Z"
          fill="url(#tibyan-cross-light)"
        />

        {/* نبضة القلب */}
        <path
          className="tibyan-heartbeat"
          d="M29 160H72L82 141L94 183L111 119L129 193L145 151L158 168H193"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* رأس الإنسان */}
        <circle cx="158" cy="92" r="28" fill="url(#tibyan-head)" />
        <circle cx="151" cy="84" r="9" fill="#ffffff" fillOpacity="0.72" />

        {/* الجسم الأبيض الذي يفصل الصليب عن الورقة */}
        <path
          d="M147 120C164 139 179 153 195 160C185 185 169 211 144 238C134 248 124 258 110 270C145 256 174 238 194 215C214 191 227 158 237 120C220 143 203 158 187 167C176 146 163 130 147 120Z"
          fill="#ffffff"
        />

        {/* انحناءة الجسم الزرقاء */}
        <path
          d="M169 121C183 144 193 166 198 188C214 162 228 136 247 108C227 152 213 195 211 239C196 212 183 175 169 121Z"
          fill="url(#tibyan-body)"
        />

        {/* الورقة الصحية */}
        <path
          className="tibyan-leaf"
          d="M248 86C286 113 304 160 290 205C279 242 248 266 210 279C219 247 211 222 214 191C216 154 226 112 248 86Z"
          fill="url(#tibyan-leaf)"
        />

        <path
          d="M252 104C275 132 282 164 274 194C267 220 249 240 224 254C236 221 233 195 238 165C241 143 246 122 252 104Z"
          fill="url(#tibyan-leaf-shine)"
        />

        <path
          d="M263 121C261 158 250 194 229 231"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />

        {/* السهم السفلي الذي يجمع عناصر العلامة */}
        <path
          d="M103 281C158 271 206 248 244 213C259 200 270 185 283 166C274 212 248 246 210 266C178 283 142 288 103 281Z"
          fill="url(#tibyan-lower-swoosh)"
        />

        <path
          d="M119 275C160 264 197 245 227 218"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.46"
        />
      </g>
    </svg>
  );
}

const orbitIcons = [
  { Icon: HeartPulseIcon, color: "#0876d9" },
  { Icon: StethoscopeIcon, color: "#08a6b9" },
  { Icon: ClipboardIcon, color: "#116dcc" },
  { Icon: LabIcon, color: "#0a8ac8" },
  { Icon: PharmacyIcon, color: "#17aeaa" },
  { Icon: ConsultationIcon, color: "#35bd70" },
];

const services: Service[] = [
  {
    title: "الفحوصات والمختبرات",
    description: "فحوصات ومختبرات متكاملة لعرض النتائج وإدارتها.",
    href: "/main/labs",
    badge: "5 فحوصات ذكية",
    icon: LabIcon,
  },
  {
    title: "لوحة التحكم",
    description: "نظرة سريعة على حالة المستخدم والبيانات المهمة.",
    href: "/main/dashboard",
    badge: "بيانات لحظية",
    icon: AiIcon,
  },
  {
    title: "الصيدلية الذكية",
    description: "البحث عن الأدوية والبدائل ومتابعة الطلبات.",
    href: "/main/pharmacy",
    badge: "بحث فوري",
    icon: PharmacyIcon,
  },
  {
    title: "الاستشارات والمواعيد",
    description: "حجز واستشارات طبية مع الأطباء والمختصين.",
    href: "/main/consultations",
    badge: "حجز سريع",
    icon: ConsultationIcon,
  },
  {
    title: "الفحوصات البصرية والماسحات",
    description: "نتائج المسح البصري والتقارير المرتبطة بها.",
    href: "/main/scans",
    badge: "نتائج دقيقة",
    icon: HeartPulseIcon,
  },
  {
    title: "الإعدادات",
    description: "تحكم في حسابك وتفضيلات التطبيق.",
    href: "/main/settings",
    badge: "خيارات",
    icon: HeartPulseIcon,
  },
];


export default function HomePage() {
  const { navigate } = useTibyanNavigation();

  return (
    <main
      dir="rtl"
      className={`${tibyanFont.variable} tibyan-page min-h-screen overflow-x-hidden bg-[#f7fcff] text-[#073b72]`}
    >
      {/* خلفية هندسية طبية */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="medical-grid absolute inset-0 opacity-60" />
        <div className="absolute -right-28 top-28 h-80 w-80 rounded-full bg-[#12b7bd]/15 blur-3xl" />
        <div className="absolute -left-32 top-[36rem] h-96 w-96 rounded-full bg-[#0876d9]/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[20%] h-80 w-80 rounded-full bg-[#38c96f]/15 blur-3xl" />
      </div>


      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {/* القسم الرئيسي */}
        <section className="hero-shell relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 px-5 py-8 shadow-[0_35px_100px_rgba(4,70,127,0.12)] backdrop-blur-xl sm:px-9 sm:py-11 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="hero-scan absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-[#12b7bd]/10 to-transparent" />
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full border-[32px] border-[#0876d9]/5" />
            <div className="absolute -bottom-24 right-[35%] h-64 w-64 rounded-full border-[38px] border-[#35c86f]/5" />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#12b7bd]/20 bg-[#eafafa] px-4 py-2 text-xs font-bold text-[#078c96] shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38c96f] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#38c96f]" />
                </span>
                منصة طبية هندسية مدعومة بالذكاء الاصطناعي
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-[1.25] text-[#064c91] sm:text-5xl lg:text-6xl">
                صحتك أوضح مع
                <span className="relative mx-3 inline-block bg-gradient-to-l from-[#0876d9] via-[#0eabb8] to-[#36c96f] bg-clip-text text-transparent">
                  تبيان
                  <span className="absolute -bottom-2 right-0 h-1.5 w-full origin-right rounded-full bg-gradient-to-l from-[#0876d9] via-[#12b7bd] to-[#38c96f] hero-underline" />
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-[#4e7894] sm:text-lg">
                منظومة تجمع الطب والهندسة في تجربة واحدة؛ من الفحوصات البصرية والمختبرات إلى التغذية العلاجية والصيدلية الذكية والاستشارات الطبية.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/main/labs", "الفحوصات والمختبرات")}
                  className="group inline-flex min-h-12 items-center gap-3 rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0caab8] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_35px_rgba(8,118,217,0.28)] transition hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(8,118,217,0.35)] focus:outline-none focus:ring-4 focus:ring-[#0876d9]/20"
                >
                  ابدأ رحلتك الصحية
                  <ArrowIcon className="h-5 w-5 transition group-hover:-translate-x-1" />
                </button>

              </div>

              <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
                {[
                  ["5+", "فحوصات ذكية"],
                  ["24/7", "مساعد صحي"],
                  ["4", "خدمات متكاملة"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="stats-card rounded-2xl border border-[#0a86c7]/10 bg-white/80 p-3 text-center shadow-sm backdrop-blur"
                  >
                    <p className="text-xl font-bold text-[#0876d9] sm:text-2xl">{value}</p>
                    <p className="mt-1 text-[11px] font-bold text-[#6790a8] sm:text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* الشعار المتحرك — مرسوم بالكامل بالكود */}
            <div className="tibyan-logo-stage relative mx-auto grid min-h-[360px] w-full max-w-[470px] place-items-center sm:min-h-[430px]">
              <div className="orbit-canvas pointer-events-none absolute h-[340px] w-[340px] sm:h-[420px] sm:w-[420px]" aria-hidden="true">
                <div className="engineering-ring absolute inset-0 rounded-full border border-dashed border-[#0a86c7]/25" />
                <div className="engineering-ring reverse absolute inset-[30px] rounded-full border border-[#12b7bd]/20 sm:inset-[38px]" />
                <div className="orbit-energy-ring absolute inset-[66px] rounded-full border border-[#35c86f]/15 sm:inset-[78px]" />

                {orbitIcons.map(({ Icon, color }, index) => {
                  const angle = index * 60;

                  return (
                    <div
                      key={index}
                      className="orbit-slot absolute inset-0"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <div className="orbit-runner absolute inset-0">
                        <div className="orbit-anchor absolute left-1/2 top-1/2">
                          <div style={{ transform: `rotate(${-angle}deg)` }}>
                            <div className="orbit-counter">
                              <div
                                className="orbit-badge grid place-items-center rounded-2xl border border-white/90 bg-white/95 backdrop-blur-md"
                                style={{ color }}
                              >
                                <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="logo-aura pointer-events-none absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(18,183,189,0.20)_0%,rgba(8,118,217,0.10)_46%,transparent_72%)] blur-xl sm:h-80 sm:w-80" aria-hidden="true" />

              <div className="logo-core relative z-10 h-56 w-56 sm:h-72 sm:w-72">
                <TibyanLogo className="h-full w-full overflow-visible" />
              </div>
            </div>
          </div>
        </section>

        {/* نصيحة اليوم */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-[#34c76e]/20 bg-gradient-to-l from-[#effdf4] via-white to-[#eefbff] p-5 shadow-[0_18px_50px_rgba(3,87,135,0.08)] sm:p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#38c96f] to-[#11b4ae] text-2xl text-white shadow-[0_12px_28px_rgba(56,201,111,0.28)]">
                ✦
              </span>
              <div>
                <p className="text-xs font-semibold tracking-normal text-[#18a95d]">نصيحة تبيان اليومية</p>
                <p className="mt-1 text-sm font-bold leading-7 text-[#365f79] sm:text-base">
                  احتفظ بنتائج فحوصاتك السابقة؛ المقارنة الزمنية تساعد الطبيب على فهم التغيّرات بدقة أكبر.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#078c96] shadow-sm ring-1 ring-[#12b7bd]/10">
              <span className="h-2 w-2 rounded-full bg-[#38c96f]" />
              معلومة موثوقة
            </div>
          </div>
        </section>

        {/* الخدمات */}
        <section className="mt-12">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold text-[#10a4a9]">منظومة تبيان</p>
              <h2 className="mt-2 text-2xl font-bold text-[#064c91] sm:text-3xl">كل ما تحتاجه لصحة أوضح</h2>
            </div>
            <p className="max-w-xl text-sm font-medium leading-7 text-[#6a8fa7]">
              اختر الخدمة، وستظهر حركة الشعار قبل انتقالك إلى الصفحة المطلوبة.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.href}
                  type="button"
                  onClick={() => navigate(service.href, service.title)}
                  style={{ animationDelay: `${index * 120}ms` }}
                  className="service-card group relative min-h-[220px] overflow-hidden rounded-[1.75rem] border border-[#0a86c7]/10 bg-white p-6 text-right shadow-[0_20px_55px_rgba(3,77,132,0.09)] transition duration-500 hover:-translate-y-2 hover:border-[#10b6b8]/35 hover:shadow-[0_30px_75px_rgba(3,88,147,0.17)] focus:outline-none focus:ring-4 focus:ring-[#12b7bd]/15 sm:p-7"
                >
                  <span className="card-light pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#0876d9]/[0.08] blur-2xl transition duration-700 group-hover:translate-x-10 group-hover:translate-y-12" />
                  <span className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-[#38c96f]/10 blur-2xl transition duration-700 group-hover:-translate-x-8 group-hover:-translate-y-8" />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#0876d9] via-[#0b9fc3] to-[#16b8ad] text-white shadow-[0_16px_35px_rgba(8,118,217,0.24)] transition duration-500 group-hover:-rotate-6 group-hover:scale-110">
                        <Icon className="h-8 w-8" />
                      </span>
                      <span className="rounded-full border border-[#10b6b8]/15 bg-[#effcfc] px-3 py-1.5 text-[11px] font-bold text-[#0b979b]">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-[#075dab] sm:text-2xl">{service.title}</h3>
                    <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-[#658ba3]">
                      {service.description}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-[#0a98a1]">
                      فتح الخدمة
                      <ArrowIcon className="h-5 w-5 transition duration-300 group-hover:-translate-x-2" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* مسار العمل */}
        <section className="mt-12 rounded-[2rem] border border-[#0a86c7]/10 bg-gradient-to-l from-[#064f97] via-[#0876d9] to-[#0aa7b7] p-6 text-white shadow-[0_30px_80px_rgba(4,85,151,0.22)] sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold text-[#a9fff0]">هندسة التجربة الصحية</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">من السؤال إلى القرار في خطوات واضحة</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-white/75">
                صُممت رحلة المستخدم لتكون سريعة، منظمة، وقابلة للتطوير عند ربط الذكاء الاصطناعي وقواعد البيانات لاحقاً.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["01", "اختر الخدمة"],
                ["02", "أدخل البيانات"],
                ["03", "استلم التوجيه"],
              ].map(([number, label]) => (
                <div key={number} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                  <span className="text-2xl font-bold text-[#a9fff0]">{number}</span>
                  <p className="mt-4 text-sm font-bold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#0a86c7]/10 py-6 text-center text-xs font-semibold text-[#7194aa] sm:flex-row sm:text-right">
          <p>© تبيان — منصة تجمع الطب والهندسة بذكاء.</p>
          <p>الواجهة للإرشاد التقني ولا تُعد تشخيصاً طبياً.</p>
        </footer>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #f7fcff;
        }


        .tibyan-page,
        .tibyan-page button,
        .tibyan-page input,
        .tibyan-page textarea,
        .tibyan-page select {
          font-family: var(--font-tibyan), "IBM Plex Sans Arabic", Tahoma, Arial, sans-serif;
        }

        .tibyan-page {
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .tibyan-page :where(h1, h2, h3, p, span, button) {
          letter-spacing: 0;
        }

        .medical-grid,
        .transition-grid {
          background-image:
            linear-gradient(rgba(8, 118, 217, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8, 118, 217, 0.045) 1px, transparent 1px);
          background-size: 42px 42px;
          animation: gridMove 18s linear infinite;
        }

        .hero-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,.48) 45%, transparent 70%);
          transform: translateX(110%);
          animation: softShine 7s ease-in-out infinite;
        }

        .hero-scan {
          animation: heroScan 6.5s ease-in-out infinite;
        }

        .hero-underline {
          animation: underlinePulse 2.8s ease-in-out infinite;
        }

        .engineering-ring {
          animation: slowSpin 18s linear infinite;
          box-shadow: 0 0 50px rgba(18, 183, 189, 0.08);
        }

        .engineering-ring.reverse {
          animation-direction: reverse;
          animation-duration: 13s;
        }

        .tibyan-logo-stage {
          --orbit-radius: 142px;
          isolation: isolate;
        }

        .logo-core {
          animation: logoFloat 4.5s ease-in-out infinite;
          filter: drop-shadow(0 28px 32px rgba(3, 82, 143, 0.2));
          transform-origin: 50% 55%;
        }

        .logo-aura {
          animation: logoAura 4.8s ease-in-out infinite;
        }

        .orbit-energy-ring {
          box-shadow:
            0 0 45px rgba(18, 183, 189, 0.08),
            inset 0 0 35px rgba(56, 201, 111, 0.04);
          animation: orbitEnergy 4s ease-in-out infinite;
        }

        .orbit-runner {
          animation: orbitSpin 22s linear infinite;
          transform-origin: 50% 50%;
          will-change: transform;
        }

        .orbit-anchor {
          transform: translate(-50%, -50%) translateX(var(--orbit-radius));
        }

        .orbit-counter {
          animation: orbitCounter 22s linear infinite;
          will-change: transform;
        }

        .orbit-badge {
          width: 56px;
          height: 56px;
          box-shadow:
            0 16px 34px rgba(4, 77, 132, 0.16),
            0 0 0 5px rgba(255, 255, 255, 0.32),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          animation: orbitBadgeBreath 3.8s ease-in-out infinite;
        }

        .orbit-slot:nth-child(5) .orbit-badge {
          animation-delay: .35s;
        }

        .orbit-slot:nth-child(6) .orbit-badge {
          animation-delay: .7s;
        }

        .orbit-slot:nth-child(7) .orbit-badge {
          animation-delay: 1.05s;
        }

        .orbit-slot:nth-child(8) .orbit-badge {
          animation-delay: 1.4s;
        }

        .orbit-slot:nth-child(9) .orbit-badge {
          animation-delay: 1.75s;
        }

        .orbit-slot:nth-child(10) .orbit-badge {
          animation-delay: 2.1s;
        }

        .tibyan-logo-stage:hover .orbit-runner,
        .tibyan-logo-stage:hover .orbit-counter {
          animation-play-state: paused;
        }

        .tibyan-heartbeat {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: heartbeatTrace 4.2s ease-in-out infinite;
        }

        .tibyan-leaf {
          transform-box: fill-box;
          transform-origin: 50% 80%;
          animation: leafBreath 4.6s ease-in-out infinite;
        }

        .stats-card {
          animation: statsBreath 4s ease-in-out infinite;
        }

        .stats-card:nth-child(2) {
          animation-delay: .5s;
        }

        .stats-card:nth-child(3) {
          animation-delay: 1s;
        }

        .service-card {
          animation: cardEnter .75s both;
        }

        .service-card::after {
          content: "";
          position: absolute;
          top: -120%;
          left: -30%;
          width: 32%;
          height: 340%;
          transform: rotate(18deg);
          background: linear-gradient(to right, transparent, rgba(255,255,255,.72), transparent);
          transition: transform .85s ease;
        }

        .service-card:hover::after {
          transform: translateX(520%) rotate(18deg);
        }

        .ai-button::after {
          content: "";
          position: absolute;
          inset: -5px;
          z-index: -1;
          border-radius: 20px;
          border: 1px solid rgba(18, 183, 189, .35);
          animation: aiPulse 1.8s ease-out infinite;
        }

        .transition-screen {
          animation: screenIn .28s ease-out both;
        }

        .transition-logo {
          animation: transitionLogo 1.2s cubic-bezier(.2,.85,.25,1) both;
        }

        .transition-orbit {
          --x: 0px;
          --y: 0px;
          --delay: 0ms;
          animation: orbitExplode 1.15s cubic-bezier(.22,.85,.25,1) var(--delay) both;
        }

        .transition-ring {
          animation: fastSpin 2.2s linear infinite;
        }

        .transition-ring.reverse {
          animation-direction: reverse;
          animation-duration: 1.7s;
        }

        .loading-line {
          animation: loadingProgress 1.25s ease-in-out both;
          transform-origin: right;
        }

        @keyframes gridMove {
          to { background-position: 42px 42px; }
        }

        @keyframes softShine {
          0%, 45% { transform: translateX(110%); }
          70%, 100% { transform: translateX(-110%); }
        }

        @keyframes heroScan {
          0%, 100% { left: -15%; opacity: 0; }
          20% { opacity: 1; }
          60% { opacity: 1; }
          80% { left: 110%; opacity: 0; }
        }

        @keyframes underlinePulse {
          0%, 100% { transform: scaleX(.72); opacity: .7; }
          50% { transform: scaleX(1); opacity: 1; }
        }

        @keyframes slowSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes fastSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.5deg); }
        }


        @keyframes logoAura {
          0%, 100% { opacity: .58; transform: scale(.92); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        @keyframes orbitSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes orbitCounter {
          to { transform: rotate(-360deg); }
        }

        @keyframes orbitEnergy {
          0%, 100% { opacity: .45; transform: scale(.96); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        @keyframes orbitBadgeBreath {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.045); }
        }

        @keyframes heartbeatTrace {
          0%, 14% { stroke-dashoffset: 260; opacity: .38; }
          44%, 78% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -260; opacity: .38; }
        }

        @keyframes leafBreath {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(1.4deg) scale(1.018); }
        }

        @keyframes statsBreath {
          0%, 100% { transform: translateY(0); box-shadow: 0 1px 2px rgba(0,0,0,.03); }
          50% { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(8,118,217,.08); }
        }

        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(28px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes aiPulse {
          0% { transform: scale(.9); opacity: .85; }
          100% { transform: scale(1.28); opacity: 0; }
        }

        @keyframes screenIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes transitionLogo {
          0% { opacity: 0; transform: scale(.45) rotate(-18deg); filter: blur(10px); }
          35% { opacity: 1; transform: scale(1.08) rotate(3deg); filter: blur(0); }
          75% { transform: scale(.94) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        @keyframes orbitExplode {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(.25) rotate(-90deg);
          }
          38% {
            opacity: 1;
            transform: translate(var(--x), var(--y)) scale(1.08) rotate(10deg);
          }
          68% {
            opacity: 1;
            transform: translate(var(--x), var(--y)) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(0, 0) scale(.22) rotate(180deg);
          }
        }

        @keyframes loadingProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @media (min-width: 640px) {
          .tibyan-logo-stage {
            --orbit-radius: 180px;
          }

          .orbit-badge {
            width: 64px;
            height: 64px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .001ms !important;
          }
        }
      `}</style>
    </main>
  );
}