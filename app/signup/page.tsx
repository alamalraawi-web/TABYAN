"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// قائمة التخصصات الطبية
const SPECIALTIES = [
  "باطنية",
  "قلبية",
  "أطفال",
  "جلدية",
  "عظام",
  "مخ وأعصاب",
  "نساء وتوليد",
  "أنف وأذن وحنجرة",
  "مختبر (تشخيص مخبري)",
  "أخرى"
];

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // حالة النموذج
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient", // patient | doctor | pharmacist
    fullName: "",
    phone: "",
    specialty: "",
    labName: "",
    labAddress: "",
    birthDate: "",
    gender: "",
    bio: "",
    // ملف الوثيقة
    documentFile: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, documentFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // التحقق من تطابق كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      setIsLoading(false);
      return;
    }

    try {
      // 1. إنشاء الحساب في Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("فشل إنشاء الحساب");

      // 2. إعداد بيانات الملف الشخصي
      const profileData: any = {
        id: authData.user.id,
        full_name: formData.fullName,
        phone: formData.phone,
        role: formData.role,
        birth_date: formData.birthDate || null,
        gender: formData.gender || null,
        bio: formData.bio || null,
        is_verified: false,
      };

      // إضافة حقول خاصة حسب الدور
      if (formData.role === "doctor") {
        profileData.specialty = formData.specialty;
        if (formData.specialty === "مختبر (تشخيص مخبري)") {
          profileData.lab_name = formData.labName;
          profileData.lab_address = formData.labAddress;
        }
      }

      // 3. حفظ الملف الشخصي في قاعدة البيانات
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([profileData]);

      if (profileError) throw profileError;

      // 4. رفع الوثيقة (إذا وجدت)
      if (formData.documentFile && (formData.role === "doctor" || formData.role === "pharmacist")) {
        const fileExt = formData.documentFile.name.split(".").pop();
        const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;
        const filePath = `documents/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("user-documents")
          .upload(filePath, formData.documentFile);

        if (uploadError) {
          console.error("خطأ في رفع الملف:", uploadError);
          // لا نوقف العملية، فقط نسجل الخطأ
        }
      }

      // 5. إعادة التوجيه إلى لوحة التحكم المناسبة
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setIsLoading(false);
    }
  };

  // تحديد ما إذا كان الدور يحتاج إلى رفع وثيقة
  const needsDocument = formData.role === "doctor" || formData.role === "pharmacist";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 max-h-[90vh] overflow-y-auto">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            تيبان 🏥
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            إنشاء حساب جديد
          </CardDescription>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            اختر دورك المناسب واملأ البيانات المطلوبة
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* البريد الإلكتروني */}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                name="email"
                type="email"
                dir="ltr"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* كلمة المرور */}
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                name="password"
                type="password"
                dir="ltr"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                dir="ltr"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* اختيار الدور */}
            <div className="space-y-2">
              <Label htmlFor="role">الدور</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                <option value="patient">مريض</option>
                <option value="doctor">طبيب</option>
                <option value="pharmacist">صيدلي</option>
              </select>
            </div>

            {/* الاسم الكامل */}
            <div className="space-y-2">
              <Label htmlFor="fullName">الاسم الكامل</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="أدخل اسمك الكامل"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* رقم الهاتف */}
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                dir="ltr"
                placeholder="05xxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* الحقول الخاصة بالمرضى */}
            {formData.role === "patient" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">الجنس</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">اختر</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>
              </>
            )}

            {/* الحقول الخاصة بالأطباء */}
            {formData.role === "doctor" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="specialty">التخصص الطبي</Label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">اختر تخصصك</option>
                    {SPECIALTIES.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* حقول إضافية لتخصص المختبر */}
                {formData.specialty === "مختبر (تشخيص مخبري)" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="labName">اسم المختبر</Label>
                      <Input
                        id="labName"
                        name="labName"
                        type="text"
                        placeholder="اسم المختبر"
                        value={formData.labName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="labAddress">عنوان المختبر</Label>
                      <Input
                        id="labAddress"
                        name="labAddress"
                        type="text"
                        placeholder="عنوان المختبر"
                        value={formData.labAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="bio">السيرة الذاتية (نبذة عنك)</Label>
                  <Input
                    id="bio"
                    name="bio"
                    type="text"
                    placeholder="نبذة مختصرة عن خبراتك الطبية"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {/* الحقول الخاصة بالصيادلة */}
            {formData.role === "pharmacist" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="labName">اسم الصيدلية</Label>
                  <Input
                    id="labName"
                    name="labName"
                    type="text"
                    placeholder="اسم الصيدلية"
                    value={formData.labName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="labAddress">عنوان الصيدلية</Label>
                  <Input
                    id="labAddress"
                    name="labAddress"
                    type="text"
                    placeholder="عنوان الصيدلية"
                    value={formData.labAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {/* رفع الوثيقة (للأطباء والصيادلة) */}
            {needsDocument && (
              <div className="space-y-2">
                <Label htmlFor="document">رفع الوثيقة المهنية</Label>
                <Input
                  id="document"
                  name="document"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  يسمح بملفات PDF أو صور (JPG, PNG)
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
              disabled={isLoading}
            >
              {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب 🚀"}
            </Button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              لديك حساب بالفعل؟{" "}
              <a href="/login" className="text-blue-600 hover:underline font-semibold">
                سجل دخولك
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}