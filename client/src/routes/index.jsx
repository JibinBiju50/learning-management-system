import { createBrowserRouter, RouterProvider } from "react-router";
import {HomePage} from "../pages/Homepage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AllCoursesPage } from "../pages/AllCoursesPage";
import App from "../App";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminDashboard } from "@/pages/AdminDashboard";

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
            {path:"admin", element: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
        ]
    }
])

export default router;