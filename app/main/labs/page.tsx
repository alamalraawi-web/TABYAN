"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactElement,
  type SVGProps,
} from "react";
import { useTibyanNavigation } from "@/components/tibyan-shell";

type IconProps = SVGProps<SVGSVGElement>;
type ExamId = "skin" | "eye" | "mouth" | "wound" | "nails";

type Exam = {
  id: ExamId;
  title: string;
  engine: string;
  description: string;
  captureHint: string;
  time: string;
  tag: string;
  icon: (props: IconProps) => ReactElement;
};

function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

function CameraIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <defs>
        <linearGradient id="camera-lens" x1="7" y1="6" x2="26" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#dff8ff" />
        </linearGradient>
      </defs>
      <path
        d="M7.2 9.2h4.1l1.8-3h5.8l1.8 3h4.1A3.2 3.2 0 0 1 28 12.4v10.4A3.2 3.2 0 0 1 24.8 26H7.2A3.2 3.2 0 0 1 4 22.8V12.4a3.2 3.2 0 0 1 3.2-3.2Z"
        fill="currentColor"
        opacity=".2"
      />
      <path
        d="M8 10.1h3.9l1.7-2.8h4.8l1.7 2.8H24a2.5 2.5 0 0 1 2.5 2.5v9.8A2.5 2.5 0 0 1 24 24.9H8a2.5 2.5 0 0 1-2.5-2.5v-9.8A2.5 2.5 0 0 1 8 10.1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="17.3" r="6.1" fill="url(#camera-lens)" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16" cy="17.3" r="3.3" fill="currentColor" opacity=".16" />
      <circle cx="23" cy="13.1" r="1.15" fill="currentColor" />
      <path d="M12.5 17.3a3.5 3.5 0 0 1 3.5-3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.3 6.4h3.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />
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

function SparklesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="m12 3 1.2 3.2L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3-3.3-1.2 3.3-1.3L12 3Z" />
      <path d="m18.5 13 .8 2.1 2.2.9-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.9.8-2.1Z" />
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

function SkinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M7.4 5.6c5.6 2.4 11.6 2.4 17.2 0v8.1c0 7-3.8 11.4-8.6 13.1-4.8-1.7-8.6-6.1-8.6-13.1V5.6Z"
        fill="currentColor"
        opacity=".16"
      />
      <path
        d="M8.4 6.9c4.9 2 10.3 2 15.2 0v6.7c0 6.2-3.2 10-7.6 11.7-4.4-1.7-7.6-5.5-7.6-11.7V6.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M11 11.3c3.1 1 6.9 1 10 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".7" />
      <circle cx="12.2" cy="15.7" r="1.35" fill="currentColor" />
      <circle cx="19.7" cy="18.4" r="1.1" fill="currentColor" opacity=".8" />
      <path d="M14.5 21.2c1.4-.7 3-.7 4.4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="m22.5 8.3 1.8-1.8" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity=".9" />
    </svg>
  );
}

function EyeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M3.8 16S8.2 8.7 16 8.7 28.2 16 28.2 16 23.8 23.3 16 23.3 3.8 16 3.8 16Z"
        fill="currentColor"
        opacity=".14"
      />
      <path
        d="M4.8 16S8.8 9.7 16 9.7 27.2 16 27.2 16 23.2 22.3 16 22.3 4.8 16 4.8 16Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16" cy="16" r="2.4" fill="currentColor" />
      <circle cx="17.3" cy="14.7" r=".8" fill="#fff" />
      <path d="M8.5 8.8 7 6.8M13 7.2l-.4-2.5M19 7.2l.4-2.5M23.5 8.8 25 6.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

function MouthIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M5 16c3.2-4.3 7-6.4 11-6.4S23.8 11.7 27 16c-3.2 4.3-7 6.4-11 6.4S8.2 20.3 5 16Z"
        fill="currentColor"
        opacity=".14"
      />
      <path
        d="M5.8 16c3-3.8 6.5-5.7 10.2-5.7s7.2 1.9 10.2 5.7c-3 3.8-6.5 5.7-10.2 5.7S8.8 19.8 5.8 16Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M7.3 16h17.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 16c1.7 1.8 3.7 2.7 6 2.7s4.3-.9 6-2.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".75" />
      <path d="M11.2 12.5c1.5-.7 3.1-1.1 4.8-1.1s3.3.4 4.8 1.1" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity=".9" />
      <circle cx="22.5" cy="11.4" r="1" fill="currentColor" />
    </svg>
  );
}

function WoundIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="m8 4.8 19.2 19.2-3.2 3.2L4.8 8 8 4.8Z"
        fill="currentColor"
        opacity=".14"
      />
      <path
        d="m8.3 5.8 17.9 17.9-2.5 2.5L5.8 8.3l2.5-2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m10.2 13.8 3.6-3.6M14.2 17.8l3.6-3.6M18.2 21.8l3.6-3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m11.7 11.7 8.6 8.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8.2" cy="8.2" r="1.1" fill="#fff" opacity=".9" />
      <path d="M24.6 8.2c1.8 1.4 2.6 3 2.2 4.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

function NailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M10.2 27V11.2a5.8 5.8 0 0 1 11.6 0v8.1A7.7 7.7 0 0 1 14.1 27h-3.9Z"
        fill="currentColor"
        opacity=".14"
      />
      <path
        d="M11.1 26V11.4a4.9 4.9 0 0 1 9.8 0v7.5a7.1 7.1 0 0 1-7.1 7.1h-2.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M13.4 11.2a2.6 2.6 0 0 1 5.2 0v6.2h-5.2v-6.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M14.5 12.2h3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity=".9" />
      <path d="M13.5 20.5c1.6.5 3.3.5 4.9 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".7" />
      <circle cx="19.8" cy="7.8" r="1" fill="currentColor" />
    </svg>
  );
}

const exams: Exam[] = [
  {
    id: "skin",
    title: "فحص الجلد الظاهري",
    engine: "Tibyan Derma",
    description: "فرز بصري أولي للتغيرات الجلدية الظاهرة ومقارنة الشكل واللون والحدود.",
    captureHint: "التقط صورة واضحة وقريبة في ضوء طبيعي، مع صورة ثانية من مسافة أبعد.",
    time: "أقل من دقيقة",
    tag: "فرز بصري",
    icon: SkinIcon,
  },
  {
    id: "eye",
    title: "فحص احمرار العين",
    engine: "Tibyan Eye",
    description: "رصد مؤشرات بصرية مثل الاحمرار أو الإفرازات الظاهرة وتحديد درجة الاستعجال.",
    captureHint: "صوّر العين من الأمام دون فلاش قوي، وتأكد من وضوح بياض العين.",
    time: "45 ثانية",
    tag: "توجيه أولي",
    icon: EyeIcon,
  },
  {
    id: "mouth",
    title: "فحص الفم والحلق",
    engine: "Tibyan Oral",
    description: "تحليل بصري أولي للاحمرار والتقرحات والتغيرات الظاهرة داخل الفم والحلق.",
    captureHint: "استخدم إضاءة ثابتة وافتح الفم بوضوح دون ملامسة الكاميرا للوجه.",
    time: "60 ثانية",
    tag: "صورة واضحة",
    icon: MouthIcon,
  },
  {
    id: "wound",
    title: "متابعة الجروح",
    engine: "Tibyan Wound",
    description: "متابعة شكل الجرح والاحمرار المحيط به عبر صور متتابعة للمساعدة في الفرز.",
    captureHint: "صوّر الجرح من الأعلى مع مرجع للحجم، ولا تلمس الجرح أثناء التصوير.",
    time: "دقيقة واحدة",
    tag: "متابعة زمنية",
    icon: WoundIcon,
  },
  {
    id: "nails",
    title: "فحص الأظافر الظاهري",
    engine: "Tibyan Nail",
    description: "رصد تغيرات اللون والشكل الظاهرة التي قد تحتاج إلى تقييم طبي إضافي.",
    captureHint: "صوّر اليد كاملة ثم صورة قريبة للأظافر في إضاءة طبيعية.",
    time: "45 ثانية",
    tag: "مؤشرات بصرية",
    icon: NailIcon,
  },
];

