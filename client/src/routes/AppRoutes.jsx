import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";

import HomeDashboard from "../pages/dashboard/HomeDashboard.jsx";
import Projects from "../pages/dashboard/Projects.jsx";
import Tasks from "../pages/dashboard/Tasks.jsx";
import Profile from "../pages/dashboard/Profile.jsx";

import Dashboard from "../layouts/Dashboard.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                <Route index element={<HomeDashboard />} />
                <Route path="projects" element={<Projects />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="profile" element={<Profile />} />

            </Route>
        </Routes>
    );
}

export default AppRoutes;
