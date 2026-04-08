
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAllUsers } from "@/hooks/useAllUsers";
import { useDeactivateUser } from "@/hooks/useDeactiveUser";
import { useActivateUser } from "@/hooks/useActiveUser";
import { useNavigate } from "react-router";

export function ManageUsersPage() {

    const { data, isLoading, isError, error } = useAllUsers();

    const deactivateMutation = useDeactivateUser();

    const activateMutation = useActivateUser();

    const navigate = useNavigate();

    if (isLoading) return <p className="text-center mt-10">Loading users...</p>;
    if (isError) return <p className="text-center mt-10 text-destructive">{error.message}</p>;

    const users = data?.users || [];

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Users</h1>
                <Button onClick={() => navigate("/admin/users/create-teacher")}>
                    Create Teacher Account
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-3">ID</th>
                                <th className="py-2 px-3">Name</th>
                                <th className="py-2 px-3">Email</th>
                                <th className="py-2 px-3">Role</th>
                                <th className="py-2 px-3">Status</th>
                                <th className="py-2 px-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b">
                                    <td className="py-2 px-3">{user.id}</td>
                                    <td className="py-2 px-3">{user.name}</td>
                                    <td className="py-2 px-3">{user.email}</td>
                                    <td className="py-2 px-3">{user.role}</td>
                                    <td className="py-2 px-3">
                                        <span className={user.status === "active" ? "text-green-600" : "text-red-500"}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3">
                                        {user.role !== "admin" && (
                                            user.status === "active" ? (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    disabled={deactivateMutation.isPending}
                                                    onClick={() => deactivateMutation.mutate(user.id)}
                                                >
                                                    Deactivate
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    disabled={activateMutation.isPending}
                                                    onClick={() => activateMutation.mutate(user.id)}
                                                >
                                                    Activate
                                                </Button>
                                            )
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && <p className="text-center py-4">No users found.</p>}
                </CardContent>
            </Card>
        </div>
    );
}