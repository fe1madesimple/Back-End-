import { AppError } from "@/shared/utils";
import { Request, Response } from "express";
import { asyncHandler } from "@/shared/utils";
import podcastService from "../service/podcast.service";
import { sendSuccess } from "@/shared/utils";

// src/modules/content/controller/content.controller.ts

export const getPodcasts = asyncHandler(async (req: Request, res: Response) => {
  const { subject } = req.query;

  const result = await podcastService.getPodcasts(subject as string | undefined);

  sendSuccess(res, 'Podcasts retrieved', result);
});