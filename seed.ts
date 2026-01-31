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
            videoDuration: 863, // 14:23
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
            videoDuration: 720, // 12:00
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
            videoDuration: 900, // 15:00
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
            videoDuration: 1020, // 17:00
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
            videoDuration: 540, // 9:00
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
            videoDuration: 780, // 13:00
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
            videoDuration: 660, // 11:00
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
            videoDuration: 840, // 14:00
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
            videoDuration: 900,
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
            videoDuration: 720,
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
            videoDuration: 840,
          },
        ],
      },
    },
  });

  // Module 3-8 (abbreviated for brevity)
  await prisma.module.createMany({
    data: [
      {
        subjectId: criminalLaw.id,
        name: 'Module 3: Property and Economic Offences',
        slug: 'property-economic-offences',
        description: 'Theft, robbery, burglary, and fraud',
        order: 3,
      },
      {
        subjectId: criminalLaw.id,
        name: 'Module 4: Public Order & State Security',
        slug: 'public-order-state-security',
        description: 'Public order offences and offences against the state',
        order: 4,
      },
      {
        subjectId: criminalLaw.id,
        name: 'Module 5: Inchoate & Ancillary Offences',
        slug: 'inchoate-ancillary-offences',
        description: 'Attempts, conspiracy, and complicity',
        order: 5,
      },
      {
        subjectId: criminalLaw.id,
        name: 'Module 6: Special Offences',
        slug: 'special-offences',
        description: 'Sexual offences, homicide, and special categories',
        order: 6,
      },
      {
        subjectId: criminalLaw.id,
        name: 'Module 7: Defenses',
        slug: 'defenses',
        description: 'Self-defense, duress, necessity, and insanity',
        order: 7,
      },
      {
        subjectId: criminalLaw.id,
        name: 'Module 8: Procedure',
        slug: 'procedure',
        description: 'Criminal procedure, evidence, and trial process',
        order: 8,
      },
    ],
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
              videoDuration: 780,
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
              videoDuration: 720,
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
              videoDuration: 660,
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
              videoDuration: 840,
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
              videoDuration: 900,
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
              videoDuration: 720,
            },
          ],
        },
      },
    });


    const tortLaw = subjects[2]; // Already created

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
              videoDuration: 960,
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
              videoDuration: 780,
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
              videoDuration: 840,
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
              videoDuration: 720,
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
              videoDuration: 660,
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
              videoDuration: 600,
            },
          ],
        },
      },
    });

  // ============================================
  // MODULE QUESTIONS (MCQs)
  // ============================================

  await prisma.question.createMany({
    data: [
      // Module 1 Questions
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

      // Module 2 Questions
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
