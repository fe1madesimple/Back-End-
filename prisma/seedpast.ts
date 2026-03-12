// prisma/seedPastQuestions.ts
// Usage: npx ts-node -r tsconfig-paths/register prisma/seedPastQuestions.ts
// Replace the essayData array with real client data as it comes in.
// Safe to rerun — wipes all ESSAY questions and reseeds fresh every time.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pastQuestions = [
  // ─────────────────────────────────────────
  // Constitutional Law 2008
  // ─────────────────────────────────────────
  {
    subject: 'Constitutional Law',
    year: 2008,
    questions: [
      {
        examType: 'Problem',
        description:
          'Maria has been accused of involvement in a complex financial fraud, in… Constitutional.',
        text: `Maria has been accused of involvement in a complex financial fraud, in which money was unlawfully removed from Irish pension funds. The collapse of the funds has affected thousands of pensioners. The case has attracted a lot of media coverage. Many of these reports have been very critical of Maria. Maria is concerned about the risk of biased jury. She is aware that she has a constitutional right to a jury trial but wishes to waive it. She therefore applies to the trial judge to hear the case without a jury, or to transfer the case to the non-jury Special Criminal Court. The judge rejects this request. He explains that he does not think it is necessary in this case. He instead proposes to exclude any person with a pension from the jury pool. Maria is dissatisfied with this. She has asked you for your opinion on the constitutionality of the judge's decision. She has also asked you if she should appeal his refusal of her request. Advise Maria.`,
      },
      {
        examType: 'Problem',
        description:
          'John was convicted in December 2005 of the murder of his wife Carol, in… Murder.',
        text: `John was convicted in December 2005 of the murder of his wife Carol, in March of the same year. He was sentenced to life imprisonment and is currently serving that sentence in Mountjoy Prison. John's conviction was based mainly on evidence gleaned during a search of the family home, No. 7 Loughrea Tce. John does not dispute the fact that the evidence was relevant and potentially probative of his guilt. It has recently been brought to John's attention that the search warrant under which the home was entered and searched was for a different house in the same area -- No. 7 Loughrea Road. Carol's brother James lives at No. 7 Loughrea Road and it has emerged that the Gardaí in fact suspected him of the murder and not John and thought that they were searching his house at the time the warrant was executed. John is very hopeful that this information might be sufficient to gain his release from custody. He has heard that there is a mechanism under the Constitution which would enable him to have this matter dealt with speedily. One of his fellow inmates, however, has told him that he is wasting his time pursuing this as the Gardaí will simply rearrest him if he is released. Advise John.`,
      },
      {
        examType: 'Problem',
        description:
          'As a result of severe injuries sustained in a road traffic accident, John… Constitutional.',
        text: `As a result of severe injuries sustained in a road traffic accident, John has been in a coma for 35 years. The doctors are satisfied that he is not brain dead and feel that he may have a basic level of cognition. However, their professional opinion is that it is highly unlikely that he will ever awake from the coma. They also feel that there is a reasonable possibility that he suffers considerable pain from his injuries on a daily basis. John's father is 81. His mother is deceased. His father is concerned about what may happen to John after his death. He is also convinced that John would not wish to remain in a coma. Before his injuries, John had told him that he would "hate to be cooped up inside for a long time". John's father asks the doctors if they can turn off the machine that assists John's breathing. They refuse on the grounds that this would contravene John's right to life. You have been asked to advise John's father whether there are any alternative courses of action open to him under Irish constitutional law.`,
      },
      {
        examType: 'Essay',
        description:
          'The principles of social policy set out in Article 45 have no impact or influence on Irish constitutional law.',
        text: `"The principles of social policy set out in Article 45 have no impact or influence on Irish constitutional law. Their inclusion in the text of the Constitution is, at best, an irrelevance and, at worst, a serious mistake." Discuss this statement with reference to the relevant caselaw of the Irish courts.`,
      },
      {
        examType: 'Essay',
        description:
          'When viewed in comparison with the potential remedy of having a law declared unconstitutional under Article 34.3.2°',
        text: `"When viewed in comparison with the potential remedy of having a law declared unconstitutional under Article 34.3.2° of the Constitution, a declaration of incompatibility under s.5 of the European Convention on Human Rights Act 2003 ("the 2003 Act") is an unattractive remedy for any litigant. For this reason, the 2003 Act is unlikely to have any real impact as litigants will invariably rely on the Constitution as the primary mechanism for protecting their rights." Do you agree with this statement?`,
      },
      {
        examType: 'Problem',
        description: 'Eithne is a widowed mother of seven children. Constitutional.',
        text: `Eithne is a widowed mother of seven children. She is not in full-time employment and has applied to her local authority for housing for her family. She is particularly hopeful as she knows that a four-bedroom unit has recently become available in her neighbourhood. The local council apply a policy in accordance with which preference for housing is given to married couples with children. The council decides to allocate the house which Eithne wanted to a couple who are married and who have a 16 year old son. Eithne is very upset by this. She wants to know if the council's decision can be challenged under Irish constitutional law. Advise her.`,
      },
      {
        examType: 'Essay',
        description:
          'The Presidency of Ireland is an office with significant constitutional prominence but no practical power.',
        text: `"The Presidency of Ireland is an office with significant constitutional prominence but no practical power." Do you agree? Support your argument, where appropriate, with reference to the relevant provisions of the Constitution and caselaw of the Irish courts.`,
      },
      {
        examType: 'Essay',
        description:
          'The right to privacy is an under-developed constitutional entitlement which has not been adequately defined or protected.',
        text: `"The right to privacy is an under-developed constitutional entitlement which has not been adequately defined or protected by the Irish courts." Discuss this statement with reference to the constitutional jurisprudence of the Irish courts.`,
      },
      {
        examType: 'Problem',
        description:
          'William is a 45 year old aeronautics engineer who has always dreamed of being a pilot. Constitutional.',
        text: `William is a 45 year old aeronautics engineer who has always dreamed of being a pilot. He applies to the Irish Air Force for entry into their pilot training program. His application is refused on the basis that he is too old to enter into the program. The Air Force informs William that he meets all the other relevant physical and mental criteria. The Air Force has a policy of only accepting recruits who are under 35 years of age. The training program takes 7 years and is a very expensive process. Experience has shown that Air Force pilots usually have to retire on physical grounds by the time they are 55. The Air Force does not accept older recruits because it believes it is an inefficient use of resources to train pilots who may have to retire within a relatively short period of time. William wishes to know if he has any grounds to challenge this decision under Irish constitutional law. Advise him.`,
      },
      {
        examType: 'Problem',
        description:
          'The Agricultural Rationalisation Act 2008 establishes a body known as Agri-efficiency Ireland. Constitutional.',
        text: `The Agricultural Rationalisation Act 2008 establishes a body known as Agri-efficiency Ireland (AI). Under section 1 of the Act, this body is charged with the function of "securing the efficient organisation of the agricultural industry in Ireland". Section 2 of the Acts vests "all powers necessary for the performance of its function" in AI. AI establishes the Fuel Efficient Vehicle scheme. This aims to ensure that farmers in Ireland are not using vehicles which generate a lot of pollution. AI announces that it will conduct inspections of all farms in Ireland and seize all inefficient vehicles. Paul is a small farmer with two 20 year old tractors. The AI inspector decides that his tractors are both inefficient and orders their seizure. The scheme provides for a flat payment of €500 for vehicles over 10 years old. Paul is accordingly paid €1000 in compensation. Paul believes that his tractors were worth approximately €1200. They would also cost €10,000 to replace. Paul is concerned that he will not be able to afford this and that he will therefore have to sell the farm. Advise Paul if he has any grounds to challenge this decision under Irish constitutional law.`,
      },
    ],
  },

  // ─────────────────────────────────────────
  // ADD MORE SUBJECTS/YEARS BELOW AS CLIENT SENDS DATA
  // Copy the block above and replace subject, year, and questions array
  // ─────────────────────────────────────────
];

