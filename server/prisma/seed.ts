// src/scripts/seed-lesson-videos.ts
// ─────────────────────────────────────────────────────────────────────────────
// Distributes 9 video URLs and 9 transcripts across ALL lessons in a round-robin
// fashion. Every lesson gets a videoUrl and a transcript so the frontend eng
// has something to test with immediately.
//
// Run:
//   npx ts-node -r tsconfig-paths/register src/scripts/seed-lesson-videos.ts
//
// Safe to re-run — uses upsert logic (only updates lessons that have no videoUrl).
// To force re-seed all: set FORCE=true → ts-node ... with FORCE=true node env
// ─────────────────────────────────────────────────────────────────────────────

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ── 9 video URLs ──────────────────────────────────────────────────────────────
const VIDEO_URLS = [
  'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1773668128/TheLawShow-20241120-MiscarriagesOfJusticeAndTheCCRC_k31wxn.mp3',
  'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1773668135/LawInAction-20231114-JuryConscienceResolvingConflictsInSpaceAndTheLawOfTreasureTroveInScotland_p5bnqu.mp3',
  'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1773668119/LawInAction-20231031-PrisonSentencesTooLongOrTooShort_cn7n9b.mp3',
  'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1773668128/TheLawShow-20241113-InsideTheFamilyCourts_v4xml8.mp3',
  'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1773668237/LawInAction-20231107-DeepfakesAndTheLaw_xd0ayd.mp3',
  'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1773668185/TheLawShow-20240529-AssistedDyingCountyCourtJudgmentsDrillMusicAndNakedness_rfbvxv.mp3',
  'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1773668219/LawInAction-20230606-HowWellIsTheParoleBoardProtectingThePublic_yzmnwj.mp3',
  'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1773668125/TheLawShow-20241106-TheRentersRightsBill_qruibz.mp3',
  'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1773668133/TheLawShow-20250305-ExpertWitnessesInCriminalTrials_s9gc3b.mp3',
];

