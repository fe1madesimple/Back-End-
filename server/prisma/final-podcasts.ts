// prisma/seed-podcasts.ts
// Run: npx ts-node -r tsconfig-paths/register prisma/seed-podcasts.ts

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const ROOT = 'C:\\Users\\User\\Desktop\\fe-1-backend\\server';

// The two JSON files
const UPLOADED_JSON = path.join(ROOT, 'uploaded-podcasts.json');
const CLIENT_JSON = path.join(ROOT, 'prisma', 'episodes-meta.json');

const THUMBNAIL =
  'https://res.cloudinary.com/db3waebh7/image/upload/v1770073930/ideogram-v3.0_Minimalist_law_podcast_cover_Irish_legal_education_theme_single_golden_scale_ico-0_ojxvyo.png';

// ─────────────────────────────────────────────────────────────────
// CASES AND EXAM TIPS — keyed by filename (originalFile)
// Title and concepts come from client JSON
// Cases and examTips come from FE-1 knowledge
// ─────────────────────────────────────────────────────────────────

const EXTRA_META: Record<string, { cases: string[]; examTip: string }> = {
  // ── BONUS ────────────────────────────────────────────────────
  'ElevenLabs_Career_Changers_From_Another_Industry_to_Solicitor.mp3': {
    cases: [],
    examTip:
      'Non-law graduates sit the same FE-1 as law graduates. Prior industry knowledge can strengthen problem-question answers — use it.',
  },
  'ElevenLabs_Cover_Letters_for_Training_Contract_Applications_What_Works.mp3': {
    cases: [],
    examTip:
      'A cover letter is your first written advocacy exercise. Apply the same clarity and structure you would use in an FE-1 essay answer.',
  },
  'ElevenLabs_Getting_a_Training_Contract_Outside_Dublin_Real_Stories.mp3': {
    cases: [],
    examTip:
      'Regional firms often cover more subjects in training — useful for candidates who want breadth across all eight FE-1 subjects.',
  },
  'ElevenLabs_How_I_Finally_Got_My_Training_Contract_Five_Candid_Stories.mp3': {
    cases: [],
    examTip:
      'Treat each application round like an FE-1 sitting — debrief after rejection, identify weaknesses, and come back stronger.',
  },
  'ElevenLabs_How_to_Ace_a_Law_Firm_Interview.mp3': {
    cases: [],
    examTip:
      'Interviewers often ask about current legal developments. Read the Irish Times Law section and the Law Society Gazette weekly.',
  },
  'ElevenLabs_How_to_Write_a_CV_That_Law_Firms_Actually_Read.mp3': {
    cases: [],
    examTip:
      'List your FE-1 subjects and mark each as Passed, Upcoming or In Progress. Firms want clarity on your exam status.',
  },
  'ElevenLabs_In-Office_Training_What_Your_Two_Years_as_a_Trainee_Actually_Look_Like.mp3': {
    cases: [],
    examTip:
      'Understanding the training contract structure contextualises why the FE-1 subjects matter — each maps to a real practice area.',
  },
  'ElevenLabs_Internships,_Networking_and_the_Side_Door_into_Law_Firms.mp3': {
    cases: [],
    examTip:
      'Networking is a professional skill — practise it the same way you practise FE-1 problem questions: with preparation and structure.',
  },
  'ElevenLabs_Rejection,_Resilience_and_the_Training_Contract_Hunt.mp3': {
    cases: [],
    examTip:
      'Resilience is a competency Irish firms explicitly assess. Demonstrating how you handled setbacks is as important as your academic record.',
  },
  'ElevenLabs_Smaller_Firms,_General_Practice,_and_Why_They_Might_Be_the_Better_Choice.mp3': {
    cases: [],
    examTip:
      'All eight FE-1 subjects are relevant in general practice — candidates heading to smaller firms should prioritise breadth over depth.',
  },
  'ElevenLabs_Studying_the_FE-1_While_Working_Full_Time.mp3': {
    cases: [],
    examTip:
      'Working candidates should book leave for the two weeks before each sitting. The FE-1 rewards sustained preparation, not last-minute revision.',
  },
  'ElevenLabs_The_International_Route_to_Irish_Law.mp3': {
    cases: [],
    examTip:
      'Check Law Society exemption guidelines before registering for the FE-1 — you may not need to sit all eight subjects if you qualified abroad.',
  },
  "ElevenLabs_The_Mature_Student's_Route_into_Law.mp3": {
    cases: [],
    examTip:
      'Mature candidates should lean into their professional background in FE-1 answers — real-world examples strengthen legal analysis.',
  },
  'ElevenLabs_The_Milk_Round_How_to_Handle_Big_Firm_Applications.mp3': {
    cases: [],
    examTip:
      'Large firm interviews often include a current affairs question about Irish or EU commercial law — your FE-1 knowledge is directly relevant.',
  },
  'ElevenLabs_The_Non-Law_Graduate_Who_Made_It_to_the_Law_Society.mp3': {
    cases: [],
    examTip:
      'Non-law graduates should start with Constitutional Law and Contract Law — both are accessible and build confidence for the other subjects.',
  },
  'ElevenLabs_The_PPC_Explained_What_Happens_After_You_Pass_the_FE-1.mp3': {
    cases: [],
    examTip:
      'Passing all eight FE-1 subjects is the gateway to the PPC. There is no shortcut — all eight must be passed before you can proceed.',
  },
  'ElevenLabs_What_is_the_FE-1_Everything_You_Need_to_Know.mp3': {
    cases: [],
    examTip:
      'You can sit multiple subjects per sitting. Most candidates sit two to three subjects at a time to manage preparation effectively.',
  },
  'ElevenLabs_Your_5-Step_Roadmap_to_Becoming_a_Solicitor_in_Ireland.mp3': {
    cases: [],
    examTip:
      'The FE-1 is Step 1 and the only step you fully control right now. Focus here before worrying about the training contract market.',
  },

  // ── COMPANY LAW ──────────────────────────────────────────────
  'Module_10_Lesson_10_1.m4a': {
    // Types of Resolutions (Company Law)
    cases: [
      'Bushell v Faith [1970] — weighted voting rights on resolutions',
      'Pender v Lushington (1877) — member right to have vote counted',
    ],
    examTip:
      'Always identify the resolution type needed before analysing a Company Law scenario. Getting the threshold wrong is a common FE-1 mistake.',
  },
  'Module_10_Lesson_10_2.m4a': {
    // General Meetings (Company Law)
    cases: ['Browne v La Trinidad (1887) — injunction refused where meeting irregularly convened'],
    examTip:
      'FE-1 questions often give a scenario with a flawed notice period or quorum. Always check notice, quorum and voting rights before advising.',
  },
  'Module_10_Lesson_10_3.m4a': {
    // Director Meetings (Company Law) - also Trespass Emotional Distress (Tort)
    cases: ['Re Fireproof Doors Ltd [1916] — informal acts of directors and ratification'],
    examTip:
      'Board governance questions often combine with director duties questions — a procedurally flawed board decision can also be a breach of fiduciary duty.',
  },
  'Module_11_Lesson_11_1.m4a': {
    // Examinership (Company Law) - also Trespass to Land (Tort)
    cases: [
      'Re Atlantic Magnetics Ltd [1993] — reasonable prospect of survival test',
      'Re Missford Ltd [2010] — Irish High Court on examinership and creditor rights',
    ],
    examTip:
      'Always distinguish examinership (rescue) from liquidation (winding up) and receivership (creditor enforcement). FE-1 questions often require you to advise which procedure applies.',
  },
  'Module_11_Lesson_11_2.m4a': {
    // Receivership (Company Law) - also Private Nuisance (Tort)
    cases: [
      'Medforth v Blake [1999] — receiver duty to obtain best price',
      'Re Bula Ltd [1990] — Irish case on receiver appointment and floating charges',
    ],
    examTip:
      'The receiver does not terminate contracts of employment automatically — this distinguishes receivership from liquidation which does.',
  },
  'Module_11_Lesson_11_3.m4a': {
    // Liquidation (Company Law) - also Public Nuisance (Tort)
    cases: [
      'Re Vehicle Buildings and Insulations Ltd [1986] — Irish case on winding up petition',
      'Re Frederick Inns Ltd [1994] — Irish Supreme Court on liquidation and preferences',
    ],
    examTip:
      'Know the order of priority for distribution on liquidation — it appears in almost every FE-1 insolvency problem question.',
  },
  'Module_11_Lesson_11_4.m4a': {
    // Voidable Transactions (Company Law)
    cases: [
      'Re Hunting Lodges Ltd [1985] — fraudulent preference in Irish law',
      'Re Hefferon Kearns Ltd [1993] — reckless trading under Companies Act',
    ],
    examTip:
      'Reckless trading is one of the most commonly examined topics in Company Law — always check whether directors continued trading when insolvency was inevitable.',
  },
  'Module_12_Lesson_12_1.m4a': {
    // CEA (Company Law) - also Strict Liability Animals (Tort)
    cases: [
      'Director of Corporate Enforcement v Seymour [2006] — investigative powers of ODCE/CEA',
    ],
    examTip:
      'CEA questions often arise in the context of restriction and disqualification — know the interaction between CEA investigations and Section 819 restriction applications.',
  },
  'Module_12_Lesson_12_2.m4a': {
    // Offences Against Justice (Criminal Law)
    cases: [
      "The People (DPP) v Quilligan and O'Reilly [1987] — Offences Against the State Act detention",
    ],
    examTip:
      'State security offences are less commonly examined but can appear — know the main categories and their statutory basis under the Offences Against the State Act 1939.',
  },
  'Module_13_Lesson_13_1.m4a': {
    // Courts Classification Arrest (Criminal Law) - also Contributory Negligence (Tort)
    cases: [
      "The People (DPP) v Quilligan and O'Reilly [1987] — constitutional limits on detention",
      'DPP v Aylmer [1995] — arrest and detention powers',
    ],
    examTip:
      'Classification of offences determines the trial venue and procedure — always identify whether an offence is summary, indictable, or either-way before advising on procedure.',
  },
  'Module_13_Lesson_13_2.m4a': {
    // Bail and Right to Silence (Criminal Law) - also Volenti (Tort)
    cases: [
      "People v O'Shea [1982] — right to silence and constitutional protections",
      'Heaney v Ireland [1994] — right to silence and Article 38',
    ],
    examTip:
      'The adverse inference provisions are constitutionally controversial — always flag the tension between the right to silence and the Criminal Justice Act 2007 provisions in exam answers.',
  },
  'Module_1_Lesson_1_1.m4a': {
    // Characteristics of Crime (Criminal Law) - also Offer and Acceptance (Contract) - also Relativity of Title (Property)
    cases: [
      'Salomon v. A Salomon and Co Ltd [1897] — separate legal personality', // Company Law context
    ],
    examTip:
      'The distinction between civil and criminal liability is foundational — always begin a criminal law answer by confirming the act constitutes a crime before analysing the elements.',
  },
  'Module_1_Lesson_1_2.m4a': {
    // Classification of Criminal Offences (Criminal Law)
    cases: [],
    examTip:
      'Classification of offences matters practically — arrestable vs non-arrestable determines Garda powers of detention. Always check which category applies.',
  },
  'Module_1_Lesson_1_3.m4a': {
    // Section 31 Statutory Contract (Company Law) - also Promissory Estoppel (Contract)
    cases: [
      "Hickman v Kent or Romney Marsh Sheepbreeders' Association [1915] — outsider rule",
      'Rayfield v Hands [1960] — member enforcing constitution against other members',
      'Eley v. Positive Government Security Life Assurance Co [1876] — outsider right not enforceable',
    ],
    examTip:
      'The outsider rule is a trap — if the person enforcing the constitution is acting in a non-member capacity, s.31 will not assist them.',
  },
  'Module_1_Lesson_1_4.m4a': {
    // LTDs vs DACs (Company Law) - also Intention to Create Legal Relations (Contract)
    cases: [],
    examTip:
      'If a question involves a company acting outside its stated objects, check whether it is a DAC — only DACs are bound by an objects clause under the 2014 Act.',
  },
  'Module_1_Lesson_1_5.m4a': {
    // Capacity to Contract (Contract)
    cases: [
      'Nash v Inman [1908] — necessaries test for minors',
      'De Francesco v Barnum [1890] — contract oppressive to minor voidable',
    ],
    examTip:
      'For minor capacity, always ask: are the goods necessaries? If yes, is the price reasonable? A minor is liable at a reasonable price not necessarily the contract price.',
  },
  'Module_1_Lesson_1_6.m4a': {
    // Formal Requirements (Contract)
    cases: [
      'Leroux v Brown (1852) — oral contract proved but unenforceable for want of writing',
      'McQuaid v Lynam [1965] — Irish case on Statute of Frauds and land contracts',
    ],
    examTip:
      'For FE-1 land law and contract crossover questions: the sale of land contract must be evidenced in writing under s.51 LCLRA 2009.',
  },
  'Module_1_Lesson_1_1.mp3': {
    // What is Tort Law? (Tort) - also Relativity of Title (Property)
    cases: ['Donoghue v Stevenson [1932] — foundational tort law neighbour principle'],
    examTip:
      'Always begin a tort answer by identifying the tort, establishing the elements, then applying them to the facts. Structure is half the marks in FE-1 tort questions.',
  },
  'Module_1_Lesson_1_2.mp3': {
    // FE-1 Exam Strategy Tort (Tort) - also Law of Finding (Property)
    cases: [],
    examTip:
      'FE-1 Tort Law questions typically involve negligence or trespass. Identify the tort first, then work through duty, breach, causation and damage methodically.',
  },
  'Module_2_Lesson_2_1.m4a': {
    // Actus Reus (Criminal) - also Express Terms (Contract) - also Duty of Care (Tort)
    cases: [
      'Donoghue v Stevenson [1932] — neighbour principle',
      'Glencar Explorations plc v Mayo County Council (No 2) [2002] — Irish three-stage duty test',
      'Ward v McMaster [1988] — Irish Supreme Court on duty of care',
    ],
    examTip:
      'In Irish negligence, Ward v McMaster is the leading authority. Apply the three-stage test: foreseeability, proximity, and whether it is fair just and reasonable to impose a duty.',
  },
  'Module_2_Lesson_2_2.m4a': {
    // Causation (Criminal) - also Conditions Warranties (Contract) - also Special Duty (Tort)
    cases: [
      'Hong Kong Fir Shipping Co Ltd v Kawasaki Kisen Kaisha Ltd [1962] — innominate term doctrine',
      'Poussard v Spiers and Pond [1876] — breach of condition',
      'Bettini v Gye [1876] — breach of warranty',
    ],
    examTip:
      'Hong Kong Fir is the modern approach — ask whether the breach deprives the innocent party of substantially the whole benefit of the contract.',
  },
  'Module_2_Lesson_2_3.m4a': {
    // Implied Terms (Contract) - also Pure Economic Loss (Tort)
    cases: [
      'The Moorcock (1889) — business efficacy test',
      'Shirlaw v Southern Foundries (1926) Ltd [1939] — officious bystander test',
      'Hedley Byrne & Co Ltd v Heller & Partners Ltd [1964] — negligent misstatement',
    ],
    examTip:
      'Business efficacy and officious bystander are the two key tests — the term must be necessary, not merely reasonable, to imply it in fact.',
  },
  'Module_2_Lesson_2_4.m4a': {
    // Exemption Clauses (Contract) - also Novus Actus (Tort)
    cases: [
      "L'Estrange v Graucob [1934] — signature binds",
      'Parker v South Eastern Railway Co (1877) — notice of exemption clause',
      'Photo Production Ltd v Securicor Transport Ltd [1980] — fundamental breach rejected',
    ],
    examTip:
      'For consumer contracts, the Consumer Rights Act 2022 has replaced common law unfairness rules — an unfair term in a B2C contract is not binding on the consumer.',
  },
  'Module_2_Lesson_2_5.m4a': {
    // Certainty of Terms (Contract)
    cases: [
      'Scammell and Nephew Ltd v Ouston [1941] — usual hire purchase terms too uncertain',
      'Hillas & Co Ltd v Arcos Ltd [1932] — commercial contract generous interpretation',
      'Walford v Miles [1992] — agreement to negotiate not binding',
    ],
    examTip:
      'In FE-1 problem questions, "subject to contract" or "to be agreed" clauses usually indicate no binding agreement — flag this before analysing other issues.',
  },
  'Module_2_Lesson_1.mp3': {
    // Separation of Powers (Constitutional) - also European Parliament (EU)
    cases: [
      'Buckley v. Attorney General [1950] — Oireachtas cannot exercise judicial power',
      'Cox v Ireland [1992] — legislative interference with judicial determination',
      'Crotty v An Taoiseach [1987] — executive cannot surrender constitutional functions',
    ],
    examTip:
      'When the separation of powers question appears, always identify which branch is encroaching on which other branch — do not just state the doctrine abstractly.',
  },
  'Module_2_Lesson_2.mp3': {
    // Oireachtas Article 15 (Constitutional) - also Council EU (EU)
    cases: [
      'City View Press v An Chomhairle Oiliúna [1980] — principles and policies test',
      'Laurentiu v. Minister for Justice [1999] — impermissible delegation',
    ],
    examTip:
      'The City View Press principles and policies test is the key Irish authority on delegated legislation — memorise it for any question on statutory instruments.',
  },
  'Module_2_Lesson_3.mp3': {
    // Executive Power (Constitutional) - also Commission EU (EU)
    cases: [
      'Attorney General v. Hamilton [1993] — cabinet confidentiality',
      'Crotty v An Taoiseach [1987] — limits on executive treaty-making power',
    ],
    examTip:
      'Cabinet confidentiality was extended in Hamilton — communications between ministers about government business are constitutionally protected even after the government falls.',
  },
  'Module_2_Lesson_4.mp3': {
    // Judicial Power (Constitutional) - also CJEU (EU)
    cases: [
      'McDonald v. Bord na gCon [1965] — seven characteristics of administration of justice',
      'Re Solicitors Act [1960] — limited function under Article 37',
    ],
    examTip:
      'The McDonald v Bord na gCon checklist is the starting point for any Article 34/37 question. Apply each characteristic to the facts.',
  },
  'Module_2_Lesson_5.mp3': {
    // President (Constitutional) - also Democratic Deficit (EU)
    cases: ['In Re Article 26 and the Electoral (Amendment) Bill 1983 — presidential reference'],
    examTip:
      'Article 26 references are constitutionally significant — if a Bill passes the reference, it is immune from future constitutional challenge. Know this consequence.',
  },
  'Module_2_Lesson_6.mp3': {
    // Delegated Legislation (Constitutional)
    cases: [
      'City View Press v An Chomhairle Oiliúna [1980] — principles and policies test',
      'Laurentiu v. Minister for Justice [1999] — Henry VIII clause struck down',
    ],
    examTip:
      'Henry VIII clauses appear regularly in FE-1 questions on the validity of statutory instruments — always check whether the minister is amending primary legislation rather than supplementing it.',
  },
  'Module_2_Lesson_1.m4a': {
    // Salomon Principle (Company Law) - also Duty of Care (Tort)
    cases: [
      'Salomon v. A Salomon and Co Ltd [1897] — separate legal personality',
      'Macaura v. Northern Assurance Co Ltd [1925] — company assets belong to company not shareholders',
      "Lee v. Lee's Air Farming Ltd [1961] — sole director can be employee of own company",
    ],
    examTip:
      'The Salomon principle is so fundamental that almost every Company Law FE-1 question will involve it — always state it before analysing exceptions.',
  },
  'Module_2_Lesson_2_1.mp3': {
    // Joint Tenancy (Property)
    cases: [
      'Williams v Hensman (1861) — three methods of severance',
      'Burgess v Rawnsley [1975] — severance by course of dealing',
    ],
    examTip:
      'Always check the four unities before concluding a joint tenancy exists. If any unity is absent, it is a tenancy in common.',
  },
  'Module_2_Lesson_2_2.mp3': {
    // Co-Ownership LCLRA (Property)
    cases: ['Bank of Ireland v Smyth [1993] — Irish co-ownership and bank charge'],
    examTip:
      'The LCLRA 2009 changed the default rules on creating co-ownership — always check whether the transaction occurred before or after 1 December 2009.',
  },
  'Module_2_Lesson_2_3.mp3': {
    // Severance Joint Tenancy (Property)
    cases: [
      'Williams v Hensman (1861) — three methods of severance',
      "Re Draper's Conveyance [1969] — severance by declaration",
    ],
    examTip:
      'Severance can be effected unilaterally — the other co-owner need not agree. But the act of severance must be clear and unequivocal.',
  },
  'Module_2_Lesson_2_4.mp3': {
    // Rights Obligations Co-Owners (Property)
    cases: ['Bull v Bull [1955] — right to occupy as co-owner'],
    examTip:
      'Co-owners cannot exclude each other from occupation — if one co-owner is excluded, they are entitled to an account of occupation rent.',
  },
  'Module_2_Lesson_2_1.m4a': {
    // Actus Reus (Criminal Law)
    cases: ['The People (AG) v Dwyer [1972] — voluntariness of act'],
    examTip:
      'Omissions rarely ground criminal liability — always identify whether there is a specific duty to act before advising on liability for an omission.',
  },
  'Module_2_Lesson_2_2.m4a': {
    // Causation (Criminal Law)
    cases: [
      'The People (DPP) v Cully [1984] — causation in homicide',
      'R v Robinson [1977] — chain of causation',
    ],
    examTip:
      'Apply both but-for causation and legal causation — a novus actus by a third party or the victim themselves can break the chain even if but-for causation is established.',
  },
  'Module_3_Lesson_1.mp3': {
    // Judicial Review Grounds (Constitutional) - also Primary Law EU - also Constitution Trusts Milroy (Equity)
    cases: [
      'O Keeffe v An Bord Pleanála [1993] — irrationality standard in Irish judicial review',
      'Meadows v Minister for Justice [2010] — proportionality in judicial review',
      'Milroy v Lord (1862) — equity will not perfect an imperfect gift',
    ],
    examTip:
      "O'Keeffe irrationality has been supplemented by proportionality analysis — know both for FE-1 constitutional answers.",
  },
  'Module_3_Lesson_2.mp3': {
    // Constitutional Remedies - also Secondary Law EU - also Constitution Trusts Exceptions (Equity)
    cases: [
      'Meskell v CIE [1973] — damages for breach of constitutional right',
      'Strong v Bird (1874) — appointment as executor perfects imperfect gift',
      'Re Rose [1952] — transfer complete when donor has done everything in their power',
    ],
    examTip:
      'Meskell damages are a direct constitutional remedy — they do not require the commission of a common law tort.',
  },
  'Module_3_Lesson_3.mp3': {
    // Article 26 Reference (Constitutional) - also Delegated Acts EU
    cases: [
      'In Re Article 26 and the Emergency Powers Bill 1976 — scope of reference',
      'In Re Article 26 and the Illegal Immigrants (Trafficking) Bill 1999 — constitutionality upheld',
    ],
    examTip:
      'The immunity from future challenge following a successful Article 26 reference is absolute — know this consequence for exam answers.',
  },
  'Module_3_Lesson_3_1.m4a': {
    // Mens Rea (Criminal Law) - also Consumer Rights Sale of Goods (Contract) - also Breach Duty Objective (Tort)
    cases: [
      'The People (DPP) v Murray [1977] — intention in Irish criminal law',
      'DPP v Majewski [1977] — intoxication and mens rea',
    ],
    examTip:
      'Getting mens rea right is the difference between a pass and a fail in most FE-1 criminal scenarios — identify the specific mens rea required for the offence before applying it.',
  },
  'Module_3_Lesson_3_1_b.m4a': {
    // Mens Rea Part 1b (Criminal Law)
    cases: [
      'The People (DPP) v Murray [1977] — intention in Irish criminal law',
      'DPP v Majewski [1977] — intoxication and mens rea',
    ],
    examTip:
      'Getting mens rea right is the difference between a pass and a fail in most FE-1 criminal scenarios — identify the specific mens rea required for the offence before applying it.',
  },
  'Module_3_Lesson_3_2.m4a': {
    // Consumer Rights Digital (Contract) - also Breach Duty Factors (Tort)
    cases: [
      'Paris v Stepney Borough Council [1951] — gravity of harm and precautions',
      'Bolton v Stone [1951] — low probability of harm and reasonable precautions',
    ],
    examTip:
      'Always weigh the probability, gravity, cost and social utility factors together — no single factor is determinative in a breach of duty analysis.',
  },
  'Module_3_Lesson_3_3.m4a': {
    // Unfair Contract Terms (Contract)
    cases: [],
    examTip:
      'The Consumer Rights Act 2022 replaced the old UTCCR — always cite the 2022 Act for unfair terms in consumer contracts, not the old regime.',
  },
  'Module_3_Lesson_1.mp3': {
    // Adverse Possession Basic (Property)
    cases: [
      'Feehan v Leamy [2000] — Irish Supreme Court on adverse possession',
      'J A Pye (Oxford) Ltd v Graham [2002] — adverse possession and ECHR',
    ],
    examTip:
      'Both elements of adverse possession must coexist continuously for the full limitation period — factual possession alone without intention is insufficient.',
  },
  'Module_3_Lesson_3_1.mp3': {
    // Adverse Possession Basic (Property)
    cases: [
      'Feehan v Leamy [2000] — Irish adverse possession',
      'Buckinghamshire County Council v Moran [1990] — factual possession and animus possidendi',
    ],
    examTip:
      'Both factual possession and animus possidendi must coexist for the full limitation period.',
  },
  'Module_3_Lesson_3_2.mp3': {
    // Requirements Adverse Possession (Property)
    cases: [
      'Powell v MacFarlane (1977) — animus possidendi requirement',
      'Leigh v Jack (1879) — adverse use',
    ],
    examTip:
      "The animus possidendi requirement is strict — the squatter must intend to possess the land for their own benefit, not acknowledge the paper owner's title.",
  },
  'Module_3_Lesson_3_3.mp3': {
    // Adverse Possession Special Cases (Property)
    cases: [
      'J A Pye (Oxford) Ltd v Graham [2002] — adverse possession and Article 1 Protocol 1 ECHR',
      'Guckian v Brennan [1981] — registered land and adverse possession',
    ],
    examTip:
      'The human rights dimension of adverse possession is important — JA Pye was decided by the ECtHR which held adverse possession did not breach property rights under the Convention.',
  },
  'Module_4_Lesson_1.mp3': {
    // Equality Article 40.1 (Constitutional) - also General Principles EU
    cases: [
      "Quinn's Supermarket v. Attorney General [1972] — reasonable classification",
      'de Búrca v Attorney General [1976] — jury exclusion of women unconstitutional',
      'Stauder v City of Ulm [1969] — fundamental rights as general principles of EU law',
    ],
    examTip:
      'Article 40.1 does not prohibit all distinctions — it prohibits arbitrary or irrational distinctions. Always ask whether the classification has a legitimate basis.',
  },
  'Module_4_Lesson_2.mp3': {
    // Unenumerated Rights (Constitutional) - also Fundamental Rights EU
    cases: [
      'Ryan v. Attorney General [1965] — unenumerated rights first recognised',
      'McGee v. The Attorney General [1974] — right to marital privacy',
      'Kennedy v. Ireland [1987] — right to privacy in telephone communications',
      'Internationale Handelsgesellschaft mbH v Einfuhr- und Vorratsstelle für Getreide [1970] — fundamental rights and EU supremacy',
    ],
    examTip:
      'When claiming an unenumerated right, ground it in the nature of the State as a Christian democratic republic and in the dignity of the human person.',
  },
  'Module_4_Lesson_3.mp3': {
    // Liberty Article 40.4 (Constitutional) - also Charter Scope EU
    cases: [
      'State (Quinn) v. Ryan [1965] — habeas corpus and extradition',
      'Damache v. DPP [2012] — defective search warrant',
      'Åklagaren v Åkerberg Fransson [2013] — Charter scope within EU law',
    ],
    examTip:
      'Article 40.4 applications must be brought promptly — delay in challenging detention is a factor courts consider.',
  },
  'Module_4_Lesson_4.mp3': {
    // Inviolability of Dwelling (Constitutional)
    cases: [
      'Damache v. DPP [2012] — search warrant issued by Garda seeking it unconstitutional',
      'The People (DPP) v Kenny [1990] — unconstitutionally obtained evidence excluded',
    ],
    examTip:
      'Damache is the leading recent authority — a search warrant issued by the Garda seeking it is unconstitutional. Know it for both constitutional law and criminal procedure questions.',
  },
  'Module_4_Lesson_5.mp3': {
    // Freedom of Expression (Constitutional)
    cases: [
      'Colgan v. Independent Radio and Television Commission [1999] — broadcasting restrictions',
      'Attorney General v. Paperlink Ltd [1984] — expression and postal monopoly',
      'Murphy v. IRTC [1999] — religious broadcasting and expression',
    ],
    examTip:
      'Freedom of expression under Article 40.6.1 is not absolute — balance it against defamation, privacy and public interest in every FE-1 answer involving expression.',
  },
  'Module_4_Lesson_6.mp3': {
    // Freedom of Assembly (Constitutional)
    cases: [
      'Educational Company of Ireland v Fitzpatrick [1961] — picketing and right to work',
      'Meskell v CIE [1973] — right to disassociate from union',
    ],
    examTip:
      'The right of association includes the right not to associate — Meskell establishes that forcing someone to join a union can breach this constitutional guarantee.',
  },
  'Module_4_Lesson_1.m4a': {
    // Fixed Floating Charges (Company Law) - also Misrepresentation (Contract) - also But-For Test (Tort)
    cases: [
      'Re Yorkshire Woolcombers Association Ltd [1903] — three characteristics of floating charge',
      'Re Keenan Brothers Ltd [1985] — Irish Supreme Court on fixed vs floating charge',
      'Barnett v Chelsea & Kensington Hospital Management Committee [1969] — but-for causation',
      'Derry v Peek [1889] — fraud requires knowingly false or reckless statement',
    ],
    examTip:
      'The Keenan Bros test is the leading Irish authority — a charge over book debts is only fixed if the chargor cannot freely withdraw the proceeds.',
  },
  'Module_4_Lesson_2.m4a': {
    // Crystallisation (Company Law) - also Mistake (Contract) - also Novus Actus (Tort)
    cases: [
      'Re Holidair Ltd [1994] — Irish case on crystallisation and examiner appointment',
      'Bell v Lever Brothers Ltd [1932] — common mistake must be fundamental',
      'Lewis v Averay [1972] — face to face dealing and identity mistake',
    ],
    examTip:
      'Preferential creditors take priority over floating charge holders but not fixed charge holders — this distinction is tested regularly.',
  },
  'Module_4_Lesson_3.m4a': {
    // Retention of Title (Company Law) - also Duress (Contract) - also Material Contribution (Tort)
    cases: [
      'Aluminium Industrie Vaassen BV v Romalpa Aluminium Ltd [1976] — leading ROT case',
      'DSND Subsea v Petroleum Geo-Services [2000] — economic duress test',
      'Fairchild v Glenhaven Funeral Services [2002] — mesothelioma and material contribution',
    ],
    examTip:
      'ROT clauses must be incorporated into the contract — a clause on the back of a delivery note after the contract is formed will not be effective.',
  },
  'Module_4_Lesson_4.m4a': {
    // Murder (Criminal Law) - also Undue Influence (Contract)
    cases: [
      'The People (DPP) v Murray [1977] — intention in murder',
      'Royal Bank of Scotland v Etridge (No 2) [2001] — undue influence by spouse and bank notice',
      'Bank of Montreal v Stuart [1911] — presumed undue influence',
    ],
    examTip:
      "Etridge is the leading authority on banks and undue influence — a bank is put on inquiry whenever a wife stands surety for husband's business debts.",
  },
  'Module_4_Lesson_4_1.m4a': {
    // Fixed Floating Priority (Company Law) - also Misrepresentation (Contract) - also But-For Test (Tort) - also Nature Easements (Property) - also Murder (Criminal)
    cases: [
      'Re Ellenborough Park [1956] — four characteristics of an easement',
      'Derry v Peek [1889] — fraudulent misrepresentation',
      'Barnett v Chelsea & Kensington Hospital Management Committee [1969] — but-for test',
    ],
    examTip:
      'Always check the Re Ellenborough Park test before concluding an easement exists — a claimed right that does not meet all four characteristics is not capable of being an easement.',
  },
  'Module_4_Lesson_4_2.m4a': {
    // Crystallisation (Company Law) - also Mistake (Contract) - also Novus Actus (Tort) - also Acquisition Easements (Property) - also Voluntary Manslaughter (Criminal)
    cases: [
      'Wheeldon v Burrows (1879) — implied grant of quasi-easement',
      'Bell v Lever Brothers Ltd [1932] — common mistake',
      'The People (AG) v Dwyer [1972] — provocation in Irish law',
    ],
    examTip:
      'Prescription allows an easement to be acquired through long use — know all three methods available in Ireland and their differences.',
  },
  'Module_4_Lesson_4_3.m4a': {
    // ROT (Company Law) - also Duress (Contract) - also Material Contribution (Tort) - also Prescription (Property) - also Involuntary Manslaughter (Criminal)
    cases: [
      'Aluminium Industrie Vaassen BV v Romalpa Aluminium Ltd [1976] — ROT clause',
      'Hanna v Pollock [1900] — Irish easement and prescription case',
    ],
    examTip:
      'For prescription under the Prescription Act 1832, the user must be as of right (nec vi, nec clam, nec precario) — not by force, stealth or permission.',
  },
  'Module_4_Lesson_4_4.m4a': {
    // Directors Good Faith (Company Law) - also Undue Influence (Contract) - also Remoteness (Tort) - also Extinguishment Easements (Property) - also Assisted Suicide (Criminal)
    cases: [
      'Re Hydrodam (Corby) Ltd [1994] — definition of shadow director',
      'Fleming v. Ireland [2013] — right to die and Irish Constitution',
    ],
    examTip:
      'Always identify what type of director is involved before applying duties — shadow and de facto directors are subject to the same duties as formally appointed directors.',
  },
  'Module_5_Lesson_1.mp3': {
    // The Family Article 41 (Constitutional) - also Supremacy EU - also Freehold Covenants Common Law (Property)
    cases: [
      'State (Nicolaou) v. An Bord Uchtála [1966] — unmarried father not within Article 41',
      'Costa v ENEL [1964] — supremacy of EU law',
      'Amministrazione delle Finanze dello Stato v Simmenthal SpA [1978] — national court must disapply national law',
      'Tulk v Moxhay (1848) — restrictive covenant enforceable in equity',
    ],
    examTip:
      'Post-referendum, Article 41 has been amended — "family" is no longer constitutionally limited to the marital family. Acknowledge the evolution in exam answers.',
  },
  'Module_5_Lesson_2.mp3': {
    // Education Article 42 (Constitutional) - also Direct Effect Treaty (EU) - also Freehold Covenants Equity (Property)
    cases: [
      'Sinnott v. Minister for Education [2001] — State education obligation ends at 18',
      'NV Algemene Transport- en Expeditie Onderneming van Gend en Loos v Nederlandse Administratie der Belastingen [1963] — direct effect',
      'Defrenne v Sabena (No 2) [1976] — horizontal direct effect of treaty article',
    ],
    examTip:
      'Sinnott is critical — the Supreme Court held the constitutional education obligation ends at age 18. This boundary matters for FE-1 questions on State educational obligations.',
  },
  'Module_5_Lesson_3.mp3': {
    // Children Rights 42A (Constitutional) - also Direct Effect Directives (EU)
    cases: [
      'Marshall v Southampton and South-West Hampshire Area Health Authority (Teaching) [1986] — no horizontal direct effect for directives',
      'Foster v British Gas plc [1990] — definition of State for vertical direct effect',
    ],
    examTip:
      'Article 42A changed the balance between parental rights and State intervention — the best interests of the child can now override parental wishes in defined circumstances.',
  },
  'Module_5_Lesson_1.m4a': {
    // Types Directors Good Faith (Company Law) - also Discharge Performance (Contract) - also Remoteness (Tort)
    cases: [
      'Re Hydrodam (Corby) Ltd [1994] — shadow director definition',
      'Cutter v Powell (1795) — complete performance required for entire contract',
      'Hoenig v Isaacs [1952] — substantial performance',
      'Overseas Tankship (UK) Ltd v Morts Dock & Engineering Co Ltd (The Wagon Mound No 1) [1961] — reasonable foreseeability and remoteness',
      'Smith v Leech Brain & Co Ltd [1962] — thin skull rule',
    ],
    examTip:
      'The thin skull rule means you take your victim as you find them — liable for the full unforeseeable extent of foreseeable damage.',
  },
  'Module_5_Lesson_2.m4a': {
    // Conflict Interest Skill Care (Company Law) - also Frustration (Contract) - also Psychiatric Injury Primary (Tort)
    cases: [
      'Aberdeen Railway Co v Blaikie Brothers [1854] — no-conflict rule',
      'Davis Contractors Ltd v Fareham Urban District Council [1956] — frustration test',
      'Taylor v Caldwell (1863) — destruction of subject matter frustrates contract',
    ],
    examTip:
      'The conflict of interest duty is strict — it is not enough that the director acted honestly or that the company was not harmed. Disclosure and approval are required.',
  },
  'Module_5_Lesson_3.m4a': {
    // Remedies Breach Directors (Company Law) - also Breach Repudiation (Contract) - also Psychiatric Injury Secondary (Tort)
    cases: [
      'Regal (Hastings) Ltd v Gulliver [1942] — account of profits',
      'Cook v. Deeks [1916] — directors diverting company opportunity',
      'Hochster v De La Tour (1853) — anticipatory breach',
      'Alcock v Chief Constable of South Yorkshire Police [1992] — secondary victim control mechanisms',
      'Kelly v Hennessy [1995] — Irish secondary victim test',
    ],
    examTip:
      'Account of profits does not require proof of loss — this makes it a more powerful remedy than damages in cases of director self-dealing.',
  },
  'Module_5_Lesson_5_1.m4a': {
    // Discharge Performance (Contract) - also Remoteness (Tort) - also Assault NFOATP (Criminal) - also Freehold Covenants (Property)
    cases: [
      'Cutter v Powell (1795) — entire contract performance',
      'Hoenig v Isaacs [1952] — substantial performance',
      'Overseas Tankship (UK) Ltd v Morts Dock & Engineering Co Ltd (The Wagon Mound No 1) [1961] — remoteness',
      'Tulk v Moxhay (1848) — restrictive covenant in equity',
    ],
    examTip:
      'Always check whether the contract is entire or divisible — the distinction determines whether partial performance gives rise to payment.',
  },
  'Module_5_Lesson_5_2.m4a': {
    // Discharge Breach (Contract) - also Psychiatric Injury Primary (Tort) - also Harassment (Criminal) - also Freehold Covenants Equity (Property)
    cases: [
      'Hochster v De La Tour (1853) — anticipatory breach',
      'White v Chief Constable of South Yorkshire Police [1999] — police officers not primary victims',
    ],
    examTip:
      'The election between acceptance and affirmation in anticipatory breach must be made promptly and clearly — a party who affirms takes the risk of subsequent frustrating events.',
  },
  'Module_5_Lesson_5_3.m4a': {
    // Frustration (Contract) - also Psychiatric Injury Secondary (Tort) - also Rape (Criminal)
    cases: [
      'Davis Contractors Ltd v Fareham Urban District Council [1956] — frustration test',
      'Krell v Henry [1903] — commercial purpose frustrated',
      'Alcock v Chief Constable of South Yorkshire Police [1992] — secondary victim',
      'Kelly v Hennessy [1995] — Irish secondary victim',
    ],
    examTip:
      'The Davis Contractors test is the leading authority — the question is whether the supervening event has made the contract a fundamentally different thing from what was undertaken.',
  },
  'Module_6_Lesson_1.mp3': {
    // Property Article 43 (Constitutional) - also Francovich (EU) - also Family Home Protection (Property) - also Resulting Trusts (Equity)
    cases: [
      'Blake v Attorney General [1982] — Rent Restrictions Act disproportionate interference',
      'Francovich and Bonifaci v Italy [1991] — State liability for non-implementation',
      'Bank of Ireland v Smyth [1993] — family home consent and bank mortgage',
      'Westdeutsche Landesbank Girozentrale v Islington LBC [1996] — resulting trust principles',
      'Dyer v Dyer (1788) — purchase money resulting trust',
    ],
    examTip:
      'The Article 43 analysis requires two steps: is there an interference with the property right? If yes, is it a proportionate regulation for the common good or an unjust attack?',
  },
  'Module_6_Lesson_2.mp3': {
    // Religion Article 44 (Constitutional) - also Brasserie Factortame (EU) - also Civil Partners Cohabitants (Property)
    cases: [
      'Brasserie du Pêcheur SA v Germany; R v Secretary of State for Transport, ex parte Factortame Ltd (No 3) [1996] — sufficiently serious breach',
    ],
    examTip:
      'Always apply the Brasserie sufficiently serious breach test — not every breach of EU law gives rise to State liability.',
  },
  'Module_6_Lesson_3.mp3': {
    // Article 45 Directive Principles (Constitutional) - also National Procedural Autonomy (EU) - also Family Law Property (Property)
    cases: ['Murtagh Properties v Cleary [1972] — Article 45 as interpretive background'],
    examTip:
      'Article 45 cannot be the basis of a legal claim but can support an argument about the purpose or intention of legislation — use it as background context in FE-1 answers.',
  },
  'Module_6_Lesson_6_1.m4a': {
    // Section 238 (Company Law) - also Damages Contract - also Psychiatric Injury Primary (Tort) - also Rape (Criminal) - also Family Home (Property)
    cases: [
      'Hadley v Baxendale (1854) — remoteness of damage in contract',
      'Victoria Laundry (Windsor) Ltd v Newman Industries Ltd [1949] — loss of ordinary and exceptional profit',
      'Nestor v Murphy [1979] — consent under Family Home Protection Act',
    ],
    examTip:
      'Always apply both limbs of Hadley v Baxendale — first whether the loss flows naturally from the breach, then whether it was in the reasonable contemplation of the parties.',
  },
  'Module_6_Lesson_6_2.m4a': {
    // Section 239 (Company Law) - also Equitable Remedies Contract - also Psychiatric Injury Secondary (Tort) - also Sexual Assault (Criminal) - also Civil Partners (Property)
    cases: [
      'Beswick v Beswick [1968] — specific performance to enforce annuity',
      'Warner Bros Pictures Inc v Nelson [1937] — injunction to enforce negative covenant',
      'Alcock v Chief Constable of South Yorkshire Police [1992] — secondary victim',
      'Kelly v Hennessy [1995] — Irish secondary victim',
    ],
    examTip:
      'Specific performance is discretionary — always consider bars (delay, hardship, lack of mutuality). For land contracts, adequacy of damages is usually not a bar because land is unique.',
  },
  'Module_6_Lesson_6_3.m4a': {
    // Sexual Offences Children (Criminal) - also Family Law Property Acts (Property)
    cases: [],
    examTip:
      "Strict liability provisions in sexual offence legislation mean the defendant's belief about the victim's age is irrelevant — always flag this in FE-1 criminal answers.",
  },
  'Module_6_Lesson_6_4.mp3': {
    // Bankruptcy Family Home (Property)
    cases: ['Bank of Ireland v Smyth [1993] — family home and mortgage'],
    examTip:
      'Courts balance the interests of all co-owners in sale applications — a creditor mortgagee has strong grounds for sale but courts will consider the position of vulnerable occupiers.',
  },
  'Module_7_Lesson_1.mp3': {
    // Due Course of Law (Constitutional) - also Judicial Review EU Acts - also Historical Mortgages (Property) - also Constructive Trusts (Equity)
    cases: [
      'State (Healy) v. Donoghue [1976] — due course of law includes right to legal aid',
      'Plaumann & Co v Commission [1963] — standing under Article 263',
      'Gissing v Gissing [1971] — common intention constructive trust',
      'Lloyds Bank Ltd v Bundy [1975] — undue influence',
    ],
    examTip:
      'Article 38.1 is the constitutional anchor for all criminal procedure rights — any challenge to a criminal trial should start here before moving to specific rights.',
  },
  'Module_7_Lesson_2.mp3': {
    // Vague Offences (Constitutional) - also Standing Article 263 EU - also Mortgagee Remedies (Property) - also Constructive Trusts Estoppel (Equity)
    cases: [
      'King v. Attorney General [1981] — offence of being a suspected person struck down as vague',
      'Plaumann & Co v Commission [1963] — restrictive standing under Article 263',
      'Cuckmere Brick v Mutual Finance [1971] — mortgagee duty on sale',
      'Crabb v Arun District Council [1976] — proprietary estoppel',
    ],
    examTip:
      'King v Attorney General is the leading vagueness case — the offence gave no objective standard of conduct and was struck down. Apply this test to any uncertain offence definition.',
  },
  'Module_7_Lesson_3.mp3': {
    // Presumption of Innocence (Constitutional) - also Plea of Illegality EU - also Equity of Redemption (Property)
    cases: [
      'Hardy v Ireland [1994] — reverse onus clause and constitutional validity',
      "O'Leary v Attorney General [1993] — possession with intent and reverse onus",
      'Kreglinger v New Patagonia Meat [1914] — collateral advantages and equity of redemption',
      'Noakes v Rice [1902] — clog on equity of redemption void',
    ],
    examTip:
      "The FE-1 tests whether a reverse onus clause is constitutionally valid. The key factors: is the matter peculiarly within the defendant's knowledge, and is the reverse justified by a pressing social need?",
  },
  'Module_7_Lesson_4.mp3': {
    // Undue Delay (Constitutional) - also Article 265 Failure to Act EU - also Consumer Mortgage (Property)
    cases: ['Director of Public Prosecutions v PM [2006] — PM v Malone undue delay test'],
    examTip:
      'Always apply both limbs of the undue delay test — delay alone is not sufficient, the accused must show either actual prejudice or that the delay is so great that a fair trial is impossible.',
  },
  'Module_7_Lesson_5.mp3': {
    // Duty to Preserve Evidence (Constitutional)
    cases: [
      'Braddish v DPP [2001] — CCTV footage and duty to preserve evidence',
      'Dunne v DPP [2002] — destruction of evidence and fair trial',
      'Bowes v DPP [2003] — balancing default and prejudice',
    ],
    examTip:
      'Braddish is the key case — the State must take reasonable steps to preserve evidence even without a specific request from the accused.',
  },
  'Module_7_Lesson_6.mp3': {
    // Pre-Trial Publicity (Constitutional)
    cases: [
      'Z v DPP [1994] — test for prohibition on grounds of pre-trial publicity',
      'D v DPP [1994] — balance between prosecution and fair trial',
    ],
    examTip:
      'Prohibition is a last resort — courts will first consider whether appropriate jury directions can cure any prejudice from pre-trial publicity before staying a trial.',
  },
  'Module_7_Lesson_7.mp3': {
    // Fair Procedures Natural Justice (Constitutional)
    cases: [
      'East Donegal Co-operative Livestock Mart Ltd. v. Attorney General [1970] — natural justice principles',
      'In re Haughey [1971] — right to cross-examine and fair hearing',
      'State (Lynch) v. Cooney [1982] — bias and nemo iudex rule',
    ],
    examTip:
      'Natural justice applies beyond formal courts — tribunals, disciplinary bodies, and licensing authorities must all comply. The more serious the consequences the higher the procedural standard.',
  },
  'Module_7_Lesson_7_1.m4a': {
    // Section 212 Oppression (Company Law) - also Privity (Contract) - also Occupiers Liability (Tort) - also Theft (Criminal) - also Nature Lease (Property)
    cases: [
      'Re Irish Visiting Motorists Bureau Ltd [1973] — Irish oppression case',
      'Scottish Co-operative Wholesale Society v. Meyer [1959] — oppression of minority shareholders',
      'Dunlop Pneumatic Tyre Co Ltd v Selfridge & Co Ltd [1915] — leading privity case',
      'Tweddle v Atkinson [1861] — third party cannot enforce contract',
      'Street v Mountford [1985] — licence versus lease',
    ],
    examTip:
      'Section 212 is the minority shareholder remedy most likely to appear on the FE-1 — always consider it when a majority is acting against the interests of minority members.',
  },
  'Module_7_Lesson_7_2.m4a': {
    // Foss Harbottle (Company Law) - also Illegal Void Contracts (Contract) - also Product Liability (Tort) - also Burglary (Criminal) - also Covenants in Leases (Property)
    cases: [
      'Foss v. Harbottle (1843) — proper plaintiff rule',
      'Daniels v Daniels [1978] — fraud on minority exception',
      'Donoghue v Stevenson [1932] — manufacturer duty of care to consumer',
      'Nordenfeldt v Maxim Nordenfeldt Guns and Ammunition Co Ltd [1894] — worldwide restraint upheld',
    ],
    examTip:
      'The statutory derivative action under s.169 largely replaces the common law exceptions — but you must still know Foss v Harbottle for the theoretical framework.',
  },
  'Module_7_Lesson_7_3.m4a': {
    // Handling Stolen Goods Criminal Damage (Criminal)
    cases: [],
    examTip:
      'Criminal damage is often overlooked — know the basic elements under the Criminal Damage Act 1991 and distinguish it from theft in problem scenarios.',
  },
  'Module_7_Lesson_1.mp3': {
    // Restriction Directors (Company Law)
    cases: [
      'Re Squash (Ireland) Ltd [2001] — acting honestly and responsibly test',
      'Re Costello Doors Ltd [1995] — Irish case on restriction standard',
      'Re Tralee Beef and Lamb Ltd [2008] — Irish High Court on restriction application',
    ],
    examTip:
      'Restriction is not a punishment for fraud — it applies even to honest directors who were merely incompetent. Distinguish it clearly from disqualification.',
  },
  'Module_7_Lesson_7_1.mp3': {
    // Historical Mortgages (Property)
    cases: ['Kreglinger v New Patagonia Meat [1914] — collateral advantages'],
    examTip:
      'Understanding the historical development of mortgages explains why the equity of redemption exists and why clogs on it are void.',
  },
  'Module_7_Lesson_7_2.mp3': {
    // Mortgagee Remedies (Property)
    cases: [
      'Cuckmere Brick v Mutual Finance [1971] — mortgagee duty to obtain best price',
      'Palk v Mortgage Services Funding [1993] — mortgagee power of sale',
    ],
    examTip:
      "The mortgagee's duty to take reasonable care to obtain the best price is a tort-based duty and arises only when exercising the power of sale.",
  },
  'Module_7_Lesson_7_3.mp3': {
    // Equity of Redemption (Property)
    cases: [
      'Noakes v Rice [1902] — clog on equity of redemption void',
      'Samuel v Jarrah Timber [1904] — option to purchase as clog',
    ],
    examTip:
      'Once a mortgage always a mortgage — any agreement that prevents redemption or penalises it is a clog on the equity of redemption and void.',
  },
  'Module_7_Lesson_7_4.mp3': {
    // Consumer Mortgage Protections (Property)
    cases: [],
    examTip:
      'The Code of Conduct on Mortgage Arrears is a regulatory requirement — a lender who does not follow it before seeking possession may find the court adjourning proceedings.',
  },
  'Module_7_Lesson_8.mp3': {
    // Special Criminal Court (Constitutional)
    cases: ['Kavanagh v Ireland [1996] — constitutionality of DPP direction to SCC'],
    examTip:
      "The SCC is constitutional under Article 38.3 but its use must be justified — the DPP's direction that ordinary courts are inadequate is a reviewable decision.",
  },
  'Module_7_Lesson_9.mp3': {
    // Right to Legal Aid (Constitutional)
    cases: [
      'State (Healy) v. Donoghue [1976] — constitutional right to criminal legal aid',
      'Carmody v Minister for Justice, Equality and Law Reform [2009] — constitutionality of civil legal aid',
      'Airey v Ireland (1979) — ECtHR on civil legal aid obligation',
    ],
    examTip:
      'State (Healy) v Donoghue established the right to criminal legal aid — note that the ECHR obligation in Airey extends this to civil proceedings in certain circumstances.',
  },
  'Module_8_Lesson_1.mp3': {
    // International Law Article 29 (Constitutional) - also Preliminary Reference (EU) - also Types Licences (Property)
    cases: [
      'Crotty v An Taoiseach [1987] — referendum required for Single European Act',
      'Foto-Frost v Hauptzollamt Lübeck-Ost [1987] — national courts cannot declare EU acts invalid',
      'CILFIT Srl and Lanificio di Gavardo SpA v Ministry of Health [1982] — acte clair',
      'Hurst v Picture Theatres [1915] — contractual licence',
    ],
    examTip:
      'The Crotty principle is critical — any transfer of sovereignty under an EU or international treaty requires a referendum. This is the constitutional boundary on executive power in foreign affairs.',
  },
  'Module_8_Lesson_2.mp3': {
    // Ireland EU Crotty (Constitutional) - also CILFIT (EU) - also Contractual Licences (Property) - also Third Party Liability (Equity)
    cases: [
      'Crotty v An Taoiseach [1987] — Crotty principle',
      'CILFIT Srl and Lanificio di Gavardo SpA v Ministry of Health [1982] — mandatory duty to refer',
      'Errington v Errington and Woods [1952] — licence binding successor',
      'Royal Brunei Airlines v Tan [1995] — dishonest assistance',
    ],
    examTip:
      'The Crotty line of cases is essential — know the test for when a new EU treaty requires a referendum.',
  },
  'Module_8_Lesson_2.m4a': {
    // Restriction Directors (Company Law)
    cases: [
      'Re Squash (Ireland) Ltd [2001] — honestly and responsibly test',
      'Re Tralee Beef and Lamb Ltd [2008] — Irish restriction case',
    ],
    examTip:
      'Restriction is not a punishment for fraud — it applies even to honest directors who were merely incompetent.',
  },
  'Module_8_Lesson_3.mp3': {
    // Primacy EU Irish Position (Constitutional) - also Temporal Effects Preliminary Rulings (EU) - also Proprietary Estoppel (Property)
    cases: [
      'Murphy v An Bord Telecom Eireann [1988] — Irish court disapplying national law for EU',
      'Smyth v Halpin [1997] — Irish proprietary estoppel case',
      'Gillett v Holt [2001] — clear and unequivocal assurance required',
    ],
    examTip:
      'Irish courts have not yet definitively resolved whether EU law could override a core constitutional provision — acknowledge this open question in FE-1 answers.',
  },
  'Module_8_Lesson_4.mp3': {
    // ECHR Irish Law (Constitutional) - also Rights of Residence (Property)
    cases: [
      'Foy v. An tÁrd Chláraitheoir [2002] — first declaration of incompatibility',
      'Carmody v Minister for Justice, Equality and Law Reform [2009] — Convention and constitutional rights',
    ],
    examTip:
      'The 2003 Act gives Convention rights interpretive force but not supreme force — if a statutory provision cannot be read compatibly with the Convention, a declaration of incompatibility is the only remedy.',
  },
  'Module_8_Lesson_1.m4a': {
    // Aid Abet Counsel Procure (Criminal Law)
    cases: ["The People (AG) v O'Brien [1965] — accessory liability in Irish law"],
    examTip:
      'The four modes of secondary participation are distinct — aiding and abetting require presence at the scene while counselling and procuring do not.',
  },
  'Module_8_Lesson_8_1.m4a': {
    // Types Directors (Company Law) - also Product Liability (Tort) - also Types Licences (Property)
    cases: [
      'Re Lo-Line Electric Motors Ltd [1988] — de facto director',
      'Secretary of State for Trade v. Tjolle [1998] — de facto director test',
      'Donoghue v Stevenson [1932] — manufacturer duty of care',
      'A v National Blood Authority [2001] — strict liability for infected blood',
    ],
    examTip:
      'Always identify what type of director is involved before applying duties — shadow and de facto directors are subject to the same duties as formally appointed directors.',
  },
  'Module_8_Lesson_8_2.m4a': {
    // Common Design Joint Enterprise (Criminal Law) - also Contractual Licences (Property)
    cases: [
      'The People (DPP) v Cully [1984] — common design in Irish law',
      'Errington v Errington and Woods [1952] — contractual licence',
    ],
    examTip:
      'Withdrawal from a common design must be timely and unequivocal — simply walking away after the act is committed is not sufficient withdrawal.',
  },
  'Module_8_Lesson_8_3.mp3': {
    // Proprietary Estoppel Land (Property)
    cases: [
      'Crabb v Arun District Council [1976] — assurance of right of way',
      'Smyth v Halpin [1997] — Irish proprietary estoppel',
      'Jennings v Rice [2002] — proportionality in satisfying equity',
    ],
    examTip:
      'Proprietary estoppel can be used as a sword — it can establish a positive right. But the remedy is discretionary and proportionate, not automatic.',
  },
  'Module_8_Lesson_8_4.mp3': {
    // Rights of Residence (Property)
    cases: ['Rowe v Law [1978] — right of residence in Irish law'],
    examTip:
      'A right of residence is personal — it generally does not bind successors in title unless created as an easement or unless it is coupled with a trust.',
  },
  'Module_9_Lesson_1.mp3': {
    // Conspiracy Incitement Attempt (Criminal Law) - also Customs Union EU - also Injunctions Equity
    cases: [
      'Campus Oil Ltd v Minister for Industry and Energy [1983] — Irish interlocutory injunction test',
      'American Cyanamid Co v Ethicon Ltd [1975] — interlocutory injunction test',
      'Commission v Italy (Statistical Levy) [1969] — charges having equivalent effect',
    ],
    examTip:
      'Campus Oil is the Irish equivalent of American Cyanamid — note that Irish courts require establishment of a fair bona fide question. Know this distinction.',
  },
  'Module_9_Lesson_1.m4a': {
    // Conspiracy Incitement Attempt (Criminal Law) - also Dividends (Company Law)
    cases: [
      'Bairstow v Queens Moat Houses plc [2001] — director liability for unlawful dividend',
      'The People (DPP) v Maguire [1995] — conspiracy in Irish law',
    ],
    examTip:
      'The distributable profits rule is frequently tested — always check whether the company has sufficient realised profits before advising that a dividend is lawful.',
  },
  'Module_9_Lesson_2.m4a': {
    // Transfer of Shares (Company Law)
    cases: ['Re Smith and Fawcett Ltd [1942] — directors discretion to refuse transfer'],
    examTip:
      'Pre-emption rights must be triggered before any proposed transfer — if a member purports to transfer without first offering to existing members the transfer can be set aside.',
  },
  'Module_9_Lesson_9_1.m4a': {
    // Defamation Elements (Tort) - also Nature Lease (Property)
    cases: [
      'Sim v Stretch [1936] — test for defamatory statement',
      'Street v Mountford [1985] — exclusive possession test',
      'Irish Shell Ltd v Costello Ltd (No 2) [1984] — Irish lease versus licence',
    ],
    examTip:
      'Always identify whether the statement is defamatory, published to a third party and refers to the plaintiff before moving to defences. All three elements are required.',
  },
  'Module_9_Lesson_9_2.m4a': {
    // Defamation Defences (Tort) - also Covenants in Leases (Property)
    cases: [
      'Reynolds v Times Newspapers Ltd [2001] — responsible journalism (now replaced by statute)',
      "Hynes-O'Sullivan v. O'Driscoll [1988] — Irish qualified privilege",
    ],
    examTip:
      'The Defamation Act 2009 s.26 replaced Reynolds privilege with a statutory fair and reasonable publication defence — always cite the 2022 Act for modern defamation answers.',
  },
  'Module_9_Lesson_9_3.m4a': {
    // Defamation Remedies (Tort) - also Residential Tenancies (Property)
    cases: [],
    examTip:
      'Remedies in defamation are now primarily statutory under the 2009 Act — know the hierarchy of remedies before advising on damages.',
  },
  'Module_9_Lesson_9_4.mp3': {
    // Commercial Leases (Property)
    cases: [],
    examTip:
      'Commercial tenants with five years of continuous qualifying use have a right to a new tenancy under the 1980 Act — this cannot easily be overridden.',
  },
  'Module_10_Lesson_1.mp3': {
    // Free Movement Workers (EU) - also Specific Performance Equity
    cases: [
      'Lawrie-Blum v Land Baden-Württemberg [1986] — definition of worker',
      'Levin v Staatssecretaris van Justitie [1982] — part-time worker qualifies',
      'Ryan v Mutual Tontine Westminster Chambers Association [1893] — service contract not specifically performable',
    ],
    examTip:
      'The worker definition is broad — even very limited part-time or low paid work qualifies. The public policy derogation must be based on personal conduct and present threat.',
  },
  'Module_10_Lesson_2.mp3': {
    // Workers Family Members (EU)
    cases: [
      'Baumbast and R v Secretary of State for the Home Department [2002] — directly effective residence right',
    ],
    examTip:
      "The rights of family members are derivative of the worker's rights — but Baumbast shows they can also be directly effective under Article 21.",
  },
  'Module_10_Lesson_3.mp3': {
    // Derogations Free Movement Workers (EU)
    cases: [
      'Van Duyn v Home Office [1974] — public policy derogation and direct effect',
      'R v Bouchereau [1977] — personal conduct and public policy derogation',
    ],
    examTip:
      'The public policy derogation must be based on personal conduct constituting a genuine and present threat — past conduct alone or general deterrence are insufficient.',
  },
  'Module_10_Lesson_10_1.mp3': {
    // Testamentary Capacity (Property)
    cases: [
      'Banks v Goodfellow (1870) — testamentary capacity test',
      'Carroll v Carroll [1999] — knowledge and approval',
    ],
    examTip:
      'The Banks v Goodfellow test requires: understanding the nature of making a will, the extent of property, the claims of potential beneficiaries, and absence of mental disorder affecting the dispositions.',
  },
  'Module_10_Lesson_10_2.mp3': {
    // Revocation Wills (Property)
    cases: ['In re Curran [1938] — revocation by marriage Irish case'],
    examTip:
      'A will is automatically revoked by marriage in Ireland — always check the marital status of the testator when advising on testamentary validity.',
  },
  'Module_10_Lesson_10_3.mp3': {
    // Construction of Wills (Property)
    cases: ['In re Goods of Shaw [1944] — testamentary construction Irish case'],
    examTip:
      "Courts favour testacy over intestacy — where possible the will is construed to give effect to the testator's apparent intention rather than fail for uncertainty.",
  },
  'Module_10_Lesson_10_4.mp3': {
    // Legal Right Share (Property)
    cases: ["MK v FM [1982] — spouse's legal rights on intestacy"],
    examTip:
      'The legal right share under the Succession Act 1965 cannot be defeated by will — it is one half with no children, one third with children.',
  },
  'Module_10_Lesson_10_5.mp3': {
    // Section 117 Provision Children (Property)
    cases: ['In re JJ [1966] — Section 117 application'],
    examTip:
      'The Section 117 test is whether the testator has failed in their moral duty — not whether the child was adequately provided for by other means.',
  },
  'Module_10_Lesson_10_6.mp3': {
    // Intestacy (Property)
    cases: ['In re Urquhart [1974] — Irish intestate succession case'],
    examTip:
      "Know the intestacy distribution rules numerically — FE-1 often gives a scenario and asks you to calculate each beneficiary's share under the Succession Act 1965.",
  },
  'Module_11_Lesson_1.mp3': {
    // EU Citizenship Origins (EU)
    cases: [
      "Grzelczyk v Centre Public d'Aide Sociale d'Ottignies-Louvain-la-Neuve [2001] — solidarity and EU citizenship",
      'Baumbast and R v Secretary of State for the Home Department [2002] — directly effective residence right',
    ],
    examTip:
      'EU citizenship has created rights beyond the traditional economic freedoms — always consider whether EU citizenship rights apply before limiting analysis to worker or service provider rights.',
  },
  'Module_11_Lesson_2.mp3': {
    // Right of Residence 2004/38 (EU)
    cases: ['Dano v Jobcenter Leipzig [2014] — welfare tourism and residence rights'],
    examTip:
      'The three-tier structure of residence rights is important — conditions at each stage differ significantly. Know when economic sufficiency is required.',
  },
  'Module_11_Lesson_3.mp3': {
    // Third Country Nationals (EU)
    cases: [
      "Ruiz Zambrano v Office National de l'Emploi (ONEm) [2011] — third country national family right",
      'McCarthy v Secretary of State [2011] — purely internal situation',
      'Dereci v Bundesministerium für Inneres [2011] — genuine enjoyment of citizenship rights',
    ],
    examTip:
      'Zambrano is the key case — EU law can protect a third country national parent where expulsion would deprive an EU citizen child of the genuine enjoyment of citizenship rights.',
  },
  'Module_11_Lesson_4.mp3': {
    // Political Rights EU Citizenship (EU)
    cases: [],
    examTip:
      'EU citizenship political rights are often overlooked in FE-1 answers — remember to include voting rights in European and municipal elections as part of the citizenship package.',
  },
  'Module_12_Lesson_1.mp3': {
    // Equal Pay Article 157 (EU)
    cases: [
      'Defrenne v Sabena (No 2) [1976] — equal pay direct effect',
      'Barber v Guardian Royal Exchange Assurance Group [1990] — pensions as pay',
    ],
    examTip:
      'Article 157 is directly effective — it can be relied on against both public and private employers. This distinguishes it from directive-based equal treatment rights.',
  },
  'Module_12_Lesson_2.mp3': {
    // Equal Treatment Directives (EU)
    cases: [
      'Marshall v Southampton and South-West Hampshire Area Health Authority (Teaching) [1986] — directive direct effect',
      'Dekker v Stichting Vormingscentrum voor Jong Volwassenen [1990] — pregnancy discrimination',
    ],
    examTip:
      'The Recast Directive 2006/54 consolidated earlier equal treatment directives — always cite it as the primary source for sex discrimination in employment in FE-1 EU answers.',
  },
  'Module_12_Lesson_12_1.m4a': {
    // CEA (Company Law) / Public Order (Criminal Law)
    cases: [],
    examTip:
      'Public order offences under the 1994 Act are graduated — know the hierarchy from threatening behaviour to affray to riot, and the mental element required for each.',
  },
  'Module_13_Lesson_1.mp3': {
    // Freedom of Establishment (EU)
    cases: [
      "Gebhard v Consiglio dell'Ordine degli Avvocati e Procuratori di Milano [1995] — establishment vs services",
      'Reyners v Belgian State [1974] — direct effect of establishment right',
    ],
    examTip:
      'Distinguish establishment (permanent presence, Article 49) from services (temporary, Article 56). Gebhard provides the criteria for this distinction.',
  },
  'Module_13_Lesson_2.mp3': {
    // Free Movement Services (EU)
    cases: [
      'Säger v Dennemeyer & Co Ltd [1991] — restrictions on services and justification',
      'Alpine Investments BV v Minister van Financiën [1995] — home State restriction on services',
    ],
    examTip:
      'Services can be restricted by either the host State or the home State — Alpine Investments confirmed that home State restrictions also fall within Article 56.',
  },
  'Module_14_Lesson_14_1.m4a': {
    // Remedies in Tort Damages (Tort)
    cases: ['Livingstone v Rawyards Coal Co (1880) — compensatory principle'],
    examTip:
      'Always distinguish general damages (unliquidated, for pain and suffering) from special damages (liquidated, for specific financial losses) — they are pleaded and assessed differently.',
  },
  'Module_14_Lesson_14_2.m4a': {
    // Remedies in Tort Injunctions (Tort)
    cases: [
      'Campus Oil Ltd v Minister for Industry and Energy [1983] — Irish interlocutory injunction',
      'American Cyanamid Co v Ethicon Ltd [1975] — interlocutory injunction test',
    ],
    examTip:
      'Campus Oil is the Irish test for interlocutory injunctions — note it requires a fair bona fide question rather than the English serious question to be tried.',
  },
  'Module_15_Lesson_15_1.m4a': {
    // Fatal Injuries Civil Liability Act (Tort)
    cases: ['Iarnród Éireann v. Ireland [1996] — Civil Liability Act concurrent wrongdoers'],
    examTip:
      "Always distinguish the estate's claim (survival of actions) from the family's claim (fatal injuries) — they are separate heads with different bases and assessment rules.",
  },
  'Module_16_Lesson_16_1.m4a': {
    // Concurrent Wrongdoers (Tort)
    cases: [
      'Connolly v South of Ireland Asphalt Co [1977] — contribution under Civil Liability Act',
    ],
    examTip:
      'The Civil Liability Act 1961 is the foundation of Irish tort law on multiple defendants — know the distinction between concurrent and independent liability.',
  },
  'Module_16_Lesson_16_2.m4a': {
    // Vicarious Liability (Tort)
    cases: [
      'Various Claimants v Catholic Child Welfare Society (Christian Brothers) [2012] — expansion of vicarious liability',
      'Lister v Hesley Hall Ltd [2001] — close connection test',
      'Mohamud v Wm Morrison Supermarkets plc [2016] — course of employment test',
    ],
    examTip:
      'Lister v Hesley Hall extended vicarious liability to deliberate torts — the question is whether there is a sufficiently close connection between employment and the tort.',
  },
  'Module_16_Lesson_16_3.m4a': {
    // Medical Negligence Dunne (Tort)
    cases: [
      'Dunne v National Maternity Hospital [1989] — Dunne principles',
      'Walsh v. Irish Red Cross Society [2015] — duty to warn patients',
    ],
    examTip:
      'The Dunne principles are the Irish equivalent of the Bolam test — but Irish courts have moved closer to a reasonable patient standard for the duty to warn.',
  },
  'Module_01_Lesson_1.mp3': {
    // Foundations of Equity Maxims (Equity)
    cases: [
      'Walsh v Lonsdale (1882) — equity regards as done what ought to be done',
      'Dering v Earl of Winchelsea (1787) — clean hands doctrine',
    ],
    examTip:
      'FE-1 equity questions often begin with an invitation to discuss maxims — identify the relevant maxim, explain it, and apply it precisely to the facts.',
  },
  'Module_02_Lesson_1.mp3': {
    // Three Certainties Intention Subject Matter (Equity)
    cases: [
      'Knight v Knight (1840) — three certainties',
      'Re Adams and the Kensington Vestry (1884) — precatory words insufficient',
      'Palmer v Simmonds (1854) — bulk of residue not certain',
    ],
    examTip:
      'Always check all three certainties before concluding an express trust has been created — failure of any one of them is fatal to the trust.',
  },
  'Module_02_Lesson_2.mp3': {
    // Three Certainties Objects (Equity)
    cases: [
      'McPhail v Doulton [1971] — is or is not test for discretionary trusts',
      'IRC v Broadway Cottages Trust [1955] — complete list test for fixed trusts',
    ],
    examTip:
      'McPhail replaced the complete list test with the is or is not test for discretionary trusts — know which test applies to fixed vs discretionary trusts.',
  },
  'Module_04_Lesson_1.mp3': {
    // Secret Trusts (Equity)
    cases: [
      'Ottaway v Norman [1972] — fully secret trust elements',
      'Blackwell v Blackwell [1929] — half secret trust valid',
      'Re Stead [1900] — communication to all or some tenants in common',
    ],
    examTip:
      'For half secret trusts, communication must be before or at the date of the will — after is not good enough. For fully secret trusts, communication can be before or after the will but before death.',
  },
  'Module_04_Lesson_2.mp3': {
    // Mutual Wills (Equity)
    cases: ['Re Cleaver [1981] — mutual wills and constructive trust'],
    examTip:
      'The constructive trust imposed on mutual wills attaches on the death of the first testator — the survivor cannot then revoke their will.',
  },
  'Module_05_Lesson_1.mp3': {
    // Trustees Duties Investment (Equity)
    cases: [
      'Speight v Gaunt (1883) — prudent man of business standard',
      'Cowan v Scargill [1985] — investment and beneficiary interests paramount',
      'Nestle v National Westminster Bank plc [1993] — portfolio investment',
    ],
    examTip:
      'The prudent investor standard requires diversification — a trustee who fails to diversify may be personally liable for any resulting loss to the trust.',
  },
  'Module_05_Lesson_2.mp3': {
    // Trustees Duties No Profit (Equity)
    cases: [
      'Keech v Sandford (1726) — trustee cannot renew lease for own benefit',
      'Boardman v Phipps [1967] — information used by fiduciary constructive trust',
      'Regal (Hastings) Ltd v Gulliver [1942] — directors accountable for profits',
    ],
    examTip:
      'The no-profit rule is strict and does not require dishonesty or harm — liability arises even where the fiduciary acted honestly and the principal benefited.',
  },
  'Module_05_Lesson_3.mp3': {
    // Trustees Powers (Equity)
    cases: ["Re Pauling's Settlement Trusts [1964] — consent of beneficiaries as defence"],
    examTip:
      'The power of maintenance applies to income, while advancement applies to capital — always identify which power is being exercised and whether the conditions are met.',
  },
  'Module_06_Lesson_1.mp3': {
    // Resulting Trusts (Equity)
    cases: [
      'Westdeutsche Landesbank Girozentrale v Islington LBC [1996] — resulting trust principles',
      'Dyer v Dyer (1788) — purchase money resulting trust',
      'W v Ireland (No 2) [1997] — Irish resulting trust in family home',
    ],
    examTip:
      'The presumption of advancement from husband to wife has been weakened — modern courts look at all the evidence. In Irish family home disputes, W v Ireland is the key authority.',
  },
  'Module_07_Lesson_1.mp3': {
    // Constructive Trusts (Equity)
    cases: [
      'Gissing v Gissing [1971] — common intention constructive trust',
      'Lloyds Bank Ltd v Bundy [1975] — family home and constructive trust',
      'Keane v Keane [1978] — Irish constructive trust in family home',
    ],
    examTip:
      'Lloyds Bank v Rosset distinguishes express bargain from inferred common intention — only direct contributions to purchase price infer common intention in the absence of an agreement.',
  },
  'Module_07_Lesson_2.mp3': {
    // Constructive Trusts Proprietary Estoppel (Equity)
    cases: [
      'Crabb v Arun District Council [1976] — assurance of right of way',
      'Gillett v Holt [2001] — clear and unequivocal assurance required',
      'Smyth v Halpin [1997] — Irish proprietary estoppel',
    ],
    examTip:
      'Proprietary estoppel can be used as a sword unlike promissory estoppel — it can establish a positive right. But the remedy is discretionary and proportionate.',
  },
  'Module_08_Lesson_2.mp3': {
    // Third Party Liability Knowing Receipt (Equity)
    cases: [
      'Royal Brunei Airlines v Tan [1995] — dishonest assistance reshaped',
      'Eagle Trust plc v SBC Securities Ltd [1992] — knowing receipt',
    ],
    examTip:
      'Knowing receipt and dishonest assistance are distinct — knowing receipt requires unconscionable retention of trust property, dishonest assistance requires dishonest participation in a breach.',
  },
  'Module_09_Lesson_1.mp3': {
    // Injunctions Campus Oil (Equity)
    cases: [
      'Campus Oil Ltd v Minister for Industry and Energy [1983] — Irish interlocutory test',
      'American Cyanamid Co v Ethicon Ltd [1975] — interlocutory injunction',
      'Mareva Compania Naviera SA v International Bulkcarriers SA [1980] — Mareva injunction',
    ],
    examTip:
      'Campus Oil is the Irish test — it requires a fair bona fide question rather than the English serious question. Know this distinction for FE-1 equity answers.',
  },
  'Module_Bonus_Lesson_1.mp3': {
    // Equity Bonus
    cases: [],
    examTip: '',
  },
  'Module_10_Lesson_10_2_b.m4a': {
    // Defence of the Dwelling Part 1b (Criminal Law)
    cases: ['The People (DPP) v Barnes [2007] — dwelling defence'],
    examTip:
      'The Criminal Law (Defence and the Dwelling) Act 2011 reversed the burden — a person who uses force in defence of their dwelling is presumed to have acted reasonably unless the prosecution proves otherwise.',
  },
  'Module_3_Lesson_3_1_b.m4a': {
    // Mens Rea Part 1b (Criminal Law)
    cases: [
      'The People (DPP) v Murray [1977] — intention in Irish criminal law',
      'DPP v Majewski [1977] — intoxication and mens rea',
    ],
    examTip:
      'Getting mens rea right is the difference between a pass and a fail in most FE-1 criminal scenarios.',
  },
  'Module_9_Lesson_1.m4a': {
    // Conspiracy Incitement Attempt (Criminal Law)
    cases: [
      'The People (DPP) v Maguire [1995] — conspiracy in Irish law',
      'R v Sheehan and Moore [1975] — intoxication and inchoate offences',
    ],
    examTip:
      'Impossibility is a defence to attempt in Irish law — always consider it where the facts involve an impossible attempt.',
  },
  'Module_9_Lesson_2.mp3': {
    // Article 110 Internal Taxation (EU)
    cases: [
      'Humblot v Directeur des Services Fiscaux [1985] — discriminatory car tax',
      'Commission v France (Spanish Strawberries) [1997] — Article 110 and indirect protection',
    ],
    examTip:
      'Article 110 has two limbs — direct discrimination on similar goods and indirect protection on competing goods. Always identify which limb applies to the facts.',
  },
  'Module_9_Lesson_3.mp3': {
    // Quantitative Restrictions MEQRs (EU)
    cases: [
      'Procureur du Roi v Benoît and Gustave Dassonville [1974] — MEE definition',
      'Rewe-Zentral AG v Bundesmonopolverwaltung für Branntwein (Cassis de Dijon) [1979] — mutual recognition',
      'Criminal Proceedings against Keck and Mithouard [1993] — selling arrangements',
    ],
    examTip:
      'Keck is essential — certain selling arrangements that apply without distinction to domestic and imported goods are not MEEs. Distinguish product requirements from selling arrangements.',
  },
  'Module_9_Lesson_4.mp3': {
    // Article 36 Justifications (EU)
    cases: [
      'Commission v Germany (Beer Purity Law) [1987] — rule of reason does not apply to discriminatory measures',
      'R v Henn and Darby [1979] — public morality derogation',
    ],
    examTip:
      'The rule of reason applies only to indistinctly applicable measures — overtly discriminatory measures can only be saved by Treaty derogations under Article 36.',
  },
  'Module_1_Lesson_1.mp3': {
    // History Bunreacht (Constitutional) - also Origins EU Integration - also What is Tort Law (Tort)
    cases: ['McGee v. The Attorney General [1974] — historical/purposive interpretation'],
    examTip:
      'When interpreting constitutional provisions, remember that Irish courts apply multiple methodologies — literal, purposive, natural law, and historical. State which approach supports your argument.',
  },
  'Module_1_Lesson_2.mp3': {
    // Constitutional Interpretation - also Single European Act Lisbon (EU) - also FE-1 Strategy Tort (Tort)
    cases: [
      'State (Healy) v. Donoghue [1976] — purposive and natural law interpretation',
      'McGee v. The Attorney General [1974] — unenumerated rights through natural law',
      'Norris v. Attorney General [1984] — competing interpretive approaches',
    ],
    examTip:
      'In FE-1 constitutional answers, always acknowledge competing interpretive approaches before settling on the most persuasive one for the facts given.',
  },
  'Module_1_Lesson_3.mp3': {
    // Amendment Articles 46 47 (Constitutional) - also Brexit Article 50 (EU)
    cases: [
      'Crotty v An Taoiseach [1987] — referendum required for Single European Act',
      'McKenna v. An Taoiseach (No. 2) [1995] — State neutrality in referendum campaigns',
    ],
    examTip:
      'The Crotty principle is critical — any transfer of sovereignty under an EU or international treaty requires a referendum.',
  },
};

