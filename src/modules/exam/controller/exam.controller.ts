import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asynHandler';
import { sendSuccess } from '@/utils/response';
import examService from '../services/exam.service';
import { BadRequestError } from '@/utils/errors';


/**
 * @desc    Get next exam sitting
 * @route   GET /api/v1/exams/next
 * @access  Public
 */
export const getNextSitting = asyncHandler(async (_req: Request, res: Response) => {
  const sitting = await examService.getNextSitting();

  if (!sitting) {
    return sendSuccess(res, 'No upcoming exam sittings scheduled', { sitting: null });
  }

  return sendSuccess(
    res,
    'Next exam sitting retrieved successfully',
    { sitting }
  );
});

/**
 * @desc    Get all upcoming exam sittings
 * @route   GET /api/v1/exams/upcoming
 * @access  Public
 */
export const getUpcomingSittings = asyncHandler(async (_req: Request, res: Response) => {
  const sittings = await examService.getUpcomingSittings();

  sendSuccess(
    res,
    'Upcoming exam sittings retrieved successfully',
    { sittings, count: sittings.length }
  );
});

/**
 * @desc    Get all exam sittings (including past)
 * @route   GET /api/v1/exams
 * @access  Public
 */
export const getAllSittings = asyncHandler(async (_req: Request, res: Response) => {
  const sittings = await examService.getAllSittings();

  sendSuccess(
    res,
    'All exam sittings retrieved successfully',
    { sittings, count: sittings.length }
  );
});

/**
 * @desc    Get exam sitting by ID
 * @route   GET /api/v1/exams/:id
 * @access  Public
 */
export const getSittingById = asyncHandler(async (req: Request, res: Response) => {
const { id } = req.params;

if (!id) {
  throw new BadRequestError('Exam sitting ID is required');
}

const sitting = await examService.getSittingById(id);

return sendSuccess(res, 'Exam sitting retrieved successfully', { sitting });
});