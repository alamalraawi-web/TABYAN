"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Stethoscope, 
  FlaskConical, 
  Pill, 
  MessageCircle, 
  Settings,
  HomeIcon,
  Activity
} from "lucide-react";

const navItems = [
  { name: "الرئيسية", icon: Home, href: "/dashboard" },
  { name: "الفحوصات", icon: Activity, href: "/scans" },
  { name: "المختبرات", icon: FlaskConical, href: "/labs" },
  { name: "الصيدلية", icon: Pill, href: "/pharmacy" },
  { name: "الاستشارات", icon: MessageCircle, href: "/consultations" },
  { name: "الإعدادات", icon: Settings, href: "/settings" },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* المحتوى الرئيسي */}
      <main className="flex-1 pb-20 overflow-y-auto">
        {children}
      </main>

      {/* الشريط السفلي */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex justify-around items-center h-16 px-2 max-w-screen-xl mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
                }`}
              >
                <item.icon className={`w-6 h-6 ${isActive ? "scale-110" : ""}`} />
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}