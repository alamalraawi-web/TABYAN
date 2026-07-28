"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ComponentType,
  type SVGProps,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CircleCheck,
  Eye,
  EyeOff,
  HeartPulse,
  Loader2,
  LockKeyhole,
  Mail,
  Sparkles,
  Stethoscope,
  PillBottle,
  User,
  Phone,
  Calendar,
  Users,
  FileText,
  MapPin,
  Briefcase,
  ClipboardList,
} from "lucide-react";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

// --- الخط العربي ---
const tibyanFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-tibyan",
  preload: true,
});

// --- الأنواع ---
type Notice = {
  type: "error" | "success";
  text: string;
};

type Role = "patient" | "doctor" | "pharmacist";

// --- أيقونات طبية مخصصة (نفس الصفحة الرئيسية) ---
type IconProps = SVGProps<SVGSVGElement>;

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

function LabIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M9 3h6M10 3v6l-5.3 8.8A2 2 0 0 0 6.4 21h11.2a2 2 0 0 0 1.7-3.2L14 9V3" />
      <path d="M7.5 16h9M10 13h4" />
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

// --- شعار تبيان SVG (مطابق للصفحة الرئيسية) ---
function TibyanLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-labelledby="signup-logo-title"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="signup-logo-title">شعار تبيان الطبي</title>
      <defs>
        <linearGradient id="signup-cross" x1="58" y1="53" x2="211" y2="257" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#12c7c4" />
          <stop offset="0.34" stopColor="#0789da" />
          <stop offset="0.72" stopColor="#0758ba" />
          <stop offset="1" stopColor="#073d91" />
        </linearGradient>
        <linearGradient id="signup-cross-light" x1="79" y1="62" x2="171" y2="203" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ee1dc" stopOpacity="0.62" />
          <stop offset="1" stopColor="#2e7be0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="signup-body" x1="157" y1="118" x2="218" y2="252" gradientUnits="userSpaceOnUse">
          <stop stopColor="#166dd1" />
          <stop offset="0.52" stopColor="#0b82cc" />
          <stop offset="1" stopColor="#0755ad" />
        </linearGradient>
        <linearGradient id="signup-leaf" x1="225" y1="91" x2="247" y2="278" gradientUnits="userSpaceOnUse">
          <stop stopColor="#53d977" />
          <stop offset="0.52" stopColor="#28c87a" />
          <stop offset="1" stopColor="#00a99d" />
        </linearGradient>
        <linearGradient id="signup-leaf-shine" x1="250" y1="112" x2="232" y2="246" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a7f4b4" stopOpacity="0.82" />
          <stop offset="1" stopColor="#27c98a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="signup-lower" x1="118" y1="280" x2="286" y2="203" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0b69c7" />
          <stop offset="0.56" stopColor="#08aeb5" />
          <stop offset="1" stopColor="#37d16f" />
        </linearGradient>
        <radialGradient id="signup-head" cx="0" cy="0" r="1" gradientTransform="translate(154 84) rotate(57) scale(43)">
          <stop stopColor="#ffffff" />
          <stop offset="0.68" stopColor="#f8fdff" />
          <stop offset="1" stopColor="#deeff8" />
        </radialGradient>
        <filter id="signup-shadow" x="-28%" y="-28%" width="156%" height="170%">
          <feDropShadow dx="0" dy="14" stdDeviation="13" floodColor="#075c9e" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter="url(#signup-shadow)">
        <path d="M105 40C86 40 71 55 71 74V104H43C25 104 11 118 11 136V185C11 203 25 217 43 217H78L67 277L126 224C131 219 137 217 144 217H163V187H195C213 187 227 173 227 155V136C227 118 213 104 195 104H163V74C163 55 148 40 129 40H105Z" fill="url(#signup-cross)" />
        <path d="M108 48C92 48 80 60 80 76V116H50C35 116 24 127 24 142V161C53 142 84 126 120 117C139 112 156 110 178 111V76C178 61 166 48 150 48H108Z" fill="url(#signup-cross-light)" />
        <path className="tibyan-heartbeat" d="M29 160H72L82 141L94 183L111 119L129 193L145 151L158 168H193" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="158" cy="92" r="28" fill="url(#signup-head)" />
        <circle cx="151" cy="84" r="9" fill="#ffffff" fillOpacity="0.72" />
        <path d="M147 120C164 139 179 153 195 160C185 185 169 211 144 238C134 248 124 258 110 270C145 256 174 238 194 215C214 191 227 158 237 120C220 143 203 158 187 167C176 146 163 130 147 120Z" fill="#ffffff" />
        <path d="M169 121C183 144 193 166 198 188C214 162 228 136 247 108C227 152 213 195 211 239C196 212 183 175 169 121Z" fill="url(#signup-body)" />
        <path className="tibyan-leaf" d="M248 86C286 113 304 160 290 205C279 242 248 266 210 279C219 247 211 222 214 191C216 154 226 112 248 86Z" fill="url(#signup-leaf)" />
        <path d="M252 104C275 132 282 164 274 194C267 220 249 240 224 254C236 221 233 195 238 165C241 143 246 122 252 104Z" fill="url(#signup-leaf-shine)" />
        <path d="M263 121C261 158 250 194 229 231" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeOpacity="0.9" />
        <path d="M103 281C158 271 206 248 244 213C259 200 270 185 283 166C274 212 248 246 210 266C178 283 142 288 103 281Z" fill="url(#signup-lower)" />
        <path d="M119 275C160 264 197 245 227 218" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.46" />
      </g>
    </svg>
  );
}

