import { prisma } from '@/shared/config';
import { CaseJurisdiction } from '@prisma/client';
import {
  CaseSearchQuery,
  CaseSearchResponse,
  CaseDetailResponse,
  CaseFiltersResponse,
  SavedCasesListResponse,
  SaveCaseResponse,
  ToggleReviewResponse,
} from '../interface/case.interface';
import { NotFoundError } from '@/shared/utils';

const JURISDICTION_DISPLAY: Record<CaseJurisdiction, string> = {
  IRELAND: 'Ireland',
  UNITED_KINGDOM: 'UK (Persuasive)',
  AUSTRALIA: 'Australia',
  UNITED_STATES: 'United States',
  NEW_ZEALAND: 'New Zealand',
  EUROPEAN_UNION: 'EU / CJEU',
  ECHR: 'ECHR',
  CANADA: 'Canada',
  INTERNATIONAL: 'International',
  ENGLAND: 'England',
  ENGLAND_AND_WALES: 'England & Wales',
  SCOTLAND: 'Scotland',
  SCOTLAND_UK: 'Scotland / UK',
  NORTHERN_IRELAND: 'Northern Ireland',
  NEW_SOUTH_WALES: 'New South Wales',
  GERMANY: 'Germany',
  JAMAICA: 'Jamaica',
  HONG_KONG: 'Hong Kong',
  SINGAPORE: 'Singapore',
  OTHER: 'Other',
};

const frequencyLabel = (isFrequentlyTested: boolean) =>
  isFrequentlyTested ? 'High Frequency' : 'Rare';

class CaseService {
  async getCaseFilters(): Promise<CaseFiltersResponse> {
    const [years, caseNames, citations, jurisdictions] = await Promise.all([
      prisma.caseBrief.findMany({
        select: { year: true },
        distinct: ['year'],
        orderBy: { year: 'desc' },
      }),
      prisma.caseBrief.findMany({
        select: { caseName: true },
        distinct: ['caseName'],
        orderBy: { caseName: 'asc' },
      }),
      prisma.caseBrief.findMany({
        select: { citation: true },
        distinct: ['citation'],
        orderBy: { citation: 'asc' },
      }),
      prisma.caseBrief.findMany({
        select: { jurisdiction: true },
        distinct: ['jurisdiction'],
        orderBy: { jurisdiction: 'asc' },
      }),
    ]);

    return {
      years: years.map((r) => r.year),
      caseNames: caseNames.map((r) => r.caseName),
      citations: citations.map((r) => r.citation),
      jurisdictions: jurisdictions.map((r) => JURISDICTION_DISPLAY[r.jurisdiction]),
      frequency: ['High Frequency', 'Rare'],
    };
  }

