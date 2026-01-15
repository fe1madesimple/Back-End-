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