// ─────────────────────────────────────────────────────────────────
// MAIN SEED
// ─────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Starting podcast seed...');

  if (!fs.existsSync(UPLOADED_JSON)) {
    throw new Error(`uploaded-podcasts.json not found at: ${UPLOADED_JSON}`);
  }
  if (!fs.existsSync(CLIENT_JSON)) {
    throw new Error(`episodes-meta.json not found at: ${CLIENT_JSON}`);
  }

  const uploaded: any[] = JSON.parse(fs.readFileSync(UPLOADED_JSON, 'utf-8'));
  const clientData: any[] = JSON.parse(fs.readFileSync(CLIENT_JSON, 'utf-8'));

  console.log(`📂 Loaded ${uploaded.length} entries from uploaded-podcasts.json`);
  console.log(`📂 Loaded ${clientData.length} entries from episodes-meta.json`);

  // Build lookup map from client JSON by filename
  const clientMap = new Map<string, any>();
  for (const item of clientData) {
    clientMap.set(item.filename, item);
  }

  // Clear existing podcasts
  await prisma.podcast.deleteMany();
  console.log('🗑  Cleared existing podcasts');

  let created = 0;
  let skipped = 0;
  let noMatch = 0;

  for (const entry of uploaded) {
    if (!entry.audioUrl) {
      console.log(`⚠ Skipping ${entry.originalFile} — no audioUrl`);
      skipped++;
      continue;
    }

    // Match by filename
    const clientEntry = clientMap.get(entry.originalFile);

    if (!clientEntry) {
      console.log(`⚠ No client JSON match for: ${entry.originalFile}`);
      noMatch++;
    }

    // Title from client JSON — never guess
    const title = clientEntry?.title ?? entry.title ?? entry.fileName;

    // Concepts from client JSON episodeNotes
    // Split into sentences as bullet points
    let concepts: string[] = [];
    if (clientEntry?.episodeNotes) {
      concepts = clientEntry.episodeNotes
        .split(/(?<=[.!?])\s+/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 10);
    }

    // Cases and examTip from EXTRA_META keyed by originalFile
    const extra = EXTRA_META[entry.originalFile];
    const cases: string[] = extra?.cases ?? [];
    const examTip: string | null = extra?.examTip ?? null;

    await prisma.podcast.create({
      data: {
        title,
        subjectName: entry.subjectName,
        subjectColor: entry.subjectColor,
        audioUrl: entry.audioUrl,
        publicId: entry.publicId,
        duration: entry.duration ?? 0,
        thumbnail: THUMBNAIL,
        moduleNumber: entry.moduleNumber,
        lessonNumber: entry.lessonNumber,
        part: entry.part,
        isBonus: entry.isBonus ?? false,
        notes: { concepts, cases },
        examTip,
        order: entry.order,
        isPublished: true,
      },
    });

    created++;
    if (created % 20 === 0) {
      console.log(`  ✅ ${created} podcasts seeded...`);
    }
  }

  console.log(`\n✅ Seed complete`);
  console.log(`   Created:  ${created}`);
  console.log(`   Skipped:  ${skipped} (no audioUrl)`);
  console.log(`   No match: ${noMatch} (not in client JSON)`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
