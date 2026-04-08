import { createBrowserRouter, RouterProvider } from "react-router";
import {HomePage} from "../pages/Homepage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AllCoursesPage } from "../pages/AllCoursesPage";
import App from "../App";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { ManageUsersPage } from "@/pages/ManageUsersPage";
import { CreateTeacherPage } from "@/pages/CreateTeacherPage";
import { StudentDashboard } from "@/pages/studentDashboard";
import { TeacherDashboard } from "@/pages/TeacherDashboard";
import { EnrollmentPage } from "@/pages/EnrollmentPage";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children:[
            {index: true, element: <HomePage/>},
            {path:"register", element: <RegisterPage/>},
            {path:"login", element: <LoginPage />},
            {path:"courses", element: <AllCoursesPage />},
            {path: "admin/users", element: <ProtectedRoute role="admin"><ManageUsersPage /></ProtectedRoute> },
            {path: "admin/users/create-teacher", element: <ProtectedRoute role="admin"><CreateTeacherPage /></ProtectedRoute> },

            {path: "admin/enrollments", element: <ProtectedRoute role="admin"><EnrollmentPage /></ProtectedRoute> },

            {path:"admin", element: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>},
            {path:"student", element: <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>},
            {path:"teacher", element: <ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>}
        ]
    }
])

export default router;