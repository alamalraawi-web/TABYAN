"use client";

import {
  useEffect,
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
  Apple,
  ArrowLeft,
  Check,
  CircleCheck,
  Eye,
  EyeOff,
  HelpCircle,
  Loader2,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

// --- الخط العربي الموحد (نفس الصفحة الرئيسية) ---
const tibyanFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-tibyan",
  preload: true,
});

// --- الأنواع ---
type LoadingAction = "password" | "google" | "apple" | "resend" | null;
type OAuthProvider = "google" | "apple";
type Notice = {
  type: "error" | "success";
  text: string;
};

interface CheckboxProps {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const REMEMBERED_EMAIL_KEY = "tabyan.remembered-email";

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

// --- شعار تبيان SVG (مطابق للصفحة الرئيسية تماماً) ---
function TibyanLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-labelledby="tibyan-login-logo-title"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="tibyan-login-logo-title">شعار تبيان الطبي</title>
      <defs>
        <linearGradient id="login-cross" x1="58" y1="53" x2="211" y2="257" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#12c7c4" />
          <stop offset="0.34" stopColor="#0789da" />
          <stop offset="0.72" stopColor="#0758ba" />
          <stop offset="1" stopColor="#073d91" />
        </linearGradient>
        <linearGradient id="login-cross-light" x1="79" y1="62" x2="171" y2="203" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ee1dc" stopOpacity="0.62" />
          <stop offset="1" stopColor="#2e7be0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="login-body" x1="157" y1="118" x2="218" y2="252" gradientUnits="userSpaceOnUse">
          <stop stopColor="#166dd1" />
          <stop offset="0.52" stopColor="#0b82cc" />
          <stop offset="1" stopColor="#0755ad" />
        </linearGradient>
        <linearGradient id="login-leaf" x1="225" y1="91" x2="247" y2="278" gradientUnits="userSpaceOnUse">
          <stop stopColor="#53d977" />
          <stop offset="0.52" stopColor="#28c87a" />
          <stop offset="1" stopColor="#00a99d" />
        </linearGradient>
        <linearGradient id="login-leaf-shine" x1="250" y1="112" x2="232" y2="246" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a7f4b4" stopOpacity="0.82" />
          <stop offset="1" stopColor="#27c98a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="login-lower" x1="118" y1="280" x2="286" y2="203" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0b69c7" />
          <stop offset="0.56" stopColor="#08aeb5" />
          <stop offset="1" stopColor="#37d16f" />
        </linearGradient>
        <radialGradient id="login-head" cx="0" cy="0" r="1" gradientTransform="translate(154 84) rotate(57) scale(43)">
          <stop stopColor="#ffffff" />
          <stop offset="0.68" stopColor="#f8fdff" />
          <stop offset="1" stopColor="#deeff8" />
        </radialGradient>
        <filter id="login-shadow" x="-28%" y="-28%" width="156%" height="170%">
          <feDropShadow dx="0" dy="14" stdDeviation="13" floodColor="#075c9e" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter="url(#login-shadow)">
        <path d="M105 40C86 40 71 55 71 74V104H43C25 104 11 118 11 136V185C11 203 25 217 43 217H78L67 277L126 224C131 219 137 217 144 217H163V187H195C213 187 227 173 227 155V136C227 118 213 104 195 104H163V74C163 55 148 40 129 40H105Z" fill="url(#login-cross)" />
        <path d="M108 48C92 48 80 60 80 76V116H50C35 116 24 127 24 142V161C53 142 84 126 120 117C139 112 156 110 178 111V76C178 61 166 48 150 48H108Z" fill="url(#login-cross-light)" />
        <path className="tibyan-heartbeat" d="M29 160H72L82 141L94 183L111 119L129 193L145 151L158 168H193" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="158" cy="92" r="28" fill="url(#login-head)" />
        <circle cx="151" cy="84" r="9" fill="#ffffff" fillOpacity="0.72" />
        <path d="M147 120C164 139 179 153 195 160C185 185 169 211 144 238C134 248 124 258 110 270C145 256 174 238 194 215C214 191 227 158 237 120C220 143 203 158 187 167C176 146 163 130 147 120Z" fill="#ffffff" />
        <path d="M169 121C183 144 193 166 198 188C214 162 228 136 247 108C227 152 213 195 211 239C196 212 183 175 169 121Z" fill="url(#login-body)" />
        <path className="tibyan-leaf" d="M248 86C286 113 304 160 290 205C279 242 248 266 210 279C219 247 211 222 214 191C216 154 226 112 248 86Z" fill="url(#login-leaf)" />
        <path d="M252 104C275 132 282 164 274 194C267 220 249 240 224 254C236 221 233 195 238 165C241 143 246 122 252 104Z" fill="url(#login-leaf-shine)" />
        <path d="M263 121C261 158 250 194 229 231" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeOpacity="0.9" />
        <path d="M103 281C158 271 206 248 244 213C259 200 270 185 283 166C274 212 248 246 210 266C178 283 142 288 103 281Z" fill="url(#login-lower)" />
        <path d="M119 275C160 264 197 245 227 218" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.46" />
      </g>
    </svg>
  );
}