  async searchCases(userId: string, query: CaseSearchQuery): Promise<CaseSearchResponse> {
    const {
      search,
      subject,
      jurisdiction,
      year,
      caseName,
      citation,
      frequency,
      page = 1,
      limit = 20,
    } = query;

    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        { caseName: { contains: search, mode: 'insensitive' } },
        { citation: { contains: search, mode: 'insensitive' } },
        { topics: { has: search } },
        { fullSummary: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (subject) where.subjects = { has: subject };
    if (jurisdiction) where.jurisdiction = jurisdiction.toUpperCase() as CaseJurisdiction;
    if (year) where.year = year;
    if (caseName) where.caseName = { contains: caseName, mode: 'insensitive' };
    if (citation) where.citation = { contains: citation, mode: 'insensitive' };
    if (frequency === 'High') where.isFrequentlyTested = true;
    if (frequency === 'Low') where.isFrequentlyTested = false;

    const [total, cases] = await Promise.all([
      prisma.caseBrief.count({ where }),
      prisma.caseBrief.findMany({
        where,
        select: {
          id: true,
          caseName: true,
          citation: true,
          year: true,
          court: true,
          jurisdiction: true,
          isFrequentlyTested: true,
          subjects: true,
          topics: true,
          fullSummary: true,
          savedBy: {
            where: { userId },
            select: { id: true },
          },
        },
        orderBy: [{ isFrequentlyTested: 'desc' }, { year: 'desc' }],
        skip,
        take: limit,
      }),
    ]);

    return {
      cases: cases.map((c) => ({
        id: c.id,
        caseName: c.caseName,
        citation: c.citation,
        year: c.year,
        court: c.court,
        jurisdiction: c.jurisdiction,
        isFrequentlyTested: c.isFrequentlyTested,
        frequencyLabel: frequencyLabel(c.isFrequentlyTested),
        subjects: c.subjects,
        topics: c.topics,
        fullSummary: c.fullSummary,
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
          select: { id: true, createdAt: true },
        },
      },
    });

    if (!caseData) throw new NotFoundError('Case not found');

    const saved = caseData.savedBy[0] ?? null;

    return {
      id: caseData.id,
      caseName: caseData.caseName,
      citation: caseData.citation,
      year: caseData.year,
      court: caseData.court,
      jurisdiction: caseData.jurisdiction,
      jurisdictionDisplay: JURISDICTION_DISPLAY[caseData.jurisdiction],
      isFrequentlyTested: caseData.isFrequentlyTested,
      frequencyLabel: frequencyLabel(caseData.isFrequentlyTested),
      examRelevance: caseData.isFrequentlyTested ? 'High' : 'Rare',
      subjects: caseData.subjects,
      topics: caseData.topics,
      fullSummary: caseData.fullSummary,
      legalPrinciple: caseData.legalPrinciple,
      keyQuote: caseData.keyQuote,
      appearsInPapers: caseData.appearsInPapers,
      isSaved: !!saved,
      savedAt: saved?.createdAt ?? null,
    };
  }

  async getSavedCases(userId: string, subject?: string): Promise<SavedCasesListResponse> {
    const where: any = { userId };
    if (subject) where.caseBrief = { subjects: { has: subject } };

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
            isFrequentlyTested: true,
            subjects: true,
            topics: true,
            fullSummary: true,
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
        isFrequentlyTested: sc.caseBrief.isFrequentlyTested,
        frequencyLabel: frequencyLabel(sc.caseBrief.isFrequentlyTested),
        subjects: sc.caseBrief.subjects,
        topics: sc.caseBrief.topics,
        fullSummary: sc.caseBrief.fullSummary,
        savedAt: sc.createdAt,
        lastReviewedAt: sc.lastReviewedAt,
        isReviewed: sc.lastReviewedAt !== null,
      })),
      total: savedCases.length,
    };
  }

  async toggleSaveCase(userId: string, caseId: string): Promise<SaveCaseResponse> {
    const caseExists = await prisma.caseBrief.findUnique({
      where: { id: caseId },
      select: { id: true },
    });
    if (!caseExists) throw new NotFoundError('Case not found');

    const existing = await prisma.savedCase.findUnique({
      where: { userId_caseBriefId: { userId, caseBriefId: caseId } },
    });

    if (existing) {
      await prisma.savedCase.delete({ where: { id: existing.id } });
      return { message: 'Case removed from saved', isSaved: false };
    }

    await prisma.savedCase.create({ data: { userId, caseBriefId: caseId } });
    return { message: 'Case saved for revision', isSaved: true };
  }

  async toggleReview(userId: string, caseId: string): Promise<ToggleReviewResponse> {
    const caseExists = await prisma.caseBrief.findUnique({
      where: { id: caseId },
      select: { id: true },
    });
    if (!caseExists) throw new NotFoundError('Case not found');

    const savedCase = await prisma.savedCase.findUnique({
      where: { userId_caseBriefId: { userId, caseBriefId: caseId } },
    });
    if (!savedCase) throw new NotFoundError('Save the case first before marking as reviewed');

    const newReviewedAt = savedCase.lastReviewedAt !== null ? null : new Date();

    const updated = await prisma.savedCase.update({
      where: { id: savedCase.id },
      data: { lastReviewedAt: newReviewedAt },
    });

    return {
      isReviewed: updated.lastReviewedAt !== null,
      lastReviewedAt: updated.lastReviewedAt,
    };
  }
}

export default new CaseService();
