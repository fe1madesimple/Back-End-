import { Router } from "express"; 
import { protect } from "@/shared/middleware/auth.middleware";
import { getLessonById } from "../controller/lesson.controller";



const lessonRouter = Router();

/**
 * @swagger
 * /api/v1/lessons/{id}:
 *   get:
 *     summary: Get lesson content and video
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns complete lesson details including video URL, transcript, and content.
 *       
 *       **Used in:** Lesson video player (Image 14 - main content area)
 *       
 *       **Response includes:**
 *       - Cloudinary video URL
 *       - Video duration (for progress calculation)
 *       - Transcript text
 *       - Lesson content (markdown)
 *       - User's watch progress (resume from where left off)
 *       - Associated PDFs/assets
 *       
 *       **Also updates:**
 *       - Lesson last accessed timestamp
 *       - Module last accessed timestamp
 *       - Subject last accessed timestamp
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     lesson:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         title:
 *                           type: string
 *                           example: Lesson 1: Characteristics of a Crime
 *                         content:
 *                           type: string
 *                           description: Markdown content
 *                         transcript:
 *                           type: string
 *                         videoUrl:
 *                           type: string
 *                           example: https://res.cloudinary.com/.../lesson-1.mp4
 *                         videoDuration:
 *                           type: integer
 *                           example: 863
 *                           description: Duration in seconds
 *                         progress:
 *                           type: object
 *                           properties:
 *                             isCompleted:
 *                               type: boolean
 *                             videoWatchedSeconds:
 *                               type: integer
 *                               example: 450
 *                               description: Resume from this position
 *                             timeSpentSeconds:
 *                               type: integer
 *                         assets:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               type:
 *                                 type: string
 *                                 example: PDF
 *                               title:
 *                                 type: string
 *                               url:
 *                                 type: string
 */
lessonRouter.get('/lessons/:id', protect, getLessonById);


