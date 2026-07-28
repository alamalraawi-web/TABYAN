import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. نطبع رسالة تأكيد في الطرفية (للتأكد من أن الملف يُقرأ)
  console.log("✅ Middleware يعمل الآن على:", request.nextUrl.pathname);

  // 2. نحدد الصفحات العامة (الوحيدة التي لا تحتاج تسجيل دخول)
  const publicPaths = ['/login', '/signup'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // 3. نتحقق من وجود جلسة (من الكوكيز)
  const session = request.cookies.get('sb-access-token')?.value;

  // 4. إذا لم توجد جلسة والمستخدم يحاول دخول صفحة محمية
  if (!session && !isPublicPath) {
    console.log("🚫 غير مسجل، توجيه إلى /login");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 5. إذا كانت الجلسة موجودة والمستخدم في صفحة الدخول
  if (session && isPublicPath) {
    console.log("✅ مسجل، توجيه إلى /dashboard");
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 6. السماح بالوصول
  return NextResponse.next();
}

// 7. تطبيق الميدلوير على جميع الصفحات (ما عدا api والملفات الثابتة)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};