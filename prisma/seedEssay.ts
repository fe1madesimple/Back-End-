import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const essayData = [
  // ─────────────────────────────────────────
  // 1. Contract Law 2023
  // ─────────────────────────────────────────
  {
    subject: 'Contract Law',
    year: 2023,
    questions: [
      {
        examType: 'Problem',
        description: 'Warehouse fire before acceptance. Contract formation and frustration.',
        text: `Sarah owns a small bakery and regularly orders flour from Tom's Wholesale Supplies. On Monday, Sarah calls Tom and says, "I need 50 bags of flour for a large wedding order. Can you deliver?" Tom replies, "I can do 50 bags by Friday for €500." Sarah responds, "That seems high, but I'll let you know tomorrow."

On Tuesday morning, before Tom can arrange delivery, his warehouse burns down, destroying all his flour stock. Tom calls Sarah to explain he cannot fulfill the order due to the fire. On the same Tuesday, before hearing from Tom, Sarah sends an email stating, "Your price is acceptable. Deliver the 50 bags by Friday for €500."

Discuss:
1. Whether a valid contract was formed between Sarah and Tom
2. The legal implications of Tom's warehouse fire
3. What remedies, if any, Sarah might have against Tom

Reference relevant case law on offer and acceptance, the postal rule, and frustration of contract.`,
      },
      {
        examType: 'Essay',
        description: 'Doctrine of consideration. Sufficiency vs adequacy, promissory estoppel.',
        text: `Critically analyse the doctrine of consideration in Irish contract law. Your answer should:
1. Explain the distinction between sufficiency and adequacy of consideration
2. Discuss the rule against past consideration with reference to relevant exceptions
3. Analyse promissory estoppel as a substitute for consideration
4. Evaluate whether the current rules on consideration remain fit for purpose

Reference key cases including Currie v Misa, Foakes v Beer, Central London Property Trust v High Trees House, and relevant Irish authorities.`,
      },
      {
        examType: 'Problem',
        description: 'Interior design contract breach. Time of the essence and quantum meruit.',
        text: `Michelle contracts with Patrick to redesign his restaurant for €50,000, with completion due July 1st. The contract states "time is of the essence." Michelle encounters delays due to Patrick changing the colour scheme twice and supplier issues. By July 1st, work is 75% complete.

Patrick emails: "You've breached the contract. I'm hiring someone else and not paying you anything." Michelle argues the delays were partly Patrick's fault and she deserves payment for work completed. Patrick hires another designer for €25,000 to finish the job.

Discuss:
1. Whether Patrick was entitled to terminate the contract
2. Michelle's claim for work already completed (quantum meruit)
3. The significance of the "time is of the essence" clause
4. Patrick's counterclaim for additional costs

Reference Bettini v Gye, Cehave NV v Bremer, and Irish authorities on termination for breach.`,
      },
      {
        examType: 'Problem',
        description: 'Car sale with undisclosed defect. Misrepresentation and implied terms.',
        text: `Tom sells his 2018 BMW via advertisement: "Low mileage, perfect condition, never been in an accident." He tells the buyer Lisa: "Maintained perfectly, always serviced at a main dealer." Lisa asks about any problems. Tom says "nothing major, just normal wear and tear" but fails to mention a €3,000 engine repair carried out six months ago.

Two weeks after purchase, the engine fails. A mechanic confirms the previous repair was poorly done, a replacement engine costs €8,000, and the car is worth only €10,000 with the defect known. Tom argues "sold as seen."

Discuss:
1. Whether Tom's statements amount to actionable misrepresentation
2. The distinction between representations and contractual terms
3. Any implied terms under the Sale of Goods Act 1980
4. The remedies available to Lisa

Reference Hedley Byrne v Heller, With v O'Flanagan, and the Misrepresentation Act 1967.`,
      },
      {
        examType: 'Essay',
        description:
          'Offer and acceptance in the digital age. Online contracts and the postal rule.',
        text: `"The traditional rules on offer and acceptance are ill-equipped to deal with contracts formed online."

Critically evaluate this statement. Your answer should:
1. Outline the classic rules on offer, acceptance, and communication
2. Analyse how these rules apply to contracts formed by email, website click-through, and automated systems
3. Discuss whether the postal rule should apply to email acceptance
4. Consider the Electronic Commerce Act 2000 and its impact

Reference Entores v Miles Far East Corporation, Brinkibon v Stahag Stahl, and relevant Irish and EU electronic commerce legislation.`,
      },
      {
        examType: 'Problem',
        description: 'Wedding venue double-booking. Breach, distress damages, and deposit clause.',
        text: `Emma and Jack book Riverside Manor for their wedding on August 12th, paying a €5,000 deposit of a €15,000 total. The contract states the deposit is non-refundable. They send invitations and guests book non-refundable flights. In July, the venue informs them of a double-booking and offers only a refund of the deposit.

They find an alternative venue for €22,000 but it holds only 100 of their 150 guests. They also incur €3,000 in guest flight change fees and €500 for new invitations.

Discuss:
1. Whether the venue is in breach of contract
2. All heads of damage Emma and Jack may claim
3. Whether damages for distress and disappointment are recoverable
4. The validity and effect of the non-refundable deposit clause

Reference Hadley v Baxendale, Jarvis v Swan Tours, and Farley v Skinner.`,
      },
      {
        examType: 'Essay',
        description: 'Exclusion clauses and unfair contract terms. Incorporation and construction.',
        text: `Critically analyse the law governing exclusion clauses in Irish contract law. Your answer should:
1. Explain the rules on incorporation of exclusion clauses by signature, notice, and course of dealing
2. Discuss the contra proferentem rule and its application
3. Analyse the impact of the Unfair Contract Terms Act 1977 and EU Unfair Terms Directive
4. Evaluate the effectiveness of current consumer protections

Reference L'Estrange v Graucob, Interfoto Picture Library v Stiletto, and relevant Irish statutory provisions.`,
      },
      {
        examType: 'Problem',
        description:
          'Agreement to agree and vague terms. Certainty and intention to create legal relations.',
        text: `FinTech Ltd and SoftDev Ltd sign a memorandum of understanding stating they will "work together on a joint software project, with profit sharing to be agreed at a later date." SoftDev spends six months developing software at a cost of €200,000 in anticipation of the deal. FinTech then withdraws, claiming no binding contract existed.

SoftDev argues:
- The MOU was a binding contract
- At minimum, FinTech must pay for work completed
- Promissory estoppel prevents FinTech from denying the arrangement

Discuss:
1. Whether the MOU constitutes a binding contract
2. The rules on certainty of terms
3. Whether promissory estoppel assists SoftDev
4. Any restitutionary remedies available

Reference May and Butcher v The King, Foley v Classique Coaches, and Waltons Stores v Maher.`,
      },
      {
        examType: 'Essay',
        description: 'Privity of contract. Third party rights and statutory reform.',
        text: `"The doctrine of privity of contract produces harsh and unjust results that modern law has failed to adequately address."

Critically evaluate this statement with reference to:
1. The traditional privity rule and its rationale
2. Common law devices used to circumvent privity (agency, assignment, collateral contracts)
3. Statutory reform through the Contracts (Rights of Third Parties) Act 1999
4. Whether Irish law should adopt similar statutory reform

Reference Dunlop Pneumatic Tyre Co v Selfridge, Beswick v Beswick, and academic commentary on privity reform.`,
      },
      {
        examType: 'Problem',
        description: 'Duress and undue influence. Economic duress in commercial contracts.',
        text: `BuildCo enters a construction contract with SubCo to build a hotel for €2m, due in 8 months. Six months in, SubCo demands an additional €300,000 citing rising material costs, threatening to walk off site otherwise. BuildCo, facing heavy penalty clauses in its own contract with the hotel owner, reluctantly agrees in writing.

On completion, BuildCo refuses to pay the additional €300,000, claiming it was extracted under duress.

Discuss:
1. Whether economic duress vitiates the agreement to pay the additional sum
2. The distinction between legitimate commercial pressure and unlawful duress
3. Whether consideration is required for the variation to be binding
4. The remedies available to BuildCo

Reference Atlas Express v Kafco, North Ocean Shipping v Hyundai, and Williams v Roffey Bros.`,
      },
    ],
  },

  // ─────────────────────────────────────────
  // 2. Contract Law 2024
  // ─────────────────────────────────────────
  {
    subject: 'Contract Law',
    year: 2024,
    questions: [
      {
        examType: 'Problem',
        description: 'Online auction sale dispute. Offer, acceptance, and withdrawal.',
        text: `GadgetStore lists a brand-new laptop on an online auction platform with a starting bid of €1. The listing states "Buy It Now: €800." Brian bids €1 on Monday. On Tuesday, GadgetStore attempts to cancel the listing after realising the starting price was a mistake. Before the cancellation processes, Brian clicks "Buy It Now" for €800.

GadgetStore refuses to complete the sale, arguing no binding contract was formed at the auction stage and the Buy It Now click was invalid after cancellation was initiated.

Discuss:
1. Whether the auction listing constitutes an offer or invitation to treat
2. Whether Brian's bid or his "Buy It Now" click formed a binding contract
3. Whether GadgetStore can rely on unilateral mistake to avoid the contract
4. Remedies available to Brian if a contract was formed

Reference Pharmaceutical Society v Boots, Carlill v Carbolic Smoke Ball Co, and Hartog v Colin & Shields.`,
      },
      {
        examType: 'Essay',
        description: 'Frustration of contract. Development of doctrine and limits.',
        text: `Trace the development of the doctrine of frustration in Irish and English contract law. Your answer should:
1. Explain the basis and rationale for the doctrine following Taylor v Caldwell
2. Identify the categories of events that may frustrate a contract
3. Analyse the limitations on frustration, including self-induced frustration and foreseen events
4. Discuss the consequences of frustration under the Civil Law (Miscellaneous Provisions) Act 2011

Reference Davis Contractors v Fareham UDC, Krell v Henry, Amalgamated Investment v John Walker, and Irish authorities.`,
      },
      {
        examType: 'Problem',
        description: 'Penalty clause vs liquidated damages. Construction contract delay.',
        text: `MegaBuild Ltd contracts with CityCouncil to construct a civic centre for €10m, due for completion in 18 months. The contract includes a clause: "For every week of delay, MegaBuild shall pay €50,000 as liquidated damages." MegaBuild finishes 12 weeks late due partly to unforeseen ground conditions and partly to its own resource mismanagement.

CityCouncil claims €600,000. MegaBuild argues the clause is a penalty and unenforceable, and that unforeseen ground conditions frustrated the contract.

Discuss:
1. The distinction between liquidated damages and penalty clauses
2. Whether the €50,000 per week clause is enforceable
3. Whether the ground conditions argument amounts to frustration
4. The apportionment of liability

Reference Dunlop Pneumatic Tyre Co v New Garage, Cavendish Square v Makdessi, and Thorn v London Corp.`,
      },
      {
        examType: 'Essay',
        description: 'Implied terms. Terms implied in fact, law, and by custom.',
        text: `Critically analyse the rules governing implied terms in Irish contract law. Your answer should:
1. Distinguish between terms implied in fact (business efficacy and officious bystander tests)
2. Explain terms implied by law in certain categories of contract
3. Analyse terms implied by custom and trade usage
4. Evaluate the relationship between implied terms and the parties' express agreement

Reference The Moorcock, Shirlaw v Southern Foundries, Liverpool City Council v Irwin, and relevant Sale of Goods Act provisions.`,
      },
      {
        examType: 'Problem',
        description: 'Capacity and minors contract. Necessaries and voidable contracts.',
        text: `Daniel, aged 17, signs a 12-month gym membership contract for €600, pays the first month, and uses the gym for two months. He also purchases a €1,200 racing bicycle from SportShop, telling them he is 18. A month later, Daniel turns 18 and attempts to repudiate both contracts, seeking full refunds.

Discuss:
1. The general rules on contractual capacity of minors
2. Whether the gym membership is for "necessaries" and therefore binding
3. The effect of Daniel's misrepresentation of age to SportShop
4. The remedies available to each party upon repudiation

Reference Nash v Inman, Chapple v Cooper, Steinberg v Scala, and the relevant provisions of Irish law on minors' contracts.`,
      },
      {
        examType: 'Problem',
        description:
          'Undue influence in family guarantee. Manifest disadvantage and bank liability.',
        text: `Mary, a 68-year-old widow with no business experience, signs a guarantee for her son Kevin's business loans totalling €500,000, secured against her family home worth €350,000. The bank's solicitor advises her to get independent legal advice but she does not. Kevin's business fails and the bank seeks to enforce the guarantee.

Mary argues she signed under her son's undue influence and the bank had constructive notice of this.

Discuss:
1. Whether Kevin exercised actual or presumed undue influence over Mary
2. The bank's constructive notice of the undue influence
3. What steps the bank should have taken to protect itself
4. Whether the guarantee can be set aside

Reference Barclays Bank v O'Brien, Royal Bank of Scotland v Etridge, and Allied Irish Bank v Higgins.`,
      },
      {
        examType: 'Essay',
        description: 'Remoteness of damage and mitigation. Hadley v Baxendale rules.',
        text: `Critically evaluate the rules on remoteness of damage and the duty to mitigate loss in Irish contract law. Your answer should:
1. Explain the two limbs of the rule in Hadley v Baxendale
2. Analyse how the remoteness test has developed in subsequent case law
3. Discuss the claimant's duty to mitigate loss and its limits
4. Evaluate whether the current rules produce just outcomes

Reference Victoria Laundry v Newman Industries, The Heron II, and Payzu v Saunders.`,
      },
      {
        examType: 'Problem',
        description: 'Battle of the forms. Whose standard terms govern the contract.',
        text: `PrintCo sends SupplyCo a purchase order for 10,000 printed brochures using PrintCo's standard terms, which include a limitation of liability clause capping claims at €5,000. SupplyCo replies with an order acknowledgment on its own standard terms, which include no such limitation. Both parties proceed without further discussion.

The brochures contain a printing error, causing PrintCo to lose a €50,000 client contract. SupplyCo claims its terms govern and liability is unlimited. PrintCo claims its terms govern with the €5,000 cap.

Discuss:
1. The "battle of the forms" and the last shot rule
2. Whether a contract was formed and on whose terms
3. Alternative approaches to resolving the battle of the forms
4. The quantum of damages if SupplyCo is fully liable

Reference Butler Machine Tool Co v Ex-Cell-O Corp, Trentham v Archital Luxfer.`,
      },
      {
        examType: 'Essay',
        description: 'Specific performance and injunctions. Equitable remedies in contract.',
        text: `Analyse the equitable remedies of specific performance and injunction in Irish contract law. Your answer should:
1. Explain the circumstances in which specific performance will be granted
2. Discuss the bars to specific performance (mutuality, hardship, delay, clean hands)
3. Analyse the use of injunctions to enforce negative contractual obligations
4. Evaluate the adequacy of damages as an alternative to equitable relief

Reference Lumley v Wagner, Co-operative Insurance v Argyll Stores, and Verrall v Great Yarmouth Borough Council.`,
      },
      {
        examType: 'Problem',
        description: 'Agency and disclosed principal. Authority and third party rights.',
        text: `Claire, acting as agent for TravelCo (a disclosed principal), negotiates a hotel booking contract with HotelGroup for €80,000 covering a series of corporate events. Claire exceeds her actual authority by agreeing to a penalty clause of €20,000 for cancellations without TravelCo's knowledge.

TravelCo later cancels two events triggering the penalty clause. HotelGroup seeks to enforce the €40,000 penalty. TravelCo denies liability as Claire had no authority to agree to the clause.

Discuss:
1. The distinction between actual and apparent authority
2. Whether Claire had apparent authority to agree the penalty clause
3. TravelCo's potential ratification of Claire's acts
4. HotelGroup's remedies against TravelCo and/or Claire

Reference Freeman & Lockyer v Buckhurst Park Properties, Watteau v Fenwick, and Bolton Partners v Lambert.`,
      },
    ],
  },

  // ─────────────────────────────────────────
  // 3. Criminal Law 2023
  // ─────────────────────────────────────────
  {
    subject: 'Criminal Law',
    year: 2023,
    questions: [
      {
        examType: 'Problem',
        description:
          'Surgical error during emergency operation. Medical negligence and criminal liability.',
        text: `Dr Murphy, a consultant surgeon at St. Vincent's Hospital, is performing an emergency appendectomy. During the operation he receives a call about his daughter's accident. Distracted, he accidentally cuts Michael's bowel causing significant internal bleeding. The assisting nurse notices immediately but Dr Murphy dismisses her concern. Due to his distraction, proper care is not taken during repair, and Michael requires two additional surgeries and a prolonged hospital stay.

Discuss:
1. Whether Dr Murphy's conduct amounts to criminal negligence
2. The distinction between civil and criminal negligence in medical cases
3. Whether gross negligence manslaughter could arise if Michael had died
4. Any defences available to Dr Murphy

Reference The People (DPP) v Cullagh, R v Adomako, and the relevant provisions of Irish criminal law on gross negligence.`,
      },
      {
        examType: 'Essay',
        description: 'Mens rea. Intention, recklessness, and their role in criminal liability.',
        text: `Critically analyse the concept of mens rea in Irish criminal law. Your answer should:
1. Explain the different forms of mens rea: intention, recklessness, and negligence
2. Distinguish between subjective and objective tests for recklessness
3. Analyse the doctrine of transferred malice
4. Discuss whether Ireland's approach to mens rea achieves justice

Reference The People (AG) v Murray, R v Cunningham, R v Caldwell, and relevant Irish authorities on criminal intent.`,
      },
      {
        examType: 'Problem',
        description: 'Pub fight resulting in death. Unlawful act manslaughter and causation.',
        text: `During a pub altercation, John punches Kevin once in the face. Kevin falls, strikes his head on the corner of a table, and is rendered unconscious. An ambulance is called but takes 45 minutes to arrive. At hospital, a junior doctor fails to identify a subdural haematoma on initial assessment. Kevin dies eight hours later. A post-mortem confirms the haematoma was caused by the fall and was treatable if diagnosed within two hours.

John is charged with manslaughter. He argues that the medical negligence broke the chain of causation.

Discuss:
1. Whether John's punch caused Kevin's death in law
2. The "thin skull" rule and its application
3. Whether the doctor's negligence constitutes a novus actus interveniens
4. Whether John satisfies the elements of unlawful act manslaughter

Reference R v Smith, R v Jordan, R v Cheshire, and The People (DPP) v Davis.`,
      },
      {
        examType: 'Essay',
        description: 'Defence of self-defence. Proportionality, honest belief, and retreat.',
        text: `Critically analyse the defence of self-defence in Irish criminal law. Your answer should:
1. Explain the subjective and objective elements of the defence
2. Discuss the requirement of proportionality in the use of force
3. Analyse the duty to retreat and its limits under Irish law
4. Evaluate the Non-Fatal Offences Against the Person Act 1997 provisions on self-defence

Reference The People (DPP) v Barnes, Palmer v The Queen, and academic commentary on the reform of self-defence.`,
      },
      {
        examType: 'Problem',
        description: 'Joint enterprise robbery gone wrong. Common design and departure from it.',
        text: `Alan, Brian, and Conor agree to rob a petrol station. Alan and Brian enter with fake guns while Conor waits in the getaway car. Unknown to Alan and Brian, Conor brings a real knife which he has concealed in his jacket. During the robbery, Conor panics and stabs the cashier, who is seriously injured.

Alan and Brian are charged with robbery and causing serious harm. They deny liability for the stabbing, arguing it was outside the common design.

Discuss:
1. The principles of joint enterprise/common purpose
2. Whether Alan and Brian are liable for Conor's use of the knife
3. The "fundamental departure" test and its application
4. The impact of R v Jogee on Irish law

Reference The People (DPP) v Cumberton, R v Powell and English, R v Jogee, and Irish academic commentary.`,
      },
      {
        examType: 'Essay',
        description: 'Intoxication as a defence. Voluntary vs involuntary intoxication.',
        text: `Analyse the defence of intoxication in Irish criminal law. Your answer should:
1. Distinguish between voluntary and involuntary intoxication
2. Explain the distinction between crimes of specific and basic intent
3. Discuss the extent to which intoxication can negative mens rea
4. Critically evaluate whether the current law is principled and consistent

Reference DPP v Majewski, Attorney General for Northern Ireland v Gallagher, and The People (DPP) v Reilly.`,
      },
      {
        examType: 'Problem',
        description:
          'Domestic violence and battered woman syndrome. Provocation and diminished responsibility.',
        text: `For five years, Helen has suffered severe physical and psychological abuse from her husband Tom. Following a particularly brutal attack, while Tom is asleep, Helen stabs him multiple times with a kitchen knife, killing him. She is charged with murder.

Helen's defence team argue:
- She acted in self-defence in response to a continuing threat
- Alternatively, she was provoked
- Alternatively, she suffered from diminished responsibility due to battered woman syndrome

Discuss each defence in turn with reference to relevant law.

Reference The People (DPP) v MacEoin, R v Ahluwalia, R v Thornton, and the Criminal Law (Insanity) Act 2006 on diminished responsibility.`,
      },
      {
        examType: 'Essay',
        description: 'Strict liability in criminal law. Justification and constitutional concerns.',
        text: `Critically evaluate the use of strict liability in Irish criminal law. Your answer should:
1. Explain the nature of strict liability offences and how they are identified
2. Discuss the policy justifications for imposing strict liability
3. Analyse constitutional and human rights concerns with strict liability
4. Evaluate whether the presumption of mens rea provides adequate protection

Reference Sweet v Parsley, Gammon v Attorney General of Hong Kong, CC v Ireland, and the relevant provisions of Bunreacht na hÉireann.`,
      },
      {
        examType: 'Problem',
        description: 'Conspiracy and attempt. Inchoate offences and proximity to completion.',
        text: `Detective Garda Ryan, acting as an undercover officer, poses as a drug dealer and enters into negotiations with Eddie to purchase 5kg of cocaine for €50,000. Eddie agrees, accepts a €10,000 deposit, and arranges a delivery meeting. At the meeting, Eddie arrives with a package later found to contain baking powder.

Eddie is charged with conspiracy to supply a controlled substance and with attempting to supply a controlled substance.

Discuss:
1. Whether Eddie is guilty of conspiracy given Garda Ryan's involvement
2. The elements of criminal attempt and whether the facts satisfy the proximity test
3. Whether the impossibility of completing the offence affects liability
4. Any defences Eddie might raise

Reference R v Anderson, Criminal Attempts Act 1981, and The People (DPP) v Thornton.`,
      },
      {
        examType: 'Essay',
        description: 'Insanity and automatism. Mental condition defences.',
        text: `Compare and contrast the defences of insanity and automatism in Irish criminal law. Your answer should:
1. Set out the M'Naghten Rules and their application in Ireland
2. Explain the Criminal Law (Insanity) Act 2006 and its reform of the insanity defence
3. Distinguish between sane and insane automatism
4. Evaluate whether the current law adequately deals with defendants suffering from mental illness

Reference M'Naghten's Case, Bratty v Attorney General for Northern Ireland, The People (DPP) v O'Mahony, and the Criminal Law (Insanity) Act 2006.`,
      },
    ],
  },

  // ─────────────────────────────────────────
  // 4. Criminal Law 2024
  // ─────────────────────────────────────────
  {
    subject: 'Criminal Law',
    year: 2024,
    questions: [
      {
        examType: 'Problem',
        description: 'Road rage incident leading to serious harm. Assault and causation.',
        text: `During a road rage incident, Paul deliberately swerves his car into Gary's car, causing Gary to lose control and crash. Gary suffers a broken arm and whiplash. A week later, Gary develops a serious infection from the arm injury and is hospitalised for three weeks. His doctor states the infection was an unusual but foreseeable complication.

Paul is charged with assault causing serious harm under the Non-Fatal Offences Against the Person Act 1997.

Discuss:
1. The elements of assault causing serious harm
2. Whether the infection constitutes "serious harm" within the Act
3. Causation — whether Paul caused the infection
4. Any available defences

Reference the Non-Fatal Offences Against the Person Act 1997 and relevant case law on causation.`,
      },
      {
        examType: 'Essay',
        description: 'Actus reus. Omissions liability and the duty to act.',
        text: `"Criminal liability for omissions is unprincipled and should be significantly extended to reflect modern moral expectations."

Critically evaluate this statement. Your answer should:
1. Explain the general rule against omissions liability
2. Identify the recognised categories where omissions can ground liability
3. Analyse the duty of care in gross negligence manslaughter
4. Evaluate whether Irish law should extend omissions liability

Reference R v Stone and Dobinson, R v Miller, R v Pittwood, and the Criminal Law (Amendment) Act on duty to act.`,
      },
      {
        examType: 'Problem',
        description: 'Theft and handling stolen goods. Dishonesty and mens rea.',
        text: `Declan works in a warehouse and, over six months, systematically takes small quantities of goods home believing his employer "won't miss them." He also buys a second-hand phone from a friend for €50, well below market value. The phone turns out to be stolen.

Declan is charged with theft under the Criminal Justice (Theft and Fraud Offences) Act 2001 for the warehouse takings, and with handling stolen goods for the phone.

Discuss:
1. Whether Declan's belief that his employer won't miss the goods negatives dishonesty
2. The elements of theft under the 2001 Act
3. Whether Declan is guilty of handling — did he know or believe the phone was stolen?
4. The mental element required for handling stolen goods

Reference the Criminal Justice (Theft and Fraud Offences) Act 2001 and R v Ghosh on dishonesty.`,
      },
      {
        examType: 'Essay',
        description: 'Murder and the mandatory life sentence. Reform proposals.',
        text: `Critically analyse the law of murder in Ireland and evaluate proposals for reform. Your answer should:
1. Set out the elements of murder under Irish law including the mens rea requirement
2. Analyse the abolition of the constructive malice rule
3. Discuss the mandatory life sentence for murder — its justification and criticisms
4. Evaluate Law Reform Commission proposals to introduce degrees of murder

Reference The People (AG) v Dwyer, The Criminal Justice Act 1964, and Law Reform Commission Reports on Homicide.`,
      },
      {
        examType: 'Problem',
        description: 'Drug supply and possession. Knowledge, control, and defences.',
        text: `Maria is stopped by gardaí at Dublin Airport returning from Amsterdam. A search of her luggage reveals 500g of cannabis resin concealed in a hollowed-out book. Maria claims she was asked by her boyfriend to carry the bag as a favour without knowing its contents. She produces WhatsApp messages showing her boyfriend asking her to carry the bag, though she sent a reply asking "it's not drugs is it?" and received a laughing emoji in response.

Maria is charged with possession of a controlled drug with intent to supply under the Misuse of Drugs Act 1977.

Discuss:
1. The elements of possession and whether Maria had knowledge and control
2. Whether her belief that the bag might contain drugs establishes the mental element
3. The prosecution's evidential burden and the statutory presumptions under the 1977 Act
4. Any defences available to Maria

Reference The People (DPP) v Foley, Warner v Metropolitan Police Commissioner, and the Misuse of Drugs Act 1977.`,
      },
      {
        examType: 'Essay',
        description: 'Consent in criminal law. Assault, sexual offences, and autonomy.',
        text: `Analyse the role of consent in Irish criminal law. Your answer should:
1. Explain how consent operates as a defence to assault offences
2. Discuss the limits of consent — activities where consent is no defence
3. Analyse the definition of consent in sexual offences under the Criminal Law (Sexual Offences) Act 2017
4. Evaluate whether the current law adequately protects both autonomy and bodily integrity

Reference R v Brown, The People (DPP) v C, and the Criminal Law (Sexual Offences) Act 2017.`,
      },
      {
        examType: 'Problem',
        description: 'Arson and criminal damage. Recklessness and endangering life.',
        text: `Kevin is angry at his neighbour Frank following a boundary dispute. Late one night, Kevin pours petrol through Frank's letterbox and sets it alight. The fire spreads quickly. Frank escapes unharmed but his house is destroyed. The house next door, owned by an elderly couple, sustains significant smoke damage.

Kevin claims he only intended to frighten Frank and did not think the fire would spread.

Discuss:
1. Kevin's liability for criminal damage / arson under the Criminal Damage Act 1991
2. Whether Kevin's claim of no intention to spread the fire is relevant
3. Liability for the damage to the neighbouring house
4. Whether the offence of endangering life is made out

Reference the Criminal Damage Act 1991 and The People (DPP) v Murray on recklessness.`,
      },
      {
        examType: 'Essay',
        description: 'Duress and necessity as defences. Scope and limits.',
        text: `Compare and contrast the defences of duress and necessity in Irish criminal law. Your answer should:
1. Set out the elements required to establish duress by threats
2. Explain the defence of duress of circumstances / necessity
3. Analyse the crimes to which duress is unavailable as a defence
4. Evaluate whether the current limitations on these defences are justified

Reference R v Hasan, R v Dudley and Stephens, R v Shayler, and The People (DPP) v Byrne.`,
      },
      {
        examType: 'Problem',
        description: 'Sexual assault. Lack of consent and reasonable belief.',
        text: `At a house party, Mark and Sophie, who have met twice before, engage in sexual activity in an upstairs bedroom. Mark contends Sophie consented. Sophie states she was intoxicated, said "stop" at one point, and that Mark continued regardless. CCTV shows Sophie entering the room voluntarily and leaving dishevelled 30 minutes later.

Mark is charged with sexual assault under the Criminal Law (Sexual Offences) Act 2017.

Discuss:
1. The definition of consent under the 2017 Act
2. Whether intoxication affects the validity of consent
3. The impact of Sophie saying "stop" — whether this withdrew consent
4. Whether Mark's honest belief in consent is a defence, and the objective element required

Reference the Criminal Law (Sexual Offences) Act 2017 and The People (DPP) v C.`,
      },
      {
        examType: 'Essay',
        description: 'Corporate criminal liability. Identification doctrine and reform.',
        text: `Critically evaluate the law on corporate criminal liability in Ireland. Your answer should:
1. Explain the identification doctrine and the "directing mind and will" test
2. Analyse the difficulties in prosecuting corporations for serious offences including manslaughter
3. Discuss the Corporate Manslaughter and Corporate Homicide Act 2007 and its applicability to Ireland
4. Evaluate Law Reform Commission proposals for reforming corporate liability

Reference Tesco v Nattrass, R v P&O European Ferries, and the Corporate Manslaughter and Corporate Homicide Act 2007.`,
      },
    ],
  },

  // ─────────────────────────────────────────
  // 5. Tort Law 2023
  // ─────────────────────────────────────────
  {
    subject: 'Tort Law',
    year: 2023,
    questions: [
      {
        examType: 'Problem',
        description:
          'Slip and fall in supermarket. Occupier liability and contributory negligence.',
        text: `Joan slips on a wet floor in FreshMart supermarket. There was no warning sign. A member of staff had mopped the area 10 minutes before and was sent to assist a customer, intending to return and place a sign. Joan suffers a fractured wrist. CCTV shows Joan was looking at her phone when she fell.

Discuss:
1. FreshMart's duty of care as occupier under the Occupiers' Liability Act 1995
2. Whether FreshMart breached its duty
3. Whether Joan is contributorily negligent and the apportionment of liability
4. The extent of recoverable damages

Reference the Occupiers' Liability Act 1995, Rootes v Shelton, and relevant Irish negligence cases.`,
      },
      {
        examType: 'Essay',
        description: 'Pure economic loss. Negligent misstatement and assumption of responsibility.',
        text: `Critically analyse the law on recovery for pure economic loss in Irish tort law. Your answer should:
1. Explain the general rule against recovery for pure economic loss in negligence
2. Analyse the exception for negligent misstatement following Hedley Byrne
3. Discuss the extended Hedley Byrne principle and assumption of responsibility
4. Evaluate whether the current rules on pure economic loss are satisfactory

Reference Hedley Byrne v Heller, Caparo Industries v Dickman, Spring v Guardian Assurance, and Irish authorities.`,
      },
      {
        examType: 'Problem',
        description: 'Psychiatric injury. Primary and secondary victims.',
        text: `A gas explosion at an industrial plant injures several workers. Patrick, a worker at the plant, witnesses his colleague David engulfed in flames. Patrick was not physically injured but develops severe PTSD. Patrick's wife Maria, who receives a phone call from a bystander saying "your husband is dead," also develops severe depression, though Patrick was in fact uninjured.

Patrick and Maria both sue the plant operator in negligence for psychiatric injury.

Discuss:
1. The distinction between primary and secondary victims
2. Whether Patrick satisfies the requirements for a primary victim claim
3. Whether Maria satisfies the Alcock control mechanisms as a secondary victim
4. The "sudden shock" requirement and its application to Maria

Reference Alcock v Chief Constable of South Yorkshire Police, Page v Smith, and Kelly v Hennessy.`,
      },
      {
        examType: 'Essay',
        description: 'Vicarious liability. Scope of employment and the close connection test.',
        text: `Analyse the development of vicarious liability in Irish and English tort law. Your answer should:
1. Explain the traditional "course of employment" test
2. Discuss the close connection test established in Lister v Hesley Hall
3. Analyse the extension of vicarious liability to relationships "akin to employment"
4. Evaluate the policy justifications and limits of vicarious liability

Reference Lister v Hesley Hall, Various Claimants v Catholic Child Welfare Society, Cox v Ministry of Justice, and Irish authorities.`,
      },
      {
        examType: 'Problem',
        description: 'Product liability. Defective medication causing harm.',
        text: `PharmaCo manufactures a painkiller that is approved by the relevant regulatory authority. Six months after market launch, reports emerge of patients suffering liver damage. PharmaCo had conducted clinical trials but did not test long-term use beyond 3 months. Sandra, who took the medication for 6 months as prescribed, suffers liver failure.

Sandra sues PharmaCo under the Liability for Defective Products Act 1991 and in negligence.

Discuss:
1. Whether the painkiller is a "defective product" under the 1991 Act
2. The development risks defence under the Act
3. PharmaCo's liability in negligence
4. Causation difficulties given pre-existing liver conditions in the population

Reference the Liability for Defective Products Act 1991, Donoghue v Stevenson, and A v National Blood Authority.`,
      },
      {
        examType: 'Essay',
        description: 'Nuisance. Private nuisance, public nuisance, and Rylands v Fletcher.',
        text: `Critically evaluate the torts of private nuisance, public nuisance, and the rule in Rylands v Fletcher. Your answer should:
1. Explain the elements of private nuisance and the "reasonable user" test
2. Distinguish private nuisance from the rule in Rylands v Fletcher
3. Analyse the tort of public nuisance and who may sue
4. Evaluate whether these torts remain coherent and fit for purpose in modern law

Reference Rylands v Fletcher, Cambridge Water Co v Eastern Counties Leather, Hunter v Canary Wharf, and Irish authorities on nuisance.`,
      },
      {
        examType: 'Problem',
        description: 'Defamation on social media. Publication, identification, and defences.',
        text: `Ciara, a secondary school teacher, is accused in a tweet by an anonymous account of "failing students and being drunk in class." The tweet is retweeted 2,000 times. Several parents recognise Ciara from the description. Ciara is not named but her school and subject are mentioned. Her school investigates and, after three months, clears her of all wrongdoing.

Ciara sues for defamation. The tweet author is identified as a disgruntled former student.

Discuss:
1. Whether the statement is defamatory
2. Whether Ciara is sufficiently identified
3. Publication and the liability of those who retweeted
4. Any defences available to the defendant including truth and honest opinion

Reference the Defamation Act 2009, Berkoff v Burchill, and Byrne v Deane.`,
      },
      {
        examType: 'Essay',
        description: 'Contributory negligence and volenti. Apportionment and consent to risk.',
        text: `Analyse the defences of contributory negligence and volenti non fit injuria in Irish tort law. Your answer should:
1. Explain the defence of contributory negligence and the Civil Liability Act 1961 apportionment rules
2. Discuss the elements of volenti non fit injuria and the requirement for true consent
3. Analyse the relationship between the two defences
4. Evaluate whether the "seat belt cases" demonstrate a principled approach

Reference Stapley v Gypsum Mines, ICI v Shatwell, Froom v Butcher, and Irish authorities on contributory negligence.`,
      },
      {
        examType: 'Problem',
        description: 'Trespass to the person. False imprisonment and medical battery.',
        text: `Mr Chen is brought to hospital unconscious after a road accident. Surgeons perform emergency surgery to remove his spleen, which was necessary to save his life. On regaining consciousness, Mr Chen states he is a Jehovah's Witness and would have refused the surgery. Later, when doctors recommend a further procedure, Mr Chen refuses. Dr Kelly proceeds anyway, believing Mr Chen lacks capacity due to medication side effects.

Discuss:
1. The lawfulness of the emergency surgery performed while Mr Chen was unconscious
2. Whether the second procedure constitutes battery
3. The legal test for capacity to refuse medical treatment
4. The relationship between the tort of battery and patient autonomy

Reference Re MB (Medical Treatment), Re C (Adult: Refusal of Treatment), and the Assisted Decision-Making (Capacity) Act 2015.`,
      },
      {
        examType: 'Essay',
        description: 'Duty of care. The Caparo three-stage test and its development.',
        text: `Critically evaluate the development of the duty of care in negligence from Donoghue v Stevenson to the present day. Your answer should:
1. Trace the neighbour principle and its expansion in Anns v Merton London Borough
2. Analyse the retreat to the three-stage Caparo test
3. Discuss novel duty situations and the role of incremental development
4. Evaluate whether Irish courts follow Caparo or apply a different approach

Reference Donoghue v Stevenson, Anns v Merton LBC, Caparo Industries v Dickman, and Glencar Exploration v Mayo County Council.`,
      },
    ],
  },

  // ─────────────────────────────────────────
  // 6. Tort Law 2024
  // ─────────────────────────────────────────
  {
    subject: 'Tort Law',
    year: 2024,
    questions: [
      {
        examType: 'Problem',
        description: 'Construction site accident. Employer liability and non-delegable duties.',
        text: `WorkSafe Ltd hires independent contractor FastBuild to carry out demolition work on a city centre site. FastBuild's employee Tomasz is seriously injured when scaffolding collapses due to inadequate inspection. WorkSafe had contracted FastBuild specifically because of their expertise and had not interfered in the work methods.

Tomasz sues WorkSafe directly in negligence.

Discuss:
1. The general rule that an employer is not liable for the torts of an independent contractor
2. Whether a non-delegable duty arises on these facts
3. The employer's own duty of care to on-site contractors
4. Breach, causation, and damages

Reference Woodland v Swimming Teachers Association, Biffa Waste Services v Maschinenfabrik, and the Safety, Health and Welfare at Work Act 2005.`,
      },
      {
        examType: 'Essay',
        description: 'Breach of duty. The standard of care and the reasonable person test.',
        text: `Critically analyse the standard of care in negligence. Your answer should:
1. Explain the objective "reasonable person" standard and its basis
2. Discuss modifications to the standard: professionals, children, and emergency situations
3. Analyse the factors courts consider in assessing breach: probability of harm, magnitude, cost of precautions
4. Evaluate the Bolam test and its reform following Bolitho in medical negligence

Reference Blyth v Birmingham Waterworks, Glasgow Corp v Muir, Nettleship v Weston, Bolam v Friern Hospital, and Bolitho v City and Hackney HA.`,
      },
      {
        examType: 'Problem',
        description: 'Nervous shock after witnessing road accident. Proximity and sudden shock.',
        text: `A school bus is involved in a serious road accident caused by a drunk driver. Among those who witness the aftermath:
- Susan, a parent who happened to be driving past and sees her son trapped in the wreckage
- Robert, a paramedic who attends the scene and spends hours treating seriously injured children
- Anne, who learns of the accident from a news broadcast and identifies her daughter in footage

Only Susan's son survives; Robert suffers PTSD and is unable to work; Anne's daughter is unhurt but Anne develops severe anxiety.

Advise all three claimants.

Reference Alcock v Chief Constable, White v Chief Constable, and Jaensch v Coffey.`,
      },
      {
        examType: 'Essay',
        description: 'Causation in fact and in law. Material contribution and loss of chance.',
        text: `Analyse the rules on causation in Irish tort law. Your answer should:
1. Explain the "but for" test and its application
2. Discuss the material contribution to damage exception following Bonnington Castings
3. Analyse loss of chance as a basis for recovery in medical negligence
4. Evaluate whether the current causation rules produce consistent and just outcomes

Reference Barnett v Chelsea and Kensington Hospital, Fairchild v Glenhaven Funeral Services, Hotson v East Berkshire AHA, and Philp v Ryan.`,
      },
      {
        examType: 'Problem',
        description: 'Online harassment campaign. Harassment Act and data protection.',
        text: `Following a workplace dispute, former colleague Neil begins a sustained online campaign against Lisa. He creates fake social media profiles in her name, posts fabricated reviews claiming she is incompetent, emails her clients with false allegations, and contacts her employer. Lisa loses two major clients and is placed on a performance improvement plan. She suffers severe depression.

Discuss Lisa's causes of action in tort:
1. Harassment under the Non-Fatal Offences Against the Person Act 1997
2. Defamation — the statements to clients and employer
3. Intentional infliction of emotional distress
4. Any data protection issues under GDPR

Reference Khorasandjian v Bush, Wilkinson v Downton, and the Non-Fatal Offences Against the Person Act 1997.`,
      },
      {
        examType: 'Essay',
        description: 'Remedies in tort. Damages — assessment, heads, and mitigation.',
        text: `Critically evaluate the principles governing the award of damages in tort. Your answer should:
1. Distinguish between general and special damages
2. Explain the assessment of non-pecuniary loss: pain and suffering, loss of amenity
3. Analyse the principles for calculating future financial loss
4. Discuss the duty to mitigate and its impact on awards

Reference Wells v Wells, Lim Poh Choo v Camden and Islington AHA, Jobling v Associated Dairies, and the Civil Liability and Courts Act 2004.`,
      },
      {
        examType: 'Problem',
        description: 'Dog attack on public road. Strict liability under Animals Act.',
        text: `Brendan is out jogging when he is attacked by Rex, a German Shepherd owned by his neighbour Paula. Rex had never attacked anyone before but had on several occasions growled aggressively at passersby. Paula knew of this behaviour. Brendan suffers serious lacerations requiring surgery and is unable to work for three months.

Brendan sues Paula in strict liability and negligence.

Discuss:
1. Strict liability under the Animals Act 1985 (or relevant Irish provision)
2. Whether Paula knew of Rex's dangerous propensity
3. Paula's negligence in failing to control Rex
4. Contributory negligence — Brendan ran past Rex's gate at speed

Reference the Animals Act 1985, Mirvahedy v Henley, and relevant Irish authorities on animals liability.`,
      },
      {
        examType: 'Essay',
        description: 'Privacy in Irish law. Constitutional right and tortious protection.',
        text: `Analyse the development of the right to privacy in Irish law. Your answer should:
1. Trace the constitutional right to privacy from Kennedy v Ireland
2. Discuss whether Irish law recognises a tort of invasion of privacy
3. Analyse the "misuse of private information" action in English law and its possible adoption in Ireland
4. Evaluate the interaction between privacy and freedom of expression

Reference Kennedy v Ireland, Murray v Newsgroup, Campbell v MGN, and GDPR provisions on data privacy.`,
      },
      {
        examType: 'Problem',
        description: "Employer's liability for stress at work. Foreseeability and breach.",
        text: `Aoife works as a social worker for the Council. Over two years she raises multiple complaints about excessive caseloads, lack of supervision, and threatening behaviour from clients. Her manager acknowledges the issues but takes no action. Aoife eventually suffers a serious psychiatric breakdown and cannot return to work.

Aoife sues the Council in negligence for work-related stress.

Discuss:
1. The duty of care owed by employers for psychiatric injury
2. The foreseeability threshold — when will employer liability arise for stress?
3. Whether the Council breached its duty on these facts
4. Causation and the relevant damages

Reference Hatton v Sutherland, Barber v Somerset County Council, and Maher v Jabil Global Services.`,
      },
      {
        examType: 'Essay',
        description: 'Trespass to land. Airspace, subsoil, and remedies.',
        text: `Analyse the tort of trespass to land in Irish law. Your answer should:
1. Explain the nature of trespass to land as actionable per se
2. Discuss the extent of ownership — subsoil and airspace rights
3. Analyse the remedies available: injunction, damages, and self-help
4. Evaluate whether trespass to land adequately protects landowners in the context of drone technology

Reference Bernstein v Skyviews, Anchor Brewhouse v Berkley House, and the Air Navigation and Transport Acts.`,
      },
    ],
  },

  // ─────────────────────────────────────────
  // 7. Equity 2023
  // ─────────────────────────────────────────
  {
    subject: 'Equity',
    year: 2023,
    questions: [
      {
        examType: 'Essay',
        description: 'Express trusts. Three certainties and the constitution of trusts.',
        text: `Critically analyse the requirements for the creation of a valid express trust in Irish law. Your answer should:
1. Explain the three certainties: certainty of intention, subject matter, and objects
2. Discuss the constitution of trusts and the maxim "equity will not assist a volunteer"
3. Analyse exceptions to the rule against imperfect gifts: Re Rose, Pennington v Waine
4. Evaluate whether the formality requirements for trusts are too strict

Reference Knight v Knight, McPhail v Doulton, Milroy v Lord, and relevant Irish authorities.`,
      },
      {
        examType: 'Problem',
        description: 'Proprietary estoppel. Representation, reliance, and unconscionability.',
        text: `Noel, aged 70, repeatedly tells his nephew Ciaran "this farm will be yours when I'm gone, start working it now." Ciaran, relying on this promise, gives up a well-paid job in Dublin, moves to the farm, invests €80,000 of his own money in improvements, and works the farm for 8 years. Noel dies leaving a will giving the farm entirely to his daughter.

Discuss:
1. Whether a proprietary estoppel claim arises
2. The elements of representation, reliance, and detriment
3. How the court should exercise its discretion in satisfying the equity
4. Whether Ciaran is entitled to the farm itself or only compensation

Reference Thorner v Major, Gillett v Holt, Jennings v Rice, and Irish authorities on proprietary estoppel.`,
      },
      {
        examType: 'Essay',
        description: 'Constructive trusts. Common intention and unjust enrichment.',
        text: `Analyse the role of constructive trusts in Irish law. Your answer should:
1. Explain institutional versus remedial constructive trusts
2. Discuss the common intention constructive trust in family home cases
3. Analyse constructive trusts arising from unconscionable conduct
4. Evaluate whether Irish law should formally adopt the remedial constructive trust

Reference Hussey v Palmer, Keech v Sandford, Stack v Dowden, and W v W [Irish Supreme Court].`,
      },
      {
        examType: 'Problem',
        description: 'Breach of fiduciary duty by company director. No-profit rule and remedies.',
        text: `Adrian is a director of TechStart Ltd. While negotiating a major software contract on behalf of TechStart, Adrian learns that the client company is planning a significant expansion. Without telling TechStart, Adrian forms a personal company and signs a separate consulting contract with the same client, earning €200,000. TechStart loses the main contract.

Discuss:
1. Adrian's fiduciary duties as director
2. The no-profit and no-conflict rules
3. Whether TechStart can claim the €200,000 Adrian earned
4. Whether ratification by shareholders is possible

Reference Boardman v Phipps, Regal (Hastings) v Gulliver, IDC v Cooley, and the Companies Act 2014.`,
      },
      {
        examType: 'Essay',
        description: 'Tracing and following. Common law and equitable tracing rules.',
        text: `Critically evaluate the rules on tracing and following in English and Irish equity. Your answer should:
1. Distinguish between following property and tracing its value
2. Explain the limitations on common law tracing
3. Analyse equitable tracing through mixed funds: Clayton's Case and alternatives
4. Evaluate whether the rules on tracing are coherent and require reform

Reference Foskett v McKeown, Re Hallett's Estate, Barlow Clowes v Vaughan, and Lipkin Gorman v Karpnale.`,
      },
      {
        examType: 'Problem',
        description: 'Secret trust. Fully secret and half-secret trusts.',
        text: `In his will, Patrick leaves €100,000 to his friend James "absolutely." Unknown to the beneficiaries, James had privately agreed with Patrick before his death that he would hold the money on trust for Patrick's secret family. Patrick also leaves €50,000 to Mary "to be held on trust for purposes I have communicated to her." The communication to Mary was made after the will was executed.

Discuss:
1. Whether a fully secret trust arises in relation to James
2. Whether the half-secret trust in relation to Mary is valid given late communication
3. The theoretical basis for secret trusts — dehors the will theory
4. Any differences between the treatment of fully and half-secret trusts

Reference McCormick v Grogan, Re Keen, Blackwell v Blackwell, and Irish authorities on secret trusts.`,
      },
      {
        examType: 'Essay',
        description: 'Charitable trusts. Definition, requirements, and cy-près doctrine.',
        text: `Analyse the law on charitable trusts in Ireland. Your answer should:
1. Explain the four heads of charity under the Charities Act 2009
2. Discuss the public benefit requirement
3. Analyse the cy-près doctrine and when it applies
4. Evaluate the Charities Act 2009 as a modernisation of charity law

Reference Income Tax Special Purposes Commissioners v Pemsel, Re Resch's Will Trusts, and the Charities Act 2009.`,
      },
      {
        examType: 'Problem',
        description: 'Resulting trust on relationship breakdown. Family home contributions.',
        text: `Sean and Orla are an unmarried couple who purchase a house for €400,000. Sean pays €280,000 and Orla pays €120,000. The property is registered in Sean's name alone because the bank required it due to Orla's credit history. They live together for 7 years. Orla also pays all household bills (€1,500/month) and Sean pays the mortgage.

After separation, Sean argues the property is his alone. Orla claims a beneficial interest.

Discuss:
1. Whether a resulting trust arises from Orla's direct contribution
2. Whether Orla's indirect contributions (household bills) give rise to any interest
3. Whether a common intention constructive trust applies
4. How the court would quantify Orla's interest

Reference Pettitt v Pettitt, Gissing v Gissing, Stack v Dowden, and W v W.`,
      },
      {
        examType: 'Essay',
        description: 'Injunctions. Interlocutory relief and the American Cyanamid principles.',
        text: `Critically analyse the law on interlocutory injunctions in Irish law. Your answer should:
1. Explain the principles established in American Cyanamid
2. Discuss the Irish approach following Campus Oil v Minister for Industry
3. Analyse mandatory interlocutory injunctions and the higher threshold
4. Evaluate mareva and Anton Piller orders as exceptional remedies

Reference American Cyanamid v Ethicon, Campus Oil v Minister for Industry, Keegan v de Búrca, and Bambrick v Cobley.`,
      },
      {
        examType: 'Problem',
        description: 'Dishonest assistance and knowing receipt. Third party liability.',
        text: `Graham, a solicitor, assists his client Victor in transferring €500,000 from Victor's company to offshore accounts. Graham suspects but does not confirm that the money belongs to Victor's business partners. The partners discover the fraud. Victor has disappeared.

The partners seek to recover the money from Graham.

Discuss:
1. Whether Graham is liable for dishonest assistance in a breach of fiduciary duty
2. The test for dishonesty following Twinsectra v Yardley / Barlow Clowes
3. Whether knowing receipt arises if Graham received any fees
4. The remedies available against Graham

Reference Royal Brunei Airlines v Tan, Twinsectra v Yardley, BCCI v Akindele, and Barlow Clowes v Eurotrust.`,
      },
    ],
  },

  // ─────────────────────────────────────────
  // 8. Equity 2024
  // ─────────────────────────────────────────
  {
    subject: 'Equity',
    year: 2024,
    questions: [
      {
        examType: 'Essay',
        description: 'Resulting trusts. Automatic vs presumed, advancement, unjust enrichment.',
        text: `Critically analyze the role of resulting trusts in modern Irish law. Your answer should:
1. Explain the nature and purpose of resulting trusts
2. Distinguish between automatic and presumed resulting trusts
3. Discuss the presumption of advancement and its contemporary relevance
4. Evaluate whether resulting trusts remain necessary given developments in unjust enrichment

Reference key cases including Dyer v Dyer, Pettitt v Pettitt, and Stack v Dowden. Consider academic commentary and Law Reform Commission recommendations where relevant.`,
      },
      {
        examType: 'Problem',
        description: 'Family home purchase contribution. Common intention constructive trust.',
        text: `Michael and Sarah purchase a family home for €400,000. Michael contributes €300,000 and Sarah €100,000. The property is registered solely in Michael's name because Sarah has poor credit history. After 10 years, the relationship breaks down. Sarah claims she is entitled to a beneficial interest. Michael argues the property is his alone and Sarah's contribution was a gift.

Sarah provides evidence that they both intended to share ownership equally, she paid household bills and mortgage for 5 years, Michael repeatedly referred to it as "our house," and she gave up her job to care for Michael's elderly parents.

Discuss:
1. Whether a resulting trust arises from Sarah's contribution
2. Common intention constructive trust principles
3. Proprietary estoppel arguments
4. Quantification of Sarah's beneficial interest

Reference Stack v Dowden, Pettitt v Pettitt, Oxley v Hiscock, and Irish authorities on family property.`,
      },
      {
        examType: 'Problem',
        description: 'Breach of fiduciary duty by solicitor. Account of profits and rescission.',
        text: `Solicitor James acts for elderly client Mrs Murphy in selling her valuable city-centre property. James learns the property is worth €800,000 but tells Mrs Murphy it is only worth €500,000 due to "market conditions." James arranges for his brother-in-law to purchase the property for €500,000. Six months later, the brother-in-law sells for €850,000. Mrs Murphy discovers the truth.

Discuss:
1. Whether James breached his fiduciary duties
2. The no-profit and no-conflict rules
3. Available equitable remedies including account of profits and rescission
4. Whether Mrs Murphy can claim the €350,000 profit

Reference Keech v Sandford, Boardman v Phipps, Bristol and West Building Society v Mothew, and principles of fiduciary obligations.`,
      },
      {
        examType: 'Essay',
        description: 'Equitable maxims and discretionary remedies. Certainty vs flexibility.',
        text: `"Equity's discretionary nature and reliance on maxims creates uncertainty and inconsistency in its application."

Critically evaluate this statement. Your answer should:
1. Explain key equitable maxims (clean hands, equity aids the vigilant, equity follows the law)
2. Discuss the discretionary nature of equitable remedies
3. Analyse whether discretion creates unacceptable uncertainty
4. Consider calls for reform or codification of equitable principles

Reference relevant case law and academic commentary on equity's role in modern Irish and English law.`,
      },
      {
        examType: 'Problem',
        description: 'Pension fund misapplication. Breach of trust and personal remedies.',
        text: `Three trustees of a pension fund, acting on the advice of their investment manager, transfer €2m of pension fund assets into a property development scheme that was not authorised by the trust deed. The development collapses and the fund loses €1.5m. The investment manager has gone into liquidation. One trustee, David, dissented in writing. The other two, Ann and Barry, approved without reading the full investment report.

Discuss:
1. Whether Ann and Barry are in breach of trust
2. The standard of care expected of trustees
3. Whether David has any liability
4. The remedies available to the pension fund beneficiaries

Reference Speight v Gaunt, Learoyd v Whiteley, Nestlé v National Westminster Bank, and the Trustee Act 1893.`,
      },
      {
        examType: 'Essay',
        description: 'Unconscionable bargains and undue influence. Protecting the vulnerable.',
        text: `Analyse the equitable doctrines of unconscionable bargains and undue influence in Irish law. Your answer should:
1. Explain the elements required to set aside an unconscionable bargain
2. Distinguish actual and presumed undue influence
3. Analyse the relationship between undue influence and non est factum
4. Evaluate whether equity adequately protects vulnerable parties in commercial transactions

Reference Lloyds Bank v Bundy, Royal Bank of Scotland v Etridge, Grealish v Murphy, and Carroll v Carroll.`,
      },
      {
        examType: 'Problem',
        description: 'Trustee investment decision. Proper purposes and delegation.',
        text: `Rachel is sole trustee of a trust fund worth €1m, held for her three adult nieces in equal shares. Without consulting the beneficiaries, Rachel:
(a) Invests €400,000 in her husband's start-up company (which fails, losing the investment)
(b) Delegates all investment decisions to a financial adviser who charges excessive fees
(c) Pays herself €30,000 for "administrative work" from the trust fund

Discuss Rachel's liability for each of the above acts.

Reference the Trustee Act 1893, Bartlett v Barclays Bank, Re Whiteley, and the relevant provisions of equity on self-dealing trustees.`,
      },
      {
        examType: 'Essay',
        description: 'Equity and the common law. Fusion debate and fusion fallacy.',
        text: `"The fusion of equity and common law following the Judicature Acts was procedural only; the two systems remain substantively distinct."

Critically evaluate this statement. Your answer should:
1. Explain the historical relationship between equity and common law
2. Analyse the effect of the Judicature Acts 1873-1875 and the Supreme Court of Judicature Act 1877
3. Discuss the "fusion fallacy" debate — whether substantive fusion is possible or desirable
4. Evaluate the extent to which equity and common law have in fact merged in modern Irish law

Reference United Scientific Holdings v Burnley, Tinsley v Milligan, Giumelli v Giumelli, and relevant academic commentary.`,
      },
      {
        examType: 'Problem',
        description: 'Variation of trust. Saunders v Vautier and Variation of Trusts Act.',
        text: `A testamentary trust was set up in 1990 for David's children "until the youngest reaches 25." The trust is now worth €3m. The three children are aged 22, 25, and 28. They want to:
(a) Terminate the trust and distribute the fund equally
(b) Alternatively, vary the trust to include David's grandchildren as beneficiaries
(c) The eldest wants her share moved offshore to reduce Irish tax liability

Advise the trustees.

Reference Saunders v Vautier, Re Steed's Will Trusts, Variation of Trusts Act 1958, and Irish Revenue provisions.`,
      },
      {
        examType: 'Problem',
        description: 'Mareva injunction application. Assets at risk of dissipation.',
        text: `MediaCo successfully obtains a judgment for €800,000 against AdFraud Ltd after a fraud. MediaCo discovers that AdFraud has begun transferring assets to accounts in Gibraltar and has listed its Dublin office building for sale. MediaCo seeks a Mareva injunction to freeze AdFraud's assets pending enforcement.

AdFraud argues:
- There is no real risk of dissipation
- A Mareva would damage its legitimate business operations
- MediaCo has delayed in bringing the application

Discuss:
1. The requirements for a Mareva injunction
2. Whether the facts disclose a sufficient risk of dissipation
3. The balance of convenience
4. The impact of any delay by MediaCo

Reference Mareva Compania Naviera SA v International Bulkcarriers, Babanaft International v Bassatne, and O'Mahony v Horgan.`,
      },
    ],
  },
];

