import Joi from "joi";

//define validation schemas using joi
export const registerSchema = Joi.object({
    name: Joi.string().max(200).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required() 
})