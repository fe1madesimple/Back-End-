import { AppError } from "@/shared/utils";
import { Request, Response } from "express";
import { asyncHandler } from "@/shared/utils";
import practiseService from "../service/practise.service";
import { sendSuccess } from "@/shared/utils";


// src/modules/content/controller/content.controller.ts

export const getQuickQuiz = asyncHandler(async (req: Request, res: Response) => {
    const { moduleId } = req.params;
    
    if (!moduleId) throw new AppError("module id must be supplied")

  const quiz = await practiseService.getQuickQuiz(moduleId);

  sendSuccess(res, 'Quick quiz retrieved', quiz);
});