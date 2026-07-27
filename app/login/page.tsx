"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
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
  HeartPulse,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

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

const platformHighlights = [
  {
    icon: Sparkles,
    title: "تجربة صحية ذكية",
    description: "وصول منظم وسريع إلى خدماتك الصحية من مكان واحد.",
  },
  {
    icon: ShieldCheck,
    title: "دخول آمن",
    description: "حسابك وجلسة الدخول تتم إدارتهما عبر Supabase Auth.",
  },
  {
    icon: HeartPulse,
    title: "مصمم لصحتك",
    description: "واجهة عربية واضحة ومتجاوبة مع الجوال والكمبيوتر.",
  },
];

function getArabicAuthError(error: unknown): string {
  const fallbackMessage = "تعذر إكمال العملية حالياً. حاول مرة أخرى.";

  if (!(error instanceof Error)) return fallbackMessage;

  const message = error.message.toLowerCase();

  if (message.includes("email not confirmed")) {
    return "بريدك الإلكتروني غير مؤكد. أعد إرسال رابط التأكيد ثم تحقق من بريدك.";
  }

  if (message.includes("invalid login credentials")) {
    return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
  }

  if (
    message.includes("too many requests") ||
    message.includes("rate limit")
  ) {
    return "تم تنفيذ محاولات كثيرة خلال وقت قصير. حاول مجدداً بعد قليل.";
  }

  if (
    message.includes("provider is not enabled") ||
    message.includes("unsupported provider") ||
    message.includes("oauth provider")
  ) {
    return "طريقة الدخول هذه غير مفعّلة بعد في إعدادات Supabase.";
  }

  if (
    message.includes("failed to fetch") ||
    message.includes("network") ||
    message.includes("fetch")
  ) {
    return "تعذر الاتصال بالخادم. تحقق من الإنترنت ثم أعد المحاولة.";
  }

  return fallbackMessage;
}

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
          "peer-focus-visible:ring-4 peer-focus-visible:ring-blue-100",
          "peer-checked:border-transparent peer-checked:bg-gradient-to-br",
          "peer-checked:from-blue-700 peer-checked:to-emerald-500",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          "dark:border-slate-600 dark:bg-slate-900 dark:peer-focus-visible:ring-blue-950",
        )}
      >
        {checked && <Check className="size-3.5 text-white" strokeWidth={3} />}
      </span>
    </span>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M21.805 10.023h-9.766v3.955h5.617c-.242 1.274-.969 2.352-2.063 3.079v2.563h3.344c1.957-1.804 3.086-4.461 3.086-7.622 0-.675-.062-1.335-.218-1.975Z"
      />
      <path
        fill="#34A853"
        d="M12.04 22c2.788 0 5.13-.922 6.897-2.38l-3.344-2.563c-.922.618-2.102.985-3.554.985-2.687 0-4.968-1.82-5.785-4.265H2.8v2.648A10.42 10.42 0 0 0 12.04 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.254 13.777A6.265 6.265 0 0 1 5.93 12c0-.617.11-1.219.324-1.777V7.575H2.8A10.043 10.043 0 0 0 1.961 12c0 1.594.379 3.102.84 4.425l3.453-2.648Z"
      />
      <path
        fill="#EA4335"
        d="M12.04 5.958c1.523 0 2.89.524 3.968 1.555l2.977-2.977C17.18 2.852 14.828 2 12.039 2A10.42 10.42 0 0 0 2.8 7.575l3.454 2.648c.817-2.445 3.098-4.265 5.785-4.265Z"
      />
    </svg>
  );
}

function AnimatedLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative mx-auto grid place-items-center",
        compact ? "h-28 w-56" : "h-44 w-72",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "tabyan-logo-glow absolute rounded-full bg-gradient-to-r",
          "from-blue-500/25 via-cyan-400/20 to-emerald-400/25 blur-2xl",
          compact ? "h-20 w-44" : "h-28 w-60",
        )}
      />

      <div
        aria-hidden="true"
        className={cn(
          "tabyan-logo-orbit absolute rounded-[999px] border border-white/45",
          compact ? "h-24 w-52" : "h-36 w-[17rem]",
        )}
      >
        <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.95)]" />
      </div>

      <div
        className={cn(
          "tabyan-logo-float relative z-10 flex items-center justify-center",
          "rounded-[1.75rem] border border-white/70 bg-white/90 shadow-2xl",
          "backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85",
          compact ? "h-20 w-44 px-5" : "h-28 w-56 px-7",
        )}
      >
        <Image
          src="/logo.png"
          alt="شعار تيبان"
          width={280}
          height={140}
          priority
          className="h-auto w-full object-contain"
        />
      </div>
    </div>
  );
}

function PageBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f4f9ff_0%,#ffffff_48%,#effcf8_100%)] dark:bg-[linear-gradient(135deg,#07111f_0%,#0b1322_48%,#071a18_100%)]" />
      <div className="tabyan-blob-one absolute -right-28 -top-32 size-[28rem] rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-700/15" />
      <div className="tabyan-blob-two absolute -bottom-40 -left-24 size-[30rem] rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-700/15" />
      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#0f4c81_1px,transparent_1px),linear-gradient(to_bottom,#0f4c81_1px,transparent_1px)] [background-size:42px_42px] dark:opacity-[0.06]" />
    </div>
  );
}

function MotionStyles() {
  return (
    <style jsx global>{`
      @keyframes tabyanLogoFloat {
        0%,
        100% {
          transform: translateY(0) scale(1);
        }
        50% {
          transform: translateY(-9px) scale(1.018);
        }
      }

      @keyframes tabyanLogoGlow {
        0%,
        100% {
          opacity: 0.55;
          transform: scale(0.92);
        }
        50% {
          opacity: 0.95;
          transform: scale(1.08);
        }
      }

      @keyframes tabyanLogoOrbit {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes tabyanBlobOne {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          transform: translate3d(-28px, 18px, 0) scale(1.06);
        }
      }

      @keyframes tabyanBlobTwo {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          transform: translate3d(24px, -20px, 0) scale(1.08);
        }
      }

      .tabyan-logo-float {
        animation: tabyanLogoFloat 5.5s ease-in-out infinite;
        will-change: transform;
      }

      .tabyan-logo-glow {
        animation: tabyanLogoGlow 4.8s ease-in-out infinite;
        will-change: opacity, transform;
      }

      .tabyan-logo-orbit {
        animation: tabyanLogoOrbit 15s linear infinite;
        will-change: transform;
      }

      .tabyan-blob-one {
        animation: tabyanBlobOne 13s ease-in-out infinite;
        will-change: transform;
      }

      .tabyan-blob-two {
        animation: tabyanBlobTwo 15s ease-in-out infinite;
        will-change: transform;
      }

      @media (prefers-reduced-motion: reduce) {
        .tabyan-logo-float,
        .tabyan-logo-glow,
        .tabyan-logo-orbit,
        .tabyan-blob-one,
        .tabyan-blob-two {
          animation: none !important;
        }
      }
    `}</style>
  );
}

