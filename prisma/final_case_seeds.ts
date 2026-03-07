import { PrismaClient, CaseJurisdiction } from '@prisma/client';

const prisma = new PrismaClient();

const jurisdictionMap: Record<string, CaseJurisdiction> = {
  IE: CaseJurisdiction.IRELAND,
  UK: CaseJurisdiction.UNITED_KINGDOM,
  AU: CaseJurisdiction.AUSTRALIA,
  EU: CaseJurisdiction.EUROPEAN_UNION,
  US: CaseJurisdiction.UNITED_STATES,
  NZ: CaseJurisdiction.NEW_ZEALAND,
  CA: CaseJurisdiction.CANADA,
  INT: CaseJurisdiction.INTERNATIONAL,
  ECHR: CaseJurisdiction.ECHR,
  Ireland: CaseJurisdiction.IRELAND,
  England: CaseJurisdiction.ENGLAND,
  'England & Wales': CaseJurisdiction.ENGLAND_AND_WALES,
  Scotland: CaseJurisdiction.SCOTLAND,
  'Scotland / UK': CaseJurisdiction.SCOTLAND_UK,
  'Northern Ireland': CaseJurisdiction.NORTHERN_IRELAND,
  'New Zealand': CaseJurisdiction.NEW_ZEALAND,
  'New South Wales': CaseJurisdiction.NEW_SOUTH_WALES,
  Australia: CaseJurisdiction.AUSTRALIA,
  'United States': CaseJurisdiction.UNITED_STATES,
  Germany: CaseJurisdiction.GERMANY,
  Jamaica: CaseJurisdiction.JAMAICA,
  'Hong Kong': CaseJurisdiction.HONG_KONG,
  Singapore: CaseJurisdiction.SINGAPORE,
  Other: CaseJurisdiction.OTHER,
};

// ✅ REPLACE THIS ARRAY EACH TIME
const rawCases = [
  // paste your JSON array here
];

async function main() {
  console.log('🔨 Seeding cases...');

  let seeded = 0;
  let skipped = 0;

  for (const raw of rawCases) {
    const existing = await prisma.caseBrief.findUnique({
      where: { citation: raw.citation },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.caseBrief.create({
      data: {
        caseName: raw.case_name,
        citation: raw.citation,
        year: raw.year,
        court: raw.court,
        jurisdiction: jurisdictionMap[raw.jurisdiction] ?? CaseJurisdiction.OTHER,
        isFrequentlyTested: raw.is_frequently_tested,
        legalPrinciple: raw.legal_principle,
        keyQuote: raw.key_quote,
        fullSummary: raw.full_summary,
        subjects: raw.subjects,
        topics: raw.topics,
        appearsInPapers: raw.past_paper_appearances,
      },
    });

    seeded++;
  }

  console.log(`✅ Done — ${seeded} seeded, ${skipped} skipped (already exist)`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
