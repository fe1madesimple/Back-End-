// src/modules/content/service/content.service.ts

import prisma from '@/config/database';
import { SubjectWithProgress } from '../interface/subject.interface';

export class SubjectService {
  async getSubjects(userId: string): Promise<SubjectWithProgress[]> {
    const subjects = await prisma.subject.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
      include: {
        userProgress: {
          where: { userId },
        },
      },
    });

    return subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      slug: subject.slug,
      description: subject.description,
      icon: subject.icon,
      order: subject.order,
      progress: subject.userProgress[0] || null,
    }));
  }
}
