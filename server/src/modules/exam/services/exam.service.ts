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

  /**
   * GET NEXT EXAM SITTING
   */

  async getNextSitting(): Promise<ExamSittingResponse | null> {
    const sitting = await prisma.examSitting.findFirst({
      where: {
        examDate: {
          gt: new Date(), // Future dates only
        },
        isActive: true,
      },
      orderBy: {
        examDate: 'asc', // Nearest first
      },
    });

    if (!sitting) {
      return null;
    }

    return this.formatExamSitting(sitting);
  }

  /**
   * GET ALL UPCOMING EXAM SITTINGS
   */
  async getUpcomingSittings(): Promise<ExamSittingResponse[]> {
    const sittings = await prisma.examSitting.findMany({
      where: {
        examDate: {
          gt: new Date(), // Future dates only
        },
        isActive: true,
      },
      orderBy: {
        examDate: 'asc',
      },
    });

    return sittings.map((sitting) => this.formatExamSitting(sitting));
  }

  /**
   * GET ALL EXAM SITTINGS (Including past - for admin)
   */
  async getAllSittings(): Promise<ExamSittingResponse[]> {
    const sittings = await prisma.examSitting.findMany({
      orderBy: {
        examDate: 'desc',
      },
    });

    return sittings.map((sitting) => this.formatExamSitting(sitting));
  }

  /**
   * GET EXAM SITTING BY ID
   */
  async getSittingById(id: string): Promise<ExamSittingResponse> {
    const sitting = await prisma.examSitting.findUnique({
      where: { id },
    });

    if (!sitting) {
      throw new NotFoundError('Exam sitting not found');
    }

    return this.formatExamSitting(sitting);
  }
}


export default new ExamService();