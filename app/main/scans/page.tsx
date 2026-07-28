"use client";

import { useState, type SVGProps } from "react";
import { useTibyanNavigation } from "@/components/tibyan-shell";

type IconProps = SVGProps<SVGSVGElement>;
type Mode = "ai" | "human" | null;

function SparklesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="m12 3 1.2 3.2L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3-3.3-1.2 3.3-1.3L12 3Z" />
      <path d="m18.5 13 .8 2.1 2.2.9-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.9.8-2.1Z" />
      <path d="m5 13 .7 1.8 1.8.7-1.8.7L5 18l-.7-1.8-1.8-.7 1.8-.7L5 13Z" />
    </svg>
  );
}

function DoctorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M5.5 20v-2.2A6.5 6.5 0 0 1 12 11.3a6.5 6.5 0 0 1 6.5 6.5V20" />
      <path d="M8 14.5v2.2a2 2 0 0 0 4 0v-2.2M16.5 15.5h2M17.5 14.5v2" />
    </svg>
  );
}

function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 5h14v10H9l-4 4V5Z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 13h3v3H8zM14 13h2M14 16h2" />
    </svg>
  );
}

function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function BowlIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 11h16a8 8 0 0 1-16 0Z" />
      <path d="M8 7c1.5-2 3.5-2 5-4M14 8c1-1.8 2.8-2.2 4-3.5M7 19h10" />
    </svg>
  );
}

function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 3 5 6v5c0 4.5 2.8 7.8 7 10 4.2-2.2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
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

function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

const aiBenefits = [
  "تحليل أولي للعادات الغذائية",
  "اقتراح خطة يومية مرنة",
  "متابعة الأهداف والتقدم",
  "إجابات فورية على مدار الساعة",
];

const humanBenefits = [
  "استشارة مع مختص تغذية",
  "خطة علاجية مخصصة",
  "متابعة دورية وتقييم مستمر",
  "مراعاة التاريخ الصحي والاحتياجات",
];

