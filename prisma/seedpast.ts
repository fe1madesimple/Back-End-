// prisma/seedPastQuestions.ts
// Usage: npx ts-node -r tsconfig-paths/register prisma/seedPastQuestions.ts
// Replace the essayData array with real client data as it comes in.
// Safe to rerun — wipes all ESSAY questions and reseeds fresh every time.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pastQuestions = [
  {
    subject: 'Constitutional Law',
    year: 2008,
    questions: [
      {
        examType: 'Problem',
        description:
          'Maria has been accused of involvement in a complex financial fraud, in… Constitutional.',
        text: "Maria has been accused of involvement in a complex financial fraud, in which money was unlawfully removed from Irish pension funds. The collapse of the funds has affected thousands of pensioners. The case has attracted a lot of media coverage. Many of these reports have been very critical of Maria. Maria is concerned about the risk of biased jury. She is aware that she has a constitutional right to a jury trial but wishes to waive it. She therefore applies to the trial judge to hear the case without a jury, or to transfer the case to the non-jury Special Criminal Court. The judge rejects this request. He explains that he does not think it is necessary in this case. He instead proposes to exclude any person with a pension from the jury pool. Maria is dissatisfied with this. She has asked you for your opinion on the constitutionality of the judge's decision. She has also asked you if she should appeal his refusal of her request. Advise Maria.",
      },
      {
        examType: 'Problem',
        description:
          'John was convicted in December 2005 of the murder of his wife Carol, in… Murder.',
        text: "John was convicted in December 2005 of the murder of his wife Carol, in March of the same year. He was sentenced to life imprisonment and is currently serving that sentence in Mountjoy Prison. John's conviction was based mainly on evidence gleaned during a search of the family home, No. 7 Loughrea Tce. John does not dispute the fact that the evidence was relevant and potentially probative of his guilt. It has recently been brought to John's attention that the search warrant under which the home was entered and searched was for a different house in the same area -- No. 7 Loughrea Road. Carol's brother James lives at No. 7 Loughrea Road and it has emerged that the Gardaí in fact suspected him of the murder and not John and thought that they were searching his house at the time the warrant was executed. John is very hopeful that this information might be sufficient to gain his release from custody. He has heard that there is a mechanism under the Constitution which would enable him to have this matter dealt with speedily. One of his fellow inmates, however, has told him that he is wasting his time pursuing this as the Gardaí will simply rearrest him if he is released. Advise John.",
      },
      {
        examType: 'Problem',
        description:
          'As a result of severe injuries sustained in a road traffic accident, John… Constitutional.',
        text: "As a result of severe injuries sustained in a road traffic accident, John has been in a coma for 35 years. The doctors are satisfied that he is not brain dead and feel that he may have a basic level of cognition. However, their professional opinion is that it is highly unlikely that he will ever awake from the coma. They also feel that there is a reasonable possibility that he suffers considerable pain from his injuries on a daily basis. John's father is 81. His mother is deceased. His father is concerned about what may happen to John after his death. He is also convinced that John would not wish to remain in a coma. Before his injuries, John had told him that he would \"hate to be cooped up inside for a long time\". John's father asks the doctors if they can turn off the machine that assists John's breathing. They refuse on the grounds that this would contravene John's right to life. You have been asked to advise John's father whether there are any alternative courses of action open to him under Irish constitutional law.",
      },
      {
        examType: 'Essay',
        description:
          '"The principles of social policy set out in Article 45 have no impact or influence on Irish constitutional law.',
        text: '"The principles of social policy set out in Article 45 have no impact or influence on Irish constitutional law. Their inclusion in the text of the Constitution is, at best, an irrelevance and, at worst, a serious mistake." Discuss this statement with reference to the relevant caselaw of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          '"When viewed in comparison with the potential remedy of having a law declared unconstitutional under Article 34.3.2° of…',
        text: '"When viewed in comparison with the potential remedy of having a law declared unconstitutional under Article 34.3.2° of the Constitution, a declaration of incompatibility under s.5 of the European Convention on Human Rights Act 2003 ("the 2003 Act") is an unattractive remedy for any litigant. For this reason, the 2003 Act is unlikely to have any real impact as litigants will invariably rely on the Constitution as the primary mechanism for protecting their rights." Do you agree with this statement?',
      },
      {
        examType: 'Problem',
        description: 'Eithne is a widowed mother of seven children. Constitutional.',
        text: "Eithne is a widowed mother of seven children. She is not in full-time employment and has applied to her local authority for housing for her family. She is particularly hopeful as she knows that a four-bedroom unit has recently become available in her neighbourhood. The local council apply a policy in accordance with which preference for housing is given to married couples with children. The council decides to allocate the house which Eithne wanted to a couple who are married and who have a 16 year old son. Eithne is very upset by this. She wants to know if the council's decision can be challenged under Irish constitutional law. Advise her.",
      },
      {
        examType: 'Essay',
        description:
          '"The Presidency of Ireland is an office with significant constitutional prominence but no practical power." Do you…',
        text: '"The Presidency of Ireland is an office with significant constitutional prominence but no practical power." Do you agree? Support your argument, where appropriate, with reference to the relevant provisions of the Constitution and caselaw of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          '"The right to privacy is an under-developed constitutional entitlement which has not been adequately defined or…',
        text: '"The right to privacy is an under-developed constitutional entitlement which has not been adequately defined or protected by the Irish courts." Discuss this statement with reference to the constitutional jurisprudence of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'William is a 45 year old aeronautics engineer who has always dreamed of… Constitutional.',
        text: 'William is a 45 year old aeronautics engineer who has always dreamed of being a pilot. He applies to the Irish Air Force for entry into their pilot training program. His application is refused on the basis that he is too old to enter into the program. The Air Force informs William that he meets all the other relevant physical and mental criteria. The Air Force has a policy of only accepting recruits who are under 35 years of age. The training program takes 7 years and is a very expensive process. Experience has shown that Air Force pilots usually have to retire on physical grounds by the time they are 55. The Air Force does not accept older recruits because it believes it is an inefficient use of resources to train pilots who may have to retire within a relatively short period of time. William wishes to know if he has any grounds to challenge this decision under Irish constitutional law. Advise him.',
      },
      {
        examType: 'Problem',
        description:
          'The Agricultural Rationalisation Act 2008 establishes a body known as… Constitutional.',
        text: 'The Agricultural Rationalisation Act 2008 establishes a body known as Agri-efficiency Ireland (AI). Under section 1 of the Act, this body is charged with the function of "securing the efficient organisation of the agricultural industry in Ireland". Section 2 of the Acts vests "all powers necessary for the performance of its function" in AI. AI establishes the Fuel Efficient Vehicle scheme. This aims to ensure that farmers in Ireland are not using vehicles which generate a lot of pollution. AI announces that it will conduct inspections of all farms in Ireland and seize all inefficient vehicles. Paul is a small farmer with two 20 year old tractors. The AI inspector decides that his tractors are both inefficient and orders their seizure. The scheme provides for a flat payment of €500 for vehicles over 10 years old. Paul is accordingly paid €1000 in compensation. Paul believes that his tractors were worth approximately €1200. They would also cost €10,000 to replace. Paul is concerned that he will not be able to afford this and that he will therefore have to sell the farm. Advise Paul if he has any grounds to challenge this decision under Irish constitutional law.',
      },
      {
        examType: 'Essay',
        description:
          '"Although it is less influential than formerly, natural law jurisprudence continues to have important implications for…',
        text: '"Although it is less influential than formerly, natural law jurisprudence continues to have important implications for Irish constitutional law." Do you agree? Discuss this statement with reference to the relevant caselaw of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'The Irish Organisation for Political Rights (IOPR) is a non-profit… Advise the IOPR of any potential issues that may…',
        text: 'The Irish Organisation for Political Rights (IOPR) is a non-profit organisation which campaigns for greater protection of civil and political rights. IOPR is concerned about the passing of the Protection of Public Property Act 2008. This Act provides that it is a criminal offence to place posters which make reference to political or religious themes on public property. The IOPR is concerned that this legislation may raise concerns under Article 40.6.1 of the Constitution. Advise the IOPR of any potential issues that may arise in respect of its locus standi to bring proceedings.',
      },
      {
        examType: 'Essay',
        description:
          'In its recent decision in Pater v Ireland, the High Court held that a married father of a newborn child is…',
        text: 'In its recent decision in Pater v Ireland, the High Court held that a married father of a newborn child is constitutionally entitled to the same amount of leave as a mother. Explaining his decision, Eponymous J said that: "Article 42.2.1 of the Irish Constitution acknowledges the social value of parental care within the home and pledges to protect it. Allowing a parent time off work to care for a newborn infant gives effect to this clear constitutional policy. It is true that the Article in question refers only to mothers. However, this qualification reflects the social situation at the time that the Constitution was enacted. This was a time when care within the home was provided almost entirely by mothers rather than fathers. The reference to mothers was, in my view, a statement of social reality rather than an attempt to fix a particular model of parental care for all time. For the Constitution to remain relevant, it is vital that the courts apply its principles in a way which reflects the state of society. Article 42.2.1 protects parental care as it was in 1937. Extending leave to fathers as well as mothers protects the same principle of paternal care but does so in a way which gives the principle real contemporary force. I am strengthened in this conclusion by the constitutional guarantee of equality. This requires that there be equality between the sexes and between spouses. Of course, equality could be achieved by denying leave to all. However, given the pro-parental care policy of Article 41.2.2, it would not be constitutionally justifiable to remove leave from all parents. Equality therefore requires that the benefit available to mothers of newborn infants should be extended to those married fathers who fall within the scope of Articles 41 and 42". This decision is being appealed to the Supreme Court. Do you think it is likely to be reversed on appeal?',
      },
      {
        examType: 'Essay',
        description:
          '"The rights to fair procedures under Article 40.3 of the Irish Constitution is an unusually flexible and context-…',
        text: '"The rights to fair procedures under Article 40.3 of the Irish Constitution is an unusually flexible and context-sensitive right. This means that the right can potentially apply to a wide range of civil procedures. However, it also means that the level of protection provided by the right varies significantly from situation to situation. In this way, it may be said that the right to fair procedures is both far-reaching and limited in its effects." Do you agree with this statement? Discuss the extent to which it is supported by the constitutional caselaw of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          '"The Irish Constitution recognises both the right to life and the principle of individual autonomy.',
        text: '"The Irish Constitution recognises both the right to life and the principle of individual autonomy. Cases concerning the provision or refusal of medical treatment have given rise to conflicts between these constitutional principles. As the Irish decisions on medical treatment demonstrate, it is difficult to reconcile these principles with any degree of consistency or success". Discuss this statement with reference to the relevant Irish decisions on the provision or refusal of medical treatment.',
      },
      {
        examType: 'Problem',
        description:
          'John is arrested at 11.30am on July 1st by the Gardai on suspicion of… Constitutional.',
        text: 'John is arrested at 11.30am on July 1st by the Gardai on suspicion of causing criminal damage. He was arrested by the Gardai in the vicinity of some freshly-painted red graffiti. Upon his arrest, he was found to be carrying a can of red spray paint. Section 2 of the Criminal Damage Act 2008 provides that: "In the course of a trial on a charge of causing criminal damage, adverse inferences may be drawn from the failure of an accused during questioning to provide an explanation for his possession of any item which might have been used to cause criminal damage." Section 3 of the Act provides that inference may also be drawn from the fact that an accused subsequently provides an explanation which was not provided to the Gardai during initial questioning. During questioning, the Gardai explain the implications of section 2 of the 2008 Act to John. John replies that he intends to provide an explanation for his possession of the spray paint but that he wishes to speak to his solicitor first. This request is made at 3pm. The Gardai phone his solicitor\'s office at 6.30pm and leave a message asking the solicitor to attend the Garda station. The solicitor does not receive the message until 9.30am the next morning. When he reaches the station at 10.30am, the Garda on duty denies him access to the interview room. The Garda explains that "There\'s no point going in. It\'s nearly over and we have to release him in the next hour anyway". Because he has not spoken to his solicitor, John does not provide an explanation for his possession of the spray paint. He is charged with causing criminal damage. Advise John if there are any possible grounds under Irish constitutional law upon which he could challenge a trial or conviction.',
      },
    ],
  },
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
