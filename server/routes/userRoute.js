import express from 'express'
import { registerTeacherAccount } from '../controllers/authController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { createTeacherSchema } from '../validators/userValidator.js';
import { validate } from '../middleware/requestValidate.js';
import { activate, AllUsers, deactivate } from '../controllers/userController.js';
const router = express.Router();



router.post('/', protect, authorize('admin'),validate(createTeacherSchema) ,registerTeacherAccount);

router.get('/', protect, authorize('admin'), AllUsers);

router.patch('/:id/deactivate', protect, authorize('admin'), deactivate);

router.patch('/:id/activate', protect, authorize('admin'), activate);

export default router;