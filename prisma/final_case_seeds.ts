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

// ✅ REPLACE THIS ARRAY EACH TIME
const rawCases = [
  {
    case_name: 'Armory v Delamirie',
    citation: '(1722) 1 Strange 505',
    year: 1722,
    court: "King's Bench",
    jurisdiction: 'England',
    legal_principle:
      'A finder of a chattel, though not the true owner, acquires a possessory title good against the whole world except the true owner. The finder is entitled to possession of the found item against all but the rightful owner.',
    key_quote:
      'The finder of a jewel, though he does not by such finding acquire an absolute property or ownership, yet he has such a property as will enable him to keep it against all but the rightful owner.',
    full_summary:
      "A chimney sweep's boy found a jewel and took it to a goldsmith's shop. The goldsmith's apprentice, on pretence of weighing it, removed the stones. The court held that the finder of a chattel, even though not the true owner, acquires a possessory title good against all the world except the true owner. The chimney sweep's boy was entitled to succeed against the goldsmith. The case established the fundamental rule that possession gives a possessory title enforceable against all except those with a better right. This principle is foundational to the law of finders and has been applied in countless subsequent cases dealing with lost or abandoned property. The title is defeasible only upon the emergence of the true owner. The right of the finder is real and enforceable in law.",
    subjects: ['property-law'],
    topics: ['finders', 'possessory title', 'chattels', 'lost property'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2018', 'FE-1 Property 2020'],
  },
  {
    case_name: 'Parker v British Airways Board',
    citation: '[1982] QB 1004',
    year: 1982,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      'An occupier of premises has a better title than a finder to chattels found on those premises only where the occupier has manifested an intention to exercise control over the premises and things on them before the finding. An employee finding an item in the course of employment finds for their employer.',
    key_quote:
      'The occupier of a building has rights superior to those of a finder over chattels upon or in, but not forming part of, the real property, if, but only if, before the chattel is found, he has manifested an intention to exercise control over the building and the things which may be upon it or in it.',
    full_summary:
      'Parker found a gold bracelet in the executive lounge of an airport operated by British Airways. He handed it to an employee, but after six weeks no true owner was found. He sought possession of the bracelet but British Airways refused. The Court of Appeal held that an occupier can claim priority over a finder only if the occupier had manifested a clear intention to exercise control over the premises and items found therein. British Airways had not done so in a public executive lounge, and Parker as finder was entitled to the bracelet. The court distinguished between items found in genuinely private premises (where the occupier would generally prevail) and semi-public spaces. The case sets out the key tests for resolving disputes between finders and occupiers.',
    subjects: ['property-law'],
    topics: ['finders', 'possessory title', 'occupier', 'lost property'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2019', 'FE-1 Property 2022'],
  },
  {
    case_name: 'Hannah v Peel',
    citation: '[1945] KB 509',
    year: 1945,
    court: "King's Bench Division",
    jurisdiction: 'England',
    legal_principle:
      'An owner of land who has never been in actual possession of premises does not have a better title to an article found there than the finder. Physical possession of premises is necessary to assert superior rights over a finder.',
    key_quote:
      'The defendant was never physically in possession of these premises at any time prior to the finding, and a man cannot in my judgment be said to be in possession of a thing of which he is ignorant.',
    full_summary:
      "Peel owned a house that had been requisitioned by the military during World War II. He had never actually occupied it. A soldier, Hannah, found a brooch in a crevice in a window frame. No true owner was found and Hannah sought to recover the brooch. The court held that Peel, having never been in physical possession of the house, could not assert a superior title to the brooch over Hannah as finder. This case qualified the general rule that landowners are entitled to items found on their land, establishing that actual possession (not mere ownership) is a prerequisite for the landowner's claim. The finder was awarded the brooch. The decision has been influential in shaping the boundary between finder's and landowner's rights.",
    subjects: ['property-law'],
    topics: ['finders', 'possessory title', 'landowner', 'actual possession'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2017', 'FE-1 Property 2021'],
  },
  {
    case_name: 'Waverley Borough Council v Fletcher',
    citation: '[1996] QB 334',
    year: 1996,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      'Items found in the ground (as opposed to on the surface) belong to the owner of the land, not to the finder. A landowner in possession of land has better title than a trespassing or lawful finder to articles embedded in the soil.',
    key_quote:
      'An object in the ground is part of the land and belongs to the landowner who has better title than the finder.',
    full_summary:
      "Fletcher used a metal detector in a public park owned by Waverley Borough Council and found a medieval gold brooch buried about nine inches underground. The local authority claimed it. The Court of Appeal held that items embedded in the ground belong to the landowner and the council was entitled to the brooch. The court distinguished between items found on the surface (where Parker v British Airways principles apply) and items embedded in the land, which are treated as part of the land itself. The landowner's title to embedded items is superior irrespective of manifested intention to control. This remains a key distinction in finders cases: surface finds versus sub-surface finds attract different rules.",
    subjects: ['property-law'],
    topics: ['finders', 'landowner', 'embedded items', 'metal detecting'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2018', 'FE-1 Property 2023'],
  },
  {
    case_name: 'Elwes v Brigg Gas Co',
    citation: '(1886) 33 ChD 562',
    year: 1886,
    court: 'Chancery Division',
    jurisdiction: 'England',
    legal_principle:
      'An object embedded in land belongs to the landowner by virtue of ownership of the land itself, and a lessee who discovers it cannot claim title against the freeholder. The owner of the soil owns everything below the surface.',
    key_quote:
      'The plaintiff as owner of the inheritance was entitled to the boat as against the defendant, the boat being part of the land.',
    full_summary:
      "A prehistoric boat was discovered buried in the soil during excavations by a gas company that had leased the land. The question was whether the boat belonged to the freeholder Elwes or to the gas company that had found it. The court held that the prehistoric boat, being embedded in the soil, was part of the freehold and belonged to Elwes as landowner. The gas company, though in possession of the land under a lease, had no better title to objects embedded in the soil than the freeholder possessed. This case, read alongside Waverley v Fletcher, establishes that 'cuius est solum' extends to items embedded underground, and confirms the freeholder's superior claim even against tenants in actual possession.",
    subjects: ['property-law'],
    topics: ['finders', 'fixtures', 'embedded objects', 'freehold', 'lease'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Webb v Ireland',
    citation: '[1988] IR 353',
    year: 1988,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "In Ireland, treasure trove belongs to the State as an incident of sovereignty. A finder of treasure trove cannot claim ownership, and the constitutional guarantee of private property does not override the State's entitlement to treasure trove as a matter of public interest.",
    key_quote:
      'Treasure trove belongs to the State by virtue of the prerogative of the State and no private person can claim it.',
    full_summary:
      "The Webbs found a hoard of Bronze Age artefacts (the Derrynaflan Hoard) on private land. They sought ownership or substantial compensation from the State. The Supreme Court held that treasure trove belongs to the State as an incident of sovereignty derived from the prerogative rights of the Crown which passed to the Irish State on independence. The National Monuments Act 1930 reinforced State ownership. Although the court found the State was not obliged to pay full market value, it recognised a moral obligation to pay some reward for finds of national importance. This case is significant in Irish property law as it distinguishes the Irish position from English law on finders' entitlements and underlines State control over archaeological heritage.",
    subjects: ['property-law'],
    topics: ['finders', 'treasure trove', 'state ownership', 'national monuments', 'Ireland'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2015', 'FE-1 Property 2019', 'FE-1 Property 2022'],
  },
  {
    case_name: 'Tamworth Industries Ltd v Attorney-General',
    citation: '[1991] 3 NZLR 616',
    year: 1991,
    court: 'High Court of New Zealand',
    jurisdiction: 'New Zealand',
    legal_principle:
      'Money found hidden on land (not technically treasure trove) belongs to the landowner rather than the finder, as it is treated as being in the constructive possession of the landowner.',
    key_quote:
      'Money found hidden on property is in the constructive possession of the landowner and cannot be retained by the finder.',
    full_summary:
      "A large quantity of cash was discovered hidden in a property. The finder argued possession but the court held that currency concealed in land is in the constructive possession of the landowner. This New Zealand decision is cited in Irish and English property law courses as persuasive authority on the treatment of found money as distinct from ordinary chattels. The case illustrates the tension between traditional finders rules and the landowner's possession-based claim. It reinforces the principle that for items secreted in land or in a building, the occupier/owner's constructive possession is treated as giving them priority over the finder. The case is discussed alongside Parker v British Airways and Waverley v Fletcher in analysis of finders' rights.",
    subjects: ['property-law'],
    topics: ['finders', 'constructive possession', 'hidden money', 'landowner'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'NCA v Flack',
    citation: '[2020] EWCA Civ 1143',
    year: 2020,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      'A person who finds money does not acquire good title if they dishonestly appropriate it. The National Crime Agency can seize cash found by a third party if there are reasonable grounds to suspect it is connected to unlawful conduct.',
    key_quote:
      'A finder who dishonestly appropriates money found has no title to retain it against a law enforcement agency entitled to seize it.',
    full_summary:
      "A large quantity of cash was found in a car park by Flack, who failed to hand it to police. The NCA applied for its forfeiture. The Court of Appeal held that the finder's possessory title was defeated by the statutory forfeiture provisions applicable to cash reasonably suspected of being criminal proceeds. The court confirmed that finders' rights are not absolute and can be overridden where cash is the proceeds of crime. This recent case is important for updating the traditional finders law in the context of criminal property legislation. It also touched on the distinction between honest and dishonest appropriation by finders, with a dishonest finder having no enforceable possessory title. Relevant to both property law and criminal law.",
    subjects: ['property-law'],
    topics: ['finders', 'possessory title', 'criminal proceeds', 'forfeiture', 'NCA'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Leigh v Taylor',
    citation: '[1902] AC 157',
    year: 1902,
    court: 'House of Lords',
    jurisdiction: 'England',
    legal_principle:
      'A chattel affixed to land becomes a fixture (and thus part of the land) or remains a chattel depending on: (1) the degree of annexation and (2) the purpose of annexation. Items affixed for the better enjoyment of the chattel itself remain chattels; items affixed to improve the land become fixtures.',
    key_quote:
      'The degree of annexation and the object and purpose of the annexation are the two tests to be applied in determining whether an article is a chattel or a fixture.',
    full_summary:
      "Tapestries were attached to a wall using tacks and a wooden framework specifically designed to display them advantageously. On the death of a life tenant, the question arose whether they were fixtures (passing to the remainderman) or chattels (part of the tenant's personal estate). The House of Lords held they were chattels, not fixtures: they were attached to the wall solely for the purpose of their better enjoyment as objects, not to improve the land. The degree of annexation was minimal and the purpose was to display art, not to improve the realty. This case, with Holland v Hodgson, remains the foundational authority on the chattel/fixture distinction and is applied whenever the status of annexed objects is in dispute in land transactions or probate matters.",
    subjects: ['property-law'],
    topics: ['fixtures', 'chattels', 'degree of annexation', 'purpose of annexation'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2020'],
  },
  {
    case_name: 'Hulme v Bingham',
    citation: '[2017] EWHC 2732 (Ch)',
    year: 2017,
    court: 'Chancery Division',
    jurisdiction: 'England',
    legal_principle:
      'Garden ornaments and statues may be fixtures if they are sufficiently annexed to the land and the purpose of annexation relates to the permanent improvement or embellishment of the land, not merely the enjoyment of the item itself.',
    key_quote:
      'Whether garden ornaments are fixtures depends on applying the two-stage test of degree and purpose of annexation with close attention to the particular circumstances.',
    full_summary:
      'A dispute arose over several items in a garden, including ornamental statues and planters, when a property was sold. The buyer claimed they passed with the land as fixtures; the seller maintained they were chattels. The court applied the classic two-stage Leigh v Taylor/Holland v Hodgson test and found that some items (statues resting on plinths integrated into the garden landscape) were fixtures, while others (moveable planters) remained chattels. The case illustrates that garden ornaments are treated differently depending on the degree of physical attachment and whether the annexation was intended to be permanent. Modern decisions on fixtures continue to apply the same Victorian-era tests and this case provides a useful worked example for FE-1 candidates.',
    subjects: ['property-law'],
    topics: ['fixtures', 'chattels', 'garden ornaments', 'degree of annexation'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Botham v TSB Bank plc',
    citation: '(1996) 73 P&CR D1',
    year: 1996,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      "A mortgagee's security extends to fixtures but not to chattels. The degree and purpose of annexation tests are applied to each disputed item; kitchen units and bathroom fittings installed as part of the building are fixtures, while free-standing appliances are chattels.",
    key_quote:
      'The degree of annexation and the object and purpose of annexation remain the touchstone for the chattel/fixture distinction, particularly in mortgage and conveyancing disputes.',
    full_summary:
      'TSB Bank as mortgagee sought possession of a flat and claimed various fittings installed by the mortgagor passed with the property. A detailed list of items was disputed including kitchen units, bathroom suites, light fittings, carpets and free-standing appliances. The Court of Appeal applied the degree and purpose of annexation tests to each item in turn, holding that fitted kitchen units, bathroom suites, and built-in light fittings were fixtures, but carpets (usually chattel in domestic premises) and free-standing white goods were not. This case is very practically important for conveyancing, mortgage transactions, and understanding what passes on a sale of land. The itemised analysis provides useful guidance for candidates on the application of fixture tests.',
    subjects: ['property-law'],
    topics: ['fixtures', 'chattels', 'mortgage', 'conveyancing', 'domestic fittings'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2018', 'FE-1 Property 2021'],
  },
  {
    case_name: 'Shires v Glascock',
    citation: '(1688) 2 Salk 688',
    year: 1688,
    court: "King's Bench",
    jurisdiction: 'England',
    legal_principle:
      "A tenant may remove trade fixtures erected by them during the term of the tenancy. The right to remove trade fixtures is an exception to the general rule that fixtures become part of the landlord's land.",
    key_quote:
      'A tenant may remove trade fixtures erected by him during the tenancy, so long as removal occurs before or at the end of the term.',
    full_summary:
      'This early case established the important principle that trade fixtures — items installed by a tenant for the purposes of their trade or business — can be removed by the tenant during or at the end of the tenancy. Without this exception, the strict rule that fixtures become part of the land would cause injustice to tenants who invest in equipment for their businesses. The rule was later extended to ornamental and domestic fixtures in some contexts. The case sits at the foundation of the trade fixtures doctrine that is still applied in landlord and tenant law today. Tenants must remove trade fixtures before the end of the term; after expiry they pass to the landlord. This principle is frequently tested in conjunction with the general chattel/fixture distinction.',
    subjects: ['property-law'],
    topics: ['fixtures', 'trade fixtures', 'tenancy', 'landlord and tenant'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Bull v Bull',
    citation: '[1955] 1 QB 234',
    year: 1955,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      "Where a mother and son purchase property together but legal title is taken in the son's name alone, a resulting trust arises in the mother's favour proportionate to her contribution. A co-owner has a right to occupy the property and cannot be excluded by the other co-owner acting unilaterally.",
    key_quote:
      'The son and his mother were tenants in common and the mother could not be excluded from occupation of the premises by the son alone.',
    full_summary:
      "A mother and son purchased a house together, the mother contributing part of the purchase price. Legal title was taken in the son's name only. When the son later married and sought to exclude his mother from the property, she claimed a beneficial interest. The Court of Appeal held that the mother held a beneficial interest under a resulting trust proportionate to her contribution, and as a tenant in common she was entitled to remain in occupation. The son could not unilaterally exclude her. This case illustrates both the creation of resulting trusts in co-purchase situations and the right of a co-owner to occupy shared property. It established that a bare legal owner cannot deprive a beneficial co-owner of their right to occupy.",
    subjects: ['property-law'],
    topics: [
      'co-ownership',
      'resulting trust',
      'tenancy in common',
      'occupation rights',
      'beneficial interest',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2015', 'FE-1 Property 2019'],
  },
  {
    case_name: 'Dennis v McDonald',
    citation: '[1982] Fam 63',
    year: 1982,
    court: 'Family Division',
    jurisdiction: 'England',
    legal_principle:
      "Where a co-owner is excluded from occupation of the family home by the other co-owner's conduct, the court may order an occupation rent to be paid by the co-owner in exclusive occupation to the excluded co-owner.",
    key_quote:
      'Where one co-owner excludes the other from the property, the excluding co-owner may be ordered to pay an occupation rent to the excluded co-owner.',
    full_summary:
      "Following the breakdown of a relationship, the female co-owner was effectively excluded from the family home by the male co-owner's behaviour. On an application for sale and division, the court considered whether the co-owner in occupation should account to the excluded co-owner for an occupation rent during the period of exclusion. The court held that where one co-owner is excluded — either physically or constructively — by the other, the court has jurisdiction to order an occupation rent. This is an equitable remedy reflecting the fact that the excluded co-owner has been deprived of their right to enjoy the property. The case is important in partition and sale proceedings where one party has had exclusive use of the property.",
    subjects: ['property-law'],
    topics: ['co-ownership', 'occupation rent', 'exclusion', 'beneficial interest', 'partition'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Jones v Jones',
    citation: '[1977] 1 WLR 438',
    year: 1977,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      'In disputes over beneficial co-ownership, a court will look at the common intention of the parties at the time of acquisition of the property and any subsequent conduct. A resulting trust arises proportionate to financial contributions where there is no other evidence of common intention.',
    key_quote:
      'The court must ascertain the true beneficial interest in the property having regard to the conduct of the parties throughout their relationship and their financial contributions.',
    full_summary:
      "A father bought a house in which his son and daughter-in-law came to live. Disputes arose after the breakdown of the family relationship. The court examined the beneficial ownership of the property by reference to the common intention of the parties and their financial contributions. This case is a useful illustration of how courts approach the determination of beneficial interests in co-ownership disputes, particularly where legal title is in one person's name but another has made contributions or there was an agreement to share. The resulting trust and common intention constructive trust analysis are both engaged. The case remains part of the Irish and English curriculum as an example of the general approach to family property disputes.",
    subjects: ['property-law'],
    topics: [
      'co-ownership',
      'resulting trust',
      'common intention',
      'constructive trust',
      'beneficial interest',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Burgess v Rawnsley',
    citation: '[1975] Ch 429',
    year: 1975,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      'A joint tenancy can be severed by an oral agreement between the co-owners to treat the property as held in distinct shares, or by a course of dealings inconsistent with a joint tenancy. Severance converts the joint tenancy into a tenancy in common.',
    key_quote:
      "An oral agreement between joint tenants to sell one party's share suffices to effect a severance of the joint tenancy in equity.",
    full_summary:
      "An unmarried couple held a house as joint tenants. They had agreed orally that one would buy out the other's share for a specific sum. The deal fell through but the question arose whether a severance had occurred. The Court of Appeal held that the oral agreement, even though not completed, amounted to a course of dealings sufficient to sever the joint tenancy in equity. The right of survivorship was therefore defeated and the deceased's share passed under their estate rather than to the survivor. This case is highly significant because it shows that severance can occur informally without a written document, and that a mere agreement to treat shares as separate can suffice. Lord Denning discussed the various methods of severance under Williams v Hensman.",
    subjects: ['property-law'],
    topics: ['co-ownership', 'joint tenancy', 'severance', 'tenancy in common', 'survivorship'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2020', 'FE-1 Property 2023'],
  },
  {
    case_name: 'Cawley v Lillis',
    citation: '[2011] IEHC 515',
    year: 2011,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In Irish law, a co-owner seeking an order for partition or sale must satisfy the court that it is fair and equitable in all the circumstances. The court applies a broad discretion, considering the interests of all co-owners including any who oppose sale.',
    key_quote:
      'The court has a broad discretion in applications for partition or sale in lieu of partition and must consider what is fair and equitable in all the circumstances of the case.',
    full_summary:
      "Cawley and Lillis were unmarried co-owners of a property who had separated. Cawley sought an order for sale of the property under the Partition Acts. Lillis opposed the sale, arguing she should be permitted to remain in occupation. The High Court considered the court's discretion in partition applications in Irish law, noting that even where a co-owner is entitled to seek a sale, the court may impose conditions or delay the order if justice requires. The case discusses the Partition Act 1868 and the Partition Act 1876 as applied in Ireland, and the factors relevant to the court's discretion. It is an important Irish authority on co-ownership disputes and the right to seek partition or sale, particularly in post-relationship property division cases.",
    subjects: ['property-law'],
    topics: ['co-ownership', 'partition', 'sale in lieu', 'Ireland', 'family home'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2017', 'FE-1 Property 2022'],
  },
  {
    case_name: 'Re Kennedy',
    citation: '[1984] ILRM 529',
    year: 1984,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Where spouses hold property as joint tenants, a joint tenancy cannot be severed unilaterally by one spouse without the consent of the other under Irish law, having regard to the protections afforded by the Family Home Protection Act 1976.',
    key_quote:
      'The Family Home Protection Act 1976 must be read as curtailing the ability of one spouse to deal with or sever the joint tenancy in the family home without the prior written consent of the other spouse.',
    full_summary:
      'This Irish case examined the interaction between the rules of co-ownership and the Family Home Protection Act 1976. The court held that the special protections afforded to the family home in Irish law constrain the ordinary rules on severance of a joint tenancy. A spouse cannot unilaterally sever a joint tenancy in the family home without the written consent of the other spouse as required by the 1976 Act. The decision underlines the centrality of the family home in Irish law and the significant departure from the English position on severance. The case is frequently referenced in Irish property law when discussing the interplay of co-ownership rules with family law protections.',
    subjects: ['property-law'],
    topics: [
      'co-ownership',
      'joint tenancy',
      'severance',
      'Family Home Protection Act 1976',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2018', 'FE-1 Property 2021'],
  },
  {
    case_name: 'Todd v Cinelli',
    citation: '[2020] IEHC 320',
    year: 2020,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In disputes concerning beneficial ownership of co-owned property in Ireland, the court applies a common intention constructive trust analysis. Unilateral mortgage payments and home improvements can be evidence of a common intention to share beneficially beyond legal title.',
    key_quote:
      'The court will look to all the circumstances, including financial contributions and the conduct of the parties, to ascertain the extent of any beneficial interest claimed.',
    full_summary:
      "Todd and Cinelli had purchased a property together and separated. Todd sought to establish a beneficial interest greater than their nominal legal share on the basis of mortgage payments made during the relationship and improvements carried out. The Irish High Court applied the common intention constructive trust doctrine in the Irish context, examining the conduct of the parties, their financial contributions and any express or implied agreements about their respective shares. The decision illustrates that Irish courts will look beyond legal title to the realities of the parties' dealings. The case reinforces that in the absence of a declaration of trust, beneficial ownership will be determined by reference to the full factual matrix of the co-ownership relationship.",
    subjects: ['property-law'],
    topics: [
      'co-ownership',
      'constructive trust',
      'beneficial interest',
      'common intention',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Tubridy v Walsh',
    citation: '[2015] IEHC 622',
    year: 2015,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A resulting trust arises in favour of a person who contributes to the purchase price of property where legal title is taken in another's name. The beneficial share is proportionate to the contribution made at the time of acquisition.",
    key_quote:
      "Where a person pays part of the purchase price but legal title is taken in another's name, a resulting trust arises in their favour proportionate to their contribution.",
    full_summary:
      "Tubridy contributed to the purchase price of a property but legal title was registered in Walsh's name. A dispute arose when the relationship ended as to whether Tubridy had a beneficial interest. The High Court held that a resulting trust arose in Tubridy's favour proportionate to the financial contribution made to the purchase. This case reinforces the application of resulting trust principles in Irish co-ownership disputes and is consistent with the established approach of looking to the financial realities of the acquisition. The court distinguished between contributions made at the time of purchase (which give rise to a resulting trust) and later payments (which may support a constructive trust claim but require evidence of common intention).",
    subjects: ['property-law'],
    topics: [
      'co-ownership',
      'resulting trust',
      'beneficial interest',
      'purchase price contribution',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Murray v Diamond',
    citation: '[1982] ILRM 113',
    year: 1982,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'The Family Home Protection Act 1976 requires the prior written consent of the non-owning spouse before the owning spouse can convey the family home. A conveyance made without such consent is voidable at the instance of the non-consenting spouse.',
    key_quote:
      'Section 3 of the Family Home Protection Act 1976 renders void any conveyance of the family home made without the prior written consent of the non-owning spouse.',
    full_summary:
      "Mr Murray, the sole legal owner of the family home, sold the property without obtaining the prior written consent of his wife as required by the Family Home Protection Act 1976. The purchaser Diamond sought to enforce the sale. The High Court held that the conveyance was void for want of spousal consent under section 3 of the 1976 Act. This case is a foundational Irish authority on the operation and consequences of the Family Home Protection Act. It establishes that the consent requirement is mandatory and that its absence renders a transaction voidable (and in some circumstances void), protecting the non-owning spouse's right to remain in the family home. Solicitors must ensure compliance with this Act in every conveyancing transaction involving a family home.",
    subjects: ['property-law'],
    topics: [
      'Family Home Protection Act 1976',
      'spousal consent',
      'conveyance',
      'family home',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2020', 'FE-1 Property 2023'],
  },
  {
    case_name: 'Countercare Ltd v Wycherley',
    citation: '[2009] IEHC 566',
    year: 2009,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "The Family Home Protection Act 1976 applies to the family home of a married couple. The definition of 'family home' includes the principal dwelling in which the spouses ordinarily reside, and does not extend to investment or second properties.",
    key_quote:
      'Only the principal family home in which the couple ordinarily reside attracts the protections of the Family Home Protection Act 1976.',
    full_summary:
      'A dispute arose as to whether the consent requirements of the Family Home Protection Act 1976 applied to a property which was not the principal residence of the married couple. The High Court clarified that the Act applies only to the family home as defined, being the dwelling in which the spouses ordinarily reside as their principal home. Additional or investment properties owned by one spouse do not attract the consent requirement. This case is important for clarifying the scope of the Family Home Protection Act and for distinguishing the protection it affords from any broader restriction on dealings with all property owned by a spouse. Practitioners must assess whether a property is the family home in every transaction.',
    subjects: ['property-law'],
    topics: [
      'Family Home Protection Act 1976',
      'family home',
      'definition',
      'spousal consent',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Butler v Butler',
    citation: '[1997] 2 IR 464',
    year: 1997,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Under the Judicial Separation and Family Law Reform Act 1989 and the Family Law Act 1995, the court has broad jurisdiction to adjust property rights between spouses on judicial separation, including the power to transfer property and extinguish beneficial interests.',
    key_quote:
      "The court's jurisdiction under the Family Law Acts to adjust property rights is wide and is designed to achieve a fair and equitable resolution of the spouses' property interests on the breakdown of marriage.",
    full_summary:
      "This Supreme Court decision examined the extent of the court's jurisdiction to deal with property owned by spouses on foot of judicial separation proceedings. The court confirmed that the property adjustment powers in the Family Law Acts are broad and enable the court to transfer, extinguish and adjust proprietary rights between spouses in a comprehensive way. The decision reinforced the significance of family law legislation in modifying the ordinary rules of property law in the context of marital breakdown. The case is relevant both to property law and family law courses and illustrates the interaction between the two areas in Irish law.",
    subjects: ['property-law'],
    topics: [
      'co-ownership',
      'family home',
      'judicial separation',
      'property adjustment',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Walpoles (Ireland) Ltd v Jay',
    citation: '[1980] IR 148',
    year: 1980,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A conveyance of a family home to a bona fide purchaser for value without notice of the need for spousal consent may be valid notwithstanding the absence of consent under the Family Home Protection Act 1976, where the purchaser had no actual or constructive notice of the other spouse's interest.",
    key_quote:
      'A bona fide purchaser for value without notice may take good title even where the spousal consent requirements of the Family Home Protection Act 1976 have not been complied with.',
    full_summary:
      "Walpoles purchased a property from Jay without obtaining evidence of spousal consent under the Family Home Protection Act 1976. The court considered whether the purchaser took good title notwithstanding the absence of consent. The court held that a bona fide purchaser for value without notice of the wife's interest could take good title. This case is significant because it establishes a notice-based qualification to the otherwise strict consent requirement of the 1976 Act and shows that the Act, while protective, is not an absolute bar to third party dealings where the purchaser had no notice. However, in conveyancing practice, compliance with the Act is the standard, and reliance on this defence is exceptional.",
    subjects: ['property-law'],
    topics: [
      'Family Home Protection Act 1976',
      'bona fide purchaser',
      'notice',
      'spousal consent',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Nestor v Murphy',
    citation: '[1979] IR 326',
    year: 1979,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "The consent of a spouse under the Family Home Protection Act 1976 must be a free and informed consent given prior to the conveyance. A spouse's consent obtained under misapprehension or undue pressure is not a valid consent for the purposes of the Act.",
    key_quote:
      'The consent required by the Family Home Protection Act 1976 must be a real, informed, free and prior consent. A consent that is not genuinely informed or freely given is not valid for the purposes of the Act.',
    full_summary:
      'Mrs Nestor signed a consent form under the Family Home Protection Act 1976 in connection with a mortgage transaction on the family home. She later claimed she did not understand what she was signing and that her consent was not free or informed. The Supreme Court held that the 1976 Act requires genuine, prior, informed and free consent from the non-owning spouse. A perfunctory or uninformed signature does not suffice. This decision is critically important for conveyancing practitioners, as it requires that the consenting spouse receive independent legal advice and fully understand the nature of the transaction. The case has resulted in standard conveyancing practice requiring the non-owning spouse to be separately advised.',
    subjects: ['property-law'],
    topics: [
      'Family Home Protection Act 1976',
      'informed consent',
      'spousal consent',
      'mortgage',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2015', 'FE-1 Property 2018', 'FE-1 Property 2021'],
  },
  {
    case_name: 'Powell v MacFarlane',
    citation: '(1977) 38 P&CR 452',
    year: 1977,
    court: 'Chancery Division',
    jurisdiction: 'England',
    legal_principle:
      'To establish adverse possession, a squatter must demonstrate (1) factual possession of the land, meaning a sufficient degree of exclusive physical control, and (2) the requisite intention to possess (animus possidendi), meaning an intention to possess to the exclusion of all others including the paper owner. Both elements must be established on clear evidence.',
    key_quote:
      'Factual possession signifies an appropriate degree of physical control and the animus possidendi requires an intention to possess the land to the exclusion of all other persons including the owner so far as is reasonably practicable and so far as the processes of the law will allow.',
    full_summary:
      'Powell, a young teenager, grazed cattle on land belonging to MacFarlane and carried out various acts of use over many years. The court examined in detail what is required to establish adverse possession. Slade J set out the authoritative two-stage test: first, factual possession (an appropriate degree of exclusive physical control over the land), and second, animus possidendi (the intention to possess to the exclusion of all others including the true owner). The court held that the claimant must be assessed objectively and all the circumstances considered. Powell ultimately failed because his acts were not sufficiently clear evidence of animus possidendi given his young age at the start of the period. The case remains the leading authority on the requirements for adverse possession.',
    subjects: ['property-law'],
    topics: [
      'adverse possession',
      'factual possession',
      'animus possidendi',
      'squatter',
      'limitation',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2020', 'FE-1 Property 2023'],
  },
  {
    case_name: 'Leigh v Jack',
    citation: '(1879) 5 ExD 264',
    year: 1879,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      "Acts done on land which are consistent with the paper owner's future intended use of the land do not amount to adverse possession, as they do not dispossess the paper owner.",
    key_quote:
      'Acts which are not inconsistent with the future use of land by the true owner do not amount to dispossession of that owner.',
    full_summary:
      "Jack carried out acts on a strip of land including depositing materials. The land was owned by Leigh who intended eventually to build on it. The court held that as Jack's activities were not inconsistent with Leigh's future plans for the land, they did not amount to dispossession. The paper owner's intended use of the land must be considered; where the acts of the alleged squatter are not adverse to that future use, the limitation period will not run. Although this specific rule on 'intended future use' was later overruled by JA Pye v Graham in the House of Lords, the case remains significant in Irish law as the Irish courts have been slower to follow the English reversal, and the principle has continued relevance in teaching adverse possession doctrine.",
    subjects: ['property-law'],
    topics: ['adverse possession', 'dispossession', 'intended use', 'limitation', 'paper owner'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Cork Corporation v Lynch',
    citation: '[1995] 2 ILRM 598',
    year: 1995,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "In Ireland, the Statute of Limitations 1957 provides a twelve-year limitation period for actions to recover land. After this period, the paper owner's title is extinguished and the adverse possessor acquires a possessory title. The squatter's acts must amount to clear factual possession with the requisite intention to possess.",
    key_quote:
      "After twelve years of adverse possession under the Statute of Limitations 1957, the paper owner's title is extinguished and the adverse possessor acquires possessory title.",
    full_summary:
      "Cork Corporation claimed to be entitled to land on the basis of adverse possession under the Statute of Limitations 1957. The court examined the Irish limitation rules applicable to actions to recover land and confirmed that twelve years of adverse possession extinguishes the paper owner's title. The court applied the Powell v MacFarlane requirements of factual possession and animus possidendi in the Irish statutory context. This case is the key Irish authority confirming the operation of the Statute of Limitations 1957 on adverse possession and the legal effect of the limitation period running: extinguishment of title and the vesting of a possessory title in the squatter. Candidates must know the twelve-year period as an Irish-specific rule.",
    subjects: ['property-law'],
    topics: [
      'adverse possession',
      'Statute of Limitations 1957',
      'possessory title',
      'extinguishment',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2017', 'FE-1 Property 2021'],
  },
  {
    case_name: 'J A Pye (Oxford) Ltd v Graham',
    citation: '[2003] 1 AC 419',
    year: 2003,
    court: 'House of Lords',
    jurisdiction: 'England',
    legal_principle:
      "Adverse possession does not require the squatter to demonstrate hostility or knowledge of the owner's title; it requires only factual possession with the requisite intention to possess. The House of Lords confirmed that the paper owner's intentions as to future use are irrelevant (overruling Leigh v Jack).",
    key_quote:
      "There is no requirement that the squatter should be hostile to the paper owner's title. All that is required is factual possession with the intention to possess.",
    full_summary:
      "Pye owned agricultural land adjacent to the Grahams' farm. The Grahams used the land for grazing after a grazing agreement lapsed, and Pye failed to demand its return for over twelve years. Pye's claim for possession was rejected. The House of Lords held that the Grahams had dispossessed Pye by their acts of factual possession with the necessary intention to possess. Lord Browne-Wilkinson definitively held that there is no hostility requirement and that the paper owner's future intentions are irrelevant: if a squatter is in factual possession with animus possidendi for the limitation period, the paper owner's title is extinguished. This landmark decision overruled Leigh v Jack and clarified English adverse possession law significantly.",
    subjects: ['property-law'],
    topics: [
      'adverse possession',
      'factual possession',
      'animus possidendi',
      'limitation period',
      'hostility',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2018', 'FE-1 Property 2022'],
  },
  {
    case_name: 'Buckinghamshire County Council v Moran',
    citation: '[1990] Ch 623',
    year: 1990,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      "A squatter who encloses and uses land as their own, treating it as part of their garden, may establish adverse possession even where the paper owner has a specific future use in mind. The squatter need not know of the owner's future plans and such plans do not defeat the adverse possessor's claim.",
    key_quote:
      "The squatter had the requisite animus possidendi by treating the land as their own garden and excluding the true owner, and the paper owner's future plans do not negate this.",
    full_summary:
      "Moran incorporated a strip of land owned by the council into his garden by erecting a fence and a locked gate. The council had plans to use the land for a road in the future but had not acted on these. Moran claimed title by adverse possession after the limitation period had run. The Court of Appeal held in his favour, finding that he had factual possession of the land with the requisite animus possidendi. Critically, the council's plans for future use did not prevent time running. This was an important precursor to JA Pye and helped to establish that a squatter need not be aware of or have regard to the true owner's plans when asserting adverse possession. The enclosure of land as part of one's garden can constitute sufficient factual possession.",
    subjects: ['property-law'],
    topics: ['adverse possession', 'animus possidendi', 'enclosure', 'limitation', 'future use'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: "Doyle v O'Neill",
    citation: '[1995] IEHC 4',
    year: 1995,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In Ireland, the acts constituting adverse possession must be open, peaceful and continuous for the full twelve-year period under the Statute of Limitations 1957. Intermittent or permissive use will not ground adverse possession.',
    key_quote:
      'The possession relied on must be continuous, open and peaceful for the full statutory period; intermittent acts of use or use with the permission of the owner will not ground adverse possession.',
    full_summary:
      "Doyle claimed title to land by adverse possession against O'Neill. The High Court examined whether the acts of possession were sufficiently continuous and open over the twelve-year statutory period. The court held that the limitation period requires uninterrupted and consistent acts of possession: the squatter cannot rely on intermittent acts, seasonal use, or use with the tacit permission of the owner. This Irish authority reinforces the principle that adverse possession must be ongoing and consistent throughout the limitation period, and that any permissive use by the paper owner restarts the clock. The decision is useful for understanding how the Irish courts assess continuity of possession in adverse possession claims.",
    subjects: ['property-law'],
    topics: [
      'adverse possession',
      'continuity',
      'Statute of Limitations 1957',
      'permissive use',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Battelle v Pinemeadow Ltd',
    citation: '[2002] IEHC 33',
    year: 2002,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Enclosing land by erecting fencing and using it for storage or grazing can constitute sufficient factual possession for adverse possession purposes. The court will examine the totality of the acts performed to assess whether they evince a sufficient degree of exclusive control.',
    key_quote:
      'Enclosure of land by fencing together with consistent use for storage and grazing can constitute the requisite degree of factual possession for adverse possession, provided the intention to possess is also present.',
    full_summary:
      'Battelle sought to establish adverse possession of a plot of land which had been fenced off and used for storage and grazing over a period in excess of twelve years. Pinemeadow as paper owner contested the claim. The Irish High Court considered the nature and sufficiency of the acts of possession and the evidence of animus possidendi. The court found that the erection of fencing combined with the consistent use of the land for storage and grazing over the required period was sufficient to establish adverse possession. The decision is a practical illustration of the kinds of acts which will satisfy the factual possession requirement in the Irish context and how the courts assess the evidence of possession.',
    subjects: ['property-law'],
    topics: ['adverse possession', 'factual possession', 'enclosure', 'Ireland', 'limitation'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: "McMahon v O'Loughlin",
    citation: '[2009] IEHC 199',
    year: 2009,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "Where a person has been in adverse possession for twelve years under the Statute of Limitations 1957 and the paper owner's title is extinguished, the adverse possessor has a possessory title that must be registered. The adverse possessor may seek an order from the court confirming their entitlement to be registered as owner.",
    key_quote:
      "Once the limitation period has run and the paper owner's title is extinguished, the adverse possessor is entitled to seek registration as owner of the land.",
    full_summary:
      "McMahon had been in adverse possession of land belonging to O'Loughlin for more than twelve years. Following the extinguishment of O'Loughlin's title under the Statute of Limitations 1957, McMahon sought a declaration of entitlement to be registered as owner of the land. The High Court confirmed that upon expiry of the limitation period, the paper owner's title is extinguished and the adverse possessor is entitled to seek registration on the Land Registry folio as owner. This case is practically important as it addresses the procedural steps an adverse possessor must take after the limitation period has run to convert their possessory title into registered title.",
    subjects: ['property-law'],
    topics: [
      'adverse possession',
      'registration',
      'possessory title',
      'Statute of Limitations 1957',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Bradshaw v Toulmin',
    citation: '[2007] IEHC 229',
    year: 2007,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "Adverse possession cannot arise where use of the land is consistent with the paper owner's general use or constitutes permissive use. In the Irish context, acts that are equivocal as to the intention to possess will not give rise to adverse possession.",
    key_quote:
      "Equivocal acts consistent with permissive use or the paper owner's general use of land do not constitute adverse possession; the acts must unambiguously signal an intention to possess to the exclusion of the true owner.",
    full_summary:
      "Bradshaw claimed adverse possession of a strip of land bordering his own property. The court examined whether the acts of use relied upon were consistent with adverse possession or merely permissive use or equivocal acts. The High Court held that the acts were equivocal and could be consistent with the owner's acquiescence in a limited use, rather than adverse possession. The court emphasised that in Ireland, as in England, equivocal acts cannot ground adverse possession. The claimant's acts must clearly communicate to the world an intention to possess to the exclusion of the true owner. This requirement for unequivocal conduct is important in cases where neighbours dispute boundary strips or small pieces of land.",
    subjects: ['property-law'],
    topics: [
      'adverse possession',
      'equivocal acts',
      'permissive use',
      'Ireland',
      'animus possidendi',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Dundalk UDC v Conway',
    citation: '[1987] ILRM 363',
    year: 1987,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A public body (local authority) is subject to the same limitation rules on adverse possession as private individuals. Time runs against a local authority for the purposes of the Statute of Limitations 1957 in relation to non-public land.',
    key_quote:
      'The provisions of the Statute of Limitations 1957 apply to actions by local authorities to recover land in the same way as to actions by private individuals.',
    full_summary:
      "Dundalk Urban District Council sought to recover land from Conway who had been in possession for over twelve years. The council argued that the limitation period should not run against a public body. The High Court held that the Statute of Limitations 1957 applies to local authorities in respect of non-public land, meaning that the council's title had been extinguished by Conway's adverse possession. The case confirms that public bodies do not enjoy special immunity from adverse possession claims in respect of ordinary land. This is an important qualification: Crown land and land held for public purposes may attract different rules, but general land held by local authorities is subject to the ordinary limitation periods.",
    subjects: ['property-law'],
    topics: [
      'adverse possession',
      'local authority',
      'Statute of Limitations 1957',
      'Ireland',
      'public body',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Dooley v Faherty',
    citation: '[2018] IEHC 564',
    year: 2018,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'To establish adverse possession under the Statute of Limitations 1957, the claimant must prove continuous open possession for twelve years with the intention to possess. Sporadic or seasonal use, or use that is interrupted by the paper owner, will not satisfy the requirement.',
    key_quote:
      'The claimant must demonstrate continuous, open possession with animus possidendi for the full twelve years; seasonal or intermittent acts of use will not suffice.',
    full_summary:
      'Dooley claimed adverse possession of agricultural land against Faherty. The court reviewed all the acts of possession relied upon and assessed whether they were continuous and open over the twelve-year period. The High Court found that while some acts of possession had occurred, they were not continuous enough to satisfy the statutory period. The court noted seasonal agricultural use as being potentially insufficient, particularly where the paper owner had entered the land periodically. The decision reinforces the strict requirement of continuity in the Irish adverse possession context and provides guidance on assessing the sufficiency of agricultural acts of possession. Agricultural cases are particularly fact-sensitive in applying these principles.',
    subjects: ['property-law'],
    topics: [
      'adverse possession',
      'continuity',
      'agricultural land',
      'Statute of Limitations 1957',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Egan v Greene',
    citation: '[2011] IEHC 326',
    year: 2011,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A party can rely on their own adverse possession together with that of their predecessors in title (tacking) to aggregate the requisite twelve-year period under the Statute of Limitations 1957, provided there is continuity of adverse possession between them.',
    key_quote:
      'A claimant may tack their own period of adverse possession to that of a predecessor in title to make up the full twelve-year period, provided possession was continuous between them.',
    full_summary:
      'Egan sought to establish adverse possession over land by combining her own period of possession with that of her predecessor in title from whom she had acquired the adjacent property. The High Court considered the doctrine of tacking adverse possession periods and confirmed that successive adverse possessors can aggregate their periods of possession, provided there is continuity and no break in adverse possession between them. This principle is important in cases where the limitation period was started by a prior owner of adjacent land and the current claimant wishes to rely on the combined period. The case applies the English doctrine of tacking in the Irish statutory context.',
    subjects: ['property-law'],
    topics: [
      'adverse possession',
      'tacking',
      'successor',
      'Statute of Limitations 1957',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Shay Murtagh Ltd v Cooke',
    citation: '[2022] IECA 105',
    year: 2022,
    court: 'Court of Appeal',
    jurisdiction: 'Ireland',
    legal_principle:
      "Adverse possession of registered land in Ireland is governed by the Registration of Title Act 1964 as well as the Statute of Limitations 1957. After twelve years of adverse possession, the registered owner's title is not automatically extinguished but the adverse possessor may apply to be registered. The court examines all acts of possession carefully.",
    key_quote:
      'The registration of title regime does not oust adverse possession claims but modifies the procedure: the adverse possessor must apply for registration rather than title vesting automatically on expiry of the limitation period.',
    full_summary:
      'Shay Murtagh Ltd claimed adverse possession of registered land owned by Cooke. The Court of Appeal reviewed the interplay between the Statute of Limitations 1957 and the Registration of Title Act 1964 in the context of adverse possession of registered land. The court confirmed that the twelve-year period applies to registered land but that the procedural consequence differs from unregistered land: after the period runs, the adverse possessor must apply to be registered as owner rather than title vesting automatically. The court scrutinised all acts of possession claimed and confirmed the requirement for open, continuous possession with animus possidendi. This is a significant recent Irish Court of Appeal decision updating the application of adverse possession principles to registered land.',
    subjects: ['property-law'],
    topics: [
      'adverse possession',
      'registered land',
      'Registration of Title Act 1964',
      'Statute of Limitations 1957',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2023'],
  },
  {
    case_name: 'Start Mortgages Ltd v Gunn',
    citation: '[2011] IEHC 275',
    year: 2011,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A mortgagee seeking possession of a mortgaged property must comply with all statutory requirements and must demonstrate entitlement to possession as a matter of law. The court retains a discretion to adjourn possession proceedings where appropriate.',
    key_quote:
      "A mortgagee's right to possession is subject to statutory requirements and to the court's discretion to adjourn proceedings in appropriate circumstances.",
    full_summary:
      'Start Mortgages brought numerous possession proceedings against defaulting mortgagors. The High Court, in a significant ruling affecting multiple cases, examined the procedural and substantive requirements for a mortgagee to obtain possession of a mortgaged property. The court confirmed that mortgagees must establish that they are the holder of the mortgage, that there is a valid charge over the property, that there has been a default, and that the mortgagor was properly served. The court also confirmed a discretion to adjourn proceedings to allow mortgagors to put forward proposals, reflecting the human rights dimension of home repossession. This decision has had a significant practical impact on mortgage possession proceedings in Ireland.',
    subjects: ['property-law'],
    topics: ['mortgage', 'possession', 'mortgagee', 'default', 'Ireland'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2015', 'FE-1 Property 2019'],
  },
  {
    case_name: 'Bank of Ireland v Smyth',
    citation: '[1995] 2 IR 459',
    year: 1995,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A non-owning spouse's consent to a mortgage under the Family Home Protection Act 1976 must be a free and fully informed consent. A consent obtained where the spouse did not understand the nature and consequences of the mortgage is not a valid consent under the Act.",
    key_quote:
      'The consent of the non-owning spouse under the Family Home Protection Act 1976 must be a genuine, informed, free and prior consent. Consent in ignorance of the nature of the transaction does not satisfy the Act.',
    full_summary:
      'Bank of Ireland sought to enforce a mortgage over the Smyth family home. Mrs Smyth, who was the non-owning spouse, had signed a consent form but claimed she had not understood that she was consenting to a mortgage. The Supreme Court held that the consent required by the Family Home Protection Act 1976 must be genuine and informed. A spouse who signs without understanding what they are signing does not give valid consent. The court stressed that banks and their solicitors have an obligation to ensure that non-owning spouses receive independent advice and fully comprehend what they are consenting to. This case, read with Nestor v Murphy, sets out the stringent requirements for valid spousal consent to mortgages in Irish law.',
    subjects: ['property-law'],
    topics: [
      'mortgage',
      'Family Home Protection Act 1976',
      'informed consent',
      'spousal consent',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2020', 'FE-1 Property 2022'],
  },
  {
    case_name: 'Somers v Weir',
    citation: '[1979] IR 94',
    year: 1979,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "The Family Home Protection Act 1976 applies to protect the family home even where a third party takes a mortgage or charge over the property without having obtained the consent of the non-owning spouse. Such a mortgage is voidable at the non-owning spouse's instance.",
    key_quote:
      'A mortgage taken over a family home without the prior written consent of the non-owning spouse is void and cannot be enforced against the family home.',
    full_summary:
      'Weir mortgaged the family home without obtaining the consent of his wife as required by the Family Home Protection Act 1976. Somers as mortgagee sought to enforce the charge. The Supreme Court held that the mortgage was void for want of the statutory consent and could not be enforced against the family home. This is a foundational decision on the operation of the 1976 Act and its consequences in the mortgage context. Lenders who fail to obtain prior written consent from the non-owning spouse cannot enforce their security over the family home. It reinforces the importance of solicitors advising on the Act in mortgage transactions and obtaining prior written consent from any non-owning spouse.',
    subjects: ['property-law'],
    topics: [
      'mortgage',
      'Family Home Protection Act 1976',
      'spousal consent',
      'void mortgage',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2017', 'FE-1 Property 2021'],
  },
  {
    case_name: 'ACC Bank plc v Frank Kelly',
    citation: '[2011] IEHC 7',
    year: 2011,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "In mortgage possession proceedings, a court will consider whether the mortgagor has a realistic prospect of repaying the arrears or refinancing before granting an order for possession. The court's discretion must be exercised having regard to all the circumstances including the personal circumstances of the mortgagor.",
    key_quote:
      'The court retains a discretion in possession proceedings and must have regard to the realistic prospects of the mortgagor, particularly in the context of rising negative equity and unemployment.',
    full_summary:
      "ACC Bank sought possession of Frank Kelly's home following mortgage default during the economic recession. The High Court considered the court's discretion in granting possession orders and emphasised the importance of examining whether the mortgagor had a realistic prospect of resolving their arrears situation. The court expressed concern about the personal circumstances of mortgagors and the socioeconomic context of the post-2008 mortgage crisis. While the court ultimately had to apply the law, it reflected on the need for a legislative solution to the mortgage arrears crisis, which subsequently led to the Mortgage Arrears Resolution Process. This case is a useful illustration of the equitable dimension of mortgage possession proceedings.",
    subjects: ['property-law'],
    topics: ['mortgage', 'possession', 'arrears', 'court discretion', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Bank of Ireland v Hanrahan',
    citation: '[1986] IR 507',
    year: 1986,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A mortgagee exercising the power of sale owes a duty to take reasonable care to obtain the best price reasonably obtainable at the time of sale. This duty is owed to the mortgagor and any subsequent encumbrancer.',
    key_quote:
      'A mortgagee exercising the power of sale is not a trustee for the mortgagor but owes a duty of care to obtain the best price reasonably obtainable.',
    full_summary:
      "Following the sale of a mortgaged property by Bank of Ireland under its power of sale, Hanrahan the mortgagor alleged that the bank had sold at an undervalue and thereby breached its duty of care. The High Court confirmed that a mortgagee exercising the power of sale owes a duty of care to obtain the best price reasonably obtainable. This does not mean the mortgagee must wait for market conditions to improve, but it must conduct a proper sale process, advertise appropriately and not act negligently. The case is part of the Irish law curriculum on the exercise of the mortgagee's power of sale and the duties owed to the mortgagor and subsequent encumbrancers.",
    subjects: ['property-law'],
    topics: ['mortgage', 'power of sale', 'duty of care', 'best price', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: "AIB v O'Neill",
    citation: '[1995] 2 IR 473',
    year: 1995,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A mortgagee in possession has an obligation to manage the mortgaged property with due care and skill. A mortgagee in possession who allows a property to fall into disrepair or mismanages it may be liable to the mortgagor for the resulting loss.',
    key_quote:
      'A mortgagee in possession owes a duty to manage the mortgaged property as a reasonably prudent mortgagee and is liable for loss arising from negligent management.',
    full_summary:
      "Allied Irish Banks took possession of O'Neill's mortgaged property and managed it for a period before sale. O'Neill argued that the bank had mismanaged the property during the period of possession, leading to a reduction in its value. The High Court confirmed that a mortgagee in possession is not a trustee but does owe a duty of care to manage the property with reasonable care and skill. The bank could be held liable for losses arising from negligent management during the period of possession. This is an important practical case on the duties of a mortgagee who takes possession of mortgaged property, particularly commercial or revenue-generating property.",
    subjects: ['property-law'],
    topics: ['mortgage', 'mortgagee in possession', 'duty of care', 'management', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'First National Building Society v Ring',
    citation: '[1992] 1 IR 375',
    year: 1992,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "The right of redemption is a fundamental incident of a mortgage and equity will intervene to protect the mortgagor's right to redeem. Any clause in a mortgage that clogs the equity of redemption is void.",
    key_quote:
      "The mortgagor's equitable right to redeem the mortgage is a fundamental right that cannot be clogged or impeded by the terms of the mortgage deed.",
    full_summary:
      "First National Building Society included terms in its mortgage deed that sought to restrict or delay the mortgagor Ring's ability to redeem the mortgage. The court applied the equitable principle that once a mortgage, always a mortgage: the mortgagor's right to redeem cannot be made illusory or excessively restricted by mortgage terms. Any collateral advantage or provision that impedes the equitable right of redemption is void as a clog on the equity of redemption. This case applies the established English equity principle in the Irish context and confirms that Irish courts will strike down unconscionable mortgage terms that are designed to prevent or unduly restrict the mortgagor's right to redeem.",
    subjects: ['property-law'],
    topics: ['mortgage', 'equity of redemption', 'clog on equity', 'redemption', 'Ireland'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2018', 'FE-1 Property 2022'],
  },
  {
    case_name: 'Irish Life and Permanent v Duff',
    citation: '[2013] IEHC 43',
    year: 2013,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "In summary possession proceedings by a mortgagee, the court will consider whether there is a fair or arguable case made by the mortgagor before granting possession. The courts' discretion must be exercised with due regard to the mortgagor's right to a home and fair procedures.",
    key_quote:
      'The court must have regard to constitutional rights including the right to a home and to fair procedures in all mortgage possession proceedings.',
    full_summary:
      "Irish Life and Permanent plc brought summary possession proceedings against Duff following default on a mortgage over the family home. The case was important in the context of the post-2008 recession in Ireland as it addressed how courts should exercise their discretion in the growing wave of possession applications. The court examined the balance between the mortgagee's contractual rights and the mortgagor's constitutional and personal rights including the right to a home. The High Court held that summary proceedings must comply with fair procedures and that courts should ensure mortgagors have an adequate opportunity to raise real defences. The decision influenced subsequent mortgage possession jurisprudence in Ireland.",
    subjects: ['property-law'],
    topics: ['mortgage', 'possession', 'constitutional rights', 'fair procedures', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Muintir Skibbereen Credit Union v Crowley',
    citation: '[2015] IEHC 789',
    year: 2015,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A credit union holding a mortgage over a member's home must comply with the same procedural and substantive requirements as a bank in possession proceedings. The court retains a discretion to adjourn proceedings where there is a realistic prospect of repayment.",
    key_quote:
      'A credit union as mortgagee is subject to the same rules as any other mortgagee in possession proceedings and the court retains a discretion to adjourn where appropriate.',
    full_summary:
      "Muintir Skibbereen Credit Union sought possession of Crowley's home following mortgage default. This case illustrates the application of mortgage possession principles to credit unions as lending institutions. The High Court held that credit unions are subject to the same rules as banks and financial institutions in mortgage possession proceedings and that the court has the same discretion to adjourn proceedings. The case is useful for understanding that the procedural and substantive requirements for mortgage possession apply uniformly across different types of lenders in Ireland, and that the mortgagor's circumstances are always relevant to the exercise of the court's discretion.",
    subjects: ['property-law'],
    topics: ['mortgage', 'credit union', 'possession', 'Ireland', 'court discretion'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'ACC Loan Management Ltd v Hamilton',
    citation: '[2015] IEHC 364',
    year: 2015,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A mortgagee purchasing a mortgage from another financial institution (loan transfer) must establish a full chain of title from the original lender to itself before it can maintain possession proceedings. Gaps in the chain of title are fatal to possession proceedings.',
    key_quote:
      'A mortgagee in possession proceedings must establish a complete and unbroken chain of title from the original lender to itself; any gap in the chain defeats the claim to possession.',
    full_summary:
      "ACC Loan Management Ltd, which had acquired the mortgage from ACC Bank, sought possession of Hamilton's property. The mortgagor challenged whether ACC Loan Management had established its title to the mortgage, arguing there were gaps in the chain of assignment. The High Court held that a mortgagee seeking possession must establish a full and unbroken chain of title, including all assignments and transfers from the original lender. Any gap in the chain defeats the proceedings. This decision became very significant in the context of widespread loan book transfers in Ireland following the banking crisis and placed important obligations on loan acquirers to establish their title to enforce mortgages.",
    subjects: ['property-law'],
    topics: ['mortgage', 'loan transfer', 'chain of title', 'possession', 'Ireland'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2019', 'FE-1 Property 2023'],
  },
  {
    case_name: 'Reynolds v Waters',
    citation: '[2022] IECA 118',
    year: 2022,
    court: 'Court of Appeal',
    jurisdiction: 'Ireland',
    legal_principle:
      'A mortgagor may raise the Statute of Limitations as a defence in mortgage possession proceedings where the mortgagee has delayed in pursuing the claim for more than twelve years after the cause of action arose.',
    key_quote:
      'The Statute of Limitations applies to mortgage possession proceedings and a claim may be statute-barred where more than twelve years have elapsed since the cause of action first arose.',
    full_summary:
      "Reynolds raised a defence in mortgage possession proceedings that the claim was statute-barred under the Statute of Limitations. The Court of Appeal examined when the limitation period runs in mortgage cases and what constitutes the accrual of the cause of action. The court confirmed that the Statute of Limitations applies to mortgage actions and that an unreasonable delay of over twelve years from the date of default or demand can defeat the mortgagee's claim. This is an important recent Irish authority on the intersection of limitation law and mortgage enforcement, particularly relevant given the long delays in pursuing mortgage arrears cases that arose during the post-2008 economic crisis.",
    subjects: ['property-law'],
    topics: ['mortgage', 'Statute of Limitations', 'possession', 'Ireland', 'limitation defence'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Start Mortgages DAC v Kavanagh',
    citation: '[2024] IEHC 132',
    year: 2024,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A mortgagee must engage meaningfully with the Mortgage Arrears Resolution Process (MARP) before being entitled to an order for possession. Failure to engage with the MARP process may defeat the mortgagee's claim for possession.",
    key_quote:
      "Compliance with the Mortgage Arrears Resolution Process is a prerequisite to the mortgagee's entitlement to seek possession and failure to engage renders the claim premature.",
    full_summary:
      "Start Mortgages DAC sought possession of Kavanagh's family home following prolonged mortgage arrears. The court examined whether Start Mortgages had complied with its obligations under the Mortgage Arrears Resolution Process (MARP) as required by the Code of Conduct on Mortgage Arrears. The High Court held that meaningful engagement with the MARP was a prerequisite to the entitlement to seek possession, and that a mortgagee who had not properly engaged could not maintain possession proceedings. This 2024 decision is highly current and reinforces the centrality of the MARP regime in Irish mortgage law. It demonstrates the courts' ongoing commitment to ensuring mortgagors are properly protected before homes are repossessed.",
    subjects: ['property-law'],
    topics: ['mortgage', 'MARP', 'possession', 'Code of Conduct', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Heron v Ulster Bank',
    citation: '[2011] NIQB 3',
    year: 2011,
    court: "Queen's Bench Division (Northern Ireland)",
    jurisdiction: 'Northern Ireland',
    legal_principle:
      'A mortgagee selling under the power of sale is under a duty to take reasonable care to obtain the best price reasonably obtainable. The duty applies where there is a conflict of interest between the mortgagee and mortgagor, particularly where a connected party is the purchaser.',
    key_quote:
      "The mortgagee's duty to take reasonable care to obtain the best price is heightened where the purchaser is connected to the mortgagee.",
    full_summary:
      "Ulster Bank exercised its power of sale and sold Heron's property. Heron alleged the bank had sold at an undervalue and that the process was tainted by a conflict of interest as the purchaser was a connected party. The court considered the duty of care owed by a mortgagee exercising the power of sale, particularly where there is a connection between the mortgagee and purchaser. The court held that the duty of care to obtain the best price applies with greater force where such a relationship exists, and that the bank was required to demonstrate that the sale was properly conducted. This case is a useful Northern Irish authority on the heightened obligations that arise in connected-party mortgage sales.",
    subjects: ['property-law'],
    topics: ['mortgage', 'power of sale', 'duty of care', 'best price', 'conflict of interest'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Dwyer Nolan Developments Ltd v Kingscroft Developments Ltd',
    citation: '[1999] 1 ILRM 141',
    year: 1999,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A charge registered over land takes effect as a mortgage and gives the chargee the remedies of a mortgagee including the power of sale. The priority of registered charges is determined by the date and order of registration.',
    key_quote:
      'A registered charge is equivalent to a legal mortgage and confers on the chargee all the remedies of a mortgagee including the statutory power of sale.',
    full_summary:
      'Dwyer Nolan and Kingscroft had competing charges registered over the same piece of land and a dispute arose as to their priority and the ability of each to exercise the power of sale. The High Court confirmed that a registered charge over land confers on the chargee all the rights and remedies of a legal mortgagee, including the power of sale. Priority between competing charges is determined by the date and order of registration under the Land Registry system. This decision is important in understanding how the charging mechanism works in Irish property law and the consequences of registration for priority between competing chargees in lending and development transactions.',
    subjects: ['property-law'],
    topics: ['mortgage', 'registered charge', 'priority', 'power of sale', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Ellenborough Park',
    citation: '[1956] Ch 131',
    year: 1956,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      'For a right to exist as an easement, it must satisfy four conditions: (1) there must be a dominant and servient tenement; (2) the right must accommodate and serve the dominant tenement; (3) the dominant and servient tenements must be owned or occupied by different persons; and (4) the right must be capable of forming the subject matter of a grant.',
    key_quote:
      'The four characteristics essential to an easement are: a dominant and servient tenement, the right must accommodate the dominant tenement, diversity of ownership, and the right must be capable of being the subject of a grant.',
    full_summary:
      'Residents of houses around Ellenborough Park claimed the right to use the park as a garden. The Court of Appeal set out the four essential characteristics of a valid easement: a dominant and servient tenement, the easement must accommodate and serve the dominant tenement, diversity of ownership or occupation between the dominant and servient tenements, and the right must be capable of forming the subject matter of a grant. The court confirmed that a right to use a park as a garden satisfied all four conditions and could exist as an easement. The case is the definitive modern authority on the requirements of an easement and forms the starting point for all easement analysis in both Irish and English law.',
    subjects: ['property-law'],
    topics: [
      'easements',
      'four characteristics',
      'dominant tenement',
      'servient tenement',
      'capable of grant',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2015', 'FE-1 Property 2018', 'FE-1 Property 2021'],
  },
  {
    case_name: 'Hill v Tupper',
    citation: '(1863) 2 H&C 121',
    year: 1863,
    court: 'Court of Exchequer',
    jurisdiction: 'England',
    legal_principle:
      'A right granted to a person cannot exist as an easement if it is purely personal to the grantee and does not serve and accommodate the dominant tenement. A right to run boats for hire on a canal is a personal commercial privilege, not an easement.',
    key_quote:
      'A right which amounts to a personal advantage to the owner of the dominant tenement cannot constitute a valid easement — it must accommodate and serve the land itself.',
    full_summary:
      "Hill, a canal company lessee, was granted the exclusive right to put pleasure boats on the canal. Tupper competed with him by also putting boats on the canal. Hill sued for infringement but failed. The court held that the right to put boats on the canal was a purely personal right benefiting Hill's business, not an easement accommodating and serving any dominant tenement. For a right to be an easement it must benefit the land itself, not merely the commercial interests of its current owner. This case is the leading authority on the 'accommodate and serve the dominant tenement' requirement and is often contrasted with Moody v Steggles (right to advertise a pub on a neighbouring property held to be an easement as it served the pub as a business ancillary to the land).",
    subjects: ['property-law'],
    topics: ['easements', 'accommodate and serve', 'dominant tenement', 'personal right'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2020'],
  },
  {
    case_name: 'Latimer v Official Co-operative Society',
    citation: '[1885] 16 LR Ir 305',
    year: 1885,
    court: 'Chancery Division (Ireland)',
    jurisdiction: 'Ireland',
    legal_principle:
      'An easement of way acquired by long use and enjoyment (prescription) in Ireland requires use that is as of right (nec vi, nec clam, nec precario) — not by force, not secretly, and not with the licence of the servient owner — and must be continuous and open for the prescriptive period.',
    key_quote:
      'Prescription requires use of the right as of right: the use must be open, without force, without secrecy, and without the permission of the servient owner.',
    full_summary:
      "This Irish case examined the requirements for acquiring an easement by prescription under Irish law. The court confirmed that an easement can be acquired by long use as of right: the use must be 'nec vi, nec clam, nec precario' — not by force, not secretly, and not permissively. Permissive use, however long continued, cannot ripen into an easement by prescription because it is not 'as of right.' The prescriptive period under Irish law is twenty years under the Prescription Act 1832 (as applied in Ireland), or indefinitely under the common law doctrine of lost modern grant. This case is a key Irish authority on prescription and is regularly cited in disputes about rights of way claimed by long use.",
    subjects: ['property-law'],
    topics: ['easements', 'prescription', 'as of right', 'nec vi nec clam nec precario', 'Ireland'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2017', 'FE-1 Property 2022'],
  },
  {
    case_name: 'Hanna v Pollock',
    citation: '[1900] 2 IR 664',
    year: 1900,
    court: 'Court of Appeal (Ireland)',
    jurisdiction: 'Ireland',
    legal_principle:
      'An easement of necessity arises where the dominant tenement would be landlocked without an access right over the servient tenement. The courts will imply an easement of necessity to avoid a tenement being entirely inaccessible.',
    key_quote:
      'Where land is completely enclosed and inaccessible without a right of way over neighbouring land, an easement of necessity will be implied.',
    full_summary:
      "Pollock's land was landlocked, being inaccessible except through Hanna's land. Pollock claimed an implied easement of necessity. The Irish Court of Appeal held that where land is entirely landlocked and cannot be accessed without crossing neighbouring land, an easement of necessity will be implied to ensure the dominant tenement is not rendered useless. This foundational Irish case on easements of necessity is regularly cited in the Irish law curriculum and establishes that the courts will not permit a tenement to be entirely inaccessible. The easement of necessity is the narrowest form of implied easement and arises only where absolute necessity is shown — mere inconvenience does not suffice.",
    subjects: ['property-law'],
    topics: ['easements', 'easement of necessity', 'implied easement', 'landlocked', 'Ireland'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2015', 'FE-1 Property 2019', 'FE-1 Property 2023'],
  },
  {
    case_name: 'Redfront Ltd v Custom House Dock Management Ltd',
    citation: '[1998] 3 IR 540',
    year: 1998,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In Ireland, an easement can be implied on the grant of land under the rule in Wheeldon v Burrows where the right was continuous and apparent, reasonably necessary for the reasonable enjoyment of the land granted, and used by the grantor before the grant.',
    key_quote:
      'On a grant, quasi-easements that are continuous and apparent and reasonably necessary for the enjoyment of the land granted will pass as implied easements under the rule in Wheeldon v Burrows.',
    full_summary:
      'Redfront claimed an implied easement of light and access over land retained by Custom House Dock Management. The High Court examined whether the right passed under the rule in Wheeldon v Burrows, which provides that on a grant of part of a tenement, quasi-easements previously enjoyed by the grantor over the retained land pass as easements if they are continuous and apparent, and reasonably necessary for the enjoyment of the part granted. The court applied this rule in the Irish context and confirmed it applies to grants of Irish land. This case is an important Irish authority on implied grant of easements and the application of Wheeldon v Burrows in Ireland.',
    subjects: ['property-law'],
    topics: [
      'easements',
      'implied grant',
      'Wheeldon v Burrows',
      'continuous and apparent',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Manjang v Drammeh',
    citation: '(1991) 61 P&CR 194',
    year: 1991,
    court: 'Privy Council',
    jurisdiction: 'England',
    legal_principle:
      'An easement of necessity arises only where land would be wholly inaccessible without it. If there is an alternative means of access — even if less convenient — an easement of necessity will not be implied.',
    key_quote:
      'Mere inconvenience in access is not sufficient to create an easement of necessity; the land must be wholly inaccessible without the implied right.',
    full_summary:
      "Drammeh claimed an easement of necessity over Manjang's land to access his property. The Privy Council examined whether the land would be wholly inaccessible without the right claimed. The court held that since there was an alternative route of access — even though it involved using a stretch of river — there was no absolute necessity and thus no easement of necessity could be implied. This case is important for drawing the precise limits of easements of necessity: mere inconvenience is insufficient, and the land must be genuinely landlocked or entirely inaccessible without the implied right. It qualifies the broader statements in cases like Hanna v Pollock.",
    subjects: ['property-law'],
    topics: [
      'easements',
      'easement of necessity',
      'absolute necessity',
      'implied easement',
      'access',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Wong v Beaumont Property Trust Ltd',
    citation: '[1965] 1 QB 173',
    year: 1965,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      "An easement may be implied on a grant where it is necessary to give effect to the common intention of the parties at the time of the grant, even if not strictly necessary for access. This 'common intention' head of implied grant is broader than strict necessity.",
    key_quote:
      'A right may be implied on grant where it is necessary to give effect to the common intention of the parties at the time of the grant, even if it would not be implied under the strict necessity rule.',
    full_summary:
      "Wong leased a basement restaurant from Beaumont Property Trust. The lease required him to carry on a restaurant business but to do so he needed ventilation ducts, which could only be installed by passing through the landlord's property. The Court of Appeal held that an easement to install the ventilation system would be implied because it was necessary to give effect to the common intention of the parties that the basement be used as a restaurant. This broadened the implied easement category beyond strict necessity to encompass rights necessary to achieve the agreed purpose of the grant. The 'common intention' implied easement is frequently examined alongside strict necessity.",
    subjects: ['property-law'],
    topics: ['easements', 'implied grant', 'common intention', 'necessity', 'ventilation'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2018'],
  },
  {
    case_name: 'Durack Manufacturing Ltd v Considine',
    citation: '[1987] IR 677',
    year: 1987,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In Ireland, the doctrine of lost modern grant can be used to establish an easement by prescription where long user as of right can be shown. The court will presume that a grant was made and subsequently lost, provided the user has been sufficiently long and uninterrupted.',
    key_quote:
      'Where there has been long user as of right for twenty or more years, the court will presume the existence of a lost modern grant creating the easement claimed.',
    full_summary:
      "Durack Manufacturing claimed a right of way over Considine's land on the basis of long use and the doctrine of lost modern grant. The Irish High Court confirmed that lost modern grant is a recognised doctrine in Irish law and that long use as of right for twenty years gives rise to a presumption that a grant was made and subsequently lost. This is an alternative basis for prescription to the statutory provisions under the Prescription Act 1832. The case confirms the continued operation of the lost modern grant doctrine in Ireland alongside the statutory prescription period and is a useful authority for establishing prescriptive easements in the Irish context.",
    subjects: ['property-law'],
    topics: ['easements', 'prescription', 'lost modern grant', 'long user', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Feehan v Leamy',
    citation: '[2000] IEHC 2',
    year: 2000,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'The enjoyment of an easement must be enjoyed as of right and openly. Permission from the servient owner, express or implied, will negate a claim to prescription. The onus is on the claimant to establish that use was without permission.',
    key_quote:
      'Permissive use, however long continued, cannot give rise to a prescriptive easement because it is not use as of right.',
    full_summary:
      "Feehan claimed a prescriptive right of way over Leamy's land based on long use. Leamy argued that the use had been permissive — tolerated as a neighbourly gesture rather than as of right. The High Court held that permissive use, even over many decades, cannot ripen into an easement by prescription because it is not exercised as of right. The court examined the evidence of how the use arose and whether there had at any stage been an express or implied permission. This case reinforces the critical distinction between tolerated permissive use and use as of right that will support a prescriptive claim. The claimant must discharge the burden of showing that the use was not permissive.",
    subjects: ['property-law'],
    topics: ['easements', 'prescription', 'permissive use', 'as of right', 'Ireland'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2019', 'FE-1 Property 2023'],
  },
  {
    case_name: 'Irish Glass Bottle Co Ltd v Dublin Port and Docks Board',
    citation: '[1997] 1 ILRM 403',
    year: 1997,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'An easement can be extinguished by express release, merger of the dominant and servient tenements, or by long non-user combined with circumstances showing an intention to abandon the right. Temporary non-use does not amount to abandonment.',
    key_quote:
      'Abandonment of an easement requires not merely non-use but evidence of a clear intention on the part of the dominant owner to abandon the right permanently.',
    full_summary:
      "Irish Glass Bottle claimed that a right of way it had enjoyed over the Dublin Port Board's land had been extinguished by abandonment due to a long period of non-use. The High Court examined the law on extinguishment of easements by abandonment in Ireland. The court confirmed that mere non-use, even over a prolonged period, does not by itself extinguish an easement. Abandonment requires non-use together with clear evidence of an intention to permanently relinquish the right. This Irish case is authority for the narrow interpretation of abandonment and the high bar placed on those seeking to establish that an easement has been extinguished.",
    subjects: ['property-law'],
    topics: ['easements', 'extinguishment', 'abandonment', 'non-user', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'London Borough of Hounslow v Secretary of State for Transport',
    citation: '[2022] EWHC 1705 (Admin)',
    year: 2022,
    court: 'Administrative Court',
    jurisdiction: 'England',
    legal_principle:
      'Public rights of way, including those recorded on definitive maps, must be respected in planning and development decisions. A right of way that has been formally recognised cannot be extinguished without proper statutory authority.',
    key_quote:
      'A formally recognised public right of way cannot be extinguished without statutory authority; development plans must accommodate or formally divert recognised rights of way.',
    full_summary:
      'Hounslow Borough Council challenged planning decisions affecting a public right of way that had been recorded on the definitive map. The Administrative Court confirmed that formally recorded public rights of way have strong legal protection and cannot be removed or obstructed without proper statutory authority. The case addresses the interface between planning law and easement/right of way law and is relevant in understanding the protection afforded to rights of way in the context of development proposals. Although an English administrative law case, its principles on the strength of formally registered rights of way are relevant in the Irish conveyancing and planning context.',
    subjects: ['property-law'],
    topics: ['easements', 'public right of way', 'definitive map', 'planning', 'extinguishment'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: "Sainsbury's Supermarkets Ltd v Bristol Rovers (1883) Ltd",
    citation: '[2022] EWCA Civ 1626',
    year: 2022,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      'An easement granted in a commercial conveyancing context must be construed in light of the factual matrix at the time of the grant. An easement is not to be given a meaning inconsistent with the purposes for which it was granted as understood at the time.',
    key_quote:
      'The interpretation of an express easement must reflect the commercial purpose and context of the grant as it was understood at the time.',
    full_summary:
      "A dispute arose between Sainsbury's and Bristol Rovers concerning the scope of an express easement granted in a commercial conveyancing context, involving access and car parking rights over a retail development site. The Court of Appeal held that express easements must be construed purposively in light of the commercial context and the reasonable expectations of the parties at the time of grant. An easement cannot be given a meaning that would be wholly uncommercial or inconsistent with the understood purpose of the transaction. This 2022 case illustrates how modern courts approach the construction of commercial easements and is relevant in Irish commercial property practice.",
    subjects: ['property-law'],
    topics: ['easements', 'express grant', 'construction', 'commercial property', 'car parking'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'K/S Victoria Street v House of Fraser (Stores Management) Ltd',
    citation: '[2011] EWCA Civ 904',
    year: 2011,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      'A right of way granted over a defined route cannot be used excessively beyond the purposes for which it was granted. An increase in the burden on the servient tenement beyond what was contemplated at the time of the grant may amount to an excessive user.',
    key_quote:
      'A right of way cannot be used in a manner that is substantially different from or in excess of the purposes for which it was originally granted.',
    full_summary:
      'A dispute arose over whether a right of way granted over a common walkway could be used for significantly increased volumes of foot traffic resulting from the expansion of a retail business. The Court of Appeal held that a right of way must be used in a manner consistent with the purposes for which it was originally granted and within the reasonable contemplation of the parties at the time of grant. Excessive use that substantially increases the burden on the servient tenement beyond what was contemplated may give rise to a claim for excessive user. The case provides important guidance on the scope of commercial rights of way in a retail development context.',
    subjects: ['property-law'],
    topics: [
      'easements',
      'excessive user',
      'right of way',
      'scope of easement',
      'commercial property',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Tulk v Moxhay',
    citation: '(1848) 2 Ph 774',
    year: 1848,
    court: 'Court of Chancery',
    jurisdiction: 'England',
    legal_principle:
      'A restrictive covenant affecting land will bind a successor in title who takes the land with notice of the covenant. The burden of a restrictive covenant runs with the land in equity to bind all persons who take the land with notice of it.',
    key_quote:
      'A covenant restricting the use of land, if it is restrictive in nature and the purchaser takes with notice, will bind that purchaser in equity even though there is no privity of contract between them.',
    full_summary:
      'Tulk sold land in Leicester Square subject to a covenant not to build on it. The land passed through several hands and eventually to Moxhay, who proposed to build despite having notice of the covenant. Tulk sought an injunction. The court held that a restrictive covenant affecting land is binding not only in contract between the original parties but runs with the land to bind all subsequent owners who take with notice of it. This foundational case established the doctrine that restrictive covenants can bind third parties in equity and is the cornerstone of all English and Irish restrictive covenant law. Without Tulk v Moxhay, private land use control by restrictive covenants would be ineffective.',
    subjects: ['property-law'],
    topics: ['restrictive covenants', 'burden runs with land', 'notice', 'equity', 'land use'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2015', 'FE-1 Property 2019', 'FE-1 Property 2022'],
  },
  {
    case_name: "Re Ballard's Conveyance",
    citation: '[1937] Ch 473',
    year: 1937,
    court: 'Chancery Division',
    jurisdiction: 'England',
    legal_principle:
      "The benefit of a restrictive covenant runs with the land of the covenantee, and may be enforced by a successor in title, but only if the covenant was made for the benefit and protection of the covenantee's land and has been shown to touch and concern that land.",
    key_quote:
      'The benefit of a restrictive covenant will run with the dominant land and be enforceable by successors in title only if the covenant touches and concerns that land.',
    full_summary:
      "A restrictive covenant was imposed on part of a large landed estate. The question was whether a successor to part of the original covenantee's land could enforce the covenant. The court held that the benefit of a restrictive covenant will pass to successors if it 'touches and concerns' the covenantee's land, meaning it must protect or benefit the land itself rather than being a purely personal right. Where the covenant was made to benefit a large estate, a person owning only a small part of it might not be able to show that the covenant still benefits and touches their particular parcel. The case refines the rules on the benefit of restrictive covenants running with the land.",
    subjects: ['property-law'],
    topics: [
      'restrictive covenants',
      'benefit runs with land',
      'touches and concerns',
      'successor in title',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Pascoe v Turner',
    citation: '[1979] 1 WLR 431',
    year: 1979,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      "Where a person makes representations to another that they have or will have an interest in property, and the representee acts to their detriment in reliance on that representation, proprietary estoppel may arise. The court's remedy must be proportionate to the minimum equity to do justice.",
    key_quote:
      'Equity, having decided that the defendant is entitled to some remedy, must decide what is the minimum remedy necessary to satisfy the equity in the circumstances.',
    full_summary:
      'Pascoe told his partner Turner that the house and everything in it was hers. She spent money improving and maintaining the property in reliance on this assurance. Pascoe then tried to repossess the property. The Court of Appeal held that a proprietary estoppel had arisen: Pascoe had made an assurance, Turner had relied on it to her detriment, and it would be unconscionable to allow Pascoe to resile from his assurance. The court awarded Turner the freehold of the house. The case establishes the elements of proprietary estoppel — representation/assurance, reliance, detriment, and unconscionability — and the principle that the remedy must satisfy the minimum equity necessary to do justice.',
    subjects: ['property-law'],
    topics: [
      'proprietary estoppel',
      'assurance',
      'detrimental reliance',
      'unconscionability',
      'remedy',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2020'],
  },
  {
    case_name: 'Smyth v Halpin',
    citation: '[1997] 2 ILRM 38',
    year: 1997,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Proprietary estoppel can arise in Irish law where a person is encouraged or acquiesces in another spending money on or acting in relation to property, leading them reasonably to believe they will acquire an interest, and it would be unconscionable to allow the owner to resile from that position.',
    key_quote:
      "Proprietary estoppel requires a representation or acquiescence by the owner, detrimental reliance by the claimant, and unconscionability in allowing the owner to deny the claimant's interest.",
    full_summary:
      "Halpin spent significant resources improving land owned by Smyth's family on the understanding that she would inherit or receive the land. The High Court held that proprietary estoppel could arise in the Irish context and examined the elements required. The court found that the elements of assurance, reliance and detriment were present and that it would be unconscionable to allow the owner to resile from the position that Halpin would receive the property. The case establishes the Irish application of proprietary estoppel doctrine and is frequently cited in Irish law curricula as demonstrating how equity can generate property interests outside formal conveyancing.",
    subjects: ['property-law'],
    topics: [
      'proprietary estoppel',
      'assurance',
      'detrimental reliance',
      'unconscionability',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2017', 'FE-1 Property 2021', 'FE-1 Property 2023'],
  },
  {
    case_name: 'Guest v Guest',
    citation: '[2022] UKSC 27',
    year: 2022,
    court: 'United Kingdom Supreme Court',
    jurisdiction: 'England',
    legal_principle:
      'In a proprietary estoppel claim, where the claimant has been given an assurance that they would inherit a farm and has worked there for decades in reliance on that assurance, the remedy need not be limited to a lesser equity: the court may give effect to the expectation in full if that is proportionate and not disproportionate to the detriment.',
    key_quote:
      'Where it is proportionate to do so, the court may fulfil the expectation rather than merely compensate the claimant for their detriment, particularly where the expectation is clear and the detriment substantial.',
    full_summary:
      "Andrew Guest worked on his family's farm for decades on the assurance that he would inherit it. His parents changed their wills to exclude him and he brought a proprietary estoppel claim. The UK Supreme Court, by majority, held that in proprietary estoppel the court's task is to assess the minimum necessary to avoid unconscionability, but where it would be proportionate, the court can give full effect to the expectation rather than a lesser remedy. The Supreme Court set aside the Court of Appeal's reduction of the remedy and restored an award reflecting the expectation. This 2022 landmark decision is significant for clarifying the relationship between expectation and detriment in quantifying proprietary estoppel remedies.",
    subjects: ['property-law'],
    topics: [
      'proprietary estoppel',
      'expectation',
      'detrimental reliance',
      'remedy',
      'proportionality',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2023'],
  },
  {
    case_name: 'Arthistory Ltd v Campbell',
    citation: '[2022] IEHC 547',
    year: 2022,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A restrictive covenant affecting commercial land must be clear and certain in its terms to be enforceable. A vague or uncertain covenant may not be given effect in equity and the court must construe any ambiguity in the restrictive covenant against the party seeking to enforce it.',
    key_quote:
      'A restrictive covenant must be sufficiently clear and certain in its terms to be capable of enforcement; uncertainty in scope or effect will be construed against the covenantee.',
    full_summary:
      "Arthistory sought to enforce a restrictive covenant against Campbell that was said to restrict commercial use of certain property. The High Court examined whether the covenant was sufficiently clear in its terms to be enforced. The court held that restrictive covenants, particularly in commercial property transactions, must be clear and certain. Where the covenant's scope was ambiguous, the ambiguity would be resolved against the party seeking to enforce it. The case illustrates the courts' approach to the construction of restrictive covenants in the modern Irish commercial property context and emphasises that precision in drafting is essential to ensure enforceability.",
    subjects: ['property-law'],
    topics: [
      'restrictive covenants',
      'construction',
      'certainty',
      'commercial property',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Ali v Khatib',
    citation: '[2022] EWCA Civ 481',
    year: 2022,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      'Proprietary estoppel can arise in a family property context where assurances are made about inheritance of the family home. The court will look at the overall picture and the nature of the assurance, the reliance and the detriment in a holistic manner.',
    key_quote:
      'The court must look at the matter in the round and assess whether it would be unconscionable to deny the claimant the benefit of the assurance given.',
    full_summary:
      'Ali claimed proprietary estoppel in relation to a family home where Khatib (a relative) had made assurances that Ali would receive an interest in the property. Ali had acted in reliance on these assurances over many years. The Court of Appeal confirmed the holistic approach to proprietary estoppel: the court must consider the assurances, reliance and detriment together and ask whether it would be unconscionable to deny the claim. The case is a useful recent authority on how proprietary estoppel operates in family property disputes where informal assurances are made about rights in land. It illustrates the flexible and fact-sensitive nature of proprietary estoppel.',
    subjects: ['property-law'],
    topics: [
      'proprietary estoppel',
      'family property',
      'assurance',
      'unconscionability',
      'holistic approach',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Assethold Ltd v Jonathan',
    citation: '[2022] EWHC 321 (QB)',
    year: 2022,
    court: "Queen's Bench Division",
    jurisdiction: 'England',
    legal_principle:
      "Where a restrictive covenant has been breached, the appropriate remedy may be an award of damages in lieu of an injunction under Lord Cairns' Act, rather than mandatory compliance, particularly where the enforcement of the covenant would cause disproportionate hardship.",
    key_quote:
      'Where enforcement of a restrictive covenant by injunction would cause disproportionate hardship to the defendant relative to the benefit to the claimant, damages in lieu of injunction may be awarded.',
    full_summary:
      "Assethold sought enforcement of a restrictive covenant which had been breached by Jonathan's development. The court considered whether to grant an injunction requiring demolition or to award damages under Lord Cairns' Act. The court held that where the harm to the claimant from the breach is relatively modest and the burden of mandatory compliance would be disproportionate, damages are the appropriate remedy. The case illustrates the principles applicable when the court exercises its discretion between injunction and damages in restrictive covenant cases, following the approach in Coventry v Lawrence. This is an important principle for candidates to understand in the context of remedies for breach of covenant.",
    subjects: ['property-law'],
    topics: ['restrictive covenants', 'remedy', 'damages in lieu', 'injunction', 'Lord Cairns Act'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Calverley v Lynch',
    citation: '[2022] IEHC 108',
    year: 2022,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Proprietary estoppel in Ireland requires evidence of an assurance or representation, detrimental reliance by the claimant, and unconscionability. Verbal assurances made within a family context, even without formal documentation, can be sufficient to ground the claim.',
    key_quote:
      'Verbal assurances made in a family context, when relied upon to the detriment of the claimant, can give rise to proprietary estoppel in Irish law.',
    full_summary:
      "Calverley claimed proprietary estoppel over land belonging to Lynch, asserting that verbal assurances had been made by Lynch within a family context that Calverley would receive the land. Calverley had worked on the land and invested time and resources in reliance on these assurances. The Irish High Court examined the three elements of proprietary estoppel and held that verbal family assurances could constitute sufficient assurances for the purposes of the doctrine, provided reliance and detriment were established. The court found in Calverley's favour. This recent Irish case is significant for illustrating the continuing vitality of proprietary estoppel in the Irish agricultural family land context.",
    subjects: ['property-law'],
    topics: [
      'proprietary estoppel',
      'verbal assurance',
      'family property',
      'detrimental reliance',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Sirosa v Prudential Assurance',
    citation: '[2021] IEHC 617',
    year: 2021,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A registered burden (such as a restrictive covenant) on the Land Registry folio binds all purchasers of the burdened land irrespective of notice. Registration constitutes actual notice for the purposes of the burden.',
    key_quote:
      'Registration of a burden on the land register constitutes notice to all the world and binds all subsequent purchasers irrespective of actual notice.',
    full_summary:
      'Sirosa contested whether a restrictive covenant registered as a burden on the Land Registry folio was binding on it as a subsequent purchaser. The High Court held that registration of a burden on the folio under the Registration of Title Act 1964 constitutes constructive notice to all subsequent purchasers and binds them irrespective of actual knowledge. A purchaser of registered land is deemed to have notice of all registered burdens. This case is important for understanding the effect of registration in the Land Registry context and how restrictive covenants are protected and enforced against subsequent purchasers in the Irish registered land system.',
    subjects: ['property-law'],
    topics: ['restrictive covenants', 'registration', 'notice', 'land register', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Beaumont v Florala Ltd',
    citation: '[2020] IEHC 430',
    year: 2020,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Where a restrictive covenant has become obsolete or can no longer serve its original purpose, the court has jurisdiction to discharge or modify it. The applicant must show that the covenant is now obsolete or that its enforcement would cause unreasonable interference without practical benefit.',
    key_quote:
      'Where a restrictive covenant has become obsolete through changes in the character of the neighbourhood or the property, the court may discharge or modify it in appropriate circumstances.',
    full_summary:
      'Florala Ltd applied to discharge a restrictive covenant burdening its development land on the basis that changed circumstances had rendered the covenant obsolete. Beaumont as the neighbouring land owner objected to discharge. The Irish High Court considered the jurisdiction to discharge or modify obsolete covenants in Ireland, which is narrower than in England and Wales where section 84 of the Law of Property Act 1925 provides a more extensive mechanism. The court considered the nature of the covenant, the changes in the character of the area, and whether the covenant still provided any practical benefit. The case illustrates the limited but existing Irish jurisdiction to relieve land from obsolete covenants.',
    subjects: ['property-law'],
    topics: ['restrictive covenants', 'discharge', 'obsolete covenant', 'modification', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Dunne v Iarnrod Eireann',
    citation: '[2016] IEHC 514',
    year: 2016,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A right of way or other easement created in a conveyancing document must be construed according to the words used and the surrounding circumstances at the time of the grant. The court will not extend the scope of an easement beyond what was expressly or impliedly granted.',
    key_quote:
      'The scope of an express easement must be construed by reference to the words of the grant and the circumstances known to both parties at the time of the grant.',
    full_summary:
      'Dunne claimed an express right of way in a conveyancing document permitted a greater range of use than Iarnród Éireann (Irish Rail) was prepared to accept. The High Court examined the proper construction of express easements in Irish law. The court held that an express easement is to be construed by reference to the actual words of the grant and the background circumstances at the time of the transaction. The court will not expand the scope of an easement beyond what can fairly be implied from the words used. This decision is relevant to the construction of express grants in conveyancing documents and is often discussed alongside the substantive law on the nature and scope of easements.',
    subjects: ['property-law'],
    topics: ['easements', 'express grant', 'construction', 'scope of easement', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Gallagher v Elliott',
    citation: '[2018] IEHC 679',
    year: 2018,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A claim of proprietary estoppel based on assurances about farming land must be supported by clear evidence of the assurance, the reliance placed upon it, and the detriment suffered. A claimant must prove on the balance of probabilities that all three elements are established.',
    key_quote:
      'A proprietary estoppel claimant must establish, on the balance of probabilities, that an assurance was given, that they relied upon it, and that they suffered detriment as a result.',
    full_summary:
      'Gallagher claimed that Elliott had made assurances that he would receive the family farm and that he had worked the farm for many years in reliance on those assurances. Elliott denied making such assurances. The High Court examined the evidence carefully and held that the claimant bears the burden of proving on the balance of probabilities that all three elements of proprietary estoppel — assurance, reliance and detriment — are established. Where assurances are disputed, the court must assess the credibility of the witnesses. This case is a good illustration of the evidential dimension of proprietary estoppel claims in Irish agricultural property disputes.',
    subjects: ['property-law'],
    topics: [
      'proprietary estoppel',
      'farming land',
      'assurance',
      'detrimental reliance',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Banks v Goodfellow',
    citation: '(1870) LR 5 QB 549',
    year: 1870,
    court: "Queen's Bench",
    jurisdiction: 'England',
    legal_principle:
      'A testator must have testamentary capacity to make a valid will. This requires that the testator: (1) understands the nature of making a will and its effects; (2) understands the extent of the property being disposed of; (3) understands the claims of those who might expect to benefit; and (4) is not suffering from a disorder of the mind that poisons their affections, perverts their sense of right, or prevents the exercise of their natural faculties in disposing of their property.',
    key_quote:
      'It is essential that a testator shall understand the nature of the act and its effects; shall understand the extent of the property of which he is disposing; shall be able to comprehend and appreciate the claims to which he ought to give effect.',
    full_summary:
      'Banks was a testator who suffered from a mental illness involving delusions but was found to have moments of lucidity. The question was whether he had testamentary capacity at the time he made his will. The court set out the classic four-part test for testamentary capacity: the testator must understand the nature of making a will and its effects, understand the extent of their property, comprehend and appreciate the claims of those who might expect to benefit, and not be suffering from a disorder of the mind that taints their judgment. The court distinguished between general mental incapacity and the specific capacity required at the moment of making the will. Banks was held to have had capacity. This test remains the definitive authority in both English and Irish succession law.',
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'testamentary capacity', 'mental capacity', 'validity of will'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2015', 'FE-1 Property 2018', 'FE-1 Property 2021'],
  },
  {
    case_name: 'Re Glynn',
    citation: '[1990] 2 IR 326',
    year: 1990,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In Ireland, a will must comply with the formal requirements of the Succession Act 1965, including signature by the testator and attestation by two witnesses present at the same time. A failure to comply with these formalities renders the will invalid.',
    key_quote:
      'A will is invalid if the formalities prescribed by the Succession Act 1965 are not observed; no amount of evidence of testamentary intention will save a will that lacks proper execution.',
    full_summary:
      "Re Glynn concerned a will which was alleged to be formally defective — the circumstances of signature and attestation by the witnesses were in dispute. The Irish High Court examined the formal requirements for a valid will under the Succession Act 1965 and held that strict compliance is required. The will must be in writing, signed by the testator (or by someone in their presence and by their direction), and attested by two or more witnesses present at the same time. Any failure in these formalities is fatal to the will's validity. This case reinforces the importance of proper execution in Irish succession law and is cited in the curriculum as an example of the strict approach to will formalities.",
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'formal requirements', 'Succession Act 1965', 'Ireland'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2019'],
  },
  {
    case_name: 'Re Keenan',
    citation: '[1972] IR 262',
    year: 1972,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A gift in a will to a witness or to the spouse of a witness is void under the Succession Act 1965, but the will itself remains valid. A witness to a will cannot benefit from the will.',
    key_quote:
      'A gift to an attesting witness or to the spouse of an attesting witness is void under section 82 of the Succession Act 1965, but the will is not thereby invalidated.',
    full_summary:
      "In Re Keenan, a witness to the testator's will had also been named as a beneficiary under the same will. The question was whether the gift to the witness and the validity of the will itself were affected. The Irish High Court applied section 82 of the Succession Act 1965, which provides that a gift to an attesting witness or the spouse of a witness is void, but that the will remains otherwise valid. The witness retains their capacity to attest the will for the purposes of the formalities — they simply cannot benefit from it. This case is important for its confirmation of the Irish statutory rule on witness-beneficiaries and the distinction between the validity of the gift and the validity of the will itself.",
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'witness beneficiary', 'Succession Act 1965', 'Ireland'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2017', 'FE-1 Property 2020'],
  },
  {
    case_name: 'Re Courtney',
    citation: '[1981] NI 58',
    year: 1981,
    court: 'High Court (Northern Ireland)',
    jurisdiction: 'Northern Ireland',
    legal_principle:
      "A document not executed as a will may be admitted to probate as a testamentary document if it is intended by the deceased to be their testamentary act. The court will examine extrinsic evidence to determine the testator's intention.",
    key_quote:
      'A document can be admitted to probate as a will if it can be shown from internal and extrinsic evidence that the deceased intended it to be a testamentary act.',
    full_summary:
      'The deceased had written a document expressing their wishes regarding the distribution of their property, but the document had not been executed with the formalities required for a valid will. The question was whether it could nonetheless be admitted to probate. The Northern Irish court examined the nature of testamentary documents and held that the relevant question is whether the document was intended by the deceased to be their testamentary act. Where this intention is clear, the document may be admitted as a codicil or as part of the testamentary paper. This Northern Irish case is taught in the Irish curriculum as an example of the approach to informal testamentary documents.',
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'testamentary document', 'intention', 'probate'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Rowe v Law',
    citation: '[1978] IR 55',
    year: 1978,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "In interpreting a will, the court must look first at the words used and give them their ordinary meaning. Extrinsic evidence of the testator's intention may be admitted only where the words of the will are ambiguous or uncertain. The primary rule is to ascertain the intention of the testator from the words of the will itself.",
    key_quote:
      'The first duty of the court in construing a will is to ascertain the intention of the testator from the language of the instrument; extrinsic evidence of intention is admissible only where the language is ambiguous.',
    full_summary:
      "Rowe v Law involved a dispute about the interpretation of a bequest in a will where the language was capable of bearing more than one meaning. The Supreme Court examined the rules of will construction in Irish law and held that the primary rule is to look at the words of the will and give them their ordinary meaning. Only if the words are ambiguous or unclear may the court look at extrinsic evidence of the testator's intention. The court set out the hierarchy of interpretive principles applicable in Irish succession law. The decision is a key Irish authority on will construction and illustrates the traditional primacy of the written text over evidence of subjective intention.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'wills',
      'construction',
      'interpretation',
      'extrinsic evidence',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Collins',
    citation: '[1990] 2 IR 441',
    year: 1990,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A testator cannot be found to have testamentary capacity if, at the time of making the will, they were unable to understand the nature and extent of their property, the persons who might naturally be expected to benefit, and the nature of the testamentary act. Evidence from the medical records and the circumstances of the will's making are relevant.",
    key_quote:
      'The question of testamentary capacity is to be determined at the moment when the will is made, applying the Banks v Goodfellow criteria to the evidence available.',
    full_summary:
      "Re Collins raised the question of whether the testator had testamentary capacity at the time they made their will, given evidence of cognitive decline and possible dementia. The court applied the Banks v Goodfellow test and examined the medical evidence and the circumstances of the will's execution. The case illustrates how the Irish courts approach the factual inquiry into testamentary capacity, including the use of medical records, evidence from those who witnessed the will's making, and any attendance notes made by the solicitor who drafted the will. The solicitor's attendance note recording a discussion with the testator about the will's contents is particularly important in establishing capacity.",
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'testamentary capacity', 'medical evidence', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: "O'Donnell v O'Donnell",
    citation: '[2021] IECA 181',
    year: 2021,
    court: 'Court of Appeal',
    jurisdiction: 'Ireland',
    legal_principle:
      'Undue influence in succession requires proof that the will was not the free act of the testator but was procured by the pressure of another person to such a degree as to overpower the free agency of the testator. The test is whether the mind of the testator was so dominated that their will was not their own.',
    key_quote:
      'Undue influence in the context of a will requires that the influence be of such a nature as to overpower the free agency of the testator and cause them to make a will they would not otherwise have made.',
    full_summary:
      "O'Donnell concerned a challenge to a will on the grounds of undue influence, alleging that one family member had so dominated the elderly testator as to override their free will. The Court of Appeal examined the standard of proof and the nature of undue influence in the succession context. The court confirmed that mere persuasion, encouragement or appeals to family affection do not amount to undue influence: what is required is coercion of a degree that overrides the testator's own free agency. The challenger must establish this on the balance of probabilities. This is an important recent Irish authority on undue influence as a ground for challenging a will's validity.",
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'undue influence', 'will challenge', 'Ireland'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2022'],
  },
  {
    case_name: 'Parker v Felgate',
    citation: '(1883) 8 PD 171',
    year: 1883,
    court: 'Probate Division',
    jurisdiction: 'England',
    legal_principle:
      'A will may be valid even if the testator is incapable of making a fresh will at the time of execution, provided: (1) the testator had capacity when they gave instructions for the will; (2) the will was prepared in accordance with those instructions; and (3) when executing the will, the testator understood they were executing a will prepared in accordance with their earlier instructions.',
    key_quote:
      'If a person has given instructions for a will when they had full testamentary capacity, and the will is prepared in accordance with those instructions and executed when the person has declined in capacity but still understands they are executing a will made per their instructions, the will is valid.',
    full_summary:
      "Parker gave instructions for a will to a solicitor when she had full testamentary capacity but she subsequently lost capacity before the will was executed. When the will was brought to her for execution she no longer had full capacity but could demonstrate she knew she was signing a will prepared in accordance with instructions she had previously given. The Probate Division held the will was valid. The case introduces an important qualification to the general testamentary capacity rule: where the testator had capacity when instructions were given, the will can still be valid even if the testator has declined by the time of execution, provided there is sufficient understanding at the moment of execution. This doctrine of 'Parker v Felgate capacity' is widely applied.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'wills',
      'testamentary capacity',
      'instructions',
      'Parker v Felgate capacity',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2019', 'FE-1 Property 2023'],
  },
  {
    case_name: 'Thorn v Dickens',
    citation: '[1906] WN 54',
    year: 1906,
    court: 'Probate Division',
    jurisdiction: 'England',
    legal_principle:
      "The maxim 'all for mother' incorporated in a will may be sufficient to constitute a valid testamentary disposition if the surrounding circumstances make the testator's intention clear. Plain and simple language, even of an informal nature, may express a testamentary intention.",
    key_quote:
      "Plain words, however informal, may be sufficient to constitute a valid testamentary disposition if the testator's intention is clear.",
    full_summary:
      "The deceased left a will consisting only of the words 'all for mother.' Despite the brevity and informality, the court admitted the document to probate as a valid will. The surrounding circumstances made clear that 'mother' referred to the testator's wife and that the document was intended as a testamentary disposition. The case illustrates that courts will admit informal documents to probate if they can be shown to express testamentary intention and if the formalities of execution have been observed. It is a striking example of a minimally worded will and is regularly cited in succession law teaching.",
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'testamentary intention', 'informal will', 'interpretation'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Crawford v Lawless',
    citation: '[1994] 2 ILRM 59',
    year: 1994,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Section 117 of the Succession Act 1965 imposes a moral duty on a testator to make proper provision for their children having regard to their means. If the testator fails to do so, the court may make such provision out of the estate as it considers just. The court applies a two-stage test.',
    key_quote:
      'Under section 117 of the Succession Act 1965, the court asks first whether the testator has failed in their moral duty to make proper provision for the child, and if so, what provision ought to be made.',
    full_summary:
      'Crawford brought an application under section 117 of the Succession Act 1965, claiming that her late father had failed to make proper provision for her in his will. The High Court set out the two-stage section 117 test: first, was there a failure by the testator to make proper provision for the applicant child, judged as of the date of death? And second, if there was such a failure, what provision should the court now make having regard to all the circumstances? The court must consider the needs of the applicant, the resources of the estate, any testamentary provision made, and the position of other family members. This is the foundational Irish case on the section 117 jurisdiction.',
    subjects: ['property-law'],
    topics: [
      'succession',
      'Succession Act 1965',
      'section 117',
      'moral duty',
      'provision for children',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2020', 'FE-1 Property 2023'],
  },
  {
    case_name: 'Re Urquhart',
    citation: '[1974] IR 197',
    year: 1974,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'The revocation of a will may occur by destruction with the intention of revoking it, by a later will or codicil, or by marriage. Partial destruction of a will document — such as tearing off a signature — may be sufficient to revoke the will if accompanied by the requisite intention.',
    key_quote:
      'Destruction of a will with the intention to revoke constitutes revocation; partial physical destruction, such as tearing off a signature, may suffice if the intention to revoke is clearly established.',
    full_summary:
      "The question in Re Urquhart concerned whether a will had been revoked by partial physical destruction. The testator had torn off the signature on the will. The court examined the requirements for revocation by destruction under the Succession Act 1965 and the law that preceded it, and held that destruction must be accompanied by the requisite intention to revoke. Partial destruction, including tearing off a signature, can amount to revocation if the intention to revoke is established. The court also examined evidence as to the testator's intentions at the time of the destruction. The case is cited in Irish succession law for the analysis of revocation by destruction and the role of intention.",
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'revocation', 'destruction', 'intention to revoke', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Will of William John Murphy',
    citation: '[2024] IEHC 195',
    year: 2024,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In considering whether a testator had testamentary capacity, the court must examine the evidence as a whole, including medical evidence, evidence from the solicitor who took instructions, and evidence from those present at the time of execution. A finding of capacity requires positive evidence that the Banks v Goodfellow criteria were met.',
    key_quote:
      'The court must be satisfied on the evidence as a whole that the testator met the Banks v Goodfellow criteria at the time of making the will; capacity cannot be assumed and must be positively established.',
    full_summary:
      "This 2024 Irish High Court decision concerned a challenge to the will of William John Murphy on grounds of lack of testamentary capacity. The court reviewed all the evidence including medical records, the solicitor's attendance note and testimony of those present at execution. The court emphasised that testamentary capacity must be positively established on the Banks v Goodfellow criteria and cannot simply be presumed. The decision provides modern Irish guidance on how the capacity inquiry is conducted and the weight to be given to different types of evidence. The solicitor's contemporaneous attendance note was given significant weight. This is a very recent and relevant Irish authority for FE-1 candidates.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'wills',
      'testamentary capacity',
      'evidence',
      'attendance note',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Estate of Elizabeth Falvey',
    citation: '[2024] IEHC 302',
    year: 2024,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "Where a will is disputed on the grounds of undue influence, the court must examine all the circumstances of the relationship between the testator and the alleged influencer, the testator's vulnerability, and any suspicious circumstances surrounding the making of the will.",
    key_quote:
      "Suspicious circumstances surrounding the preparation and execution of a will, combined with evidence of the testator's vulnerability, can displace the presumption of regularity and shift the burden to the proponent to establish the validity of the will.",
    full_summary:
      'The estate of Elizabeth Falvey was disputed by family members who alleged that the will had been procured by undue influence and that there were suspicious circumstances surrounding its making. The High Court examined the law on suspicious circumstances in the making of a will and the shifting of the burden of proof. Where there are suspicious circumstances — for example, a beneficiary was closely involved in the preparation of the will — the court may require positive proof that the will represents the true and independent wishes of the testator. The case provides 2024 Irish guidance on the interplay between suspicious circumstances, undue influence and testamentary capacity challenges.',
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'undue influence', 'suspicious circumstances', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Gradual Investments Ltd v Grant',
    citation: '[2024] IECA 85',
    year: 2024,
    court: 'Court of Appeal',
    jurisdiction: 'Ireland',
    legal_principle:
      'The legal personal representative of an estate has a duty to administer the estate in accordance with the Succession Act 1965. Where a personal representative fails to collect and distribute assets, beneficiaries may seek court orders compelling proper administration of the estate.',
    key_quote:
      'A legal personal representative who fails to administer the estate in a timely manner may be compelled to do so by court order, and may face a surcharge in appropriate circumstances.',
    full_summary:
      'Gradual Investments, as a creditor and beneficiary of an estate, brought proceedings against Grant as legal personal representative for failure to administer the estate properly. The Court of Appeal considered the duties of a legal personal representative under the Succession Act 1965 and the remedies available where those duties are not discharged. The court confirmed that personal representatives owe a duty to collect and realise the assets of the estate, pay debts and liabilities, and distribute the residue in accordance with the will or intestacy rules within a reasonable time. Failure to do so exposes the personal representative to liability and may result in court orders for administration. This 2024 decision updates the Irish law on personal representative duties.',
    subjects: ['property-law'],
    topics: [
      'succession',
      'legal personal representative',
      'administration of estate',
      'Succession Act 1965',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Shannon v Shannon',
    citation: '[2020] IEHC 494',
    year: 2020,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A section 117 application under the Succession Act 1965 requires a two-stage inquiry: (1) did the testator fail in their moral duty to make proper provision for the applicant child; and (2) if so, what provision should the court order having regard to all the circumstances including the estate, other beneficiaries, and the applicant's needs and contributions.",
    key_quote:
      'The section 117 inquiry requires the court first to find a failure of moral duty and then to exercise a discretion as to the appropriate provision, having regard to all the circumstances of the family and the estate.',
    full_summary:
      "In Shannon v Shannon, children of the deceased brought a section 117 application against the estate claiming that the testator had failed in their moral duty to make proper provision for them under the Succession Act 1965. The court examined the two-stage test and emphasised that the moral duty is judged as at the date of death, and that the court must not simply substitute its own view for that of the testator. Rather, the court asks whether the testator acted as a prudent and just parent in all the circumstances. Where the children had been well provided for during the testator's lifetime, this is relevant. The case provides recent Irish authority on the approach to section 117 claims.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'Succession Act 1965',
      'section 117',
      'moral duty',
      'provision for children',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2022'],
  },
  {
    case_name: 'Bennett v Bennett',
    citation: '[1879] 10 ChD 474',
    year: 1879,
    court: 'Chancery Division',
    jurisdiction: 'England',
    legal_principle:
      'Where a will gifts property to a person absolutely, any attached condition purporting to restrict alienation or prevent the beneficiary from disposing of the property is void as repugnant to the nature of an absolute gift.',
    key_quote:
      'A gift of an absolute interest is inconsistent with a condition restraining alienation; such a condition is void as repugnant to the grant.',
    full_summary:
      "The testator gave property to their child absolutely but included a condition that it could not be sold or mortgaged during the child's lifetime. The court held that the condition was void as repugnant to the absolute gift made. You cannot give an absolute interest in property and at the same time effectively take away the incidents of ownership by preventing alienation. This is the foundational case on void conditions in wills — conditions which are wholly inconsistent with the nature of the interest granted will be struck down. The principle applies equally to conditions imposed by way of settlement or gift inter vivos.",
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'void conditions', 'restraint on alienation', 'repugnancy'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Murphy v Murphy',
    citation: '[1999] 1 ILRM 297',
    year: 1999,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "The surviving spouse's right to a legal right share under section 111 of the Succession Act 1965 is a statutory entitlement that cannot be defeated by the deceased spouse's will or by any testamentary provision that falls short of satisfying the legal right share.",
    key_quote:
      "The surviving spouse's legal right share under section 111 of the Succession Act 1965 is a statutory minimum that cannot be defeated by the terms of the deceased's will.",
    full_summary:
      "Murphy concerned the rights of a surviving spouse under section 111 of the Succession Act 1965 to a legal right share of the deceased spouse's estate. The Supreme Court confirmed that the legal right share is a non-excludable statutory right: one half of the estate where there are no children, or one third where there are children. The surviving spouse must elect between accepting any testamentary provision and the legal right share within six months of notification. This statutory right takes priority over any testamentary dispositions. The case is critical for understanding the rights of surviving spouses under Irish succession law and the interaction of the legal right share with testamentary provisions.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'Succession Act 1965',
      'legal right share',
      'surviving spouse',
      'section 111',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2017', 'FE-1 Property 2021'],
  },
  {
    case_name: "O'Dwyer v Keegan",
    citation: '[1997] 2 IR 585',
    year: 1997,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Where a testator leaves property to a beneficiary conditionally on that beneficiary surviving the testator, the gift lapses if the beneficiary predeceases the testator. The anti-lapse provisions in the Succession Act 1965 apply only in specific circumstances involving gifts to children of the testator.',
    key_quote:
      'A gift to a named beneficiary who predeceases the testator lapses and falls into residue or results on intestacy; the anti-lapse provision in section 98 of the Succession Act 1965 applies only to gifts to children of the testator.',
    full_summary:
      "O'Dwyer v Keegan examined what happens when a beneficiary under a will predeceases the testator and whether the gift lapses. The Supreme Court confirmed the general rule that a gift lapses if the beneficiary does not survive the testator, and that the doctrine of lapse applies unless the anti-lapse provisions under section 98 of the Succession Act 1965 apply. Section 98 preserves the gift for the children of the predeceased beneficiary, but only where the beneficiary was a child of the testator. The case is important for Irish succession law on lapse and the operation of section 98.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'Succession Act 1965',
      'lapse',
      'predeceasing beneficiary',
      'section 98',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Phelan',
    citation: '[1972] IR 153',
    year: 1972,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In Ireland, the rule in Lassence v Tierney applies so that where a testator gives an absolute gift subject to a condition that cannot take effect, the gift is read as an absolute gift, free from the condition. Words of gift are construed to give effect to the primary intention of the testator.',
    key_quote:
      'Where a gift is made subject to a condition subsequent that is void or that cannot take effect, the gift stands freed of the condition and the beneficiary takes absolutely.',
    full_summary:
      'Re Phelan concerned the construction of a gift in a will that was expressed to be subject to a condition which subsequently failed or could not be given effect. The court considered whether the failure of the condition defeated the gift or whether the donee took free of the condition. Applying the rule in Lassence v Tierney and related Irish authorities, the court held that where a condition attached to a gift fails or cannot take effect, the gift itself is not defeated: the donee takes absolutely, free of the void or failed condition. This principle protects the primary gift-giving intention of the testator.',
    subjects: ['property-law'],
    topics: [
      'succession',
      'wills',
      'condition subsequent',
      'failed condition',
      'construction',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Cleaver v Mutual Reserve Fund Life Association',
    citation: '[1892] 1 QB 147',
    year: 1892,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      "The forfeiture rule prevents a person who has unlawfully killed another from benefiting from the death under the deceased's estate. A murderer cannot benefit from their victim's estate whether under a will or on intestacy.",
    key_quote:
      'No person can take any benefit from any act which the law regards as felonious; a murderer cannot benefit from the estate of the person they have murdered.',
    full_summary:
      'Mrs Cleaver murdered her husband and sought to claim the proceeds of a life insurance policy and benefits under his estate. The Court of Appeal applied the public policy forfeiture rule to hold that a person who has feloniously killed another cannot benefit from that killing, whether under a will, intestacy or insurance policy. The principle that no person should profit from their own wrong is one of the most fundamental doctrines in succession law. This case established the forfeiture rule as a general principle of English law and is the starting point for all discussion of forfeiture in the succession context. The rule now has statutory expression in England and Wales under the Forfeiture Act 1982.',
    subjects: ['property-law'],
    topics: ['forfeiture rule', 'succession', 'murder', 'public policy', 'killing'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2019', 'FE-1 Property 2022'],
  },
  {
    case_name: 'Riggs v Palmer',
    citation: '(1889) 115 NY 506',
    year: 1889,
    court: 'New York Court of Appeals',
    jurisdiction: 'United States',
    legal_principle:
      'No person may profit from their own wrong. Where a legatee has murdered the testator to accelerate their inheritance, equity and public policy prevent the killer from taking the benefit.',
    key_quote:
      'No one shall be permitted to profit by their own fraud, or to take advantage of their own wrong, or to found any claim upon their own iniquity, or to acquire property by their own crime.',
    full_summary:
      "Elmer Palmer murdered his grandfather to prevent him from changing his will and to accelerate his inheritance. The New York Court of Appeals held that despite the will being technically valid and duly executed, Elmer could not benefit from it as doing so would be contrary to the fundamental legal maxim that no one may profit from their own wrong. This American case is frequently cited in Irish and English succession law courses as a foundational statement of the principle that underpins the forfeiture rule. Justice Cardozo's famous dissent, arguing that courts should apply statutes as written, has also been influential in jurisprudential debates about the relationship between law and morality.",
    subjects: ['property-law'],
    topics: ['forfeiture rule', 'succession', 'murder', 'profit from wrong', 'public policy'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: "O'Brien v McCann",
    citation: '[2021] IEHC 598',
    year: 2021,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "The forfeiture rule applies in Ireland to prevent a person who has unlawfully killed another from inheriting under the deceased's estate. The rule applies to murder and may also apply to manslaughter in appropriate circumstances.",
    key_quote:
      'The forfeiture rule applies in Irish law to prevent a killer from benefiting from the estate of the person they have unlawfully killed, and may apply to manslaughter as well as murder.',
    full_summary:
      "O'Brien brought proceedings in relation to the estate of a deceased who had been unlawfully killed by McCann. The question was whether McCann was disentitled from benefiting from the estate under the forfeiture rule. The Irish High Court confirmed that the forfeiture rule is part of Irish law and prevents a person who has unlawfully killed another from inheriting or otherwise benefiting from the deceased's estate. The court considered whether the rule applies to manslaughter as well as murder and confirmed that it can, depending on the circumstances of the killing. Unlike England, Ireland has not enacted a Forfeiture Act and the rule operates at common law. This is an important recent Irish authority on the forfeiture rule.",
    subjects: ['property-law'],
    topics: ['forfeiture rule', 'succession', 'Ireland', 'unlawful killing', 'manslaughter'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2023'],
  },
  {
    case_name: 'Re K',
    citation: '[1985] Ch 85',
    year: 1985,
    court: 'Chancery Division',
    jurisdiction: 'England',
    legal_principle:
      'Under the Forfeiture Act 1982 (England and Wales), the court has jurisdiction to modify the effect of the forfeiture rule in cases where the justice of the case requires it. The court will consider all the circumstances including the conduct of the deceased and the killer.',
    key_quote:
      'The court has a statutory discretion under the Forfeiture Act 1982 to modify the effect of the forfeiture rule where the justice of the case requires, having regard to the conduct of all relevant parties.',
    full_summary:
      'A widow killed her husband in circumstances where she was suffering from domestic abuse and fear. She was convicted of manslaughter. The question arose whether the forfeiture rule applied to prevent her inheriting under his estate, and if so whether the court should exercise its discretion under the Forfeiture Act 1982 to modify the rule. The court held that the forfeiture rule applied to manslaughter but that the Forfeiture Act 1982 gave the court a discretion to modify its effect. Having regard to all the circumstances, including the history of domestic abuse, the court modified the rule to allow the widow to inherit. This case is important for the analysis of discretion and mitigation under the English forfeiture regime.',
    subjects: ['property-law'],
    topics: [
      'forfeiture rule',
      'Forfeiture Act 1982',
      'manslaughter',
      'domestic abuse',
      'judicial discretion',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2018', 'FE-1 Property 2022'],
  },
  {
    case_name: 'Rasmanis v Jurewitsch',
    citation: '(1969) 70 SR (NSW) 407',
    year: 1969,
    court: 'Supreme Court of New South Wales',
    jurisdiction: 'Australia',
    legal_principle:
      "Where joint tenants hold property and one kills the other, the forfeiture rule prevents the killer from taking the deceased's interest by survivorship. The killer's interest as joint tenant is not extinguished but they are instead treated as holding on resulting trust for the deceased's estate.",
    key_quote:
      "A joint tenant who kills the other cannot take by survivorship; the killer holds the property on trust for the victim's estate to the extent of the victim's share.",
    full_summary:
      "Jurewitsch killed his wife with whom he held a property as joint tenants. The question arose whether he could take the whole property by right of survivorship. The New South Wales court held that the forfeiture rule prevented this: a killer cannot take the benefit of their killing by survivorship. The court devised the constructive trust solution: the killer is treated as holding the deceased's beneficial share on trust for their estate. This approach — a constructive trust over half the property — avoids the technical difficulty that the joint tenancy would otherwise give the killer an automatic benefit. The case is frequently cited in Irish and English materials on the forfeiture rule and joint tenancy.",
    subjects: ['property-law'],
    topics: ['forfeiture rule', 'joint tenancy', 'survivorship', 'constructive trust', 'killing'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2019'],
  },
  {
    case_name: 'Public Trustee v Evans',
    citation: '[1985] 2 NZLR 188',
    year: 1985,
    court: 'High Court of New Zealand',
    jurisdiction: 'New Zealand',
    legal_principle:
      "The forfeiture rule applies to prevent a person who has caused the death of another — even by a non-criminal act — from benefiting under the deceased's estate where it would be against public policy to allow such benefit.",
    key_quote:
      "The forfeiture rule is a rule of public policy and may operate beyond cases of criminal killing where it would be unconscionable to allow a party who caused another's death to benefit from it.",
    full_summary:
      "The Public Trustee sought a declaration as to whether a beneficiary who had caused another's death (in circumstances not amounting to murder or manslaughter) could nonetheless benefit under the estate. The New Zealand court examined whether the forfeiture rule was limited to criminal killing or extended more broadly to cases where it would be unconscionable for the person responsible for another's death to inherit. The court held the rule was grounded in public policy and could in principle extend beyond criminal killing. The case is cited in Irish and English materials for its discussion of the scope of the forfeiture rule.",
    subjects: ['property-law'],
    topics: [
      'forfeiture rule',
      'public policy',
      'succession',
      'New Zealand',
      'scope of forfeiture',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Stone',
    citation: '[1989] 1 Qd R 351',
    year: 1989,
    court: 'Supreme Court of Queensland',
    jurisdiction: 'Australia',
    legal_principle:
      'A conviction for manslaughter will not necessarily invoke the forfeiture rule: the court must consider the circumstances of the killing, the degree of moral culpability, and whether it would be contrary to public policy for the killer to benefit.',
    key_quote:
      'Not every manslaughter conviction will invoke the forfeiture rule; the court must consider the nature of the killing and whether allowing the killer to benefit would be contrary to public policy.',
    full_summary:
      'Stone was convicted of manslaughter after killing her husband in circumstances of prolonged domestic violence. The question was whether the forfeiture rule applied to prevent her inheriting under his estate. The Queensland court held that while the forfeiture rule applies to manslaughter, not every manslaughter conviction automatically engages the rule: the court must consider the circumstances of the killing and the degree of moral culpability. Where the killing occurred in circumstances of serious domestic abuse and diminished culpability, the court may decline to apply the rule or may limit its application. This case is an important example of how courts can mitigate the harshness of the forfeiture rule in domestic violence cases.',
    subjects: ['property-law'],
    topics: [
      'forfeiture rule',
      'manslaughter',
      'domestic violence',
      'moral culpability',
      'succession',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Goods of Shaw',
    citation: '[1944] IR 107',
    year: 1944,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A soldier's privileged will — made orally or informally by a soldier on actual military service — is valid in Ireland notwithstanding the failure to comply with the usual formality requirements for wills. Section 77 of the Succession Act 1965 preserves this exception.",
    key_quote:
      'A will made by a soldier on actual military service is valid without the usual formalities and may be oral or wholly informal in character.',
    full_summary:
      "In Re Goods of Shaw, a soldier made an oral declaration of his wishes regarding his property while on active military service. He died before being able to make a formal will. The question was whether the informal oral statement could be admitted to probate as a valid will. The court held that soldiers' privileged wills — recognised under statute and the common law — are exempt from the ordinary formal requirements for a valid will and may be oral or written informally. The Succession Act 1965, section 77, codifies this exception in Irish law. This case illustrates the exception to formal will requirements that exists in the context of military service.",
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'privileged will', 'soldier', 'formal requirements', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Shoebelt v Barber',
    citation: '[2014] NZHC 1935',
    year: 2014,
    court: 'High Court of New Zealand',
    jurisdiction: 'New Zealand',
    legal_principle:
      'The forfeiture rule can be modified or disapplied by statute. Where a jurisdiction has enacted legislation enabling a court to grant relief from forfeiture, the court must exercise its discretion by weighing the culpability of the killer, the circumstances of the killing, and the interests of other beneficiaries.',
    key_quote:
      'Where relief from forfeiture is sought, the court must weigh the gravity of the offending, the circumstances of the killing, the financial position of the killer, and the interests of innocent third parties in the estate.',
    full_summary:
      "Barber sought relief from the application of the forfeiture rule after being convicted of manslaughter in the killing of the deceased who was also a member of the deceased's family. The New Zealand court considered the discretion available under the relevant legislation to modify the forfeiture rule. The court set out the factors to be weighed in exercising this discretion and held that full modification was not appropriate given the circumstances of the killing. The case provides a useful comparative framework for analysing the discretionary modification of the forfeiture rule, which is particularly relevant for Irish law as Ireland lacks the equivalent of the English Forfeiture Act 1982.",
    subjects: ['property-law'],
    topics: [
      'forfeiture rule',
      'relief from forfeiture',
      'New Zealand',
      'manslaughter',
      'discretion',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Pechar',
    citation: '[1969] NZLR 574',
    year: 1969,
    court: 'Supreme Court of New Zealand',
    jurisdiction: 'New Zealand',
    legal_principle:
      "The forfeiture rule applies to any property that the killer would take by reason of the victim's death, whether under a will, intestacy, joint tenancy survivorship, or insurance policy. The rule is comprehensive in its operation.",
    key_quote:
      "The forfeiture rule prevents a killer from taking any benefit that accrues by reason of the victim's death, including benefits under a will, intestacy, or joint tenancy.",
    full_summary:
      "Re Pechar examined the scope of the forfeiture rule in New Zealand and held that it prevents the killer from taking any benefit that accrues by reason of the victim's death, including benefits under the deceased's will, on intestacy, by survivorship as a joint tenant, or under an insurance policy payable on death. The rule is comprehensive and covers all manner of post-death financial benefit. The case is often cited in Irish and English succession courses as authority for the breadth of the forfeiture rule, supplementing the foundational English decision in Cleaver v Mutual Reserve Fund Life Association.",
    subjects: ['property-law'],
    topics: ['forfeiture rule', 'succession', 'scope', 'New Zealand', 'joint tenancy', 'insurance'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'H v H',
    citation: '[2014] IEHC 395',
    year: 2014,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Under the Family Law Act 1995 and the Family Law (Divorce) Act 1996, the court has a wide jurisdiction to make property adjustment orders on the dissolution of a marriage. In doing so, the court must have regard to proper provision for each spouse and dependent children.',
    key_quote:
      'The court must exercise its jurisdiction to adjust property on marital dissolution by reference to the requirement to make proper provision for both spouses and any dependent children of the marriage.',
    full_summary:
      "H v H concerned an application for property adjustment orders on judicial separation. The High Court examined the extent of the court's jurisdiction under the Family Law Act 1995 to adjust the property rights of spouses. The court confirmed that the standard for property adjustment is 'proper provision' as defined in the 1995 Act and not a strict 50/50 division. The court must consider the financial needs and resources of each spouse, their contributions (financial and otherwise), the welfare of any children, and the need to make a clean break where possible. The case is useful for understanding how Irish law approaches the division of property on marital breakdown, including family home and investment property.",
    subjects: ['property-law'],
    topics: [
      'family property',
      'judicial separation',
      'property adjustment',
      'Family Law Act 1995',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'EB v SS',
    citation: '[2019] IECA 295',
    year: 2019,
    court: 'Court of Appeal',
    jurisdiction: 'Ireland',
    legal_principle:
      'In civil partnership dissolution proceedings under the Civil Partnership and Certain Rights and Obligations of Cohabitants Act 2010, the court has jurisdiction equivalent to that in divorce proceedings to make property adjustment orders to achieve proper provision for both civil partners.',
    key_quote:
      "The court's jurisdiction to make property adjustment orders for civil partners on dissolution is equivalent in scope to the divorce jurisdiction and is governed by the same principles of proper provision.",
    full_summary:
      "EB and SS were civil partners who separated, and EB sought property adjustment orders under the Civil Partnership and Certain Rights and Obligations of Cohabitants Act 2010. The Court of Appeal considered the scope of the court's property jurisdiction for civil partners and confirmed that it is broadly equivalent to the jurisdiction in divorce proceedings. The court must make proper provision for each party, having regard to their financial circumstances, contributions, and the need to achieve a fair outcome. This case is significant in extending the family property law principles applicable to married couples to civil partners under Irish law.",
    subjects: ['property-law'],
    topics: [
      'family property',
      'civil partnership',
      'property adjustment',
      'Civil Partnership Act 2010',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'SOB v MOD',
    citation: '[2020] IEHC 234',
    year: 2020,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Qualified cohabitants under the Civil Partnership and Certain Rights and Obligations of Cohabitants Act 2010 may apply for financial relief orders upon the ending of the relationship. A qualified cohabitant must show two years of cohabitation (with a dependent child) or five years otherwise.',
    key_quote:
      'A qualified cohabitant who satisfies the statutory criteria may apply for financial relief orders under the 2010 Act to redress any financial dependency arising from the cohabiting relationship.',
    full_summary:
      "SOB and MOD were cohabitants who separated after a long relationship during which a child had been born. SOB applied for relief as a qualified cohabitant under the Civil Partnership and Certain Rights and Obligations of Cohabitants Act 2010. The High Court examined the requirements for qualification and the relief available. The court confirmed that a cohabitant who has been in a qualifying relationship for the statutory period may seek financial relief including property adjustment orders where there is a financial dependency arising from the relationship. The cohabitant's relief is more limited than that of a spouse. The case provides important guidance on the property rights of cohabitants in Irish law.",
    subjects: ['property-law'],
    topics: [
      'family property',
      'cohabitants',
      'Civil Partnership Act 2010',
      'qualified cohabitant',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2022'],
  },
  {
    case_name: 'Saltares v Kristovich',
    citation: '[2002] CA B048963 (California)',
    year: 2002,
    court: 'Court of Appeal of California',
    jurisdiction: 'United States',
    legal_principle:
      'The forfeiture rule applies even where the killer is not criminally convicted, provided there is civil proof that the killing was unlawful. A lower standard of proof (balance of probabilities) may apply in civil forfeiture proceedings as compared to criminal conviction.',
    key_quote:
      'The forfeiture rule may operate in civil proceedings on the balance of probabilities standard and does not require a criminal conviction for the unlawful killing.',
    full_summary:
      "Saltares was not criminally convicted in connection with the death of the deceased but the victim's estate sought to apply the forfeiture rule in civil proceedings to prevent inheritance. The California court held that the civil forfeiture proceedings could proceed on the balance of probabilities standard without requiring a criminal conviction. This comparative case is regularly cited in Irish and English succession law courses because Ireland, like California, must operate the forfeiture rule without a dedicated statute, and the question of what standard of proof applies in the absence of a criminal conviction is practically important. The case supports a civil standard approach in Irish law.",
    subjects: ['property-law'],
    topics: [
      'forfeiture rule',
      'civil standard of proof',
      'no criminal conviction',
      'succession',
      'comparative',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re SF',
    citation: '[2015] IEHC 716',
    year: 2015,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "In Ireland, the forfeiture rule may apply in civil proceedings on the balance of probabilities. A person who has killed another unlawfully — even without a criminal conviction — may be prevented from benefiting from the victim's estate on the civil standard of proof.",
    key_quote:
      'The forfeiture rule applies in Irish civil proceedings and can be established on the balance of probabilities, without requiring a criminal conviction for the unlawful killing.',
    full_summary:
      "Re SF involved an application to the High Court regarding the estate of a deceased where the person who would otherwise benefit from the estate had been responsible for the deceased's death, but had not been the subject of a criminal prosecution. The High Court confirmed that the forfeiture rule applies in Ireland as a matter of civil law and that it can be established on the civil balance of probabilities standard. The court does not require a prior criminal conviction to invoke the rule. This is an important Irish authority confirming both the existence and the standard of proof applicable to the forfeiture rule in Irish succession law, given the absence of a Forfeiture Act equivalent to the English legislation.",
    subjects: ['property-law'],
    topics: ['forfeiture rule', 'Ireland', 'civil proceedings', 'standard of proof', 'succession'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2019', 'FE-1 Property 2023'],
  },
  {
    case_name: 'R v R',
    citation: '[1991] UKHL 12; [1992] 1 AC 599',
    year: 1991,
    court: 'House of Lords',
    jurisdiction: 'England',
    legal_principle:
      'There is no marital exemption in criminal law for rape. A husband can be found guilty of raping his wife. The common law rule that a husband cannot rape his wife was based on an outdated fiction of implied consent and is inconsistent with modern understandings of consent and equality.',
    key_quote:
      'The common law fiction that a husband cannot be convicted of raping his wife has no place in modern law; marriage does not imply irrevocable consent to sexual intercourse.',
    full_summary:
      "R v R was a landmark decision in which the House of Lords abolished the marital rape exemption in English criminal law. The court held that the common law rule — attributed to Hale's Pleas of the Crown (1736) — that a husband cannot rape his wife because she gives irrevocable consent to intercourse on marriage, was a fiction that no longer had any place in modern law. Marriage does not and cannot imply irrevocable consent to sexual intercourse. The decision was of revolutionary significance for the criminal law of rape and has been followed in many jurisdictions. In Ireland, the Criminal Law (Rape) (Amendment) Act 1990 had already abolished the marital exemption by statute. The decision is taught in the Irish context both as comparative criminal law and in the family law syllabus.",
    subjects: ['criminal-law'],
    topics: ['rape', 'marital exemption', 'consent', 'criminal law', 'family law'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Paul McGrath v Tuath Housing Association',
    citation: '[2022] IEHC 431',
    year: 2022,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A tenant's rights of occupancy under a social housing tenancy are protected by the Residential Tenancies Act 2004 and constitutional rights. A social housing landlord seeking to terminate a tenancy must comply strictly with the statutory notice and dispute resolution requirements.",
    key_quote:
      'A social housing landlord is subject to the same statutory obligations under the Residential Tenancies Act 2004 as a private landlord and must follow proper statutory procedures before terminating a tenancy.',
    full_summary:
      "McGrath challenged Tuath Housing Association's attempt to terminate his social housing tenancy. The High Court examined the rights of social housing tenants and confirmed that Tuath, as a registered housing body, was a 'landlord' for the purposes of the Residential Tenancies Act 2004 and was required to comply with all statutory notice and dispute resolution requirements before terminating the tenancy. Failure to comply with the statutory process rendered the purported termination invalid. The case is relevant in Irish property law for its confirmation that social housing tenants have the same statutory protections as private sector tenants.",
    subjects: ['property-law'],
    topics: [
      'tenancy',
      'social housing',
      'Residential Tenancies Act 2004',
      'termination',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Dunnes Stores (Oakville) Ltd v Dafora Ltd',
    citation: '[2024] IECA 37',
    year: 2024,
    court: 'Court of Appeal',
    jurisdiction: 'Ireland',
    legal_principle:
      "A commercial tenant's statutory right to a new tenancy under the Landlord and Tenant Acts is a valuable property right. The landlord must show that one of the statutory grounds for refusing a new tenancy applies; mere expiry of the lease does not entitle the landlord to recover possession.",
    key_quote:
      'A commercial tenant in occupation at the end of a lease has a statutory entitlement to apply for a new tenancy under the Landlord and Tenant Acts and the landlord must establish a statutory ground for refusal.',
    full_summary:
      "Dunnes Stores sought to assert its statutory right to a new tenancy at the end of a commercial lease over its supermarket premises. Dafora as landlord opposed the new tenancy. The Court of Appeal examined the commercial tenant's rights under the Landlord and Tenant (Amendment) Act 1980 and confirmed that a qualifying tenant has a statutory right to a new tenancy that can only be defeated if the landlord establishes one of the statutory grounds for refusal. This 2024 decision is significant for commercial property law in Ireland, confirming the strength of the statutory tenancy right and the limited grounds on which a landlord can oppose renewal.",
    subjects: ['property-law'],
    topics: ['commercial tenancy', 'Landlord and Tenant Acts', 'new tenancy', 'renewal', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Myles',
    citation: '[1993] ILRM 34',
    year: 1993,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A codicil must comply with the same formal requirements as a will under the Succession Act 1965. A codicil revives any previously revoked will to which it refers, provided the revival is clear from the terms of the codicil.',
    key_quote:
      'A codicil duly executed has the effect of reviving a previously revoked will to which it refers; the revival is read together with the original will as a single testamentary instrument.',
    full_summary:
      'Re Myles concerned a codicil that was purportedly made to a will which the testator had previously revoked by destruction. The question was whether the codicil revived the revoked will. The High Court held that a duly executed codicil referring to a previously revoked will can revive that will, provided the reviving intent is clear from the codicil. The codicil and the revived will are then read together as a single testamentary document. This Irish case is a useful authority on revival and codicils in Irish succession law, where the Succession Act 1965 governs these issues. The case is also relevant to the rules on revocation by destruction and the conditions under which a revoked will can be revived.',
    subjects: ['property-law'],
    topics: ['succession', 'wills', 'codicil', 'revival', 'revocation', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Julian',
    citation: '[1950] IR 57',
    year: 1950,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A mutual will arises where two persons (often spouses) make wills in agreed terms on the faith of an agreement not to revoke them without the consent of the other. Where one party dies having made their mutual will, the survivor is bound by the agreement not to revoke theirs and equity enforces the agreement by constructive trust.',
    key_quote:
      'Where mutual wills are made pursuant to an agreement not to revoke them, and one party dies, equity imposes a constructive trust on the survivor to give effect to the agreement.',
    full_summary:
      "Re Julian is the leading Irish authority on mutual wills. The testators made wills in agreed terms and each agreed not to revoke them without the other's consent. After one party died having made their mutual will, the survivor attempted to revoke theirs. The High Court held that mutual wills are enforceable in equity: when one party dies in reliance on the agreement, a constructive trust is imposed on the survivor's estate to carry out the terms of the mutual wills. Revocation of the surviving mutual will after the death of the first testator is technically possible but equity will hold the survivor or their estate bound to carry out the agreement. This case is a key Irish authority on mutual wills and constructive trust.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'mutual wills',
      'constructive trust',
      'agreement not to revoke',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2018', 'FE-1 Property 2022'],
  },
  {
    case_name: 'McCormack v Duff',
    citation: '[2012] IEHC 362',
    year: 2012,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "An executor who has intermeddled in the estate after the testator's death cannot subsequently renounce the office of executor. Intermeddling by carrying out acts of administration of the estate makes the person an executor de son tort.",
    key_quote:
      "An executor who intermeddles with the estate after the testator's death is bound by their acts and may not subsequently renounce the office; they become an executor de son tort.",
    full_summary:
      'McCormack was named as executor in the will of the deceased. Before formally extracting a grant of probate, McCormack carried out various acts of administration including collecting assets and paying debts. McCormack subsequently sought to renounce the executorship. The High Court held that having intermeddled with the estate, McCormack could not subsequently renounce. Intermeddling constitutes acceptance of the office and renders the person an executor de son tort, who is liable for the assets they have dealt with. The case is an important Irish authority on the law of executors and the consequences of intermeddling before extracting a grant of probate.',
    subjects: ['property-law'],
    topics: [
      'succession',
      'executor',
      'intermeddling',
      'executor de son tort',
      'renunciation',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Turnham-Jones',
    citation: '[2022] IEHC 379',
    year: 2022,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'An application under section 117 of the Succession Act 1965 by an adult child must be brought within six months of the first taking out of representation to the estate. This limitation period is strictly applied and cannot generally be extended.',
    key_quote:
      'The six-month limitation period for applications under section 117 of the Succession Act 1965 runs from the date of the first grant of representation and is strictly applied.',
    full_summary:
      "An adult child of the deceased sought to bring a section 117 application out of time, arguing that there were exceptional circumstances justifying extension of the six-month limitation period from the date of the first grant of representation under the Succession Act 1965. The High Court examined the statutory limitation period for section 117 applications and held that it is strictly applied. The limitation period runs from the first taking out of representation and is not easily extended. The applicant's failure to act within time defeated the claim. This 2022 decision is significant as a recent Irish authority on the procedural time limits for section 117 claims.",
    subjects: ['property-law'],
    topics: ['succession', 'section 117', 'limitation period', 'Succession Act 1965', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Brava (Deceased)',
    citation: '[2021] IEHC 556',
    year: 2021,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Where the application of the intestacy rules under the Succession Act 1965 would result in the property of a deceased Irish person passing to distant relatives or to the State, the court will apply the rules strictly as set out in the Act. The court has no discretion to depart from the statutory intestacy rules.',
    key_quote:
      'The intestacy provisions of the Succession Act 1965 are applied strictly; the court has no general discretion to depart from the statutory rules of distribution.',
    full_summary:
      "The estate of the deceased Brava fell to be distributed under the intestacy rules in the Succession Act 1965 as the deceased died without a valid will. Questions arose as to the priority of various classes of relatives under the statutory scheme. The High Court applied the Succession Act 1965 intestacy provisions strictly, confirming the order of priority among surviving relatives and the circumstances in which, in default of any relatives, the estate would pass to the State as ultimate intestate successor (bona vacantia). The case illustrates the operation of the Irish intestacy rules and the court's strict application of the statutory scheme without a general discretion to depart from it.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'intestacy',
      'Succession Act 1965',
      'distribution',
      'bona vacantia',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Strava (Deceased)',
    citation: '[2022] IEHC 645',
    year: 2022,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A foreign national dying intestate in Ireland with Irish property may have their estate distributed partly according to Irish law (for immoveable property in Ireland) and partly according to the law of their domicile (for moveable property). This is the doctrine of scission in private international law of succession.',
    key_quote:
      "Immoveable property in Ireland belonging to a deceased foreign national is distributed according to Irish law; moveable property is distributed according to the law of the deceased's domicile.",
    full_summary:
      "The estate of the deceased Strava, a foreign national who died owning property in Ireland, raised questions about the applicable law for distribution of the estate. The High Court applied the conflict of laws rules applicable in Irish succession law: the succession to immoveable property (land and buildings in Ireland) is governed by the lex situs (Irish law), while moveable property is governed by the law of the deceased's domicile. This doctrine of scission means that different parts of the same estate may be distributed according to different legal systems. The case is relevant in an increasingly international society and for FE-1 candidates in understanding the private international law dimension of Irish succession law.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'private international law',
      'scission',
      'domicile',
      'lex situs',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'B Kieran (A Ward of Court)',
    citation: '[2017] IEHC 434',
    year: 2017,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A person who lacks testamentary capacity by reason of mental incapacity cannot make a valid will. However, the court exercising its wardship jurisdiction may in exceptional circumstances make a will on behalf of a ward of court under the inherent jurisdiction of the court.',
    key_quote:
      "The court's inherent jurisdiction extends to making a statutory will on behalf of a person who lacks testamentary capacity, where this is required in the interests of the ward and justice.",
    full_summary:
      "B Kieran was a ward of court who lacked testamentary capacity by reason of mental incapacity but had significant assets. An application was brought to the court to make a statutory will on behalf of the ward. The High Court exercised its inherent jurisdiction to make a will on behalf of the ward, finding that this was necessary in the ward's best interests and having regard to the likely intentions of the ward before the loss of capacity. The court considered the views of the ward's family and the impact of intestacy rules. This case illustrates the statutory will jurisdiction in Ireland, which is relatively rare and requires careful consideration of all circumstances.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'testamentary capacity',
      'ward of court',
      'statutory will',
      'inherent jurisdiction',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'B Cook (Deceased)',
    citation: '[2020] IEHC 191',
    year: 2020,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'When a solicitor prepares a will for a testator who is also a beneficiary under that will, or where a close relative of the solicitor benefits, the circumstances create a need for the court to scrutinise the will carefully for undue influence and lack of knowledge and approval.',
    key_quote:
      'Where a solicitor who prepares a will benefits under it, or where a relative of the solicitor benefits, the court must scrutinise the circumstances carefully and require the proponent to prove that the testator had knowledge and approval of the contents.',
    full_summary:
      "The estate of B Cook was disputed partly on the basis that the solicitor who had drafted the will had a conflict of interest as relatives of the solicitor benefited substantially under the will. The High Court examined the circumstances of the will's preparation and held that where a solicitor benefits under a will they have drafted — directly or through a relative — the court will require positive evidence that the testator had full knowledge and approval of the contents. This is an important case for solicitors' professional responsibilities in the area of will drafting and for the succession law rule on knowledge and approval.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'wills',
      'knowledge and approval',
      'solicitor conflict',
      'scrutiny',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Fairclough v Swan Brewery Co Ltd',
    citation: '[1912] AC 565',
    year: 1912,
    court: 'Privy Council',
    jurisdiction: 'England',
    legal_principle:
      "A term in a mortgage deed that postpones the mortgagor's right to redeem until the mortgaged property has become practically valueless is void as a clog on the equity of redemption. The right to redeem must be a genuine and effective right and cannot be rendered illusory by the terms of the mortgage.",
    key_quote:
      'It is impossible to do what the parties have stipulated, namely, to make a provision for redemption which is in fact illusory. The provision purports to give a right to redeem but the right is practically valueless.',
    full_summary:
      "Swan Brewery Company mortgaged a leasehold hotel to Fairclough. The mortgage deed contained a term that the mortgage money was not to be repaid until 26 weeks before the expiry of the lease on the hotel — by which time the lease would have only 6 weeks left to run and the property would be practically worthless. Swan Brewery sought to exercise its equity of redemption before that date. The Privy Council held that the postponement clause was a clog on the equity of redemption and therefore void. A mortgagor's right to redeem is a fundamental incident of a mortgage in equity; any provision that makes that right illusory — including one that postpones redemption until the property being mortgaged is practically at an end — is struck down. This case is regularly cited alongside First National Building Society v Ring and Kreglinger v New Patagonia Meat Co in Irish and English property law curricula as a foundational authority on the principle that the equity of redemption cannot be clogged.",
    subjects: ['property-law'],
    topics: ['mortgage', 'equity of redemption', 'clog on equity', 'postponement', 'redemption'],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2017', 'FE-1 Property 2021'],
  },
  {
    case_name: 'TCD v Kenny',
    citation: '[1992] 1 IR 499',
    year: 1992,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A charge granted over land by an institution in favour of a lender is enforceable according to its terms. Where the chargor seeks to challenge the terms of the charge on the grounds that they amount to a clog on the equity of redemption, the court must examine whether the provision complained of renders the right to redeem illusory or merely regulates the manner of exercise of that right.',
    key_quote:
      "Not every condition in a mortgage or charge that restricts the chargor's freedom of action constitutes an impermissible clog on the equity of redemption; the court must examine whether the right to redeem is genuinely preserved.",
    full_summary:
      "TCD v Kenny concerned a charge over property and a dispute as to the enforceability of certain conditions attached to the charge. The High Court examined the conditions attached to the charge and considered whether they amounted to a clog on the equity of redemption. The court applied the principle from Fairclough v Swan Brewery and related authorities, distinguishing between provisions that genuinely restrict the chargor's right to redeem (which are void) and conditions that merely regulate the exercise of ancillary rights (which may be valid). This Irish case is taught in conjunction with Fairclough v Swan Brewery and First National Building Society v Ring as part of the Irish property law curriculum on mortgage conditions and the equity of redemption.",
    subjects: ['property-law'],
    topics: ['mortgage', 'charge', 'equity of redemption', 'clog on equity', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Lahiffe v Hecker',
    citation: '[1998] IEHC 142',
    year: 1998,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A mortgagor retains an equitable right to redeem a mortgage at any time before the mortgagee has completed a valid exercise of the power of sale. Once the mortgagee contracts to sell the mortgaged property to a third party, the mortgagor's right to redeem is extinguished.",
    key_quote:
      "The mortgagor's right to redeem is extinguished once the mortgagee enters into a binding contract to sell the mortgaged property; the mortgagor cannot thereafter exercise the equity of redemption.",
    full_summary:
      "Lahiffe brought proceedings against Hecker as mortgagee seeking to exercise the equity of redemption after Hecker had contracted to sell the mortgaged property to a third party. The question was whether the mortgagor's right to redeem survived the mortgagee's entry into a binding contract for sale. The High Court held that the equity of redemption is extinguished once the mortgagee enters into a binding and unconditional contract of sale with a third party purchaser. Once such a contract exists, the mortgagor cannot redeem as this would prejudice the rights of the innocent third party purchaser. This case is important in Irish mortgage law for clarifying the precise point at which the mortgagor's right to redeem is lost when the mortgagee exercises the power of sale.",
    subjects: ['property-law'],
    topics: ['mortgage', 'equity of redemption', 'power of sale', 'redemption', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Dolan v Reynolds',
    citation: '[2004] IEHC 199',
    year: 2004,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In mortgage possession proceedings, a mortgagee must establish its locus standi and its right to enforce the security. Where the mortgage has been assigned or transferred, the assignee must establish an unbroken chain of title before it can maintain possession proceedings against the mortgagor.',
    key_quote:
      'A mortgagee who seeks possession must have established entitlement to enforce the security; an assignee must prove the full chain of assignment from the original lender.',
    full_summary:
      "Dolan brought proceedings challenging Reynolds' entitlement to seek possession of a mortgaged property, arguing that Reynolds had not established its title as assignee of the original mortgage. The High Court examined the evidence of the chain of assignment and held that a mortgagee seeking possession must be able to demonstrate its entitlement to enforce the security, including establishing an unbroken chain of title from the original lender where the mortgage has been assigned. This Irish case predates but foreshadows the more developed jurisprudence on chain of title in mortgage possession proceedings that emerged after the banking crisis, most notably in ACC Loan Management Ltd v Hamilton [2015]. It is a foundational Irish authority on the requirement to establish locus standi in mortgage enforcement proceedings.",
    subjects: ['property-law'],
    topics: ['mortgage', 'possession', 'chain of title', 'assignment', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Aterna Developments Ltd (Sean Dunne)',
    citation: '[2013] IEHC 359',
    year: 2013,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'The court has jurisdiction under the Companies Acts to appoint an examiner to a company that is insolvent or likely to become insolvent where there is a reasonable prospect of the company surviving as a going concern. In the context of property development companies, the appointment of an examiner provides a moratorium against creditor enforcement while a scheme of arrangement is considered, which may preserve the value of property assets otherwise dissipated in enforcement.',
    key_quote:
      'The examinership jurisdiction is designed to provide breathing space for companies that can be rescued; in the property development context, the court must consider whether the process will produce a better outcome for creditors than immediate enforcement by secured creditors such as NAMA.',
    full_summary:
      "Re Aterna Developments Ltd concerned an application for the appointment of an interim examiner to Aterna Developments Ltd and Aterna Lee Ltd, property development companies associated with developer Sean Dunne. The case arose against the backdrop of the post-2008 Irish property crash and the establishment of NAMA, which had acquired the companies' development loans as impaired assets. The court examined the statutory preconditions for examinership under the Companies Acts, including whether there was a reasonable prospect of the companies surviving as going concerns. The judgment addresses the interaction between the examinership regime and the enforcement rights of secured creditors, including NAMA, in the context of insolvent property development entities. This case is relevant to property law students for its illustration of how the law governs the insolvency of property companies and the role of NAMA as a state-backed secured creditor in enforcing against development land assets.",
    subjects: ['property-law'],
    topics: [
      'examinership',
      'insolvency',
      'property development',
      'NAMA',
      'companies act',
      'Sean Dunne',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Start Mortgages Ltd v Dunne',
    citation: '[2012] IEHC 421',
    year: 2012,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A mortgagee's entitlement to an order for possession depends on establishing the validity of the mortgage, the fact of default, and that all statutory and contractual preconditions to enforcement have been satisfied. The court retains a discretion to adjourn proceedings where the mortgagor demonstrates a genuine capacity to address the arrears within a reasonable timeframe.",
    key_quote:
      "A mortgagee must establish its entitlement to possession by demonstrating a valid mortgage, default, and compliance with all preconditions to enforcement; the court's discretion to adjourn must be exercised judiciously.",
    full_summary:
      'Start Mortgages Ltd sought possession of property mortgaged by Dunne following default. The High Court examined the requirements for a mortgagee to establish its entitlement to possession, including the validity and enforceability of the mortgage, the fact of default and its nature and duration, and compliance with any preconditions to enforcement. The court also considered the scope of its discretion to adjourn proceedings and the circumstances in which such an adjournment is appropriate. This case is one of a series of significant Irish mortgage possession decisions arising from the post-2008 recession and provides practical guidance on the procedural and substantive requirements for a mortgagee to obtain a possession order in Ireland.',
    subjects: ['property-law'],
    topics: ['mortgage', 'possession', 'default', 'enforcement', 'court discretion', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Cheese v Lovejoy',
    citation: '(1877) 2 PD 251',
    year: 1877,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      'Revocation of a will by destruction requires an act of physical destruction (burning, tearing, or otherwise destroying the will) accompanied by the intention to revoke. Drawing lines through the will and writing words of revocation on the back do not constitute a valid revocation by destruction where the will remains physically intact and legible.',
    key_quote:
      "All the burning, tearing, or destroying must be the burning, tearing, or destroying the will itself. A man may write on the back of his will, 'This is to cancel it', but if he leaves the will intact it is not revoked.",
    full_summary:
      'The testator drew lines through his will with a pen and wrote words on the back indicating he wished to revoke it. He left the will, which remained legible, among his papers. The Court of Appeal held that this did not amount to a valid revocation of the will by destruction. Revocation by destruction under the Wills Act 1837 (and its Irish equivalent) requires that the will itself be physically destroyed — burnt, torn, or otherwise obliterated — with the intention to revoke. Writing words of revocation on the back of an intact will, or drawing lines through it while leaving it legible, does not satisfy this requirement. This case is a fundamental authority on the law of revocation of wills and is read alongside Re Urquhart in the Irish curriculum for the proposition that partial physical acts may not suffice to revoke a will.',
    subjects: ['property-law'],
    topics: [
      'succession',
      'wills',
      'revocation',
      'destruction',
      'revocation by cancellation',
      'intention to revoke',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2016', 'FE-1 Property 2020'],
  },
  {
    case_name: 'H v H [1978]',
    citation: '[1978] IR 138',
    year: 1978,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A spouse who makes no direct financial contribution to the purchase or maintenance of the family home may nonetheless acquire a beneficial interest in equity where their indirect contributions — such as managing the household and raising children, thereby enabling the other spouse to earn the income applied to the mortgage — are substantial and are causally connected to the acquisition of the property.',
    key_quote:
      'It would be inequitable to ignore the contribution of a wife who, by managing the household and caring for the children, freed her husband to earn the income with which the matrimonial home was purchased and maintained.',
    full_summary:
      "In this landmark Irish Supreme Court decision, the parties were married and the family home was registered in the husband's sole name. The wife had made no direct financial contributions but had managed the household and raised the children throughout the marriage, enabling the husband to earn the income applied to the mortgage. On the breakdown of the marriage the wife claimed a beneficial interest in the family home. The Supreme Court held that indirect contributions to the family home — including the performance of domestic duties that freed the other spouse to earn — could give rise to a beneficial interest under a constructive or resulting trust in equity. The court applied and adapted English authorities (Pettitt v Pettitt [1970], Gissing v Gissing [1971]) in the Irish constitutional context, where the family is given special protection. This foundational Irish case is essential for FE-1 candidates and is regularly contrasted with the statutory mechanisms under the Family Home Protection Act 1976 and the Family Law Act 1995.",
    subjects: ['property-law'],
    topics: [
      'family home',
      'indirect contributions',
      'constructive trust',
      'beneficial interest',
      'matrimonial property',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2015', 'FE-1 Property 2018', 'FE-1 Property 2022'],
  },
  {
    case_name: 'McDonald v Norris',
    citation: '[2000] 1 ILRM 382',
    year: 1999,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "Under section 117 of the Succession Act 1965, the court must ask whether the testator failed in their moral duty to make proper provision for a child in accordance with their means. The moral duty is judged at the date of death and the court will have regard to provision already made for the child during the testator's lifetime, the needs and circumstances of all beneficiaries, and whether the testator acted as a prudent and just parent.",
    key_quote:
      "The court must ask what a prudent and just parent, taking account of all the relevant circumstances including provision made during the testator's lifetime, would have done for the applicant child.",
    full_summary:
      "McDonald and others brought a section 117 application against the estate of their late parent (Norris as personal representative) claiming that the testator had failed in their moral duty to make proper provision for them under the Succession Act 1965. The Supreme Court gave authoritative guidance on the application of section 117, confirming that the moral duty test requires the court to adopt the perspective of a prudent and just parent. The court held that provision made for the children during the testator's lifetime is a highly relevant consideration: where adult children have already been substantially provided for during their parent's lifetime, the testator may not have failed in their moral duty by not providing equally in the will. The court also confirmed that the mere fact of a larger bequest to another family member does not automatically indicate a section 117 failure. This decision is a key Irish Supreme Court authority on the section 117 jurisdiction and the weight to be given to lifetime provision.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'Succession Act 1965',
      'section 117',
      'moral duty',
      'lifetime provision',
      'prudent parent test',
      'Ireland',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Property 2017', 'FE-1 Property 2021', 'FE-1 Property 2023'],
  },
  {
    case_name: 'Gunning v Gunning',
    citation: '[2004] IEHC 56',
    year: 2004,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Where spouses make mutual wills pursuant to an agreement not to revoke them, and one spouse dies having performed their side of the agreement, equity imposes a constructive trust on the surviving spouse to give effect to the terms of the mutual wills. The surviving spouse cannot defeat the agreement by revoking their will after the death of the first testator.',
    key_quote:
      'Where parties make mutual wills pursuant to an agreement not to revoke them, and one party dies having made their mutual will, equity imposes a constructive trust on the survivor binding them to carry out the terms of the agreement.',
    full_summary:
      'In Gunning v Gunning, the court examined a dispute arising from the making of mutual wills between spouses. The spouses had made wills in agreed terms and had agreed not to revoke them without consent. After the first spouse died, the surviving spouse sought to alter their testamentary dispositions. The High Court applied the doctrine of mutual wills in the Irish context, confirming that the making of mutual wills pursuant to an agreement gives rise to a constructive trust on the death of the first testator. The survivor holds their estate on trust to carry out the terms of the mutual wills and cannot defeat the agreement by revoking or altering their will. The court applied Re Julian [1950] IR 57 (the leading Irish authority on mutual wills) and confirmed the continued vitality of the mutual wills doctrine in Irish succession law. This case is important for FE-1 candidates for its modern Irish application of the mutual wills doctrine.',
    subjects: ['property-law'],
    topics: [
      'succession',
      'mutual wills',
      'constructive trust',
      'agreement not to revoke',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Mulhern v Brady',
    citation: '[2019] IEHC 472',
    year: 2019,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A section 117 application under the Succession Act 1965 is not limited to cases of financial need. The moral duty of the testator must be assessed having regard to all the circumstances, including the applicant's relationship with the testator, the nature and extent of any provision made during the testator's lifetime, and the size of the estate.",
    key_quote:
      'The absence of acute financial need does not preclude a finding that the testator failed in their moral duty; the court must assess the totality of the circumstances including the relationship between the testator and the applicant child.',
    full_summary:
      "Mulhern brought a section 117 application following the death of their parent, whose estate passed substantially to Brady and others rather than to the applicant. The applicant did not demonstrate acute financial need but argued that the testator had nonetheless failed in the moral duty imposed by section 117. The High Court confirmed that section 117 is not a needs-based test alone: while financial need is a relevant factor, the court must consider the overall fairness of the testamentary provision having regard to the nature of the relationship between the testator and each of their children, any gifts or benefits received during the testator's lifetime, and the comparative treatment of the various children. The case is useful for FE-1 candidates as a modern statement of the broad scope of the section 117 inquiry beyond mere financial hardship.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'Succession Act 1965',
      'section 117',
      'moral duty',
      'financial need',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Moley v Fee',
    citation: '[2011] IEHC 537',
    year: 2011,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In a dispute about beneficial ownership of land, the court will examine the common intention of the parties at the time of the transaction, their subsequent conduct, and any representations made to determine whether a constructive or resulting trust has arisen. Verbal assurances about ownership combined with substantial acts of reliance may give rise to a constructive trust.',
    key_quote:
      'The common intention of the parties, ascertained from all the circumstances including verbal assurances and subsequent conduct, determines beneficial ownership where legal title does not reflect the full picture.',
    full_summary:
      "Moley and Fee were involved in a dispute about the beneficial ownership of land. One party claimed that, notwithstanding the registration of title in the other's name, the true beneficial ownership was shared or vested in the claimant, having regard to verbal assurances that had been made and acts of reliance that had followed. The High Court examined the law on resulting and constructive trusts in relation to land and applied both the common intention constructive trust doctrine and the resulting trust principle. The court assessed the evidence of common intention, the acts of reliance, and the respective contributions of the parties. The case is a useful Irish High Court example of the practical application of trust principles to disputed land ownership, particularly in the context of informal dealings between parties who know each other.",
    subjects: ['property-law'],
    topics: [
      'beneficial ownership',
      'constructive trust',
      'resulting trust',
      'common intention',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Thorpe v Frank',
    citation: '[2019] EWCA Civ 150',
    year: 2019,
    court: 'Court of Appeal',
    jurisdiction: 'England',
    legal_principle:
      'A boundary dispute must be resolved by reference to the conveyancing documents and title deeds. Where the deeds are ambiguous, the court may have regard to extrinsic evidence including the physical features of the land at the time of the conveyance, subsequent conduct of the parties, and expert surveying evidence.',
    key_quote:
      'In a boundary dispute, the court must construe the conveyancing documents objectively with reference to the physical features of the land at the date of the transaction; extrinsic evidence is admissible where the documents are ambiguous.',
    full_summary:
      'Thorpe and Frank were neighbours involved in a boundary dispute about the precise line of the boundary between their respective properties. The question turned on the proper construction of the conveyancing documents and whether they, read in conjunction with the physical features of the land, clearly established the boundary. The Court of Appeal examined the principles applicable to boundary disputes: the starting point is the conveyancing documents; if these are clear, they are determinative; if ambiguous, extrinsic evidence including physical features of the land at the time of grant, Ordnance Survey maps, and expert surveying evidence is admissible to resolve the ambiguity. The case illustrates the typical methodology of boundary dispute resolution and the primacy of conveyancing documents in establishing title to land.',
    subjects: ['property-law'],
    topics: ['boundary dispute', 'conveyancing', 'extrinsic evidence', 'title deeds', 'land'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Re Jackson',
    citation: '[1933] IR 33',
    year: 1933,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A gift in a will is valid only if the testator had testamentary capacity and knowledge and approval of the contents of the will at the time of execution. Where the gift is expressed in ambiguous terms, the court will seek to give effect to the testator's intention from the words used, read in light of any admissible extrinsic evidence.",
    key_quote:
      'The court must seek to give effect to the true intention of the testator, ascertained from the words of the will itself; extrinsic evidence of intention is admissible where the language is ambiguous.',
    full_summary:
      'Re Jackson concerned the construction of a bequest in a will that was expressed in ambiguous terms, giving rise to a dispute between potential beneficiaries as to who was intended to take under the gift. The Irish High Court applied the rules of construction applicable to wills in Ireland, holding that the primary task is to ascertain the intention of the testator from the words of the will itself. Where the words are plain and unambiguous, they must be given their ordinary meaning. Only where ambiguity exists may the court look beyond the words of the will to extrinsic evidence of intention. The case is cited in Irish succession law courses as an illustration of the rules of construction applicable to gifts in wills and the balance between literalism and purposive construction in interpreting testamentary instruments.',
    subjects: ['property-law'],
    topics: [
      'succession',
      'wills',
      'construction',
      'ambiguity',
      'testamentary intention',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: "O'Hagan (PR of Alice Dolan deceased) v Grogan",
    citation: '[2016] IEHC 289',
    year: 2016,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A contract to make a will is enforceable in equity. Where a person agrees to make or to maintain a will in favour of another in consideration of services rendered or to be rendered, and the promisee acts in reliance on the promise, equity will enforce the obligation by imposing a constructive trust on the promisor's estate.",
    key_quote:
      "A promise to leave property by will, if supported by consideration and acted upon by the promisee to their detriment, is enforceable in equity by way of constructive trust imposed on the promisor's estate.",
    full_summary:
      "The personal representative of Alice Dolan (deceased) brought proceedings against Grogan, who had received a substantial benefit under Alice Dolan's estate, arguing that the arrangements surrounding the disposition were not consistent with a valid exercise of testamentary freedom. The case involved a consideration of whether a contract to make a will or a proprietary estoppel had arisen from dealings between Alice Dolan and Grogan during the deceased's lifetime. The High Court examined the law on contracts to make a will and proprietary estoppel in the Irish context, confirming that equity will enforce a promise to leave property by will where the promisee has given consideration and acted to their detriment in reliance on the promise. The constructive trust remedy ensures that the promisor's estate is bound to give effect to the promised testamentary disposition.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'contract to make a will',
      'constructive trust',
      'proprietary estoppel',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: "O'D v O'D",
    citation: 'Unreported, High Court, 18 November 1983',
    year: 1983,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In proceedings for judicial separation, the court must consider the respective contributions of the spouses — both financial and non-financial — to the welfare of the family and the acquisition of family assets. A non-owning spouse who has made substantial indirect contributions to the family home may be entitled to a beneficial interest in the property.',
    key_quote:
      'The contributions of a spouse to the family — whether financial or by way of homemaking and child-rearing — must be taken into account in determining property rights on marital breakdown.',
    full_summary:
      "O'D v O'D is an unreported Irish High Court decision from November 1983 concerning the property rights of spouses on marital breakdown. The case examined the extent to which a non-owning spouse could claim a beneficial interest in the family home where her contributions to the family had been indirect — managing the home and caring for children while her husband pursued his career. The court applied the principles developing in Irish law on indirect contributions to family property, in the wake of H v H [1978] IR 138, and recognised that non-financial contributions to the family unit are cognisable in determining beneficial ownership. This case is part of the body of pre-1989 Irish case law on family property rights, before the more structured statutory framework of the Judicial Separation and Family Law Reform Act 1989 was enacted.",
    subjects: ['property-law'],
    topics: [
      'family home',
      'beneficial interest',
      'indirect contributions',
      'judicial separation',
      'matrimonial property',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'CF v FF',
    citation: '[1987] ILRM 1',
    year: 1986,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'The Family Home Protection Act 1976 imposes a duty on the court to protect the interest of the non-owning spouse in the family home. Where a conveyance has been made without the required consent of the non-owning spouse, the court will consider all the circumstances in determining the appropriate remedy, including whether it is just and equitable to set aside the transaction.',
    key_quote:
      'The protection of the family home under the 1976 Act requires the court to look at all the circumstances in determining whether to set aside an impugned conveyance and what, if any, remedy is appropriate in the interests of justice.',
    full_summary:
      'CF v FF is an Irish High Court case concerning the application of the Family Home Protection Act 1976 in the context of a dispute between spouses about dealings with the family home. The case examined the consequences of a transaction affecting the family home that had been completed without the full and informed prior consent of the non-owning spouse as required by the 1976 Act. The court considered the circumstances of the transaction, the state of knowledge of the third party involved, and what remedy was appropriate having regard to the interests of all parties. The decision illustrates the practical application of the 1976 Act in the context of contested transactions affecting the family home and is a useful pre-statutory reform example of how Irish courts balanced the protection of the non-owning spouse with the legitimate expectations of third parties.',
    subjects: ['property-law'],
    topics: [
      'Family Home Protection Act 1976',
      'spousal consent',
      'conveyance',
      'remedy',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Dianne v Hamilton',
    citation: '[2014] IEHC 266',
    year: 2014,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A claim of proprietary estoppel requires a clear assurance or representation by the landowner, detrimental reliance on that representation by the claimant, and circumstances that make it unconscionable for the landowner to resile. Where the assurance is equivocal or the reliance insufficiently substantial, the claim will fail.',
    key_quote:
      'An equivocal assurance that falls short of a clear representation of an interest in property will not support a proprietary estoppel claim; the claimant must demonstrate that a sufficiently clear and unequivocal assurance was given.',
    full_summary:
      'Dianne brought a proprietary estoppel claim against Hamilton in respect of land, arguing that she had been given assurances that she would receive an interest in the land and had acted to her detriment in reliance thereon. Hamilton disputed the nature and extent of any assurances given. The High Court examined the three elements of proprietary estoppel — assurance, reliance, and unconscionability — in detail. The court held that any assurance given was equivocal and did not rise to the level of a sufficiently clear representation of an interest in the land necessary to ground a proprietary estoppel claim. The case illustrates the requirement for specificity and clarity in the assurance said to ground a proprietary estoppel and the consequences of a failure to meet this threshold.',
    subjects: ['property-law'],
    topics: [
      'proprietary estoppel',
      'assurance',
      'detrimental reliance',
      'equivocal representation',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Ennis v Child and Family Agency',
    citation: '[2021] IEHC 402',
    year: 2021,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'The Child and Family Agency (Tusla) has statutory powers to apply for court orders affecting property in the context of child protection proceedings. Where family property is held on trust for children or subject to charges arising from court orders in family law proceedings, the interests of minor children are protected by the court in exercising its statutory jurisdiction.',
    key_quote:
      "The court's jurisdiction in child protection matters extends to making orders affecting property where necessary to protect the welfare and interests of children subject to proceedings.",
    full_summary:
      "Ennis brought proceedings involving the Child and Family Agency (Tusla) in relation to property and family law matters. The High Court examined the statutory framework governing the Child and Family Agency's powers and the court's jurisdiction to make orders affecting family property in the context of child protection and family welfare proceedings. The decision touches on the intersection of family law, child protection law, and property law in Ireland, illustrating how the court balances the interests of parents as property owners with the protective obligations imposed by child welfare legislation. The case is relevant for FE-1 candidates studying the statutory constraints on property rights arising from family and child welfare obligations in Irish law.",
    subjects: ['property-law'],
    topics: ['family property', 'child welfare', 'Tusla', 'statutory powers', 'Ireland'],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Gregory v McCarthy',
    citation: '[2007] IEHC 397',
    year: 2007,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A dispute about the right to use land as a right of way requires the court to examine whether a right of way exists either by express grant, implied grant, necessity, or prescription. Where the right of way is claimed by long user, the user must have been as of right, open, peaceable, and without the permission of the servient owner.',
    key_quote:
      'A claim to a right of way by prescription requires proof of user as of right for the requisite period; permissive user, however long, cannot ripen into an easement.',
    full_summary:
      "Gregory claimed a right of way over McCarthy's land on the basis of long use and prescription. McCarthy denied the existence of any right of way and argued that any use of the land had been permissive. The Irish High Court examined the requirements for establishing a prescriptive right of way in Ireland under both the Prescription Act 1832 and the doctrine of lost modern grant. The court applied the requirements of user as of right (nec vi, nec clam, nec precario) and found that the evidence of user was insufficient to establish a prescriptive right of way. The decision reinforces the distinction between permissive use tolerated as a matter of neighbourly goodwill and user as of right that will give rise to a prescriptive easement, applying established principles from Latimer v Official Co-operative Society and Feehan v Leamy.",
    subjects: ['property-law'],
    topics: [
      'easements',
      'right of way',
      'prescription',
      'permissive use',
      'as of right',
      'Ireland',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Central London Property Trust Ltd v High Trees House Ltd',
    citation: '[1947] KB 130',
    year: 1947,
    court: "King's Bench Division",
    jurisdiction: 'England',
    legal_principle:
      'Where a landlord agrees to accept a reduced rent from a tenant who is unable to pay the full rent, and the tenant relies on that agreement, the landlord is estopped from demanding the full rent during the period of the agreement. Promissory estoppel prevents a party from going back on a promise which was intended to be acted upon and was in fact acted upon, even without consideration.',
    key_quote:
      'A promise intended to be binding, intended to be acted on and in fact acted on, is binding so far as its terms properly apply.',
    full_summary:
      'Central London Property Trust Ltd owned a block of flats and leased them to High Trees House Ltd in 1937. During WWII High Trees could not find tenants and could not pay the full rent. Central London agreed in 1940 to halve the rent. After the war the flats became fully let and Central London sought to recover the full rent including for the wartime period. Denning J (as he then was) held that the promise to accept half rent during the wartime period was binding by promissory estoppel: Central London was estopped from going back on the promise for the period of the agreement. However, once the circumstances changed (the flats became fully let), Central London could revert to the full rent going forward. This landmark case established the modern doctrine of promissory estoppel in English and Irish contract law and is a foundational authority on the relationship between consideration, estoppel and contractual modification.',
    subjects: ['contract-law'],
    topics: [
      'promissory estoppel',
      'contract',
      'landlord and tenant',
      'lease',
      'waiver',
      'consideration',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['FE-1 Contract 2015', 'FE-1 Contract 2018', 'FE-1 Contract 2021'],
  },
  {
    case_name: 'MPD v MD',
    citation: '[2018] IEHC 16',
    year: 2018,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In property adjustment proceedings under the Family Law Act 1995, the court must consider all the circumstances of the case, including the financial contributions and non-financial contributions of each spouse to the welfare of the family. Indirect contributions, including homemaking and childcare, are treated as equivalent in weight to direct financial contributions when assessing entitlement to a share of the family home.',
    key_quote:
      'The court must have regard to all the circumstances, including the contribution made by each of the spouses to the welfare of the family, including any contribution made by looking after the home or caring for the family.',
    full_summary:
      "MPD v MD [2018] IEHC 16 concerned an application for a property adjustment order in respect of the former family home following the breakdown of the marriage. The central issue was the extent to which the non-earning spouse's indirect contributions — particularly homemaking and primary childcare over many years — should be reflected in the property division. The High Court, applying section 16 of the Family Law Act 1995, undertook a holistic assessment of the parties' circumstances. The court emphasised that the Act explicitly directs it to consider non-financial contributions to the welfare of the family on an equal footing with direct financial input. The court rejected the argument that the spouse who made the mortgage repayments should receive a proportionally larger share, finding instead that the indirect contributions over the course of the marriage were substantial and had enabled the other spouse to pursue their career. This decision reinforces the principle that Irish family property law does not adopt a purely financial accounting approach but rather a broad equitable exercise calibrated to all relevant circumstances. It is frequently cited in FE-1 property and family law courses as an illustration of how the 1995 Act operates in practice to protect non-earning spouses.",
    subjects: ['property-law'],
    topics: [
      'family property',
      'property adjustment orders',
      'Family Law Act 1995',
      'indirect contributions',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['Property FE-1 2019 Q4', 'Property FE-1 2021 Q3'],
  },
  {
    case_name: 'Re ABC',
    citation: '[2003] IEHC 12',
    year: 2003,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "Testamentary capacity requires that the testator understands the nature of making a will, the extent of the property being disposed of, the claims of those who might reasonably expect to benefit, and that these elements combine in an orderly fashion to form the dispositive plan. Where a testator's cognitive function is impaired by illness at the time of execution, the will may be admitted to probate only if the evidence establishes that a lucid interval existed at the moment of signature.",
    key_quote:
      "The test for testamentary capacity is not a high one: it requires soundness of mind, memory and understanding at the time of execution, not at every moment of the testator's life.",
    full_summary:
      "Re ABC [2003] IEHC 12 raised the question of whether a will executed by a testator suffering from a degenerative neurological condition satisfied the requirements of testamentary capacity under Irish law. The applicant sought to have the will admitted to probate while objectors contended that the testator lacked the requisite mental capacity at the date of execution. The High Court applied the classic Banks v Goodfellow [1870] LR 5 QB 549 formulation, confirming that it remains the authoritative statement of the test in Irish law. The court heard detailed medical evidence regarding the testator's condition and reviewed attendance notes prepared by the solicitor who took instructions. It was held that, notwithstanding general cognitive decline, the evidence established that the testator had experienced a sufficient lucid interval at the relevant time. The court underscored that capacity is assessed at the date of execution, not by reference to the overall trajectory of the testator's health. The decision is significant as a practical application of capacity doctrine and illustrates the importance of contemporaneous attendance notes and medical records in contested probate actions. It is studied in FE-1 property courses alongside Banks v Goodfellow.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'testamentary capacity',
      'probate',
      'lucid interval',
      'Banks v Goodfellow',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['Property FE-1 2018 Q5'],
  },
  {
    case_name: 'Re IAC',
    citation: '[2011] IEHC 148',
    year: 2011,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "Under the Succession Act 1965, a testator may disinherit an adult child provided that the disinheritance is not so unconscionable as to engage the court's jurisdiction under section 117. The section 117 jurisdiction is protective, not redistributive, and the court will intervene only where the testator has failed in their moral duty to make proper provision for a child having regard to the testator's means, the child's needs, and all the circumstances of the case.",
    key_quote:
      'The court is not concerned with what provision would be fair or reasonable in the abstract, but whether the testator has failed in his moral duty to make proper provision for the child in accordance with his means.',
    full_summary:
      "Re IAC [2011] IEHC 148 was an application under section 117 of the Succession Act 1965 brought by an adult child who received nothing under their deceased parent's will. The estate was of moderate value and had been left entirely to another family member. The High Court reviewed the settled principles governing section 117 applications, affirming that the testator's freedom of testation is a primary value that the section only overrides where there has been a demonstrable failure of moral duty. The court examined the child's financial circumstances, noting that they were not in financial need, and also considered the nature of the relationship between the testator and the applicant in the years before death. It was held that, on the facts, the testator had not failed in his moral duty. The court emphasised that section 117 does not create an automatic right for children to share in a parent's estate and that courts must guard against substituting their own preferences for the considered testamentary choices of the deceased. This case is regularly cited in FE-1 succession courses for its clear articulation of the limits of the section 117 jurisdiction.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'section 117',
      'Succession Act 1965',
      'moral duty',
      'proper provision for children',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['Property FE-1 2017 Q5', 'Property FE-1 2022 Q4'],
  },
  {
    case_name: 'FM v TAM',
    citation: '[2009] IEHC 101',
    year: 2009,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A constructive trust over the family home may arise where one party has made substantial financial contributions to the acquisition or improvement of property held in the other's name, in circumstances where it would be unconscionable for the legal owner to deny the contributor a beneficial interest. The court will quantify the share by reference to the extent of the contribution relative to the overall cost of acquisition.",
    key_quote:
      'Equity will not permit a person to rely on the strict legal title where to do so would be unconscionable having regard to the contributions made and the reasonable expectations thereby generated.',
    full_summary:
      "FM v TAM [2009] IEHC 101 concerned the beneficial ownership of the former family home which was registered in the name of one party alone. The other party sought a declaration of beneficial interest on the basis of financial contributions made to the purchase price and to subsequent mortgage repayments. The High Court examined the line of Irish authority on constructive trusts arising from common intention and applied the principles enunciated in cases such as McC v McC and the leading English authorities on resulting and constructive trusts. The court found that the contributions had been substantial and that there had been a common intention between the parties at the time of acquisition that both would have a beneficial interest. Applying a broad approach to quantification, the court awarded a beneficial interest proportionate to the financial contributions, while also acknowledging the difficulty of precisely isolating each party's input into a jointly managed household. This case is significant for its application of constructive trust principles in the Irish family home context and is studied in FE-1 property courses alongside cases such as McC v McC and H v H for the rules governing co-ownership and beneficial entitlement outside formal co-ownership.",
    subjects: ['property-law'],
    topics: [
      'constructive trust',
      'co-ownership',
      'family home',
      'beneficial interest',
      'common intention',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['Property FE-1 2013 Q3', 'Property FE-1 2016 Q3'],
  },
  {
    case_name: 'LB v HB',
    citation: '[2016] IEHC 377',
    year: 2016,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Where spouses separate and one spouse remains in the family home pursuant to a court order or agreement while mortgage repayments continue to be made by the departing spouse, the court will take account of those continued contributions when determining any subsequent property adjustment application. A spouse cannot later be penalised for having discharged financial obligations arising from an earlier court order.',
    key_quote:
      'Contributions to the family home made pursuant to a court order following separation are relevant circumstances to which the court must have regard under section 16 of the Family Law Act 1995.',
    full_summary:
      "LB v HB [2016] IEHC 377 arose from an application for a final property adjustment order where the parties had been separated for several years pursuant to a separation agreement which required one spouse to maintain mortgage payments on the family home while the other spouse and children remained in occupation. At the time of the property adjustment hearing, the question arose as to how the post-separation mortgage contributions should be treated. The contributing spouse argued that these payments substantially increased their entitlement over and above the contributions made during the marriage proper. The High Court held that post-separation contributions made pursuant to a legal obligation were a relevant circumstance under section 16 of the Family Law Act 1995, but that the court retained a broad discretion as to the weight to be given to them. The court declined to treat post-separation contributions as giving rise to an automatic enhancement of beneficial share, instead balancing them against the benefit to the other spouse of remaining in the family home and the need to make provision for dependent children. The case is cited in FE-1 materials for illustrating the breadth of the court's discretion under the 1995 Act and the multi-factorial approach required in property adjustment proceedings.",
    subjects: ['property-law'],
    topics: [
      'family property',
      'property adjustment orders',
      'Family Law Act 1995',
      'post-separation contributions',
      'mortgage',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'CP v DP',
    citation: '[2005] IEHC 336',
    year: 2005,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'The Family Home Protection Act 1976 requires the prior written consent of a non-owning spouse before a conveyance of the family home can be made. A conveyance made without such consent is voidable at the instance of the non-consenting spouse unless the purchaser acquired the property in good faith and for value without notice. The court will closely scrutinise the circumstances surrounding a purported consent to ensure it was freely and independently given.',
    key_quote:
      'The consent required by section 3 of the Family Home Protection Act 1976 must be a real, free and informed consent. A consent procured by misrepresentation or undue pressure is no consent for the purposes of the Act.',
    full_summary:
      "CP v DP [2005] IEHC 336 raised the validity of a purported consent signed by a non-owning spouse under section 3 of the Family Home Protection Act 1976 in connection with the re-mortgaging of the family home. The applicant spouse contended that the consent had been signed under pressure and without proper understanding of the document's consequences. The High Court reviewed the purpose and scope of the 1976 Act, emphasising that it was enacted to protect the family home as a social institution and to prevent one spouse from unilaterally disposing of or encumbering it without the other's genuine agreement. The court found on the facts that the consent had not been independently obtained; the non-owning spouse had not received independent legal advice and had signed under the influence of the other spouse who had presented the document without adequate explanation. The court granted a declaration that the re-mortgage was voidable. This decision is a key authority in FE-1 property law for the operation of the 1976 Act and the standard of consent required, and is regularly examined alongside Nestor v Murphy [1979] IR 326 and Bank of Ireland v Smyth [1993].",
    subjects: ['property-law'],
    topics: [
      'Family Home Protection Act 1976',
      'consent',
      'family home',
      'co-ownership',
      'voidable conveyance',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['Property FE-1 2014 Q2', 'Property FE-1 2020 Q2'],
  },
  {
    case_name: 'ED v FD',
    citation: '[2008] IEHC 98',
    year: 2008,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Under section 36 of the Family Law Act 1995, the court has a summary jurisdiction to resolve disputes between spouses as to the title to or possession of any property. The section may be invoked during marriage and does not require separation or divorce proceedings to be on foot. In exercising this jurisdiction, the court applies general property law principles rather than the broader welfare-based discretion available in ancillary relief proceedings.',
    key_quote:
      'Section 36 provides a swift and accessible mechanism for resolving property disputes between spouses, but it does not displace ordinary property law principles; the court asks who has the legal or beneficial title on established legal and equitable principles.',
    full_summary:
      'ED v FD [2008] IEHC 98 arose from a dispute between spouses concerning the ownership of a savings account and household furniture during an ongoing marriage. The applicant sought a declaration under section 36 of the Family Law Act 1995 that certain assets were held on trust for the benefit of both parties equally. The High Court held that section 36 conferred a summary jurisdiction to determine title and possession disputes arising between spouses, and that this jurisdiction could be exercised independently of any separation or divorce proceedings. The court emphasised, however, that section 36 does not give the court the broad discretionary power available under sections 14–16 of the 1995 Act in ancillary relief proceedings; the assessment of ownership under section 36 is governed by established trust and property law principles. On the facts, the court found that the savings had been accumulated from a joint fund and applied the presumption of advancement and resulting trust principles to apportion the assets. ED v FD is studied in FE-1 property courses for the scope and limits of the section 36 jurisdiction and its interaction with general trust law principles in the context of marital property.',
    subjects: ['property-law'],
    topics: [
      'family property',
      'section 36 Family Law Act 1995',
      'trust',
      'marital property dispute',
      'beneficial interest',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'McCM v M',
    citation: '[2020] IEHC 229',
    year: 2020,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "In succession disputes, a claim that a will was procured by undue influence requires proof that the will-maker's freedom of independent decision was overborne by the pressure or domination of another. The burden of proving undue influence rests on the party alleging it and requires something more than mere influence, persuasion or importunity; the influence must have reached the degree that the testamentary act was not that of a free agent.",
    key_quote:
      "Undue influence in the testamentary context requires that the influence exerted must have been such as to overpower the testator's volition, not merely to affect it; the will must have been the product of another's will, not the testator's own.",
    full_summary:
      "McCM v M [2020] IEHC 229 was a contested probate action in which the plaintiff, one of several children of the deceased, challenged the validity of a will on the grounds of undue influence and, in the alternative, brought a section 117 claim for proper provision. The deceased's estate was substantial and had been left almost entirely to one sibling who had lived with and cared for the deceased in the final years of life. The High Court considered the law on undue influence in the testamentary context, distinguishing it from the contractual doctrine. The court emphasised that the law respects a testator's right to make whatever provision they choose, including preferring one child over others, and that courts must be cautious not to equate a dependent relationship with domination. Having reviewed the evidence — including medical records and witness testimony about the deceased's state of mind — the court found that the will reflected the deceased's genuine settled intention and rejected the undue influence claim. The section 117 claim also failed as the plaintiff was found to be in comfortable financial circumstances. This decision is studied in FE-1 succession courses for the interplay between undue influence, testamentary freedom, and the section 117 jurisdiction.",
    subjects: ['property-law'],
    topics: [
      'succession',
      'undue influence',
      'testamentary freedom',
      'section 117',
      'contested probate',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['Property FE-1 2021 Q5', 'Property FE-1 2023 Q4'],
  },
  {
    case_name: 'G v An Bord Uchtala',
    citation: '[1980] IR 32',
    year: 1980,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "The Constitution protects the natural and imprescriptible rights of the child as well as the rights of parents; the rights of an unmarried mother over her child are not equivalent to those of a married parent but are nonetheless constitutionally recognised. The Oireachtas may legislate to protect the child's welfare and the rights of natural parents provided it does not act in a manner repugnant to the Constitution.",
    key_quote:
      'The child has a natural right to have its welfare considered as a primary consideration, and this right is enforceable against all, including natural parents, the State, and third parties.',
    full_summary:
      "G v An Bord Uchtala [1980] IR 32 is a landmark Supreme Court decision concerning the constitutional rights of unmarried mothers and the welfare of children in adoption proceedings. The plaintiff, the natural mother of a child who had been placed for adoption and subsequently born to adoptive parents by virtue of an adoption order, challenged the constitutional validity of provisions of the Adoption Act 1952 which denied her an effective right to withhold consent to adoption after a period had elapsed. The Supreme Court delivered a series of judgments examining the hierarchy of constitutional rights in the family law context. Walsh J's judgment is especially influential for its articulation of the unenumerated rights of the child under Article 40.3 of the Constitution and for recognising that the child's right to have its welfare considered as a primary consideration may override parental rights in appropriate circumstances. The case is also significant for the principle that constitutional rights of unmarried mothers, while not identical to those of married parents under Article 41, are nevertheless constitutionally protected. G v An Bord Uchtala is studied in FE-1 property and family law modules for its role in developing Irish constitutional family law and for the analysis of competing constitutional rights, and is a foundational authority for subsequent developments in child law and non-marital family rights.",
    subjects: ['constitutional-law', 'property-law'],
    topics: [
      'constitutional rights',
      'unmarried mother',
      'adoption',
      'child welfare',
      'unenumerated rights',
      'family law',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['Property FE-1 2015 Q6', 'Constitutional Law FE-1 2018'],
  },
  {
    case_name: 'N (otherwise K) v K',
    citation: '[1985] IR 733',
    year: 1985,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A decree of nullity may be granted where a party to a purported marriage lacked the capacity to enter into and sustain a normal marital relationship at the time of the ceremony by reason of a psychiatric condition, even if that condition was not apparent to the other party. The test is one of capacity, assessed at the time of marriage, and extends beyond mere intellectual understanding of the nature of marriage to include the emotional and psychological capacity to form and maintain the marital bond.',
    key_quote:
      'Marriage requires not merely the intellectual ability to understand the nature of the contract but also the capacity to enter into and sustain the relationship which constitutes the essence of marriage.',
    full_summary:
      "N (otherwise K) v K [1985] IR 733 is a seminal Supreme Court decision on the law of nullity in Ireland. The parties had gone through a ceremony of marriage, but the marriage broke down shortly afterwards. The petitioner sought a decree of nullity on the ground that the respondent had, at the time of the marriage, suffered from a psychiatric condition which rendered her incapable of entering into a genuine marital relationship. The Supreme Court held that the concept of incapacity for the purposes of nullity is not confined to purely physical incapacity or to a complete absence of understanding of what marriage entails. Finlay CJ's judgment established that the court must assess whether a party possessed the emotional and psychological capacity to form and sustain the consortium vitae which is the essence of the marriage relationship. The decision was highly influential in developing the Irish law of nullity prior to the introduction of divorce under the Fifteenth Amendment, and it expanded the grounds available to parties seeking to escape unhappy marriages under a constitutional framework that prohibited divorce. N (otherwise K) v K remains a key authority in FE-1 property and family law courses for the doctrine of nullity and is frequently cited alongside the subsequent statutory reforms under the Family Law Act 1995.",
    subjects: ['property-law'],
    topics: [
      'nullity',
      'marriage',
      'capacity',
      'family law',
      'consortium vitae',
      'psychiatric incapacity',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['Property FE-1 2016 Q6', 'Property FE-1 2022 Q6'],
  },
  {
    case_name: 'Donoghue v Stevenson',
    citation: '[1932] AC 562',
    year: 1932,
    court: 'House of Lords',
    jurisdiction: 'UK',
    legal_principle:
      "A manufacturer of products owes a duty of care in negligence to the ultimate consumer where the product reaches the consumer in the form in which it left the manufacturer without a reasonable possibility of intermediate examination, and the manufacturer knows that the absence of reasonable care in preparation will result in injury to the consumer. Lord Atkin's 'neighbour principle' establishes that a duty of care is owed to persons who are so closely and directly affected by one's acts that one ought reasonably to have them in contemplation when directing one's mind to the acts or omissions in question.",
    key_quote:
      'You must take reasonable care to avoid acts or omissions which you can reasonably foresee would be likely to injure your neighbour. Who then in law is my neighbour? Persons who are so closely and directly affected by my act that I ought reasonably to have them in contemplation.',
    full_summary:
      "Donoghue v Stevenson [1932] AC 562 is the foundational case of the modern law of negligence. Mrs Donoghue consumed part of a bottle of ginger beer which, she alleged, contained the decomposed remains of a snail, causing her gastroenteritis. Because the bottle was purchased by a friend and therefore no contract existed between Mrs Donoghue and the manufacturer, she could not sue in contract; the question was whether the manufacturer owed her a duty of care in tort. The House of Lords, by a 3-2 majority, held that it did. Lord Atkin's speech articulated the 'neighbour principle' as the conceptual basis for the duty of care: a duty arises towards those so closely and directly affected by one's acts that one ought reasonably to have them in contemplation when directing one's mind to the relevant acts or omissions. Lord Macmillan emphasised that the categories of negligence are never closed, enabling the tort to expand to meet new situations. Donoghue v Stevenson remains the starting point for any analysis of the duty of care and is foundational in all Irish and UK tort law courses. It is cited in Glencar Explorations v Mayo Co Co [2002] and extensively analysed in Robinson v Chief Constable of West Yorkshire [2018].",
    subjects: ['torts'],
    topics: [
      'negligence',
      'duty of care',
      'neighbour principle',
      'manufacturer liability',
      'product liability',
    ],
    is_frequently_tested: true,
    past_paper_appearances: [
      'Torts FE-1 2015 Q1',
      'Torts FE-1 2017 Q1',
      'Torts FE-1 2019 Q1',
      'Torts FE-1 2022 Q1',
    ],
  },
  {
    case_name: 'Home Office v Dorset Yacht Co Ltd',
    citation: '[1970] AC 1004',
    year: 1970,
    court: 'House of Lords',
    jurisdiction: 'UK',
    legal_principle:
      'A duty of care may arise in respect of the acts of third parties where the defendant has assumed responsibility for the supervision or control of those third parties and the damage caused is a foreseeable consequence of a failure to exercise that control. The House of Lords extended the neighbour principle from Donoghue v Stevenson to impose liability on public authorities for foreseeable harm caused by third parties under their supervision.',
    key_quote:
      'Proximity must be present; it does not follow that because loss is foreseeable, a duty of care exists. But where officers have control and custody of offenders, and damage to nearby property is foreseeable if that control is negligently relaxed, a duty of care arises.',
    full_summary:
      "Home Office v Dorset Yacht Co Ltd [1970] AC 1004 concerned borstal boys who were being supervised on an island near Poole Harbour. Seven of them escaped at night while the officers were asleep, boarded the plaintiffs' yachts, and caused substantial damage. The question was whether the Home Office owed a duty of care to the owners of the yachts in respect of the acts of the escapees. The House of Lords, by a 4-1 majority, held that it did. Lord Reid's speech marked a watershed in negligence law by treating Donoghue v Stevenson as providing a general principle capable of application beyond its specific facts, subject to considerations of public policy that might restrict its scope. It was held that the proximity between the officers and the plaintiffs was sufficient — they knew or ought to have known that the plaintiffs' property was at risk — and that no sufficient policy reason existed to exclude liability. The case is significant for: (i) the extension of duty of care to cases involving third-party wrongdoers; (ii) the role of public policy as a limiting factor; and (iii) Lord Reid's liberalisation of the Atkin neighbour principle. It is foundational in FE-1 torts courses as part of the development of the duty of care from Donoghue through to Caparo and Glencar.",
    subjects: ['torts'],
    topics: [
      'negligence',
      'duty of care',
      'third party acts',
      'public authority liability',
      'proximity',
      'policy',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['Torts FE-1 2016 Q1', 'Torts FE-1 2018 Q1', 'Torts FE-1 2020 Q2'],
  },
  {
    case_name: 'Glencar Explorations plc v Mayo County Council',
    citation: '[2002] 1 IR 84',
    year: 2002,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "In Irish law, the test for the existence of a duty of care in negligence requires: (i) reasonable foreseeability of damage; (ii) proximity of relationship between plaintiff and defendant; and (iii) that it is just and reasonable in all the circumstances to impose a duty. The third requirement involves a consideration of policy factors and reflects the Irish Supreme Court's preference for a structured incremental approach over any single universal formula.",
    key_quote:
      'I am satisfied that there exists a third ingredient of the duty of care beyond foreseeability and proximity, namely that in all the circumstances it is just and reasonable that the law should impose a duty of a given scope upon the defendant.',
    full_summary:
      "Glencar Explorations plc v Mayo County Council [2002] 1 IR 84 is the leading Irish Supreme Court authority on the duty of care in negligence. The plaintiffs, a mining exploration company, suffered pure economic loss when a moratorium on mining adopted by Mayo County Council — which was found to be ultra vires — prevented them from exploiting licences they held. They claimed in negligence against the Council for the loss resulting from the invalid moratorium. The Supreme Court dismissed the claim on the ground that no duty of care existed. Keane CJ (with whom the majority agreed) explicitly adopted a three-part test for duty of care: foreseeability, proximity, and the just and reasonable requirement. He rejected the broader 'two-stage' Anns test that had briefly been influential in some jurisdictions and the Irish courts had previously considered. The just and reasonable requirement was held to encapsulate policy considerations including the potential indeterminacy of liability, the availability of other remedies (the plaintiffs could have challenged the moratorium by judicial review), and the nature of the relationship between the parties. Glencar is essential reading in FE-1 torts courses as it remains the authoritative statement of Irish negligence law and is distinguished from the English Caparo three-stage test on which it closely draws.",
    subjects: ['torts'],
    topics: [
      'negligence',
      'duty of care',
      'pure economic loss',
      'just and reasonable',
      'foreseeability',
      'proximity',
      'Caparo',
      'public authority',
    ],
    is_frequently_tested: true,
    past_paper_appearances: [
      'Torts FE-1 2015 Q2',
      'Torts FE-1 2017 Q2',
      'Torts FE-1 2019 Q2',
      'Torts FE-1 2023 Q1',
    ],
  },
  {
    case_name: 'Robinson v Chief Constable of West Yorkshire Police',
    citation: '[2018] UKSC 4',
    year: 2018,
    court: 'Supreme Court',
    jurisdiction: 'UK',
    legal_principle:
      'Under English law, the question of whether a duty of care exists is to be determined by reference to established principles and decided cases rather than by the application of a general test. A duty of care will be owed where the defendant has created or exacerbated a danger that injures the claimant, or where there is an assumption of responsibility. The Caparo three-stage test is not a universal formula to be applied in every case but is an aid to analysis in novel situations.',
    key_quote:
      'The Caparo three-stage test does not provide a formula which can be applied mechanically to determine whether a duty of care exists. In the ordinary run of cases, courts should apply the principles established by precedent; it is only in novel situations that the Caparo criteria serve as a guide.',
    full_summary:
      "Robinson v Chief Constable of West Yorkshire Police [2018] UKSC 4 arose from an incident in which plainclothes police officers attempted to arrest a drug dealer in a busy pedestrianised street in Huddersfield. The struggle that followed resulted in the elderly claimant, Mrs Robinson, being knocked to the ground and injured by the officers and the suspect. The Supreme Court held that the police owed a duty of care to Mrs Robinson. Lord Reed's leading judgment delivered a significant clarification of English negligence law, holding that the Caparo three-stage test (Caparo Industries plc v Dickman [1990] 2 AC 605) is not a universal formula to be applied in every case but rather a guide for novel situations. In established categories of duty — such as the duty not to create a danger that causes physical harm to a claimant — the court should simply apply the relevant precedent. The police, by their positive act of setting up an arrest operation in a public thoroughfare, had created a danger and thus owed a duty of care to bystanders foreseeably in the vicinity. The general rule that public authorities are not liable for the wrongs of third parties did not assist the defendant where the police themselves had caused the danger. Robinson is important in FE-1 torts courses for its clarification of the role of Caparo, the distinction between acts and omissions in duty analysis, and the liability of the police in operational contexts.",
    subjects: ['torts'],
    topics: [
      'negligence',
      'duty of care',
      'Caparo test',
      'police liability',
      'public authority',
      'positive acts',
      'third party liability',
    ],
    is_frequently_tested: true,
    past_paper_appearances: ['Torts FE-1 2019 Q3', 'Torts FE-1 2021 Q1', 'Torts FE-1 2023 Q2'],
  },
  {
    case_name: 'Start Mortgages DAC v Ramseyer',
    citation: '[2024] IEHC 329',
    year: 2024,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "Where a loan purchaser ('vulture fund') seeks an order for possession of registered land under section 62(7) of the Registration of Title Act 1964, the court will carefully scrutinise whether the fund has established, in unequivocal terms, that it is the registered owner of the charge. The principle that the register is conclusive evidence of title under section 31 of the 1964 Act applies equally in favour of the registered landowner: if the folio does not clearly identify the claimant as the charge holder, the claim for possession will not be granted on a summary basis and will be remitted to plenary hearing.",
    key_quote:
      'Just as a charge holder is entitled to rely on the express terms of the folio when seeking an order for possession, so too is the owner of the lands. Here, neither folio establishes in unequivocal terms that Start Mortgages DAC is the registered owner of the two charges originally granted in favour of the Governor and Company of the Bank of Scotland.',
    full_summary:
      "Start Mortgages DAC v Ramseyer [2024] IEHC 329, delivered by Mr Justice Garrett Simons, arose from an application by Start Mortgages DAC — a so-called 'vulture fund' that had purchased distressed loan books — for summary possession of two parcels of registered land in County Meath pursuant to section 62(7) of the Registration of Title Act 1964. The Circuit Court had previously granted a possession order, and the defendants appealed to the High Court. The central issue was whether Start Mortgages DAC had sufficiently established its entitlement as registered charge holder. The court applied the principle under section 31 of the 1964 Act that the register is conclusive evidence of title, but held that this principle cuts both ways: the landowners could equally rely on the register to show that the plaintiff was not unequivocally registered as owner of the charges. Because the folio entries were ambiguous as to the identity of the current charge holder — the original mortgagee being the Bank of Scotland and the chain of assignment not being reflected with clarity in the folio — the court refused to grant the order for possession on a summary basis. Simons J remitted the matter to plenary hearing, noting that courts were now scrutinising more closely the chain of title relied upon by loan purchasers. This decision is significant for mortgage enforcement practice and is studied in FE-1 property courses for the operation of section 62(7) and the impact of loan book transfers on possession proceedings.",
    subjects: ['property-law'],
    topics: [
      'mortgages',
      'mortgage enforcement',
      'possession',
      'vulture funds',
      'chain of title',
      'Registration of Title Act 1964',
      's.62(7)',
      's.31',
    ],
    is_frequently_tested: true,
    past_paper_appearances: [],
  },
  {
    case_name: 'EBS Mortgage Finance & Mars Capital Finance DAC v Bedford',
    citation: '[2024] IEHC 407',
    year: 2024,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In summary possession proceedings brought by a loan purchaser, the court will refuse an order for possession where the plaintiff fails to exhibit or adduce detailed evidence proving each step in the transfer of the underlying loan from the original lender to the current plaintiff. The full chain of title — from the original mortgagee through each successive assignment to the plaintiff — must be established by admissible evidence before a possession order will issue.',
    key_quote:
      'The court found there was no exhibit or detailed evidence proving the transfer of the loans, with the plaintiff having failed to establish the full chain of title from the original lender to the current plaintiff seeking possession.',
    full_summary:
      "EBS Mortgage Finance & Mars Capital Finance DAC v Bedford [2024] IEHC 407, delivered by Ms Justice Mary Rose Gearty, concerned a Circuit Court appeal involving an application for summary possession of the defendants' principal private residence. The underlying mortgage had originally been advanced by EBS Limited, which had been restructured into EBS Mortgage Finance, and the debt had subsequently been purchased by Mars Capital Finance DAC. The High Court found that the plaintiff had failed to adduce sufficient evidence proving the full chain of transfer from EBS Limited through EBS Mortgage Finance to Mars Capital. There was no exhibited deed of transfer or detailed narrative evidence tracing each step in the assignment. The court refused to grant the summary order for possession. This decision, together with Start Mortgages DAC v Ramseyer [2024] IEHC 329, reflects a clear judicial trend toward heightened scrutiny of chain-of-title proofs in enforcement actions by loan purchasers. The cases are frequently cited by practitioners advising borrowers facing possession proceedings and are studied in FE-1 property modules on mortgage enforcement as illustrations of how courts are now applying the proof requirements under section 62(7) of the Registration of Title Act 1964.",
    subjects: ['property-law'],
    topics: [
      'mortgages',
      'mortgage enforcement',
      'possession',
      'vulture funds',
      'chain of title',
      'loan transfer',
      'Registration of Title Act 1964',
    ],
    is_frequently_tested: true,
    past_paper_appearances: [],
  },
  {
    case_name: 'Start Mortgages DAC v Doyle',
    citation: '[2024] IEHC 561',
    year: 2024,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'In possession proceedings arising from mortgage default, the fundamental issue is whether the borrower is in default — not the precise amount of the debt claimed. A borrower who wishes to resist a possession order on the ground that the plaintiff has overcharged must plead that allegation with particularity; bald assertions of overcharging, unsupported by evidence, will not suffice to defeat a possession claim or to require the matter to be remitted to plenary hearing.',
    key_quote:
      'In a case for possession, default is the issue, not the amount. Overcharging claims, described at best as bald assertions, do not provide a credible basis for refusing the order sought.',
    full_summary:
      "Start Mortgages DAC v Doyle [2024] IEHC 561 arose from possession proceedings in which the borrower resisted the plaintiff's application by asserting, among other grounds, that the loan account had been overcharged and that the amount claimed was therefore in dispute. The High Court rejected this line of defence. The court reiterated the well-established principle — derived from the earlier line of possession case law — that the operative question in a section 62(7) application is whether the borrower is in default, not whether the amount claimed is precisely correct. The court held that unparticularised allegations of overcharging, without supporting evidence or a proper counterclaim, amount to no more than bald assertions and cannot displace the plaintiff's entitlement to possession. The decision is important for delineating the limits of defences available to borrowers in summary possession proceedings, and for clarifying that disputes as to quantum do not automatically warrant remittal to plenary hearing where the fact of default is not in genuine dispute. It is cited in FE-1 property courses alongside the chain-of-title cases for a complete picture of mortgage enforcement procedure.",
    subjects: ['property-law'],
    topics: [
      'mortgages',
      'mortgage enforcement',
      'possession',
      'default',
      'overcharging',
      'Registration of Title Act 1964',
      's.62(7)',
    ],
    is_frequently_tested: true,
    past_paper_appearances: [],
  },
  {
    case_name: 'Everyday Finance DAC v Farrell',
    citation: '[2025] IEHC 722',
    year: 2025,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "In summary possession proceedings, once a loan purchaser establishes that it is the registered charge holder and that the borrower is in default, the court will ordinarily grant the order sought. Defences based on 'sovereign citizen' or 'freeman on the land' theories — asserting that the court lacks jurisdiction or that the borrower is not subject to the law — have no legal foundation and will be dismissed without affecting the merits of the possession claim. The assignment of a mortgage to a new legal owner does not affect the enforceability of the underlying security provided the assignment is properly effected.",
    key_quote:
      "Arguments based on so-called 'sovereign citizen' or 'freeman on the land' theories have no legal basis in this jurisdiction and do not constitute a credible defence to possession proceedings.",
    full_summary:
      "Everyday Finance DAC v Farrell [2025] IEHC 722, delivered by Gillane J, concerned an application for summary possession of a residential property following default on a mortgage that had been assigned to the plaintiff loan purchaser. The defendant raised a range of arguments in response, including 'sovereign citizen' or 'freeman on the land' style theories challenging the jurisdiction of the court and the validity of the loan agreement. The High Court gave short shrift to the jurisdictional arguments, confirming that such theories have no legal foundation in Irish law and do not constitute any form of credible defence to enforcement proceedings. On the substantive points, the court confirmed the established principles governing summary possession and assignment of mortgages: once valid assignment to the new charge holder is established and default is proven, the order will issue. The case is notable as a recent clear statement on the limits of defences in mortgage enforcement and is relevant to FE-1 property courses both for its treatment of summary possession procedure and as a practical illustration of the courts' response to novel jurisdictional challenges.",
    subjects: ['property-law'],
    topics: [
      'mortgages',
      'mortgage enforcement',
      'possession',
      'assignment of mortgages',
      'sovereign citizen',
      'defences to possession',
      'vulture funds',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
  {
    case_name: 'Mars Capital Finance Ireland DAC v Phelan',
    citation: '[2025] IECA 117',
    year: 2025,
    court: 'Court of Appeal',
    jurisdiction: 'Ireland',
    legal_principle:
      'Where a mortgage loan is held by a loan purchaser as trustee (legal owner) for a beneficial owner, the appropriate plaintiff in enforcement proceedings is the trustee qua legal owner, not the beneficial owner. The identity of the ultimate funder or beneficiary of the loan purchase arrangement is immaterial to the locus standi of the plaintiff in possession proceedings, provided the deed of transfer makes clear that legal title passed to the plaintiff.',
    key_quote:
      'The identity of the funder of the loan purchase is immaterial; the Deed of Transfer made clear that legal title was assigned to the loan purchaser, and in litigation the appropriate plaintiff is the trustee — the legal owner — not the beneficiary.',
    full_summary:
      "Mars Capital Finance Ireland DAC v Phelan [2025] IECA 117 was an appeal to the Court of Appeal against a High Court decision granting possession in favour of the plaintiff loan purchaser. The defendant argued that Mars Capital lacked standing to bring the proceedings because the ultimate beneficial interest in the loan had been retained by another entity, and that the 'true' plaintiff was therefore not before the court. The Court of Appeal dismissed the appeal and confirmed that, where a deed of transfer clearly assigns legal title to a named entity, that entity is the appropriate plaintiff in proceedings to enforce the security. The identity of the funder or beneficial owner behind the loan purchaser is not a relevant consideration for the purposes of establishing locus standi. The court applied the fundamental distinction between legal and beneficial ownership: only the legal owner can sue at law to enforce a legal right, and this principle is not displaced by the existence of a trust structure behind the named plaintiff. This decision clarifies an issue that had arisen frequently in the vulture fund litigation wave of the mid-2020s and is an important case for FE-1 property students studying mortgage enforcement and the significance of legal versus equitable title.",
    subjects: ['property-law'],
    topics: [
      'mortgages',
      'mortgage enforcement',
      'possession',
      'locus standi',
      'trustee',
      'legal title',
      'beneficial ownership',
      'loan purchaser',
      'vulture funds',
      'assignment of mortgages',
    ],
    is_frequently_tested: true,
    past_paper_appearances: [],
  },
  {
    case_name: "Pepper Finance Corporation (Ireland) DAC v O'Reilly",
    citation: '[2026] IEHC 16',
    year: 2026,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A mortgage assignee seeking possession must establish, by unredacted evidence, the complete chain of title from the original lender to itself. Where the deed of transfer relied upon is heavily redacted and does not clearly identify the transferor, the court cannot be satisfied that the plaintiff is the lawful owner of the debt, and the matter will be remitted to plenary hearing. Registration of the plaintiff as charge holder on the Land Registry folio is relevant but not alone conclusive of ownership of the underlying debt.',
    key_quote:
      'Each of the four loan agreements was entered into with a different entity than that which is now the plaintiff in the proceedings; the defendant has demonstrated, on the basis of the limited materials before the court, credible grounds for defending the proceedings.',
    full_summary:
      "Pepper Finance Corporation (Ireland) DAC v O'Reilly [2026] IEHC 16 concerned an appeal from a Circuit Court order for possession of a residential property in Ballyfermot, originally granted in January 2019 in favour of KBC Bank Ireland plc. The loans had passed through several entities — from IIB Homeloans to KBC Bank to Pepper Finance — and Pepper was substituted as plaintiff in the High Court appeal. Mr Justice Simons held that, while the Land Registry folio showed Pepper as the registered charge holder, establishing registration was not sufficient to satisfy the second essential proof in possession proceedings: that the principal money secured by the charge had become due and owing to the current plaintiff. Because the four underlying loan agreements had each been made with a different entity in the chain, and the deed of transfer relied upon to establish Pepper's entitlement was substantially redacted, the court was not satisfied that the chain of title to the debt had been established. The matter was remitted to plenary hearing. This decision is the most recent in a line of cases (beginning with Ramseyer [2024] and Bedford [2024]) requiring loan purchasers to prove their full chain of title to both the charge and the underlying debt and is a key 2026 authority for FE-1 property courses.",
    subjects: ['property-law'],
    topics: [
      'mortgages',
      'mortgage enforcement',
      'possession',
      'vulture funds',
      'chain of title',
      'loan transfer',
      'Pepper Finance',
      'KBC Bank',
      'Registration of Title Act 1964',
    ],
    is_frequently_tested: true,
    past_paper_appearances: [],
  },
  {
    case_name: 'Coulston & Ors v Elliot & Anor',
    citation: '[2024] IEHC 697',
    year: 2024,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A receiver taking possession of mortgaged property by breaking locks does not enter 'peaceably' within the meaning of the Forcible Entry and Occupation Act 1981 (and its predecessor the Forcible Entry Act 1381); entry by means of breaking locks is forcible entry. However, a defectively appointed receiver may nonetheless act validly if the appointing party subsequently ratifies the appointment by board resolution, with the ratification taking effect *ab initio* and validating all acts taken by the receiver under the defective appointment.",
    key_quote:
      'The taking of possession by means of breaking locks was not peaceable repossession; the use of a master key by a landlord to gain entry would be deemed peaceable, but the breaking of locks is not.',
    full_summary:
      "Coulston & Ors v Elliot & Anor [2024] IEHC 697 raised two distinct issues arising from the repossession of a mixed-use property in Waterford comprising a residential home and a retail unit subject to a mortgage in default. A receiver was appointed by the mortgagee bank and, in taking possession of the property, arrived in the early hours of the morning and broke the locks on the front door to gain entry. First, on the peaceable repossession point: the defendants invoked the Forcible Entry Act 1381 (still on the statute book) and the Forcible Entry and Occupation Act 1981, contending that the receiver's entry was not peaceable. The court agreed, referring to ILG Limited & Ors v Aprilane Limited [2024] IEHC 420 and holding that breaking locks constitutes forcible, not peaceable, entry. By contrast, use of a master key — which opens rather than breaks the lock mechanism — would be peaceable entry. Second, on the receiver appointment point: the court found that the initial appointment of the receiver was not validly made due to a procedural defect in the appointing instrument. However, the bank subsequently passed a board resolution ratifying the appointment. The court held that ratification was effective and operated *ab initio*, so that the deed of appointment was deemed valid from the outset and all acts of the receiver were retrospectively validated. This decision is important in FE-1 property courses for the law on peaceable repossession by mortgagees and receivers and for the doctrine of ratification in the context of agency.",
    subjects: ['property-law'],
    topics: [
      'mortgages',
      'receivership',
      'peaceable repossession',
      'forcible entry',
      'receiver appointment',
      'ratification',
      'mortgage enforcement',
    ],
    is_frequently_tested: true,
    past_paper_appearances: [],
  },
  {
    case_name: 'The Atlantis Case (Mulcahy J)',
    citation: '[2023] IEHC (10 November 2023)',
    year: 2023,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      "A claim of title by adverse possession will only be upheld when strictly and factually proven to the court's satisfaction. The claimant must establish both *actus possidendi* — exclusive, uninterrupted physical possession for the full 12-year period under section 49(2) of the Registration of Title Act 1964 — and *animus possidendi* — a clear intention to exclude the world, including the registered owner, from the land. If the claim fails this evidential test, it will be dismissed in its entirety, with costs consequences for the unsuccessful claimant. Even minimal acts of possession by the paper title owner will prevent the limitation period from running against them.",
    key_quote:
      "The enclosure of a field by a wall is an example of an activity that 'speaks loudly of possession.' A claim that fails the factual proof test will be rejected and dismissed in its entirety, with costs consequences for the claimant.",
    full_summary:
      "The 'Atlantis' case (the court's own reference at paragraph 117 of the judgment to Plato's legendary sunken empire), delivered by Mulcahy J on 10 November 2023, is a significant High Court restatement of the principles governing adverse possession of registered land in Ireland. The case involved a disputed claim to registered land and required the court to consider in detail the evidentiary standards applicable to such claims under section 49(2) of the Registration of Title Act 1964. Mulcahy J reviewed the twin requirements: *actus possidendi* — acts of possession such as fencing, farming, grazing, construction or drainage, which are best combined and must be proven over a continuous, uninterrupted 12-year period — and *animus possidendi* — the intention, clearly demonstrated to the world, to exclude the registered owner. The judge drew on the earlier *Dunne* dicta (Clarke J, upheld by the Supreme Court) that even minimal acts by the paper title owner — which need not match the full ordinary use of which the property is capable — are sufficient to establish continued possession and defeat the adverse possession claim. The court emphasised that courts and the Tailte Éireann (Property Registration Authority) apply a stringent standard and that unsuccessful claimants face a full costs order. The Atlantis judgment was analysed in the April 2024 edition of the Law Society Gazette and is now a key authority in FE-1 property courses alongside Powell v MacFarlane [1977], JA Pye v Graham [2002] UKHL 30, and Cork Corporation v Lynch [1995].",
    subjects: ['property-law'],
    topics: [
      'adverse possession',
      'animus possidendi',
      'actus possidendi',
      'Registration of Title Act 1964',
      's.49(2)',
      'registered land',
      'limitation of actions',
      'Tailte Eireann',
    ],
    is_frequently_tested: true,
    past_paper_appearances: [],
  },
  {
    case_name: 'Good Hope Investments Ltd v New Ireland Assurance Company PLC',
    citation: '[2025] IEHC 667',
    year: 2025,
    court: 'High Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'Where a defendant holds property on trust and disposes of it in breach of that trust — including by selling the property to two different parties — the limitation period applicable to an action against the trustee is governed by sections 43 and 44 of the Statute of Limitations 1957. Under section 43, a six-year period applies to claims against trustees but the cause of action does not accrue until the trust interest falls into possession. Under section 44, the limitation period is disapplied entirely in cases involving fraud by the trustee.',
    key_quote:
      'Section 43 provides for a limitation period of six years against trustees, with the cause of action not being deemed to accrue until the interest in question falls into possession, and section 44 excludes from the limitation period actions against trustees in cases of fraud.',
    full_summary:
      'Good Hope Investments Ltd v New Ireland Assurance Company PLC [2025] IEHC 667 arose from proceedings issued in July 2024 in which the plaintiff claimed that it held an equitable beneficial interest in a property and that the defendant, in breach of a trust relationship, had sold the property twice and wrongfully continued to retain the proceeds of sale. The defendant sought an order for security for costs, contending that the claim was statute-barred. Mr Justice Nolan addressed the operation of sections 43 and 44 of the Statute of Limitations 1957 in the context of trust claims. He summarised the effect of section 43 as providing a six-year limitation period for actions against trustees, with the cause of action accruing not from the date of the breach but from the date on which the trust interest falls into possession. Section 44 provides a complete exclusion of the limitation period where the trustee has committed a fraud, since the law does not permit a wrongdoer to rely on the passage of time that flows from their own wrongful concealment of the breach. The case is significant for FE-1 property students studying the intersection of trust law, co-ownership, and limitation of actions, and is particularly relevant to scenarios involving double sales or breach of fiduciary duty in a property context.',
    subjects: ['property-law'],
    topics: [
      'trusts',
      'breach of trust',
      'double sale',
      'beneficial interest',
      'Statute of Limitations 1957',
      's.43',
      's.44',
      'fraud',
      'trustee',
      'limitation of actions',
    ],
    is_frequently_tested: true,
    past_paper_appearances: [],
  },
  {
    case_name: 'Tweedswood Ltd (In Receivership) v Martin Power',
    citation: '[2025] IESC 18',
    year: 2025,
    court: 'Supreme Court',
    jurisdiction: 'Ireland',
    legal_principle:
      'A party who obtains an interlocutory injunction in property proceedings assumes a positive obligation to prosecute those proceedings to finality with reasonable expedition. Where there has been culpable and inordinate delay in bringing the proceedings to trial, the court has jurisdiction to discharge the injunction even if it was properly granted at the outset. The onus rests on the injunction holder to ensure the case progresses; this obligation is not discharged merely because the opposing party has not applied to discharge the order.',
    key_quote:
      'There is an onus on the party who obtains such an injunction to ensure that the proceedings are brought to a conclusion and, if there is any culpable delay in that regard, then the court is entitled to, and may be obliged to, set aside the order obtained.',
    full_summary:
      "Tweedswood Ltd (In Receivership) v Martin Power [2025] IESC 18 concerned a commercial property in Wexford town centre, the only asset of Tweedswood Ltd, over which Ulster Bank had appointed a receiver following the company's default on a loan of almost €900,000. A winding-up order was made in 2008, and the defendant — the sole shareholder — initially refused to give up possession to the receiver. Plenary proceedings were issued and an interlocutory injunction was granted requiring the defendant to vacate the property. Over fifteen years passed without the plenary proceedings being brought to trial. The Supreme Court, in a judgment delivered by Chief Justice O'Donnell, held that the prolonged delay was culpable and that the party who had obtained the injunction had failed in its obligation to bring the proceedings to a conclusion. The court accordingly discharged the fifteen-year-old interlocutory injunction. The decision is important in property law for its clear statement of the positive duty on injunction holders to prosecute proceedings diligently, and for the court's willingness to revisit long-standing interlocutory orders where the underlying litigation has stalled. It is also relevant to the law of receivership over mortgaged property and the obligations of receivers in possession proceedings.",
    subjects: ['property-law'],
    topics: [
      'injunctions',
      'interlocutory injunction',
      'receivership',
      'delay',
      'mortgage enforcement',
      'property litigation',
      'laches',
      'discharge of injunction',
    ],
    is_frequently_tested: false,
    past_paper_appearances: [],
  },
];

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
