// src/modules/support/services/support.service.ts

import { prisma } from '@/shared/config';
import emailService from '@/shared/services/email.service';
import { NotFoundError } from '@/shared/utils';

class SupportService {
  async scheduleOnboardingCall(userId: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, fullName: true },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await emailService.sendScheduleNotificationToSupport(user.email, user.fullName || 'Student');

    return {
      emailSent: true,
    };
  }
}

export default new SupportService();