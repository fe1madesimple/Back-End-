import { PrismaClient, CaseFrequency, CaseJurisdiction } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCases() {
  console.log('🔨 Seeding Case Law...');

  const cases = [
    {
      caseName: 'Carlill v Carbolic Smoke Ball Co',
      citation: '[1893] 1 QB 256',
      year: 1893,
      court: 'UK Court of Appeal',
      jurisdiction: CaseJurisdiction.UK_COURT_OF_APPEAL,
      frequency: CaseFrequency.HIGH_FREQUENCY, 
      subjects: ['Contract Law'],
      topics: ['Offer & Acceptance', 'Unilateral Contracts', 'Consideration'],
      facts:
        'The Carbolic Smoke Ball Company advertised that anyone who used their product as directed and still caught influenza would receive £100. Mrs. Carlill followed the instructions, contracted the flu, and claimed the reward. The company argued there was no contract.',
      issue:
        'Whether the advertisement constituted a valid offer capable of acceptance through performance, and whether consideration existed.',
      ruling:
        'The Court held that the advertisement was a unilateral offer to the world at large, which was accepted by Mrs. Carlill through performance. The deposit of £1,000 with the bank showed clear intention to be bound.',
      reasoning:
        'The Court reasoned that unilateral contracts can be formed through performance rather than communication of acceptance. The specificity of the promise and the deposit demonstrated serious intent, not mere puffery.',
      significance:
        'This case established key principles: (1) advertisements can constitute offers in unilateral contracts, (2) acceptance occurs through performance, (3) consideration exists when the offeree performs the requested act.',
      principleAndApplication:
        "The court held that the advertisement constituted a unilateral offer to the world at large, which was accepted by Mrs. Carlill through performance. The company's deposit of £1,000 showed clear intention to be bound.",
      examTip:
        'When discussing offer and acceptance, mention Carlill to illustrate unilateral contracts and the principle that performance can constitute acceptance.',
      examRelevance:
        'This principle is frequently examined in Question 2 of the Contract Law paper, particularly when analyzing unilateral contracts or distinguishing offers from invitations to treat.',
      appearsInPapers: ['March 2023', 'October 2021', 'March 2018'],
    },
    {
      caseName: 'Donoghue v Stevenson',
      citation: '[1932] AC 562',
      year: 1932,
      court: 'House of Lords',
      jurisdiction: CaseJurisdiction.UK_HOUSE_OF_LORDS,
      frequency: CaseFrequency.HIGH_FREQUENCY,
      subjects: ['Tort Law'],
      topics: ['Negligence - Duty of Care', 'Neighbour Principle'],
      facts:
        'Mrs. Donoghue consumed ginger beer containing a decomposed snail, purchased by her friend. She suffered shock and gastroenteritis. As she did not purchase the drink herself, she had no contract with the manufacturer and sued in negligence.',
      issue:
        'Whether a manufacturer owes a duty of care to the ultimate consumer with whom there is no contractual relationship.',
      ruling:
        'The House of Lords held that manufacturers owe a duty of care to consumers who use their products, establishing the modern law of negligence.',
      reasoning:
        'Lord Atkin formulated the "neighbour principle": You must take reasonable care to avoid acts or omissions which you can reasonably foresee would be likely to injure your neighbour - persons so closely and directly affected by your act.',
      significance:
        'This landmark case established the modern tort of negligence and the neighbour principle, forming the foundation for duty of care analysis in Irish and UK law.',
      principleAndApplication:
        'Established the modern law of negligence and the neighbour principle. The court recognized that manufacturers owe duties beyond contractual relationships to those foreseeably affected by their products.',
      examTip:
        "Essential for any negligence question. Quote Lord Atkin's neighbour principle and explain its three-stage test application in Irish law.",
      examRelevance:
        'Appears in virtually every Tort Law exam, particularly Questions 1 and 3 dealing with duty of care establishment.',
      appearsInPapers: ['March 2023', 'October 2022', 'March 2022', 'October 2021'],
    },
    {
      caseName: 'Dunne v National Maternity Hospital',
      citation: '[1989] IR 91',
      year: 1989,
      court: 'Irish Supreme Court',
      jurisdiction: CaseJurisdiction.IRISH_SUPREME_COURT,
      frequency: CaseFrequency.HIGH_FREQUENCY,
      subjects: ['Tort Law'],
      topics: ['Negligence - Medical Negligence', 'Standard of Care', 'Bolam Test'],
      facts:
        'A child was born with cerebral palsy following delivery complications. The parents claimed the hospital failed to provide proper monitoring during labor, causing oxygen deprivation.',
      issue:
        'What standard of care applies to medical professionals, and whether the hospital breached that standard.',
      ruling:
        'The Supreme Court adopted the Bolam test: a doctor is not negligent if they act in accordance with a practice accepted as proper by a responsible body of medical opinion.',
      reasoning:
        'The Court held that medical professionals should be judged by the standards of their profession, not by judges or juries lacking medical expertise. However, the practice must be capable of withstanding logical analysis.',
      significance:
        'This case established the Irish approach to medical negligence and professional standard of care, adopting the Bolam test with Irish modifications.',
      principleAndApplication:
        'The Court adopted the Bolam test for medical negligence, requiring expert evidence to establish breach. However, Irish courts retain the right to reject medical opinion that lacks logical basis.',
      examTip:
        'Crucial for medical negligence questions. Explain the Bolam test and its Irish application, noting that courts can reject illogical medical practices.',
      examRelevance:
        'Appears frequently in professional negligence questions, particularly in Tort Law papers focusing on standard of care.',
      appearsInPapers: ['March 2023', 'March 2022', 'October 2020'],
    },
    {
      caseName: 'The People (DPP) v Murray',
      citation: '[1977] IR 360',
      year: 1977,
      court: 'Irish Supreme Court',
      jurisdiction: CaseJurisdiction.IRISH_SUPREME_COURT,
      frequency: CaseFrequency.MEDIUM_FREQUENCY,
      subjects: ['Criminal Law'],
      topics: ['Mens Rea', 'Recklessness', 'Foresight'],
      facts:
        'The accused threw a concrete block from a bridge onto a moving train below, injuring passengers. He claimed he did not intend to hurt anyone.',
      issue:
        'What level of mens rea (guilty mind) is required for assault, and whether recklessness suffices.',
      ruling:
        'The Court held that recklessness requires subjective awareness of the risk. The accused must actually foresee the risk of harm and take it anyway.',
      reasoning:
        'The Court rejected objective recklessness, requiring proof that the accused actually foresaw the risk. Mere failure to think about obvious risks is insufficient.',
      significance:
        'This case established the Irish approach to recklessness as requiring subjective foresight, distinguishing it from English law which sometimes applies objective standards.',
      principleAndApplication:
        'Murray established that Irish criminal law requires subjective recklessness - actual foresight of risk. This differs from negligence, which uses objective standards.',
      examTip:
        "When discussing mens rea, especially recklessness, cite Murray to show Ireland's subjective approach. Contrast with objective recklessness in other jurisdictions.",
      examRelevance:
        'Regularly appears in Criminal Law questions involving assault, recklessness, or mens rea analysis.',
      appearsInPapers: ['October 2022', 'March 2021'],
    },
    {
      caseName: 'Coco v AN Clark (Engineers) Ltd',
      citation: '[1968] FSR 415',
      year: 1968,
      court: 'UK High Court',
      jurisdiction: CaseJurisdiction.UK_COURT_OF_APPEAL,
      frequency: CaseFrequency.RARE,
      subjects: ['Equity'],
      topics: ['Breach of Confidence', 'Confidential Information'],
      facts:
        'The claimant disclosed design drawings for an engine part to the defendant for manufacturing purposes. The defendant subsequently used the designs for their own benefit without authorization.',
      issue: 'What are the requirements for establishing breach of confidence in equity.',
      ruling:
        'The Court established a three-part test: (1) information must have quality of confidence, (2) information communicated in circumstances of confidence, (3) unauthorized use to the detriment of the confider.',
      reasoning:
        'Megarry J set out the test that has become the standard for breach of confidence claims, balancing protection of confidential information with legitimate use.',
      significance:
        'This case established the three-part test for breach of confidence that is applied in Irish and UK law, forming the foundation of confidentiality analysis.',
      principleAndApplication:
        'The Coco test requires proving three elements for breach of confidence. This applies beyond contractual relationships to equitable obligations.',
      examTip:
        'Essential for any Equity question on confidential information. State and apply the three-part Coco test clearly.',
      examRelevance:
        'Sometimes appears in Equity papers when discussing equitable remedies or breach of confidence.',
      appearsInPapers: ['March 2020'],
    },
    {
      caseName: 'Salomon v Salomon & Co Ltd',
      citation: '[1897] AC 22',
      year: 1897,
      court: 'House of Lords',
      jurisdiction: CaseJurisdiction.UK_HOUSE_OF_LORDS,
      frequency: CaseFrequency.HIGH_FREQUENCY,
      subjects: ['Company Law'],
      topics: ['Corporate Personality', 'Limited Liability', 'Separate Legal Entity'],
      facts:
        'Salomon incorporated his boot-making business, holding almost all shares. When the company became insolvent, unsecured creditors argued Salomon and the company were the same entity.',
      issue:
        'Whether a validly incorporated company has a separate legal personality distinct from its shareholders.',
      ruling:
        'The House of Lords held that a properly incorporated company is a separate legal entity with its own rights and liabilities, distinct from its members.',
      reasoning:
        'Once incorporated, the company is a separate person in law. The motives of those who formed it are irrelevant if proper procedures were followed.',
      significance:
        'This landmark case established the doctrine of separate legal personality and limited liability, fundamental principles of modern company law.',
      principleAndApplication:
        'Salomon established that companies have separate legal personality from their members. This principle can only be set aside in exceptional circumstances (piercing the corporate veil).',
      examTip:
        'Foundation case for Company Law. Discuss Salomon when analyzing corporate personality, limited liability, or veil-piercing scenarios.',
      examRelevance:
        'Appears in almost every Company Law exam, particularly when discussing corporate personality or shareholder liability.',
      appearsInPapers: ['March 2023', 'October 2022', 'March 2022', 'October 2021'],
    },
    {
      caseName: 'Pharmaceutical Society v Boots',
      citation: '[1953] 1 QB 401',
      year: 1953,
      court: 'UK Court of Appeal',
      jurisdiction: CaseJurisdiction.UK_COURT_OF_APPEAL,
      frequency: CaseFrequency.MEDIUM_FREQUENCY,
      subjects: ['Contract Law'],
      topics: ['Offer & Acceptance', 'Invitation to Treat', 'Display of Goods'],
      facts:
        'Boots operated a self-service store where customers selected goods from shelves and paid at the till. A question arose whether the sale occurred when goods were taken from the shelf or at the checkout.',
      issue:
        'Whether displaying goods on shop shelves constitutes an offer or an invitation to treat.',
      ruling:
        'The Court held that display of goods in a shop is an invitation to treat, not an offer. The customer makes the offer by presenting goods at the checkout.',
      reasoning:
        'The Court reasoned that if display were an offer, the shop would be bound to sell to anyone who accepts, losing control over who they contract with.',
      significance:
        'This case clarified the distinction between offers and invitations to treat in retail contexts, establishing that shops retain control over accepting customers.',
      principleAndApplication:
        'Display of goods is invitation to treat; customer offers by presenting goods; shopkeeper accepts at checkout. This gives retailers control over with whom they contract.',
      examTip:
        'Use Boots to illustrate invitation to treat vs. offer, especially in retail scenarios. Contrast with Carlill for unilateral contracts.',
      examRelevance:
        'Commonly appears in Contract Law questions distinguishing offers from invitations to treat.',
      appearsInPapers: ['October 2022', 'March 2021'],
    },
  ];

  for (const caseData of cases) {
    const existing = await prisma.caseBrief.findFirst({
      where: { citation: caseData.citation },
    });

    if (!existing) {
      await prisma.caseBrief.create({
        data: caseData,
      });
    }
  }

  console.log(`✅ Seeded ${cases.length} cases`);
}

