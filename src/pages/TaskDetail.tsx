import { useParams } from "react-router-dom";
import { useTask, fetchMediaBlob } from "../services/api/task";
import { useMediaBlob } from "../services/api/media";

export default function TaskDetail() {
    const { id } = useParams();
    const taskId = id ? Number(id) : undefined;
    const { data: task, isLoading: isLoading, isError } = useTask(taskId);
    const mediaId = Number(task?.media?.[0]?.id);
    const { data: videoUrl, isLoading: videoLoading } = useMediaBlob(mediaId);

    if (isLoading) return <p>Chargement...</p>;
    if (isError) return <p>Erreur lors du chargement de la tâche</p>;
    if (!task) return <p>Aucune tâche trouvée</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
            <p>{task.description}</p>
            <p>{task.description}</p>
            <p>created by: {task.user.name}</p>
            <span className="text-gray-500">{task.status}</span>

            {videoLoading && <p>Chargement de la vidéo...</p>}

            {mediaId !== undefined && videoUrl && !videoLoading && (
                <video
                    key={mediaId} // 👈 important pour reset entre vidéos
                    src={videoUrl}
                    controls
                    className="w-full max-w-2xl rounded shadow"
                />
            )}
        </div>
    );
}
