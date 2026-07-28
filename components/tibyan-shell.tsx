"use client";

import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type SVGProps,
} from "react";

type IconProps = SVGProps<SVGSVGElement>;
type NavigateOptions = { replace?: boolean };
type NavigationContextValue = {
  navigate: (href: string, title?: string, options?: NavigateOptions) => void;
  goBack: () => void;
  isTransitioning: boolean;
};

type Destination = {
  title: string;
  hint: string;
  href: string;
  icon: "lab" | "nutrition" | "pharmacy" | "consultation" | "ai" | "settings";
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];

const AUTH_STORAGE_KEYS = [
  "token",
  "authToken",
  "accessToken",
  "refreshToken",
  "user",
  "session",
  "tibyan-token",
  "tibyan-user",
  "tibyan-session",
];

const destinations: Destination[] = [
  {
    title: "الفحوصات والمختبرات",
    hint: "فحوصات بصرية ذكية ومتابعة النتائج",
    href: "/fahosat",
    icon: "lab",
  },
  {
    title: "التغذية العلاجية",
    hint: "طبيب بشري أو مساعد ذكي",
    href: "/taghthia",
    icon: "nutrition",
  },
  {
    title: "الصيدلية الذكية",
    hint: "البحث عن الأدوية والبدائل",
    href: "/saidalia",
    icon: "pharmacy",
  },
  {
    title: "الاستشارات والمواعيد",
    hint: "استشارة فورية أو حجز موعد",
    href: "/istisharat",
    icon: "consultation",
  },
  {
    title: "مساعد تبيان الذكي",
    hint: "محادثة صحية منظمة",
    href: "/ai",
    icon: "ai",
  },
  {
    title: "الإعدادات",
    hint: "الحساب واللغة والأمان",
    href: "/main/settings",
    icon: "settings",
  },
];

const orbitItems = [
  { label: "السماعة", icon: "⌁", x: "0px", y: "-118px" },
  { label: "الملف", icon: "▤", x: "102px", y: "-59px" },
  { label: "المختبر", icon: "⚗", x: "102px", y: "59px" },
  { label: "الدواء", icon: "◒", x: "0px", y: "118px" },
  { label: "الموعد", icon: "▦", x: "-102px", y: "59px" },
  { label: "التغذية", icon: "◡", x: "-102px", y: "-59px" },
];

function SettingsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 15.25A3.25 3.25 0 1 0 12 8.75a3.25 3.25 0 0 0 0 6.5Z" />
      <path d="M19.1 13.25c.05-.41.05-.84 0-1.25l2-1.55-2-3.45-2.48 1a8.75 8.75 0 0 0-1.08-.63L15.15 4h-4.3l-.4 3.37c-.38.18-.74.39-1.08.63L6.9 7l-2 3.45L6.9 12c-.05.41-.05.84 0 1.25l-2 1.55 2 3.45 2.47-1c.34.24.7.45 1.08.63l.4 3.37h4.3l.39-3.37c.38-.18.74-.39 1.08-.63l2.48 1 2-3.45-2-1.55Z" />
    </svg>
  );
}

function AiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M9 3h6M12 3V1M8 7h8a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4Z" />
      <path d="M8.5 12h.01M15.5 12h.01M9 16h6M2 13H1M23 13h-1" />
    </svg>
  );
}

function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function BackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function LogoutIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...props}>
      <path d="M10 17l5-5-5-5M15 12H3" />
      <path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
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

function ResultIcon({ name }: { name: Destination["icon"] }) {
  const className = "h-5 w-5";
  if (name === "lab") return <LabIcon className={className} />;
  if (name === "nutrition") return <NutritionIcon className={className} />;
  if (name === "pharmacy") return <PharmacyIcon className={className} />;
  if (name === "consultation") return <ConsultationIcon className={className} />;
  if (name === "settings") return <SettingsIcon className={className} />;
  return <AiIcon className={className} />;
}

