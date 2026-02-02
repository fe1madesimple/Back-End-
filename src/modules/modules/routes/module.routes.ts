import { Router } from "express";
import { getModuleById } from "../controller/module.controller";
import { protect } from "@/shared/middleware/auth.middleware";


const moduleRouter = Router()


/**
 * @swagger
 * /api/v1/modules/{id}:
 *   get:
 *     summary: Get module details with lessons
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns module information and list of all lessons.
 *
 *       **Used in:** Lesson sidebar (Image 14 - right sidebar showing lessons)
 *
 *       **Response includes:**
 *       - Module details
 *       - List of lessons with completion status
 *       - Video duration for each lesson
 *       - Watch progress for each lesson
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module retrieved successfully
 */
moduleRouter.get('/modules/:id', protect, getModuleById);



export default moduleRouter