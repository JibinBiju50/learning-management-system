import { createNewCourse, findCourseById, findCourseByTitle, getAllCoursesModel, deleteCourseModel, updateCourseModel, getCoursesByTeacherModel} from "../models/courseModel.js"
import { findById } from "../models/userModel.js";

export const createCourse = async (teacherId, title, description, price) => {
    if (!teacherId || !title || !description || !price){
        const error = new Error("All fields are required");
        error.status = 400;
        throw error;
    }

    const teacher = await findById(teacherId);
    if (!teacher) {
        const error = new Error("Teacher not found");
        error.status = 404;
        throw error;
    }

    const course = await createNewCourse(teacherId, title, description, price);

    if(!course){
        const error = new Error("Failed to create course");
        error.status = 500;
        throw error;
    }
    return course;
}

export const getAllCourses = async () => {
    try {
        const courses = await getAllCoursesModel();
        console.log("Courses fetched:", courses);
        return courses;
    } catch (err) {
        console.error("Database error:", err);
        const error = new Error("Failed to fetch courses");
        error.status = 500;
        throw error;
    }
}

export const getCourseDetails = async (id) => {
    
    const course = await findCourseById(id);

    if(!course){
        const error = new Error("Course not found");
        error.status = 404;
        throw error;
    }

    return course;
}

export const getCourseByTitle = async (title) => {
    if (!title) {
        const error = new Error("Course title is required");
        error.status = 400;
        throw error;
    }

    const course = await findCourseByTitle(title);

    if (!course) {
        const error = new Error("Course not found");
        error.status = 404;
        throw error;
    }

    return course;
}

export const deleteCourse = async (id) => {
    if (!id) {
        const error = new Error("Course id is required");
        error.status = 400;
        throw error;
    }

    const course = await findCourseById(id);
    if (!course) {
        const error = new Error("Course not found");
        error.status = 404;
        throw error;
    }

    const deleted = await deleteCourseModel(id);
    if (!deleted) {
        const error = new Error("Failed to delete course");
        error.status = 500;
        throw error;
    }

    return deleted;
}

export const updateCourse = async (id, updates) => {
    if (!id) {
        const error = new Error("Course id is required");
        error.status = 400;
        throw error;
    }

    if (!updates || Object.keys(updates).length === 0) {
        const error = new Error("No update fields provided");
        error.status = 400;
        throw error;
    }

    const course = await findCourseById(id);
    if (!course) {
        const error = new Error("Course not found");
        error.status = 404;
        throw error;
    }

    const updated = await updateCourseModel(id, updates);
    if (!updated) {
        const error = new Error("Failed to update course");
        error.status = 500;
        throw error;
    }

    return updated;
}

export const getCoursesByTeacher = async (teacherId) => {
    if (!teacherId) {
        const error = new Error("Teacher id is required");
        error.status = 400;
        throw error;
    }

    const courses = await getCoursesByTeacherModel(teacherId);

    return courses;
}