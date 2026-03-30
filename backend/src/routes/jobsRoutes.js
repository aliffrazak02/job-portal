import { Router } from 'express';
import { body, query } from 'express-validator';
import { createJob, getJobs, updateJob, deleteJob } from '../controllers/jobsController.js';
import protect, { authorizeRoles } from '../middleware/authMiddleware.js';
import { param } from 'express-validator';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 664f1a2b3c4d5e6f7a8b9c0d
 *         title:
 *           type: string
 *           example: Frontend Developer
 *         company:
 *           type: string
 *           example: Acme Corp
 *         location:
 *           type: string
 *           example: Vancouver, BC
 *         description:
 *           type: string
 *           example: Build and maintain React applications.
 *         requirements:
 *           type: array
 *           items:
 *             type: string
 *           example: [React, TypeScript, 2+ years experience]
 *         salaryRange:
 *           type: string
 *           example: $80,000 - $100,000
 *         workType:
 *           type: string
 *           enum: [Full-time, Part-time, Contract, Internship]
 *           example: Full-time
 *         postedBy:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     PaginatedJobs:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Job'
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             totalItems:
 *               type: integer
 *               example: 42
 *             totalPages:
 *               type: integer
 *               example: 5
 *             hasNextPage:
 *               type: boolean
 *               example: true
 *             hasPrevPage:
 *               type: boolean
 *               example: false
 */

/**
 * @swagger
 * tags:
 *   - name: Jobs
 *     description: Job listing CRUD endpoints
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job listing
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Requires `employer` role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, company, location, description, workType]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Frontend Developer
 *               company:
 *                 type: string
 *                 example: Acme Corp
 *               location:
 *                 type: string
 *                 example: Vancouver, BC
 *               description:
 *                 type: string
 *                 example: Build and maintain React applications.
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [React, TypeScript]
 *               salaryRange:
 *                 type: string
 *                 example: $80,000 - $100,000
 *               workType:
 *                 type: string
 *                 enum: [Full-time, Part-time, Contract, Internship]
 *                 example: Full-time
 *     responses:
 *       201:
 *         description: Job created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       403:
 *         description: Forbidden — employer role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
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

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: List all job listings (paginated)
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Results per page
 *     responses:
 *       200:
 *         description: Paginated list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedJobs'
 *       400:
 *         description: Validation error on query params
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.get(
  '/',
  [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('page must be an integer greater than or equal to 1'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('limit must be an integer between 1 and 100'),
  ],
  getJobs
);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update a job listing
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Employer only. You can only update your own listings.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the job
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               company:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *               salaryRange:
 *                 type: string
 *               workType:
 *                 type: string
 *                 enum: [Full-time, Part-time, Contract, Internship]
 *     responses:
 *       200:
 *         description: Updated job
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       403:
 *         description: Forbidden — not your listing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
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

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete a job listing
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     description: Employer only. You can only delete your own listings.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the job
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       403:
 *         description: Forbidden — not your listing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.delete(
  '/:id',
  protect,
  authorizeRoles('employer'),
  [param('id').isMongoId().withMessage('Invalid job id')],
  deleteJob
);

export default router;
