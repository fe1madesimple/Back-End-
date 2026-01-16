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

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const input: UpdateProfileInput = req.body;
  const user = await userService.updateProfile(userId, input);
  return sendSuccess(res, 'Profile updated successfully', { user });
});

export const updatePreferences = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const input: UpdatePreferencesInput = req.body;
  const preferences = await userService.updatePreferences(userId, input);
  return sendSuccess(res, 'Preferences updated successfully', { preferences });
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const input: ChangePasswordInput = req.body;
  await userService.changePassword(userId, input);
  return sendSuccess(res, 'Password changed successfully');
});

export const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const input: DeleteAccountInput = req.body;
  await userService.deleteAccount(userId, input.password);
  return sendNoContent(res);
});

export const getOnboardingStatus = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;

  const user = await userService.getOnboardingStatus(userId);

  return sendSuccess(res, 'onboarding status retrieved', { user });
});

export const exportUserData = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;

  const sanitizedData = await userService.exportUserData(userId);

  sendSuccess(res, 'user data exported successfully', { sanitizedData });
});

export const completeOnboarding = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const { focusSubjects, targetExamDate, dailyStudyGoal } = req.body;

  const user = await userService.completeOnboarding(
    userId,
    focusSubjects,
    targetExamDate,
    dailyStudyGoal
  );

  sendSuccess(res, 'Onboarding completed successfully', { user });
});

export const skipOnboarding = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;

  const user = await userService.skipOnboarding(userId);

  sendSuccess(res, 'Onboarding skipped', { user });
});