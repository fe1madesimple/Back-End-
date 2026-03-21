export const mrrData = [
  { month: 'Oct', value: 1200 },
  { month: 'Nov', value: 1650 },
  { month: 'Dec', value: 1420 },
  { month: 'Jan', value: 2180 },
  { month: 'Feb', value: 1980 },
  { month: 'Mar', value: 2560 },
  { month: 'Apr', value: 2340 },
  { month: 'May', value: 2980 },
  { month: 'Jun', value: 2720 },
  { month: 'Jul', value: 3480 },
  { month: 'Aug', value: 3140 },
  { month: 'Sep', value: 3820 },
  { month: 'Oct', value: 3590 },
  { month: 'Nov', value: 4280 },
]

export const userGrowthData = [
  { month: 'Oct', users: 80  },
  { month: 'Nov', users: 98  },
  { month: 'Dec', users: 89  },
  { month: 'Jan', users: 124 },
  { month: 'Feb', users: 108 },
  { month: 'Mar', users: 147 },
  { month: 'Apr', users: 138 },
  { month: 'May', users: 172 },
  { month: 'Jun', users: 159 },
  { month: 'Jul', users: 201 },
  { month: 'Aug', users: 188 },
  { month: 'Sep', users: 224 },
  { month: 'Oct', users: 214 },
  { month: 'Nov', users: 247 },
]

export const revenueData = {
  // Current snapshot
  mrr: 4280,
  mrrLastMonth: 3620,
  mrrGrowthPercent: 18.2,
  arr: 51360,
  totalRevenueAllTime: 38420,
  arpu: 36.80,
  netRevenueThisMonth: 4231,
  refundsThisMonth: 49,
  activePayingSubscribers: 187,
  trialUsers: 60,

  // Plan breakdown
  planBreakdown: [
    { plan: 'Standard Monthly', subscribers: 84,  mrr: 2436, percent: 56.9, color: '#3B82F6', momChange: 12 },
    { plan: 'Pro Monthly',      subscribers: 48,  mrr: 2352, percent: 54.9, color: '#10B981', momChange: 8  },
    { plan: 'Standard Annual',  subscribers: 32,  mrr: 664,  percent: 15.5, color: '#8B5CF6', momChange: 4  },
    { plan: 'Pro Annual',       subscribers: 23,  mrr: 765,  percent: 17.9, color: '#F59E0B', momChange: -2 },
  ],

  // MRR trend - 14 months zigzag
  mrrTrend: [
    { month: 'Feb 25', mrr: 480,  churnLoss: 29  },
    { month: 'Mar 25', mrr: 720,  churnLoss: 58  },
    { month: 'Apr 25', mrr: 640,  churnLoss: 87  },
    { month: 'May 25', mrr: 980,  churnLoss: 29  },
    { month: 'Jun 25', mrr: 1240, churnLoss: 116 },
    { month: 'Jul 25', mrr: 1180, churnLoss: 145 },
    { month: 'Aug 25', mrr: 1620, churnLoss: 87  },
    { month: 'Sep 25', mrr: 1840, churnLoss: 58  },
    { month: 'Oct 25', mrr: 2180, churnLoss: 174 },
    { month: 'Nov 25', mrr: 2640, churnLoss: 116 },
    { month: 'Dec 25', mrr: 2480, churnLoss: 203 },
    { month: 'Jan 26', mrr: 3180, churnLoss: 145 },
    { month: 'Feb 26', mrr: 3620, churnLoss: 87  },
    { month: 'Mar 26', mrr: 4280, churnLoss: 58  },
  ],

  // Churn this month
  churnedThisMonth: [
    { id: 'ch1', name: 'Padraig Hennigan',  email: 'padraig.hen@example.com',  plan: 'Standard Monthly', revenue: 87,  daysSubscribed: 158, reason: 'Too expensive',      cancelledAt: '2026-03-14T10:00:00Z' },
    { id: 'ch2', name: 'Seamus Connolly',   email: 'seamus.con@example.com',   plan: 'Standard Monthly', revenue: 29,  daysSubscribed: 44,  reason: 'Not what I expected', cancelledAt: '2026-03-10T14:00:00Z' },
    { id: 'ch3', name: 'Clodagh Byrne',     email: 'clodagh.byrne@example.com', plan: 'Standard Annual', revenue: 249, daysSubscribed: 142, reason: 'Passed exam',          cancelledAt: '2026-03-07T09:00:00Z' },
  ],
  churnRateThisMonth: 3.2,
  churnRateLastMonth: 2.8,
  avgSubscriptionLifetimeDays: 134,
  revenueFromChurnThisMonth: 367,
  revenueFromChurnLastMonth: 290,

  // Recent payments
  recentPayments: [
    { id: 'pay1',  userName: 'Chiamaka Uchenna',  email: 'chiamaka.u@example.com',  amount: 49,  plan: 'Pro Monthly',      status: 'SUCCESS', method: 'Visa •••• 4242',        date: '2026-03-18T10:14:00Z' },
    { id: 'pay2',  userName: 'Tunde Adeyemi',      email: 'tunde.adeyemi@example.com', amount: 399, plan: 'Pro Annual',        status: 'SUCCESS', method: 'Mastercard •••• 8888',  date: '2026-03-18T08:22:00Z' },
    { id: 'pay3',  userName: 'Aoife Murphy',       email: 'aoife.murphy@example.com', amount: 49,  plan: 'Pro Monthly',      status: 'SUCCESS', method: 'Visa •••• 1234',        date: '2026-03-17T16:40:00Z' },
    { id: 'pay4',  userName: 'Grainne Fitzgerald', email: 'grainne.fitz@example.com', amount: 49,  plan: 'Pro Monthly',      status: 'SUCCESS', method: 'Visa •••• 5566',        date: '2026-03-17T11:20:00Z' },
    { id: 'pay5',  userName: 'Emeka Okafor',       email: 'emeka.okafor@example.com', amount: 29,  plan: 'Standard Monthly', status: 'SUCCESS', method: 'Mastercard •••• 3344',  date: '2026-03-16T09:00:00Z' },
    { id: 'pay6',  userName: 'Roisin Gallagher',   email: 'roisin.gal@example.com',   amount: 29,  plan: 'Standard Monthly', status: 'FAILED',  method: 'Visa •••• 9900',        date: '2026-03-15T14:00:00Z' },
    { id: 'pay7',  userName: 'Biodun Afolabi',     email: 'biodun.afo@example.com',   amount: 249, plan: 'Standard Annual',  status: 'SUCCESS', method: 'Visa •••• 7712',        date: '2026-03-15T10:30:00Z' },
    { id: 'pay8',  userName: 'Siobhan Kelly',      email: 'siobhan.kelly@example.com',amount: 29,  plan: 'Standard Monthly', status: 'SUCCESS', method: 'Mastercard •••• 2211',  date: '2026-03-14T16:00:00Z' },
    { id: 'pay9',  userName: 'Cormac Burke',       email: 'cormac.burke@example.com', amount: 49,  plan: 'Pro Monthly',      status: 'SUCCESS', method: 'Visa •••• 4321',        date: '2026-03-14T11:00:00Z' },
    { id: 'pay10', userName: 'Niamh O Brien',      email: 'niamh.obrien@example.com', amount: 29,  plan: 'Standard Monthly', status: 'FAILED',  method: 'Visa •••• 0011',        date: '2026-03-13T09:00:00Z' },
  ],

  // Failed payments
  failedPayments: [
    { id: 'fp1', userName: 'Roisin Gallagher', email: 'roisin.gal@example.com',  amount: 29,  plan: 'Standard Monthly', failDate: '2026-03-15T14:00:00Z', retries: 1, reason: 'Insufficient funds' },
    { id: 'fp2', userName: 'Niamh O Brien',    email: 'niamh.obrien@example.com', amount: 29,  plan: 'Standard Monthly', failDate: '2026-03-13T09:00:00Z', retries: 2, reason: 'Card expired'        },
    { id: 'fp3', userName: 'Seamus Connolly',  email: 'seamus.con@example.com',  amount: 29,  plan: 'Standard Monthly', failDate: '2026-03-10T08:00:00Z', retries: 3, reason: 'Card declined'        },
  ],

  // Upgrades and downgrades this month
  upgrades: [
    { id: 'up1', userName: 'Tunde Adeyemi',    from: 'Standard Monthly', to: 'Pro Annual',       revenueGain: 370, date: '2026-03-01T10:00:00Z' },
    { id: 'up2', userName: 'Chiamaka Uchenna', from: 'Standard Monthly', to: 'Pro Monthly',      revenueGain: 20,  date: '2026-03-05T11:00:00Z' },
    { id: 'up3', userName: 'Aisling Flanagan', from: 'Standard Annual',  to: 'Pro Monthly',      revenueGain: 290, date: '2026-03-08T09:00:00Z' },
  ],
  downgrades: [
    { id: 'dg1', userName: 'Diarmuid Healy', from: 'Standard Monthly', to: 'Free', revenueLoss: 29, date: '2026-03-12T14:00:00Z' },
  ],

  // Forecast
  projectedMRR3Months: 5840,
  projectedMRR6Months: 7920,
  monthlyRunningCost: 380,
  breakEvenSubscribers: 14,
}

export const retentionData = {
  // Health pulse
  activeUsersLast7Days: 89,
  activeUsersLast30Days: 187,
  inactiveUsers7Plus: 48,
  inactiveUsers14Plus: 31,
  avgDailyActiveUsers: 62,
  retentionRate30Day: 76,

  // Daily active users - last 30 days
  dailyActiveUsers: [
    { date: '18 Feb', dau: 54 }, { date: '19 Feb', dau: 48 },
    { date: '20 Feb', dau: 71 }, { date: '21 Feb', dau: 68 },
    { date: '22 Feb', dau: 42 }, { date: '23 Feb', dau: 39 },
    { date: '24 Feb', dau: 76 }, { date: '25 Feb', dau: 81 },
    { date: '26 Feb', dau: 74 }, { date: '27 Feb', dau: 88 },
    { date: '28 Feb', dau: 69 }, { date: '01 Mar', dau: 47 },
    { date: '02 Mar', dau: 41 }, { date: '03 Mar', dau: 79 },
    { date: '04 Mar', dau: 84 }, { date: '05 Mar', dau: 77 },
    { date: '06 Mar', dau: 91 }, { date: '07 Mar', dau: 86 },
    { date: '08 Mar', dau: 52 }, { date: '09 Mar', dau: 44 },
    { date: '10 Mar', dau: 83 }, { date: '11 Mar', dau: 79 },
    { date: '12 Mar', dau: 88 }, { date: '13 Mar', dau: 94 },
    { date: '14 Mar', dau: 87 }, { date: '15 Mar', dau: 51 },
    { date: '16 Mar', dau: 46 }, { date: '17 Mar', dau: 82 },
    { date: '18 Mar', dau: 78 }, { date: '19 Mar', dau: 62 },
  ],

  // At risk users
  atRiskUsers: [
    { id: 'ar1',  name: 'Diarmuid Healy',    email: 'diarmuid.healy@example.com', plan: 'Standard Monthly', lastActive: '2026-03-05T10:00:00Z', daysInactive: 14, streak: 0, streakBroken: true, riskLevel: 'Critical', autoEmailSent: true, trialDaysLeft: null },
    { id: 'ar2',  name: 'Maeve Quinn',       email: 'maeve.quinn@example.com',    plan: 'Trial',            lastActive: '2026-03-07T14:00:00Z', daysInactive: 12, streak: 0, streakBroken: true, riskLevel: 'Critical', autoEmailSent: true, trialDaysLeft: 2 },
    { id: 'ar3',  name: 'Tobenna Ezechukwu', email: 'tobenna.eze@example.com',    plan: 'Standard Monthly', lastActive: '2026-03-08T09:00:00Z', daysInactive: 11, streak: 0, streakBroken: true, riskLevel: 'High', autoEmailSent: true, trialDaysLeft: null },
    { id: 'ar4',  name: 'Ifeoma Obi',        email: 'ifeoma.obi@example.com',     plan: 'Trial',            lastActive: '2026-03-09T16:00:00Z', daysInactive: 10, streak: 2, streakBroken: false, riskLevel: 'High', autoEmailSent: false, trialDaysLeft: 1 },
    { id: 'ar5',  name: 'Clodagh Byrne',     email: 'clodagh.byrne@example.com',  plan: 'Standard Monthly', lastActive: '2026-03-10T11:00:00Z', daysInactive: 9, streak: 0, streakBroken: true, riskLevel: 'High', autoEmailSent: true, trialDaysLeft: null },
    { id: 'ar6',  name: 'Babatunde Okonkwo', email: 'babatunde.ok@example.com',   plan: 'Standard Monthly', lastActive: '2026-03-11T08:00:00Z', daysInactive: 8, streak: 0, streakBroken: true, riskLevel: 'Medium', autoEmailSent: false, trialDaysLeft: null },
    { id: 'ar7',  name: 'Aisling Flanagan',  email: 'aisling.flan@example.com',   plan: 'Pro Monthly',      lastActive: '2026-03-12T15:00:00Z', daysInactive: 7, streak: 4, streakBroken: false, riskLevel: 'Medium', autoEmailSent: false, trialDaysLeft: null },
    { id: 'ar8',  name: 'Chinonso Obiora',   email: 'chinonso.ob@example.com',    plan: 'Trial',            lastActive: '2026-03-12T10:00:00Z', daysInactive: 7, streak: 0, streakBroken: true, riskLevel: 'Medium', autoEmailSent: false, trialDaysLeft: 3 },
    { id: 'ar9',  name: 'Rotimi Adeyemi',    email: 'rotimi.ade@example.com',     plan: 'Pro Monthly',      lastActive: '2026-03-13T09:00:00Z', daysInactive: 6, streak: 1, streakBroken: false, riskLevel: 'Low', autoEmailSent: false, trialDaysLeft: null },
    { id: 'ar10', name: 'Ngozi Okonkwo',     email: 'ngozi.okonkwo@example.com',  plan: 'Standard Monthly', lastActive: '2026-03-13T14:00:00Z', daysInactive: 6, streak: 0, streakBroken: true, riskLevel: 'Low', autoEmailSent: false, trialDaysLeft: null },
  ],

  // Churn prediction signals
  signals: [
    {
      id: 'sig1',
      type: 'streak_broken',
      title: 'Broken Streaks This Week',
      detail: 'These users broke their study streak in the last 7 days - high correlation with churn within 14 days',
      count: 14,
      severity: 'danger',
      campaignLabel: 'Send streak recovery email',
    },
    {
      id: 'sig2',
      type: 'score_drop',
      title: 'Quiz Score Drop 20%+',
      detail: 'Users whose average quiz score dropped significantly vs last month - may be disengaging or struggling',
      count: 8,
      severity: 'warning',
      campaignLabel: 'Send encouragement + tips email',
    },
    {
      id: 'sig3',
      type: 'trial_no_quiz',
      title: 'Trials Expiring - Never Took a Quiz',
      detail: '3 trial users expire in under 3 days and have never attempted a single MCQ - lowest conversion rate segment',
      count: 3,
      severity: 'danger',
      campaignLabel: 'Send trial urgency email',
    },
    {
      id: 'sig4',
      type: 'no_lesson',
      title: 'Standard Users - No Lesson in 14 Days',
      detail: 'Paying Standard subscribers who have not opened a lesson in 2 weeks - at real risk of cancellation',
      count: 11,
      severity: 'warning',
      campaignLabel: 'Send re-engagement email',
    },
  ],

  // Campaign results
  campaigns: [
    {
      id: 'camp1',
      name: 'Streak Recovery - March Week 2',
      sentAt: '2026-03-11T09:00:00Z',
      emailsSent: 18,
      openRate: 64,
      clickRate: 31,
      usersReturned: 7,
      returnRate: 39,
    },
    {
      id: 'camp2',
      name: 'Trial Expiry Urgency - March',
      sentAt: '2026-03-09T10:00:00Z',
      emailsSent: 6,
      openRate: 83,
      clickRate: 50,
      usersReturned: 3,
      returnRate: 50,
    },
    {
      id: 'camp3',
      name: 'Win-Back - Inactive 14 Days',
      sentAt: '2026-03-05T09:00:00Z',
      emailsSent: 24,
      openRate: 48,
      clickRate: 22,
      usersReturned: 5,
      returnRate: 21,
    },
  ],
}

