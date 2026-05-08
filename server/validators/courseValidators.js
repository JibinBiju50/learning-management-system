import Joi from "joi";

// Schema for creating a course
export const createCourseSchema = Joi.object({
    teacherId: Joi.number().integer(),
    title: Joi.string().max(255).required(),
    description: Joi.string().allow("").required(),
    price: Joi.number().precision(2).min(0).required()
});

// Schema for updating a course (all fields optional, but at least one required)
export const updateCourseSchema = Joi.object({
    title: Joi.string().max(255),
    description: Joi.string().allow(""),
    price: Joi.number().precision(2).min(0),
    status: Joi.string().valid("draft", "published", "archived")
}).min(1);