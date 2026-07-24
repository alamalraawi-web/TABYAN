"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, Mail, Shield, Moon, Sun, Languages } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // جلب بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // جلب الملف الشخصي
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(profile);
      }
    };
    fetchUserData();
  }, []);

  // دالة تسجيل الخروج
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // التوجيه إلى صفحة تسجيل الدخول بعد الخروج
      router.push("/login");
      router.refresh(); // تحديث الصفحة لإلغاء الجلسة المخزنة
    } catch (error: any) {
      alert(`حدث خطأ أثناء تسجيل الخروج: ${error.message}`);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // دالة تجريبية لتغيير الثيم (ستُفعل لاحقاً)
  const toggleTheme = () => {
    // سيتم إضافة منطق تغيير الثيم لاحقاً
    alert("سيتم تفعيل تغيير الثيم في التحديث القادم");
  };

  // دالة تجريبية لتغيير اللغة (ستُفعل لاحقاً)
  const toggleLanguage = () => {
    alert("سيتم تفعيل تغيير اللغة في التحديث القادم");
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <Shield className="h-8 w-8 text-blue-600" />
        الإعدادات
      </h1>

      {/* بطاقة الملف الشخصي */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            الملف الشخصي
          </CardTitle>
          <CardDescription>
            معلومات حسابك الشخصي
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="font-medium">البريد الإلكتروني:</span>
            <span>{user?.email || "غير متوفر"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium">الدور:</span>
            <span>{profile?.role === "patient" ? "مريض" : 
                    profile?.role === "doctor" ? "طبيب" : 
                    profile?.role === "pharmacist" ? "صيدلي" : "غير محدد"}</span>
          </div>
          {profile?.specialty && (
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="font-medium">التخصص:</span>
              <span>{profile.specialty}</span>
            </div>
          )}
          {profile?.lab_name && (
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="font-medium">اسم المختبر/الصيدلية:</span>
              <span>{profile.lab_name}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">الحساب مفعل:</span>
            <span>{user?.email_confirmed_at ? "✅ نعم" : "❌ لا"}</span>
          </div>
        </CardContent>
      </Card>

      {/* بطاقة الإعدادات */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            تخصيص التطبيق
          </CardTitle>
          <CardDescription>
            قم بتعديل إعدادات التطبيق حسب رغبتك
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* زر تغيير الثيم */}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-gray-300 dark:border-gray-600"
            onClick={toggleTheme}
          >
            <Sun className="h-5 w-5 text-yellow-500 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block text-blue-300" />
            <span>تبديل الوضع (نهاري/ليلي)</span>
          </Button>

          {/* زر تغيير اللغة */}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-gray-300 dark:border-gray-600"
            onClick={toggleLanguage}
          >
            <Languages className="h-5 w-5 text-green-500" />
            <span>تبديل اللغة (عربي/إنجليزي)</span>
          </Button>

          {/* زر تسجيل الخروج - مهم */}
          <Button
            variant="destructive"
            className="w-full justify-start gap-3 mt-4 bg-red-600 hover:bg-red-700 text-white"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="h-5 w-5" />
            <span>{isLoggingOut ? "جاري الخروج..." : "تسجيل الخروج"}</span>
          </Button>
        </CardContent>
      </Card>

      {/* بطاقة معلومات إضافية */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-500 dark:text-gray-400">
            معلومات التطبيق
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            تيبان - النظام الصحي الذكي المتكامل v1.0
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            © 2025 جميع الحقوق محفوظة
          </p>
        </CardContent>
      </Card>
    </div>
  );
}