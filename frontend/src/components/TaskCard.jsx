const TaskCard = ({ task, onUpdate, onDelete, isAdmin }) => {
  const isOwner = task.user?._id === localStorage.getItem('userId');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white break-words">
            {task.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            By: {task.user?.name || 'Unknown'}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            task.status === 'completed'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
          }`}
        >
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex gap-2 flex-wrap">
        {(isOwner || isAdmin) && (
          <>
            <button
              onClick={() => onUpdate(task)}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
