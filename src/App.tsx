import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaskDetail from "./pages/TaskDetail";
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
                <Route path="/tasks/:id" element={
                    <MainLayout>
                        <TaskDetail />
                    </MainLayout>
                } />
            </Routes>
        </Router>
    );
}
