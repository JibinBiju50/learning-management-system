import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../models/courseModel.js", () => ({
    createNewCourse: vi.fn(),
    getAllCoursesModel: vi.fn(),
    findCourseById: vi.fn(),
    findCourseByTitle: vi.fn(),
    deleteCourseModel: vi.fn(),
    updateCourseModel: vi.fn(),
    getCoursesByTeacherModel: vi.fn()
}));

vi.mock("../models/userModel.js", () => ({
    findById: vi.fn(),
}));

import { createCourse, getAllCourses, getCourseDetails, getCourseByTitle, deleteCourse, updateCourse, getCoursesByTeacher } from "../services/courseService";
import { findById } from "../models/userModel";
import { createNewCourse, deleteCourseModel, findCourseById, findCourseByTitle, getAllCoursesModel, getCoursesByTeacherModel, updateCourseModel } from "../models/courseModel";

beforeEach(() => {
    vi.clearAllMocks();
});

describe('createCourse', () => {
    it('should create a course successfully', async () => {
        findById.mockResolvedValue({
            id: 2,
            name: 'teacherName',
            email: 'teacher@gmail.com',
            role: 'teacher',
            status: 'active',
            created_at: '2026-03-30T09:24:31.490Z'
        });
        createNewCourse.mockResolvedValue({ id: 1, teacher_id: 2, title: 'courseTitle', description: 'test description', price: 59.00 });

        const result = await createCourse(2, 'courseTitle', 'test description', 59.00);

        expect(result).toHaveProperty('id');
        expect(createNewCourse).toHaveBeenCalledWith(2, 'courseTitle', 'test description', 59.00);
    });

    it('should throw error if required fields are missing', async () => {
        await expect(createCourse()).rejects.toThrow('All fields are required');
    });

    it('should throw error if teacher not found', async () => {
        findById.mockResolvedValue(null);
        await expect(createCourse(2, 'courseTitle', 'test description', 59.00)).rejects.toThrow('Teacher not found');
    });
});

describe('getAllCourses', () => {
    it('should fetch all courses', async () => {
        getAllCoursesModel.mockResolvedValue([{ 
            id: 1, teacher_id: 2, title: 'CSS', description: 'CSS beginner course', price: '49.00', status: 'draft', created_at: '2026-04-18T08:25:23.152Z', teacher_name: 'Sudha' }, 
            { id: 2, teacher_id: 4, title: 'Java', description: 'Java beginner course', price: '79.00', status: 'draft', created_at: '2026-04-12T08:25:23.152Z', teacher_name: 'Kiran'              
            }]);
        const result = await getAllCourses();
        expect(result.length).toBe(2);
    });

    it('should throw error if db fails', async () => {
        getAllCoursesModel.mockRejectedValue(new Error('DB error'));
        await expect(getAllCourses()).rejects.toThrow('Failed to fetch courses');
    });
});

describe('getCourseDetails', () => {
    it('should return details of a course by id', async () => {
        findCourseById.mockResolvedValue({
            id: 1,
            teacher_id: 4,
            title: 'HTML',
            description: 'HTML beginner to advanced',
            price: '59.00',
            status: 'draft',
            created_at: '2026-04-18T08:25:23.152Z',
            teacher_name: 'Sudha'
        });
        const result = await getCourseDetails(1);
        expect(result).toHaveProperty('id', 1);
        expect(result).toHaveProperty('title', 'HTML');
    });

    it('should throw error if course not found', async () => {
        findCourseById.mockResolvedValue(null);
        await expect(getCourseDetails(1)).rejects.toThrow('Course not found');
    });
});

describe('getCourseByTitle', () => {
    it('should return course by title', async () => {
        findCourseByTitle.mockResolvedValue({
            id: 1,
            teacher_id: 4,
            title: 'HTML',
            description: 'HTML beginner to advanced',
            price: '59.00',
            status: 'draft',
            created_at: '2026-04-18T08:25:23.152Z',
            teacher_name: 'Sudha'
        });
        const result = await getCourseByTitle('HTML');
        expect(result).toHaveProperty('title', 'HTML');
    });

    it('should throw error if title is missing', async () => {
        await expect(getCourseByTitle()).rejects.toThrow('Course title is required');
    });

    it('should throw error if course not found', async () => {
        findCourseByTitle.mockResolvedValue(null);
        await expect(getCourseByTitle('Test')).rejects.toThrow('Course not found');
    });
});

describe('deleteCourse', () => {
    it('should delete a course', async () => {
        findCourseById.mockResolvedValue({ id: 1 });
        deleteCourseModel.mockResolvedValue({ id: 1 });
        const result = await deleteCourse(1);
        expect(result).toHaveProperty('id', 1);
    });

    it('should throw error if id is missing', async () => {
        await expect(deleteCourse()).rejects.toThrow('Course id is required');
    });

    it('should throw error if course not found', async () => {
        findCourseById.mockResolvedValue(null);
        await expect(deleteCourse(1)).rejects.toThrow('Course not found');
    });

    it('should throw error if delete fails', async () => {
        findCourseById.mockResolvedValue({ id: 1 });
        deleteCourseModel.mockResolvedValue(null);
        await expect(deleteCourse(1)).rejects.toThrow('Failed to delete course');
    });
});

describe('updateCourse', () => {
    it('should update a course', async () => {
        findCourseById.mockResolvedValue({ id: 1 });
        updateCourseModel.mockResolvedValue({ id: 1, title: 'Updated' });
        const result = await updateCourse(1, { title: 'Updated' });
        expect(result).toHaveProperty('title', 'Updated');
    });

    it('should throw error if id is missing', async () => {
        await expect(updateCourse()).rejects.toThrow('Course id is required');
    });

    it('should throw error if no updates provided', async () => {
        await expect(updateCourse(1, {})).rejects.toThrow('No update fields provided');
    });

    it('should throw error if course not found', async () => {
        findCourseById.mockResolvedValue(null);
        await expect(updateCourse(1, { title: 'Updated' })).rejects.toThrow('Course not found');
    });

    it('should throw error if update fails', async () => {
        findCourseById.mockResolvedValue({ id: 1 });
        updateCourseModel.mockResolvedValue(null);
        await expect(updateCourse(1, { title: 'Updated' })).rejects.toThrow('Failed to update course');
    });
});

describe('getCoursesByTeacher', () => {
    it('should return courses for a teacher', async () => {
        getCoursesByTeacherModel.mockResolvedValue([{ id: 1 }, { id: 2 }]);
        const result = await getCoursesByTeacher(1);
        expect(result.length).toBe(2);
    });

    it('should throw error if teacherId is missing', async () => {
        await expect(getCoursesByTeacher()).rejects.toThrow('Teacher id is required');
    });
});

