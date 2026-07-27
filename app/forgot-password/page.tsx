"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CircleCheck,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";

type Notice = {
  type: "error" | "success";
  text: string;
};

function getResetError(error: unknown): string {
  if (!(error instanceof Error)) {
    return "تعذر إرسال رابط الاستعادة حالياً. حاول مرة أخرى.";
  }

  const message = error.message.toLowerCase();

  if (message.includes("rate limit") || message.includes("too many requests")) {
    return "تم إرسال طلبات كثيرة خلال وقت قصير. حاول مجدداً بعد قليل.";
  }

  if (message.includes("fetch") || message.includes("network")) {
    return "تعذر الاتصال بالخادم. تحقق من الإنترنت ثم أعد المحاولة.";
  }

  return "تعذر إرسال رابط الاستعادة حالياً. حاول مرة أخرى.";
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setNotice({
        type: "error",
        text: "أدخل البريد الإلكتروني المرتبط بحسابك.",
      });
      return;
    }

    setIsLoading(true);
    setNotice(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        normalizedEmail,
        {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        },
      );

      if (error) throw error;

      setNotice({
        type: "success",
        text: "أرسلنا رابط استعادة كلمة المرور. تحقق من صندوق الوارد والبريد غير المرغوب فيه.",
      });
    } catch (error: unknown) {
      setNotice({
        type: "error",
        text: getResetError(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f4f9ff_0%,#ffffff_48%,#effcf8_100%)] px-4 py-8 dark:bg-[linear-gradient(135deg,#07111f_0%,#0b1322_48%,#071a18_100%)]"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="auth-blob-one absolute -right-32 -top-36 size-[30rem] rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-700/15" />
        <div className="auth-blob-two absolute -bottom-40 -left-24 size-[30rem] rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-700/15" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#0f4c81_1px,transparent_1px),linear-gradient(to_bottom,#0f4c81_1px,transparent_1px)] [background-size:42px_42px] dark:opacity-[0.06]" />
      </div>

      <section className="relative z-10 w-full max-w-lg rounded-[2rem] border border-white/80 bg-white/[0.86] p-6 shadow-[0_30px_100px_rgba(15,58,105,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/[0.82] dark:shadow-[0_30px_100px_rgba(0,0,0,0.4)] sm:p-10">
        <div className="mb-7 text-center">
          <div className="auth-logo-float mx-auto flex h-24 w-48 items-center justify-center rounded-[1.6rem] border border-white/80 bg-white/90 px-6 shadow-xl dark:border-white/10 dark:bg-slate-900/90">
            <Image
              src="/logo.png"
              alt="شعار تيبان"
              width={260}
              height={130}
              priority
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
            <ShieldCheck className="size-4" />
            استعادة آمنة للحساب
          </div>

          <h1 className="mt-4 text-3xl font-black text-slate-950 dark:text-white">
            نسيت كلمة المرور؟
          </h1>
          <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500 dark:text-slate-400">
            أدخل بريدك الإلكتروني وسنرسل لك رابطاً آمناً لإنشاء كلمة مرور
            جديدة.
          </p>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {notice && (
            <div
              role={notice.type === "error" ? "alert" : "status"}
              className={`mb-5 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6 ${
                notice.type === "error"
                  ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900/60 dark:bg-red-950/35 dark:text-red-200"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/35 dark:text-emerald-200"
              }`}
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
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setNotice(null);
                }}
                disabled={isLoading}
                required
                className="h-14 rounded-2xl border-slate-200 bg-white pl-4 pr-12 text-left text-base shadow-sm focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus-visible:ring-blue-950"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-14 w-full rounded-2xl bg-gradient-to-l from-blue-800 via-blue-700 to-emerald-500 text-base font-black text-white shadow-[0_16px_36px_rgba(29,95,175,0.28)] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(29,95,175,0.36)] disabled:translate-y-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                جارٍ إرسال الرابط...
              </>
            ) : (
              <>
                <Mail className="size-5" />
                إرسال رابط الاستعادة
              </>
            )}
          </Button>
        </form>

        <div className="mt-7 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowRight className="size-4" />
            العودة إلى تسجيل الدخول
          </Link>
        </div>
      </section>

      <style jsx global>{`
        @keyframes authLogoFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes authBlobOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-24px, 18px, 0) scale(1.06);
          }
        }

        @keyframes authBlobTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(22px, -18px, 0) scale(1.07);
          }
        }

        .auth-logo-float {
          animation: authLogoFloat 5.5s ease-in-out infinite;
        }

        .auth-blob-one {
          animation: authBlobOne 13s ease-in-out infinite;
        }

        .auth-blob-two {
          animation: authBlobTwo 15s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .auth-logo-float,
          .auth-blob-one,
          .auth-blob-two {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
