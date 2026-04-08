import { query } from "../config/dbConfig.js";

export const createRefreshTokenTable = async () => {
    await query(`
        CREATE TABLE IF NOT EXISTS refresh_token (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            token TEXT NOT NULL,
            expires_at TIMESTAMP NOT NULL
        );
    `);
};

export const saveRefreshToken = async (userId, token) => {
    const result = await query('INSERT INTO refresh_token (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'7 days\')', [userId, token]);
    return result.rows[0];
}
//calls on logout
export const deleteRefreshToken = async (token) => {
    const result = await query('DELETE FROM refresh_token WHERE token = $1', [token]);
    return result.rows[0];
}

//calls on refresh token expiry
export const deletedExpiredToken = async (token) => {
    await query('DELETE FROM refresh_token WHERE expires_at < NOW()');
}


export const findRefreshToken = async (token) => {
    const result = await query('SELECT * FROM refresh_token WHERE token = $1', [token]);
    return result.rows[0];    
}

//Called when user changes the password : invalidate all sessions
export const deleteAllRefreshToken = async (userId) => {
    const result = await query('DELETE FROM refresh_token WHERE user_id = $1', [userId]);
    return result.rows[0];
}