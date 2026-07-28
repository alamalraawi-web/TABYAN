"use client";

import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactElement,
  type SVGProps,
} from "react";
import { useTibyanNavigation } from "@/components/tibyan-shell";

type IconProps = SVGProps<SVGSVGElement>;
type Panel = "ai" | "human" | "scan" | "order" | null;
type DeliveryMode = "pickup" | "delivery";
type PaymentMode = "wallet" | "bank" | "cash";

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

function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <defs>
        <linearGradient id="shield-a" x1="7" y1="5" x2="29" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#d8f8ff" />
        </linearGradient>
      </defs>
      <path d="M18 3.7 6.5 8v8.1c0 7.5 4.5 13 11.5 16.2 7-3.2 11.5-8.7 11.5-16.2V8L18 3.7Z" fill="currentColor" opacity=".16" />
      <path d="M18 5.2 8 8.9v7c0 6.4 3.8 11.2 10 14.2 6.2-3 10-7.8 10-14.2v-7L18 5.2Z" fill="url(#shield-a)" stroke="currentColor" strokeWidth="1.8" />
      <path d="m13.8 18 2.8 2.8 6-6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24.5" cy="10.7" r="1.1" fill="currentColor" className="icon-pulse-dot" />
    </svg>
  );
}

function NeuralDoctorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" {...props}>
      <defs>
        <linearGradient id="neural-a" x1="7" y1="5" x2="37" y2="39" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#dff9ff" />
        </linearGradient>
      </defs>
      <circle cx="22" cy="13" r="7" fill="currentColor" opacity=".13" />
      <circle cx="22" cy="13" r="6" fill="url(#neural-a)" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 39v-5.3A12 12 0 0 1 22 21.7a12 12 0 0 1 12 12V39" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16.2 26.2v4.2a3.5 3.5 0 0 0 7 0v-4.2M29.5 26.5v4.2M27.4 28.6h4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="11.5" r="1.15" fill="currentColor" />
      <circle cx="28" cy="11.5" r="1.15" fill="currentColor" />
      <path d="M18.2 16.5c2.5 1.6 5.1 1.6 7.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 10h4M32 10h4M11.2 5.5 14 8M32.8 5.5 30 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="icon-neural-rays" />
    </svg>
  );
}

function HumanPharmacistIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" {...props}>
      <circle cx="22" cy="12.5" r="6.6" fill="currentColor" opacity=".13" />
      <circle cx="22" cy="12.5" r="5.7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.5 39v-5A12.5 12.5 0 0 1 22 21.5 12.5 12.5 0 0 1 34.5 34v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 26v4.2a3.2 3.2 0 0 0 6.4 0V26M28 27.5h5M30.5 25v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16.3 7.5c2.6-2.8 8.7-3.3 11.5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M19.3 16.6c1.8 1.1 3.6 1.1 5.4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 35h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

function CapsuleGalaxyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <linearGradient id="capsule-g" x1="7" y1="5" x2="42" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#dff8ff" />
        </linearGradient>
      </defs>
      <path d="m13 7 28 28a8 8 0 0 1-11.3 11.3l-28-28A8 8 0 1 1 13 7Z" fill="currentColor" opacity=".14" />
      <path d="m14.1 8.4 25.5 25.5a6.8 6.8 0 0 1-9.6 9.6L4.5 18a6.8 6.8 0 1 1 9.6-9.6Z" fill="url(#capsule-g)" stroke="currentColor" strokeWidth="2" />
      <path d="m17.4 31.1 13.7-13.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m10.5 12.2 5.2 5.2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="36.5" cy="10.5" r="2" fill="currentColor" className="icon-orbit-dot" />
      <path d="M31.5 8.8c4.7-2.6 9.6-.4 11.5 3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".7" className="icon-orbit-path" />
    </svg>
  );
}

function CameraScanIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" {...props}>
      <path d="M10 12h6l2.2-3.5h7.6L28 12h6a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z" fill="currentColor" opacity=".12" />
      <path d="M11 13h5.5l2.1-3.4h6.8l2.1 3.4H33a3 3 0 0 1 3 3v15a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V16a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="22" cy="23.5" r="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="22" cy="23.5" r="4" fill="currentColor" opacity=".14" />
      <path d="M15 23.5h14" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" className="icon-scan-line" />
      <circle cx="32.2" cy="17.2" r="1.3" fill="currentColor" />
    </svg>
  );
}

function MedicineRadarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" {...props}>
      <circle cx="22" cy="22" r="15" fill="currentColor" opacity=".1" />
      <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="22" cy="22" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="icon-radar-ring" />
      <path d="M22 22 33 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="icon-radar-hand" />
      <circle cx="22" cy="22" r="2" fill="currentColor" />
      <circle cx="31.5" cy="16.4" r="2" fill="currentColor" className="icon-radar-dot" />
      <path d="M8 22h4M32 22h4M22 8v4M22 32v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MapPulseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" {...props}>
      <path d="m7 10 10-4 10 4 10-4v28l-10 4-10-4-10 4V10Z" fill="currentColor" opacity=".12" />
      <path d="m8 11 9-3.5 10 4 9-3.5v25l-9 3.5-10-4L8 36V11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M17 7.5V33M27 11.5V36.5" stroke="currentColor" strokeWidth="1.4" opacity=".7" />
      <path d="M22 14.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" fill="currentColor" opacity=".18" />
      <path d="M22 14.5a4.2 4.2 0 0 1 4.2 4.2c0 3.2-4.2 7.5-4.2 7.5s-4.2-4.3-4.2-7.5a4.2 4.2 0 0 1 4.2-4.2Z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="22" cy="18.7" r="1.5" fill="currentColor" className="icon-map-pulse" />
    </svg>
  );
}

function DeliveryDroneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" {...props}>
      <path d="M15 19h14v9H15v-9Z" fill="currentColor" opacity=".12" />
      <path d="M16 19.8h12v7.4H16v-7.4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 18h20M11 13h7M26 13h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="8.5" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.7" className="icon-drone-rotor" />
      <circle cx="35.5" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.7" className="icon-drone-rotor reverse" />
      <path d="M15 28 11 33M29 28l4 5M11 33h6M27 33h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M20 22h4M22 20v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function WalletWaveIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" {...props}>
      <path d="M8 12h24a5 5 0 0 1 5 5v17H8V12Z" fill="currentColor" opacity=".12" />
      <path d="M9 13h22.5a4.5 4.5 0 0 1 4.5 4.5V33H9V13Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M29 19h8v8h-8a4 4 0 1 1 0-8Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="31.5" cy="23" r="1.2" fill="currentColor" />
      <path d="M11 9h17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M14 28c3-2.2 6-2.2 9 0 3 2.2 6 2.2 9 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="icon-wallet-wave" />
    </svg>
  );
}

function ReportCrystalIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" {...props}>
      <path d="M11 6h15l7 7v25H11V6Z" fill="currentColor" opacity=".11" />
      <path d="M12 7h13.5L32 13.5V37H12V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M25.5 7v7H32M16 19h12M16 24h12M16 29h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m16 14 1.7 1.7 3.5-3.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 31.5 30 28l2 3.5-2 3.5-2-3.5Z" fill="currentColor" className="icon-crystal" />
    </svg>
  );
}

const pharmacyResults = [
  { name: "صيدلية الشفاء", distance: "1.2 كم", stock: "متوفر", eta: "20 دقيقة" },
  { name: "صيدلية النور", distance: "2.8 كم", stock: "كمية محدودة", eta: "35 دقيقة" },
  { name: "صيدلية الحياة", distance: "4.1 كم", stock: "متوفر", eta: "45 دقيقة" },
];

