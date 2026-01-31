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

}