// ── 9 sample transcripts (matching the video titles) ─────────────────────────
const TRANSCRIPTS = [
  `0:00
Welcome to The Law Show. Today we are examining miscarriages of justice in Ireland and the UK, and the role of the Criminal Cases Review Commission.

0:15
A miscarriage of justice occurs when a person is wrongly convicted of a criminal offence. The consequences are profound — loss of liberty, damaged reputation, and lasting psychological harm.

1:30
The Criminal Cases Review Commission was established in the UK following the Royal Commission on Criminal Justice in 1993. It reviews potential miscarriages of justice and refers cases back to the Court of Appeal where there is a real possibility the conviction would be overturned.

3:45
Key cases include the Birmingham Six, the Guildford Four, and Stefan Kiszko — all wrongly convicted and later exonerated. These cases fundamentally changed how the justice system approaches appeals and evidence review.

6:00
In Ireland, the Court of Criminal Appeal and the Court of Appeal have jurisdiction to hear appeals. The Irish Criminal Cases Review Commission was established to provide an independent mechanism for review.

8:00
To conclude, the existence of review bodies reflects the acknowledgment that the justice system is fallible. Ongoing reform is essential to protect the innocent and maintain public confidence in the rule of law.`,

  `0:00
Welcome to Law in Action. Today we explore jury conscience, the resolution of legal conflicts in space, and the law of treasure trove in Scotland.

0:15
Jury nullification — sometimes called jury conscience — refers to the practice whereby a jury acquits a defendant despite clear evidence of guilt, often on moral or conscientious grounds.

1:30
The doctrine has a long history in common law. In the 1670 Bushell's Case, it was established that jurors could not be punished for returning a verdict contrary to the judge's direction.

3:00
In space law, the 1967 Outer Space Treaty provides the foundational framework. It establishes that outer space is not subject to national appropriation and that states bear international responsibility for activities conducted in space.

5:30
The law of treasure trove in Scotland diverges from English law. Under Scots law, ownerless property — including buried treasure — belongs to the Crown by virtue of the doctrine of ultimus haeres.

7:45
These three areas illustrate the breadth of legal questions that arise in both ancient and modern contexts, from the conscience of twelve citizens in a jury box to the governance of activities beyond our atmosphere.`,

  `0:00
Welcome. Today we consider whether prison sentences in Ireland and the UK are too long or too short — a question that sits at the heart of penal policy.

0:20
Sentencing policy must balance four key objectives: retribution, deterrence, rehabilitation, and public protection. These objectives often pull in different directions.

1:45
Those who argue sentences are too short point to recidivism rates and the need for public protection. They argue that insufficiently severe sentences fail to deter offending.

3:15
On the other side, criminologists argue that sentence length has limited deterrent effect. What matters is the certainty of detection, not the severity of punishment. This is supported by research across multiple jurisdictions.

5:00
In Ireland, the Probation Service and the Irish Prison Service have advocated for community-based sentences as an effective alternative for non-violent offenders. Evidence suggests these reduce reoffending more effectively than custody.

7:30
The proportionality principle requires that sentences be proportionate to the gravity of the offence and the culpability of the offender. Excessive sentences violate human dignity and the right to liberty under Article 40 of the Irish Constitution.`,

  `0:00
Welcome to The Law Show. Today we go inside the family courts — an area of law that touches the most intimate aspects of human life.

0:20
Family law proceedings in Ireland are governed primarily by the Family Law Act 1995, the Family Law (Divorce) Act 1996, and the Civil Partnership and Certain Rights and Obligations of Cohabitants Act 2010.

1:30
The family courts operate on the principle that the best interests of the child are paramount. This principle is enshrined in Article 42A of the Irish Constitution, inserted by the Thirty-First Amendment in 2012.

3:00
Divorce in Ireland requires that the spouses have lived apart for at least two of the previous three years, that proper provision is made for each spouse and any dependent members of the family, and that there is no reasonable prospect of reconciliation.

5:15
Child custody disputes are among the most contested matters. Courts distinguish between custody — the right to make decisions about the child's upbringing — and access — the right to spend time with the child.

7:00
In camera rules apply to family proceedings, meaning they are heard in private. This protects the privacy of parties, particularly children, but has been criticised for limiting transparency and accountability in the system.`,

  `0:00
Welcome to Law in Action. Today we examine deepfakes and the law — one of the most pressing emerging legal challenges of our time.

0:15
A deepfake is a synthetic media product in which a person's likeness is digitally manipulated, typically using artificial intelligence, to make them appear to say or do something they never did.

1:30
The legal framework for addressing deepfakes is fragmented across multiple areas of law including defamation, privacy, data protection, and criminal law.

3:00
In Ireland, the Online Safety and Media Regulation Act 2022 created a new regulatory framework for online platforms. The legislation imposes obligations on designated online services to address harmful content.

4:45
From a criminal law perspective, deepfakes used to harass, defraud, or produce non-consensual intimate imagery engage existing offences. The Criminal Law (Sexual Offences and Human Trafficking) Act 2024 created specific offences relating to intimate image abuse.

6:30
Data protection law is also engaged. The GDPR classifies biometric data used to uniquely identify a person as special category data, requiring explicit consent or another lawful basis for processing.

8:00
The challenge for legislators is to address harm without unduly restricting expression. The balance between freedom of speech and protection from manipulation and abuse remains contested across all democratic legal systems.`,

  `0:00
Welcome to The Law Show. Today we cover three distinct areas — assisted dying, county court judgments, drill music, and nakedness in public.

0:20
Assisted dying remains one of the most contested ethical and legal issues. In Ireland, assisting suicide is an offence under section 2(2) of the Criminal Law (Suicide) Act 1993.

2:00
The Supreme Court in Fleming v Ireland [2013] confirmed that the constitutional right to life under Article 40.3 does not include a right to die with assistance. The Court left the matter to the legislature.

3:30
County court judgments — or CCJs in the UK context — are court orders registered against individuals who fail to repay debts. Registration on the public register affects creditworthiness significantly.

5:00
Drill music has attracted judicial attention in several cases where its lyrics were admitted as evidence of gang membership or intention. Courts must balance the right to artistic expression against probative value.

7:00
Public nudity and the law of indecency engage the question of community standards. The test for indecency in Irish law is an objective one — whether the conduct would offend reasonable standards of decency.`,

  `0:00
Welcome to Law in Action. Today we scrutinise how well the Parole Board is protecting the public, and the tensions inherent in its role.

0:20
The Parole Board in Ireland operates under the Parole Act 2019, which placed it on a statutory footing. Before 2019, it operated on a non-statutory basis, raising concerns about due process and consistency.

1:45
The Board's primary function is to assess whether a prisoner can be safely released into the community. It must balance the interests of the prisoner — including the right to liberty — against the safety of the public.

3:00
Risk assessment tools such as the Structured Assessment of Violence Risk in Youth and the Violence Risk Appraisal Guide are used alongside professional judgment. Critics argue these tools import statistical probabilities in ways that can be unfair to individual applicants.

5:15
High-profile cases of serious reoffending by people on parole attract intense media scrutiny and public concern. These cases raise questions about resource allocation, supervision quality, and the reliability of risk assessments.

7:30
International best practice suggests that effective supervision, access to housing, employment, and treatment are better predictors of successful reintegration than the length of time served. The law must support rehabilitation, not merely manage risk.`,

  `0:00
Welcome to The Law Show. Today we examine the Renters Rights Bill and what it means for tenants and landlords.

0:20
Housing law in Ireland is governed primarily by the Residential Tenancies Act 2004, as extensively amended. Security of tenure, rent increases, and dispute resolution are the central pillars.

1:30
The Residential Tenancies Board provides a dispute resolution mechanism for tenants and landlords outside the courts. It deals with disputes about rent arrears, deposits, maintenance obligations, and termination of tenancies.

3:00
Rent Pressure Zones were introduced by the Planning and Development (Housing) and Residential Tenancies Act 2016. Within these zones, rent increases are capped, providing some protection for tenants in high-demand areas.

5:00
Security of tenure provisions mean that after six months, a tenant acquires rights that make it more difficult for a landlord to terminate the tenancy. Termination grounds are set out exhaustively in the Act.

7:00
The right to housing has been debated in the context of Article 40 of the Constitution. The Supreme Court has not recognised a justiciable constitutional right to housing, but pressure for constitutional reform continues.`,

  `0:00
Welcome to The Law Show. Today we examine the role of expert witnesses in criminal trials — an area of both significant importance and significant controversy.

0:20
An expert witness is a person with specialised knowledge, skill, or experience who gives opinion evidence on matters beyond the ordinary competence of the court.

1:30
In Ireland, the admissibility of expert evidence is governed by common law principles. The court must be satisfied that the area of expertise is sufficiently established and that the witness is suitably qualified.

3:00
The adversarial system creates tensions in expert evidence. Each side may retain its own expert, leading to what is colloquially known as a battle of the experts. Juries may struggle to evaluate competing expert opinions.

4:45
The Law Reform Commission has recommended reforms including the appointment of court-appointed experts in complex cases, and the adoption of a pre-trial process for the exchange of expert reports.

6:00
Forensic science evidence — including DNA, fingerprints, and digital forensics — has transformed criminal investigation. However, errors in forensic analysis have contributed to wrongful convictions in several jurisdictions.

8:00
The fundamental obligation of the expert witness is to the court, not to the party retaining them. This duty of impartiality must override any partisan interest, and courts have not hesitated to criticise experts who have departed from it.`,
];

