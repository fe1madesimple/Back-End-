// src/modules/practise/practise.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import { getPastQuestions } from '../controller/practise.controller';
import { pastQuestionsQuerySchema } from '../validators/practise.validators';

const practiceRouter = Router();

/**
 * @swagger
 * /api/v1/practice/past-questions:
 *   get:
 *     summary: Get past exam questions with filters
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword across question text, description, and subject
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject e.g. "Contract Law"
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter by exam year e.g. 2023
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 9
 *     responses:
 *       200:
 *         description: Past questions retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           subject:
 *                             type: string
 *                           year:
 *                             type: integer
 *                           examType:
 *                             type: string
 *                           description:
 *                             type: string
 *                           text:
 *                             type: string
 *                           order:
 *                             type: integer
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *                     filters:
 *                       type: object
 *                       properties:
 *                         subjects:
 *                           type: array
 *                           items:
 *                             type: string
 *                         years:
 *                           type: array
 *                           items:
 *                             type: integer
 */
practiceRouter.get(
  '/past-questions',
  protect,
  validate(pastQuestionsQuerySchema),
  getPastQuestions
);

export default practiceRouter;