export const podcastFolders = [
  { id: 'f1', name: 'Criminal Law', color: '#E6027D', podcastCount: 29, createdAt: '2026-03-01T00:00:00Z' },
  { id: 'f2', name: 'Contract Law', color: '#FDC300', podcastCount: 25, createdAt: '2026-03-01T00:00:00Z' },
  { id: 'f3', name: 'Tort Law', color: '#B38513', podcastCount: 33, createdAt: '2026-03-01T00:00:00Z' },
  { id: 'f4', name: 'Constitutional Law', color: '#961C81', podcastCount: 37, createdAt: '2026-03-01T00:00:00Z' },
  { id: 'f5', name: 'EU Law', color: '#009DDD', podcastCount: 43, createdAt: '2026-03-01T00:00:00Z' },
  { id: 'f6', name: 'Equity', color: '#63C0F2', podcastCount: 17, createdAt: '2026-03-01T00:00:00Z' },
  { id: 'f7', name: 'Property Law', color: '#5F3EB5', podcastCount: 37, createdAt: '2026-03-01T00:00:00Z' },
  { id: 'f8', name: 'Company Law', color: '#8659FB', podcastCount: 30, createdAt: '2026-03-01T00:00:00Z' },
  { id: 'f9', name: 'Bonus Episodes', color: '#10B981', podcastCount: 18, createdAt: '2026-03-01T00:00:00Z' },
]

export const adminPodcasts = [
  {
    id: 'p1', title: 'Characteristics and Indicia of a Crime', subjectName: 'Criminal Law', subjectColor: '#E6027D',
    duration: 397, moduleNumber: 1, lessonNumber: 1, part: 1, isBonus: false, isPublished: true,
    audioUrl: 'https://res.cloudinary.com/dscjsf8ln/video/upload/v1774034464/fe1/podcasts/criminal-law/Module_1_Lesson_1_1.m4a',
    thumbnail: 'https://res.cloudinary.com/db3waebh7/image/upload/v1770073930/ideogram-v3.0_Minimalist_law_podcast_cover_Irish_legal_education_theme_single_golden_scale_ico-0_ojxvyo.png',
    notes: { concepts: ['What makes an act a crime rather than a civil wrong', 'Role of the State in prosecution', 'General indicia courts use to classify criminal obligations'], cases: ['Salomon v. A Salomon and Co Ltd [1897] - separate legal personality'] },
    examTip: 'The distinction between civil and criminal liability is foundational - always begin a criminal law answer by confirming the act constitutes a crime before analysing the elements.',
    plays: 847, uniqueListeners: 312, avgCompletion: 74, folderId: 'f1', order: 1, createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'p2', title: 'Classification of Criminal Offences', subjectName: 'Criminal Law', subjectColor: '#E6027D',
    duration: 375, moduleNumber: 1, lessonNumber: 1, part: 2, isBonus: false, isPublished: true,
    audioUrl: 'https://res.cloudinary.com/dscjsf8ln/video/upload/v1774034471/fe1/podcasts/criminal-law/Module_1_Lesson_1_2.m4a',
    thumbnail: 'https://res.cloudinary.com/db3waebh7/image/upload/v1770073930/ideogram-v3.0_Minimalist_law_podcast_cover_Irish_legal_education_theme_single_golden_scale_ico-0_ojxvyo.png',
    notes: { concepts: ['Indictable vs summary offences', 'Arrestable vs non-arrestable classification', 'Impact of Criminal Law Act 1997 on arrest powers'], cases: [] },
    examTip: 'Classification of offences matters practically - arrestable vs non-arrestable determines Garda powers of detention.',
    plays: 634, uniqueListeners: 241, avgCompletion: 68, folderId: 'f1', order: 2, createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'p3', title: 'Offer and Acceptance', subjectName: 'Contract Law', subjectColor: '#FDC300',
    duration: 660, moduleNumber: 1, lessonNumber: 1, part: 1, isBonus: false, isPublished: true,
    audioUrl: 'https://res.cloudinary.com/dscjsf8ln/video/upload/v1774034766/fe1/podcasts/contract-law/Module_1_Lesson_1_1.m4a',
    thumbnail: 'https://res.cloudinary.com/db3waebh7/image/upload/v1770073930/ideogram-v3.0_Minimalist_law_podcast_cover_Irish_legal_education_theme_single_golden_scale_ico-0_ojxvyo.png',
    notes: { concepts: ['Offer vs invitation to treat', 'Acceptance must be unequivocal and communicated', 'Postal rule - acceptance effective when posted', 'Counter-offer destroys original offer'], cases: ['Carlill v Carbolic Smoke Ball Co [1893] - offer to world', 'Hyde v Wrench [1840] - counter-offer destroys original offer', 'Adams v Lindsell (1818) - postal rule'] },
    examTip: 'Always first identify whether an offer or invitation to treat was made - this determines whether acceptance is possible at all.',
    plays: 1203, uniqueListeners: 487, avgCompletion: 82, folderId: 'f2', order: 1, createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'p4', title: 'What is Tort Law?', subjectName: 'Tort Law', subjectColor: '#B38513',
    duration: 288, moduleNumber: 1, lessonNumber: 1, part: 1, isBonus: false, isPublished: true,
    audioUrl: 'https://res.cloudinary.com/dscjsf8ln/video/upload/fe1/podcasts/tort-law/Module_1_Lesson_1_1.mp3',
    thumbnail: 'https://res.cloudinary.com/db3waebh7/image/upload/v1770073930/ideogram-v3.0_Minimalist_law_podcast_cover_Irish_legal_education_theme_single_golden_scale_ico-0_ojxvyo.png',
    notes: { concepts: ['Tort law governs civil liability for wrongful acts', 'Relationship between tort, contract and criminal law', 'General structure of tortious liability'], cases: ['Donoghue v Stevenson [1932] - foundational neighbour principle'] },
    examTip: 'Always begin a tort answer by identifying the tort, establishing the elements, then applying them to the facts.',
    plays: 921, uniqueListeners: 356, avgCompletion: 71, folderId: 'f3', order: 1, createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'p5', title: 'How to Ace a Law Firm Interview', subjectName: 'Bonus', subjectColor: '#10B981',
    duration: 530, moduleNumber: null, lessonNumber: null, part: null, isBonus: true, isPublished: true,
    audioUrl: 'https://res.cloudinary.com/dscjsf8ln/video/upload/fe1/podcasts/bonus/ElevenLabs_How_to_Ace_a_Law_Firm_Interview.mp3',
    thumbnail: 'https://res.cloudinary.com/db3waebh7/image/upload/v1770073930/ideogram-v3.0_Minimalist_law_podcast_cover_Irish_legal_education_theme_single_golden_scale_ico-0_ojxvyo.png',
    notes: { concepts: ['Common interview formats used by Irish firms', 'How to discuss FE-1 performance confidently', 'Soft skills that separate successful candidates'], cases: [] },
    examTip: 'Interviewers often ask about current legal developments. Read the Irish Times Law section and the Law Society Gazette weekly.',
    plays: 445, uniqueListeners: 198, avgCompletion: 88, folderId: 'f9', order: 1, createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'p6', title: 'Mens Rea - Intention, Recklessness and Negligence', subjectName: 'Criminal Law', subjectColor: '#E6027D',
    duration: 519, moduleNumber: 3, lessonNumber: 3, part: 1, isBonus: false, isPublished: false,
    audioUrl: 'https://res.cloudinary.com/dscjsf8ln/video/upload/v1774034492/fe1/podcasts/criminal-law/Module_3_Lesson_3_1.m4a',
    thumbnail: 'https://res.cloudinary.com/db3waebh7/image/upload/v1770073930/ideogram-v3.0_Minimalist_law_podcast_cover_Irish_legal_education_theme_single_golden_scale_ico-0_ojxvyo.png',
    notes: { concepts: ['Specific vs basic intent distinction', 'Subjective and objective recklessness', 'Strict liability and its rare application'], cases: ['The People (DPP) v Murray [1977] - intention in Irish criminal law', 'DPP v Majewski [1977] - intoxication and mens rea'] },
    examTip: 'Getting mens rea right is the difference between a pass and a fail in most FE-1 criminal scenarios.',
    plays: 0, uniqueListeners: 0, avgCompletion: 0, folderId: 'f1', order: 3, createdAt: '2026-03-10T00:00:00Z',
  },
]

export const podcastStats = {
  totalEpisodes: 269,
  published: 251,
  drafts: 18,
  totalPlayHours: 4847,
  uniqueListeners: 1203,
  avgCompletionRate: 71,
  mostPlayed: 'Offer and Acceptance',
  mostPlayedCount: 1203,
  topSubject: 'Criminal Law',
  topSubjectPlays: 12847,
  thisWeekPlays: 847,
  thisWeekGrowth: 12,
}

export const recoveryData = {
  // Pulse stats
  totalAtRisk: 87,
  recoveredThisMonth: 203,
  recoveryRate: 68,
  avgDaysToRecover: 4.2,
  failedInQueue: 3,
  lostUnrecoverable: 29,

  // Failed payment queue
  failedQueue: [
    {
      id: 'fq1',
      userName: 'Roisin Gallagher',
      email: 'roisin.gal@example.com',
      plan: 'Standard Monthly',
      amount: 29,
      failReason: 'Insufficient funds',
      firstFailedAt: '2026-03-15T14:00:00Z',
      retryCount: 1,
      nextRetryAt: '2026-03-21T14:00:00Z',
      escalationStage: 'Day 3',
      status: 'Pending Retry',
    },
    {
      id: 'fq2',
      userName: 'Niamh O Brien',
      email: 'niamh.obrien@example.com',
      plan: 'Standard Monthly',
      amount: 29,
      failReason: 'Card expired',
      firstFailedAt: '2026-03-13T09:00:00Z',
      retryCount: 2,
      nextRetryAt: '2026-03-22T09:00:00Z',
      escalationStage: 'Day 7',
      status: 'Escalated',
    },
    {
      id: 'fq3',
      userName: 'Seamus Connolly',
      email: 'seamus.con@example.com',
      plan: 'Standard Monthly',
      amount: 29,
      failReason: 'Card declined',
      firstFailedAt: '2026-03-10T08:00:00Z',
      retryCount: 3,
      nextRetryAt: null,
      escalationStage: 'Final Notice',
      status: 'Final Notice',
    },
  ],

  // Weekly recovery chart — 8 weeks
  weeklyRecovery: [
    { week: 'Week 1 Jan', failed: 116, recovered: 87  },
    { week: 'Week 2 Jan', failed: 87,  recovered: 58  },
    { week: 'Week 3 Jan', failed: 145, recovered: 116 },
    { week: 'Week 4 Jan', failed: 58,  recovered: 29  },
    { week: 'Week 1 Feb', failed: 174, recovered: 116 },
    { week: 'Week 2 Feb', failed: 87,  recovered: 58  },
    { week: 'Week 3 Feb', failed: 116, recovered: 87  },
    { week: 'Week 4 Feb', failed: 87,  recovered: 58  },
  ],

  // Escalation pipeline stages
  escalationStages: [
    { stage: 'Day 0',     label: 'Payment Failed Email',     description: 'Automatic email sent immediately on payment failure with update card link', usersAtStage: 1, color: '#3B82F6' },
    { stage: 'Day 3',     label: 'Reminder Email',           description: 'Second email reminding user to update payment method before access is restricted', usersAtStage: 1, color: '#F59E0B' },
    { stage: 'Day 7',     label: 'Final Warning Email',      description: 'Final warning — account will be suspended in 3 days if payment is not updated', usersAtStage: 1, color: '#EF4444' },
    { stage: 'Day 10',    label: 'Account Suspended',        description: 'Account automatically suspended — re-activation email sent with payment link', usersAtStage: 0, color: '#6B7280' },
  ],

  // Recovery settings defaults
  settings: {
    autoRetryEnabled: true,
    retryInterval: '3days',
    autoSuspendEnabled: true,
    maxRetryAttempts: '3',
    sendEmailOnFailure: true,
    sendEmailOnRecovery: true,
  },
}

