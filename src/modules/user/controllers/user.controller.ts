import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asynHandler';
import { sendSuccess, sendNoContent } from '@/utils/response';
import userService from '../services/user.service';
import {
  UpdateProfileInput,
  UpdatePreferencesInput,
  ChangePasswordInput,
  DeleteAccountInput,
} from '../interfaces/user.interfaces';






export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const user = await userService.getProfile(userId);
  return sendSuccess(res, 'Profile retrieved successfully', { user });
});
