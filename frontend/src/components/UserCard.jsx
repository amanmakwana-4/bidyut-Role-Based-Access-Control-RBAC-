const UserCard = ({ user, onDelete }) => {
  const currentUserEmail = JSON.parse(localStorage.getItem('user') || '{}').email;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.role === 'admin'
              ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
              : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
          }`}
        >
          {user.role}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </span>
      </div>

      {currentUserEmail !== user.email && (
        <button
          onClick={() => onDelete(user._id)}
          className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
        >
          Delete User
        </button>
      )}
    </div>
  );
};

export default UserCard;
