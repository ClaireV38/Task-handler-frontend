import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../services/api/task"

export default function Dashboard() {
    const { user, loading } = useAuth();
    const { data: tasks, isLoading, isError } = useTasks();

    if (loading || isLoading ) return <p>Loading...</p>;
    if (!user || isError ) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {tasks?.map((task) => (
                <div
                    key={task.id}
                    className="block p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                        {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 dark:text-gray-300">
                        {task.description}
                    </p>
                    <span className="inline-block text-xs font-medium text-gray-500 dark:text-gray-400">
        {task.status}
      </span>
                </div>
            ))}
        </div>
    );
}