export default function PharmacyPage() {
  const { goBack } = useTibyanNavigation();

  const [panel, setPanel] = useState<Panel>(null);
  const [medicineImage, setMedicineImage] = useState<string | null>(null);
  const [reportName, setReportName] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [question, setQuestion] = useState("");
  const [searched, setSearched] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("pickup");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("wallet");

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const reportInputRef = useRef<HTMLInputElement | null>(null);

  const chosenPharmacy = useMemo(() => pharmacyResults[0], []);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => setMedicineImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleReport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setReportName(file.name);
  };

  const closePanel = () => {
    setPanel(null);
    setSearched(false);
  };

  return (
    <main dir="rtl" className="pharmacy-page min-h-screen overflow-x-hidden bg-[#f4fbff] text-[#073b72]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="pharmacy-grid absolute inset-0 opacity-65" />
        <div className="absolute -right-28 top-24 h-96 w-96 rounded-full bg-[#0876d9]/12 blur-3xl" />
        <div className="absolute -left-32 top-[34rem] h-[28rem] w-[28rem] rounded-full bg-[#12b7bd]/14 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[28%] h-96 w-96 rounded-full bg-[#38c96f]/12 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={goBack}
          className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-2xl border border-[#0a86c7]/12 bg-white/90 px-4 text-sm font-black text-[#0876d9] shadow-[0_10px_28px_rgba(4,77,132,.08)] transition hover:-translate-y-0.5"
        >
          <ArrowIcon className="h-5 w-5" />
          العودة
        </button>

        <section className="hero-shell relative overflow-hidden rounded-[2.3rem] border border-white/90 bg-white/80 p-5 shadow-[0_40px_120px_rgba(4,70,127,.14)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="hero-scan absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full border-[38px] border-[#0876d9]/5" />
            <div className="absolute -bottom-28 right-20 h-72 w-72 rounded-full border-[42px] border-[#38c96f]/5" />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0aa9ba]/20 bg-[#ecfbfb] px-4 py-2 text-xs font-black text-[#07959d]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38c96f] opacity-70" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-[#38c96f]" />
                </span>
                صيدلية ذكية تستجيب لك في كل لحظة
              </div>

              <h1 className="mt-5 text-3xl font-black leading-[1.23] text-[#064c91] sm:text-4xl lg:text-6xl">
                من صورة الدواء
                <span className="mr-3 bg-gradient-to-l from-[#0876d9] via-[#0aa9ba] to-[#38c96f] bg-clip-text text-transparent">
                  إلى باب منزلك
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-sm font-semibold leading-8 text-[#5d839a] sm:text-base">
                اسأل الدكتور الصيدلي الذكي، ارفع صورة العبوة أو التقرير، اعثر على الدواء داخل شبكة الصيدليات، ثم اختر الاستلام أو التوصيل والدفع من مكان واحد.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" onClick={() => setPanel("ai")} className="hero-primary">
                  <NeuralDoctorIcon className="h-7 w-7" />
                  ابدأ مع الدكتور الذكي
                </button>

                <button type="button" onClick={() => setPanel("scan")} className="hero-secondary">
                  <CameraScanIcon className="h-7 w-7" />
                  افحص صورة الدواء
                </button>
              </div>

              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#f1c75b]/30 bg-[#fffaf0] p-4 text-xs font-bold leading-6 text-[#7b6532] sm:text-sm">
                <ShieldIcon className="mt-0.5 h-6 w-6 shrink-0 text-[#d6a52d]" />
                <p>
                  المنصة تقدم معلومات دوائية وإرشادًا أوليًا ولا تستبدل الطبيب أو الصيدلي، ولا تغيّر الجرعات أو الوصفات دون مراجعة مختص مؤهل.
                </p>
              </div>
            </div>

            <div className="pharmacy-universe relative mx-auto grid min-h-[330px] w-full max-w-[470px] place-items-center">
              <div className="absolute h-80 w-80 rounded-full border border-dashed border-[#0876d9]/22 sm:h-[360px] sm:w-[360px]" />
              <div className="absolute h-64 w-64 rounded-full border border-[#12b7bd]/18 sm:h-72 sm:w-72" />
              <div className="universe-aura absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(8,118,217,.22)_0%,rgba(18,183,189,.12)_48%,transparent_74%)] blur-xl" />

              <div className="capsule-core relative z-10 grid h-48 w-48 place-items-center rounded-[3.2rem] bg-gradient-to-br from-[#0876d9] via-[#0aa9ba] to-[#38c96f] text-white shadow-[0_34px_90px_rgba(4,86,143,.32)] sm:h-56 sm:w-56">
                <CapsuleGalaxyIcon className="h-28 w-28 sm:h-32 sm:w-32" />
              </div>

              {[
                [NeuralDoctorIcon, "top-[4%] right-[17%]"],
                [HumanPharmacistIcon, "top-[22%] left-[3%]"],
                [MapPulseIcon, "bottom-[9%] left-[15%]"],
                [DeliveryDroneIcon, "bottom-[5%] right-[19%]"],
                [WalletWaveIcon, "top-[45%] right-[0%]"],
              ].map(([Icon, position], index) => {
                const RenderIcon = Icon as (props: IconProps) => ReactElement;
                return (
                  <span
                    key={index}
                    className={`orbit-icon absolute z-20 grid h-14 w-14 place-items-center rounded-2xl border border-white/90 bg-white/95 text-[#0a98a1] shadow-[0_18px_38px_rgba(4,77,132,.16)] ${position}`}
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <RenderIcon className="h-8 w-8" />
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <article className="feature-card">
            <span className="feature-icon bg-gradient-to-br from-[#0876d9] to-[#0aa9ba]">
              <NeuralDoctorIcon className="h-10 w-10" />
            </span>
            <p className="mt-5 text-xs font-black text-[#0aa3a7]">TIBYAN PHARMA AI</p>
            <h2 className="mt-1 text-2xl font-black text-[#075dab]">الدكتور الصيدلي الذكي</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#658ba3]">
              محادثة منظمة تفهم اسم الدواء، المستخدم، العمر، الحساسية، الحالة الصحية والأدوية الحالية.
            </p>
            <button type="button" onClick={() => setPanel("ai")} className="card-action">
              بدء المحادثة
            </button>
          </article>

          <article className="feature-card">
            <span className="feature-icon bg-gradient-to-br from-[#38c96f] to-[#0aa9ba]">
              <HumanPharmacistIcon className="h-10 w-10" />
            </span>
            <p className="mt-5 text-xs font-black text-[#18a95d]">مراجعة بشرية</p>
            <h2 className="mt-1 text-2xl font-black text-[#075dab]">الصيدلي الاستشاري</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#658ba3]">
              استشارة بشرية للأسئلة المعقدة والتداخلات الدوائية والحالات التي تحتاج مراجعة متخصصة.
            </p>
            <button type="button" onClick={() => setPanel("human")} className="card-action green">
              طلب استشارة
            </button>
          </article>

          <article className="feature-card">
            <span className="feature-icon bg-gradient-to-br from-[#0aa9ba] to-[#0876d9]">
              <MedicineRadarIcon className="h-10 w-10" />
            </span>
            <p className="mt-5 text-xs font-black text-[#0aa3a7]">شبكة الصيدليات</p>
            <h2 className="mt-1 text-2xl font-black text-[#075dab]">البحث الذكي عن الدواء</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#658ba3]">
              أرسل الاسم أو الصورة والتقرير، ثم اعرض التوفر والمسافة ووقت الوصول وخيارات الاستلام.
            </p>
            <button type="button" onClick={() => setPanel("scan")} className="card-action">
              بدء البحث
            </button>
          </article>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <article className="workflow-card">
            <div>
              <p className="text-sm font-black text-[#0aa3a7]">رحلة الطلب الذكية</p>
              <h2 className="mt-2 text-2xl font-black text-[#064c91]">أربع مراحل في تجربة واحدة</h2>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {[
                [CameraScanIcon, "01", "صورة أو سؤال"],
                [MedicineRadarIcon, "02", "تحقق من التوفر"],
                [MapPulseIcon, "03", "اختر الصيدلية"],
                [DeliveryDroneIcon, "04", "استلام أو توصيل"],
              ].map(([Icon, number, label]) => {
                const RenderIcon = Icon as (props: IconProps) => ReactElement;
                return (
                  <div key={String(number)} className="workflow-step">
                    <RenderIcon className="h-8 w-8 text-[#0876d9]" />
                    <span className="mt-3 text-2xl font-black text-[#0aa9ba]">{String(number)}</span>
                    <p className="mt-2 text-sm font-black text-[#416c85]">{String(label)}</p>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="control-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black text-[#0aa3a7]">مركز التحكم</p>
                <h2 className="mt-2 text-2xl font-black text-[#064c91]">كل شيء تحت السيطرة</h2>
              </div>
              <WalletWaveIcon className="h-12 w-12 text-[#0876d9]" />
            </div>

            <div className="mt-6 space-y-3">
              {[
                ["التوفر اللحظي", "شبكة الصيدليات"],
                ["طرق الدفع", "محفظة وحساب بنكي"],
                ["التوصيل", "تتبع حالة الطلب"],
              ].map(([title, value]) => (
                <div key={title} className="flex items-center justify-between rounded-2xl bg-[#f7fcff] px-4 py-4">
                  <span className="text-sm font-black text-[#416c85]">{title}</span>
                  <span className="text-xs font-bold text-[#0aa3a7]">{value}</span>
                </div>
              ))}
            </div>

            <button type="button" onClick={() => setPanel("order")} className="card-action mt-5">
              فتح مركز الطلب
            </button>
          </article>
        </section>
      </div>

      {panel && (
        <div
          className="panel-backdrop fixed inset-0 z-[150] grid place-items-center overflow-y-auto bg-[#032f57]/55 px-4 py-8 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePanel();
          }}
        >
          <section className="panel-dialog relative w-full max-w-5xl overflow-hidden rounded-[2.2rem] border border-white/80 bg-white shadow-[0_45px_130px_rgba(1,35,67,.4)]">
            <button
              type="button"
              onClick={closePanel}
              className="absolute left-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-xl border border-[#0a86c7]/10 bg-white text-[#6b91a8] shadow-sm transition hover:text-[#0876d9]"
              aria-label="إغلاق"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            {panel === "ai" && (
              <div className="grid lg:grid-cols-[.75fr_1.25fr]">
                <aside className="panel-aside blue-panel">
                  <NeuralDoctorIcon className="h-16 w-16 text-white" />
                  <p className="mt-6 text-xs font-black text-[#a9fff0]">TIBYAN PHARMA AI</p>
                  <h2 className="mt-1 text-2xl font-black">الدكتور الصيدلي الذكي</h2>
                  <p className="mt-4 text-sm font-semibold leading-7 text-white/75">
                    يبدأ بسؤال واضح، ثم يختصر الحديث إلى المعلومات التي تؤثر فعلًا في أمان استخدام الدواء.
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      "اسم الدواء أو صورة العبوة",
                      "العمر ومن سيستخدم العلاج",
                      "الحساسية والأمراض المزمنة",
                      "الأدوية الحالية والأعراض",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-xs font-bold text-white/85">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="p-5 sm:p-8">
                  <h3 className="text-xl font-black text-[#064c91]">ابدأ الحديث عن الدواء</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-[#668ba2]">
                    اكتب السؤال كما هو، وسيبدأ المساعد بجمع المعلومات الضرورية.
                  </p>

                  <div className="mt-5 rounded-2xl border border-[#0a86c7]/10 bg-[#f7fcff] p-4">
                    <div className="flex gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0876d9] to-[#0aa9ba] text-white">
                        <NeuralDoctorIcon className="h-6 w-6" />
                      </span>
                      <p className="text-sm font-semibold leading-7 text-[#416c85]">
                        أهلاً بك. أخبرني باسم الدواء أو أرفق صورته، ومن سيستخدمه وما عمره؟
                      </p>
                    </div>
                  </div>

                  <textarea
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    rows={6}
                    placeholder="مثال: لدي دواء لا أعرف استخدامه، والمستخدم عمره 45 سنة..."
                    className="mt-5 w-full resize-none rounded-2xl border border-[#0a86c7]/15 bg-white p-4 text-sm font-semibold leading-7 text-[#315f7a] outline-none focus:border-[#0aa9ba]"
                  />

                  <button type="button" className="mt-5 min-h-12 w-full rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0aa9ba] px-5 text-sm font-black text-white">
                    إرسال السؤال
                  </button>
                </div>
              </div>
            )}

            {panel === "human" && (
              <div className="grid lg:grid-cols-[.75fr_1.25fr]">
                <aside className="panel-aside green-panel">
                  <HumanPharmacistIcon className="h-16 w-16 text-white" />
                  <p className="mt-6 text-xs font-black text-[#d7fff0]">مراجعة بشرية</p>
                  <h2 className="mt-1 text-2xl font-black">الصيدلي الاستشاري</h2>
                  <p className="mt-4 text-sm font-semibold leading-7 text-white/80">
                    مناسب للحالات المعقدة والتداخلات الدوائية والأسئلة التي تحتاج قرارًا بشريًا.
                  </p>
                </aside>

                <div className="p-5 sm:p-8">
                  <h3 className="text-xl font-black text-[#064c91]">اختر موعد الاستشارة</h3>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      ["اليوم", "05:30 مساءً"],
                      ["اليوم", "08:00 مساءً"],
                      ["غدًا", "11:00 صباحًا"],
                      ["غدًا", "06:30 مساءً"],
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

                  <button type="button" className="mt-5 min-h-12 w-full rounded-2xl bg-gradient-to-l from-[#38c96f] to-[#0aa9ba] px-5 text-sm font-black text-white">
                    تأكيد طلب الاستشارة
                  </button>
                </div>
              </div>
            )}

            {(panel === "scan" || panel === "order") && (
              <div className="grid lg:grid-cols-[.78fr_1.22fr]">
                <aside className="panel-aside blue-panel">
                  {panel === "scan" ? (
                    <CameraScanIcon className="h-16 w-16 text-white" />
                  ) : (
                    <MapPulseIcon className="h-16 w-16 text-white" />
                  )}
                  <p className="mt-6 text-xs font-black text-[#a9fff0]">
                    {panel === "scan" ? "فحص العبوة" : "مركز الطلب"}
                  </p>
                  <h2 className="mt-1 text-2xl font-black">
                    {panel === "scan" ? "ابحث بصورة الدواء" : "أكمل طلبك"}
                  </h2>
                  <p className="mt-4 text-sm font-semibold leading-7 text-white/75">
                    ارفع الصورة أو التقرير، ثم استعرض الصيدليات وخيارات الاستلام والدفع.
                  </p>
                </aside>

                <div className="p-5 sm:p-8">
                  {!searched ? (
                    <>
                      <h3 className="text-xl font-black text-[#064c91]">بيانات الدواء</h3>

                      <label className="mt-5 block text-sm font-black text-[#416c85]">اسم الدواء</label>
                      <input
                        value={medicineName}
                        onChange={(event) => setMedicineName(event.target.value)}
                        placeholder="اكتب الاسم كما يظهر على العبوة"
                        className="mt-2 h-12 w-full rounded-2xl border border-[#0a86c7]/15 bg-[#f7fcff] px-4 text-sm font-bold text-[#315f7a] outline-none focus:border-[#0aa9ba]"
                      />

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <button type="button" onClick={() => imageInputRef.current?.click()} className="upload-box">
                          <CameraScanIcon className="mx-auto h-11 w-11" />
                          <span className="mt-2 block text-xs font-black">صورة الدواء</span>
                        </button>

                        <button type="button" onClick={() => reportInputRef.current?.click()} className="upload-box">
                          <ReportCrystalIcon className="mx-auto h-11 w-11" />
                          <span className="mt-2 block text-xs font-black">التقرير الطبي</span>
                        </button>
                      </div>

                      {medicineImage && (
                        <img src={medicineImage} alt="صورة الدواء" className="mt-4 h-44 w-full rounded-2xl object-cover" />
                      )}

                      {reportName && (
                        <p className="mt-3 rounded-xl bg-[#effdf4] px-4 py-3 text-xs font-bold text-[#1f8b57]">
                          تم إرفاق: {reportName}
                        </p>
                      )}

                      <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                      <input ref={reportInputRef} type="file" accept=".pdf,image/*" className="hidden" onChange={handleReport} />

                      <button type="button" onClick={() => setSearched(true)} className="mt-5 min-h-12 w-full rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0aa9ba] px-5 text-sm font-black text-white">
                        البحث داخل شبكة الصيدليات
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#effdf4] text-[#18a95d]">
                          <CheckIcon className="h-6 w-6" />
                        </span>
                        <div>
                          <p className="text-xs font-black text-[#18a95d]">تم العثور على نتائج</p>
                          <h3 className="text-xl font-black text-[#064c91]">الصيدليات الأقرب</h3>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3">
                        {pharmacyResults.map((item, index) => (
                          <button
                            type="button"
                            key={item.name}
                            className={`w-full rounded-2xl border p-4 text-right ${index === 0 ? "border-[#0aa9ba]/35 bg-[#effcfc]" : "border-[#0a86c7]/10 bg-[#f7fcff]"}`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-sm font-black text-[#075dab]">{item.name}</p>
                                <p className="mt-1 text-xs font-bold text-[#668ba2]">{item.distance} • {item.eta}</p>
                              </div>
                              <span className="rounded-full bg-[#effdf4] px-3 py-1 text-[11px] font-black text-[#18a95d]">
                                {item.stock}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => setDeliveryMode("pickup")}
                          className={`delivery-choice ${deliveryMode === "pickup" ? "active-blue" : ""}`}
                        >
                          <MapPulseIcon className="h-8 w-8 text-[#0876d9]" />
                          <p className="mt-2 text-sm font-black text-[#075dab]">استلام من الصيدلية</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeliveryMode("delivery")}
                          className={`delivery-choice ${deliveryMode === "delivery" ? "active-green" : ""}`}
                        >
                          <DeliveryDroneIcon className="h-8 w-8 text-[#18a95d]" />
                          <p className="mt-2 text-sm font-black text-[#075dab]">توصيل إلى الموقع</p>
                        </button>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        {[
                          ["wallet", "محفظة إلكترونية"],
                          ["bank", "حساب بنكي"],
                          ["cash", "عند الاستلام"],
                        ].map(([value, label]) => (
                          <button
                            type="button"
                            key={value}
                            onClick={() => setPaymentMode(value as PaymentMode)}
                            className={`payment-choice ${paymentMode === value ? "selected" : ""}`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>

                      <div className="mt-5 rounded-2xl bg-[#f7fcff] p-4">
                        <p className="text-xs font-black text-[#0aa3a7]">الاختيار الحالي</p>
                        <p className="mt-1 text-sm font-black text-[#075dab]">
                          {chosenPharmacy.name} — {deliveryMode === "pickup" ? "استلام شخصي" : "توصيل"} — {paymentMode === "wallet" ? "محفظة إلكترونية" : paymentMode === "bank" ? "حساب بنكي" : "عند الاستلام"}
                        </p>
                      </div>

                      <button type="button" className="mt-5 min-h-12 w-full rounded-2xl bg-gradient-to-l from-[#38c96f] to-[#0aa9ba] px-5 text-sm font-black text-white">
                        تأكيد الطلب
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      <style jsx global>{`
        .pharmacy-page {
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }

        .pharmacy-grid {
          background-image:
            linear-gradient(rgba(8,118,217,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,118,217,.04) 1px, transparent 1px);
          background-size: 42px 42px;
          animation: pharmacyGridMove 18s linear infinite;
        }

        .hero-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,.55) 48%, transparent 72%);
          transform: translateX(115%);
          animation: pharmacyShine 7s ease-in-out infinite;
        }

        .hero-scan {
          animation: pharmacyScan 6.5s ease-in-out infinite;
        }

        .hero-primary,
        .hero-secondary {
          display: inline-flex;
          min-height: 50px;
          align-items: center;
          gap: 10px;
          border-radius: 18px;
          padding: 0 22px;
          font-size: .88rem;
          font-weight: 900;
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .hero-primary {
          background: linear-gradient(135deg, #0876d9, #0aa9ba);
          color: #fff;
          box-shadow: 0 18px 40px rgba(8,118,217,.24);
        }

        .hero-secondary {
          border: 1px solid rgba(8,118,217,.14);
          background: #fff;
          color: #0876d9;
          box-shadow: 0 10px 26px rgba(4,77,132,.08);
        }

        .hero-primary:hover,
        .hero-secondary:hover {
          transform: translateY(-4px);
        }

        .pharmacy-universe > div:first-child {
          animation: universeSpin 20s linear infinite;
        }

        .pharmacy-universe > div:nth-child(2) {
          animation: universeSpinReverse 15s linear infinite;
        }

        .universe-aura {
          animation: universeAura 4.8s ease-in-out infinite;
        }

        .capsule-core {
          animation: capsuleFloat 4.6s ease-in-out infinite;
        }

        .orbit-icon {
          animation: orbitFloat 4s ease-in-out infinite;
        }

        .feature-card,
        .workflow-card,
        .control-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(10,134,199,.1);
          border-radius: 30px;
          background: #fff;
          padding: 24px;
          box-shadow: 0 22px 60px rgba(3,77,132,.08);
          transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
        }

        .feature-card:hover,
        .workflow-card:hover,
        .control-card:hover {
          transform: translateY(-7px);
          border-color: rgba(12,170,184,.28);
          box-shadow: 0 32px 82px rgba(3,88,147,.15);
        }

        .feature-icon {
          display: grid;
          height: 68px;
          width: 68px;
          place-items: center;
          border-radius: 20px;
          color: white;
          box-shadow: 0 16px 38px rgba(8,118,217,.2);
        }

        .card-action {
          margin-top: 22px;
          min-height: 48px;
          width: 100%;
          border-radius: 17px;
          background: linear-gradient(135deg, #0876d9, #0aa9ba);
          padding: 0 18px;
          color: #fff;
          font-size: .86rem;
          font-weight: 900;
          transition: transform .25s ease;
        }

        .card-action.green {
          background: linear-gradient(135deg, #38c96f, #0aa9ba);
        }

        .card-action:hover {
          transform: translateY(-3px);
        }

        .workflow-step {
          border: 1px solid rgba(10,134,199,.1);
          border-radius: 20px;
          background: linear-gradient(135deg, #f8fdff, #fff);
          padding: 18px;
        }

        .panel-aside {
          position: relative;
          overflow: hidden;
          padding: 28px;
          color: #fff;
        }

        .panel-aside::after {
          content: "";
          position: absolute;
          width: 230px;
          height: 230px;
          left: -90px;
          top: -90px;
          border: 30px solid rgba(255,255,255,.05);
          border-radius: 999px;
        }

        .blue-panel {
          background: linear-gradient(145deg, #064f97, #0876d9 55%, #0aa9ba);
        }

        .green-panel {
          background: linear-gradient(145deg, #1f9f63, #16b58b 55%, #0aa9ba);
        }

        .upload-box {
          min-height: 130px;
          border: 1px dashed rgba(8,118,217,.28);
          border-radius: 20px;
          background: #f7fcff;
          padding: 18px;
          text-align: center;
          color: #0876d9;
          transition: transform .25s ease, border-color .25s ease;
        }

        .upload-box:hover {
          transform: translateY(-4px);
          border-color: rgba(10,169,186,.55);
        }

        .delivery-choice {
          border: 1px solid rgba(10,134,199,.12);
          border-radius: 20px;
          background: #fff;
          padding: 16px;
          text-align: right;
        }

        .delivery-choice.active-blue {
          border-color: rgba(8,118,217,.35);
          background: #eef8ff;
        }

        .delivery-choice.active-green {
          border-color: rgba(56,201,111,.35);
          background: #effdf4;
        }

        .payment-choice {
          border: 1px solid rgba(10,134,199,.1);
          border-radius: 16px;
          background: #fff;
          padding: 12px;
          color: #668ba2;
          font-size: .76rem;
          font-weight: 900;
        }

        .payment-choice.selected {
          border-color: rgba(10,169,186,.35);
          background: #effcfc;
          color: #0876d9;
        }

        .panel-backdrop {
          animation: panelFade .22s ease-out both;
        }

        .panel-dialog {
          animation: panelIn .38s cubic-bezier(.2,.85,.25,1.12) both;
        }

        .icon-neural-rays {
          animation: neuralRays 2.4s ease-in-out infinite;
          transform-origin: center;
        }

        .icon-orbit-dot {
          animation: orbitDot 2.4s ease-in-out infinite;
        }

        .icon-orbit-path {
          stroke-dasharray: 20;
          animation: orbitPath 2.8s linear infinite;
        }

        .icon-scan-line {
          animation: scanLine 2s ease-in-out infinite;
        }

        .icon-radar-ring {
          animation: radarRing 2.8s linear infinite;
          transform-origin: center;
        }

        .icon-radar-hand {
          animation: radarHand 2.6s linear infinite;
          transform-origin: 22px 22px;
        }

        .icon-radar-dot,
        .icon-map-pulse,
        .icon-pulse-dot,
        .icon-crystal {
          animation: pulseDot 1.8s ease-in-out infinite;
          transform-origin: center;
        }

        .icon-drone-rotor {
          animation: droneRotor .9s linear infinite;
          transform-origin: center;
        }

        .icon-drone-rotor.reverse {
          animation-direction: reverse;
        }

        .icon-wallet-wave {
          stroke-dasharray: 20;
          animation: walletWave 2.4s linear infinite;
        }

        @keyframes pharmacyGridMove { to { background-position: 42px 42px; } }
        @keyframes pharmacyShine {
          0%, 45% { transform: translateX(115%); }
          70%, 100% { transform: translateX(-115%); }
        }
        @keyframes pharmacyScan {
          0%, 100% { left: -18%; opacity: 0; }
          22% { opacity: 1; }
          65% { opacity: 1; }
          82% { left: 112%; opacity: 0; }
        }
        @keyframes universeSpin { to { transform: rotate(360deg); } }
        @keyframes universeSpinReverse { to { transform: rotate(-360deg); } }
        @keyframes universeAura {
          0%, 100% { opacity: .55; transform: scale(.92); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes capsuleFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.5deg); }
        }
        @keyframes orbitFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-7px) scale(1.05); }
        }
        @keyframes panelFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(26px) scale(.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes neuralRays {
          0%, 100% { opacity: .45; transform: scale(.94); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes orbitDot {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-2px,2px) scale(1.18); }
        }
        @keyframes orbitPath {
          to { stroke-dashoffset: -20; }
        }
        @keyframes scanLine {
          0%, 100% { transform: translateY(-5px); opacity: .5; }
          50% { transform: translateY(5px); opacity: 1; }
        }
        @keyframes radarRing {
          to { transform: rotate(360deg); }
        }
        @keyframes radarHand {
          to { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: .5; transform: scale(.85); }
          50% { opacity: 1; transform: scale(1.25); }
        }
        @keyframes droneRotor {
          to { transform: rotate(360deg); }
        }
        @keyframes walletWave {
          to { stroke-dashoffset: -20; }
        }

        @media (max-width: 640px) {
          .pharmacy-universe {
            min-height: 290px;
            transform: scale(.9);
          }

          .feature-card,
          .workflow-card,
          .control-card {
            padding: 20px;
          }
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