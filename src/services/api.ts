export const API_URL = "http://taskhandler.local:8000/api";

export const login = async (email: string, password: string) => {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            if (res.status === 401) {
                return { error: "Invalid credentials" };
            } else {
                return { error: `Server error ${res.status}` };
            }
        }

        return await res.json();
    } catch (error) {
        return { error: "Cannot reach server" };
    }
};

export const getMe = async (token: string) => {
    const res = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};