export const users = [
  { id: '1',  name: 'Aoife Murphy',      email: 'aoife.murphy@example.com',     plan: 'Pro',      status: 'Active',   joinDate: '2025-09-15', lastActive: '2026-03-16', streak: 14, revenue: 392 },
  { id: '2',  name: 'Ciarán Walsh',      email: 'ciaran.walsh@example.com',     plan: 'Standard', status: 'Active',   joinDate: '2025-10-02', lastActive: '2026-03-15', streak: 7,  revenue: 145 },
  { id: '3',  name: 'Siobhán Kelly',     email: 'siobhan.kelly@example.com',    plan: 'Pro',      status: 'Active',   joinDate: '2025-10-18', lastActive: '2026-03-14', streak: 21, revenue: 441 },
  { id: '4',  name: 'Emeka Okafor',      email: 'emeka.okafor@example.com',     plan: 'Standard', status: 'Trial',    joinDate: '2026-03-10', lastActive: '2026-03-16', streak: 6,  revenue: 0   },
  { id: '5',  name: 'Fionnuala Byrne',   email: 'fionnuala.byrne@example.com',  plan: 'Standard', status: 'Active',   joinDate: '2025-11-05', lastActive: '2026-03-13', streak: 3,  revenue: 145 },
  { id: '6',  name: 'Tunde Adeyemi',     email: 'tunde.adeyemi@example.com',    plan: 'Pro',      status: 'Active',   joinDate: '2025-08-22', lastActive: '2026-03-16', streak: 30, revenue: 490 },
  { id: '7',  name: 'Niamh O Brien',     email: 'niamh.obrien@example.com',     plan: 'Free',     status: 'Freemium', joinDate: '2026-01-14', lastActive: '2026-02-28', streak: 0,  revenue: 0   },
  { id: '8',  name: 'Olumide Adebayo',   email: 'olumide.adebayo@example.com',  plan: 'Standard', status: 'Active',   joinDate: '2025-12-01', lastActive: '2026-03-12', streak: 9,  revenue: 174 },
  { id: '9',  name: 'Grainne Fitzgerald',email: 'grainne.fitz@example.com',     plan: 'Pro',      status: 'Active',   joinDate: '2025-09-30', lastActive: '2026-03-15', streak: 18, revenue: 441 },
  { id: '10', name: 'Chukwuemeka Eze',   email: 'chukwu.eze@example.com',       plan: 'Standard', status: 'Active',   joinDate: '2026-01-20', lastActive: '2026-03-11', streak: 5,  revenue: 58  },
  { id: '11', name: 'Caoimhe Doran',     email: 'caoimhe.doran@example.com',    plan: 'Standard', status: 'Trial',    joinDate: '2026-03-12', lastActive: '2026-03-16', streak: 4,  revenue: 0   },
  { id: '12', name: 'Adaeze Nwachukwu',  email: 'adaeze.nwa@example.com',       plan: 'Pro',      status: 'Active',   joinDate: '2025-11-18', lastActive: '2026-03-14', streak: 11, revenue: 392 },
  { id: '13', name: 'Seamus Connolly',   email: 'seamus.con@example.com',       plan: 'Free',     status: 'Freemium', joinDate: '2026-02-05', lastActive: '2026-03-01', streak: 0,  revenue: 0   },
  { id: '14', name: 'Ifeoma Obi',        email: 'ifeoma.obi@example.com',       plan: 'Standard', status: 'Active',   joinDate: '2025-12-20', lastActive: '2026-03-10', streak: 8,  revenue: 116 },
  { id: '15', name: 'Padraig Hennigan',  email: 'padraig.hen@example.com',      plan: 'Standard', status: 'Cancelled',joinDate: '2025-10-10', lastActive: '2026-02-14', streak: 0,  revenue: 87  },
  { id: '16', name: 'Chiamaka Uchenna',  email: 'chiamaka.u@example.com',       plan: 'Pro',      status: 'Active',   joinDate: '2025-09-05', lastActive: '2026-03-16', streak: 44, revenue: 490 },
  { id: '17', name: 'Roisin Gallagher',  email: 'roisin.gal@example.com',       plan: 'Standard', status: 'Active',   joinDate: '2026-01-08', lastActive: '2026-03-09', streak: 2,  revenue: 58  },
  { id: '18', name: 'Biodun Afolabi',    email: 'biodun.afo@example.com',       plan: 'Standard', status: 'Trial',    joinDate: '2026-03-14', lastActive: '2026-03-16', streak: 2,  revenue: 0   },
  { id: '19', name: 'Eimear Breathnach', email: 'eimear.bre@example.com',       plan: 'Pro',      status: 'Active',   joinDate: '2025-10-25', lastActive: '2026-03-15', streak: 16, revenue: 441 },
  { id: '20', name: 'Kingsley Nwosu',    email: 'kingsley.nw@example.com',      plan: 'Standard', status: 'Active',   joinDate: '2025-12-12', lastActive: '2026-03-13', streak: 6,  revenue: 87  },
  { id: '21', name: 'Cormac Burke',       email: 'cormac.burke@example.com',    plan: 'Pro',      status: 'Active',    joinDate: '2025-08-10', lastActive: '2026-03-16', streak: 22, revenue: 441 },
  { id: '22', name: 'Ngozi Okonkwo',      email: 'ngozi.okonkwo@example.com',   plan: 'Standard', status: 'Active',    joinDate: '2025-11-22', lastActive: '2026-03-14', streak: 8,  revenue: 116 },
  { id: '23', name: 'Diarmuid Healy',     email: 'diarmuid.healy@example.com',  plan: 'Free',     status: 'Freemium',  joinDate: '2026-01-30', lastActive: '2026-02-20', streak: 0,  revenue: 0   },
  { id: '24', name: 'Amara Osei',         email: 'amara.osei@example.com',      plan: 'Pro',      status: 'Active',    joinDate: '2025-09-18', lastActive: '2026-03-15', streak: 19, revenue: 490 },
  { id: '25', name: 'Sinead Molloy',      email: 'sinead.molloy@example.com',   plan: 'Standard', status: 'Trial',     joinDate: '2026-03-11', lastActive: '2026-03-16', streak: 5,  revenue: 0   },
  { id: '26', name: 'Tobenna Eze',        email: 'tobenna.eze@example.com',     plan: 'Standard', status: 'Active',    joinDate: '2025-12-08', lastActive: '2026-03-13', streak: 11, revenue: 87  },
  { id: '27', name: 'Aisling Flanagan',   email: 'aisling.flan@example.com',    plan: 'Pro',      status: 'Active',    joinDate: '2025-10-14', lastActive: '2026-03-16', streak: 34, revenue: 392 },
  { id: '28', name: 'Chidi Okoye',        email: 'chidi.okoye@example.com',     plan: 'Free',     status: 'Freemium',  joinDate: '2026-02-18', lastActive: '2026-03-05', streak: 0,  revenue: 0   },
  { id: '29', name: 'Maeve Quinn',        email: 'maeve.quinn@example.com',     plan: 'Standard', status: 'Active',    joinDate: '2025-11-30', lastActive: '2026-03-12', streak: 7,  revenue: 145 },
  { id: '30', name: 'Rotimi Adeyemi',     email: 'rotimi.ade@example.com',      plan: 'Pro',      status: 'Active',    joinDate: '2025-08-05', lastActive: '2026-03-16', streak: 41, revenue: 490 },
  { id: '31', name: 'Clodagh Byrne',      email: 'clodagh.byrne@example.com',   plan: 'Standard', status: 'Cancelled', joinDate: '2025-09-25', lastActive: '2026-02-10', streak: 0,  revenue: 116 },
  { id: '32', name: 'Ifeanyi Chukwu',     email: 'ifeanyi.ch@example.com',      plan: 'Standard', status: 'Active',    joinDate: '2026-01-05', lastActive: '2026-03-11', streak: 4,  revenue: 58  },
  { id: '33', name: 'Sorcha Murphy',      email: 'sorcha.mu@example.com',       plan: 'Pro',      status: 'Active',    joinDate: '2025-07-20', lastActive: '2026-03-15', streak: 28, revenue: 441 },
  { id: '34', name: 'Emeka Chibuike',     email: 'emeka.chib@example.com',      plan: 'Free',     status: 'Freemium',  joinDate: '2026-02-25', lastActive: '2026-03-08', streak: 1,  revenue: 0   },
  { id: '35', name: 'Nuala Sheridan',     email: 'nuala.sher@example.com',      plan: 'Standard', status: 'Active',    joinDate: '2025-12-15', lastActive: '2026-03-14', streak: 9,  revenue: 87  },
  { id: '36', name: 'Babatunde Okafor',   email: 'babatunde.ok@example.com',    plan: 'Pro',      status: 'Active',    joinDate: '2025-10-01', lastActive: '2026-03-16', streak: 37, revenue: 490 },
  { id: '37', name: 'Deirdre Lyons',      email: 'deirdre.ly@example.com',      plan: 'Standard', status: 'Trial',     joinDate: '2026-03-13', lastActive: '2026-03-16', streak: 3,  revenue: 0   },
  { id: '38', name: 'Chinonso Obi',       email: 'chinonso.ob@example.com',     plan: 'Standard', status: 'Active',    joinDate: '2025-11-10', lastActive: '2026-03-10', streak: 6,  revenue: 116 },
  { id: '39', name: 'Aoibheann Daly',     email: 'aoibheann.da@example.com',    plan: 'Pro',      status: 'Active',    joinDate: '2025-09-08', lastActive: '2026-03-15', streak: 25, revenue: 392 },
  { id: '40', name: 'Oluwaseun Abiodun',  email: 'oluwaseun.ab@example.com',    plan: 'Standard', status: 'Active',    joinDate: '2026-01-25', lastActive: '2026-03-13', streak: 5,  revenue: 58  },
]

export const recentSignups = users.slice(0, 5)

export const platformHealth = {
  subjects: 8,
  totalLessons: 96,
  mcqQuestions: 580,
  essayQuestions: 124,
  podcasts: 34,
  caseLaw: 287,
}

export const aiUsage = {
  tokensUsedThisMonth: 2847392,
  costEur: 187.42,
  burnRateDaily: 8.52,
  daysRemaining: 18,
  successRate: 98.4,
  requestCount: 1847,
  currentPercent: 62,
  byFeature: [
    { feature: 'Essay Grading',  tokens: 1420000, costEur: 93.4,  percent: 49.9 },
    { feature: 'Lesson Practice', tokens: 854000,  costEur: 56.2,  percent: 30.0 },
    { feature: 'Simulations',    tokens: 573392,  costEur: 37.8,  percent: 20.1 },
  ],
}

export const failedPayments = [
  { id: '1', userName: 'Padraig Hennigan', userEmail: 'padraig.hen@example.com', amount: 29, currency: 'EUR', failDate: '2026-03-14', retries: 2, status: 'Recovering', plan: 'Standard' },
  { id: '2', userName: 'Seamus Connolly',  userEmail: 'seamus.con@example.com',  amount: 29, currency: 'EUR', failDate: '2026-03-10', retries: 3, status: 'Lost',       plan: 'Standard' },
  { id: '3', userName: 'Niamh O Brien',    userEmail: 'niamh.obrien@example.com', amount: 49, currency: 'EUR', failDate: '2026-03-12', retries: 1, status: 'Recovering', plan: 'Pro' },
  { id: '4', userName: 'Roisin Gallagher', userEmail: 'roisin.gal@example.com',  amount: 29, currency: 'EUR', failDate: '2026-03-15', retries: 0, status: 'Recovering', plan: 'Standard' },
  { id: '5', userName: 'Seamus Connolly',  userEmail: 'seamus.con@example.com',  amount: 29, currency: 'EUR', failDate: '2026-02-10', retries: 3, status: 'Lost',       plan: 'Standard' },
]

