import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import Pagination from '../components/Pagination';

const AllTasks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const limit = 10;

  // Fetch all tasks
  const { data, isLoading, error: fetchError } = useQuery({
    queryKey: ['allTasks', currentPage],
    queryFn: () => taskAPI.getAllTasks(currentPage, limit),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const tasks = data?.data?.tasks || [];
  const totalTasks = data?.data?.count || 0;
  const totalPages = Math.ceil(totalTasks / limit);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => taskAPI.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTasks'] });
      setError('');
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Failed to delete task');
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Tasks</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {fetchError && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            {fetchError.message}
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-xl text-gray-600 dark:text-gray-400">No tasks found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdate={() => {}}
                  onDelete={(id) => deleteMutation.mutate(id)}
                  isAdmin={true}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
