import {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getCourseByTitle,
    deleteCourse,
    updateCourse,
    getCoursesByTeacher
} from "../services/courseService.js";

// POST /api/courses
export const create = async (req, res, next) => {
    try {
        const { title, description, price } = req.body;
        const teacherId = req.user.id
        const course = await createCourse(teacherId, title, description, price);
        res.status(201).json({
            message: "Course created successfully",
            course
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/courses
export const getAll = async (req, res, next) => {
    try {
        const courses = await getAllCourses();
        console.log("Courses in controller:", courses);
        res.status(200).json({
            message: "Courses fetched successfully",
            courses
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/courses/:id
export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await getCourseDetails(id);
        res.status(200).json({
            message: "Course fetched successfully",
            course
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/courses/title/:title
export const getByTitle = async (req, res, next) => {
    try {
        const { title } = req.params;
        const course = await getCourseByTitle(title);
        res.status(200).json({
            message: "Course fetched successfully",
            course
        });
    } catch (err) {
        next(err);
    }
};

// DELETE /api/courses/:id
export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await deleteCourse(id);
        res.status(200).json({
            message: "Course deleted successfully",
            deleted
        });
    } catch (err) {
        next(err);
    }
};

// PATCH /api/courses/:id
export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updated = await updateCourse(id, updates);
        res.status(200).json({
            message: "Course updated successfully",
            updated
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/courses/teacher/:teacherId
export const getByTeacher = async (req, res, next) => {
    try {
        const { teacherId } = req.params;
        const courses = await getCoursesByTeacher(teacherId);
        res.status(200).json({
            message: "Courses fetched successfully",
            courses
        });
    } catch (err) {
        next(err);
    }
};