import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import { searchCases } from '../controller/case.controller';
import { searchCasesSchema } from '../validator/case.validator';

const caseRouter = Router();

/**
 * @swagger
 * /cases:
 *   get:
 *     summary: Search and filter case law
 *     tags: [Case Law]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by case name, citation, or topic
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject (e.g., "Contract Law")
 *       - in: query
 *         name: jurisdiction
 *         schema:
 *           type: string
 *           enum: [IRISH_SUPREME_COURT, IRISH_COURT_OF_APPEAL, IRISH_HIGH_COURT, UK_SUPREME_COURT, UK_COURT_OF_APPEAL, UK_HOUSE_OF_LORDS, ECJ_CJEU, ECHR]
 *       - in: query
 *         name: frequency
 *         schema:
 *           type: string
 *           enum: [HIGH_FREQUENCY, MEDIUM_FREQUENCY, RARE, NOT_EXAMINED]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Cases retrieved successfully
 */
router.get('/', protect, validate(searchCasesSchema), searchCases);

export default caseRouter;