export async function seedCaseRelations() {
  console.log('🔨 Seeding Case Relations...');

  // Get case IDs
  const carlill = await prisma.caseBrief.findUnique({ where: { citation: '[1893] 1 QB 256' } });
  const boots = await prisma.caseBrief.findUnique({ where: { citation: '[1953] 1 QB 401' } });
  const donoghue = await prisma.caseBrief.findUnique({ where: { citation: '[1932] AC 562' } });
  const dunne = await prisma.caseBrief.findUnique({ where: { citation: '[1989] IR 91' } });

  const relations = [
    {
      parentCaseId: carlill!.id,
      relatedCaseId: boots!.id,
      relationshipType: 'Similar Facts',
    },
    {
      parentCaseId: donoghue!.id,
      relatedCaseId: dunne!.id,
      relationshipType: 'Applied In',
    },
  ];

  for (const relation of relations) {
    await prisma.caseRelation.upsert({
      where: {
        parentCaseId_relatedCaseId: {
          parentCaseId: relation.parentCaseId,
          relatedCaseId: relation.relatedCaseId,
        },
      },
      update: {},
      create: relation,
    });
  }

  console.log(`✅ Seeded ${relations.length} case relations`);
}

async function main() {
  console.log('🌱 Starting case seeding...');

  await seedCases();
  await seedCaseRelations();

  console.log('✅ Case seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
