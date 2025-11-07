import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'http://taskhandler.local/api';

/**
 * Fetch un blob média depuis le backend Laravel
 * Retourne une URL locale utilisable dans <video> ou <img>
 */
export async function getMediaBlob(mediaId: number): Promise<string> {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/media/${mediaId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // 👈 important
    });

    const blob = response.data;
    return URL.createObjectURL(blob);
}

/**
 * Hook React Query pour un blob de média
 */
export function useMediaBlob(mediaId?: number) {
    return useQuery({
        queryKey: ['media', mediaId],
        queryFn: () => getMediaBlob(mediaId!),
        enabled: !!mediaId, // 👈 ne lance la requête que si un ID est défini
        staleTime: 1000 * 60 * 5, // 5 min de cache
    });
}

