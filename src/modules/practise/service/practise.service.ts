// src/modules/practise/practise.service.ts

import { prisma } from '@/shared/config';
import { PastQuestionsQuery, PastQuestionsResponse } from '../interface/practise.interface';

export async function getPastQuestionsService(
  query: PastQuestionsQuery
): Promise<PastQuestionsResponse> {
  const { search, subject, year, page = 1, limit = 9 } = query;
  const skip = (page - 1) * limit;

  const where: any = {
    type: 'ESSAY',
    isPublished: true,
    ...(subject && { subject }),
    ...(year && { year }),
    ...(search && {
      OR: [
        { text: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ],
    }),
  };

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      select: {
        id: true,
        subject: true,
        year: true,
        examType: true,
        description: true,
        text: true,
        order: true,
      },
      orderBy: [{ year: 'desc' }, { subject: 'asc' }, { order: 'asc' }],
      skip,
      take: limit,
    }),
    prisma.question.count({ where }),
  ]);

  const [subjectRows, yearRows] = await Promise.all([
    prisma.question.findMany({
      where: { type: 'ESSAY', isPublished: true },
      select: { subject: true },
      distinct: ['subject'],
      orderBy: { subject: 'asc' },
    }),
    prisma.question.findMany({
      where: { type: 'ESSAY', isPublished: true },
      select: { year: true },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    }),
  ]);

  return {
    questions: questions.map((q) => ({
      id: q.id,
      subject: q.subject,
      year: q.year,
      examType: q.examType,
      description: q.description,
      text: q.text,
      order: q.order,
    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    filters: {
      subjects: subjectRows.map((s) => s.subject).filter(Boolean) as string[],
      years: yearRows.map((y) => y.year).filter(Boolean) as number[],
    },
  };
}
