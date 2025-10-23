import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                    <MainLayout>
                        <Dashboard />
                    </MainLayout>
                } />
            </Routes>
        </Router>
    );
}
