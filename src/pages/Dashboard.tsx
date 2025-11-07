import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../services/api/task"
import { useState } from "react";
import { TaskStatus, TaskStatusLabels } from "../constants/taskStatus";
import { Link } from "react-router-dom";
import type {User} from "../services/api/user.ts";
import {useUsers} from "../services/api/user.ts";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const { data: users } = useUsers();
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(TaskStatus.ALL);
    const [selectedUserId, setSelectedUserId] = useState<number|null>(null);
    const { data: tasks, isLoading, isError } = useTasks({user_id: selectedUserId, status: selectedStatus});

    if (loading || isLoading ) return <p>Loading...</p>;
    if (!user || isError ) return null;

    return (
            <>
                <select
                    className="border dorder-gray-300 rounded-lg p-2 mr-4"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    {Object.values(TaskStatus).map((status) => (
                        <option key={status} value={status}>
                            {TaskStatusLabels[status]}
                        </option>
                    ))}
                </select>
                <select
                    className="border dorder-gray-300 rounded-lg p-2"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                >
                    <option key={0} value={null}>
                        Tous les utilisateurs
                    </option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {tasks?.map((task) => (
                    <Link
                        to={`/tasks/${task.id}`}
                        key={task.id}
                        className="block p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                            {task.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 dark:text-gray-300">
                            {task.description}
                        </p>
                        <p className="text-gray-600 mb-3 dark:text-gray-300">
                            {task.user.name}
                        </p>
                        <span className="inline-block text-xs font-medium text-gray-500 dark:text-gray-400">
            {TaskStatusLabels[task.status as TaskStatus] ?? task.status}
          </span>
                    </Link>
                ))}
            </div>
        </>
    );
}
