// src/scripts/create-new-essay-sets.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createNewEssaySets() {
  console.log('🔨 Creating 5 new essay question sets...');

  // ============================================
  // SET 4: TORT LAW - Negligence & Duty of Care
  // ============================================
  await prisma.question.create({
    data: {
      type: 'ESSAY',
      subject: 'Tort Law',
      year: 2023,
      examType: 'Problem',
      description:
        'Negligence and duty of care. Donoghue v Stevenson neighbour principle application.',
      text: `Sarah, a professional photographer, is injured when she slips on a wet floor at a hotel lobby. The hotel claims they had just mopped and placed a warning sign, but Sarah argues the sign was inadequate and poorly positioned.

As a result of her fall, Sarah:
- Breaks her wrist requiring surgery (€15,000 medical costs)
- Cannot work for 6 months (€40,000 lost income)
- Suffers anxiety about public spaces (ongoing therapy €5,000)
- Misses her daughter's wedding she was contracted to photograph (bride sues Sarah for €10,000)

Discuss:
1. Whether the hotel owed Sarah a duty of care
2. Whether the hotel breached that duty
3. Causation and remoteness issues
4. What damages Sarah can recover
5. Whether Sarah can recover for the bride's claim against her

Reference Donoghue v Stevenson, Caparo v Dickman, and principles of negligence.`,
      points: 20,
      order: 4,
      isPublished: true,
      questionSets: {
        create: [
          {
            type: 'ESSAY',
            subject: 'Tort Law',
            year: 2023,
            examType: 'Problem',
            description:
              'Negligence and duty of care. Donoghue v Stevenson neighbour principle application.',
            text: `Sarah, a professional photographer, is injured when she slips on a wet floor at a hotel lobby. The hotel claims they had just mopped and placed a warning sign, but Sarah argues the sign was inadequate and poorly positioned.

As a result of her fall, Sarah:
- Breaks her wrist requiring surgery (€15,000 medical costs)
- Cannot work for 6 months (€40,000 lost income)
- Suffers anxiety about public spaces (ongoing therapy €5,000)
- Misses her daughter's wedding she was contracted to photograph (bride sues Sarah for €10,000)

Discuss:
1. Whether the hotel owed Sarah a duty of care
2. Whether the hotel breached that duty
3. Causation and remoteness issues
4. What damages Sarah can recover
5. Whether Sarah can recover for the bride's claim against her

Reference Donoghue v Stevenson, Caparo v Dickman, and principles of negligence.`,
            points: 20,
            order: 1,
          },
          {
            type: 'ESSAY',
            subject: 'Tort Law',
            year: 2023,
            examType: 'Problem',
            description: 'Occupiers liability. Lawful visitor injury, reasonable care standard.',
            text: `Tom visits his friend's apartment building. While climbing the stairs to the third floor, a loose handrail gives way, causing Tom to fall down the stairs and break his leg.

Evidence shows:
- The handrail had been loose for months
- Other tenants had complained to the landlord
- The landlord had not carried out any inspections in 2 years
- Warning signs were placed but had fallen off

Tom sues both the landlord and his friend (the tenant). The landlord argues Tom should have been more careful, and the tenant argues they're not responsible for common areas.

Discuss duty owed to lawful visitors, standard of care, liability of landlord vs tenant, contributory negligence.

Reference Occupiers' Liability Act 1995 and relevant case law.`,
            points: 20,
            order: 2,
          },
          {
            type: 'ESSAY',
            subject: 'Tort Law',
            year: 2023,
            examType: 'Problem',
            description: 'Psychiatric harm. Primary vs secondary victim, nervous shock.',
            text: `Mary witnesses a serious car accident. Her husband John is critically injured. Mary suffers severe PTSD and depression from witnessing the accident.

Meanwhile, Mary's sister Helen, who wasn't present but arrived 30 minutes later and saw John being treated by paramedics, also develops anxiety and depression.

Both Mary and Helen claim damages for psychiatric harm. The defendant argues neither qualifies as they weren't physically injured.

Discuss:
1. Primary vs secondary victim distinction
2. Requirements for recovering psychiatric harm damages
3. Whether Mary and Helen meet these requirements
4. Policy considerations limiting psychiatric harm claims

Reference Kelly v Hennessy, McLoughlin v O'Brian, and Alcock v Chief Constable.`,
            points: 20,
            order: 3,
          },
          {
            type: 'ESSAY',
            subject: 'Tort Law',
            year: 2023,
            examType: 'Essay',
            description: 'Pure economic loss. Hedley Byrne principle, negligent misstatement.',
            text: `"The reluctance of courts to allow recovery for pure economic loss in negligence reflects outdated policy concerns and should be reconsidered."

Critically evaluate this statement. Your answer should:
1. Explain the general exclusionary rule for pure economic loss
2. Discuss the Hedley Byrne exception for negligent misstatement
3. Analyze policy reasons for limiting recovery
4. Evaluate whether reform is needed

Reference Hedley Byrne v Heller, Caparo v Dickman, Murphy v Brentwood, and Irish authorities.`,
            points: 20,
            order: 4,
          },
        ],
      },
    },
  });
  console.log('✅ Created Set 4: Tort Law');

  // ============================================
  // SET 5: COMPANY LAW
  // ============================================
  await prisma.question.create({
    data: {
      type: 'ESSAY',
      subject: 'Company Law',
      year: 2023,
      examType: 'Problem',
      description: 'Corporate veil piercing. Salomon principle, fraud exception, group structures.',
      text: `John incorporates "BuildRight Ltd" as a one-person company to operate his construction business. He is sole director and shareholder. The company enters contracts with suppliers but fails to pay €200,000 in debts.

Creditors discover:
- John transferred company assets to his personal account days before insolvency
- The company never held board meetings or kept proper records
- John used company funds to pay personal expenses
- The company was undercapitalized from the start

Creditors seek to hold John personally liable, arguing the company was a sham. John relies on Salomon v Salomon, claiming limited liability protects him.

Discuss:
1. The principle of separate legal personality
2. Circumstances when courts will pierce the corporate veil
3. Whether the veil should be pierced in this case
4. Alternative remedies for creditors

Reference Salomon v Salomon, Gilford Motor Co v Horne, Adams v Cape Industries, and Irish authorities on veil piercing.`,
      points: 20,
      order: 5,
      isPublished: true,
      questionSets: {
        create: [
          {
            type: 'ESSAY',
            subject: 'Company Law',
            year: 2023,
            examType: 'Problem',
            description:
              'Corporate veil piercing. Salomon principle, fraud exception, group structures.',
            text: `John incorporates "BuildRight Ltd" as a one-person company to operate his construction business. He is sole director and shareholder. The company enters contracts with suppliers but fails to pay €200,000 in debts.

Creditors discover:
- John transferred company assets to his personal account days before insolvency
- The company never held board meetings or kept proper records
- John used company funds to pay personal expenses
- The company was undercapitalized from the start

Creditors seek to hold John personally liable, arguing the company was a sham. John relies on Salomon v Salomon, claiming limited liability protects him.

Discuss:
1. The principle of separate legal personality
2. Circumstances when courts will pierce the corporate veil
3. Whether the veil should be pierced in this case
4. Alternative remedies for creditors

Reference Salomon v Salomon, Gilford Motor Co v Horne, Adams v Cape Industries, and Irish authorities on veil piercing.`,
            points: 20,
            order: 1,
          },
          {
            type: 'ESSAY',
            subject: 'Company Law',
            year: 2023,
            examType: 'Problem',
            description:
              'Directors fiduciary duties. Conflict of interest, corporate opportunities.',
            text: `Mary is a director of TechCo Ltd, which develops software. During a board meeting, TechCo discusses acquiring a competitor, InnoSoft Ltd, but decides against it due to funding issues.

Two months later, Mary personally purchases InnoSoft for €500,000 using a loan. Six months later, she sells it for €2 million. TechCo's shareholders discover this and claim Mary breached her duties.

Mary argues:
- TechCo rejected the opportunity
- She used personal funds, not company resources
- The profit was hers as she took the personal risk
- TechCo couldn't have afforded it anyway

Discuss:
1. Directors' fiduciary duties under the Companies Act 2014
2. The corporate opportunity doctrine
3. Whether Mary breached her duties
4. Available remedies including account of profits

Reference Regal (Hastings) v Gulliver, Industrial Development Consultants v Cooley, and Companies Act 2014 sections 228-229.`,
            points: 20,
            order: 2,
          },
          {
            type: 'ESSAY',
            subject: 'Company Law',
            year: 2023,
            examType: 'Problem',
            description: 'Minority shareholder protection. Oppression remedy, derivative actions.',
            text: `Three friends incorporate "CaféCo Ltd": Alice (40% shares), Brian (40%), and Carol (20%). All are directors. Over time, Alice and Brian:
- Award themselves €100,000 salaries while Carol gets €30,000
- Refuse to declare dividends
- Use company funds for personal luxury cars (claimed as "company vehicles")
- Exclude Carol from board meetings
- Pass resolutions without proper notice to Carol

Carol wants to take action but doesn't have enough votes to pass resolutions or remove directors.

Discuss:
1. Minority shareholder protection mechanisms
2. The oppression remedy under section 212 Companies Act 2014
3. Derivative actions and when they're available
4. Whether Carol has grounds for relief
5. Potential remedies the court might grant

Reference Foss v Harbottle, O'Neill v Phillips, and Companies Act 2014 sections 212-213.`,
            points: 20,
            order: 3,
          },
          {
            type: 'ESSAY',
            subject: 'Company Law',
            year: 2023,
            examType: 'Essay',
            description:
              'Company formation and constitution. Articles of association, members agreements.',
            text: `"The Companies Act 2014 provides adequate flexibility for companies to structure their internal governance, making shareholders' agreements unnecessary."

Critically evaluate this statement. Your answer should:
1. Explain the role of the constitution (articles of association)
2. Discuss the Companies Act 2014 default rules
3. Analyze the role and advantages of shareholders' agreements
4. Evaluate whether additional contractual protection is necessary

Reference Companies Act 2014, Russell v Northern Bank, and principles of company formation.`,
            points: 20,
            order: 4,
          },
        ],
      },
    },
  });
  console.log('✅ Created Set 5: Company Law');

  // ============================================
  // SET 6: PROPERTY LAW
  // ============================================
  await prisma.question.create({
    data: {
      type: 'ESSAY',
      subject: 'Property Law',
      year: 2024,
      examType: 'Problem',
      description: 'Adverse possession. Squatters rights, title acquisition, limitation periods.',
      text: `In 1995, Michael purchased a large farm including a remote 5-acre field. He never visited or used this field. In 2000, Tom, a neighboring farmer, began using the field to graze cattle. Tom:
- Fenced the entire field at his own expense
- Maintained it and paid for drainage improvements
- Used it continuously and openly for 23 years
- Believed he had permission (though Michael never knew)

In 2023, Michael discovers Tom's use and demands he leave. Tom claims he owns the field by adverse possession. Michael argues Tom was merely a trespasser and he (Michael) remains the owner.

Discuss:
1. Requirements for adverse possession under Irish law
2. The 12-year limitation period and when it starts
3. Whether Tom's belief he had permission affects his claim
4. Whether Tom has acquired title
5. Registration implications under the Land Registry

Reference Statute of Limitations 1957, Perry v Woodfarm Homes, and Land Registration Act 2012.`,
      points: 20,
      order: 6,
      isPublished: true,
      questionSets: {
        create: [
          {
            type: 'ESSAY',
            subject: 'Property Law',
            year: 2024,
            examType: 'Problem',
            description:
              'Adverse possession. Squatters rights, title acquisition, limitation periods.',
            text: `In 1995, Michael purchased a large farm including a remote 5-acre field. He never visited or used this field. In 2000, Tom, a neighboring farmer, began using the field to graze cattle. Tom:
- Fenced the entire field at his own expense
- Maintained it and paid for drainage improvements
- Used it continuously and openly for 23 years
- Believed he had permission (though Michael never knew)

In 2023, Michael discovers Tom's use and demands he leave. Tom claims he owns the field by adverse possession. Michael argues Tom was merely a trespasser and he (Michael) remains the owner.

Discuss:
1. Requirements for adverse possession under Irish law
2. The 12-year limitation period and when it starts
3. Whether Tom's belief he had permission affects his claim
4. Whether Tom has acquired title
5. Registration implications under the Land Registry

Reference Statute of Limitations 1957, Perry v Woodfarm Homes, and Land Registration Act 2012.`,
            points: 20,
            order: 1,
          },
          {
            type: 'ESSAY',
            subject: 'Property Law',
            year: 2024,
            examType: 'Problem',
            description:
              'Landlord and tenant. Lease vs license, residential tenancies, rent control.',
            text: `Sarah rents a room in Dublin from landlord David for €800/month. The written agreement states:
- "License to occupy room 3"
- "Licensor may require licensee to move to another room on 7 days notice"
- "No exclusive possession"
- One year term

Sarah lives there for 8 months. David then serves notice requiring her to vacate in 28 days because he's selling. Sarah claims:
- She has a tenancy, not a license
- She's entitled to longer notice under the Residential Tenancies Act
- The rent is above the legal limit for the area
- David never registered with the RTB

Discuss:
1. Distinction between lease and license (Street v Mountford)
2. Whether Sarah has a tenancy despite the "license" label
3. Sarah's rights under the Residential Tenancies Act 2004
4. Remedies available to Sarah
5. Consequences of non-registration with RTB

Reference Street v Mountford, Residential Tenancies Acts 2004-2021, and RTB jurisdiction.`,
            points: 20,
            order: 2,
          },
          {
            type: 'ESSAY',
            subject: 'Property Law',
            year: 2024,
            examType: 'Problem',
            description:
              'Easements and covenants. Right of way, prescriptive acquisition, burden running.',
            text: `Plot A and Plot B are neighboring properties. In 1980, Plot A's owner granted Plot B a right of way across Plot A to access the main road. This was never registered.

In 2023, Plot A is sold to Emma, who blocks the access path with a locked gate. Plot B's current owner, James, claims he still has the right of way. Emma argues:
- She bought the property without notice of any right of way
- Nothing appears in her title deeds
- James has alternative access via a longer route
- The right wasn't registered, so it doesn't bind her

Discuss:
1. Nature of easements and how they're created
2. Requirements for an easement to bind successors
3. The registration requirement and notice doctrine
4. Whether James's easement binds Emma
5. Prescriptive acquisition if the original grant is invalid

Reference Re Ellenborough Park, Land and Conveyancing Law Reform Act 2009, and registration principles.`,
            points: 20,
            order: 3,
          },
          {
            type: 'ESSAY',
            subject: 'Property Law',
            year: 2024,
            examType: 'Essay',
            description: 'Co-ownership. Joint tenancy vs tenancy in common, severance, partition.',
            text: `"The presumption in favor of joint tenancy in Irish law is outdated and should be replaced with a presumption of tenancy in common to better reflect modern co-ownership realities."

Critically evaluate this statement. Your answer should:
1. Explain joint tenancy and tenancy in common
2. Discuss the right of survivorship and its implications
3. Analyze methods of severance
4. Evaluate whether the current presumptions are appropriate
5. Consider reform proposals

Reference Land and Conveyancing Law Reform Act 2009, Partition Acts, and case law on co-ownership.`,
            points: 20,
            order: 4,
          },
        ],
      },
    },
  });
  console.log('✅ Created Set 6: Property Law');

  // ============================================
  // SET 7: CONSTITUTIONAL LAW
  // ============================================
  await prisma.question.create({
    data: {
      type: 'ESSAY',
      subject: 'Constitutional Law',
      year: 2024,
      examType: 'Essay',
      description:
        'Separation of powers. Judicial review, legislative supremacy, executive accountability.',
      text: `"The Irish Constitution's separation of powers doctrine is undermined by executive dominance over the Oireachtas."

Critically evaluate this statement. Your answer should:
1. Explain the separation of powers principle under the Constitution
2. Discuss the relationship between the executive and legislature
3. Analyze the role of judicial review in maintaining separation
4. Evaluate whether executive dominance poses a constitutional problem
5. Consider potential reforms

Reference relevant constitutional provisions, case law including Cityview Press v AnCO, and academic commentary.`,
      points: 20,
      order: 7,
      isPublished: true,
      questionSets: {
        create: [
          {
            type: 'ESSAY',
            subject: 'Constitutional Law',
            year: 2024,
            examType: 'Essay',
            description:
              'Separation of powers. Judicial review, legislative supremacy, executive accountability.',
            text: `"The Irish Constitution's separation of powers doctrine is undermined by executive dominance over the Oireachtas."

Critically evaluate this statement. Your answer should:
1. Explain the separation of powers principle under the Constitution
2. Discuss the relationship between the executive and legislature
3. Analyze the role of judicial review in maintaining separation
4. Evaluate whether executive dominance poses a constitutional problem
5. Consider potential reforms

Reference relevant constitutional provisions, case law including Cityview Press v AnCO, and academic commentary.`,
            points: 20,
            order: 1,
          },
          {
            type: 'ESSAY',
            subject: 'Constitutional Law',
            year: 2024,
            examType: 'Problem',
            description: 'Fundamental rights. Freedom of expression, proportionality test.',
            text: `The Oireachtas passes the "Online Safety Act 2024" which requires social media companies to remove "harmful content" within 24 hours or face fines. "Harmful content" is defined broadly as content that "may cause distress."

A political blogger, criticized for controversial views on immigration, has their posts removed. They challenge the Act as unconstitutional, arguing it violates freedom of expression under Article 40.6.1.

The State argues the Act is necessary to protect vulnerable persons from online abuse and that the restriction is proportionate.

Discuss:
1. The constitutional protection for freedom of expression
2. Permissible restrictions on fundamental rights
3. The proportionality test and its application
4. Whether the Act is constitutional
5. ECHR and EU law considerations

Reference O'Brien v MGN, Corway v Independent Newspapers, and proportionality case law.`,
            points: 20,
            order: 2,
          },
          {
            type: 'ESSAY',
            subject: 'Constitutional Law',
            year: 2024,
            examType: 'Problem',
            description: 'Equality and non-discrimination. Article 40.1, suspect classifications.',
            text: `A new law provides free public transport for persons aged 70 and over. Citizens aged 65-69 challenge it as unconstitutional age discrimination under Article 40.1.

The State argues:
- The age 70 threshold is based on actuarial data about mobility needs
- Limited resources require line-drawing
- The measure promotes social solidarity with the elderly

The challengers argue:
- The distinction is arbitrary
- Persons aged 65-69 have similar needs
- Age-based classifications require heightened scrutiny

Discuss the constitutional protection of equality, the standard of review for age-based classifications, and whether the law is constitutional.

Reference Quinn's Supermarket v AG, Lowth v Minister for Social Welfare, and equality jurisprudence.`,
            points: 20,
            order: 3,
          },
          {
            type: 'ESSAY',
            subject: 'Constitutional Law',
            year: 2024,
            examType: 'Essay',
            description: 'Amendment process. Referendum requirements, popular sovereignty.',
            text: `"The rigid amendment procedure in the Irish Constitution protects fundamental rights but may also prevent necessary modernization."

Critically evaluate this statement. Your answer should:
1. Explain the constitutional amendment procedure under Article 46
2. Compare with amendment procedures in other jurisdictions
3. Discuss the advantages and disadvantages of the Irish approach
4. Analyze whether reform of the amendment process itself is needed
5. Consider recent referendum experiences

Reference Article 46, Re Article 26 and the Regulation of Information Bill, and academic commentary.`,
            points: 20,
            order: 4,
          },
        ],
      },
    },
  });
  console.log('✅ Created Set 7: Constitutional Law');

  // ============================================
  // SET 8: EUROPEAN UNION LAW
  // ============================================
  await prisma.question.create({
    data: {
      type: 'ESSAY',
      subject: 'European Union Law',
      year: 2024,
      examType: 'Essay',
      description: 'Supremacy of EU law. Primacy, direct effect, state liability.',
      text: `"The principle of supremacy of EU law represents an unacceptable limitation on national sovereignty."

Critically evaluate this statement. Your answer should:
1. Explain the supremacy principle and its development in ECJ jurisprudence
2. Discuss the relationship between EU law and national constitutional law
3. Analyze the Irish approach to supremacy post-Lisbon Treaty
4. Evaluate tensions between supremacy and national sovereignty
5. Consider whether the balance is appropriate

Reference Costa v ENEL, Internationale Handelsgesellschaft, Crotty v An Taoiseach, and academic commentary.`,
      points: 20,
      order: 8,
      isPublished: true,
      questionSets: {
        create: [
          {
            type: 'ESSAY',
            subject: 'European Union Law',
            year: 2024,
            examType: 'Essay',
            description: 'Supremacy of EU law. Primacy, direct effect, state liability.',
            text: `"The principle of supremacy of EU law represents an unacceptable limitation on national sovereignty."

Critically evaluate this statement. Your answer should:
1. Explain the supremacy principle and its development in ECJ jurisprudence
2. Discuss the relationship between EU law and national constitutional law
3. Analyze the Irish approach to supremacy post-Lisbon Treaty
4. Evaluate tensions between supremacy and national sovereignty
5. Consider whether the balance is appropriate

Reference Costa v ENEL, Internationale Handelsgesellschaft, Crotty v An Taoiseach, and academic commentary.`,
            points: 20,
            order: 1,
          },
          {
            type: 'ESSAY',
            subject: 'European Union Law',
            year: 2024,
            examType: 'Problem',
            description: 'Free movement of goods. Customs duties, MEQRs, Cassis de Dijon.',
            text: `Ireland introduces a law requiring all imported wine to display health warnings covering 30% of the label in the Irish language. Domestic wine producers are exempt as they already use smaller warnings in English.

A French wine importer challenges the law, arguing it:
- Discriminates against imports
- Is disproportionate to health objectives
- Creates an unjustified barrier to trade

The Irish government argues the measure:
- Protects public health
- Promotes the Irish language (a legitimate cultural objective)
- Applies equally to all imports

Discuss whether the law violates Articles 34-36 TFEU on free movement of goods, and whether it can be justified.

Reference Dassonville, Cassis de Dijon, Keck, and proportionality case law.`,
            points: 20,
            order: 2,
          },
          {
            type: 'ESSAY',
            subject: 'European Union Law',
            year: 2024,
            examType: 'Problem',
            description: 'Free movement of workers. Citizenship rights, social advantages.',
            text: `Maria, a Spanish national, moves to Ireland and works as a nurse for 2 years. She then loses her job and claims unemployment benefits. The Irish authorities refuse, citing a rule that EU citizens must work for 5 years before qualifying for unemployment assistance.

Maria argues:
- She has worker status under EU law
- The 5-year rule discriminates based on nationality
- She should be treated equally with Irish nationals

The State argues:
- The rule prevents benefit tourism
- It's justified to protect the social security system
- Two years is insufficient to establish genuine links

Discuss Maria's rights under EU free movement law and whether the Irish rule is lawful.

Reference Directive 2004/38, Collins, Vatsouras, and worker status case law.`,
            points: 20,
            order: 3,
          },
          {
            type: 'ESSAY',
            subject: 'European Union Law',
            year: 2024,
            examType: 'Essay',
            description:
              'EU Charter of Fundamental Rights. Horizontal effect, scope of application.',
            text: `"The EU Charter of Fundamental Rights has transformed the protection of rights in EU law but its limited scope of application creates gaps in protection."

Critically evaluate this statement. Your answer should:
1. Explain the scope of the Charter under Article 51
2. Discuss when the Charter applies to Member State action
3. Analyze the horizontal effect debate
4. Evaluate whether the Charter adequately protects rights
5. Consider relationship with ECHR

Reference Fransson, Egenberger, Bauer, and Charter case law.`,
            points: 20,
            order: 4,
          },
        ],
      },
    },
  });
  console.log('✅ Created Set 8: European Union Law');

  console.log('✅ All 5 new essay question sets created successfully!');
}

createNewEssaySets()
  .catch((e) => {
    console.error('❌ Creation failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
