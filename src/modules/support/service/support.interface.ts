// src/modules/support/services/support.service.ts

import { prisma } from '@/shared/config';
import emailService from '@/shared/services/email.service';
import { NotFoundError } from '@/shared/utils';
import { ScheduleBookingResponse } from '../interface/support.interface';

class SupportService {
  async scheduleOnboardingCall(userId: string): Promise<ScheduleBookingResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, fullName: true },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await emailService.sendScheduleNotificationToSupport(user.email, user.fullName || 'Student');

    return {
      message: 'Onboarding call request received. Our team will contact you within 24 hours.',
      emailSent: true,
    };
  }
}

export default new SupportService();
