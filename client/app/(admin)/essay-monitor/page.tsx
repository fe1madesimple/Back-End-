"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  BookOpen,
  BarChart2,
  Users,
  TrendingUp,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/lib/usePagination";
import styles from "./essay-monitor.module.css";

// ─── TYPES ──────────────────────────────────────────────────────────────────

type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "info";
};
type Tab = "lesson" | "practice" | "simulation";

interface EssayAttempt {
  id: string;
  userName: string;
  userEmail: string;
  subject: string;
  subjectColor: string;
  lessonTitle?: string;
  questionText: string;
  answerText: string;
  wordCount: number;
  timeTakenSeconds: number;
  aiScore: number | null;
  band: string | null;
  feedback: { summary: string } | null;
  strengths: string[];
  improvements: string[];
  sampleAnswer: string | null;
  tokensUsed: number;
  aiModel: string;
  date: string;
  source: string;
  essayQuestionId?: string;
}

interface PracticeSession {
  id: string;
  userName: string;
  userEmail: string;
  subject: string;
  subjectColor: string;
  year: number;
  questionIds: string[];
  essayAttemptIds: string[];
  totalTimeSeconds: number | null;
  completed: boolean;
  startedAt: string;
}

interface SimulationAttemptItem {
  questionIndex: number;
  questionText: string;
  answerText: string;
  wordCount: number;
  timeTakenSeconds: number;
  aiScore: number | null;
  band: string | null;
  feedback: { summary: string } | null;
  strengths: string[];
  improvements: string[];
  sampleAnswer: string | null;
}

interface Simulation {
  id: string;
  userName: string;
  userEmail: string;
  subject: string;
  subjectColor: string;
  year: number;
  questionIds: string[];
  essayAttemptIds: string[];
  score: number;
  passed: boolean;
  failReason: string | null;
  totalTimeSeconds: number | null;
  startedAt: string;
  attempts: SimulationAttemptItem[];
}

// ─── REAL DUMMY DATA ─────────────────────────────────────────────────────────

const lessonEssayData: EssayAttempt[] = [
  {
    id: "le1",
    userName: "Aoife Murphy",
    userEmail: "aoife@example.com",
    subject: "Tort Law",
    subjectColor: "#B38513",
    lessonTitle: "Negligence — Standard of Care",
    questionText:
      "Discuss the standard of care in negligence under Irish law. In your answer, analyse the objective test applied by the courts, the relevance of special skills and professions, and the extent to which foreseeability of harm influences the standard applied.",
    answerText:
      "The standard of care in negligence is an objective one, measured by reference to the reasonable person test as established in Blyth v Birmingham Waterworks Co [1856]. The standard asks what the reasonable person would have done in the circumstances, not what the particular defendant was capable of doing. This means that personal incapacity, inexperience or ignorance will not lower the standard of care expected.\n\nIn Irish law, the standard is modified for professionals and those possessing special skills. In such cases, the standard is that of the reasonably competent professional in that field, as established in Dunne v National Maternity Hospital [1989] where the Supreme Court held that a medical practitioner must act in accordance with the practice accepted as proper by a responsible body of medical practitioners skilled in that particular art.\n\nForeseeability of harm is a central consideration in fixing the standard. In Bolton v Stone [1951], the House of Lords held that a low probability of injury could justify a lower standard of precaution. The courts undertake a balancing exercise weighing the probability of harm, the severity of the harm if it materialises, the cost of precautions and the social utility of the activity.\n\nIn Ireland, the courts have refined the approach in cases such as Purtill v Athlone UDC [1968] where it was established that the standard must be viewed in light of all the circumstances known to the defendant. The defendant need not guard against every conceivable risk but only those which a reasonable person would foresee as a real risk.",
    wordCount: 248,
    timeTakenSeconds: 1320,
    aiScore: 78,
    band: "Merit",
    feedback: {
      summary:
        "A well-structured answer demonstrating solid understanding of the objective standard of care. Good use of case law including Blyth and Dunne. The answer would benefit from more depth on the professional standard particularly the Bolam/Dunne distinction, and a more developed treatment of the balancing factors from Bolton v Stone.",
    },
    strengths: [
      "Clear identification and explanation of the objective reasonable person test with accurate citation of Blyth v Birmingham Waterworks Co",
      "Good treatment of the modified standard for professionals with correct citation of Dunne v National Maternity Hospital",
      "Sensible structure moving from general standard to special cases to foreseeability",
      "Relevant Irish authority cited including Purtill v Athlone UDC",
    ],
    improvements: [
      "The treatment of the Bolam test and its Irish reception could be developed further — consider how the Irish courts have moved away from pure Bolam deference post-Dunne",
      "The balancing factors from Bolton v Stone are identified but not applied with sufficient depth — expand the analysis of probability, severity, cost and utility",
      "Missing reference to the learned hand formula or its equivalent in Irish jurisprudence",
      "Conclusion is absent — a brief synthesis of how the standard operates as a control mechanism in negligence would strengthen the answer",
    ],
    sampleAnswer:
      "The standard of care in negligence is an objective one assessed by reference to the conduct of the reasonable person in the same circumstances as the defendant. This was established in Blyth v Birmingham Waterworks Co [1856] where Alderson B defined negligence as 'the omission to do something which a reasonable man, guided by those considerations which ordinarily regulate the conduct of human affairs, would do, or doing something which a prudent and reasonable man would not do'.\n\nThe objective nature of the standard means that it is not reduced by the personal incapacity or inexperience of the defendant. A learner driver, for example, is held to the standard of the reasonably competent driver as established in Nettleship v Weston [1971]. This ensures that tort law prioritises the protection of victims over the subjective capabilities of defendants.\n\nWhere the defendant possesses special skills or acts in a professional capacity, the standard is adjusted upward to that of the reasonably competent professional. In Ireland, Dunne v National Maternity Hospital [1989] is the leading authority. Finlay CJ held that a medical practitioner is not negligent where they act in accordance with the practice accepted as proper by a responsible body of medical practitioners of like specialisation and skill. This represents the Irish formulation of the Bolam test from Bolam v Friern Hospital Management Committee [1957]. Importantly, however, the Irish courts require that the accepted practice itself be defensible — it must not be irresponsible or unreasonable.\n\nForeseeability of harm is a key element in fixing the appropriate standard. The courts conduct a balancing exercise examining the probability of harm materialising, the severity of potential harm, the burden of precautions required, and the social utility of the defendant's conduct. In Bolton v Stone [1951], the House of Lords held that where the risk of injury was extremely low, the defendant was not required to take precautions that would be disproportionate to that risk. The defendant need only guard against real and reasonably foreseeable risks, not every conceivable possibility.",
    tokensUsed: 1847,
    aiModel: "Claude-3.7",
    date: new Date(Date.now() - 86400000).toISOString(),
    source: "LESSON",
    essayQuestionId: "eq1",
  },
  {
    id: "le2",
    userName: "Ciarán O'Brien",
    userEmail: "ciaran@example.com",
    subject: "Contract Law",
    subjectColor: "#FDC300",
    lessonTitle: "Offer and Acceptance",
    questionText:
      "Discuss the rules governing offer and acceptance in Irish contract law. In your answer, consider the distinction between an offer and an invitation to treat, the postal rule, and the circumstances in which an offer may be revoked.",
    answerText:
      "An offer is a definite proposal to contract on specified terms which, when accepted, will give rise to a binding agreement. It must be distinguished from an invitation to treat which is merely an invitation to make an offer. The distinction was established in Carlill v Carbolic Smoke Ball Co [1893] where the Court of Appeal held that an advertisement could in some circumstances constitute a binding offer.\n\nIn Irish law, the courts have applied the objective test to determine whether an offer exists. Shop displays are generally treated as invitations to treat rather than offers, as in Fisher v Bell [1961]. Similarly, advertisements are generally invitations to treat unless they are clear, definite and leave nothing open for negotiation.\n\nAcceptance must be unequivocal and communicated to the offeror. It must correspond exactly to the terms of the offer — a purported acceptance which introduces new terms amounts to a counter-offer which destroys the original offer as held in Hyde v Wrench [1840].\n\nThe postal rule provides that acceptance is effective when the letter is posted rather than when it is received, as established in Adams v Lindsell [1818]. This rule applies only where posting is a contemplated means of acceptance and may be excluded by the offeror.\n\nAn offer may be revoked at any time before acceptance provided that revocation is communicated to the offeree. In Byrne v Van Tienhoven [1880], it was held that a postal revocation is not effective until communicated, even if posted before acceptance.",
    wordCount: 230,
    timeTakenSeconds: 1100,
    aiScore: 65,
    band: "Pass",
    feedback: {
      summary:
        "A competent answer covering the main elements of offer and acceptance. The case citations are mostly accurate and the structure is logical. However, the answer lacks sufficient depth on several points and misses some important authorities. Greater analysis and application would improve the grade significantly.",
    },
    strengths: [
      "Correct identification of the offer/invitation to treat distinction with reference to Carlill",
      "Accurate statement of the postal rule with correct citation of Adams v Lindsell",
      "Good treatment of revocation with reference to Byrne v Van Tienhoven",
      "Logical structure following the sequence of offer, acceptance, postal rule, revocation",
    ],
    improvements: [
      "The treatment of the invitation to treat distinction needs more depth — Pharmaceutical Society of GB v Boots [1953] and Partridge v Crittenden [1968] are important authorities that should be discussed",
      "No mention of termination of offers other than revocation — lapse of time, death of offeror and rejection should be addressed",
      "The counter-offer analysis is brief — a fuller treatment of the battle of the forms would demonstrate higher-level understanding",
      "Missing discussion of instantaneous communications and whether the postal rule applies to email and electronic acceptances under the Electronic Commerce Act 2000",
    ],
    sampleAnswer: null,
    tokensUsed: 1623,
    aiModel: "Claude-3.7",
    date: new Date(Date.now() - 172800000).toISOString(),
    source: "LESSON",
    essayQuestionId: "eq2",
  },
  {
    id: "le3",
    userName: "Siobhán Kelly",
    userEmail: "siobhan@example.com",
    subject: "Constitutional Law",
    subjectColor: "#961C81",
    lessonTitle: "Personal Rights and Article 40.3",
    questionText:
      "Analyse the constitutional protection of personal rights under Article 40.3 of the Irish Constitution. In your answer discuss unenumerated rights, the proportionality test and limitations on personal rights.",
    answerText:
      "Article 40.3 of the Irish Constitution guarantees the personal rights of citizens. The courts have interpreted this provision expansively to protect both enumerated rights expressly listed in the Constitution and unenumerated rights derived from the natural law or the Christian democratic tradition.\n\nThe doctrine of unenumerated rights was established in Ryan v Attorney General [1965] where Kenny J held that Article 40.3 protected a right to bodily integrity not expressly mentioned in the Constitution. Subsequently the courts have recognised a wide range of unenumerated rights including the right to earn a livelihood, the right to privacy, the right to marry and the right to travel.\n\nThe State may justify limitations on personal rights where there is a proportionate relationship between the limitation and a legitimate aim. The proportionality test in Irish constitutional law was articulated in Heaney v Ireland [1994] where Costello J applied a three-part test asking whether the limitation is rationally connected to a legitimate objective, whether it impairs the right as little as possible and whether the effects of the limitation are proportionate to its benefits.",
    wordCount: 178,
    timeTakenSeconds: 980,
    aiScore: 55,
    band: "Pass",
    feedback: {
      summary:
        "A basic answer that identifies the key concepts but lacks the depth and analytical rigour expected at FE-1 level. The treatment of unenumerated rights is too brief and the proportionality analysis is incomplete. More case law and a more developed analytical framework are needed.",
    },
    strengths: [
      "Correct identification of the distinction between enumerated and unenumerated rights",
      "Accurate citation of Ryan v Attorney General as the foundational unenumerated rights case",
      "Good identification of the Heaney v Ireland proportionality test",
    ],
    improvements: [
      "The answer is too short — 178 words is insufficient for an FE-1 essay question of this scope",
      "The unenumerated rights doctrine needs more depth — discuss the controversy over natural law methodology and the shift in approach post-2010",
      "Missing discussion of the conflict between unenumerated rights and democratic legislation",
      "The proportionality test is identified but not applied to any concrete example — use a real case to demonstrate its operation",
      "Missing reference to the European Convention on Human Rights Act 2003 and how ECHR rights interact with constitutional rights",
    ],
    sampleAnswer: null,
    tokensUsed: 1205,
    aiModel: "Claude-3.7",
    date: new Date(Date.now() - 259200000).toISOString(),
    source: "LESSON",
    essayQuestionId: "eq3",
  },
];

