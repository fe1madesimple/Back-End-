// src/modules/support/routes/support.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { scheduleOnboardingCall } from '../controller/support.controller';
scheduleOnboardingCall

const supportRouter = Router();

supportRouter.post('/schedule-call', protect, scheduleOnboardingCall);

export default supportRouter;