import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PODCAST_THUMBNAIL =
  'https://res.cloudinary.com/db3waebh7/image/upload/v1770073930/ideogram-v3.0_Minimalist_law_podcast_cover_Irish_legal_education_theme_single_golden_scale_ico-0_ojxvyo.png';

async function updatePodcasts() {
  console.log('🔄 Updating podcasts with real audio...');

  // Delete old dummy podcasts
  const deleted = await prisma.podcast.deleteMany({});
  console.log(`🗑️ Deleted ${deleted.count} old podcasts`);

  // Create new podcasts with real BBC audio
  const created = await prisma.podcast.createMany({
    data: [
      {
        title: 'The Law Under Fire - Professional Criticism',
        description:
          'Examining widespread criticism of the legal profession and its impact on solicitors, barristers, advocates, and judges in modern practice.',
        subject: 'Constitutional Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770074701/TheLawShow-20251119-TheLawUnderFire_k3ypbd.mp3',
        publicId: 'TheLawShow-20251119-TheLawUnderFire_k3ypbd',
        thumbnail: PODCAST_THUMBNAIL,
        order: 1,
      },
      {
        title: 'The Court Delays Crisis',
        description:
          'Analysis of record court backlogs in England and Wales, examining funding solutions and their effectiveness in reducing delays.',
        subject: 'Constitutional Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770074759/TheLawShow-20251112-TheCourtDelaysCrisis_v7agjq.mp3',
        publicId: 'TheLawShow-20251112-TheCourtDelaysCrisis_v7agjq',
        thumbnail: PODCAST_THUMBNAIL,
        order: 2,
      },
      {
        title: 'Inside The Family Courts',
        description:
          'Demystifying family court procedures, transparency initiatives, and the pilot scheme to make family justice more accessible.',
        subject: 'Equity',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770074988/TheLawShow-20241113-InsideTheFamilyCourts_hba5mu.mp3',
        publicId: 'TheLawShow-20241113-InsideTheFamilyCourts_hba5mu',
        thumbnail: PODCAST_THUMBNAIL,
        order: 3,
      },
      {
        title: 'Immigration Law - Who Stays, Who Goes',
        description:
          'Understanding legal processes for immigration status, asylum applications, and removal procedures in the UK legal system.',
        subject: 'Constitutional Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770074756/TheLawShow-20251105-ImmigrationAndTheLawWhoStaysWhoGoes_hfgq7e.mp3',
        publicId: 'TheLawShow-20251105-ImmigrationAndTheLawWhoStaysWhoGoes_hfgq7e',
        thumbnail: PODCAST_THUMBNAIL,
        order: 4,
      },
      {
        title: 'Wrongful Convictions & Private Prosecutions',
        description:
          'Examining private prosecution reforms following wrongful convictions in train fare evasion cases and the Post Office scandal.',
        subject: 'Criminal Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770074828/TheLawShow-20250528-WrongfulConvictionsWhyPrivateProsecutionsFaceReform_lwwpvp.mp3',
        publicId: 'TheLawShow-20250528-WrongfulConvictionsWhyPrivateProsecutionsFaceReform_lwwpvp',
        thumbnail: PODCAST_THUMBNAIL,
        order: 5,
      },
      {
        title: 'The Human Cost Of Court Delays',
        description:
          'Exploring the impact of court backlogs on victims, defendants, and witnesses, and examining potential solutions.',
        subject: 'Tort Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770074824/TheLawShow-20250319-TheHumanCostOfCourtDelays_kkwkqc.mp3',
        publicId: 'TheLawShow-20250319-TheHumanCostOfCourtDelays_kkwkqc',
        thumbnail: PODCAST_THUMBNAIL,
        order: 6,
      },
      {
        title: 'Genocide, War Crimes And Justice',
        description:
          'Defining genocide and war crimes, examining evidence gathering challenges, and international justice mechanisms.',
        subject: 'EU Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770074990/TheLawShow-20250312-GenocideWarCrimesAndJustice_dxardm.mp3',
        publicId: 'TheLawShow-20250312-GenocideWarCrimesAndJustice_dxardm',
        thumbnail: PODCAST_THUMBNAIL,
        order: 7,
      },
      {
        title: 'Expert Witnesses In Criminal Trials',
        description:
          'Understanding the role of expert witnesses in criminal proceedings, evidence interpretation, and the Lucy Letby case insights.',
        subject: 'Criminal Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770074989/TheLawShow-20250305-ExpertWitnessesInCriminalTrials_nx7nnh.mp3',
        publicId: 'TheLawShow-20250305-ExpertWitnessesInCriminalTrials_nx7nnh',
        thumbnail: PODCAST_THUMBNAIL,
        order: 8,
      },
      {
        title: 'Miscarriages Of Justice And The CCRC',
        description:
          'How the Criminal Cases Review Commission evaluates appeals and decides which cases proceed to the Court of Appeal.',
        subject: 'Criminal Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770075003/TheLawShow-20241120-MiscarriagesOfJusticeAndTheCCRC_yqqnr8.mp3',
        publicId: 'TheLawShow-20241120-MiscarriagesOfJusticeAndTheCCRC_yqqnr8',
        thumbnail: PODCAST_THUMBNAIL,
        order: 9,
      },
      {
        title: 'The Renters Rights Bill',
        description:
          "Analysis of new rental legislation, workers' rights protections, and property claims in relationship breakdown.",
        subject: 'Land Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770074989/TheLawShow-20241106-TheRentersRightsBill_xovnkk.mp3',
        publicId: 'TheLawShow-20241106-TheRentersRightsBill_xovnkk',
        thumbnail: PODCAST_THUMBNAIL,
        order: 10,
      },
      {
        title: 'Assisted Dying & County Court Judgments',
        description:
          'Examining assisted dying legislation, county court judgment procedures, and drill music as criminal trial evidence.',
        subject: 'Criminal Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770074984/TheLawShow-20240529-AssistedDyingCountyCourtJudgmentsDrillMusicAndNakedness_ikiko7.mp3',
        publicId:
          'TheLawShow-20240529-AssistedDyingCountyCourtJudgmentsDrillMusicAndNakedness_ikiko7',
        thumbnail: PODCAST_THUMBNAIL,
        order: 11,
      },
      {
        title: 'Jury Conscience & Space Law',
        description:
          'Exploring jury acquittals as matters of conscience, satellite liability in space, and Scottish treasure trove law.',
        subject: 'Constitutional Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770076226/LawInAction-20231114-JuryConscienceResolvingConflictsInSpaceAndTheLawOfTreasureTroveInScotland_d5hl5u.mp3',
        publicId:
          'LawInAction-20231114-JuryConscienceResolvingConflictsInSpaceAndTheLawOfTreasureTroveInScotland_d5hl5u',
        thumbnail: PODCAST_THUMBNAIL,
        order: 12,
      },
      {
        title: 'Deepfakes And The Law',
        description:
          'Legal rights regarding voice deepfakes, forensic voice recognition technology, and expert witness reliability in court.',
        subject: 'Tort Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770076441/LawInAction-20231107-DeepfakesAndTheLaw_jfbxxb.mp3',
        publicId: 'LawInAction-20231107-DeepfakesAndTheLaw_jfbxxb',
        thumbnail: PODCAST_THUMBNAIL,
        order: 13,
      },
      {
        title: 'Parole Board Public Protection',
        description:
          'Assessing Parole Board effectiveness in prisoner releases, international abandonment cases, and AI in justice delivery.',
        subject: 'Criminal Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770076208/LawInAction-20230606-HowWellIsTheParoleBoardProtectingThePublic_ktwfph.mp3',
        publicId: 'LawInAction-20230606-HowWellIsTheParoleBoardProtectingThePublic_ktwfph',
        thumbnail: PODCAST_THUMBNAIL,
        order: 14,
      },
      {
        title: 'Prison Sentences - Too Long Or Too Short',
        description:
          'Debating optimal prison sentence lengths, public input in sentencing, prison system challenges, and reform solutions.',
        subject: 'Criminal Law',
        audioUrl:
          'https://res.cloudinary.com/db3waebh7/video/upload/v1770076213/LawInAction-20231031-PrisonSentencesTooLongOrTooShort_kimho5.mp3',
        publicId: 'LawInAction-20231031-PrisonSentencesTooLongOrTooShort_kimho5',
        thumbnail: PODCAST_THUMBNAIL,
        order: 15,
      },
    ],
  });

  console.log(`✅ Created ${created.count} new podcasts with real BBC audio!`);
}

updatePodcasts()
  .catch((e) => {
    console.error('❌ Error updating podcasts:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
