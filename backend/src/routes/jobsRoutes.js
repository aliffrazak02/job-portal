import { Router } from 'express';
import { body } from 'express-validator';
import { createJob, getJobs, updateJob, deleteJob } from '../controllers/jobsController.js';
import protect, { authorizeRoles } from '../middleware/authMiddleware.js';
import { param } from 'express-validator';

const router = Router();

/*
    CRUD operations for job listings
*/

router.post(
  '/',
  protect,
  authorizeRoles('employer'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('company').notEmpty().withMessage('Company is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('workType')
      .notEmpty()
      .withMessage('Work type is required')
      .isIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
      .withMessage('Invalid work type'),
  ],
  createJob
);

router.get('/', getJobs);

router.put(
  '/:id',
  protect,
  authorizeRoles('employer'),
  [
    param('id').isMongoId().withMessage('Invalid job id'),
    body('workType')
      .optional()
      .isIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
      .withMessage('Invalid work type'),
  ],
  updateJob
);

router.delete(
  '/:id',
  protect,
  authorizeRoles('employer'),
  param('id').isMongoId().withMessage('Invalid job id'),
  deleteJob
);

export default router;
