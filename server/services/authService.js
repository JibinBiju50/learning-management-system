import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findByEmail, findById, updateUser, createUser } from '../models/userModel.js'
import { JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN } from '../config/env.js'
import { deleteRefreshToken, findRefreshToken, saveRefreshToken } from '../models/refreshTokenModel.js';

const SALT_ROUND = 10;

//Issue both access token and refresh token
export const issueToken = async (userId) => {
    const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const refreshToken = jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

    return { accessToken, refreshToken };
}

//Register new user: hash password and sign a token
export const registerUser = async (name, email, password) => {
    //check whether the email already exist
    const existingUser = await findByEmail(email)

    if (existingUser) {
        const error = new Error("Email is already in use!");
        error.status = 409;
        throw error
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND)

    //Insert new user to database
    const user = await createUser(name, email, hashedPassword);

    //issue both tokens
    const { accessToken, refreshToken } = await issueToken(user.id);

    //persist refresh token so it can be validated and revoked later
    await saveRefreshToken(user.id, refreshToken);

    return { user, accessToken, refreshToken };
}

//Login: verify password and return token
export const loginUser = async (email, password) => {
    //Fetch the user record
    const user = await findByEmail(email);
    if (!user) {
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }

    if (user.status === 'inactive') {
        const error = new Error("Your account has been deactivated");
        error.status = 403;
        throw error;
    }

    //compare the entered password with hasged password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }

    const { accessToken, refreshToken } = await issueToken(user.id);

    await saveRefreshToken(user.id, refreshToken);

    //return user details and token excluding password
    const { password_hash: _pw, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken };
}

//calls during teacher account registration
export const registerTeacher = async (name, email, password) => {
    //check whether the email already exist
    const existingUser = await findByEmail(email)

    if (existingUser) {
        const error = new Error("Email is already in use!");
        error.status = 409;
        throw error
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND)

    //Insert new user to database
    const user = await createUser(name, email, hashedPassword, 'teacher');

    return { user };
}

//Calls when client sends the refresh token to get a new access token
export const refreshAccessToken = async (token) => {
    const stored = await findRefreshToken(token);

    if (!stored) {
        const error = new Error("Invalid or revoked refresh token");
        error.status = 401;
        throw error;
    }

    try {
        //verify signature and expiry
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET);

        //issue a new shoert lived access token only
        const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return accessToken;

    } catch (err) {
        await deleteRefreshToken(token);

        const error = new Error("Invalid or Expired token");
        error.status = 401;
        throw error;
    }
}

export const updateUserProfile = async (userId, body) => {
    const { name, email, currentPassword, newPassword } = body;

    const allowedFields = ['name'];
    const updates = {};

    for (const field of allowedFields) {
        if (body[field] !== undefined) {
            updates[field] = body[field];
        }
    }

    // if email is changing, check it's not already taken
    if (email) {
        const existing = await findByEmail(email);
        if (existing && existing.id !== userId) {
            const error = new Error("Email is already in use");
            error.status = 409;
            throw error;
        }
    }

    // handle password change
    if (newPassword) {
        if (!currentPassword) {
            const error = new Error("Current password is required");
            error.status = 400;
            throw error;
        }

        const user = await findById(userId);
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        const match = await bcrypt.compare(currentPassword, user.password_hash);
        if (!match) {
            const error = new Error("Current password is incorrect");
            error.status = 401;
            throw error;
        }

        updates.password_hash = await bcrypt.hash(newPassword, SALT_ROUND);
    }

    if (Object.keys(updates).length === 0) {
        const error = new Error("No fields to update");
        error.status = 400;
        throw error;
    }

    const updatedUser = await updateUser(userId, updates);
    return updatedUser;
};

//called on logout
export const logoutUser = async (token) => {
    await deleteRefreshToken(token);
}

