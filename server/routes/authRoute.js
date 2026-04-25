import express from 'express'
import { login, logout, profile, refresh, register, updateProfile } from '../controllers/authController.js';
import { registerSchema, loginSchema } from '../validators/authValidators.js';
import { validate } from '../middleware/requestValidate.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


//define the routes
router.post('/register',validate(registerSchema) ,register);

router.post('/login',validate(loginSchema) ,login);

router.get('/me', protect ,profile);

router.patch('/me', protect, updateProfile);

router.post('/refresh', refresh);

router.post('/logout', logout);

export default router;