export const atRiskUsers = [
  { id: '1', name: 'Niamh O Brien',     email: 'niamh.obrien@example.com', riskLevel: 'HIGH',     reason: 'No login in 16 days',          daysInactive: 16, actionTaken: 'Email sent',    actionDate: '2026-03-10', result: 'Pending' },
  { id: '2', name: 'Seamus Connolly',   email: 'seamus.con@example.com',   riskLevel: 'CRITICAL',  reason: 'Trial ended, no upgrade',      daysInactive: 14, actionTaken: 'Upgrade nudge', actionDate: '2026-03-09', result: 'Lost'    },
  { id: '3', name: 'Padraig Hennigan',  email: 'padraig.hen@example.com',  riskLevel: 'HIGH',     reason: 'Streak broken, 3 failed payments', daysInactive: 30, actionTaken: 'Email sent', actionDate: '2026-03-14', result: 'Pending' },
  { id: '4', name: 'Ciarán Walsh',      email: 'ciaran.walsh@example.com', riskLevel: 'MEDIUM',   reason: 'Quiz scores declining',        daysInactive: 2,  actionTaken: 'Email sent',    actionDate: '2026-03-15', result: 'Returned'},
  { id: '5', name: 'Roisin Gallagher',  email: 'roisin.gal@example.com',   riskLevel: 'MEDIUM',   reason: 'No activity in 7 days',        daysInactive: 7,  actionTaken: 'Email sent',    actionDate: '2026-03-12', result: 'Pending' },
  { id: '6', name: 'Ifeoma Obi',        email: 'ifeoma.obi@example.com',   riskLevel: 'MEDIUM',   reason: 'Trial ending in 2 days',       daysInactive: 0,  actionTaken: 'Upgrade nudge', actionDate: '2026-03-16', result: 'Pending' },
  { id: '7', name: 'Caoimhe Doran',     email: 'caoimhe.doran@example.com', riskLevel: 'HIGH',    reason: 'Trial ending tomorrow',        daysInactive: 0,  actionTaken: 'Upgrade nudge', actionDate: '2026-03-16', result: 'Pending' },
  { id: '8', name: 'Biodun Afolabi',    email: 'biodun.afo@example.com',   riskLevel: 'MEDIUM',   reason: 'Low lesson completion rate',   daysInactive: 0,  actionTaken: 'Email sent',    actionDate: '2026-03-16', result: 'Pending' },
]

export const conversionFunnel = [
  { stage: 'Registered',   count: 380, percent: 100 },
  { stage: 'Onboarded',    count: 274, percent: 72  },
  { stage: 'First Lesson', count: 220, percent: 58  },
  { stage: 'First Quiz',   count: 156, percent: 41  },
  { stage: 'First Essay',  count: 87,  percent: 23  },
  { stage: 'Subscribed',   count: 68,  percent: 18  },
]

export const examCohorts = [
  { exam: 'March 2026',  students: 34, daysRemaining: 0,   status: 'Past'     },
  { exam: 'October 2026', students: 89, daysRemaining: 198, status: 'Upcoming' },
  { exam: 'March 2027',  students: 12, daysRemaining: 563, status: 'Future'   },
]

