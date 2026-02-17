// src/modules/achievements/routes/achievement.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { getAllAchievements, getUserAchievements } from '../controller/achievements.controller';

const achievementRouter = Router();

achievementRouter.get('/', protect, getAllAchievements);
achievementRouter.get('/unlocked', protect, getUserAchievements);

export default achievementRouter;