async function main() {
  const forceReseed = process.env.FORCE === 'true';

  console.log('🌱 Starting lesson video seed...');
  console.log(`   Force reseed: ${forceReseed}`);

  // Fetch all published lessons ordered by module then lesson order
  const lessons = await prisma.lesson.findMany({
    where: forceReseed ? {} : { isPublished: true },
    select: { id: true, title: true, videoUrl: true },
    orderBy: [
      { module: { subject: { order: 'asc' } } },
      { module: { order: 'asc' } },
      { order: 'asc' },
    ],
  });

  console.log(`   Found ${lessons.length} lessons`);

  // Filter to only lessons without a videoUrl (unless force)
  const toUpdate = forceReseed ? lessons : lessons.filter((l) => !l.videoUrl);

  console.log(
    `   Updating ${toUpdate.length} lessons${forceReseed ? ' (force mode)' : ' (no videoUrl yet)'}`
  );

  if (toUpdate.length === 0) {
    console.log('✅ All lessons already have video URLs. Run with FORCE=true to reseed all.');
    return;
  }

  let updated = 0;

  for (let i = 0; i < toUpdate.length; i++) {
    const lesson = toUpdate[i]!;

    // Round-robin across 9 videos and 9 transcripts
    const videoUrl = VIDEO_URLS[i % VIDEO_URLS.length]!;
    const transcript = TRANSCRIPTS[i % TRANSCRIPTS.length]!;

    // Extract publicId from URL for Cloudinary deletion support
    const videoPublicId = videoUrl.split('/upload/')[1]?.split('.')[0] ?? null;

    await prisma.lesson.update({
      where: { id: lesson.id },
      data: {
        videoUrl,
        videoPublicId,
        transcript,
        videoDuration: 480, // 8 minutes placeholder — update when real durations are known
      },
    });

    updated++;

    if (updated % 50 === 0) {
      console.log(`   Progress: ${updated}/${toUpdate.length}`);
    }
  }

  console.log(`\n✅ Done. Updated ${updated} lessons with video URLs and transcripts.`);
  console.log(`   Videos distributed across 9 URLs in round-robin fashion.`);
  console.log(`   Placeholder videoDuration set to 480 seconds (8 min) for all lessons.`);
  console.log(`   Update videoDuration per lesson when real durations are available.\n`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
