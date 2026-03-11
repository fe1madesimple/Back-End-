import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import {
  getCaseFilters,
  searchCases,
  getCaseDetails,
  getSavedCases,
  toggleSaveCase,
  toggleReview,
} from '../controller/case.controller';

const caseRouter = Router();

/**
 * @swagger
 * /api/v1/cases/filters:
 *   get:
 *     summary: Get all filter options for case law library
 *     tags: [Case Law]
 *     security:
 *       - bearerAuth: []
 *     description: Returns all available filter values — years, case names, jurisdictions, citations, and frequency options. Call this on library page load to populate dropdowns.
 *     responses:
 *       200:
 *         description: Filters retrieved successfully
 */
caseRouter.get('/filters', protect, getCaseFilters);

/**
 * @swagger
 * /api/v1/cases/saved:
 *   get:
 *     summary: Get user's saved cases
 *     tags: [Case Law]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter saved cases by subject
 *     responses:
 *       200:
 *         description: Saved cases retrieved successfully
 */
caseRouter.get('/saved', protect, getSavedCases);

/**
 * @swagger
 * /api/v1/cases:
 *   get:
 *     summary: Search and filter case law library
 *     tags: [Case Law]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Full text search across case name, citation, topics, summary
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *       - in: query
 *         name: jurisdiction
 *         schema:
 *           type: string
 *           enum: [IRELAND, UNITED_KINGDOM, AUSTRALIA, UNITED_STATES, NEW_ZEALAND, EUROPEAN_UNION, ECHR, CANADA, INTERNATIONAL, ENGLAND, ENGLAND_AND_WALES, SCOTLAND, NORTHERN_IRELAND, OTHER]
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *       - in: query
 *         name: caseName
 *         schema:
 *           type: string
 *       - in: query
 *         name: citation
 *         schema:
 *           type: string
 *       - in: query
 *         name: frequency
 *         schema:
 *           type: string
 *           enum: [High, Low]
 *         description: High = isFrequentlyTested true, Low = false
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
 *         description: Cases retrieved successfully
 */
caseRouter.get('/', protect, searchCases);

/**
 * @swagger
 * /api/v1/cases/{id}:
 *   get:
 *     summary: Get full case detail
 *     tags: [Case Law]
 *     security:
 *       - bearerAuth: []
 *     description: Returns full summary, legal principle, key quote, metadata, and save status.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case details retrieved successfully
 *       404:
 *         description: Case not found
 */
caseRouter.get('/:id', protect, getCaseDetails);

/**
 * @swagger
 * /api/v1/cases/{id}/save:
 *   post:
 *     summary: Toggle save/unsave case for revision
 *     tags: [Case Law]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case saved or unsaved
 *       404:
 *         description: Case not found
 */
caseRouter.post('/:id/save', protect, toggleSaveCase);

/**
 * @swagger
 * /api/v1/cases/{caseId}/toggle-review:
 *   post:
 *     summary: Toggle reviewed status on a saved case
 *     tags: [Case Law]
 *     security:
 *       - bearerAuth: []
 *     description: Case must be saved first. Toggles lastReviewedAt between now and null.
 *     parameters:
 *       - in: path
 *         name: caseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review status updated
 *       404:
 *         description: Case not saved
 */
caseRouter.post('/:caseId/toggle-review', protect, toggleReview);

export default caseRouter;
