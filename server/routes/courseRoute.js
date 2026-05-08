import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {create, getAll, getById, getByTitle, remove, update, getByTeacher} from "../controllers/courseController.js";
import { validate } from "../middleware/requestValidate.js";
import { createCourseSchema, updateCourseSchema } from "../validators/courseValidators.js";

const router = express.Router();

// Create a course
router.post("/", protect, authorize("admin", "teacher"), validate(createCourseSchema), create);

// Get all courses
router.get("/", protect, getAll);

// Get course by id
router.get("/:id", protect, getById);

// Get course by title
router.get("/title/:title", protect, getByTitle);

// Delete a course
router.delete("/:id", protect, authorize("admin", "teacher"), remove);

// Update a course
router.patch("/:id", protect, authorize("admin", "teacher"), validate(updateCourseSchema), update);

// Get courses by teacher
router.get("/teacher/:teacherId", protect, getByTeacher);

export default router;