export function TibyanShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const timers = useRef<number[]>([]);

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTitle, setTransitionTitle] = useState("جاري فتح الصفحة");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (!logoutOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoggingOut) setLogoutOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [logoutOpen, isLoggingOut]);

  const navigate = useCallback(
    (href: string, title = "جاري فتح الصفحة", options: NavigateOptions = {}) => {
      if (!href || isTransitioning || href === pathname) return;

      clearTimers();
      setSearchOpen(false);
      setQuery("");
      setTransitionTitle(title);
      setIsTransitioning(true);
      router.prefetch(href);

      timers.current.push(
        window.setTimeout(() => {
          if (options.replace) router.replace(href);
          else router.push(href);
        }, 980),
      );

      timers.current.push(window.setTimeout(() => setIsTransitioning(false), 1550));
    },
    [clearTimers, isTransitioning, pathname, router],
  );

  const goBack = useCallback(() => {
    if (isTransitioning) return;

    clearTimers();
    setTransitionTitle("العودة إلى الصفحة السابقة");
    setIsTransitioning(true);

    timers.current.push(
      window.setTimeout(() => {
        if (window.history.length > 1) router.back();
        else router.push("/");
      }, 850),
    );

    timers.current.push(window.setTimeout(() => setIsTransitioning(false), 1450));
  }, [clearTimers, isTransitioning, router]);

  const filteredResults = useMemo(() => {
    const normalized = query.trim();
    if (!normalized) return destinations;
    return destinations.filter((item) => `${item.title} ${item.hint}`.includes(normalized));
  }, [query]);

  const completeLogout = useCallback(async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      // attempt to sign out from Supabase auth (if used)
      try {
        await supabase.auth.signOut();
      } catch (err) {
        // don't block logout if signOut fails
        // log for debugging
        // eslint-disable-next-line no-console
        console.warn("supabase signOut failed:", err);
      }

      AUTH_STORAGE_KEYS.forEach((key) => {
        window.localStorage.removeItem(key);
        window.sessionStorage.removeItem(key);
      });

      ["token", "authToken", "session", "tibyan-token"].forEach((cookieName) => {
        document.cookie = `${cookieName}=; Max-Age=0; path=/; SameSite=Lax`;
      });

      await new Promise((resolve) => window.setTimeout(resolve, 650));
      setLogoutOpen(false);
      setIsLoggingOut(false);
      navigate("/login", "تم تسجيل الخروج بنجاح", { replace: true });
    } catch {
      setIsLoggingOut(false);
      setLogoutOpen(false);
      navigate("/login", "العودة إلى تسجيل الدخول", { replace: true });
    }
  }, [isLoggingOut, navigate]);

  const navigationValue = useMemo(
    () => ({ navigate, goBack, isTransitioning }),
    [goBack, isTransitioning, navigate],
  );

  if (isAuthRoute) {
    return <NavigationContext.Provider value={navigationValue}>{children}</NavigationContext.Provider>;
  }

  return (
    <NavigationContext.Provider value={navigationValue}>
      <div dir="rtl" className="min-h-screen bg-[#f7fcff] text-[#073b72]">
        <header className="tibyan-topbar sticky top-0 z-50 border-b border-[#0a86c7]/10 bg-white/85 backdrop-blur-2xl">
          <div className="tibyan-topbar-inner mx-auto grid max-w-7xl grid-cols-[auto_minmax(220px,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => navigate("/", "الصفحة الرئيسية")}
              className="group flex shrink-0 items-center gap-2 rounded-2xl p-1.5 transition hover:bg-[#eafaff] focus:outline-none focus:ring-4 focus:ring-[#10b9bd]/20"
              aria-label="العودة إلى الصفحة الرئيسية"
            >
              <span className="relative h-11 w-11 overflow-hidden rounded-2xl bg-white shadow-[0_8px_25px_rgba(4,83,145,0.15)] ring-1 ring-[#0a86c7]/10">
                <Image
                  src="/logo.png"
                  alt="شعار تبيان"
                  fill
                  priority
                  sizes="44px"
                  className="object-contain transition duration-500 group-hover:scale-110 group-hover:rotate-3"
                />
              </span>
              <span className="hidden text-right lg:block">
                <span className="block text-base font-black leading-none text-[#075dab]">تبيان</span>
                <span className="mt-1 block text-[10px] font-bold text-[#12a8a9]">طبٌ بهندسةٍ أذكى</span>
              </span>
            </button>

            <div className="tibyan-search relative mx-auto w-full max-w-xl">
              <SearchIcon className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0b8bb9]" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => window.setTimeout(() => setSearchOpen(false), 160)}
                placeholder="ابحث عن فحص، دواء، تغذية أو استشارة..."
                className="h-12 w-full rounded-2xl border border-[#0a86c7]/15 bg-[#f7fcff]/90 pr-12 pl-4 text-sm font-semibold text-[#073b72] outline-none transition placeholder:text-[#6e9bb8] focus:border-[#12b7bd] focus:bg-white focus:shadow-[0_0_0_5px_rgba(18,183,189,0.10)]"
                aria-label="البحث داخل تبيان"
              />

              {searchOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-[60] max-h-[360px] overflow-y-auto rounded-2xl border border-[#0a86c7]/10 bg-white p-2 shadow-[0_24px_70px_rgba(4,67,122,0.18)]">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <button
                        key={item.href}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => navigate(item.href, item.title)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right transition hover:bg-[#ecfbfb]"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0876d9] to-[#10b5b5] text-white">
                          <ResultIcon name={item.icon} />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-black text-[#075dab]">{item.title}</span>
                          <span className="mt-0.5 block truncate text-xs text-[#6b91a8]">{item.hint}</span>
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="px-4 py-5 text-center text-sm font-semibold text-[#6b91a8]">
                      لم نعثر على خدمة بهذا الاسم.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="tibyan-top-actions flex shrink-0 items-center gap-2">
              {pathname !== "/" && (
                <button
                  type="button"
                  onClick={goBack}
                  className="tibyan-action-button group grid h-11 w-11 place-items-center rounded-2xl border border-[#0a86c7]/15 bg-white text-[#0876d9] shadow-sm transition hover:-translate-y-0.5 hover:border-[#12b7bd] hover:bg-[#effcfc] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#12b7bd]/15"
                  aria-label="الرجوع إلى الصفحة السابقة"
                  title="رجوع"
                >
                  <BackIcon className="h-5 w-5 transition group-hover:translate-x-0.5" />
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate("/ai", "المساعد الذكي")}
                className="ai-button group relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#0876d9] via-[#0a9cd1] to-[#12b7bd] text-white shadow-[0_12px_30px_rgba(8,118,217,0.28)] focus:outline-none focus:ring-4 focus:ring-[#0876d9]/20"
                aria-label="فتح المساعد الذكي"
                title="المساعد الذكي"
              >
                <span className="absolute inset-0 rounded-2xl border border-white/35" />
                <AiIcon className="relative h-6 w-6 transition duration-500 group-hover:rotate-12 group-hover:scale-110" />
                <span className="absolute -left-1 -top-1 h-3 w-3 rounded-full bg-[#42d66f] ring-4 ring-white" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/main/settings", "الإعدادات")}
                className="tibyan-action-button group grid h-11 w-11 place-items-center rounded-2xl border border-[#0a86c7]/15 bg-white text-[#0876d9] shadow-sm transition hover:-translate-y-0.5 hover:border-[#12b7bd] hover:bg-[#effcfc] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#12b7bd]/15"
                aria-label="فتح الإعدادات"
                title="الإعدادات"
              >
                <SettingsIcon className="h-6 w-6 transition duration-700 group-hover:rotate-90" />
              </button>

              <button
                type="button"
                onClick={() => setLogoutOpen(true)}
                className="tibyan-logout-button group inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#ef4444]/20 bg-[#fff7f7] px-3 text-[#d93645] shadow-sm transition hover:-translate-y-0.5 hover:border-[#ef4444]/35 hover:bg-[#fff0f0] hover:shadow-[0_12px_28px_rgba(217,54,69,0.14)] focus:outline-none focus:ring-4 focus:ring-[#ef4444]/10"
                aria-label="تسجيل الخروج من الحساب"
                title="تسجيل الخروج"
              >
                <LogoutIcon className="h-5 w-5 transition duration-300 group-hover:-translate-x-0.5" />
                <span className="hidden text-xs font-black xl:inline">خروج</span>
              </button>
            </div>
          </div>
        </header>

        {children}
      </div>

      {logoutOpen && (
        <div
          className="tibyan-logout-backdrop fixed inset-0 z-[120] grid place-items-center bg-[#032f57]/45 px-4 backdrop-blur-md"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isLoggingOut) setLogoutOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            aria-describedby="logout-description"
            className="tibyan-logout-dialog relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/80 bg-white p-6 shadow-[0_35px_110px_rgba(1,35,67,0.32)] sm:p-7"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#0876d9]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#38c96f]/10 blur-3xl" />

            <button
              type="button"
              onClick={() => setLogoutOpen(false)}
              disabled={isLoggingOut}
              className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-xl border border-[#0a86c7]/10 bg-white text-[#6b91a8] transition hover:bg-[#effcfc] hover:text-[#0876d9] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="إغلاق نافذة تسجيل الخروج"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            <div className="relative">
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[1.4rem] bg-gradient-to-br from-[#ffefef] to-[#fff8f3] text-[#d93645] shadow-[0_14px_34px_rgba(217,54,69,0.16)] ring-1 ring-[#ef4444]/15">
                  <LogoutIcon className="h-8 w-8" />
                </span>
                <div>
                  <p className="text-xs font-black text-[#0aa3a7]">أمان الحساب</p>
                  <h2 id="logout-title" className="mt-1 text-2xl font-black text-[#064c91]">
                    تسجيل الخروج؟
                  </h2>
                </div>
              </div>

              <p id="logout-description" className="mt-5 text-sm font-semibold leading-7 text-[#5f8399]">
                سيتم إنهاء الجلسة الحالية والعودة إلى صفحة تسجيل الدخول. لن تُحذف بيانات حسابك أو إعدادات المظهر واللغة.
              </p>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setLogoutOpen(false)}
                  disabled={isLoggingOut}
                  className="min-h-12 flex-1 rounded-2xl border border-[#0a86c7]/15 bg-white px-5 text-sm font-black text-[#0876d9] transition hover:-translate-y-0.5 hover:bg-[#effcfc] disabled:cursor-not-allowed disabled:opacity-55"
                >
                  البقاء في الحساب
                </button>

                <button
                  type="button"
                  onClick={completeLogout}
                  disabled={isLoggingOut}
                  autoFocus
                  className="min-h-12 flex-1 rounded-2xl bg-gradient-to-l from-[#d93645] to-[#f05d55] px-5 text-sm font-black text-white shadow-[0_14px_32px_rgba(217,54,69,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(217,54,69,0.32)] disabled:cursor-wait disabled:opacity-75"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    {isLoggingOut ? (
                      <>
                        <span className="tibyan-logout-spinner h-4 w-4 rounded-full border-2 border-white/40 border-t-white" />
                        جارٍ تسجيل الخروج...
                      </>
                    ) : (
                      <>
                        <LogoutIcon className="h-5 w-5" />
                        نعم، تسجيل الخروج
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {isTransitioning && (
        <div className="transition-screen fixed inset-0 z-[110] grid place-items-center overflow-hidden bg-[rgba(247,252,255,0.94)] px-4 backdrop-blur-2xl">
          <div className="transition-grid absolute inset-0 opacity-70" />
          <div className="relative grid h-[320px] w-[320px] place-items-center sm:h-[390px] sm:w-[390px]">
            <div className="transition-ring absolute inset-5 rounded-full border border-dashed border-[#0876d9]/30" />
            <div className="transition-ring reverse absolute inset-12 rounded-full border border-[#12b7bd]/25" />

            {orbitItems.map((item, index) => (
              <div
                key={item.label}
                title={item.label}
                style={
                  {
                    "--x": item.x,
                    "--y": item.y,
                    "--delay": `${index * 70}ms`,
                  } as CSSProperties
                }
                className="transition-orbit absolute grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0876d9] to-[#19b7ae] text-xl font-black text-white shadow-[0_12px_30px_rgba(8,118,217,0.28)] sm:h-14 sm:w-14"
              >
                {item.icon}
              </div>
            ))}

            <div className="transition-logo relative z-10 h-36 w-36 overflow-hidden rounded-[2.2rem] bg-white p-1 shadow-[0_30px_70px_rgba(4,75,132,0.28)] ring-1 ring-[#0a86c7]/10 sm:h-44 sm:w-44">
              <Image
                src="/logo.png"
                alt="شعار تبيان أثناء الانتقال"
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="absolute bottom-[14%] text-center">
            <p className="text-lg font-black text-[#075dab]">{transitionTitle}</p>
            <div className="mx-auto mt-3 h-1.5 w-40 overflow-hidden rounded-full bg-[#0a86c7]/10">
              <span className="loading-line block h-full rounded-full bg-gradient-to-l from-[#0876d9] via-[#12b7bd] to-[#38c96f]" />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .tibyan-topbar {
          box-shadow: 0 12px 40px rgba(4, 74, 126, 0.06);
        }

        .tibyan-logout-backdrop {
          animation: tibyanBackdropIn 0.22s ease-out both;
        }

        .tibyan-logout-dialog {
          animation: tibyanDialogIn 0.34s cubic-bezier(.2,.85,.25,1.15) both;
        }

        .tibyan-logout-spinner {
          animation: tibyanSpinner 0.7s linear infinite;
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

        .transition-grid {
          background-image:
            linear-gradient(rgba(8, 118, 217, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8, 118, 217, 0.045) 1px, transparent 1px);
          background-size: 42px 42px;
          animation: gridMove 18s linear infinite;
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

        @keyframes tibyanBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes tibyanDialogIn {
          from { opacity: 0; transform: translateY(24px) scale(.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes tibyanSpinner {
          to { transform: rotate(360deg); }
        }

        @keyframes aiPulse {
          0% { transform: scale(.9); opacity: .85; }
          100% { transform: scale(1.28); opacity: 0; }
        }

        @keyframes gridMove {
          to { background-position: 42px 42px; }
        }

        @keyframes screenIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fastSpin {
          to { transform: rotate(360deg); }
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

        @media (max-width: 760px) {
          .tibyan-topbar-inner {
            grid-template-columns: auto 1fr;
          }

          .tibyan-top-actions {
            justify-self: end;
          }

          .tibyan-search {
            grid-column: 1 / -1;
            grid-row: 2;
            max-width: none;
          }

          .tibyan-logout-button {
            width: 44px;
            padding-inline: 0;
          }
        }

        @media (max-width: 420px) {
          .tibyan-topbar-inner {
            gap: 8px;
            padding-inline: 10px;
          }

          .tibyan-top-actions {
            gap: 5px;
          }

          .tibyan-action-button,
          .tibyan-logout-button,
          .ai-button {
            width: 40px;
            height: 40px;
            border-radius: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tibyan-logout-backdrop,
          .tibyan-logout-dialog,
          .tibyan-logout-spinner,
          .transition-screen,
          .transition-logo,
          .transition-orbit,
          .transition-ring,
          .loading-line,
          .ai-button::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </NavigationContext.Provider>
  );
}

export function useTibyanNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useTibyanNavigation must be used inside TibyanShell");
  }
  return context;
}