// --- الأيقونات المدارية ---
const orbitIcons: { Icon: ComponentType<IconProps>; color: string }[] = [
  { Icon: HeartPulseIcon, color: "#0876d9" },
  { Icon: StethoscopeIcon, color: "#08a6b9" },
  { Icon: ClipboardIcon, color: "#116dcc" },
  { Icon: LabIcon, color: "#0a8ac8" },
  { Icon: PharmacyIcon, color: "#17aeaa" },
  { Icon: ConsultationIcon, color: "#35bd70" },
];

// --- خيارات الأدوار ---
const roleOptions = [
  {
    value: "patient" as Role,
    label: "مريض",
    icon: User,
    description: "متابعة صحتك وفحوصاتك",
    color: "from-[#0876d9] to-[#12c7c4]",
  },
  {
    value: "doctor" as Role,
    label: "طبيب",
    icon: Stethoscope,
    description: "تقديم الاستشارات والخدمات",
    color: "from-[#0b69c7] to-[#38c96f]",
  },
  {
    value: "pharmacist" as Role,
    label: "صيدلي",
    icon: PillBottle,
    description: "إدارة الصيدلية والطلبات",
    color: "from-[#17aeaa] to-[#35bd70]",
  },
];

// قائمة التخصصات
const SPECIALTIES = [
  "باطنية",
  "قلبية",
  "أطفال",
  "جلدية",
  "عظام",
  "مخ وأعصاب",
  "نساء وتوليد",
  "أنف وأذن وحنجرة",
  "مختبر (تشخيص مخبري)",
  "أخرى",
];

// --- مكون عرض الشعار مع المدارات (مصغر للجوال) ---
function SignupLogoSection() {
  return (
    <div className="tibyan-logo-stage relative mx-auto grid min-h-[200px] w-full max-w-[280px] place-items-center sm:min-h-[300px] sm:max-w-[400px] overflow-hidden">
      <div className="orbit-canvas pointer-events-none absolute h-[220px] w-[220px] sm:h-[320px] sm:w-[320px]" aria-hidden="true">
        <div className="engineering-ring absolute inset-0 rounded-full border border-dashed border-[#0a86c7]/25" />
        <div className="engineering-ring reverse absolute inset-[20px] rounded-full border border-[#12b7bd]/20 sm:inset-[30px]" />
        <div className="orbit-energy-ring absolute inset-[44px] rounded-full border border-[#35c86f]/15 sm:inset-[64px]" />

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
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="logo-aura pointer-events-none absolute h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-[radial-gradient(circle,rgba(18,183,189,0.20)_0%,rgba(8,118,217,0.10)_46%,transparent_72%)] blur-xl" aria-hidden="true" />

      <div className="logo-core relative z-10 h-28 w-28 sm:h-44 sm:w-44">
        <TibyanLogo className="h-full w-full overflow-visible" />
      </div>
    </div>
  );
}

