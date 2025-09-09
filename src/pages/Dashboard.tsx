import { useEffect, useState } from "react";
import { getMe } from "../services/api";

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getMe(token).then(setUser);
        }
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.name}</p>
        </div>
    );
}
