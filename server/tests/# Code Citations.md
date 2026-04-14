# Code Citations

## License: MIT
https://github.com/Ashesi-Org/iconnect/blob/7968b6a5e9556322ff9178a9d1c58acaa22256aa/iconnect-frontend/src/admin-ui/UserManagement/UserManagement.jsx

```
Since this is in Ask mode, I can't modify files, but here's exactly what you need to build:

### 1. API function — add to [authApi.js](client/src/api/authApi.js)

```js
export const fetchAllUsers = async () => {
    const response = await api.get('/api/users');
    return response.data;
}

export const deactivateUser = async (id) => {
    const response = await api.patch(`/api/users/${id}/deactivate`);
    return response.data;
}

export const activateUser = async (id) => {
    const response = await api.patch(`/api/users/${id}/activate`);
    return response.data;
}
```

### 2. Create a new page — `client/src/pages/ManageUsersPage.jsx`

```jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllUsers, deactivateUser, activateUser } from "@/api/authApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ManageUsersPage() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchAllUsers,
    });

    const deactivateMutation = useMutation({
        mutationFn: deactivateUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });

    const activateMutation = useMutation({
        mutationFn: activateUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });

    if (isLoading) return <p className="text-center mt-10">Loading users...</p>;
    if (isError) return <p className="text-center mt-10 text-destructive">{error.message}</p>;

    const users = data?.users || [];

    return (
        <div className="max-w-5xl mx-auto p-6">
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
                                            {user
```


## License: MIT
https://github.com/Ashesi-Org/iconnect/blob/7968b6a5e9556322ff9178a9d1c58acaa22256aa/iconnect-frontend/src/admin-ui/UserManagement/UserManagement.jsx

```
Since this is in Ask mode, I can't modify files, but here's exactly what you need to build:

### 1. API function — add to [authApi.js](client/src/api/authApi.js)

```js
export const fetchAllUsers = async () => {
    const response = await api.get('/api/users');
    return response.data;
}

export const deactivateUser = async (id) => {
    const response = await api.patch(`/api/users/${id}/deactivate`);
    return response.data;
}

export const activateUser = async (id) => {
    const response = await api.patch(`/api/users/${id}/activate`);
    return response.data;
}
```

### 2. Create a new page — `client/src/pages/ManageUsersPage.jsx`

```jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllUsers, deactivateUser, activateUser } from "@/api/authApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ManageUsersPage() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchAllUsers,
    });

    const deactivateMutation = useMutation({
        mutationFn: deactivateUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });

    const activateMutation = useMutation({
        mutationFn: activateUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });

    if (isLoading) return <p className="text-center mt-10">Loading users...</p>;
    if (isError) return <p className="text-center mt-10 text-destructive">{error.message}</p>;

    const users = data?.users || [];

    return (
        <div className="max-w-5xl mx-auto p-6">
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
                                            {user
```