// =============== صفحة إنشاء الحساب ===============
export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  // حالة النموذج
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient" as Role,
    fullName: "",
    phone: "",
    specialty: "",
    labName: "",
    labAddress: "",
    birthDate: "",
    gender: "",
    bio: "",
    documentFile: null as File | null,
  });

  // إظهار/إخفاء كلمة المرور
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setNotice(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, documentFile: files[0] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setNotice(null);

    if (formData.password !== formData.confirmPassword) {
      setNotice({ type: "error", text: "كلمتا المرور غير متطابقتين" });
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setNotice({ type: "error", text: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" });
      setIsLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("فشل إنشاء الحساب");

      const profileData: any = {
        id: authData.user.id,
        full_name: formData.fullName,
        phone: formData.phone,
        role: formData.role,
        birth_date: formData.birthDate || null,
        gender: formData.gender || null,
        bio: formData.bio || null,
        is_verified: false,
      };

      if (formData.role === "doctor") {
        profileData.specialty = formData.specialty;
        if (formData.specialty === "مختبر (تشخيص مخبري)") {
          profileData.lab_name = formData.labName;
          profileData.lab_address = formData.labAddress;
        }
      }

      if (formData.role === "pharmacist") {
        profileData.lab_name = formData.labName;
        profileData.lab_address = formData.labAddress;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .insert([profileData]);

      if (profileError) throw profileError;

      // رفع الملف إن وجد
      if (formData.documentFile && (formData.role === "doctor" || formData.role === "pharmacist")) {
        const fileExt = formData.documentFile.name.split(".").pop();
        const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;
        const filePath = `documents/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("user-documents")
          .upload(filePath, formData.documentFile);

        if (uploadError) {
          console.error("خطأ في رفع الملف:", uploadError);
        }
      }

      // توجيه حسب الدور
      const route =
        formData.role === "doctor"
          ? "/main/consultations"
          : formData.role === "pharmacist"
          ? "/main/pharmacy"
          : "/";
      router.push(route);
    } catch (error: any) {
      setNotice({ type: "error", text: error.message || "حدث خطأ أثناء إنشاء الحساب" });
    } finally {
      setIsLoading(false);
    }
  };

  const needsDocument = formData.role === "doctor" || formData.role === "pharmacist";

  return (
    <div dir="rtl" className={`${tibyanFont.variable} tibyan-signup-root relative min-h-[100svh] bg-[#f0f7ff] dark:bg-slate-950 overflow-x-hidden`}>
      <main className="relative min-h-[100svh] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 overflow-x-hidden">
        {/* خلفية طبية متحركة */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="medical-grid absolute inset-0 opacity-50" />
          <div className="absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#12b7bd]/15 blur-3xl animate-blob-one" />
          <div className="absolute -bottom-48 -left-28 h-[34rem] w-[34rem] rounded-full bg-[#38c96f]/12 blur-3xl animate-blob-two" />
        </div>

        {/* البطاقة المركزية */}
        <div className="relative z-10 w-full max-w-lg mx-auto">
          <div className="rounded-[2.5rem] border border-white/60 bg-white/75 shadow-[0_40px_100px_rgba(4,70,127,0.15)] backdrop-blur-2xl p-5 sm:p-8 dark:border-slate-700/50 dark:bg-slate-950/80 dark:shadow-[0_40px_100px_rgba(0,0,0,0.4)] max-h-[85vh] overflow-y-auto overscroll-contain max-w-full">
            
            {/* الشعار المصغر مع الأيقونات المدارية */}
            <SignupLogoSection />

            {/* اسم تيبان */}
            <div className="text-center -mt-2 mb-6">
              <h2 className="text-3xl font-black bg-gradient-to-l from-[#0876d9] via-[#0eabb8] to-[#36c96f] bg-clip-text text-transparent sm:text-4xl">
                تيبان
              </h2>
              <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-[#12b7bd]/20 bg-[#eafafa]/80 px-3 py-1 text-xs font-bold text-[#078c96] shadow-sm dark:bg-[#0d3333]/40 dark:text-[#7bf1e0]">
                <Sparkles className="h-3.5 w-3.5 text-[#38c96f]" />
                النظام الصحي الذكي المتكامل
              </div>
            </div>

            {/* عنوان الترحيب */}
            <div className="mb-6">
              <h1 className="text-2xl font-black tracking-tight text-[#064c91] dark:text-white text-center">
                إنشاء حساب جديد
              </h1>
              <p className="mt-1 text-sm font-medium text-[#4e7894] dark:text-slate-400 text-center">
                انضم إلى منصة تيبان وابدأ رحلتك الصحية
              </p>
            </div>

            {/* الإشعارات */}
            {notice && (
              <div
                role={notice.type === "error" ? "alert" : "status"}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-3 mb-4 text-sm font-medium animate-fade-in",
                  notice.type === "error"
                    ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
                    : "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                )}
              >
                {notice.type === "error" ? (
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                ) : (
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" />
                )}
                <span>{notice.text}</span>
              </div>
            )}

            {/* نموذج التسجيل */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* اختيار الدور - أزرار جميلة */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                  اختر دورك
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {roleOptions.map(({ value, label, icon: Icon, description, color }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, role: value }))}
                      className={cn(
                        "relative flex flex-col items-center gap-1 rounded-2xl border p-3 text-center transition-all duration-200",
                        "hover:shadow-md hover:-translate-y-0.5",
                        formData.role === value
                          ? "border-[#0876d9]/40 bg-gradient-to-br from-[#e6f2ff] to-[#e6fdf9] dark:from-[#0d2f4a] dark:to-[#0d2f2f] shadow-md"
                          : "border-white/40 bg-white/60 dark:border-slate-700/50 dark:bg-slate-900/60"
                      )}
                    >
                      <span className={cn(
                        "grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                        color
                      )}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-bold text-[#064c91] dark:text-white">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* البريد الإلكتروني */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7]" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    dir="ltr"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-14 rounded-2xl border-[#0a86c7]/20 bg-white/80 pr-12 text-left shadow-sm"
                  />
                </div>
              </div>

              {/* كلمة المرور */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <LockKeyhole className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7]" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="h-14 rounded-2xl border-[#0a86c7]/20 bg-white/80 px-12 text-left shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-[#6a8fa7] hover:bg-slate-100"
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* تأكيد كلمة المرور */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                  تأكيد كلمة المرور
                </Label>
                <div className="relative">
                  <LockKeyhole className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7]" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    dir="ltr"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="h-14 rounded-2xl border-[#0a86c7]/20 bg-white/80 px-12 text-left shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-[#6a8fa7] hover:bg-slate-100"
                    aria-label={showConfirmPassword ? "إخفاء تأكيد كلمة المرور" : "إظهار تأكيد كلمة المرور"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* الاسم الكامل */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                  الاسم الكامل
                </Label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7]" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="h-14 rounded-2xl border-[#0a86c7]/20 bg-white/80 pr-12 text-left shadow-sm"
                  />
                </div>
              </div>

              {/* رقم الهاتف */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                  رقم الهاتف
                </Label>
                <div className="relative">
                  <Phone className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7]" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="h-14 rounded-2xl border-[#0a86c7]/20 bg-white/80 pr-12 text-left shadow-sm"
                  />
                </div>
              </div>

              {/* حقول خاصة بالمريض */}
              {formData.role === "patient" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                      تاريخ الميلاد
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7]" />
                      <Input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="h-14 rounded-2xl border-[#0a86c7]/20 bg-white/80 pr-12 text-left shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                      الجنس
                    </Label>
                    <div className="relative">
                      <Users className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7]" />
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full h-14 rounded-2xl border border-[#0a86c7]/20 bg-white/80 pr-12 pl-4 text-sm shadow-sm focus-visible:border-[#0876d9] focus-visible:ring-4 focus-visible:ring-[#0876d9]/10"
                      >
                        <option value="">اختر</option>
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* حقول خاصة بالطبيب */}
              {formData.role === "doctor" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="specialty" className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                      التخصص الطبي
                    </Label>
                    <div className="relative">
                      <Briefcase className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7]" />
                      <select
                        id="specialty"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                        className="w-full h-14 rounded-2xl border border-[#0a86c7]/20 bg-white/80 pr-12 pl-4 text-sm shadow-sm"
                      >
                        <option value="">اختر تخصصك</option>
                        {SPECIALTIES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {formData.specialty === "مختبر (تشخيص مخبري)" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="labName" className="text-sm font-bold">اسم المختبر</Label>
                        <Input id="labName" name="labName" value={formData.labName} onChange={handleChange} className="h-14 rounded-2xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="labAddress" className="text-sm font-bold">عنوان المختبر</Label>
                        <Input id="labAddress" name="labAddress" value={formData.labAddress} onChange={handleChange} className="h-14 rounded-2xl" />
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-bold">نبذة عنك</Label>
                    <Input id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="خبراتك الطبية" className="h-14 rounded-2xl" />
                  </div>
                </>
              )}

              {/* حقول خاصة بالصيدلي */}
              {formData.role === "pharmacist" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="labName" className="text-sm font-bold">اسم الصيدلية</Label>
                    <div className="relative">
                      <ClipboardList className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7]" />
                      <Input id="labName" name="labName" value={formData.labName} onChange={handleChange} required className="h-14 rounded-2xl border-[#0a86c7]/20 bg-white/80 pr-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="labAddress" className="text-sm font-bold">عنوان الصيدلية</Label>
                    <div className="relative">
                      <MapPin className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7]" />
                      <Input id="labAddress" name="labAddress" value={formData.labAddress} onChange={handleChange} required className="h-14 rounded-2xl border-[#0a86c7]/20 bg-white/80 pr-12" />
                    </div>
                  </div>
                </>
              )}

              {/* رفع الوثيقة */}
              {needsDocument && (
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                    رفع الوثيقة المهنية
                  </Label>
                  <div className="relative">
                    <FileText className="absolute right-4 top-4 h-5 w-5 text-[#6a8fa7]" />
                    <Input
                      id="document"
                      name="document"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="h-14 rounded-2xl border-[#0a86c7]/20 bg-white/80 pr-12 pt-3 shadow-sm file:ml-4 file:rounded-xl file:border-0 file:bg-[#0876d9]/10 file:px-3 file:py-1 file:text-xs file:font-bold file:text-[#0876d9]"
                    />
                  </div>
                  <p className="text-xs text-[#6a8fa7] mr-1">يسمح بملفات PDF أو صور (JPG, PNG)</p>
                </div>
              )}

              {/* زر التسجيل */}
              <Button
                type="submit"
                disabled={isLoading}
                className="group h-14 w-full rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0caab8] text-base font-black text-white shadow-[0_16px_35px_rgba(8,118,217,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_45px_rgba(8,118,217,0.35)] dark:from-[#0f5ca8] dark:to-[#0b8b91]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  <>
                    إنشاء حساب
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-[#6a8fa7] dark:text-slate-400">
                لديك حساب بالفعل؟{" "}
                <Link
                  href="/login"
                  className="font-black text-[#0876d9] hover:underline dark:text-[#38bdf8]"
                >
                  سجل دخولك
                </Link>
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-[#8aaec9] dark:text-slate-500">
            © {new Date().getFullYear()} تيبان — جميع الحقوق محفوظة
          </p>
        </div>
      </main>

      {/* جميع الأنماط والحركات (نفس صفحة تسجيل الدخول) */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        .tibyan-signup-root,
        .tibyan-signup-root button,
        .tibyan-signup-root input,
        .tibyan-signup-root select {
          font-family: var(--font-tibyan), "IBM Plex Sans Arabic", Tahoma, Arial, sans-serif;
        }

        .medical-grid {
          background-image:
            linear-gradient(rgba(8, 118, 217, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8, 118, 217, 0.045) 1px, transparent 1px);
          background-size: 42px 42px;
          animation: gridMove 18s linear infinite;
        }

        .tibyan-logo-stage {
          --orbit-radius: 88px;
          isolation: isolate;
          overflow: hidden; /* منع تجاوز المدارات */
        }

        .logo-core {
          animation: logoFloat 4.5s ease-in-out infinite;
          filter: drop-shadow(0 16px 20px rgba(3, 82, 143, 0.2));
          transform-origin: 50% 55%;
        }

        .logo-aura {
          animation: logoAura 4.8s ease-in-out infinite;
        }

        .engineering-ring {
          animation: slowSpin 18s linear infinite;
          box-shadow: 0 0 30px rgba(18, 183, 189, 0.05);
        }

        .engineering-ring.reverse {
          animation-direction: reverse;
          animation-duration: 13s;
        }

        .orbit-energy-ring {
          box-shadow:
            0 0 30px rgba(18, 183, 189, 0.05),
            inset 0 0 20px rgba(56, 201, 111, 0.02);
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
          width: 36px;
          height: 36px;
          box-shadow:
            0 6px 12px rgba(4, 77, 132, 0.1),
            0 0 0 3px rgba(255, 255, 255, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          animation: orbitBadgeBreath 3.8s ease-in-out infinite;
        }

        .orbit-slot:nth-child(5) .orbit-badge { animation-delay: .35s; }
        .orbit-slot:nth-child(6) .orbit-badge { animation-delay: .7s; }
        .orbit-slot:nth-child(7) .orbit-badge { animation-delay: 1.05s; }
        .orbit-slot:nth-child(8) .orbit-badge { animation-delay: 1.4s; }
        .orbit-slot:nth-child(9) .orbit-badge { animation-delay: 1.75s; }
        .orbit-slot:nth-child(10) .orbit-badge { animation-delay: 2.1s; }

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

        .animate-blob-one {
          animation: blobOne 13s ease-in-out infinite;
        }

        .animate-blob-two {
          animation: blobTwo 15s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes gridMove {
          to { background-position: 42px 42px; }
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }

        @keyframes logoAura {
          0%, 100% { opacity: .55; transform: scale(.92); }
          50% { opacity: 1; transform: scale(1.07); }
        }

        @keyframes slowSpin {
          to { transform: rotate(360deg); }
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
          50% { transform: translateY(-2px) scale(1.03); }
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

        @keyframes blobOne {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-24px, 14px) scale(1.06); }
        }

        @keyframes blobTwo {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -18px) scale(1.08); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 640px) {
          .tibyan-logo-stage {
            --orbit-radius: 132px;
          }
          .orbit-badge {
            width: 48px;
            height: 48px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .medical-grid,
          .logo-core,
          .logo-aura,
          .engineering-ring,
          .orbit-energy-ring,
          .orbit-runner,
          .orbit-counter,
          .orbit-badge,
          .tibyan-heartbeat,
          .tibyan-leaf,
          .animate-blob-one,
          .animate-blob-two {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}