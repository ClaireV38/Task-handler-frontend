import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TaskStatus } from "../../constants/taskStatus";

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
    user: User;
    created_at?: string;
    updated_at?: string;
    media?: Media[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    created_at?: string;
}

export interface Filters {
    user_id: number;
    status: TaskStatus;
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

export function useTask(id?: number) {
    return useQuery({
        queryKey: ['task', id],
        queryFn: () => getTask(id!),
        enabled: !!id,
    });
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


