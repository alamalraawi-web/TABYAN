export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🏠 الرئيسية</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-300">مرحباً بك في تيبان! هذه هي الصفحة الرئيسية.</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">ستظهر هنا النصائح والإحصائيات قريباً.</p>
      </div>
    </div>
  );
}