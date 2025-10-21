import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../services/api/task"

export default function Dashboard() {
    const { user, loading } = useAuth();
    const { data: tasks, isLoading, isError } = useTasks();

   console.log(tasks);

    if (loading || isLoading ) return <p>Loading...</p>;
    if (!user || isError ) return null;

    return (
        <div>
            {tasks?.map((task) => (
                <div key={task.id} className="p-4 bg-white rounded-xl shadow-sm">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <p className="text-gray-600 text-sm">{task.description}</p>
                    <span className="text-xs text-gray-400">{task.status}</span>
                </div>
            ))}
        </div>
    );
}
