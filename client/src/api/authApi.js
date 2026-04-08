import api from "./axios"

export const registerUser = async (name, email, password) => {
    const response = await api.post('/api/auth/register', {name, email, password});
    return response.data;
}

export const loginUser = async (email, password) => {
    const response = await api.post('/api/auth/login', {email, password});
    return response.data;
}

export const logoutUser = async () => {
    return await api.post('/api/auth/logout');
}

export const registerTeacher = async (name, email, password) => {
    return await api.post('/api/users', {name, email, password});
}

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