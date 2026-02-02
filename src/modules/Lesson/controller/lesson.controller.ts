import { AppError } from "@/shared/utils";
import { asyncHandler } from "@/shared/utils";
import lessonService from "../service/lesson.service";
import { Request, Response } from "express";
import { sendSuccess } from "@/shared/utils";


export const getLessonById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const userId = req.user!.user.id;
    const { id } = req.params;
    
    if (!id) return new AppError("lesson id must be supplied")

  const lesson = await lessonService.getLessonById(userId, id);

  sendSuccess(res, 'Lesson retrieved successfully', { lesson });
});
