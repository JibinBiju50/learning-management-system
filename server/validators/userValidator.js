import Joi from "joi";

export const createTeacherSchema = Joi.object({
    name: Joi.string().max(200).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});