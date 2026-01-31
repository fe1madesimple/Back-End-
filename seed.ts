import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // ============================================
    // SUBJECTS (8 FE-1 Subjects)
    // ============================================

    const subjects = await Promise.all([
        prisma.subject.create({
            data: {
                name: 'Criminal Law',
                slug: 'criminal-law',
                description: 'Study of crimes, defenses, and criminal procedure in Irish law',
                order: 1,
            },
        }),
        prisma.subject.create({
            data: {
                name: 'Contract Law',
                slug: 'contract-law',
                description: 'Formation, terms, breach, and remedies in contract law',
                order: 2,
            },
        }),
        prisma.subject.create({
            data: {
                name: 'Tort Law',
                slug: 'tort-law',
                description: 'Negligence, defamation, nuisance, and other civil wrongs',
                order: 3,
            },
        }),
        prisma.subject.create({
            data: {
                name: 'Equity',
                slug: 'equity',
                description: 'Trusts, fiduciary duties, and equitable remedies',
                order: 4,
            },
        }),
        prisma.subject.create({
            data: {
                name: 'Land Law',
                slug: 'land-law',
                description: 'Property ownership, estates, and conveyancing',
                order: 5,
            },
        }),
        prisma.subject.create({
            data: {
                name: 'EU Law',
                slug: 'eu-law',
                description: 'European Union law, treaties, and institutions',
                order: 6,
            },
        }),
        prisma.subject.create({
            data: {
                name: 'Constitutional Law',
                slug: 'constitutional-law',
                description: 'Irish Constitution, rights, and judicial review',
                order: 7,
            },
        }),
        prisma.subject.create({
            data: {
                name: 'Company Law',
                slug: 'company-law',
                description: 'Corporate governance, directors duties, and shareholder rights',
                order: 8,
            },
        }),
    ]);

    console.log('✅ Created 8 subjects');

}