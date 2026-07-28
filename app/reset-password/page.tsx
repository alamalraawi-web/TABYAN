"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";

function getUpdateError(error: unknown): string {
  if (!(error instanceof Error)) {
    return "تعذر تحديث كلمة المرور حالياً. حاول مرة أخرى.";
  }

  const message = error.message.toLowerCase();

  if (message.includes("same password")) {
    return "اختر كلمة مرور مختلفة عن كلمة المرور السابقة.";
  }

  if (message.includes("weak") || message.includes("password should")) {
    return "كلمة المرور لا تحقق متطلبات الأمان المطلوبة.";
  }

  if (message.includes("session") || message.includes("expired")) {
    return "انتهت صلاحية رابط الاستعادة. اطلب رابطاً جديداً.";
  }

  if (message.includes("fetch") || message.includes("network")) {
    return "تعذر الاتصال بالخادم. تحقق من الإنترنت ثم أعد المحاولة.";
  }

  return "تعذر تحديث كلمة المرور حالياً. حاول مرة أخرى.";
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkRecoverySession = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (sessionError || !session) {
        setError("رابط الاستعادة غير صالح أو انتهت صلاحيته. اطلب رابطاً جديداً.");
      }

      setIsCheckingSession(false);
    };

    void checkRecoverySession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    setIsLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) throw updateError;

      await supabase.auth.signOut();
      setIsCompleted(true);
      setPassword("");
      setConfirmPassword("");
    } catch (updateError: unknown) {
      setError(getUpdateError(updateError));
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
        <div className="absolute -right-32 -top-36 size-[30rem] rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-700/15" />
        <div className="absolute -bottom-40 -left-24 size-[30rem] rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-700/15" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#0f4c81_1px,transparent_1px),linear-gradient(to_bottom,#0f4c81_1px,transparent_1px)] [background-size:42px_42px] dark:opacity-[0.06]" />
      </div>

      <section className="relative z-10 w-full max-w-lg rounded-[2rem] border border-white/80 bg-white/[0.86] p-6 shadow-[0_30px_100px_rgba(15,58,105,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/[0.82] dark:shadow-[0_30px_100px_rgba(0,0,0,0.4)] sm:p-10">
        <div className="mb-7 text-center">
          <div className="reset-logo-float mx-auto flex h-24 w-48 items-center justify-center rounded-[1.6rem] border border-white/80 bg-white/90 px-6 shadow-xl dark:border-white/10 dark:bg-slate-900/90">
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
            حماية حساب تيبان
          </div>

          <h1 className="mt-4 text-3xl font-black text-slate-950 dark:text-white">
            إنشاء كلمة مرور جديدة
          </h1>
          <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500 dark:text-slate-400">
            استخدم كلمة مرور قوية لا تقل عن 8 أحرف ولا تشاركها مع أي شخص.
          </p>
        </div>

        {isCheckingSession ? (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <Loader2 className="size-5 animate-spin text-blue-700 dark:text-blue-400" />
            جارٍ التحقق من رابط الاستعادة...
          </div>
        ) : isCompleted ? (
          <div className="text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
              <CheckCircle2 className="size-8" />
            </div>
            <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
              تم تحديث كلمة المرور
            </h2>
            <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">
              يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.
            </p>
            <Button
              asChild
              className="mt-6 h-14 w-full rounded-2xl bg-gradient-to-l from-blue-800 via-blue-700 to-emerald-500 text-base font-black text-white"
            >
              <Link href="/login">الانتقال إلى تسجيل الدخول</Link>
            </Button>
          </div>
        ) : (
          <>
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800 dark:border-red-900/60 dark:bg-red-950/35 dark:text-red-200"
              >
                <AlertCircle className="mt-0.5 size-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {!error?.includes("غير صالح") && !error?.includes("انتهت صلاحيته") ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="block text-sm font-bold text-slate-700 dark:text-slate-200"
                  >
                    كلمة المرور الجديدة
                  </Label>
                  <div className="group relative">
                    <LockKeyhole className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-700 dark:group-focus-within:text-blue-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      dir="ltr"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setError(null);
                      }}
                      disabled={isLoading}
                      minLength={8}
                      required
                      className="h-14 rounded-2xl border-slate-200 bg-white px-12 text-left text-base shadow-sm focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus-visible:ring-blue-950"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      disabled={isLoading}
                      aria-label={
                        showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                      }
                      className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="block text-sm font-bold text-slate-700 dark:text-slate-200"
                  >
                    تأكيد كلمة المرور
                  </Label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      dir="ltr"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setError(null);
                      }}
                      disabled={isLoading}
                      minLength={8}
                      required
                      className="h-14 rounded-2xl border-slate-200 bg-white px-12 text-left text-base shadow-sm focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus-visible:ring-blue-950"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-14 w-full rounded-2xl bg-gradient-to-l from-blue-800 via-blue-700 to-emerald-500 text-base font-black text-white shadow-[0_16px_36px_rgba(29,95,175,0.28)] hover:-translate-y-0.5 disabled:translate-y-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      جارٍ تحديث كلمة المرور...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="size-5" />
                      حفظ كلمة المرور الجديدة
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <Button asChild variant="outline" className="h-14 w-full rounded-2xl">
                  <Link href="/forgot-password">طلب رابط استعادة جديد</Link>
                </Button>
              </div>
            )}
          </>
        )}

        {!isCompleted && (
          <div className="mt-7 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-black text-blue-700 hover:underline dark:text-blue-400"
            >
              <ArrowRight className="size-4" />
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        )}
      </section>

      <style jsx global>{`
        @keyframes resetLogoFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .reset-logo-float {
          animation: resetLogoFloat 5.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .reset-logo-float {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
