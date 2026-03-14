// src/scripts/update-essay-questions.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateEssayQuestions() {
  console.log('🔨 Updating existing essay questions with descriptions and question sets...');

  // Find existing essay questions
  const existingEssays = await prisma.question.findMany({
    where: { type: 'ESSAY' },
    orderBy: { order: 'asc' },
  });

  console.log(`Found ${existingEssays.length} existing essay questions`);

  // Question 1: Criminal Law (existing)
  const criminalLaw = existingEssays.find((q) => q.subject === 'Criminal Law');
  if (criminalLaw) {
    await prisma.question.update({
      where: { id: criminalLaw.id },
      data: {
        description:
          'Surgical error during emergency appendectomy. Duty of care, breach, and defenses in medical negligence.',
        questionSets: {
          create: [
            {
              type: 'ESSAY',
              subject: 'Criminal Law',
              year: 2023,
              examType: 'Problem',
              description:
                'Surgical error during emergency appendectomy. Duty of care, breach, and defenses in medical negligence.',
              text: criminalLaw.text, // Copy parent text
              points: 20,
              order: 1,
            },
            {
              type: 'ESSAY',
              subject: 'Criminal Law',
              year: 2023,
              examType: 'Problem',
              description: 'Chemotherapy overdose causing kidney failure. Loss of chance doctrine.',
              text: `Dr Sarah Chen, an oncologist at Cork University Hospital, prescribes chemotherapy at double the standard dosage to Patricia, a breast cancer patient. The hospital pharmacy dispenses it without checking. After three weeks, Patricia develops severe kidney failure requiring dialysis.

Medical evidence shows the overdose directly caused kidney damage and delayed her cancer treatment by six months, reducing her five-year survival rate from 75% to 60%.

Discuss:
1. Duty of care owed by Dr Chen, the pharmacy, and the hospital
2. Breach of standard of care by each party
3. Causation and remoteness of damage
4. Damages including loss of chance
5. Potential defenses

Reference Dunne v National Maternity Hospital, Barnett v Chelsea & Kensington Hospital, and principles of loss of chance.`,
              points: 20,
              order: 2,
            },
            {
              type: 'ESSAY',
              subject: 'Criminal Law',
              year: 2023,
              examType: 'Problem',
              description:
                'GP misdiagnosis of brain tumor as stress. Standard of care and causation.',
              text: `Dr James O'Brien, a GP, diagnoses Margaret's persistent headaches and dizziness as stress without ordering tests. She returns two weeks later with worsening symptoms; he again diagnoses stress and refers her to counseling.

Three weeks later, Margaret collapses and is diagnosed with a brain tumor. Neurosurgeons confirm that if diagnosed at first visit, complete removal had 95% success; now only partial removal possible with 40% five-year survival.

Discuss:
1. Whether Dr O'Brien breached his duty of care
2. Standard of care expected from GPs
3. "But for" test and loss of chance
4. Recoverable damages
5. Defense that outcome might have been same

Reference Dunne v National Maternity Hospital, Bolam test, and loss of chance cases.`,
              points: 20,
              order: 3,
            },
            {
              type: 'ESSAY',
              subject: 'Criminal Law',
              year: 2023,
              examType: 'Problem',
              description:
                'Spinal injury from improper transfer in busy ER. Emergency care standards.',
              text: `Dr Kevin Walsh works in Beaumont Hospital ER at 3 AM on a busy Saturday with multiple trauma cases. Thomas arrives after motorcycle accident with suspected spinal injury, properly immobilized by paramedics.

Due to critical cases (gunshot victims, cardiac arrest), Dr Walsh briefly assesses Thomas, concludes no spinal injury, orders transfer to regular bed without precautions. During transfer, Thomas is moved improperly, screams in pain, loses leg sensation. MRI reveals fractured vertebra severed by the movement, causing permanent paraplegia.

Experts testify the fracture would have healed with proper immobilization, and spinal precautions should be maintained even in busy ERs until X-rays confirm safety.

Discuss duty, breach under resource constraints, hospital liability, causation, damages, and emergency defenses.

Reference Wilsher v Essex Area Health Authority and Bolam in emergencies.`,
              points: 20,
              order: 4,
            },
          ],
        },
      },
    });
    console.log('✅ Updated Question 1: Criminal Law');
  }

  // Question 2: Contract Law (existing)
  const contractLaw = existingEssays.find((q) => q.subject === 'Contract Law');
  if (contractLaw) {
    await prisma.question.update({
      where: { id: contractLaw.id },
      data: {
        description:
          'Warehouse fire before acceptance. Contract formation timing and frustration doctrine.',
        questionSets: {
          create: [
            {
              type: 'ESSAY',
              subject: 'Contract Law',
              year: 2023,
              examType: 'Problem',
              description:
                'Warehouse fire before acceptance. Contract formation timing and frustration doctrine.',
              text: contractLaw.text, // Copy parent text
              points: 20,
              order: 1,
            },
            {
              type: 'ESSAY',
              subject: 'Contract Law',
              year: 2023,
              examType: 'Problem',
              description: 'Interior design contract breach. Time is of essence, quantum meruit.',
              text: `Michelle contracts with Patrick to redesign his restaurant for €50,000, completion July 1st, "time is of the essence," disputes via arbitration.

She encounters delays: Patrick changes color scheme thrice, structural problems discovered, supplier delays. By July 1st, work is 75% complete.

Patrick emails: "You breached. I'm hiring someone else. Not paying you anything." Michelle argues delays were Patrick's fault and she deserves €37,500 for work done. Patrick refuses, hires another designer for €25,000.

Discuss:
1. Whether Patrick could terminate
2. Michelle's remedies for work completed
3. Significance of "time is of essence" clause
4. Arbitration clause relevance
5. Patrick's potential damages

Reference Bettini v Gye, Cehave NV v Bremer.`,
              points: 20,
              order: 2,
            },
            {
              type: 'ESSAY',
              subject: 'Contract Law',
              year: 2023,
              examType: 'Problem',
              description:
                'Car sale with undisclosed engine defect. Misrepresentation and implied terms.',
              text: `Tom sells his 2018 BMW via ad: "Low mileage, perfect condition, never in accident." He tells Lisa: "Maintained perfectly, serviced at dealer."

Lisa asks about problems. Tom says "Nothing major, normal wear and tear" but doesn't mention €3,000 engine repair six months ago. Lisa buys for €18,000.

Two weeks later, engine fails. Mechanic says prior repair was poor, engine needs €8,000 replacement, car worth €10,000 with problem. Tom says "Sold as seen. Should've had mechanic check."

Discuss:
1. Whether Tom's statements constitute misrepresentation
2. Representations vs terms distinction
3. Implied terms
4. Lisa's remedies
5. Effect of "sold as seen"

Reference Hedley Byrne v Heller, Sale of Goods Act 1980.`,
              points: 20,
              order: 3,
            },
            {
              type: 'ESSAY',
              subject: 'Contract Law',
              year: 2023,
              examType: 'Problem',
              description:
                'Wedding venue double-booking. Breach, damages for distress, deposit clause.',
              text: `Emma and Jack book Riverside Manor for August 12, 2023 wedding: €15,000 total, €5,000 deposit paid, "deposit non-refundable," 150 guests, includes catering/flowers/music.

They send invitations, book overseas flights, arrange nearby accommodation. In July, venue says: "Double-booked with corporate event paying €30,000. We offer August 19th or refund deposit."

Emma and Jack explain: guests booked non-refundable flights for 12th, best man abroad on 19th, invitations sent, too late for new venue. Venue cancels, refunds €5,000.

They find alternative for €22,000 (smaller, 100 guests), plus €500 new invitations, €3,000 guest flight changes.

Discuss breach, claimable damages, distress damages, remedies, deposit clause effect.

Reference Hadley v Baxendale, Jarvis v Swan Tours.`,
              points: 20,
              order: 4,
            },
          ],
        },
      },
    });
    console.log('✅ Updated Question 2: Contract Law');
  }

  // Question 3: Equity (existing)
  const equity = existingEssays.find((q) => q.subject === 'Equity');
  if (equity) {
    await prisma.question.update({
      where: { id: equity.id },
      data: {
        description:
          'Resulting trusts in modern Irish law. Automatic vs presumed, advancement, unjust enrichment.',
        questionSets: {
          create: [
            {
              type: 'ESSAY',
              subject: 'Equity',
              year: 2024,
              examType: 'Essay',
              description:
                'Resulting trusts in modern Irish law. Automatic vs presumed, advancement, unjust enrichment.',
              text: equity.text, // Copy parent text
              points: 20,
              order: 1,
            },
            {
              type: 'ESSAY',
              subject: 'Equity',
              year: 2024,
              examType: 'Problem',
              description:
                'Family home purchase contribution. Resulting trust, common intention, proprietary estoppel.',
              text: `Michael and Sarah purchase a family home for €400,000. Michael contributes €300,000 and Sarah €100,000. The property is registered solely in Michael's name because Sarah has poor credit history.

After 10 years, the relationship breaks down. Sarah claims she's entitled to a beneficial interest in the property based on her contribution. Michael argues the property is his alone as sole registered owner, and Sarah's contribution was a gift.

Sarah provides evidence that:
- They both intended to share ownership equally
- She paid household bills and mortgage for 5 years
- Michael repeatedly referred to it as "our house"
- She gave up her job to care for Michael's elderly parents

Discuss:
1. Whether a resulting trust arises from Sarah's contribution
2. Common intention constructive trust principles
3. Proprietary estoppel arguments
4. Quantification of Sarah's beneficial interest

Reference Stack v Dowden, Pettitt v Pettitt, and Irish authorities on family property.`,
              points: 20,
              order: 2,
            },
            {
              type: 'ESSAY',
              subject: 'Equity',
              year: 2024,
              examType: 'Problem',
              description:
                'Breach of fiduciary duty by solicitor. Account of profits, disgorgement.',
              text: `Solicitor James acts for elderly client Mrs. Murphy in selling her valuable city-center property. James learns the property is worth €800,000 but tells Mrs. Murphy it's only worth €500,000 due to "market conditions."

James arranges for his brother-in-law to purchase the property for €500,000. Six months later, the brother-in-law sells it for €850,000. Mrs. Murphy discovers the truth when she sees the sale advertised.

Discuss:
1. Whether James breached his fiduciary duties
2. The no-profit and no-conflict rules
3. Available equitable remedies including account of profits
4. Whether Mrs. Murphy can claim the €350,000 profit
5. Potential criminal liability

Reference Keech v Sandford, Boardman v Phipps, and principles of fiduciary obligations.`,
              points: 20,
              order: 3,
            },
            {
              type: 'ESSAY',
              subject: 'Equity',
              year: 2024,
              examType: 'Essay',
              description:
                'Equitable maxims and discretionary remedies. Clean hands, equity aids vigilant.',
              text: `"Equity's discretionary nature and reliance on maxims creates uncertainty and inconsistency in its application."

Critically evaluate this statement. Your answer should:
1. Explain key equitable maxims (he who comes to equity must come with clean hands, equity aids the vigilant, equity follows the law)
2. Discuss the discretionary nature of equitable remedies
3. Analyze whether this creates unacceptable uncertainty
4. Consider calls for reform or codification

Reference relevant case law and academic commentary on equity's role in modern law.`,
              points: 20,
              order: 4,
            },
          ],
        },
      },
    });
    console.log('✅ Updated Question 3: Equity');
  }

  console.log('✅ Essay questions update complete!');
}

updateEssayQuestions()
  .catch((e) => {
    console.error('❌ Update failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