export const notificationLogs = [
  { id: '1',  type: 'TRIAL_EXPIRY',          email: 'niamh.obrien@example.com',    userName: 'Niamh O Brien',     status: 'SENT',    sentAt: '2026-03-10T08:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '2',  type: 'STREAK_ALERT',           email: 'padraig.hen@example.com',     userName: 'Padraig Hennigan',  status: 'SENT',    sentAt: '2026-03-15T20:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '3',  type: 'WEEKLY_PROGRESS',        email: 'ciaran.walsh@example.com',    userName: 'Ciarán Walsh',      status: 'SENT',    sentAt: '2026-03-11T09:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '4',  type: 'PAYMENT_FAILED',         email: 'seamus.con@example.com',      userName: 'Seamus Connolly',   status: 'FAILED',  sentAt: null,                   errorMessage: 'SMTP timeout',      retryCount: 2 },
  { id: '5',  type: 'SUBSCRIPTION_ACTIVATED', email: 'tunde.adeyemi@example.com',   userName: 'Tunde Adeyemi',     status: 'SENT',    sentAt: '2026-03-01T14:22:00Z', errorMessage: null,                retryCount: 0 },
  { id: '6',  type: 'TRIAL_ENDING',           email: 'caoimhe.doran@example.com',   userName: 'Caoimhe Doran',     status: 'PENDING', sentAt: null,                   errorMessage: null,                retryCount: 0 },
  { id: '7',  type: 'PAYMENT_SUCCESS',        email: 'aoife.murphy@example.com',    userName: 'Aoife Murphy',      status: 'SENT',    sentAt: '2026-03-16T10:14:00Z', errorMessage: null,                retryCount: 0 },
  { id: '8',  type: 'STREAK_ALERT',           email: 'roisin.gal@example.com',      userName: 'Roisin Gallagher',  status: 'FAILED',  sentAt: null,                   errorMessage: 'Invalid recipient', retryCount: 1 },
  { id: '9',  type: 'WEEKLY_PROGRESS',        email: 'emeka.okafor@example.com',    userName: 'Emeka Okafor',      status: 'SENT',    sentAt: '2026-03-11T09:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '10', type: 'TRIAL_EXPIRY',           email: 'biodun.afo@example.com',      userName: 'Biodun Afolabi',    status: 'SENT',    sentAt: '2026-03-14T08:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '11', type: 'PAYMENT_SUCCESS',        email: 'tunde.adeyemi@example.com',   userName: 'Tunde Adeyemi',     status: 'SENT',    sentAt: '2026-03-16T10:30:00Z', errorMessage: null,                retryCount: 0 },
  { id: '12', type: 'STREAK_ALERT',           email: 'niamh.obrien@example.com',    userName: 'Niamh O Brien',     status: 'SENT',    sentAt: '2026-03-15T20:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '13', type: 'TRIAL_ENDING',           email: 'emeka.okafor@example.com',    userName: 'Emeka Okafor',      status: 'SENT',    sentAt: '2026-03-15T08:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '14', type: 'WEEKLY_PROGRESS',        email: 'grainne.fitz@example.com',    userName: 'Grainne Fitzgerald',status: 'SENT',    sentAt: '2026-03-11T09:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '15', type: 'PAYMENT_FAILED',         email: 'roisin.gal@example.com',      userName: 'Roisin Gallagher',  status: 'FAILED',  sentAt: null,                   errorMessage: 'Invalid recipient', retryCount: 1 },
  { id: '16', type: 'SUBSCRIPTION_ACTIVATED', email: 'adaeze.nwa@example.com',      userName: 'Adaeze Nwachukwu',  status: 'SENT',    sentAt: '2026-03-10T14:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '17', type: 'TRIAL_EXPIRY',           email: 'padraig.hen@example.com',     userName: 'Padraig Hennigan',  status: 'SENT',    sentAt: '2026-03-09T08:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '18', type: 'STREAK_ALERT',           email: 'ifeoma.obi@example.com',      userName: 'Ifeoma Obi',        status: 'PENDING', sentAt: null,                   errorMessage: null,                retryCount: 0 },
  { id: '19', type: 'PAYMENT_SUCCESS',        email: 'chukwu.eze@example.com',      userName: 'Chukwuemeka Eze',   status: 'SENT',    sentAt: '2026-03-08T12:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '20', type: 'WEEKLY_PROGRESS',        email: 'siobhan.kelly@example.com',   userName: 'Siobhán Kelly',     status: 'SENT',    sentAt: '2026-03-04T09:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '21', type: 'TRIAL_ENDING',           email: 'biodun.afo@example.com',      userName: 'Biodun Afolabi',    status: 'SENT',    sentAt: '2026-03-14T08:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '22', type: 'PAYMENT_FAILED',         email: 'seamus.con@example.com',      userName: 'Seamus Connolly',   status: 'FAILED',  sentAt: null,                   errorMessage: 'Card declined',     retryCount: 3 },
  { id: '23', type: 'SUBSCRIPTION_ACTIVATED', email: 'cormac.burke@example.com',    userName: 'Cormac Burke',      status: 'SENT',    sentAt: '2026-03-07T11:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '24', type: 'STREAK_ALERT',           email: 'sorcha.mu@example.com',       userName: 'Sorcha Murphy',     status: 'SENT',    sentAt: '2026-03-13T20:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '25', type: 'TRIAL_EXPIRY',           email: 'diarmuid.healy@example.com',  userName: 'Diarmuid Healy',    status: 'SENT',    sentAt: '2026-03-06T08:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '26', type: 'WEEKLY_PROGRESS',        email: 'rotimi.ade@example.com',      userName: 'Rotimi Adeyemi',    status: 'SENT',    sentAt: '2026-03-04T09:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '27', type: 'PAYMENT_SUCCESS',        email: 'aoibheann.da@example.com',    userName: 'Aoibheann Daly',    status: 'SENT',    sentAt: '2026-03-03T10:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '28', type: 'STREAK_ALERT',           email: 'clodagh.byrne@example.com',   userName: 'Clodagh Byrne',     status: 'FAILED',  sentAt: null,                   errorMessage: 'Bounce - inactive', retryCount: 2 },
  { id: '29', type: 'SUBSCRIPTION_ACTIVATED', email: 'maeve.quinn@example.com',     userName: 'Maeve Quinn',       status: 'SENT',    sentAt: '2026-03-02T14:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '30', type: 'TRIAL_ENDING',           email: 'sinead.molloy@example.com',   userName: 'Sinead Molloy',     status: 'SENT',    sentAt: '2026-03-15T08:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '31', type: 'PAYMENT_FAILED',         email: 'chidi.okoye@example.com',     userName: 'Chidi Okoye',       status: 'PENDING', sentAt: null,                   errorMessage: null,                retryCount: 0 },
  { id: '32', type: 'WEEKLY_PROGRESS',        email: 'aisling.flan@example.com',    userName: 'Aisling Flanagan',  status: 'SENT',    sentAt: '2026-03-11T09:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '33', type: 'TRIAL_EXPIRY',           email: 'nuala.sher@example.com',      userName: 'Nuala Sheridan',    status: 'SENT',    sentAt: '2026-03-05T08:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '34', type: 'PAYMENT_SUCCESS',        email: 'babatunde.ok@example.com',    userName: 'Babatunde Okafor',  status: 'SENT',    sentAt: '2026-03-01T10:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '35', type: 'SUBSCRIPTION_ACTIVATED', email: 'tobenna.eze@example.com',     userName: 'Tobenna Eze',       status: 'SENT',    sentAt: '2026-02-28T14:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '36', type: 'STREAK_ALERT',           email: 'ngozi.okonkwo@example.com',   userName: 'Ngozi Okonkwo',     status: 'SENT',    sentAt: '2026-02-27T20:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '37', type: 'TRIAL_ENDING',           email: 'ifeanyi.ch@example.com',      userName: 'Ifeanyi Chukwu',    status: 'FAILED',  sentAt: null,                   errorMessage: 'SMTP error',        retryCount: 1 },
  { id: '38', type: 'PAYMENT_FAILED',         email: 'deirdre.ly@example.com',      userName: 'Deirdre Lyons',     status: 'PENDING', sentAt: null,                   errorMessage: null,                retryCount: 0 },
  { id: '39', type: 'WEEKLY_PROGRESS',        email: 'chinonso.ob@example.com',     userName: 'Chinonso Obi',      status: 'SENT',    sentAt: '2026-02-25T09:00:00Z', errorMessage: null,                retryCount: 0 },
  { id: '40', type: 'SUBSCRIPTION_ACTIVATED', email: 'oluwaseun.ab@example.com',    userName: 'Oluwaseun Abiodun', status: 'SENT',    sentAt: '2026-02-24T14:00:00Z', errorMessage: null,                retryCount: 0 },
]

export const churnData = [
  { month: 'Oct', churned: 2, revenue: 58  },
  { month: 'Nov', churned: 5, revenue: 145 },
  { month: 'Dec', churned: 1, revenue: 29  },
  { month: 'Jan', churned: 6, revenue: 174 },
  { month: 'Feb', churned: 3, revenue: 87  },
  { month: 'Mar', churned: 7, revenue: 203 },
  { month: 'Apr', churned: 2, revenue: 58  },
  { month: 'May', churned: 4, revenue: 116 },
  { month: 'Jun', churned: 8, revenue: 232 },
  { month: 'Jul', churned: 3, revenue: 87  },
  { month: 'Aug', churned: 5, revenue: 145 },
  { month: 'Sep', churned: 2, revenue: 58  },
]

export const auditLogs = [
  { id: '1',  action: 'USER_PLAN_CHANGED',    actor: 'Super Admin', target: 'Aoife Murphy',      detail: 'Plan changed from Standard to Pro',           timestamp: '2026-03-16T10:14:00Z', severity: 'INFO'    },
  { id: '2',  action: 'USER_SUSPENDED',        actor: 'Super Admin', target: 'Seamus Connolly',   detail: 'Account suspended - 3 failed payments',       timestamp: '2026-03-15T14:22:00Z', severity: 'WARNING' },
  { id: '3',  action: 'CONTENT_PUBLISHED',     actor: 'Super Admin', target: 'Criminal Law M3',   detail: 'Module 3 lesson published',                   timestamp: '2026-03-15T11:00:00Z', severity: 'INFO'    },
  { id: '4',  action: 'SUBSCRIPTION_REFUNDED', actor: 'Super Admin', target: 'Padraig Hennigan',  detail: 'Refund issued EUR29 - payment dispute',       timestamp: '2026-03-14T09:30:00Z', severity: 'WARNING' },
  { id: '5',  action: 'QUESTION_BULK_IMPORT',  actor: 'Super Admin', target: 'Contract Law',      detail: '40 MCQ questions imported via CSV',           timestamp: '2026-03-13T16:00:00Z', severity: 'INFO'    },
  { id: '6',  action: 'AI_THRESHOLD_ALERT',    actor: 'System',      target: 'AI Monitor',        detail: 'AI budget reached 62% threshold',             timestamp: '2026-03-12T08:00:00Z', severity: 'WARNING' },
  { id: '7',  action: 'ADMIN_LOGIN',           actor: 'Super Admin', target: 'System',            detail: 'Admin login from IP 105.113.64.100',          timestamp: '2026-03-11T07:45:00Z', severity: 'INFO'    },
  { id: '8',  action: 'COUPON_CREATED',        actor: 'Super Admin', target: 'STUDENT25',         detail: 'Coupon created: 25% off for 3 months',        timestamp: '2026-03-10T13:20:00Z', severity: 'INFO'    },
  { id: '9',  action: 'USER_DELETED',          actor: 'Super Admin', target: 'Roisin Gallagher',  detail: 'Account permanently deleted on user request', timestamp: '2026-03-09T17:00:00Z', severity: 'DANGER'  },
  { id: '10', action: 'EXAM_DATE_UPDATED',     actor: 'Super Admin', target: 'Platform Settings', detail: 'October 2026 exam date updated to Oct 1',     timestamp: '2026-03-08T11:10:00Z', severity: 'INFO'    },
  { id: '11', action: 'WEBHOOK_FAILED',        actor: 'System',      target: 'Stripe',            detail: 'Stripe webhook failed 3 times - invoice_paid',timestamp: '2026-03-07T20:33:00Z', severity: 'DANGER'  },
  { id: '12', action: 'FEATURE_FLAG_TOGGLED',  actor: 'Super Admin', target: 'Essay Grading',     detail: 'Essay grading temporarily disabled',          timestamp: '2026-03-06T09:00:00Z', severity: 'WARNING' },
  { id: '13', action: 'USER_PLAN_CHANGED',    actor: 'Super Admin', target: 'Tunde Adeyemi',     detail: 'Upgraded from Standard to Pro',                timestamp: '2026-03-05T10:00:00Z', severity: 'INFO'    },
  { id: '14', action: 'PASSWORD_RESET',        actor: 'System',      target: 'Grainne Fitzgerald', detail: 'Password reset email sent',                  timestamp: '2026-03-04T15:30:00Z', severity: 'INFO'    },
  { id: '15', action: 'WEBHOOK_RECEIVED',      actor: 'Stripe',      target: 'Payment System',   detail: 'invoice.payment_succeeded - EUR49.00',          timestamp: '2026-03-03T09:14:00Z', severity: 'INFO'    },
  { id: '16', action: 'CONTENT_UNPUBLISHED',   actor: 'Super Admin', target: 'Tort Law M2',      detail: 'Module temporarily unpublished for review',   timestamp: '2026-03-02T11:45:00Z', severity: 'WARNING' },
  { id: '17', action: 'BULK_EMAIL_SENT',       actor: 'System',      target: '247 Users',         detail: 'Weekly progress email batch completed',       timestamp: '2026-03-01T09:00:00Z', severity: 'INFO'    },
  { id: '18', action: 'FAILED_LOGIN_ATTEMPT',  actor: 'Unknown',     target: 'Admin Panel',       detail: 'Failed login attempt from IP 41.58.100.22',  timestamp: '2026-02-28T23:18:00Z', severity: 'DANGER'  },
  { id: '19', action: 'SUBSCRIPTION_PAUSED',   actor: 'Super Admin', target: 'Olumide Adebayo',  detail: 'Subscription paused - user request',          timestamp: '2026-02-27T14:00:00Z', severity: 'WARNING' },
  { id: '20', action: 'MCQ_QUESTION_DELETED',  actor: 'Super Admin', target: 'Criminal Law Q47', detail: 'MCQ deleted - duplicate detected',            timestamp: '2026-02-26T10:30:00Z', severity: 'INFO'    },
  { id: '21', action: 'AI_COST_THRESHOLD',     actor: 'System',      target: 'AI Monitor',       detail: 'AI spend reached 75% of monthly budget',      timestamp: '2026-02-25T08:00:00Z', severity: 'DANGER'  },
  { id: '22', action: 'COUPON_REDEEMED',       actor: 'System',      target: 'Caoimhe Doran',    detail: 'Coupon STUDENT25 redeemed - 25% off',         timestamp: '2026-02-24T16:20:00Z', severity: 'INFO'    },
  { id: '23', action: 'ESSAY_GRADING_RESUMED', actor: 'Super Admin', target: 'Essay Grading',    detail: 'AI essay grading re-enabled after maintenance', timestamp: '2026-02-23T09:05:00Z', severity: 'INFO'  },
  { id: '24', action: 'USER_VERIFIED',         actor: 'System',      target: 'Biodun Afolabi',   detail: 'Email address verified successfully',          timestamp: '2026-02-22T11:00:00Z', severity: 'INFO'    },
  { id: '25', action: 'STRIPE_DISPUTE_OPENED', actor: 'Stripe',      target: 'Padraig Hennigan', detail: 'Chargeback dispute opened - EUR29.00',          timestamp: '2026-02-21T14:50:00Z', severity: 'DANGER'  },
  { id: '26', action: 'PODCAST_PUBLISHED',     actor: 'Super Admin', target: 'Criminal Law EP4', detail: 'New podcast episode published - 28 minutes',  timestamp: '2026-02-20T10:00:00Z', severity: 'INFO'    },
  { id: '27', action: 'ADMIN_SETTINGS_SAVED',  actor: 'Super Admin', target: 'Platform Settings', detail: 'Feature flags updated - show progress bar',  timestamp: '2026-02-19T09:30:00Z', severity: 'INFO'    },
  { id: '28', action: 'CRON_JOB_FAILED',       actor: 'System',      target: 'Streak Alert Cron', detail: 'streak-alert.cron failed - SMTP connection timeout', timestamp: '2026-02-18T20:05:00Z', severity: 'DANGER' },
  { id: '29', action: 'CASE_LAW_ADDED',        actor: 'Super Admin', target: 'Case Law Library', detail: '12 new case law entries added to library',    timestamp: '2026-02-17T13:00:00Z', severity: 'INFO'    },
  { id: '30', action: 'USER_REACTIVATED',      actor: 'Super Admin', target: 'Seamus Connolly',  detail: 'Account reactivated - payment method updated', timestamp: '2026-02-16T10:20:00Z', severity: 'INFO'  },
]

export const deletedUsers = [
  {
    id: 'd1', originalUserId: 'del_001', email: 'conor.lynch@example.com', fullName: 'Conor Lynch',
    accountCreatedAt: '2025-08-10T09:00:00Z', accountDeletedAt: '2026-01-15T14:00:00Z', daysActive: 158,
    subjectsStarted: 5, subjectsCompleted: 2, subjectsNeverOpened: 3, modulesCompleted: 8,
    lessonsCompleted: 34, totalStudyTimeSeconds: 187200, totalQuizzesTaken: 42, totalMCQsAttempted: 280,
    averageQuizScore: 68, highestQuizScore: 91, lowestQuizScore: 34,
    hadSubscription: true, subscriptionPlan: 'STANDARD_MONTHLY', totalRevenue: 87,
    deletionReason: 'Too expensive', feedback: 'Great content but pricing is high for students',
  },
  {
    id: 'd2', originalUserId: 'del_002', email: 'sarah.kenny@example.com', fullName: 'Sarah Kenny',
    accountCreatedAt: '2025-09-22T11:00:00Z', accountDeletedAt: '2026-02-08T16:00:00Z', daysActive: 139,
    subjectsStarted: 3, subjectsCompleted: 1, subjectsNeverOpened: 5, modulesCompleted: 4,
    lessonsCompleted: 18, totalStudyTimeSeconds: 93600, totalQuizzesTaken: 19, totalMCQsAttempted: 140,
    averageQuizScore: 72, highestQuizScore: 88, lowestQuizScore: 45,
    hadSubscription: true, subscriptionPlan: 'PRO_MONTHLY', totalRevenue: 147,
    deletionReason: 'Passed exam', feedback: 'Passed FE-1 in October - no longer need the platform',
  },
  {
    id: 'd3', originalUserId: 'del_003', email: 'mark.brennan@example.com', fullName: 'Mark Brennan',
    accountCreatedAt: '2025-10-05T08:00:00Z', accountDeletedAt: '2026-02-20T10:00:00Z', daysActive: 138,
    subjectsStarted: 2, subjectsCompleted: 0, subjectsNeverOpened: 6, modulesCompleted: 2,
    lessonsCompleted: 9, totalStudyTimeSeconds: 32400, totalQuizzesTaken: 8, totalMCQsAttempted: 60,
    averageQuizScore: 54, highestQuizScore: 72, lowestQuizScore: 28,
    hadSubscription: false, subscriptionPlan: null, totalRevenue: 0,
    deletionReason: 'Not what I expected', feedback: 'Expected more video content',
  },
  {
    id: 'd4', originalUserId: 'del_004', email: 'aoife.thornton@example.com', fullName: 'Aoife Thornton',
    accountCreatedAt: '2025-07-14T10:00:00Z', accountDeletedAt: '2026-01-30T12:00:00Z', daysActive: 200,
    subjectsStarted: 7, subjectsCompleted: 5, subjectsNeverOpened: 1, modulesCompleted: 22,
    lessonsCompleted: 87, totalStudyTimeSeconds: 432000, totalQuizzesTaken: 94, totalMCQsAttempted: 620,
    averageQuizScore: 81, highestQuizScore: 97, lowestQuizScore: 52,
    hadSubscription: true, subscriptionPlan: 'STANDARD_ANNUAL', totalRevenue: 249,
    deletionReason: 'Passed exam', feedback: 'Excellent platform - helped me pass first time!',
  },
  {
    id: 'd5', originalUserId: 'del_005', email: 'liam.walsh@example.com', fullName: 'Liam Walsh',
    accountCreatedAt: '2025-11-01T09:00:00Z', accountDeletedAt: '2026-03-01T15:00:00Z', daysActive: 120,
    subjectsStarted: 4, subjectsCompleted: 1, subjectsNeverOpened: 4, modulesCompleted: 5,
    lessonsCompleted: 22, totalStudyTimeSeconds: 115200, totalQuizzesTaken: 28, totalMCQsAttempted: 190,
    averageQuizScore: 63, highestQuizScore: 84, lowestQuizScore: 31,
    hadSubscription: true, subscriptionPlan: 'STANDARD_MONTHLY', totalRevenue: 58,
    deletionReason: 'Financial reasons', feedback: null,
  },
  {
    id: 'd6', originalUserId: 'del_006', email: 'niamh.kelly@example.com', fullName: 'Niamh Kelly',
    accountCreatedAt: '2025-12-10T10:00:00Z', accountDeletedAt: '2026-03-10T09:00:00Z', daysActive: 90,
    subjectsStarted: 3, subjectsCompleted: 0, subjectsNeverOpened: 5, modulesCompleted: 3,
    lessonsCompleted: 14, totalStudyTimeSeconds: 57600, totalQuizzesTaken: 12, totalMCQsAttempted: 80,
    averageQuizScore: 58, highestQuizScore: 76, lowestQuizScore: 22,
    hadSubscription: false, subscriptionPlan: null, totalRevenue: 0,
    deletionReason: 'Found alternative', feedback: 'Using law school notes instead',
  },
]

export const userPaymentHistory: Record<string, Array<{id: string, date: string, amount: number, currency: string, plan: string, status: string, method: string}>> = {
  '1': [
    { id: 'p1', date: '2026-03-16T10:00:00Z', amount: 49, currency: 'EUR', plan: 'Pro Monthly', status: 'SUCCESS', method: 'Visa •••• 4242' },
    { id: 'p2', date: '2026-02-16T10:00:00Z', amount: 49, currency: 'EUR', plan: 'Pro Monthly', status: 'SUCCESS', method: 'Visa •••• 4242' },
    { id: 'p3', date: '2026-01-16T10:00:00Z', amount: 49, currency: 'EUR', plan: 'Pro Monthly', status: 'SUCCESS', method: 'Visa •••• 4242' },
  ],
  '2': [
    { id: 'p4', date: '2026-03-02T11:00:00Z', amount: 29, currency: 'EUR', plan: 'Standard Monthly', status: 'SUCCESS', method: 'Mastercard •••• 8888' },
    { id: 'p5', date: '2026-02-02T11:00:00Z', amount: 29, currency: 'EUR', plan: 'Standard Monthly', status: 'FAILED', method: 'Mastercard •••• 8888' },
    { id: 'p6', date: '2026-02-05T11:00:00Z', amount: 29, currency: 'EUR', plan: 'Standard Monthly', status: 'SUCCESS', method: 'Mastercard •••• 8888' },
  ],
  '6': [
    { id: 'p7', date: '2025-08-22T10:00:00Z', amount: 399, currency: 'EUR', plan: 'Pro Annual', status: 'SUCCESS', method: 'Visa •••• 1234' },
  ],
}

export const userAuditTrail: Record<string, Array<{id: string, action: string, detail: string, timestamp: string, actor: string}>> = {
  '1': [
    { id: 'ua1', action: 'PLAN_UPGRADED', detail: 'Plan changed from Standard to Pro', timestamp: '2026-01-16T10:00:00Z', actor: 'System' },
    { id: 'ua2', action: 'EMAIL_SENT', detail: 'Subscription activated email sent', timestamp: '2026-01-16T10:01:00Z', actor: 'System' },
    { id: 'ua3', action: 'LOGIN', detail: 'Login from IP 105.113.64.100', timestamp: '2026-03-16T08:22:00Z', actor: 'User' },
  ],
  '4': [
    { id: 'ua4', action: 'ACCOUNT_CREATED', detail: 'Account registered via email', timestamp: '2026-03-10T14:00:00Z', actor: 'User' },
    { id: 'ua5', action: 'EMAIL_VERIFIED', detail: 'Email address verified', timestamp: '2026-03-10T14:05:00Z', actor: 'User' },
    { id: 'ua6', action: 'TRIAL_STARTED', detail: '7-day trial activated', timestamp: '2026-03-10T14:06:00Z', actor: 'System' },
  ],
}

export const subjects = [
  { id: 's1', name: 'Criminal Law',      slug: 'criminal-law',      color: '#E6027D', progressColor: '#E6027D', order: 1, isPublished: true,  description: 'Core principles of criminal liability, offences against the person and property.', moduleCount: 5, lessonCount: 24, mcqCount: 180, createdAt: '2025-06-01T00:00:00Z' },
  { id: 's2', name: 'Contract Law',      slug: 'contract-law',      color: '#FDC300', progressColor: '#FDC300', order: 2, isPublished: true,  description: 'Formation, terms, breach and remedies in contract law.', moduleCount: 4, lessonCount: 18, mcqCount: 140, createdAt: '2025-06-01T00:00:00Z' },
  { id: 's3', name: 'Tort Law',          slug: 'tort-law',          color: '#B38513', progressColor: '#B38513', order: 3, isPublished: true,  description: 'Negligence, occupiers liability and defamation.', moduleCount: 3, lessonCount: 14, mcqCount: 100, createdAt: '2025-06-01T00:00:00Z' },
  { id: 's4', name: 'Constitutional Law',slug: 'constitutional-law', color: '#961C81', progressColor: '#961C81', order: 4, isPublished: true,  description: 'Irish constitutional framework and fundamental rights.', moduleCount: 3, lessonCount: 12, mcqCount: 80,  createdAt: '2025-06-01T00:00:00Z' },
  { id: 's5', name: 'EU Law',            slug: 'eu-law',            color: '#009DDD', progressColor: '#009DDD', order: 5, isPublished: true,  description: 'Institutions, treaties and direct effect of EU law.', moduleCount: 2, lessonCount: 10, mcqCount: 60,  createdAt: '2025-06-01T00:00:00Z' },
  { id: 's6', name: 'Equity',            slug: 'equity',            color: '#63C0F2', progressColor: '#63C0F2', order: 6, isPublished: true,  description: 'Trusts, equitable remedies and fiduciary duties.', moduleCount: 2, lessonCount: 10, mcqCount: 80,  createdAt: '2025-06-01T00:00:00Z' },
  { id: 's7', name: 'Property Law',      slug: 'property-law',      color: '#5F3EB5', progressColor: '#5F3EB5', order: 7, isPublished: true,  description: 'Ownership, registration and interests in land.', moduleCount: 2, lessonCount: 8,  mcqCount: 60,  createdAt: '2025-06-01T00:00:00Z' },
  { id: 's8', name: 'Company Law',       slug: 'company-law',       color: '#8659FB', progressColor: '#8659FB', order: 8, isPublished: false, description: 'Incorporation, directors duties and shareholder rights.', moduleCount: 1, lessonCount: 0,  mcqCount: 0,   createdAt: '2025-09-01T00:00:00Z' },
]

export const aiMonitorData = {
  // Current month snapshot
  currentMonth: {
    tokensUsed: 2847392,
    tokensTotal: 5000000,
    costEurUsed: 187.42,
    costEurBudget: 300.00,
    burnRateDaily: 8.52,
    daysRemaining: 18,
    daysInMonth: 31,
    daysPassed: 13,
    projectedEndOfMonth: 298.64,
    budgetUtilisationPercent: 62,
    anthropicBalance: 112.58,
    lastBalanceCheck: '2026-03-18T09:00:00Z',
  },

  // Cost breakdown by feature
  byFeature: [
    { feature: 'Essay Grading',       tokens: 1420000, costEur: 93.40,  percent: 49.9, avgPerSession: 0.62, sessions: 150 },
    { feature: 'Lesson Practice MCQ', tokens: 571000,  costEur: 37.60,  percent: 20.1, avgPerSession: 0.08, sessions: 470 },
    { feature: 'Simulation Exams',    tokens: 427108,  costEur: 28.12,  percent: 15.0, avgPerSession: 0.94, sessions: 30  },
    { feature: 'AI Feedback',         tokens: 285000,  costEur: 18.77,  percent: 10.1, avgPerSession: 0.19, sessions: 99  },
    { feature: 'Progress Analysis',   tokens: 144284,  costEur: 9.53,   percent: 5.0,  avgPerSession: 0.06, sessions: 159 },
  ],

  // Cost by subject
  bySubject: [
    { subjectId: 's1', subject: 'Criminal Law',      costEur: 62.40, tokens: 946060, percent: 33.3 },
    { subjectId: 's2', subject: 'Contract Law',      costEur: 43.18, tokens: 654848, percent: 23.0 },
    { subjectId: 's3', subject: 'Tort Law',          costEur: 28.12, tokens: 426363, percent: 15.0 },
    { subjectId: 's4', subject: 'Constitutional Law',costEur: 22.49, tokens: 340909, percent: 12.0 },
    { subjectId: 's6', subject: 'Equity',            costEur: 16.87, tokens: 255681, percent: 9.0  },
    { subjectId: 's5', subject: 'EU Law',            costEur: 14.36, tokens: 217929, percent: 7.7  },
  ],

  // Top users by consumption
  topUsers: [
    { userId: '16', name: 'Chiamaka Uchenna',  email: 'chiamaka.u@example.com',  plan: 'Pro',      tokensUsed: 142800, costEur: 9.41, essayCount: 18, sessionCount: 42 },
    { userId: '6',  name: 'Tunde Adeyemi',     email: 'tunde.adeyemi@example.com', plan: 'Pro',   tokensUsed: 128700, costEur: 8.48, essayCount: 16, sessionCount: 38 },
    { userId: '30', name: 'Rotimi Adeyemi',    email: 'rotimi.ade@example.com',  plan: 'Pro',      tokensUsed: 119200, costEur: 7.85, essayCount: 15, sessionCount: 35 },
    { userId: '27', name: 'Aisling Flanagan',  email: 'aisling.flan@example.com', plan: 'Pro',    tokensUsed: 98400,  costEur: 6.48, essayCount: 12, sessionCount: 31 },
    { userId: '33', name: 'Sorcha Murphy',     email: 'sorcha.mu@example.com',   plan: 'Pro',      tokensUsed: 87600,  costEur: 5.77, essayCount: 11, sessionCount: 28 },
  ],

  // Daily burn rate - last 30 days (zigzag realistic)
  dailyBurn: [
    { date: '2026-02-17', tokens: 78420,  costEur: 5.17 },
    { date: '2026-02-18', tokens: 112340, costEur: 7.40 },
    { date: '2026-02-19', tokens: 64200,  costEur: 4.23 },
    { date: '2026-02-20', tokens: 134800, costEur: 8.88 },
    { date: '2026-02-21', tokens: 98200,  costEur: 6.47 },
    { date: '2026-02-22', tokens: 42100,  costEur: 2.78 },
    { date: '2026-02-23', tokens: 38400,  costEur: 2.53 },
    { date: '2026-02-24', tokens: 145200, costEur: 9.57 },
    { date: '2026-02-25', tokens: 118300, costEur: 7.79 },
    { date: '2026-02-26', tokens: 87400,  costEur: 5.76 },
    { date: '2026-02-27', tokens: 152400, costEur: 10.04 },
    { date: '2026-02-28', tokens: 94200,  costEur: 6.21 },
    { date: '2026-03-01', tokens: 68100,  costEur: 4.49 },
    { date: '2026-03-02', tokens: 44200,  costEur: 2.91 },
    { date: '2026-03-03', tokens: 138400, costEur: 9.12 },
    { date: '2026-03-04', tokens: 112800, costEur: 7.43 },
    { date: '2026-03-05', tokens: 78200,  costEur: 5.15 },
    { date: '2026-03-06', tokens: 168400, costEur: 11.09 },
    { date: '2026-03-07', tokens: 124200, costEur: 8.18 },
    { date: '2026-03-08', tokens: 54200,  costEur: 3.57 },
    { date: '2026-03-09', tokens: 48100,  costEur: 3.17 },
    { date: '2026-03-10', tokens: 142800, costEur: 9.41 },
    { date: '2026-03-11', tokens: 108400, costEur: 7.14 },
    { date: '2026-03-12', tokens: 92100,  costEur: 6.07 },
    { date: '2026-03-13', tokens: 178200, costEur: 11.74 },
    { date: '2026-03-14', tokens: 134100, costEur: 8.83 },
    { date: '2026-03-15', tokens: 62400,  costEur: 4.11 },
    { date: '2026-03-16', tokens: 52100,  costEur: 3.43 },
    { date: '2026-03-17', tokens: 148200, costEur: 9.76 },
    { date: '2026-03-18', tokens: 128400, costEur: 8.46 },
  ],

  // Surge warnings based on exam cohort
  surgeWarnings: [
    {
      id: 'sw1',
      severity: 'warning',
      title: 'October 2026 Exam Surge Expected',
      detail: '89 students are targeting the October 2026 sitting. Based on past patterns, usage surges 40% in the 6 weeks before the exam (mid-August onwards).',
      expectedIncrease: 40,
      expectedAdditionalCost: 74.97,
      expectedMonth: 'September 2026',
      daysUntil: 152,
    },
    {
      id: 'sw2',
      severity: 'info',
      title: 'New User Growth Trend',
      detail: 'You gained 18 new users this week. If this growth continues, AI costs will increase by approximately €67 next month.',
      expectedIncrease: 22,
      expectedAdditionalCost: 67.20,
      expectedMonth: 'April 2026',
      daysUntil: 13,
    },
    {
      id: 'sw3',
      severity: 'danger',
      title: 'Budget Threshold Approaching',
      detail: 'At current burn rate of €8.52/day you will reach your €300 budget in 13 days - before the month ends.',
      expectedIncrease: 0,
      expectedAdditionalCost: 0,
      expectedMonth: 'March 2026',
      daysUntil: 13,
    },
  ],

  // Alert settings defaults
  alertSettings: {
    emailAlerts: true,
    emailAddress: 'admin@fe1madesimple.ie',
    smsAlerts: false,
    phoneNumber: '',
    threshold50: true,
    threshold75: true,
    threshold90: true,
    customThreshold: 80,
    customThresholdEnabled: false,
    weeklyReport: true,
    dailyDigest: false,
  },
}

export const modules = [
  { id: 'm1', subjectId: 's1', name: 'Foundations of Criminal Law',    order: 1, isPublished: true,  lessonCount: 5, mcqCount: 40, description: 'Actus reus, mens rea and coincidence.' },
  { id: 'm2', subjectId: 's1', name: 'Offences Against the Person',    order: 2, isPublished: true,  lessonCount: 5, mcqCount: 40, description: 'Assault, murder, manslaughter.' },
  { id: 'm3', subjectId: 's1', name: 'Property and Economic Offences', order: 3, isPublished: true,  lessonCount: 5, mcqCount: 40, description: 'Theft, fraud, criminal damage.' },
  { id: 'm4', subjectId: 's1', name: 'Public Order & State Security',  order: 4, isPublished: true,  lessonCount: 5, mcqCount: 30, description: 'Public order offences and state security.' },
  { id: 'm5', subjectId: 's1', name: 'Inchoate & Ancillary Offences',  order: 5, isPublished: false, lessonCount: 4, mcqCount: 30, description: 'Attempts, conspiracy, aiding and abetting.' },
  { id: 'm6', subjectId: 's2', name: 'Formation of Contract',          order: 1, isPublished: true,  lessonCount: 5, mcqCount: 40, description: 'Offer, acceptance, consideration.' },
  { id: 'm7', subjectId: 's2', name: 'Terms and Conditions',           order: 2, isPublished: true,  lessonCount: 4, mcqCount: 30, description: 'Express and implied terms.' },
  { id: 'm8', subjectId: 's2', name: 'Breach and Remedies',            order: 3, isPublished: true,  lessonCount: 5, mcqCount: 40, description: 'Damages, rescission, specific performance.' },
  { id: 'm9', subjectId: 's2', name: 'Vitiating Factors',              order: 4, isPublished: true,  lessonCount: 4, mcqCount: 30, description: 'Misrepresentation, duress, undue influence.' },
  { id: 'm10',subjectId: 's3', name: 'Negligence',                     order: 1, isPublished: true,  lessonCount: 5, mcqCount: 40, description: 'Duty of care, breach, causation.' },
  { id: 'm11',subjectId: 's3', name: 'Occupiers Liability',            order: 2, isPublished: true,  lessonCount: 4, mcqCount: 30, description: 'Duty to visitors and trespassers.' },
  { id: 'm12',subjectId: 's3', name: 'Defamation',                     order: 3, isPublished: true,  lessonCount: 5, mcqCount: 30, description: 'Libel, slander and defences.' },
]

export const lessons = [
  { id: 'l1',  moduleId: 'm1', title: 'Introduction to Criminal Liability', order: 1, isPublished: true,  videoDuration: 1820, videoUrl: 'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1/sample1.mp3', avgCompletionRate: 88, totalViews: 187, createdAt: '2025-06-10T00:00:00Z', updatedAt: '2026-01-15T00:00:00Z' },
  { id: 'l2',  moduleId: 'm1', title: 'Actus Reus',                         order: 2, isPublished: true,  videoDuration: 2100, videoUrl: 'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1/sample2.mp3', avgCompletionRate: 82, totalViews: 174, createdAt: '2025-06-12T00:00:00Z', updatedAt: '2026-01-15T00:00:00Z' },
  { id: 'l3',  moduleId: 'm1', title: 'Mens Rea',                           order: 3, isPublished: true,  videoDuration: 1950, videoUrl: 'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1/sample3.mp3', avgCompletionRate: 79, totalViews: 168, createdAt: '2025-06-15T00:00:00Z', updatedAt: '2026-01-20T00:00:00Z' },
  { id: 'l4',  moduleId: 'm1', title: 'Coincidence of Actus Reus and Mens Rea', order: 4, isPublished: true, videoDuration: 1680, videoUrl: null, avgCompletionRate: 71, totalViews: 142, createdAt: '2025-06-18T00:00:00Z', updatedAt: '2026-01-22T00:00:00Z' },
  { id: 'l5',  moduleId: 'm1', title: 'Strict Liability Offences',         order: 5, isPublished: false, videoDuration: null, videoUrl: null, avgCompletionRate: 0, totalViews: 0, createdAt: '2025-07-01T00:00:00Z', updatedAt: '2025-07-01T00:00:00Z' },
  { id: 'l6',  moduleId: 'm2', title: 'Assault and Battery',               order: 1, isPublished: true,  videoDuration: 2240, videoUrl: 'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1/sample4.mp3', avgCompletionRate: 84, totalViews: 163, createdAt: '2025-06-20T00:00:00Z', updatedAt: '2026-02-01T00:00:00Z' },
  { id: 'l7',  moduleId: 'm2', title: 'Murder and Manslaughter',           order: 2, isPublished: true,  videoDuration: 2580, videoUrl: 'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1/sample5.mp3', avgCompletionRate: 90, totalViews: 201, createdAt: '2025-06-22T00:00:00Z', updatedAt: '2026-02-05T00:00:00Z' },
  { id: 'l8',  moduleId: 'm2', title: 'Non-Fatal Offences Against the Person', order: 3, isPublished: true, videoDuration: 1920, videoUrl: null, avgCompletionRate: 76, totalViews: 154, createdAt: '2025-06-25T00:00:00Z', updatedAt: '2026-02-10T00:00:00Z' },
  { id: 'l9',  moduleId: 'm6', title: 'Offer and Invitation to Treat',     order: 1, isPublished: true,  videoDuration: 1750, videoUrl: 'https://res.cloudinary.com/dkrjrfqpy/video/upload/v1/sample6.mp3', avgCompletionRate: 86, totalViews: 178, createdAt: '2025-07-05T00:00:00Z', updatedAt: '2026-02-15T00:00:00Z' },
  { id: 'l10', moduleId: 'm6', title: 'Acceptance and Communication',      order: 2, isPublished: true,  videoDuration: 1600, videoUrl: null, avgCompletionRate: 81, totalViews: 165, createdAt: '2025-07-08T00:00:00Z', updatedAt: '2026-02-20T00:00:00Z' },
]

export const mcqs = [
  { id: 'q1',  lessonId: 'l1', moduleId: 'm1', subjectId: 's1', text: 'Which element must be proven for a criminal offence?', options: ['Actus reus only', 'Mens rea only', 'Both actus reus and mens rea', 'Neither'], correctAnswer: 'Both actus reus and mens rea', difficulty: 'Easy',   totalAttempts: 187, passRate: 82, avgTimeSecs: 18, examYear: 2023 },
  { id: 'q2',  lessonId: 'l2', moduleId: 'm1', subjectId: 's1', text: 'What does actus reus refer to?',                         options: ['The guilty mind', 'The guilty act', 'The criminal intent', 'The criminal outcome'], correctAnswer: 'The guilty act', difficulty: 'Easy',   totalAttempts: 174, passRate: 91, avgTimeSecs: 14, examYear: 2023 },
  { id: 'q3',  lessonId: 'l3', moduleId: 'm1', subjectId: 's1', text: 'Recklessness as a form of mens rea requires:',           options: ['Foresight of certainty', 'Foresight of possibility', 'No foresight', 'Foresight of probability'], correctAnswer: 'Foresight of possibility', difficulty: 'Medium', totalAttempts: 168, passRate: 68, avgTimeSecs: 24, examYear: 2022 },
  { id: 'q4',  lessonId: 'l3', moduleId: 'm1', subjectId: 's1', text: 'Specific intent refers to:',                             options: ['Any criminal intention', 'An ulterior motive beyond the act', 'Intent to cause serious harm', 'Basic intention'], correctAnswer: 'An ulterior motive beyond the act', difficulty: 'Hard',   totalAttempts: 168, passRate: 54, avgTimeSecs: 32, examYear: 2024 },
  { id: 'q5',  lessonId: 'l6', moduleId: 'm2', subjectId: 's1', text: 'Assault requires:',                                       options: ['Physical contact', 'Apprehension of immediate force', 'Actual harm', 'Intent to cause grievous bodily harm'], correctAnswer: 'Apprehension of immediate force', difficulty: 'Medium', totalAttempts: 163, passRate: 74, avgTimeSecs: 21, examYear: 2023 },
  { id: 'q6',  lessonId: 'l7', moduleId: 'm2', subjectId: 's1', text: 'The mens rea for murder in Ireland is:',                  options: ['Negligence', 'Recklessness', 'Intent to kill or cause serious harm', 'Strict liability'], correctAnswer: 'Intent to kill or cause serious harm', difficulty: 'Medium', totalAttempts: 201, passRate: 79, avgTimeSecs: 19, examYear: 2024 },
  { id: 'q7',  lessonId: 'l9', moduleId: 'm6', subjectId: 's2', text: 'An invitation to treat is:',                              options: ['A binding offer', 'An invitation to make an offer', 'A counter offer', 'An acceptance'], correctAnswer: 'An invitation to make an offer', difficulty: 'Easy',   totalAttempts: 178, passRate: 88, avgTimeSecs: 16, examYear: 2023 },
  { id: 'q8',  lessonId: 'l9', moduleId: 'm6', subjectId: 's2', text: 'When is a postal acceptance effective?',                  options: ['On receipt', 'On posting', 'On reading', 'On delivery'], correctAnswer: 'On posting', difficulty: 'Medium', totalAttempts: 178, passRate: 71, avgTimeSecs: 22, examYear: 2022 },
  { id: 'q9',  lessonId: 'l10', moduleId: 'm6', subjectId: 's2', text: 'Consideration must be:',                                 options: ['Past', 'Moral', 'Sufficient but need not be adequate', 'Adequate but need not be sufficient'], correctAnswer: 'Sufficient but need not be adequate', difficulty: 'Hard',   totalAttempts: 165, passRate: 58, avgTimeSecs: 29, examYear: 2024 },
  { id: 'q10', lessonId: 'l2', moduleId: 'm1', subjectId: 's1', text: 'An omission can constitute actus reus when:',             options: ['The defendant chose not to act', 'There is a legal duty to act', 'The victim was harmed', 'The defendant was present'], correctAnswer: 'There is a legal duty to act', difficulty: 'Hard',   totalAttempts: 174, passRate: 62, avgTimeSecs: 27, examYear: 2023 },
]

export const caseBriefs = [
  { id: 'cb1', caseName: 'Donoghue v Stevenson', citation: '[1932] AC 562', year: 1932, court: 'House of Lords', jurisdiction: 'UNITED_KINGDOM', isFrequentlyTested: true, legalPrinciple: 'Established the modern law of negligence and the neighbour principle.', subjects: ['Tort Law'], topics: ['Negligence', 'Duty of Care'], savedCount: 87, createdAt: '2025-06-01T00:00:00Z' },
  { id: 'cb2', caseName: 'Byrne v Ireland', citation: '[1972] IR 241', year: 1972, court: 'Supreme Court', jurisdiction: 'IRELAND', isFrequentlyTested: true, legalPrinciple: 'The State is vicariously liable for the torts of its servants.', subjects: ['Constitutional Law'], topics: ['State Liability'], savedCount: 64, createdAt: '2025-06-01T00:00:00Z' },
  { id: 'cb3', caseName: 'Carlill v Carbolic Smoke Ball Co', citation: '[1893] 1 QB 256', year: 1893, court: 'Court of Appeal', jurisdiction: 'ENGLAND_AND_WALES', isFrequentlyTested: true, legalPrinciple: 'An advertisement can constitute a binding offer if sufficiently definite.', subjects: ['Contract Law'], topics: ['Offer', 'Acceptance'], savedCount: 102, createdAt: '2025-06-01T00:00:00Z' },
  { id: 'cb4', caseName: 'The People (DPP) v Murray', citation: '[1977] IR 360', year: 1977, court: 'Supreme Court', jurisdiction: 'IRELAND', isFrequentlyTested: true, legalPrinciple: 'Defined the mens rea for murder in Irish law.', subjects: ['Criminal Law'], topics: ['Murder', 'Mens Rea'], savedCount: 78, createdAt: '2025-06-01T00:00:00Z' },
  { id: 'cb5', caseName: 'Hedley Byrne v Heller', citation: '[1964] AC 465', year: 1964, court: 'House of Lords', jurisdiction: 'UNITED_KINGDOM', isFrequentlyTested: false, legalPrinciple: 'Established liability for negligent misstatement causing pure economic loss.', subjects: ['Tort Law'], topics: ['Negligence', 'Economic Loss'], savedCount: 43, createdAt: '2025-06-02T00:00:00Z' },
  { id: 'cb6', caseName: 'Van Gend en Loos v Nederlandse Administratie', citation: 'Case 26/62', year: 1963, court: 'Court of Justice EU', jurisdiction: 'EUROPEAN_UNION', isFrequentlyTested: true, legalPrinciple: 'Established the doctrine of direct effect in EU law.', subjects: ['EU Law'], topics: ['Direct Effect', 'EU Treaties'], savedCount: 91, createdAt: '2025-06-03T00:00:00Z' },
  { id: 'cb7', caseName: 'Central London Property Trust v High Trees', citation: '[1947] KB 130', year: 1947, court: 'King Bench Division', jurisdiction: 'ENGLAND_AND_WALES', isFrequentlyTested: true, legalPrinciple: 'Established promissory estoppel as an equitable doctrine.', subjects: ['Contract Law', 'Equity'], topics: ['Promissory Estoppel'], savedCount: 67, createdAt: '2025-06-04T00:00:00Z' },
  { id: 'cb8', caseName: 'McGrath v Trintech Technologies', citation: '[2004] IEHC 342', year: 2004, court: 'High Court', jurisdiction: 'IRELAND', isFrequentlyTested: false, legalPrinciple: 'Applied the neighbour principle in an employment context in Ireland.', subjects: ['Tort Law'], topics: ['Negligence', 'Employment'], savedCount: 28, createdAt: '2025-06-05T00:00:00Z' },
  { id: 'cb9', caseName: 'Costa v ENEL', citation: 'Case 6/64', year: 1964, court: 'Court of Justice EU', jurisdiction: '�OPEAN_UNION', isFrequentlyTested: true, legalPrinciple: 'Established the supremacy of EU law over national law.', subjects: ['EU Law'], topics: ['Supremacy', 'EU Law'], savedCount: 85, createdAt: '2025-06-06T00:00:00Z' },
  { id: 'cb10', caseName: 'Rookes v Barnard', citation: '[1964] AC 1129', year: 1964, court: 'House of Lords', jurisdiction: 'UNITED_KINGDOM', isFrequentlyTested: false, legalPrinciple: 'Defined the categories for exemplary damages in tort.', subjects: ['Tort Law'], topics: ['Damages', 'Exemplary Damages'], savedCount: 22, createdAt: '2025-06-07T00:00:00Z' },
]

export const contentStats = {
  totalSubjects: 8,
  publishedSubjects: 7,
  totalModules: 26,
  totalLessons: 96,
  publishedLessons: 88,
  totalMCQs: 580,
  totalCaseBriefs: 287,
  frequentlyTestedCases: 142,
  totalVideoContent: 47,
  estimatedStorageGB: 12.4,
  totalVideoSeconds: 187400,
  avgLessonCompletionRate: 78,
  avgMCQPassRate: 71,
  mostAttemptedLesson: 'Murder and Manslaughter',
  hardestMCQ: 'Specific intent refers to:',
}

export const funnelData = {
  totalSignupsThisMonth: 47,
  trialToPaidRate: 34,
  signupToOnboardedRate: 71,
  onboardedToFirstLessonRate: 82,
  avgDaysToFirstPayment: 6.4,
  revenueFromConversionsThisMonth: 1247,

  stages: [
    { stage: 'Registered',           count: 247, percent: 100, dropOff: 0,   color: '#3B82F6' },
    { stage: 'Email Verified',        count: 198, percent: 80,  dropOff: 49,  color: '#8B5CF6' },
    { stage: 'Onboarding Complete',   count: 141, percent: 71,  dropOff: 57,  color: '#06B6D4' },
    { stage: 'Started First Lesson',  count: 116, percent: 82,  dropOff: 25,  color: '#10B981' },
    { stage: 'Trial / Subscribed',    count: 89,  percent: 77,  dropOff: 27,  color: '#F59E0B' },
    { stage: 'Converted to Paid',     count: 187, percent: 34,  dropOff: 0,   color: '#EF4444' },
  ],

  stuckUsers: [
    { id: 'su1', name: 'Liam Gallagher',   email: 'liam.gal@example.com',   stage: 'Email Verified',       daysSinceSignup: 14, plan: 'Free' },
    { id: 'su2', name: 'Aoife Brennan',    email: 'aoife.bren@example.com', stage: 'Email Verified',       daysSinceSignup: 9,  plan: 'Free' },
    { id: 'su3', name: 'Emeka Chukwu',     email: 'emeka.chu@example.com',  stage: 'Onboarding Complete',  daysSinceSignup: 7,  plan: 'Free' },
    { id: 'su4', name: 'Sinead Moriarty',  email: 'sinead.mo@example.com',  stage: 'Onboarding Complete',  daysSinceSignup: 11, plan: 'Free' },
    { id: 'su5', name: 'Tola Adewale',     email: 'tola.ade@example.com',   stage: 'Started First Lesson', daysSinceSignup: 5,  plan: 'Trial' },
    { id: 'su6', name: 'Ciara Dunne',      email: 'ciara.dun@example.com',  stage: 'Started First Lesson', daysSinceSignup: 8,  plan: 'Trial' },
    { id: 'su7', name: 'Femi Adeyinka',    email: 'femi.ade@example.com',   stage: 'Trial / Subscribed',   daysSinceSignup: 6,  plan: 'Trial' },
    { id: 'su8', name: 'Grainne Lawlor',   email: 'grainne.law@example.com', stage: 'Trial / Subscribed',  daysSinceSignup: 4,  plan: 'Trial' },
  ],

  nudgeCampaigns: [
    { id: 'nc1', stage: 'Email Verified',       label: 'Send verification reminder',    count: 49,  severity: 'warning' },
    { id: 'nc2', stage: 'Onboarding Complete',  label: 'Send first lesson nudge',        count: 57,  severity: 'info'    },
    { id: 'nc3', stage: 'Started First Lesson', label: 'Send trial activation offer',   count: 27,  severity: 'warning' },
    { id: 'nc4', stage: 'Trial / Subscribed',   label: 'Send conversion urgency email', count: 22,  severity: 'danger'  },
  ],
}

export const examCalendarData = {
  upcomingExams: [
    {
      id: 'ex1',
      name: 'FE-1 March 2026',
      date: '2026-03-27T09:00:00Z',
      studentsTargeting: 34,
      campaignActive: true,
      color: '#3B82F6',
    },
    {
      id: 'ex2',
      name: 'FE-1 October 2026',
      date: '2026-10-16T09:00:00Z',
      studentsTargeting: 89,
      campaignActive: true,
      color: '#10B981',
    },
    {
      id: 'ex3',
      name: 'FE-1 March 2027',
      date: '2027-03-26T09:00:00Z',
      studentsTargeting: 12,
      campaignActive: false,
      color: '#8B5CF6',
    },
  ],

  cohortStudents: [
    { id: 'cs1',  name: 'Tunde Adeyemi',    email: 'tunde.adeyemi@example.com', examId: 'ex2', plan: 'Pro',      progressPercent: 62, streak: 14, daysUntilExam: 211 },
    { id: 'cs2',  name: 'Aoife Murphy',     email: 'aoife.murphy@example.com',  examId: 'ex2', plan: 'Pro',      progressPercent: 48, streak: 7,  daysUntilExam: 211 },
    { id: 'cs3',  name: 'Chiamaka Uchenna', email: 'chiamaka.u@example.com',    examId: 'ex2', plan: 'Pro',      progressPercent: 71, streak: 22, daysUntilExam: 211 },
    { id: 'cs4',  name: 'Niamh O Brien',    email: 'niamh.obrien@example.com',  examId: 'ex2', plan: 'Standard', progressPercent: 34, streak: 0,  daysUntilExam: 211 },
    { id: 'cs5',  name: 'Emeka Okafor',     email: 'emeka.okafor@example.com',  examId: 'ex2', plan: 'Standard', progressPercent: 29, streak: 3,  daysUntilExam: 211 },
    { id: 'cs6',  name: 'Grainne Fitzgerald',email: 'grainne.fitz@example.com', examId: 'ex1', plan: 'Pro',      progressPercent: 81, streak: 30, daysUntilExam: 8   },
    { id: 'cs7',  name: 'Cormac Burke',     email: 'cormac.burke@example.com',  examId: 'ex1', plan: 'Pro',      progressPercent: 76, streak: 18, daysUntilExam: 8   },
    { id: 'cs8',  name: 'Sorcha Murphy',    email: 'sorcha.mu@example.com',     examId: 'ex1', plan: 'Standard', progressPercent: 54, streak: 9,  daysUntilExam: 8   },
  ],

  campaignTimeline: [
    { trigger: '90 days before', label: 'Study Plan Email',     description: 'Personalised 90-day study plan sent to each student targeting this sitting', fired: true,  color: '#3B82F6' },
    { trigger: '60 days before', label: 'Progress Check-In',    description: 'Email showing student how far they are and what subjects need more attention', fired: true,  color: '#8B5CF6' },
    { trigger: '30 days before', label: 'Intensive Push Email', description: 'High-urgency email encouraging daily study sessions and streak maintenance', fired: false, color: '#F59E0B' },
    { trigger: '14 days before', label: 'MCQ Blitz Campaign',   description: 'Targeted push to complete all MCQs in weak subjects before the exam', fired: false, color: '#EF4444' },
    { trigger: '7 days before',  label: 'Final Countdown',      description: 'Countdown email with last-minute tips and revision checklist', fired: false, color: '#EC4899' },
    { trigger: 'Exam Day',       label: 'Good Luck Email',      description: 'Motivational exam day email sent at 7am on the morning of the sitting', fired: false, color: '#10B981' },
  ],
}

export const essayMonitorData = {
  stats: {
    totalSubmissions: 487,
    gradedByAI: 471,
    flaggedForReview: 14,
    avgScore: 62,
    avgGradingTimeSeconds: 18,
    passRate: 68,
    highScores: 43,
    lowScores: 89,
  },
  gradeDistribution: [
    { band: 'A (80-100)', count: 43,  color: '#10B981' },
    { band: 'B (65-79)',  count: 118, color: '#3B82F6' },
    { band: 'C (50-64)',  count: 187, color: '#F59E0B' },
    { band: 'D (35-49)',  count: 89,  color: '#EF4444' },
    { band: 'F (0-34)',   count: 50,  color: '#6B7280' },
  ],
  recentEssays: [
    { id: 'es1',  userName: 'Chiamaka Uchenna',  email: 'chiamaka.u@example.com',  subject: 'Criminal Law',      question: 'Discuss the mens rea requirements for murder in Irish law.', score: 74, band: 'B', wordCount: 842, gradedAt: '2026-03-18T14:22:00Z', flagged: false, aiScore: 74, timeTaken: 16 },
    { id: 'es2',  userName: 'Tunde Adeyemi',      email: 'tunde.adeyemi@example.com', subject: 'Contract Law',   question: 'Explain the postal rule and its exceptions.', score: 81, band: 'A', wordCount: 920, gradedAt: '2026-03-18T13:10:00Z', flagged: false, aiScore: 81, timeTaken: 14 },
    { id: 'es3',  userName: 'Niamh O Brien',      email: 'niamh.obrien@example.com', subject: 'Tort Law',        question: 'Outline the neighbour principle from Donoghue v Stevenson.', score: 48, band: 'D', wordCount: 410, gradedAt: '2026-03-18T11:44:00Z', flagged: true,  aiScore: 48, timeTaken: 22 },
    { id: 'es4',  userName: 'Cormac Burke',       email: 'cormac.burke@example.com', subject: 'EU Law',          question: 'Explain the doctrine of direct effect established in Van Gend en Loos.', score: 67, band: 'C', wordCount: 788, gradedAt: '2026-03-17T16:30:00Z', flagged: false, aiScore: 67, timeTaken: 19 },
    { id: 'es5',  userName: 'Aoife Murphy',       email: 'aoife.murphy@example.com', subject: 'Constitutional Law', question: 'Analyse the right to fair procedures under Article 40.', score: 88, band: 'A', wordCount: 1040, gradedAt: '2026-03-17T15:00:00Z', flagged: false, aiScore: 88, timeTaken: 12 },
    { id: 'es6',  userName: 'Diarmuid Healy',     email: 'diarmuid.healy@example.com', subject: 'Criminal Law', question: 'Discuss the defence of intoxication in Irish criminal law.', score: 31, band: 'F', wordCount: 280, gradedAt: '2026-03-17T10:22:00Z', flagged: true,  aiScore: 31, timeTaken: 28 },
    { id: 'es7',  userName: 'Grainne Fitzgerald', email: 'grainne.fitz@example.com', subject: 'Equity',          question: 'Explain the maxims of equity and their application.', score: 71, band: 'B', wordCount: 876, gradedAt: '2026-03-16T14:10:00Z', flagged: false, aiScore: 71, timeTaken: 15 },
    { id: 'es8',  userName: 'Emeka Okafor',       email: 'emeka.okafor@example.com', subject: 'Property Law',    question: 'Discuss adverse possession under Irish land law.', score: 55, band: 'C', wordCount: 620, gradedAt: '2026-03-16T11:30:00Z', flagged: false, aiScore: 55, timeTaken: 20 },
  ],
}

export const contentPerformanceData = {
  stats: {
    avgCompletionRate: 78,
    avgMCQPassRate: 71,
    totalVideoWatchHours: 1847,
    mostEngagedSubject: 'Criminal Law',
    leastEngagedSubject: 'Company Law',
    highDropOffLesson: 'Strict Liability Offences',
    avgTimePerLesson: 24,
  },
  subjectEngagement: [
    { subject: 'Criminal Law',      color: '#E6027D', completionRate: 84, mcqPassRate: 76, avgTimeMin: 28, totalStudents: 187, dropOffRate: 12 },
    { subject: 'Contract Law',      color: '#FDC300', completionRate: 79, mcqPassRate: 72, avgTimeMin: 24, totalStudents: 162, dropOffRate: 16 },
    { subject: 'Tort Law',          color: '#B38513', completionRate: 74, mcqPassRate: 68, avgTimeMin: 22, totalStudents: 148, dropOffRate: 21 },
    { subject: 'Constitutional Law',color: '#961C81', completionRate: 71, mcqPassRate: 64, avgTimeMin: 20, totalStudents: 134, dropOffRate: 24 },
    { subject: 'EU Law',            color: '#009DDD', completionRate: 68, mcqPassRate: 61, avgTimeMin: 18, totalStudents: 118, dropOffRate: 28 },
    { subject: 'Equity',            color: '#63C0F2', completionRate: 66, mcqPassRate: 59, avgTimeMin: 17, totalStudents: 104, dropOffRate: 31 },
    { subject: 'Property Law',      color: '#5F3EB5', completionRate: 61, mcqPassRate: 55, avgTimeMin: 16, totalStudents: 89,  dropOffRate: 34 },
    { subject: 'Company Law',       color: '#8659FB', completionRate: 28, mcqPassRate: 42, avgTimeMin: 8,  totalStudents: 22,  dropOffRate: 67 },
  ],
  topLessons: [
    { title: 'Murder and Manslaughter',          subject: 'Criminal Law',   views: 201, completionRate: 90, avgWatchPercent: 88 },
    { title: 'Introduction to Criminal Liability',subject: 'Criminal Law',  views: 187, completionRate: 88, avgWatchPercent: 84 },
    { title: 'Offer and Invitation to Treat',    subject: 'Contract Law',   views: 178, completionRate: 86, avgWatchPercent: 82 },
    { title: 'Assault and Battery',              subject: 'Criminal Law',   views: 163, completionRate: 84, avgWatchPercent: 80 },
    { title: 'Acceptance and Communication',     subject: 'Contract Law',   views: 165, completionRate: 81, avgWatchPercent: 76 },
  ],
  dropOffLessons: [
    { title: 'Strict Liability Offences',        subject: 'Criminal Law',   dropOffRate: 72, avgWatchPercent: 28, views: 0   },
    { title: 'Defamation',                       subject: 'Tort Law',       dropOffRate: 64, avgWatchPercent: 36, views: 98  },
    { title: 'Non-Fatal Offences',               subject: 'Criminal Law',   dropOffRate: 58, avgWatchPercent: 42, views: 154 },
    { title: 'Vitiating Factors',                subject: 'Contract Law',   dropOffRate: 52, avgWatchPercent: 48, views: 121 },
  ],
}

export const settingsData = {
  platform: {
    platformName: 'FE-1 Made Simple',
    supportEmail: 'support@fe1madesimple.ie',
    adminEmail: 'admin@fe1madesimple.ie',
    timezone: 'Europe/Dublin',
    maintenanceMode: false,
  },
  features: {
    aiEssayGrading: true,
    aiPredictor: true,
    streakAlerts: true,
    podcastRecommendations: true,
    simulationExams: true,
    trialEnabled: true,
    trialDurationDays: 7,
  },
  stripe: {
    webhookEndpoint: 'https://api.fe1madesimple.ie/webhooks/stripe',
    standardMonthlyPriceId: 'price_standard_monthly',
    standardAnnualPriceId: 'price_standard_annual',
    proMonthlyPriceId: 'price_pro_monthly',
    proAnnualPriceId: 'price_pro_annual',
  },
  admins: [
    { id: 'adm1', name: 'Super Admin', email: 'admin@fe1madesimple.ie', role: 'Super Admin', lastLogin: '2026-03-19T09:00:00Z' },
    { id: 'adm2', name: 'Viktor Dev',  email: 'viktor@fe1madesimple.ie', role: 'Developer',  lastLogin: '2026-03-18T14:00:00Z' },
  ],
}



