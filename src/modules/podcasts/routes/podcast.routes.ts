import { getPodcasts } from "../controller/podcast.controller";
import { podcastsQuerySchema } from "../validator/podcast.validator";
import { validate } from "@/shared/middleware/validation";
import { Router } from "express";
import { protect } from "@/shared/middleware/auth.middleware";

const podCastRouter = Router()

/**
 * @swagger
 * /api/v1/podcasts:
 *   get:
 *     summary: Get list of all podcasts
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
 *     description: Returns all published podcasts, optionally filtered by subject.
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject name
 *         example: Criminal Law
 *     responses:
 *       200:
 *         description: Podcasts retrieved successfully
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
 *                     podcasts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           subject:
 *                             type: string
 *                           audioUrl:
 *                             type: string
 *                           thumbnail:
 *                             type: string
 *                             nullable: true
 *                           duration:
 *                             type: integer
 *                             nullable: true
 *                           order:
 *                             type: integer
 *                     total:
 *                       type: integer
 */
podCastRouter.get(
  '/podcasts',
  protect,
  validate(podcastsQuerySchema),
  getPodcasts
);



export default podCastRouter