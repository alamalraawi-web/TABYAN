"use client";

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

const AUTH_ROUTES = ["/login", "/signup", "/register", "/forgot-password", "/reset-password"];

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



function TibyanLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="70 180 520 520"
      role="img"
      aria-labelledby="tibyan-logo-title tibyan-logo-description"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="tibyan-logo-title">شعار مشروع تبيان الطبي</title>
      <desc id="tibyan-logo-description">
        شعار طبي يجمع الصليب ونبض القلب والإنسان والورقة الصحية.
      </desc>

      <defs>
        <linearGradient
          id="tibyan-main-gradient"
          x1="330"
          y1="205"
          x2="230"
          y2="650"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#16c9ca" />
          <stop offset="0.24" stopColor="#0796d7" />
          <stop offset="0.58" stopColor="#0874d6" />
          <stop offset="1" stopColor="#073fbd" />
        </linearGradient>

        <linearGradient
          id="tibyan-blue-swoosh"
          x1="520"
          y1="290"
          x2="400"
          y2="555"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0876df" />
          <stop offset="0.52" stopColor="#075dca" />
          <stop offset="1" stopColor="#0879d6" />
        </linearGradient>

        <linearGradient
          id="tibyan-green-gradient"
          x1="525"
          y1="330"
          x2="300"
          y2="645"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#49d78b" />
          <stop offset="0.48" stopColor="#27c79b" />
          <stop offset="1" stopColor="#00a9b5" />
        </linearGradient>

        <linearGradient
          id="tibyan-main-shine"
          x1="258"
          y1="205"
          x2="330"
          y2="405"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#62e8e4" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <radialGradient
          id="tibyan-head-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(383 291) rotate(52) scale(65)"
        >
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.72" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef7fb" />
        </radialGradient>

        <filter
          id="tibyan-logo-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="175%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="12"
            floodColor="#075c9e"
            floodOpacity="0.18"
          />
        </filter>

        <filter
          id="tibyan-pulse-glow"
          x="-30%"
          y="-60%"
          width="160%"
          height="220%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="2" result="pulseBlur" />
          <feMerge>
            <feMergeNode in="pulseBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#tibyan-logo-shadow)">
        <path
          d="M398 205
             L319 201 L267 201
             C250 201 238 208 228 222
             C224 229 226 249 226 326
             L124 326
             C104 326 87 343 87 364
             L87 495
             C87 517 104 534 125 534
             L226 536
             L226 616
             C207 632 195 645 190 667
             C222 638 253 626 276 614
             C321 591 344 559 352 512
             C356 479 343 430 316 380
             C308 365 301 354 298 344
             C324 360 346 368 373 368
             C400 368 417 356 424 337
             C430 320 422 296 422 270
             L422 240
             C422 219 412 205 398 205
             Z

             M382 273
             C405 273 423 289 423 309
             C423 330 405 345 388 345
             C368 345 354 330 354 309
             C354 288 369 273 382 273
             Z"
          fill="url(#tibyan-main-gradient)"
          fillRule="evenodd"
          clipRule="evenodd"
        />

        <path
          d="M398 205
             L319 201 L267 201
             C246 201 228 218 228 239
             L228 326
             C278 324 327 333 365 355
             C391 369 418 353 424 331
             C429 309 422 287 422 240
             C422 219 412 205 398 205Z"
          fill="url(#tibyan-main-shine)"
        />

        <path
          className="tibyan-header-heartbeat"
          d="M87 436
             H178
             L195 410
             L222 492
             L250 366
             L276 470
             L289 436
             H339"
          fill="none"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#tibyan-pulse-glow)"
        />

        <circle cx="388" cy="309" r="36" fill="url(#tibyan-head-gradient)" />

        <path
          className="tibyan-header-blue-arc"
          d="M535 287
             C503 319 470 352 445 380
             C424 404 409 427 400 456
             C390 490 394 526 410 558
             C403 526 408 491 419 458
             C433 420 463 385 501 344
             Z"
          fill="url(#tibyan-blue-swoosh)"
        />

        <path
          className="tibyan-header-leaf"
          d="M529 333
             C515 350 507 362 502 369
             C481 397 461 419 448 437
             C432 458 423 482 421 508
             C420 524 421 539 424 551
             C441 539 459 520 470 508
             C485 491 495 470 501 453
             C505 442 507 442 505 453
             C501 476 489 505 470 529
             C452 551 431 570 406 584
             C370 604 322 620 271 638
             L271 644
             C339 634 395 619 441 602
             C485 585 519 558 540 527
             C560 497 566 463 562 428
             C560 390 547 355 529 333
             Z"
          fill="url(#tibyan-green-gradient)"
        />

        <path
          d="M505 448
             C494 478 478 506 456 531
             C444 544 433 553 424 558"
          fill="none"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <path
          d="M284 639
             C333 627 373 613 407 596"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.34"
        />
      </g>
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

  return (
    <NavigationContext.Provider value={navigationValue}>
      <div dir="rtl" className="min-h-screen bg-[#f7fcff] text-[#073b72]">
        {!isAuthRoute && (
          <div className="tibyan-header-wrap sticky z-50">
          <header className="tibyan-topbar">
            <div className="tibyan-topbar-inner">
              <button
                type="button"
                onClick={() => navigate("/", "الصفحة الرئيسية")}
                className="tibyan-brand-button"
                aria-label="العودة إلى الصفحة الرئيسية"
              >
                <span className="tibyan-brand-logo">
                  <TibyanLogo className="h-full w-full overflow-visible" />
                </span>

                <span className="tibyan-brand-copy">
                  <strong className="tibyan-brand-name">تبيان</strong>
                  <span className="tibyan-brand-tagline">صحتك أوضح بذكاء</span>
                </span>
              </button>

              {isAuthRoute ? (
                <div className="tibyan-auth-area">
                  <span className="tibyan-auth-title">
                    {pathname === "/signup"
                      ? "إنشاء حساب"
                      : pathname === "/forgot-password"
                        ? "استعادة الحساب"
                        : pathname === "/reset-password"
                          ? "إعادة تعيين كلمة المرور"
                          : "تسجيل الدخول"}
                  </span>

                  <button
                    type="button"
                    onClick={() => navigate("/", "الصفحة الرئيسية")}
                    className="tibyan-action-button"
                    aria-label="العودة إلى الصفحة الرئيسية"
                    title="الرئيسية"
                  >
                    <BackIcon className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="tibyan-top-actions">
                  {pathname !== "/" && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="tibyan-action-button"
                      aria-label="الرجوع إلى الصفحة السابقة"
                      title="رجوع"
                    >
                      <BackIcon className="h-5 w-5" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => navigate("/ai", "المساعد الذكي")}
                    className="ai-button tibyan-ai-button"
                    aria-label="فتح المساعد الذكي"
                    title="المساعد الذكي"
                  >
                    <AiIcon className="relative h-6 w-6" />
                    <span className="tibyan-online-dot" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/main/settings", "الإعدادات")}
                    className="tibyan-action-button"
                    aria-label="فتح الإعدادات"
                    title="الإعدادات"
                  >
                    <SettingsIcon className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setLogoutOpen(true)}
                    className="tibyan-logout-button"
                    aria-label="تسجيل الخروج من الحساب"
                    title="تسجيل الخروج"
                  >
                    <LogoutIcon className="h-5 w-5" />
                    <span>خروج</span>
                  </button>
                </div>
              )}
            </div>
          </header>

          {!isAuthRoute && pathname !== "/" && (
            <div className="tibyan-search-shell">
              <div className="tibyan-search">
                <SearchIcon className="tibyan-search-icon" />

                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => window.setTimeout(() => setSearchOpen(false), 160)}
                  placeholder="ابحث عن فحص، دواء، تغذية أو استشارة..."
                  aria-label="البحث داخل تبيان"
                />

                {searchOpen && (
                  <div className="tibyan-search-results">
                    {filteredResults.length > 0 ? (
                      filteredResults.map((item) => (
                        <button
                          key={item.href}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => navigate(item.href, item.title)}
                          className="tibyan-search-result"
                        >
                          <span className="tibyan-result-icon">
                            <ResultIcon name={item.icon} />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-black text-[#075dab]">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-[#6b91a8]">
                              {item.hint}
                            </span>
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
            </div>
          )}
          </div>
        )}

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

            <div className="transition-logo transition-logo-transparent relative z-10 h-40 w-40 sm:h-52 sm:w-52">
              <TibyanLogo className="h-full w-full overflow-visible" />
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

        .tibyan-brand-logo {
          animation: tibyanHeaderLogoFloat 4.6s ease-in-out infinite;
          transform-origin: 50% 55%;
        }

        .tibyan-header-heartbeat {
          stroke-dasharray: 390;
          stroke-dashoffset: 390;
          animation: tibyanHeaderHeartbeat 4.2s ease-in-out infinite;
        }

        .tibyan-header-leaf {
          transform-box: fill-box;
          transform-origin: 48% 82%;
          animation: tibyanHeaderLeafBreath 4.8s ease-in-out infinite;
        }

        .tibyan-header-blue-arc {
          transform-box: fill-box;
          transform-origin: 50% 85%;
          animation: tibyanHeaderArcBreath 4.8s ease-in-out infinite;
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

        .transition-logo-transparent {
          background: transparent !important;
          border: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          overflow: visible !important;
          filter: drop-shadow(0 24px 34px rgba(4, 75, 132, 0.22));
          transform-origin: 50% 55%;
        }

        .transition-logo-transparent .tibyan-header-heartbeat {
          stroke-dasharray: 390;
          stroke-dashoffset: 390;
          animation: transitionHeartbeat 1.15s ease-in-out both;
        }

        .transition-logo-transparent .tibyan-header-leaf {
          transform-box: fill-box;
          transform-origin: 48% 82%;
          animation: transitionLeaf 1.15s cubic-bezier(.2,.85,.25,1) both;
        }

        .transition-logo-transparent .tibyan-header-blue-arc {
          transform-box: fill-box;
          transform-origin: 50% 85%;
          animation: transitionArc 1.15s cubic-bezier(.2,.85,.25,1) both;
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

        @keyframes tibyanHeaderLogoFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(.6deg); }
        }

        @keyframes tibyanHeaderHeartbeat {
          0%, 14% { stroke-dashoffset: 390; opacity: .4; }
          44%, 78% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -390; opacity: .4; }
        }

        @keyframes tibyanHeaderLeafBreath {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(1deg) scale(1.014); }
        }

        @keyframes tibyanHeaderArcBreath {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-.7deg) scale(1.01); }
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
          0% {
            opacity: 0;
            transform: scale(.34) rotate(-22deg);
            filter: blur(12px) drop-shadow(0 0 0 rgba(4,75,132,0));
          }
          38% {
            opacity: 1;
            transform: scale(1.12) rotate(4deg);
            filter: blur(0) drop-shadow(0 26px 38px rgba(4,75,132,.24));
          }
          72% {
            transform: scale(.96) rotate(-2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0) drop-shadow(0 22px 32px rgba(4,75,132,.20));
          }
        }

        @keyframes transitionHeartbeat {
          0%, 12% { stroke-dashoffset: 390; opacity: .28; }
          55%, 82% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -390; opacity: .45; }
        }

        @keyframes transitionLeaf {
          0% { opacity: 0; transform: translateY(18px) rotate(8deg) scale(.72); }
          50% { opacity: 1; transform: translateY(-3px) rotate(-2deg) scale(1.06); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
        }

        @keyframes transitionArc {
          0% { opacity: 0; transform: translateX(20px) rotate(-7deg) scale(.74); }
          52% { opacity: 1; transform: translateX(-3px) rotate(2deg) scale(1.04); }
          100% { opacity: 1; transform: translateX(0) rotate(0deg) scale(1); }
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


        /* الشريط العلوي الموحد لجميع صفحات تبيان */
        .tibyan-topbar {
          top: 8px;
          width: calc(100% - 24px);
          max-width: 1500px;
          margin: 8px auto 0;
          border: 1px solid rgba(7, 92, 145, 0.11);
          border-radius: 26px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 18px 45px rgba(3, 66, 112, 0.13);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          overflow: visible;
        }

        .tibyan-topbar-inner {
          min-height: 78px;
          display: grid;
          grid-template-columns: auto minmax(180px, 1fr) auto;
          align-items: center;
          gap: 16px;
          padding: 10px 16px;
        }

        .tibyan-brand-button {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 3px;
          border: 0;
          border-radius: 18px;
          background: transparent;
          cursor: pointer;
        }

        .tibyan-brand-logo {
          width: 55px;
          height: 55px;
          flex: 0 0 55px;
          display: grid;
          place-items: center;
        }

        .tibyan-brand-copy {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
        }

        .tibyan-brand-name {
          display: block;
          white-space: nowrap;
          color: #07569f;
          font-size: clamp(1.05rem, 1.4vw, 1.35rem);
          font-weight: 700;
          line-height: 1.15;
        }

        .tibyan-brand-tagline {
          display: block;
          margin-top: 4px;
          white-space: nowrap;
          color: #0ca5ad;
          font-size: clamp(.52rem, .66vw, .68rem);
          font-weight: 700;
          line-height: 1.15;
        }

        .tibyan-search {
          position: relative;
          width: 100%;
          min-width: 0;
          max-width: none;
          margin: 0;
        }

        .tibyan-search > input {
          width: 100%;
          height: 36px;
          padding: 0 42px 0 14px;
          border: 1px solid rgba(8, 118, 217, 0.14);
          border-radius: 13px;
          outline: 0;
          background: #f7fcff;
          color: #315f7a;
          font-size: .78rem;
          font-weight: 600;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .tibyan-search > input::placeholder {
          color: #87a5b7;
        }

        .tibyan-search > input:focus {
          border-color: rgba(12, 170, 184, .45);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(12, 170, 184, .10);
        }

        .tibyan-search-icon {
          position: absolute;
          z-index: 2;
          top: 50%;
          right: 14px;
          width: 17px;
          height: 17px;
          transform: translateY(-50%);
          color: #0b91bd;
          pointer-events: none;
        }

        .tibyan-search-results {
          position: absolute;
          z-index: 70;
          top: calc(100% + 9px);
          right: 0;
          left: 0;
          max-height: 360px;
          overflow-y: auto;
          padding: 8px;
          border: 1px solid rgba(10, 134, 199, .10);
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 24px 70px rgba(4, 67, 122, .18);
        }

        .tibyan-search-result {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border: 0;
          border-radius: 13px;
          background: transparent;
          text-align: right;
          cursor: pointer;
          transition: background .2s ease;
        }

        .tibyan-search-result:hover {
          background: #ecfbfb;
        }

        .tibyan-result-icon {
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: linear-gradient(145deg, #0876d9, #10b5b5);
          color: #fff;
        }

        .tibyan-top-actions,
        .tibyan-auth-area {
          margin-inline-start: auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          flex: 0 0 auto;
        }

        .tibyan-auth-title {
          color: #0b8bb9;
          font-size: .86rem;
          font-weight: 800;
          white-space: nowrap;
        }

        .tibyan-action-button,
        .tibyan-ai-button,
        .tibyan-logout-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .tibyan-action-button {
          width: 42px;
          height: 42px;
          border: 1px solid rgba(8, 118, 217, .14);
          background: #fff;
          color: #0876d9;
          box-shadow: 0 7px 16px rgba(3, 77, 132, .09);
        }

        .tibyan-ai-button {
          position: relative;
          width: 42px;
          height: 42px;
          border: 0;
          background: linear-gradient(145deg, #0cb8c0, #078fd0);
          color: #fff;
          box-shadow: 0 10px 24px rgba(8, 118, 217, .24);
        }

        .tibyan-online-dot {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 11px;
          height: 11px;
          border: 2px solid #fff;
          border-radius: 999px;
          background: #42d66f;
        }

        .tibyan-logout-button {
          min-height: 42px;
          gap: 7px;
          padding: 0 13px;
          border: 1px solid rgba(239, 68, 68, .20);
          background: #fff7f7;
          color: #d93645;
          font-size: .76rem;
          font-weight: 800;
          box-shadow: 0 7px 16px rgba(217, 54, 69, .08);
        }

        .tibyan-action-button:hover,
        .tibyan-ai-button:hover,
        .tibyan-logout-button:hover {
          transform: translateY(-2px);
        }

        @media (min-width: 900px) {
          .tibyan-topbar-inner {
            padding-inline: 22px;
          }

          .tibyan-top-actions {
            margin-inline-start: clamp(3rem, 10vw, 10rem);
          }
        }

        @media (max-width: 760px) {
          .tibyan-topbar {
            top: 6px;
            width: calc(100% - 16px);
            margin-top: 6px;
            border-radius: 20px;
          }

          .tibyan-topbar-inner {
            min-height: auto;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 8px;
            padding: 8px 9px 9px;
          }

          .tibyan-brand-button {
            gap: 6px;
            overflow: visible;
          }

          .tibyan-brand-logo {
            width: 43px;
            height: 43px;
            flex-basis: 43px;
          }

          .tibyan-brand-name {
            font-size: .98rem;
          }

          .tibyan-brand-tagline {
            margin-top: 3px;
            font-size: .49rem;
          }

          .tibyan-search {
            grid-column: 1 / -1;
            grid-row: 2;
            width: 100%;
          }

          .tibyan-search > input {
            height: 33px;
            border-radius: 11px;
            font-size: .72rem;
          }

          .tibyan-top-actions {
            gap: 5px;
          }

          .tibyan-action-button,
          .tibyan-ai-button {
            width: 36px;
            height: 36px;
            border-radius: 12px;
          }

          .tibyan-logout-button {
            width: 36px;
            min-height: 36px;
            padding: 0;
            border-radius: 12px;
          }

          .tibyan-logout-button span {
            display: none;
          }

          .tibyan-auth-title {
            display: none;
          }
        }

        @media (max-width: 390px) {
          .tibyan-topbar-inner {
            padding-inline: 7px;
          }

          .tibyan-brand-logo {
            width: 39px;
            height: 39px;
            flex-basis: 39px;
          }

          .tibyan-brand-name {
            font-size: .90rem;
          }

          .tibyan-brand-tagline {
            font-size: .45rem;
          }

          .tibyan-action-button,
          .tibyan-ai-button,
          .tibyan-logout-button {
            width: 33px;
            height: 33px;
            min-height: 33px;
            border-radius: 10px;
          }

          .tibyan-action-button svg,
          .tibyan-ai-button svg,
          .tibyan-logout-button svg {
            width: 17px;
            height: 17px;
          }
        }


        /* فصل البحث عن الشريط العلوي مع استخدام شعار الرئيسية نفسه */
        .tibyan-header-wrap {
          top: 8px;
          width: 100%;
          pointer-events: none;
        }

        .tibyan-header-wrap > * {
          pointer-events: auto;
        }

        .tibyan-topbar {
          position: relative;
          top: auto;
          width: calc(100% - 24px);
          max-width: 1500px;
          margin: 0 auto;
        }

        .tibyan-topbar-inner {
          grid-template-columns: minmax(0, 1fr) auto;
        }

        .tibyan-brand-logo {
          width: 58px;
          height: 58px;
          flex-basis: 58px;
          overflow: visible;
          filter: drop-shadow(0 8px 14px rgba(3, 82, 143, 0.16));
        }

        .tibyan-search-shell {
          width: calc(100% - 24px);
          max-width: 1500px;
          margin: 8px auto 0;
          padding: 6px 10px;
          border: 1px solid rgba(7, 92, 145, 0.10);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.93);
          box-shadow: 0 12px 30px rgba(3, 66, 112, 0.09);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .tibyan-search {
          width: 100%;
        }

        .tibyan-search > input {
          height: 34px;
          border-radius: 11px;
          background: #f7fcff;
        }

        @media (max-width: 760px) {
          .tibyan-header-wrap {
            top: 6px;
          }

          .tibyan-topbar {
            width: calc(100% - 16px);
            margin: 0 auto;
          }

          .tibyan-topbar-inner {
            grid-template-columns: minmax(0, 1fr) auto;
            padding-bottom: 8px;
          }

          .tibyan-search-shell {
            width: calc(100% - 16px);
            margin-top: 6px;
            padding: 5px 7px;
            border-radius: 15px;
          }

          .tibyan-search {
            grid-column: auto;
            grid-row: auto;
          }

          .tibyan-search > input {
            height: 32px;
            border-radius: 10px;
          }

          .tibyan-brand-logo {
            width: 43px;
            height: 43px;
            flex-basis: 43px;
          }
        }

        @media (max-width: 390px) {
          .tibyan-search-shell {
            padding-inline: 6px;
          }

          .tibyan-brand-logo {
            width: 40px;
            height: 40px;
            flex-basis: 40px;
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
          .ai-button::after,
          .tibyan-brand-logo,
          .tibyan-header-heartbeat,
          .tibyan-header-leaf,
          .tibyan-header-blue-arc,
          .transition-logo-transparent .tibyan-header-heartbeat,
          .transition-logo-transparent .tibyan-header-leaf,
          .transition-logo-transparent .tibyan-header-blue-arc {
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