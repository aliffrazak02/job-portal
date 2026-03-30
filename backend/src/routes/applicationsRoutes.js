import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  upload,
  submitApplication,
  getMyApplications,
  updateApplicationStatus,
} from '../controllers/applicationsController.js';
import protect, { authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.post(
  '/',
  protect,
  authorizeRoles('jobseeker'),
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 },
  ]),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('phone')
      .matches(/^\+?[\d\s\-().]{7,15}$/)
      .withMessage('Please provide a valid phone number'),
    body('jobId').notEmpty().withMessage('Job ID is required'),
  ],
  submitApplication
);

router.get('/my', protect, authorizeRoles('jobseeker'), getMyApplications);

router.patch(
  '/:id/status',
  protect,
  authorizeRoles('employer'),
  [
    param('id').isMongoId().withMessage('Invalid application id'),
    body('status')
      .isIn(['pending', 'reviewed', 'shortlisted', 'rejected'])
      .withMessage('Status must be one of: pending, reviewed, shortlisted, rejected'),
  ],
  updateApplicationStatus
);

export default router;
