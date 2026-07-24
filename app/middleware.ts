import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // إنشاء عميل Supabase مباشرة من المفاتيح البيئية
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  );

  // الحصول على الجلسة من الكوكيز
  const { data: { session }, error } = await supabase.auth.getSession();

  // الصفحات العامة (لا تحتاج تسجيل دخول)
  const publicPaths = ['/login', '/signup'];
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  // إذا لم يكن هناك جلسة والمستخدم في صفحة محمية
  if (!session && !isPublicPath) {
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // إذا كان هناك جلسة والمستخدم في صفحة الدخول
  if (session && isPublicPath) {
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// تحديد الصفحات التي يطبق عليها الميدلوير
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};