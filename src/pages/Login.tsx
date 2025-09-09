import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const data = await login(email, password);
        if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } else {
            setError("Login failed");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
