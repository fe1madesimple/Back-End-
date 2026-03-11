import { PrismaClient, CaseJurisdiction } from '@prisma/client';

const prisma = new PrismaClient();

const jurisdictionMap: Record<string, CaseJurisdiction> = {
  IE: CaseJurisdiction.IRELAND,
  UK: CaseJurisdiction.UNITED_KINGDOM,
  AU: CaseJurisdiction.AUSTRALIA,
  EU: CaseJurisdiction.EUROPEAN_UNION,
  US: CaseJurisdiction.UNITED_STATES,
  NZ: CaseJurisdiction.NEW_ZEALAND,
  CA: CaseJurisdiction.CANADA,
  INT: CaseJurisdiction.INTERNATIONAL,
  ECHR: CaseJurisdiction.ECHR,
  Ireland: CaseJurisdiction.IRELAND,
  England: CaseJurisdiction.ENGLAND,
  'England & Wales': CaseJurisdiction.ENGLAND_AND_WALES,
  Scotland: CaseJurisdiction.SCOTLAND,
  'Scotland / UK': CaseJurisdiction.SCOTLAND_UK,
  'Northern Ireland': CaseJurisdiction.NORTHERN_IRELAND,
  'New Zealand': CaseJurisdiction.NEW_ZEALAND,
  'New South Wales': CaseJurisdiction.NEW_SOUTH_WALES,
  Australia: CaseJurisdiction.AUSTRALIA,
  'United States': CaseJurisdiction.UNITED_STATES,
  Germany: CaseJurisdiction.GERMANY,
  Jamaica: CaseJurisdiction.JAMAICA,
  'Hong Kong': CaseJurisdiction.HONG_KONG,
  Singapore: CaseJurisdiction.SINGAPORE,
  Other: CaseJurisdiction.OTHER,
};


const rawCases =  [
  {
    "case_name": "Le Lievre v Gold",
    "citation": "[1893] 1 QB 491",
    "year": 1893,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "Prior to Donoghue v Stevenson, the Court of Appeal held that a duty of care in negligence arose only where there was a direct relationship of proximity equivalent to privity of contract between the parties. A surveyor who negligently certified the progress of building works owed no duty of care to mortgagees who relied on the certificates, as there was no contract between them. This restrictive approach was later overruled by Donoghue v Stevenson [1932].",
    "key_quote": "A man is no doubt liable for damage caused by his own negligence to those with whom he is in a relationship of proximity equivalent to contract; but apart from such a relationship no duty to take care generally exists.",
    "full_summary": "Le Lievre v Gold [1893] 1 QB 491 is a pre-Donoghue authority illustrating the restrictive approach to the duty of care that prevailed in English common law before 1932. A surveyor certified stages of building work as complete; mortgagees advanced money in reliance on those certificates, which were negligently issued. When the builder defaulted, the mortgagees sued the surveyor in negligence. The Court of Appeal, following the strict privity-based reasoning of Winterbottom v Wright (1842), held that the surveyor owed no duty of care to the mortgagees. There was no contract between them and no relationship equivalent to privity. Lord Esher MR held that a duty of care in negligence required a relationship akin to privity of contract. This decision is studied in FE-1 torts courses principally as a foil to Donoghue v Stevenson [1932], which established that the duty of care is not confined to contractual relationships, and to Hedley Byrne v Heller [1964], which extended duties of care to negligent misstatement. It demonstrates the historical evolution from the privity-based duty to the neighbour principle.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "privity",
      "historical development",
      "pre-Donoghue"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q1",
      "Torts FE-1 2018 Q1"
    ]
  },
  {
    "case_name": "Anns v Merton London Borough Council",
    "citation": "[1978] AC 728",
    "year": 1978,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "Lord Wilberforce's two-stage test for the duty of care holds that: first, there must be sufficient proximity between the defendant and the claimant such that carelessness by the defendant would be likely to cause damage to the claimant; and second, if the first stage is satisfied, the court considers whether there are any policy reasons that ought to negative or limit the scope of the duty, the class of persons who can rely on it, or the damages which can flow from it. This test was subsequently overruled in Murphy v Brentwood DC [1991].",
    "key_quote": "Through the two-stage test: first one has to ask whether there is a sufficiently close relationship of proximity; second, whether there are any considerations which ought to negative, reduce or limit the scope of the duty.",
    "full_summary": "Anns v Merton London Borough Council [1978] AC 728 is a landmark House of Lords decision that, for a period, expanded the boundaries of the duty of care in negligence. The plaintiff purchased a flat in a building that later developed cracks due to inadequate foundations. The local authority had inspected the foundations before the building was completed but failed to ensure they met the statutory requirements. Lord Wilberforce articulated the celebrated 'two-stage' test: if sufficient proximity exists such that careless conduct would foreseeably cause damage, a prima facie duty arises; it then falls to be considered whether policy considerations should negate or limit the duty. On the facts, the council was held to owe a duty of care to the plaintiffs. Anns was controversial: it expanded duties of care, permitted recovery for pure economic loss in certain circumstances, and its approach to building inspectors and local authority liability generated great debate. It was overruled by the House of Lords in Murphy v Brentwood District Council [1991] AC 398, which reinstated a more restrictive approach and denied recovery for pure economic loss in the context of defective buildings. Anns is studied in FE-1 torts courses as an important stage in the development of the duty of care, placed between Donoghue (1932) and Caparo (1990) in the historical narrative.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "two-stage test",
      "pure economic loss",
      "public authority",
      "Anns test"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q2",
      "Torts FE-1 2017 Q2",
      "Torts FE-1 2020 Q1"
    ]
  },
  {
    "case_name": "Caparo Industries plc v Dickman",
    "citation": "[1990] 2 AC 605",
    "year": 1990,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "The three-stage Caparo test holds that a duty of care will arise where: (i) damage to the claimant was reasonably foreseeable; (ii) there existed a relationship of proximity between the parties; and (iii) it is fair, just, and reasonable to impose a duty of care. The test does not operate as a universal formula; in novel situations it guides analysis, while in established categories courts should apply existing precedent incrementally.",
    "key_quote": "What emerges is that in addition to the foreseeability of damage, necessary ingredients in any situation giving rise to a duty of care are that there should exist between the party owing the duty and the party to whom it is owed a relationship characterised by the law as one of 'proximity' or 'neighbourhood' and that the situation should be one in which the court considers it fair, just and reasonable that the law should impose a duty of a given scope.",
    "full_summary": "Caparo Industries plc v Dickman [1990] 2 AC 605 is the leading English authority on the duty of care in negligence. Caparo, a company, was considering taking over a public company (Fidelity). It acquired shares and then launched a takeover bid, relying in part on the audited accounts prepared by the defendants. The accounts were negligently prepared and showed a profit when in fact there was a large loss. Caparo sought damages from the auditors in negligence. The House of Lords rejected the claim. Lord Bridge articulated the three-stage test: (i) reasonable foreseeability of damage; (ii) proximity between the parties; and (iii) fairness, justice, and reasonableness. On the facts, no duty existed: audits are prepared for shareholders collectively, not to assist potential investors making acquisition decisions. The broader significance of Caparo is its rejection of a single universal formula and its endorsement of an incremental, category-by-category approach to duty of care. The test was clarified by Robinson v Chief Constable of West Yorkshire [2018] UKSC 4 as a guide for novel situations rather than a routine checklist. Caparo is applied in modified form in Ireland (see Glencar [2002]) and is the starting point for any analysis of duty in FE-1 torts.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "Caparo test",
      "foreseeability",
      "proximity",
      "fair just and reasonable",
      "auditors",
      "pure economic loss"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q1",
      "Torts FE-1 2017 Q1",
      "Torts FE-1 2019 Q1",
      "Torts FE-1 2021 Q1",
      "Torts FE-1 2023 Q1"
    ]
  },
  {
    "case_name": "Yuen Kun-Yeu v Attorney General of Hong Kong",
    "citation": "[1988] AC 175",
    "year": 1988,
    "court": "Privy Council",
    "jurisdiction": "UK",
    "legal_principle": "The Anns two-stage test is not a universal formula for establishing a duty of care; the mere foreseeability of damage is not sufficient to found a duty. Proximity — closeness of relationship — is the essential ingredient, and in the public authority context, a regulator owes no duty of care to investors who deposited money with a company under the regulator's supervision, absent a specific assumption of responsibility.",
    "key_quote": "Their Lordships venture to think that the two-stage test in Anns is not to be treated as a universal or final guide to the existence of a duty of care; the question of proximity and the question of policy cannot be treated as giving rise to a single two-stage process.",
    "full_summary": "Yuen Kun-Yeu v Attorney General of Hong Kong [1988] AC 175 was a Privy Council case on appeal from Hong Kong concerning the liability of a deposit-taking regulator. The Commissioner of Deposit-taking Companies had failed to act on information that a licensed company was carrying on its business fraudulently. When the company collapsed, the plaintiffs — who had made deposits — sued the Commissioner in negligence. The Privy Council, in a judgment delivered by Lord Keith, held that no duty of care was owed. Lord Keith subjected the Anns two-stage test to significant criticism, arguing that the test could not operate as a stand-alone test for duty and that mere foreseeability of harm was not enough — the proximity or neighbourhood concept was essential. On the facts, no sufficiently proximate relationship existed between the regulator and each individual depositor: the regulatory framework was created for the benefit of the public generally, not any particular class. This decision is important as a precursor to Caparo [1990] and for its critique of the Anns test, and it anticipates the three-stage approach that Lord Bridge would later articulate. It is studied in FE-1 torts courses as part of the development of duty of care doctrine.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "proximity",
      "Anns test",
      "public authority",
      "regulator liability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q1",
      "Torts FE-1 2019 Q2"
    ]
  },
  {
    "case_name": "Junior Books Ltd v Veitchi Co Ltd",
    "citation": "[1983] 1 AC 520",
    "year": 1983,
    "court": "House of Lords",
    "jurisdiction": "Scotland",
    "legal_principle": "In exceptional circumstances, a duty of care may be owed in respect of pure economic loss where there is a sufficiently proximate relationship between the parties. Specialist sub-contractors who lay defective flooring may owe a duty of care to the building owner in respect of the cost of relaying the floor, even though they are not in a direct contractual relationship with the owner and the floor has not caused personal injury or damage to other property.",
    "key_quote": "The proximity between the parties was so close that it bordered on, though it did not quite equal, a contractual relationship. In these circumstances, the defendant could be taken to have assumed responsibility for the quality of their work vis-à-vis the ultimate employer.",
    "full_summary": "Junior Books Ltd v Veitchi Co Ltd [1983] 1 AC 520 is a controversial House of Lords decision in which recovery was allowed for pure economic loss in circumstances that have since been treated as exceptional and not of general application. The plaintiffs contracted with a main contractor for the construction of a factory. The main contractor, on the plaintiff's nomination, sub-contracted the floor laying to the defendants. The floor was allegedly defective: it was not dangerous and had not damaged other property, but it was of insufficient quality and needed to be relaid. There was no contract between the plaintiffs and the sub-contractors. The House of Lords (by a 4-1 majority) held that the sub-contractors owed a duty of care to the plaintiffs in respect of the economic loss, primarily on the ground that the relationship between the parties was of the requisite proximity. Lords Fraser and Russell applied the Anns approach to find that the defendants' specialist skill had been relied upon and that such reliance generated sufficient proximity. Junior Books has been narrowly confined in subsequent cases (notably D&F Estates [1989] and Murphy [1991]) and is rarely followed outside Scotland. It is studied in FE-1 torts courses as a high-water mark of economic loss recovery in negligence and as an example of the expansion of duty of care under Anns that was subsequently reversed.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "pure economic loss",
      "proximity",
      "sub-contractors",
      "product liability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q2"
    ]
  },
  {
    "case_name": "Hill v Chief Constable of West Yorkshire",
    "citation": "[1989] AC 53",
    "year": 1989,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "The police do not owe a duty of care to individual members of the public in the investigation and suppression of crime. The relationship between the police and the general public lacks the necessary proximity for a duty of care to arise, and strong policy reasons — including that imposing liability would lead to defensive policing — support denying recovery even where damage is foreseeable.",
    "key_quote": "No general duty of care exists as between the police and members of the public in relation to the investigation of crime. Imposing such a duty would lead to a significant diversion of police resources and the adoption of an unduly defensive approach to their operations.",
    "full_summary": "Hill v Chief Constable of West Yorkshire [1989] AC 53 arose from the failure of the West Yorkshire Police to apprehend Peter Sutcliffe (the 'Yorkshire Ripper') before he murdered the plaintiff's daughter, despite having information that could have led to his earlier arrest. The plaintiff alleged that the police had been negligent in their investigation. The House of Lords held that the police owed no duty of care to individual victims in the performance of their investigative function. Lord Keith gave two reasons: first, there was insufficient proximity between the police and potential future victims of an unidentified criminal; second, strong policy reasons militated against imposing liability — it would divert police resources into defensive record-keeping and lead to over-cautious policing. The Hill principle was extensively reviewed in Michael v Chief Constable of South Wales [2015] UKSC 2 and Z v United Kingdom (2001) (European Court of Human Rights), and was distinguished in Robinson v Chief Constable of West Yorkshire [2018] where police positive action (as opposed to mere failure to act) founded a duty. Hill remains the leading authority on police investigative immunity and is a key FE-1 torts case.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "police liability",
      "public authority",
      "proximity",
      "policy",
      "omissions"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q2",
      "Torts FE-1 2019 Q3",
      "Torts FE-1 2022 Q1"
    ]
  },
  {
    "case_name": "Ward v McMaster",
    "citation": "[1988] IR 337",
    "year": 1988,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "In Irish law, a duty of care arises where there is a relationship of sufficient proximity between the parties such that, in the reasonable contemplation of the defendant, carelessness on their part could cause damage to the plaintiff, and where there is no consideration negating the duty. The Irish Supreme Court adopted a proximity-based approach broadly consistent with, but not identical to, the English two-stage Anns test, leaving open the question of how Irish law would develop independently in novel cases.",
    "key_quote": "A duty of care arises from a situation of proximity between the parties in which the defendant ought reasonably to have had the plaintiff in contemplation as a person who might be injured by a failure to exercise due care.",
    "full_summary": "Ward v McMaster [1988] IR 337 is one of the most important Irish Supreme Court decisions on the duty of care in negligence. The plaintiff purchased a house in Louth and arranged for a loan from a county council, which appointed a valuer to assess the property. The valuer negligently overvalued the house; the plaintiff later discovered it was subject to serious structural defects. The council relied on the valuation in making the loan. The question was whether the council owed a duty of care to the plaintiff. The Supreme Court held that a duty of care arose. McCarthy J applied a proximity-based test derived from Donoghue v Stevenson and the Anns framework, finding that the relationship between the council and the plaintiff was sufficiently proximate to generate a duty. The council knew the plaintiff intended to purchase and live in the house and had retained a valuer specifically to protect the plaintiff's interests as much as the council's own. Ward v McMaster predates both Caparo [1990] and Glencar [2002] and represents Irish law's own trajectory in developing the duty of care. It is frequently cited in FE-1 torts courses as the leading Irish Supreme Court authority on duty of care prior to Glencar and is analysed alongside the English Caparo framework.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "proximity",
      "public authority",
      "pure economic loss",
      "Ireland"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q3",
      "Torts FE-1 2017 Q3",
      "Torts FE-1 2019 Q1",
      "Torts FE-1 2023 Q1"
    ]
  },
  {
    "case_name": "E (A Minor) v Dorset County Council",
    "citation": "[1995] 2 AC 633",
    "year": 1995,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "A public authority exercising statutory functions may owe a duty of care to individuals where there has been a specific assumption of responsibility to the claimant. Educational authorities and social services departments may owe a duty of care in the exercise of their professional advisory and diagnostic functions, as distinct from purely operational or policy decisions. The line between justiciable acts and non-justiciable policy decisions is a critical boundary in public authority liability.",
    "key_quote": "Where a public authority has assumed a specific responsibility to an individual, and that individual has reasonably relied on that assumption of responsibility, a duty of care in respect of the exercise of professional functions may arise.",
    "full_summary": "E (A Minor) v Dorset County Council [1995] 2 AC 633 (decided together with X v Bedfordshire CC) is a significant House of Lords decision concerning the circumstances in which public authorities owe a duty of care in the exercise of statutory powers. In E v Dorset, the plaintiff alleged that an educational psychologist employed by the authority had negligently failed to diagnose his dyslexia when he was a child, causing him to fail to receive appropriate educational provision. The House of Lords held that a duty of care could arise in respect of the exercise of professional functions (such as diagnosis and assessment) by employees of a public authority, as distinguished from purely discretionary policy-level decisions. The court applied the threefold Caparo test and found that, on the particular facts of this case, the necessary proximity was established because the authority had assumed responsibility for the child's educational assessment. The decision is important for the distinction between operational acts (capable of giving rise to a duty) and policy decisions (generally not), and for the concept of assumption of responsibility in public authority liability cases. It is studied in FE-1 torts courses alongside Hill v Chief Constable, Anns v Merton, and Caparo v Dickman.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "public authority",
      "assumption of responsibility",
      "educational authority",
      "Caparo test"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q2",
      "Torts FE-1 2021 Q2"
    ]
  },
  {
    "case_name": "Beatty v The Rent Tribunal",
    "citation": "[2005] IESC 66",
    "year": 2005,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "The Irish Supreme Court held that a statutory tribunal does not owe a duty of care in negligence to parties appearing before it in respect of the manner in which it conducts its adjudicative functions. Strong policy considerations — including judicial immunity, the importance of finality in decisions, and the availability of judicial review — militate against imposing a tortious duty on tribunals exercising quasi-judicial functions.",
    "key_quote": "No duty of care in negligence arises in respect of the manner in which a statutory tribunal exercises its adjudicative functions. The policy reasons applicable to judicial immunity extend to bodies exercising quasi-judicial functions.",
    "full_summary": "Beatty v The Rent Tribunal [2005] IESC 66 concerned a claim that the Rent Tribunal had acted negligently in the manner in which it conducted proceedings, causing financial loss to the applicant landlord. The Supreme Court had to consider whether the Tribunal owed a duty of care in respect of its adjudicative functions. The court applied the three-part test drawn from Ward v McMaster and the Glencar framework and held that, even assuming proximity and foreseeability were established, it was not just or reasonable to impose a tortious duty of care on a statutory tribunal exercising adjudicative functions. The court relied on the policy rationale underpinning judicial immunity — the need for decision-makers to act without fear of personal liability — and noted that the appropriate remedy was by way of judicial review, not a claim in negligence. Beatty v Rent Tribunal is cited in FE-1 torts courses as an illustration of the 'just and reasonable' limb of the Irish duty of care test (from Glencar) excluding liability for quasi-judicial bodies.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "public authority",
      "quasi-judicial body",
      "just and reasonable",
      "judicial immunity"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Glencar Explorations plc v Mayo County Council (No 2)",
    "citation": "[2002] 1 IR 84",
    "year": 2002,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "The Irish Supreme Court established a three-part test for the duty of care in negligence: (i) reasonable foreseeability of damage; (ii) proximity of relationship; and (iii) that it is just and reasonable in all the circumstances to impose a duty. The third limb is a distinct requirement that encapsulates policy considerations and is not merely a restatement of foreseeability or proximity.",
    "key_quote": "There exists a third ingredient of the duty of care beyond foreseeability and proximity, namely that in all the circumstances it is just and reasonable that the law should impose a duty of a given scope upon the defendant for the benefit of the plaintiff.",
    "full_summary": "Glencar Explorations plc v Mayo County Council [2002] 1 IR 84 is the leading Irish Supreme Court authority on the duty of care in negligence. Glencar held exploration licences and suffered pure economic loss when Mayo County Council adopted an ultra vires moratorium on mining. The plaintiffs claimed the council owed a duty of care in negligence. The Supreme Court, per Keane CJ, rejected the claim and articulated the Irish three-part test for duty of care: foreseeability, proximity, and the just and reasonable requirement. Keane CJ explicitly preferred this structured approach over either the Anns two-stage test or a purely incremental methodology. The just and reasonable requirement was independently applied: judicial review was available to challenge the ultra vires moratorium, the relationship between a statutory body and local businesses was not one of assumption of responsibility, and liability to an indeterminate class would arise if a duty were imposed. Glencar remains the foundational statement of Irish negligence law and is the primary reference point in FE-1 torts courses alongside Ward v McMaster. All subsequent Irish duty of care analysis takes Glencar as its starting point.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "three-part test",
      "just and reasonable",
      "pure economic loss",
      "public authority",
      "Ireland"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q1",
      "Torts FE-1 2017 Q1",
      "Torts FE-1 2019 Q1",
      "Torts FE-1 2021 Q1",
      "Torts FE-1 2023 Q1"
    ]
  },
  {
    "case_name": "Donoghue v Stevenson",
    "citation": "[1932] AC 562",
    "year": 1932,
    "court": "House of Lords",
    "jurisdiction": "UK",
    "legal_principle": "A manufacturer owes a duty of care in negligence to the ultimate consumer where the product reaches the consumer in the form in which it left the manufacturer without a reasonable possibility of intermediate examination and the manufacturer knows that the absence of reasonable care in preparation will result in injury. Lord Atkin's 'neighbour principle' established the modern law of negligence: a duty of care is owed to persons who are so closely and directly affected by one's acts that one ought reasonably to have them in contemplation.",
    "key_quote": "You must take reasonable care to avoid acts or omissions which you can reasonably foresee would be likely to injure your neighbour. Who then in law is my neighbour? Persons who are so closely and directly affected by my act that I ought reasonably to have them in contemplation as being so affected when I am directing my mind to the acts or omissions which are called in question.",
    "full_summary": "Donoghue v Stevenson [1932] AC 562 is the foundational case of the modern law of negligence. Mrs Donoghue consumed part of a bottle of ginger beer which, she alleged, contained the decomposed remains of a snail, causing gastroenteritis. Because the bottle was purchased by a friend there was no contract between her and the manufacturer; the question was whether the manufacturer owed a duty of care in tort. The House of Lords, by a 3-2 majority, held that it did. Lord Atkin's speech articulated the neighbour principle: a duty arises towards those so closely and directly affected by one's acts that one ought reasonably to have them in contemplation. Lord Macmillan emphasised that the categories of negligence are never closed. Donoghue v Stevenson is the starting point for all negligence analysis. It overturned the restrictive privity-based approach of Le Lievre v Gold [1893] and laid the foundation for the subsequent development of duty of care through Anns, Caparo, and Glencar. It is the single most important case in FE-1 torts courses.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "neighbour principle",
      "manufacturer liability",
      "product liability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q1",
      "Torts FE-1 2017 Q1",
      "Torts FE-1 2019 Q1",
      "Torts FE-1 2021 Q1",
      "Torts FE-1 2023 Q1"
    ]
  },
  {
    "case_name": "Home Office v Dorset Yacht Co Ltd",
    "citation": "[1970] AC 1004",
    "year": 1970,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "A public authority may owe a duty of care in respect of damage caused by third parties where it has assumed control and custody of those third parties and damage to a known, proximate class of persons is a foreseeable consequence of a failure to exercise reasonable care over them. The neighbour principle from Donoghue v Stevenson applies beyond its specific facts, subject to policy considerations.",
    "key_quote": "Where officers have control and custody of offenders, and damage to nearby property is foreseeable if that control is negligently relaxed, a duty of care arises. The House of Lords applied Donoghue as providing a general principle capable of application to new situations.",
    "full_summary": "Home Office v Dorset Yacht Co Ltd [1970] AC 1004 concerned borstal boys being supervised on an island near Poole Harbour. Seven escaped at night while officers were asleep, boarded the plaintiffs' yachts, and caused substantial damage. The question was whether the Home Office owed a duty of care to the yacht owners in respect of the escapees' acts. The House of Lords, by a 4-1 majority, held that it did. Lord Reid treated Donoghue as establishing a general principle and liberalised its scope, holding that the duty extended to situations involving third-party wrongdoers where there was sufficient control and proximity. Policy considerations were acknowledged as a potential limiting factor but did not apply here: the risk to the Dorset Yacht Company was entirely foreseeable and the officers had direct control over the boys. Dorset Yacht is a key step in the development of duty of care, bridging Donoghue and Anns/Caparo, and is the leading case on liability for third-party acts where the defendant has control. It is essential in FE-1 torts.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "third party acts",
      "public authority",
      "proximity",
      "policy",
      "control"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q1",
      "Torts FE-1 2018 Q1",
      "Torts FE-1 2020 Q2"
    ]
  },
  {
    "case_name": "Robinson v Chief Constable of West Yorkshire Police",
    "citation": "[2018] UKSC 4",
    "year": 2018,
    "court": "Supreme Court",
    "jurisdiction": "UK",
    "legal_principle": "The Caparo three-stage test is not a universal formula to be applied mechanically in every case; it guides analysis in novel situations only. In established categories of duty, courts should apply precedent. Where the defendant by positive act creates a danger that injures the claimant, or assumes responsibility, a duty of care will arise. The police owe a duty of care to bystanders foreseeably endangered by their positive operational decisions.",
    "key_quote": "The Caparo three-stage test does not provide a formula which can be applied mechanically to determine whether a duty of care exists. In the ordinary run of cases, courts should apply established principles; only in novel situations do the Caparo criteria serve as a guide.",
    "full_summary": "Robinson v Chief Constable of West Yorkshire Police [2018] UKSC 4 arose when plainclothes officers attempting an arrest in a busy Huddersfield street caused an elderly pedestrian, Mrs Robinson, to fall and sustain injuries. The Supreme Court held the police owed a duty of care. Lord Reed delivered a landmark judgment clarifying that Caparo is not a universal three-stage checklist but rather a guide for novel situations. In established categories — such as the duty not to create physical danger by positive acts — courts should simply apply precedent. Because the police by their positive operational act created a danger in a public place, a duty of care to foreseeably proximate bystanders arose. The general immunity applicable to police investigative functions (Hill v Chief Constable of W Yorkshire [1989]) was inapplicable: that immunity covers failures to protect, not positive acts that themselves cause harm. Robinson is a key 2018 authority now included in FE-1 torts courses for its clarification of Caparo, the positive acts/omissions distinction, and police liability.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "Caparo test",
      "police liability",
      "positive acts",
      "public authority",
      "proximity"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2019 Q3",
      "Torts FE-1 2021 Q1",
      "Torts FE-1 2023 Q2"
    ]
  },
  {
    "case_name": "Vaughan v Menlove",
    "citation": "(1837) 3 Bing NC 468",
    "year": 1837,
    "court": "Common Pleas",
    "jurisdiction": "England",
    "legal_principle": "The standard of care in negligence is objective: the defendant must act as a reasonable person of ordinary prudence, not according to their own subjective judgment or limited intelligence. A person who genuinely but unreasonably believed their conduct was safe is nonetheless liable if the reasonable person would have recognised the risk.",
    "key_quote": "The standard of care is not based on the defendant's own judgment of what is prudent; it is the objective standard of a man of ordinary prudence. A man who acts to the best of his judgment may still be negligent if a reasonable person would have done otherwise.",
    "full_summary": "Vaughan v Menlove (1837) 3 Bing NC 468 is the foundation of the objective standard of care in negligence. The defendant, a man of limited intelligence, built a hayrick near the boundary of his land despite being repeatedly warned that it was likely to ignite spontaneously. When the rick caught fire, it spread to the plaintiff's cottages and destroyed them. The defendant's defence was that he had acted to the best of his own judgment. The Court of Common Pleas rejected this defence and established that the law of negligence applies an objective standard: the defendant must measure up to the conduct of the reasonable person of ordinary prudence. A defendant's own subjective views about risk — whether arising from limited intelligence, unusual opinions, or idiosyncratic beliefs — are irrelevant to the question of breach. Vaughan v Menlove is the earliest clear statement of the objective standard and is a cornerstone case in FE-1 torts courses on the standard of care. It is studied alongside Glasgow Corporation v Muir [1943] and the modern Irish and English cases on breach of duty.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "standard of care",
      "objective standard",
      "breach of duty",
      "reasonable person"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q2",
      "Torts FE-1 2020 Q2"
    ]
  },
  {
    "case_name": "Bolton v Stone",
    "citation": "[1951] AC 850",
    "year": 1951,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "In assessing breach of the standard of care, the court balances the probability that the act will cause harm, the seriousness of the harm risked, and the burden of taking precautions against the risk. The standard of care does not require the elimination of all theoretical risk; a defendant is not negligent merely because damage was possible if the probability of it occurring was so low that a reasonable person would not have taken precautions.",
    "key_quote": "The law in all cases exacts a degree of care commensurate with the risk created. It is not enough to ask whether the risk existed: the risk must be weighed against the practicability of the precaution, and only if a reasonable person would have foreseen and guarded against the risk is there negligence.",
    "full_summary": "Bolton v Stone [1951] AC 850 is a leading House of Lords decision on the standard of care and the balancing of risk in breach of duty. The plaintiff was struck by a cricket ball hit out of a cricket ground; she was standing in a road about 100 yards from the wicket. The cricket club had erected a fence around the ground, and evidence showed that a ball had been hit over the fence on only six occasions in thirty years. The House of Lords held that the club was not liable. Although the risk of injury was foreseeable in principle, the probability that a cricket ball would be hit out of the ground and injure someone on the road was so small that a reasonable person would not have felt obliged to take additional precautions. The magnitude of the potential harm was not catastrophic and the burden of preventing it entirely would have been disproportionate to the small risk. Bolton v Stone introduced what is effectively a cost-benefit analysis into the standard of care enquiry. It is studied in FE-1 torts alongside Paris v Stepney BC [1951] and Latimer v AEC [1953] as part of the balancing exercise for determining breach.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "standard of care",
      "breach of duty",
      "probability of harm",
      "balancing test",
      "risk",
      "reasonable precautions"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q2",
      "Torts FE-1 2018 Q2",
      "Torts FE-1 2021 Q2"
    ]
  },
  {
    "case_name": "Paris v Stepney Borough Council",
    "citation": "[1951] AC 367",
    "year": 1951,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "The standard of care requires the defendant to take into account the particular vulnerability or circumstances of the claimant where these are known or ought to be known. The seriousness of the potential harm to a known vulnerable claimant is one of the factors to be weighed in assessing whether a reasonable person would have taken additional precautions, even if those precautions would not be necessary for a person of ordinary vulnerability.",
    "key_quote": "The fact that the consequences of negligence in this case would be more severe, because the plaintiff was already blind in one eye, is a factor which must be taken into account in measuring the standard of care. The degree of care must be proportionate to the degree of risk.",
    "full_summary": "Paris v Stepney Borough Council [1951] AC 367 is a House of Lords decision on the standard of care that introduces the concept of known vulnerability. The plaintiff, a one-eyed mechanic employed by the defendants, was ordered to hammer a bolt on a vehicle. Without goggles being provided, a splinter entered his remaining good eye and blinded him totally. The council did not provide goggles to mechanics generally. The House of Lords held that the council was negligent. Although the risk of injury to a worker with two good eyes might not have been sufficient to require the provision of goggles as a matter of routine, the defendants knew that Paris had only one eye and that any eye injury would be catastrophic for him. The known severity of the potential harm required that extra precautions be taken in his specific case. Paris v Stepney BC establishes that the standard of care is not uniform but must be calibrated to the known characteristics of the claimant. It is studied in FE-1 torts alongside Bolton v Stone as part of the factors governing the standard of care.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "standard of care",
      "breach of duty",
      "vulnerability",
      "employer's liability",
      "severity of harm"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q2",
      "Torts FE-1 2017 Q2",
      "Torts FE-1 2020 Q2",
      "Torts FE-1 2023 Q2"
    ]
  },
  {
    "case_name": "Latimer v AEC Ltd",
    "citation": "[1953] AC 643",
    "year": 1953,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "The standard of care does not require the taking of all possible precautions regardless of cost or impracticability; the precaution must be proportionate to the risk. An employer who takes all reasonable precautions to make their premises safe after an unforeseen event (such as a flood) is not negligent merely because a residual risk remains, provided that closing the premises entirely would be wholly disproportionate to the risk of harm that remained.",
    "key_quote": "The standard of care requires reasonable precautions, not the elimination of all risk at any cost. The question is whether the reasonable employer would have taken the further step of closing the factory, and the answer is clearly no given the minimal residual risk.",
    "full_summary": "Latimer v AEC Ltd [1953] AC 643 is a House of Lords decision on the standard of care in the employer's liability context. An exceptional rainstorm flooded the defendant's factory, leaving the floors covered in a mixture of oil and water. The defendants spread sawdust over the floors, but did not have enough to cover all of them. The plaintiff slipped on an untreated section of floor and was injured. He argued that the defendants should have closed the factory. The House of Lords held the defendants were not liable. They had taken reasonable precautions given the circumstances — spreading available sawdust, working normally on the treated sections, and warning workers. The residual risk on the untreated areas was small, and closing the factory entirely would have been wholly disproportionate to the risk. Latimer v AEC is the leading authority on the cost-benefit element of the standard of care: precautions must be proportionate to the risk and must be practically achievable. It is studied in FE-1 torts alongside Bolton v Stone [1951] and Paris v Stepney BC [1951].",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "standard of care",
      "breach of duty",
      "employer's liability",
      "cost of precautions",
      "balancing test"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q2",
      "Torts FE-1 2019 Q2",
      "Torts FE-1 2022 Q2"
    ]
  },
  {
    "case_name": "Roe v Minister of Health",
    "citation": "[1954] 2 QB 66",
    "year": 1954,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "The standard of care is measured according to the state of knowledge available at the time of the alleged negligence, not with the benefit of hindsight. A defendant who acts in accordance with the best available knowledge and practice at the time is not negligent merely because subsequent developments reveal that the practice was unsafe. Courts must not view events through 'spectacles of hindsight'.",
    "key_quote": "We must not look at the 1947 accident with 1954 spectacles. The hospitals are not to be condemned because they did not use a precaution which was not general knowledge at the time. We must judge them by the standards of 1947, not by the standards of today.",
    "full_summary": "Roe v Minister of Health [1954] 2 QB 66 is a landmark Court of Appeal decision on the temporal dimension of the standard of care. In 1947, the plaintiff underwent a spinal anaesthetic. The anaesthetic was stored in glass ampoules and became contaminated by a phenol solution through hairline cracks that were invisible to the naked eye. The plaintiff was permanently paralysed as a result. The mechanism by which phenol percolated through invisible cracks was not known to medical science in 1947. The Court of Appeal held that the anaesthetists were not negligent. Denning LJ's famous dictum — 'we must not look at the 1947 accident with 1954 spectacles' — crystallised the principle that the standard of care is assessed by reference to the knowledge available at the time, not by reference to knowledge acquired later. The risk was not recognised or recognisable in 1947, and therefore the failure to guard against it was not a breach of duty. Roe v Minister of Health is a cornerstone of medical negligence and general negligence law in FE-1 torts courses, and is studied alongside Dunne v National Maternity Hospital [1989] IR 91 for the standard of care applicable to medical professionals in Ireland.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "standard of care",
      "breach of duty",
      "medical negligence",
      "hindsight",
      "state of knowledge",
      "temporal standard"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q3",
      "Torts FE-1 2018 Q2",
      "Torts FE-1 2021 Q2",
      "Torts FE-1 2023 Q2"
    ]
  },
  {
    "case_name": "Nettleship v Weston",
    "citation": "[1971] 2 QB 691",
    "year": 1971,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "The standard of care required of a driver is the objective standard of the reasonable competent driver; it is not reduced to account for the driver's inexperience or learner status. A learner driver who causes an accident is judged by the same objective standard as an experienced driver, regardless of the fact that the claimant was aware of their inexperience.",
    "key_quote": "The standard of care in driving is the objective standard of the reasonably competent driver. A learner driver is not permitted to set up their own incompetence as a defence; the standard does not fall because the plaintiff knew the defendant was a learner.",
    "full_summary": "Nettleship v Weston [1971] 2 QB 691 arose when Mrs Weston, a learner driver, crashed her car during a lesson, injuring her instructor (the plaintiff). She argued that the standard of care owed to a passenger who knew they were in a car driven by a learner should be lower than that required of an experienced driver. The Court of Appeal, per Lord Denning MR, held that the standard of care required of any driver is the objective standard of the reasonably competent driver, and this standard is not reduced because the driver is a learner. The plaintiff's knowledge of the defendant's inexperience did not consent to the risk of negligent driving; at most it could go to contributory negligence (which was applied to reduce damages by 50%). Nettleship v Weston is important for confirming the objective standard in the driving context and is studied in FE-1 torts alongside Vaughan v Menlove and Mansfield v Weetabix as illustrations of when (and when not) the objective standard may be modified.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "standard of care",
      "objective standard",
      "learner driver",
      "contributory negligence",
      "road traffic"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q2",
      "Torts FE-1 2019 Q2",
      "Torts FE-1 2022 Q2"
    ]
  },
  {
    "case_name": "Mansfield v Weetabix Ltd",
    "citation": "[1998] 1 WLR 1263",
    "year": 1998,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "The standard of care may be modified where a defendant is struck by a sudden and unavoidable incapacity of which they were not, and could not reasonably have been, aware. A driver who causes an accident as a result of an unexpected medical episode is not negligent if they had no reason to appreciate that they were suffering from, or at risk of, the condition that caused the incapacity.",
    "key_quote": "If a driver loses control of his vehicle because he suffers a sudden and unforeseeable illness, he is not negligent provided he had no warning of the illness and could not reasonably have been expected to appreciate the risk of it.",
    "full_summary": "Mansfield v Weetabix Ltd [1998] 1 WLR 1263 concerned an HGV driver employed by Weetabix who was suffering from a malignant insulinoma — a tumour that caused hypoglycaemic episodes affecting his mental state. He lost consciousness at the wheel, causing his lorry to crash into the plaintiff's shop. The driver had experienced some symptoms but had not been diagnosed. The Court of Appeal held that the driver (and through him, Weetabix) was not negligent. The standard of care is that of a reasonably competent driver who is unaware of any incapacitating condition. Because the driver had no knowledge of the severity of his condition and no reason to appreciate the risk that he would become incapacitated at the wheel, he did not fall below that standard. Mansfield v Weetabix is studied in FE-1 torts as an important qualification to the objective standard of care established in Nettleship v Weston — the standard may be modified in cases of sudden, unforeseeable incapacity of which the defendant was unaware.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "standard of care",
      "sudden incapacity",
      "medical episode",
      "objective standard",
      "road traffic"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q2",
      "Torts FE-1 2021 Q3"
    ]
  },
  {
    "case_name": "Dunne v National Maternity Hospital",
    "citation": "[1989] IR 91",
    "year": 1989,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "In Ireland, the standard of care required of a medical practitioner is that of a reasonable doctor with the relevant specialisation, acting in accordance with a practice accepted as proper by a responsible body of medical practitioners. A defendant is not negligent merely because there is a body of opinion that prefers a different course, provided they acted in accordance with a recognised and responsible body of medical opinion. However, the practice adopted must be capable of withstanding logical analysis.",
    "key_quote": "If the defendant acted in accordance with a practice accepted at the time as proper by a responsible body of medical men skilled in the particular art, this will not be negligence unless the court is satisfied that the body of opinion relied upon is not reasonable or responsible.",
    "full_summary": "Dunne v National Maternity Hospital [1989] IR 91 is the leading Irish Supreme Court decision on the standard of care in medical negligence. A mother and her baby suffered injury during delivery at the National Maternity Hospital in Dublin. The plaintiff alleged that the hospital staff had been negligent in the management of the delivery. Finlay CJ articulated the Irish standard of care in medical negligence. Drawing on the English Bolam test (Bolam v Friern Hospital [1957]) but adapting it for Irish law, the court held that a doctor is not negligent if they act in accordance with a practice accepted as proper by a responsible body of medical opinion, even if another body of opinion would have taken a different approach. However, the Irish courts retain the jurisdiction to hold that a body of medical opinion is not acceptable if it does not withstand logical analysis — thus going further than the English Bolam test. Dunne v National Maternity Hospital remains the primary authority in FE-1 torts and clinical negligence courses for the standard of care in Irish medical negligence cases, and is applied routinely by the High Court and Supreme Court.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "standard of care",
      "medical negligence",
      "Bolam test",
      "responsible body of medical opinion",
      "Ireland"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q4",
      "Torts FE-1 2017 Q4",
      "Torts FE-1 2019 Q4",
      "Torts FE-1 2021 Q4",
      "Torts FE-1 2023 Q4"
    ]
  },
  {
    "case_name": "Ng Chun Pui v Lee Chuen Tat",
    "citation": "[1988] RTR 298",
    "year": 1988,
    "court": "Privy Council",
    "jurisdiction": "UK",
    "legal_principle": "Res ipsa loquitur is not a rule of substantive law or a separate doctrine but an evidential maxim that, in appropriate cases, allows the court to draw an inference of negligence from the circumstances of the accident itself, where the thing causing the damage was under the defendant's control and the accident would not ordinarily happen without negligence. The burden of proof does not permanently shift; once the inference is raised, the defendant must provide an explanation that displaces it.",
    "key_quote": "Res ipsa loquitur is no more than a submission that the evidence in the case, taken as a whole, is such that the inference of negligence ought to be drawn. It is not a magical or talismanic formula; it simply identifies an application of the ordinary principles of evidence.",
    "full_summary": "Ng Chun Pui v Lee Chuen Tat [1988] RTR 298 is a Privy Council decision from Hong Kong on the nature and operation of the res ipsa loquitur principle. A coach crossed a central reservation and crashed into vehicles on the other carriageway, causing deaths and injuries. The plaintiffs relied on res ipsa loquitur to establish negligence. The Privy Council, in a judgment delivered by Lord Griffiths, held that res ipsa loquitur is not a separate rule of law but an evidential mechanism by which the circumstances of an accident may, without more, justify the inference of negligence. Where the inference is properly raised by the circumstances, the evidential burden shifts to the defendant to give an explanation that the court is prepared to accept as showing that the accident could have happened without negligence. On the facts, the defendants gave no explanation and the inference stood. This decision is important for clarifying the nature of res ipsa loquitur as a rule of evidence and is studied in FE-1 torts alongside Byrne v Boadle (1863) and Scott v London and St Katherine Docks (1865).",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "res ipsa loquitur",
      "standard of care",
      "evidential burden",
      "road traffic"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q3",
      "Torts FE-1 2020 Q3"
    ]
  },
  {
    "case_name": "Hooper v Reeve",
    "citation": "(1817) 7 Taunt 698",
    "year": 1817,
    "court": "Common Pleas",
    "jurisdiction": "England",
    "legal_principle": "A defendant is liable in negligence where they create a situation that poses a foreseeable danger to the plaintiff, even if the danger materialises through a chain of events rather than an immediately dangerous act. The objective standard of care requires anticipating the foreseeable consequences of one's acts or omissions.",
    "key_quote": "Where a person creates a state of affairs which they know, or ought to know, is likely to cause harm to another, they are under a duty to take reasonable care to prevent that harm from occurring.",
    "full_summary": "Hooper v Reeve (1817) 7 Taunt 698 is an early common law case that illustrates the forerunner of the modern duty of care doctrine. The defendant left a horse and cart unattended in a street; the horse took fright and moved off, injuring the plaintiff. The question was whether the defendant, by leaving the horse unattended, had breached a duty of care to persons in the vicinity. The court held that the defendant was liable: leaving a horse unattended in a public street created a foreseeable risk of harm to others, and the defendant had failed to take reasonable care to prevent this. Hooper v Reeve is one of a number of early cases that preceded Donoghue v Stevenson and that illustrated the courts' willingness to impose a duty of care on those who created foreseeable risks. It is studied in FE-1 torts courses in the context of the historical development of negligence and the gradual emergence of the duty of care concept.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "standard of care",
      "historical development",
      "foreseeable risk"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Salmon v Heuston",
    "citation": "[1979] IR 201",
    "year": 1979,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "In Irish negligence law, the standard of care requires a defendant to take reasonable precautions commensurate with the foreseeable risks posed by their activities. Where an activity is inherently dangerous, the standard of care is elevated accordingly, and greater precautions must be taken. The burden of establishing that the defendant fell below the relevant standard rests on the plaintiff.",
    "key_quote": "The standard of care is not absolute; it is the standard of the reasonable and prudent person in the circumstances. Where the activity is dangerous, that standard demands more, not less.",
    "full_summary": "Salmon v Heuston [1979] IR 201 is an Irish High Court decision on the standard of care in negligence. The plaintiff suffered injury in circumstances arising from the defendant's activities, and the key question before the court was whether the defendant had fallen below the standard of care expected in the particular context. The High Court applied the standard of the reasonable person to the facts, emphasising that the standard must be calibrated to the level of risk inherent in the activity in question. Where an activity is known to carry a heightened risk of harm, the standard of care rises correspondingly, and more onerous precautions may be required. The judgment is cited in Irish FE-1 courses as an illustration of how Irish courts have applied and developed the standard of care in the context of activities carrying varying levels of risk.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "standard of care",
      "breach of duty",
      "Ireland",
      "dangerous activities"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "McComiskey v McDermott",
    "citation": "[1974] IR 75",
    "year": 1974,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "A plaintiff who voluntarily participates in an inherently dangerous activity with full knowledge of the risks may be taken to have accepted those risks and to have consented to the possibility of injury (volenti non fit injuria). The defence of volenti requires that the plaintiff had full knowledge of the specific risk that materialised and freely and voluntarily agreed to accept it.",
    "key_quote": "For the defence of volenti non fit injuria to succeed, the plaintiff must have had full knowledge of the specific risk that caused their injury and must have freely and voluntarily assumed that risk; knowledge without acceptance of the risk is not enough.",
    "full_summary": "McComiskey v McDermott [1974] IR 75 is a leading Irish Supreme Court decision on the defence of volenti non fit injuria (voluntary assumption of risk). The plaintiff was a passenger in a rally car driven by the defendant in a competitive motor rally. During the event, the car crashed and the plaintiff was injured. The defendant argued that by willingly participating in the rally as a navigator and co-driver, the plaintiff had assumed the risk of the accident. The Supreme Court rejected the volenti defence. The court held that while the plaintiff had accepted the inherent risks of motor rallying, this did not mean he had consented to the specific risk of the defendant's negligent driving. The volenti defence requires consent to the precise risk that materialised — not merely a general acceptance of the activity's dangers. McComiskey v McDermott is a cornerstone FE-1 torts case in Ireland on the elements and limits of the volenti non fit injuria defence, and is regularly distinguished from cases where the defence does succeed.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "volenti non fit injuria",
      "defences",
      "voluntary assumption of risk",
      "Ireland",
      "sport and leisure"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q4",
      "Torts FE-1 2019 Q4",
      "Torts FE-1 2022 Q4"
    ]
  },
  {
    "case_name": "Byrne v Boadle",
    "citation": "(1863) 2 H&C 722",
    "year": 1863,
    "court": "Exchequer",
    "jurisdiction": "England",
    "legal_principle": "The principle of res ipsa loquitur ('the thing speaks for itself') applies where the circumstances of an accident are such that, without any direct evidence of negligence, the occurrence itself raises a reasonable inference that the defendant was negligent. Three conditions are required: (i) the defendant must have had control of the thing causing the harm; (ii) the accident must be of a kind that ordinarily does not occur without negligence; and (iii) there must be no explanation from the plaintiff for the cause.",
    "key_quote": "There are certain cases of which it may be said res ipsa loquitur — the mere fact of the accident having happened is evidence of negligence. A barrel could not roll out of a warehouse without some negligence, and to say that the plaintiff who is injured must call witnesses from the warehouse to prove negligence seems preposterous.",
    "full_summary": "Byrne v Boadle (1863) 2 H&C 722 is the foundational case for the doctrine of res ipsa loquitur. The plaintiff was walking past a flour dealer's warehouse when a barrel of flour fell from an upper window and struck him. He could not prove the specific cause of the accident because all relevant witnesses were in the defendant's control. Pollock CB held that the maxim res ipsa loquitur applied: a barrel of flour does not roll out of a warehouse without negligence on the part of someone in the warehouse, and the mere fact of the accident occurring was itself prima facie evidence of negligence. The plaintiff could rely on this inference without needing to prove precisely how the negligence occurred. Byrne v Boadle is the locus classicus for res ipsa loquitur and is studied in FE-1 torts courses alongside Scott v London (1865), Byrne v MacDonald [1982], and Ng Chun Pui v Lee Chuen Tat [1988] for the evidential doctrine and its requirements.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "res ipsa loquitur",
      "evidential burden",
      "proof of negligence"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q3",
      "Torts FE-1 2018 Q3",
      "Torts FE-1 2021 Q3"
    ]
  },
  {
    "case_name": "Scott v London and St Katherine Docks Co",
    "citation": "(1865) 3 H&C 596",
    "year": 1865,
    "court": "Exchequer",
    "jurisdiction": "England",
    "legal_principle": "Res ipsa loquitur applies where there is no evidence as to how an accident happened, but it is apparent that the accident was of a kind that does not ordinarily happen without negligence. The three requirements for the maxim to apply are: (i) the thing causing the harm must have been under the management and control of the defendant; (ii) the accident was such as, in the ordinary course of things, does not happen if those who manage the thing use proper care; and (iii) the plaintiff was not a contributory cause.",
    "key_quote": "Where the thing is shown to be under the management of the defendant or his servants, and the accident is such as in the ordinary course of things does not happen if those who have the management use proper care, it affords reasonable evidence, in the absence of explanation, that the accident arose from want of care.",
    "full_summary": "Scott v London and St Katherine Docks Co (1865) 3 H&C 596 is one of the leading cases on res ipsa loquitur and provides what is regarded as the classic formulation of the doctrine. The plaintiff, a customs officer, was walking past the defendant's warehouse when he was struck and injured by six sacks of sugar that fell from a crane. He could not explain how the accident occurred. Erie CJ articulated the three requirements for res ipsa loquitur to operate: control of the thing causing harm by the defendant; an accident of the kind that ordinarily does not happen without negligence; and the absence of explanation by the plaintiff. On these facts, the inference of negligence was properly raised: sugar sacks do not fall from cranes without some negligence in management. Scott v London provides the authoritative statement of the res ipsa loquitur requirements and is the standard citation used in FE-1 torts courses alongside Byrne v Boadle (1863).",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "res ipsa loquitur",
      "evidential burden",
      "proof of negligence",
      "control"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q3",
      "Torts FE-1 2018 Q3",
      "Torts FE-1 2021 Q3"
    ]
  },
  {
    "case_name": "Byrne v MacDonald",
    "citation": "[1982] ILRM 27",
    "year": 1982,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "In Irish law, the principle of res ipsa loquitur operates as an evidential aid: where the circumstances of the accident are consistent only with negligence on the part of the defendant, and the defendant was in control of the situation, an inference of negligence arises which the defendant must displace by showing a reasonable explanation for the accident consistent with the absence of negligence.",
    "key_quote": "The principle of res ipsa loquitur applies in Irish law: where the circumstances of the accident are more consistent with negligence than with any other explanation, and the defendant had control, the inference of negligence arises.",
    "full_summary": "Byrne v MacDonald [1982] ILRM 27 is a leading Irish Supreme Court application of the res ipsa loquitur doctrine. The plaintiff was injured in circumstances where a vehicle owned or operated by the defendant behaved in an abnormal manner and caused the accident. The defendant was unable to provide an adequate explanation. The Irish Supreme Court applied the res ipsa loquitur principle: in the absence of a satisfactory explanation from the defendant, the court was entitled to infer negligence from the circumstances. The court confirmed that the doctrine operates in Irish law as an evidential aid, not a separate rule of substantive law, and that the defendant bears the evidential burden of showing that the accident could have occurred without negligence once the prima facie inference arises. Byrne v MacDonald (Supreme Court) is the primary Irish authority on res ipsa loquitur and is studied in FE-1 torts alongside the English cases of Byrne v Boadle (1863) and Scott v London (1865).",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "res ipsa loquitur",
      "Ireland",
      "evidential burden",
      "inference of negligence"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q3",
      "Torts FE-1 2019 Q3",
      "Torts FE-1 2022 Q3"
    ]
  },
  {
    "case_name": "Re Polemis and Furness Withy & Co Ltd",
    "citation": "[1921] 3 KB 560",
    "year": 1921,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "Under the 'direct consequences' test for remoteness of damage, a defendant who is negligent is liable for all the direct consequences of their negligent act, whether or not those consequences were foreseeable. Foreseeability of the particular type of harm is not required for liability; it is enough that the defendant was negligent and that the damage was a direct consequence of the negligence.",
    "key_quote": "If the act would or might probably cause damage, the fact that the damage it in fact causes is not the exact kind of damage one would expect is immaterial, so long as the damage is in fact directly traceable to the negligent act.",
    "full_summary": "Re Polemis and Furness Withy & Co Ltd [1921] 3 KB 560 is an important Court of Appeal decision on remoteness of damage in negligence. Stevedores chartered by the defendant accidentally knocked a plank into the hold of the ship, which caused a spark that ignited petrol vapour, resulting in the destruction of the entire ship by fire. It was foreseeable that the plank might cause some damage if dropped, but the destruction of the ship by fire was not foreseeable. The Court of Appeal held the defendants liable for the full loss. Scrutton LJ applied what became known as the 'direct consequences' test: once the defendant acts negligently, they are liable for all direct consequences of that negligence, even those that are unforeseeable. Re Polemis was overruled by the Privy Council in The Wagon Mound (No. 1) [1961], which substituted the foreseeability test for remoteness. Re Polemis is therefore studied principally as a contrast to The Wagon Mound, and for the historical development of the remoteness doctrine in FE-1 torts.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "remoteness",
      "direct consequences test",
      "Re Polemis test",
      "causation",
      "historical development"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q3",
      "Torts FE-1 2019 Q3",
      "Torts FE-1 2022 Q3"
    ]
  },
  {
    "case_name": "Overseas Tankship (UK) Ltd v Morts Dock & Engineering Co Ltd (The Wagon Mound No 1)",
    "citation": "[1961] AC 388",
    "year": 1961,
    "court": "Privy Council",
    "jurisdiction": "UK",
    "legal_principle": "The test for remoteness of damage in negligence is foreseeability: a defendant is liable only for those consequences of their negligence that were reasonably foreseeable at the time of the negligent act. The direct consequences test from Re Polemis is overruled; a defendant is not liable for unforeseeable consequences merely because the damage was a direct result of their negligence.",
    "key_quote": "The essential factor in determining liability is whether the damage is of such a kind as the reasonable man should have foreseen. It does not seem consonant with current ideas of justice or morality that a person should be held liable for consequences which were not foreseeable to any reasonable man at the time of the act.",
    "full_summary": "The Wagon Mound (No. 1) [1961] AC 388 is the leading Privy Council decision on remoteness of damage. Workers at Morts Dock in Sydney Harbour were welding on a nearby ship when a large quantity of furnace oil was negligently discharged from the defendant's ship, the Wagon Mound, and spread over the water. Sparks from the welding ignited cotton waste floating on the oil, the oil caught fire, and the dock was severely damaged. It was not reasonably foreseeable that the oil would ignite. The Privy Council held the defendants not liable. Viscount Simonds overruled Re Polemis and established that foreseeability is the test for remoteness: a defendant is liable only for damage of a kind that was reasonably foreseeable at the time of the negligent act. The fire damage was of an entirely different kind from the oil fouling that was foreseeable, so the defendants escaped liability. The Wagon Mound is a cornerstone FE-1 torts case on remoteness and is studied alongside Re Polemis (overruled), Smith v Leech Brain (thin skull), and Cambridge Water (Rylands v Fletcher/nuisance).",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "remoteness",
      "foreseeability test",
      "Wagon Mound",
      "causation",
      "type of harm"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q4",
      "Torts FE-1 2017 Q4",
      "Torts FE-1 2019 Q4",
      "Torts FE-1 2021 Q4",
      "Torts FE-1 2023 Q3"
    ]
  },
  {
    "case_name": "Smith v Leech Brain & Co Ltd",
    "citation": "[1962] 2 QB 405",
    "year": 1962,
    "court": "Queen's Bench",
    "jurisdiction": "England",
    "legal_principle": "The 'thin skull' (or 'eggshell skull') rule provides that a defendant who is liable in negligence is responsible for all damage caused to the claimant, even if the extent of that damage is far greater than could have been foreseen because of the claimant's particular susceptibility or pre-existing condition. The defendant must take their victim as they find them: it is sufficient that some harm of the relevant type was foreseeable, even if the precise extent was not.",
    "key_quote": "The test is not whether these employers could reasonably have foreseen that a burn would cause cancer and kill him. The question is whether these employers could reasonably foresee the type of injury he suffered, namely, the burn. What, in the particular case, is the type of injury?",
    "full_summary": "Smith v Leech Brain & Co Ltd [1962] 2 QB 405 is the leading authority on the thin skull rule in negligence. The plaintiff's husband was a worker who, due to the defendant employers' negligence, was burned on the lip by a piece of molten metal. The burn triggered a pre-malignant condition and the plaintiff developed cancer and died. The defendants argued that cancer was not a foreseeable consequence of a burn. Lord Parker CJ held the employers liable for the full consequences, including the cancer and death. Applying the Wagon Mound foreseeability test, he held that it was sufficient that some harm of the type in question — a burn — was foreseeable. The thin skull rule then required the defendants to take their victim as they found him: if the burn triggered an abnormal reaction due to his particular susceptibility, they were liable for the full extent of the resulting harm. Smith v Leech Brain is a cornerstone FE-1 case on the relationship between the Wagon Mound foreseeability test and the thin skull rule, and is also relevant to Irish cases on remoteness.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "remoteness",
      "thin skull rule",
      "eggshell skull",
      "causation",
      "foreseeability",
      "employer's liability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q4",
      "Torts FE-1 2018 Q4",
      "Torts FE-1 2021 Q4"
    ]
  },
  {
    "case_name": "Spartan Steel & Alloys Ltd v Martin & Co (Contractors) Ltd",
    "citation": "[1973] QB 27",
    "year": 1973,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "A defendant whose negligence causes physical damage to property is liable for the physical loss and for consequential economic loss arising directly from that physical damage, but not for pure economic loss that is not consequential on any physical damage. The policy rationale is that imposing liability for all foreseeable economic loss would expose defendants to liability of indeterminate extent to an indeterminate class.",
    "key_quote": "Economic loss that is merely consequential on physical damage is recoverable. But pure economic loss — financial loss unaccompanied by any physical damage to the plaintiff's property — is not recoverable in negligence, save in exceptional circumstances.",
    "full_summary": "Spartan Steel & Alloys Ltd v Martin & Co (Contractors) Ltd [1973] QB 27 is a landmark Court of Appeal decision on recovery for pure economic loss in negligence. The defendants, a contractor, negligently severed an electric cable supplying power to the plaintiff's steel factory. As a result: (i) a 'melt' in the furnace was damaged (physical damage to property); (ii) the plaintiff lost the profit on that melt (consequential economic loss); and (iii) the plaintiff lost the profit on four further melts that could not be processed during the power cut (pure economic loss). Lord Denning MR held that (i) and (ii) were recoverable, but (iii) was not. The latter was pure economic loss — not flowing from any physical damage to property — and recovery was denied on policy grounds: otherwise every contractor cutting a power supply would face liability to an indeterminate number of businesses dependent on that supply. Spartan Steel is the leading FE-1 torts authority on the boundary between recoverable consequential economic loss and irrecoverable pure economic loss in negligence.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "pure economic loss",
      "consequential economic loss",
      "remoteness",
      "policy",
      "duty of care"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q4",
      "Torts FE-1 2019 Q4",
      "Torts FE-1 2022 Q4"
    ]
  },
  {
    "case_name": "Hegarty v O'Loughran",
    "citation": "[1990] 1 IR 148",
    "year": 1990,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "In Irish law, the limitation period for personal injury actions begins to run when the plaintiff has actual or constructive knowledge of the material facts which would justify taking legal action. The 'date of knowledge' rule under the Statute of Limitations (Amendment) Act 1991 ensures that a plaintiff is not statute-barred before they could reasonably have known they had a cause of action.",
    "key_quote": "The limitation period runs from the date of knowledge: when the plaintiff knew or ought reasonably to have known sufficient facts to bring an action. Ignorance of the specific legal right does not postpone the limitation period, but ignorance of the material facts does.",
    "full_summary": "Hegarty v O'Loughran [1990] 1 IR 148 is a seminal Irish Supreme Court decision on the limitation of actions in personal injury cases. The plaintiff had undergone medical treatment many years before commencing proceedings and the defendant argued the claim was statute-barred. The central question was when the limitation period began to run for personal injury claims where the plaintiff was not immediately aware of the injury or its connection to the defendant's conduct. The Supreme Court held that the limitation period is triggered by knowledge — actual or constructive — of the material facts: the injury, its significance, and the fact that it was attributable to the act or omission of the defendant. The court endorsed the principle that the limitation period should not bar a plaintiff before they had a reasonable opportunity to bring a claim. Hegarty v O'Loughran is a key case in FE-1 torts and personal injury courses for the date of knowledge rule and is complemented by the Statute of Limitations (Amendment) Act 1991 which codified these principles in Irish law.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "limitation of actions",
      "date of knowledge",
      "personal injury",
      "Ireland",
      "causation",
      "Statute of Limitations"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q5",
      "Torts FE-1 2020 Q5"
    ]
  },
  {
    "case_name": "Breslin v Corcoran",
    "citation": "[2003] 2 IR 203",
    "year": 2003,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "The Civil Liability Act 1961 provides that where two or more tortfeasors are concurrent wrongdoers who cause the same damage, they are jointly and severally liable to the plaintiff. A plaintiff may recover the full amount of their loss from any one of the concurrent wrongdoers; the contribution between them is a separate matter governed by Part III of the Civil Liability Act 1961.",
    "key_quote": "Where two wrongdoers are concurrent wrongdoers under the Civil Liability Act 1961, each is jointly and severally liable to the plaintiff for the full amount of the damage. The plaintiff is entitled to recover against each concurrent wrongdoer, and the apportionment of liability as between them is a separate issue.",
    "full_summary": "Breslin v Corcoran [2003] 2 IR 203 is an important Irish Supreme Court decision on concurrent wrongdoers and the Civil Liability Act 1961. The plaintiff suffered injury in circumstances involving the negligence of two defendants. A vehicle insurer argued that the Injuries Board (PIAB) procedures affected the allocation of liability between concurrent wrongdoers. The court had to address how the statutory framework for concurrent liability operated in the context of the claim. The Supreme Court confirmed the operation of the Civil Liability Act 1961 in the context of concurrent wrongdoers, holding that the Act's joint and several liability regime applied and that a plaintiff could recover the full loss from any one concurrent wrongdoer. The apportionment of liability between concurrent tortfeasors inter se was a distinct issue governed by Part III of the 1961 Act. The decision is important in FE-1 torts courses for the rules on concurrent liability, joint and several liability, and contributory negligence under Irish statute.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "concurrent wrongdoers",
      "Civil Liability Act 1961",
      "joint and several liability",
      "Ireland",
      "contributory negligence"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q5",
      "Torts FE-1 2021 Q5"
    ]
  },
  {
    "case_name": "Fitzgerald v Dublin City Council",
    "citation": "[1999] 1 IR 595",
    "year": 1999,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "A public authority exercising statutory powers over public infrastructure owes a duty of care to members of the public who may be injured by its failure to maintain or repair that infrastructure in circumstances where it knows or ought to know of the defect. The duty arises not from the mere existence of the statutory power but from the assumption of control over the infrastructure and the foreseeability of harm to road users.",
    "key_quote": "A local authority which has assumed control of a public road and has knowledge of a dangerous condition owes a duty of care to road users who may foreseeably be injured by the failure to repair or remedy the danger.",
    "full_summary": "Fitzgerald v Dublin City Council [1999] 1 IR 595 is an important Irish Supreme Court decision on the duty of care of local authorities in relation to the maintenance of public roads. The plaintiff was injured when they encountered a dangerous defect in a Dublin road that had been known to the City Council for some time but had not been remedied. The Supreme Court held that Dublin City Council owed a duty of care to road users in respect of the maintenance of public roads under its control. The duty arose from the Council's assumption of control over the road and its knowledge of the dangerous condition. The court applied the Ward v McMaster/Glencar framework and found that proximity, foreseeability, and the justice of imposing a duty were all satisfied. This case is significant in Irish public authority liability cases and is studied in FE-1 torts courses as an illustration of how the duty of care applies to local authorities in the exercise of their maintenance responsibilities.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "public authority",
      "local authority",
      "road maintenance",
      "Ireland"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q5",
      "Torts FE-1 2020 Q5"
    ]
  },
  {
    "case_name": "Brown v Cotterill",
    "citation": "(1934) 51 TLR 21",
    "year": 1934,
    "court": "King's Bench",
    "jurisdiction": "England",
    "legal_principle": "Where a contractor erects a structure in a public place and does so negligently such that the structure is unstable, the contractor is liable in negligence to any member of the public who is foreseeably injured when the structure falls. The duty of care extends to the class of persons who are in the immediate vicinity and who are at risk of injury from the defectively erected structure.",
    "key_quote": "A contractor who erects a tombstone or similar structure in a public place is under a duty to those in the vicinity to ensure it is erected safely; if the structure falls because of a defect attributable to the contractor's negligence, they are liable.",
    "full_summary": "Brown v Cotterill (1934) 51 TLR 21 is an English decision on negligence in the erection of structures in public places. A stonemason negligently erected a tombstone; the stone subsequently fell and injured a child who was playing nearby in a graveyard. The contractor argued that he owed no duty of care to the child. The court held the contractor liable. The erection of a heavy stone structure required proper precautions to ensure stability; the contractor who failed to ensure the stone was safely set owed a duty of care to those foreseeably at risk if the structure fell. The foreseeability of persons — particularly children — being in the vicinity of a graveyard made the duty clear. Brown v Cotterill is studied in FE-1 torts courses as an early example of the application of the neighbour principle to structural negligence and as a practical illustration of the duty of care in the context of erecting public structures.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "structural negligence",
      "contractor liability",
      "foreseeable claimant"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Barnett v Chelsea & Kensington Hospital Management Committee",
    "citation": "[1969] 1 QB 428",
    "year": 1969,
    "court": "Queen's Bench",
    "jurisdiction": "England",
    "legal_principle": "The but-for test of causation requires the plaintiff to prove that, but for the defendant's negligence, the damage would not have occurred. If the damage would have occurred regardless of whether the defendant was negligent or not, then the defendant's negligence is not a cause in law of the damage and the claim must fail, notwithstanding any established breach of duty.",
    "key_quote": "The negligence of the defendants was not shown to have caused the death of the deceased. Even if he had been examined and treated with all due care, the deceased would have died. The 'but-for' test of causation is not satisfied.",
    "full_summary": "Barnett v Chelsea & Kensington Hospital Management Committee [1969] 1 QB 428 is the leading case on the but-for test in causation. A night watchman presented at the defendant hospital's casualty department complaining of vomiting after drinking tea. The duty doctor, without examining the watchman, told the nurse to send him home and see his own doctor. The watchman died from arsenic poisoning. The hospital was held to have breached its duty of care, but the court found in favour of the defendant on causation. Nield J held that the 'but-for' test was not satisfied: medical evidence established that even if the watchman had been properly examined and treated, the arsenic poisoning had progressed to the point where he would have died regardless. The defendant's negligence was therefore not a cause of the death. Barnett v Chelsea is the primary FE-1 torts authority on the but-for test and the distinction between breach of duty and causation. It illustrates that establishing negligence is not sufficient — causation must also be independently proven.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "causation",
      "but-for test",
      "medical negligence",
      "breach of duty"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q5",
      "Torts FE-1 2018 Q5",
      "Torts FE-1 2021 Q5",
      "Torts FE-1 2023 Q5"
    ]
  },
  {
    "case_name": "W v Ireland (No 2)",
    "citation": "[1997] 2 IR 141",
    "year": 1997,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "The Irish courts recognised the tort of negligently inflicted psychiatric injury (nervous shock) in the context of a person who witnesses or is closely involved in the aftermath of a traumatic event caused by the defendant's negligence. To recover, a secondary victim must be a person of ordinary fortitude who is in a sufficiently proximate relationship with the primary victim or the event, and the psychiatric injury must be caused by sudden shock rather than gradual stress.",
    "key_quote": "The law of negligence extends to the infliction of genuine psychiatric illness. A person who sustains a recognisable psychiatric illness as a result of witnessing or being closely involved in a traumatic event may recover in negligence, subject to the requirements of proximity and foreseeability.",
    "full_summary": "W v Ireland (No 2) [1997] 2 IR 141 is a significant Irish High Court decision on recovery for psychiatric injury (nervous shock). The plaintiff was a parent of a child who had been abused by a priest, a matter that had been subject to legal proceedings. She claimed that the manner in which the State and the Church had handled the matter had caused her to suffer a serious psychiatric illness. The High Court recognised the tort of negligent infliction of psychiatric injury in Irish law and applied the relevant requirements. The court examined the closeness of the plaintiff's relationship to the primary victim, the directness of the causal connection between the defendant's conduct and the psychiatric injury, and whether the plaintiff was a person of normal fortitude. W v Ireland is studied in FE-1 torts courses as the leading Irish authority on nervous shock and psychiatric injury, and is considered alongside the English cases of Alcock v Chief Constable [1991] and Page v Smith [1996] for the requirements applicable to primary and secondary victims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "psychiatric injury",
      "nervous shock",
      "secondary victim",
      "Ireland",
      "proximity"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q5",
      "Torts FE-1 2019 Q5",
      "Torts FE-1 2022 Q5"
    ]
  },
  {
    "case_name": "Berber v Dunnes Stores Ltd",
    "citation": "[2009] IESC 10",
    "year": 2009,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "An employer owes a duty to take reasonable care for the psychiatric health of their employees as well as their physical health. Where an employer knows or ought to know that an employee is at risk of psychiatric harm arising from workplace conditions or treatment, they are under a duty to take reasonable steps to prevent such harm. The duty requires foreseeability of psychiatric injury to the particular employee in the particular circumstances.",
    "key_quote": "An employer's duty of care extends to the mental health of employees. Where it is reasonably foreseeable that a particular employee faces a real risk of psychiatric harm from their working conditions or treatment, the employer must take reasonable steps to address the risk.",
    "full_summary": "Berber v Dunnes Stores Ltd [2009] IESC 10 is a leading Irish Supreme Court decision on the employer's duty to protect the psychiatric health of employees. The plaintiff, a manager in a Dunnes Stores outlet, suffered from Crohn's disease — a stress-aggravated condition — and claimed that the manner in which the employer managed and treated him caused him to suffer significant psychiatric harm in addition to exacerbating his physical condition. The Supreme Court held that the employer owed a duty of care in respect of the psychiatric health of the employee and applied the test for employer liability for psychiatric harm. The court drew on the English cases of Sutherland v Hatton [2002] and Walker v Northumberland [1995] and applied them to Irish employment law. The employer was found to have breached the duty in the circumstances. Berber v Dunnes Stores is a cornerstone Irish FE-1 torts case on employer psychiatric liability and is regularly cited in personal injury and employment law contexts.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "employer's liability",
      "psychiatric injury",
      "workplace stress",
      "Ireland",
      "duty of care"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q5",
      "Torts FE-1 2019 Q5",
      "Torts FE-1 2022 Q5"
    ]
  },
  {
    "case_name": "Intel Corporation (UK) Ltd v Daw",
    "citation": "[2007] EWCA Civ 70",
    "year": 2007,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "An employer may be liable for psychiatric harm caused by workplace stress even where the employer provided a counselling service, if the employer failed to take any meaningful steps to reduce the source of the stress itself. Providing access to an employee assistance programme does not discharge the employer's duty of care if they have notice of the employee's distress and fail to take reasonable action to alleviate the workload or working conditions that are causing it.",
    "key_quote": "The availability of a counselling service does not in itself discharge the employer's duty of care if the employer knows that the employee is under excessive pressure and fails to take any steps to reduce that pressure.",
    "full_summary": "Intel Corporation (UK) Ltd v Daw [2007] EWCA Civ 70 arose when Ms Daw, a solicitor employed by Intel, suffered a serious depressive illness caused by overwork. She had complained to her manager on repeated occasions about her excessive workload. Intel argued it had discharged its duty of care by having an employee assistance programme offering counselling services. The Court of Appeal upheld the first instance judgment in favour of the plaintiff. Pill LJ held that the availability of a counselling service did not discharge the employer's duty of care where the employer had actual notice of the employee's difficulties and the root cause — the excessive workload — was never addressed. Intel was aware of the employee's overwork and foresaw the risk of psychiatric harm but took no steps to reduce the problem. Intel v Daw is an important qualification to the guidance given in Sutherland v Hatton [2002] and is studied in FE-1 torts and employment law courses for the limits of the counselling service defence to employer psychiatric liability claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "employer's liability",
      "psychiatric injury",
      "workplace stress",
      "counselling service",
      "reasonable steps"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q5",
      "Torts FE-1 2021 Q5"
    ]
  },
  {
    "case_name": "Sutherland v Hatton",
    "citation": "[2002] EWCA Civ 76",
    "year": 2002,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "An employer is liable for psychiatric harm caused by occupational stress only if it was reasonably foreseeable that the particular employee would suffer a breakdown. The employer is generally entitled to take what an employee tells them at face value; if an employee does not communicate distress, the employer will rarely be liable. Where an employer provides a confidential advice service, this will ordinarily discharge the duty of care in the absence of specific signs of psychiatric risk.",
    "key_quote": "The threshold question is whether this kind of harm to this particular employee was reasonably foreseeable. An employer who provides a confidential counselling service with referral to treatment will commonly not be in breach of duty.",
    "full_summary": "Sutherland v Hatton [2002] EWCA Civ 76 is the most important English Court of Appeal decision on employer liability for occupational stress. The case involved four conjoined appeals, each concerning an employee who suffered psychiatric harm from work-related stress. Hale LJ delivered a comprehensive judgment setting out practical guidance on the law governing stress at work claims. The key principles established include: (i) the duty of care applies to psychiatric harm just as to physical harm; (ii) the threshold question is foreseeability of psychiatric harm to the particular employee; (iii) employers are entitled to assume employees can withstand normal work pressures unless they have specific notice of vulnerability; (iv) where an employer offers a confidential counselling service, this will often discharge the duty; and (v) the employee must show that the employer's breach caused the psychiatric harm. Sutherland v Hatton is a cornerstone FE-1 torts case on workplace psychiatric injury and the framework it provides is applied in Irish cases including Berber v Dunnes Stores [2009] and McGrath v Trintech.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "employer's liability",
      "psychiatric injury",
      "workplace stress",
      "foreseeability",
      "occupational stress"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q5",
      "Torts FE-1 2019 Q5",
      "Torts FE-1 2022 Q5"
    ]
  },
  {
    "case_name": "Walker v Northumberland County Council",
    "citation": "[1995] 1 All ER 737",
    "year": 1995,
    "court": "Queen's Bench",
    "jurisdiction": "England",
    "legal_principle": "An employer owes a duty of care to protect employees from psychiatric harm caused by excessive workplace stress. Where an employee has already suffered a stress-related breakdown and the employer is aware of this, the employer is on notice of the employee's particular vulnerability and owes a heightened duty to take steps to prevent a recurrence. Failure to take reasonable protective steps after the first breakdown may render the employer liable for a subsequent psychiatric injury.",
    "key_quote": "Once it was foreseeable that a second breakdown was likely because of the excessive workload and the plaintiff's known vulnerability after the first breakdown, the defendant was in breach of its duty of care in failing to provide adequate assistance.",
    "full_summary": "Walker v Northumberland County Council [1995] 1 All ER 737 is the English case that established the employer's duty of care in respect of occupational stress and psychiatric harm. Mr Walker was a social services area manager who suffered a nervous breakdown due to overwork. He returned to work but the excessive workload continued; he suffered a second breakdown and was dismissed on grounds of ill-health. Coleman J held that the council owed no duty in respect of the first breakdown — psychiatric harm was not foreseeable at that stage — but was liable for the second. After the first breakdown, the employer was on clear notice of Mr Walker's vulnerability to stress-related illness. The promise to provide additional help was not fulfilled, and the foreseeable consequence was a second breakdown. Walker v Northumberland County Council is a foundational FE-1 torts case on occupational stress and is routinely studied alongside Sutherland v Hatton [2002] and Berber v Dunnes Stores [2009].",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "employer's liability",
      "psychiatric injury",
      "workplace stress",
      "foreseeability",
      "vulnerability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q5",
      "Torts FE-1 2019 Q5"
    ]
  },
  {
    "case_name": "Ruffley v Board of Management of St Anne's School",
    "citation": "[2017] IESC 33",
    "year": 2017,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "An employer's disciplinary procedures do not, without more, give rise to liability in negligence for psychiatric harm to an employee, even where the employee suffers a psychiatric illness as a result of the disciplinary process. The duty of care in the employer-employee relationship does not extend to protecting employees from the stress inherent in all disciplinary processes; additional factors, such as manifest unfairness or bad faith, would be required.",
    "key_quote": "An employer is not in breach of their duty of care in negligence merely because an employee suffers psychiatric harm as a consequence of disciplinary proceedings. Something more is required: the proceedings must be conducted in a manner that is in breach of the applicable standard of care, not merely stressful.",
    "full_summary": "Ruffley v Board of Management of St Anne's School [2017] IESC 33 is a significant Irish Supreme Court decision on the duty of care of employers in the context of disciplinary proceedings. The plaintiff, a national school teacher, suffered serious psychiatric injury as a consequence of disciplinary proceedings conducted by the school board. She argued that the manner in which the proceedings were conducted was negligent and caused her identifiable psychiatric harm. The Supreme Court, reversing the High Court, held that the employer was not liable. The majority held that the duty of care does not extend to protecting employees from the inherent stress of disciplinary procedures conducted in good faith and in accordance with applicable rules. The mere fact that such proceedings caused psychiatric harm — even foreseeable harm — did not by itself establish liability. Ruffley is an important Irish FE-1 case on the limits of the employer's duty of care in the psychiatric injury context and on the distinction between lawful employer conduct and tortious conduct.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "employer's liability",
      "psychiatric injury",
      "disciplinary proceedings",
      "Ireland",
      "duty of care"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q5",
      "Torts FE-1 2021 Q5",
      "Torts FE-1 2023 Q5"
    ]
  },
  {
    "case_name": "McGrath v Trintech Technologies Ltd",
    "citation": "[2004] IEHC 342",
    "year": 2004,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "An employer in Ireland owes a duty of care to employees in respect of psychiatric harm caused by workplace stress. The duty requires the employer to take reasonable and appropriate steps to protect employees from foreseeable psychiatric harm arising from their working conditions. Where an employee communicates their distress and the employer fails to take any action, liability may arise.",
    "key_quote": "The employer's duty of care extends to the psychiatric wellbeing of employees. Where an employer has notice that an employee is suffering from excessive workplace stress and takes no steps to address it, the employer may be liable for any resulting psychiatric harm.",
    "full_summary": "McGrath v Trintech Technologies Ltd [2004] IEHC 342 is an Irish High Court decision applying the English workplace stress principles (Walker v Northumberland [1995], Sutherland v Hatton [2002]) to Irish law. The plaintiff was an employee of a technology company who suffered a breakdown caused by excessive workload and stress. He had raised his concerns with management but no action was taken to reduce his workload. Clarke J (as he then was) held that the employer had breached its duty of care. The employer had notice of the employee's distress — he had communicated his difficulties to management — and the psychiatric harm was foreseeable. The failure to take any reasonable steps to address the workload constituted a breach. McGrath v Trintech is an important Irish application of the Sutherland v Hatton framework and is studied in FE-1 torts alongside Berber v Dunnes Stores [2009] as part of the Irish law on occupational stress.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "employer's liability",
      "psychiatric injury",
      "workplace stress",
      "Ireland",
      "foreseeability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q5",
      "Torts FE-1 2020 Q5"
    ]
  },
  {
    "case_name": "Maher v Jabil Global Services Ltd",
    "citation": "[2005] IEHC 130",
    "year": 2005,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "The Irish courts, in applying the employer's duty of care in respect of psychiatric harm, follow the general framework that foreseeability of psychiatric harm to the particular employee is the threshold question. Where the employer is placed on notice that an employee is at risk of psychiatric harm due to workplace conditions and fails to take reasonable steps, liability arises. The burden of proof rests on the plaintiff to establish that the risk was foreseeable to the particular employer.",
    "key_quote": "The threshold question of foreseeability is whether it was reasonably foreseeable that this particular employee would suffer a psychiatric injury. Signs of stress in the employee, communicated to management, are the clearest indication that the threshold is crossed.",
    "full_summary": "Maher v Jabil Global Services Ltd [2005] IEHC 130 is an Irish High Court decision on employer's liability for occupational stress-induced psychiatric injury. The plaintiff suffered a breakdown attributable to excessive workload and insufficient support in her role at Jabil, a manufacturing company. The court had to apply the Irish and English authorities on workplace psychiatric harm. The High Court applied the Sutherland v Hatton guidance and the emerging Irish approach developed in cases such as McGrath v Trintech. The court held that the plaintiff had communicated her difficulties to her employer and that the risk of psychiatric harm was foreseeable at the time the employer failed to act. Liability was established. Maher v Jabil is cited in FE-1 Irish torts courses alongside McGrath v Trintech and Berber v Dunnes Stores as part of the series of Irish decisions applying and developing the law on workplace psychiatric injury.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "employer's liability",
      "psychiatric injury",
      "workplace stress",
      "Ireland",
      "foreseeability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q5"
    ]
  },
  {
    "case_name": "Brady v Beckmann Instruments (Galway) Inc",
    "citation": "[1986] ILRM 361",
    "year": 1986,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "An employer is liable in negligence for psychiatric harm caused to an employee by a manager's bullying or harassing conduct in the workplace where the employer knew or ought to have known of the conduct and failed to take reasonable steps to prevent it. The employer's vicarious liability for the tortious acts of its managerial employees may also apply in such circumstances.",
    "key_quote": "Where an employer is aware, or ought to have been aware, of abusive or bullying conduct by a manager towards an employee and takes no remedial action, the employer may be liable in negligence for any psychiatric harm that results.",
    "full_summary": "Brady v Beckmann Instruments (Galway) Inc [1986] ILRM 361 is an early Irish High Court decision on employer liability in the context of workplace harassment. The plaintiff, an employee, suffered psychiatric harm as a result of persistent hostile and bullying conduct by a supervisor. The employer was alleged to have known of the conduct and failed to address it. The High Court found in favour of the plaintiff. The employer's failure to address identified bullying or harassment by a manager, in circumstances where the psychiatric harm to the plaintiff was a foreseeable consequence of that conduct, constituted a breach of the employer's duty of care. Brady v Beckmann Instruments is an early Irish authority on workplace psychiatric harm and harassment and is studied in FE-1 torts courses as a precursor to the more developed Irish jurisprudence in Berber v Dunnes Stores [2009] and McGrath v Trintech [2004].",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "employer's liability",
      "psychiatric injury",
      "workplace bullying",
      "Ireland",
      "harassment"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q5"
    ]
  },
  {
    "case_name": "Quigley v Complex Tooling and Moulding Ltd",
    "citation": "[2008] IESC 44",
    "year": 2008,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "An employee who suffers psychiatric harm and brings a claim for damages must prove that the employer's breach of duty was a cause of the psychiatric injury. Where the employee suffers from a pre-existing vulnerability to psychiatric illness, the thin skull rule applies: the employer is liable for the full extent of the psychiatric harm suffered, provided that some harm of the relevant type was foreseeable, even if the extent was greater than expected.",
    "key_quote": "The thin skull rule applies to psychiatric injury just as to physical injury. An employer who causes foreseeable psychiatric harm to a vulnerable employee is liable for the full extent of the harm caused, even if the extent was greater than could have been anticipated.",
    "full_summary": "Quigley v Complex Tooling and Moulding Ltd [2008] IESC 44 is an important Irish Supreme Court decision on employer liability for psychiatric harm and the application of the thin skull rule in that context. The plaintiff suffered a serious psychiatric injury following workplace incidents. He had a pre-existing vulnerability to psychiatric illness of which the employer was unaware. The Supreme Court held that the employer was liable for the full extent of the psychiatric harm. The thin skull rule applied in the context of psychiatric injury just as it does in physical injury cases: once some psychiatric harm was foreseeable, the employer was liable for all the damage that flowed from the breach, including damage amplified by a pre-existing susceptibility. The decision is significant for the application of the thin skull rule to psychiatric injury in Irish law and is studied in FE-1 torts alongside Berber v Dunnes Stores and the general principles on remoteness and thin skull.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "employer's liability",
      "psychiatric injury",
      "thin skull rule",
      "Ireland",
      "pre-existing vulnerability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2019 Q5",
      "Torts FE-1 2022 Q5"
    ]
  },
  {
    "case_name": "Wilkinson v Downton",
    "citation": "[1897] 2 QB 57",
    "year": 1897,
    "court": "Queen's Bench",
    "jurisdiction": "England",
    "legal_principle": "A person who wilfully does an act calculated to cause physical harm to another person is liable for that harm, including psychiatric harm. This rule establishes liability for intentional infliction of emotional distress or nervous shock, providing a cause of action independent of negligence where the defendant deliberately causes psychiatric injury.",
    "key_quote": "The defendant wilfully did an act calculated to cause physical harm to the plaintiff, which was likely to cause and did in fact cause nervous shock to her. Such an act is a tort and the plaintiff is entitled to recover.",
    "full_summary": "Wilkinson v Downton [1897] 2 QB 57 is a foundational case on liability for intentional infliction of psychiatric harm. The defendant, as a practical joke, told Mrs Wilkinson that her husband had been seriously injured in an accident and that she should go and bring him home. The shock of this false news caused her to suffer serious physical and psychiatric illness, including vomiting and a weeks-long nervous illness. Wright J held the defendant liable. The defendant had wilfully made a false statement calculated to cause physical harm to the plaintiff. That this harm materialised through nervous shock did not prevent recovery; the law recognised that psychiatric injury was a form of harm for which compensation could be awarded. Wilkinson v Downton established the foundations for liability for intentional psychiatric harm and is a cornerstone FE-1 torts case. It is distinguished from negligent nervous shock cases and is studied alongside Janvier v Sweeney [1919] and the modern authorities on harassment and intentional infliction of distress.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "trespass to the person",
      "intentional torts",
      "psychiatric injury",
      "nervous shock",
      "wilful act"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q6",
      "Torts FE-1 2020 Q6"
    ]
  },
  {
    "case_name": "Tomlinson v Congleton Borough Council",
    "citation": "[2003] UKHL 47",
    "year": 2003,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "Under the Occupiers' Liability Act 1984, an occupier owes a limited duty to trespassers where the occupier knows or has reasonable grounds to believe that a danger exists, that trespassers may come into the vicinity, and that the risk is one against which it is reasonable to offer some protection. The duty is significantly less onerous than the duty owed to lawful visitors and does not require the elimination of all risks, particularly risks created by an individual's own free choice to engage in an inherently risky activity.",
    "key_quote": "The law does not require the occupier to protect the foolhardy from the consequences of their own stupidity. Personal responsibility for one's own actions is an important value; it would be an unacceptable paternalism to hold occupiers liable for injuries caused by those who voluntarily take obvious risks.",
    "full_summary": "Tomlinson v Congleton Borough Council [2003] UKHL 47 is the leading House of Lords decision on the duty owed by occupiers to trespassers and recreational users who are injured as a result of their own voluntary risky activities. The plaintiff, a young man, dived into a shallow lake in a country park against prominent warning signs and suffered a broken neck, rendering him tetraplegic. The House of Lords unanimously held that the Council was not liable. Lord Hoffmann emphasised personal responsibility and held that the risk was obvious, was freely accepted by the plaintiff, and was not one against which it was reasonable to expect the occupier to guard. The occupier's duty under the Occupiers' Liability Act 1984 to trespassers did not require them to protect against self-inflicted risks arising from obvious dangers. The broader social policy dimension — that popular recreational sites should not be stripped of their natural attractions to avoid liability for foolhardy conduct — was explicitly recognised. Tomlinson is a key FE-1 torts case on occupiers' liability, balancing the duty of care against individual autonomy.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "trespassers",
      "Occupiers' Liability Act 1984",
      "personal responsibility",
      "volenti",
      "duty of care"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q6",
      "Torts FE-1 2019 Q6",
      "Torts FE-1 2022 Q6"
    ]
  },
  {
    "case_name": "Allen v Trabolgan Holiday Centre Limited",
    "citation": "[2010] IEHC 129",
    "year": 2010,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "Under the Occupiers' Liability Act 1995, an occupier owes a duty of care to visitors to take such care as is reasonable in all the circumstances. In the case of a recreational or leisure facility, the standard of care is commensurate with the nature of the premises and the activities conducted on them. An occupier of a holiday activity centre owes a duty to ensure that equipment and facilities are safe and fit for the purpose for which they are provided.",
    "key_quote": "The occupier of a holiday or leisure facility owes a duty under the Occupiers' Liability Act 1995 to visitors to take reasonable care in the maintenance and operation of its facilities, equipment and premises.",
    "full_summary": "Allen v Trabolgan Holiday Centre Limited [2010] IEHC 129 concerned a personal injury claim by a visitor to a holiday park in County Cork. The plaintiff sustained injuries while using a recreational facility at the centre. The key issue was the standard of care owed by the occupier of a commercial leisure and holiday facility to its visitors under the Occupiers' Liability Act 1995. The High Court applied the provisions of the 1995 Act and held that the occupier owed a duty of care to visitors to take reasonable precautions for their safety, commensurate with the nature of the activity and premises. The court found that the facility had not maintained its equipment to the required standard and that this constituted a breach of duty. Allen v Trabolgan is a key Irish case on the standard of care owed by commercial leisure operators under the 1995 Act and is studied in FE-1 torts alongside the general provisions of the Act and the cases on visitor classification.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Occupiers' Liability Act 1995",
      "visitors",
      "leisure facility",
      "Ireland",
      "standard of care"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q6",
      "Torts FE-1 2019 Q6",
      "Torts FE-1 2022 Q6"
    ]
  },
  {
    "case_name": "Byrne v Ardenheath Company Limited",
    "citation": "[2017] IECA 293",
    "year": 2017,
    "court": "Court of Appeal",
    "jurisdiction": "Ireland",
    "legal_principle": "Under the Occupiers' Liability Act 1995, the duty owed to recreational users and trespassers is a duty not to injure them intentionally and not to act with reckless disregard for their safety. This duty is significantly less onerous than the duty owed to visitors (the duty of reasonable care). An occupier is not required to make their premises safe for recreational users; they need only avoid reckless disregard.",
    "key_quote": "The standard of reckless disregard for recreational users and trespassers is a lower standard than the duty of reasonable care owed to visitors. The plaintiff must establish that the occupier acted with reckless disregard for the plaintiff's safety — something more than mere negligence.",
    "full_summary": "Byrne v Ardenheath Company Limited [2017] IECA 293 is a significant Irish Court of Appeal decision on the duty owed to recreational users under the Occupiers' Liability Act 1995. The plaintiff was injured while walking through the defendant's lands, which she had entered as a recreational user. The premises contained a concealed hazard. The plaintiff argued that the occupier had breached its duty of care. The Court of Appeal confirmed that the duty owed to recreational users under section 4 of the 1995 Act is the lower 'reckless disregard' standard, not the reasonable care standard applicable to visitors under section 3. The court held that reckless disregard involves a conscious appreciation of the risk combined with a decision to proceed regardless of it; mere negligence does not suffice. On the facts, the court found the occupier had not acted with reckless disregard. This case is a leading authority on the classification of persons under the 1995 Act and the distinction between the duty to visitors and the lower duty to recreational users. It is a core FE-1 torts case on Irish occupiers' liability.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Occupiers' Liability Act 1995",
      "recreational users",
      "reckless disregard",
      "Ireland",
      "visitor classification"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q6",
      "Torts FE-1 2021 Q6",
      "Torts FE-1 2023 Q6"
    ]
  },
  {
    "case_name": "Kirwan v Bray Urban District Council",
    "citation": "[1969] IR 14",
    "year": 1969,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "Under the pre-1995 Act Irish common law, an occupier owed different duties to different classes of entrant: a duty of reasonable care to invitees, a duty to warn of hidden dangers to licensees, and only a duty not to set traps or cause deliberate harm to trespassers. The classification of the entrant was determinative of the duty owed.",
    "key_quote": "The duty owed by an occupier depends on the class to which the entrant belongs. An invitee is owed a duty of reasonable care; a licensee is owed a duty to warn of concealed dangers; a trespasser is owed only a duty not to wilfully injure them.",
    "full_summary": "Kirwan v Bray Urban District Council [1969] IR 14 is a pre-Occupiers' Liability Act 1995 Irish Supreme Court decision illustrating the old common law tripartite classification of entrants. The plaintiff was injured on premises owned by the defendant council. The key issue was the status of the plaintiff as an entrant and the corresponding duty owed to them. The Supreme Court applied the traditional common law categories — invitee, licensee, and trespasser — and held that the duty owed depended entirely on how the plaintiff was classified. Under the old law, an invitee was owed a duty of common duty of care, a licensee was owed a duty to warn of known concealed dangers, and a trespasser was owed only a duty not to be deliberately harmed. The case is studied in FE-1 torts courses primarily as historical context for the reforms introduced by the Occupiers' Liability Act 1995, which replaced the tripartite classification with a simpler framework of visitor, recreational user, and trespasser.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Ireland",
      "invitee",
      "licensee",
      "trespasser",
      "historical development",
      "common law classification"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q6",
      "Torts FE-1 2018 Q6"
    ]
  },
  {
    "case_name": "Healy v Bray Urban District Council",
    "citation": "[1962-63] Ir Jur Rep 9",
    "year": 1962,
    "court": "Circuit Court",
    "jurisdiction": "Ireland",
    "legal_principle": "Under the old common law, a landowner owes a higher duty of care where children are involved, particularly where the land contains an allurement that is likely to attract children and which poses a danger. The allurement doctrine holds that a landowner who creates or maintains an attraction for children may be liable even where the child is technically a trespasser, if the attraction draws the child onto the land.",
    "key_quote": "Where a landowner creates or maintains on their land an object or condition that is likely to attract children and is dangerous to them, the owner owes a higher duty than that ordinarily owed to trespassers, because the allurement effectively amounts to an implied invitation.",
    "full_summary": "Healy v Bray Urban District Council [1962-63] Ir Jur Rep 9 is a pre-1995 Act Irish Circuit Court decision on the allurement doctrine and the duty of care owed to child entrants. A child was injured on land owned by the defendant council which contained an attractive but hazardous feature that drew children to it. The child was technically a trespasser. The court applied the allurement doctrine: where a landowner creates or maintains a feature that constitutes an 'allurement' to children — something attractive and dangerous — the landowner owes a higher duty of care than is owed to adult trespassers. The allurement, in effect, constitutes an implied invitation to children. Healy v Bray UDC is studied in FE-1 torts alongside the pre-1995 Act common law authorities and the child trespasser cases as part of the historical development of occupiers' liability in Ireland.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Ireland",
      "child trespasser",
      "allurement doctrine",
      "trespasser",
      "historical development"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q6",
      "Torts FE-1 2018 Q6"
    ]
  },
  {
    "case_name": "McCowan v Dun Laoghaire Corporation",
    "citation": "[1995] 1 ILRM 477",
    "year": 1995,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "An occupier owes the pre-1995 Act common law duty to invitees to take reasonable care for their safety in respect of dangers of which the occupier knew or ought to have known and which the invitee could not reasonably be expected to discover for themselves. Under the old law, the duty to an invitee was higher than that to a licensee and required active steps to make the premises reasonably safe.",
    "key_quote": "The duty owed by an occupier to an invitee is a duty to take reasonable care that the premises are reasonably safe, including in respect of unusual dangers of which the occupier knows or ought to know.",
    "full_summary": "McCowan v Dun Laoghaire Corporation [1995] 1 ILRM 477 is an Irish High Court decision on the duty of care owed by a local authority as occupier to persons using its public facilities. The plaintiff was injured while using a public amenity area maintained by the Corporation. The question was the standard of care owed by the occupier in the circumstances. The High Court applied the pre-1995 Act invitee standard, holding that the occupier owed a duty to take reasonable care that the premises were reasonably safe for the purposes for which the public were invited to use them. This included an obligation to warn of or remove known dangers that would not be obvious to users. The case is studied in FE-1 torts as an illustration of the pre-1995 Act invitee duty and the transition period leading to the introduction of the Occupiers' Liability Act 1995.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Ireland",
      "invitee",
      "public authority",
      "local authority",
      "standard of care"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Wall v National Parks and Wildlife Service",
    "citation": "[2017] IEHC 78",
    "year": 2017,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "The Occupiers' Liability Act 1995 significantly modifies the duty owed to recreational users of natural amenity areas. Where a person enters land as a recreational user — for leisure, sport, or amenity purposes and without payment — the occupier owes only the lower duty of not acting with reckless disregard for their safety. Natural features and the inherent risks of the natural environment do not ordinarily give rise to liability towards recreational users.",
    "key_quote": "A State body that permits access to natural amenity land for recreational purposes owes only a duty not to act with reckless disregard for the safety of recreational users. The risks inherent in the natural environment do not give rise to liability absent reckless disregard.",
    "full_summary": "Wall v National Parks and Wildlife Service [2017] IEHC 78 concerned a personal injury claim by a person injured while walking on land managed by the National Parks and Wildlife Service. The plaintiff had entered the land for recreational purposes. The court had to determine the appropriate duty of care owed by the State body as occupier. The High Court held that the plaintiff was a recreational user within the meaning of the Occupiers' Liability Act 1995 and that accordingly the occupier owed only the duty not to act with reckless disregard for her safety. The court noted that imposing a higher duty on managers of natural amenity areas would have a chilling effect on access to such lands and would be contrary to the policy underlying the Act. Wall v National Parks is frequently cited in FE-1 torts courses for the 1995 Act's treatment of recreational users and the protection it affords to managers of natural amenity lands.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Occupiers' Liability Act 1995",
      "recreational users",
      "reckless disregard",
      "Ireland",
      "natural amenity"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q6",
      "Torts FE-1 2021 Q6"
    ]
  },
  {
    "case_name": "Sweeney v Ballinteer Community School",
    "citation": "[2009] IEHC 508",
    "year": 2009,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "A school, as occupier of its premises, owes a duty of reasonable care under the Occupiers' Liability Act 1995 to its students as visitors. The standard of care in a school context requires consideration of the particular vulnerability of child visitors and the duty of supervision owed to them. The school's duty includes ensuring that the physical premises and any equipment thereon are reasonably safe for student use.",
    "key_quote": "A school owes a duty of reasonable care to its students as visitors, having particular regard to the vulnerability of children and the school's role in loco parentis. The standard of care must reflect the foreseeable risks to which children on school premises are exposed.",
    "full_summary": "Sweeney v Ballinteer Community School [2009] IEHC 508 arose from an injury sustained by a student on the school premises. The plaintiff alleged that the school, as occupier, had failed to maintain its premises to an adequate standard of safety, resulting in the injury. The High Court applied the Occupiers' Liability Act 1995 and held that the school owed a duty of reasonable care to its students as lawful visitors. The court took account of the particular vulnerability of child visitors and the heightened obligation that flows from the school's duty of supervision in loco parentis. The defective condition of the relevant part of the premises constituted a breach of the duty. Sweeney v Ballinteer School is studied in FE-1 torts courses in the context of occupiers' liability and educational institutions' duty of care to students.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Occupiers' Liability Act 1995",
      "schools",
      "visitors",
      "children",
      "Ireland",
      "in loco parentis"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q6",
      "Torts FE-1 2020 Q6"
    ]
  },
  {
    "case_name": "Lavin v Dublin Airport Authority plc",
    "citation": "[2016] IECA 261",
    "year": 2016,
    "court": "Court of Appeal",
    "jurisdiction": "Ireland",
    "legal_principle": "An occupier of commercial premises owes a duty of reasonable care under section 3 of the Occupiers' Liability Act 1995 to visitors to take such care as is reasonable in all the circumstances. In assessing reasonable care in an airport or transport terminal, the court will consider the volume of user traffic, the nature of the hazard, and the practicability of inspection and maintenance. A one-off undetected hazard may not give rise to liability if the occupier had a reasonable system of inspection in place.",
    "key_quote": "The occupier of a busy commercial premises discharges its duty to visitors by maintaining a reasonable system of inspection and maintenance. Liability does not arise where a transient hazard could not reasonably have been detected and remedied before the plaintiff's accident.",
    "full_summary": "Lavin v Dublin Airport Authority plc [2016] IECA 261 arose from a slip and fall accident at Dublin Airport. The plaintiff fell on a wet floor and claimed that the DAA, as occupier, had breached its duty under the Occupiers' Liability Act 1995. The DAA argued that it had a proper system of inspection and maintenance and that the hazard was transient and could not have been discovered in time to prevent the accident. The Court of Appeal held in favour of the DAA. The court held that an occupier of large, busy commercial premises discharges its duty of reasonable care by having in place a proper system of inspection and maintenance; it is not required to guarantee that every hazard is immediately detected and removed. The hazard in question was transient and there was no evidence that the system of inspection was unreasonable. Lavin v DAA is an important Irish case on the standard of care for occupiers of large commercial premises and is studied in FE-1 torts for the system of inspection defence.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Occupiers' Liability Act 1995",
      "visitors",
      "slip and fall",
      "inspection system",
      "Ireland",
      "commercial premises"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q6",
      "Torts FE-1 2020 Q6",
      "Torts FE-1 2023 Q6"
    ]
  },
  {
    "case_name": "Keegan v Sligo County Council",
    "citation": "[2010] IEHC 189",
    "year": 2010,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "A local authority that owns or manages a public roadway or path owes a duty of care to persons using it as visitors under the Occupiers' Liability Act 1995. Where the plaintiff uses a footpath or public road in ordinary circumstances, they are a visitor and are owed the full standard of reasonable care. The local authority's failure to maintain the surface in a reasonably safe condition may constitute a breach of that duty.",
    "key_quote": "A local authority owes a duty of reasonable care under the Occupiers' Liability Act 1995 to persons using public footpaths and roads under its management and control. Failure to maintain the surface in a reasonably safe condition is a breach of that duty.",
    "full_summary": "Keegan v Sligo County Council [2010] IEHC 189 arose from a personal injury caused by a defect in a public footpath or road surface maintained by Sligo County Council. The plaintiff, who was using the path as an ordinary member of the public, suffered injury when they encountered the defect. The High Court held that the local authority owed a duty of reasonable care to the plaintiff as a visitor under the Occupiers' Liability Act 1995. The court examined the condition of the surface and the period for which the defect had been present, finding that adequate notice existed and that the failure to remedy the defect was a breach of the duty. The decision is cited in FE-1 torts courses alongside the wider Irish authorities on local authority liability for footpath and road maintenance.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Occupiers' Liability Act 1995",
      "local authority",
      "visitors",
      "footpath",
      "Ireland"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Heaves v Westmeath County Council",
    "citation": "Unreported, High Court, 1998",
    "year": 1998,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "Under the Occupiers' Liability Act 1995, a local authority managing public recreational lands owes a duty of care to visitors. Where a local authority is aware of a latent danger on recreational land that it manages, it is required to take reasonable steps to address the danger or to warn visitors of it.",
    "key_quote": "The duty of care owed to visitors under the 1995 Act includes an obligation to warn of, or take steps to remedy, latent dangers on the premises of which the occupier is aware or should be aware.",
    "full_summary": "Heaves v Westmeath County Council is an Irish High Court decision on the duty of care owed by a local authority to members of the public using recreational land under its management. The plaintiff was injured on recreational land managed by Westmeath County Council when they encountered a latent danger. The council was aware, or ought to have been aware, of the hazard. The court held that the council, as occupier of the recreational land, owed a duty of care to visitors using the land. Having notice of the hazard, the failure to take steps to remedy it or warn visitors constituted a breach of the duty. Heaves v Westmeath CC is cited in FE-1 torts courses on occupiers' liability for local authorities and the classification of recreational land users under the 1995 Act.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Occupiers' Liability Act 1995",
      "local authority",
      "recreational land",
      "Ireland",
      "latent danger"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Sheehy v Devil Glen Tours Limited",
    "citation": "Unreported, High Court, 2001",
    "year": 2001,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "An operator of outdoor adventure activities owes a duty of care to participants as visitors under the Occupiers' Liability Act 1995. The standard of care must reflect the inherently risky nature of adventure activities; however, the duty requires that the operator take reasonable precautions to minimise foreseeable risks, including by providing proper instruction, equipment, and supervision.",
    "key_quote": "The operator of a commercial adventure activity owes a duty of care to participants as visitors. The duty requires reasonable precautions appropriate to the hazards inherent in the activity, including adequate supervision, instruction and equipment.",
    "full_summary": "Sheehy v Devil Glen Tours Limited is an Irish High Court decision involving a personal injury claim by a participant in an outdoor adventure activity. The plaintiff suffered injury during a commercially organised outdoor activity operated by the defendant. The key issues were the standard of care owed by the adventure operator and whether the inherent risks of the activity displaced liability. The High Court held that the operator owed a duty of reasonable care to participants as visitors under the 1995 Act. The inherently risky nature of adventure activities did not negate the duty; rather, the operator was required to take reasonable precautions to manage the risks, including proper instruction, adequate equipment, and appropriate supervision. The case is studied in FE-1 torts in the context of commercial adventure and leisure operators' liability under the 1995 Act.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Occupiers' Liability Act 1995",
      "adventure activities",
      "Ireland",
      "visitors",
      "supervision"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Kirby v Burke and Holloway",
    "citation": "[1944] IR 207",
    "year": 1944,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "Under the pre-1995 Act common law, the duty of care owed by an occupier to a licensee was to warn of concealed dangers — dangers known to the occupier but not obvious to the entrant. The occupier was not required to make the premises safe for the licensee but merely to disclose hidden traps or dangers of which the occupier had actual knowledge.",
    "key_quote": "The duty owed to a licensee is to warn of unusual dangers of which the licensor has knowledge and which the licensee does not know and cannot reasonably be expected to discover. There is no obligation to make the premises safe.",
    "full_summary": "Kirby v Burke and Holloway [1944] IR 207 is a pre-Occupiers' Liability Act 1995 Irish High Court decision on the duty owed to a licensee. The plaintiff entered the defendant's premises as a licensee (with permission but without a commercial or economic purpose) and was injured by an unusual and concealed danger of which the defendant was aware. The court applied the traditional licensee rule: the occupier owes a duty to warn of concealed or unusual dangers known to the occupier but not reasonably discoverable by the entrant. The occupier was not required to go further and make the premises generally safe. Kirby v Burke and Holloway is studied in FE-1 torts as part of the pre-1995 Act framework and the historical development of occupiers' liability in Ireland from the common law categories to the 1995 Act.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers' liability",
      "Ireland",
      "licensee",
      "concealed danger",
      "historical development",
      "common law classification"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q6",
      "Torts FE-1 2018 Q6"
    ]
  },
  {
    "case_name": "A v National Blood Authority",
    "citation": "[2001] 3 All ER 289",
    "year": 2001,
    "court": "Queen's Bench",
    "jurisdiction": "England",
    "legal_principle": "Under the Consumer Protection Act 1987 (implementing the EU Product Liability Directive), a product is defective if it does not provide the safety that persons generally are entitled to expect. Where the defect is a manufacturing defect (a non-standard product that deviates from the producer's intended design), the development risks defence is not available. The existence of a known but unavoidable risk does not negative a finding that a product is defective.",
    "key_quote": "If a standard product — what the producer intended to produce — was the very product that caused the harm, then the development risks defence might apply. But if the product is non-standard — a defective unit that deviated from the norm — then the development risks defence cannot be relied upon merely because the risk was known but unavoidable.",
    "full_summary": "A v National Blood Authority [2001] 3 All ER 289 is the leading English decision on the Consumer Protection Act 1987 and product liability for defective blood products. The claimants had been infected with Hepatitis C through contaminated blood transfusions administered through the National Blood Authority. The Authority contended that the blood products were not 'defective' within the Act and that the 'development risks' defence applied because the risk was known but unavoidable with the technology of the time. Burton J held that the blood products were defective: the public was entitled to expect that blood supplied for transfusion would be safe. He distinguished between standard products (where the development risks defence may apply) and non-standard products that deviate from the producer's intended design (where it cannot). Contaminated blood units were non-standard products: each was a product that did not meet the standard the producer intended. A v National Blood Authority is a cornerstone FE-1 torts case on the Consumer Protection Act 1987, the definition of defective products, and the development risks defence.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "product liability",
      "Consumer Protection Act 1987",
      "defective products",
      "development risks defence",
      "strict liability",
      "EU Directive"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q7",
      "Torts FE-1 2019 Q7",
      "Torts FE-1 2022 Q7"
    ]
  },
  {
    "case_name": "Wilkes v DePuy International Ltd",
    "citation": "[2016] EWHC 3096 (QB)",
    "year": 2016,
    "court": "Queen's Bench",
    "jurisdiction": "England",
    "legal_principle": "In assessing whether a medical device is 'defective' under the Consumer Protection Act 1987, the court must have regard to what persons generally are entitled to expect of the product. For medical implants, the expected standard is high, but some failure rate is to be expected. A product is not defective merely because it fails in a particular case if it performs to the standard generally expected of such products and the failure is within the range of acceptable performance.",
    "key_quote": "The question of what safety the public is entitled to expect from a medical device must be assessed by reference to the product as a class. A low but known failure rate does not of itself establish that a product is defective; all the circumstances must be considered.",
    "full_summary": "Wilkes v DePuy International Ltd [2016] EWHC 3096 (QB) arose from the use of metal-on-metal hip replacement implants manufactured by DePuy. The plaintiff's implant failed, requiring revision surgery. He alleged that the implant was defective under the Consumer Protection Act 1987. Andrews J conducted a detailed analysis of the definition of 'defective' under the 1987 Act, applying the approach established in A v National Blood Authority [2001]. The court had to consider whether the failure of a single implant established that the product as a class was defective, or whether the relevant standard required examination of the overall performance of the product line. The court found that the product was defective on the facts — the failure rate in this model was higher than that which persons generally were entitled to expect — but emphasised that this was a fact-specific assessment rather than a rule that any implant failure establishes defectiveness. Wilkes v DePuy is studied alongside A v National Blood Authority in FE-1 torts courses on medical device product liability and the Consumer Protection Act 1987.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "product liability",
      "Consumer Protection Act 1987",
      "defective products",
      "medical devices",
      "hip implant",
      "strict liability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q7",
      "Torts FE-1 2021 Q7"
    ]
  },
  {
    "case_name": "Dineen v DePuy International Ltd",
    "citation": "[2016] IEHC 654",
    "year": 2016,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "Under the Liability for Defective Products Act 1991 (implementing the EU Product Liability Directive in Ireland), a manufacturer is strictly liable for damage caused by a defective product. The plaintiff must prove the damage, the defect, and the causal link. The development risks defence under section 7 of the 1991 Act is available where the state of scientific knowledge at the time of supply was not such as to enable the defect to be discovered.",
    "key_quote": "The plaintiff must establish on the balance of probabilities that the product was defective, that they suffered damage, and that the defect caused the damage. The Liability for Defective Products Act 1991 imposes strict liability on the producer.",
    "full_summary": "Dineen v DePuy International Ltd [2016] IEHC 654 is the Irish High Court's application of the Liability for Defective Products Act 1991 in the context of defective metal-on-metal hip replacement implants. The plaintiff underwent hip replacement surgery using a DePuy implant that subsequently failed and required revision surgery. She alleged that the implant was defective within the meaning of the 1991 Act. The High Court applied the three-part test under the 1991 Act: the plaintiff had to prove that the product was defective (that it did not provide the safety which persons generally are entitled to expect), that she suffered damage, and that the defect caused the damage. The court examined the evidence on the performance of metal-on-metal implants of the relevant design and found that the plaintiff had established the defect on the balance of probabilities. Dineen v DePuy is the leading Irish case on the Liability for Defective Products Act 1991 in the medical devices context and is a key FE-1 torts case alongside the English Wilkes v DePuy decision.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "product liability",
      "Liability for Defective Products Act 1991",
      "defective products",
      "medical devices",
      "hip implant",
      "Ireland",
      "strict liability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q7",
      "Torts FE-1 2021 Q7",
      "Torts FE-1 2023 Q7"
    ]
  },
  {
    "case_name": "Richardson v LRD Products Ltd",
    "citation": "Unreported, High Court, 1991",
    "year": 1991,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "An Irish manufacturer of consumer goods is subject to both the common law duty of care established in Donoghue v Stevenson [1932] and, after its implementation, the strict liability regime under the Liability for Defective Products Act 1991. Under the common law, the manufacturer's duty extends to the ultimate consumer where the product reaches them in the form in which it left the manufacturer without a reasonable possibility of intermediate examination.",
    "key_quote": "A product manufacturer in Ireland owes a duty of care to consumers in accordance with Donoghue v Stevenson. The question is whether the product was defective and whether the defect caused the plaintiff's injury.",
    "full_summary": "Richardson v LRD Products Ltd is an Irish High Court decision applying the Donoghue v Stevenson duty of care to a manufactured product that was alleged to be defective. The plaintiff suffered injury caused by a defect in a product manufactured by the defendant. The case predated the full implementation of the Liability for Defective Products Act 1991 and was decided on the basis of the common law negligence duty. The court applied the Donoghue v Stevenson principle and found that the manufacturer owed a duty of care to the plaintiff as the ultimate consumer. The existence of the defect and its causal link to the injury was established on the evidence. Richardson v LRD Products is studied in FE-1 torts courses as an illustration of the application of the common law duty of care in product liability, in contrast to the strict liability regime subsequently introduced by the 1991 Act.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "product liability",
      "negligence",
      "manufacturer liability",
      "Donoghue v Stevenson",
      "Ireland",
      "defective products"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Baker v KTM Sportmotorcycle UK Ltd",
    "citation": "[2017] EWCA Civ 378",
    "year": 2017,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "Under the Consumer Protection Act 1987, the development risks defence will not be available where the state of scientific knowledge, viewed objectively and as a whole, was such that the defect could have been discovered. The defence requires the producer to show that no producer of products of the same description could have discovered the defect at the time; it is not satisfied merely by showing that the specific producer was unaware of the defect.",
    "key_quote": "The development risks defence requires an objective assessment of the state of scientific knowledge at the time. It is not enough that the particular producer was unaware of the defect; the question is whether any producer could have discovered it.",
    "full_summary": "Baker v KTM Sportmotorcycle UK Ltd [2017] EWCA Civ 378 involved a personal injury claim arising from the failure of a motorcycle component. The Court of Appeal had to consider the scope of the development risks defence under the Consumer Protection Act 1987 and whether the producer had discharged the evidential burden of establishing it. The court confirmed the objective nature of the development risks defence: it is not assessed from the perspective of the individual producer but from the perspective of the state of scientific and technical knowledge generally accessible at the time of supply. The defence requires the producer to establish that the defect was not discoverable by any producer applying the best available knowledge and methods at the time. Baker v KTM is studied in FE-1 torts courses alongside A v National Blood Authority for the scope and application of the development risks defence under the 1987 Act.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "product liability",
      "Consumer Protection Act 1987",
      "development risks defence",
      "defective products",
      "motorcycle"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q7",
      "Torts FE-1 2021 Q7"
    ]
  },
  {
    "case_name": "Ide v ATB Sales Ltd",
    "citation": "[2008] EWCA Civ 424",
    "year": 2008,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "In product liability claims, the burden of proving that a product was defective and that the defect caused the injury rests on the claimant. However, in appropriate cases the court may draw an inference of defect from the circumstances of the failure — a form of res ipsa loquitur — where the product has failed in a way that is not consistent with normal use and there is no other plausible explanation.",
    "key_quote": "Where a product has failed in a manner inconsistent with its proper use and no other credible explanation has been offered, the court may infer from the circumstances that the product was defective, without requiring direct technical proof of the specific defect.",
    "full_summary": "Ide v ATB Sales Ltd [2008] EWCA Civ 424 arose from an accident in which a bicycle handlebar snapped without apparent cause, causing the rider to fall and sustain serious injury. The plaintiff alleged that the handlebar was defective. There was no direct technical evidence of the specific defect because the handlebar had been destroyed in the accident. The Court of Appeal held that the court was entitled to infer from the circumstances that the handlebar was defective: bicycle handlebars do not snap without cause in normal use, and the only credible explanation for the failure was a pre-existing defect in the product. This amounted to the application of a form of inferential reasoning analogous to res ipsa loquitur in the product liability context. Ide v ATB Sales is studied in FE-1 torts alongside Baker v KTM and A v National Blood Authority for the evidentiary aspects of product liability claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "product liability",
      "Consumer Protection Act 1987",
      "defective products",
      "inference of defect",
      "res ipsa loquitur",
      "bicycle"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q7"
    ]
  },
  {
    "case_name": "McCambridge Ltd v Joseph Brennan Bakeries",
    "citation": "[2012] IEHC 519",
    "year": 2012,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "The tort of passing off protects a trader's goodwill by preventing a rival from misrepresenting their goods as those of the plaintiff or as being associated with the plaintiff. The three elements of passing off are: (i) goodwill in the plaintiff's get-up or mark; (ii) a misrepresentation by the defendant that is likely to deceive the public; and (iii) damage to the plaintiff's goodwill as a result. Note: This case also addresses packaging/product similarities.",
    "key_quote": "The essential elements of passing off require proof of goodwill, misrepresentation, and damage. The misrepresentation must be one likely to deceive members of the public into thinking that the defendant's product is that of the plaintiff.",
    "full_summary": "McCambridge Ltd v Joseph Brennan Bakeries [2012] IEHC 519 is a leading Irish High Court decision on the tort of passing off and product packaging. McCambridge, the maker of a well-known Irish brown bread, alleged that Brennan's had adopted packaging for its own brown bread that was deceptively similar to McCambridge's distinctive packaging, thereby passing off Brennan's bread as being associated with or made by McCambridge. The High Court (Charleton J) found that McCambridge had established goodwill in its distinctive packaging, that Brennan's packaging constituted a misrepresentation likely to deceive a substantial section of the relevant public, and that damage to McCambridge's goodwill was established. An injunction was granted. McCambridge v Brennan's Bakeries is an important Irish case on passing off and is studied in FE-1 torts and commercial law courses for the application of the three-part passing off test and the importance of product get-up in Irish trade mark and competition law.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "passing off",
      "goodwill",
      "misrepresentation",
      "product packaging",
      "Ireland",
      "get-up"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q8",
      "Torts FE-1 2021 Q8"
    ]
  },
  {
    "case_name": "Superquinn Ltd v Bray Urban District Council",
    "citation": "[1998] 3 IR 542",
    "year": 1998,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "A private nuisance claim requires proof of an unreasonable interference with the plaintiff's use and enjoyment of land. The defendant need not intend to cause nuisance; it is sufficient that the interference is unreasonable. A local authority responsible for flooding caused by inadequate drainage infrastructure may be liable in private nuisance to landowners whose property is damaged by the resulting flood.",
    "key_quote": "Private nuisance consists of an unreasonable interference with the plaintiff's use and enjoyment of land. It is not necessary to prove intent; the test is whether the interference is unreasonable in all the circumstances.",
    "full_summary": "Superquinn Ltd v Bray Urban District Council [1998] 3 IR 542 is an Irish High Court decision on the tort of private nuisance in the context of flooding caused by defective drainage infrastructure. Superquinn's premises were flooded on a number of occasions due to the inadequacy of drains under the Council's management. Superquinn claimed in private nuisance, public nuisance, and negligence. The High Court held that the Council was liable in private nuisance: the repeated flooding constituted an unreasonable interference with Superquinn's use and enjoyment of its land. The council had control over the drainage system and the flooding was a foreseeable consequence of its failure to maintain it adequately. The court found that the council had adopted the nuisance by its failure to remedy the problem within a reasonable time. The decision is important in FE-1 torts courses on private nuisance, public authority liability, and the liability of an occupier for the adoption of pre-existing nuisances.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "nuisance",
      "private nuisance",
      "flooding",
      "public authority",
      "Ireland",
      "drainage",
      "unreasonable interference"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q8",
      "Torts FE-1 2020 Q8"
    ]
  },
  {
    "case_name": "Rylands v Fletcher",
    "citation": "(1868) LR 3 HL 330",
    "year": 1868,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "A person who for their own purposes brings onto their land and collects and keeps there anything likely to do mischief if it escapes must keep it at their peril; if they do not do so, they are prima facie answerable for all the damage which is the natural consequence of its escape. This is the rule of strict liability for non-natural use of land.",
    "key_quote": "We think that the true rule of law is that the person who for his own purposes brings on his land and collects and keeps there anything likely to do mischief if it escapes must keep it at his peril, and if he does not do so is prima facie answerable for all the damage which is the natural consequence of its escape.",
    "full_summary": "Rylands v Fletcher (1868) LR 3 HL 330 is one of the most important decisions in the law of tort. The defendant employed independent contractors to construct a reservoir on his land. The contractors negligently failed to seal old mine shafts. When the reservoir was filled, water burst through the shafts and flooded the plaintiff's mine. The defendant was not personally negligent. Blackburn J's rule, affirmed by the House of Lords, established strict liability for the escape of things brought onto land and used for a 'non-natural' purpose. A defendant who accumulates dangerous things on their land is liable for the consequences of any escape, regardless of negligence or intention. Lord Cairns LC added the requirement that the use of land must be 'non-natural'. The rule has been significantly narrowed: in Cambridge Water Co [1994] the House of Lords required that the type of harm must be foreseeable, and in Transco v Stockport MBC [2004] it was confirmed that the rule is a strict rule of liability applying only to extraordinary and unusual uses of land. The rule has not been formally adopted in Ireland, where the Hanrahan v Merck Sharpe & Dohme line of authority governs. It is a fundamental case in FE-1 torts.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "Rylands v Fletcher",
      "strict liability",
      "nuisance",
      "non-natural use",
      "escape",
      "land"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q8",
      "Torts FE-1 2017 Q8",
      "Torts FE-1 2019 Q8",
      "Torts FE-1 2021 Q8"
    ]
  },
  {
    "case_name": "Rickards v Lothian",
    "citation": "[1913] AC 263",
    "year": 1913,
    "court": "Privy Council",
    "jurisdiction": "UK",
    "legal_principle": "The rule in Rylands v Fletcher applies only to the non-natural use of land. The installation of an ordinary domestic water supply system in a building is a natural and ordinary use of land; where water escapes due to the malicious act of a stranger, the occupier is not liable under Rylands. The 'non-natural use' requirement limits the rule to special, unusual, or extraordinary uses of land.",
    "key_quote": "It is not every use to which land is put that brings into operation the rule in Rylands v Fletcher. It must be some special use bringing with it increased danger to others, and must not merely be the ordinary use of the land or such a use as is proper for the general benefit of the community.",
    "full_summary": "Rickards v Lothian [1913] AC 263 is the Privy Council decision that defined and limited the 'non-natural use' requirement in Rylands v Fletcher. The defendant was a tenant of commercial premises. Water pipes on the premises were deliberately blocked by a third party, causing flooding that damaged the plaintiff's property in the floors below. The defendant argued there was no non-natural use. Lord Moulton held that the ordinary installation of plumbing and a water supply in a building was a natural use of land and did not attract the strict Rylands liability. He articulated the principle that non-natural use must involve a 'special use' bringing increased danger to others beyond what is ordinary and proper for the general benefit of the community. Rickards v Lothian is a cornerstone FE-1 torts case on the non-natural use requirement in Rylands v Fletcher and is studied alongside the case itself and Cambridge Water Co [1994].",
    "subjects": [
      "torts"
    ],
    "topics": [
      "Rylands v Fletcher",
      "strict liability",
      "non-natural use",
      "nuisance",
      "land"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q8",
      "Torts FE-1 2019 Q8"
    ]
  },
  {
    "case_name": "Read v J Lyons & Co Ltd",
    "citation": "[1947] AC 156",
    "year": 1947,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "The rule in Rylands v Fletcher requires an escape from land in the defendant's occupation or control. Where the injury occurs on the defendant's own land and the dangerous substance does not escape to adjoining property, the rule has no application. Liability for injuries suffered on the defendant's own premises must be found, if at all, in negligence rather than in Rylands v Fletcher.",
    "key_quote": "The strict rule in Rylands v Fletcher applies only when there is an escape from the defendant's land. There is no escape here; the plaintiff was injured on the defendant's premises by an explosion. Rylands does not apply.",
    "full_summary": "Read v J Lyons & Co Ltd [1947] AC 156 is a House of Lords decision that established the 'escape' requirement as a necessary element of Rylands v Fletcher liability. The plaintiff, a government inspector, was injured when a shell exploded in the defendant's munitions factory, which she was inspecting. No dangerous substance had escaped from the factory onto neighbouring land; the explosion occurred entirely within the factory. The House of Lords held that the rule in Rylands v Fletcher did not apply because there had been no escape. The dangerous thing — the explosive shells — had not escaped from the defendant's land; the plaintiff was injured while physically present on the defendant's premises. There was also no negligence established. Read v J Lyons is studied in FE-1 torts for the 'escape' requirement in Rylands and for the limitations of the strict liability rule.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "Rylands v Fletcher",
      "strict liability",
      "escape requirement",
      "nuisance",
      "land"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q8",
      "Torts FE-1 2020 Q8"
    ]
  },
  {
    "case_name": "Cambridge Water Company v Eastern Counties Leather plc",
    "citation": "[1994] 2 AC 264",
    "year": 1994,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "The rule in Rylands v Fletcher requires that the type of harm caused by the escape must have been reasonably foreseeable by the defendant at the time of the accumulation. Foreseeability of the relevant type of damage is a necessary element of Rylands liability. The rule in Rylands is a specific application of the law of private nuisance and therefore also requires foreseeability of damage.",
    "key_quote": "Foreseeability of damage of the relevant type is a prerequisite of the recovery of damages both in private nuisance and under the rule in Rylands v Fletcher. The defendant cannot be liable if the type of damage caused was not reasonably foreseeable at the time of the relevant activity.",
    "full_summary": "Cambridge Water Company v Eastern Counties Leather plc [1994] 2 AC 264 is a landmark House of Lords decision that restricted the rule in Rylands v Fletcher by imposing a foreseeability requirement. Eastern Counties Leather, a tannery, used a chemical solvent which seeped through the floor into the ground and contaminated the plaintiff's borehole, rendering the water unfit for human consumption. The contamination was unforeseeable at the time it occurred. The House of Lords held that Eastern Counties Leather was not liable under Rylands v Fletcher because the type of damage — contamination of a borehole — was not foreseeable at the relevant time. Lord Goff held that foreseeability of the relevant type of harm is required both in private nuisance and under Rylands. The rule in Rylands v Fletcher was confined to a sub-species of private nuisance. Cambridge Water Company is a key FE-1 torts case that significantly limits Rylands v Fletcher and is studied alongside the case itself, Rickards v Lothian, and Transco v Stockport MBC [2004].",
    "subjects": [
      "torts"
    ],
    "topics": [
      "Rylands v Fletcher",
      "strict liability",
      "nuisance",
      "foreseeability",
      "environmental",
      "land"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q8",
      "Torts FE-1 2018 Q8",
      "Torts FE-1 2021 Q8"
    ]
  },
  {
    "case_name": "Hanrahan v Merck Sharp & Dohme (Ireland) Ltd",
    "citation": "[1988] ILRM 629",
    "year": 1988,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "In Irish law, the torts of nuisance and the rule in Rylands v Fletcher apply to protect landowners from unreasonable interference caused by the escape of pollutants or harmful substances from neighbouring premises. Where the emission of harmful substances from a factory causes physical injury to neighbouring landowners and their livestock, a cause of action in nuisance arises. The onus may be reversed where the defendant has exclusive knowledge of its processes.",
    "key_quote": "In a case where the defendant has exclusive control over the substances causing the harm and the plaintiff cannot establish precisely what happened, it may be appropriate to hold that the burden is on the defendant to establish that it was not negligent.",
    "full_summary": "Hanrahan v Merck Sharp & Dohme (Ireland) Ltd [1988] ILRM 629 is a landmark Irish Supreme Court decision on nuisance and strict liability for industrial pollution. The Hanrahan family farmed land adjacent to a pharmaceutical manufacturing plant operated by Merck Sharp & Dohme. They alleged that emissions from the plant had damaged their health, harmed their livestock, and polluted their land. The Supreme Court (Henchy J) found for the plaintiffs. The court applied private nuisance and held that the interference with the plaintiffs' use and enjoyment of their land was established. Importantly, the court also addressed the evidential difficulty faced by plaintiffs in proving industrial pollution cases: where the defendant has exclusive control of the processes causing harm, it may be appropriate to reverse the normal burden of proof in respect of negligence. Hanrahan is the leading Irish authority on industrial nuisance and environmental tort law and is a key case in FE-1 torts courses alongside Rylands v Fletcher and Cambridge Water Co.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "nuisance",
      "private nuisance",
      "Rylands v Fletcher",
      "industrial pollution",
      "Ireland",
      "strict liability",
      "burden of proof"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q8",
      "Torts FE-1 2018 Q8",
      "Torts FE-1 2021 Q8",
      "Torts FE-1 2023 Q8"
    ]
  },
  {
    "case_name": "Sullivan v Creed",
    "citation": "[1904] 2 IR 317",
    "year": 1904,
    "court": "Court of Appeal",
    "jurisdiction": "Ireland",
    "legal_principle": "A defendant who brings a dangerous thing onto land is strictly liable for the consequences if it escapes and causes damage. In Irish law, the rule in Rylands v Fletcher applies where a person accumulates something inherently dangerous on their land and it escapes, causing foreseeable harm to neighbouring property.",
    "key_quote": "The rule in Rylands v Fletcher applies in Ireland. A person who accumulates a dangerous thing on their land must keep it at their peril; if it escapes and damages the property of another, they are prima facie liable.",
    "full_summary": "Sullivan v Creed [1904] 2 IR 317 is one of the earliest Irish cases applying the rule in Rylands v Fletcher. The plaintiff's property was damaged when a dangerous substance accumulated by the defendant on his land escaped and caused the damage. The case established that the Rylands v Fletcher rule was part of Irish common law. The Irish Court of Appeal confirmed that the principles articulated in Rylands v Fletcher applied in Ireland and that a landowner who accumulates a dangerous thing on their land for their own purposes is strictly liable for the consequences of any escape that causes foreseeable harm to neighbouring property. Sullivan v Creed is a fundamental Irish authority in FE-1 torts on the reception of Rylands v Fletcher in Irish law and is studied alongside Hanrahan v Merck Sharp & Dohme [1988].",
    "subjects": [
      "torts"
    ],
    "topics": [
      "Rylands v Fletcher",
      "strict liability",
      "nuisance",
      "Ireland",
      "escape",
      "dangerous thing"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q8",
      "Torts FE-1 2019 Q8"
    ]
  },
  {
    "case_name": "Connolly v South of Ireland Asphalt Co",
    "citation": "[1977] IR 99",
    "year": 1977,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "A defendant operating an industrial process that creates noise, dust, fumes, or vibrations affecting neighbouring occupiers may be liable in private nuisance where the interference is unreasonable having regard to the character of the neighbourhood, the extent and duration of the interference, and the gravity of the harm caused. Isolated or temporary interference may not constitute actionable nuisance; persistent and substantial interference with the enjoyment of land will.",
    "key_quote": "Private nuisance consists of an unreasonable interference with the plaintiff's use and enjoyment of their land. Whether the interference is unreasonable depends on the character of the neighbourhood, the utility of the defendant's conduct, and the extent and gravity of the harm.",
    "full_summary": "Connolly v South of Ireland Asphalt Co [1977] IR 99 is an Irish High Court decision on private nuisance in the context of industrial operations. The plaintiff's land and household were subjected to persistent interference — noise, dust, and vibration — emanating from the defendant's nearby asphalt plant. The plaintiff claimed in private nuisance. The High Court considered the requirements of private nuisance: unreasonable interference with the plaintiff's use and enjoyment of land. The court examined the character of the neighbourhood, the duration and intensity of the interference, and the gravity of the harm caused to the plaintiff. It held that the interference constituted an actionable private nuisance and granted appropriate relief. Connolly v South of Ireland Asphalt is cited in FE-1 torts courses as an Irish application of the private nuisance principles and is studied alongside Superquinn v Bray and Hanrahan v Merck.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "nuisance",
      "private nuisance",
      "Ireland",
      "industrial operations",
      "unreasonable interference",
      "noise and dust"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q8",
      "Torts FE-1 2020 Q8"
    ]
  },
  {
    "case_name": "Hussey v Twomey",
    "citation": "[2009] IESC 1",
    "year": 2009,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "In an action for negligence or nuisance, the plaintiff must prove on the balance of probabilities that the defendant's breach of duty caused the harm. In Irish law, where a plaintiff's injuries may have been caused by either the defendant's negligence or a pre-existing condition, the defendant is liable only for the additional harm attributable to the negligence, not for the entirety of the plaintiff's condition.",
    "key_quote": "The plaintiff must prove that the defendant's breach of duty materially contributed to or caused the harm. Where the harm is divisible — partly pre-existing and partly caused by the defendant — the defendant is liable only for the additional harm caused by their negligence.",
    "full_summary": "Hussey v Twomey [2009] IESC 1 is an Irish Supreme Court decision addressing causation in personal injury claims involving pre-existing conditions. The plaintiff suffered injury in an accident caused by the defendant but also had a pre-existing medical condition that affected the same area. The key question was whether the defendant was liable for the plaintiff's entire condition or only for the additional harm caused by the accident. The Supreme Court held that the defendant was liable only for the additional harm caused by the negligence, not for the pre-existing condition. Where harm is divisible, the defendant is not liable for the part that existed independently of their breach. The court applied the principle of proportionate causation in the context of divisible injury. Hussey v Twomey is an important Irish case on causation and the apportionment of harm between pre-existing conditions and negligently caused injury. It is studied in FE-1 torts courses on causation.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "causation",
      "pre-existing condition",
      "Ireland",
      "apportionment",
      "divisible harm"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q5"
    ]
  },
  {
    "case_name": "Weir Rogers v SF Trust Ltd",
    "citation": "[2005] IEHC 92",
    "year": 2005,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "In an action for private nuisance, a tenant or licensee of land who suffers unreasonable interference with their use and enjoyment of the land has locus standi to bring a nuisance claim, even if they do not hold the freehold. The defendant need not own the land from which the nuisance emanates; it is sufficient that they have control over the activity or condition causing the interference.",
    "key_quote": "A person who has a sufficient interest in the use and enjoyment of land has locus standi to bring an action in private nuisance. The interest need not be freehold ownership.",
    "full_summary": "Weir Rogers v SF Trust Ltd [2005] IEHC 92 is an Irish High Court decision addressing issues of standing (locus standi) in private nuisance and the elements of the tort. The plaintiff was a commercial tenant who suffered interference with the use of the premises arising from activities carried on by the defendant on neighbouring land. The High Court held that the plaintiff, as a tenant, had sufficient interest in the use and enjoyment of the land to bring a nuisance claim. The court applied the traditional private nuisance principles and found that the interference was unreasonable in the circumstances. Weir Rogers v SF Trust is cited in FE-1 torts courses as an Irish case on the requirements of private nuisance and the standing of tenants to bring nuisance claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "nuisance",
      "private nuisance",
      "locus standi",
      "Ireland",
      "tenant",
      "interference"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Phelan v Coillte Teo",
    "citation": "[1993] 1 IR 18",
    "year": 1993,
    "court": "High Court",
    "jurisdiction": "Ireland",
    "legal_principle": "A statutory body exercising its functions in relation to land owes a duty of care to persons foreseeably at risk from the manner in which those functions are exercised. The Occupiers' Liability Act does not displace the common law of negligence where the injury arises from the manner in which the defendant manages its land as a commercial enterprise rather than from the state of the land per se.",
    "key_quote": "The fact that the defendant manages State forestry land does not insulate it from the duty of care applicable to persons foreseeably affected by its operations. The ordinary principles of negligence apply.",
    "full_summary": "Phelan v Coillte Teo [1993] 1 IR 18 is an Irish High Court decision concerning the duty of care of Coillte, the State forestry body, in its management of forestry land. The plaintiff suffered injury in circumstances arising from Coillte's management activities on land under its control. The key issue was whether Coillte owed a duty of care in respect of its forestry management activities. The High Court held that Coillte, as a statutory body operating commercial forestry, owed a duty of care to persons foreseeably at risk from its operations. The court applied the Ward v McMaster duty of care analysis and found the requisite proximity between Coillte and the plaintiff. Phelan v Coillte is studied in FE-1 torts courses on the duty of care of statutory bodies and on occupiers' liability in the context of forestry land.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "duty of care",
      "public authority",
      "statutory body",
      "Ireland",
      "occupiers' liability",
      "forestry"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q5"
    ]
  },
  {
    "case_name": "Limpus v London General Omnibus Company",
    "citation": "(1862) 1 H&C 526",
    "year": 1862,
    "court": "Exchequer",
    "jurisdiction": "England",
    "legal_principle": "An employer is vicariously liable for the tortious acts of an employee done in the course of employment, even where the employee is acting contrary to an express prohibition by the employer. An act is done in the course of employment if it is a wrongful and unauthorised mode of doing an act which the employee was authorised to do.",
    "key_quote": "The act was done by the driver in the course of his employment, even though it was done contrary to an express prohibition. The employers are liable because the servant was doing an act which he was employed to do — namely, drive an omnibus — though he did it in a wrongful way.",
    "full_summary": "Limpus v London General Omnibus Company (1862) 1 H&C 526 is a foundational case on vicarious liability. A bus driver, contrary to express instructions from his employer, raced his bus against a rival bus and caused a collision injuring the plaintiff. The defendant argued that the driver was acting outside the course of employment because he had been expressly forbidden from racing. The Court of Exchequer held the company vicariously liable. The driver was employed to drive the omnibus and was doing exactly that — driving the omnibus — albeit in a negligent and forbidden manner. An express prohibition does not take an act outside the course of employment if the act is simply an unauthorised or negligent mode of performing an authorised task. Limpus is a foundational FE-1 torts case on the scope of 'course of employment' and the significance of express prohibitions in vicarious liability. It is studied alongside the modern cases Lister v Hesley Hall [2001] and Mohamud v Morrison [2016].",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "course of employment",
      "employer's liability",
      "prohibition",
      "authorised act"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q9",
      "Torts FE-1 2018 Q9"
    ]
  },
  {
    "case_name": "Ormrod v Crosville Motor Services Ltd",
    "citation": "[1953] 1 WLR 1120",
    "year": 1953,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "An owner of a vehicle may be vicariously liable for the negligent driving of another person who drives the vehicle with the owner's consent and for the owner's purposes. Where a vehicle is used partly for the benefit of the owner, the owner may be liable even if the driver is not strictly an employee.",
    "key_quote": "Where the owner of a vehicle consents to another person driving it for the owner's purposes, and that person drives negligently, the owner may be vicariously liable as though the driver were their servant.",
    "full_summary": "Ormrod v Crosville Motor Services Ltd [1953] 1 WLR 1120 is an English Court of Appeal decision on vicarious liability in the context of vehicle ownership and agency. The defendant owned a car which his friend drove for the purpose of meeting the defendant at another location (partly for the friend's own purposes and partly for the defendant's convenience). The friend negligently caused an accident. The Court of Appeal held the owner vicariously liable. Although the driver was not strictly an employee, the owner had authorised the use of his vehicle for a common purpose and had a sufficient interest in the journey to justify imposing liability. The 'master's business' principle extended to situations involving agency relationships. Ormrod v Crosville is studied in FE-1 torts courses as an illustration of extended vicarious liability beyond the strict employer-employee relationship, in particular in vehicle ownership and agency contexts.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "vehicle owner",
      "agency",
      "course of employment",
      "authorised use"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Lister v Hesley Hall Ltd",
    "citation": "[2001] UKHL 22",
    "year": 2001,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "An employer is vicariously liable for the deliberate criminal acts of an employee where those acts are so closely connected with the employment that it would be fair and just to hold the employer vicariously liable. The 'close connection' test asks whether the employee's wrongdoing is so closely connected with the duties they were engaged to perform that it would be fair and just to hold the employer vicariously liable, even for deliberate torts.",
    "key_quote": "The sufficiency of the connection between the employment and the wrongdoing is the touchstone of liability. If the employee's wrong is so closely connected with acts he was authorised to do that it would be fair and just to hold the employer vicariously liable, then the employer will be liable.",
    "full_summary": "Lister v Hesley Hall Ltd [2001] UKHL 22 is a landmark House of Lords decision that transformed vicarious liability for intentional wrongdoing by employees. A warden employed at a school boarding house sexually abused boys in his care. Hesley Hall, the school, was sued vicariously. The previous test ('frolic of his own' or Salmond test) would have denied liability because sexual abuse could not be characterised as an authorised act done in an unauthorised way. The House of Lords, per Lord Steyn, adopted the 'close connection' test from the Canadian authority Bazley v Curry [1999]: an employer is vicariously liable where the employee's wrongdoing is so closely connected with acts they were employed to do that it would be fair and just to hold the employer liable. The warden's acts were inextricably linked with his employment — he was employed to take care of the boys, and the abuse was an exercise of that power. Lister v Hesley Hall is a watershed FE-1 case on vicarious liability and the close connection test, forming the foundation for the subsequent UKSC jurisprudence.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "close connection test",
      "sexual abuse",
      "intentional wrongdoing",
      "employer's liability",
      "course of employment"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q9",
      "Torts FE-1 2018 Q9",
      "Torts FE-1 2021 Q9"
    ]
  },
  {
    "case_name": "Dubai Aluminium Co Ltd v Salaam",
    "citation": "[2002] UKHL 48",
    "year": 2002,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "A partnership (or employer) may be vicariously liable under the Partnership Act 1890 for the wrongful acts of a partner committed in the ordinary course of the firm's business. The 'close connection' test from Lister applies: the question is whether the acts were so closely connected with acts which the partner was authorised to do that it would be fair and just to hold the firm vicariously liable.",
    "key_quote": "The 'close connection' test is the right test: whether the partner's wrongful conduct was so closely connected with acts he was authorised to do that, for the purpose of liability of innocent co-partners, it may fairly and properly be regarded as done by him while acting in the ordinary course of the firm's business.",
    "full_summary": "Dubai Aluminium Co Ltd v Salaam [2002] UKHL 48 is a significant House of Lords decision applying the close connection test to the vicarious liability of a partnership for a partner's dishonest acts. A partner in a firm of solicitors assisted in a massive fraud against Dubai Aluminium by drafting sham agreements. The firm was sued vicariously. The House of Lords held the firm vicariously liable. Lord Nicholls applied the close connection test from Lister and held that the dishonest acts were so closely connected with the partner's authorised act (drafting legal agreements) that it was fair and just to hold the firm liable. The acts were performed in the ordinary course of carrying out professional work for which the firm was retained. Dubai Aluminium is studied in FE-1 torts courses on vicarious liability, in particular the application of the close connection test to professional firms and partnership liability.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "close connection test",
      "partnership",
      "solicitors",
      "employer's liability",
      "fraud"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q9",
      "Torts FE-1 2019 Q9"
    ]
  },
  {
    "case_name": "Majrowski v Guy's and St Thomas's NHS Trust",
    "citation": "[2006] UKHL 34",
    "year": 2006,
    "court": "House of Lords",
    "jurisdiction": "England",
    "legal_principle": "An employer can be vicariously liable under the Protection from Harassment Act 1997 for harassment committed by an employee in the course of employment. The general principle of vicarious liability extends to statutory torts as well as common law torts, subject to any contrary provision in the statute.",
    "key_quote": "The principle of vicarious liability applies to statutory torts, including harassment under the Protection from Harassment Act 1997, unless the statute expressly or by necessary implication excludes it. An employer may therefore be vicariously liable for workplace harassment by an employee.",
    "full_summary": "Majrowski v Guy's and St Thomas's NHS Trust [2006] UKHL 34 arose when Mr Majrowski brought a claim against his employer NHS Trust for harassment by his manager under the Protection from Harassment Act 1997. The question was whether an employer could be vicariously liable for harassment committed by an employee under the 1997 Act. The House of Lords held that vicarious liability was not confined to common law torts but extended to statutory torts unless the statute excluded it. The 1997 Act contained no such exclusion. Accordingly, the NHS Trust could be vicariously liable for its manager's harassment of the claimant, provided the harassment occurred in the course of employment. Majrowski is studied in FE-1 torts on the extension of vicarious liability to statutory torts and on employer liability for workplace harassment.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "harassment",
      "statutory tort",
      "Protection from Harassment Act 1997",
      "employer's liability",
      "workplace"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2017 Q9",
      "Torts FE-1 2020 Q9"
    ]
  },
  {
    "case_name": "JGE v Portsmouth Roman Catholic Diocesan Trust",
    "citation": "[2012] EWCA Civ 938",
    "year": 2012,
    "court": "Court of Appeal",
    "jurisdiction": "England",
    "legal_principle": "Vicarious liability may extend beyond the strict employer-employee relationship to a relationship that is 'akin to employment', even where no contract of employment exists. Where the relevant relationship involves sufficient elements of control, integration into the organisation, and the conduct of activities on behalf of the defendant, vicarious liability may be imposed on the organisation for the wrongdoing of the individual.",
    "key_quote": "The question of whether there is a relationship giving rise to vicarious liability is not answered simply by asking whether a contract of employment exists. The court must ask whether the relationship between the parties is akin to employment, looking at the degree of control and the integration of the individual into the defendant's activities.",
    "full_summary": "JGE v Portsmouth Roman Catholic Diocesan Trust [2012] EWCA Civ 938 is a Court of Appeal decision extending vicarious liability beyond the traditional employment relationship. The claimant had been abused by a parish priest when she was a child. The priest was not a direct employee of the diocese (priests are not technically employed under a contract of service) but the diocese argued it was not vicariously liable. The Court of Appeal held that the relationship between a bishop and a priest was sufficiently akin to employment to give rise to vicarious liability. The bishop had control over where the priest served and the priest carried out functions on behalf of the Church. The relationship was close enough to employment to impose vicarious liability for acts committed in that capacity. JGE is studied in FE-1 torts as an important step in the expansion of vicarious liability to non-employment relationships and forms part of the jurisprudence leading to the Christian Brothers [2012] and Cox v Ministry of Justice [2016] cases.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "akin to employment",
      "Roman Catholic Church",
      "priests",
      "sexual abuse",
      "employer's liability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q9",
      "Torts FE-1 2021 Q9"
    ]
  },
  {
    "case_name": "O'Keeffe v Hickey",
    "citation": "[2008] IESC 72",
    "year": 2008,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "In Irish law, the State and the Catholic Church are not vicariously liable for the sexual abuse of a national school pupil by a teacher where the teacher was employed by the Catholic Church as manager of the school and was not an employee of the State. The dual management system of Irish national schools places responsibility for the teacher on the Church manager, not the Minister for Education. The close connection test does not arise where no employment relationship exists between the State and the abuser.",
    "key_quote": "The State is not vicariously liable for the acts of teachers in national schools. Teachers were employed by and under the control of the local manager — the Church — not the Minister for Education. The absence of an employment relationship between the State and the teacher precludes vicarious liability.",
    "full_summary": "O'Keeffe v Hickey [2008] IESC 72 is a significant Irish Supreme Court decision on vicarious liability arising from the abuse of children in the national school system. The plaintiff had been sexually abused by a national school teacher in the 1970s. She sued both the Church and the State. The Supreme Court was asked to determine whether the Minister for Education was vicariously liable. The court held that the State was not vicariously liable. Under the Irish national school system, teachers in Church-managed schools were employed by the Board of Management (controlled by the Church), not by the State. The Minister for Education paid teachers' salaries but this did not create an employment relationship sufficient to found vicarious liability. The Church manager was the relevant employer. O'Keeffe v Hickey was subsequently challenged before the European Court of Human Rights (O'Keeffe v Ireland (2014)) where Ireland was found to have violated Article 3 of the ECHR by failing to put in place an adequate regulatory framework to prevent abuse. The case is a key Irish FE-1 case on institutional abuse and vicarious liability.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "Ireland",
      "sexual abuse",
      "national schools",
      "State liability",
      "employer-employee",
      "education"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2015 Q9",
      "Torts FE-1 2018 Q9",
      "Torts FE-1 2021 Q9",
      "Torts FE-1 2023 Q9"
    ]
  },
  {
    "case_name": "Hickey v McGowan",
    "citation": "[2017] IESC 6",
    "year": 2017,
    "court": "Supreme Court",
    "jurisdiction": "Ireland",
    "legal_principle": "Following the expansion of vicarious liability in England (Lister, Christian Brothers, Cox v Ministry of Justice), the Irish Supreme Court adopted the close connection test and the two-stage approach to determining vicarious liability: (i) whether the relationship between the tortfeasor and the defendant is one capable of giving rise to vicarious liability; and (ii) whether the close connection between the tort and the relationship is sufficient to make it just and fair to hold the defendant vicariously liable.",
    "key_quote": "Irish law has adopted the two-stage test for vicarious liability: first, whether the relationship between the wrongdoer and the defendant is one that is capable of giving rise to vicarious liability; and second, whether the wrongdoing was so closely connected with the relationship that it is fair and just to hold the defendant liable.",
    "full_summary": "Hickey v McGowan [2017] IESC 6 is the landmark Irish Supreme Court decision that adopted the modern two-stage approach to vicarious liability. The case arose from the sexual abuse of a student by a teacher at a fee-paying secondary school. The school sought to deny vicarious liability, arguing that the acts were outside the course of employment. The Supreme Court, in a judgment delivered by Clarke J (as he then was), followed the English Supreme Court jurisprudence from Lister [2001], Christian Brothers [2012], and Cox v Ministry of Justice [2016]. The court adopted the two-stage test: (i) whether the relationship is capable of giving rise to vicarious liability; and (ii) whether there is sufficient close connection between the wrong and the relationship. Both stages were satisfied on the facts: the teacher was employed by the school, and the abuse was closely connected with the position of trust and authority conferred by the employment. Hickey v McGowan is the primary Irish authority on vicarious liability and the two-stage test, superseding O'Keeffe v Hickey to some degree on the methodology, and is a key FE-1 case.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "close connection test",
      "sexual abuse",
      "school",
      "Ireland",
      "employer's liability",
      "two-stage test"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2018 Q9",
      "Torts FE-1 2021 Q9",
      "Torts FE-1 2023 Q9"
    ]
  },
  {
    "case_name": "Bazley v Curry",
    "citation": "[1999] 2 SCR 534",
    "year": 1999,
    "court": "Supreme Court of Canada",
    "jurisdiction": "Canada",
    "legal_principle": "Vicarious liability is imposed where there is a strong and direct connection between the creation of risk by the employer and the harm done by the employee's wrong. Where an employer creates a situation that gives an employee power over vulnerable people and the relationship materially increases the risk that the power will be abused, vicarious liability should be imposed.",
    "key_quote": "The policy rationale for vicarious liability is best served by asking whether the enterprise and the employee's wrong are linked in the sense that the employer, by creating the enterprise and putting the employee in a position of power or intimacy, materially enhanced the risk of the wrong being done.",
    "full_summary": "Bazley v Curry [1999] 2 SCR 534 is the Supreme Court of Canada decision that articulated the policy rationale for vicarious liability in a way that influenced the subsequent English law development in Lister v Hesley Hall [2001]. A non-profit organisation operated residential care homes for children. An employee sexually abused children in his care. The court had to determine whether the organisation was vicariously liable. McLachlin J (as she then was) held that vicarious liability should be imposed where the employer's enterprise creates a risk of harm and the employee's wrong is closely connected with that risk. The organisation's operation of a residential care facility gave the employee power over vulnerable children and materially increased the risk of abuse of that power. Bazley v Curry is studied in FE-1 torts courses as the Canadian authority that underpins the 'close connection' test adopted in Lister [2001] and Hickey v McGowan [2017], and for its articulation of the policy rationale for vicarious liability.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "close connection test",
      "sexual abuse",
      "employer's liability",
      "policy",
      "enterprise risk"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q9",
      "Torts FE-1 2019 Q9"
    ]
  },
  {
    "case_name": "Collins v Wilcock",
    "citation": "[1984] 1 WLR 1172",
    "year": 1984,
    "court": "Queen's Bench",
    "jurisdiction": "England",
    "legal_principle": "A battery consists of the intentional application of unlawful force to the person of another. Any intentional touching of the body of another person without their consent or lawful justification is a battery. Even a very slight touching may constitute a battery; what is required is that the touching be intentional and hostile or unconsented to, unless it falls within the implied licence of ordinary everyday social contact.",
    "key_quote": "A battery consists in the intentional touching of another person without his consent or lawful excuse. The fundamental principle is the right of every person to have his body inviolate. The touching need not be hostile in the sense of being aggressive; any intentional physical contact is a battery unless justified.",
    "full_summary": "Collins v Wilcock [1984] 1 WLR 1172 is a leading Queen's Bench decision on the tort of battery. A police officer restrained a woman's arm to detain her without having the legal power to do so (she had not been lawfully arrested). The woman scratched the officer. The court had to determine whether the officer's act and the woman's response involved actionable torts. Goff LJ articulated the principles of battery with great clarity: every person has the right to the inviolability of their person; any intentional and unconsented touching is a battery unless it falls within the implied licence for ordinary everyday social contact (a tap on the shoulder, etc.). The officer's restraint of the woman was an unlawful battery; the woman's scratching in response was lawful self-defence. Collins v Wilcock is a cornerstone FE-1 torts case on the tort of battery and the inviolability of the person.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "trespass to the person",
      "battery",
      "consent",
      "police powers",
      "unlawful force",
      "self-defence"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": [
      "Torts FE-1 2016 Q10",
      "Torts FE-1 2019 Q10",
      "Torts FE-1 2022 Q10"
    ]
  },
  {
    "case_name": "Leame v Bray",
    "citation": "(1803) 3 East 593",
    "year": 1803,
    "court": "King's Bench",
    "jurisdiction": "England",
    "legal_principle": "In trespass to the person, the act of the defendant must be direct and immediate. An injury caused by a direct act of the defendant — even if not intended to cause harm — may found an action in trespass vi et armis. The historical distinction between trespass (direct interference) and action on the case (consequential or indirect harm) determined which form of action was appropriate.",
    "key_quote": "Where the injury is the immediate result of the defendant's force, the appropriate remedy is by action of trespass vi et armis; where the injury is consequential upon an act not in itself unlawful, the appropriate action is on the case.",
    "full_summary": "Leame v Bray (1803) 3 East 593 is an early case that illustrates the historical distinction between trespass vi et armis and action on the case — the forerunner of the modern distinction between trespass to the person (direct injury) and negligence (indirect or consequential injury). The plaintiff was injured when the defendant's horse-drawn carriage directly struck him while the defendant was driving on the wrong side of the road. The court held that the appropriate action was trespass vi et armis because the injury was the direct and immediate result of the defendant's act. The alternative form — action on the case — would have been appropriate only if the injury were a consequential, indirect result of the defendant's conduct. Leame v Bray is studied in FE-1 torts courses as part of the historical foundation of the law of trespass to the person and the evolution from the old common law forms of action to the modern tort of negligence.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "trespass to the person",
      "direct interference",
      "historical development",
      "trespass vi et armis",
      "negligence"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Various Claimants v Catholic Child Welfare Society (Christian Brothers)",
    "citation": "[2012] UKSC 56",
    "year": 2012,
    "court": "UK Supreme Court",
    "jurisdiction": "UK",
    "legal_principle": "The UKSC held that an unincorporated association (the Christian Brothers) could be vicariously liable for abuse by its members. The court set out a two-stage test: (1) a relationship akin to employment; (2) a close connection between that relationship and the tort. The case expanded vicarious liability to relationships that are not strictly employment contracts.",
    "key_quote": "The relationship between the Brothers and the Institute had many of the characteristics of a relationship between employer and employee, sufficient to satisfy the first stage of the test for vicarious liability.",
    "full_summary": "This landmark Supreme Court decision arose from claims by former pupils at St William's Catholic approved school in Market Weighton who alleged physical and sexual abuse by members of the De La Salle Institute (the Christian Brothers). The UKSC examined whether an unincorporated association could be held vicariously liable for the tortious acts of its members. The court articulated a two-stage test for vicarious liability: first, whether the relationship between the defendant and the tortfeasor is one that is capable of giving rise to vicarious liability; second, whether there is a sufficiently close connection between that relationship and the act or omission in question. On the first stage, the court held that the relationship between the Brothers and their Institute bore sufficient hallmarks of an employment relationship — including subjection to direction, integration into an enterprise, and activity undertaken on behalf of the organisation — to satisfy the test. The decision significantly broadened the doctrine beyond strict employment contracts, establishing that religious and other institutional relationships could generate vicarious liability. The case is frequently cited as authority for the modern two-stage test and remains essential reading for vicarious liability questions in professional examinations.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "non-delegable duty",
      "institutional abuse",
      "akin to employment"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Cox v Ministry of Justice",
    "citation": "[2016] UKSC 10",
    "year": 2016,
    "court": "UK Supreme Court",
    "jurisdiction": "UK",
    "legal_principle": "The UKSC held the Ministry of Justice vicariously liable for the negligence of a prisoner who was working in the prison kitchen under supervision. The court confirmed that vicarious liability extends beyond formal employment to relationships where the tortfeasor is integrated into the defendant's enterprise and the activity is carried out for the defendant's benefit.",
    "key_quote": "The question is whether the tortfeasor's activities are so closely integrated into the business of the defendant, and so much a part of the risk created by that business, that it is fair, just and reasonable to impose vicarious liability.",
    "full_summary": "Mrs Cox, a catering manager at Swansea Prison, was injured when a prisoner working in the kitchen dropped a bag of rice on her back. The prisoner was not an employee of the Ministry of Justice in the traditional sense but was required by prison authorities to work in the kitchen as part of prison operations. The UKSC, applying the two-stage test from Christian Brothers, held that the relationship between the Ministry and the prisoner was sufficiently akin to employment. The prisoner was integrated into the defendant's operation, working under supervision and for the direct benefit of the prison's catering function. The court emphasised that the policy rationale for vicarious liability — that those who carry on an enterprise for their own purposes should bear the risks created by that enterprise — applied equally here. Cox was decided on the same day as Mohamud [2016] UKSC 11 and together the two cases represent a significant expansion of vicarious liability into non-traditional relationships. The decision is routinely cited alongside Christian Brothers as consolidating the modern framework for vicarious liability.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "prisoner labour",
      "akin to employment",
      "enterprise risk"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Mohamud v Wm Morrison Supermarkets plc",
    "citation": "[2016] UKSC 11",
    "year": 2016,
    "court": "UK Supreme Court",
    "jurisdiction": "UK",
    "legal_principle": "The UKSC held Morrison's vicariously liable for an unprovoked assault by a petrol station attendant on a customer. The court applied the 'close connection' test, asking whether the employee's wrongful conduct was so closely connected to acts he was authorised to do that it was just and reasonable to hold the employer liable. The fact that the employee's interaction began as part of his duties sufficed.",
    "key_quote": "The question is whether the wrongful act was so closely connected with acts the employee was authorised to do that, for the purposes of the liability of the employer, it may fairly and properly be regarded as done while acting in the ordinary course of the employee's employment.",
    "full_summary": "Mr Mohamud visited a Morrison's petrol station and asked an employee, Mr Khan, whether he could print documents from a USB stick. Khan responded with racist and threatening language and then followed Mohamud to his car and subjected him to a serious unprovoked assault. The trial judge found for Morrison's, but the Court of Appeal and ultimately the UKSC reversed this. The UKSC applied a two-stage enquiry: first, what functions or 'field of activities' had been entrusted to the employee; second, was there a sufficient connection between the position in which the tortfeasor was employed and his wrongful conduct. The court found that Khan's interaction with Mohamud began in the course of his duty to attend to customers, and his subsequent behaviour — though criminal and unauthorised — was a 'seamless episode' that remained sufficiently connected to those duties. The decision overruled the older restrictive approach in Herd v Weardale and confirmed the broad, policy-driven approach to the close connection test. Mohamud and Cox together mark a high-water point of UKSC expansion of vicarious liability, subsequently qualified by the Morrison data breach case in 2020.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "close connection test",
      "assault by employee",
      "course of employment"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Armes v Nottinghamshire County Council",
    "citation": "[2017] UKSC 60",
    "year": 2017,
    "court": "UK Supreme Court",
    "jurisdiction": "UK",
    "legal_principle": "The UKSC held that a local authority owed a non-delegable duty of care to children placed in foster care, and was also vicariously liable for abuse perpetrated by foster carers. Even though foster carers are not employees, the authority's exercise of parental responsibility created a relationship generating liability.",
    "key_quote": "The local authority had assumed a duty towards children in its care which it could not discharge by delegating its performance to another, whether foster carer or otherwise.",
    "full_summary": "Ms Armes had been placed in foster care as a child by Nottinghamshire County Council and suffered physical and sexual abuse at the hands of her foster carers. She brought proceedings against the council, which denied liability on the grounds that foster carers are independent contractors rather than employees. The UKSC rejected this argument on two distinct grounds. First, the council owed a non-delegable duty of care to children in its care, derived from its statutory parental responsibility, such that it could not escape liability by entrusting care to foster carers. Second, the relationship between the council and foster carers was sufficiently akin to employment to satisfy the first stage of the Christian Brothers test — the council selected, trained, supervised and paid foster carers, who operated under the council's authority and for its statutory purposes. The decision extended both non-delegable duty and vicarious liability into the foster care context and is significant for local authority liability in child welfare cases. It was decided shortly before the Barclays and Morrison's cases of 2020 which drew back somewhat from the broad expansion of vicarious liability.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "non-delegable duty",
      "foster carers",
      "local authority",
      "child abuse"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Various Claimants v Wm Morrison Supermarkets plc",
    "citation": "[2020] UKSC 12",
    "year": 2020,
    "court": "UK Supreme Court",
    "jurisdiction": "UK",
    "legal_principle": "The UKSC reversed the Court of Appeal and held Morrison's not vicariously liable for a disgruntled employee's unauthorised disclosure of colleagues' personal data. The employee was not acting in the course of employment — he was pursuing a personal vendetta. The court clarified that motive is relevant when assessing the 'field of activities' assigned to the employee.",
    "key_quote": "The motive of the employee is relevant to whether his wrongful act was committed in the course of his employment or whether it was, as the judge found, an independent venture on his own account — a frolic of his own.",
    "full_summary": "Andrew Skelton, a senior IT auditor at Morrison's, harboured a grievance after being subjected to a disciplinary process. He was legitimately given access to payroll data to transmit to external auditors, but then copied the data and posted it online, exposing the personal details of nearly 100,000 employees. The trial judge and Court of Appeal held Morrison's vicariously liable, treating the handling of payroll data as within Skelton's 'field of activities'. The UKSC unanimously reversed this, holding that the disclosure was not an act done in the course of Skelton's employment but was rather a personal vendetta entirely outside the scope of what he was authorised or expected to do. The court emphasised that Mohamud should not be read as eliminating the relevance of motive and personal purpose. The decision provides an important counterweight to the broad approach in Mohamud and Cox and confirms that the close connection test retains meaningful limits. It is frequently tested alongside Mohamud to test students' ability to distinguish between acts done as part of employment and acts done for purely personal purposes.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "data protection",
      "frolic of his own",
      "employee motive",
      "close connection test"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Various Claimants v Barclays Bank plc",
    "citation": "[2020] UKSC 13",
    "year": 2020,
    "court": "UK Supreme Court",
    "jurisdiction": "UK",
    "legal_principle": "The UKSC held that Barclays Bank was not vicariously liable for sexual assaults committed by an independent doctor it engaged to carry out pre-employment medical examinations. The doctor was in business on his own account and not integrated into Barclays' enterprise, so the first stage of the vicarious liability test was not satisfied.",
    "key_quote": "The doctor was in business on his own account as a medical practitioner. He was not an employee of the bank and his relationship with the bank was not akin to employment. The first stage of the test for vicarious liability was not met.",
    "full_summary": "Dr Gordon Bates conducted pre-employment medical examinations for Barclays Bank from the 1960s to 1984, during which time he sexually assaulted a number of the applicants. The claimants argued that Barclays was vicariously liable for his assaults. The UKSC, in a decision handed down on the same day as the Morrison's data breach case, held that no vicarious liability arose because the first stage of the Christian Brothers test — a relationship akin to employment — was not satisfied. Dr Bates was an independent medical practitioner carrying on his own practice: he set his own hours, worked from his own premises, carried his own professional indemnity insurance, and was in no way integrated into Barclays' business. The bank merely commissioned a service from him as it might from any independent professional. The UKSC drew a clear distinction between a contractor who is carrying on his own independent business and an individual who, while not technically employed, is functionally integrated into the defendant's enterprise. Barclays is routinely paired with Morrison's as the two 2020 cases that corrected the expansive trajectory of Mohamud and Cox.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "independent contractor",
      "medical examination",
      "akin to employment"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Trustees of the Barry Congregation of Jehovah's Witnesses v BXB",
    "citation": "[2023] UKSC 15",
    "year": 2023,
    "court": "UK Supreme Court",
    "jurisdiction": "UK",
    "legal_principle": "The UKSC held that the congregation was not vicariously liable for rape committed by an elder of the Jehovah's Witnesses, as the elder was a volunteer performing religious duties and the relationship lacked sufficient features of an employment-like relationship. The case provides important limits on the expansion of vicarious liability to voluntary religious roles.",
    "key_quote": "The elder carried out his religious activities as a volunteer. The relationship between the congregation and the elder did not have the features of an employment or quasi-employment relationship necessary to impose vicarious liability.",
    "full_summary": "BXB was raped by Mark Sewell, an elder in the Barry Congregation of Jehovah's Witnesses. She brought proceedings against the congregation's trustees, arguing vicarious liability. The UKSC unanimously held there was no vicarious liability. Applying the two-stage test, the court found that the first stage — a relationship akin to employment — was not satisfied. Elders within the Jehovah's Witnesses are unpaid volunteers; they are not directed, supervised, or remunerated in any way analogous to employees. The court distinguished the Christian Brothers case, where the Brothers were directed in their work by their superiors and integrated into the institutional hierarchy in a manner bearing close resemblance to employment. The UKSC emphasised that not every relationship between a religious organisation and its ministers or volunteers will generate vicarious liability: the relationship must be sufficiently close to employment in its functional characteristics. The decision provides a significant clarification of the outer limits of vicarious liability and confirms that voluntary religious service does not, without more, create the necessary relationship. It is the most recent major UKSC statement on the doctrine.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "religious organisation",
      "elder",
      "ministerial role",
      "volunteer"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "E v English Province of Our Lady of Charity",
    "citation": "[2012] EWCA Civ 938",
    "year": 2012,
    "court": "England and Wales Court of Appeal",
    "jurisdiction": "UK",
    "legal_principle": "The Court of Appeal held that an unincorporated diocese could be vicariously liable for sexual abuse by a priest. The canonical relationship between bishop and priest is akin to employment, satisfying the first limb of the vicarious liability test, and the close connection between the priest's ministry and the abuse satisfied the second limb.",
    "key_quote": "The relationship between a Catholic bishop and the priests of his diocese has sufficient features of the employment relationship to impose vicarious liability upon the diocese for torts committed by a priest in the course of his ministry.",
    "full_summary": "The claimant had been sexually abused as a child by Father Tony McGill, a Catholic priest in the Diocese of Portsmouth. He brought proceedings against the English Province of Our Lady of Charity, seeking to hold the diocese vicariously liable for the priest's abuse. The diocese argued it could not be vicariously liable because it was an unincorporated association and because the priest was not its employee. The Court of Appeal, applying the emerging two-stage framework, held that both stages were satisfied. As to the first stage, the canonical relationship between a bishop and his priest — involving obedience, direction, assignment of duties, and integration into the diocesan hierarchy — bore sufficient resemblance to employment to impose liability. As to the second stage, the abuse was committed in the context of the priest's pastoral ministry and his position of authority over the claimant, providing a close connection between the relationship and the tort. The decision preceded and was largely confirmed by the UKSC's approach in Christian Brothers decided in the same year. It remains a significant authority on the application of vicarious liability to Catholic diocesan structures.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "unincorporated association",
      "sexual abuse",
      "Catholic diocese",
      "priest"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Bradley v CIE",
    "citation": "[1976] IR 217",
    "year": 1976,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court held that an employer owes a non-delegable duty to provide a safe system of work, safe premises, and competent fellow employees. The court confirmed that this duty cannot be discharged by delegating safety responsibilities to independent contractors. A railway employee injured due to defective equipment was entitled to succeed.",
    "key_quote": "The duty of an employer to take reasonable care for the safety of his employees is a personal and non-delegable duty which cannot be discharged by entrusting its performance to an independent contractor.",
    "full_summary": "The plaintiff, a railway employee of CIE (Coras Iompair Eireann), was injured while working on the railway due to defective equipment or unsafe working conditions. CIE sought to argue that responsibility for safety had been delegated to an independent contractor and that it could not therefore be held directly liable. The Supreme Court rejected this argument, affirming the fundamental principle that an employer's duty to take reasonable care for the safety of employees is personal and non-delegable. The court confirmed the four recognised components of this duty: safe premises, safe plant and equipment, a safe system of work, and competent fellow employees. Each of these obligations rests directly on the employer, and a failure in any one of them cannot be excused by showing that an independent contractor was responsible. Bradley is a foundational Irish authority on employers' liability and is routinely cited in both academic texts and subsequent case law to establish the non-delegable character of the employer's duty of care. It remains the leading Irish Supreme Court authority on this point and is frequently referenced alongside the English decisions in Wilsons and Clyde Coal v English [1938] AC 57.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "employers liability",
      "safe system of work",
      "non-delegable duty",
      "occupational injury",
      "railway"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Vowles v Evans",
    "citation": "[2003] EWCA Civ 318",
    "year": 2003,
    "court": "England and Wales Court of Appeal",
    "jurisdiction": "UK",
    "legal_principle": "The Court of Appeal held that a referee owes a duty of care to players to apply the rules of the game properly when those rules are specifically designed to protect player safety. A rugby union referee who failed to apply the correct scrummaging rules, resulting in a player's serious spinal injury, was held liable.",
    "key_quote": "A referee who undertakes to officiate at a rugby match assumes a duty of care towards the players, at least in relation to rules designed to protect their safety, such as the rules governing the engagement of scrums.",
    "full_summary": "Richard Vowles, an amateur rugby union player, suffered a serious spinal injury during a scrum in a match refereed by David Evans. The injury occurred because the referee failed to follow the proper procedure for forming a scrum as required by the rules of rugby union — in particular, failing to insist on the uncontested scrum procedure when a non-front-row replacement was required. The Court of Appeal upheld the trial judge's finding that the referee owed a duty of care to the players. The court found that an assumption of responsibility arose when the referee took charge of the match, and that duty extended at minimum to the enforcement of safety rules. The case is significant in extending the law of negligence into the domain of voluntary sporting officials, confirming that unpaid amateur referees are not immune from liability in tort. It is frequently discussed alongside Watson v British Boxing Board of Control as part of the developing law on duty of care in sporting contexts, particularly in relation to participants' physical safety.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "duty of care",
      "sports referee",
      "negligence",
      "rugby",
      "assumption of responsibility"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Watson v British Boxing Board of Control",
    "citation": "[2001] QB 1134",
    "year": 2001,
    "court": "England and Wales Court of Appeal",
    "jurisdiction": "UK",
    "legal_principle": "The Court of Appeal held that a sports governing body can owe a duty of care to participants where it has assumed responsibility for their safety. The British Boxing Board of Control was liable for inadequate ringside medical provision that led to Michael Watson suffering severe brain damage after a title fight.",
    "key_quote": "The Board had assumed responsibility for determining the medical arrangements for professional boxing matches and it was foreseeable that if those arrangements were inadequate, a boxer could suffer serious injury. A duty of care arose.",
    "full_summary": "Michael Watson suffered catastrophic brain injuries during his 1991 WBO super-middleweight title fight against Chris Eubank. The fight was held under the auspices of the British Boxing Board of Control (BBBC), which had exclusive regulatory authority over professional boxing in the United Kingdom. Watson argued that the BBBC had been negligent in failing to ensure adequate ringside medical provision — in particular, the absence of a neurosurgeon and inadequate resuscitation equipment — which significantly worsened the outcome of his injury. The Court of Appeal upheld a finding of liability against the BBBC. The court held that the BBBC had assumed responsibility for the health and safety of licensed boxers by virtue of its regulatory monopoly and its specific undertaking to prescribe medical requirements for each contest. Reliance by Watson on those arrangements was obvious and foreseeable. The damage was made substantially worse by the inadequate provision. Watson is a leading authority on the duty of care owed by regulatory and governing bodies in sport, and on the application of the assumption of responsibility principle in the Hedley Byrne line to physical harm cases.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "duty of care",
      "sports governing body",
      "medical provision",
      "boxing",
      "assumption of responsibility"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Sutherland v Supervalue Stores Ltd",
    "citation": "[1995] 1 ILRM 410",
    "year": 1995,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the standard of care owed by a retailer to customers on its premises. The court held that a supermarket must take reasonable steps to keep its floors safe and that a failure to implement an adequate floor inspection system could ground liability in negligence.",
    "key_quote": "A retailer who invites the public onto its premises must take all reasonable steps to ensure that those premises are safe, including the implementation of an adequate system of inspection and cleaning.",
    "full_summary": "The plaintiff slipped and fell in the defendant's supermarket, sustaining personal injuries. The case raised the question of what standard of care a retail occupier owes to customers who enter the premises as invitees. The Supreme Court held that the occupier is under a duty to take reasonable care to prevent foreseeable dangers and that this duty extends to maintaining the floors in a clean and safe condition. Critically, the court held that merely having a general policy of cleanliness was insufficient — the occupier must have an active and documented system of floor inspection at regular intervals. The failure to operate such a system, or to demonstrate that such a system was in place, could itself constitute evidence of negligence irrespective of whether the specific hazard had been present for a long time. The decision is the principal Irish authority on slip-and-fall liability in retail premises and is regularly cited in personal injury litigation. It predates the Occupiers Liability Act 1995 which subsequently codified and modified aspects of the occupier's duty to visitors.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "slip and fall",
      "foreseeable risk",
      "retail premises",
      "duty of care"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Flynn v Bus Atha Cliath",
    "citation": "[2012] IEHC 476",
    "year": 2012,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court held that a bus operator owes a duty of care to passengers and must ensure the bus does not move until passengers are safely seated or have alighted. A passenger injured when the bus moved off prematurely was entitled to recover damages.",
    "key_quote": "A bus operator is under a duty to take reasonable care for the safety of its passengers, which includes ensuring the vehicle does not move while a passenger is in the process of boarding or alighting.",
    "full_summary": "The plaintiff boarded a Dublin Bus vehicle and was injured when the bus moved off before she had the opportunity to take a seat. She fell and sustained personal injuries. The High Court considered the nature and extent of the duty of care owed by a public transport operator to its passengers. The court held that the duty is one of reasonable care in all the circumstances, and that it specifically encompasses the obligation not to move the vehicle while passengers are in a vulnerable position — either in the process of boarding, paying their fare, or finding a seat. On the facts, the court found that the bus driver had moved off prematurely and that this constituted a breach of the duty of care. The case is one of a cluster of Irish public transport decisions addressing the liability of Dublin Bus and other carriers to their passengers. It is frequently cited alongside Boyne, Counihan, Shelly-Morris, and Corkery in personal injury and tort law courses dealing with carriers' liability and the duty of care in the transport context.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public transport",
      "passenger injury",
      "negligence",
      "bus operator",
      "duty of care"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Boyne v Bus Atha Cliath",
    "citation": "[2009] IEHC 43",
    "year": 2009,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court examined the liability of Dublin Bus to a passenger injured in an emergency stop. The court applied the standard of the reasonable bus driver and assessed contributory negligence on the part of a standing passenger.",
    "key_quote": "The standard of care applicable to a bus driver is that of a reasonably skilled and careful professional driver, and passengers who choose to stand on a moving bus accept some degree of risk.",
    "full_summary": "The plaintiff was a passenger on a Dublin Bus who was standing in the aisle when the driver performed an emergency stop, causing her to fall and suffer injury. The High Court considered two questions: first, whether the driver was negligent in the manner in which he applied the brakes; and second, whether the plaintiff was contributorily negligent in failing to hold on to a support rail. The court found that the emergency stop, while forceful, was executed in response to a genuine hazard on the road and did not of itself constitute negligence. However, the court acknowledged that bus operators must take account of standing passengers when operating their vehicles. On contributory negligence, the court held that a standing passenger assumes a degree of risk and bears some responsibility for taking reasonable precautions to maintain their own safety. The decision provides a nuanced analysis of the interplay between the carrier's duty of care and the passenger's own responsibility, and is a useful authority on the assessment of contributory negligence in Irish transport cases.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public transport",
      "passenger injury",
      "emergency stop",
      "contributory negligence",
      "bus operator"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Counihan v Bus Atha Cliath",
    "citation": "[2007] IEHC 59",
    "year": 2007,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the duty of care owed to passengers alighting from a Dublin Bus vehicle. The court found liability where a passenger was injured by the bus door closing prematurely, establishing that bus drivers must take care not to close doors until it is safe to do so.",
    "key_quote": "A bus driver who closes the doors of the vehicle before a passenger has fully alighted breaches the duty of care owed to that passenger, and the operator is liable for any resulting injury.",
    "full_summary": "The plaintiff was in the process of alighting from a Dublin Bus vehicle when the driver closed the doors prematurely, trapping and injuring her. The High Court held that a bus driver owes a duty of care to passengers who are in the process of boarding or alighting, and that this duty requires the driver to ensure it is safe to close the doors before doing so. On the facts, the driver had acted prematurely and without adequate care, constituting a breach of the duty. The case illustrates the application of general negligence principles to the specific operational context of public bus services. The court considered the driver's obligation to use mirrors and other aids to check that passengers had safely cleared the doorway before closing the doors. Counihan forms part of a body of Irish case law — including Flynn [2012], Boyne [2009], and Shelly-Morris [2003] — that defines the parameters of Dublin Bus's liability to passengers and provides practical guidance on the standard of care expected of professional bus drivers in various operational scenarios.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public transport",
      "door injury",
      "alighting passenger",
      "negligence",
      "duty of care"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Mooney v Iarnrod Eireann",
    "citation": "[1994] 3 IR 572",
    "year": 1994,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court examined the duty of care owed by a rail operator to passengers. The court upheld a finding of contributory negligence against a passenger who placed himself in a dangerous position, while confirming the operator's duty to maintain safe conditions on trains.",
    "key_quote": "Irish Rail owes a duty of care to passengers to maintain safe conditions on its trains, but a passenger who voluntarily places himself in a position of obvious danger may be found contributorily negligent.",
    "full_summary": "The plaintiff was a passenger on an Iarnrod Eireann (Irish Rail) train who suffered injury while travelling. The circumstances involved the plaintiff positioning himself in a manner that exposed him to risk, and the question arose as to the respective liability of the rail operator and the plaintiff. The Supreme Court confirmed that a rail operator owes passengers a duty of reasonable care, including the duty to maintain safe conditions on its rolling stock. However, the court also affirmed the principle of contributory negligence, holding that a passenger who voluntarily adopts a dangerous position or takes an unnecessary risk assumes partial responsibility for any resulting injury. The apportionment of liability reflected the passenger's own contribution to his loss. The decision is a useful authority on the standard of care owed by Irish public transport carriers and on the assessment and apportionment of contributory negligence under Irish tort law. It is frequently grouped with other Irish transport cases including Condon, Shelly-Morris, Flynn, Boyne, Counihan, and Corkery.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "train passenger",
      "injury",
      "contributory negligence",
      "public transport",
      "rail operator"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Condon v CIE",
    "citation": "[1984] ILRM 356",
    "year": 1984,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the employer's liability to an employee injured while working on the railway. The court confirmed the non-delegable nature of the employer's duty to provide a safe system of work and proper training, while assessing the degree of contributory negligence attributable to the experienced worker.",
    "key_quote": "The employer's duty to provide a safe system of work is non-delegable and extends to the provision of adequate training and supervision, but an experienced employee who fails to follow established safety procedures may be found contributorily negligent.",
    "full_summary": "The plaintiff was an experienced railway worker employed by CIE who suffered injury in the course of his employment due to an unsafe system of work. The Supreme Court addressed two principal issues: the scope of the employer's duty and the extent of the employee's own contributory negligence. On the first issue, the court reaffirmed that CIE's duty to provide a safe system of work was personal and non-delegable, encompassing safe equipment, safe premises, adequate training, and proper supervision. On the second issue, the court held that the plaintiff's experience and familiarity with the working environment were relevant factors in assessing contributory negligence — an experienced worker is expected to exercise a commensurate level of care and is less readily excused for failures to follow established safety procedures. The court apportioned liability accordingly. Condon is a companion authority to Bradley v CIE [1976] and together the two cases establish the principal Irish Supreme Court framework for employer liability and employee contributory negligence in the railway context.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "employers liability",
      "railway worker",
      "safe system of work",
      "contributory negligence",
      "non-delegable duty"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Shelly-Morris v Bus Atha Cliath",
    "citation": "[2003] 1 IR 232",
    "year": 2003,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered an appeal on the quantum of damages awarded to a bus passenger who suffered physical and psychiatric injury following a collision. The court addressed the proper approach to general damages for pain and suffering and the assessment of future loss, providing guidance on damages methodology in personal injury cases.",
    "key_quote": "In assessing general damages for pain and suffering, the court must take account of the totality of the plaintiff's injury, including its psychiatric component, and must award a sum that is fair and reasonable to both parties.",
    "full_summary": "The plaintiff was a passenger on a Dublin Bus vehicle that was involved in a road traffic collision. She sustained both physical injuries and significant psychiatric sequelae, including post-traumatic stress disorder, as a result of the accident. The High Court awarded substantial general damages and the defendant appealed on the quantum. The Supreme Court reviewed the principles governing the assessment of general damages in Irish personal injury litigation. The court emphasised that damages for pain and suffering must be assessed holistically, taking into account both the physical and psychiatric dimensions of the plaintiff's injury. The court also addressed the methodology for calculating future loss of earnings and the appropriate discount rate. The decision is one of the leading Irish authorities on the quantum of damages in personal injury cases involving psychiatric injury and provides a benchmark for awards in this category. It is frequently cited in damages assessments alongside subsequent Supreme Court decisions on personal injury quantum and the Civil Liability and Courts Act 2004.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "bus passenger injury",
      "damages",
      "nervous shock",
      "quantum",
      "personal injury",
      "psychiatric injury"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Egan v Sisk",
    "citation": "[2019] IECA 261",
    "year": 2019,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered the liability of a main contractor for injuries to a sub-contractor's employee on a construction site. The court held that a main contractor owes a duty to take reasonable care for the safety of all workers on site under its control, even those employed by sub-contractors, particularly where the main contractor has overall site responsibility.",
    "key_quote": "A main contractor who has overall responsibility for safety on a construction site owes a duty of care to all workers on that site, including those employed by sub-contractors, insofar as the main contractor has control over the conditions giving rise to the risk.",
    "full_summary": "The plaintiff, an employee of a sub-contractor, was injured on a construction site for which Sisk was the main contractor. The plaintiff brought proceedings in negligence against Sisk, arguing that as main contractor with overall site responsibility, Sisk owed a duty of care to all workers on site, including those employed by sub-contractors. The Court of Appeal upheld a finding of liability. The court held that the key factor was Sisk's overall control of the site and its responsibility for site-wide safety systems. This control gave rise to a duty of care to take reasonable precautions for the safety of all workers, not merely its own direct employees. The court also considered the interaction of this common law duty with the obligations imposed by the Safety, Health and Welfare at Work Act 2005 and related regulations. The decision is an important authority on the scope of a main contractor's duty of care in the Irish construction industry and is regularly cited in employers' liability and construction law contexts.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "employers liability",
      "construction",
      "safe place of work",
      "contributory negligence",
      "main contractor",
      "sub-contractor"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Corkery v Bus Eireann",
    "citation": "[2012] IEHC 17",
    "year": 2012,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court found Bus Eireann liable for injuries sustained by a passenger in a road traffic accident caused by the bus driver's negligence. The court applied standard negligence principles and considered the extent to which the plaintiff's damages should be reduced for contributory negligence.",
    "key_quote": "A bus operator is liable in negligence for the acts of its driver in causing a road traffic accident, and the damages awarded to an injured passenger may be reduced where that passenger was contributorily negligent.",
    "full_summary": "The plaintiff was a passenger on a Bus Eireann coach that was involved in a road traffic accident. The plaintiff sustained injuries and brought proceedings against Bus Eireann, alleging negligence on the part of the bus driver. The High Court found that the driver had been negligent in his operation of the vehicle and that Bus Eireann was vicariously liable for that negligence as employer. The court then considered whether the plaintiff had been contributorily negligent — for example, by failing to wear a seatbelt or by placing herself in an exposed position — and assessed any appropriate reduction in damages. The decision applies standard negligence and vicarious liability principles to the inter-urban bus transport context and provides an example of the Irish courts assessing contributory negligence in transport cases. It is grouped in Irish tort law courses alongside the Dublin Bus cases (Flynn, Boyne, Counihan, and Shelly-Morris) as part of the study of carriers' liability and public transport negligence.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public transport",
      "road accident",
      "passenger injury",
      "negligence",
      "contributory negligence",
      "vicarious liability"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "De Rossa v Independent Newspapers plc",
    "citation": "[1999] 4 IR 432",
    "year": 1999,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court upheld an IR£300,000 jury award to the Labour Party leader for defamatory articles in the Sunday Independent falsely linking him to anti-Semitism and Communist atrocities. The court held that the award was not disproportionate given the gravity of the libel and the publication's wide circulation, establishing an important precedent on jury-assessed defamation damages in Ireland.",
    "key_quote": "The jury was entitled to take into account the gravity of the libel, its wide circulation, and the standing of the plaintiff in awarding the damages complained of.",
    "full_summary": "De Rossa v Independent Newspapers plc arose from a series of articles published in the Sunday Independent newspaper that falsely linked Proinsias De Rossa, then leader of the Labour Party and a government minister, to anti-Semitism and Communist atrocities in Eastern Europe. The plaintiff brought a defamation action and a jury awarded IR£300,000 in damages. The defendant appealed, arguing the award was excessive and disproportionate. The Supreme Court dismissed the appeal and upheld the jury award. The court considered the European Convention on Human Rights and the need to balance freedom of expression with protection of reputation. The Supreme Court rejected the argument that the award was disproportionate, holding that the gravity of the libel — falsely associating a senior politician with hatred and atrocity — justified a substantial award. The court affirmed that jury awards in defamation cases are entitled to significant deference provided they are not unreasonable. De Rossa remains one of the leading Irish cases on defamation damages and the limits of appellate interference with jury verdicts. It also shaped the later legislative reform that culminated in the Defamation Act 2009, particularly concerning caps on damages and the role of the jury in assessing defamation awards.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "jury damages",
      "proportionality",
      "newspaper"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Leech v Independent Newspapers (Ireland) Ltd",
    "citation": "[2014] IESC 79",
    "year": 2014,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the honest opinion defence under the Defamation Act 2009 in the context of a newspaper column. The court clarified the elements necessary to establish the defence, including that the opinion must be based on fact and that the defendant must genuinely hold the belief expressed.",
    "key_quote": "The defence of honest opinion requires that the opinion expressed is one which an honest person could hold on the basis of the facts on which it purports to be based.",
    "full_summary": "Leech v Independent Newspapers (Ireland) Ltd arose from a newspaper column published in the Sunday Independent which the plaintiff, a solicitor and former Fine Gael politician, claimed was defamatory. The defendant invoked the honest opinion defence under section 20 of the Defamation Act 2009. The Supreme Court examined in detail the requirements of the statutory defence, which replaced the earlier common law defence of fair comment. The court held that for the defence to succeed the defendant must demonstrate: first, that the statement is one of opinion rather than fact; second, that the opinion is based on true facts or privileged material; and third, that the defendant genuinely held the opinion expressed. The court clarified that the opinion need not be one which a reasonable person would hold, but it must be one which an honest person could hold on the available facts. The Supreme Court also considered the role of the publisher vis-a-vis the original author and whether the newspaper could separately rely on the honest opinion defence. Leech is a key authority on the proper application of the Defamation Act 2009 defences and is frequently relied upon in Irish defamation litigation involving opinion-based publications.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "Defamation Act 2009",
      "honest opinion",
      "public interest"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "McDonagh v Sunday Newspapers Ltd",
    "citation": "[2017] IESC 59",
    "year": 2017,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the defence of truth (previously justification) under the Defamation Act 2009. The court held that a defendant relying on truth must establish that the statement was substantially true. McDonagh provides important guidance on the modern Irish approach to the truth defence and its interaction with jury directions.",
    "key_quote": "The defence of truth under the Defamation Act 2009 requires the defendant to prove that the imputation conveyed by the statement is substantially true.",
    "full_summary": "McDonagh v Sunday Newspapers Ltd concerned defamatory articles published in the News of the World alleging that the plaintiff, a publican and businessperson, had connections to criminal activity. The defendant pleaded the defence of truth under section 16 of the Defamation Act 2009, which replaced the former common law plea of justification. The High Court jury found for the plaintiff and awarded substantial damages, and the defendant appealed to the Supreme Court. The Supreme Court considered the correct directions to be given to a jury on the truth defence and examined what 'substantially true' means in the context of a defamatory statement containing several distinct imputations. The court held that a defendant does not need to prove every word of the publication is literally true; it is sufficient to show that the 'sting' of the libel — its essential meaning — is substantially justified. The court also provided guidance on how trial judges should direct juries when truth is raised as a defence alongside other defences under the 2009 Act. McDonagh is a leading authority on the operation of the statutory truth defence in Irish defamation law and has been applied in numerous subsequent High Court and Court of Appeal decisions.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "truth defence",
      "Defamation Act 2009",
      "justification"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Lachaux v Independent Print Ltd",
    "citation": "[2019] UKSC 27",
    "year": 2019,
    "court": "UK Supreme Court",
    "jurisdiction": "UK",
    "legal_principle": "The UKSC held that the 'serious harm' requirement in s.1 of the Defamation Act 2013 imposes a threshold requiring actual (or likely) serious harm to the claimant's reputation, not merely that the words complained of are seriously defamatory in nature. The claimant must adduce evidence of serious harm or, in relation to bodies trading for profit, serious financial loss.",
    "key_quote": "Section 1 of the Defamation Act 2013 requires the claimant to demonstrate that the statement has caused or is likely to cause serious harm to his or her reputation, and this requires an examination of the actual impact of the publication.",
    "full_summary": "Lachaux v Independent Print Ltd concerned articles published in The Independent and i newspapers making allegations about the claimant, a French aerospace engineer living in England, in connection with custody proceedings involving his son. The central legal question was the proper construction of section 1(1) of the Defamation Act 2013, which provides that a statement is not defamatory unless its publication has caused or is likely to cause serious harm to the reputation of the claimant. The UK Supreme Court, reversing earlier Court of Appeal and High Court decisions, held that section 1 raised the bar beyond the common law presumption of harm. The court held that serious harm is a question of fact, requiring evidence of actual or probable consequences of the publication. The claimant cannot rely solely on the gravity of the words used; rather, evidence of the impact of publication — such as the number of readers, the reactions of those who read it, and the identities of the readership — must be adduced. For corporate bodies, serious harm requires proof of serious financial loss. Lachaux is now the leading UK authority on the threshold for bringing a defamation claim and has materially shaped the landscape of English defamation litigation since 2019.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "serious harm",
      "Defamation Act 2013",
      "publication"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Jameel (Yousef) v Dow Jones & Co Inc",
    "citation": "[2005] QB 946",
    "year": 2005,
    "court": "England and Wales Court of Appeal",
    "jurisdiction": "UK",
    "legal_principle": "The Court of Appeal held that defamation proceedings may constitute an abuse of process where the publication in question is so limited that it could not have caused real and substantial tort to the claimant. The case established the 'Jameel abuse' doctrine: where the game is not worth the candle, the court may strike out the claim.",
    "key_quote": "If the claimant has suffered no real damage, or the damage is so trivial that it would be disproportionate to allow the action to proceed, the court may strike it out as an abuse of process.",
    "full_summary": "Jameel (Yousef) v Dow Jones & Co Inc concerned an article published on the Wall Street Journal's website, accessible in England and Wales, which allegedly defamed the Saudi claimant by linking him to the financing of terrorism. The defendant sought to strike out the claim on the basis that publication within the jurisdiction was so minimal — just five people had accessed the article — that maintaining the proceedings would be disproportionate and an abuse of process. The Court of Appeal upheld the strike-out. The court reasoned that the tort of defamation is concerned with real and substantial harm to reputation, and where publication is so limited that no real harm has resulted or could result, the court's process should not be invoked. The court introduced the 'Jameel abuse' doctrine as a common law proportionality filter for defamation actions. The doctrine operates independently of, but complements, the later statutory serious harm requirement introduced by the Defamation Act 2013. Jameel abuse has since been raised and applied in numerous cases to prevent claimants with minimal connections to England and Wales from pursuing defamation proceedings in the jurisdiction. The case remains a foundational authority in English defamation law and cross-border publication disputes.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "abuse of process",
      "publication",
      "minimal publication"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "C & A Modes Ltd v C & A (Waterford) Ltd",
    "citation": "[1978] FSR 126",
    "year": 1978,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court applied the classic trinity of passing off — goodwill, misrepresentation, and damage — to restrain the use of a name confusingly similar to that of an established retailer. The court held that even without a registered trademark, a business may protect its trading reputation by an action in passing off.",
    "key_quote": "A trader who has established goodwill in a name or mark is entitled to restrain another from using that name or mark in a way that is likely to mislead the public into believing that the goods or services of the defendant are those of the plaintiff.",
    "full_summary": "C & A Modes Ltd v C & A (Waterford) Ltd involved the well-known UK and Irish fashion retailer C&A seeking to prevent a Waterford-based company from trading under a confusingly similar name. The plaintiff had established extensive goodwill in the C&A name through its chain of retail stores, including stores in Ireland. The Supreme Court granted an injunction, applying the classical passing off principles articulated in the House of Lords decisions of Warnink v Townend and the earlier English authorities. The court held that the plaintiff had clearly established the necessary goodwill in the name 'C&A', that the use of the name by the defendant constituted a misrepresentation likely to deceive or confuse members of the public into thinking the defendant's business was that of the plaintiff or associated with it, and that such confusion was likely to cause damage to the plaintiff's business and reputation. The case confirmed that the passing off action is available in Ireland as a remedy for the protection of unregistered trading names and marks, and that the three-part test of goodwill, misrepresentation, and damage constitutes the framework within which Irish courts analyse passing off claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "passing off",
      "goodwill",
      "misrepresentation",
      "economic torts"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Lonrho plc v Al Fayed (No 5)",
    "citation": "[1993] 1 WLR 1489",
    "year": 1993,
    "court": "England and Wales Court of Appeal",
    "jurisdiction": "UK",
    "legal_principle": "The Court of Appeal considered the tort of conspiracy and held that a claim for unlawful means conspiracy requires proof that the defendant used unlawful means with the predominant purpose of injuring the claimant. It also clarified the relationship between the various economic torts, emphasising that malice and intent are central elements.",
    "key_quote": "In unlawful means conspiracy, the defendant must have used unlawful means with the predominant purpose of injuring the plaintiff, and injury must in fact have resulted.",
    "full_summary": "Lonrho plc v Al Fayed (No 5) was part of the long-running litigation between Tiny Rowland and Mohamed Al Fayed arising from the contested takeover of Harrods. This appeal concerned the tort of conspiracy and whether Lonrho could maintain an action in unlawful means conspiracy and malicious falsehood against Al Fayed and associated parties. The Court of Appeal considered the elements of unlawful means conspiracy, distinguishing it from the simpler but harder to prove tort of lawful means conspiracy (conspiracy to injure). The court confirmed that unlawful means conspiracy requires: first, a combination of two or more persons; second, the use of unlawful means; third, the predominant purpose of injuring the claimant; and fourth, actual damage resulting to the claimant. The court also examined the tort of malicious falsehood and its interaction with defamation and conspiracy claims. The judgment provides important guidance on the interrelationship between the economic torts and the circumstances in which a party can maintain overlapping claims. Lonrho No 5 is a significant authority in the economic torts field and is frequently cited in commercial litigation involving allegations of conspiracy, interference with trade, and malicious falsehood.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "economic torts",
      "conspiracy",
      "unlawful means",
      "malicious falsehood"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Quinn v Leathem",
    "citation": "[1901] AC 495",
    "year": 1901,
    "court": "House of Lords",
    "jurisdiction": "UK",
    "legal_principle": "The House of Lords held that a trade union committee was liable in tort for inducing customers to break their contracts with the plaintiff employer, and for conspiring to injure the plaintiff's business. Quinn v Leathem established that the intentional procurement of a breach of contract is an actionable tort, and that conspiracy to injure without justification is actionable even if the acts themselves are otherwise lawful.",
    "key_quote": "A combination of persons to injure a man in his trade is actionable if injury results, unless the combination can be justified by the existence of a legitimate interest which the combiners are entitled to protect.",
    "full_summary": "Quinn v Leathem concerned a Belfast butcher, Leathem, whose employees were members of a trade union controlled by Quinn. When Leathem refused to dismiss non-union workers, Quinn's committee induced one of Leathem's customers, Munce, to terminate his contract with Leathem by threatening to call out Munce's own workers. Leathem suffered financial loss as a result. The House of Lords held that there were two actionable torts on the facts. First, the defendants were liable for inducing a breach of contract: intentionally and without justification procuring another to break his contract with the plaintiff is a cause of action. Second, the defendants were liable in conspiracy to injure: a combination of two or more persons acting with the predominant purpose of injuring the plaintiff and without justification is tortious even if the acts done by each individual would be lawful if done alone. The case is a foundational authority in the law of economic torts. Quinn v Leathem confirmed and extended the earlier House of Lords decision in Allen v Flood and Lumley v Gye, and established the framework within which the modern economic torts of inducement of breach of contract and conspiracy to injure continue to be analysed.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "economic torts",
      "inducing breach of contract",
      "trade union",
      "conspiracy"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Inland Revenue Commissioners v Muller & Co's Margarine Ltd",
    "citation": "[1901] AC 217",
    "year": 1901,
    "court": "House of Lords",
    "jurisdiction": "UK",
    "legal_principle": "The House of Lords broadly defined goodwill as the benefit and advantage of the good name, reputation, and connection of a business — 'the attractive force which brings in custom.' This definition remains the foundational statement on the nature of goodwill in passing off and intellectual property law.",
    "key_quote": "Goodwill is the benefit and advantage of the good name, reputation, and connection of a business. It is the attractive force which brings in custom.",
    "full_summary": "Inland Revenue Commissioners v Muller & Co's Margarine Ltd was a revenue case concerning the taxable value of goodwill when a business is sold, but the House of Lords' judgment is primarily significant for its authoritative definition of goodwill as a legal concept. The question was whether goodwill could be separated from the premises of a business for tax purposes. Lord Macnaghten delivered the classic statement that goodwill is 'the benefit and advantage of the good name, reputation, and connection of a business. It is the attractive force which brings in custom. It is the one thing which distinguishes an old-established business from a new business at its first start.' The House of Lords held that goodwill and the premises from which a business operates could be distinct in certain circumstances, particularly where the goodwill attaches to the name or trade of the business rather than the location. Although the case arose in a revenue context, Muller v IRC is universally cited as the definitive statement on the meaning of goodwill in English and Irish law, and it is the essential starting point for the first element of the classic passing off trinity. Courts in both jurisdictions continue to cite Lord Macnaghten's dictum in every passing off and trade mark case that involves goodwill analysis.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "passing off",
      "goodwill",
      "reputation",
      "trade name"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Anheuser-Busch Inc v Budejovicky Budvar NP (The Budweiser Case)",
    "citation": "[1984] FSR 413",
    "year": 1984,
    "court": "England and Wales Court of Appeal",
    "jurisdiction": "UK",
    "legal_principle": "The Court of Appeal held that where two parties have independently built up goodwill in the same mark in the same jurisdiction, neither can succeed against the other in passing off. The case established that concurrent goodwill may defeat a passing off claim even where confusion results.",
    "key_quote": "Where both parties have independently acquired goodwill in the same name, neither can complain of the other's use of that name as a misrepresentation, since the public has come to associate the name with both traders.",
    "full_summary": "Anheuser-Busch Inc v Budejovicky Budvar NP, known as the Budweiser case, arose from the long-running dispute between the American brewer Anheuser-Busch, maker of Budweiser beer, and the Czech state brewery Budejovicky Budvar, which also marketed beer under the name 'Budweiser'. Both companies sought to establish that the other's use of the Budweiser name constituted passing off in England and Wales. The Court of Appeal held that passing off could not succeed on either side because both parties had independently and honestly acquired goodwill in the name 'Budweiser' in the English market. Since the public had come to associate the name with both traders, the use of the name by either party was not a misrepresentation: it truthfully represented the goods of each as coming from the relevant source. The concept of concurrent or shared goodwill therefore defeats the misrepresentation element of the passing off claim. The Budweiser case is an important authority for the proposition that passing off is not an absolute monopoly right: it is a remedy against misrepresentation, and where there is no misrepresentation — because both parties legitimately share the goodwill — the action will not succeed.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "passing off",
      "shared goodwill",
      "concurrent users",
      "beer"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Neills Irish International Sports Co Ltd v O'Neills Footwear Dryer Co Ltd",
    "citation": "[1997] ETMR 429",
    "year": 1997,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court applied the classical trinity of passing off in an Irish context to restrain the use of 'O'Neills' by a footwear dryer company. The court found that the sportswear manufacturer had established sufficient goodwill in the 'O'Neills' name that use of the same name in related goods was likely to cause deception.",
    "key_quote": "The plaintiff has established a sufficient reputation and goodwill in the 'O'Neills' name in Ireland such that use of a confusingly similar name in related goods constitutes a misrepresentation likely to damage that goodwill.",
    "full_summary": "O'Neills Irish International Sports Co Ltd v O'Neills Footwear Dryer Co Ltd concerned the well-known Irish sportswear and Gaelic games equipment manufacturer O'Neills, which sought to prevent a small company from trading under the name 'O'Neills Footwear Dryer Co Ltd'. The plaintiff was a major supplier of sporting goods, including football boots and other footwear, to Gaelic Athletic Association clubs across Ireland. The defendant marketed a device for drying sports footwear. The High Court applied the three-part passing off test. On goodwill, the court held that O'Neills had established very substantial goodwill in its name and trade mark in Ireland, particularly in the sporting goods and footwear sector. On misrepresentation, the court held that use of the 'O'Neills' name by the defendant in the footwear drying product was likely to cause members of the relevant public — particularly GAA clubs and sports shops — to believe there was a connection between the defendant's goods and the plaintiff's business. On damage, the court held that such confusion was liable to damage the plaintiff's goodwill by diluting the distinctiveness of its name. The injunction was granted. The case is a practical Irish illustration of passing off principles and is particularly instructive on the question of the relevant field of activity required to establish misrepresentation.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "passing off",
      "trade name",
      "sportswear",
      "confusion"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Mark Kelly v BoyleSports Ltd",
    "citation": "[2024] IEHC (June 2024)",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a defamation claim arising from online content published by a bookmaker. The case examined the application of the Defamation Act 2009 to digital publications, the interaction of the serious harm requirement and the defences available to online publishers in modern Irish defamation law.",
    "key_quote": "Online publications are subject to the same principles of Irish defamation law as print publications, and the defences under the Defamation Act 2009 apply equally to content published on digital platforms.",
    "full_summary": "Mark Kelly v BoyleSports Ltd was a High Court defamation action arising from online content published on the defendant bookmaker's website and digital platforms that the plaintiff claimed was defamatory of his character and professional reputation. The case raised contemporary questions about the application of the Defamation Act 2009 to online and digital publications, including the question of whether the publication meets the threshold required under Irish defamation law and the extent to which digital publishers can avail of the defences provided by the 2009 Act, such as truth, honest opinion, and innocent publication. The High Court considered the principles applicable to determining the meaning of online publications, including material published on a bookmaker's website, and the audience to whom the statement was addressed. The case also touched on the interaction between defamation law and data protection obligations in the context of material posted on commercial digital platforms. While a relatively recent case whose full impact is still being assessed, Kelly v BoyleSports illustrates the increasing importance of digital publication issues in Irish defamation litigation and the courts' application of the 2009 Act to non-traditional media contexts.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "online publication",
      "Defamation Act 2009",
      "serious harm"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Box Television Ltd v Box Music Ltd",
    "citation": "[1997] EMLR 425",
    "year": 1997,
    "court": "England and Wales Chancery Division",
    "jurisdiction": "UK",
    "legal_principle": "The court held that a music television channel had established sufficient goodwill in the name 'The Box' to maintain a passing off action against a rival music channel proposing to use a confusingly similar name. The case illustrates the breadth of passing off in the broadcasting sector.",
    "key_quote": "The plaintiff has established goodwill in the name 'The Box' in the music television broadcasting market and the defendant's proposed use of a confusingly similar name is likely to cause deception among the relevant public.",
    "full_summary": "Box Television Ltd v Box Music Ltd concerned two music television channels. The plaintiff operated 'The Box', a well-known interactive music video channel broadcast in the UK. The defendant proposed to launch a rival channel using a confusingly similar name. The plaintiff sought and obtained an interim injunction in the Chancery Division to restrain the defendant from trading under the proposed name, relying on passing off. The court applied the classic passing off trinity. On goodwill, the court found that The Box had established clear goodwill and a reputation in the broadcasting and entertainment market under its name among both viewers and the music industry. On misrepresentation, the court held that use of the similar name by the defendant in the same broadcasting sector was likely to cause members of the public and the trade to believe that the defendant's channel was the plaintiff's channel or was connected with or endorsed by it. On damage, the court held that such confusion threatened real damage to the plaintiff's goodwill and commercial relationships. The case is a notable example of passing off being applied to the broadcasting sector and is illustrative of the flexibility of the tort in protecting commercial identities in the media industry.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "passing off",
      "television channels",
      "music channels",
      "name confusion"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "White v Doherty",
    "citation": "[2019] IECA 295",
    "year": 2019,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal reviewed the trial judge's apportionment of liability in a road traffic accident case. The court considered the correct approach to contributory negligence where the plaintiff pedestrian contributed to their own injuries, and provided guidance on the circumstances in which an appellate court may interfere with a trial judge's assessment of damages.",
    "key_quote": "An appellate court should be slow to interfere with a trial judge's assessment of contributory negligence unless the apportionment is so clearly wrong that it amounts to an error of principle.",
    "full_summary": "White v Doherty arose from a road traffic accident in which the plaintiff pedestrian was struck by the defendant's vehicle and suffered personal injuries. The trial judge apportioned liability and made an award of damages. The defendant appealed the finding on liability and the plaintiff cross-appealed the apportionment of contributory negligence. The Court of Appeal considered the correct appellate approach to a trial judge's findings on contributory negligence. The court affirmed that appellate courts may only interfere with a first-instance apportionment of liability where the trial judge has erred in principle or where the conclusion reached is one which no reasonable judge could have arrived at on the evidence. The court also reviewed the assessment of quantum, providing guidance on the principles applicable to the award of general and special damages in road traffic personal injury cases. The court considered the extent to which a pedestrian's own conduct — including failure to use a pedestrian crossing and walking near a road in low visibility conditions — may reduce the damages recoverable. The case is instructive as a practical application of contributory negligence principles to pedestrian-vehicle accidents under Irish law.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road traffic accident",
      "contributory negligence",
      "quantum"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Connor v Wexford County Council",
    "citation": "[2021] IECA 239",
    "year": 2021,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered the liability of a local authority for a road defect under the Roads Act 1993. The court examined the interaction between common law negligence and the statutory framework, and clarified when a public authority's failure to maintain a road may give rise to tortious liability.",
    "key_quote": "A roads authority may be liable in negligence where it has actual or constructive knowledge of a road defect and fails within a reasonable time to take appropriate remedial action.",
    "full_summary": "O'Connor v Wexford County Council arose from a personal injury claim in which the plaintiff sustained injuries after encountering a defective road surface maintained by Wexford County Council. The plaintiff alleged that the council was negligent and in breach of its statutory duty under section 13 of the Roads Act 1993 in failing to maintain the road in a reasonably good repair. At first instance, the High Court found in the plaintiff's favour. Wexford County Council appealed. The Court of Appeal considered the relationship between the common law duty of care and the statutory framework governing road maintenance by local authorities. The court examined the level of knowledge — actual or constructive — required before a duty to repair will arise, and the timeframe within which a roads authority must act once it has or ought to have knowledge of a defect. The court confirmed that a roads authority is not an insurer of road users and cannot be expected to remedy every defect instantaneously, but where knowledge of a significant hazard is established and a reasonable opportunity to remedy it has passed, liability may follow. The Court of Appeal upheld the finding of liability on the facts. The case is an important recent authority on the scope of local authority road maintenance liability in Ireland.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public authority liability",
      "road maintenance",
      "defective road",
      "section 60 Roads Act"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Ahmed v Castlegrange Ltd",
    "citation": "[2022] IECA 269",
    "year": 2022,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered the duty owed by an occupier to a visitor under the Occupiers' Liability Act 1995. The court emphasised that the occupier must take reasonable care to ensure visitors are not injured by dangers on the premises of which the occupier was aware or ought to have been aware.",
    "key_quote": "Under the Occupiers' Liability Act 1995 an occupier owes a duty to a visitor to take such care as is reasonable in all the circumstances to ensure that the visitor does not suffer injury or damage by reason of any danger existing on the premises.",
    "full_summary": "Ahmed v Castlegrange Ltd concerned a personal injury claim brought by the plaintiff following a slip and fall accident on the defendant's commercial premises. The plaintiff, who was a visitor within the meaning of the Occupiers' Liability Act 1995, alleged that the occupier had failed in its duty of care by allowing a dangerous condition to exist on the premises. The trial court found in the plaintiff's favour and the defendant appealed. The Court of Appeal considered the content and scope of the duty of care imposed on occupiers under section 3 of the Occupiers' Liability Act 1995, which requires an occupier to take such care as is reasonable in all the circumstances to ensure that a visitor does not suffer injury or damage by reason of any danger on the premises. The court examined the foreseeability of the risk, the steps the occupier had taken or failed to take to address the hazard, and whether the risk was one of which the occupier was or should have been aware. The court also considered the extent to which the plaintiff bore any responsibility for the accident. The appeal was dismissed and the finding of liability upheld. Ahmed v Castlegrange is a useful recent authority on the practical operation of the 1995 Act in slip and fall cases.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "Occupiers Liability Act 1995",
      "visitor",
      "defective premises"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Cloonan v HSE",
    "citation": "[2022] IECA 129",
    "year": 2022,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered a medical negligence claim against the HSE arising from a failure in treatment. The court applied the Dunne v National Maternity Hospital standard of care test and examined issues of causation in a clinical setting, clarifying how courts assess whether a defendant's departure from acceptable practice caused the plaintiff's injury.",
    "key_quote": "In medical negligence, the plaintiff must establish both that the defendant departed from the standard of care of the ordinary skilled practitioner and that such departure materially caused or contributed to the injury suffered.",
    "full_summary": "Cloonan v HSE was a medical negligence action brought against the Health Service Executive arising from alleged failures in the plaintiff's clinical treatment. The plaintiff alleged that the treating medical team had departed from the standard of care applicable to their specialty, resulting in injury which would not have occurred had appropriate treatment been administered. The trial court ruled in the defendant's favour and the plaintiff appealed. The Court of Appeal applied the standard of care test derived from Dunne v National Maternity Hospital [1989] IR 91, which requires that the plaintiff establish that the medical practitioner departed from the practice of a reasonably careful practitioner in the relevant specialty, and that such departure was not supported by a responsible body of medical opinion. The court examined the conflict between expert evidence on both sides and addressed the correct approach of the trial judge in evaluating competing expert testimony. On causation, the court considered whether the plaintiff's injuries were caused or materially contributed to by the alleged breach. The court affirmed the judgment in favour of the HSE, finding no departure from the applicable standard of care on the facts. Cloonan is illustrative of the courts' careful approach to complex medical evidence in clinical negligence cases.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "medical negligence",
      "clinical negligence",
      "consent",
      "causation"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Mahony v Tipperary County Council",
    "citation": "[2022] IECA 265",
    "year": 2022,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal upheld a finding of liability against a local authority for a road surface defect that caused a cyclist's serious fall. The court affirmed the duty of a roads authority to maintain public roads in a reasonably safe condition and considered the apportionment of contributory negligence.",
    "key_quote": "A roads authority is under a duty to road users to maintain public roads in a reasonably safe condition, and where a known defect causes injury to a road user, the authority may be found liable in negligence.",
    "full_summary": "O'Mahony v Tipperary County Council concerned a claim brought by a cyclist who suffered serious injuries after his bicycle wheel entered a pothole or sunken road surface on a public road maintained by the defendant local authority. The plaintiff alleged negligence and breach of statutory duty on the part of the council in failing to maintain the road surface in a safe condition. The High Court found Tipperary County Council liable and awarded damages, apportioning a degree of contributory negligence to the plaintiff for cycling at an excessive speed in the circumstances. Both parties appealed. The Court of Appeal affirmed the finding of liability, holding that the council had actual or constructive notice of the road defect and had failed to take reasonable steps to remedy it within a reasonable time. The court reviewed the apportionment of contributory negligence and the quantum of the damages award. The judgment provides useful guidance on the duty of roads authorities under Irish law, the knowledge threshold necessary to establish liability, and the approach courts take to apportioning fault between plaintiff and defendant in road defect cases involving cyclists.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public authority",
      "road defect",
      "contributory negligence",
      "local authority"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Higgins v Irish Aviation Authority",
    "citation": "[2022] IESC 13",
    "year": 2022,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court examined the circumstances in which a statutory body may be liable in negligence for acts or omissions in the exercise of its statutory functions. The court applied the Glencar framework and considered whether an assumption of responsibility by a regulator could give rise to a duty of care in the economic loss context.",
    "key_quote": "A statutory body does not automatically owe a duty of care in negligence to persons affected by the exercise of its statutory functions; the existence of a duty depends on the application of the Glencar framework and the particular circumstances of the relationship between the parties.",
    "full_summary": "Higgins v Irish Aviation Authority was a significant Supreme Court decision considering when a statutory regulatory body owes a private law duty of care in negligence to individuals affected by the exercise of its powers. The plaintiff, a licensed pilot, alleged that the Irish Aviation Authority had negligently caused him pure economic loss by making an error in connection with the administration of his aviation licence, rendering him unable to work as a commercial pilot for a period. The Supreme Court applied the framework set out in Glencar Exploration plc v Mayo County Council [2002] 1 IR 84, which requires consideration of foreseeability, proximity, and whether it is just and reasonable to impose a duty. The court examined whether the IAA had assumed responsibility to the plaintiff in a manner analogous to the principles in Hedley Byrne, which would ground liability for pure economic loss. The Supreme Court provided important guidance on the threshold for imposing liability on public regulatory bodies for economic loss caused in the exercise of statutory functions, emphasising that the courts must be cautious about unduly restricting the effective exercise of regulatory powers. Higgins v IAA is a leading modern authority on public authority liability in Ireland and the application of the Glencar test.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "statutory duty",
      "public authority",
      "economic loss",
      "employer liability"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Davey v Sligo County Council",
    "citation": "[2023] IECA 39",
    "year": 2023,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered a claim arising from a road defect and upheld the finding of liability against the local authority. The court reaffirmed that a roads authority is subject to a duty of care to road users to maintain road surfaces in a reasonably safe condition and reviewed the evidence of the authority's knowledge of the defect.",
    "key_quote": "The roads authority's duty to maintain the road in a reasonably safe condition is not discharged simply by the absence of a prior complaint; the authority must have systems in place to inspect and identify hazards on the road network.",
    "full_summary": "Davey v Sligo County Council arose from personal injuries sustained by the plaintiff after his vehicle struck a pothole on a public road maintained by the defendant. The plaintiff alleged that Sligo County Council had been negligent in failing to maintain the road surface in a safe condition and in failing to identify and remedy the defect within a reasonable time. The trial court found the council liable and awarded damages. The council appealed, primarily challenging the finding that it had or ought to have had knowledge of the defect in sufficient time to address it before the plaintiff's accident. The Court of Appeal dismissed the appeal. The court reaffirmed the duty of care imposed on roads authorities under Irish law to maintain road surfaces in a reasonably safe condition for road users. The court examined the council's road inspection regime, including the frequency of inspections and the records maintained, and found that a proper inspection system should have detected and remedied the defect. The court confirmed that a roads authority cannot discharge its duty merely by establishing an absence of prior complaints; it must have in place adequate systems for identifying and repairing road hazards. The case is a practical illustration of the evidential requirements in road defect liability cases.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public authority",
      "road defect",
      "pothole",
      "contributory negligence"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Brien v Bus Éireann",
    "citation": "[2023] IEHC 10",
    "year": 2023,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court found Bus Éireann liable for injuries to a passenger resulting from negligent driving by a bus driver. The court awarded damages for physical and psychological injury, addressing the principles applicable to the assessment of general and special damages in passenger injury claims.",
    "key_quote": "A carrier owes its passengers a duty to take reasonable care for their safety, and is vicariously liable for the negligent driving of its employees which causes injury to a passenger.",
    "full_summary": "O'Brien v Bus Éireann concerned a personal injury action brought by a bus passenger who sustained physical and psychological injuries during a journey as a result of the negligent driving of a Bus Éireann driver. The plaintiff alleged that the driver had braked suddenly and without adequate warning, causing the plaintiff to be thrown forward and to sustain injuries. The High Court found that Bus Éireann was vicariously liable for the negligent conduct of its employee driver and that the plaintiff had established her injuries were caused by that negligence. The court then turned to the assessment of damages, applying the principles applicable to awards of general and special damages under Irish law, including the guidelines issued following the report of the Personal Injuries Commission and, where applicable, the Book of Quantum. The court awarded damages for pain and suffering — both past and future — as well as for loss of earnings and medical expenses incurred. The case illustrates the application of the law of vicarious liability in the public transport context and provides useful guidance on quantum in passenger injury cases. It also reflects the courts' awareness of the policy considerations underlying the assessment of damages in personal injury cases following the PIAB process.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public transport",
      "passenger injury",
      "negligent driving",
      "quantum"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Reidy v Pasek",
    "citation": "[2023] IECA 44",
    "year": 2023,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal examined apportionment of liability in a road traffic accident case involving a pedestrian. The court reviewed the trial judge's findings on contributory negligence and confirmed the correct approach to assessing the respective degree of fault between drivers and pedestrians in accident cases.",
    "key_quote": "In apportioning contributory negligence between a driver and a pedestrian, the court must assess the relative blameworthiness of each party's conduct, having regard to the particular circumstances of the accident.",
    "full_summary": "Reidy v Pasek arose from a road traffic accident in which the plaintiff pedestrian was struck by the defendant's vehicle and suffered personal injuries. The trial court apportioned liability and awarded damages. The defendant appealed the quantum of damages and the apportionment of contributory negligence attributed to the plaintiff. The Court of Appeal reviewed the trial judge's assessment of how the accident occurred and the relative contributions of the driver's negligence and the pedestrian's own conduct to the occurrence of the accident. The court considered the relevant principles governing contributory negligence as between pedestrians and drivers, including the relative vulnerability of pedestrians, the respective ability of drivers and pedestrians to take precautions, and the degree of fault attributable to each. The court confirmed that while pedestrians bear an obligation to take reasonable care for their own safety, drivers owe a high duty of care to vulnerable road users including pedestrians. The apportionment was adjusted on appeal. The case provides guidance on the practical assessment of contributory negligence in road accident cases involving pedestrians and reinforces the principle that the respective blameworthiness of the parties — not merely their causal contribution — is the governing criterion under the Civil Liability Act 1961.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "personal injury",
      "contributory negligence",
      "road accident"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Carroll v Phelan",
    "citation": "[2023] IECA 91",
    "year": 2023,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered a claim for property damage caused by the defendant's negligent act affecting the plaintiff's premises. The court applied principles of foreseeability and proximity and affirmed that a landowner owes a duty of care to neighbouring property owners not to carry out activities on their land that create a foreseeable risk of damage.",
    "key_quote": "A landowner who carries out works or activities on their land in a manner that creates a foreseeable risk of damage to a neighbour's property will be liable in negligence if that risk materialises and causes damage.",
    "full_summary": "Carroll v Phelan was a property damage claim in which the plaintiff sought damages from the defendant for damage caused to the plaintiff's premises as a result of the defendant's negligent conduct on adjoining land. The plaintiff alleged that the defendant had carried out works or activities that caused subsidence, flooding, or structural damage to the plaintiff's property. The trial court found in the plaintiff's favour and the defendant appealed, challenging both the finding of liability and the quantum of the award. The Court of Appeal considered the duty of care owed by a landowner to neighbouring property owners in respect of activities carried out on their own land. The court applied the principles of foreseeability and proximity derived from Donoghue v Stevenson and confirmed that a landowner will owe a duty of care to a neighbouring owner where it is reasonably foreseeable that negligent conduct on the land could cause damage to the neighbour's property. The court considered whether the defendant's conduct fell below the standard of a reasonable landowner in the circumstances and whether it caused the damage complained of. The appeal was dismissed. The case illustrates the application of standard negligence principles to neighbour disputes involving property damage.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "property damage",
      "neighbour liability",
      "foreseeability"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Muldoon v Minister for the Environment",
    "citation": "[2023] IECA 61",
    "year": 2023,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered the scope of statutory immunity available to public authorities in the exercise of their planning functions. The court examined the boundary between ordinary negligence and misfeasance in public office and clarified the degree of bad faith required to establish the latter.",
    "key_quote": "Misfeasance in public office requires proof that the defendant public officer acted with targeted malice or with knowledge that their act was unlawful and would probably injure the plaintiff; mere negligence in the exercise of a statutory function does not suffice.",
    "full_summary": "Muldoon v Minister for the Environment concerned a claim against the Minister for the Environment arising from the exercise of statutory planning functions. The plaintiff alleged that the Minister's exercise of a statutory power had caused the plaintiff loss and sought damages in negligence and, alternatively, for misfeasance in public office. The trial court dismissed the claim and the plaintiff appealed. The Court of Appeal considered the scope of immunity available to public authorities acting within their statutory planning remit and the standard of conduct required to ground liability. On the misfeasance claim, the court clarified the elements of the tort of misfeasance in public office, as recognised in Ireland following Three Rivers District Council v Bank of England: the tort requires proof either of targeted malice — an act done with the intention to injure the plaintiff — or of an act done with knowledge that it is unlawful and will probably cause injury to the plaintiff. The court confirmed that mere negligence or even gross negligence in the exercise of a statutory power does not amount to misfeasance. The court also considered the interaction between the planning statutory framework and common law negligence, applying the Glencar analysis. The appeal was dismissed. The case is a significant modern Irish authority on misfeasance in public office and public authority immunity.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public authority",
      "statutory immunity",
      "planning",
      "misfeasance"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Coleman v Coleman",
    "citation": "[2024] IEHC 459",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a claim for trespass to the person arising from a family dispute. The court confirmed that assault and battery remain actionable torts in Irish law regardless of any criminal proceedings arising from the same facts, and awarded damages for the physical and psychological impact of the tortious conduct.",
    "key_quote": "Assault and battery are actionable torts in Irish law independent of any criminal liability, and a plaintiff who establishes that they were subjected to intentional and unlawful physical contact is entitled to compensatory damages, including for psychological consequences.",
    "full_summary": "Coleman v Coleman was a High Court civil action for trespass to the person arising from a family dispute between the parties. The plaintiff alleged that the defendant had physically assaulted him on one or more occasions, causing physical injury and significant psychological distress. The defendant denied the allegations. The High Court considered the torts of assault and battery and confirmed that they remain independently actionable in Irish civil law, regardless of whether criminal charges have been or are to be brought in respect of the same conduct. The court examined the evidence and found in favour of the plaintiff, holding that the defendant had committed intentional and unlawful acts of physical contact constituting battery, and acts putting the plaintiff in reasonable apprehension of imminent harmful or offensive contact constituting assault. The court assessed general damages for the physical and psychological consequences of the tortious conduct, noting that awards in cases of trespass to the person in a family context must reflect the seriousness of the violation of the plaintiff's bodily integrity. The case is a useful modern Irish authority on the civil torts of assault and battery, the relationship between civil and criminal proceedings, and the assessment of damages for trespass to the person.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "trespass to person",
      "assault",
      "battery",
      "family dispute"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Kelly v O'Doherty",
    "citation": "[2024] NIMaster 1",
    "year": 2024,
    "court": "High Court of Northern Ireland (Master)",
    "jurisdiction": "UK",
    "legal_principle": "The Northern Ireland High Court considered a defamation claim arising from social media posts. The case examined the application of defamation principles to online and social media publications, including the meaning to be attributed to posts read by a particular audience and whether the serious harm threshold was met.",
    "key_quote": "Defamation principles apply to social media publications as to any other publication; the court must assess the natural and ordinary meaning of the posts in question as they would be understood by the reasonable reader of the particular platform.",
    "full_summary": "Kelly v O'Doherty was a defamation action heard before a Master of the High Court of Northern Ireland arising from a series of posts published by the defendant on social media platforms. The plaintiff alleged that the posts were defamatory of him and caused serious harm to his reputation within the meaning of section 1 of the Defamation Act 2013 as applied in Northern Ireland. The court considered how defamation principles apply to the social media context, including the question of what meaning a reasonable reader would attribute to posts made on particular platforms, taking into account the context, tone, and conventions of social media communication. The court examined the serious harm threshold under the Defamation Act 2013, considering the extent of publication on the social media platform, the identity of those who saw the posts, and the actual or likely impact on the plaintiff's reputation. The case also touched on whether the defendant could avail of any of the statutory defences under the 2013 Act, including truth and honest opinion. The case illustrates the growing body of case law on social media defamation in the common law jurisdictions and provides guidance on the principles applicable to assessing the meaning and impact of online posts in defamation proceedings.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "social media",
      "online publication",
      "Northern Ireland"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Kelly v Bon Secours Health System",
    "citation": "[2000] IEHC 27",
    "year": 2000,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court applied the Dunne v National Maternity Hospital principles to a claim against a private hospital for alleged nursing negligence. The court reiterated that the standard of care for medical and nursing staff is that of the reasonably competent practitioner in the relevant specialty, and that departure from general and approved practice must be established by expert evidence.",
    "key_quote": "The standard of care applicable to nursing staff is that of the reasonably competent practitioner in the relevant specialty; departure from general and approved practice must be demonstrated by expert evidence.",
    "full_summary": "In Kelly v Bon Secours Health System [2000] IEHC 27, the plaintiff brought a claim in medical negligence against a private hospital arising from alleged deficiencies in the nursing care provided. The High Court applied the principles established in Dunne v National Maternity Hospital [1989] IR 91, which set out the test for medical negligence in Ireland. The court reiterated that the standard of care owed by medical and nursing staff is that of the reasonably competent practitioner exercising the relevant specialty. To establish a breach of duty, the plaintiff was required to show that the defendant's conduct departed from the general and approved practice of the profession at the time. The court emphasised that such a departure must be established through credible expert evidence, and that mere disagreement between experts is insufficient unless the court can identify a clear and indefensible departure from accepted standards. Where a body of responsible medical or nursing opinion would have acted in the same way as the defendant, liability will not be established. The court also noted the distinction between an error in clinical judgment and true negligence, affirming that not every adverse outcome gives rise to a claim. The case reinforced the robustness of the Dunne principles as the governing framework for medical and nursing negligence claims in Irish courts and illustrated the demanding evidential burden placed on plaintiffs who seek to challenge the professional judgment of nursing staff at an institutional level.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "medical negligence",
      "hospital",
      "standard of care",
      "nursing"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Kearney v Park House Hotel and St Vincent's Hospital",
    "citation": "[2012] IEHC 29",
    "year": 2012,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered overlapping claims in occupiers' liability and medical negligence arising from a patient's fall on hospital premises. The court examined the duty owed by a hospital both as an occupier under the Occupiers' Liability Act 1995 and as a medical institution responsible for the safety of patients.",
    "key_quote": "A hospital owes its patients a dual duty: as an occupier under the 1995 Act to take reasonable care for their safety, and as a medical institution to implement appropriate clinical safeguards against foreseeable risk of patient falls.",
    "full_summary": "In Kearney v Park House Hotel and St Vincent's Hospital [2012] IEHC 29, the plaintiff sustained injury following a fall on the premises of St Vincent's Hospital and pursued claims under both occupiers' liability and medical negligence. The High Court was required to examine the intersecting legal frameworks applicable to a hospital setting. Under the Occupiers' Liability Act 1995, the hospital owed a duty as occupier to take reasonable care to ensure the premises were safe for visitors. Concurrently, as a medical institution, the hospital owed clinical duties to assess and manage the risk of patient falls, particularly where the patient was known to be vulnerable. The court considered the evidence as to whether the hospital had implemented adequate fall-prevention protocols and whether the physical condition of the relevant area of the premises contributed to the accident. The court examined the relationship between the clinical duty of care and the occupier's duty, noting that the two obligations may overlap and complement each other without being identical. The case is significant for its analysis of how a hospital's responsibilities under the 1995 Act interact with its clinical obligations in negligence. It also addressed the standard of proof required in each strand of the claim and the extent to which a hospital's internal safety procedures, if followed, could discharge the relevant duties. The judgment provides useful guidance on the management of multi-strand tort claims arising from incidents on institutional premises.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "medical negligence",
      "occupiers liability",
      "slip and fall",
      "hospital premises"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Lindsay v Mid-Western Health Board",
    "citation": "[1993] 2 IR 147",
    "year": 1993,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court held that a doctor must disclose all material risks of a proposed treatment to a patient to obtain valid informed consent. The court adopted the patient-centred standard of disclosure rather than the Bolam professional standard, requiring doctors to provide information that a reasonable patient would want to know before consenting to treatment.",
    "key_quote": "A doctor is obliged to warn a patient of any material risk inherent in the proposed treatment, the test of materiality being what a reasonable patient in the plaintiff's position would want to know.",
    "full_summary": "In Lindsay v Mid-Western Health Board [1993] 2 IR 147, the Supreme Court addressed the doctrine of informed consent in Irish medical law. The plaintiff underwent a procedure without being warned of a specific material risk, which subsequently materialised, causing injury. The central question was what standard of disclosure a doctor must meet to obtain a patient's legally valid consent. The court rejected the Bolam test, under which the adequacy of disclosure would be judged by reference to what a responsible body of medical opinion would have disclosed. Instead, the court held that the appropriate standard was patient-centred: a doctor must disclose all material risks, meaning those which a reasonable patient in the plaintiff's circumstances would want to know before agreeing to the procedure. This represented a significant departure from a purely professional standard and aligned Irish law with a rights-based approach to patient autonomy. The court acknowledged that some latitude must be given to the therapeutic privilege, whereby a doctor may withhold information if its disclosure would be seriously detrimental to the patient's health. However, this exception was construed narrowly. The case laid the foundations for the modern informed consent doctrine in Ireland and was later reinforced and developed by subsequent decisions. It remains a key authority on the nature of the doctor-patient relationship, the patient's right to self-determination, and the legal consequences of non-disclosure of risk.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "medical negligence",
      "informed consent",
      "disclosure of risk",
      "paternalism"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Quinn v South Eastern Health Board",
    "citation": "[2001] IEHC 144",
    "year": 2001,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the liability of a health board for a failure to diagnose and treat a patient in a timely manner. The court applied the Dunne standard of care and addressed the causation question of whether prompt treatment would have altered the outcome, applying the material contribution to risk test.",
    "key_quote": "Where delayed diagnosis is alleged, it is not enough to show a breach of duty; the plaintiff must establish that the delay materially contributed to the damage suffered, applying a causation test suited to the medical context.",
    "full_summary": "In Quinn v South Eastern Health Board [2001] IEHC 144, the plaintiff alleged that the defendant health board was negligent in failing to diagnose and treat a medical condition within a reasonable time, resulting in a worse outcome than would otherwise have occurred. The High Court applied the Dunne v National Maternity Hospital framework in assessing whether the medical staff had departed from the standard of the reasonably competent practitioner in the relevant specialty. The court found that expert evidence was essential to establish whether the delay in diagnosis represented a breach of the applicable standard of care. Having addressed breach, the court turned to the complex causation issue central to delayed-treatment cases: whether, on the balance of probabilities, timely diagnosis and intervention would have produced a materially better outcome for the plaintiff. The court engaged with the principle of material contribution to risk, recognising that in medical cases where the precise causal chain is difficult to establish, it may be sufficient for the plaintiff to show that the defendant's breach materially increased the risk of the harm suffered. The judgment reflects the difficulties inherent in medical causation analysis and the courts' willingness to adopt flexible causation principles where strict but-for causation would produce unjust results. The case is a useful example of how Irish courts apply Dunne principles alongside nuanced causation doctrine in delayed diagnosis claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "medical negligence",
      "diagnosis",
      "delayed treatment",
      "causation"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Nyhan v Commissioner of An Garda Síochána",
    "citation": "[2013] IEHC 259",
    "year": 2013,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court found the Garda Commissioner liable for the false imprisonment of the plaintiff who was wrongfully detained. The court confirmed that a detention not authorised by law constitutes the tort of false imprisonment, and that no malice need be shown by the plaintiff, the unlawfulness of the detention being sufficient.",
    "key_quote": "False imprisonment requires only that the detention was without lawful justification; proof of malice or bad faith on the part of the detaining officer is not necessary to establish the tort.",
    "full_summary": "In Nyhan v Commissioner of An Garda Síochána [2013] IEHC 259, the plaintiff brought a claim in false imprisonment against the Garda Commissioner following an arrest and detention that was found to be without lawful authority. The High Court confirmed that false imprisonment is a trespass to the person constituted by any unlawful total restraint of the plaintiff's freedom of movement. The court affirmed that the tort is actionable per se: it is not necessary for the plaintiff to prove that the defendant acted with malice, bad faith, or improper motive. The fact of an unlawful detention is, of itself, sufficient to establish liability. The court examined the statutory basis upon which the plaintiff had been arrested and held that the conditions prescribed by the relevant statutory provision had not been fulfilled, rendering the detention unlawful from the outset. The Commissioner, as the officer responsible for the conduct of Garda members acting in the course of their duties, was held vicariously liable. The case reinforces the constitutional protection of personal liberty in Ireland and underscores the importance of strict compliance with statutory procedures governing arrest and detention. It also highlights the limited scope of the defences available to the State in false imprisonment claims and the significance of procedural regularity in the exercise of police powers.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public authority",
      "false imprisonment",
      "garda",
      "wrongful arrest"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Browne v Minister for Justice",
    "citation": "[2022] IEHC 107",
    "year": 2022,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the duty of care owed by the prison authorities to prisoners. The court examined whether an intentional unlawful act by a public official causing foreseeable damage could found a claim for misfeasance in public office and confirmed that prisoners retain certain rights to be protected from foreseeable harm.",
    "key_quote": "Prisoners retain residual rights under the law, and the State, through the prison authorities, owes a duty of care to take reasonable steps to protect prisoners from foreseeable harm while in its custody.",
    "full_summary": "In Browne v Minister for Justice [2022] IEHC 107, the plaintiff, a prisoner, brought a claim alleging that the prison authorities had failed in their duty of care by exposing him to foreseeable harm within the prison environment. The High Court examined the scope of the duty of care owed by the State to persons in its lawful custody. The court confirmed that imprisonment does not extinguish a person's rights; rather, prisoners retain such rights as are not necessarily curtailed by the fact of imprisonment. The State's duty of care to prisoners in respect of their physical safety and wellbeing is established in Irish law and requires the prison authorities to take reasonable precautions to protect inmates from foreseeable harm. The court also examined the tort of misfeasance in public office, considering whether the conduct of individual prison officials amounted to an intentional unlawful act causing damage. The elements of the tort were examined in the context of the plaintiff's treatment, including whether the officials acted with knowledge that their conduct was unlawful or with reckless indifference to its legality. The judgment contributes to the developing jurisprudence on the civil liability of the State for the treatment of prisoners and addresses the interplay between the duty of care in negligence and the more demanding requirements of the misfeasance tort.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "misfeasance in public office",
      "prison authority",
      "duty of care",
      "prisoner"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Ryan v Office of Public Works",
    "citation": "[2015] IEHC 486",
    "year": 2015,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the duty of care owed by the Office of Public Works as occupier of a heritage site to a visitor who was injured on the premises. The court applied the Occupiers' Liability Act 1995 and held that, as a visitor, the plaintiff was owed a duty to take reasonable care, which included appropriate warnings about hazards.",
    "key_quote": "As occupier of a heritage site open to visitors, the OPW owes a duty under the Occupiers' Liability Act 1995 to take reasonable care for the safety of those admitted, including providing adequate warnings of hazards that may not be obvious to the ordinary visitor.",
    "full_summary": "In Ryan v Office of Public Works [2015] IEHC 486, the plaintiff was injured while visiting a heritage property managed by the Office of Public Works (OPW) and brought a claim under the Occupiers' Liability Act 1995. The High Court examined the duty owed by the OPW as occupier to the plaintiff, who was classified as a visitor within the meaning of the 1995 Act. As a visitor, the plaintiff was owed the common duty of care, which requires the occupier to take reasonable care to ensure that the premises are reasonably safe for the purpose for which the visitor was invited or permitted to be there. The court considered the particular challenges posed by heritage properties, which are maintained for cultural and historical reasons and which may not be capable of complete modification for safety purposes. The court held that while heritage considerations are a relevant factor, they do not discharge the duty owed to visitors. Rather, the OPW was required to take reasonable steps to identify and communicate hazards, including through appropriate signage, physical barriers, or verbal warnings where necessary. The court assessed whether the hazard in question was obvious to a reasonable visitor or whether additional precautions were warranted. The judgment provides useful guidance on the application of the 1995 Act to publicly managed heritage sites and the balance between preservation obligations and visitor safety.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "public authority",
      "heritage site",
      "visitor injury"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "McKenna v Kerry County Council",
    "citation": "[2020] IEHC 687",
    "year": 2020,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court found Kerry County Council liable for injuries sustained by a cyclist who fell due to a road surface defect. The court held that the council, as roads authority, had constructive knowledge of the hazard through its own inspection records and had failed to repair it within a reasonable time.",
    "key_quote": "A roads authority that is shown by its own inspection records to have had constructive knowledge of a road defect and to have failed to remedy it within a reasonable time will be held liable for injuries caused by that defect.",
    "full_summary": "In McKenna v Kerry County Council [2020] IEHC 687, the plaintiff, a cyclist, was thrown from his bicycle after encountering a significant pothole or defect in the road surface and suffered personal injury as a result. The plaintiff brought proceedings against Kerry County Council in its capacity as the roads authority responsible for the maintenance of the public road in question. The High Court examined the council's liability under the law of negligence and considered the central question of knowledge: whether the council had actual or constructive knowledge of the road defect before the accident. The council's own road inspection records proved significant in this regard, as they disclosed that the defect or a comparable defect in the area had been noted on a prior occasion. The court held that these records established constructive knowledge on the part of the council; it knew, or ought to have known, of the hazardous condition. The court further held that the council had not taken steps to repair the defect within a reasonable time following the acquisition of that knowledge, and that this failure constituted a breach of its duty of care. The court rejected arguments to the contrary based on resource constraints. The case is an important authority on the liability of roads authorities for road defects and on the use of inspection and maintenance records in establishing constructive knowledge in such claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "road authority",
      "road defect",
      "pothole",
      "liability"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Scaife v Falcon Leisure Group (Overseas) Ltd",
    "citation": "[2008] 2 IR 359",
    "year": 2008,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the liability of a package holiday operator for injuries sustained by a tourist at a holiday resort. The court applied the EC (Package Holidays and Package Tours) Regulations 1995 and held that the organiser is liable for improper performance of the holiday contract regardless of whether fault lies with the organiser or a local supplier.",
    "key_quote": "Under the Package Travel Regulations, the organiser of a package holiday is liable to the consumer for the proper performance of the contract as a whole, irrespective of whether the failure is attributable to the organiser itself or to a local supplier.",
    "full_summary": "In Scaife v Falcon Leisure Group (Overseas) Ltd [2008] 2 IR 359, the plaintiff was injured while on a package holiday arranged by the defendant tour operator. The injury occurred at the holiday resort and involved a facility operated by a local supplier rather than the tour operator directly. The Supreme Court was required to determine the scope of the tour operator's liability under the EC (Package Holidays and Package Tours) Regulations 1995, which gave effect to Council Directive 90/314/EEC in Ireland. The court confirmed that the Regulations impose strict liability on the organiser of a package holiday for the proper performance of the contract, regardless of whether the failure arises from the organiser's own conduct or from the acts or omissions of a third party supplier engaged by the organiser to provide services forming part of the package. The organiser cannot escape liability simply by pointing to a local supplier as the proximate cause of the failure. Limited defences are available, including that the failure was attributable to the consumer, to an unforeseeable or unavoidable act by a third party unconnected with the package, or to force majeure. However, these defences are construed narrowly in favour of the consumer. Scaife is a leading Irish authority on the liability of package holiday operators and remains an essential reference for claims arising from injuries sustained abroad in the context of package travel arrangements.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "holiday accident",
      "package holiday",
      "EC Package Travel Regulations",
      "pool injury"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Kellett v RCL Cruises Ltd",
    "citation": "[2020] IECA 138",
    "year": 2020,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered the liability of a cruise line for injuries sustained by a passenger during an excursion. The court examined the scope of the package travel regulations and the extent to which a tour operator or cruise line is liable for acts of independent service providers during ancillary excursions.",
    "key_quote": "Whether a shore excursion forms part of the package determines whether the cruise line is exposed to strict liability under the Package Travel Regulations; where the excursion is ancillary and booked separately, the operator's liability may be limited.",
    "full_summary": "In Kellett v RCL Cruises Ltd [2020] IECA 138, the plaintiff was a passenger on a cruise ship who sustained injury during a shore excursion and brought proceedings against the cruise line. The Court of Appeal examined the applicable legal framework and considered the central question of whether the shore excursion in question fell within the scope of the package travel contract or whether it was an independent service arranged by the passenger. The court analysed the Package Travel Regulations and considered the test for determining whether an ancillary service such as a shore excursion is sufficiently integrated into the overall package to engage the organiser's strict liability for its proper performance. The court also examined the terms and conditions of the cruise contract and the manner in which the excursion had been marketed and booked. Where an excursion is booked through the cruise line and presented as part of the cruise experience, there is a stronger argument that it forms part of the package. However, where the excursion is arranged independently by the passenger, the cruise line may not be the organiser for the purposes of the Regulations. The Court of Appeal's analysis provides important guidance on the boundaries of tour operator liability under the package travel regime and on the significance of the contractual and marketing arrangements surrounding ancillary excursions.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "holiday accident",
      "cruise ship",
      "package travel",
      "jurisdiction"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Mason Heeney v Sunway Travel Ltd",
    "citation": "[2022] IEHC 89",
    "year": 2022,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a claim under the Package Travel and Linked Travel Arrangements Regulations 2019 for injury sustained in a hotel pool. The court applied the strict liability framework of the Regulations, under which the organiser is liable for any failure in performance of the services covered by the package, subject to limited defences.",
    "key_quote": "The 2019 Package Travel Regulations impose strict liability on the organiser for failures in the performance of the contracted package services; the consumer need not prove fault on the part of the organiser or any individual supplier.",
    "full_summary": "In Mason Heeney v Sunway Travel Ltd [2022] IEHC 89, the plaintiff was injured in the pool area of a hotel forming part of a package holiday arranged by Sunway Travel Ltd. The plaintiff brought proceedings under the Package Travel and Linked Travel Arrangements Regulations 2019, which replaced the 1995 Regulations and gave effect to Directive (EU) 2015/2302 in Irish law. The High Court applied the strict liability framework established by the 2019 Regulations. Under this framework, the organiser is liable to the traveller for the performance of the travel services included in the package contract, irrespective of whether those services are to be performed by the organiser itself or by other travel service providers. The plaintiff was not required to establish fault on the part of any individual party; it was sufficient to demonstrate that the services contracted for had not been performed properly and that this failure caused the injury. The court examined the defences available under the Regulations, which include the failure being attributable to the traveller, to an unforeseeable event, or to unavoidable and extraordinary circumstances. It held that none of these defences were made out on the facts. The case is significant as one of the first Irish decisions to apply the 2019 Regulations and confirms the continuity of the strict liability approach for package travel consumers in respect of holiday injuries.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "package holiday",
      "hotel accident",
      "Package Travel Regulations 2019",
      "liability"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Oakes v Spar (Ireland) Ltd",
    "citation": "[2019] IEHC 642",
    "year": 2019,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the liability of a convenience store for a customer's slip and fall on a wet floor. The court found that the retailer had failed to implement an adequate system for the inspection and drying of floors, resulting in a foreseeable and preventable accident. The defendant was held liable as occupier under the 1995 Act.",
    "key_quote": "An occupier of retail premises must have in place an adequate and regular system of inspection and cleaning to detect and address floor hazards; a failure to implement such a system will constitute a breach of the duty owed to visitors under the Occupiers' Liability Act 1995.",
    "full_summary": "In Oakes v Spar (Ireland) Ltd [2019] IEHC 642, the plaintiff slipped on a wet floor inside a Spar convenience store and sustained personal injury. The plaintiff alleged that the defendant, as occupier, had failed in its duty under the Occupiers' Liability Act 1995 to take reasonable care to ensure the premises were safe for customers. The High Court examined the evidence relating to the defendant's floor inspection and cleaning practices. The court found that the defendant had not implemented a sufficiently robust or frequent system for monitoring and addressing wet or hazardous floor conditions within the store. In particular, the court noted the absence of a formal inspection log and the lack of a clear protocol for identifying and responding to spillages or moisture accumulation in areas accessible to customers. Given the foreseeable nature of wet floor hazards in a retail food environment, the court held that the defendant's failure to maintain an adequate inspection and cleaning system constituted a breach of the duty of care owed to visitors. The court was satisfied that the wet condition of the floor had been present for a sufficient period that a proper inspection system would have detected and remedied it before the plaintiff's fall. The case is a useful authority on the standard expected of retail occupiers in maintaining safe premises and on the evidential importance of inspection and cleaning records in occupiers' liability litigation.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "retail premises",
      "slip and fall",
      "reasonableness"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Hanlon v Electricity Supply Board",
    "citation": "[1969] IR 93",
    "year": 1969,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the duty of care owed to a child trespasser who was injured by an ESB electrical installation. The court applied the 'allurement' or attractive nuisance doctrine, holding that where a dangerous thing on land is likely to attract children, the occupier owes a duty to take reasonable precautions to protect them, notwithstanding their trespasser status.",
    "key_quote": "Where a dangerous installation is of a nature likely to attract children who are too young to appreciate the risk, the occupier may owe a duty of care to such child trespassers, notwithstanding the absence of any licence or invitation.",
    "full_summary": "In O'Hanlon v Electricity Supply Board [1969] IR 93, the plaintiff, a child, was seriously injured when he came into contact with an ESB electrical installation situated on land. The child was technically a trespasser, having entered without permission. The Supreme Court considered whether, notwithstanding the plaintiff's trespasser status, the ESB owed a duty of care in respect of the dangerous electrical equipment. The court applied the attractive nuisance or allurement doctrine, which recognises that where a dangerous object or feature on land is of a kind likely to attract the curiosity of children who cannot appreciate the associated danger, the ordinary common law rule that no duty is owed to trespassers may be displaced. The court held that the ESB, as the occupier responsible for the electrical installation, was required to take reasonable precautions to guard against the risk of injury to children who might foreseeably be attracted to or wander near the hazard. The decision preceded the Occupiers' Liability Act 1995 and was decided under the common law framework applicable at the time. The case remains a significant authority in Irish law for the proposition that the trespasser category does not automatically exclude a duty of care where child safety is at stake, and it laid the groundwork for the subsequent statutory treatment of recreational users and trespassers under the 1995 Act. The ESB's failure to adequately secure the installation was held to constitute a breach of the duty owed in the circumstances.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "electricity",
      "trespasser",
      "attractive nuisance"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Hamill v Oliver",
    "citation": "[1977] IR 73",
    "year": 1977,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the liability of a driver for injuries to a pedestrian and the apportionment of contributory negligence. The court affirmed the principles governing the assessment of fault between motorists and pedestrians and the correct approach to apportioning damages under the Civil Liability Act 1961.",
    "key_quote": "In apportioning contributory negligence between a motorist and a pedestrian, the court must assess the degree of fault attributable to each party in causing the accident and reduce damages accordingly under the Civil Liability Act 1961.",
    "full_summary": "In Hamill v Oliver [1977] IR 73, the plaintiff pedestrian was struck by the defendant's motor vehicle and sustained personal injury. The defendant admitted negligent driving but sought to rely on contributory negligence on the part of the plaintiff. The Supreme Court examined the proper principles for the assessment and apportionment of fault between motorists and pedestrians in road accident cases. The court affirmed that, under the Civil Liability Act 1961, where a plaintiff's own negligence has contributed to the damage suffered, the court must reduce the damages proportionately to the degree of the plaintiff's fault. The court emphasised that this apportionment exercise requires the court to make a global assessment of the relative culpability of both parties in causing the accident, having regard to the nature of the road, the circumstances of the incident, and the conduct of each party immediately before the collision. The court considered the particular position of pedestrians and motorists in road traffic law, noting that a higher degree of care may be expected of a driver given the inherent danger posed by motor vehicles. However, pedestrians are not absolved from responsibility for their own safety, particularly where they enter the road without due care. The case provides a useful illustration of the practical application of contributory negligence principles in Irish road accident litigation and remains a relevant authority on the apportionment framework under the 1961 Act.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "pedestrian",
      "contributory negligence"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Roche v Patrick Kelly & Sons Ltd",
    "citation": "[1969] IR 100",
    "year": 1969,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the liability of a building contractor for injuries caused by a dangerous condition left on premises following construction work. The court held that a contractor owes a duty of care not to create dangerous conditions on premises that may foreseeably injure third parties who subsequently enter the site.",
    "key_quote": "A building contractor who creates a dangerous condition on premises in the course of carrying out construction work owes a duty of care to third parties who may foreseeably be injured by that condition after the work is completed.",
    "full_summary": "In Roche v Patrick Kelly & Sons Ltd [1969] IR 100, the plaintiff sustained injury on premises following construction work carried out by the defendant building contractor. The dangerous condition that caused the injury was created or left in place by the contractor during the course of its work. The Supreme Court was asked to determine whether the building contractor owed a duty of care to the plaintiff, who was not a party to the construction contract. The court held that a building contractor who, in the course of its work, creates or leaves a dangerous condition on or about premises may owe a duty of care in negligence to those persons whom it was reasonably foreseeable might come onto the premises and be injured by that condition. This duty is not limited to the person who engaged the contractor; it extends to third parties whose presence and potential exposure to danger was reasonably foreseeable. The court examined the nature of the hazard created by the contractor and whether the plaintiff's injury was a foreseeable consequence of the contractor's failure to adequately secure or address the dangerous condition before leaving the site. The case is an important precedent for the liability of building contractors in Irish tort law and establishes that the duty of care in construction contexts extends beyond immediate contractual relationships to encompass foreseeable third parties who may be affected by the contractor's work.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "building contractor",
      "dangerous premises",
      "independent contractor"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Vesey v Bus Éireann",
    "citation": "[2001] 4 IR 192",
    "year": 2001,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court held Bus Éireann liable for injuries sustained by a passenger who fell while alighting from a bus. The court confirmed the high duty of care owed by common carriers to passengers and considered the apportionment of contributory negligence where the passenger's own conduct contributed to the fall.",
    "key_quote": "A common carrier owes a high duty of care to its passengers; where a passenger is injured while alighting from a bus, the carrier must show that it took all reasonable steps to ensure the safety of the disembarkation process.",
    "full_summary": "In Vesey v Bus Éireann [2001] 4 IR 192, the plaintiff was a passenger who fell and sustained injury while alighting from a Bus Éireann vehicle. Proceedings were brought against the bus company in negligence. The Supreme Court examined the duty of care owed by a common carrier to its passengers, confirming that this duty is a high one and requires the carrier to take all reasonable steps to ensure the safety of passengers throughout the journey, including the process of boarding and alighting. The court considered whether the circumstances of the plaintiff's fall reflected a failure on the part of Bus Éireann to meet this standard. Arguments relating to the design of the bus, the actions of the driver in the vicinity of the stop, and the conditions at the point of alighting were examined. The court also addressed the question of contributory negligence, considering whether the plaintiff's own conduct in the manner of alighting contributed to the accident. Under the Civil Liability Act 1961, if the plaintiff's fault contributed to the damage suffered, damages are to be reduced proportionately. The court apportioned responsibility between the parties, having regard to the relative degree of fault of each. The case confirms the heightened duty of care applicable to common carriers in Irish law and provides guidance on the interaction between carrier liability and the contributory negligence defence in passenger injury claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public transport",
      "passenger injury",
      "duty of care",
      "contributory negligence"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Martin v Dunnes Stores",
    "citation": "[2015] IECA 85",
    "year": 2015,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal upheld a finding of liability against Dunnes Stores for a customer's slip on a wet floor in a supermarket. The court held that the retailer's inspection and cleaning system was inadequate and that the failure to detect and remedy the hazard within a reasonable time constituted a breach of the duty owed to visitors under the Occupiers' Liability Act 1995.",
    "key_quote": "A retailer's failure to maintain an adequate and documented floor inspection system, resulting in an undetected wet floor hazard, constitutes a breach of the duty of care owed to customers as visitors under the Occupiers' Liability Act 1995.",
    "full_summary": "In Martin v Dunnes Stores [2015] IECA 85, the plaintiff slipped on a wet floor in a Dunnes Stores supermarket and sustained injury. The trial court found in favour of the plaintiff and Dunnes Stores appealed. The Court of Appeal dismissed the appeal and upheld the finding of liability. The court examined the duty owed by the retailer as occupier to the plaintiff as a visitor under the Occupiers' Liability Act 1995. That duty is to take reasonable care to ensure that the visitor does not suffer injury or damage from any danger existing on the premises. The court found that the wet floor constituted a hazard and that the key question was whether the defendant had in place a sufficient system of inspection and cleaning to identify and address such hazards within a reasonable time. The evidence disclosed that the inspection and cleaning regime employed by Dunnes Stores was inadequate in the circumstances, and in particular that there was no proper system for recording inspections or ensuring that the area in question had been recently checked before the accident. The court held that the failure of such a system to detect a floor hazard that had been present for a sufficient time before the incident constituted a breach of the occupier's duty. The decision is one of the leading Court of Appeal authorities on the standards expected of retail occupiers in managing floor safety and on the importance of maintaining adequate cleaning and inspection records.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "slip and fall",
      "retail premises",
      "inspection system"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Griffin v Hoare",
    "citation": "[2021] IECA 329",
    "year": 2021,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered the respective responsibilities of a motorist and cyclist in a road collision and reviewed the trial judge's apportionment of contributory negligence. The court affirmed that both motorists and cyclists owe duties of care to each other and that the allocation of blame must reflect the actual degree of fault of each party.",
    "key_quote": "Both motorists and cyclists owe each other a duty of care on public roads; the apportionment of contributory negligence must be based on a fair assessment of the degree of fault actually attributable to each party's conduct.",
    "full_summary": "In Griffin v Hoare [2021] IECA 329, the plaintiff cyclist was involved in a collision with the defendant's motor vehicle on a public road and sustained personal injury. Following the trial, liability was divided between the parties and the plaintiff appealed the apportionment of contributory negligence, while the defendant cross-appealed on the finding of liability. The Court of Appeal examined the duties of care owed by both motorists and cyclists in road traffic situations and the applicable principles for apportioning blame under the Civil Liability Act 1961. The court affirmed that cyclists and motorists owe reciprocal duties of care to each other and to other road users. In assessing the degree of contributory negligence on the part of the plaintiff cyclist, the court considered matters such as the cyclist's position on the road, speed, use of lights and reflective equipment, and awareness of other traffic. On the defendant's side, the court examined the driver's speed, observation, and reaction in the circumstances. The Court of Appeal was mindful of the principle that appellate courts should be slow to interfere with a trial judge's apportionment of contributory negligence unless it discloses an error in principle or is clearly wrong. The court reviewed the trial judge's reasoning and made its own assessment of the appropriate apportionment, affirming the mutual obligations that apply to all road users regardless of the mode of transport employed.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "cyclist",
      "contributory negligence"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Nemeth v Topaz Energy Group Ltd",
    "citation": "[2021] IECA 252",
    "year": 2021,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered the liability of a petrol station operator for a customer's slip on the forecourt. The court held that an oil spill on a forecourt constituted a foreseeable danger and that the occupier had failed to take reasonable steps to inspect and remedy the hazard within a reasonable time after it ought to have become aware of it.",
    "key_quote": "An oil or fuel spill on a petrol station forecourt is a foreseeable hazard; an occupier who fails to detect and remedy such a condition within a reasonable time of when it ought to have been discovered will be in breach of its duty to visitors under the 1995 Act.",
    "full_summary": "In Nemeth v Topaz Energy Group Ltd [2021] IECA 252, the plaintiff slipped on an oil or fuel spill on the forecourt of a petrol station operated by the defendant and sustained personal injury. The plaintiff brought a claim under the Occupiers' Liability Act 1995. The trial court found in favour of the plaintiff and the defendant appealed. The Court of Appeal dismissed the appeal and upheld liability. The court noted that oil and fuel spills are an inherently foreseeable hazard in the context of a petrol station forecourt and that the defendant, as an experienced and commercially sophisticated occupier in that sector, must be taken to appreciate the risk. The central issue was whether the defendant had in place an adequate system of inspection and had responded appropriately to the hazard. The court examined the evidence relating to the frequency and method of forecourt inspections and found the system to be deficient. In particular, the interval between inspections was found to be excessive given the nature of the hazard, and there was no evidence that the spill had been identified and addressed within a reasonable time. The defendant's failure to detect and remedy the spill within the period it ought to have been discovered constituted a breach of the duty of care owed to the plaintiff as a visitor. The case reinforces the practical duty on occupiers of forecourts and similar premises to maintain robust and frequent inspection regimes.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "forecourt slip",
      "petrol station",
      "dangerous condition"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Morgan v ESB",
    "citation": "[2021] IEHC 391",
    "year": 2021,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a claim against ESB Networks for economic loss arising from a power interruption that damaged the plaintiff's property. The court applied the proximity and assumption of responsibility analysis and considered whether the loss was purely economic or accompanied by physical damage sufficient to ground a negligence claim.",
    "key_quote": "Recovery for economic loss caused by a negligent power interruption depends on whether there is a sufficiently proximate relationship or assumption of responsibility; pure economic loss not accompanied by physical damage will not generally be recoverable in negligence.",
    "full_summary": "In Morgan v ESB [2021] IEHC 391, the plaintiff brought a claim against ESB Networks arising from a power interruption or fault in the electricity supply that caused damage to the plaintiff's property or equipment. The High Court examined the applicable principles governing the recoverability of economic loss in negligence in Ireland. The court noted the general rule that pure economic loss is not recoverable in negligence absent a special relationship of proximity or an assumption of responsibility by the defendant towards the plaintiff. The court applied the proximity analysis developed in Irish and English case law, considering whether the relationship between the electricity network operator and the plaintiff was sufficiently close and direct to ground a duty of care in respect of economic loss. The court also examined whether the loss in question was purely economic in nature or whether it was accompanied by physical damage to the plaintiff's property, since physical damage would more readily attract liability in negligence. The case engaged with the distinction between the network operator's role as a regulated utility and the question of whether its statutory and regulatory obligations gave rise to a corresponding private law duty of care. The court's analysis provides guidance on the boundaries of negligence liability in the context of infrastructure failures and the circumstances in which an electricity network operator may be liable to consumers and third parties for losses arising from supply disruptions.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "electricity supply",
      "economic loss",
      "proximity"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Perry v Kendricks Transport Ltd",
    "citation": "[1956] 1 WLR 85",
    "year": 1956,
    "court": "England and Wales Court of Appeal",
    "jurisdiction": "UK",
    "legal_principle": "The Court of Appeal held that the escape of petrol from an abandoned coach on the defendant's land causing fire damage was capable of satisfying the Rylands v Fletcher rule. However, the court also recognised the defence that the escape was caused by the act of a stranger (a child who lit a match), which could defeat strict liability.",
    "key_quote": "Where the escape giving rise to liability under Rylands v Fletcher is caused by the deliberate act of a stranger, that act may break the chain of causation and provide a defence to the occupier, provided the act was not one that the defendant could reasonably have anticipated and guarded against.",
    "full_summary": "In Perry v Kendricks Transport Ltd [1956] 1 WLR 85, the defendant stored a large motor coach on its land. The coach's petrol tank contained residual fuel, and a child, a stranger to the defendant, ignited the petrol, causing a fire that spread and injured the plaintiff. The plaintiff sought to rely on the rule in Rylands v Fletcher, which imposes strict liability on a person who brings onto their land something likely to do mischief if it escapes. The Court of Appeal considered whether the accumulation of petrol in a parked coach could satisfy the requirement of a non-natural use of land and whether the escape of petrol by ignition constituted an escape within the rule. The court was prepared to accept that the Rylands v Fletcher rule could in principle apply to the facts. However, the central issue was whether the act of the child in igniting the petrol constituted an act of a stranger sufficient to defeat the defendant's strict liability. The court recognised that the act of a stranger can provide a complete defence to a Rylands v Fletcher claim where the escape is caused solely by that stranger's act and the defendant could not reasonably have anticipated or guarded against it. The case is an important English authority on the act of a stranger defence in strict liability and remains relevant to Irish law given the continued application of Rylands v Fletcher principles in this jurisdiction.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "Rylands v Fletcher",
      "fire",
      "escape",
      "strict liability",
      "act of stranger"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Reilly v Deveraux",
    "citation": "[2009] IEHC 539",
    "year": 2009,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a claim arising from a road traffic accident and examined the parties' respective duties of care. The court applied standard negligence principles in assessing liability and contributory negligence in the context of a collision at a road junction.",
    "key_quote": "At road junctions, a driver must exercise a heightened degree of care and observation, and liability will be assessed by reference to each driver's compliance with the applicable rules of the road and the standard of the reasonably careful motorist.",
    "full_summary": "In Reilly v Deveraux [2009] IEHC 539, the plaintiff sustained injury in a road traffic accident involving a collision at a junction and brought proceedings against the other driver. The High Court applied standard negligence principles, examining the duty of care owed by road users to one another and whether the defendant's conduct at the junction fell below the standard of the reasonably careful and competent driver. The court considered the applicable rules of the road, the respective positions and speeds of the vehicles, and the opportunity each driver had to observe and react to the other before the collision occurred. Having established breach of duty on the part of the defendant, the court addressed the question of contributory negligence, examining whether and to what extent the plaintiff's own driving contributed to the accident. The court applied the apportionment provisions of the Civil Liability Act 1961, reducing the plaintiff's damages by the percentage attributable to the plaintiff's own fault. The judgment illustrates the standard approach taken by the Irish courts in road traffic accident litigation, including the evidential importance of the rules of the road, witness testimony, and engineering or reconstruction evidence. The case provides a straightforward application of negligence and contributory negligence principles in the context of a junction collision.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "personal injury",
      "solicitor's duty",
      "road accident"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Noonan v Coogan",
    "citation": "[2009] IEHC 221",
    "year": 2009,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a road accident claim involving a collision on a rural road with limited visibility. The court applied the standard of the reasonable driver in road conditions that required extra caution, and assessed the respective contributions of both drivers to the accident.",
    "key_quote": "On rural roads with restricted visibility, drivers must reduce speed and exercise heightened vigilance to a degree commensurate with the hazard; failure to do so will constitute a departure from the standard of the reasonably careful motorist.",
    "full_summary": "In Noonan v Coogan [2009] IEHC 221, the parties were involved in a road traffic collision on a rural road characterised by limited visibility, whether due to bends, hedgerows, undulating terrain, or other features typical of Irish rural roads. The plaintiff brought proceedings claiming that the defendant's driving fell below the standard of reasonable care in the prevailing conditions. The High Court applied the standard of the reasonably careful driver and considered what adjustments in speed and observation were required to meet that standard given the particular characteristics of the road. The court held that on roads where visibility is restricted and the risk of encountering oncoming vehicles in reduced space is elevated, drivers are required to drive at a speed that enables them to stop safely within the range of clear visibility and to maintain appropriate road position. The court examined the evidence of both parties as to their respective speeds, positions, and the warnings available to each before the collision. The assessment of contributory negligence required the court to consider whether the plaintiff was also driving in a manner that fell short of the required standard. The case is a useful example of the courts' application of the reasonable driver standard to road conditions encountered frequently in Ireland and of the contextual nature of negligence analysis in road traffic claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "rural road",
      "visibility"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Brien v Derwin",
    "citation": "[2015] IEHC 78",
    "year": 2015,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a road traffic accident claim arising from a collision during an overtaking manoeuvre. The court examined the duty of care applicable to a driver who decides to overtake and considered the degree of contributory negligence where the other driver may have been driving at excessive speed.",
    "key_quote": "A driver who undertakes an overtaking manoeuvre assumes a heightened duty to ensure that the road ahead is clear and that the manoeuvre can be completed safely; contributory negligence may reduce but not necessarily extinguish a claim where the overtaken driver was also at fault.",
    "full_summary": "In O'Brien v Derwin [2015] IEHC 78, the plaintiff was involved in a road traffic collision that occurred during an overtaking manoeuvre executed by one of the parties on a public road. The plaintiff sustained personal injury and brought proceedings in negligence. The High Court examined the duty of care owed by a driver who decides to overtake another vehicle, noting that such a manoeuvre carries inherent risks and requires the overtaking driver to satisfy themselves that the road ahead is clear for a sufficient distance, that the manoeuvre can be completed safely, and that the speed of traffic on the road permits the manoeuvre without endangering others. The court considered the evidence of both parties as to their respective speeds, positions, and the circumstances in which the collision occurred. In addressing contributory negligence, the court examined whether the other driver's speed or road position contributed to making the overtaking manoeuvre dangerous or contributed to the severity of the collision. The court applied the Civil Liability Act 1961 to apportion damages between the parties in light of their respective degrees of fault. The case provides a useful analysis of the standards applicable to overtaking manoeuvres in Irish road traffic law and the way in which contributory negligence operates where both parties have, to some degree, contributed to an accident.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "overtaking",
      "contributory negligence"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Byrne v Gloucester",
    "citation": "[2003] IEHC 17",
    "year": 2003,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a claim by an employee against an employer for injuries sustained in the workplace. The court examined the employer's obligation to provide a safe system and place of work and confirmed that an employer who is aware of a hazardous practice and fails to address it will be liable for resulting injuries.",
    "key_quote": "An employer who is aware of a hazardous working practice and fails to take steps to remedy or prohibit it will be liable in negligence for injuries caused to an employee as a result of that practice, regardless of whether the employee also bears some responsibility.",
    "full_summary": "In O'Byrne v Gloucester [2003] IEHC 17, the plaintiff employee sustained injury in the workplace and brought proceedings against the employer. The High Court examined the employer's non-delegable common law duty to provide a safe system and place of work for its employees. This duty encompasses the obligation to identify and address foreseeable hazards in the working environment, to provide adequate equipment and training, to implement safe systems of working, and to supervise employees to ensure that safe practices are followed. The court considered whether the employer was aware, or ought to have been aware, of the hazardous practice or condition that gave rise to the plaintiff's injury. On the evidence, the court found that the employer had actual or constructive knowledge of the relevant hazard and had failed to take appropriate remedial steps within a reasonable time. This failure constituted a breach of the employer's duty of care to the plaintiff. The court also addressed the question of contributory negligence, examining whether the employee had contributed to their own injury by failing to take reasonable care for their own safety. The case affirms the well-established principles of employer liability in Irish law and demonstrates the demanding standard of care imposed on employers who are on notice of workplace hazards. It is a useful authority in occupational injury litigation for the proposition that knowledge of a hazard, combined with inaction, will ordinarily ground liability.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "employer",
      "employee",
      "safe place of work"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Downing v O'Flynn",
    "citation": "[2019] IEHC 348",
    "year": 2019,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court assessed liability and quantum of damages in a road traffic accident case where the defendant drove negligently and caused serious injury to the plaintiff. The court awarded general and special damages, addressing the principles applicable to future loss of earnings and ongoing care needs.",
    "key_quote": "In assessing quantum following a serious road traffic accident, the court must award damages for all heads of loss established on the evidence, including future loss of earnings and the cost of ongoing care, calculated to compensate the plaintiff fully without over-compensating.",
    "full_summary": "In Downing v O'Flynn [2019] IEHC 348, the plaintiff sustained serious personal injury in a road traffic accident caused by the defendant's negligent driving. Liability was not in significant dispute, and the primary focus of the proceedings was on the assessment of quantum of damages. The High Court conducted a detailed analysis of the various heads of damage claimed by the plaintiff. General damages were assessed for pain and suffering to date and into the future, having regard to the nature and severity of the injuries and the impact on the plaintiff's quality of life. Special damages were assessed for loss of earnings to the date of trial and for future loss of earnings, taking into account the plaintiff's age, earning capacity, career trajectory, and the extent to which the injuries had impaired the plaintiff's ability to work. The court also considered the cost of ongoing care needs, including medical treatment, therapy, and daily care assistance required by the plaintiff as a consequence of the injuries. Expert actuarial and medical evidence was considered in calculating the appropriate multiplier and multiplicand for future loss. The court applied the principles established in Irish law for the assessment of damages in personal injury cases, emphasising that the award must be fair and proportionate, sufficient to compensate the plaintiff fully for proven loss without producing a windfall. The judgment is a useful reference point for quantum assessment in serious road accident cases.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "dangerous driving",
      "quantum"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Merriman v Greenhills Road Runners Club",
    "citation": "[2012] IEHC 78",
    "year": 2012,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the duty of care owed by the organiser of a road race to a participant who was injured during the event. The court held that sports organisers owe a duty of care to participants to ensure that the event is reasonably safe, including proper management of traffic on public roads used in the race.",
    "key_quote": "The organiser of a road race owes a duty of care to participants to take all reasonable steps to ensure their safety during the event, including appropriate management of vehicular traffic on any public roads used as part of the course.",
    "full_summary": "In Merriman v Greenhills Road Runners Club [2012] IEHC 78, the plaintiff was a participant in a road race organised by the defendant running club. During the event, the plaintiff sustained injury, and the circumstances giving rise to the injury involved conditions on the public road forming part of the race course. The High Court considered whether, and to what extent, the organiser of a road race owes a duty of care to participants. The court held that sports organisers owe a duty to take reasonable care to ensure that events are conducted in a manner that is reasonably safe for those taking part. In the context of a road race conducted on public roads that remain open to traffic, this duty includes the obligation to implement appropriate traffic management measures, to provide adequate marshalling and warning systems, and to liaise with the relevant road authorities to minimise the risks posed by the coexistence of runners and vehicular traffic on the same roadway. The court examined whether the defendant had discharged these obligations in organising the particular race in which the plaintiff was injured and whether any failure in planning or execution contributed to the accident. The case is an important authority for the principle that voluntary sporting organisations that organise events on public roads are not exempt from the ordinary law of negligence and must demonstrate that they have taken reasonable precautions for the safety of participants.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "sporting activity",
      "road race",
      "duty of care",
      "organiser"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Rooney v Dunnes Stores",
    "citation": "[1994] 3 IR 542",
    "year": 1994,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the duty of care owed by a retailer to a shopper who slipped on a wet floor. The court held that the mere presence of a spillage does not immediately make the occupier liable; rather, the occupier must have known or ought to have known of the hazard and had a reasonable opportunity to remedy it.",
    "key_quote": "The occupier of retail premises is not an insurer of customers' safety; liability for a slip on a wet floor requires proof that the occupier knew or ought to have known of the hazard and failed to remedy it within a reasonable time.",
    "full_summary": "In Rooney v Dunnes Stores [1994] 3 IR 542, the plaintiff slipped on a wet floor in a Dunnes Stores retail premises and sustained personal injury. The plaintiff alleged that the occupier was liable for failing to maintain the premises in a safe condition. The Supreme Court examined the nature of the duty owed by a retail occupier to its customers and articulated the important principle that an occupier is not an insurer of the absolute safety of all persons who enter the premises. The mere fact that a floor became wet or that a spillage occurred does not immediately render the occupier liable. Rather, liability depends on proof that the occupier knew or ought to have known of the dangerous condition and had a reasonable opportunity to remedy it before the accident occurred. This knowledge requirement recognises the practical reality that spillages and other floor hazards may arise spontaneously and without any fault on the part of the occupier; liability attaches only where the occupier had an opportunity to discover and address the hazard and failed to do so. The court also examined what constitutes a reasonable inspection and cleaning regime for a retail premises, and what interval of time between inspections would be considered reasonable in the circumstances. Rooney remains a foundational authority in Irish occupiers' liability law and is regularly cited in subsequent retail slip-and-fall cases as the starting point for analysis of the occupier's knowledge and response obligations.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "slip and fall",
      "foreseeable hazard",
      "retail"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Vega v Cullen",
    "citation": "[2005] IEHC 268",
    "year": 2005,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the liability of a property owner and principal contractor for the injury of a worker on a construction site. The court applied the employer's duty of care principles and examined whether a principal contractor can be held liable for the negligence of a sub-contractor's employees on the same site.",
    "key_quote": "A principal contractor on a construction site may owe a duty of care to the employees of sub-contractors working on the site, particularly where the principal contractor retains control over the site and the general manner in which work is carried out.",
    "full_summary": "In Vega v Cullen [2005] IEHC 268, the plaintiff, a worker employed by a sub-contractor, sustained injury on a construction site and brought proceedings against the principal contractor and the property owner. The High Court examined the scope of the duty of care owed by a principal contractor to the employees of sub-contractors working on the same site. The court noted that, while the plaintiff was not directly employed by the principal contractor, the relationship between a principal contractor and a sub-contractor's workers may be sufficiently proximate to give rise to a duty of care where the principal contractor retains overall responsibility for site safety and control over the working environment. The court applied the general principles of employer liability, adapted to the construction site context, and considered the extent to which the defendant had discharged its obligation to provide a safe working environment for all workers on the site, regardless of the precise employment relationship. The court also examined the respective roles of the principal contractor and the property owner in managing the site and the allocation of responsibility between them. Expert evidence was considered in relation to the applicable standards for construction site safety. The case is a useful authority on the liability of principal contractors for the safety of sub-contracted workers in Irish construction law and demonstrates the reach of the duty of care in multi-party construction arrangements.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "construction site",
      "personal injury",
      "independent contractor"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Rice v Muddiman",
    "citation": "[2018] IEHC 233",
    "year": 2018,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a claim arising from a horse-riding accident. The court examined the duty of care owed by a horse owner to a guest rider and considered the defences of volenti non fit injuria and contributory negligence in the context of inherently risky sporting activity.",
    "key_quote": "A horse owner who invites another to ride a horse known to have unpredictable tendencies owes a duty of care to warn the rider of those characteristics; the defence of volenti requires a voluntary and informed agreement to assume the risk in question.",
    "full_summary": "In Rice v Muddiman [2018] IEHC 233, the plaintiff was a guest rider who sustained injury while riding a horse belonging to the defendant and brought a claim in negligence. The High Court examined the duty of care owed by a horse owner to a person permitted to ride the animal. The court considered whether the defendant had disclosed to the plaintiff any known characteristics of the horse that might create a risk for the rider, including temperament, tendencies to shy, bolt, or behave unpredictably. The court also examined whether the plaintiff had received appropriate instruction as to the horse's behaviour and what precautions, if any, the defendant had taken to minimise the risk of injury. In addressing the defence of volenti non fit injuria, the court articulated the requirement that the plaintiff must have voluntarily and with full knowledge assumed not merely the general risks of horse riding but the specific risk that materialised. An awareness that horse riding is inherently risky does not, by itself, constitute consent to all risks. The court also considered contributory negligence, examining the plaintiff's experience as a rider and the reasonableness of their conduct in the circumstances. The case provides a useful analysis of how the courts approach liability in the context of equine activities, balancing the inherently hazardous nature of horse riding with the duties owed by owners to guest riders.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "equine",
      "horse riding",
      "duty of care",
      "volenti"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Boyle v McDonald",
    "citation": "[2010] IEHC 408",
    "year": 2010,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a road traffic accident claim and assessed the respective negligence of the parties. The court applied the Civil Liability Act 1961 to apportion responsibility and considered the extent to which the plaintiff's failure to wear a seatbelt reduced their entitlement to damages.",
    "key_quote": "A plaintiff's failure to wear a seatbelt constitutes contributory negligence which, while it does not defeat the claim, will reduce the award of damages to the extent that the injuries were caused or worsened by the failure to use the available restraint.",
    "full_summary": "In Boyle v McDonald [2010] IEHC 408, the plaintiff was injured in a road traffic accident and brought proceedings against the defendant driver. In the course of the trial, evidence emerged that the plaintiff had not been wearing a seatbelt at the time of the collision. The High Court considered this omission in the context of the contributory negligence defence under the Civil Liability Act 1961. The court affirmed the established principle that a failure to wear an available seatbelt constitutes contributory negligence, since a reasonable person driving or travelling in a motor vehicle would take the basic precaution of wearing the restraint provided. The court examined the medical and engineering evidence to assess the extent to which the failure to wear a seatbelt contributed to the nature and severity of the injuries sustained. Where the injuries would have been the same or substantially similar even with a seatbelt, the reduction in damages may be modest; where the seatbelt would have significantly reduced the injuries, the deduction may be more substantial. Having assessed the degree of contributory negligence attributable to the plaintiff's failure to wear a seatbelt, the court reduced the total damages award by an appropriate percentage in accordance with the 1961 Act. The case is a frequently applied precedent for the seatbelt deduction in Irish personal injury litigation.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "contributory negligence"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Doody v Clarke",
    "citation": "[2014] IEHC 498",
    "year": 2014,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a claim arising from a trip on a public footpath. The court examined the liability of the local authority as responsible for footpath maintenance under the Roads Act 1993 and the threshold of disrepair necessary to constitute an actionable hazard.",
    "key_quote": "Not every imperfection in a footpath gives rise to liability; the defect must reach a threshold of danger such that a reasonable user exercising reasonable care could not be expected to avoid it, and the authority must have had knowledge of the condition.",
    "full_summary": "In Doody v Clarke [2014] IEHC 498, the plaintiff tripped on an uneven or damaged section of a public footpath and sustained injury. Proceedings were brought against the local authority responsible for maintaining the footpath in question. The High Court examined the nature and extent of the duty owed by a local authority to members of the public who use footpaths under its maintenance responsibility. Under the Roads Act 1993, local authorities are charged with the maintenance and repair of public roads and footpaths, and a failure to meet this obligation may give rise to a claim in negligence. The court noted, however, that not every imperfection or minor unevenness in a footpath will constitute an actionable defect. The threshold of liability requires the defect to be of a nature and degree that renders the footpath dangerous to a person exercising ordinary care, and the hazard must not be so obvious that a reasonable pedestrian exercising due attention would avoid it. The court examined the specific defect that caused the plaintiff to trip, including its dimensions, the extent to which it differed from the surrounding surface, and whether it was visible and avoidable. The court also considered whether the local authority had actual or constructive knowledge of the defect and had failed to address it within a reasonable time. The case provides guidance on the practical application of footpath liability principles in Irish law.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "personal injury",
      "trip and fall",
      "public footpath"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "McGee v Alcorn",
    "citation": "[2011] IEHC 307",
    "year": 2011,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the liability of a motorist for injuries caused to a cyclist on a rural road. The court examined the degree of care required of motorists when encountering cyclists on narrow roads and assessed contributory negligence on the part of a cyclist who was cycling without lights at night.",
    "key_quote": "A motorist encountering a cyclist on a narrow rural road must exercise a high degree of care; however, a cyclist who rides without lights at night assumes a degree of responsibility for the risk of not being seen and may be found contributorily negligent.",
    "full_summary": "In McGee v Alcorn [2011] IEHC 307, the plaintiff was a cyclist who sustained injury after being struck by the defendant's motor vehicle on a rural road at night. The plaintiff had been cycling without lights. The High Court examined the duty of care owed by motorists to cyclists sharing rural roads and the standard expected of a driver encountering a cyclist at night on a narrow road with limited visibility. The court held that a motorist on a rural road must exercise a correspondingly high degree of care, particularly in conditions of darkness or poor visibility where other road users may be more difficult to see. The driver's speed, the range of the vehicle's headlights, and the driver's ability to stop within that range were all relevant considerations. At the same time, the court addressed the plaintiff cyclist's own conduct. The failure to use lights at night is a breach of the statutory requirements imposed on cyclists and reduces the visibility of the cyclist to other road users. The court found that this omission constituted contributory negligence on the part of the plaintiff, contributing to the accident by making the cyclist more difficult to detect. The court applied the Civil Liability Act 1961 to apportion damages, attributing a portion of responsibility to the plaintiff. The case is an important authority on the mutual duties of motorists and cyclists in rural road conditions and on the consequences of cycling without lights.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "cyclist",
      "rural road"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Neil v Minister for Finance",
    "citation": "[2010] IEHC 418",
    "year": 2010,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered whether the Minister for Finance owed a duty of care in negligence arising from actions taken in the exercise of statutory functions. The court applied the Glencar framework and held that absent an assumption of responsibility or a sufficiently proximate relationship, a public authority does not ordinarily owe a duty of care in respect of economic loss.",
    "key_quote": "Applying the Glencar framework, a public authority exercising statutory functions does not owe a duty of care in negligence for pure economic loss unless there is a sufficiently close relationship of proximity or a clear assumption of responsibility to the plaintiff.",
    "full_summary": "In Neil v Minister for Finance [2010] IEHC 418, the plaintiff brought a claim in negligence against the Minister for Finance, alleging that actions or decisions taken by the Minister in the exercise of statutory powers caused the plaintiff economic loss. The High Court examined the applicable principles governing the liability of public authorities in negligence, with particular reference to the Irish law framework established in Glencar Exploration plc v Mayo County Council [2002] 1 IR 84. The court noted that the imposition of a duty of care on a public authority in the exercise of its statutory functions requires careful consideration of the proximity of the relationship between the authority and the plaintiff, the foreseeability of loss, and whether it is just and reasonable to impose a duty in all the circumstances. Where the loss alleged is purely economic, the threshold for establishing a duty of care is higher, and the plaintiff must generally demonstrate either a special relationship of proximity or a clear assumption of responsibility by the defendant towards the plaintiff. The court found that the general statutory functions of the Minister for Finance, while of public importance, did not create the necessary proximate relationship with the individual plaintiff to ground a duty of care in respect of economic loss. The absence of any assumption of responsibility by the Minister towards the plaintiff was determinative. The case is a useful authority on the limits of public authority liability in Irish negligence law.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public authority",
      "negligence",
      "economic loss",
      "statutory duty"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Curley v Mannion",
    "citation": "[1965] IR 543",
    "year": 1965,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court held a motorist liable for injuring a cyclist at dusk. The court emphasised that drivers must adjust their speed and attention to prevailing light and visibility conditions, and that a failure to spot a cyclist riding without lights does not necessarily absolve a driver of negligence if the cyclist was otherwise visible.",
    "key_quote": "A motorist must adapt their speed and attentiveness to prevailing conditions of light and visibility; the mere fact that a cyclist is riding without lights does not automatically absolve a driver who ought, in the exercise of reasonable care, to have seen and avoided the cyclist.",
    "full_summary": "In Curley v Mannion [1965] IR 543, the plaintiff cyclist was injured when struck by the defendant's motor vehicle at dusk. The cyclist was not using lights at the time of the accident. The Supreme Court considered whether the motorist had been negligent and whether the absence of lights on the bicycle provided a complete defence. The court held that a motorist driving at dusk or in conditions of reduced visibility must adapt their driving to the prevailing light conditions. This means reducing speed to a level that permits the driver to react safely to hazards that are visible within the range of headlights or in the ambient light available. The court rejected the argument that the absence of lights on the bicycle automatically absolved the motorist of liability. The central question was whether the cyclist was, despite the absence of lights, visible to a driver exercising reasonable care and attention in the conditions. If the cyclist was or ought to have been visible, the motorist was under a duty to take appropriate avoiding action. The court found that the defendant had failed to meet this standard and held him liable. The case remains an authoritative statement of the duty of motorists in conditions of reduced visibility in Irish road traffic law and is frequently cited for the principle that the standard of care required of a driver is contextual and responsive to prevailing conditions.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "cyclist",
      "visibility",
      "dusk"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Cooper v Egan",
    "citation": "[1974] ILRM 203",
    "year": 1974,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court applied res ipsa loquitur to a road accident where a car skidded and crossed into the path of an oncoming vehicle without explanation. The court held that the fact of skidding raised a presumption of negligence which the defendant had not displaced, and upheld the finding of liability.",
    "key_quote": "Where a vehicle crosses to the wrong side of the road and collides with an oncoming vehicle without adequate explanation, res ipsa loquitur applies and raises a presumption of negligence which the defendant must displace by providing a satisfactory explanation consistent with the absence of fault.",
    "full_summary": "In Cooper v Egan [1974] ILRM 203, the defendant's vehicle skidded across the road and collided with the plaintiff's oncoming vehicle. The defendant offered no satisfactory explanation for the skid that was consistent with the exercise of reasonable care. The Supreme Court applied the doctrine of res ipsa loquitur, which permits an inference of negligence to be drawn from the facts of the incident itself where the occurrence is of a kind that does not ordinarily happen in the absence of negligence, the instrumentality causing the damage was under the control of the defendant, and the plaintiff has no knowledge of the specific cause of the incident. The court held that a vehicle crossing to the wrong side of the road and colliding with an oncoming vehicle satisfies these conditions; such events do not typically occur when a driver is exercising reasonable care. The effect of the doctrine is to raise a rebuttable presumption of negligence. The defendant was required to provide an explanation for the skid that was consistent with the exercise of due care or to otherwise displace the inference of negligence. The court found that the defendant had not discharged this burden and upheld the finding of liability. Cooper v Egan is a leading Irish authority on the application of res ipsa loquitur in road traffic cases and on the evidentiary consequences of unexplained skids and loss of vehicle control.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "res ipsa loquitur",
      "skid"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "McCoy v Keating",
    "citation": "[2011] IEHC 499",
    "year": 2011,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the liability of a motorist who struck a pedestrian who stepped suddenly onto a road at night. The court balanced the duty of reasonable care owed by motorists with the contributory negligence of the pedestrian, emphasising that drivers must always be in a position to stop within the range of their vision.",
    "key_quote": "A motorist must at all times drive at a speed that permits stopping within the range of clear vision; the sudden emergence of a pedestrian onto the road at night may give rise to contributory negligence on the part of the pedestrian but does not necessarily eliminate the driver's liability.",
    "full_summary": "In McCoy v Keating [2011] IEHC 499, the plaintiff pedestrian was struck by the defendant's motor vehicle after stepping or emerging onto the road at night. The defendant argued that the plaintiff's sudden appearance on the road and failure to take care constituted a complete answer to the claim or, at minimum, significant contributory negligence. The High Court examined the duty of care owed by motorists to pedestrians, affirming the well-established principle that a driver must at all times travel at a speed that enables the vehicle to be stopped safely within the distance visible ahead. This principle applies regardless of whether a pedestrian has emerged suddenly, since a driver who cannot stop within the range of vision is, by definition, driving at an unsafe speed for the conditions. The court considered the conditions at the time of the accident, including the level of ambient lighting, the presence of other traffic, and the nature of the road and footpath infrastructure in the vicinity. The court found that while the pedestrian's sudden emergence onto the road was careless and constituted contributory negligence, the motorist's failure to maintain a speed and level of attentiveness that would have permitted the vehicle to be stopped safely also amounted to a breach of duty. Damages were apportioned between the parties under the Civil Liability Act 1961 in light of the respective degrees of fault. The case is a useful authority on the interaction between pedestrian negligence and motor vehicle driver obligations.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "pedestrian",
      "duty of care"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "McFarlane v Tayside Health Board",
    "citation": "[2000] 2 AC 59",
    "year": 2000,
    "court": "House of Lords",
    "jurisdiction": "UK",
    "legal_principle": "The House of Lords held that a surgeon whose negligent performance of a vasectomy resulted in an unwanted pregnancy could not be held liable for the economic costs of raising a healthy child. While damages were available for the pregnancy and birth itself, the costs of raising a healthy child were irrecoverable as a matter of legal policy. The law must treat a healthy child as a blessing and not a detriment. Lord Slynn, Lord Hope, Lord Millett, and Lord Steyn each gave substantive speeches expressing different policy rationales for this conclusion.",
    "key_quote": "The law must treat the birth of a healthy baby as a blessing and not a detriment, and in those circumstances the costs of rearing the child are not recoverable.",
    "full_summary": "McFarlane v Tayside Health Board arose from a failed vasectomy performed by the defendant health board's surgeon. The claimant and his wife subsequently conceived a healthy child and brought a claim for the cost of raising that child. The House of Lords unanimously rejected the claim for child-rearing costs, though it allowed recovery for the unwanted pregnancy and birth. The decision rested on legal policy rather than any absence of a duty of care or causation. Each of the five Law Lords gave different reasons, ranging from the Caparo three-stage test to the concept of distributive justice and the view of the ordinary person in the street. Lord Millett argued that it was morally unacceptable to treat the birth of a healthy child as pure loss, while Lord Steyn invoked the notional traveller on the Underground as representing community values. The case marked a clear departure from the tort law principle that all foreseeable loss should be compensated and instead imposed a policy limit on damages. McFarlane remains the authoritative House of Lords decision on wrongful conception claims, and the principle that the costs of raising a healthy child are irrecoverable has been consistently applied in subsequent cases including Rees v Darlington Memorial Hospital NHS Trust. The decision is highly significant in demonstrating that policy considerations can override the normal rules of compensation in negligence, particularly where the harm alleged is the birth of a healthy human being.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "wrongful birth",
      "wrongful conception",
      "pure economic loss",
      "duty of care",
      "novus actus"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Reynolds v Times Newspapers Ltd",
    "citation": "[2001] 2 AC 127",
    "year": 2001,
    "court": "House of Lords",
    "jurisdiction": "UK",
    "legal_principle": "The House of Lords established a new form of qualified privilege for responsible journalism on matters of public concern, known as the Reynolds privilege. The privilege was not confined to any predetermined category but depended on whether the publication of defamatory material was responsible and in the public interest, having regard to a non-exhaustive list of factors including the nature of the information, the steps taken to verify it, and whether the subject was given an opportunity to comment. This privilege was later replaced by the statutory public interest defence under section 4 of the Defamation Act 2013.",
    "key_quote": "The court should have regard to the nature, source and status of the information, the steps taken to verify it, the urgency of the matter, whether comment was sought from the plaintiff, and whether the article contained the gist of the plaintiff's side of the story.",
    "full_summary": "Reynolds v Times Newspapers arose from an article published in the Sunday Times concerning Albert Reynolds, the former Taoiseach of Ireland, alleging that he had misled the Dail and his cabinet colleagues. Reynolds sued for defamation, and the newspaper sought to rely on qualified privilege. The House of Lords rejected the newspaper's claim on the specific facts but significantly expanded the scope of qualified privilege in English law. Lord Nicholls, delivering the leading speech, identified a non-exhaustive ten-factor test to determine whether publication of a defamatory article was privileged as responsible journalism. The factors included the seriousness of the allegation, the nature of the information and whether it was a matter of public concern, the source of the information, the steps taken to verify it, the status of the information, the urgency of the matter, whether comment was sought from the claimant, whether the article contained the gist of the claimant's response, the tone of the article, and the circumstances of publication. The Reynolds privilege represented a significant development of the common law, recognising the importance of a free press in a democratic society while balancing the protection of individual reputation. It was applied in subsequent cases including Jameel v Wall Street Journal. The privilege was ultimately codified and modified by section 4 of the Defamation Act 2013, which introduced a statutory public interest defence replacing the common law Reynolds privilege.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "Reynolds privilege",
      "qualified privilege",
      "responsible journalism",
      "public interest"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Sim v Stretch",
    "citation": "[1936] 2 All ER 1237",
    "year": 1936,
    "court": "House of Lords",
    "jurisdiction": "UK",
    "legal_principle": "The House of Lords held that the test for whether words are defamatory is whether they would tend to lower the plaintiff in the estimation of right-thinking members of society generally. Lord Atkin formulated the classic objective test for defamation, emphasising that the hypothetical reasonable person is the standard by which the defamatory character of words is assessed. A telegram requesting the return of a servant's belongings and indicating a debt owed was held on its facts not to be defamatory.",
    "key_quote": "Would the words tend to lower the plaintiff in the estimation of right-thinking members of society generally? That is the test.",
    "full_summary": "Sim v Stretch concerned an action for libel arising from a telegram sent by the defendant Stretch to the plaintiff Sim. The telegram requested the return of a housemaid's belongings and stated that the maid had gone to live with Stretch's household, adding that Sim had borrowed money from her. Sim alleged that the telegram was defamatory in suggesting that he was in financial difficulties. Lord Atkin delivered the leading speech and formulated the classic test for determining whether words are defamatory: whether they would tend to lower the plaintiff in the estimation of right-thinking members of society generally. He rejected various earlier formulations as insufficiently precise. Applying this test, the House unanimously held that the words of the telegram were not defamatory. The significance of Sim v Stretch lies principally in Lord Atkin's articulation of the standard of the right-thinking member of society, which has become the foundation of English and Irish defamation law. This test is objective and focuses on the hypothetical reaction of reasonable, ordinary members of society rather than the idiosyncratic views of any particular group. The case demonstrates that words will not be held defamatory merely because some persons might think less of the plaintiff as a result of them; the reaction of the reasonable person is the touchstone. The decision remains a foundational authority in the law of defamation and is routinely cited in subsequent cases addressing the definition of defamatory meaning.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "definition",
      "lowering in estimation",
      "right-thinking members of society"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Monroe v Hopkins",
    "citation": "[2017] EWHC 433 (QB)",
    "year": 2017,
    "court": "England and Wales High Court (Queen's Bench Division)",
    "jurisdiction": "UK",
    "legal_principle": "The High Court held that tweets by the defendant journalist misidentifying the food blogger and activist Jack Monroe as having defaced a war memorial were defamatory. The court confirmed that the serious harm threshold under section 1 of the Defamation Act 2013 is met where the words would tend to lower the claimant in the estimation of right-thinking members of society and where there is evidence of actual or likely serious harm. The case is significant for its treatment of defamation through social media misidentification and the application of the serious harm test.",
    "key_quote": "A tweet, although it may be of short duration, and somewhat ephemeral in nature, is capable of giving rise to a cause of action for libel, and the serious harm requirement of the 2013 Act must be applied to such communications.",
    "full_summary": "Monroe v Hopkins arose from tweets posted by the defendant journalist Katie Hopkins in which she appeared to accuse the food writer and political campaigner Jack Monroe of having defaced or supported the defacement of a war memorial during an anti-austerity demonstration. Monroe had not done so and brought proceedings in defamation. Warby J in the High Court applied the serious harm threshold introduced by section 1 of the Defamation Act 2013, which requires a claimant to show that the publication has caused or is likely to cause serious harm to reputation. The court considered the meaning of the tweets, the identity and reach of the defendant's Twitter following, and the nature of the allegations made. Warby J held that the tweets did convey a defamatory meaning and that serious harm had been established having regard to the scale of the defendant's platform and the gravity of the allegations. The case is instructive on several levels: it confirms that social media posts, including tweets, are subject to the same defamation principles as traditional publications; it illustrates the application of the serious harm test in practice; and it addresses the particular risks of misidentification in the rapid-fire environment of social media. Damages of 24,000 pounds were awarded. Monroe v Hopkins is frequently cited in discussions of online defamation and the operation of the Defamation Act 2013.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "Twitter",
      "social media",
      "misidentification",
      "serious harm"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Crofter Hand Woven Harris Tweed Co Ltd v Veitch",
    "citation": "[1942] AC 435",
    "year": 1942,
    "court": "House of Lords",
    "jurisdiction": "UK",
    "legal_principle": "The House of Lords held that a conspiracy to injure is actionable only where the predominant purpose of the defendants is to injure the plaintiff, rather than to advance their own legitimate interests. Where persons combine to further their own economic interests, even if this causes incidental harm to the plaintiff, no actionable conspiracy arises. The case is the leading authority distinguishing unlawful means conspiracy from simple conspiracy to injure by predominant purpose.",
    "key_quote": "If the real purpose of the combination is to forward the defendants' own legitimate interests and the damage to the plaintiff is only incidental, the combination is not actionable even though the defendants foresaw that the plaintiff would be damnified.",
    "full_summary": "Crofter Hand Woven Harris Tweed Co Ltd v Veitch concerned a trade dispute in the Scottish island of Lewis. The defendants, officials of a trade union, instructed dockers to embargo yarn and cloth belonging to the plaintiffs, small producers of Harris Tweed who employed non-union labour and paid lower wages. The plaintiffs argued that this amounted to an actionable conspiracy to injure their business. The House of Lords unanimously held that no actionable conspiracy existed. Viscount Simon LC delivered the leading speech and established that the tort of simple conspiracy requires proof that the predominant purpose of the defendants' combination was to injure the plaintiff. Where the defendants are primarily motivated by the advancement of their own legitimate interests, such as improving wages and conditions for union members, the fact that harm to the plaintiff results does not make the combination tortious. This is to be contrasted with the tort of unlawful means conspiracy, where the unlawfulness of the means used can make even a combination motivated by self-interest actionable. The decision is of enduring importance as the authoritative statement of the distinction between these two forms of conspiracy in economic tort law. The case also established that legitimate trade union action aimed at protecting members' interests will typically fall outside simple conspiracy, a principle of continuing relevance in labour law. Crofter is routinely cited alongside cases such as Quinn v Leathem and OBG Ltd v Allan in discussions of the economic torts.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "economic torts",
      "conspiracy to injure",
      "combination",
      "trade union",
      "predominant purpose"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Lonrho Ltd v Shell Petroleum Co Ltd",
    "citation": "[1982] AC 173",
    "year": 1982,
    "court": "House of Lords",
    "jurisdiction": "UK",
    "legal_principle": "The House of Lords held that a breach of statutory duty does not automatically give rise to a private law action in tort unless the statute was intended to benefit a particular class of persons or the breach conferred a right to sue on such persons. Where a statute is designed to protect the public generally, breach does not give rise to a private cause of action in tort. The case also addressed the outer limits of the unlawful means limb of economic tort liability.",
    "key_quote": "To establish a private law right of action for breach of statutory duty it must appear that the particular statute was intended to confer on members of a specific class a right to sue for breach, or that the breach conferred a benefit on a class of which the plaintiff is a member.",
    "full_summary": "Lonrho Ltd v Shell Petroleum Co Ltd arose out of the Rhodesian UDI crisis. Lonrho alleged that Shell and BP had breached sanctions orders made under the Southern Rhodesia Act 1965 by continuing to supply oil to Rhodesia and that this breach had prolonged the sanctions regime, causing Lonrho economic loss by delaying the reopening of the Beira pipeline in which it had an interest. The House of Lords was required to consider whether breach of the sanctions orders gave Lonrho a private law right of action in tort. Lord Diplock delivered the principal speech and held that breach of a statutory duty does not of itself give rise to an action in private law. Two exceptions exist: where the statute was enacted for the benefit of a particular class of persons, one of whom has suffered loss; or where the statute creates a public right and the plaintiff has suffered particular damage beyond that suffered by the rest of the public. Neither exception applied on the facts. The court also considered whether the breach of the sanctions orders could constitute unlawful means for the purposes of the economic torts and concluded that, even if it could, Lonrho could not establish that the defendants' predominant purpose was to injure Lonrho rather than to advance their own commercial interests. Lonrho v Shell is a leading authority on the tort of breach of statutory duty and on the relationship between statutory breaches and the economic torts.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "economic torts",
      "breach of statutory duty",
      "unlawful means",
      "conspiracy",
      "sanctions"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Revenue and Customs Commissioners v Total Network SL",
    "citation": "[2008] 1 AC 1174",
    "year": 2008,
    "court": "House of Lords",
    "jurisdiction": "UK",
    "legal_principle": "The House of Lords held that the unlawful means required for the tort of unlawful means conspiracy can include criminal acts, not merely civil wrongs actionable at the suit of the claimant. The court confirmed that not all conspirators need to have used the unlawful means themselves; it is sufficient that unlawful means were used as part of the concerted combination. The case arose from a VAT carousel fraud and is important in clarifying the scope and requirements of the unlawful means conspiracy tort.",
    "key_quote": "For the purposes of the tort of unlawful means conspiracy, the unlawful means need not be actionable at the suit of the claimant; it is sufficient that they are criminal acts used as the instrumentality by which the conspiracy achieves its purpose.",
    "full_summary": "Revenue and Customs Commissioners v Total Network SL concerned a large-scale VAT carousel fraud, also known as missing trader intra-community fraud, in which goods were traded in a circular pattern across EU member states to generate fraudulent VAT repayment claims. HMRC brought an action in the tort of unlawful means conspiracy against participants in the fraud who were outside the jurisdiction. The central issue was whether the criminal acts involved in the fraud could constitute unlawful means for the purposes of this tort, even though HMRC itself could not have sued the fraudsters for those acts in a civil action. The House of Lords held, overruling the Court of Appeal, that the unlawful means conspiracy tort does not require that the unlawful means be independently actionable at the suit of the claimant. It is sufficient that the means are unlawful, including where they are criminal. This represented an important extension of the tort, the scope of which had been uncertain following OBG Ltd v Allan. Their Lordships reasoned that to restrict unlawful means to civil wrongs would unduly narrow the tort and defeat legitimate claims against those engaged in deliberate criminal conspiracies causing financial loss. The case is of particular importance in fraud and commercial litigation and has been applied in subsequent cases addressing the boundaries of the economic torts.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "economic torts",
      "unlawful means conspiracy",
      "criminal acts",
      "VAT carousel fraud"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Re F (Mental Patient: Sterilisation)",
    "citation": "[1990] 2 AC 1",
    "year": 1990,
    "court": "House of Lords",
    "jurisdiction": "UK",
    "legal_principle": "The House of Lords held that medical treatment of a mentally incapacitated adult without consent does not constitute battery if the treatment is in the patient's best interests and is carried out in accordance with a responsible body of medical opinion. The common law doctrine of necessity can justify non-consensual treatment where the patient lacks capacity and the intervention is necessary to prevent serious harm or preserve the patient's welfare. This decision preceded and heavily influenced the Mental Capacity Act 2005.",
    "key_quote": "A doctor who acts in accordance with a responsible and competent body of relevant professional opinion, and in the best interests of an adult patient lacking capacity to consent, acts lawfully and does not commit a battery.",
    "full_summary": "Re F (Mental Patient: Sterilisation) concerned a 36-year-old woman with severe mental disability who was a voluntary patient in a mental hospital. She had formed a sexual relationship with a male patient, and medical staff and her mother applied to the court for a declaration that it would be lawful to sterilise her, as she was incapable of consenting to the operation and it was feared that a pregnancy would be disastrous for her. The House of Lords granted the declaration and considered the fundamental legal principles governing medical treatment of incapacitated adults. Lord Goff gave the principal speech and held that, at common law, a doctor can lawfully treat an adult who lacks capacity to consent provided that the treatment is in that person's best interests. Necessity provides the juridical basis for such treatment. The House held that a doctor acting in accordance with a responsible body of medical opinion (the Bolam standard) and in the patient's best interests commits neither a battery nor an unlawful act. The House also held that sterilisation of an incapacitated adult is such a momentous and irreversible step that it requires prior court authorisation to ensure proper scrutiny of the patient's best interests. Re F is a foundational authority on consent and capacity in medical law, bridging the law of trespass to the person and medical negligence, and its best interests framework was subsequently codified in the Mental Capacity Act 2005.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "trespass to the person",
      "consent",
      "medical treatment",
      "mental incapacity",
      "best interests"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Brown v Robinson",
    "citation": "[2004] UKPC 56",
    "year": 2004,
    "court": "Privy Council",
    "jurisdiction": "UK",
    "legal_principle": "The Privy Council considered whether the state could be vicariously liable for an assault committed by an off-duty police officer using her service weapon. The Board held that the close connection test must consider whether the actions were so closely connected to the officer's duties that it is just and reasonable to impose vicarious liability on the employer. The mere possession of a state-issued service weapon may be sufficient to establish that close connection.",
    "key_quote": "Where a police officer uses a service firearm in circumstances closely connected with her police duties, the state may be vicariously liable even if the officer was technically off duty at the time.",
    "full_summary": "Brown v Robinson was an appeal to the Privy Council from Jamaica concerning vicarious liability of the state for the wrongful acts of a police officer. The defendant officer, while off duty, used her state-issued service revolver to assault and injure the claimant. The issue was whether the state was vicariously liable for this act. The Privy Council applied the close connection test, derived from Lister v Hesley Hall Ltd, asking whether there was a sufficiently close connection between the officer's employment and the wrongful act to make it just and reasonable to impose liability on the employer. The Board considered that the officer's possession of her service weapon was intimately tied to her status and duties as a police constable, as she was required to carry it and it was issued to her for use in the performance of those duties. This connection between the tool of the wrongdoing and the employment relationship was a significant factor pointing toward vicarious liability. Brown v Robinson is frequently cited alongside Bernard v Attorney General of Jamaica and Attorney General of BVI v Hartwell as part of a trio of Privy Council decisions that examined state vicarious liability for the actions of armed police officers in the Caribbean Commonwealth, collectively developing and applying the close connection test in this specific context.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "police officer",
      "assault",
      "off-duty",
      "close connection test"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Bernard v Attorney General of Jamaica",
    "citation": "[2004] UKPC 47",
    "year": 2004,
    "court": "Privy Council",
    "jurisdiction": "UK",
    "legal_principle": "The Privy Council held that the Jamaican government was vicariously liable for the killing of a bystander by a police officer who used his service firearm in an off-duty altercation. The close connection between the officer's possession of a state-issued weapon tied to his duties as a constable and the unlawful shooting was sufficient to engage vicarious liability. The state's entrusting of lethal weapons to constables created a sufficient link between the employment and the tort.",
    "key_quote": "The state, by arming its constables with lethal weapons for use in their duties, assumes responsibility for the manner in which those weapons are used, even where the constable is not acting in the course of duty in the conventional sense.",
    "full_summary": "Bernard v Attorney General of Jamaica arose from an incident in which an off-duty Jamaican police officer became involved in a dispute at a public telephone and drew his service revolver, shooting and killing an innocent bystander. The claimants, the deceased's dependants, brought proceedings against the Attorney General claiming that the state was vicariously liable for the officer's act. The Privy Council allowed the appeal and held that the state was vicariously liable. Lord Steyn, delivering the judgment of the Board, applied the close connection test from Lister v Hesley Hall. The key question was whether the wrongful act was so closely connected with acts that the officer was authorised to do that it could fairly and properly be regarded as done by him in the course of his employment. The Board held that the officer's possession of the service revolver was integral to his role as a constable; he was required by law to carry it and it was issued specifically for use in police duties. There was a sufficiently close connection between his employment and his use of that weapon, even in a personal dispute, to impose vicarious liability on the state. The decision is an important application of the close connection test in the context of armed state employees and sits alongside Brown v Robinson and Hartwell as part of the same body of Privy Council authority on police officer liability.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "police officer",
      "firearms",
      "state liability",
      "close connection"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Attorney General of the British Virgin Islands v Hartwell",
    "citation": "[2004] UKPC 12",
    "year": 2004,
    "court": "Privy Council",
    "jurisdiction": "UK",
    "legal_principle": "The Privy Council held the BVI government directly liable in negligence for injuries caused when a police officer used his official firearm to shoot members of the public during a fit of jealous rage. The government was negligent in arming a constable who was known or ought to have been known to be emotionally unstable, and the risk of misuse of the weapon was foreseeable. The state was also vicariously liable for the officer's use of the weapon entrusted to him in the course of his duties.",
    "key_quote": "A public authority that entrusts a dangerous weapon to a person known to be unfit to carry it is itself negligent, and the foreseeable misuse of that weapon grounds both direct and vicarious liability.",
    "full_summary": "Attorney General of the British Virgin Islands v Hartwell concerned a BVI police constable who, during a period of emotional instability arising from problems in a personal relationship, used his service revolver to shoot and injure the claimant and others at a bar where his girlfriend was socialising. The constable had previously shown signs of emotional instability and had gone absent without leave. The Privy Council held that the BVI government was negligent in its direct capacity for having armed and continued to deploy an officer who was known or ought to have been known to pose a foreseeable risk of misuse of his firearm. Lord Nicholls, delivering the judgment of the Board, held that a police authority that gives a dangerous weapon to a constable takes on responsibility for ensuring that the constable is fit to carry it, and failure to do so when warning signs are present is itself negligent. The Board further held that the close connection test for vicarious liability was satisfied: the officer's possession of the firearm was a direct consequence of his employment, and the use of that weapon, however wrongful, was sufficiently connected to that employment to impose vicarious liability. Hartwell is part of the trilogy of 2004 Privy Council decisions on state liability for off-duty police shootings and is the most significant for its recognition of a direct negligence claim against the employing authority for negligent arming.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "negligent hiring",
      "police officer",
      "firearms",
      "foreseeable risk"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "McNamara v Electricity Supply Board",
    "citation": "[1975] IR 1",
    "year": 1975,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court held that the ESB owed a duty of care to a child trespasser who was electrocuted while climbing an electricity pylon on the defendant's land. The court applied the allurement doctrine, holding that where a dangerous structure on land is likely to attract child trespassers, the occupier owes a duty to take reasonable precautions against the foreseeable risk of injury. McNamara confirmed and extended the principles from O'Hanlon v ESB to electricity transmission infrastructure.",
    "key_quote": "Where a structure on land constitutes an allurement to children and is inherently dangerous, the occupier owes a duty of care to child trespassers to guard against the foreseeable risk of injury, notwithstanding that the children are trespassers.",
    "full_summary": "McNamara v Electricity Supply Board concerned a young boy who trespassed onto ESB land and climbed an electricity pylon, suffering serious injury from electrocution. The defendant ESB argued that as a trespasser the plaintiff was owed no duty of care under the traditional common law rule that occupiers owe only a duty not to deliberately or recklessly harm trespassers. The Supreme Court rejected this approach and held that the ESB owed a duty of care to the child trespasser. The court applied the allurement doctrine, which recognises that children are foreseeably likely to be attracted to dangerous structures or objects, particularly on unfenced or accessible land. Where such allurement is foreseeable, the occupier cannot rely on the child's status as a trespasser to escape liability. The court held that electricity pylons, which are visually prominent, climbable structures carrying lethal voltages, clearly constituted allurements to children and that the ESB ought to have taken precautions, such as adequate fencing or warning notices, to prevent access. The decision is the most significant Irish authority on the duty owed to child trespassers prior to the enactment of the Occupiers Liability Act 1995, which subsequently placed the law on a statutory footing. McNamara v ESB is frequently cited in examinations and academic discussion of Irish occupiers liability law.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "child trespasser",
      "electricity",
      "allurement",
      "duty of care"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Fitzsimons v Bord Telecom Eireann",
    "citation": "[1991] ILRM 276",
    "year": 1991,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered whether a contractor who negligently severed telecommunications cables could be liable to Bord Telecom for its resulting economic losses. Following the Spartan Steel approach, the court held that pure economic loss consequent on property damage to a third party's chattel is not generally recoverable in negligence. Fitzsimons v Bord Telecom is the leading Irish authority applying the limits on recovery of pure economic loss in the context of negligent damage to utility infrastructure.",
    "key_quote": "Pure economic loss suffered as a consequence of physical damage to a third party's property does not, without more, give rise to a recoverable claim in negligence; the relationship between the claimant and defendant must satisfy the requirements of proximity and reasonable foreseeability.",
    "full_summary": "Fitzsimons v Bord Telecom Eireann arose from the negligent severance of underground telecommunications cables by a contractor during excavation works. Bord Telecom, whose cables were damaged, sought to recover not only for the physical damage to the cables but also for the economic losses flowing from the consequent disruption to telecommunications services. The Supreme Court addressed the difficult question of whether pure economic loss flowing from physical damage to the plaintiff's own property, or flowing from interference with a service it provided, was recoverable in negligence. The court engaged with the leading English and Irish authorities on pure economic loss, including Spartan Steel and Alloys Ltd v Martin & Co and the earlier Irish decisions. The court held that while damages for the physical damage to the cables themselves were recoverable, further economic losses flowing from the consequent disruption to services were pure economic loss of the kind that the law of negligence does not generally protect. The decision reflects the Irish courts' cautious approach to the expansion of negligence liability for pure economic loss and the influence of English authority, particularly the Spartan Steel principle, in this area. Fitzsimons remains the principal Irish authority on the recovery of pure economic loss arising from damage to utility infrastructure and is regularly cited in discussions of the boundaries of negligence liability in Irish law.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "economic loss",
      "negligence",
      "damage to utilities",
      "proximity",
      "Spartan Steel principle"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Whooley v Dublin Corporation",
    "citation": "[1961] IR 60",
    "year": 1961,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court held Dublin Corporation liable for injuries sustained by a pedestrian who fell due to a defective public footpath. The court confirmed that a public authority exercising statutory functions in relation to public roads and footpaths owes a duty of care in negligence to users and that failure to maintain a footpath in a reasonably safe condition can ground tortious liability. The decision is significant in the development of Irish local authority liability for highway maintenance.",
    "key_quote": "A public authority charged with the maintenance of public roads and footpaths owes a duty to users to keep those surfaces in a reasonably safe condition, and breach of that duty may give rise to tortious liability.",
    "full_summary": "Whooley v Dublin Corporation concerned an action for damages arising from injuries sustained by the plaintiff, who fell on a defective footpath in Dublin. The plaintiff alleged that Dublin Corporation, which was responsible for the maintenance of public footpaths in the city, had been negligent in failing to repair a defect in the surface that had caused the fall. The Supreme Court held in favour of the plaintiff and found Dublin Corporation liable. The court confirmed that a public authority exercising statutory powers and duties in relation to public highways and footpaths is subject to the ordinary principles of the law of negligence and owes a duty of care to members of the public using those surfaces. The defendant corporation had a duty to inspect and maintain footpaths under its care and to take reasonable steps to repair defects that were or ought to have been known to it. Failure to do so constituted a breach of duty for which the corporation was liable in damages. The decision is an important early authority in Irish law on the liability of public authorities for the condition of public infrastructure, and it confirmed that statutory powers or duties do not immunise a public authority from the general principles of negligence. Whooley v Dublin Corporation is cited in the development of local authority liability and the principles governing the duties owed by public authorities to members of the public.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "highways",
      "public authority",
      "maintenance",
      "negligence",
      "road defect"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Power v Bedford Motors",
    "citation": "[2014] IEHC 16",
    "year": 2014,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court held a motor trade employer liable for injuries sustained by an employee while carrying out work on the employer's premises. The court applied the non-delegable duty to provide a safe place of work and affirmed that an employer cannot discharge this duty simply by delegating safety responsibilities to another employee without putting in place adequate safety systems and supervision. The employer's personal, non-delegable duty to maintain a safe system of work was central to the finding of liability.",
    "key_quote": "An employer cannot discharge his non-delegable duty to provide a safe place and system of work merely by delegating responsibility to another employee; the employer must ensure that adequate safety systems are in place and properly supervised.",
    "full_summary": "Power v Bedford Motors concerned a personal injuries action brought by an employee of a motor trade company who suffered injury while at work on the employer's premises. The plaintiff alleged that the defendant employer had failed to provide a safe place of work, a safe system of work, and adequate supervision, thereby breaching the well-established employer's duties in negligence. The High Court found in favour of the plaintiff and held the employer liable. The court affirmed the longstanding principle that an employer owes a personal, non-delegable duty to each employee to take reasonable care for the employee's safety. This duty encompasses the provision of a safe place of work, safe equipment, a safe system of work, and competent fellow employees. The court made clear that an employer cannot discharge this duty by simply assigning responsibility for safety to another employee or to a system that has not been properly designed, implemented, and monitored. The defendant had failed to ensure that the workplace was safe and that appropriate safety procedures were enforced, and this failure directly caused the plaintiff's injury. Power v Bedford Motors illustrates the continuing rigour with which Irish courts apply employer's liability principles and the practical requirement that safety systems be not merely adopted in principle but actively maintained and supervised. The decision is a useful modern Irish authority on employer's liability in the context of the motor trade.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "employers liability",
      "safe place of work",
      "employer negligence",
      "motor trade"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Dwyer v Chief Constable of the Royal Ulster Constabulary",
    "citation": "[1997] NI 403",
    "year": 1997,
    "court": "High Court of Northern Ireland",
    "jurisdiction": "UK",
    "legal_principle": "The Northern Ireland High Court considered the duty of care owed by police officers in their operational activities. The court applied the principles from Hill v Chief Constable of West Yorkshire and held that, as a matter of public policy, police investigating crime do not owe a duty of care to individual members of the public who are harmed, absent special circumstances giving rise to an assumption of responsibility. Operational immunity protects the police from negligence claims arising from the conduct of investigations.",
    "key_quote": "Absent a special relationship giving rise to an assumption of responsibility, the police do not owe a duty of care in negligence to members of the public who suffer harm as a result of the manner in which a criminal investigation is conducted.",
    "full_summary": "O'Dwyer v Chief Constable of the Royal Ulster Constabulary concerned a negligence action arising from alleged failures by the RUC in the conduct of a criminal investigation in Northern Ireland. The plaintiff contended that the police had been negligent in their investigative activities and that this negligence had caused harm to the plaintiff. The High Court applied the principles established by the House of Lords in Hill v Chief Constable of West Yorkshire, in which it was held that the police do not generally owe a duty of care to members of the public in the conduct of criminal investigations. The basis for this immunity is public policy: imposing a duty of care might induce defensive and overly cautious policing, divert resources from investigation to litigation, and create conflict between the interests of the public at large and individual claimants. The court held that no special circumstances existed in the present case that might give rise to an assumption of responsibility sufficient to create a duty of care. The decision reflects the approach in Northern Ireland to police liability and the application of the Hill principle, which has also been considered by the European Court of Human Rights in Osman v United Kingdom and subsequent decisions. O'Dwyer v Chief Constable is a useful illustration of the Hill immunity in the Northern Irish context.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "police",
      "duty of care",
      "public authority",
      "omission"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "RE v Calderdale and Huddersfield NHS Foundation Trust",
    "citation": "[2017] EWHC 824 (QB)",
    "year": 2017,
    "court": "England and Wales High Court (Queen's Bench Division)",
    "jurisdiction": "UK",
    "legal_principle": "The High Court considered a clinical negligence claim arising from failures in obstetric care during labour, resulting in hypoxic-ischaemic brain injury to the claimant at birth. The court applied the Bolam and Bolitho tests to assess the standard of care and addressed issues of causation in birth injury cases, clarifying the factual matrix required to establish that a failure to act in accordance with accepted practice caused or materially contributed to the claimant's injury.",
    "key_quote": "In clinical negligence cases involving birth injury, the court must apply the Bolam and Bolitho tests to the standard of care and address causation rigorously, asking whether the breach materially contributed to the injury or whether the injury would have occurred in any event.",
    "full_summary": "RE v Calderdale and Huddersfield NHS Foundation Trust was a clinical negligence claim brought on behalf of the claimant, who suffered hypoxic-ischaemic encephalopathy and resultant brain damage at birth. The claim alleged that the defendant NHS Trust's obstetric and midwifery staff had failed to respond appropriately to warning signs during labour and had delayed emergency delivery. The High Court was required to apply the two-stage test from Bolam v Friern Hospital Management Committee and Bolitho v City and Hackney Health Authority to determine both whether there was a breach of the standard of care and whether, if so, that breach caused the claimant's injury. The court heard extensive expert evidence on the management of labour and foetal heart monitoring and on the pathophysiology of hypoxic-ischaemic injury. The judgment sets out a careful analysis of the causation principles applicable in birth injury cases, including the distinction between causes that materially contribute to damage and those that are merely background conditions. The case is instructive on the practical application of the Bolam and Bolitho standards and on the evidential demands of establishing causation in complex obstetric negligence cases. It also addresses the difficult factual question of the precise timing of hypoxic injury relative to the alleged breach, which is frequently determinative in such claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "medical negligence",
      "obstetrics",
      "brain damage",
      "consent",
      "standard of care"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Gorman v Ritz Cinema (Clonmel) Ltd",
    "citation": "[1947] Ir Jur Rep 35",
    "year": 1947,
    "court": "Circuit Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The court held that a cinema owner owed a duty of care to a paying patron as an invitee on the premises. The defendant was found liable for injuries sustained when the plaintiff fell on defective cinema steps, establishing early Irish authority for the duty owed to paying customers as invitees at common law. The case remains historically significant in the development of occupiers liability in Ireland, though the common law categories have since been replaced by the Occupiers Liability Act 1995.",
    "key_quote": "A cinema proprietor who invites the public to attend his premises for reward is under a duty to take reasonable care that those premises are reasonably safe for the purpose for which the invitee is invited to use them.",
    "full_summary": "O'Gorman v Ritz Cinema (Clonmel) Ltd concerned a patron who attended the defendant's cinema and suffered injury when she fell on cinema steps that were found to be defective. The plaintiff sued in negligence, arguing that the cinema owner had breached its duty as an occupier to ensure that the premises were reasonably safe. The Circuit Court held in favour of the plaintiff. The court applied the traditional common law rules of occupiers liability, which distinguished between different categories of entrant: trespassers, licensees, and invitees. A paying customer attending a cinema was clearly an invitee, that is, a person who enters premises at the express or implied invitation of the occupier for purposes in which the occupier has a business interest. The duty owed to an invitee under the traditional common law was to take reasonable care to prevent damage from unusual danger which the occupier knows or ought to know of and which the invitee does not know of. The court found that the defective condition of the steps amounted to such an unusual danger and that the cinema proprietor had breached its duty by failing to maintain the steps in a safe condition. O'Gorman v Ritz Cinema is historically significant as an early Irish case applying the common law rules of occupiers liability to a commercial entertainment premises. These rules were subsequently replaced by the Occupiers Liability Act 1995, which abolished the traditional categories and introduced a single statutory regime.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "cinema",
      "invitee",
      "duty of care",
      "premises"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Barnett v H&J Packer & Co Ltd",
    "citation": "[1940] 3 All ER 575",
    "year": 1940,
    "court": "England and Wales High Court (King's Bench Division)",
    "jurisdiction": "UK",
    "legal_principle": "The High Court held a confectionery manufacturer liable for injuries caused by a toffee sweet containing a sharp piece of metal. The court applied the Donoghue v Stevenson neighbour principle to hold that a manufacturer owes a duty of care to the ultimate consumer of a product. The presence of a foreign body in food constitutes a breach of that duty, and the principle of res ipsa loquitur was applied to establish breach without direct proof of negligence.",
    "key_quote": "A manufacturer of food products owes a duty of care to the ultimate consumer, and the presence of a foreign body in the product raises a prima facie inference of negligence under the principle of res ipsa loquitur.",
    "full_summary": "Barnett v H&J Packer & Co Ltd was a product liability case arising from injury caused by a toffee sweet manufactured by the defendant that contained a sharp piece of metal. The plaintiff suffered injury when biting into the sweet and brought an action in negligence against the manufacturer. The High Court held the manufacturer liable. The court applied the neighbour principle established by Lord Atkin in Donoghue v Stevenson, under which a manufacturer of products that are intended to reach the consumer without intermediate examination owes a duty of care to that consumer to take reasonable care in the manufacturing process. The presence of the metal fragment in the sweet was itself evidence of a breach of that duty. The court applied the res ipsa loquitur principle, holding that the presence of a foreign body of this nature in a manufactured food product is something that would not ordinarily occur in the absence of negligence on the part of the manufacturer, and the defendant had failed to provide any satisfactory explanation for how the metal entered the product. Barnett v H&J Packer is an early example of the practical application of the Donoghue v Stevenson principle in a product liability context involving food safety. It illustrates the importance of res ipsa loquitur as an evidential tool in product liability cases and remains a useful illustration of how courts approach proof of negligence in manufacturing defect cases.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "product liability",
      "negligence",
      "food",
      "hidden defect",
      "manufacturer"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Simpson v Weber",
    "citation": "(1925) 133 LT 46",
    "year": 1925,
    "court": "England and Wales High Court (King's Bench Division)",
    "jurisdiction": "UK",
    "legal_principle": "The High Court considered whether the escape of fire from the defendant's land gave rise to strict liability under the rule in Rylands v Fletcher. The court held that where fire escapes from land as a result of a non-natural use of that land, the defendant may be strictly liable without proof of negligence. The decision reinforces the principle that strict liability extends to any dangerous thing accumulated on land that subsequently escapes and causes damage to neighbouring property.",
    "key_quote": "Where fire escapes from land as a result of a non-natural use, the occupier may be strictly liable under the rule in Rylands v Fletcher without proof of negligence, if the escape causes damage to a neighbour's property.",
    "full_summary": "Simpson v Weber concerned a claim arising from the escape of fire from the defendant's land, which caused damage to the plaintiff's property. The High Court was asked to consider whether the Rylands v Fletcher principle of strict liability applied to the escape of fire in these circumstances. The rule in Rylands v Fletcher, established in 1868 and confirmed by the House of Lords, holds that a person who brings onto his land and keeps there anything likely to do mischief if it escapes must keep it in at his peril; if he fails to do so, he is prima facie answerable for all the damage which is the natural consequence of its escape. The requirement of non-natural use is a necessary element of the rule. In Simpson v Weber the court held that the circumstances constituted a non-natural use of the land and that the escape of fire fell within the Rylands v Fletcher principle, imposing strict liability on the defendant. The case is significant as an application of the strict liability rule to fire in the early twentieth century and must be read alongside cases such as Mason v Levy Autoparts, which further developed the law on fire and strict liability. It is also relevant to the question of whether fire itself can constitute the dangerous thing accumulated, or whether it must be the result of some other accumulation. Simpson v Weber is cited in discussions of the Rylands v Fletcher rule and its application to fire cases.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "Rylands v Fletcher",
      "fire",
      "dangerous thing",
      "escape",
      "strict liability"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Lockwood v Ireland and the Attorney General",
    "citation": "[1993] 1 IR 337",
    "year": 1993,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the liability of the State for a wrongful prosecution and addressed the constitutional tort framework developed in Meskell v CIE. The court held that where the State has wrongfully interfered with a plaintiff's constitutional rights, an action may lie in damages independently of the common law torts. The case establishes that constitutional infringements by State actors are themselves actionable as a form of tort in Irish law.",
    "key_quote": "Where a plaintiff's constitutional rights have been infringed by agents of the State, an action lies for damages independently of any cause of action at common law, on the basis that the Constitution itself creates enforceable rights.",
    "full_summary": "Lockwood v Ireland and the Attorney General arose from an alleged wrongful prosecution and considered the extent to which a person who has been wrongfully prosecuted by the State can seek redress under the Irish constitutional tort framework. The High Court engaged with the constitutional tort doctrine, which was established in Ireland by the Supreme Court in Meskell v CIE, where it was held that a plaintiff whose constitutional rights have been infringed by another person, including the State, can sue in tort for that infringement without needing to establish that it falls within a recognised common law cause of action. The constitutional basis of this action is that the Constitution guarantees rights and must provide effective remedies for their breach. In Lockwood, the court applied this framework to the context of wrongful prosecution and State conduct, holding that the wrongful interference with the plaintiff's constitutionally protected rights by agents of the State could ground an action for damages as a constitutional tort. The decision is important in the Irish context as it affirms the distinct and additional nature of constitutional tort remedies alongside the common law and illustrates how the constitutional tort doctrine developed by the Irish courts provides protection in situations where common law remedies may be unavailable or inadequate. Lockwood v Ireland remains a useful illustration of the operation of constitutional torts in the area of State liability.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "misfeasance in public office",
      "constitutional tort",
      "state liability",
      "wrongful prosecution"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Grand Canal Trunk Railway Co v McAlindin",
    "citation": "(1834) 1 Cl & Fin 543",
    "year": 1834,
    "court": "House of Lords",
    "jurisdiction": "IE",
    "legal_principle": "This early House of Lords decision addressed the responsibility of a company operating transportation infrastructure for injuries caused to third parties. The case is cited in Irish tort law as an early example of courts imposing a duty of care on those conducting potentially dangerous operations, laying important groundwork for later developments in the duty of care doctrine in both Ireland and the United Kingdom.",
    "key_quote": "Those who conduct operations that are inherently dangerous to third parties are under an obligation to take precautions commensurate with the risk they create, and failure to do so may ground an action for damages.",
    "full_summary": "Grand Canal Trunk Railway Co v McAlindin is one of the earliest cases to address the legal responsibility of those operating transportation infrastructure for injuries caused by that infrastructure to third parties. The case was heard by the House of Lords and arose from harm caused by the operation of a canal or railway in Ireland. The decision is historically important in the evolution of the duty of care concept in both Irish and British tort law. At the time of the decision, the general principles of negligence were still being developed, and cases such as this, imposing responsibility on those conducting dangerous operations, contributed to the foundation on which the modern law of negligence was later built, culminating in Donoghue v Stevenson in 1932. The case is cited in Irish legal scholarship as illustrative of early judicial willingness to impose obligations on corporations and enterprises operating large-scale potentially dangerous infrastructure. The court's reasoning anticipated later developments concerning the duties of care owed by those engaged in activities that create foreseeable risks of harm to others. Grand Canal Trunk Railway Co v McAlindin is primarily of historical and doctrinal interest in the Irish tort law context, illustrating the deep roots of the duty of care concept in the law governing dangerous operations and the evolution of the modern law of negligence from early nineteenth century decisions.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "early duty of care",
      "carriers",
      "dangerous operations"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Mulcahy v Cork County Council",
    "citation": "[2020] IECA 66",
    "year": 2020,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered the liability of Cork County Council for injuries sustained by a road user due to a road defect. The court affirmed that a roads authority owes a duty of care to maintain public roads in a reasonably safe condition and that actual or constructive knowledge of the defect is required to establish liability. The decision provides guidance on the evidential requirements for constructive knowledge in road defect claims against local authorities.",
    "key_quote": "A roads authority discharges its duty of care by implementing a reasonable system of inspection and repair; liability attaches where actual or constructive knowledge of a defect is established and the authority has failed to remedy it within a reasonable time.",
    "full_summary": "In Mulcahy v Cork County Council [2020] IECA 66, the Court of Appeal examined the liability of a local roads authority for personal injuries sustained by the plaintiff as a result of a defect in the surface of a public road. The plaintiff argued that Cork County Council knew, or ought to have known, of the defect and failed to take appropriate remedial action within a reasonable time. The court affirmed the well-established principle that a roads authority owes a duty of care to users of public roads and is required to maintain those roads in a reasonably safe condition. Critically, the court confirmed that liability does not arise automatically upon proof of a defect; the plaintiff must establish that the authority had actual or constructive knowledge of the particular hazard. Constructive knowledge may be inferred from the nature, size, and duration of the defect, from prior reports or complaints, or from the authority's own inspection records. The court considered the evidential burden on the plaintiff and the standard of a reasonable inspection regime. It also addressed the defence of contributory negligence, examining whether the plaintiff had taken reasonable care for their own safety while using the road. The decision is significant for road defect litigation as it clarifies the threshold of knowledge required to ground liability and provides guidance on the type of evidence capable of establishing constructive knowledge on the part of a local authority. The case reinforces that the mere existence of a pothole or surface defect is insufficient in itself to ground liability without evidence that the authority had notice of the specific hazard.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public authority",
      "road defect",
      "contributory negligence",
      "local authority"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Kinsella v Kenmare Resources plc",
    "citation": "[2019] IECA 54",
    "year": 2019,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered the duty of care owed by an occupier of a construction or mining site to a person who entered the site for a business purpose. The court applied the Occupiers' Liability Act 1995 and examined whether the plaintiff was a visitor within the meaning of the Act and whether the standard of care had been discharged, having regard to the nature of the premises and the purposes of the visit.",
    "key_quote": "An occupier of a commercial or industrial site who invites a person onto the premises for a business purpose owes that visitor a duty to take reasonable care having regard to all the circumstances, including the inherent dangers of the type of premises involved.",
    "full_summary": "In Kinsella v Kenmare Resources plc [2019] IECA 54, the Court of Appeal considered the scope of an occupier's duty of care under the Occupiers' Liability Act 1995 in the context of a construction or mining site. The plaintiff entered the defendant's site for a purpose connected with his trade or business and sustained injuries as a result of a hazardous condition on the premises. The central questions were whether the plaintiff fell within the category of 'visitor' as defined under section 1 of the 1995 Act, and, if so, whether the defendant had taken reasonable care to ensure that the visitor did not suffer injury on account of any danger existing on the premises. The court examined the particular characteristics of an industrial or mining site, noting that such premises carry inherent risks of which both the occupier and regular attendees may be well aware. However, the court emphasised that awareness of general site risks does not relieve the occupier of its obligation to take reasonable precautions against specific, foreseeable hazards. The court considered whether the defendant had provided adequate warnings, safety information, and supervision to the plaintiff during the visit. The decision clarifies the application of the 1995 Act to specialised industrial premises and confirms that the standard of care under the Act is assessed by reference to what is reasonable in all the circumstances, including the nature of the site and the purpose of the visit.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "construction site",
      "visitor",
      "duty of care",
      "Occupiers Liability Act 1995"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Smyth v Commissioner of An Garda Síochána",
    "citation": "[2015] IEHC 753",
    "year": 2015,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the duty of care owed by An Garda Síochána in the exercise of their law enforcement functions. Applying the Glencar framework and the principle of assumption of responsibility, the court examined whether Gardaí who had undertaken to protect the plaintiff from a specific threat had assumed a duty of care that gave rise to liability when that protection failed.",
    "key_quote": "Where Gardaí make a specific undertaking to a known individual that they will take steps to protect that person from an identified threat, they may assume a duty of care to that individual which can give rise to liability in negligence if the protection fails through want of reasonable care.",
    "full_summary": "In Smyth v Commissioner of An Garda Síochána [2015] IEHC 753, the High Court examined whether the Gardaí owed a duty of care to the plaintiff, who claimed to have suffered harm as a result of the failure of Garda officers to protect him from a specific and identified threat. The general rule in Irish law, derived from the Glencar Explorations plc v Mayo County Council [2002] 1 IR 84 framework, is that public authorities do not ordinarily owe a private law duty of care in the exercise of their statutory functions. However, the court acknowledged that this general rule may be displaced where there has been an assumption of responsibility by the authority toward a specific individual. Applying the Hedley Byrne/Henderson v Merrett principle of assumption of responsibility, the court considered whether the Gardaí had, by their conduct, undertaken to take protective steps for the plaintiff and whether the plaintiff had relied upon that undertaking to his detriment. The court also applied the three-stage Glencar test, examining foreseeability of harm, proximity of relationship, and whether it was just and reasonable to impose a duty. The decision is significant as it identifies the circumstances in which the otherwise limited duty of care owed by police authorities may be extended to cover failures to protect specific individuals from identified third-party threats.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "garda",
      "duty of care",
      "omission",
      "public authority",
      "assumption of responsibility"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "McDonald v Fossway Ltd",
    "citation": "[2015] IEHC 356",
    "year": 2015,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the liability of a commercial occupier for a customer's slip on a wet surface. The court applied the standard of care under the Occupiers' Liability Act 1995 and assessed whether the defendant had in place a reasonable system for detecting and remediating hazards. The case affirms that the adequacy of floor inspection systems is a central consideration in occupiers' liability claims.",
    "key_quote": "A commercial occupier discharges its duty to visitors under the Occupiers' Liability Act 1995 only where it has in place and implements a system of floor inspection that is reasonable in frequency and scope, and where hazards are remediated or guarded against promptly upon discovery.",
    "full_summary": "In McDonald v Fossway Ltd [2015] IEHC 356, the High Court considered a claim arising from the plaintiff's slip on a wet floor surface within the defendant's commercial premises. The plaintiff sustained personal injuries and alleged that the defendant, as occupier, had failed to discharge its duty of care under the Occupiers' Liability Act 1995. The court examined the defendant's floor inspection and cleaning regime, considering the frequency of inspections, whether records were maintained, and whether staff had been adequately trained to identify and respond to floor hazards. The court affirmed that the 1995 Act requires an occupier to take reasonable care to ensure that visitors do not suffer injury from dangers on the premises, and that this obligation includes the maintenance of a proactive system for identifying wet or slippery surfaces, particularly in areas of high foot traffic or where liquids are routinely used. The court also considered whether adequate warning signs had been displayed. The decision reinforces the principle that it is not sufficient for an occupier to respond reactively to spills or wet surfaces; the duty requires a proactive and documented system of inspection. The adequacy of such a system is assessed by reference to the nature of the premises, the volume of visitors, and the foreseeable risk of slip hazards arising during the ordinary operation of the business.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "slip and fall",
      "commercial premises",
      "reasonable care",
      "inspection"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Donegal Investment Group plc v Danbywiske",
    "citation": "[2017] IESC 14",
    "year": 2017,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the liability of a solicitor for negligent advice that caused economic loss to the client. The court applied the Hedley Byrne assumption of responsibility principle and confirmed that a professional who provides advice in a context where reliance is anticipated owes a duty of care to the client for foreseeable economic loss flowing from that advice.",
    "key_quote": "A solicitor who provides legal advice in a context where it is known that the client will rely on that advice in making significant financial decisions assumes a duty of care in respect of foreseeable economic loss resulting from any want of professional skill or care in the giving of that advice.",
    "full_summary": "In Donegal Investment Group plc v Danbywiske [2017] IESC 14, the Supreme Court considered the scope of a solicitor's duty of care in the context of advice that allegedly caused significant economic loss to the plaintiff client. The court applied the foundational principle from Hedley Byrne & Co Ltd v Heller & Partners Ltd [1964] AC 465 and its Irish reception, which recognises that a professional who voluntarily assumes responsibility for providing advice to a party who relies upon it is subject to liability in negligence for economic loss arising from that advice if it is given without reasonable skill and care. The court examined the nature of the retainer, the advice provided, and the extent to which the plaintiff's financial decisions were made in reliance on that advice. It also considered the boundaries of the solicitor's duty, examining what specific tasks were within the scope of the engagement. The Supreme Court's analysis reaffirms that proximity in professional negligence cases is typically established by the existence of the professional relationship and the known reliance by the client. The decision provides useful guidance on the requirements for establishing assumption of responsibility in the context of legal services and confirms that economic loss caused by negligent professional advice is fully recoverable where the Hedley Byrne conditions are satisfied.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "professional negligence",
      "solicitor",
      "economic loss",
      "negligent advice",
      "proximity"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "James Elliott Construction Ltd v Irish Asphalt Ltd",
    "citation": "[2011] IEHC 269",
    "year": 2011,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered claims arising from the supply of pyrite-contaminated hardcore used in building foundations, which caused serious structural damage to houses. The court examined the liability of the quarry operator as supplier under both the Sale of Goods Acts and the common law tort of negligence, addressing questions of latent defect, the time when damage manifests, and the applicable limitation periods.",
    "key_quote": "A supplier of building materials who places defective products into the stream of commerce owes a duty of care to foreseeable end users and may be liable in negligence for consequential physical damage to property caused by a latent defect in those materials, with the limitation period running from the date the damage becomes manifest or discoverable.",
    "full_summary": "James Elliott Construction Ltd v Irish Asphalt Ltd [2011] IEHC 269 arose from the widespread use of pyrite-contaminated hardcore quarried and supplied by Irish Asphalt Ltd in the foundations of newly built houses. Pyrite is a mineral that, when exposed to moisture and air, undergoes a chemical reaction causing swelling and heave, resulting in serious structural damage to the buildings above. The High Court was required to consider the legal basis of the claims brought by the building contractor against the quarry operator as supplier of the defective material. The court examined liability under the Sale of Goods Act 1893 and the Sale of Goods and Supply of Services Act 1980, particularly the implied terms as to merchantable quality and fitness for purpose. The court also considered the parallel claim in the tort of negligence, examining whether the defendant, as manufacturer and supplier, owed a duty of care to foreseeable users of the material. The case raised important issues concerning latent defects, since the contamination was not discoverable at the time of supply or construction. The court addressed the question of when damage 'occurred' for limitation purposes, concluding that time runs from when the damage is manifest or reasonably discoverable, not from the date of supply. The decision became a central authority in the Irish pyrite litigation, which affected thousands of homes and gave rise to significant regulatory reform.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "product liability",
      "defective materials",
      "pyrite",
      "construction",
      "latent damage"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "McGeoghan v Kelly",
    "citation": "[2021] IECA 123",
    "year": 2021,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered the respective duties of a motorist and a pedestrian in a road traffic collision and reviewed the apportionment of contributory negligence. The court confirmed that motorists owe a duty of care to pedestrians and must drive at a speed appropriate to road and visibility conditions, while pedestrians must also take reasonable care for their own safety.",
    "key_quote": "A motorist owes a duty of care to pedestrians and must drive at a speed commensurate with the prevailing road and visibility conditions; the court will apportion fault where both parties have contributed to the circumstances giving rise to the collision.",
    "full_summary": "In McGeoghan v Kelly [2021] IECA 123, the Court of Appeal considered a road traffic collision between the defendant's vehicle and the plaintiff pedestrian and reviewed both the finding of liability and the trial judge's apportionment of contributory negligence. The court applied the well-established principle that a driver owes a duty of care to all foreseeable road users, including pedestrians, and must drive at a speed that allows them to stop within the range of clear vision and to respond to hazards that a reasonable driver would anticipate. The court considered the speed of the defendant's vehicle, the lighting and road conditions at the time of the collision, and whether the pedestrian was crossing at a safe location and in a manner that a reasonable person would have adopted. The Court of Appeal also examined the quantum of damages awarded at first instance and assessed whether the trial judge had correctly applied the apportionment provisions of the Civil Liability Act 1961. The decision reaffirms that contributory negligence does not defeat a plaintiff's claim but operates to reduce the damages recoverable by a percentage that reflects the plaintiff's degree of fault. The case is a useful illustration of the practical application of apportionment principles in the specific context of pedestrian-vehicle collisions.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "contributory negligence",
      "quantum",
      "pedestrian"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Ryan v Minister for Public Expenditure and Reform",
    "citation": "[2021] IEHC 652",
    "year": 2021,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered whether the State employer owed a duty of care to a civil servant who suffered personal injury in the course of employment. The court applied the employer's non-delegable duty to provide a safe system and place of work and examined whether the injury was attributable to a foreseeable failure in the employer's safety management.",
    "key_quote": "An employer, including the State as employer, owes a non-delegable duty to its employees to provide a safe place of work, safe equipment, competent fellow employees, and a safe system of work, and will be liable where a foreseeable failure in that system causes personal injury to the employee.",
    "full_summary": "In Ryan v Minister for Public Expenditure and Reform [2021] IEHC 652, the High Court considered a personal injury claim brought by a civil servant against the State as employer. The plaintiff alleged that a failure in the employer's safety management system caused or contributed to personal injuries sustained in the course of employment. The court applied the long-established employer's liability framework, which imposes a non-delegable duty on employers to ensure the safety of their employees by providing: a safe place of work; safe equipment and plant; competent fellow employees; and a safe system of work. The court examined whether the risk of injury to the plaintiff in the particular circumstances was reasonably foreseeable and whether the employer had taken adequate steps to reduce or eliminate that risk. In examining the adequacy of the employer's safety management, the court considered whether the relevant safety assessments had been conducted, whether training had been provided, and whether appropriate supervision was in place. The case confirms that the State, in its capacity as employer, is not exempt from the ordinary principles of employer liability and is subject to the same duty of care as a private employer. It also illustrates the importance of documented safety procedures in defending such claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public authority",
      "employer liability",
      "civil servant",
      "occupational injury",
      "safe workplace"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Kennedy v Tipperary County Council",
    "citation": "[2022] IECA 265",
    "year": 2022,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered the liability of a local roads authority for injuries caused by a road surface defect. The court affirmed that a roads authority exercising its statutory functions owes a duty of care to road users and that constructive knowledge of a hazard, established through the authority's own maintenance records, is sufficient to ground liability.",
    "key_quote": "A local roads authority is fixed with constructive knowledge of a road surface defect where its own inspection and maintenance records demonstrate that the hazard had been present for a period sufficient to have been identified and remediated by a reasonable inspection regime.",
    "full_summary": "Kennedy v Tipperary County Council [2022] IECA 265 was decided by the Court of Appeal as a companion appeal to O'Mahony v Tipperary County Council [2022] and concerned the liability of a local roads authority for personal injuries sustained by the plaintiff as a result of a pothole or road surface defect. The plaintiff alleged that the council had constructive knowledge of the hazardous condition of the road, derived from the authority's own inspection and maintenance records. The Court of Appeal affirmed the general principle that a roads authority owes a duty of care to road users and is required to maintain public roads in a reasonably safe condition. The court emphasised that this duty does not require the authority to achieve a perfect road surface, but rather to implement and follow a reasonable system of inspection and repair. Critically, the court held that the authority's own maintenance records, which evidenced prior awareness of defects in the road surface, were capable of establishing constructive knowledge for the purposes of liability. The decision affirms that a local authority cannot avoid liability by compartmentalising its records so as to prevent one department from being aware of information held by another. The case also considered the assessment of contributory negligence and whether the plaintiff had taken reasonable care while using the road in question.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "road defect",
      "local authority",
      "personal injury",
      "pothole",
      "contributory negligence"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Boyle v Ferguson",
    "citation": "[2012] IEHC 148",
    "year": 2012,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a road traffic accident claim on a rural road and assessed the parties' respective degrees of fault. The court held the defendant liable for failing to maintain proper control of his vehicle on a narrow road and considered the extent of contributory negligence attributable to the plaintiff who was also travelling at an inappropriate speed.",
    "key_quote": "On a narrow rural road, a driver must maintain a speed and course that allows them to respond safely to oncoming traffic; where both parties have contributed to a collision by driving at excessive speed, the court will apportion liability in accordance with the relative degrees of fault under the Civil Liability Act 1961.",
    "full_summary": "In Boyle v Ferguson [2012] IEHC 148, the High Court considered a road traffic accident claim arising from a collision on a narrow rural road in Ireland. The plaintiff sought damages for personal injuries sustained in the accident, contending that the defendant had been negligent in the manner in which he was driving at the time of the collision. The defendant denied negligence and raised a defence of contributory negligence against the plaintiff. The court examined the circumstances of the accident, including the width of the road, the speed of both vehicles, and the visibility conditions at the location of the collision. It was found that the defendant had failed to maintain adequate control of his vehicle on a road that demanded particular caution, given its narrow width and the likelihood of oncoming traffic. However, the court also found that the plaintiff had been travelling at a speed that was excessive in the circumstances, thereby contributing to the accident. Applying the apportionment provisions of the Civil Liability Act 1961, the court divided fault between the parties in proportions that reflected their respective contributions to the collision. The case is a useful practical illustration of how Irish courts assess and apportion contributory negligence in road traffic accident claims on rural roads, where both parties may have contributed to the dangerous situation by failing to adapt their speed to road conditions.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "rural road",
      "contributory negligence",
      "quantum"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Shaughnessy v Dublin City Council",
    "citation": "[2018] IEHC 454",
    "year": 2018,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the liability of Dublin City Council for injuries sustained by a pedestrian who tripped on a defective public footpath. The court held that the council, as authority responsible for maintaining public footpaths, owed a duty of care to pedestrians and that actual or constructive knowledge of the defect was necessary to establish liability.",
    "key_quote": "A local authority responsible for the maintenance of public footpaths owes a duty of care to pedestrians who use those footpaths; liability is established where it is shown that the authority had actual or constructive knowledge of the defect and failed to take appropriate remedial action within a reasonable time.",
    "full_summary": "In O'Shaughnessy v Dublin City Council [2018] IEHC 454, the High Court considered a personal injury claim brought by a plaintiff who tripped and fell on a defective portion of a public footpath in Dublin city. The plaintiff alleged that Dublin City Council, as the authority responsible for maintaining public footpaths, was negligent in failing to detect and repair the defect in a timely manner. The court applied the established principles governing the liability of a local authority for defects in public infrastructure, confirming that the council owes a duty of care to members of the public who use the footpaths under its maintenance. The court emphasised that liability requires proof of actual or constructive knowledge of the specific defect: it is not sufficient to show simply that a defect existed; the plaintiff must establish that the authority knew or ought to have known of the defect in question and failed to remedy it within a reasonable period. The court assessed the adequacy of the council's system for inspecting footpaths and maintaining records of defects reported by members of the public or identified by council inspectors. The decision reinforces the importance of a documented and systematically applied inspection programme for public footpath infrastructure and confirms the knowledge requirement as the essential gateway to liability for local authorities in trip and fall cases.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public authority",
      "footpath defect",
      "trip and fall",
      "local authority",
      "duty of care"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Delaney v PIAB",
    "citation": "[2010] 4 IR 665",
    "year": 2010,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the role of the Personal Injuries Assessment Board (PIAB) in the personal injuries litigation process and the impact of PIAB proceedings on limitation periods. The court held that the statutory obligation to refer personal injury claims to PIAB before commencing court proceedings operates as a suspension of the limitation period during the assessment process.",
    "key_quote": "The statutory requirement to apply to PIAB before initiating personal injury proceedings suspends the running of the relevant limitation period for the duration of the PIAB process; a claimant is not prejudiced in time by complying with the mandatory referral requirement.",
    "full_summary": "Delaney v PIAB [2010] 4 IR 665 is a significant Supreme Court decision concerning the operation of the Personal Injuries Assessment Board Act 2003 and its interaction with the limitation periods prescribed by the Statute of Limitations 1957. The plaintiff sought clarification as to whether the time spent in the PIAB assessment process counted against the two-year limitation period applicable to personal injury claims under Irish law. The Supreme Court held that the statutory obligation imposed on personal injury claimants to apply to PIAB for an assessment of their claim before issuing court proceedings constitutes a form of procedural suspension of the limitation period. In other words, time ceases to run against the claimant for the purposes of the Statute of Limitations from the date on which the PIAB application is made until the date on which PIAB issues its authorisation to bring court proceedings. The court's reasoning was grounded in the principle that a claimant should not be prejudiced in time by complying with a statutory obligation that is a condition precedent to litigation. The decision has important practical implications for personal injury practitioners, confirming that the combined duration of the PIAB process and subsequent court proceedings does not operate to deprive a claimant of their right to litigate a meritorious claim. The case is frequently cited in discussions of limitation periods and the architecture of the Irish personal injuries litigation system.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "personal injuries",
      "PIAB",
      "Personal Injuries Assessment Board",
      "statutory procedure",
      "limitation"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Lidl Ireland GmbH v Irish Farmers Association",
    "citation": "[2021] IEHC 381",
    "year": 2021,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered an application for an injunction against the Irish Farmers Association arising from a campaign targeting Lidl stores. The court examined the economic torts of unlawful interference with business, inducing breach of contract, and conspiracy, applying the Campus Oil principles for interlocutory injunctions in the context of trade disputes and economic torts.",
    "key_quote": "In granting an interlocutory injunction to restrain conduct alleged to constitute economic torts, the court applies the Campus Oil principles, requiring the plaintiff to establish a fair issue to be tried, the inadequacy of damages as a remedy, and the balance of convenience favouring the grant of relief.",
    "full_summary": "In Lidl Ireland GmbH v Irish Farmers Association [2021] IEHC 381, the High Court considered an application by Lidl for an interlocutory injunction to restrain the Irish Farmers Association (IFA) from conducting a campaign that allegedly interfered with Lidl's business operations. The campaign involved activities directed at Lidl stores that the plaintiff contended amounted to unlawful interference with its business, inducing breach of contract with third parties, and unlawful conspiracy. The court examined the economic torts alleged by Lidl, analysing the constituent elements of each cause of action and whether there was a fair or serious issue to be tried on the pleaded facts. The court then applied the Campus Oil Ltd v Minister for Industry and Energy [1983] IR 88 principles for the grant of interlocutory injunctions, considering whether damages would be an adequate remedy if the injunction was refused, and where the balance of convenience lay as between the competing interests of the parties. The decision provides a useful analysis of the economic torts in an Irish context, clarifying what is required to establish unlawful means as distinct from lawful, if damaging, competitive conduct. The case is particularly notable for its examination of the tension between the right to engage in legitimate trade advocacy and the right to protection from unlawful interference with business relationships.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "economic torts",
      "unlawful interference",
      "inducing breach of contract",
      "trade dispute",
      "injunction"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "McShane Wholesale Fruit and Veg Ltd v Johnston Haulage Co Ltd",
    "citation": "[1997] NI 86",
    "year": 1997,
    "court": "Court of Appeal of Northern Ireland",
    "jurisdiction": "UK",
    "legal_principle": "The Northern Ireland Court of Appeal considered a claim for pure economic loss suffered by a business whose trading partner's goods were destroyed by the defendant's negligence. The court applied the Spartan Steel principle and held that a claimant can only recover in negligence for economic loss that is consequential upon physical damage to property in which the claimant has a proprietary interest; purely relational economic loss was not recoverable.",
    "key_quote": "Pure relational economic loss — that is, economic loss suffered as a consequence of damage to the property of a third party, where the claimant has no proprietary interest in that property — is not recoverable in negligence, following the principle established in Spartan Steel & Alloys Ltd v Martin & Co (Contractors) Ltd.",
    "full_summary": "McShane Wholesale Fruit and Veg Ltd v Johnston Haulage Co Ltd [1997] NI 86 is a Northern Ireland Court of Appeal decision applying the English law rule on pure economic loss to a commercial dispute. The plaintiff, a wholesale fruit and vegetable business, suffered economic loss when goods belonging to one of its trading partners were destroyed as a result of the negligence of the defendant haulage company. The plaintiff had no proprietary interest in the destroyed goods but contended that it was entitled to recover the economic loss it suffered as a consequence of the destruction of those goods, since it was a foreseeable victim of the defendant's negligence. The court rejected this contention, applying the principle from Spartan Steel & Alloys Ltd v Martin & Co (Contractors) Ltd [1973] QB 27. Under that principle, a claimant can recover in negligence for economic loss that is directly consequential upon physical damage to property in which the claimant has a proprietary interest, but not for purely relational economic loss — that is, loss suffered as a knock-on consequence of damage to a third party's property. The court held that the policy reasons supporting this limitation, including the need to avoid indeterminate liability to an indeterminate class, apply with equal force in Northern Ireland. The decision is a significant authority on the recoverability of pure economic loss in tort in a Northern Irish commercial context.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "economic loss",
      "negligence",
      "indirect loss",
      "relational economic loss",
      "proximity"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Polycell Products Ltd v O'Carroll",
    "citation": "[1959] Ir Jur 34",
    "year": 1959,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court applied the classic trinity of passing off — goodwill, misrepresentation, and damage — to restrain the defendant from using a name likely to be confused with the plaintiff's established adhesive product brand. The court held that even a small trader can acquire protectable goodwill in a distinctive trade name and that any misrepresentation likely to cause confusion is actionable.",
    "key_quote": "The tort of passing off protects a trader's goodwill against misrepresentation by another trader that is likely to cause damage; the plaintiff need not show actual confusion but only that the defendant's conduct is calculated to deceive, and goodwill may be protectable even where it is of limited geographical or commercial extent.",
    "full_summary": "Polycell Products Ltd v O'Carroll [1959] Ir Jur 34 is an early Irish passing off case in which the High Court considered whether the defendant's use of a name similar to the plaintiff's established brand for an adhesive product constituted the tort of passing off. The plaintiff had developed goodwill in its trade name through use in the Irish market and sought to restrain the defendant from trading under a name that, it was alleged, was likely to be confused with the plaintiff's brand by members of the public. The court applied the three-part test for passing off, derived from the speech of Lord Diplock in Erven Warnink BV v J Townend & Sons (Hull) Ltd [1979] AC 731, and more succinctly stated in the 'classic trinity' formulation of Borden (UK) Ltd v Scottish Timber Products Ltd: the plaintiff must establish goodwill in the mark or get-up, a misrepresentation by the defendant that is likely to deceive, and actual or likely damage to the plaintiff's goodwill. The court held that the plaintiff had established protectable goodwill in its trade name, that the defendant's use of a confusingly similar name amounted to an actionable misrepresentation, and that damage to the plaintiff's goodwill was a foreseeable consequence. The decision confirms that the tort of passing off is available to protect goodwill even where the plaintiff is a relatively small business, provided the three elements of the classic trinity are established.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "passing off",
      "trade name",
      "adhesive products",
      "goodwill",
      "misrepresentation"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Quinn v Quinn",
    "citation": "[1993] 1 IR 305",
    "year": 1993,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the liability of a driver to a passenger who was a family member injured in a road traffic accident. The court confirmed that the Civil Liability Act 1961 applies equally to claims between family members and that contributory negligence of the plaintiff-passenger may reduce but not extinguish the defendant's liability.",
    "key_quote": "The Civil Liability Act 1961 applies without restriction to tort claims between family members; a driver owes an injured passenger-relative the same duty of care as any other passenger, and any contributory negligence on the part of the passenger reduces but does not extinguish the damages recoverable.",
    "full_summary": "Quinn v Quinn [1993] 1 IR 305 is a Supreme Court decision that confirmed the full application of the Civil Liability Act 1961 to personal injury claims arising between members of the same family. The plaintiff was injured while a passenger in a vehicle driven by a family member and brought a claim in negligence for the injuries sustained. The defendant argued, or the court considered, whether the familial relationship between the parties affected the standard of care owed or the availability of the claim. The Supreme Court rejected any suggestion that the duty of care owed by a driver to a passenger is diminished by reason of a family relationship between them. The court confirmed that the driver owed the same duty of care — to drive with reasonable skill and care — to a passenger who was a family member as to any other passenger. The court also considered the application of contributory negligence under the Civil Liability Act 1961, affirming that any fault on the part of the plaintiff-passenger (for example, failing to wear a seatbelt or encouraging dangerous driving) operates to reduce the award of damages proportionately, rather than to extinguish the claim entirely as would have been the case under the old contributory negligence rule. The decision remains relevant to road traffic accident claims involving family members and to the general principles of contributory negligence under the 1961 Act.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "contributory negligence",
      "family member",
      "passenger"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Gorman v O'Gorman",
    "citation": "[2020] IEHC 349",
    "year": 2020,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a claim for both negligence and trespass to the person arising from a dispute between family members. The court confirmed that acts of deliberate physical contact which the plaintiff does not consent to constitute a battery at common law and that damages for such intentional torts may differ from the assessment of damages in negligence.",
    "key_quote": "A deliberate act of physical contact to which the plaintiff has not consented constitutes battery at common law regardless of whether the defendant intended to cause harm; the assessment of damages for intentional torts such as battery may take account of factors, including aggravated damages, not applicable in an ordinary negligence claim.",
    "full_summary": "In O'Gorman v O'Gorman [2020] IEHC 349, the High Court considered a personal injury claim arising from a dispute between family members in which the plaintiff pleaded both negligence and the intentional tort of trespass to the person (battery). The case presented the court with the opportunity to clarify the distinction between the two causes of action and the consequences that flow from each in terms of proof and remedy. As regards negligence, the court applied the standard duty of care and reasonable foreseeability analysis. As regards battery, the court confirmed the essential common law principles: a battery consists of an intentional, direct, and positive act of contact with the person of another which is not consented to. The intention required for battery is the intention to make the contact, not the intention to cause harm. The court addressed the issue of damages, noting that where a defendant has acted intentionally rather than merely carelessly, the court may award aggravated damages to reflect the manner in which the tort was committed. The decision provides useful guidance on the circumstances in which both negligence and trespass to the person may be pleaded concurrently and on the differing approach to damages that applies where intentional wrongdoing is established.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "trespass to the person",
      "family dispute",
      "personal injury"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Reilly v Lavelle",
    "citation": "[1990] 2 IR 526",
    "year": 1990,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the appropriate remedy where a defendant's building encroached on the plaintiff's land. The court held that the plaintiff was entitled to a mandatory injunction requiring the removal of the encroachment, not merely damages, as the courts generally will grant an injunction to restrain a continuing trespass to land unless it would be disproportionate to do so.",
    "key_quote": "Where a defendant's structure encroaches upon the plaintiff's land, the plaintiff is prima facie entitled to a mandatory injunction requiring the removal of the encroachment; the court will decline to award damages in lieu of an injunction only where it would be oppressive or disproportionate to order removal.",
    "full_summary": "O'Reilly v Lavelle [1990] 2 IR 526 is a Supreme Court decision concerning the law of trespass to land and the appropriate judicial remedy for a continuing encroachment by a neighbouring landowner's structure. The defendant's building had been constructed in such a manner that it encroached upon the plaintiff's adjoining property. The plaintiff sought a mandatory injunction compelling the defendant to remove the offending structure and restore the plaintiff's land to its unencumbered condition. The Supreme Court affirmed that a plaintiff whose property is continuously trespassed upon by the structure of a neighbour is prima facie entitled to a mandatory injunction compelling the removal of the encroachment. The court held that the right to possession and enjoyment of one's land is a fundamental property right and that the appropriate remedy for a continuing trespass is injunctive relief, not merely compensatory damages. The court acknowledged that there are limited circumstances in which a court might decline to grant an injunction and award damages in lieu under the Judicature Act principles, but held that those exceptional circumstances — notably where the granting of an injunction would be unconscionable or disproportionate — were not present on the facts. The case remains the leading Irish authority on the primacy of injunctive relief as the remedy for continuing trespass to land.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "nuisance",
      "trespass to land",
      "injunction",
      "damages",
      "encroachment"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Gough v Neary",
    "citation": "[2017] IESC 56",
    "year": 2017,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court considered the causation standard applicable in a personal injury claim where the plaintiff developed an occupational disease after exposure to harmful substances by multiple employers. The court applied the material contribution to risk doctrine and held that where cumulative exposures make it impossible to identify which individual exposure caused the injury, a plaintiff may recover from any employer whose breach materially contributed to the risk of the disease.",
    "key_quote": "Where a plaintiff develops an occupational disease following tortious exposure by multiple employers, and it is scientifically impossible to establish which particular exposure caused the condition, each defendant whose breach materially contributed to the risk of the disease may be held liable, applying the material contribution to risk doctrine derived from Fairchild v Glenhaven Funeral Services Ltd.",
    "full_summary": "Gough v Neary [2017] IESC 56 is a landmark Supreme Court decision on causation in occupational disease cases involving multiple tortfeasors. The plaintiff developed a serious occupational disease following prolonged exposure to harmful substances in the course of employment with a succession of employers. The fundamental causation difficulty in such cases — known in English law from Fairchild v Glenhaven Funeral Services Ltd [2002] UKHL 22 — is that medical science cannot determine which specific exposure caused the disease, since the cumulative and indivisible nature of the harm makes it impossible to identify the responsible employer on the ordinary balance of probabilities standard. The Supreme Court addressed whether the Fairchild exception to the orthodox but-for causation test applies in Irish law. The court held that Irish tort law recognises the material contribution to risk doctrine, under which a defendant whose breach of duty materially contributed to the risk of the plaintiff's contracting the disease can be held liable even where it cannot be shown on the balance of probabilities that that defendant's breach was the actual cause of the condition. The decision imports into Irish law the same policy-driven exception to orthodox causation that the House of Lords recognised in Fairchild and confirmed in Barker v Corus UK Ltd [2006] UKHL 20. It is the most significant Irish authority on causation in multi-defendant occupational disease litigation.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "personal injury",
      "causation",
      "material contribution",
      "employer",
      "occupational disease"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Winter v Owens",
    "citation": "[2011] IEHC 303",
    "year": 2011,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the liability of a landowner for injuries caused when the defendant's horse escaped onto a public road and caused a road traffic accident. The court held that a person keeping horses owes a duty of care to take reasonable precautions to prevent the animals from straying onto the public road, and that failure to maintain adequate fencing constitutes a breach of that duty.",
    "key_quote": "A landowner who keeps horses or other livestock owes a duty of care to road users to take reasonable precautions to prevent those animals from straying onto the public road; the adequacy of fencing and boundary maintenance is central to the assessment of whether that duty has been discharged.",
    "full_summary": "Winter v Owens [2011] IEHC 303 concerned a road traffic accident caused when the defendant's horse escaped from its field and strayed onto a public road, where it was struck by the plaintiff's vehicle, causing personal injuries to the plaintiff. The plaintiff claimed that the defendant landowner was negligent in failing to maintain adequate fencing to prevent the horse from escaping. The High Court considered the duty of care owed by a landowner who keeps animals to road users and the public. The court held that the keeping of horses creates a foreseeable risk of escape if fencing is not properly maintained, and that a person in the position of the defendant is under a duty to take reasonable steps to prevent the animal from gaining access to the public road. The court examined the state of the fencing at the relevant boundary between the defendant's land and the public road and found that the fencing was not in an adequate state of repair, constituting a breach of the defendant's duty of care. The case also considered contributory negligence and the extent to which the plaintiff driver had reacted appropriately when confronted with the animal on the road. The decision is a useful authority on the liability of landowners for animals straying onto public roads and the relationship between the tort of negligence and the Animals Act framework.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "equine",
      "horse",
      "duty of care",
      "escape",
      "roads"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Scully v Mulhall",
    "citation": "[2014] IEHC 423",
    "year": 2014,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a road traffic accident at a road junction and assessed the respective fault of the parties. The court held the defendant liable for failing to yield the right of way and considered the extent to which the plaintiff had contributed to the accident by failing to take evasive action, applying the apportionment provisions of the Civil Liability Act 1961.",
    "key_quote": "A driver who fails to yield the right of way at a road junction is prima facie negligent; the court will nonetheless consider whether the other party also contributed to the accident by failing to take available evasive action, and will apportion liability accordingly under the Civil Liability Act 1961.",
    "full_summary": "Scully v Mulhall [2014] IEHC 423 arose from a road traffic collision at a junction. The plaintiff alleged that the defendant driver had failed to yield the right of way when emerging from a minor road onto a major road, causing a collision with the plaintiff's vehicle. The defendant denied full liability and argued that the plaintiff had contributed to the accident by travelling at excessive speed and failing to take available evasive action when the danger became apparent. The High Court examined the physical configuration of the junction, the applicable road traffic rules on right of way, the speeds of both vehicles, and the available sight lines. The court found that the primary cause of the accident was the defendant's failure to yield the right of way as required; however, it also found that the plaintiff had some opportunity to avoid or mitigate the collision. Applying the apportionment provisions of the Civil Liability Act 1961, the court attributed a percentage of contributory negligence to the plaintiff and reduced the damages award accordingly. The decision illustrates how Irish courts conduct the practical exercise of apportioning liability between parties in junction collision cases and the factors taken into account in assessing the extent of contributory negligence.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "contributory negligence",
      "junction",
      "right of way"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Brien v O'Brien",
    "citation": "[2019] IEHC 591",
    "year": 2019,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a personal injury claim arising from a road traffic accident between family members. The court confirmed that the existence of a family relationship does not diminish the standard of care owed by a driver to passengers and that a passenger injured by a driver's negligence is entitled to full compensation subject to any contributory negligence.",
    "key_quote": "A family relationship between a driver and a passenger does not alter the standard of care owed by the driver; an injured passenger is entitled to full compensation for loss attributable to the driver's negligence, subject to any reduction for contributory negligence on the part of the passenger.",
    "full_summary": "O'Brien v O'Brien [2019] IEHC 591 concerned a personal injury claim arising from a road traffic accident in which both the driver and the injured passenger were members of the same family. The defendant contended that the family relationship between the parties was relevant to the standard of care and the recoverability of damages, or alternatively that the claim was motivated by the existence of insurance rather than genuine liability. The High Court firmly rejected any suggestion that a driver owes a lesser duty of care to a passenger who is a family member than to any other passenger. The court confirmed, consistent with the Supreme Court's earlier decision in Quinn v Quinn [1993] 1 IR 305, that the Civil Liability Act 1961 and the ordinary principles of negligence apply without modification to road traffic accident claims between relatives. The court assessed the liability of the defendant driver, the nature and extent of the plaintiff's injuries, and the appropriate quantum of damages. The court also considered whether any contributory negligence could be attributed to the plaintiff-passenger, for example by reason of failing to wear a seatbelt. The case is a useful contemporary restatement of the position that familial ties are irrelevant to the legal analysis of road traffic accident claims and confirms the full scope of the duty of care owed by drivers to passengers.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "personal injury",
      "road accident",
      "family members",
      "insurance"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Quinn v Paydell Ltd",
    "citation": "[2008] IEHC 98",
    "year": 2008,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the liability of a business occupier for a customer who slipped on a wet floor surface. The court held that the occupier failed to meet the standard of care required under the Occupiers' Liability Act 1995 by not placing adequate warning signs around a recently mopped area, making the occupier liable for the plaintiff's injuries.",
    "key_quote": "An occupier who causes or permits a wet floor condition to exist in a public area of commercial premises is required to take reasonable precautions, including the placement of adequate and visible warning signs, to protect visitors from the risk of slipping; failure to do so constitutes a breach of the duty of care under the Occupiers' Liability Act 1995.",
    "full_summary": "Quinn v Paydell Ltd [2008] IEHC 98 concerned a customer who slipped on a wet floor surface in the defendant's commercial premises and sustained personal injuries. The plaintiff claimed that the defendant's employees had recently mopped the floor in the area where the slip occurred and had failed to place adequate warning signs to alert customers to the wet and slippery condition of the surface. The High Court considered the duty of care owed by the defendant as occupier of commercial premises under the Occupiers' Liability Act 1995. Applying the statutory standard of reasonable care, the court held that an occupier who creates a hazard — such as a wet floor resulting from a cleaning operation — is under a positive obligation to take reasonable steps to protect visitors from that hazard. The court found that the defendant had failed to discharge this obligation because the warning signs provided, if any, were inadequate in terms of their visibility, positioning, or number. The court also considered whether the plaintiff had contributed to their own injuries by failing to observe the hazard or take care while walking. The case affirms the importance of floor safety management in commercial premises and provides practical guidance on the steps that an occupier should take when wet floor hazards are created during cleaning operations.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "slip and fall",
      "commercial premises",
      "floor surface",
      "warning"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Forster v Donovan",
    "citation": "[2009] IEHC 265",
    "year": 2009,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered the liability of a motorist for injuries caused to a pedestrian at dusk. The court applied the standard of the reasonable and prudent driver and held that a motorist must drive at a speed appropriate to the prevailing light conditions and must be prepared to stop within the distance of visibility. The court assessed contributory negligence where the pedestrian was wearing dark clothing.",
    "key_quote": "A motorist driving at dusk or in conditions of reduced visibility must drive at a speed at which they can stop within the limits of their visibility; a pedestrian who is not wearing conspicuous clothing and who steps onto the road without adequate caution may also bear a degree of contributory negligence.",
    "full_summary": "Forster v Donovan [2009] IEHC 265 concerned the liability of a motorist for a collision with a pedestrian in conditions of reduced natural light at dusk. The plaintiff pedestrian sustained injuries when struck by the defendant's vehicle and brought a claim in negligence. The defendant denied full liability, arguing that the pedestrian had been wearing dark clothing and had stepped onto the road without adequate care for approaching traffic. The High Court applied the standard of the reasonable and prudent driver, which requires a motorist to drive at a speed at which they can stop safely within the limits of their visible stopping distance. The court held that this obligation is particularly demanding in conditions of fading light, where a driver's ability to detect hazards — including pedestrians wearing dark clothing — is diminished. The court also considered the position of the pedestrian, who has a corresponding obligation to take reasonable care for their own safety when using or crossing a road. The court assessed whether the plaintiff's clothing and manner of crossing the road contributed to the accident and, finding that they did, attributed a percentage of contributory negligence to the plaintiff under the Civil Liability Act 1961. The decision is a practical illustration of the allocation of fault in pedestrian-vehicle collisions occurring in conditions of poor visibility and confirms the high standard of care expected of drivers in such conditions.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "road accident",
      "pedestrian",
      "dusk",
      "visibility"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Kelly v Garda Commissioner",
    "citation": "[2015] IECA 101",
    "year": 2015,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal considered a claim against the Garda Commissioner for negligence and malicious prosecution arising from the plaintiff's unlawful arrest. The court confirmed that a Garda officer who arrests a person without lawful authority may be personally liable for false imprisonment, and that the Commissioner may be vicariously liable for such acts carried out in the ostensible performance of police duties.",
    "key_quote": "A Garda officer who effects an unlawful arrest commits the tort of false imprisonment; the Garda Commissioner is vicariously liable for the torts of Garda members committed in the ostensible performance of their policing duties, even where the officer has acted outside the limits of their lawful authority.",
    "full_summary": "Kelly v Garda Commissioner [2015] IECA 101 is a Court of Appeal decision considering the liability of the Garda Commissioner in negligence and for the torts of false imprisonment and malicious prosecution. The plaintiff had been arrested by Garda officers and alleged that the arrest was carried out without lawful authority and that criminal proceedings were subsequently initiated against him without reasonable and probable cause. The Court of Appeal considered the constituent elements of the tort of false imprisonment, which consists of the unlawful total restraint of the liberty of another person, either by detention in a confined place or by compulsion without legal justification. The court also examined the requirements for malicious prosecution: the initiation of legal proceedings by the defendant; without reasonable and probable cause; actuated by malice; and terminating in favour of the plaintiff. A central issue was whether the Garda Commissioner was vicariously liable for the unlawful acts of individual Garda officers. The court confirmed that vicarious liability attaches to the Commissioner in respect of torts committed by Garda members in the purported exercise of their policing functions, applying the principle that an employer is vicariously liable for the torts of an employee committed in the course of and sufficiently closely connected to their employment. The decision is an important authority on both the torts of false imprisonment and malicious prosecution and on the vicarious liability of the State for policing activities.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "garda",
      "duty of care",
      "false imprisonment",
      "malicious prosecution"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Delaney v Personal Injuries Assessment Board",
    "citation": "[2024] IESC 10",
    "year": 2024,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court, sitting as a seven-judge panel, confirmed by a 5:2 majority that the Personal Injuries Guidelines issued by the Judicial Council in 2021 are constitutional and legally binding on courts and PIAB when assessing general damages. The Court further held that s.7(2)(g) of the Judicial Council Act 2019 — which allowed the Judicial Council to amend the Guidelines by committee resolution — was unconstitutional, meaning any future amendments require primary legislation. The decision is of systemic importance and governs the assessment of general damages across all personal injury proceedings in Ireland.",
    "key_quote": "The Personal Injuries Guidelines are constitutionally valid and legally binding on all courts and on PIAB when assessing general damages for personal injury.",
    "full_summary": "This landmark Supreme Court decision addressed the constitutional validity of the Personal Injuries Guidelines introduced under the Judicial Council Act 2019. The Guidelines, which set out tariff-based levels of general damages for various categories of personal injury, represented a significant departure from the previous approach under the Book of Quantum. The plaintiff challenged the Guidelines on the basis that the delegation of power to the Judicial Council to set binding damages levels was an unconstitutional transfer of judicial power. The Supreme Court, by a 5:2 majority, rejected this challenge and upheld the Guidelines as constitutionally valid. The court found that the Guidelines do not usurp judicial function, as judges retain discretion to depart from them where justice requires, provided they give reasons for doing so. However, the court identified an unconstitutional provision: s.7(2)(g) of the 2019 Act, which permitted the Judicial Council to amend the Guidelines by committee resolution without Oireachtas approval. This provision was struck down, meaning future amendments to the Guidelines require an Act of the Oireachtas. The decision has practical significance for every personal injury claimant and defendant in Ireland, as it confirms that the tariff-based framework applies throughout the litigation process, including before PIAB. Courts of Appeal had previously grappled with inconsistencies in the application of the Guidelines; this judgment provides authoritative guidance that compliance with the Guidelines is the default and departure requires reasoned justification.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "personal injury",
      "PIAB",
      "Personal Injuries Guidelines",
      "constitutionality",
      "damages assessment"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Barlow v Minister for Communications, Marine and Natural Resources",
    "citation": "[2025] IESC 14",
    "year": 2025,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court held that State bodies responsible for managing mussel seed resources had assumed a responsibility towards the plaintiff fishermen through a course of close dealings, thereby giving rise to a duty of care in respect of pure economic loss. The decision provides the most authoritative contemporary Irish statement on the liability of public authorities in negligence, the recoverability of pure economic loss, and the distinction between non-justiciable policy decisions and operational acts that may attract tortious liability. The court confirmed that the Glencar framework remains the touchstone for identifying duties of care in Irish law.",
    "key_quote": "Where a public authority enters into close dealings with identifiable individuals and assumes responsibility for their reliance, a duty of care in respect of pure economic loss may arise notwithstanding the public character of the functions in question.",
    "full_summary": "Described as one of the most significant Irish Supreme Court negligence decisions in twenty years, this case concerned claims by mussel fishermen who suffered substantial financial losses as a result of alleged mismanagement by State bodies of the allocation and management of mussel seed resources in Lough Foyle and other waters. The plaintiffs argued that the relevant State bodies had, through a course of close and repeated dealings with the fishing community, assumed a responsibility towards them such that a duty of care arose in respect of the resulting pure economic loss. The High Court had dismissed the claims on the basis that the plaintiffs lacked a sufficiently proximate relationship with the defendants and that the alleged losses were purely economic. Murray J, delivering the sole Supreme Court judgment with which all five justices concurred, allowed the appeal. The court held that an assumption of responsibility had arisen through the close dealings between the State bodies and the fishermen, creating the proximity necessary to found a duty of care even in a pure economic loss context. The judgment offers authoritative guidance on: (1) how to assess whether a public authority owes a private law duty of care in the exercise of statutory functions; (2) when pure economic loss is recoverable in Irish negligence law; (3) the continued centrality of the Glencar two-stage test (legal reasonableness plus proximity and policy) as the framework for identifying duties of care; and (4) the policy/operational distinction — decisions taken at a high level of policy are generally not justiciable, but operational implementation of policy can generate tortious liability.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public authority liability",
      "pure economic loss",
      "assumption of responsibility",
      "duty of care",
      "negligence",
      "mussel fishermen"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Collins v Parm",
    "citation": "[2024] IECA 150",
    "year": 2024,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal clarified the methodology for assessing general damages under the Personal Injuries Guidelines where the plaintiff suffers multiple injuries. The court adopted a 'dominant injury' approach, whereby the court first identifies the most serious injury and awards damages within the applicable Guidelines band for that injury, then applies a proportionate uplift for any secondary injuries having regard to the overall proportionality of the award. A failure by the trial judge to give reasons for departing from the Guidelines constitutes an error of law.",
    "key_quote": "When assessing general damages for multiple injuries under the Personal Injuries Guidelines, the court must identify the dominant injury, assess damages in accordance with the relevant band, and apply a proportionate uplift for secondary injuries, subject to an overall proportionality check.",
    "full_summary": "This Court of Appeal judgment is an important practical authority on the application of the Personal Injuries Guidelines to multi-injury cases. The plaintiff had sustained injuries to the cervical and lumbar spine, as well as psychological sequelae, in a road traffic accident. The High Court had awarded €95,000 in general damages without clearly explaining how the Guidelines had been applied. The Court of Appeal reduced this to €59,162. The court outlined a two-step methodology: first, identify the dominant injury and assess an appropriate award within the Guidelines band for that injury; second, consider what proportionate uplift is warranted by any secondary injuries, bearing in mind that the total award must not exceed what would be proportionate for the totality of injuries suffered. The court emphasised that the Guidelines are mandatory, not merely advisory, and that failure to apply them or to give adequate reasons for departing from them is a ground of appeal. The judgment has been widely applied at High Court level in subsequent personal injury trials and represents the most authoritative Court of Appeal guidance on multi-injury damages methodology since the Guidelines came into effect.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "personal injury",
      "damages",
      "Personal Injuries Guidelines",
      "dominant injury",
      "proportionality"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Henderson v Dublin Airport Authority",
    "citation": "[2024] IEHC 29",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered a personal injury claim arising from an escalator accident at Dublin Airport, involving allegations of negligence and nuisance against the airport authority and a maintenance contractor. The case raised issues concerning the standard of care applicable to operators of automated passenger transport equipment in a high-footfall public building, and the apportionment of liability between an occupier and a third-party maintenance contractor.",
    "key_quote": "An occupier of a public building who installs and maintains mechanical transport equipment owes a duty to ensure that such equipment is maintained in a safe condition and that foreseeable risks to users are guarded against.",
    "full_summary": "The plaintiff was injured when she fell on an escalator at Dublin Airport and brought proceedings against the Dublin Airport Authority and a maintenance contractor. She alleged negligence, nuisance, and breach of duty. The case also raised the question of whether the Montreal Convention on international carriage by air applied to limit the defendants' liability, and procedural questions about security for costs given the plaintiff's residence outside Ireland. The High Court considered the scope of the duty of care owed by an airport authority as occupier of a large public building to users of its escalators and mechanical walkways. The case is significant as an example of the interface between common law negligence and statutory frameworks (including the Safety, Health and Welfare at Work Act 2005) in the context of public infrastructure. The court examined evidence from engineering experts about the condition of the escalator and the adequacy of the maintenance programme, and considered whether any contributory negligence on the plaintiff's part reduced the overall damages. The case illustrates the complex multi-party liability issues that arise in public transport infrastructure negligence claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "negligence",
      "occupiers liability",
      "escalator",
      "airport",
      "duty of care"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Keogh v O'Keeffe",
    "citation": "[2025] IEHC 26",
    "year": 2025,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court emphasised that in personal injury claims a plaintiff must establish causation on the balance of probabilities, and that temporal proximity between the accident and the onset of symptoms is an important but not determinative consideration. Where the medical evidence discloses a pre-existing degenerative condition, the court must carefully distinguish between symptoms referable to pre-existing pathology and those caused by the defendant's negligence. The judgment stresses the need for clear and careful expert evidence on causation.",
    "key_quote": "Temporal proximity between an accident and the onset of symptoms is a necessary but not sufficient condition to establish causation; the court must assess whether, on the balance of probabilities, the defendant's negligence caused or materially contributed to the symptoms complained of.",
    "full_summary": "This High Court judgment by Holland J addressed a personal injury claim arising from a rear-end collision. The plaintiff alleged that the collision caused right-sided symptoms including neck and arm pain. The defence case was that the plaintiff had a pre-existing cervical degenerative condition and that the mild impact of the collision was unlikely to have caused or significantly contributed to the plaintiff's symptoms. The court undertook a detailed analysis of the medical evidence and the principles of causation in personal injury cases. Holland J emphasised that while temporal proximity between an accident and symptom onset is an important indicator of causation, it is not determinative, and the court must assess the whole of the evidence to determine whether the defendant's negligence caused or materially contributed to the plaintiff's condition. The judgment is notable for its careful treatment of the interplay between pre-existing conditions and traumatic injury — a recurrent issue in Irish personal injury litigation — and for its clear statement that plaintiffs bear the burden of establishing causation on the balance of probabilities. The court assessed the credibility of both the plaintiff's subjective account and the competing expert reports before making its finding on causation.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "road traffic accident",
      "causation",
      "pre-existing condition",
      "rear-end collision",
      "personal injury"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Scanlan v McDonnell t/a Woodlands Caravan and Camping Park",
    "citation": "[2024] IEHC 324",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court held that an electricity extension cable lying on the ground at a caravan park constituted a 'usual danger' rather than an 'unusual danger' within the meaning of the Occupiers' Liability Act 1995, and dismissed the plaintiff's claim. The court confirmed that the distinction between usual and unusual dangers is central to the Act's framework: an occupier is not liable to a visitor in respect of a usual risk that the visitor, exercising reasonable care for their own safety, could have avoided. The judgment is a leading 2024 authority on the boundaries of occupier liability to visitors.",
    "key_quote": "A risk that is ordinary and foreseeable in the context of the premises and which a reasonable visitor exercising ordinary care for their own safety could have avoided constitutes a 'usual danger' within the meaning of the Occupiers' Liability Act 1995, and gives rise to no liability on the part of the occupier.",
    "full_summary": "The plaintiff sustained a fracture of the humerus when she tripped over an electricity extension cable at a caravan and camping park. She brought proceedings against the occupier under the Occupiers' Liability Act 1995, arguing that the cable constituted an unusual danger on the premises. Coffey J dismissed the claim, holding that an electricity extension cable lying on the ground at a campsite where electricity connections are provided to caravans is a usual and expected feature of such premises, not an unusual danger. The court applied the distinction drawn in the Act between an 'unusual danger', which the occupier must take reasonable care to guard against, and a 'usual danger', which visitors must take reasonable care to avoid themselves. The judgment confirms that the Act was intended to limit the extensive liability that had previously attached to occupiers under the common law invitee/licensee categories, and that ordinary hazards of the type of premises in question do not give rise to liability simply because a visitor is injured by them. The decision is significant as one of the clearest recent Irish High Court articulations of the usual/unusual danger distinction and will be of wide practical relevance to occupiers of recreational, sports, and outdoor leisure facilities.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "Occupiers Liability Act 1995",
      "visitor",
      "usual danger",
      "unusual danger",
      "trip and fall"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Driscoll v Irish Province of Bon Secours Sisters",
    "citation": "[2024] IEHC 486",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court dismissed a claim under the Occupiers' Liability Act 1995 where the plaintiff, who had deliberately climbed and jumped from a locked gate at hospital premises, was found to be a trespasser. CCTV evidence established that the plaintiff had voluntarily jumped from the gate rather than falling accidentally. As a trespasser, the plaintiff was owed only the limited duty not to be injured by reckless disregard, and no such disregard was established on the facts.",
    "key_quote": "An adult trespasser who is injured while deliberately engaging in an activity that carries an obvious risk assumes responsibility for that risk; the reduced duty of reckless disregard owed to trespassers under the 1995 Act was not breached.",
    "full_summary": "The plaintiff claimed to have been injured when a locked gate at a Bon Secours hospital property swung outward and knocked her to the ground. The defendant contested the account of the incident and relied on CCTV footage from the premises. The High Court, having carefully reviewed the footage, found that the plaintiff had in fact climbed the gate and deliberately jumped from it, rather than being struck by it as she alleged. On this basis, the court found that the plaintiff was a trespasser at the time of the accident. Under the Occupiers' Liability Act 1995, a trespasser is owed only the duty not to be injured as a result of the occupier's reckless disregard — a significantly lower standard than the duty of reasonable care owed to visitors. The court found that no such reckless disregard was established, and dismissed the claim. The case is instructive in demonstrating the role of CCTV evidence in personal injury claims, and the practical importance of the trespasser/visitor distinction under the 1995 Act. It also serves as a reminder that courts will scrutinise CCTV evidence carefully and will not hesitate to reject a plaintiff's account where it is contradicted by contemporaneous footage.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "occupiers liability",
      "trespasser",
      "reckless disregard",
      "CCTV",
      "gate"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "O'Neill v Birthistle",
    "citation": "[2024] IECA 17",
    "year": 2024,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal confirmed that it constitutes an abuse of process to bring or continue a clinical negligence action without obtaining a supportive expert report. A solicitor who issues and prosecutes medical negligence proceedings over many years without securing expert evidence to support the claim is acting irresponsibly and in breach of their professional obligations. The court affirmed the High Court's dismissal of the proceedings and emphasised the obligation on plaintiffs and their legal advisers to obtain expert support before serving proceedings.",
    "key_quote": "It is irresponsible and constitutes an abuse of process to launch or prosecute a medical negligence action without first obtaining expert advice to support the claim; the courts will not permit such proceedings to continue.",
    "full_summary": "The plaintiff brought a clinical negligence claim against a medical practitioner. The proceedings were issued and prosecuted over a prolonged period — approximately eight years — without the plaintiff's solicitors obtaining any expert report to support the allegations of negligence. The High Court struck out the claim as an abuse of process, and the Court of Appeal upheld this decision. Collins J, delivering the judgment, emphasised that clinical negligence claims require expert medical evidence to establish the relevant standard of care, breach, and causation, and that without such evidence there is no proper basis for the claim. The court noted that medical practitioners are entitled to be protected from the burden of defending proceedings that have no evidential foundation. The judgment reinforces the principle, rooted in earlier High Court decisions, that a solicitor must not issue medical negligence proceedings without first obtaining a supportive expert report or at least having a credible basis for believing such a report could be obtained. This is not merely a matter of professional conduct but of the court's jurisdiction to prevent abuse of its processes. The decision is of significant practical importance for the management of clinical negligence litigation in Ireland.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "medical negligence",
      "expert evidence",
      "abuse of process",
      "negligence",
      "clinical negligence"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Crumlish v Health Service Executive",
    "citation": "[2024] IECA 244",
    "year": 2024,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal upheld the dismissal of a medical negligence claim where the plaintiff alleged a failure to diagnose breast cancer. The court applied the Dunne v National Maternity Hospital standard of care and confirmed that the causation test requires the plaintiff to prove, on the balance of probabilities, that the defendant's breach caused or materially contributed to the damage. The court found that the plaintiff's expert evidence on cancer doubling time was affected by confirmation bias and did not meet the required standard. The judgment provides guidance on appellate review of expert evidence in medical negligence proceedings.",
    "key_quote": "Expert evidence that is shown to have been influenced by confirmation bias cannot be relied upon to establish causation; the plaintiff bears the burden of adducing reliable expert evidence to prove, on the balance of probabilities, that the defendant's breach caused or materially contributed to the harm suffered.",
    "full_summary": "The plaintiff brought a medical negligence claim alleging that Letterkenny University Hospital had negligently failed to diagnose her breast cancer at a consultation in May 2017, leading to delayed treatment and a less favourable prognosis. Both the High Court and Court of Appeal upheld the defendant's case. Noonan J, delivering the Court of Appeal judgment, found that the plaintiff's key expert had approached the question of cancer growth and doubling time with a predetermined conclusion in mind, rendering the expert's evidence unreliable due to confirmation bias. The court confirmed that the Dunne v National Maternity Hospital standard — whether a reasonable body of medical opinion would have acted as the defendant did — remained the applicable test, and that the plaintiff had failed to satisfy the causation requirement. The judgment is important for its careful analysis of when expert evidence may be rejected by a court and for its affirmation that appellate courts will uphold detailed factual findings on expert evidence made by a trial judge who has heard the expert give and be cross-examined on their evidence. It is also notable as one of a series of recent Irish cases in which courts have scrutinised the methodology of experts in delayed diagnosis cases.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "medical negligence",
      "delayed diagnosis",
      "breast cancer",
      "causation",
      "expert evidence",
      "confirmation bias"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Germaine v Day",
    "citation": "[2024] IEHC 420",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court dismissed a secondary victim nervous shock claim brought by a widow whose husband died of misdiagnosed lung cancer, holding that the plaintiff's adjustment disorder did not arise from a sudden shocking event but from a prolonged period of worry and gradual deterioration — failing the 'sudden calamitous event' and 'shock-induced' criteria established in Kelly v Hennessy [1995] IESC 8. The court applied the five Kelly v Hennessy criteria and declined to adopt the more restrictive approach of the UK Supreme Court in Paul v Wolverhampton [2024] UKSC 1. The case is the leading 2024 Irish authority on nervous shock claims arising from medical negligence.",
    "key_quote": "A secondary victim's psychiatric illness must be shock-induced — arising from a sudden, unexpected, and horrifying event — rather than from accumulated grief, worry or gradual deterioration; the Kelly v Hennessy criteria remain the applicable test in Irish law.",
    "full_summary": "The plaintiff, a widow, brought a medical negligence and nervous shock claim against her late husband's GP, alleging that a failure to diagnose lung cancer in a timely manner had caused her to suffer a recognised psychiatric illness — an adjustment disorder. The plaintiff's case was that the misdiagnosis had exposed her to the traumatic experience of watching her husband's health deteriorate and ultimately die of cancer that could have been treated earlier. Egan J applied the five-criteria test for secondary victim liability established by the Supreme Court in Kelly v Hennessy [1995] IESC 8: (1) the plaintiff suffered a recognisable psychiatric illness; (2) it was caused by shock; (3) the shock was caused by a sudden calamitous event; (4) the event was the result of the defendant's negligence; and (5) the defendant owed a duty of care to the secondary victim. The court found that criteria (2) and (3) were not satisfied — the plaintiff's adjustment disorder arose from the prolonged experience of her husband's illness and deterioration, not from a sudden shocking event. The court specifically considered but declined to follow the UK Supreme Court's decision in Paul v Wolverhampton [2024] UKSC 1 (which narrowed the scope of secondary victim claims in English law), finding that Irish law should take a context-driven approach. This case is now the leading Irish authority on nervous shock claims in the medical negligence context.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "psychiatric injury",
      "nervous shock",
      "secondary victim",
      "medical negligence",
      "Kelly v Hennessy criteria",
      "shock-induced"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "AR v Department of Psychiatry of Connolly Hospital",
    "citation": "[2024] IEHC 440",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court applied the Dunne v National Maternity Hospital standard of care to a clinical negligence claim arising from the management of a patient in a psychiatric care setting. The case confirmed that the same standard of care applicable to physical medical treatment — that of the reasonably competent practitioner in the specialty — applies equally to psychiatric care, and that compliance with a responsible body of medical opinion in the specialty is determinative.",
    "key_quote": "The standard of care required in clinical negligence claims arising from psychiatric treatment is that of the reasonably competent psychiatrist; departure from a general and approved practice in the specialty must be established by expert evidence.",
    "full_summary": "This High Court clinical negligence case arose from the plaintiff's treatment in a psychiatric unit. The plaintiff alleged that the care and treatment received during an admission to Connolly Hospital's Department of Psychiatry fell below the standard required of a reasonably competent practitioner in the specialty of psychiatry. The court applied the Dunne v National Maternity Hospital [1989] IR 91 standard and examined the expert evidence adduced by both sides as to the applicable standard of care in psychiatric in-patient management. The case illustrates the application of standard clinical negligence principles to psychiatric settings, including the requirement to obtain informed consent before treatment, the duty to carry out adequate risk assessment, and the specific obligations arising in the management of patients with mental illness under the Mental Health Act 2001. The court considered the extent to which the plaintiff's pre-existing psychiatric diagnosis affected both the assessment of the standard of care and the causation analysis.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "medical negligence",
      "psychiatric care",
      "clinical negligence",
      "standard of care",
      "duty of care"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Davidovic v Apleona HSG Ltd",
    "citation": "[2024] IEHC 596",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court held an employer liable for a worker's Achilles tendon injury caused by a defective pallet trolley in a supermarket, finding that the employer had breached its duty to provide adequate training and supervision regarding the safe use of equipment. The court dismissed the employer's contribution claim against a maintenance contractor for failure of evidence linking the contractor's work to the specific defect. The case addresses the limits of apportionment of liability between an employer and a third-party maintenance contractor.",
    "key_quote": "An employer's duty to provide adequate training and supervision regarding the safe use of equipment in the workplace is non-delegable; breach of this duty constitutes a failure to comply with the employer's common law and statutory obligations regardless of the involvement of third-party contractors.",
    "full_summary": "The plaintiff, a worker at an Aldi supermarket in Sandyford, Dublin, suffered a severe injury to her Achilles tendon when a sharp object at the base of a pallet cage trolley pierced her heel during the course of her work. She brought proceedings against both the facility management company (as employer for safety purposes) and Aldi. The High Court found the employer liable on the basis that it had failed to provide adequate training and supervision regarding the safe use of pallet cage trolleys, in breach of both the common law duty of care and the Safety, Health and Welfare at Work Act 2005. The employer sought contribution and indemnity against a maintenance contractor on the basis that a recent maintenance visit had left the sharp object in place. The court dismissed this claim, finding insufficient evidence to connect the contractor's specific works to the defect that caused the injury. The case is instructive on the limits of third-party contribution claims in employer liability cases and the high evidentiary standard required to establish that a contractor's negligence caused a workplace injury. It also illustrates how Irish courts approach the interaction between common law employer liability and statutory health and safety obligations.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "employers liability",
      "workplace injury",
      "Achilles tendon",
      "training",
      "independent contractor",
      "apportionment"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Lawless v Keatley",
    "citation": "[2025] IEHC 364",
    "year": 2025,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court dismissed an employer liability claim by a stable hand who alleged back injury while emptying a wheelbarrow, applying the principle that an employer is not the insurer of an employee against everyday mishaps occurring during ordinary work tasks. The court confirmed that liability requires proof that the employer's systems or equipment were unsafe, not merely that an injury occurred in the course of ordinary work. The case follows the approach of the Court of Appeal in Nemeth v Topaz Energy Group [2021] IECA 252.",
    "key_quote": "An employer is not an insurer of its employees against every mishap that occurs in the course of their work; liability requires proof that the employer's system of work or equipment was unsafe, not simply that an injury occurred while the employee was working.",
    "full_summary": "The plaintiff, employed as a stable hand, claimed to have injured his back while emptying a wheelbarrow of soiled hay in an unusual way. Twomey J dismissed the claim. The court found that the plaintiff's description of how the injury occurred was implausible and was not supported by his own pleadings. More fundamentally, the court applied the 'employer not an insurer' principle affirmed by the Court of Appeal in Nemeth v Topaz Energy Group [2021] IECA 252: the mere fact that an employee is injured while performing a task at work does not automatically establish employer liability. The plaintiff must demonstrate that there was something unsafe about the employer's system of work, the equipment provided, or the training given. Emptying a wheelbarrow is an ordinary, everyday task for a stable hand; there was nothing inherently dangerous about the task that required special training, equipment, or supervision. The court also found that expert engineering evidence was unnecessary for so straightforward a manual task. The judgment is a useful recent authority on the outer limits of employer liability and will be of practical benefit to employers facing claims for minor injuries arising from everyday work activities.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "employers liability",
      "workplace injury",
      "wheelbarrow",
      "stable hand",
      "employer not insurer",
      "everyday mishap"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "James v Halliday",
    "citation": "[2024] IEHC 281",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court stressed the fundamental obligation of motorists to drive at a speed appropriate to conditions and to maintain a proper lookout, and clarified that rear-end collision cases are not automatically decided in favour of the plaintiff. The court will examine all the circumstances, including the plaintiff's conduct and positioning, before determining liability and apportionment.",
    "key_quote": "A driver must at all times drive at a speed appropriate to the road conditions and maintain a proper lookout; however, a rear-end collision does not automatically establish negligence on the part of the following driver — the full circumstances must be examined.",
    "full_summary": "This High Court personal injury judgment arose from a road traffic collision in which the plaintiff's vehicle was struck from behind by the defendant's vehicle. The plaintiff sought damages for personal injury. The court considered the basic principles governing the standard of care applicable to motorists and the circumstances in which liability may be established or reduced in rear-end collision cases. Holland J emphasised that while drivers must drive at an appropriate speed and maintain a proper lookout, a rear-end collision does not create an automatic or irrebuttable presumption of negligence against the following driver. The court examined whether the plaintiff's own driving and positioning contributed to the accident. The judgment is a useful reminder that contributory negligence must always be assessed on the full facts of each case, and that standard observations about road traffic accident litigation — such as the proposition that a driver should leave sufficient braking distance — must be applied in context. The court made findings on credibility and causation before assessing the appropriate level of general and special damages under the Personal Injuries Guidelines.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "road traffic accident",
      "negligence",
      "rear-end collision",
      "speed",
      "duty of care"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Daly v Ryans Investments Limited t/a Hertz",
    "citation": "[2024] IEHC 703",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court dismissed a personal injury claim arising from a road traffic accident, placing particular weight on the plaintiff's failure to call her treating GPs as witnesses at trial. The court emphasised that where a plaintiff relies on medical evidence to establish causation and the extent of injury, the failure to call treating practitioners who submitted reports to PIAB weakens the plaintiff's case significantly. The case addresses the evidentiary requirements for establishing causation and damage in road traffic accident personal injury proceedings.",
    "key_quote": "A plaintiff who seeks to establish personal injury through medical evidence but declines to call treating practitioners who submitted reports to PIAB runs a significant risk that the court will draw adverse inferences and find causation and damage not established.",
    "full_summary": "The plaintiff brought a personal injury claim arising from a road traffic accident in 2016. The key issue was whether the accident had caused the injuries and symptoms alleged by the plaintiff. At trial, the plaintiff did not call her treating GPs to give evidence, notwithstanding that her GPs had submitted medical reports to PIAB in support of the claim. The High Court dismissed the claim. The court found that the failure to call treating practitioners was fatal to the plaintiff's case on causation — the court could not properly assess the nature, extent and causation of the alleged injuries without hearing from the doctors who had treated the plaintiff over the years since the accident. The case underscores the importance of careful preparation of personal injury proceedings, in particular the need to ensure that treating practitioners are available and willing to give evidence at trial. It also illustrates the practical significance of the PIAB process as a pre-litigation filter and the evidential standards that courts apply in assessing personal injury claims.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "road traffic accident",
      "personal injury",
      "causation",
      "evidence",
      "medical evidence",
      "treating GP"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Bird v Iconic Newspapers Limited (Court of Appeal)",
    "citation": "[2024] IECA 62",
    "year": 2024,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal held that the defence of qualified privilege under s.18 of the Defamation Act 2009 does not generally extend to inaccurate publications made by mass media to the world at large, as the reciprocity of interest and duty required by the privilege is absent. The court confirmed that the Reynolds-style public interest defence was not available where the defendant had taken no steps to verify the accuracy of the information published. The decision is a significant authority on the limits of qualified privilege in Irish media defamation law.",
    "key_quote": "Qualified privilege based on reciprocity of interest and duty does not, save in exceptional circumstances, extend to mass media publications made to the general public; where the publication is materially inaccurate and no verification steps were taken, neither statutory nor common law qualified privilege is available.",
    "full_summary": "A local newspaper published an article that erroneously identified the plaintiff as a tax defaulter, confusing him with a person of a similar name. The plaintiff sued for defamation. The defendant sought to rely on the defence of qualified privilege under s.18 of the Defamation Act 2009, arguing that the publication of tax defaulters' details served a public interest. The High Court rejected this defence and awarded damages. The Court of Appeal upheld the High Court decision. O'Moore J confirmed that qualified privilege — which requires a mutuality of interest or duty between the publisher and the audience — is ill-suited to mass media publications directed to the general public. The absence of any steps by the defendant to verify the accuracy of the information before publication also defeated any Reynolds-style public interest defence. The case is of practical significance for newspaper and online publishers in Ireland and is a reminder that qualified privilege cannot be used as a blanket defence to shield materially inaccurate reporting.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "qualified privilege",
      "mass media publication",
      "Defamation Act 2009",
      "inaccurate reporting",
      "tax defaulter"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Bird v Iconic Newspapers Limited (Supreme Court)",
    "citation": "[2025] IESC 30",
    "year": 2025,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court confirmed that the defence of qualified privilege, both at common law and under s.18(3) of the Defamation Act 2009, does not, save in exceptional circumstances, extend to inaccurate media publications made to the world at large. Collins J confirmed the EUR 75,000 damages award and provided authoritative guidance on the limits of qualified privilege for media organisations in Irish defamation law. The judgment is a landmark ruling for media publishers and the Irish defamation landscape.",
    "key_quote": "Qualified privilege was never intended to provide a shield for the mass media against liability for materially inaccurate publications; the defence requires a correspondence of duty and interest that is inherently absent in publications to a general audience.",
    "full_summary": "The Supreme Court dismissed the appeal by Iconic Newspapers and upheld the EUR 75,000 general damages award to the plaintiff who had been falsely identified as a tax defaulter. Collins J delivered the principal judgment, confirming and endorsing the Court of Appeal's analysis of the qualified privilege defence. The court held that the defence of qualified privilege — whether under the common law or under s.18(3) of the Defamation Act 2009 — requires a correspondence between the duty and interest of the publisher and the audience. In the case of a mass media publication to the general public, this mutuality is absent. The court also confirmed that the Defamation Act 2009 did not alter this fundamental principle. The Supreme Court judgment is the leading Irish authority on qualified privilege for media publications and will be widely cited by practitioners and courts in future defamation litigation. The case is also notable for its discussion of the interaction between the statutory defences in the 2009 Act and the pre-existing common law, and for the guidance it provides on the appropriate level of damages in cases of mistaken identity defamation.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "qualified privilege",
      "Defamation Act 2009",
      "mass media",
      "accuracy",
      "landmark ruling"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Casey v McMenamin",
    "citation": "[2024] IEHC 705",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court awarded EUR 120,000 in general damages and EUR 20,000 in aggravated damages for Facebook posts falsely alleging that the plaintiff was involved in human trafficking when housing Ukrainian refugees. The court applied the Higgins v Irish Aviation Authority damages guidelines, categorising the defamation as 'medium' severity, and awarded aggravated damages for the defendant's persistent refusal to remove the posts despite legal requests and a court order. The case is a significant 2024 authority on social media defamation and aggravated damages in Ireland.",
    "key_quote": "False allegations on social media that a person is involved in human trafficking — circulated persistently and in defiance of a court order — constitute seriously defamatory publications warranting substantial general and aggravated damages.",
    "full_summary": "The defendant published a series of Facebook posts falsely alleging that the plaintiff — a businessman and former presidential candidate — was engaged in human trafficking when he was in fact providing housing to Ukrainian refugees. The plaintiff brought a defamation action. Nolan J applied the Higgins v Irish Aviation Authority [2022] IESC 13 framework for assessing damages in defamation cases, which requires courts to categorise the severity of the publication and assess damages proportionately. The court categorised the defamation as 'medium' severity within the Higgins guidelines — serious and damaging to reputation, but not at the most extreme end of the scale. General damages of EUR 120,000 were awarded. In addition, the court awarded EUR 20,000 in aggravated damages on account of the defendant's conduct following the commencement of proceedings: the defendant had repeatedly refused to remove the posts despite receiving legal letters demanding their removal and had continued to publish even after an interlocutory injunction was granted. Aggravated damages are available in Irish defamation law where the defendant's conduct before, during, or after proceedings exacerbates the harm to the plaintiff's reputation or increases the injury to feelings. The total award of EUR 140,000 is a significant recent precedent on the assessment of social media defamation damages in Ireland.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "social media",
      "Facebook",
      "human trafficking",
      "aggravated damages",
      "Higgins guidelines"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Desmond v The Irish Times Limited",
    "citation": "[2024] IEHC 134",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court refused to admit expert evidence in support of the 'fair and reasonable publication on a matter of public interest' defence under s.26 of the Defamation Act 2009 where the proposed evidence related to matters of public knowledge. The court held that where a matter is already in the public domain and is within the knowledge of the ordinary juror, expert evidence is neither necessary nor admissible to establish it.",
    "key_quote": "Expert evidence is not admissible in defamation proceedings to establish facts that are already within the public domain and within the knowledge of ordinary reasonable jurors; s.26 of the Defamation Act 2009 does not create a basis for admitting such evidence.",
    "full_summary": "The plaintiff, a prominent Irish businessman, brought defamation proceedings against The Irish Times arising from published articles about his business affairs. The Irish Times sought to rely on the defence of 'fair and reasonable publication on a matter of public interest' under s.26 of the Defamation Act 2009, and proposed to call expert evidence to support the defence. The High Court considered an interlocutory application to exclude this expert evidence and held that it was inadmissible. The proposed expert evidence concerned matters that were already in the public domain — information about the plaintiff's business history and public controversies that had been extensively reported. The court held that where a matter is within the public domain and within the knowledge of ordinary reasonable jurors, expert evidence on that subject is neither necessary nor admissible. The judgment addresses the evidential requirements for the s.26 defence and provides guidance on the admissibility of expert evidence in defamation proceedings more generally. The case will be of interest to practitioners advising media clients on the conduct of defamation litigation.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "Defamation Act 2009",
      "fair and reasonable publication",
      "expert evidence",
      "s.26 defence"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Burke v Mediahaus",
    "citation": "[2024] IEHC 348",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court confirmed that a plaintiff with a significantly blemished pre-existing reputation may be unable to recover in defamation in respect of words that are consistent with that pre-existing reputation, as such words do not lower the plaintiff in the estimation of right-thinking members of society beyond the level already established. The judgment applies the principle that a plaintiff can only recover for damage to such reputation as they actually possess.",
    "key_quote": "A person's pre-existing reputation must be taken into account in assessing whether allegedly defamatory words cause actionable damage; words that are no worse than or merely consistent with a plaintiff's established bad reputation may not give rise to liability.",
    "full_summary": "The plaintiff brought defamation proceedings arising from a newspaper article published by the defendant. The defendant argued that certain words in the article were incapable of injuring the plaintiff's reputation because the plaintiff had a pre-existing negative public reputation that exceeded the gravity of the published words. The High Court accepted this argument in respect of certain of the words complained of, holding that those words were incapable of lowering the plaintiff in the estimation of right-thinking members of society to any material extent beyond the level already established by prior publications and the plaintiff's own conduct. The judgment applies the well-established principle that a plaintiff can only recover for damage to the reputation they actually have — a plaintiff with a poor reputation has less to lose and may be unable to recover in respect of words that are merely consistent with, or less serious than, their pre-existing public reputation. The case illustrates the practical importance of evidence of pre-existing reputation in defamation proceedings and the extent to which defendants can rely on such evidence to reduce or defeat a claim.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "pre-existing reputation",
      "actionability",
      "Defamation Act 2009",
      "serious harm"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Gallagher v O'Brien Retail Concepts Limited",
    "citation": "[2025] IEHC 85",
    "year": 2025,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court confirmed that in a verbal defamation claim the plaintiff must establish that persons who heard the statement could identify the plaintiff as the subject of the defamatory words. The court held that in the context of a statement made in a specific location with a limited audience, identification is sufficiently established where a bystander in that location and context could identify the plaintiff from the statement made.",
    "key_quote": "Identification in an oral defamation case does not require that the audience know the plaintiff by name; it is sufficient that persons present in the circumstances could identify the plaintiff as the person to whom the defamatory statement referred.",
    "full_summary": "The plaintiff brought defamation proceedings after an employee of the defendant's off-licence loudly accused her of shoplifting in circumstances where other customers were present and could hear the accusation. The defendant contested liability on the basis, inter alia, that the plaintiff had not been sufficiently identified as the subject of the statement. The High Court rejected this argument. The court held that identification does not require that the audience know the plaintiff by name; it is sufficient that persons present in the relevant location at the relevant time could, from the context, identify the plaintiff as the person being accused. This is a contextual and factual assessment. On the facts, the court was satisfied that customers present in the shop could identify the plaintiff as the subject of the employee's accusation. The case provides useful guidance on the identification element of a defamation claim in the context of alleged verbal defamation in a retail setting, and will be of practical relevance in similar cases arising from incidents in shops, public houses, and other public places.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "verbal defamation",
      "oral publication",
      "shoplifting accusation",
      "identification",
      "slander"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Gilroy v O'Leary",
    "citation": "[2025] IECA 42",
    "year": 2025,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal held that there is a credible argument that an internet service provider does not become liable as a publisher of defamatory content — and the limitation clock does not begin to run against it — until it has been notified of the content and given a reasonable time to remove it. The court reversed the High Court's refusal to join Google Ireland as a defendant, finding that the limitation period may not have expired. The case addresses a critical unsettled question in Irish online defamation law: when does the limitation period begin to run against an ISP?",
    "key_quote": "There is a credible argument in Irish law that an internet service provider becomes liable as a publisher of defamatory content only after it has been given notice of the content and a reasonable time to remove it; the limitation period may not commence until that point.",
    "full_summary": "The plaintiffs discovered a defamatory YouTube video in June 2018 and promptly sued the person who posted it. However, they waited over four years before seeking to join Google Ireland Limited (as operator of YouTube) as a defendant. The High Court refused the joinder application, finding that the six-year limitation period for defamation had expired by the time the joinder application was made, running from the date the video was first published. The Court of Appeal reversed this decision. Hyland J held that there was a credible and arguable case in Irish law that an internet service provider does not become liable as a publisher — and therefore the limitation clock does not begin to run against it — until it has been notified of the content and given a reasonable time to take it down. The court reasoned that an ISP that has not been notified of specific content may not have the knowledge necessary to make it liable as a publisher. The case leaves this important question unsettled for final determination, but the judgment is a significant signal that Irish courts may adopt a notification-based approach to ISP publisher liability, consistent with developments in other common law jurisdictions. The case will have wide implications for online defamation claims in Ireland.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "online publication",
      "ISP liability",
      "YouTube",
      "limitation period",
      "notice and takedown",
      "Google"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Ganley v CNN",
    "citation": "[2025] IEHC 62",
    "year": 2025,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court considered an application to stay Irish defamation proceedings on forum non conveniens grounds, where the defendant argued that Washington DC was a more appropriate forum. The court examined the principles governing stays of proceedings in multi-jurisdictional defamation cases and considered factors including the potential statute-bar of any US claim and the applicability of less plaintiff-friendly US defamation law. The case highlights the jurisdictional complexities that arise in international online defamation litigation.",
    "key_quote": "In considering whether to stay defamation proceedings on forum non conveniens grounds, the court must weigh the practical advantages and disadvantages of each forum and consider whether the plaintiff would effectively be denied justice if forced to litigate in the alternative jurisdiction.",
    "full_summary": "The plaintiffs brought defamation proceedings in Ireland in respect of a news story published by CNN online in October 2020. CNN applied to stay the Irish proceedings on forum non conveniens grounds, arguing that Washington DC, where CNN is headquartered and where the story originated, was the more appropriate forum. The High Court considered the principles applicable to forum non conveniens applications in defamation cases. Key considerations included: whether any proceedings brought in the US would by now be statute-barred (which would effectively deprive the plaintiffs of a remedy if the Irish proceedings were stayed); whether the applicable US defamation law — which is more protective of publishers than Irish law and requires proof of actual malice for public figures — would make it practically impossible for the plaintiffs to succeed; and the extent to which the relevant publication had been accessed and damage suffered in Ireland. The case illustrates the growing complexity of cross-border online defamation litigation and the significance of choice of forum in cases involving multinational media organisations.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "forum non conveniens",
      "jurisdiction",
      "online publication",
      "international defamation"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Webster v Meenacloghspar (Wind) Ltd",
    "citation": "[2024] IEHC 136",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court upheld private nuisance claims by neighbouring landowners against a wind farm operator, holding that turbine noise causing unreasonable interference with the use and enjoyment of their homes during night hours and quiet waking hours constituted an actionable nuisance. The court confirmed that compliance with noise limits set in planning permission is not a complete defence to a private nuisance claim. This is the first judgment in Ireland or the UK to uphold a private nuisance claim for wind turbine noise.",
    "key_quote": "Compliance with planning permission conditions — including noise limits — does not automatically defeat a private nuisance claim; where turbine noise unreasonably interferes with the use and enjoyment of neighbouring properties, a claim in private nuisance will lie regardless of regulatory compliance.",
    "full_summary": "Two couples living approximately 360 to 655 metres from the Ballyduff Windfarm in Co. Wexford brought private nuisance claims against the wind farm operator, alleging that noise from turbine T2 unreasonably interfered with the use and enjoyment of their homes, particularly during night hours and quiet waking hours. Egan J upheld the claims and found that the noise constituted an actionable private nuisance. The judgment is historically significant as the first in Ireland or the United Kingdom to uphold a private nuisance claim specifically for wind turbine noise. The court rejected the defendant's argument that compliance with the noise limits set out in the planning permission for the wind farm provided a complete answer to the nuisance claim. The judge held that planning permission does not authorise a private nuisance: the planning authority grants permission for development in the public interest, but this does not extinguish the private law rights of neighbouring landowners not to be subjected to unreasonable interference with the enjoyment of their property. Following the liability judgment in March 2024, the court subsequently granted an injunction in May 2025 requiring the shutdown of the turbine during certain hours, and awarded combined damages of over EUR 300,000 to the two plaintiff couples in November 2025. The case has significant implications for the wind energy sector in Ireland.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "nuisance",
      "private nuisance",
      "wind turbine",
      "noise",
      "planning permission",
      "injunction",
      "first in Ireland"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Byrne v ABO Energy Ireland Ltd",
    "citation": "[2025] IEHC 330",
    "year": 2025,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court awarded aggravated damages in a wind turbine nuisance case and ordered a full shutdown injunction where the defendant failed to propose meaningful mitigation measures. The court adopted a plaintiff-focused annualised damages methodology, confirming that a wind farm operator cannot purchase a 'licence to harm' neighbours by paying damages in lieu of an injunction. The case builds on Webster v Meenacloghspar and further develops Irish law on private nuisance remedies for noise pollution.",
    "key_quote": "A defendant who fails to propose or implement any meaningful mitigation measures cannot resist an injunction on the basis that damages would be an adequate remedy; a court will not permit a nuisance to continue indefinitely simply because the defendant is willing to pay compensation.",
    "full_summary": "Following the landmark Webster v Meenacloghspar decision establishing nuisance liability for wind turbine noise, a second case concerning the Gibbet Hill Wind Farm came before the High Court. The plaintiffs, neighbouring landowners, established that noise from the wind farm constituted a private nuisance causing unreasonable interference with the use and enjoyment of their homes. The defendant failed to propose any meaningful mitigation measures to address the nuisance. The court awarded aggravated damages of EUR 24,000 and EUR 36,000 to the respective plaintiffs — reflecting the exacerbating effect of the defendant's failure to take any steps to remedy the known nuisance — and ordered a full shutdown injunction for specified hours. The court adopted a novel plaintiff-focused annualised damages methodology, departing from the English approach which bases damages on a percentage reduction in capital value of the property. The court held that this approach better reflected the impact of the nuisance on the plaintiffs' actual enjoyment of their homes. The case confirms that Irish courts will order injunctions to restrain wind turbine noise nuisance and will award aggravated damages where defendants fail to take reasonable steps to mitigate known harm.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "nuisance",
      "private nuisance",
      "wind turbine",
      "aggravated damages",
      "injunction",
      "damages methodology"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "McDonald v Conroy",
    "citation": "[2024] IEHC 69",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court, following a Court of Appeal order for retrial, considered claims of physical and sexual assault and vicarious liability against institutional defendants. The retrial permitted the plaintiff to plead the tort of grooming as a standalone claim and as an aggravating factor — a significant development in Irish tort law. The case illustrates the evolution of Irish courts' approach to institutional abuse claims and the expanding scope of the tort of grooming.",
    "key_quote": "Grooming may be pleaded as a standalone tort in Irish law, distinct from the underlying acts of abuse; it may also constitute an aggravating factor going to the assessment of damages.",
    "full_summary": "This case arose from serious allegations of physical and sexual abuse against the first defendant, accompanied by claims of negligence, breach of statutory duty, and vicarious liability against institutional second and third defendants. Following an initial 34-day trial and damages award, the Court of Appeal ordered a retrial confined to the period before the plaintiff turned 18. The retrial order specifically permitted the plaintiff to amend his pleadings to include the tort of grooming as a standalone cause of action and as an aggravating factor in damages. The High Court in the retrial considered the developing Irish law on the tort of grooming — the deliberate process by which an abuser builds trust and relationships with a potential victim and their family or carers as a precursor to abuse. The recognition of grooming as a standalone actionable tort, distinct from the physical acts of abuse themselves, is a significant development. The case also examined the vicarious liability of the institutional defendants for the acts of the individual abuser, applying the close connection test from O'Keeffe v Hickey [2008] IESC and Hickey v McGowan [2017] IESC.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "vicarious liability",
      "institutional abuse",
      "grooming",
      "sexual abuse",
      "standalone tort",
      "retrial"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Kerins v Dail Eireann",
    "citation": "[2024] IESC 24",
    "year": 2024,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court confirmed that Article 15.13 of the Constitution absolutely precludes Irish courts from entertaining damages claims grounded on what individual members of the Oireachtas said in parliamentary committee proceedings. It is not permissible to recharacterise constitutionally protected parliamentary utterances as collective committee 'actions' in order to circumvent this immunity. The judgment is the definitive Irish authority on the intersection between parliamentary privilege and private law tortious liability.",
    "key_quote": "Article 15.13 of the Constitution absolutely precludes courts from entertaining a claim for damages founded on what members of the Oireachtas said in parliamentary proceedings; this immunity cannot be circumvented by characterising protected utterances as collective institutional actions.",
    "full_summary": "Angela Kerins, former CEO of Rehab Group, appeared before the Public Accounts Committee (PAC) in 2014 in controversial circumstances and alleged that she was subjected to hostile and damaging treatment by committee members. She brought proceedings seeking damages for personal injury and reputational harm against Dail Eireann, Ireland and the Attorney General. The case involved three rounds of litigation before the Supreme Court. In this third Supreme Court judgment, O'Donnell CJ (with Murray J and Hogan J concurring) addressed whether the plaintiff could recharacterise what individual Oireachtas members said during committee proceedings as collective 'actions' by the committee, so as to bring the claim outside the protection of Article 15.13. The court unanimously rejected this approach. Article 15.13 provides that members of each House are not amenable to any court in respect of any utterance in either House. The court held that this protection cannot be circumvented by reformulating the basis of the claim. The judgment is the definitive Irish authority on parliamentary privilege and will be of enduring significance for any future attempts to bring claims arising from Oireachtas proceedings.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "public authority liability",
      "parliamentary privilege",
      "constitutional tort",
      "Oireachtas",
      "Article 15.13",
      "reputational damage"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Yoplait Ireland Limited v Nutricia Ireland Limited (High Court)",
    "citation": "[2025] IEHC 301",
    "year": 2025,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court granted an interlocutory injunction in a passing off action restraining a rival from launching a yoghurt product whose blue-and-white mountainous get-up was confusingly similar to the plaintiff's established Skyr range. The court applied the three-part McCambridge passing off test and held that the presence of a brand name on packaging does not automatically prevent confusion where the overall get-up is similar. The court relied on its own visual impression rather than survey evidence.",
    "key_quote": "The presence of a brand name on a product does not automatically prevent confusion in a passing off claim based on overall get-up; where the visual impression created by the packaging as a whole is likely to deceive, the claim may succeed regardless of distinctive branding.",
    "full_summary": "Yoplait, the manufacturer of an established Skyr yoghurt range sold in a distinctive blue-and-white packaging with mountainous imagery, sought to restrain the launch by Nutricia (a Danone subsidiary) of a competing Skyr product whose packaging bore a blue-and-white colour scheme with similar mountainous imagery. Barrett J granted an interlocutory injunction. The court applied the three-part passing off test from McCambridge v Joseph Brennan Bakeries [2013]: goodwill, misrepresentation, and damage. The court was satisfied that Yoplait had established protectable goodwill in its Skyr get-up in Ireland. On the misrepresentation element, the court found that the overall visual impression of Nutricia's proposed packaging was confusingly similar to that of Yoplait's established product, notwithstanding the presence of Danone's brand name. The court declined to rely on consumer survey evidence, preferring to form its own impression of the overall packaging. The court also found that the balance of convenience favoured Yoplait, as the reputational and goodwill harm from allowing the infringing product to be placed on the market would be difficult to quantify and could not be adequately compensated in damages.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "passing off",
      "get-up",
      "interlocutory injunction",
      "yoghurt",
      "confusing similarity",
      "goodwill",
      "visual impression"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Yoplait Ireland Limited v Nutricia Ireland Limited (Court of Appeal)",
    "citation": "[2025] IECA 163",
    "year": 2025,
    "court": "Court of Appeal of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Court of Appeal upheld the High Court's interlocutory injunction in a passing off action, confirming that adequacy of damages favoured the plaintiff where the harm arising from confusion between competing yoghurt products would be difficult to quantify. The court confirmed that appellate interference with discretionary injunction findings is limited to cases of material error. The case is described as a rare example of a passing off finding based exclusively on the get-up of a product without reference to a brand name.",
    "key_quote": "Where passing off is established exclusively on the basis of product get-up, and reputational and goodwill damage would be difficult to quantify, the adequacy of damages criterion for maintaining an interlocutory injunction favours the plaintiff.",
    "full_summary": "The Court of Appeal considered Nutricia's appeal against the High Court's interlocutory injunction granted in favour of Yoplait in the Skyr yoghurt get-up dispute. Hyland J upheld the injunction, though on somewhat different reasoning from the High Court. The court applied the principle that appellate courts will only interfere with discretionary injunction decisions where the trial judge made a material error. The court found no such error in the grant of the injunction, though it refined certain aspects of the order's language. The judgment is notable for confirming that a finding of passing off based exclusively on get-up — without any similarity of brand name — is possible, and that it is not necessary for the competing products to be identical or near-identical in appearance for confusion to be established. The court also addressed the adequacy of damages criterion, finding that the potential damage to Yoplait's goodwill and reputation from consumer confusion in the competitive yoghurt market would be inherently difficult to quantify, supporting the conclusion that damages would not be an adequate remedy. The case builds on the High Court's judgment and is now a leading Irish authority on passing off based exclusively on trade dress and get-up.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "passing off",
      "get-up",
      "interlocutory injunction",
      "confusing similarity",
      "adequacy of damages",
      "visual impression"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Nolan v Dildar",
    "citation": "[2024] IEHC 4",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court held a company director personally liable as the 'human author' of a data breach, having transmitted the plaintiffs' personal and financial data to a third party without consent. The court awarded nominal damages of EUR 500 per plaintiff in the absence of proven actual damage, to mark the infringement of their data protection rights. The case is significant for: establishing that a director can be personally liable for a data breach independently of the company; and introducing nominal damages in Irish data protection law without proven actual loss.",
    "key_quote": "A director who is the human author of a personal data breach may be personally liable under data protection law; where a claimant's rights have been infringed but actual damage cannot be proven, nominal damages may be awarded to mark the infringement.",
    "full_summary": "In a 317-page judgment, the Commercial Court dismissed the majority of the plaintiffs' claims but found the company director personally liable for a breach of the Data Protection Acts 1988 and 2003 (the breach predated GDPR). The director had transmitted the plaintiffs' personal and financial data to a third party without consent. The court held the director personally liable as the 'human author' of the breach, finding that the corporate veil did not shield him from personal liability under data protection law. The court awarded nominal damages of EUR 500 per plaintiff — a total of EUR 3,000 — even in the absence of proven actual damage. The court stated that even where a data subject cannot prove financial loss or serious psychological harm, nominal damages may be appropriate 'to mark the fact that their rights have been infringed.' This approach to nominal damages is novel in Irish data protection law and sits in tension with the approach under GDPR, which generally requires actual damage for compensation. The judgment is significant for its imposition of personal liability on a director and for its exploration of the remedial framework available to data subjects in Irish law.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "data protection",
      "GDPR",
      "personal data breach",
      "director liability",
      "nominal damages",
      "privacy tort"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Keane v Central Statistics Office",
    "citation": "[2024] IEHC 20",
    "year": 2024,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court held that a plaintiff claiming non-material damage — anxiety and distress — arising from a GDPR personal data breach was required to obtain a PIAB authorisation before commencing court proceedings, treating the claim as a 'personal injury' within the meaning of the Personal Injuries Assessment Board Act 2003. This decision was subsequently overturned by the Supreme Court in Dillon v Irish Life Assurance [2025] IESC 37.",
    "key_quote": "A claim for psychological distress arising from a GDPR data breach constitutes a 'personal injury' claim within the meaning of the Personal Injuries Assessment Board Act 2003 and requires prior PIAB authorisation before court proceedings may be commenced.",
    "full_summary": "The plaintiff brought proceedings against the Central Statistics Office arising from a data breach in which her personal data was unlawfully processed. She claimed damages for anxiety, distress and upset suffered as a result. The High Court had to determine whether such a claim, which was framed in terms of GDPR non-material damage, constituted a 'personal injury' claim requiring prior referral to and authorisation by the Personal Injuries Assessment Board (PIAB) before proceedings could be commenced. O'Donnell J held that psychological distress, even if falling short of a diagnosable psychiatric condition, constituted personal injury for the purposes of the PIAB Act 2003, and that the plaintiff was therefore required to obtain PIAB authorisation before commencing court proceedings. This decision was subsequently appealed to the Supreme Court, which overturned it in Dillon v Irish Life Assurance [2025] IESC 37. Despite being overturned, the Keane judgment remains of historical interest as illustrating the uncertainty in Irish law about the status of GDPR non-material damage claims and the procedural requirements applicable to them.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "GDPR",
      "data protection",
      "personal injury",
      "PIAB",
      "non-material damage",
      "psychological distress"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  },
  {
    "case_name": "Dillon v Irish Life Assurance plc",
    "citation": "[2025] IESC 37",
    "year": 2025,
    "court": "Supreme Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The Supreme Court held that a freestanding claim for emotional distress falling short of a recognised psychiatric disorder is not a 'personal injury' within the Personal Injuries Assessment Board Act 2003 and therefore does not require prior PIAB authorisation. However, the court strongly signalled that damages for such non-material GDPR harm will be very modest and that plaintiffs without a medically recognised psychiatric illness will recover little in damages. The decision is the leading Irish authority on the status of GDPR non-material damage claims.",
    "key_quote": "Emotional distress, worry, anxiety and upset that fall short of a recognised psychiatric or psychological disorder do not constitute 'personal injury' within the PIAB Act 2003; however, damages for such non-material harm arising from a GDPR breach will, in the ordinary case, be very modest.",
    "full_summary": "Murray J delivered the Supreme Court judgment overturning the High Court's decision in Keane v Central Statistics Office [2024] IEHC 20. The Supreme Court held that a freestanding claim for emotional disturbances — including distress, anxiety, worry, upset and inconvenience — that fall short of a medically recognised psychiatric or psychological disorder is not a 'personal injury' within the meaning of the Personal Injuries Assessment Board Act 2003. Accordingly, prior PIAB authorisation is not a prerequisite to commencing court proceedings in respect of such claims. The court reasoned that 'personal injury' in the Act connotes physical or recognised psychiatric injury, not transient emotional reactions that do not rise to the level of a clinical condition. However, the court strongly signalled that this procedural ruling should not encourage speculative GDPR damages claims: damages for emotional distress falling short of a recognised psychiatric condition will, in the court's view, be very, very modest — likely in the range of a few hundred euros. The decision provides essential clarity on both the procedural requirements for GDPR claims and the likely level of damages for non-material harm, and will be of major significance for practitioners and data controllers facing claims arising from data breaches in Ireland.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "GDPR",
      "data protection",
      "non-material damage",
      "personal injury",
      "PIAB",
      "emotional distress",
      "damages"
    ],
    "is_frequently_tested": true,
    "past_paper_appearances": []
  },
  {
    "case_name": "Stillorgan Gas Heating and Plumbing Limited v Manning",
    "citation": "[2025] IEHC 90",
    "year": 2025,
    "court": "High Court of Ireland",
    "jurisdiction": "IE",
    "legal_principle": "The High Court applied the Higgins v Irish Aviation Authority damages guidelines to a corporate defamation claim in a default judgment, confirming that the structured approach to defamation damages introduced by Higgins applies equally to corporate as to individual plaintiffs. The case illustrates the practical application of the Higgins framework in circumstances where no defence is entered.",
    "key_quote": "The Higgins v Irish Aviation Authority framework for assessing defamation damages applies to claims by corporate plaintiffs as well as individuals; the court will assess the gravity of the publication and the damage to reputation within the structured Higgins bands even in default proceedings.",
    "full_summary": "The plaintiff company brought defamation proceedings against the defendant arising from allegedly defamatory statements made about the company's business and services. The defendant failed to enter an appearance or defence, and the plaintiff applied for judgment in default. The High Court considered the appropriate level of general damages to award to a corporate plaintiff in defamation proceedings in the absence of a contested trial. The court applied the Higgins v Irish Aviation Authority [2022] IESC 13 framework, which introduced a structured, proportionality-based approach to assessing general damages in Irish defamation cases. The court confirmed that this framework applies equally to corporate plaintiffs seeking to vindicate their trading reputation as to individual plaintiffs seeking to vindicate their personal reputation. The case is a useful practical illustration of how the Higgins guidelines operate in default proceedings, where the court must assess the gravity of the defamation and the likely impact on reputation without the benefit of a full contested hearing on the evidence.",
    "subjects": [
      "torts"
    ],
    "topics": [
      "defamation",
      "corporate defamation",
      "Higgins guidelines",
      "damages",
      "default judgment"
    ],
    "is_frequently_tested": false,
    "past_paper_appearances": []
  }
]
async function main() {
  console.log('🔨 Seeding cases...');

  let seeded = 0;
  let skipped = 0;

  for (const raw of rawCases) {
    const existing = await prisma.caseBrief.findUnique({
      where: { citation: raw.citation },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.caseBrief.create({
      data: {
        caseName: raw.case_name,
        citation: raw.citation,
        year: raw.year,
        court: raw.court,
        jurisdiction: jurisdictionMap[raw.jurisdiction] ?? CaseJurisdiction.OTHER,
        isFrequentlyTested: raw.is_frequently_tested,
        legalPrinciple: raw.legal_principle,
        keyQuote: raw.key_quote,
        fullSummary: raw.full_summary,
        subjects: raw.subjects,
        topics: raw.topics,
        appearsInPapers: raw.past_paper_appearances,
      },
    });

    seeded++;
  }

  console.log(`✅ Done — ${seeded} seeded, ${skipped} skipped (already exist)`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