// --- مربع اختيار مخصص ---
function Checkbox({
  id,
  checked,
  disabled = false,
  onCheckedChange,
}: CheckboxProps) {
  return (
    <span className="relative inline-flex shrink-0 items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onCheckedChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "grid size-5 place-items-center rounded-md border border-slate-300 bg-white",
          "shadow-sm transition-all duration-200",
          "peer-focus-visible:ring-4 peer-focus-visible:ring-[#0876d9]/20",
          "peer-checked:border-transparent peer-checked:bg-gradient-to-br",
          "peer-checked:from-[#0876d9] peer-checked:to-[#12c7c4]",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          "dark:border-slate-600 dark:bg-slate-900 dark:peer-focus-visible:ring-[#0876d9]/30",
        )}
      >
        {checked && <Check className="size-3.5 text-white" strokeWidth={3} />}
      </span>
    </span>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M21.805 10.023h-9.766v3.955h5.617c-.242 1.274-.969 2.352-2.063 3.079v2.563h3.344c1.957-1.804 3.086-4.461 3.086-7.622 0-.675-.062-1.335-.218-1.975Z" />
      <path fill="#34A853" d="M12.04 22c2.788 0 5.13-.922 6.897-2.38l-3.344-2.563c-.922.618-2.102.985-3.554.985-2.687 0-4.968-1.82-5.785-4.265H2.8v2.648A10.42 10.42 0 0 0 12.04 22Z" />
      <path fill="#FBBC05" d="M6.254 13.777A6.265 6.265 0 0 1 5.93 12c0-.617.11-1.219.324-1.777V7.575H2.8A10.043 10.043 0 0 0 1.961 12c0 1.594.379 3.102.84 4.425l3.453-2.648Z" />
      <path fill="#EA4335" d="M12.04 5.958c1.523 0 2.89.524 3.968 1.555l2.977-2.977C17.18 2.852 14.828 2 12.039 2A10.42 10.42 0 0 0 2.8 7.575l3.454 2.648c.817-2.445 3.098-4.265 5.785-4.265Z" />
    </svg>
  );
}

function getArabicAuthError(error: unknown): string {
  const fallbackMessage = "تعذر إكمال العملية حالياً. حاول مرة أخرى.";
  if (!(error instanceof Error)) return fallbackMessage;
  const message = error.message.toLowerCase();
  if (message.includes("email not confirmed"))
    return "بريدك الإلكتروني غير مؤكد. أعد إرسال رابط التأكيد ثم تحقق من بريدك.";
  if (message.includes("invalid login credentials"))
    return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
  if (message.includes("too many requests") || message.includes("rate limit"))
    return "محاولات كثيرة، انتظر قليلاً ثم أعد المحاولة.";
  if (message.includes("provider is not enabled") || message.includes("unsupported provider"))
    return "طريقة الدخول هذه غير مفعّلة بعد.";
  if (message.includes("failed to fetch") || message.includes("network"))
    return "تعذر الاتصال بالخادم. تحقق من الإنترنت.";
  return fallbackMessage;
}

