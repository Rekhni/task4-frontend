import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user.id);
        }
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Login failed';
    }
};

export const registerUser = async (name, email, password) => {
    try {
        await api.post('/auth/register', { name, email, password });
        return 'Registration successful';
    } catch (error) {
        throw error.response?.data?.message || 'Registration failed';
    }
};

export const fetchUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("Unauthorized: No token found");
        }
        const response = await api.get('/users', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch users';
    }
};

export const updateUserStatus = async (action, userIds) => {
    try {
        const token = localStorage.getItem('token');
        await api.post('/users/action', { action, userIds }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return `${action} successful`;
    } catch (error) {
        if (error.response?.status === 403) {
            alert("Your account has been blocked. You will now be logged out.");
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.href = '/';
        }
        throw error.response?.data?.message || `Failed to ${action} users`;
    }
};

