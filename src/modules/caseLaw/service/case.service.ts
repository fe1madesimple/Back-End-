import { prisma } from '@/shared/config';
import { CaseSearchQuery, CaseSearchResponse } from '../interfaces/case.interface';

class CaseService {
  async searchCases(userId: string, query: CaseSearchQuery): Promise<CaseSearchResponse> {
    const { search, subject, jurisdiction, frequency, page = 1, limit = 10 } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = { isPublished: true };

    if (search) {
      where.OR = [
        { caseName: { contains: search, mode: 'insensitive' } },
        { citation: { contains: search, mode: 'insensitive' } },
        { topics: { has: search } },
      ];
    }

    if (subject) {
      where.subjects = { has: subject };
    }

    if (jurisdiction) {
      where.jurisdiction = jurisdiction;
    }

    if (frequency) {
      where.frequency = frequency;
    }

    // Get total count
    const total = await prisma.caseBrief.count({ where });

    // Get cases
    const cases = await prisma.caseBrief.findMany({
      where,
      select: {
        id: true,
        caseName: true,
        citation: true,
        year: true,
        court: true,
        jurisdiction: true,
        frequency: true,
        subjects: true,
        topics: true,
        facts: true,
        savedBy: {
          where: { userId },
          select: { id: true },
        },
      },
      orderBy: [{ frequency: 'asc' }, { year: 'desc' }],
      skip,
      take: limit,
    });

    return {
      cases: cases.map((c) => ({
        id: c.id,
        caseName: c.caseName,
        citation: c.citation,
        year: c.year,
        court: c.court,
        jurisdiction: c.jurisdiction,
        frequency: c.frequency,
        subjects: c.subjects,
        topics: c.topics,
        facts: c.facts,
        isSaved: c.savedBy.length > 0,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export default new CaseService();
