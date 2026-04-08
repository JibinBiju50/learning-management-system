import express from 'express'
import { registerTeacherAccount } from '../controllers/authController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import Joi from 'joi';
import { validate } from '../middleware/requestValidate.js';
import { activate, AllUsers, deactivate } from '../controllers/userController.js';
const router = express.Router();

const createTeacherSchema = Joi.object({
    name: Joi.string().max(200).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

router.post('/', protect, authorize('admin'),validate(createTeacherSchema) ,registerTeacherAccount);

router.get('/', protect, authorize('admin'), AllUsers);

router.patch('/:id/deactivate', protect, authorize('admin'), deactivate);

router.patch('/:id/activate', protect, authorize('admin'), activate);

export default router;