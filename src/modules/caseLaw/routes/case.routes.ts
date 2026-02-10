import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import {
  searchCases,
  getCaseDetails,
  getSavedCases,
  toggleSaveCase,
  getAllCases,
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
 * /api/v1/cases/all:
 *   get:
 *     summary: Get all cases (no filters)
 *     tags: [Case Law]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Retrieves all published cases with pagination.
 *
 *       **SORTING:**
 *       - Primary: Exam frequency (HIGH → MEDIUM → RARE → NOT_EXAMINED)
 *       - Secondary: Year (newest first)
 *
 *       **PAGINATION:**
 *       - Default: 20 cases per page
 *       - Max: 100 cases per page
 *
 *       **USE CASES:**
 *       - Display full case library
 *       - Browse all cases without filters
 *       - Case law directory page
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           minimum: 1
 *           maximum: 100
 *         description: Cases per page
 *     responses:
 *       200:
 *         description: All cases retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: All cases retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     cases:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           caseName:
 *                             type: string
 *                             example: Carlill v Carbolic Smoke Ball Co
 *                           citation:
 *                             type: string
 *                             example: "[1893] 1 QB 256"
 *                           year:
 *                             type: integer
 *                             example: 1893
 *                           court:
 *                             type: string
 *                             example: UK Court of Appeal
 *                           jurisdiction:
 *                             type: string
 *                             enum: [IRISH_SUPREME_COURT, IRISH_COURT_OF_APPEAL, IRISH_HIGH_COURT, UK_SUPREME_COURT, UK_COURT_OF_APPEAL, UK_HOUSE_OF_LORDS, ECJ_CJEU, ECHR]
 *                           frequency:
 *                             type: string
 *                             enum: [HIGH_FREQUENCY, MEDIUM_FREQUENCY, RARE, NOT_EXAMINED]
 *                           subjects:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["Contract Law"]
 *                           topics:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["Offer & Acceptance", "Unilateral Contracts"]
 *                           facts:
 *                             type: string
 *                           isSaved:
 *                             type: boolean
 *                             example: false
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 7
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 20
 *                         totalPages:
 *                           type: integer
 *                           example: 1
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