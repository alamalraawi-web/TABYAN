// app/page.tsx (الصفحة الرئيسية)
export default function HomePage() {
  return (
    <div className="p-4 max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* الترحيب */}
      <div className="bg-gradient-to-l from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-lg mt-4">
        <h1 className="text-2xl font-bold">مرحباً بك في <span className="text-yellow-300">تبيبان</span> 👋</h1>
        <p className="text-blue-100 mt-1">وجهتك الاولة الصحية الأولى بذكاء الاصطناعي </p>
      </div>

      {/* نصيحة يومية */}
      <div className="mt-4 bg-white p-4 rounded-xl shadow-sm border-r-4 border-green-500">
        <p className="text-gray-700">💡 نصيحة اليوم: اشرب كوباً من الماء قبل كل فحص.</p>
      </div>

      {/* إحصائيات وهمية */}
      <div className="grid grid-cols-3 gap-3 mt-5">
        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <p className="text-2xl font-bold text-blue-600">5</p>
          <p className="text-gray-400 text-sm">فحوصات</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <p className="text-2xl font-bold text-green-600">3</p>
          <p className="text-gray-400 text-sm">طلبات دواء</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <p className="text-2xl font-bold text-purple-600">2</p>
          <p className="text-gray-400 text-sm">استشارات</p>
        </div>
      </div>
    </div>
  );
}