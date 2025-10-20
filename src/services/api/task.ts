// src/services/api/task.ts
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'http://taskhandler.local/api';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    user_id: number;
    created_at?: string;
    updated_at?: string;
}

export function useTasks() {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
    });
}

export async function getTasks(): Promise<Task[]> {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
}

export async function getTask(id: number): Promise<Task> {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/tasks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}


