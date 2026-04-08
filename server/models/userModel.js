import { query } from "../config/dbConfig.js";

//to create table if not exist
export const createUserTable = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role VARCHAR(20) DEFAULT 'student',
      status VARCHAR(20) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

//to find user by email
export const findByEmail = async (email) => {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
}

//function to find user by ID
export const findById = async (id) => {
    const result = await query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
}

//to get All users
export const getAllUsers = async () => {
  const result = await query("SELECT id, name, email, role, status, created_at FROM users");
  return result.rows;
}

//to deactivate a user
export const deactivateUserInDB = async (id) => {
  const result = await query("UPDATE users SET status = 'inactive' WHERE id = $1 RETURNING id, name, email, role, status", [id]);
  return result.rows[0];
}

export const activateUserInDB = async (id) => {
  const result = await query("UPDATE users SET status = 'active' WHERE id = $1 RETURNING id, name, email, role, status", [id]);
  return result.rows[0];
}

//to create a new user account
export const createUser = async (name, email, hashedPassword, role='student') => {
    const result = await query("INSERT INTO users (name, email, password_hash, role, status, created_at) VALUES ($1, $2, $3, $4, 'active', NOW()) RETURNING id, name, email, role, status, created_at", [name, email, hashedPassword, role]);
    
    return result.rows[0];
}

//to update user info
export const updateUser = async (id, updates) => {
  const fields = Object.keys(updates);

  if(fields.length === 0) return null;

  const setClauses = fields.map((field, i)=> `${field} = $${i+1}`);
  const values = fields.map(field => updates[field]);

  const sql = `UPDATE users SET ${setClauses.join(", ")} WHERE id = $${fields.length+1} RETURNING id, name, email, role, status`;

  const result = await query(sql, [...values, id]);
  return result.rows[0];
}
