import { useState, useEffect } from "react";
import { getMe } from "../services/api";
import { useNavigate } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            navigate("/login");
            return;
        }

        getMe(token)
            .then((data) => {
                if (data.error) {
                    localStorage.removeItem("token");
                    navigate("/login");
                } else {
                    setUser(data.data || data);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return { user, loading, logout };
}