async function main() {
  console.log('🌱 Starting essay question seed...\n');

  // Step 1: Wipe all existing questions
 console.log('🗑️  Wiping related records...');
 await prisma.quizAttempt.deleteMany({});
 await prisma.questionAttempt.deleteMany({});
 await prisma.essayAttempt.deleteMany({});
 await prisma.timedSession.deleteMany({});

  let totalSeeded = 0;

  for (const entry of essayData) {
    console.log(`📚 Seeding: ${entry.subject} ${entry.year} (${entry.questions.length} questions)`);

    for (let i = 0; i < entry.questions.length; i++) {
      const q = entry.questions[i];
      if (!q) continue;

      await prisma.question.create({
        data: {
          type: 'ESSAY',
          subject: entry.subject,
          year: entry.year,
          examType: q.examType,
          description: q.description,
          text: q.text,
          order: i + 1,
          points: 20,
          isPublished: true,
        },
      });
    }

    console.log(`   ✅ ${entry.questions.length} questions seeded`);
    totalSeeded += entry.questions.length;
  }

  console.log(`\n🎉 Done! Total questions seeded: ${totalSeeded}`);
  console.log(`   📊 Breakdown:`);
  for (const entry of essayData) {
    console.log(`   - ${entry.subject} ${entry.year}: ${entry.questions.length} questions`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
