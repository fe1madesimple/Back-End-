import prisma from '@/config/database';
import { NotFoundError } from '@/utils/errors';
import { ExamSittingResponse } from '../interfaces/exam.interface';

class ExamService {
  /**
   * Calculate days until exam date
   */
  private calculateDaysUntil(examDate: Date): number {
    const now = new Date();
    const diff = examDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}