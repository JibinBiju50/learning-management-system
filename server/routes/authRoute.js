import express from 'express'
import { login, logout, profile, refresh, register, updateProfile } from '../controllers/authController.js';
import Joi from 'joi';
import { validate } from '../middleware/requestValidate.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


//define validation schemas using joi
const registerSchema = Joi.object({
    name: Joi.string().max(200).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required() 
})

//define the routes
router.post('/register',validate(registerSchema) ,register);

router.post('/login',validate(loginSchema) ,login);

router.get('/me', protect ,profile);

router.patch('/me', protect, updateProfile);

router.post('/refresh', refresh);

router.post('/logout', logout);

export default router;