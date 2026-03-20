import { Router } from 'express';
import { upload, submitApplication } from '../controllers/applicationsController.js';

const router = Router();

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Submit a job application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, email, jobTitle, resume]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               jobTitle:
 *                 type: string
 *               resume:
 *                 type: string
 *                 format: binary
 *               coverLetter:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Application submitted
 *       400:
 *         description: Validation error
 */
router.post(
  '/',
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 },
  ]),
  submitApplication
);

export default router;
