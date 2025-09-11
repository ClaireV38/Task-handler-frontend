import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!user) return null;

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.name}</p>
        </div>
    );
}
