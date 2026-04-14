import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../models/userModel.js', () => ({
    getAllUsers: vi.fn(),
    findById: vi.fn(),
    deactivateUserInDB: vi.fn(),
    activateUserInDB: vi.fn(),
}));

import { getAllUsers, findById, deactivateUserInDB, activateUserInDB } from '../models/userModel.js';
import { getUsers, deactivateUser, activateUser } from '../services/userService.js';

beforeEach(() => {
    vi.clearAllMocks();
});

describe('getUsers', () => {
    it('should return all users', async () => {
        const mockUsers = [
            { id: 1, name: 'Admin', role: 'admin', status: 'active' },
            { id: 2, name: 'Student', role: 'student', status: 'active' },
        ];
        getAllUsers.mockResolvedValue(mockUsers);

        const result = await getUsers();

        expect(getAllUsers).toHaveBeenCalled();
        expect(result).toEqual(mockUsers);
        expect(result).toHaveLength(2);
    });
});

describe('deactivateUser', () => {
    it('should deactivate an active user', async () => {
        findById.mockResolvedValue({ id: 2, name: 'Student', status: 'active' });
        deactivateUserInDB.mockResolvedValue({ id: 2, name: 'Student', status: 'inactive' });

        const result = await deactivateUser(2);

        expect(findById).toHaveBeenCalledWith(2);
        expect(deactivateUserInDB).toHaveBeenCalledWith(2);
        expect(result.status).toBe('inactive');
    });

    it('should throw 400 if no userId provided', async () => {
        await expect(deactivateUser(undefined))
            .rejects.toThrow('User id is required');
    });

    it('should throw 404 if user not found', async () => {
        findById.mockResolvedValue(undefined);

        await expect(deactivateUser(999))
            .rejects.toThrow('User not found');
    });

    it('should throw 409 if user is already inactive', async () => {
        findById.mockResolvedValue({ id: 2, name: 'Student', status: 'inactive' });

        await expect(deactivateUser(2))
            .rejects.toThrow('User is already inactive');
    });
});

describe('activateUser', () => {
    it('should activate an inactive user', async () => {
        findById.mockResolvedValue({ id: 2, name: 'Student', status: 'inactive' });
        activateUserInDB.mockResolvedValue({ id: 2, name: 'Student', status: 'active' });

        const result = await activateUser(2);

        expect(findById).toHaveBeenCalledWith(2);
        expect(activateUserInDB).toHaveBeenCalledWith(2);
        expect(result.status).toBe('active');
    });

    it('should throw 400 if no userId provided', async () => {
        await expect(activateUser(undefined))
            .rejects.toThrow('User id is required');
    });

    it('should throw 404 if user not found', async () => {
        findById.mockResolvedValue(undefined);

        await expect(activateUser(999))
            .rejects.toThrow('User not found');
    });

    it('should throw 409 if user is already active', async () => {
        findById.mockResolvedValue({ id: 2, name: 'Student', status: 'active' });

        await expect(activateUser(2))
            .rejects.toThrow('User is already active');
    });
});