export default function ScansPage() {
  const { goBack } = useTibyanNavigation();
  const [activeMode, setActiveMode] = useState<Mode>(null);
  const [message, setMessage] = useState("");
  const [goal, setGoal] = useState("تحسين نمط الغذاء");

  const closeModal = () => {
    setActiveMode(null);
    setMessage("");
  };

  return (
    <main dir="rtl" className="nutrition-page min-h-screen overflow-x-hidden bg-[#f7fcff] text-[#073b72]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="nutrition-grid absolute inset-0 opacity-60" />
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-[#37cf7b]/15 blur-3xl" />
        <div className="absolute -left-28 top-[30rem] h-96 w-96 rounded-full bg-[#0aa5b5]/12 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[30%] h-80 w-80 rounded-full bg-[#0876d9]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={goBack}
          className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-2xl border border-[#0a86c7]/12 bg-white/90 px-4 text-sm font-bold text-[#0876d9] shadow-[0_10px_28px_rgba(4,77,132,0.08)] transition hover:-translate-y-0.5 hover:bg-white"
        >
          <ArrowIcon className="h-5 w-5" />
          العودة
        </button>

        <section className="hero-card relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/80 p-5 shadow-[0_35px_100px_rgba(4,70,127,0.12)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="hero-shine absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full border-[34px] border-[#0876d9]/5" />
            <div className="absolute -bottom-24 right-12 h-64 w-64 rounded-full border-[38px] border-[#38c96f]/6" />
          </div>

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#32c878]/20 bg-[#effdf4] px-4 py-2 text-xs font-bold text-[#18a95d]">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#38c96f]" />
                رعاية غذائية ذكية ومتكاملة
              </div>

              <h1 className="mt-5 text-3xl font-black leading-[1.3] text-[#064c91] sm:text-4xl lg:text-5xl">
                التغذية العلاجية
                <span className="mr-2 bg-gradient-to-l from-[#0876d9] via-[#0bb0b6] to-[#38c96f] bg-clip-text text-transparent">
                  بين الذكاء والخبرة
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm font-semibold leading-8 text-[#5c839a] sm:text-base">
                اختر المسار الأنسب لك: دكتور ذكاء اصطناعي يرافقك يوميًا، أو أخصائي تغذية بشري يقدم لك متابعة شخصية دقيقة.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" onClick={() => setActiveMode("ai")} className="mode-button is-active">
                  <SparklesIcon className="h-5 w-5" />
                  دكتور الذكاء الاصطناعي
                </button>

                <button type="button" onClick={() => setActiveMode("human")} className="mode-button">
                  <DoctorIcon className="h-5 w-5" />
                  أخصائي التغذية
                </button>
              </div>
            </div>

            <div className="nutrition-orbit relative mx-auto grid min-h-[300px] w-full max-w-[430px] place-items-center">
              <div className="absolute h-64 w-64 rounded-full border border-dashed border-[#0a86c7]/20 sm:h-72 sm:w-72" />
              <div className="absolute h-52 w-52 rounded-full border border-[#35c86f]/18 sm:h-60 sm:w-60" />
              <div className="nutrition-aura absolute h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(56,201,111,.22)_0%,rgba(12,170,184,.12)_48%,transparent_74%)] blur-xl" />

              <div className="nutrition-core relative z-10 grid h-40 w-40 place-items-center rounded-[2.5rem] bg-gradient-to-br from-[#0876d9] via-[#0aa9ba] to-[#38c96f] text-white shadow-[0_28px_70px_rgba(4,86,143,.28)] sm:h-48 sm:w-48">
                <BowlIcon className="h-20 w-20 sm:h-24 sm:w-24" />
              </div>

              <span className="floating-badge badge-1"><SparklesIcon className="h-6 w-6" /></span>
              <span className="floating-badge badge-2"><CalendarIcon className="h-6 w-6" /></span>
              <span className="floating-badge badge-3"><ShieldIcon className="h-6 w-6" /></span>
            </div>
          </div>
        </section>

        <section className="mt-7 grid gap-5 lg:grid-cols-2">
          <article className="choice-card">
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#0876d9] to-[#0aa9ba] text-white shadow-[0_16px_35px_rgba(8,118,217,.22)]">
                <SparklesIcon className="h-8 w-8" />
              </span>
              <span className="rounded-full bg-[#eef8ff] px-3 py-1.5 text-[11px] font-black text-[#0876d9]">متاح 24/7</span>
            </div>

            <h2 className="mt-5 text-2xl font-black text-[#075dab]">دكتور الذكاء الاصطناعي</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#658ba3]">
              مساعد غذائي ذكي يحلل بياناتك الأولية ويقترح خطوات يومية قابلة للتطبيق.
            </p>

            <ul className="mt-5 space-y-3">
              {aiBenefits.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-bold text-[#416c85]">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#eaf8ff] text-[#0876d9]">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setActiveMode("ai")}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0aa9ba] px-5 text-sm font-black text-white shadow-[0_16px_35px_rgba(8,118,217,.22)] transition hover:-translate-y-1"
            >
              <ChatIcon className="h-5 w-5" />
              ابدأ الاستشارة الذكية
            </button>
          </article>

          <article className="choice-card">
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#38c96f] to-[#0aa9ba] text-white shadow-[0_16px_35px_rgba(56,201,111,.22)]">
                <DoctorIcon className="h-8 w-8" />
              </span>
              <span className="rounded-full bg-[#effdf4] px-3 py-1.5 text-[11px] font-black text-[#18a95d]">متابعة شخصية</span>
            </div>

            <h2 className="mt-5 text-2xl font-black text-[#075dab]">أخصائي تغذية بشري</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#658ba3]">
              تواصل مع مختص مؤهل للحصول على خطة علاجية ومتابعة مستمرة حسب حالتك.
            </p>

            <ul className="mt-5 space-y-3">
              {humanBenefits.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-bold text-[#416c85]">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#effdf4] text-[#18a95d]">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setActiveMode("human")}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#38c96f] to-[#0aa9ba] px-5 text-sm font-black text-white shadow-[0_16px_35px_rgba(56,201,111,.22)] transition hover:-translate-y-1"
            >
              <CalendarIcon className="h-5 w-5" />
              احجز مع أخصائي
            </button>
          </article>
        </section>

        <section className="mt-7 rounded-[2rem] border border-[#0a86c7]/10 bg-white p-5 shadow-[0_20px_55px_rgba(3,77,132,.08)] sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-sm font-black text-[#10a4a9]">كيف تبدأ؟</p>
              <h2 className="mt-2 text-2xl font-black text-[#064c91]">ثلاث خطوات لصحة غذائية أوضح</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#658ba3]">
                أدخل بياناتك الأساسية، اختر المسار، ثم تابع خطتك وتقدمك من مكان واحد.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["01", "أدخل بياناتك"],
                ["02", "اختر نوع المتابعة"],
                ["03", "ابدأ خطتك"],
              ].map(([number, label]) => (
                <div key={number} className="rounded-2xl border border-[#0a86c7]/10 bg-gradient-to-br from-[#f7fcff] to-white p-5">
                  <span className="text-2xl font-black text-[#0aa9ba]">{number}</span>
                  <p className="mt-4 text-sm font-black text-[#416c85]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#f1c75b]/30 bg-[#fffaf0] p-4 text-sm font-semibold leading-7 text-[#7b6532]">
          <ShieldIcon className="mt-1 h-5 w-5 shrink-0 text-[#d6a52d]" />
          <p>
            الإرشادات الذكية للمساعدة العامة ولا تغني عن تقييم الطبيب أو أخصائي التغذية، خصوصًا عند وجود أمراض مزمنة أو أعراض مقلقة.
          </p>
        </div>
      </div>

      {activeMode && (
        <div
          className="modal-backdrop fixed inset-0 z-[130] grid place-items-center bg-[#032f57]/45 px-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section className="modal-card relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/80 bg-white p-5 shadow-[0_35px_110px_rgba(1,35,67,.32)] sm:p-7">
            <button
              type="button"
              onClick={closeModal}
              className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-[#0a86c7]/10 bg-white text-[#6b91a8] transition hover:bg-[#effcfc] hover:text-[#0876d9]"
              aria-label="إغلاق"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <span className={`grid h-16 w-16 place-items-center rounded-2xl text-white shadow-lg ${activeMode === "ai" ? "bg-gradient-to-br from-[#0876d9] to-[#0aa9ba]" : "bg-gradient-to-br from-[#38c96f] to-[#0aa9ba]"}`}>
                {activeMode === "ai" ? <SparklesIcon className="h-8 w-8" /> : <DoctorIcon className="h-8 w-8" />}
              </span>
              <div>
                <p className="text-xs font-black text-[#0aa3a7]">
                  {activeMode === "ai" ? "استشارة فورية" : "حجز موعد"}
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#064c91]">
                  {activeMode === "ai" ? "دكتور التغذية الذكي" : "أخصائي التغذية البشري"}
                </h2>
              </div>
            </div>

            {activeMode === "ai" ? (
              <div className="mt-6">
                <label className="block text-sm font-black text-[#416c85]">هدفك الغذائي</label>
                <select
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  className="mt-2 h-12 w-full rounded-2xl border border-[#0a86c7]/15 bg-[#f7fcff] px-4 text-sm font-bold text-[#315f7a] outline-none focus:border-[#0aa9ba]"
                >
                  <option>تحسين نمط الغذاء</option>
                  <option>إنقاص الوزن</option>
                  <option>زيادة الوزن بشكل صحي</option>
                  <option>تنظيم الوجبات</option>
                  <option>متابعة حالة مزمنة</option>
                </select>

                <label className="mt-5 block text-sm font-black text-[#416c85]">اكتب سؤالك</label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={5}
                  placeholder="مثال: أريد خطة غذائية يومية تناسب وقت عملي..."
                  className="mt-2 w-full resize-none rounded-2xl border border-[#0a86c7]/15 bg-[#f7fcff] p-4 text-sm font-semibold leading-7 text-[#315f7a] outline-none focus:border-[#0aa9ba]"
                />

                <button
                  type="button"
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0aa9ba] px-5 text-sm font-black text-white"
                >
                  <ChatIcon className="h-5 w-5" />
                  إرسال إلى الدكتور الذكي
                </button>
              </div>
            ) : (
              <div className="mt-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["الأحد", "05:00 مساءً"],
                    ["الاثنين", "07:30 مساءً"],
                    ["الأربعاء", "04:00 مساءً"],
                    ["الخميس", "08:00 مساءً"],
                  ].map(([day, time]) => (
                    <button
                      type="button"
                      key={`${day}-${time}`}
                      className="rounded-2xl border border-[#0a86c7]/12 bg-[#f7fcff] p-4 text-right transition hover:-translate-y-1 hover:border-[#38c96f]/35 hover:bg-[#effdf4]"
                    >
                      <p className="text-sm font-black text-[#075dab]">{day}</p>
                      <p className="mt-1 text-xs font-bold text-[#5f8399]">{time}</p>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#38c96f] to-[#0aa9ba] px-5 text-sm font-black text-white"
                >
                  <CalendarIcon className="h-5 w-5" />
                  تأكيد طلب الحجز
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      <style jsx global>{`
        .nutrition-page {
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }

        .nutrition-grid {
          background-image:
            linear-gradient(rgba(8,118,217,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,118,217,.04) 1px, transparent 1px);
          background-size: 42px 42px;
          animation: nutritionGridMove 18s linear infinite;
        }

        .hero-card::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,.5) 48%, transparent 72%);
          transform: translateX(115%);
          animation: nutritionSoftShine 7s ease-in-out infinite;
        }

        .hero-shine {
          animation: nutritionHeroScan 6.5s ease-in-out infinite;
        }

        .mode-button {
          display: inline-flex;
          min-height: 46px;
          align-items: center;
          gap: 9px;
          border: 1px solid rgba(8,118,217,.12);
          border-radius: 16px;
          background: #fff;
          padding: 0 17px;
          color: #5a8199;
          font-size: .82rem;
          font-weight: 900;
          box-shadow: 0 10px 24px rgba(4,77,132,.07);
          transition: all .25s ease;
        }

        .mode-button:hover {
          transform: translateY(-2px);
        }

        .mode-button.is-active {
          border-color: transparent;
          background: linear-gradient(135deg, #0876d9, #0aa9ba);
          color: #fff;
          box-shadow: 0 16px 34px rgba(8,118,217,.22);
        }

        .nutrition-orbit > div:first-child {
          animation: nutritionSpin 18s linear infinite;
        }

        .nutrition-orbit > div:nth-child(2) {
          animation: nutritionSpinReverse 14s linear infinite;
        }

        .nutrition-aura {
          animation: nutritionAura 4.8s ease-in-out infinite;
        }

        .nutrition-core {
          animation: nutritionFloat 4.4s ease-in-out infinite;
        }

        .floating-badge {
          position: absolute;
          z-index: 15;
          display: grid;
          height: 52px;
          width: 52px;
          place-items: center;
          border: 1px solid rgba(255,255,255,.9);
          border-radius: 17px;
          background: rgba(255,255,255,.95);
          color: #0aa0ad;
          box-shadow: 0 16px 34px rgba(4,77,132,.15);
          backdrop-filter: blur(10px);
          animation: nutritionBadgeFloat 4s ease-in-out infinite;
        }

        .badge-1 { top: 18%; right: 12%; }
        .badge-2 { bottom: 14%; right: 16%; animation-delay: .7s; }
        .badge-3 { bottom: 20%; left: 12%; animation-delay: 1.4s; }

        .choice-card {
          border: 1px solid rgba(10,134,199,.1);
          border-radius: 28px;
          background: #fff;
          padding: 24px;
          box-shadow: 0 20px 55px rgba(3,77,132,.08);
          transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
        }

        .choice-card:hover {
          transform: translateY(-7px);
          border-color: rgba(12,170,184,.3);
          box-shadow: 0 30px 75px rgba(3,88,147,.15);
        }

        .modal-backdrop { animation: modalFadeIn .22s ease-out both; }
        .modal-card { animation: modalCardIn .35s cubic-bezier(.2,.85,.25,1.12) both; }

        @keyframes nutritionGridMove { to { background-position: 42px 42px; } }
        @keyframes nutritionSoftShine {
          0%, 45% { transform: translateX(115%); }
          70%, 100% { transform: translateX(-115%); }
        }
        @keyframes nutritionHeroScan {
          0%, 100% { left: -18%; opacity: 0; }
          22% { opacity: 1; }
          65% { opacity: 1; }
          82% { left: 112%; opacity: 0; }
        }
        @keyframes nutritionSpin { to { transform: rotate(360deg); } }
        @keyframes nutritionSpinReverse { to { transform: rotate(-360deg); } }
        @keyframes nutritionAura {
          0%, 100% { opacity: .55; transform: scale(.92); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes nutritionFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1.2deg); }
        }
        @keyframes nutritionBadgeFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.04); }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalCardIn {
          from { opacity: 0; transform: translateY(24px) scale(.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 640px) {
          .nutrition-orbit { min-height: 260px; }
          .floating-badge { height: 44px; width: 44px; border-radius: 14px; }
          .badge-1 { right: 8%; }
          .badge-2 { right: 10%; }
          .badge-3 { left: 8%; }
          .choice-card { padding: 20px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .001ms !important;
          }
        }
      `}</style>
    </main>
  );
}