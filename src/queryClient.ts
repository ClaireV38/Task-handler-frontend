import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // nombre de tentatives si erreur
            refetchOnWindowFocus: false, // pas de refetch quand on revient sur la fenêtre
        },
    },
});
