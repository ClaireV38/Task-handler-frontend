import { useParams } from "react-router-dom";
import { useTask } from "../services/api/task";

export default function TaskDetail() {
    const { id } = useParams();
    const taskId = id ? Number(id) : undefined;
    const { data: task, isLoading, isError } = useTask(taskId);

    if (isLoading) return <p>Chargement...</p>;
    if (isError) return <p>Erreur lors du chargement de la tâche</p>;
    if (!task) return <p>Aucune tâche trouvée</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
            <p>{task.description}</p>
            <span className="text-gray-500">{task.status}</span>
        </div>
    );
}