const practiceSessionData: PracticeSession[] = [
  {
    id: "ps1",
    userName: "Siobhán Kelly",
    userEmail: "siobhan@example.com",
    subject: "Criminal Law",
    subjectColor: "#E6027D",
    year: 2023,
    questionIds: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
    essayAttemptIds: ["le1", "le2"],
    totalTimeSeconds: 2100,
    completed: true,
    startedAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "ps2",
    userName: "Declan Byrne",
    userEmail: "declan@example.com",
    subject: "Tort Law",
    subjectColor: "#B38513",
    year: 2024,
    questionIds: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
    essayAttemptIds: ["le3"],
    totalTimeSeconds: null,
    completed: false,
    startedAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: "ps3",
    userName: "Aoife Murphy",
    userEmail: "aoife@example.com",
    subject: "Contract Law",
    subjectColor: "#FDC300",
    year: 2022,
    questionIds: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
    essayAttemptIds: ["le1", "le2", "le3"],
    totalTimeSeconds: 3600,
    completed: true,
    startedAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: "ps4",
    userName: "Ciarán O'Brien",
    userEmail: "ciaran@example.com",
    subject: "EU Law",
    subjectColor: "#009DDD",
    year: 2023,
    questionIds: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
    essayAttemptIds: ["le2"],
    totalTimeSeconds: 2800,
    completed: true,
    startedAt: new Date(Date.now() - 518400000).toISOString(),
  },
  {
    id: "ps5",
    userName: "Róisín Doyle",
    userEmail: "roisin@example.com",
    subject: "Constitutional Law",
    subjectColor: "#961C81",
    year: 2024,
    questionIds: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
    essayAttemptIds: [],
    totalTimeSeconds: null,
    completed: false,
    startedAt: new Date(Date.now() - 604800000).toISOString(),
  },
];

