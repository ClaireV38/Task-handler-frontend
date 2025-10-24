export enum TaskStatus {
    ALL = "",
    BACKLOG = "backlog",
    TODO = "todo",
    DOING = "doing",
    REVIEW = "review",
    DONE = "done",
}

export const TaskStatusLabels: Record<TaskStatus, string> = {
    [TaskStatus.ALL]: "Tous les statuts",
    [TaskStatus.BACKLOG]: "Backlog",
    [TaskStatus.TODO]: "À faire",
    [TaskStatus.DOING]: "En cours",
    [TaskStatus.REVIEW]: "En revue",
    [TaskStatus.DONE]: "Terminée",
};
