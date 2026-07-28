"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { supabase } from "@/lib/supabaseClient";
import {
  Bell,
  Check,
  ChevronLeft,
  Globe,
  LogOut,
  Moon,
  ShieldCheck,
  Smartphone,
  Sun,
  Volume2,
  Sparkles,
  LockKeyhole,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tibyanFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-tibyan",
  preload: true,
});

// --- مكون صف الإعدادات (مُحسَّن) ---
function SettingsRow({
  icon: Icon,
  label,
  sublabel,
  rightContent,
  onClick,
  danger,
  iconBg = "from-blue-500 to-cyan-500",
  asButton = true, // يتحكم في عرض الصف كزر أو كـ div
}: {
  icon?: React.ComponentType<any>;
  label: string;
  sublabel?: string;
  rightContent?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  iconBg?: string;
  asButton?: boolean;
}) {
  const Container = asButton ? "button" : "div";
  const clickProps = asButton && onClick ? { type: "button" as const, onClick } : {};

  return (
    <Container
      {...clickProps}
      disabled={asButton && !onClick}
      className={cn(
        "flex w-full items-center gap-4 px-5 py-4 text-right transition-all duration-200",
        "first:rounded-t-2xl last:rounded-b-2xl",
        "border-b border-slate-100 last:border-b-0 dark:border-slate-800",
        asButton && onClick
          ? "hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-slate-800/50 dark:active:bg-slate-800 cursor-pointer"
          : "cursor-default",
      )}
    >
      {Icon && (
        <span
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md",
            danger ? "from-red-500 to-rose-500" : iconBg
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-bold leading-tight", danger ? "text-red-500" : "text-slate-800 dark:text-white")}>
          {label}
        </p>
        {sublabel && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 truncate">{sublabel}</p>
        )}
      </div>
      <div className="shrink-0 flex items-center gap-2">
        {rightContent || (asButton && onClick && <ChevronLeft className="h-4 w-4 text-slate-300 dark:text-slate-600" />)}
      </div>
    </Container>
  );
}

// --- مفتاح التبديل (لا تغيير عليه) ---
function ToggleSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative h-8 w-14 rounded-full transition-colors duration-300 shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700",
        enabled ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"
      )}
    >
      <span
        className={cn(
          "absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300",
          enabled ? "left-7" : "left-1"
        )}
      />
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  // حالات محلية للتصميم
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // دالة تسجيل الخروج الحقيقية
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      alert("حدث خطأ أثناء تسجيل الخروج");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <main
      dir="rtl"
      className={`${tibyanFont.variable} relative min-h-screen bg-gradient-to-b from-[#f0f5fe] via-[#f8faff] to-[#eefdfa] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-10`}
      style={{ fontFamily: "var(--font-tibyan), 'IBM Plex Sans Arabic', Tahoma, Arial, sans-serif" }}
    >
      {/* خلفية شبكية */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(18, 183, 189, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(56, 201, 111, 0.06) 0%, transparent 40%), linear-gradient(rgba(8,118,217,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(8,118,217,0.03) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {/* رأس الصفحة */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#12b7bd]/20 bg-[#eafafa]/80 px-4 py-1.5 text-sm font-bold text-[#078c96] shadow-sm dark:bg-[#0d3333]/40 dark:text-[#7bf1e0] mb-4">
            <Sparkles className="h-4 w-4" />
            لوحة التحكم
          </div>
          <h1 className="text-4xl font-black tracking-tight text-[#064c91] dark:text-white">الإعدادات</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            خصّص تجربتك الصحية واجعل تيبان يناسبك تماماً
          </p>
        </div>

        <div className="space-y-8">
          {/* قسم المظهر */}
          <section className="animate-fade-in">
            <h2 className="mb-3 flex items-center gap-2 px-1 text-sm font-bold text-[#0876d9] dark:text-sky-400">
              <Sun className="h-4 w-4" />
              المظهر والسمات
            </h2>
            <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-[0_8px_30px_rgba(8,118,217,0.08)] backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <SettingsRow
                icon={Sun}
                label="الوضع النهاري"
                sublabel="مظهر فاتح ومريح للعين"
                iconBg="from-amber-400 to-orange-500"
                onClick={() => setTheme("light")}
                rightContent={theme === "light" ? <Check className="h-5 w-5 text-emerald-500 animate-pulse-once" /> : null}
              />
              <SettingsRow
                icon={Moon}
                label="الوضع الليلي"
                sublabel="مظهر داكن لتقليل إجهاد العين"
                iconBg="from-indigo-500 to-purple-600"
                onClick={() => setTheme("dark")}
                rightContent={theme === "dark" ? <Check className="h-5 w-5 text-emerald-500 animate-pulse-once" /> : null}
              />
              <SettingsRow
                icon={Smartphone}
                label="تلقائي (حسب النظام)"
                sublabel="يتبع إعدادات جهازك تلقائياً"
                iconBg="from-gray-600 to-gray-700 dark:from-gray-400 dark:to-gray-500"
                onClick={() => setTheme("system")}
                rightContent={theme === "system" ? <Check className="h-5 w-5 text-emerald-500 animate-pulse-once" /> : null}
              />
            </div>
          </section>

          {/* قسم اللغة */}
          <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="mb-3 flex items-center gap-2 px-1 text-sm font-bold text-[#0876d9] dark:text-sky-400">
              <Globe className="h-4 w-4" />
              اللغة والمنطقة
            </h2>
            <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-[0_8px_30px_rgba(8,118,217,0.08)] backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <SettingsRow
                icon={Globe}
                label="العربية"
                sublabel="المملكة العربية السعودية"
                iconBg="from-emerald-500 to-teal-600"
                onClick={() => setLanguage("ar")}
                rightContent={language === "ar" ? <Check className="h-5 w-5 text-emerald-500" /> : null}
              />
              <SettingsRow
                icon={Globe}
                label="English"
                sublabel="United States"
                iconBg="from-blue-500 to-indigo-600"
                onClick={() => setLanguage("en")}
                rightContent={language === "en" ? <Check className="h-5 w-5 text-emerald-500" /> : null}
              />
            </div>
          </section>

          {/* قسم الإشعارات */}
          <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="mb-3 flex items-center gap-2 px-1 text-sm font-bold text-[#0876d9] dark:text-sky-400">
              <Bell className="h-4 w-4" />
              الإشعارات والتنبيهات
            </h2>
            <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-[0_8px_30px_rgba(8,118,217,0.08)] backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <SettingsRow
                icon={Bell}
                label="تفعيل الإشعارات"
                sublabel="تنبيهات المواعيد والنتائج الطبية"
                iconBg="from-orange-400 to-amber-500"
                asButton={false} // مهم: لأن بالداخل زر ToggleSwitch
                rightContent={<ToggleSwitch enabled={notificationsEnabled} onChange={setNotificationsEnabled} />}
              />
              <SettingsRow
                icon={Volume2}
                label="المؤثرات الصوتية"
                sublabel="أصوات التنبيهات والتأكيدات"
                iconBg="from-violet-500 to-purple-600"
                asButton={false} // مهم: لأن بالداخل زر ToggleSwitch
                rightContent={<ToggleSwitch enabled={soundEnabled} onChange={setSoundEnabled} />}
              />
            </div>
          </section>

          {/* قسم الخصوصية والأمان */}
          <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="mb-3 flex items-center gap-2 px-1 text-sm font-bold text-[#0876d9] dark:text-sky-400">
              <ShieldCheck className="h-4 w-4" />
              الخصوصية والأمان
            </h2>
            <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-[0_8px_30px_rgba(8,118,217,0.08)] backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <SettingsRow
                icon={LockKeyhole}
                label="تغيير كلمة المرور"
                iconBg="from-blue-600 to-indigo-600"
                onClick={() => alert("سيتم توجيهك إلى صفحة تغيير كلمة المرور")}
              />
              <SettingsRow
                icon={ShieldCheck}
                label="إدارة الجلسات النشطة"
                iconBg="from-emerald-500 to-green-600"
                onClick={() => alert("سيتم توجيهك إلى صفحة الجلسات")}
              />
              <SettingsRow
                icon={Trash2}
                label="حذف الحساب"
                sublabel="لا يمكن التراجع عن هذا الإجراء"
                danger
                onClick={() => alert("سيتم توجيهك إلى صفحة حذف الحساب")}
              />
            </div>
          </section>

          {/* قسم تسجيل الخروج */}
          <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="overflow-hidden rounded-3xl border border-red-100 bg-white/70 shadow-[0_8px_30px_rgba(239,68,68,0.1)] backdrop-blur-xl dark:border-red-900/50 dark:bg-slate-900/70 dark:shadow-[0_8px_30px_rgba(239,68,68,0.15)]">
              <SettingsRow
                icon={LogOut}
                label={isLoggingOut ? "جارٍ تسجيل الخروج..." : "تسجيل الخروج من الحساب"}
                danger
                onClick={handleLogout}
                rightContent={
                  isLoggingOut ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                  ) : null
                }
              />
            </div>
          </section>

          {/* قسم حول تيبان */}
          <section className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <h2 className="mb-3 flex items-center gap-2 px-1 text-sm font-bold text-[#0876d9] dark:text-sky-400">
              <Sparkles className="h-4 w-4" />
              حول تيبان
            </h2>
            <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-[0_8px_30px_rgba(8,118,217,0.08)] backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <SettingsRow
                icon={Sparkles}
                label="الإصدار"
                sublabel="آخر تحديث يوليو 2025"
                iconBg="from-pink-500 to-rose-500"
                asButton={false}
                rightContent={
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">v2.0.0</span>
                }
              />
              <SettingsRow
                icon={ExternalLink}
                label="سياسة الخصوصية"
                iconBg="from-slate-500 to-slate-600"
                onClick={() => alert("فتح سياسة الخصوصية")}
              />
              <SettingsRow
                icon={ExternalLink}
                label="شروط الاستخدام"
                iconBg="from-slate-500 to-slate-600"
                onClick={() => alert("فتح شروط الاستخدام")}
              />
            </div>
          </section>
        </div>

        <p className="mt-10 text-center text-xs text-slate-400 dark:text-slate-600">
          تم تطوير تيبان بكل ❤️ لراحتك الصحية.
        </p>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out both;
        }
        @keyframes pulseOnce {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-pulse-once {
          animation: pulseOnce 0.4s ease-in-out;
        }
      `}</style>
    </main>
  );
}