// --- الأيقونات المدارية (نفس الصفحة الرئيسية) ---
const orbitIcons: { Icon: ComponentType<IconProps>; color: string }[] = [
  { Icon: HeartPulseIcon, color: "#0876d9" },
  { Icon: StethoscopeIcon, color: "#08a6b9" },
  { Icon: ClipboardIcon, color: "#116dcc" },
  { Icon: LabIcon, color: "#0a8ac8" },
  { Icon: PharmacyIcon, color: "#17aeaa" },
  { Icon: ConsultationIcon, color: "#35bd70" },
];

// --- شاشة التحقق من الجلسة ---
function SessionSplash() {
  return (
    <main dir="rtl" className={`${tibyanFont.variable} relative grid min-h-[100svh] place-items-center overflow-hidden bg-[#f7fcff]`}>
      <div className="absolute inset-0 medical-grid opacity-50" />
      <div className="relative z-10 text-center">
        <div className="mx-auto w-40 h-40 sm:w-48 sm:h-48 logo-float">
          <TibyanLogo className="h-full w-full" />
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-[#064c91]">
          <Loader2 className="size-4 animate-spin text-[#0876d9]" />
          جارٍ التحقق من جلسة الدخول...
        </div>
      </div>
    </main>
  );
}

// =============== صفحة تسجيل الدخول ===============
export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberEmail, setRememberEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const isBusy = loadingAction !== null;

  useEffect(() => {
    document.title = "تيبان - تسجيل الدخول";
  }, []);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        const remembered = window.localStorage.getItem(REMEMBERED_EMAIL_KEY);
        if (remembered && isMounted) {
          setFormData((c) => ({ ...c, email: remembered }));
          setRememberEmail(true);
        }
      } catch {}

      const { data: { session }, error } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (error) {
        setNotice({ type: "error", text: "تعذر التحقق من جلسة الدخول." });
        setIsCheckingSession(false);
        return;
      }
      if (session) {
        router.replace("/");
        router.refresh();
        return;
      }
      setIsCheckingSession(false);
    };
    void init();
    return () => { isMounted = false };
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((c) => ({ ...c, [name]: value }));
    setNotice(null);
    setNeedsConfirmation(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    if (!email || !password) {
      setNotice({ type: "error", text: "أدخل البريد الإلكتروني وكلمة المرور." });
      return;
    }
    setLoadingAction("password");
    setNotice(null);
    setNeedsConfirmation(false);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setNeedsConfirmation(error.message.toLowerCase().includes("email not confirmed"));
        setNotice({ type: "error", text: getArabicAuthError(error) });
        return;
      }
      if (!data.session) {
        setNotice({ type: "error", text: "لم يتم إنشاء جلسة دخول. أعد المحاولة." });
        return;
      }
      try {
        if (rememberEmail) localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
        else localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      } catch {}
      router.replace("/");
      router.refresh();
    } catch (error: unknown) {
      setNotice({ type: "error", text: getArabicAuthError(error) });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleResendConfirmation = async () => {
    const email = formData.email.trim().toLowerCase();
    if (!email) {
      setNotice({ type: "error", text: "أدخل بريدك الإلكتروني أولاً." });
      return;
    }
    setLoadingAction("resend");
    setNotice(null);
    try {
      const { error } = await supabase.auth.resend({ type: "signup", email });
      if (error) throw error;
      setNeedsConfirmation(false);
      setNotice({ type: "success", text: "تم إرسال رابط التأكيد. تحقق من بريدك." });
    } catch (error: unknown) {
      setNotice({ type: "error", text: getArabicAuthError(error) });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleOAuthLogin = async (provider: OAuthProvider) => {
    setLoadingAction(provider);
    setNotice(null);
    setNeedsConfirmation(false);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setNotice({ type: "error", text: getArabicAuthError(error) });
      setLoadingAction(null);
    }
  };

  if (isCheckingSession) return <SessionSplash />;

  return (
    <div dir="rtl" className={`${tibyanFont.variable} tibyan-login-root relative min-h-[100svh] bg-[#f0f7ff] dark:bg-slate-950 overflow-x-hidden`}>
      {/* المحتوى الرئيسي - بدون شريط علوي، ومنع التمرير الأفقي */}
      <main className="relative min-h-[100svh] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 overflow-x-hidden">
        {/* خلفية طبية متحركة */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="medical-grid absolute inset-0 opacity-50" />
          <div className="absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#12b7bd]/15 blur-3xl animate-blob-one" />
          <div className="absolute -bottom-48 -left-28 h-[34rem] w-[34rem] rounded-full bg-[#38c96f]/12 blur-3xl animate-blob-two" />
        </div>

        {/* البطاقة المركزية */}
        <div className="relative z-10 w-full max-w-lg mx-auto">
          <div className="rounded-[2.5rem] border border-white/60 bg-white/75 shadow-[0_40px_100px_rgba(4,70,127,0.15)] backdrop-blur-2xl p-5 sm:p-8 dark:border-slate-700/50 dark:bg-slate-950/80 dark:shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
            
            {/* الشعار مع الأيقونات المدارية - تم تصغير الحجم للهواتف */}
            <div className="tibyan-logo-stage relative mx-auto grid min-h-[260px] w-full max-w-[320px] place-items-center sm:min-h-[360px] sm:max-w-[440px]">
              <div className="orbit-canvas pointer-events-none absolute h-[260px] w-[260px] sm:h-[360px] sm:w-[360px]" aria-hidden="true">
                <div className="engineering-ring absolute inset-0 rounded-full border border-dashed border-[#0a86c7]/25" />
                <div className="engineering-ring reverse absolute inset-[24px] rounded-full border border-[#12b7bd]/20 sm:inset-[34px]" />
                <div className="orbit-energy-ring absolute inset-[52px] rounded-full border border-[#35c86f]/15 sm:inset-[72px]" />

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
                                <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="logo-aura pointer-events-none absolute h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-[radial-gradient(circle,rgba(18,183,189,0.20)_0%,rgba(8,118,217,0.10)_46%,transparent_72%)] blur-xl" aria-hidden="true" />

              <div className="logo-core relative z-10 h-36 w-36 sm:h-56 sm:w-56">
                <TibyanLogo className="h-full w-full overflow-visible" />
              </div>
            </div>

            {/* اسم تيبان أسفل الشعار */}
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
                 تسجيل الدخول
              </h1>
              <p className="mt-1 text-sm font-medium text-[#4e7894] dark:text-slate-400 text-center">
                سجّل الدخول للوصول إلى حسابك ومتابعة رحلتك الصحية.
              </p>
            </div>

            {/* الإشعارات */}
            <div aria-live="polite" className="mb-4">
              {notice && (
                <div
                  role={notice.type === "error" ? "alert" : "status"}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border p-3 text-sm font-medium animate-fade-in",
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
            </div>

            {/* نموذج تسجيل الدخول */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7] dark:text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    dir="ltr"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isBusy}
                    required
                    className="h-14 rounded-2xl border-[#0a86c7]/20 bg-white/80 pr-12 text-left shadow-sm focus-visible:border-[#0876d9] focus-visible:ring-4 focus-visible:ring-[#0876d9]/10 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-bold text-[#064c91] dark:text-slate-200">
                    كلمة المرور
                  </Label>
                </div>
                <div className="relative">
                  <LockKeyhole className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6a8fa7] dark:text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isBusy}
                    required
                    className="h-14 rounded-2xl border-[#0a86c7]/20 bg-white/80 px-12 text-left shadow-sm focus-visible:border-[#0876d9] focus-visible:ring-4 focus-visible:ring-[#0876d9]/10 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={isBusy}
                    className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-[#6a8fa7] hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <Link
                    href="/forgot-password"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0876d9] hover:underline dark:text-[#38bdf8]"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                    نسيت كلمة المرور؟
                  </Link>
                </div>
              </div>

              <label
                htmlFor="remember-email"
                className={cn(
                  "inline-flex cursor-pointer select-none items-center gap-2.5 text-sm font-medium text-[#365f79] dark:text-slate-300",
                  isBusy && "cursor-not-allowed opacity-60"
                )}
              >
                <Checkbox
                  id="remember-email"
                  checked={rememberEmail}
                  disabled={isBusy}
                  onCheckedChange={setRememberEmail}
                />
                تذكر بريدي الإلكتروني
              </label>

              <Button
                type="submit"
                disabled={isBusy}
                className="group h-14 w-full rounded-2xl bg-gradient-to-l from-[#0876d9] to-[#0caab8] text-base font-black text-white shadow-[0_16px_35px_rgba(8,118,217,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_45px_rgba(8,118,217,0.35)] dark:from-[#0f5ca8] dark:to-[#0b8b91]"
              >
                {loadingAction === "password" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    جارٍ تسجيل الدخول...
                  </>
                ) : (
                  <>
                    تسجيل الدخول
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  </>
                )}
              </Button>

              {needsConfirmation && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendConfirmation}
                  disabled={isBusy}
                  className="h-[3.25rem] w-full rounded-2xl border-[#12b7bd]/30 bg-[#eafafa] font-bold text-[#078c96] hover:bg-[#d9f4f4] dark:border-[#12b7bd]/20 dark:bg-[#0d3333]/40 dark:text-[#7bf1e0]"
                >
                  {loadingAction === "resend" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      جارٍ إعادة الإرسال...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      إعادة إرسال رابط التأكيد
                    </>
                  )}
                </Button>
              )}

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#0a86c7]/10 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white/80 px-4 text-xs font-medium text-[#6a8fa7] dark:bg-slate-950/80 dark:text-slate-400">
                    أو المتابعة بواسطة
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOAuthLogin("google")}
                  disabled={isBusy}
                  className="h-[3.25rem] rounded-2xl border-[#0a86c7]/15 bg-white/80 font-bold text-[#064c91] hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                >
                  {loadingAction === "google" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <GoogleIcon className="h-5 w-5" />
                  )}
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOAuthLogin("apple")}
                  disabled={isBusy}
                  className="h-[3.25rem] rounded-2xl border-[#0a86c7]/15 bg-white/80 font-bold text-[#064c91] hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                >
                  {loadingAction === "apple" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Apple className="h-5 w-5" />
                  )}
                  Apple
                </Button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-[#6a8fa7] dark:text-slate-400">
              ليس لديك حساب؟{" "}
              <Link
                href="/signup"
                className="font-black text-[#0876d9] hover:underline dark:text-[#38bdf8]"
              >
                إنشاء حساب جديد
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-[#8aaec9] dark:text-slate-500">
            © {new Date().getFullYear()} تيبان — جميع الحقوق محفوظة
          </p>
        </div>
      </main>

      <style jsx global>{`
        /* منع التمرير الأفقي في جميع العناصر */
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        .tibyan-login-root,
        .tibyan-login-root button,
        .tibyan-login-root input {
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
          --orbit-radius: 106px;
          isolation: isolate;
        }

        .logo-core {
          animation: logoFloat 4.5s ease-in-out infinite;
          filter: drop-shadow(0 20px 24px rgba(3, 82, 143, 0.22));
          transform-origin: 50% 55%;
        }

        .logo-aura {
          animation: logoAura 4.8s ease-in-out infinite;
        }

        .engineering-ring {
          animation: slowSpin 18s linear infinite;
          box-shadow: 0 0 40px rgba(18, 183, 189, 0.06);
        }

        .engineering-ring.reverse {
          animation-direction: reverse;
          animation-duration: 13s;
        }

        .orbit-energy-ring {
          box-shadow:
            0 0 35px rgba(18, 183, 189, 0.06),
            inset 0 0 25px rgba(56, 201, 111, 0.03);
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
          width: 40px;
          height: 40px;
          box-shadow:
            0 8px 16px rgba(4, 77, 132, 0.12),
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
          50% { transform: translateY(-10px) rotate(1.2deg); }
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
            --orbit-radius: 152px;
          }
          .orbit-badge {
            width: 56px;
            height: 56px;
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