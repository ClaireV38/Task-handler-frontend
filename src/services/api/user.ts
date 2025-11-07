import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'http://taskhandler.local/api';

export interface User {
    id: number;
    name: string;
    email: string;
    created_at?: string;
}

export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });
}

export async function getUsers(): Promise<User[]> {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
}