function SessionSplash() {
  return (
    <main
      dir="rtl"
      className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5"
    >
      <PageBackground />
      <MotionStyles />
      <div className="relative z-10 text-center">
        <AnimatedLogo compact />
        <div className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Loader2 className="size-4 animate-spin text-blue-700 dark:text-blue-400" />
          <span>جارٍ التحقق من جلسة الدخول...</span>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberEmail, setRememberEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const isBusy = loadingAction !== null;

  useEffect(() => {
    let isMounted = true;

    const initializeLoginPage = async () => {
      try {
        const rememberedEmail = window.localStorage.getItem(
          REMEMBERED_EMAIL_KEY,
        );

        if (rememberedEmail && isMounted) {
          setFormData((current) => ({
            ...current,
            email: rememberedEmail,
          }));
          setRememberEmail(true);
        }
      } catch {
        // قد يكون التخزين المحلي غير متاح في بعض أوضاع الخصوصية.
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (error) {
        setNotice({
          type: "error",
          text: "تعذر التحقق من جلسة الدخول. يمكنك المحاولة مجدداً.",
        });
        setIsCheckingSession(false);
        return;
      }

      if (session) {
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      setIsCheckingSession(false);
    };

    void initializeLoginPage();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setNotice(null);
    setNeedsConfirmation(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setNotice({
        type: "error",
        text: "أدخل البريد الإلكتروني وكلمة المرور للمتابعة.",
      });
      return;
    }

    setLoadingAction("password");
    setNotice(null);
    setNeedsConfirmation(false);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const emailNotConfirmed = error.message
          .toLowerCase()
          .includes("email not confirmed");

        setNeedsConfirmation(emailNotConfirmed);
        setNotice({
          type: "error",
          text: getArabicAuthError(error),
        });
        return;
      }

      if (!data.session) {
        setNotice({
          type: "error",
          text: "تم قبول البيانات، لكن لم يتم إنشاء جلسة دخول. أعد المحاولة.",
        });
        return;
      }

      try {
        if (rememberEmail) {
          window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
        } else {
          window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
        }
      } catch {
        // لا نوقف تسجيل الدخول عند تعذر الوصول إلى التخزين المحلي.
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (error: unknown) {
      setNotice({
        type: "error",
        text: getArabicAuthError(error),
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleResendConfirmation = async () => {
    const email = formData.email.trim().toLowerCase();

    if (!email) {
      setNotice({
        type: "error",
        text: "أدخل بريدك الإلكتروني أولاً لإعادة إرسال رابط التأكيد.",
      });
      return;
    }

    setLoadingAction("resend");
    setNotice(null);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) throw error;

      setNeedsConfirmation(false);
      setNotice({
        type: "success",
        text: "أرسلنا رابط تأكيد جديداً. تحقق من صندوق الوارد والبريد غير المرغوب فيه.",
      });
    } catch (error: unknown) {
      setNotice({
        type: "error",
        text: getArabicAuthError(error),
      });
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
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error: unknown) {
      setNotice({
        type: "error",
        text: getArabicAuthError(error),
      });
      setLoadingAction(null);
    }
  };

  if (isCheckingSession) {
    return <SessionSplash />;
  }

  return (
    <main
      dir="rtl"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8"
    >
      <PageBackground />

      <section className="relative z-10 w-full max-w-6xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/80 bg-white/[0.72] shadow-[0_32px_110px_rgba(15,58,105,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/[0.72] dark:shadow-[0_32px_110px_rgba(0,0,0,0.42)] lg:grid-cols-2">
          {/* نموذج الدخول — يظهر يميناً على الشاشات الكبيرة بسبب اتجاه RTL */}
          <div className="relative flex items-center bg-white/[0.86] p-5 dark:bg-slate-950/[0.84] sm:p-8 lg:p-12">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-7 text-center lg:hidden">
                <AnimatedLogo compact />
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  ذكاء اصطناعي لصحة أفضل
                </p>
              </div>

              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
                  <ShieldCheck className="size-4" />
                  بوابة تيبان الصحية
                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  مرحباً بعودتك
                </h1>
                <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">
                  سجّل الدخول للوصول إلى حسابك ومتابعة رحلتك الصحية بسهولة
                  وأمان.
                </p>
              </div>

              <div aria-live="polite" aria-atomic="true">
                {notice && (
                  <div
                    role={notice.type === "error" ? "alert" : "status"}
                    className={cn(
                      "mb-5 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6",
                      notice.type === "error"
                        ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900/60 dark:bg-red-950/35 dark:text-red-200"
                        : "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/35 dark:text-emerald-200",
                    )}
                  >
                    {notice.type === "error" ? (
                      <AlertCircle className="mt-0.5 size-5 shrink-0" />
                    ) : (
                      <CircleCheck className="mt-0.5 size-5 shrink-0" />
                    )}
                    <span>{notice.text}</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="block text-sm font-bold text-slate-700 dark:text-slate-200"
                  >
                    البريد الإلكتروني
                  </Label>

                  <div className="group relative">
                    <Mail className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-700 dark:group-focus-within:text-blue-400" />
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
                      className="h-14 rounded-2xl border-slate-200 bg-white pl-4 pr-12 text-left text-base shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus-visible:border-blue-500 dark:focus-visible:ring-blue-950"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <Label
                      htmlFor="password"
                      className="block text-sm font-bold text-slate-700 dark:text-slate-200"
                    >
                      كلمة المرور
                    </Label>

                    <Link
                      href="/forgot-password"
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 transition hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      نسيت كلمة المرور؟
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>

                  <div className="group relative">
                    <LockKeyhole className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-700 dark:group-focus-within:text-blue-400" />
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
                      className="h-14 rounded-2xl border-slate-200 bg-white px-12 text-left text-base shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus-visible:border-blue-500 dark:focus-visible:ring-blue-950"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      disabled={isBusy}
                      aria-label={
                        showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                      }
                      aria-pressed={showPassword}
                      className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-blue-400 dark:focus-visible:ring-blue-950"
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                <label
                  htmlFor="remember-email"
                  className={cn(
                    "inline-flex cursor-pointer select-none items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-slate-300",
                    isBusy && "cursor-not-allowed opacity-60",
                  )}
                >
                  <Checkbox
                    id="remember-email"
                    checked={rememberEmail}
                    disabled={isBusy}
                    onCheckedChange={setRememberEmail}
                  />
                  تذكر بريدي الإلكتروني على هذا الجهاز
                </label>

                <Button
                  type="submit"
                  disabled={isBusy}
                  className="group h-14 w-full rounded-2xl bg-gradient-to-l from-blue-800 via-blue-700 to-emerald-500 text-base font-black text-white shadow-[0_16px_36px_rgba(29,95,175,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(29,95,175,0.36)] focus-visible:ring-4 focus-visible:ring-blue-200 disabled:translate-y-0 disabled:opacity-70 dark:focus-visible:ring-blue-950"
                >
                  {loadingAction === "password" ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      جارٍ تسجيل الدخول...
                    </>
                  ) : (
                    <>
                      تسجيل الدخول
                      <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
                    </>
                  )}
                </Button>

                {needsConfirmation && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResendConfirmation}
                    disabled={isBusy}
                    className="h-[3.25rem] w-full rounded-2xl border-blue-200 bg-blue-50/60 font-bold text-blue-700 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:bg-blue-950/55"
                  >
                    {loadingAction === "resend" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        جارٍ إعادة الإرسال...
                      </>
                    ) : (
                      <>
                        <Mail className="size-4" />
                        إعادة إرسال رابط التأكيد
                      </>
                    )}
                  </Button>
                )}

                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-xs font-medium text-slate-400 dark:bg-slate-950">
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
                    className="h-[3.25rem] rounded-2xl border-slate-200 bg-white font-bold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    {loadingAction === "google" ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <GoogleIcon className="size-5" />
                    )}
                    Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOAuthLogin("apple")}
                    disabled={isBusy}
                    className="h-[3.25rem] rounded-2xl border-slate-200 bg-white font-bold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    {loadingAction === "apple" ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <Apple className="size-5" />
                    )}
                    Apple
                  </Button>
                </div>
              </form>

              <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
                ليس لديك حساب؟{" "}
                <Link
                  href="/signup"
                  className="font-black text-blue-700 transition hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  إنشاء حساب جديد
                </Link>
              </p>

              <p className="mt-5 text-center text-[11px] leading-5 text-slate-400 dark:text-slate-500">
                بتسجيل الدخول، أنت توافق على شروط الاستخدام وسياسة الخصوصية
                الخاصة بمنصة تيبان.
              </p>
            </div>
          </div>

          {/* اللوحة التعريفية */}
          <aside className="relative hidden min-h-[720px] overflow-hidden bg-gradient-to-br from-blue-900 via-cyan-800 to-emerald-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute -right-24 -top-24 size-80 rounded-full border border-white/10" />
              <div className="absolute -right-10 -top-10 size-52 rounded-full border border-white/10" />
              <div className="absolute -bottom-28 -left-20 size-96 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute inset-0 opacity-[0.075] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:42px_42px]" />
            </div>

            <div className="relative z-10">
              <AnimatedLogo />

              <div className="mt-7 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur-md">
                  <Sparkles className="size-4 text-emerald-200" />
                  النظام الصحي الذكي المتكامل
                </div>

                <h2 className="text-4xl font-black leading-tight">
                  صحتك أوضح مع
                  <span className="mt-1 block text-emerald-200">تيبان</span>
                </h2>
                <p className="mx-auto mt-4 max-w-md leading-8 text-blue-50/85">
                  منصة عربية تجمع خدماتك الصحية في تجربة واحدة حديثة، سهلة،
                  ومصممة لتكون معك في كل خطوة.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-3">
              {platformHighlights.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-lg transition hover:bg-white/[0.14]"
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15">
                    <Icon className="size-5 text-emerald-200" />
                  </div>
                  <div>
                    <h3 className="font-black">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-blue-50/75">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} تيبان — جميع الحقوق محفوظة
        </p>
      </section>

      <MotionStyles />
    </main>
  );
}
