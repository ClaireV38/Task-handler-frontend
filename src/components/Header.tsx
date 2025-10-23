import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-indigo-600 text-white shadow">
            <h1
                className="text-xl font-bold cursor-pointer"
                onClick={() => navigate("/dashboard")}
            >
                TaskHandler
            </h1>

            {token ? (
                <button
                    onClick={handleLogout}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition"
                >
                    Logout
                </button>
            ) : (
                <button
                    onClick={handleLogin}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition"
                >
                    Login
                </button>
            )}
        </header>
    );
}
