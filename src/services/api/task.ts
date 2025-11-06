import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'http://taskhandler.local/api';

export interface Media {
    id: number;
    file_name: string;
    mime_type: string;
    size: number;
    url: string; // ou signed_url si tu passes à Cloudflare plus tard
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    user_id: number;
    created_at?: string;
    updated_at?: string;
    media?: Media[];
}

export function useTasks() {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
    });
}

export function useTask(id?: number) {
    return useQuery({
        queryKey: ['task', id],
        queryFn: () => getTask(id!),
        enabled: !!id,
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

    return response.data.data;
}

export async function fetchMediaBlob(mediaId: number): Promise<string> {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/media/${mediaId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
}