export default function LabsPage() {
  const { goBack, navigate } = useTibyanNavigation();
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState("");
  const [step, setStep] = useState<"capture" | "review">("capture");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!cameraOpen || !videoRef.current) return;

    let cancelled = false;

    navigator.mediaDevices
      ?.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      })
      .catch(() => {
        setCameraError("تعذر تشغيل الكاميرا. يمكنك رفع صورة من الجهاز بدلًا من ذلك.");
        setCameraOpen(false);
      });

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [cameraOpen]);

  const closeExam = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setSelectedExam(null);
    setCameraOpen(false);
    setPreview(null);
    setCameraError("");
    setStep("capture");
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth || !video.videoHeight) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPreview(canvas.toDataURL("image/jpeg", 0.9));
    setStep("review");
    setCameraOpen(false);
    streamRef.current?.getTracks().forEach((track) => track.stop());
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setCameraError("اختر ملف صورة صالحًا.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(String(reader.result));
      setStep("review");
      setCameraOpen(false);
      setCameraError("");
    };
    reader.readAsDataURL(file);
  };

  return (
    <main dir="rtl" className="labs-page min-h-screen overflow-x-hidden bg-[#f5fbff] text-[#073b72]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="labs-grid absolute inset-0 opacity-65" />
        <div className="absolute -right-28 top-24 h-96 w-96 rounded-full bg-[#0876d9]/12 blur-3xl" />
        <div className="absolute -left-32 top-[34rem] h-[28rem] w-[28rem] rounded-full bg-[#12b7bd]/13 blur-3xl" />
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

        <section className="labs-hero relative overflow-hidden rounded-[2.2rem] border border-white/90 bg-white/80 p-5 shadow-[0_40px_110px_rgba(4,70,127,.13)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="labs-scan absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full border-[38px] border-[#0876d9]/5" />
            <div className="absolute -bottom-28 right-20 h-72 w-72 rounded-full border-[42px] border-[#38c96f]/5" />
          </div>

          <div className="relative grid items-center gap-9 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0aa9ba]/20 bg-[#ecfbfb] px-4 py-2 text-xs font-black text-[#07959d]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38c96f] opacity-70" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-[#38c96f]" />
                </span>
                مختبر بصري ذكي داخل هاتفك
              </div>

              <h1 className="mt-5 text-3xl font-black leading-[1.25] text-[#064c91] sm:text-4xl lg:text-6xl">
                خمس بوابات للفحص
                <span className="mr-3 bg-gradient-to-l from-[#0876d9] via-[#0aa9ba] to-[#38c96f] bg-clip-text text-transparent">
                  البصري الذكي
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-sm font-semibold leading-8 text-[#5d839a] sm:text-base">
                التقط صورة واضحة، ثم يمررها النظام إلى محرك متخصص للفرز البصري الأولي وتحديد مستوى الاستعجال والخطوة التالية.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedExam(exams[0])}
                  className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0aa9ba] px-6 text-sm font-black text-white shadow-[0_18px_40px_rgba(8,118,217,.24)] transition hover:-translate-y-1"
                >
                  <CameraIcon className="h-5 w-5" />
                  ابدأ أول فحص
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/main/consultations", "الاستشارات والمواعيد")}
                  className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-[#0a86c7]/15 bg-white px-6 text-sm font-black text-[#0876d9] shadow-sm transition hover:-translate-y-1"
                >
                  استشارة طبيب
                </button>
              </div>

              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#f1c75b]/30 bg-[#fffaf0] p-4 text-xs font-bold leading-6 text-[#7b6532] sm:text-sm">
                <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#d6a52d]" />
                <p>
                  هذه الأدوات للفرز البصري الأولي فقط، ولا تؤكد وجود مرض أو تنفيه. عند الألم الشديد، النزيف، صعوبة التنفس، تدهور الرؤية أو الانتشار السريع اطلب رعاية طبية مباشرة.
                </p>
              </div>
            </div>

            <div className="lab-orbit relative mx-auto grid min-h-[320px] w-full max-w-[440px] place-items-center">
              <div className="absolute h-72 w-72 rounded-full border border-dashed border-[#0876d9]/22 sm:h-80 sm:w-80" />
              <div className="absolute h-56 w-56 rounded-full border border-[#12b7bd]/18 sm:h-64 sm:w-64" />
              <div className="lab-aura absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(8,118,217,.2)_0%,rgba(18,183,189,.12)_48%,transparent_74%)] blur-xl" />

              <div className="lab-core relative z-10 grid h-44 w-44 place-items-center rounded-[3rem] bg-gradient-to-br from-[#0876d9] via-[#0aa9ba] to-[#38c96f] text-white shadow-[0_32px_80px_rgba(4,86,143,.3)] sm:h-52 sm:w-52">
                <CameraIcon className="h-24 w-24 sm:h-28 sm:w-28" />
              </div>

              {exams.slice(0, 5).map((exam, index) => {
                const positions = [
                  "top-[5%] right-[18%]",
                  "top-[22%] left-[4%]",
                  "bottom-[10%] left-[16%]",
                  "bottom-[6%] right-[20%]",
                  "top-[42%] right-[1%]",
                ];
                const Icon = exam.icon;
                return (
                  <span
                    key={exam.id}
                    className={`lab-floating absolute z-20 grid h-12 w-12 place-items-center rounded-2xl border border-white/90 bg-white/95 text-[#0a98a1] shadow-[0_16px_34px_rgba(4,77,132,.15)] ${positions[index]}`}
                    style={{ animationDelay: `${index * 0.35}s` }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-6">
            <p className="text-sm font-black text-[#0aa3a7]">محركات تبيان البصرية</p>
            <h2 className="mt-2 text-2xl font-black text-[#064c91] sm:text-3xl">
              اختر الفحص المناسب للصورة
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {exams.map((exam, index) => {
              const Icon = exam.icon;
              return (
                <article
                  key={exam.id}
                  className={`exam-card group ${index === 0 ? "xl:col-span-1" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#0876d9] via-[#0aa9ba] to-[#38c96f] text-white shadow-[0_16px_36px_rgba(8,118,217,.2)] transition duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-8 w-8" />
                    </span>

                    <span className="rounded-full border border-[#0aa9ba]/15 bg-[#effcfc] px-3 py-1.5 text-[11px] font-black text-[#0a9299]">
                      {exam.tag}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-black uppercase tracking-wider text-[#0aa3a7]">
                    {exam.engine}
                  </p>
                  <h3 className="mt-1 text-xl font-black text-[#075dab] sm:text-2xl">{exam.title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm font-semibold leading-7 text-[#658ba3]">
                    {exam.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#f7fcff] px-4 py-3">
                    <span className="text-xs font-black text-[#62879d]">مدة الإجراء</span>
                    <span className="text-xs font-black text-[#0876d9]">{exam.time}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedExam(exam)}
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0aa9ba] px-5 text-sm font-black text-white shadow-[0_14px_32px_rgba(8,118,217,.2)] transition hover:-translate-y-1"
                  >
                    <CameraIcon className="h-5 w-5" />
                    فتح الكاميرا
                  </button>
                </article>
              );
            })}

            <article className="exam-card flex min-h-[340px] flex-col justify-between bg-gradient-to-br from-[#064f97] via-[#0876d9] to-[#0aa9ba] text-white">
              <div>
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur">
                  <SparklesIcon className="h-8 w-8" />
                </span>
                <p className="mt-5 text-xs font-black text-[#a9fff0]">مركز النتائج</p>
                <h3 className="mt-1 text-2xl font-black">التقارير والمتابعة</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/75">
                  احتفظ بالصور والنتائج، قارن التغيرات زمنيًا، وشارك التقرير مع الطبيب عند الحاجة.
                </p>
              </div>

              <button
                type="button"
                className="mt-6 min-h-12 rounded-2xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
              >
                عرض سجل الفحوصات
              </button>
            </article>
          </div>
        </section>
      </div>

      {selectedExam && (
        <div
          className="exam-modal fixed inset-0 z-[140] grid place-items-center overflow-y-auto bg-[#032f57]/55 px-4 py-8 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeExam();
          }}
        >
          <section className="exam-dialog relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_40px_120px_rgba(1,35,67,.38)]">
            <button
              type="button"
              onClick={closeExam}
              className="absolute left-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-xl border border-[#0a86c7]/10 bg-white text-[#6b91a8] shadow-sm transition hover:text-[#0876d9]"
              aria-label="إغلاق"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            <div className="grid lg:grid-cols-[.8fr_1.2fr]">
              <aside className="relative overflow-hidden bg-gradient-to-br from-[#064f97] via-[#0876d9] to-[#0aa9ba] p-6 text-white sm:p-8">
                <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full border-[34px] border-white/5" />
                <div className="relative">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                    <selectedExam.icon className="h-8 w-8" />
                  </span>
                  <p className="mt-6 text-xs font-black text-[#a9fff0]">{selectedExam.engine}</p>
                  <h2 className="mt-1 text-2xl font-black">{selectedExam.title}</h2>
                  <p className="mt-4 text-sm font-semibold leading-7 text-white/75">
                    {selectedExam.captureHint}
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      "إضاءة واضحة بلا انعكاس قوي",
                      "الصورة ثابتة وفي مركز الإطار",
                      "لا تستخدم فلاتر أو تحسينات",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-xs font-bold text-white/85">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="p-5 sm:p-7">
                {step === "capture" ? (
                  <>
                    <h3 className="text-xl font-black text-[#064c91]">التقاط صورة الفحص</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-[#668ba2]">
                      اختر تشغيل الكاميرا أو رفع صورة جاهزة من الهاتف.
                    </p>

                    <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#0a86c7]/12 bg-[#eef7fb]">
                      {cameraOpen ? (
                        <div className="relative aspect-[4/3] bg-[#031f38]">
                          <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
                          <div className="pointer-events-none absolute inset-5 rounded-[1.2rem] border-2 border-dashed border-white/55" />
                          <button
                            type="button"
                            onClick={capturePhoto}
                            className="absolute bottom-5 left-1/2 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full border-4 border-white bg-[#0876d9] text-white shadow-2xl"
                            aria-label="التقاط الصورة"
                          >
                            <CameraIcon className="h-7 w-7" />
                          </button>
                        </div>
                      ) : preview ? (
                        <img src={preview} alt="معاينة صورة الفحص" className="aspect-[4/3] h-full w-full object-cover" />
                      ) : (
                        <div className="grid aspect-[4/3] place-items-center p-8 text-center">
                          <div>
                            <span className="mx-auto grid h-20 w-20 place-items-center rounded-[1.7rem] bg-white text-[#0876d9] shadow-[0_18px_40px_rgba(4,77,132,.12)]">
                              <CameraIcon className="h-10 w-10" />
                            </span>
                            <p className="mt-4 text-sm font-black text-[#416c85]">الكاميرا جاهزة عند الطلب</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {cameraError && (
                      <p className="mt-3 rounded-xl bg-[#fff5f5] px-4 py-3 text-xs font-bold text-[#c44747]">
                        {cameraError}
                      </p>
                    )}

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCameraError("");
                          setCameraOpen(true);
                        }}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0aa9ba] px-5 text-sm font-black text-white"
                      >
                        <CameraIcon className="h-5 w-5" />
                        تشغيل الكاميرا
                      </button>

                      <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#0a86c7]/15 bg-white px-5 text-sm font-black text-[#0876d9]"
                      >
                        <UploadIcon className="h-5 w-5" />
                        رفع صورة
                      </button>
                    </div>

                    <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    <canvas ref={canvasRef} className="hidden" />
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-black text-[#064c91]">مراجعة الصورة</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-[#668ba2]">
                      تأكد أن المنطقة المطلوبة واضحة قبل إرسالها إلى محرك التحليل.
                    </p>

                    {preview && (
                      <img
                        src={preview}
                        alt="الصورة الملتقطة للفحص"
                        className="mt-5 aspect-[4/3] w-full rounded-[1.5rem] border border-[#0a86c7]/12 object-cover"
                      />
                    )}

                    <div className="mt-5 rounded-2xl border border-[#f1c75b]/30 bg-[#fffaf0] p-4 text-xs font-bold leading-6 text-[#7b6532]">
                      النموذج الحالي واجهة جاهزة للربط بمحرك ذكاء طبي معتمد. لا تعرض نتيجة تشخيصية قبل تدريب النموذج والتحقق السريري منه.
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setStep("capture");
                        }}
                        className="min-h-12 rounded-2xl border border-[#0a86c7]/15 bg-white px-5 text-sm font-black text-[#0876d9]"
                      >
                        إعادة التصوير
                      </button>

                      <button
                        type="button"
                        className="min-h-12 rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0aa9ba] px-5 text-sm font-black text-white shadow-[0_14px_32px_rgba(8,118,217,.2)]"
                      >
                        إرسال للتحليل الآمن
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      <style jsx global>{`
        .labs-page {
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }

        .labs-grid {
          background-image:
            linear-gradient(rgba(8,118,217,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,118,217,.04) 1px, transparent 1px);
          background-size: 42px 42px;
          animation: labsGridMove 18s linear infinite;
        }

        .labs-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,.5) 48%, transparent 72%);
          transform: translateX(115%);
          animation: labsShine 7s ease-in-out infinite;
        }

        .labs-scan {
          animation: labsScan 6.5s ease-in-out infinite;
        }

        .lab-orbit > div:first-child {
          animation: labsSpin 18s linear infinite;
        }

        .lab-orbit > div:nth-child(2) {
          animation: labsSpinReverse 14s linear infinite;
        }

        .lab-aura {
          animation: labsAura 4.8s ease-in-out infinite;
        }

        .lab-core {
          animation: labsFloat 4.5s ease-in-out infinite;
        }

        .lab-floating {
          animation: labsBadge 4s ease-in-out infinite;
        }

        .exam-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(10,134,199,.1);
          border-radius: 28px;
          background: #fff;
          padding: 24px;
          box-shadow: 0 20px 55px rgba(3,77,132,.08);
          animation: examEnter .7s both;
          transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
        }

        .exam-card:hover {
          transform: translateY(-8px);
          border-color: rgba(12,170,184,.3);
          box-shadow: 0 32px 80px rgba(3,88,147,.16);
        }

        .exam-card::after {
          content: "";
          position: absolute;
          top: -120%;
          left: -35%;
          width: 28%;
          height: 340%;
          transform: rotate(18deg);
          background: linear-gradient(to right, transparent, rgba(255,255,255,.72), transparent);
          transition: transform .85s ease;
          pointer-events: none;
        }

        .exam-card:hover::after {
          transform: translateX(560%) rotate(18deg);
        }

        .exam-modal {
          animation: modalFade .22s ease-out both;
        }

        .exam-dialog {
          animation: dialogIn .36s cubic-bezier(.2,.85,.25,1.12) both;
        }

        @keyframes labsGridMove { to { background-position: 42px 42px; } }
        @keyframes labsShine {
          0%, 45% { transform: translateX(115%); }
          70%, 100% { transform: translateX(-115%); }
        }
        @keyframes labsScan {
          0%, 100% { left: -18%; opacity: 0; }
          22% { opacity: 1; }
          65% { opacity: 1; }
          82% { left: 112%; opacity: 0; }
        }
        @keyframes labsSpin { to { transform: rotate(360deg); } }
        @keyframes labsSpinReverse { to { transform: rotate(-360deg); } }
        @keyframes labsAura {
          0%, 100% { opacity: .55; transform: scale(.92); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes labsFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-11px) rotate(1.3deg); }
        }
        @keyframes labsBadge {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.04); }
        }
        @keyframes examEnter {
          from { opacity: 0; transform: translateY(28px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dialogIn {
          from { opacity: 0; transform: translateY(26px) scale(.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 640px) {
          .lab-orbit {
            min-height: 280px;
            transform: scale(.9);
          }

          .exam-card {
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