const simulationData: Simulation[] = [
  {
    id: "sim1",
    userName: "Fionnuala Walsh",
    userEmail: "fionnuala@example.com",
    subject: "EU Law",
    subjectColor: "#009DDD",
    year: 2024,
    questionIds: ["q1", "q2", "q3"],
    essayAttemptIds: ["le1", "le2", "le3"],
    score: 72,
    passed: true,
    failReason: null,
    totalTimeSeconds: 3600,
    startedAt: new Date(Date.now() - 345600000).toISOString(),
    attempts: [
      {
        questionIndex: 0,
        questionText:
          "Examine the doctrine of direct effect in EU law. In your answer, trace the development of the doctrine from Van Gend en Loos through to the present day, distinguish between vertical and horizontal direct effect, analyse the conditions necessary for a provision to have direct effect, and critically assess whether the current approach of the Court of Justice is coherent.",
        answerText:
          "The doctrine of direct effect was established in Van Gend en Loos v Nederlandse Administratie der Belastingen [1963] where the Court of Justice held that Article 12 EEC (now Article 30 TFEU) created rights which individuals could rely upon directly before national courts. The Court reasoned that the EEC Treaty was not merely an agreement between states but a new legal order for the benefit of which states have limited their sovereign rights and the subjects of which comprise not only Member States but also their nationals.\n\nFor a provision to have direct effect it must be clear and precise, unconditional and not requiring implementing measures by Member States or EU institutions. These criteria were refined in subsequent cases and apply to both Treaty provisions and secondary legislation.\n\nVertical direct effect allows individuals to rely on EU law against the State or emanations of the State. In Marshall v Southampton AHA [1986], the Court held that directives could have vertical but not horizontal direct effect — they could not be relied upon against private parties. This limitation was justified on the basis that directives are addressed to Member States.\n\nThe distinction between vertical and horizontal direct effect has been criticised for creating inequality depending on whether the defendant is a public or private body. The Court has developed alternative doctrines to mitigate this including indirect effect, State liability under Francovich, and the horizontal direct effect of general principles of EU law.",
        wordCount: 218,
        timeTakenSeconds: 1800,
        aiScore: 75,
        band: "Merit",
        feedback: {
          summary:
            "A strong answer demonstrating good knowledge of the doctrine of direct effect. The historical development from Van Gend en Loos is well-traced and the vertical/horizontal distinction is clearly explained. The critical assessment of the limitations of the doctrine through the Marshall decision is accurate and shows analytical ability.",
        },
        strengths: [
          "Excellent opening with accurate citation of Van Gend en Loos and clear statement of the new legal order principle",
          "Correct identification of the three conditions for direct effect — clarity, unconditionality and no implementing measures required",
          "Good treatment of the vertical/horizontal direct effect distinction with accurate citation of Marshall v Southampton AHA",
          "Awareness of the doctrines developed to mitigate the limitations of horizontal direct effect",
        ],
        improvements: [
          "The conditions for direct effect need more elaboration — discuss how the 'sufficiently precise' condition has been interpreted in cases like Ratti",
          "The treatment of general principles having horizontal direct effect could be developed further with reference to Mangold and Kücükdeveci",
          "The critical assessment of coherence is brief — develop the argument about the arbitrary distinction between public and private defendants more fully",
        ],
        sampleAnswer:
          "The doctrine of direct effect is foundational to the EU legal order. Established in Van Gend en Loos v Nederlandse Administratie der Belastingen [1963], it provides that certain EU law provisions create rights that individuals may enforce directly before national courts without the need for implementing national legislation. The Court justified this on the basis that the EEC Treaty created a new legal order of international law for the benefit not only of Member States but also of their nationals.\n\nFor a Treaty provision to have direct effect it must satisfy three conditions: it must be clear and precise in its terms; it must be unconditional, meaning it must not be subject to any reservation; and it must not require implementing measures by Member States or EU institutions. These criteria were articulated by the Court in its early jurisprudence and have been applied across different types of EU law norms.\n\nThe concept of vertical direct effect allows individuals to invoke EU law against the State or bodies sufficiently connected to the State. The definition of what constitutes an emanation of the State was considered in Foster v British Gas [1990] where the Court articulated a multi-factor test including whether the body provides a public service under State control.\n\nHorizontal direct effect — the ability to invoke EU law directly against private parties — is more limited. In Marshall v Southampton and South West Hampshire AHA [1986], the Court held that directives cannot have horizontal direct effect. This distinction has been criticised as creating an anomaly where the same provision may be relied upon against a public employer but not a private one.",
      },
      {
        questionIndex: 1,
        questionText:
          "Critically discuss the principle of State liability in EU law as established in Francovich v Italy. In your answer, analyse the three conditions for State liability, consider how the principle has been developed in subsequent case law, and assess its significance for the enforcement of EU law.",
        answerText:
          "State liability in EU law was established in Francovich and Bonifaci v Italy [1991] where the Court of Justice held that Member States could be liable in damages to individuals for breach of their EU law obligations. The applicants had suffered loss as a result of Italy's failure to implement the Insolvency Protection Directive within the required period.\n\nThe Court identified three conditions for State liability: the rule of EU law infringed must be intended to confer rights on individuals; the breach must be sufficiently serious; and there must be a direct causal link between the breach and the damage suffered.\n\nThe conditions were elaborated in Brasserie du Pêcheur and Factortame III [1996] where the Court held that liability arises only where the breach is sufficiently serious, meaning the Member State manifestly and gravely disregarded the limits on its discretion. Relevant factors include the clarity of the rule, the measure of discretion left to national authorities and whether the infringement was intentional.\n\nState liability has significant implications for the enforcement of EU law. It provides an incentive for Member States to comply with their EU obligations and provides a remedy for individuals who have suffered loss through non-compliance. However, the conditions are demanding and many claims fail at the sufficiently serious threshold.",
        wordCount: 198,
        timeTakenSeconds: 1650,
        aiScore: 71,
        band: "Merit",
        feedback: {
          summary:
            "A solid answer that correctly identifies and explains the three conditions for State liability. The historical development from Francovich to Brasserie du Pêcheur is accurately traced. The critical assessment of the significance of the principle is balanced. More depth on the factors relevant to the sufficiently serious test would improve the answer.",
        },
        strengths: [
          "Accurate statement of the three conditions for State liability with correct citation of Francovich",
          "Good development of the principle through Brasserie du Pêcheur with correct identification of the sufficiently serious test",
          "Balanced critical assessment noting both the significance and the demanding nature of the conditions",
        ],
        improvements: [
          "The factors relevant to the sufficiently serious test need more elaboration — the list in Brasserie should be set out in full",
          "Missing discussion of State liability for judicial acts — the controversial Köbler case should be addressed",
          "The relationship between State liability and direct effect could be explored more — they serve different functions in the enforcement framework",
        ],
        sampleAnswer: null,
      },
      {
        questionIndex: 2,
        questionText:
          "Ireland passes the Digital Services Regulation Act 2024 which imposes restrictions on the provision of online services by companies established in other EU Member States. TechCorp, a company established in Germany, wishes to provide services to Irish customers but is prevented from doing so by the Act. Advise TechCorp as to any rights it may have under EU law, with particular reference to the free movement of services and the principle of supremacy of EU law.",
        answerText:
          "TechCorp may have rights under EU law through Article 56 TFEU which guarantees the freedom to provide services within the EU. As a company established in Germany, TechCorp falls within the personal scope of Article 56 and the restriction imposed by the Digital Services Regulation Act 2024 may constitute a restriction on the freedom to provide services.\n\nA restriction on the freedom to provide services may be justified where it pursues a legitimate objective, is applied in a non-discriminatory manner, is suitable to achieve the objective and does not go beyond what is necessary. These requirements derive from the proportionality principle and the Court's case law in Säger v Dennemeyer [1991].\n\nTechCorp may also rely on the supremacy of EU law. In Costa v ENEL [1964], the Court held that EU law takes precedence over conflicting national law and that national courts must disapply national provisions inconsistent with EU law. The Digital Services Regulation Act 2024 would be subject to this principle.\n\nIf TechCorp has suffered loss as a result of Ireland's breach of EU law, it may be entitled to claim damages under the Francovich principle provided the conditions for State liability are met.",
        wordCount: 193,
        timeTakenSeconds: 1400,
        aiScore: 69,
        band: "Pass",
        feedback: {
          summary:
            "A competent problem question answer that correctly identifies the relevant EU law principles. The identification of Article 56 TFEU and the justification framework is accurate. The treatment of supremacy and State liability is brief but correct. Greater analytical depth and more developed application to the facts would improve the grade.",
        },
        strengths: [
          "Correct identification of Article 56 TFEU as the primary provision",
          "Good identification of the justification framework with citation of Säger",
          "Accurate statement of the supremacy principle with citation of Costa v ENEL",
          "Awareness of the Francovich remedy for breach of EU law",
        ],
        improvements: [
          "The analysis of whether the Irish measure constitutes a restriction under Article 56 should be more developed — apply the facts more carefully",
          "The justification analysis needs more depth — consider whether the measure could be justified under the Digital Services Act 2022 itself",
          "Missing reference to direct effect — TechCorp could rely directly on Article 56 before Irish courts",
          "The conclusion is missing — advise TechCorp specifically on its prospects",
        ],
        sampleAnswer: null,
      },
    ],
  },
  {
    id: "sim2",
    userName: "Róisín Doyle",
    userEmail: "roisin@example.com",
    subject: "Contract Law",
    subjectColor: "#FDC300",
    year: 2024,
    questionIds: ["q1", "q2"],
    essayAttemptIds: ["le1", "le2"],
    score: 48,
    passed: false,
    failReason: "TIME_EXPIRED",
    totalTimeSeconds: 2700,
    startedAt: new Date(Date.now() - 432000000).toISOString(),
    attempts: [
      {
        questionIndex: 0,
        questionText:
          "Brendan is a sole trader who runs a small hardware business. In January he entered into a contract with SupplyCo for the delivery of 500 units of timber at a fixed price of €80 per unit. The contract was for delivery in March. In February, SupplyCo contacted Brendan and told him that due to a global shortage they could only supply 300 units and the price had increased to €110 per unit. Brendan needed the timber urgently and reluctantly agreed. When delivery was made in March, Brendan refused to pay the higher price and SupplyCo sued. Advise SupplyCo on its prospects of success in recovering the higher price from Brendan.",
        answerText:
          "This problem concerns the doctrine of consideration and the enforceability of a variation of contract. The original contract between Brendan and SupplyCo required SupplyCo to deliver 500 units at €80 per unit. The variation agreed in February purported to reduce the quantity to 300 units and increase the price to €110 per unit.\n\nThe central issue is whether the variation is supported by consideration. Under the traditional rule in Stilk v Myrick [1809], a promise to perform an existing contractual duty does not constitute good consideration for a new promise. If SupplyCo was already obliged to deliver 500 units, delivering fewer units at a higher price may not be supported by consideration.\n\nHowever, the courts have shown a willingness to find consideration in commercial renegotiations where there is a practical benefit to the promisee. In Williams v Roffey Brothers [1991], the English Court of Appeal held that a practical benefit could constitute consideration even where there was no legal benefit. Irish courts have not definitively adopted this approach.\n\nThe issue of economic duress may also be relevant. If SupplyCo threatened non-performance in order to extract the higher price, the variation may be voidable on grounds of duress.",
        wordCount: 196,
        timeTakenSeconds: 2400,
        aiScore: 52,
        band: "Pass",
        feedback: {
          summary:
            "Reasonable identification of issues but analysis is incomplete due to time expiry.",
        },
        strengths: [
          "Correct identification of the consideration issue",
          "Good citation of Stilk v Myrick",
          "Awareness of Williams v Roffey and its limitations in Irish law",
        ],
        improvements: [
          "The answer was not completed — the economic duress analysis needed to be developed fully",
          "Missing application of the promissory estoppel doctrine which is highly relevant",
          "No conclusion advising SupplyCo specifically",
        ],
        sampleAnswer: null,
      },
      {
        questionIndex: 1,
        questionText:
          "Critically assess the role of consideration in the formation of a contract under Irish law. In your answer, discuss the rules relating to consideration, the exceptions to the requirement of consideration, and whether the current law strikes an appropriate balance between the needs of commercial certainty and fairness.",
        answerText:
          "Consideration is one of the essential elements of a binding contract under Irish law. It requires that each party to the contract give something of value in exchange for the other's promise. The doctrine was articulated by Lush J in Currie v Misa [1875] as a right, interest, profit or benefit accruing to one party or some forbearance, detriment, loss or responsibility given by the other.\n\nThe rules of consideration include the requirement that consideration must not be past. In Roscorla v Thomas [1842], a warranty given after a contract of sale was held unenforceable for want of consideration. The rule prevents parties from enforcing gratuitous promises made after the event.",
        wordCount: 118,
        timeTakenSeconds: 300,
        aiScore: 38,
        band: "Fail",
        feedback: {
          summary:
            "Answer incomplete — time expired before substantive analysis could be completed.",
        },
        strengths: [
          "Correct definition of consideration from Currie v Misa",
          "Accurate citation of the past consideration rule",
        ],
        improvements: [
          "Answer is far too short due to time expiry — a complete answer needs 400+ words",
          "The exceptions to consideration including promissory estoppel, deeds and statutory modifications were not addressed",
          "No critical assessment of whether the law strikes the right balance",
        ],
        sampleAnswer: null,
      },
    ],
  },
  {
    id: "sim3",
    userName: "Pádraig Sullivan",
    userEmail: "padraig@example.com",
    subject: "Criminal Law",
    subjectColor: "#E6027D",
    year: 2023,
    questionIds: ["q1", "q2", "q3", "q4", "q5"],
    essayAttemptIds: ["le1", "le2", "le3"],
    score: 81,
    passed: true,
    failReason: null,
    totalTimeSeconds: 5400,
    startedAt: new Date(Date.now() - 172800000).toISOString(),
    attempts: [
      {
        questionIndex: 0,
        questionText:
          "Critically evaluate the law on intoxication as a defence in Irish criminal law. In your answer, distinguish between voluntary and involuntary intoxication, the distinction between crimes of specific and basic intent, and the extent to which Irish law has followed the approach of the English courts.",
        answerText:
          "Intoxication as a defence in criminal law raises fundamental questions about the relationship between voluntary conduct and criminal liability. The defence operates differently depending on whether the intoxication is voluntary or involuntary and whether the offence charged is one of specific or basic intent.\n\nVoluntary intoxication arises where the defendant has chosen to consume alcohol or drugs. Where the defendant is so intoxicated that they could not form the mens rea for a crime of specific intent, the intoxication may afford a partial defence. In DPP v Beard [1920], the House of Lords held that intoxication could negative specific intent and reduce a charge of murder to manslaughter.\n\nThe distinction between specific and basic intent was elaborated in DPP v Majewski [1977] where the House of Lords held that voluntary intoxication is no defence to crimes of basic intent. The rationale is that the recklessness involved in becoming voluntarily intoxicated satisfies the mens rea for basic intent offences. Majewski has been applied in Ireland.\n\nInvoluntary intoxication is a more complete defence. Where the defendant has been surreptitiously drugged or has taken a prescribed substance without knowledge of its intoxicating properties, the intoxication may afford a full defence even to crimes of basic intent.\n\nIn Ireland, the People (DPP) v Murray [1977] addressed intention in criminal law and the courts have generally followed the English approach while recognising that Irish law retains its own constitutional dimension particularly in relation to the mental element required for serious offences.",
        wordCount: 248,
        timeTakenSeconds: 1800,
        aiScore: 84,
        band: "Distinction",
        feedback: {
          summary:
            "An excellent answer demonstrating thorough knowledge of the intoxication defence. The voluntary/involuntary distinction is clearly explained and the specific/basic intent analysis is accurate. The Irish dimension including Murray is correctly identified. This is a high-quality FE-1 answer.",
        },
        strengths: [
          "Excellent opening contextualising the defence within criminal liability principles",
          "Accurate and detailed treatment of the voluntary intoxication defence with correct citation of Beard",
          "Clear and accurate explanation of the specific/basic intent distinction from Majewski",
          "Good Irish dimension with reference to Murray and the constitutional element",
          "Correct treatment of involuntary intoxication as a fuller defence",
        ],
        improvements: [
          "The reform dimension could be addressed — the Law Commission proposals and the academic criticism of the Majewski distinction",
          "More could be said about the Irish constitutional requirement for mens rea and how it affects the analysis",
        ],
        sampleAnswer: null,
      },
      {
        questionIndex: 1,
        questionText:
          "Discuss the mens rea requirements for murder under Irish law. In your answer, analyse the concept of intention, the distinction between direct and oblique intent, the role of recklessness, and the impact of the Criminal Justice Act 1964 on the law of murder in Ireland.",
        answerText:
          "Murder in Irish law requires proof of malice aforethought which under the Criminal Justice Act 1964 means an intention to kill or cause serious injury. Section 4 of the Act abolished the old common law concept of implied malice and replaced it with a statutory formulation based on intention.\n\nDirect intent exists where the defendant's purpose is to bring about the prohibited consequence. Oblique intent — also called indirect or foresight-based intent — arises where the consequence is not the defendant's purpose but is a virtually certain consequence of their actions and the defendant is aware of this.\n\nIn The People (DPP) v Murray [1977], the Supreme Court held that the intention required for murder under the 1964 Act is subjective — it asks what the defendant actually intended rather than what a reasonable person would have intended. This represents an important departure from the objective approach.\n\nRecklessness is insufficient for murder under Irish law. The 1964 Act specifically requires intention and this has been consistently interpreted by the courts to exclude recklessness. This contrasts with the position prior to 1964 where constructive malice could ground a murder conviction.\n\nThe impact of the 1964 Act was to narrow the mens rea for murder and to bring Irish law into closer alignment with principles of fair labelling and individual culpability. The requirement for subjective intention means that only those who genuinely intended death or serious injury can be convicted of murder.",
        wordCount: 226,
        timeTakenSeconds: 1900,
        aiScore: 82,
        band: "Distinction",
        feedback: {
          summary:
            "A strong answer demonstrating thorough knowledge of the mens rea for murder.",
        },
        strengths: [
          "Accurate statement of Section 4 of the Criminal Justice Act 1964",
          "Clear explanation of direct and oblique intent",
          "Correct citation of Murray for the subjective test",
        ],
        improvements: [
          "The oblique intent analysis could be developed further with reference to English cases like Woollin and how they may influence Irish courts",
        ],
        sampleAnswer: null,
      },
      {
        questionIndex: 2,
        questionText:
          "Kevin is walking home late at night when he is approached by Dan who demands his wallet. Kevin refuses and Dan produces a knife. Kevin, a trained martial arts expert, disarms Dan, injuring him significantly in doing so. Kevin then ties Dan to a lamppost and phones the Gardaí. While waiting for the Gardaí, Kevin kicks Dan several times in the ribs because, as Kevin later says, he was frightened Dan would escape. Dan suffered a broken wrist from the disarming, three broken ribs from the kicking and significant bruising. Advise Kevin as to his criminal liability.",
        answerText:
          "Kevin's potential criminal liability arises from two distinct courses of conduct: the initial disarming of Dan and the subsequent kicking. These must be analysed separately as they may attract different defences.\n\nRegarding the disarming, Kevin may rely on the defence of self-defence. The defence is available at common law and requires that the force used was reasonable in the circumstances. In The People v Dwyer [1972], the Irish courts held that the test is whether the defendant honestly and reasonably believed that force was necessary and whether the degree of force used was proportionate. As Kevin was faced with a knife attack, the use of force to disarm Dan was likely justified.\n\nThe kicking of Dan after he was tied to the lamppost is more problematic. At this point Dan was restrained and posed no continuing threat. The defence of self-defence requires an imminent threat — Kevin cannot rely on a purely hypothetical risk of escape to justify continuing to use force. The kicking appears to go well beyond what was necessary and proportionate.\n\nKevin may therefore face criminal liability for the injuries caused by the kicking. The charge would depend on the severity of the injuries — assault causing harm or causing serious harm under the Non-Fatal Offences Against the Person Act 1997. The broken ribs could constitute serious harm.",
        wordCount: 213,
        timeTakenSeconds: 1700,
        aiScore: 79,
        band: "Merit",
        feedback: {
          summary:
            "Excellent analysis of the self-defence issue with accurate application to the facts.",
        },
        strengths: [
          "Correct identification of the need to analyse the two phases of conduct separately",
          "Accurate statement of the self-defence test from Dwyer",
          "Good analysis of why the kicking cannot be justified by self-defence",
        ],
        improvements: [
          "The specific charges under the 1997 Act should be identified with more precision — consider s.3 (assault causing harm) and s.4 (causing serious harm) separately",
        ],
        sampleAnswer: null,
      },
      {
        questionIndex: 3,
        questionText:
          "Critically discuss the general defences available to an accused in Irish criminal law. In your answer, analyse the defences of self-defence, duress and necessity with reference to relevant Irish and English case law.",
        answerText:
          "The general defences in criminal law operate as excuses or justifications for conduct which would otherwise constitute a criminal offence. The principal general defences in Irish law are self-defence, duress and necessity each of which has different doctrinal foundations and conditions.\n\nSelf-defence is a justificatory defence which holds that reasonable force in defence of oneself or others is not criminal. In The People v Dwyer [1972], the courts applied a combined objective and subjective test requiring that the defendant honestly believed force was necessary and that the force used was objectively reasonable in the circumstances.\n\nDuress operates as an excuse — the defendant acknowledges wrongdoing but claims they had no real choice. The defence requires that the defendant acted under an immediate threat of death or serious injury, that the threat was of sufficient gravity to overbear the will of a person of reasonable firmness and that the defendant had no opportunity to take evasive action.\n\nNecessity shares features with duress but arises from circumstances rather than human threats. The defence remains controversial in Irish and English law. In R v Dudley and Stephens [1884], the court refused to recognise necessity as a defence to murder. The defence may be available in narrower circumstances such as medical necessity.",
        wordCount: 202,
        timeTakenSeconds: 1600,
        aiScore: 80,
        band: "Merit",
        feedback: {
          summary:
            "Good overview of the three defences with accurate case law.",
        },
        strengths: [
          "Clear doctrinal framework distinguishing excuses from justifications",
          "Accurate statement of the Dwyer test for self-defence",
          "Good treatment of the necessity/duress distinction",
        ],
        improvements: [
          "The duress analysis needs more case law — DPP v MacNally and the Irish authorities on duress should be cited",
        ],
        sampleAnswer: null,
      },
      {
        questionIndex: 4,
        questionText:
          "Critically discuss the mens rea requirements for murder under Irish law with specific focus on the Criminal Justice Act 1964. Is section 4 of the Act an adequate formulation of the mental element required for murder?",
        answerText:
          "Section 4 of the Criminal Justice Act 1964 provides that malice aforethought — the mental element for murder — means an intention to kill or cause serious injury to any person whether such person is the person actually killed or not. The Act abolished the common law doctrine of constructive malice which had allowed murder convictions based on the unintended killing of a person during the commission of a felony.\n\nThe 1964 Act formulation has been interpreted strictly in Irish case law. In The People (DPP) v Murray [1977], the Supreme Court emphasised that the intention required is subjective and must be proved by the prosecution beyond reasonable doubt. The court distinguished between intention and recklessness holding that only true intention to kill or cause serious injury will suffice.\n\nThe adequacy of section 4 has been questioned by academic commentators. The extension of murder to an intention to cause serious injury — but not necessarily death — is arguably too broad. A defendant who intends to cause serious bodily harm but not death is convicted of murder if the victim dies even if the defendant would have been horrified by that outcome.\n\nOn the other hand, section 4 provides clarity and eliminates the arbitrariness of constructive malice. The requirement of subjective intention aligns murder with principles of fair labelling and ensures that only truly culpable defendants are convicted of the most serious criminal offence.",
        wordCount: 221,
        timeTakenSeconds: 1900,
        aiScore: 78,
        band: "Merit",
        feedback: {
          summary: "A well-balanced critical analysis of section 4.",
        },
        strengths: [
          "Accurate statement of section 4 and the abolition of constructive malice",
          "Good critical analysis of the serious injury limb",
          "Balanced conclusion",
        ],
        improvements: [
          "The comparative dimension with English law post-Cunningham would strengthen the critical analysis",
        ],
        sampleAnswer: null,
      },
    ],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const scoreColor = (score: number | null) => {
  if (score === null) return "var(--text-muted)";
  if (score >= 75) return "var(--green)";
  if (score >= 65) return "var(--blue-bright)";
  if (score >= 50) return "var(--amber)";
  return "var(--red)";
};

const bandVariant = (
  band: string | null,
): "success" | "info" | "warning" | "danger" | "default" => {
  if (!band) return "default";
  if (band === "Distinction") return "success";
  if (band === "Merit") return "info";
  if (band === "Pass") return "warning";
  return "danger";
};

const relativeTime = (d: string) => {
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
};

const formatTime = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function EssayMonitorPage() {
  const [toast, setToast] = useState<ToastType | null>(null);
  const [tab, setTab] = useState<Tab>("lesson");
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");

  // Lesson essay review
  const [selectedEssay, setSelectedEssay] = useState<EssayAttempt | null>(null);

  // Practice session expand
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  // Simulation expand + paginated review
  const [expandedSim, setExpandedSim] = useState<string | null>(null);
  const [reviewSim, setReviewSim] = useState<Simulation | null>(null);
  const [reviewAttemptIndex, setReviewAttemptIndex] = useState(0);

  // Lesson essays pagination
  const filteredLessonEssays = lessonEssayData.filter(
    (e) =>
      (subjectFilter === "All" || e.subject === subjectFilter) &&
      (!search ||
        e.userName.toLowerCase().includes(search.toLowerCase()) ||
        e.userEmail.toLowerCase().includes(search.toLowerCase())),
  );
  const {
    page: lessonPage,
    setPage: setLessonPage,
    paginated: paginatedLessons,
    total: lessonTotal,
    reset: resetLesson,
  } = usePagination(filteredLessonEssays, 15);
  useEffect(() => {
    resetLesson();
  }, [search, subjectFilter]);

  // Practice sessions pagination
  const filteredSessions = practiceSessionData.filter(
    (s) => subjectFilter === "All" || s.subject === subjectFilter,
  );
  const {
    page: practicePage,
    setPage: setPracticePage,
    paginated: paginatedSessions,
    total: practiceTotal,
    reset: resetPractice,
  } = usePagination(filteredSessions, 10);
  useEffect(() => {
    resetPractice();
  }, [subjectFilter]);

  // Simulations pagination
  const filteredSims = simulationData.filter(
    (s) => subjectFilter === "All" || s.subject === subjectFilter,
  );
  const {
    page: simPage,
    setPage: setSimPage,
    paginated: paginatedSims,
    total: simTotal,
    reset: resetSim,
  } = usePagination(filteredSims, 10);
  useEffect(() => {
    resetSim();
  }, [subjectFilter]);

  const showToast = useCallback(
    (message: string, type: ToastType["type"] = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const allSubjects = Array.from(
    new Set([
      ...lessonEssayData.map((e) => e.subject),
      ...practiceSessionData.map((s) => s.subject),
      ...simulationData.map((s) => s.subject),
    ]),
  );

  const currentReviewAttempt = reviewSim?.attempts[reviewAttemptIndex] ?? null;

  return (
    <div className={styles.page}>
      {/* ── PAGE HEADER ── */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Essay Grading Monitor</h1>
          <p className={styles.subtitle}>
            Full visibility over lesson essays, practice sessions and exam
            simulations
          </p>
        </div>
        <div className={styles.headerStats}>
          {[
            {
              icon: BookOpen,
              label: "Lesson Essays",
              value: lessonEssayData.length,
              color: "var(--blue-bright)",
            },
            {
              icon: Users,
              label: "Practice Sessions",
              value: practiceSessionData.length,
              color: "var(--green)",
            },
            {
              icon: BarChart2,
              label: "Simulations",
              value: simulationData.length,
              color: "var(--amber)",
            },
            {
              icon: TrendingUp,
              label: "Avg Score",
              value: `${Math.round(
                [
                  ...lessonEssayData,
                  ...simulationData.flatMap((s) => s.attempts),
                ]
                  .filter((e) => e.aiScore !== null)
                  .reduce((a, e) => a + (e.aiScore ?? 0), 0) /
                  [
                    ...lessonEssayData,
                    ...simulationData.flatMap((s) => s.attempts),
                  ].filter((e) => e.aiScore !== null).length,
              )}%`,
              color: "var(--purple)",
            },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className={styles.headerStat}>
                <Icon size={14} color={s.color} />
                <div>
                  <div
                    className={styles.headerStatValue}
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className={styles.headerStatLabel}>{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div className={styles.filterBar}>
        <div className={styles.tabGroup}>
          {(["lesson", "practice", "simulation"] as Tab[]).map((t) => (
            <button
              key={t}
              className={`${styles.tabBtn} ${tab === t ? styles.tabBtnActive : ""}`}
              onClick={() => {
                setTab(t);
                setSubjectFilter("All");
                setSearch("");
              }}
            >
              {t === "lesson"
                ? "Lesson Essays"
                : t === "practice"
                  ? "Practice Sessions"
                  : "Simulations"}
              <span className={styles.tabCount}>
                {t === "lesson"
                  ? lessonEssayData.length
                  : t === "practice"
                    ? practiceSessionData.length
                    : simulationData.length}
              </span>
            </button>
          ))}
        </div>
        <div className={styles.filterRight}>
          <div className={styles.subjectPills}>
            {["All", ...allSubjects].map((s) => (
              <button
                key={s}
                className={`${styles.subjectPill} ${subjectFilter === s ? styles.subjectPillActive : ""}`}
                onClick={() => setSubjectFilter(s)}
              >
                {s === "All" ? "All Subjects" : s}
              </button>
            ))}
          </div>
          {tab === "lesson" && (
            <div className={styles.searchWrap}>
              <Search size={13} className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                placeholder="Search student..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setLessonPage(1);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── LESSON ESSAYS ── */}
      {tab === "lesson" && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Lesson Essays</h3>
            <span className={styles.cardCount}>{lessonTotal} submissions</span>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Student</th>
                  <th className={styles.th}>Subject</th>
                  <th className={styles.th}>Lesson</th>
                  <th className={styles.th}>Words</th>
                  <th className={styles.th}>Time</th>
                  <th className={styles.th}>Score</th>
                  <th className={styles.th}>Band</th>
                  <th className={styles.th}>Date</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLessons.length === 0 && (
                  <tr>
                    <td colSpan={9} className={styles.emptyRow}>
                      No essays match your filters
                    </td>
                  </tr>
                )}
                {paginatedLessons.map((e) => (
                  <tr
                    key={e.id}
                    className={styles.tr}
                    onClick={() => setSelectedEssay(e)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className={styles.td}>
                      <div className={styles.userCell}>
                        <div
                          className={styles.avatar}
                          style={{ background: scoreColor(e.aiScore) }}
                        >
                          {e.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className={styles.userName}>{e.userName}</div>
                          <div className={styles.userEmail}>{e.userEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span
                        className={styles.subjectPillTable}
                        style={{
                          background: e.subjectColor + "20",
                          color: e.subjectColor,
                          borderColor: e.subjectColor + "40",
                        }}
                      >
                        {e.subject}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.lessonTitle}>
                        {e.lessonTitle?.slice(0, 35) ?? "—"}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.metaText}>{e.wordCount}w</span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.metaText}>
                        {formatTime(e.timeTakenSeconds)}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span
                        className={styles.score}
                        style={{ color: scoreColor(e.aiScore) }}
                      >
                        {e.aiScore ?? "—"}
                        {e.aiScore !== null ? "%" : ""}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <Badge
                        label={e.band ?? "Pending"}
                        variant={bandVariant(e.band)}
                      />
                    </td>
                    <td className={styles.td}>
                      <span className={styles.metaText}>
                        {relativeTime(e.date)}
                      </span>
                    </td>
                    <td
                      className={styles.td}
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      <button
                        className={styles.viewBtn}
                        onClick={() => setSelectedEssay(e)}
                      >
                        View Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={lessonPage}
            total={lessonTotal}
            perPage={15}
            onChange={setLessonPage}
          />
        </div>
      )}

      {/* ── PRACTICE SESSIONS ── */}
      {tab === "practice" && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Practice Sessions</h3>
            <span className={styles.cardCount}>{practiceTotal} sessions</span>
          </div>

          {/* Stats strip */}
          <div className={styles.statsStrip}>
            {[
              {
                label: "Total",
                value: practiceSessionData.length,
                color: "var(--blue-bright)",
              },
              {
                label: "Completed",
                value: practiceSessionData.filter((s) => s.completed).length,
                color: "var(--green)",
              },
              {
                label: "Completion Rate",
                value: `${Math.round((practiceSessionData.filter((s) => s.completed).length / practiceSessionData.length) * 100)}%`,
                color: "var(--amber)",
              },
              {
                label: "Avg Time",
                value: `${Math.round(
                  practiceSessionData
                    .filter((s) => s.totalTimeSeconds)
                    .reduce((a, s) => a + (s.totalTimeSeconds ?? 0), 0) /
                    practiceSessionData.filter((s) => s.totalTimeSeconds)
                      .length /
                    60,
                )}m`,
                color: "var(--purple)",
              },
            ].map((s, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statLabel}>{s.label}</div>
                <div className={styles.statValue} style={{ color: s.color }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Student</th>
                  <th className={styles.th}>Subject</th>
                  <th className={styles.th}>Year</th>
                  <th className={styles.th}>Questions</th>
                  <th className={styles.th}>Answers</th>
                  <th className={styles.th}>Time</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSessions.map((s) => (
                  <React.Fragment key={s.id}>
                    <tr
                      className={`${styles.tr} ${expandedSession === s.id ? styles.trExpanded : ""}`}
                      onClick={() =>
                        setExpandedSession(
                          expandedSession === s.id ? null : s.id,
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td className={styles.td}>
                        <div className={styles.userCell}>
                          <div
                            className={styles.avatar}
                            style={{ background: s.subjectColor }}
                          >
                            {s.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <div>
                            <div className={styles.userName}>{s.userName}</div>
                            <div className={styles.userEmail}>
                              {s.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td}>
                        <span
                          className={styles.subjectPillTable}
                          style={{
                            background: s.subjectColor + "20",
                            color: s.subjectColor,
                            borderColor: s.subjectColor + "40",
                          }}
                        >
                          {s.subject}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.metaText}>{s.year}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.metaText}>
                          {s.questionIds.length}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.metaText}>
                          {s.essayAttemptIds.length}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.metaText}>
                          {s.totalTimeSeconds ? (
                            formatTime(s.totalTimeSeconds)
                          ) : (
                            <span style={{ color: "var(--amber)" }}>
                              In progress
                            </span>
                          )}
                        </span>
                      </td>
                      <td className={styles.td}>
                        {s.completed ? (
                          <Badge label="Completed" variant="success" />
                        ) : (
                          <Badge label="Incomplete" variant="warning" />
                        )}
                      </td>
                      <td className={styles.td}>
                        <span className={styles.metaText}>
                          {relativeTime(s.startedAt)}
                        </span>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedSession === s.id && (
                        <tr className={styles.accordionRow}>
                          <td colSpan={8} className={styles.accordionCell}>
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className={styles.accordionContent}
                            >
                              <div className={styles.accordionHeader}>
                                <span>Essays submitted in this session</span>
                              </div>
                              <table className={styles.innerTable}>
                                <thead>
                                  <tr>
                                    <th>Student</th>
                                    <th>Subject</th>
                                    <th>Words</th>
                                    <th>Time</th>
                                    <th>Score</th>
                                    <th>Band</th>
                                    <th>Date</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {lessonEssayData
                                    .filter((ea) =>
                                      s.essayAttemptIds.includes(ea.id),
                                    )
                                    .map((ea) => (
                                      <tr
                                        key={ea.id}
                                        className={styles.innerTr}
                                      >
                                        <td>{ea.userName}</td>
                                        <td>
                                          <span
                                            style={{
                                              color: ea.subjectColor,
                                              fontWeight: 600,
                                            }}
                                          >
                                            {ea.subject}
                                          </span>
                                        </td>
                                        <td>{ea.wordCount}w</td>
                                        <td>
                                          {formatTime(ea.timeTakenSeconds)}
                                        </td>
                                        <td>
                                          <span
                                            style={{
                                              color: scoreColor(ea.aiScore),
                                              fontWeight: 700,
                                            }}
                                          >
                                            {ea.aiScore ?? "—"}
                                            {ea.aiScore !== null ? "%" : ""}
                                          </span>
                                        </td>
                                        <td>
                                          <Badge
                                            label={ea.band ?? "Pending"}
                                            variant={bandVariant(ea.band)}
                                          />
                                        </td>
                                        <td>{relativeTime(ea.date)}</td>
                                        <td>
                                          <button
                                            className={styles.viewBtn}
                                            onClick={(ev) => {
                                              ev.stopPropagation();
                                              setSelectedEssay(ea);
                                            }}
                                          >
                                            View
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  {lessonEssayData.filter((ea) =>
                                    s.essayAttemptIds.includes(ea.id),
                                  ).length === 0 && (
                                    <tr>
                                      <td
                                        colSpan={8}
                                        className={styles.emptyRow}
                                      >
                                        No essays submitted yet
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={practicePage}
            total={practiceTotal}
            perPage={10}
            onChange={setPracticePage}
          />
        </div>
      )}

      {/* ── SIMULATIONS ── */}
      {tab === "simulation" && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Simulations</h3>
            <span className={styles.cardCount}>{simTotal} simulations</span>
          </div>

          {/* Stats strip */}
          <div className={styles.statsStrip}>
            {[
              {
                label: "Total",
                value: simulationData.length,
                color: "var(--blue-bright)",
              },
              {
                label: "Pass Rate",
                value: `${Math.round((simulationData.filter((s) => s.passed).length / simulationData.length) * 100)}%`,
                color: "var(--green)",
              },
              {
                label: "Avg Score",
                value: `${Math.round(simulationData.reduce((a, s) => a + s.score, 0) / simulationData.length)}%`,
                color: "var(--amber)",
              },
              {
                label: "Time Expired",
                value: `${Math.round((simulationData.filter((s) => s.failReason === "TIME_EXPIRED").length / simulationData.length) * 100)}%`,
                color: "var(--red)",
              },
              {
                label: "Tab Switch",
                value: `${Math.round((simulationData.filter((s) => s.failReason === "WINDOW_BLUR").length / simulationData.length) * 100)}%`,
                color: "var(--purple)",
              },
            ].map((s, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statLabel}>{s.label}</div>
                <div className={styles.statValue} style={{ color: s.color }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Student</th>
                  <th className={styles.th}>Subject</th>
                  <th className={styles.th}>Year</th>
                  <th className={styles.th}>Qs</th>
                  <th className={styles.th}>Score</th>
                  <th className={styles.th}>Result</th>
                  <th className={styles.th}>Fail Reason</th>
                  <th className={styles.th}>Time</th>
                  <th className={styles.th}>Date</th>
                  <th className={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {paginatedSims.map((s) => (
                  <React.Fragment key={s.id}>
                    <tr
                      className={`${styles.tr} ${expandedSim === s.id ? styles.trExpanded : ""}`}
                    >
                      <td className={styles.td}>
                        <div className={styles.userCell}>
                          <div
                            className={styles.avatar}
                            style={{ background: s.subjectColor }}
                          >
                            {s.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <div>
                            <div className={styles.userName}>{s.userName}</div>
                            <div className={styles.userEmail}>
                              {s.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td}>
                        <span
                          className={styles.subjectPillTable}
                          style={{
                            background: s.subjectColor + "20",
                            color: s.subjectColor,
                            borderColor: s.subjectColor + "40",
                          }}
                        >
                          {s.subject}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.metaText}>{s.year}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.metaText}>
                          {s.attempts.length}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <span
                          className={styles.score}
                          style={{ color: scoreColor(s.score) }}
                        >
                          {s.score}%
                        </span>
                      </td>
                      <td className={styles.td}>
                        {s.passed ? (
                          <div className={styles.passedBadge}>
                            <CheckCircle size={12} /> PASSED
                          </div>
                        ) : (
                          <div className={styles.failedBadge}>
                            <XCircle size={12} /> FAILED
                          </div>
                        )}
                      </td>
                      <td className={styles.td}>
                        {s.failReason === "TIME_EXPIRED" ? (
                          <div
                            className={styles.failReasonBadge}
                            style={{
                              color: "var(--amber)",
                              background: "var(--amber-bg)",
                              borderColor: "var(--amber)",
                            }}
                          >
                            <Clock size={11} /> Time Expired
                          </div>
                        ) : s.failReason === "WINDOW_BLUR" ? (
                          <div
                            className={styles.failReasonBadge}
                            style={{
                              color: "var(--red)",
                              background: "var(--red-bg)",
                              borderColor: "var(--red)",
                            }}
                          >
                            <AlertTriangle size={11} /> Tab Switch
                          </div>
                        ) : (
                          <span className={styles.metaText}>—</span>
                        )}
                      </td>
                      <td className={styles.td}>
                        <span className={styles.metaText}>
                          {s.totalTimeSeconds
                            ? formatTime(s.totalTimeSeconds)
                            : "—"}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.metaText}>
                          {relativeTime(s.startedAt)}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <button
                          className={styles.viewBtn}
                          onClick={() => {
                            setReviewSim(s);
                            setReviewAttemptIndex(0);
                          }}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={simPage}
            total={simTotal}
            perPage={10}
            onChange={setSimPage}
          />
        </div>
      )}

      {/* ── LESSON ESSAY REVIEW PANEL ── */}
      <AnimatePresence>
        {selectedEssay && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEssay(null)}
            />
            <motion.div
              className={styles.reviewPanel}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Panel header */}
              <div className={styles.panelHeader}>
                <div className={styles.panelHeaderLeft}>
                  <div
                    className={styles.panelAvatar}
                    style={{ background: scoreColor(selectedEssay.aiScore) }}
                  >
                    {selectedEssay.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className={styles.panelName}>
                      {selectedEssay.userName}
                    </div>
                    <div className={styles.panelEmail}>
                      {selectedEssay.userEmail}
                    </div>
                  </div>
                </div>
                <button
                  className={styles.closeBtn}
                  onClick={() => setSelectedEssay(null)}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Score + band */}
              <div className={styles.panelScoreRow}>
                <div
                  className={styles.panelScore}
                  style={{ color: scoreColor(selectedEssay.aiScore) }}
                >
                  {selectedEssay.aiScore ?? "—"}
                  {selectedEssay.aiScore !== null ? "%" : ""}
                </div>
                <Badge
                  label={selectedEssay.band ?? "Pending"}
                  variant={bandVariant(selectedEssay.band)}
                />
                <div className={styles.panelMeta}>
                  <span>{selectedEssay.wordCount} words</span>
                  <span>·</span>
                  <span>{formatTime(selectedEssay.timeTakenSeconds)}</span>
                  <span>·</span>
                  <span>{relativeTime(selectedEssay.date)}</span>
                </div>
              </div>

              <div className={styles.panelBody}>
                {/* Subject + lesson */}
                <div className={styles.panelContext}>
                  <span
                    className={styles.subjectPillTable}
                    style={{
                      background: selectedEssay.subjectColor + "20",
                      color: selectedEssay.subjectColor,
                      borderColor: selectedEssay.subjectColor + "40",
                    }}
                  >
                    {selectedEssay.subject}
                  </span>
                  {selectedEssay.lessonTitle && (
                    <span className={styles.panelLessonTitle}>
                      {selectedEssay.lessonTitle}
                    </span>
                  )}
                </div>

                {/* Question */}
                <div className={styles.panelSection}>
                  <div className={styles.panelSectionTitle}>Question</div>
                  <div className={styles.panelQuestionText}>
                    {selectedEssay.questionText}
                  </div>
                </div>

                {/* Answer */}
                <div className={styles.panelSection}>
                  <div className={styles.panelSectionTitle}>Student Answer</div>
                  <div className={styles.panelAnswerText}>
                    {selectedEssay.answerText}
                  </div>
                </div>

                {/* Feedback */}
                {selectedEssay.feedback && (
                  <div className={styles.panelSection}>
                    <div className={styles.panelSectionTitle}>AI Feedback</div>
                    <div className={styles.panelFeedback}>
                      {selectedEssay.feedback.summary}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                {selectedEssay.strengths.length > 0 && (
                  <div className={styles.panelSection}>
                    <div
                      className={styles.panelSectionTitle}
                      style={{ color: "var(--green)" }}
                    >
                      ✓ Strengths
                    </div>
                    <ul className={styles.panelList}>
                      {selectedEssay.strengths.map((s, i) => (
                        <li
                          key={i}
                          className={styles.panelListItem}
                          style={{ color: "var(--green)" }}
                        >
                          <span
                            className={styles.panelListDot}
                            style={{ background: "var(--green)" }}
                          />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Improvements */}
                {selectedEssay.improvements.length > 0 && (
                  <div className={styles.panelSection}>
                    <div
                      className={styles.panelSectionTitle}
                      style={{ color: "var(--amber)" }}
                    >
                      ↑ Improvements
                    </div>
                    <ul className={styles.panelList}>
                      {selectedEssay.improvements.map((s, i) => (
                        <li
                          key={i}
                          className={styles.panelListItem}
                          style={{ color: "var(--amber)" }}
                        >
                          <span
                            className={styles.panelListDot}
                            style={{ background: "var(--amber)" }}
                          />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Sample Answer */}
                {selectedEssay.sampleAnswer && (
                  <div className={styles.panelSection}>
                    <details className={styles.sampleAnswerDetails}>
                      <summary className={styles.sampleAnswerSummary}>
                        📄 Show Sample Answer
                      </summary>
                      <div
                        className={styles.panelAnswerText}
                        style={{ marginTop: 10 }}
                      >
                        {selectedEssay.sampleAnswer}
                      </div>
                    </details>
                  </div>
                )}

                {/* Meta */}
                <div className={styles.panelFooterMeta}>
                  Tokens: {selectedEssay.tokensUsed} · Model:{" "}
                  {selectedEssay.aiModel}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── SIMULATION PAGINATED REVIEW OVERLAY ── */}
      <AnimatePresence>
        {reviewSim && currentReviewAttempt && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.8)",
                zIndex: 500,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReviewSim(null)}
            />
            <motion.div
              className={styles.simReviewModal}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Modal header */}
              <div className={styles.simReviewHeader}>
                <div className={styles.simReviewHeaderLeft}>
                  <div
                    className={styles.panelAvatar}
                    style={{ background: reviewSim.subjectColor }}
                  >
                    {reviewSim.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className={styles.panelName}>{reviewSim.userName}</div>
                    <div className={styles.panelEmail}>
                      {reviewSim.subject} · {reviewSim.year} ·{" "}
                      {reviewSim.passed ? (
                        <span style={{ color: "var(--green)" }}>PASSED</span>
                      ) : (
                        <span style={{ color: "var(--red)" }}>FAILED</span>
                      )}{" "}
                      · Overall:{" "}
                      <span
                        style={{
                          color: scoreColor(reviewSim.score),
                          fontWeight: 700,
                        }}
                      >
                        {reviewSim.score}%
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className={styles.closeBtn}
                  onClick={() => setReviewSim(null)}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Question navigation */}
              <div className={styles.simReviewNav}>
                <div className={styles.simReviewNavLabel}>
                  Question {reviewAttemptIndex + 1} of{" "}
                  {reviewSim.attempts.length}
                </div>
                <div className={styles.simReviewNavDots}>
                  {reviewSim.attempts.map((a, i) => (
                    <button
                      key={i}
                      className={`${styles.simNavDot} ${i === reviewAttemptIndex ? styles.simNavDotActive : ""}`}
                      style={{
                        background:
                          i === reviewAttemptIndex
                            ? scoreColor(a.aiScore)
                            : a.aiScore !== null
                              ? scoreColor(a.aiScore) + "40"
                              : "var(--bg-elevated)",
                        borderColor: scoreColor(a.aiScore),
                      }}
                      onClick={() => setReviewAttemptIndex(i)}
                      title={`Q${i + 1}: ${a.aiScore ?? "Pending"}%`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className={styles.simReviewNavArrows}>
                  <button
                    className={styles.navArrow}
                    disabled={reviewAttemptIndex === 0}
                    onClick={() =>
                      setReviewAttemptIndex((p) => Math.max(0, p - 1))
                    }
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    className={styles.navArrow}
                    disabled={
                      reviewAttemptIndex === reviewSim.attempts.length - 1
                    }
                    onClick={() =>
                      setReviewAttemptIndex((p) =>
                        Math.min(reviewSim.attempts.length - 1, p + 1),
                      )
                    }
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Question content */}
              <div className={styles.simReviewBody}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={reviewAttemptIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.18 }}
                  >
                    {/* Score row */}
                    <div className={styles.simAttemptScoreRow}>
                      <div
                        className={styles.simAttemptScore}
                        style={{
                          color: scoreColor(currentReviewAttempt.aiScore),
                        }}
                      >
                        {currentReviewAttempt.aiScore ?? "—"}
                        {currentReviewAttempt.aiScore !== null ? "%" : ""}
                      </div>
                      <Badge
                        label={currentReviewAttempt.band ?? "Pending"}
                        variant={bandVariant(currentReviewAttempt.band)}
                      />
                      <div className={styles.panelMeta}>
                        <span>{currentReviewAttempt.wordCount} words</span>
                        <span>·</span>
                        <span>
                          {formatTime(currentReviewAttempt.timeTakenSeconds)}
                        </span>
                      </div>
                    </div>

                    {/* Question */}
                    <div className={styles.panelSection}>
                      <div className={styles.panelSectionTitle}>
                        Question {reviewAttemptIndex + 1}
                      </div>
                      <div className={styles.panelQuestionText}>
                        {currentReviewAttempt.questionText}
                      </div>
                    </div>

                    {/* Answer */}
                    <div className={styles.panelSection}>
                      <div className={styles.panelSectionTitle}>
                        Student Answer
                      </div>
                      <div className={styles.panelAnswerText}>
                        {currentReviewAttempt.answerText}
                      </div>
                    </div>

                    {/* Feedback */}
                    {currentReviewAttempt.feedback && (
                      <div className={styles.panelSection}>
                        <div className={styles.panelSectionTitle}>
                          AI Feedback
                        </div>
                        <div className={styles.panelFeedback}>
                          {currentReviewAttempt.feedback.summary}
                        </div>
                      </div>
                    )}

                    {/* Strengths */}
                    {currentReviewAttempt.strengths.length > 0 && (
                      <div className={styles.panelSection}>
                        <div
                          className={styles.panelSectionTitle}
                          style={{ color: "var(--green)" }}
                        >
                          ✓ Strengths
                        </div>
                        <ul className={styles.panelList}>
                          {currentReviewAttempt.strengths.map((s, i) => (
                            <li
                              key={i}
                              className={styles.panelListItem}
                              style={{ color: "var(--green)" }}
                            >
                              <span
                                className={styles.panelListDot}
                                style={{ background: "var(--green)" }}
                              />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Improvements */}
                    {currentReviewAttempt.improvements.length > 0 && (
                      <div className={styles.panelSection}>
                        <div
                          className={styles.panelSectionTitle}
                          style={{ color: "var(--amber)" }}
                        >
                          ↑ Improvements
                        </div>
                        <ul className={styles.panelList}>
                          {currentReviewAttempt.improvements.map((s, i) => (
                            <li
                              key={i}
                              className={styles.panelListItem}
                              style={{ color: "var(--amber)" }}
                            >
                              <span
                                className={styles.panelListDot}
                                style={{ background: "var(--amber)" }}
                              />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Sample answer */}
                    {currentReviewAttempt.sampleAnswer && (
                      <div className={styles.panelSection}>
                        <details className={styles.sampleAnswerDetails}>
                          <summary className={styles.sampleAnswerSummary}>
                            📄 Show Sample Answer
                          </summary>
                          <div
                            className={styles.panelAnswerText}
                            style={{ marginTop: 10 }}
                          >
                            {currentReviewAttempt.sampleAnswer}
                          </div>
                        </details>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Modal footer nav */}
              <div className={styles.simReviewFooter}>
                <button
                  className={styles.simNavBtn}
                  disabled={reviewAttemptIndex === 0}
                  onClick={() =>
                    setReviewAttemptIndex((p) => Math.max(0, p - 1))
                  }
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <span className={styles.simNavCounter}>
                  {reviewAttemptIndex + 1} / {reviewSim.attempts.length}
                </span>
                <button
                  className={styles.simNavBtn}
                  disabled={
                    reviewAttemptIndex === reviewSim.attempts.length - 1
                  }
                  onClick={() =>
                    setReviewAttemptIndex((p) =>
                      Math.min(reviewSim.attempts.length - 1, p + 1),
                    )
                  }
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 700,
              background: "var(--bg-elevated)",
              border: `1px solid ${toast.type === "success" ? "var(--green)" : toast.type === "danger" ? "var(--red)" : toast.type === "warning" ? "var(--amber)" : "var(--blue-bright)"}`,
              borderRadius: 10,
              padding: "12px 20px",
              fontSize: 14,
              color: "var(--text-primary)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              minWidth: 260,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
