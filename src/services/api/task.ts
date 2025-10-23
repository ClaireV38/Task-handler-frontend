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

export interface Filters {
    user_id: number;
    status: string;
}

export function useTasks(filters?: { user_id: null; status: string }) {
    return useQuery({
        queryKey: ['tasks', filters],
        queryFn: () => getTasks(filters),
    });
}

export async function getTasks(filters = {}): Promise<Task[]> {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/tasks`, {
        params: filters,
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

    return response.data.data;
}


