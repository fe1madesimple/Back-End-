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

  /**
   * Format exam sitting for response
   */
  private formatExamSitting(sitting: any): ExamSittingResponse {
    return {
      id: sitting.id,
      name: sitting.name,
      examDate: sitting.examDate.toISOString(),
      registrationDeadline: sitting.registrationDeadline?.toISOString(),
      resultsDate: sitting.resultsDate?.toISOString(),
      daysUntil: this.calculateDaysUntil(sitting.examDate),
      isActive: sitting.isActive,
      createdAt: sitting.createdAt.toISOString(),
      updatedAt: sitting.updatedAt.toISOString(),
    };
  }
}