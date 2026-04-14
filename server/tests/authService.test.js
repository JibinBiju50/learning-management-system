import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock the models and config before importing the service
vi.mock('../models/userModel.js', () => ({
    findByEmail: vi.fn(),
    findById: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
}));

vi.mock('../models/refreshTokenModel.js', () => ({
    saveRefreshToken: vi.fn(),
    findRefreshToken: vi.fn(),
    deleteRefreshToken: vi.fn(),
}));

vi.mock('../config/env.js', () => ({
    JWT_SECRET: 'test-secret',
    JWT_EXPIRES_IN: '15m',
    JWT_REFRESH_SECRET: 'test-refresh-secret',
    JWT_REFRESH_EXPIRES_IN: '7d',
}));

import { findByEmail, createUser } from '../models/userModel.js';
import { saveRefreshToken, findRefreshToken, deleteRefreshToken } from '../models/refreshTokenModel.js';
import { registerUser, loginUser, registerTeacher, refreshAccessToken } from '../services/authService.js';

beforeEach(() => {
    vi.clearAllMocks();
});

describe('registerUser', () => {
    it('should register a new user and return tokens', async () => {
        findByEmail.mockResolvedValue(null);
        createUser.mockResolvedValue({ id: 1, name: 'John', email: 'john@test.com', role: 'student', status: 'active' });
        saveRefreshToken.mockResolvedValue();

        const result = await registerUser('John', 'john@test.com', 'password123');

        expect(findByEmail).toHaveBeenCalledWith('john@test.com');
        expect(createUser).toHaveBeenCalledWith('John', 'john@test.com', expect.any(String));
        expect(saveRefreshToken).toHaveBeenCalled();
        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('accessToken');
        expect(result).toHaveProperty('refreshToken');
        expect(result.user.name).toBe('John');
    });

    it('should throw 409 if email already exists', async () => {
        findByEmail.mockResolvedValue({ id: 1, email: 'john@test.com' });

        await expect(registerUser('John', 'john@test.com', 'password123'))
            .rejects.toThrow('Email is already in use!');

        try {
            await registerUser('John', 'john@test.com', 'password123');
        } catch (err) {
            expect(err.status).toBe(409);
        }
    });
});

describe('loginUser', () => {
    const mockUser = {
        id: 1,
        name: 'John',
        email: 'john@test.com',
        password_hash: '',
        role: 'student',
        status: 'active',
    };

    beforeEach(async () => {
        mockUser.password_hash = await bcrypt.hash('password123', 10);
    });

    it('should login with valid credentials and return tokens', async () => {
        findByEmail.mockResolvedValue(mockUser);
        saveRefreshToken.mockResolvedValue();

        const result = await loginUser('john@test.com', 'password123');

        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('accessToken');
        expect(result).toHaveProperty('refreshToken');
        expect(result.user.email).toBe('john@test.com');
        expect(result.user).not.toHaveProperty('password_hash');
    });

    it('should throw 401 if email not found', async () => {
        findByEmail.mockResolvedValue(null);

        await expect(loginUser('nobody@test.com', 'password123'))
            .rejects.toThrow('Invalid email or password');
    });

    it('should throw 401 if password is wrong', async () => {
        findByEmail.mockResolvedValue(mockUser);

        await expect(loginUser('john@test.com', 'wrongpassword'))
            .rejects.toThrow('Invalid email or password');
    });

    it('should throw 403 if user is inactive', async () => {
        findByEmail.mockResolvedValue({ ...mockUser, status: 'inactive' });

        await expect(loginUser('john@test.com', 'password123'))
            .rejects.toThrow('Your account has been deactivated');
    });
});

describe('registerTeacher', () => {
    it('should register a teacher with role teacher', async () => {
        findByEmail.mockResolvedValue(null);
        createUser.mockResolvedValue({ id: 2, name: 'Jane', email: 'jane@test.com', role: 'teacher', status: 'active' });

        const result = await registerTeacher('Jane', 'jane@test.com', 'password123');

        expect(createUser).toHaveBeenCalledWith('Jane', 'jane@test.com', expect.any(String), 'teacher');
        expect(result.user.role).toBe('teacher');
    });

    it('should throw 409 if teacher email already exists', async () => {
        findByEmail.mockResolvedValue({ id: 1, email: 'jane@test.com' });

        await expect(registerTeacher('Jane', 'jane@test.com', 'password123'))
            .rejects.toThrow('Email is already in use!');
    });
});

describe('refreshAccessToken', () => {
    it('should return a new access token for a valid refresh token', async () => {
        const refreshToken = jwt.sign({ id: 1 }, 'test-refresh-secret', { expiresIn: '7d' });
        findRefreshToken.mockResolvedValue({ id: 1, user_id: 1, token: refreshToken });

        const accessToken = await refreshAccessToken(refreshToken);

        expect(accessToken).toBeDefined();
        const decoded = jwt.verify(accessToken, 'test-secret');
        expect(decoded.id).toBe(1);
    });

    it('should throw 401 if refresh token not found in DB', async () => {
        findRefreshToken.mockResolvedValue(null);

        await expect(refreshAccessToken('invalid-token'))
            .rejects.toThrow('Invalid or revoked refresh token');
    });

    it('should throw 401 and delete token if refresh token is expired', async () => {
        const expiredToken = jwt.sign({ id: 1 }, 'test-refresh-secret', { expiresIn: '0s' });
        findRefreshToken.mockResolvedValue({ id: 1, user_id: 1, token: expiredToken });
        deleteRefreshToken.mockResolvedValue();

        // Wait a moment so the token is truly expired
        await new Promise(r => setTimeout(r, 10));

        await expect(refreshAccessToken(expiredToken))
            .rejects.toThrow('Invalid or Expired token');

        expect(deleteRefreshToken).toHaveBeenCalledWith(expiredToken);
    });
});
