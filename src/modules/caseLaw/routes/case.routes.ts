import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import {
  searchCases,
  getCaseDetails,
  getSavedCases,
  toggleSaveCase,
  getAllCases,
  toggleReview
} from '../controller/case.controller';
import {
  searchCasesSchema,
  getCaseDetailsSchema,
  getSavedCasesSchema,
  saveCaseSchema,
  getAllCasesSchema,
} from '../validator/case.validator';

const caseRouter = Router();

/**
 * @swagger
 * /api/v1/cases:
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
caseRouter.get('/', protect, validate(searchCasesSchema), searchCases);


/**
 * @swagger
 * /api/v1/cases:
 *   get:
 *     summary: Get all cases
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     description: Returns paginated case briefs with save/review status.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Cases retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cases:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       caseName:
 *                         type: string
 *                       citation:
 *                         type: string
 *                       year:
 *                         type: integer
 *                       court:
 *                         type: string
 *                       jurisdiction:
 *                         type: string
 *                       frequency:
 *                         type: string
 *                       subjects:
 *                         type: array
 *                         items:
 *                           type: string
 *                       topics:
 *                         type: array
 *                         items:
 *                           type: string
 *                       facts:
 *                         type: string
 *                       isSaved:
 *                         type: boolean
 *                       isReviewed:
 *                         type: boolean
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
caseRouter.get('/all', protect, validate(getAllCasesSchema), getAllCases);

/**
 * @swagger
 * /api/v1/cases/saved:
 *   get:
 *     summary: Get all saved cases
 *     tags: [Case Law]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject
 *     responses:
 *       200:
 *         description: Saved cases retrieved successfully
 */
caseRouter.get('/saved', protect, validate(getSavedCasesSchema), getSavedCases);

/**
 * @swagger
 * /api/v1/cases/{id}:
 *   get:
 *     summary: Get case details with all tabs
 *     tags: [Case Law]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Case ID
 *     responses:
 *       200:
 *         description: Case details retrieved
 *       404:
 *         description: Case not found
 */
caseRouter.get('/:id', protect, validate(getCaseDetailsSchema), getCaseDetails);


/**
 * @swagger
 * /api/v1/cases/{caseId}/toggle-review:
 *   post:
 *     summary: Toggle case review status
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     description: Marks saved case as reviewed/unreviewed.
 *     parameters:
 *       - in: path
 *         name: caseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isReviewed:
 *                   type: boolean
 *                 lastReviewedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *       404:
 *         description: Case not saved
 */
caseRouter.post('/:caseId/toggle-review', protect, toggleReview);


/**
 * @swagger
 * /api/v1/cases/{id}/save:
 *   post:
 *     summary: Save or unsave case for revision
 *     tags: [Case Law]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Case ID
 *     responses:
 *       200:
 *         description: Case saved/unsaved successfully
 *       404:
 *         description: Case not found
 */
caseRouter.post('/:id/save', protect, validate(saveCaseSchema), toggleSaveCase);


export default caseRouter;