async function main() {
  console.log('🌱 Starting past questions seed...\n');

  console.log('🗑️  Wiping related records...');
  await prisma.quizAttempt.deleteMany({});
  await prisma.questionAttempt.deleteMany({});
  await prisma.essayAttempt.deleteMany({});
  await prisma.timedSession.deleteMany({});
  await prisma.question.deleteMany({ where: { type: 'ESSAY' } });
  console.log('✅ Essay questions cleared\n');

  let totalSeeded = 0;

  for (const entry of pastQuestions) {
    console.log(`📚 Seeding: ${entry.subject} ${entry.year} (${entry.questions.length} questions)`);

    for (let i = 0; i < entry.questions.length; i++) {
      const q = entry.questions[i];
      if (!q) continue;
      await prisma.question.create({
        data: {
          type: 'ESSAY',
          subject: entry.subject,
          year: entry.year,
          examType: q.examType,
          description: q.description,
          text: q.text,
          order: i + 1,
          points: 20,
          isPublished: true,
        },
      });
    }

    console.log(`   ✅ ${entry.questions.length} questions seeded`);
    totalSeeded += entry.questions.length;
  }

  console.log(`\n🎉 Done! Total questions seeded: ${totalSeeded}`);
  console.log(`   📊 Breakdown:`);
  for (const entry of pastQuestions) {
    console.log(`   - ${entry.subject} ${entry.year}: ${entry.questions.length} questions`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
