"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

function getSafeNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const completeAuthentication = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      const nextPath = getSafeNextPath(searchParams.get("next"));

      try {
        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) throw exchangeError;
        }

        let {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (!session && !sessionError) {
          // يمنح Supabase وقتاً قصيراً لمعالجة رابط OAuth ذي الـ hash عند الحاجة.
          await new Promise((resolve) => window.setTimeout(resolve, 450));

          const secondCheck = await supabase.auth.getSession();
          session = secondCheck.data.session;
          sessionError = secondCheck.error;
        }

        if (sessionError || !session) {
          throw sessionError ?? new Error("No authentication session found");
        }

        if (!isMounted) return;

        router.replace(nextPath);
        router.refresh();
      } catch {
        if (!isMounted) return;

        setError(
          "تعذر إكمال عملية تسجيل الدخول أو الاستعادة. أعد المحاولة من صفحة الدخول.",
        );
      }
    };

    void completeAuthentication();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <main
      dir="rtl"
      className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-[linear-gradient(135deg,#f4f9ff_0%,#ffffff_48%,#effcf8_100%)] px-4 dark:bg-[linear-gradient(135deg,#07111f_0%,#0b1322_48%,#071a18_100%)]"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-28 -top-32 size-[28rem] rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-700/15" />
        <div className="absolute -bottom-40 -left-24 size-[30rem] rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-700/15" />
      </div>

      <section className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/80 bg-white/[0.86] p-8 text-center shadow-[0_30px_100px_rgba(15,58,105,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/[0.82] sm:p-10">
        <div className="callback-logo-float mx-auto flex h-24 w-48 items-center justify-center rounded-[1.6rem] border border-white/80 bg-white/90 px-6 shadow-xl dark:border-white/10 dark:bg-slate-900/90">
          <Image
            src="/logo.png"
            alt="شعار تيبان"
            width={260}
            height={130}
            priority
            className="h-auto w-full object-contain"
          />
        </div>

        {error ? (
          <>
            <div className="mx-auto mt-7 grid size-14 place-items-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300">
              <AlertCircle className="size-7" />
            </div>
            <h1 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">
              لم تكتمل العملية
            </h1>
            <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">
              {error}
            </p>
            <Button asChild className="mt-6 h-[3.25rem] w-full rounded-2xl">
              <Link href="/login">العودة إلى تسجيل الدخول</Link>
            </Button>
          </>
        ) : (
          <>
            <Loader2 className="mx-auto mt-7 size-8 animate-spin text-blue-700 dark:text-blue-400" />
            <h1 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">
              جارٍ إكمال العملية
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
              يتم الآن التحقق من بيانات المصادقة وتحويلك إلى الوجهة الصحيحة.
            </p>
          </>
        )}
      </section>

      <style jsx global>{`
        @keyframes callbackLogoFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .callback-logo-float {
          animation: callbackLogoFloat 5.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .callback-logo-float {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
