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

  // ============================================
  // CRIMINAL LAW - MODULES & LESSONS
  // ============================================

  const criminalLaw = subjects[0];

  const module1 = await prisma.module.create({
    data: {
      subjectId: criminalLaw.id,
      name: 'Module 1: Foundations of Criminal Law',
      slug: 'foundations-of-criminal-law',
      description: 'Core principles and elements of criminal liability',
      order: 1,
      lessons: {
        create: [
          {
            title: 'Lesson 1: Characteristics of a Crime',
            slug: 'characteristics-of-a-crime',
            content: `# Characteristics of a Crime

## Introduction
A crime is conduct prohibited by law and subject to punishment by the state. In Irish criminal law, crimes possess several defining characteristics that distinguish them from civil wrongs.

## Key Elements
1. **Actus Reus** - The guilty act
2. **Mens Rea** - The guilty mind
3. **Causation** - Link between act and harm
4. **Absence of Defenses** - No lawful excuse

## Actus Reus
The physical element of a crime. It can be:
- A positive act (e.g., striking someone)
- An omission (failing to act when under a duty)
- A state of affairs (being in possession of drugs)

## Mens Rea
The mental element required for criminal liability:
- **Intention** - Purpose or aim to cause the result
- **Recklessness** - Conscious risk-taking
- **Negligence** - Failing to meet reasonable standards

## Important Cases
- **DPP v Murray** - Recklessness definition
- **Attorney General v O'Brien** - Actus reus principles

## Conclusion
Understanding these foundational concepts is essential for analyzing any criminal offense in Irish law.`,
            transcript: `0:00 - Welcome to FE-1 Criminal Law essentials. Today, we're diving deep into criminal formation - the absolute foundation you need to master.
0:15 - Let's start with the four essential elements of crime. First up - actus reus. This isn't just any statement - it must be a clear, definite, final expression of willingness to be bound.
1:20 - Think of it as: "I'm ready to commit if you accept my terms." Without this finality, we don't have actus reus - we might just have negotiations or preliminary discussions.
3:45 - Now let's talk mens rea - the guilty mind required for criminal liability...`,
            order: 1,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/lesson-1.mp4',
            videoPublicId: 'fe1/criminal-law/lesson-1',
            assets: {
              create: [
                {
                  type: 'PDF',
                  title: 'Characteristics of Crime - Summary Notes.pdf',
                  url: 'https://res.cloudinary.com/demo/image/upload/v1234567890/fe1/criminal-law/lesson-1-notes.pdf',
                  publicId: 'fe1/criminal-law/lesson-1-notes',
                  fileSize: 245678,
                  mimeType: 'application/pdf',
                  order: 1,
                },
              ],
            },
          },
          {
            title: 'Lesson 2: Classifications of Crimes',
            slug: 'classifications-of-crimes',
            content: `# Classifications of Crimes

## Indictable vs Summary Offences
Irish criminal law distinguishes between:

### Summary Offences
- Tried in District Court
- Less serious crimes
- Examples: Public order offences, minor assaults

### Indictable Offences
- Tried in Circuit Court or Central Criminal Court
- More serious crimes
- Examples: Murder, rape, robbery

## Arrestable vs Non-Arrestable
- **Arrestable**: Offences with 5+ years imprisonment
- **Non-Arrestable**: Lesser offences

## Statutory vs Common Law
- Most crimes now statutory (defined by Acts of Oireachtas)
- Few common law crimes remain (e.g., murder, manslaughter)`,
            transcript: `0:00 - Understanding how crimes are classified...
0:30 - Indictable offences are the serious ones...
1:45 - Summary offences are dealt with quickly in District Court...`,
            order: 2,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/lesson-2.mp4',
            videoPublicId: 'fe1/criminal-law/lesson-2',
          },
          {
            title: 'Lesson 3: Actus Reus',
            slug: 'actus-reus',
            content: `# Actus Reus - The Guilty Act

## Definition
Actus reus is the physical element of a crime - the external conduct prohibited by law.

## Types of Actus Reus

### 1. Positive Acts
Most crimes require a positive act:
- Striking (assault)
- Taking (theft)
- Killing (homicide)

### 2. Omissions
Liability for failing to act when under a duty:
- **Statutory duty**: Failure to wear seatbelt
- **Contractual duty**: Lifeguard fails to rescue
- **Special relationship**: Parent-child
- **Voluntary assumption**: Taking control of helpless person

**Key Case**: *People (DPP) v Dunleavy* - Parent's duty to protect child

### 3. State of Affairs
Being in a prohibited situation:
- Being drunk in public
- Possession of drugs

## Voluntariness
The act must be voluntary (willed by defendant):
- Reflex actions don't count
- Acts during epileptic seizure not voluntary

## Causation
The actus reus must cause the prohibited result.`,
            transcript: `0:00 - Actus reus explained...
1:00 - Three main types you must know...`,
            order: 3,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/lesson-3.mp4',
            videoPublicId: 'fe1/criminal-law/lesson-3',
          },
          {
            title: 'Lesson 4: Mens Rea',
            slug: 'mens-rea',
            content: `# Mens Rea - The Guilty Mind

## Introduction
Mens rea is the mental element of a crime - the defendant's state of mind at the time of the offense.

## Levels of Mens Rea

### 1. Intention
The highest level - purpose or aim to cause the result:
- **Direct intent**: Defendant's aim/purpose
- **Oblique intent**: Virtual certainty of consequence

### 2. Recklessness
Conscious risk-taking:
- Defendant aware of risk
- Unreasonable to take that risk
- **Key Case**: *R v Cunningham* (1957)

### 3. Negligence
Failing to meet reasonable standards:
- Objective test: What reasonable person would do
- Rare in criminal law (usually gross negligence required)

## Transferred Malice
If D intends to harm A but harms B instead, the mens rea transfers.

## Strict Liability
Some crimes require no mens rea (rare):
- Regulatory offences
- Public welfare crimes`,
            transcript: `0:00 - The guilty mind explained...`,
            order: 4,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/lesson-4.mp4',
            videoPublicId: 'fe1/criminal-law/lesson-4',
          },
          {
            title: 'Lesson 5: Coincidence of Actus Reus and Mens Rea',
            slug: 'coincidence-actus-reus-mens-rea',
            content: `# Coincidence of Actus Reus and Mens Rea

## The Requirement
For criminal liability, the actus reus and mens rea must coincide in time.

## Continuing Acts Doctrine
If the actus reus is a continuing act, mens rea can be formed during it:
- **Fagan v Metropolitan Police Commissioner** - Drove onto officer's foot accidentally, then refused to move (assault)

## Series of Acts Doctrine
Multiple acts can be treated as one transaction:
- **Thabo Meli v R** - Attacked victim, thought dead, threw off cliff (murder despite mistiming)

## Practical Application
Most crimes: mens rea and actus reus happen simultaneously. These doctrines handle unusual timing issues.`,
            transcript: `0:00 - Timing is everything in criminal law...`,
            order: 5,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/lesson-5.mp4',
            videoPublicId: 'fe1/criminal-law/lesson-5',
          },
        ],
      },
    },
  });

  const module2 = await prisma.module.create({
    data: {
      subjectId: criminalLaw.id,
      name: 'Module 2: Offences Against the Person',
      slug: 'offences-against-the-person',
      description: 'Assault, battery, homicide, and sexual offences',
      order: 2,
      lessons: {
        create: [
          {
            title: 'Lesson 1: Common Assault and Battery',
            slug: 'common-assault-battery',
            content: `# Common Assault and Battery

## Definitions

### Assault
Causing another to apprehend immediate unlawful force.
- No physical contact required
- Victim must fear imminent harm
- Words alone can constitute assault

### Battery
Unlawful application of force to another person.
- Requires physical contact
- Can be direct or indirect
- Force need not cause injury

## Key Elements
- **Unlawfulness**: No consent, no lawful excuse
- **Intention or Recklessness**: Mens rea required
- **Lack of Consent**: Victim did not agree

## Defenses
- Consent (limited scope)
- Self-defense
- Prevention of crime

## Sentencing
- Summary: Up to 6 months
- Indictable: Up to 5 years (s.3 Non-Fatal Offences Act 1997)`,
            transcript: `0:00 - Assault and battery explained...`,
            order: 1,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/module2-lesson-1.mp4',
            videoPublicId: 'fe1/criminal-law/module2-lesson-1',
          },
          {
            title: 'Lesson 2: Assault Causing Harm',
            slug: 'assault-causing-harm',
            content: `# Assault Causing Harm (s.3 NFOAA 1997)

## Definition
Assault causing harm to another.

**"Harm"** = injury to body or mind (including pain or discomfort).

## Elements
1. Assault (as defined previously)
2. Causes harm
3. Intention or recklessness

## Distinction from Common Assault
- Requires actual harm (not just fear or minor contact)
- More serious penalty: up to 5 years

## Sentencing
- Summary: Up to 12 months
- Indictable: Up to 5 years`,
            transcript: `0:00 - Moving up to more serious assaults...`,
            order: 2,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/module2-lesson-2.mp4',
            videoPublicId: 'fe1/criminal-law/module2-lesson-2',
          },
          {
            title: 'Lesson 3: Assault Causing Serious Harm',
            slug: 'assault-causing-serious-harm',
            content: `# Assault Causing Serious Harm (s.4 NFOAA 1997)

## Definition
Intentionally or recklessly causing serious harm to another.

**"Serious Harm"** = injury creating substantial risk of death, serious disfigurement, or substantial loss/impairment of body function.

## Elements
1. Assault
2. Causes serious harm
3. Intention or recklessness

## Examples of Serious Harm
- Broken bones
- Permanent scarring
- Loss of consciousness
- Internal injuries

## Sentencing
- Indictable only: Up to life imprisonment (if intent to cause SH)`,
            transcript: `0:00 - The most serious assault offence...`,
            order: 3,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/module2-lesson-3.mp4',
            videoPublicId: 'fe1/criminal-law/module2-lesson-3',
          },
        ],
      },
    },
  });

  const module3 = await prisma.module.create({
    data: {
      subjectId: criminalLaw.id,
      name: 'Module 3: Property and Economic Offences',
      slug: 'property-economic-offences',
      description: 'Theft, robbery, burglary, and fraud',
      order: 3,
      lessons: {
        create: [
          {
            title: 'Lesson 1: Theft',
            slug: 'theft',
            content: '# Theft\n\nDishonest appropriation of property...',
            transcript: '0:00 - Theft explained...',
            order: 1,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/module3-lesson-1.mp4',
            videoPublicId: 'fe1/criminal-law/module3-lesson-1',
          },
          {
            title: 'Lesson 2: Robbery',
            slug: 'robbery',
            content: '# Robbery\n\nTheft with force or threat of force...',
            transcript: '0:00 - Robbery explained...',
            order: 2,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/module3-lesson-2.mp4',
            videoPublicId: 'fe1/criminal-law/module3-lesson-2',
          },
          {
            title: 'Lesson 3: Burglary',
            slug: 'burglary',
            content: '# Burglary\n\nUnauthorized entry with intent to commit offense...',
            transcript: '0:00 - Burglary explained...',
            order: 3,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/module3-lesson-3.mp4',
            videoPublicId: 'fe1/criminal-law/module3-lesson-3',
          },
        ],
      },
    },
  });

  console.log('✅ Created Criminal Law modules and lessons');

  const contractLaw = subjects[1]; // Already created in subjects array

  const contractModule1 = await prisma.module.create({
    data: {
      subjectId: contractLaw.id,
      name: 'Module 1: Contract Formation',
      slug: 'contract-formation',
      description: 'Offer, acceptance, consideration, and intention',
      order: 1,
      lessons: {
        create: [
          {
            title: 'Lesson 1: Offer',
            slug: 'offer',
            content: '# Offer\n\nA definite promise to be bound...',
            transcript: '0:00 - Offer explained...',
            order: 1,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/contract-law/module1-lesson-1.mp4',
            videoPublicId: 'fe1/contract-law/module1-lesson-1',
          },
          {
            title: 'Lesson 2: Acceptance',
            slug: 'acceptance',
            content: '# Acceptance\n\nUnqualified agreement to offer terms...',
            transcript: '0:00 - Acceptance explained...',
            order: 2,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/contract-law/module1-lesson-2.mp4',
            videoPublicId: 'fe1/contract-law/module1-lesson-2',
          },
        ],
      },
    },
  });

  const contractModule2 = await prisma.module.create({
    data: {
      subjectId: contractLaw.id,
      name: 'Module 2: Terms and Breach',
      slug: 'terms-and-breach',
      description: 'Express terms, implied terms, and breach',
      order: 2,
      lessons: {
        create: [
          {
            title: 'Lesson 1: Express Terms',
            slug: 'express-terms',
            content: '# Express Terms\n\nTerms explicitly agreed by parties...',
            transcript: '0:00 - Express terms explained...',
            order: 1,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/contract-law/module2-lesson-1.mp4',
            videoPublicId: 'fe1/contract-law/module2-lesson-1',
          },
          {
            title: 'Lesson 2: Breach of Contract',
            slug: 'breach-of-contract',
            content: '# Breach\n\nFailure to perform contractual obligations...',
            transcript: '0:00 - Breach explained...',
            order: 2,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/contract-law/module2-lesson-2.mp4',
            videoPublicId: 'fe1/contract-law/module2-lesson-2',
          },
        ],
      },
    },
  });

  const contractModule3 = await prisma.module.create({
    data: {
      subjectId: contractLaw.id,
      name: 'Module 3: Remedies',
      slug: 'remedies',
      description: 'Damages, specific performance, and injunctions',
      order: 3,
      lessons: {
        create: [
          {
            title: 'Lesson 1: Damages',
            slug: 'damages',
            content: '# Damages\n\nMonetary compensation for breach...',
            transcript: '0:00 - Damages explained...',
            order: 1,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/contract-law/module3-lesson-1.mp4',
            videoPublicId: 'fe1/contract-law/module3-lesson-1',
          },
          {
            title: 'Lesson 2: Specific Performance',
            slug: 'specific-performance',
            content: '# Specific Performance\n\nCourt order to perform contract...',
            transcript: '0:00 - Specific performance explained...',
            order: 2,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/contract-law/module3-lesson-2.mp4',
            videoPublicId: 'fe1/contract-law/module3-lesson-2',
          },
        ],
      },
    },
  });

  console.log('✅ Created Contract  Law modules and lessons');

  const tortLaw = subjects[2];

  const tortModule1 = await prisma.module.create({
    data: {
      subjectId: tortLaw.id,
      name: 'Module 1: Negligence Fundamentals',
      slug: 'negligence-fundamentals',
      description: 'Duty of care, breach, causation, and damages',
      order: 1,
      lessons: {
        create: [
          {
            title: 'Lesson 1: Duty of Care',
            slug: 'duty-of-care',
            content: '# Duty of Care\n\nNeighbour principle from Donoghue v Stevenson...',
            transcript: '0:00 - Duty of care explained...',
            order: 1,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/tort-law/module1-lesson-1.mp4',
            videoPublicId: 'fe1/tort-law/module1-lesson-1',
          },
          {
            title: 'Lesson 2: Breach of Duty',
            slug: 'breach-of-duty',
            content: '# Breach\n\nFalling below standard of reasonable person...',
            transcript: '0:00 - Breach explained...',
            order: 2,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/tort-law/module1-lesson-2.mp4',
            videoPublicId: 'fe1/tort-law/module1-lesson-2',
          },
        ],
      },
    },
  });

  const tortModule2 = await prisma.module.create({
    data: {
      subjectId: tortLaw.id,
      name: 'Module 2: Defamation',
      slug: 'defamation',
      description: 'Libel, slander, and defenses',
      order: 2,
      lessons: {
        create: [
          {
            title: 'Lesson 1: Elements of Defamation',
            slug: 'elements-defamation',
            content: '# Defamation\n\nFalse statement harming reputation...',
            transcript: '0:00 - Defamation explained...',
            order: 1,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/tort-law/module2-lesson-1.mp4',
            videoPublicId: 'fe1/tort-law/module2-lesson-1',
          },
          {
            title: 'Lesson 2: Defenses to Defamation',
            slug: 'defenses-defamation',
            content: '# Defenses\n\nTruth, fair comment, privilege...',
            transcript: '0:00 - Defenses explained...',
            order: 2,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/tort-law/module2-lesson-2.mp4',
            videoPublicId: 'fe1/tort-law/module2-lesson-2',
          },
        ],
      },
    },
  });

  const tortModule3 = await prisma.module.create({
    data: {
      subjectId: tortLaw.id,
      name: 'Module 3: Nuisance',
      slug: 'nuisance',
      description: 'Private and public nuisance',
      order: 3,
      lessons: {
        create: [
          {
            title: 'Lesson 1: Private Nuisance',
            slug: 'private-nuisance',
            content: '# Private Nuisance\n\nUnreasonable interference with land use...',
            transcript: '0:00 - Private nuisance explained...',
            order: 1,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/tort-law/module3-lesson-1.mp4',
            videoPublicId: 'fe1/tort-law/module3-lesson-1',
          },
          {
            title: 'Lesson 2: Public Nuisance',
            slug: 'public-nuisance',
            content: '# Public Nuisance\n\nInterference with public rights...',
            transcript: '0:00 - Public nuisance explained...',
            order: 2,
            videoUrl:
              'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/tort-law/module3-lesson-2.mp4',
            videoPublicId: 'fe1/tort-law/module3-lesson-2',
          },
        ],
      },
    },
  });

  console.log('✅ Created tortlaw Law modules and lessons');



  await prisma.question.createMany({
    data: [
      // Module 1 Questions  -- crimninal law
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'Which of the following best describes recklessness as defined in Irish Criminal Law?',
        options: JSON.stringify([
          'A: Awareness of risk + unreasonable risk-taking (R v Cunningham)',
          'B: Mistake in judgment about legal consequences',
          'C: Objective test - what reasonable person would foresee',
          'D: Comprehensive failure to exercise due care in every circumstance',
        ]),
        correctAnswer: 'A',
        explanation:
          'Recklessness involves consciously disregarding a known risk — see R v Cunningham (1957). The defendant must be aware of the risk and it must be unreasonable to take that risk.',
        points: 1,
        order: 1,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'In which scenario would there likely be NO actus reus?',
        options: JSON.stringify([
          'A: Defendant drives car into pedestrian during epileptic seizure',
          'B: Defendant fails to rescue drowning child they have no duty toward',
          'C: Defendant possesses drugs unknowingly placed in their bag',
          'D: Both A and C',
        ]),
        correctAnswer: 'D',
        explanation:
          'Actus reus requires a voluntary act. Epileptic seizures and unknowing possession lack voluntariness, so there is no actus reus.',
        points: 1,
        order: 2,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'What is the significance of "transferred malice"?',
        options: JSON.stringify([
          'A: Defendant cannot be convicted if they harm unintended victim',
          'B: Mens rea transfers from intended victim to actual victim',
          'C: Only applies to property crimes, not personal violence',
          'D: Creates liability for negligence even without intent',
        ]),
        correctAnswer: 'B',
        explanation:
          'Transferred malice means if D intends to harm A but actually harms B, the mens rea transfers to B, and D can still be convicted.',
        points: 1,
        order: 3,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'Which case established the "continuing act" doctrine for coincidence of actus reus and mens rea?',
        options: JSON.stringify([
          'A: DPP v Murray',
          'B: Fagan v Metropolitan Police Commissioner',
          'C: Thabo Meli v R',
          "D: Attorney General v O'Brien",
        ]),
        correctAnswer: 'B',
        explanation:
          "Fagan v Metropolitan Police Commissioner - defendant drove onto officer's foot accidentally (no mens rea initially), then refused to move (mens rea formed during continuing actus reus).",
        points: 1,
        order: 4,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'Strict liability offences are characterized by:',
        options: JSON.stringify([
          'A: Requiring proof of both actus reus and mens rea',
          'B: No requirement to prove mens rea',
          'C: Only applicable to indictable offences',
          'D: Always involving moral culpability',
        ]),
        correctAnswer: 'B',
        explanation:
          'Strict liability offences do not require proof of mens rea - conviction based on actus reus alone. Common in regulatory/public welfare offences.',
        points: 1,
        order: 5,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'What distinguishes murder from manslaughter in Irish criminal law?',
        options: JSON.stringify([
          'A: Murder requires premeditation, manslaughter does not',
          'B: Murder requires malice aforethought (intent to kill or cause serious harm)',
          'C: Manslaughter is accidental killing, murder is intentional',
          'D: Murder carries mandatory life sentence, manslaughter does not',
        ]),
        correctAnswer: 'B',
        explanation:
          'Murder requires malice aforethought (intention to kill or cause serious harm). Manslaughter can be voluntary (with provocation) or involuntary (gross negligence).',
        points: 1,
        order: 6,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'A defendant claims they were forced to commit a crime under threat of death. Which defense applies?',
        options: JSON.stringify(['A: Self-defense', 'B: Necessity', 'C: Duress', 'D: Automatism']),
        correctAnswer: 'C',
        explanation:
          'Duress is a defense where defendant commits crime under threat of death or serious harm. Not available for murder.',
        points: 1,
        order: 7,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'Which element is NOT required for criminal liability?',
        options: JSON.stringify([
          'A: Actus reus (guilty act)',
          'B: Mens rea (guilty mind)',
          'C: Motive (reason for crime)',
          'D: Causation (act caused result)',
        ]),
        correctAnswer: 'C',
        explanation:
          'Motive is NOT an element of crime. The prosecution need not prove why defendant committed the offense, only that they did so with required mens rea.',
        points: 1,
        order: 8,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'Omissions can give rise to criminal liability when:',
        options: JSON.stringify([
          'A: Defendant has a legal duty to act and fails to do so',
          'B: Any time defendant could have prevented harm',
          'C: Defendant witnesses a crime and does not report it',
          'D: Defendant morally should have acted',
        ]),
        correctAnswer: 'A',
        explanation:
          'Omissions create liability only when defendant has a legal duty to act (statutory, contractual, special relationship, or voluntary assumption of care).',
        points: 1,
        order: 9,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'What is the "but for" test used to determine?',
        options: JSON.stringify([
          'A: Whether defendant had mens rea',
          'B: Factual causation (did act cause result)',
          'C: Legal causation (should defendant be liable)',
          'D: Whether defense is available',
        ]),
        correctAnswer: 'B',
        explanation:
          '"But for" test determines factual causation: "But for defendant\'s act, would the result have occurred?" If no, causation established.',
        points: 1,
        order: 10,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'Novus actus interveniens refers to:',
        options: JSON.stringify([
          'A: A new intervening act that breaks chain of causation',
          'B: The initial criminal act',
          "C: Defendant's mental state",
          "D: Victim's contribution to harm",
        ]),
        correctAnswer: 'A',
        explanation:
          "Novus actus interveniens (new intervening act) can break the chain of causation if it is unforeseeable and independent of defendant's act.",
        points: 1,
        order: 11,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'Which statement about intention is correct?',
        options: JSON.stringify([
          'A: Intention can never be inferred from consequences',
          'B: Oblique intention applies when result is virtually certain',
          'C: Intention and motive are the same thing',
          'D: Intention is always direct aim or purpose',
        ]),
        correctAnswer: 'B',
        explanation:
          'Oblique (indirect) intention: when consequence is virtually certain and defendant knows it, intention can be inferred even if not their direct aim.',
        points: 1,
        order: 12,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'The principle that ignorance of the law is no defense is known as:',
        options: JSON.stringify([
          'A: Actus reus',
          'B: Mens rea',
          'C: Ignorantia juris non excusat',
          'D: Doli incapax',
        ]),
        correctAnswer: 'C',
        explanation:
          "Ignorantia juris non excusat: ignorance of the law is no defense. Defendants cannot claim they didn't know act was illegal.",
        points: 1,
        order: 13,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'Doli incapax refers to:',
        options: JSON.stringify([
          'A: Children under 12 cannot commit crimes',
          'B: Insane persons lack criminal capacity',
          'C: Intoxicated persons lack mens rea',
          'D: Corporations cannot commit crimes',
        ]),
        correctAnswer: 'A',
        explanation:
          'Doli incapax: children under 12 are presumed incapable of crime. Ages 12-14 have rebuttable presumption of incapacity.',
        points: 1,
        order: 14,
      },
      {
        moduleId: module1.id,
        type: 'MCQ',
        text: 'Which best describes the "thin skull rule"?',
        options: JSON.stringify([
          'A: Defendant not liable if victim unusually vulnerable',
          'B: Defendant must take victim as they find them',
          "C: Victim's pre-existing condition breaks causation",
          'D: Only applies in civil law, not criminal',
        ]),
        correctAnswer: 'B',
        explanation:
          'Thin skull rule: defendant must take victim as found. If victim has pre-existing vulnerability that worsens harm, defendant still fully liable.',
        points: 1,
        order: 15,
      },

      // Module 2 Questions  -- crimninal law
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'What is the key difference between assault and battery?',
        options: JSON.stringify([
          'A: Assault requires injury, battery does not',
          'B: Assault is fear of harm, battery is application of force',
          'C: Battery is indictable, assault is summary',
          'D: No real difference - terms are interchangeable',
        ]),
        correctAnswer: 'B',
        explanation:
          'Assault = causing apprehension of immediate unlawful force (no contact needed). Battery = unlawful application of force (requires contact).',
        points: 1,
        order: 1,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'Under s.3 Non-Fatal Offences Against the Person Act 1997, "harm" means:',
        options: JSON.stringify([
          'A: Only physical injuries requiring medical treatment',
          'B: Injury to body or mind, including pain or discomfort',
          'C: Serious harm creating substantial risk of death',
          'D: Permanent disfigurement or impairment only',
        ]),
        correctAnswer: 'B',
        explanation:
          'Section 3 NFOAA defines "harm" broadly as injury to body or mind, including pain or discomfort. Does not require serious or permanent injury.',
        points: 1,
        order: 2,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'What level of harm triggers s.4 NFOAA 1997 (assault causing serious harm)?',
        options: JSON.stringify([
          'A: Any injury requiring medical attention',
          'B: Injury causing substantial risk of death or serious disfigurement',
          'C: Psychological trauma alone',
          'D: Minor cuts or bruises if intentionally inflicted',
        ]),
        correctAnswer: 'B',
        explanation:
          'Serious harm = injury creating substantial risk of death, serious disfigurement, or substantial loss/impairment of body function. Much higher threshold than ordinary "harm".',
        points: 1,
        order: 3,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'Which defense is NOT available to a charge of assault?',
        options: JSON.stringify([
          'A: Self-defense (reasonable force)',
          'B: Consent (in limited circumstances)',
          'C: Mistake of fact (reasonable belief)',
          'D: Provocation (complete defense)',
        ]),
        correctAnswer: 'D',
        explanation:
          'Provocation is NOT a complete defense to assault - it may reduce sentence but does not eliminate liability. Self-defense, limited consent, and reasonable mistake are valid defenses.',
        points: 1,
        order: 4,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'Maximum sentence for assault causing serious harm (s.4 NFOAA) with intent is:',
        options: JSON.stringify([
          'A: 5 years imprisonment',
          'B: 10 years imprisonment',
          'C: 14 years imprisonment',
          'D: Life imprisonment',
        ]),
        correctAnswer: 'D',
        explanation:
          'Section 4 NFOAA: assault causing serious harm with intent carries up to life imprisonment. Without intent (recklessness only), max is 10 years.',
        points: 1,
        order: 5,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'Words alone can constitute assault if:',
        options: JSON.stringify([
          'A: Never - assault requires physical gesture',
          'B: They cause victim to apprehend immediate unlawful force',
          'C: They are offensive or insulting',
          'D: Only if accompanied by threatening gesture',
        ]),
        correctAnswer: 'B',
        explanation:
          'Words alone can constitute assault if they cause reasonable apprehension of immediate unlawful force. Context matters.',
        points: 1,
        order: 6,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'Consent is a valid defense to assault in which scenario?',
        options: JSON.stringify([
          'A: Lawful sporting activity within rules',
          'B: Street fight between willing participants',
          'C: Sadomasochistic activity causing serious harm',
          'D: All of the above',
        ]),
        correctAnswer: 'A',
        explanation:
          'Consent valid for lawful sports, medical procedures, and minor harm. NOT valid for serious harm, street fights, or activities against public policy.',
        points: 1,
        order: 7,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'What makes assault "aggravated"?',
        options: JSON.stringify([
          'A: Use of weapon or intent to resist arrest',
          'B: Any assault causing harm',
          'C: Assault on stranger rather than acquaintance',
          'D: Assault motivated by anger',
        ]),
        correctAnswer: 'A',
        explanation:
          'Aggravated assault involves weapon, intent to commit indictable offense, or intent to resist/prevent lawful arrest/detention.',
        points: 1,
        order: 8,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'Can battery occur without assault?',
        options: JSON.stringify([
          'A: No - assault always precedes battery',
          'B: Yes - if victim unaware of impending contact',
          'C: Only in cases of indirect force',
          'D: Never - they are the same offense',
        ]),
        correctAnswer: 'B',
        explanation:
          'Battery can occur without assault if victim unaware (e.g., struck from behind). No apprehension = no assault, but contact = battery.',
        points: 1,
        order: 9,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'Which does NOT constitute "serious harm" under s.4 NFOAA?',
        options: JSON.stringify([
          'A: Broken jaw requiring surgery',
          'B: Severe bruising and pain',
          'C: Loss of kidney function',
          'D: Permanent facial scarring',
        ]),
        correctAnswer: 'B',
        explanation:
          'Severe bruising is "harm" (s.3) not "serious harm". Serious harm requires substantial risk of death, serious disfigurement, or substantial impairment.',
        points: 1,
        order: 10,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'Self-defense requires that force used be:',
        options: JSON.stringify([
          'A: Minimal force only',
          'B: Proportionate and reasonable in circumstances',
          'C: Less than force threatened',
          'D: Non-lethal in all cases',
        ]),
        correctAnswer: 'B',
        explanation:
          'Self-defense force must be reasonable and proportionate to threat. Can include lethal force if threat is of death/serious harm and proportionate.',
        points: 1,
        order: 11,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'Assault occasioning actual bodily harm (ABH) requires:',
        options: JSON.stringify([
          'A: Any assault that causes any injury',
          'B: Assault causing harm more than transient or trifling',
          'C: Intent to cause serious harm',
          'D: Use of a weapon',
        ]),
        correctAnswer: 'B',
        explanation:
          'ABH requires assault causing harm beyond merely transient or trifling. Includes any hurt or injury interfering with health or comfort.',
        points: 1,
        order: 12,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'Which is TRUE about poisoning offenses?',
        options: JSON.stringify([
          'A: Requires victim to be harmed',
          'B: Administering noxious substance is sufficient',
          'C: Only applies to lethal substances',
          'D: Requires intent to kill',
        ]),
        correctAnswer: 'B',
        explanation:
          'Poisoning offense complete upon administering noxious substance, regardless of whether harm results. Intent requirement varies by specific offense.',
        points: 1,
        order: 13,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'Wounding requires:',
        options: JSON.stringify([
          'A: Any breaking of skin',
          'B: Breaking of whole skin (both layers)',
          'C: Serious harm',
          'D: Use of sharp instrument',
        ]),
        correctAnswer: 'B',
        explanation:
          'Wounding requires breaking of continuity of whole skin (both dermis and epidermis). Internal bleeding alone not sufficient.',
        points: 1,
        order: 14,
      },
      {
        moduleId: module2.id,
        type: 'MCQ',
        text: 'False imprisonment requires:',
        options: JSON.stringify([
          'A: Physical restraints or locked room',
          'B: Complete restriction of movement in all directions',
          'C: Victim awareness of confinement',
          'D: Intent to permanently detain',
        ]),
        correctAnswer: 'B',
        explanation:
          'False imprisonment is unlawful restriction of liberty. Requires total restraint (blocked in all directions). No need for awareness, force, or prison.',
        points: 1,
        order: 15,
      },

      // Module 2 Questions -- crimninal law
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Under Irish law, theft requires:',
        options: JSON.stringify([
          'A: Permanent deprivation only',
          'B: Dishonest appropriation with intent to permanently deprive',
          'C: Taking and carrying away property',
          'D: Breaking and entering',
        ]),
        correctAnswer: 'B',
        explanation:
          'Theft: dishonest appropriation of property belonging to another with intention of permanently depriving the other of it.',
        points: 1,
        order: 1,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'What distinguishes robbery from theft?',
        options: JSON.stringify([
          'A: Value of property taken',
          'B: Use or threat of force before or at time of stealing',
          'C: Taking from person rather than building',
          'D: Intent to sell stolen property',
        ]),
        correctAnswer: 'B',
        explanation:
          'Robbery is theft with force or threat of force immediately before or at time of stealing and in order to steal.',
        points: 1,
        order: 2,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Burglary is committed when defendant:',
        options: JSON.stringify([
          'A: Enters building as trespasser with intent to steal',
          'B: Steals from any building',
          'C: Breaks window to enter property',
          'D: Trespasses on land',
        ]),
        correctAnswer: 'A',
        explanation:
          'Burglary: entering building as trespasser with intent to commit theft, assault, or criminal damage (or attempting/committing these inside).',
        points: 1,
        order: 3,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Can you steal property you already own?',
        options: JSON.stringify([
          'A: No - never',
          'B: Yes - if someone else has possession or control of it',
          'C: Only if property was originally stolen',
          'D: Yes - in all circumstances',
        ]),
        correctAnswer: 'B',
        explanation:
          'Can steal own property if another has lawful possession/control (e.g., property held by bailee, or subject to trust).',
        points: 1,
        order: 4,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Appropriation occurs when defendant:',
        options: JSON.stringify([
          'A: Only physically takes property',
          'B: Assumes any right of owner',
          'C: Only sells or destroys property',
          'D: Removes property from premises',
        ]),
        correctAnswer: 'B',
        explanation:
          'Appropriation is assuming any of the rights of an owner (using, selling, destroying, keeping, etc.). Even touching can be appropriation.',
        points: 1,
        order: 5,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Dishonesty is NOT present when defendant:',
        options: JSON.stringify([
          'A: Believes they have legal right to property',
          'B: Intends to return property later',
          'C: Finds property and keeps it',
          'D: Takes property secretly',
        ]),
        correctAnswer: 'A',
        explanation:
          'Defendant not dishonest if they believe they have legal right to property, or owner would consent, or owner cannot be found (reasonable steps taken).',
        points: 1,
        order: 6,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Handling stolen goods requires:',
        options: JSON.stringify([
          'A: Knowledge goods are stolen',
          'B: Knowing or believing goods are stolen',
          'C: Actual participation in theft',
          'D: Receiving payment for goods',
        ]),
        correctAnswer: 'B',
        explanation:
          'Handling: dishonestly receiving, retaining, removing, disposing of, or realizing stolen goods, knowing or believing them to be stolen.',
        points: 1,
        order: 7,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Making off without payment applies when:',
        options: JSON.stringify([
          'A: Any theft from shop',
          'B: Dishonestly leaving without paying when payment expected on spot',
          'C: Refusing to pay disputed bill',
          'D: Leaving restaurant without money',
        ]),
        correctAnswer: 'B',
        explanation:
          'Making off: dishonestly making off without paying for goods/services where payment expected on the spot. Must know payment required.',
        points: 1,
        order: 8,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Fraud by false representation requires:',
        options: JSON.stringify([
          'A: Victim to suffer loss',
          'B: Dishonest false representation made knowingly to gain/cause loss',
          'C: Written statement only',
          'D: Successful deception',
        ]),
        correctAnswer: 'B',
        explanation:
          'Fraud: dishonestly making false representation knowing it is/might be false, with intent to gain or cause loss. No need for actual gain/loss.',
        points: 1,
        order: 9,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Blackmail consists of:',
        options: JSON.stringify([
          'A: Any threat',
          'B: Unwarranted demand with menaces with view to gain/cause loss',
          'C: Threatening physical violence only',
          'D: Demanding money',
        ]),
        correctAnswer: 'B',
        explanation:
          'Blackmail: making unwarranted demand with menaces (threats) with view to gain for self/another or intent to cause loss. Threats can be any type.',
        points: 1,
        order: 10,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Criminal damage requires:',
        options: JSON.stringify([
          'A: Permanent destruction only',
          'B: Destroying or damaging property belonging to another without lawful excuse',
          'C: Using fire or explosives',
          'D: Causing financial loss over certain amount',
        ]),
        correctAnswer: 'B',
        explanation:
          'Criminal damage: intentionally or recklessly destroying/damaging property belonging to another without lawful excuse. Temporary damage sufficient.',
        points: 1,
        order: 11,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Lawful excuse for criminal damage includes:',
        options: JSON.stringify([
          'A: Belief owner would consent',
          'B: Acting out of anger',
          'C: Damaging own property in all cases',
          'D: Revenge for previous wrong',
        ]),
        correctAnswer: 'A',
        explanation:
          "Lawful excuse: belief owner would consent, or acting to protect property (own or another's) and reasonable in circumstances.",
        points: 1,
        order: 12,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Arson is:',
        options: JSON.stringify([
          'A: Any fire-setting',
          'B: Criminal damage by fire',
          'C: Endangering life by fire',
          'D: Burning buildings only',
        ]),
        correctAnswer: 'B',
        explanation:
          'Arson is criminal damage caused by fire. Can apply to any property. More serious if life endangered.',
        points: 1,
        order: 13,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Taking a vehicle without authority (TWOC) differs from theft because:',
        options: JSON.stringify([
          'A: No intent to permanently deprive required',
          'B: Only applies to cars not other vehicles',
          'C: No dishonesty required',
          'D: All of the above',
        ]),
        correctAnswer: 'A',
        explanation:
          'TWOC: taking vehicle without owner consent without intent to permanently deprive. Lower offense than theft as may intend to return it.',
        points: 1,
        order: 14,
      },
      {
        moduleId: module3.id,
        type: 'MCQ',
        text: 'Aggravated burglary requires:',
        options: JSON.stringify([
          'A: Burglary of dwelling',
          'B: Burglary while having weapon or firearm or explosive',
          'C: Burglary causing serious harm',
          'D: Repeat burglary offense',
        ]),
        correctAnswer: 'B',
        explanation:
          'Aggravated burglary: committing burglary while having with them any firearm, weapon, or explosive. Much more serious offense.',
        points: 1,
        order: 15,
      },
      // Contract Module 1 - Questions (1-15)
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'A valid offer must be:',
        options: JSON.stringify([
          'A: In writing',
          'B: Communicated to offeree and sufficiently certain',
          'C: Accepted immediately',
          'D: Made to specific person only',
        ]),
        correctAnswer: 'B',
        explanation:
          'Valid offer must be communicated to offeree, sufficiently certain in terms, and demonstrate intention to be bound if accepted.',
        points: 1,
        order: 1,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'An invitation to treat is:',
        options: JSON.stringify([
          'A: Same as an offer',
          'B: Invitation to make an offer (e.g., shop display)',
          'C: A binding promise',
          'D: Acceptance of offer',
        ]),
        correctAnswer: 'B',
        explanation:
          'Invitation to treat invites others to make offers. Examples: shop displays, advertisements, auction catalogs. Not binding until offer accepted.',
        points: 1,
        order: 2,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Counter-offer has what effect on original offer?',
        options: JSON.stringify([
          'A: No effect',
          'B: Keeps original offer open',
          'C: Destroys original offer',
          'D: Extends time for acceptance',
        ]),
        correctAnswer: 'C',
        explanation:
          'Counter-offer destroys original offer (Hyde v Wrench). Cannot later accept original offer after making counter-offer.',
        points: 1,
        order: 3,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Acceptance must be:',
        options: JSON.stringify([
          'A: In writing',
          'B: Unqualified and communicated',
          'C: Made within 24 hours',
          'D: Verbal only',
        ]),
        correctAnswer: 'B',
        explanation:
          'Acceptance must be unqualified (mirror image of offer) and communicated to offeror. Can be express or implied by conduct.',
        points: 1,
        order: 4,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Postal rule of acceptance states:',
        options: JSON.stringify([
          'A: Acceptance effective when posted (properly addressed)',
          'B: Acceptance effective when received',
          'C: Only applies to business contracts',
          'D: Offer can be withdrawn after posting acceptance',
        ]),
        correctAnswer: 'A',
        explanation:
          'Postal rule: acceptance by post effective when properly posted, even if lost in mail. Offeror cannot revoke after acceptance posted.',
        points: 1,
        order: 5,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Consideration must be:',
        options: JSON.stringify([
          'A: Adequate and sufficient',
          'B: Sufficient but need not be adequate',
          'C: Equal value to promise',
          'D: Money only',
        ]),
        correctAnswer: 'B',
        explanation:
          "Consideration must be sufficient (have some value in eyes of law) but need not be adequate (equal value). Courts don't assess fairness.",
        points: 1,
        order: 6,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Past consideration is:',
        options: JSON.stringify([
          'A: Valid consideration',
          'B: Not valid consideration (already performed)',
          'C: Valid if recent',
          'D: Valid between family members',
        ]),
        correctAnswer: 'B',
        explanation:
          'Past consideration (act done before promise) is not valid. Consideration must be given in exchange for promise, not before it.',
        points: 1,
        order: 7,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Performing an existing legal duty:',
        options: JSON.stringify([
          'A: Is always valid consideration',
          'B: Is generally not valid consideration',
          'C: Is valid if duty owed to third party',
          'D: Both B and C',
        ]),
        correctAnswer: 'D',
        explanation:
          'Performing existing duty to promisor generally not consideration. BUT performing duty owed to third party CAN be consideration.',
        points: 1,
        order: 8,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Intention to create legal relations is presumed in:',
        options: JSON.stringify([
          'A: All agreements',
          'B: Commercial agreements (rebuttable)',
          'C: Family/social agreements',
          'D: Verbal agreements only',
        ]),
        correctAnswer: 'B',
        explanation:
          'Commercial agreements: presumption of intention to create legal relations. Family/social: presumption of NO intention (both rebuttable).',
        points: 1,
        order: 9,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Silence can constitute acceptance when:',
        options: JSON.stringify([
          'A: Always',
          'B: Never - must be positive act',
          'C: In rare cases where previous dealings establish pattern',
          'D: If offeror says so',
        ]),
        correctAnswer: 'C',
        explanation:
          'Generally silence not acceptance (Felthouse v Bindley). Exception: previous dealings/conduct establish that silence means acceptance.',
        points: 1,
        order: 10,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Revocation of offer must be:',
        options: JSON.stringify([
          'A: In writing',
          'B: Communicated before acceptance',
          'C: Confirmed by offeree',
          'D: Made by offeror personally',
        ]),
        correctAnswer: 'B',
        explanation:
          'Offer can be revoked any time before acceptance, but revocation must be communicated to offeree. Can be communicated by reliable third party.',
        points: 1,
        order: 11,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Offer terminates when:',
        options: JSON.stringify([
          'A: Rejected, revoked, lapse of time, or death of offeror',
          'B: Offeree delays response',
          'C: Offeror changes mind (without communication)',
          'D: Market conditions change',
        ]),
        correctAnswer: 'A',
        explanation:
          'Offer ends by: rejection, revocation, lapse of reasonable time (or specified time), failure of condition, or death of offeror before acceptance.',
        points: 1,
        order: 12,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Battle of forms occurs when:',
        options: JSON.stringify([
          'A: Both parties use standard form contracts with conflicting terms',
          'B: Contract disputed in court',
          'C: Offer made in writing and accepted verbally',
          'D: Multiple offers made',
        ]),
        correctAnswer: 'A',
        explanation:
          'Battle of forms: each party uses own standard terms. Last shot rule: terms of last document before performance usually prevail.',
        points: 1,
        order: 13,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Unilateral contract is:',
        options: JSON.stringify([
          'A: One-sided unfair contract',
          'B: Promise in exchange for act (e.g., reward)',
          'C: Contract with one party only',
          'D: Verbal agreement',
        ]),
        correctAnswer: 'B',
        explanation:
          'Unilateral contract: promise in exchange for performance of act (not promise). Example: reward offers. Acceptance by complete performance.',
        points: 1,
        order: 14,
      },
      {
        moduleId: contractModule1.id,
        type: 'MCQ',
        text: 'Certainty of terms requires:',
        options: JSON.stringify([
          'A: Every detail specified',
          'B: Essential terms agreed (parties, subject matter, price)',
          'C: Written contract',
          'D: Lawyer involvement',
        ]),
        correctAnswer: 'B',
        explanation:
          'Essential terms must be certain: parties, subject matter, price (or mechanism to determine). Minor details can be implied or determined later.',
        points: 1,
        order: 15,
      },

      // Contract Module 2 - Questions (1-15)
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Express terms are:',
        options: JSON.stringify([
          'A: Implied by law',
          'B: Explicitly stated by parties (written or oral)',
          'C: Standard industry terms',
          'D: Terms favorable to consumer',
        ]),
        correctAnswer: 'B',
        explanation:
          'Express terms are explicitly agreed by parties (written or oral). Distinguished from implied terms added by law, custom, or necessity.',
        points: 1,
        order: 1,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Condition vs warranty distinction matters because:',
        options: JSON.stringify([
          'A: Conditions in writing, warranties oral',
          'B: Breach of condition allows termination, warranty only damages',
          'C: Conditions more important legally',
          'D: No real difference',
        ]),
        correctAnswer: 'B',
        explanation:
          'Condition: essential term, breach allows termination + damages. Warranty: minor term, breach allows damages only, not termination.',
        points: 1,
        order: 2,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Terms implied by statute include:',
        options: JSON.stringify([
          'A: Terms parties intended',
          'B: Sale of Goods Act terms (title, description, quality, fitness)',
          'C: Industry custom terms',
          'D: Fair terms',
        ]),
        correctAnswer: 'B',
        explanation:
          'Sale of Goods Act implies terms: seller has right to sell, goods match description, satisfactory quality, fit for purpose (if made known).',
        points: 1,
        order: 3,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Satisfactory quality means:',
        options: JSON.stringify([
          'A: Perfect condition',
          'B: Standard reasonable person would regard as satisfactory',
          'C: Industry best practice',
          'D: Expensive goods',
        ]),
        correctAnswer: 'B',
        explanation:
          'Satisfactory quality: meeting standard reasonable person would regard as satisfactory considering price, description, and circumstances.',
        points: 1,
        order: 4,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Fitness for purpose requires:',
        options: JSON.stringify([
          'A: Goods perfect',
          "B: Buyer made purpose known and relied on seller's skill",
          'C: Written warranty',
          'D: Inspection before purchase',
        ]),
        correctAnswer: 'B',
        explanation:
          "Fitness for purpose implied when: buyer makes purpose known, seller deals in such goods, buyer relies on seller's skill/judgment.",
        points: 1,
        order: 5,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Terms implied by custom require:',
        options: JSON.stringify([
          'A: Written trade rules',
          'B: Notorious, certain, reasonable, and lawful custom',
          'C: Government approval',
          "D: Both parties' agreement",
        ]),
        correctAnswer: 'B',
        explanation:
          'Custom/usage implied if: notorious (well-known), certain, reasonable, lawful, and not inconsistent with express terms.',
        points: 1,
        order: 6,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Business efficacy test implies terms:',
        options: JSON.stringify([
          'A: To make business profitable',
          'B: Necessary to give contract business efficacy (workability)',
          'C: Favorable to business party',
          'D: Standard business terms',
        ]),
        correctAnswer: 'B',
        explanation:
          'Implied by necessity: term must be necessary to give business efficacy. "Officious bystander" test: obviously intended by parties.',
        points: 1,
        order: 7,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Exclusion clause must be:',
        options: JSON.stringify([
          'A: In bold text',
          'B: Incorporated into contract and cover breach that occurred',
          'C: Signed separately',
          'D: Notarized',
        ]),
        correctAnswer: 'B',
        explanation:
          'Exclusion clause valid if: incorporated (signature, notice, or course of dealing) and covers the breach (clear words, contra proferentem rule).',
        points: 1,
        order: 8,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Contra proferentem rule means:',
        options: JSON.stringify([
          'A: Exclusion clauses favored',
          'B: Ambiguous exclusion clause interpreted against party relying on it',
          'C: Latin terms preferred',
          'D: Professional advice required',
        ]),
        correctAnswer: 'B',
        explanation:
          'Contra proferentem: ambiguity in exclusion clause interpreted strictly against party seeking to rely on it (usually the drafter).',
        points: 1,
        order: 9,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Fundamental breach doctrine states:',
        options: JSON.stringify([
          'A: Exclusion clause can never exclude liability for serious breach',
          'B: Exclusion clause may not cover fundamental breach (construction question)',
          'C: All breaches fundamental',
          'D: Breach must be intentional',
        ]),
        correctAnswer: 'B',
        explanation:
          'Modern view: exclusion clause CAN cover fundamental breach if wording clear. Question of construction whether clause covers that breach.',
        points: 1,
        order: 10,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Actual breach occurs when:',
        options: JSON.stringify([
          'A: Contract made',
          'B: Party fails to perform obligation when due',
          'C: Party threatens not to perform',
          'D: Contract difficult to perform',
        ]),
        correctAnswer: 'B',
        explanation:
          'Actual breach: failure to perform contractual obligation when performance due. Distinguished from anticipatory breach (renunciation before due).',
        points: 1,
        order: 11,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Anticipatory breach allows innocent party to:',
        options: JSON.stringify([
          'A: Wait until performance due',
          'B: Immediately treat contract as repudiated',
          'C: Either A or B',
          'D: Neither - must perform',
        ]),
        correctAnswer: 'C',
        explanation:
          'Anticipatory breach: innocent party can either accept repudiation immediately, or wait until performance due (but risks intervening events).',
        points: 1,
        order: 12,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Repudiation requires:',
        options: JSON.stringify([
          'A: Written notice',
          'B: Clear indication party will not perform essential obligation',
          'C: Court order',
          'D: Breach of any term',
        ]),
        correctAnswer: 'B',
        explanation:
          'Repudiation: words or conduct showing clear intention not to be bound or inability to perform essential obligation. Must be unequivocal.',
        points: 1,
        order: 13,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Substantial performance doctrine means:',
        options: JSON.stringify([
          'A: Perfect performance not required',
          'B: Party performed substantially can claim payment minus deduction for defects',
          'C: Any performance sufficient',
          'D: Partial performance equals full payment',
        ]),
        correctAnswer: 'B',
        explanation:
          'Substantial performance: if party substantially performed (not trivial defects), can claim payment minus deduction for defects. Not total breach.',
        points: 1,
        order: 14,
      },
      {
        moduleId: contractModule2.id,
        type: 'MCQ',
        text: 'Time is of the essence when:',
        options: JSON.stringify([
          'A: Always',
          'B: Expressly stated, or implied by nature of contract',
          'C: Contract in writing',
          'D: Never',
        ]),
        correctAnswer: 'B',
        explanation:
          'Time of essence: express statement, or implied by circumstances (commercial context, perishable goods). Late performance then breach of condition.',
        points: 1,
        order: 15,
      },

      // Contract Module 3 - Questions (1-15)
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Purpose of contractual damages is to:',
        options: JSON.stringify([
          'A: Punish breaching party',
          'B: Put innocent party in position as if contract performed',
          'C: Compensate emotional distress',
          'D: Share loss equally',
        ]),
        correctAnswer: 'B',
        explanation:
          'Damages aim to put innocent party in position as if contract properly performed (expectation loss). Not punishment or windfall.',
        points: 1,
        order: 1,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Remoteness rule (Hadley v Baxendale) limits damages to:',
        options: JSON.stringify([
          'A: All losses',
          'B: Losses fairly and reasonably contemplated by parties',
          'C: Direct losses only',
          'D: Monetary losses',
        ]),
        correctAnswer: 'B',
        explanation:
          'Hadley v Baxendale: damages recoverable if loss was in reasonable contemplation of parties at time of contract as probable result of breach.',
        points: 1,
        order: 2,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Duty to mitigate means:',
        options: JSON.stringify([
          'A: Accept any alternative',
          'B: Take reasonable steps to reduce loss',
          'C: Forgive breach',
          'D: Insure against breach',
        ]),
        correctAnswer: 'B',
        explanation:
          'Innocent party must take reasonable steps to mitigate (reduce) loss. Cannot recover for loss that could have been reasonably avoided.',
        points: 1,
        order: 3,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Liquidated damages clause is enforceable if:',
        options: JSON.stringify([
          'A: Any amount agreed',
          'B: Genuine pre-estimate of loss (not penalty)',
          'C: Large sum',
          'D: In writing',
        ]),
        correctAnswer: 'B',
        explanation:
          'Liquidated damages: enforceable if genuine pre-estimate of loss. Penalty (extravagant/unconscionable) unenforceable.',
        points: 1,
        order: 4,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Specific performance is:',
        options: JSON.stringify([
          'A: Available for all breaches',
          'B: Discretionary equitable remedy requiring actual performance',
          'C: Same as damages',
          'D: Automatic remedy',
        ]),
        correctAnswer: 'B',
        explanation:
          'Specific performance: equitable discretionary remedy ordering actual performance. Granted when damages inadequate (e.g., unique goods, land).',
        points: 1,
        order: 5,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Specific performance NOT granted for:',
        options: JSON.stringify([
          'A: Sale of land',
          'B: Contracts of personal service (employment)',
          'C: Sale of unique goods',
          'D: Sale of shares',
        ]),
        correctAnswer: 'B',
        explanation:
          'Specific performance not granted: personal service contracts (involuntary servitude), contracts requiring constant supervision, inadequate consideration.',
        points: 1,
        order: 6,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Injunction is:',
        options: JSON.stringify([
          'A: Award of damages',
          'B: Court order restraining breach or requiring action',
          'C: Criminal penalty',
          'D: Termination of contract',
        ]),
        correctAnswer: 'B',
        explanation:
          'Injunction: equitable remedy. Prohibitory (stop doing) or mandatory (do something). Often used to enforce negative covenants.',
        points: 1,
        order: 7,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Quantum meruit allows recovery of:',
        options: JSON.stringify([
          'A: Lost profits',
          'B: Reasonable value of services/goods provided',
          'C: Emotional distress',
          'D: Full contract price always',
        ]),
        correctAnswer: 'B',
        explanation:
          'Quantum meruit (as much as deserved): restitutionary remedy for reasonable value of benefit conferred. Used when contract void/unenforceable/part performance.',
        points: 1,
        order: 8,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Expectation loss measures:',
        options: JSON.stringify([
          'A: Loss of bargain (difference between value expected and received)',
          'B: Out-of-pocket expenses',
          'C: Reliance loss',
          'D: Market value',
        ]),
        correctAnswer: 'A',
        explanation:
          'Expectation loss: difference between what party expected to receive and what actually received. "Loss of bargain" measure.',
        points: 1,
        order: 9,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Reliance loss measures:',
        options: JSON.stringify([
          'A: Lost profits',
          'B: Wasted expenditure in reliance on contract',
          'C: Market fluctuations',
          'D: Punitive damages',
        ]),
        correctAnswer: 'B',
        explanation:
          'Reliance loss: expenditure wasted in reliance on contract. Alternative to expectation when lost profits too speculative.',
        points: 1,
        order: 10,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Nominal damages awarded when:',
        options: JSON.stringify([
          'A: Large loss suffered',
          'B: Breach but no actual loss (vindicates rights)',
          'C: Penalty for breach',
          'D: Court discretion',
        ]),
        correctAnswer: 'B',
        explanation:
          'Nominal damages: small sum (e.g., €1) awarded when breach proved but no actual loss. Vindicates legal right.',
        points: 1,
        order: 11,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Mental distress damages recoverable when:',
        options: JSON.stringify([
          'A: Always',
          'B: Never in contract',
          'C: Object of contract was peace of mind/enjoyment',
          'D: Large sum claimed',
        ]),
        correctAnswer: 'C',
        explanation:
          'Mental distress damages rarely recoverable in contract. Exception: where object of contract was peace of mind, relaxation, enjoyment (holidays, weddings).',
        points: 1,
        order: 12,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Rescission means:',
        options: JSON.stringify([
          'A: Damages awarded',
          'B: Contract set aside and parties restored to pre-contract position',
          'C: Contract reformed',
          'D: Specific performance ordered',
        ]),
        correctAnswer: 'B',
        explanation:
          'Rescission: equitable remedy setting contract aside and restoring parties to pre-contract position. Available for misrepresentation, undue influence, etc.',
        points: 1,
        order: 13,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Bars to rescission include:',
        options: JSON.stringify([
          'A: Lapse of time, affirmation, third party rights, impossible restitution',
          'B: Change of mind',
          'C: Better offer received',
          'D: Market changes',
        ]),
        correctAnswer: 'A',
        explanation:
          'Rescission barred by: affirmation, lapse of time, third party acquired rights, or impossible to restore parties to original position.',
        points: 1,
        order: 14,
      },
      {
        moduleId: contractModule3.id,
        type: 'MCQ',
        text: 'Indemnity in rescission covers:',
        options: JSON.stringify([
          'A: All losses',
          'B: Obligations necessarily created by contract',
          'C: Consequential losses',
          'D: Profits',
        ]),
        correctAnswer: 'B',
        explanation:
          'Indemnity (not damages): reimbursement for obligations necessarily created by contract. Narrower than damages.',
        points: 1,
        order: 15,
      },
      // Tort Module 1 - Questions (1-15)
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Donoghue v Stevenson established:',
        options: JSON.stringify([
          'A: Strict liability',
          'B: Neighbour principle (duty to those foreseeably affected)',
          'C: Absolute duty of care',
          'D: No duty to strangers',
        ]),
        correctAnswer: 'B',
        explanation:
          'Donoghue v Stevenson: neighbour principle - owe duty of care to those reasonably foreseeable to be affected by acts/omissions.',
        points: 1,
        order: 1,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Three-stage test for duty of care requires:',
        options: JSON.stringify([
          'A: Only foreseeability',
          'B: Foreseeability, proximity, and fair/just/reasonable',
          'C: Contract between parties',
          'D: Physical harm only',
        ]),
        correctAnswer: 'B',
        explanation:
          'Caparo test: (1) reasonably foreseeable harm, (2) proximity/closeness of relationship, (3) fair, just, and reasonable to impose duty.',
        points: 1,
        order: 2,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Standard of care is:',
        options: JSON.stringify([
          'A: Perfection',
          "B: Reasonable person in defendant's position",
          'C: Expert level',
          'D: Best efforts',
        ]),
        correctAnswer: 'B',
        explanation:
          "Objective standard: reasonable person in defendant's position. Considers risk, cost of precautions, social utility. Not perfection or best possible care.",
        points: 1,
        order: 3,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Professional standard of care requires:',
        options: JSON.stringify([
          'A: Highest skill level',
          'B: Ordinary skilled member of profession (Bolam test)',
          'C: No errors',
          'D: Written protocols',
        ]),
        correctAnswer: 'B',
        explanation:
          'Bolam test: professional must exercise skill of ordinary competent member of profession. Not highest skill, but accepted professional practice.',
        points: 1,
        order: 4,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'But-for test determines:',
        options: JSON.stringify([
          'A: Duty of care',
          'B: Factual causation (would harm have occurred anyway?)',
          'C: Standard of care',
          'D: Damages',
        ]),
        correctAnswer: 'B',
        explanation:
          '"But for" test: but for defendant\'s breach, would claimant have suffered harm? Establishes factual causation.',
        points: 1,
        order: 5,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Novus actus interveniens breaks causation if:',
        options: JSON.stringify([
          'A: Any intervening act occurs',
          'B: Intervening act is unforeseeable and independent',
          'C: Third party involved',
          'D: Time passes',
        ]),
        correctAnswer: 'B',
        explanation:
          "Intervening act breaks chain if unforeseeable, independent, and sole cause of harm. Foreseeable interventions don't break chain.",
        points: 1,
        order: 6,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Eggshell skull rule means:',
        options: JSON.stringify([
          'A: Defendant not liable for unforeseeable conditions',
          'B: Defendant takes victim as found (liable for full extent)',
          'C: Victim must prove harm',
          'D: Damages reduced for pre-existing conditions',
        ]),
        correctAnswer: 'B',
        explanation:
          'Take victim as found: defendant liable for full extent of harm even if victim unusually vulnerable. No reduction for pre-existing conditions.',
        points: 1,
        order: 7,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Remoteness limits liability to damage that was:',
        options: JSON.stringify([
          'A: Intended',
          'B: Reasonably foreseeable (type of harm)',
          'C: Directly caused',
          'D: Expensive',
        ]),
        correctAnswer: 'B',
        explanation:
          'Wagon Mound: defendant liable for damage of type reasonably foreseeable. Extent need not be foreseeable (eggshell skull), but type must be.',
        points: 1,
        order: 8,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Res ipsa loquitur applies when:',
        options: JSON.stringify([
          'A: Defendant admits liability',
          'B: Accident speaks for itself (inference of negligence)',
          'C: No evidence available',
          'D: Strict liability',
        ]),
        correctAnswer: 'B',
        explanation:
          "Res ipsa loquitur (thing speaks for itself): inference of negligence when: accident wouldn't normally happen without negligence, defendant had control, claimant not responsible.",
        points: 1,
        order: 9,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Pure economic loss is:',
        options: JSON.stringify([
          'A: Always recoverable',
          'B: Generally not recoverable unless special relationship',
          'C: Same as physical damage',
          'D: Covered by insurance',
        ]),
        correctAnswer: 'B',
        explanation:
          'Pure economic loss (financial loss without physical harm) generally not recoverable. Exception: special relationship (Hedley Byrne - negligent misstatement).',
        points: 1,
        order: 10,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Nervous shock (psychiatric harm) recoverable when:',
        options: JSON.stringify([
          'A: Any shock',
          'B: Recognized psychiatric illness + proximity to incident/victim',
          'C: Emotional upset',
          'D: Witnessing any accident',
        ]),
        correctAnswer: 'B',
        explanation:
          'Nervous shock requires: (1) recognized psychiatric condition (not mere grief), (2) primary victim (physical danger) or secondary (close relationship + proximity).',
        points: 1,
        order: 11,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Occupiers liability owed to:',
        options: JSON.stringify([
          'A: Invitees only',
          'B: Lawful visitors (common duty of care)',
          'C: Trespassers fully',
          'D: No one',
        ]),
        correctAnswer: 'B',
        explanation:
          'Occupiers owe common duty of care to lawful visitors (ensure reasonably safe). Lower duty to trespassers (avoid intentional harm/recklessness).',
        points: 1,
        order: 12,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Volenti non fit injuria means:',
        options: JSON.stringify([
          'A: No harm done',
          'B: No wrong to one who consents (voluntary assumption of risk)',
          'C: Involuntary harm',
          'D: Strict liability',
        ]),
        correctAnswer: 'B',
        explanation:
          'Volenti: complete defense if claimant voluntarily accepted risk with full knowledge. Must be true consent, not just knowledge of risk.',
        points: 1,
        order: 13,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Contributory negligence reduces damages when:',
        options: JSON.stringify([
          'A: Claimant partly at fault for own harm',
          'B: Both parties negligent equally',
          'C: Defendant not negligent',
          'D: No causation',
        ]),
        correctAnswer: 'A',
        explanation:
          'Contributory negligence: partial defense reducing damages by extent claimant contributed to own harm. Not complete defense.',
        points: 1,
        order: 14,
      },
      {
        moduleId: tortModule1.id,
        type: 'MCQ',
        text: 'Vicarious liability means:',
        options: JSON.stringify([
          'A: Joint wrongdoers',
          "B: Employer liable for employee's torts in course of employment",
          'C: Substitute liability',
          'D: Shared negligence',
        ]),
        correctAnswer: 'B',
        explanation:
          "Vicarious liability: employer liable for employee's torts committed in course of employment (even if employer not at fault).",
        points: 1,
        order: 15,
      },

      // Tort Module 2 - Questions (1-15)
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Defamation requires publication of:',
        options: JSON.stringify([
          'A: True statement',
          'B: False statement lowering reputation to third party',
          'C: Opinion',
          'D: Private information',
        ]),
        correctAnswer: 'B',
        explanation:
          'Defamation: publication of false statement to third party that lowers claimant in estimation of right-thinking members of society.',
        points: 1,
        order: 1,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Libel is defamation in:',
        options: JSON.stringify([
          'A: Spoken words',
          'B: Permanent form (writing, broadcast, internet)',
          'C: Private conversation',
          'D: Gestures',
        ]),
        correctAnswer: 'B',
        explanation:
          'Libel: defamation in permanent form (writing, pictures, broadcast, internet). Slander: transient form (spoken words, gestures).',
        points: 1,
        order: 2,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Statement must refer to claimant:',
        options: JSON.stringify([
          'A: By name only',
          'B: Directly or by reasonable inference',
          'C: Explicitly',
          'D: In writing',
        ]),
        correctAnswer: 'B',
        explanation:
          'Claimant must be identifiable from statement (by name or reasonable inference). Can sue even if not named if reasonable people would think it refers to them.',
        points: 1,
        order: 3,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Publication requires communication to:',
        options: JSON.stringify([
          'A: Defamed person',
          'B: At least one third party',
          'C: Media',
          'D: Large audience',
        ]),
        correctAnswer: 'B',
        explanation:
          'Publication: communication to at least one person other than claimant. Each publication is separate tort (but single publication rule applies to internet).',
        points: 1,
        order: 4,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Defense of truth (justification) requires:',
        options: JSON.stringify([
          'A: Belief statement true',
          'B: Proof statement substantially true',
          'C: Good faith',
          'D: Public interest',
        ]),
        correctAnswer: 'B',
        explanation:
          'Truth/justification: complete defense if defendant proves statement substantially true. Honest belief not enough - must prove truth.',
        points: 1,
        order: 5,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Honest opinion defense requires:',
        options: JSON.stringify([
          'A: True opinion on true facts, honestly held, matter of public interest',
          'B: Any opinion',
          'C: Expert opinion',
          'D: Popular opinion',
        ]),
        correctAnswer: 'A',
        explanation:
          'Honest opinion (fair comment): statement is opinion (not fact), based on true facts, honestly held by defendant, on matter of public interest.',
        points: 1,
        order: 6,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Absolute privilege applies to:',
        options: JSON.stringify([
          'A: All public statements',
          'B: Parliamentary proceedings, judicial proceedings, certain state communications',
          'C: Newspaper reports',
          'D: Social media',
        ]),
        correctAnswer: 'B',
        explanation:
          'Absolute privilege: complete immunity for statements in Parliament, courts, certain official state communications. No malice exception.',
        points: 1,
        order: 7,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Qualified privilege lost if:',
        options: JSON.stringify([
          'A: Statement false',
          'B: Malice proven (improper motive)',
          'C: Statement published',
          'D: Harm caused',
        ]),
        correctAnswer: 'B',
        explanation:
          'Qualified privilege defeated by malice (improper motive, knowledge of falsity, reckless indifference to truth).',
        points: 1,
        order: 8,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Occasions of qualified privilege include:',
        options: JSON.stringify([
          'A: Fair and accurate court reports, duty-interest communications',
          'B: All news reports',
          'C: Private gossip',
          'D: Anonymous posts',
        ]),
        correctAnswer: 'A',
        explanation:
          'Qualified privilege: statements made in performance of legal/moral/social duty, fair reports of proceedings, protection of legitimate interest.',
        points: 1,
        order: 9,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Innuendo means:',
        options: JSON.stringify([
          'A: Obvious meaning',
          'B: Hidden defamatory meaning known to some readers',
          'C: Insult',
          'D: Sarcasm',
        ]),
        correctAnswer: 'B',
        explanation:
          'Innuendo: statement apparently innocent but defamatory to those with special knowledge. Claimant must prove meaning and that publishees knew special facts.',
        points: 1,
        order: 10,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Single meaning rule states:',
        options: JSON.stringify([
          'A: Only one interpretation allowed',
          'B: Statement has one defamatory meaning (determined by court)',
          'C: Multiple meanings considered',
          "D: Defendant's intended meaning controls",
        ]),
        correctAnswer: 'B',
        explanation:
          'Court determines single natural and ordinary meaning statement would convey to ordinary reasonable reader. Not what defendant intended or multiple meanings.',
        points: 1,
        order: 11,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Offer of amends allows defendant to:',
        options: JSON.stringify([
          'A: Avoid trial automatically',
          'B: Make correction, apology, and pay compensation (if unintentional)',
          'C: Delete statement',
          'D: Appeal',
        ]),
        correctAnswer: 'B',
        explanation:
          'Offer of amends: defendant offers correction, apology, compensation for unintentional defamation. If accepted, ends proceedings. If rejected, defense at trial.',
        points: 1,
        order: 12,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Internet service providers have defense if:',
        options: JSON.stringify([
          'A: They publish all content',
          'B: Not authors, did not know of defamatory content, removed promptly when notified',
          'C: Free platforms',
          'D: Large companies',
        ]),
        correctAnswer: 'B',
        explanation:
          'ISP defense: mere conduit, no actual knowledge of unlawful content, acted expeditiously to remove upon notice. Limited "innocent dissemination."',
        points: 1,
        order: 13,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Repetition rule means:',
        options: JSON.stringify([
          'A: Cannot sue twice',
          "B: Repeating someone else's defamatory statement is separate publication",
          'C: Must repeat to be defamation',
          'D: No liability for quotes',
        ]),
        correctAnswer: 'B',
        explanation:
          'Repeating defamatory statement (even attributing to another) is new publication. Cannot plead "I was just quoting" - each repetition creates liability.',
        points: 1,
        order: 14,
      },
      {
        moduleId: tortModule2.id,
        type: 'MCQ',
        text: 'Group defamation requires:',
        options: JSON.stringify([
          'A: Reference to specific individual',
          'B: Group small enough or claimant specifically targeted',
          'C: All group members sue',
          'D: Named individuals only',
        ]),
        correctAnswer: 'B',
        explanation:
          'Group defamation: individual can sue if group small enough each member referred to, or statement specifically targets claimant within group.',
        points: 1,
        order: 15,
      },

      // Tort Module 3 - Questions (1-15)
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Private nuisance protects:',
        options: JSON.stringify([
          'A: Personal injury',
          'B: Use and enjoyment of land',
          'C: Reputation',
          'D: Economic interests',
        ]),
        correctAnswer: 'B',
        explanation:
          "Private nuisance protects use and enjoyment of land. Unlawful interference with another's use/enjoyment of their land.",
        points: 1,
        order: 1,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Who can sue in private nuisance?',
        options: JSON.stringify([
          'A: Anyone affected',
          'B: Person with interest in land (owner, tenant)',
          'C: Visitors',
          'D: Passersby',
        ]),
        correctAnswer: 'B',
        explanation:
          'Only person with proprietary interest in affected land can sue (owner, leaseholder). Mere licensees/visitors cannot sue.',
        points: 1,
        order: 2,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Nuisance requires interference that is:',
        options: JSON.stringify([
          'A: Any interference',
          'B: Unreasonable in all circumstances',
          'C: Intentional',
          'D: Permanent',
        ]),
        correctAnswer: 'B',
        explanation:
          'Unreasonableness test: considers locality, duration, sensitivity, social utility. Some give-and-take expected between neighbors.',
        points: 1,
        order: 3,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Abnormal sensitivity means:',
        options: JSON.stringify([
          'A: Claimant entitled to perfect conditions',
          'B: Cannot sue if only abnormally sensitive use affected',
          'C: Defendant always liable',
          'D: Damages increased',
        ]),
        correctAnswer: 'B',
        explanation:
          'No nuisance if interference only affects abnormally sensitive use. BUT if ordinary use also affected, can recover for all damage including to sensitive use.',
        points: 1,
        order: 4,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Locality matters for nuisance involving:',
        options: JSON.stringify([
          'A: Physical damage',
          'B: Amenity interference (noise, smell, etc.)',
          'C: All nuisances',
          'D: Trespass',
        ]),
        correctAnswer: 'B',
        explanation:
          '"What would be nuisance in Belgrave Square not necessarily so in Bermondsey" - locality relevant for amenity harm, not physical damage to property.',
        points: 1,
        order: 5,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Coming to the nuisance defense means:',
        options: JSON.stringify([
          'A: Complete defense if moved to area',
          'B: Not a defense (but locality considered)',
          'C: Bars all claims',
          'D: Automatic liability',
        ]),
        correctAnswer: 'B',
        explanation:
          "Coming to nuisance not defense. Fact claimant moved to area doesn't bar claim, but character of locality relevant to reasonableness.",
        points: 1,
        order: 6,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Prescription defense requires:',
        options: JSON.stringify([
          'A: 1 year continuous nuisance',
          'B: 20 years continuous actionable nuisance as of right',
          'C: Permission',
          'D: No complaints',
        ]),
        correctAnswer: 'B',
        explanation:
          'Prescription: 20 years continuous nuisance, without permission, without secrecy, without force. Legalizes the nuisance prospectively.',
        points: 1,
        order: 7,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Statutory authority defense requires:',
        options: JSON.stringify([
          'A: Any government approval',
          'B: Statute authorizes activity and nuisance is inevitable consequence',
          'C: Public benefit',
          'D: License',
        ]),
        correctAnswer: 'B',
        explanation:
          'Statutory authority: complete defense if statute authorizes activity and nuisance is inevitable despite reasonable care. Discretionary activities may still be nuisance.',
        points: 1,
        order: 8,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Public nuisance differs from private as it:',
        options: JSON.stringify([
          'A: Same as private nuisance',
          'B: Affects class of public, is crime, individual needs special damage',
          'C: Only government can sue',
          'D: Less serious',
        ]),
        correctAnswer: 'B',
        explanation:
          'Public nuisance: affects community/class of public, is crime, individual can sue only with special damage beyond that suffered by public.',
        points: 1,
        order: 9,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Special damage in public nuisance means:',
        options: JSON.stringify([
          'A: Large amount',
          'B: Damage over and above that suffered by public generally',
          'C: Economic loss',
          'D: Physical harm',
        ]),
        correctAnswer: 'B',
        explanation:
          'Special damage: particular harm to individual going beyond common inconvenience suffered by public. Required for individual to sue in public nuisance.',
        points: 1,
        order: 10,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Highway obstruction is public nuisance if:',
        options: JSON.stringify([
          'A: Any delay',
          'B: Unreasonable obstruction of public right of way',
          'C: Private road',
          'D: Temporary',
        ]),
        correctAnswer: 'B',
        explanation:
          'Unreasonable obstruction of highway is public nuisance. Reasonableness considers duration, extent, purpose, alternative routes available.',
        points: 1,
        order: 11,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Injunction for nuisance:',
        options: JSON.stringify([
          'A: Automatic',
          'B: Discretionary equitable remedy to stop continuing nuisance',
          'C: Criminal penalty',
          'D: Cash payment',
        ]),
        correctAnswer: 'B',
        explanation:
          'Injunction: equitable discretionary remedy ordering cessation of nuisance. Particularly important as damages may be inadequate for continuing harm.',
        points: 1,
        order: 12,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Damages in nuisance compensate:',
        options: JSON.stringify([
          'A: Future harm',
          'B: Past interference and physical damage',
          'C: Hurt feelings',
          'D: Lost profits always',
        ]),
        correctAnswer: 'B',
        explanation:
          'Damages for past harm (loss of amenity, physical damage, consequential losses). Injunction prevents future harm.',
        points: 1,
        order: 13,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: 'Negligence-based nuisance requires:',
        options: JSON.stringify([
          'A: Strict liability',
          'B: Fault - failure to take reasonable care to prevent nuisance',
          'C: Intention',
          'D: No fault',
        ]),
        correctAnswer: 'B',
        explanation:
          'Nuisance can be negligence-based (failure to prevent/abate) or strict liability (defendant creating state of affairs causing nuisance).',
        points: 1,
        order: 14,
      },
      {
        moduleId: tortModule3.id,
        type: 'MCQ',
        text: "Landlord liable for tenant's nuisance if:",
        options: JSON.stringify([
          'A: Always',
          'B: Authorized/knew of nuisance before letting, or landlord under duty to repair',
          'C: Never',
          'D: Large tenants only',
        ]),
        correctAnswer: 'B',
        explanation:
          "Landlord generally not liable for tenant's nuisance. Exceptions: authorized it, knew of it before letting, or has duty to repair and nuisance due to disrepair.",
        points: 1,
        order: 15,
      },
    ],
  });

  console.log('✅ Created module questions (MCQs)');
   
  // ============================================
  // PAST QUESTIONS (ESSAYS)
  // ============================================

  await prisma.question.createMany({
    data: [
      {
        type: 'ESSAY',
        subject: 'Criminal Law',
        year: 2023,
        examType: 'Essay',
        text: `Dr Murphy, a consultant surgeon at St. Vincent's Hospital, is performing an emergency appendectomy on a patient in the hospital's construction section. During the operation, Dr Murphy receives an urgent call about his daughter's accident at school. Distracted by worry, he accidentally cuts Michael's back, causing significant internal bleeding.

The mistake is immediately noticed by the assisting nurse, but Dr Murphy dismisses her concern, insisting he can fix it immediately. However, his mental state and the urgency to leave mean that proper care is not taken, and Michael requires additional surgery and a two-week hospital stay to fully recover.

Discuss:
1. Whether Dr Murphy owes a duty of care to Michael
2. Whether Dr Murphy breached that duty
3. What defenses, if any, Dr Murphy might raise

Support your answer with reference to relevant case law including Dunne v National Maternity Hospital, McMahon v Trustees of the Mater Hospital, and other authorities on medical negligence. Consider statutory provisions relating to consent, emergency treatment, and standard of care for medical professionals.`,
        points: 20,
        order: 1,
      },
      {
        type: 'ESSAY',
        subject: 'Contract Law',
        year: 2023,
        examType: 'Problem',
        text: `Sarah owns a small bakery and regularly orders flour from Tom's Wholesale Supplies. On Monday, Sarah calls Tom and says, "I need 50 bags of flour for a large wedding order. Can you deliver?" Tom replies, "I can do 50 bags by Friday for €500." Sarah responds, "That seems high, but I'll let you know tomorrow."

On Tuesday morning, before Tom can arrange delivery, his warehouse burns down, destroying all his flour stock. Tom calls Sarah to explain he cannot fulfill the order due to the fire.

On the same Tuesday, before hearing from Tom, Sarah sends an email stating, "Your price is acceptable. Deliver the 50 bags by Friday for €500." Sarah immediately places orders with her wedding client based on Tom's expected delivery.

Discuss:
1. Whether a valid contract was formed between Sarah and Tom
2. The legal implications of Tom's warehouse fire
3. What remedies, if any, Sarah might have against Tom

In your answer, consider relevant case law and statutory provisions relating to contract formation, consideration, and frustration of contract.`,
        points: 20,
        order: 2,
      },
      {
        type: 'ESSAY',
        subject: 'Equity',
        year: 2024,
        examType: 'Essay',
        text: `Critically analyze the role of resulting trusts in modern Irish law. Your answer should:
1. Explain the nature and purpose of resulting trusts
2. Distinguish between automatic and presumed resulting trusts
3. Discuss the presumption of advancement and its contemporary relevance
4. Evaluate whether resulting trusts remain necessary given developments in unjust enrichment

Reference key cases including Dyer v Dyer, Pettitt v Pettitt, and Stack v Dowden. Consider academic commentary and Law Reform Commission recommendations where relevant.`,
        points: 20,
        order: 3,
      },
    ],
  });

  console.log('✅ Created past questions (essays)');

  // ============================================
  // PODCASTS
  // ============================================
  await prisma.podcast.createMany({
    data: [
      {
        title: 'Contract Formation Essentials',
        description:
          'Master the fundamentals of contract formation including offer, acceptance, consideration, and intention to create legal relations.',
        subject: 'Contract Law',
        audioUrl:
          'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/podcasts/contract-formation.mp3',
        publicId: 'fe1/podcasts/contract-formation',
        duration: 2700, // 45 minutes
        thumbnail:
          'https://res.cloudinary.com/demo/image/upload/v1234567890/fe1/podcasts/contract-thumb.jpg',
        order: 1,
      },
      {
        title: 'Constitutional Rights Analysis',
        description:
          'Deep dive into constitutional rights under Articles 40-44, with focus on judicial review and proportionality testing.',
        subject: 'Constitutional Law',
        audioUrl:
          'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/podcasts/constitutional-rights.mp3',
        publicId: 'fe1/podcasts/constitutional-rights',
        duration: 3120, // 52 minutes
        thumbnail:
          'https://res.cloudinary.com/demo/image/upload/v1234567890/fe1/podcasts/constitutional-thumb.jpg',
        order: 2,
      },
      {
        title: 'Negligence: The Donoghue Legacy',
        description:
          'Exploring the neighbour principle and its evolution in Irish tort law from Donoghue v Stevenson to modern cases.',
        subject: 'Tort Law',
        audioUrl:
          'https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/podcasts/negligence-donoghue.mp3',
        publicId: 'fe1/podcasts/negligence-donoghue',
        duration: 2880, // 48 minutes
        thumbnail:
          'https://res.cloudinary.com/demo/image/upload/v1234567890/fe1/podcasts/tort-thumb.jpg',
        order: 3,
      },
    ],
  });

  console.log('✅ Created podcasts');
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



