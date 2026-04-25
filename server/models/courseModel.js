import { query } from "../config/dbConfig.js";

//to create table if not exist
export const createCourseTable = async () => {
    await query(`
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      teacher_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) DEFAULT 0.00,
      status VARCHAR(20) DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const createNewCourse = async (teacherId, title, description, price) => {
    const result = await query(`INSERT INTO courses(teacher_id, title, description, price) VALUES ($1, $2, $3, $4) RETURNING *`, [teacherId, title, description, price]);
    return result.rows[0];
}

export const deleteCourseModel = async (id) => {
    const result = await query(`DELETE FROM courses WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
}

export const findCourseById = async (id) => {
    const result = await query(
        `SELECT courses.*, users.name AS teacher_name
         FROM courses
         JOIN users ON courses.teacher_id = users.id
         WHERE courses.id = $1`,
        [id]
    );
    return result.rows[0];
}

export const findCourseByTitle = async (title) => {
    const result = await query(
        `SELECT courses.*, users.name AS teacher_name
         FROM courses
         JOIN users ON courses.teacher_id = users.id
         WHERE courses.title = $1`,
        [title]
    );
    return result.rows[0];
}

export const getAllCoursesModel = async () => {
    const result = await query(`SELECT courses.*, users.name AS teacher_name FROM courses JOIN users on courses.teacher_id = users.id`);
    return result.rows;
}

export const getCoursesByTeacherModel = async (teacherId) => {
    const result = await query(
        "SELECT * FROM courses WHERE teacher_id = $1 ORDER BY created_at DESC",
        [teacherId]
    );
    return result.rows;
};

export const updateCourseModel = async (id, updates) => {
    // Only allow these fields to be updated
    const allowedFields = ['title', 'description', 'price', 'status'];
    const fields = Object.keys(updates).filter(field => allowedFields.includes(field));
    if (fields.length === 0) return null;

    const setClauses = fields.map((field, i) => `${field} = $${i + 1}`);
    const values = fields.map(field => updates[field]);

    const result = await query(
        `UPDATE courses SET ${setClauses.join(", ")} WHERE id = $${fields.length + 1} RETURNING *`,
        [...values, id]
    );
    return result.rows[0];
};

