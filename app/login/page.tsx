"use client";

import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Apple,
  Check,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function Checkbox({
  checked,
  onCheckedChange,
  id,
}: any) {
  return (
    <div className="relative inline-flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onCheckedChange?.(e.target.checked)
        }
        className="peer sr-only"
      />

      <div
        className={cn(
          "w-5 h-5 rounded-md border",
          "border-gray-300",
          "bg-white",
          "transition",
          "peer-checked:bg-gradient-to-r",
          "peer-checked:from-blue-600",
          "peer-checked:to-emerald-400",
          "peer-checked:border-transparent"
        )}
      >
        {checked && (
          <Check
            className="text-white w-4 h-4 m-0.5"
            strokeWidth={3}
          />
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push("/dashboard");
      }
    };

    checkSession();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) setError(null);
  };

  const handleResendConfirmation =
    async () => {
      if (!formData.email) {
        setError(
          "الرجاء إدخال البريد الإلكتروني أولاً"
        );
        return;
      }

      setIsLoading(true);

      try {
        const { error } =
          await supabase.auth.resend({
            type: "signup",
            email: formData.email,
          });

        if (error) throw error;

        setSuccessMessage(
          "تم إعادة إرسال رابط التأكيد."
        );

        setError(null);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setIsLoading(true);

    setError(null);

    setSuccessMessage(null);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

      if (error) {
        if (
          error.message ===
          "Email not confirmed"
        ) {
          setError(
            "⚠️ بريدك الإلكتروني غير مؤكد."
          );
        } else if (
          error.message.includes(
            "Invalid login credentials"
          )
        ) {
          setError(
            "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة."
          );
        } else {
          setError(error.message);
        }

        return;
      }

      if (data.session) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
min-h-screen
relative
overflow-hidden
flex
items-center
justify-center
px-4
"
    >
      {/* الخلفية - تم إزالة الصورة لتجنب خطأ 404، يمكنك إضافة لون بديل */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />

      {/* طبقة ضبابية (اختيارية) */}
      <div className="absolute inset-0 bg-white/15 backdrop-blur-sm" />

      {/* المحتوى */}

      <div className="relative z-10 w-full max-w-md">

        {/* الشعار */}

        <div className="text-center mb-8">

          {/* ─── تم تعديل المسار ليتطابق مع اسم الملف داخل public ─── */}
          <img
            src="/logo.png"  // <- هذا هو المسار الصحيح لأن اسم الملف logo.png
            alt="Tabyan"
            className="w-48 mx-auto mb-5"
          />

          <h1
            className="
text-6xl
font-black
bg-gradient-to-r
from-blue-700
to-emerald-400
bg-clip-text
text-transparent
"
          >
            تبيان
          </h1>

          <p className="mt-2 text-gray-600 text-lg">
            ذكاء اصطناعي...
            لصحة أفضل
          </p>

        </div>

        {/* الكارد */}

        <div
          className="
rounded-[35px]
bg-white/78
backdrop-blur-xl
border
border-white/40
shadow-[0_20px_80px_rgba(0,0,0,.15)]
px-8
py-10
"
        >

          <h2 className="text-4xl font-bold text-center">

            مرحباً بك في

            <span className="text-emerald-500">
              {" "}تبيان
            </span>

          </h2>

          <p className="text-center text-gray-500 mt-3 mb-8">

            سجل الدخول لمتابعة رحلتك الصحية الذكية

          </p>

          {error && (
            <div className="mb-4 rounded-xl bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 rounded-xl bg-green-100 p-4 text-green-700">
              {successMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* البريد الإلكتروني */}

<div className="space-y-2">

  <Label className="text-right block font-semibold text-gray-700">
    البريد الإلكتروني
  </Label>

  <div className="relative">

    <Mail
      className="
      absolute
      right-5
      top-1/2
      -translate-y-1/2
      h-5
      w-5
      text-gray-400
      "
    />

    <Input
      name="email"
      type="email"
      dir="ltr"
      placeholder="example@email.com"
      value={formData.email}
      onChange={handleChange}
      disabled={isLoading}
      className="
      h-14
      rounded-2xl
      bg-white
      pr-14
      text-right
      border-gray-200
      shadow-sm
      focus:border-blue-500
      focus:ring-blue-500
      "
      required
    />

  </div>

</div>

{/* كلمة المرور */}

<div className="space-y-2">

  <Label className="text-right block font-semibold text-gray-700">
    كلمة المرور
  </Label>

  <div className="relative">

    <Lock
      className="
      absolute
      right-5
      top-1/2
      -translate-y-1/2
      h-5
      w-5
      text-gray-400
      "
    />

    <Input
      name="password"
      type={showPassword ? "text" : "password"}
      dir="ltr"
      placeholder="••••••••"
      value={formData.password}
      onChange={handleChange}
      disabled={isLoading}
      className="
      h-14
      rounded-2xl
      bg-white
      pr-14
      pl-12
      text-right
      border-gray-200
      shadow-sm
      "
      required
    />

    <button
      type="button"
      onClick={() =>
        setShowPassword(!showPassword)
      }
      className="
      absolute
      left-5
      top-1/2
      -translate-y-1/2
      text-gray-400
      hover:text-blue-600
      transition
      "
    >

      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}

    </button>

  </div>

</div>

{/* تذكرني */}

<div className="flex items-center justify-between">

  <a
    href="/forgot-password"
    className="
    text-blue-600
    hover:text-blue-700
    font-medium
    "
  >
    نسيت كلمة المرور؟
  </a>

  <div className="flex items-center gap-2">

    <Label
      htmlFor="remember"
      className="cursor-pointer"
    >
      تذكرني
    </Label>

    <Checkbox
      id="remember"
      checked={rememberMe}
      onCheckedChange={setRememberMe}
    />

  </div>

</div>

{/* زر الدخول */}

<Button
  type="submit"
  disabled={isLoading}
  className="
  w-full
  h-14
  rounded-2xl
  text-lg
  font-bold
  bg-gradient-to-r
  from-blue-700
  via-blue-600
  to-emerald-400
  hover:scale-[1.02]
  transition-all
  shadow-xl
  "
>

  {isLoading
    ? "جاري تسجيل الدخول..."
    : "تسجيل الدخول"}

</Button>

{/* أو */}

<div className="relative py-2">

  <div className="absolute inset-0 flex items-center">

    <div className="w-full border-t border-gray-300"></div>

  </div>

  <div className="relative flex justify-center">

    <span className="bg-white px-4 text-gray-500">

      أو

    </span>

  </div>

</div>

{/* تسجيل بواسطة */}

<div className="grid grid-cols-2 gap-4">

  <Button
    type="button"
    variant="outline"
    className="
    h-14
    rounded-2xl
    bg-white
    hover:bg-gray-50
    border-gray-200
    shadow-sm
    "
  >

    <FcGoogle className="w-6 h-6" />

    Google

  </Button>

  <Button
    type="button"
    variant="outline"
    className="
    h-14
    rounded-2xl
    bg-white
    hover:bg-gray-50
    border-gray-200
    shadow-sm
    "
  >

    <Apple className="w-5 h-5" />

    Apple

  </Button>

</div>
          {/* إعادة إرسال رابط التأكيد */}

          {error?.includes("غير مؤكد") && (
            <Button
              type="button"
              variant="outline"
              onClick={handleResendConfirmation}
              disabled={isLoading}
              className="
              w-full
              h-14
              rounded-2xl
              mt-6
              border-blue-500
              text-blue-600
              hover:bg-blue-50
              "
            >
              📧 إعادة إرسال رابط التأكيد
            </Button>
          )}

          {/* إنشاء حساب */}

          <div className="pt-8 text-center">

            <span className="text-gray-600">

              ليس لديك حساب؟

            </span>

            <a
              href="/signup"
              className="
              mr-2
              font-bold
              text-blue-600
              hover:text-blue-700
              hover:underline
              "
            >
              إنشاء حساب جديد
            </a>

          </div>

        </form>

      </div>

    </div>

  </div>

);
}