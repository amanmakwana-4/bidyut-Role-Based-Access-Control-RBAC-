import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome, {user?.name}! 👋
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Your Role
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 capitalize">
                {user?.role === 'admin' ? '👑 Administrator' : '👤 User'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {user?.role === 'admin'
                  ? 'You have full access to manage tasks and users'
                  : 'You can manage your own tasks'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Email
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 break-all">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 dark:bg-blue-900 rounded-lg p-6 border-l-4 border-blue-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Start
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>✅ Create and manage your tasks</li>
              <li>✅ Keep track of task status (pending/completed)</li>
              {user?.role === 'admin' && (
                <>
                  <li>✅ View and manage all users</li>
                  <li>✅ View and manage all tasks in the system</li>
                </>
              )}
              <li>✅ Use the navigation menu to get started</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
