import { prisma } from '@/shared/config';
import {
  CaseSearchQuery,
  CaseSearchResponse,
  CaseDetailResponse,
  SavedCasesListResponse,
  SaveCaseResponse,
} from '../interface/case.interface';
import { NotFoundError } from '@/shared/utils';

class CaseService {
  async searchCases(userId: string, query: CaseSearchQuery): Promise<CaseSearchResponse> {
    const { search, subject, jurisdiction, frequency, page = 1, limit = 10 } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

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

  async getCaseDetails(userId: string, caseId: string): Promise<CaseDetailResponse> {
    const caseData = await prisma.caseBrief.findUnique({
      where: { id: caseId },
      include: {
        savedBy: {
          where: { userId },
          select: { id: true },
        },
        relatedCases: {
          include: {
            relatedCase: {
              select: {
                id: true,
                caseName: true,
                citation: true,
                facts: true,
              },
            },
          },
        },
      },
    });

    if (!caseData) {
      throw new NotFoundError('Case not found');
    }

    return {
      id: caseData.id,
      caseName: caseData.caseName,
      citation: caseData.citation,
      year: caseData.year,
      court: caseData.court,
      jurisdiction: caseData.jurisdiction,
      frequency: caseData.frequency,
      subjects: caseData.subjects,
      topics: caseData.topics,
      facts: caseData.facts,
      issue: caseData.issue,
      ruling: caseData.ruling,
      reasoning: caseData.reasoning,
      significance: caseData.significance,
      principleAndApplication: caseData.principleAndApplication,
      examTip: caseData.examTip,
      examRelevance: caseData.examRelevance,
      appearsInPapers: caseData.appearsInPapers,
      relatedCases: caseData.relatedCases.map((rc) => ({
        id: rc.relatedCase.id,
        caseName: rc.relatedCase.caseName,
        citation: rc.relatedCase.citation,
        facts: rc.relatedCase.facts,
        relationshipType: rc.relationshipType,
      })),
      isSaved: caseData.savedBy.length > 0,
    };
  }

  async getSavedCases(userId: string, subject?: string): Promise<SavedCasesListResponse> {
    const where: any = { userId };

    if (subject) {
      where.caseBrief = {
        subjects: { has: subject },
      };
    }

    const savedCases = await prisma.savedCase.findMany({
      where,
      include: {
        caseBrief: {
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
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      cases: savedCases.map((sc) => ({
        id: sc.caseBrief.id,
        caseName: sc.caseBrief.caseName,
        citation: sc.caseBrief.citation,
        year: sc.caseBrief.year,
        court: sc.caseBrief.court,
        jurisdiction: sc.caseBrief.jurisdiction,
        frequency: sc.caseBrief.frequency,
        subjects: sc.caseBrief.subjects,
        topics: sc.caseBrief.topics,
        facts: sc.caseBrief.facts,
        savedAt: sc.createdAt,
        lastReviewedAt: sc.lastReviewedAt,
      })),
      total: savedCases.length,
    };
  }

  async toggleSaveCase(userId: string, caseId: string): Promise<SaveCaseResponse> {
    // Check if case exists
    const caseExists = await prisma.caseBrief.findUnique({
      where: { id: caseId },
      select: { id: true },
    });

    if (!caseExists) {
      throw new NotFoundError('Case not found');
    }

    // Check if already saved
    const existing = await prisma.savedCase.findUnique({
      where: {
        userId_caseBriefId: {
          userId,
          caseBriefId: caseId,
        },
      },
    });

    if (existing) {
      // Unsave
      await prisma.savedCase.delete({
        where: { id: existing.id },
      });

      return {
        message: 'Case removed from saved',
        isSaved: false,
      };
    } else {
      // Save
      await prisma.savedCase.create({
        data: {
          userId,
          caseBriefId: caseId,
        },
      });

      return {
        message: 'Case saved for revision',
        isSaved: true,
      };
    }
  }

  async getAllCases(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<CaseSearchResponse> {
    const skip = (page - 1) * limit;

    // Get total count
    const total = await prisma.caseBrief.count();

    // Get all cases
    const cases = await prisma.caseBrief.findMany({
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
