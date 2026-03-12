// prisma/seedPastQuestions.ts
// Usage: npx ts-node -r tsconfig-paths/register prisma/seedPastQuestions.ts
// Replace the essayData array with real client data as it comes in.
// Safe to rerun — wipes all ESSAY questions and reseeds fresh every time.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pastQuestions = [
  {
    subject: 'Constitutional Law',
    year: 2008,
    questions: [
      {
        examType: 'Problem',
        description:
          'Maria has been accused of involvement in a complex financial fraud, in… Constitutional.',
        text: "Maria has been accused of involvement in a complex financial fraud, in which money was unlawfully removed from Irish pension funds. The collapse of the funds has affected thousands of pensioners. The case has attracted a lot of media coverage. Many of these reports have been very critical of Maria. Maria is concerned about the risk of biased jury. She is aware that she has a constitutional right to a jury trial but wishes to waive it. She therefore applies to the trial judge to hear the case without a jury, or to transfer the case to the non-jury Special Criminal Court. The judge rejects this request. He explains that he does not think it is necessary in this case. He instead proposes to exclude any person with a pension from the jury pool. Maria is dissatisfied with this. She has asked you for your opinion on the constitutionality of the judge's decision. She has also asked you if she should appeal his refusal of her request. Advise Maria.",
      },
      {
        examType: 'Problem',
        description:
          'John was convicted in December 2005 of the murder of his wife Carol, in… Murder.',
        text: "John was convicted in December 2005 of the murder of his wife Carol, in March of the same year. He was sentenced to life imprisonment and is currently serving that sentence in Mountjoy Prison. John's conviction was based mainly on evidence gleaned during a search of the family home, No. 7 Loughrea Tce. John does not dispute the fact that the evidence was relevant and potentially probative of his guilt. It has recently been brought to John's attention that the search warrant under which the home was entered and searched was for a different house in the same area -- No. 7 Loughrea Road. Carol's brother James lives at No. 7 Loughrea Road and it has emerged that the Gardaí in fact suspected him of the murder and not John and thought that they were searching his house at the time the warrant was executed. John is very hopeful that this information might be sufficient to gain his release from custody. He has heard that there is a mechanism under the Constitution which would enable him to have this matter dealt with speedily. One of his fellow inmates, however, has told him that he is wasting his time pursuing this as the Gardaí will simply rearrest him if he is released. Advise John.",
      },
      {
        examType: 'Problem',
        description:
          'As a result of severe injuries sustained in a road traffic accident, John… Constitutional.',
        text: "As a result of severe injuries sustained in a road traffic accident, John has been in a coma for 35 years. The doctors are satisfied that he is not brain dead and feel that he may have a basic level of cognition. However, their professional opinion is that it is highly unlikely that he will ever awake from the coma. They also feel that there is a reasonable possibility that he suffers considerable pain from his injuries on a daily basis. John's father is 81. His mother is deceased. His father is concerned about what may happen to John after his death. He is also convinced that John would not wish to remain in a coma. Before his injuries, John had told him that he would \"hate to be cooped up inside for a long time\". John's father asks the doctors if they can turn off the machine that assists John's breathing. They refuse on the grounds that this would contravene John's right to life. You have been asked to advise John's father whether there are any alternative courses of action open to him under Irish constitutional law.",
      },
      {
        examType: 'Essay',
        description:
          '"The principles of social policy set out in Article 45 have no impact or influence on Irish constitutional law.',
        text: '"The principles of social policy set out in Article 45 have no impact or influence on Irish constitutional law. Their inclusion in the text of the Constitution is, at best, an irrelevance and, at worst, a serious mistake." Discuss this statement with reference to the relevant caselaw of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          '"When viewed in comparison with the potential remedy of having a law declared unconstitutional under Article 34.3.2° of…',
        text: '"When viewed in comparison with the potential remedy of having a law declared unconstitutional under Article 34.3.2° of the Constitution, a declaration of incompatibility under s.5 of the European Convention on Human Rights Act 2003 ("the 2003 Act") is an unattractive remedy for any litigant. For this reason, the 2003 Act is unlikely to have any real impact as litigants will invariably rely on the Constitution as the primary mechanism for protecting their rights." Do you agree with this statement?',
      },
      {
        examType: 'Problem',
        description: 'Eithne is a widowed mother of seven children. Constitutional.',
        text: "Eithne is a widowed mother of seven children. She is not in full-time employment and has applied to her local authority for housing for her family. She is particularly hopeful as she knows that a four-bedroom unit has recently become available in her neighbourhood. The local council apply a policy in accordance with which preference for housing is given to married couples with children. The council decides to allocate the house which Eithne wanted to a couple who are married and who have a 16 year old son. Eithne is very upset by this. She wants to know if the council's decision can be challenged under Irish constitutional law. Advise her.",
      },
      {
        examType: 'Essay',
        description:
          '"The Presidency of Ireland is an office with significant constitutional prominence but no practical power." Do you…',
        text: '"The Presidency of Ireland is an office with significant constitutional prominence but no practical power." Do you agree? Support your argument, where appropriate, with reference to the relevant provisions of the Constitution and caselaw of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          '"The right to privacy is an under-developed constitutional entitlement which has not been adequately defined or…',
        text: '"The right to privacy is an under-developed constitutional entitlement which has not been adequately defined or protected by the Irish courts." Discuss this statement with reference to the constitutional jurisprudence of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'William is a 45 year old aeronautics engineer who has always dreamed of… Constitutional.',
        text: 'William is a 45 year old aeronautics engineer who has always dreamed of being a pilot. He applies to the Irish Air Force for entry into their pilot training program. His application is refused on the basis that he is too old to enter into the program. The Air Force informs William that he meets all the other relevant physical and mental criteria. The Air Force has a policy of only accepting recruits who are under 35 years of age. The training program takes 7 years and is a very expensive process. Experience has shown that Air Force pilots usually have to retire on physical grounds by the time they are 55. The Air Force does not accept older recruits because it believes it is an inefficient use of resources to train pilots who may have to retire within a relatively short period of time. William wishes to know if he has any grounds to challenge this decision under Irish constitutional law. Advise him.',
      },
      {
        examType: 'Problem',
        description:
          'The Agricultural Rationalisation Act 2008 establishes a body known as… Constitutional.',
        text: 'The Agricultural Rationalisation Act 2008 establishes a body known as Agri-efficiency Ireland (AI). Under section 1 of the Act, this body is charged with the function of "securing the efficient organisation of the agricultural industry in Ireland". Section 2 of the Acts vests "all powers necessary for the performance of its function" in AI. AI establishes the Fuel Efficient Vehicle scheme. This aims to ensure that farmers in Ireland are not using vehicles which generate a lot of pollution. AI announces that it will conduct inspections of all farms in Ireland and seize all inefficient vehicles. Paul is a small farmer with two 20 year old tractors. The AI inspector decides that his tractors are both inefficient and orders their seizure. The scheme provides for a flat payment of €500 for vehicles over 10 years old. Paul is accordingly paid €1000 in compensation. Paul believes that his tractors were worth approximately €1200. They would also cost €10,000 to replace. Paul is concerned that he will not be able to afford this and that he will therefore have to sell the farm. Advise Paul if he has any grounds to challenge this decision under Irish constitutional law.',
      },
      {
        examType: 'Essay',
        description:
          '"Although it is less influential than formerly, natural law jurisprudence continues to have important implications for…',
        text: '"Although it is less influential than formerly, natural law jurisprudence continues to have important implications for Irish constitutional law." Do you agree? Discuss this statement with reference to the relevant caselaw of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'The Irish Organisation for Political Rights (IOPR) is a non-profit… Advise the IOPR of any potential issues that may…',
        text: 'The Irish Organisation for Political Rights (IOPR) is a non-profit organisation which campaigns for greater protection of civil and political rights. IOPR is concerned about the passing of the Protection of Public Property Act 2008. This Act provides that it is a criminal offence to place posters which make reference to political or religious themes on public property. The IOPR is concerned that this legislation may raise concerns under Article 40.6.1 of the Constitution. Advise the IOPR of any potential issues that may arise in respect of its locus standi to bring proceedings.',
      },
      {
        examType: 'Essay',
        description:
          'In its recent decision in Pater v Ireland, the High Court held that a married father of a newborn child is…',
        text: 'In its recent decision in Pater v Ireland, the High Court held that a married father of a newborn child is constitutionally entitled to the same amount of leave as a mother. Explaining his decision, Eponymous J said that: "Article 42.2.1 of the Irish Constitution acknowledges the social value of parental care within the home and pledges to protect it. Allowing a parent time off work to care for a newborn infant gives effect to this clear constitutional policy. It is true that the Article in question refers only to mothers. However, this qualification reflects the social situation at the time that the Constitution was enacted. This was a time when care within the home was provided almost entirely by mothers rather than fathers. The reference to mothers was, in my view, a statement of social reality rather than an attempt to fix a particular model of parental care for all time. For the Constitution to remain relevant, it is vital that the courts apply its principles in a way which reflects the state of society. Article 42.2.1 protects parental care as it was in 1937. Extending leave to fathers as well as mothers protects the same principle of paternal care but does so in a way which gives the principle real contemporary force. I am strengthened in this conclusion by the constitutional guarantee of equality. This requires that there be equality between the sexes and between spouses. Of course, equality could be achieved by denying leave to all. However, given the pro-parental care policy of Article 41.2.2, it would not be constitutionally justifiable to remove leave from all parents. Equality therefore requires that the benefit available to mothers of newborn infants should be extended to those married fathers who fall within the scope of Articles 41 and 42". This decision is being appealed to the Supreme Court. Do you think it is likely to be reversed on appeal?',
      },
      {
        examType: 'Essay',
        description:
          '"The rights to fair procedures under Article 40.3 of the Irish Constitution is an unusually flexible and context-…',
        text: '"The rights to fair procedures under Article 40.3 of the Irish Constitution is an unusually flexible and context-sensitive right. This means that the right can potentially apply to a wide range of civil procedures. However, it also means that the level of protection provided by the right varies significantly from situation to situation. In this way, it may be said that the right to fair procedures is both far-reaching and limited in its effects." Do you agree with this statement? Discuss the extent to which it is supported by the constitutional caselaw of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          '"The Irish Constitution recognises both the right to life and the principle of individual autonomy.',
        text: '"The Irish Constitution recognises both the right to life and the principle of individual autonomy. Cases concerning the provision or refusal of medical treatment have given rise to conflicts between these constitutional principles. As the Irish decisions on medical treatment demonstrate, it is difficult to reconcile these principles with any degree of consistency or success". Discuss this statement with reference to the relevant Irish decisions on the provision or refusal of medical treatment.',
      },
      {
        examType: 'Problem',
        description:
          'John is arrested at 11.30am on July 1st by the Gardai on suspicion of… Constitutional.',
        text: 'John is arrested at 11.30am on July 1st by the Gardai on suspicion of causing criminal damage. He was arrested by the Gardai in the vicinity of some freshly-painted red graffiti. Upon his arrest, he was found to be carrying a can of red spray paint. Section 2 of the Criminal Damage Act 2008 provides that: "In the course of a trial on a charge of causing criminal damage, adverse inferences may be drawn from the failure of an accused during questioning to provide an explanation for his possession of any item which might have been used to cause criminal damage." Section 3 of the Act provides that inference may also be drawn from the fact that an accused subsequently provides an explanation which was not provided to the Gardai during initial questioning. During questioning, the Gardai explain the implications of section 2 of the 2008 Act to John. John replies that he intends to provide an explanation for his possession of the spray paint but that he wishes to speak to his solicitor first. This request is made at 3pm. The Gardai phone his solicitor\'s office at 6.30pm and leave a message asking the solicitor to attend the Garda station. The solicitor does not receive the message until 9.30am the next morning. When he reaches the station at 10.30am, the Garda on duty denies him access to the interview room. The Garda explains that "There\'s no point going in. It\'s nearly over and we have to release him in the next hour anyway". Because he has not spoken to his solicitor, John does not provide an explanation for his possession of the spray paint. He is charged with causing criminal damage. Advise John if there are any possible grounds under Irish constitutional law upon which he could challenge a trial or conviction.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2009,
    questions: [
      {
        examType: 'Essay',
        description:
          '"The constitutional protection of the family under Articles 41 and 42 of the Constitution appears to place a higher…',
        text: '"The constitutional protection of the family under Articles 41 and 42 of the Constitution appears to place a higher emphasis on the rights of parents rather than the welfare of children." Discuss.',
      },
      {
        examType: 'Problem',
        description:
          'John is a 50-year old man who was convicted of the kidnapping of a… Constitutional, Company.',
        text: 'John is a 50-year old man who was convicted of the kidnapping of a prominent businessman when he was 20 years old. At the time, John said that the kidnapping was carried out as a political protest against the capitalist system. The kidnapping received a great deal of media attention at the time. John was sentenced to 15 years in prison. Upon his release from prison, he moved to a new area and began a new life. He also changed his name from John Murphy to John Smith. He is required to sign in with the Gardai in his new locality every six months. John has been married for 12 years and has a 5-year old daughter. Neither are aware of his past crimes. Since his release, he has never been in trouble with the Gardai, and has refrained from all forms of political activity. Crime Shows Ltd, a television production company, propose to make a documentary about the kidnapping. They intend the programme to include material about John\'s new life, including secretly-filmed footage of him and his new family in the street. Upon questioning the company about the programme, it becomes clear to John that the company found him after one of the local Gardaí told a friend who worked for the company that "the guy who did that anti-capitalist kidnapping" lived locally. John has asked you for advice about the remedies, if any, which he might have under Irish constitutional law. Advise him.',
      },
      {
        examType: 'Essay',
        description:
          '"The doctrine of unenumerated rights is a misguided constitutional theory which has been used by the Irish courts as a…',
        text: '"The doctrine of unenumerated rights is a misguided constitutional theory which has been used by the Irish courts as a way of expanding their power over the action of other branches of government". Do you agree with this statement?',
      },
      {
        examType: 'Problem',
        description:
          "Controversy arises over the Government's decision to build a nuclear power… Constitutional.",
        text: "Controversy arises over the Government's decision to build a nuclear power station. It is rumoured in some reports that the original recommendation of the Minister for Energy was that the station should be built in the constituency of the Taoiseach, but it was subsequently decided to build the station elsewhere. A Dail committee proposes to investigate the siting of the station. As part of their investigation, they would like access to a series of Government documents. In particular, they are eager to see copies of documents in which the Minister for Energy set out his opinion on the appropriate place for the station. Preliminary drafts of these documents were circulated to other members of the Cabinet. They were subsequently amended to reflect the views of these other Ministers. The amended versions were then used at the Cabinet meeting, at which the decision about the location of the plant was made. The Dail Committee wants access to both the amended and draft versions of these documents. You have been asked to advise them of the possibility of obtaining such access, by reference to the principles of Irish constitutional law.",
      },
      {
        examType: 'Problem',
        description:
          'Section 4 of the Clean Streets Act 2009 provides that notices or posters… Constitutional.',
        text: 'Section 4 of the Clean Streets Act 2009 provides that notices or posters may only be placed in designated "postering areas" of any town or city. Section 5 further provides that these "postering areas" should be no bigger than 100 sq metres and that they should be at least 10km apart in any town or city. Section 6 gives the Minister the power to identify "postering areas" in a particular locality. Linda is a local election candidate in Galway. She is standing for election for the first time and wishes to erect a large number of posters. She believes that this is necessary for her to have any prospect of success because the local voters are more familiar with the incumberent candidates than with her. The Minister identifies remote sites on the outskirts of town as the relevant "postering areas" for Galway city. Linda is very unhappy with this as she believes it will adversely affect her ability to win a seat in the election. She asks you to advise her if there are any grounds under Irish constitutional law upon which she could challenge the Clean Street Act 2009. Advise her.',
      },
      {
        examType: 'Essay',
        description:
          '"The Constitution\'s reference to "social justice" and the "common good" have been interpreted by the courts in such an…',
        text: '"The Constitution\'s reference to "social justice" and the "common good" have been interpreted by the courts in such an expansive manner that they have undermined the protection of property rights in Irish constitutional law". Do you agree with this statement?',
      },
      {
        examType: 'Problem',
        description:
          'Stuart, aged 72, was headmaster of a small primary school between 1987 and… Advise Stuart.',
        text: 'Stuart, aged 72, was headmaster of a small primary school between 1987 and 2002. Following his retirement in 2002, two former pupils who attended the school as children between 1988 and 1990 went separately to the Gardai in August of that year and made statements in which they alleged that Stuart had sexually abused them during their schooldays. Stuart was charged with a number of counts of sexual assault in 2007. (The Gardai delayed in charging him as the original file was lost at some stage in 2003 and this was not discovered until 2005). Stuart wants to know if there is any chance of preventing his trial from going ahead under the Constitution. Advise Stuart.',
      },
      {
        examType: 'Essay',
        description:
          '"The increasing recourse [of the Oireachtas] to delegate legislation has given rise to and understandable concern that…',
        text: '"The increasing recourse [of the Oireachtas] to delegate legislation has given rise to and understandable concern that parliamentary democracy is being stealthily subverted and crucial decision --making powers being handed over to the unelected servants of the Minister". Do you think that the Irish courts\' treatment of the non-delegation doctrine adequately addresses this concern?',
      },
      {
        examType: 'Essay',
        description:
          '"The Attorney General has a vital role to play in ensuring that the Constitution is upheld by the various organs of…',
        text: '"The Attorney General has a vital role to play in ensuring that the Constitution is upheld by the various organs of State." Discuss.',
      },
      {
        examType: 'Problem',
        description:
          'The Oireachtas enacts the Protection of Official Records Act 2009. Constitutional.',
        text: 'The Oireachtas enacts the Protection of Official Records Act 2009. Section 1 of the Act defines an official record as "any record which it would not have been intended to release". Section 2 of the Act creates a criminal offence of "releasing official records without authorisation". The offence is punishable by five years imprisonment and/or a fine of €10,000. The offence is tried summarily before a District Court judge. Billy is a civil servant in the Department of Economic Affairs. His job is to release documents to the media that have been authorised for release by the relevant officer. His superior officer gives him a file which is to be sent to a journalist with the Irish Herald. Unknown to him, the file contains a document, the release of which has not been authorised. He sends the full file to the journalist, who publishes the material in a front-page story. Billy is charged with an offence under section 2 of the Act. You have been asked to advise him if it may be possible to prevent his prosecution on any grounds of Irish constitutional law.',
      },
      {
        examType: 'Problem',
        description:
          'Harry is fired from his job after a fellow employee makes accusations of… Constitutional.',
        text: "Harry is fired from his job after a fellow employee makes accusations of sexual harassment, bullying and assault against him. He denies the accusations and sues his employer for wrongful dismissal. His employer reports the matter to the Gardai but, after some preliminary investigations, no charges are brought. When the action for wrongful dismissal is mentioned for the first time in the High Court, Harry's counsel makes a request that the case be listed in such a way as to maintain Harry's anonymity. He argues that Harry's right to a good name would be infringed if false accusations were to be made against him in court, and reported by the press. Counsel for the employer, mindful of the risk of bad publicity for the firm, agrees that this would be the best course of action. The High Court judge orders that the matter be listed as X. V Y. Ltd. He also makes an order that the identity of the parties not be revealed by any reports of the hearing. He makes it clear, however, that the media are entitled to report the details of the action in full, provided the anonymity of the parties is preserved. The Daily Bulge asks you to advise them on the likelihood of a successful appeal under Irish constitutional law.",
      },
      {
        examType: 'Essay',
        description:
          '"Article 26 is a flawed procedure for testing constitutionality of proposed legislation which should be removed from…',
        text: '"Article 26 is a flawed procedure for testing constitutionality of proposed legislation which should be removed from the Constitution at the earliest opportunity". Discuss.',
      },
      {
        examType: 'Essay',
        description:
          '"The right to a good name has been the engine which has driven the development of the right to fair procedures under…',
        text: '"The right to a good name has been the engine which has driven the development of the right to fair procedures under the Irish Constitution." Discuss.',
      },
      {
        examType: 'Essay',
        description: 'The Oireachtas enacts the Preservation of Wildlife Act 2009.',
        text: 'The Oireachtas enacts the Preservation of Wildlife Act 2009. The aim of this legislation is to create \'Wildlife Protection Zones\' in which development will be restricted. Section 2 of the Act gives the Minister power to designate an area as a "Wildlife Protection Zone" if he "is of the view that it would be appropriate to so designate it". Section 3 gives the Minister the power to "impose such terms and conditions on actions undertaken within the zone as may appear necessary to achieve the purposes of the Act." Caoimhe owns a small farm in an area which the Minister designates as a Wildlife Protection Zone. The farm has been in her family for four generations. Under the terms of the designation, it is ordered by the Minister that all forms of farming must cease, and that fields must be allowed to return to their natural state. Caoimhe had recently spent €50,000 in upgrading the drainage of the farm. She is now unable to make a profit from the land. The State offers to buy the farm from her but will only pay the value of what it is worth now, rather than the value which the farm had before the creating of the Wildlife Protection Zone. Caoimhe asks your advice as to whether there are any grounds under Irish constitutional law upon which she could challenge the Minster\'s action.',
      },
      {
        examType: 'Problem',
        description:
          'Arthur wishes to apply for a late licence for his pub. Advise him if there are any grounds upon which he might…',
        text: 'Arthur wishes to apply for a late licence for his pub. The law at present is governed by the Licensing of Alcohol Act 1967, which allows pubs to remain open until 5am where permission for that has been granted by the District Court. Before an application for permission is made to the District Court, the applicant must have given six weeks public notice of the proposed application. Arthur places an ad in the local newspaper advertising his intention to apply for a licence. When five weeks have passed, the Oireachtas enacts the Licensing of Alcohol (Amendment) Act 2009. This prohibits the opening of pubs after 11pm. Section 6 of the Act contains an exemption for pubs which previously held licences allowing for longer opening hours. These pubs are entitled to retain these licences on an ongoing basis, provided they apply for renewal every 5 years. The Act takes effect immediately which means that Arthur is unable to apply to the District Court for permission to remain open until 5am. You are asked to advise him if there are any grounds upon which he might challenge this measure.',
      },
      {
        examType: 'Problem',
        description: 'Eithne is a widowed mother of seven children. Constitutional.',
        text: "Eithne is a widowed mother of seven children. She is not in full-time employment and has applied to her local authority for housing for her family. She is particularly hopeful as she knows that a four-bedroom unit has recently become available in her neighbourhood. The local council apply a policy in accordance with which preference for housing is given to married couples with children. The council decide to allocate the house which Eithne wanted to a couple who are married and who have a 16 year old son. Eithne is very upset by this. She wants to know if the council's decision can be challenged under Irish constitutional law. Advise her. October 2009",
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2010,
    questions: [
      {
        examType: 'Problem',
        description:
          'Trevor is a devout practising member of the Church of the Holy Tablet. Constitutional.',
        text: 'Trevor is a devout practising member of the Church of the Holy Tablet. This Church teaches its members that it is an obligation of their faith to convert others. Trevor is a firm believer in the importance of this obligation. He believes that the Church of the Holy Tablet is the only true religion and that the lives of non-believers would be greatly improved if they joined the Church. To that end, he begins demonstrating outside other local churches and places of worship. He brings a loudhailer, which he uses to address people who are attending the religious ceremonies there. Some people complain that they can hear the loudhailer in the distance during the religious ceremony and that they find this disruptive. Trevor also brings a number of placards with him. These carry slogans like "This God is a false God", "Evil lives here" and "The Devil hordes of this Church must be destroyed". Trevor is arrested by the Gardaí and is charged with the offence of undermining religious worship. This offence was created under section 12 of the Defence of Religious Practice Act 2010 and criminalises "any act which would tend to interfere with the free practice of religious faith". You have been asked to advise Trevor if there are any grounds of Irish constitutional law upon which he can challenge this prosecution.',
      },
      {
        examType: 'Essay',
        description: '"The presumption of constitutionality should be abolished.',
        text: '"The presumption of constitutionality should be abolished. By assuming the presence of a fictional intention where none usually exists, the presumption shows too much deference to the Oireachtas and makes it too difficult for individuals to successfully challenge unconstitutional legislative acts". Do you agree with this statement? Discuss.',
      },
      {
        examType: 'Problem',
        description:
          'Simon is a fisherman with 25 years experience in the industry. Constitutional, Regulation.',
        text: 'Simon is a fisherman with 25 years experience in the industry. He currently owns two trawlers which he operates out of Killybegs, Co. Donegal. The two trawlers are worth approximately €850,000. In response to concerns over declining fish stocks, the Oireachtas passes Regulation of Fishing Act 2010. Section 3 of the Act vests a power in the Minister for Fisheries to "limit the practice of fishing, or any other activity likely to adversely affect fish stocks, for such period and on such terms and conditions as he deems necessary to preserve such stocks". The Minister introduces a 7-year ban on any form of fishing in Ireland\'s portion of the Atlantic Ocean. This is the area in which Simon has always fished. His view is that it is uneconomic for him to fish anywhere else as the costs involved in travelling to other areas from Killybegs is too high. You are asked to advise Simon, by reference to Irish constitutional law, if there are any grounds upon which he could challenge this measure.',
      },
      {
        examType: 'Essay',
        description:
          '"The separation of powers theory is an unhelpful constitutional doctrine which ought to be abandoned.',
        text: '"The separation of powers theory is an unhelpful constitutional doctrine which ought to be abandoned. Although it was adopted as a way of protecting individuals against tyranny and the abuse of government power, it is commonly used today as a weapon in a turf war between different organs of government. When dealing with the separation of powers, courts examine only the rights of the organs of State and never consider how the rights of individuals are affected." Do you agree? Discuss this statement with reference to relevant decisions of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          'Write a short casenote on any two of the following four cases, explaining, in your view, their importance to the…',
        text: 'Write a short casenote on any two of the following four cases, explaining, in your view, their importance to the subsequent development of Irish constitutional law. (i) Ryan v Attorney General [1965] IR 294 (ii) State (Nicoloau) v An Bord Uchtála [1966] IR 567 (iii) Re Haughey [1971] IR 217 (iv) Re Article 26 and the Health (Amendment) (no. 2) Bill 2004 [2005] 1 IR 105',
      },
      {
        examType: 'Problem',
        description:
          'In response to an increase in the number of murders carried out by rival… Constitutional, Murder.',
        text: 'In response to an increase in the number of murders carried out by rival criminal gangs, the Oireachtas introduces the War on Drug and Crime Act 2010. The Oireachtas also passes a resolution affirming its view that the vital interests of the State are threatened by the existence of an armed conflict between criminal groups and by the ongoing sale of drugs in Ireland. The Act vests considerable powers in the Minister for Justice, including the power under section 7 to identify and detain "individuals suspected of activities which might tend to undermine the authority of the State". Section 7 (2) also clarifies that this suspicion might be based on activities undertaken prior to the passing of the Act. These individuals may ultimately be subject to trial by military tribunal where they will be liable to penalties up to and including a minimum 30-year life sentence. Patrick is a drug dealer whose primary activity involves the sale of marijuana to school children and college students. He has never been involved in any form of violence. He is detained by order of the Minister and is taken to an internment facility where he and other individuals detained under the Act are held. No date as yet has been set for any trial. Patrick asks you if there are any grounds upon which he can challenge the constitutionality of his detention, or of the Act itself. Please advise him.',
      },
      {
        examType: 'Problem',
        description: 'She has decided to plead not guilty. Constitutional.',
        text: "Laura is charged with theft. She has decided to plead not guilty. The prosecution case is that Laura, along with persons unknown, used a JCB to steal an ATM. The JCB was recovered after the theft but the money has never been found. The incident in question occurred on November 9th, 2000. The case was referred to the DPP on June 10th, 2001. A decision to prosecute was taken on 1st September of that year. Through inadvertence, no further steps are taken until 7th January 2009 when Laura is finally charged. On January 8th, 2009, Laura's solicitor asks for access to the JCB for the purpose of seeking forensic evidence which would show that Laura had not been a passenger in the JCB. The Gardaí inform the solicitors that they released the JCB to its owner 24 hours after recovering it on November 10th, 2000. Laura is also concerned about the media coverage of her case. She was formerly a contestant in a reality television show. She was very unpopular throughout her time on the show and was shown on several occasions to be willing to lie and cheat to get her way. It has always been her view that this was the result of unfair editing by the producers. She is now concerned however about media attention before her trial and about the fact that many members of the public will have a pre-conceived view of her as dishonest. Laura wishes to know if there are any grounds upon which she might prevent her trial going ahead. Advise her by reference to Irish constitutional law.",
      },
      {
        examType: 'Essay',
        description:
          '"When viewed in comparison with the potential remedy of having a law declared unconstitutional under Article 34.3.2 of…',
        text: '"When viewed in comparison with the potential remedy of having a law declared unconstitutional under Article 34.3.2 of the Constitution, a declaration of incompatibility under s.5 of the European Convention on Human Rights Act 2003 ("the 2003 Act") is an unattractive remedy for any litigant. For this reason, the 2003 Act is unlikely to have any real impact as litigants will invariably rely on the Constitution as the primary mechanism for protecting their rights." Do you agree with this statement? Discuss.',
      },
      {
        examType: 'Essay',
        description:
          '"The decisions of the Irish courts demonstrate that the theory of the separation of powers is an imprecise,…',
        text: '"The decisions of the Irish courts demonstrate that the theory of the separation of powers is an imprecise, indeterminate and outdated doctrine that has little useful application to the way in which modern government operates". Do you agree? Discuss.',
      },
      {
        examType: 'Essay',
        description:
          'Write a short note on [TWO]{.underline} of the following four decisions of the Irish courts.',
        text: "Write a short note on [TWO]{.underline} of the following four decisions of the Irish courts. Explain, [in particular]{.underline}, the influence which the decision had on the development of Irish constitutional law. i. McDonald v Bord na gCon (No. 2) [1965] IR 217 ii. O'G v Attorney General [1985] ILRM 61 iii. Kennedy v Ireland [1987] IR 587 iv. Re Article 26 and the Abortion Information Bill [1995] 1 IR 1",
      },
      {
        examType: 'Essay',
        description:
          '"The protections for judicial independence provided by Articles 35 and 36 are critically important to the functioning…',
        text: '"The protections for judicial independence provided by Articles 35 and 36 are critically important to the functioning of democratic government in Ireland". Do you agree? Discuss.',
      },
      {
        examType: 'Problem',
        description:
          'John has been charged with an offence under s.10 of the Waste and… Constitutional.',
        text: "John has been charged with an offence under s.10 of the Waste and Pollution Act 2009 which provides simply that: \"It shall be an offence to fail to prevent leakages from septic tanks\". Under section 20 of the same Act, the offence carries a potential fine of 25,000 Euro or six years imprisonment or both. The offence relates to a leakage from the septic tank in John's back garden. A neighbour noticed a smell coming from the back garden in the first week of May 2010 and complained to the Gardai. When they called out to John's house to investigate, John's neighbour intercepted them in the street. He told them that John was away on holidays and would not be back for a few weeks. The Gardai agreed that the smell was awful and decided to inspect the tank immediately. They gained access to John's back garden by climbing over the fence separating John's garden from that of his neighbour. They discovered that the tank was leaking badly through a crack in the bottom of the tank which was only visible using a flashlight. When John returned from holidays, on 20th May, he was charged with breaching section 10 of the Waste and Pollution Act 2009. He was angry when he discovered that the Gardai had made no effort to contact him before entering his back garden. He was also surprised that he could be charged with an offence for what appears to be a manufacturing defect in the tank of which he was not aware. Advise John as to whether there is any basis in Irish constitutional law upon which he may challenge or prevent his prosecution.",
      },
      {
        examType: 'Problem',
        description:
          "The Association for the Improvement of Dad's Entitlements (AIDE) campaigns… Constitutional.",
        text: 'The Association for the Improvement of Dad\'s Entitlements (AIDE) campaigns for better protection of fathers\' rights under Irish law. One of the key elements of the mission statement posted on their website is to "get better guardianship rights for Dads". This mission statement is only available on their website but is regularly referred to by AIDE spokespersons. The Oireachtas enacts the Committed Couples with Children Act 2010. This allows same-sex couples who have entered into civil partnerships to obtain guardianship rights in respect of a child in their care that are equivalent to those of a married couple. These rights are automatically obtained once the couple enter their details onto the Register of Committed Couples with Children. AIDE object to the fact that this Act applies only to same-sex couples. They argue that these rights should also be available to both natural fathers and to opposite-sex couples who have entered into civil partnerships. AIDE seek your advice. They want to know whether they may challenge the Act on constitutional grounds. They also want to know whether a successful challenge would help them to achieve their objectives. Advise AIDE.',
      },
      {
        examType: 'Essay',
        description:
          '"Article 45 of the Irish Constitution was a pointless exercise in political rhetoric which has had little or no…',
        text: '"Article 45 of the Irish Constitution was a pointless exercise in political rhetoric which has had little or no positive impact on the protection of individual rights in Ireland and may, in fact, have negatively influenced the way the courts approach the protection of the rights found in that Article." Discuss this statement with reference to caselaw, as appropriate.',
      },
      {
        examType: 'Problem',
        description:
          'Barry has operated a mobile fast-food van for 20 years. Constitutional, Regulation.',
        text: 'Barry has operated a mobile fast-food van for 20 years. He is famous for his battered mackerel burgers and makes most of his profits from the sale of these burgers. The Oireachtas enacts the Regulation of Food Vendors Act 2010. The long title of the Act states that it is "An Act to provide for better standards in the food vending industry and to provide for an organised and ongoing system of regulation of that industry". Section 5 of this Act provides that "The owner or operator of any place where food is sold must be registered with the Regulator of Food Vendors". Section 6 provides that "An owner or operator may only be registered in respect of one location". To register with the Regulator of Food Vendors, an owner or operator must certify that they meet certain minimum standards of hygiene, health and safety and customer service. They must also pay a one-off registration charge of €5,000 as well as an annual levy to the Food Industry Fund to cover the Regulator\'s cost of operation. Under section 17 of the Act, this levy is to be determined by the Regulator "in a manner that he deems most appropriate to secure the operation of his office and to ensure consistency and certainty of costs for owners and operators". The Regulator announces that the levy will be based on the 2009 profits of each registered owner or operator. He also announces that, for reasons of consistency and certainty, the levy will remain the same for each owner or operator for the next 10 years. Barry is very unhappy about the new Act. He objects to the requirement to pay the registration charge and to commit himself to a single place of business. He is also concerned about the impact of the levy on his business in the future. In particular, he is concerned about a recent report which suggested that battered mackerel burgers could quadruple a person\'s chance of a heart attack. This report received a lot of publicity and Barry\'s 2010 sales and profits are so far down 95% compared to the same time last year. Advise Barry whether there are any grounds of Irish constitutional law upon which he could challenge the new Act and/or the actions of the Regulator.',
      },
      {
        examType: 'Essay',
        description:
          '"As a figure who is close to the operation of Government but independent of it, the Attorney General occupies a curious…',
        text: '"As a figure who is close to the operation of Government but independent of it, the Attorney General occupies a curious but constitutionally vital role in Ireland\'s system of government." Discuss.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2011,
    questions: [
      {
        examType: 'Essay',
        description:
          '"The protection provided by the Constitution for freedom of association and freedom of assembly is inadequate." Discuss…',
        text: '"The protection provided by the Constitution for freedom of association and freedom of assembly is inadequate." Discuss with reference to the decisions of the Irish courts on this issue.',
      },
      {
        examType: 'Problem',
        description:
          'Joanna is a sheep farmer who owns a small plot of land in Kerry. Consideration, Constitutional.',
        text: "Joanna is a sheep farmer who owns a small plot of land in Kerry. Kerry County Council decide to build a large waste management facility in Joanna's area. The facility will provide a single location for waste disposal in the Munster area. This means that it will operate on a very large scale and will involve a number of waste management techniques, including incineration, landfill and recycling. Kerry County Council have applied to the Environmental Licensing Agency for a waste management facility permit. Interested parties are invited as part of the application process to submit their views and/or to appear before the Agency to put their case. Under the Waste Management Act 2011, holders of a waste management facility permit are entitled to compulsory purchase land and to extinguish rights of way. Joanna is concerned that the plans for the facility indicate that part of it will be built on her land. Joanna is also concerned about the effect which the facility will have on her business. It is well-known within the sheep farming trade that supermarkets will not buy sheep or lambs from farms that are so close to incinerators or landfill sites. Joanna wishes to make a submission to the Agency as part of its consideration of the application process. She applies to the State for legal aid and/or financial assistance to cover the costs of her application. She indicates that, because of her lack of experience or expertise in the area, she does not feel she will be able to take part without some sort of legal or other expert assistance. Her application is declined. You have been asked to advise Joanna as to whether there are any grounds upon which she might be able to bring a constitutional challenge which would stop the application process. Advise her.",
      },
      {
        examType: 'Essay',
        description:
          '"The unenumerated rights doctrine was an unfortunate development in Irish constitutional law.',
        text: '"The unenumerated rights doctrine was an unfortunate development in Irish constitutional law. It encourages uncertainty and excessive judicial subjectivity and should be abolished by the courts at the earliest opportunity." Do you agree? Discuss.',
      },
      {
        examType: 'Essay',
        description:
          '"Article 41 and 42 are the product of an outdated and conservative philosophy which strike an inappropriate balance…',
        text: '"Article 41 and 42 are the product of an outdated and conservative philosophy which strike an inappropriate balance between the rights and interests of parents, children and of the State." Do you agree with this statement? Provide reasons for your answer. You should refer, where appropriate, to relevant decisions of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'Paul has been charged with "reckless and fraudulent trading" under the… Advise Paul in relation to both of these issues.',
        text: 'Paul has been charged with "reckless and fraudulent trading" under the Corporate Crime Act 2011. His arrest occurred after a television documentary was broadcast in December 2010 in which a former partner in his stockbroking firm accused him of "gambling pensioners\' money on crazy stocks and shares". Paul has pleaded not guilty to the charge. He is apprehensive that the media attention might influence potential jurors at his trial which is due to take place in July 2011. He wants to know if he might have his trial stopped on that basis. Failing that, he also seeks your advice in respect of another issue. Paul\'s family have suffered from the media attention -- particularly his two young children who have been bullied at school. He wants to know if, in the event that his trial goes ahead, the court might restrict press coverage of the trial i.e. by not using his real name -- so as to protect his family from further distress. Advise Paul in relation to both of these issues.',
      },
      {
        examType: 'Essay',
        description:
          '"The decision in Cahill v Sutton undermines the court\'s ability to meet its obligation to defend and uphold the…',
        text: '"The decision in Cahill v Sutton undermines the court\'s ability to meet its obligation to defend and uphold the Constitution by making it less likely that the unconstitutional treatment of vulnerable groups -- such as the poor, the young or the ill-informed -- will come to the attention of the judiciary." Do you agree? Do the Irish courts have any means of taking account of the position or interests of such groups in constitutional litigation? Discuss with reference to the caselaw of the Irish courts.',
      },
      {
        examType: 'Problem',
        description: 'The Oireachtas enacts the Negative Equity Rescue Act 2011. Constitutional.',
        text: 'The Oireachtas enacts the Negative Equity Rescue Act 2011. The Long Title of the Bill states that it purpose is "To protect the position of people in negative equity and to ensure that they continue to be able to contribute to Ireland\'s economic recovery". The Act establishes what is described as a "negative equity restoration scheme". Section 4 of the Act allows individuals who purchased property between 2004 and 2009 to apply to the Equity Adjustment Board for an "equity adjustment offer". This allows the Equity Adjustment Board to make an order compelling the original vendor of the property to return a portion of the original purchase price to the purchaser. The size of the payment is to be determined by the Board, "having due regard to the rights and interests of both parties". Section 17 of the Act also provides that the payment cannot exceed the negative equity on the property at the date of the application. In announcing the scheme, the Minister states that the aim of the scheme is "to re-balance the scales between the winners and losers from Ireland\'s property bubble so that those who made the most money can help out those that lost the most". Section 12 of the Act also provides that owners of property purchased between 2004 and 2009 will be exempt from paying tax on any rental income from those properties. Martin is a successful property investor who sold many properties in Ireland over the last 10 years. He is worried that some of those he sold properties to will apply for an "equity adjustment order" against him. All of the property that Martin currently owns was bought in 2010. He is annoyed that this means he will be unable to benefit from section 4 or section 12. You have been asked to advise Martin: (a) Whether there are any grounds upon which the Act might be challenged under Irish constitutional law. (b) Whether any legal action is likely to result in him obtaining the benefit of either section 4 or section 12.',
      },
      {
        examType: 'Essay',
        description:
          'The Oireachtas passes the Increase in State Income Act 2011 as part of its package of measures to address the financial…',
        text: 'The Oireachtas passes the Increase in State Income Act 2011 as part of its package of measures to address the financial problems affecting the economy. The Act comes into force on April 1st, 2011. Section 2 of the Act creates a new tort of "wilfully causing economic damage". This tort applies to "any conduct which may foreseeably result in significant damage to the Irish economy". Section 2(5) provides that the tort applies to conduct committed "on or after June 30th, 2005", provided that "the conduct in question demonstrated a reckless disregard for the Irish economy". Section 4 of the Act imposes a 20% windfall tax on profits made from the sale of rezoned agricultural land between the years 2000 and 2010. Section 5 of the Act imposes a €5,000 levy on the ownership of SUVs. This levy is payable immediately upon the coming into force of the Act. You have been asked by the Irish Association of Investors to consider whether the Act, or any part of the Act, might be capable of being challenged on constitutional grounds. March 2011',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2012,
    questions: [
      {
        examType: 'Essay',
        description:
          'Write a short note on [TWO]{.underline} of the following four decisions of the Irish courts.',
        text: 'Write a short note on [TWO]{.underline} of the following four decisions of the Irish courts. Explain. [In particular]{.underline}, the influence which the decision had or may have on the development of Irish constitutional law. (i) John Grace Fried Chicken Ltd v. Catering JLC & Ors [2011] IEHC 277. (ii) Byrne v. Ireland [1972] IR241. (iii) A.G. v. X. [1992]1 I.R. 1. (iv) Corway v. Independent Newspapers [1999] 4 I.R. 484',
      },
      {
        examType: 'Problem',
        description: 'Paul was seriously injured in a road traffic accident. Injunction.',
        text: "Paul was seriously injured in a road traffic accident. He was taken to hospital where he showed initial signs of life. However, these symptoms came to an end after a few weeks. Since then, he has been in a medically induced coma for 18 months with very few signs of brain activity. His family disagree about the approach to be taken to his care. His wife Mary insists that he had told her he never wanted to be on a life support machine and that it would be his wish to have the machine turned off. She has asked the hospital to give him a cocktail of drugs which would ensure that he has a painless death. His mother and father oppose this course of action and are of the view that he may recover with time. Doctors have estimated that his chances of recovery are approximately 0.5%. His mother and father want to obtain an injunction preventing the hospital taking any steps to end Paul's life on the basis of Mary's instructions. They have asked you for advice about the attitude an Irish court might take to such an application. Advise them.",
      },
      {
        examType: 'Problem',
        description:
          'Gregory is a journalist working for the Daily Recorder newspaper. Constitutional.',
        text: 'Gregory is a journalist working for the Daily Recorder newspaper. One day, he receives an envelope in the post containing copies of a plan by the military to overthrow the Irish government and establish martial law. There is no indication of who sent Gregory the material except for the postmark which records that it was posted in Dundalk the previous day. Following a publication of a story about the attempted coup, the Minister for Defence launches an inquiry into the possibility that members of the army have been plotting to overthrow the government. The inquiry is to be headed by a High Court judge and will have "such powers as are vested in the High Court concerning the calling of witnesses and evidence". The inquiry asks Gregory to answer questions concerning his knowledge of the plans. Gregory refused on the grounds that this could lead to the identification of his sources. The judge heading the inquiry rules that Gregory can be compelled to answer questions on the basis that: (i) The military plot threatened public order and the security of the State and this is a legitimate basis to make an order compelling Gregory to answer questions asked. (ii) Gregory had referred to his article to the circumstances in which he came into possession of material and so waived any privilege he may have had. (iii) If the circumstances referred to in the article are those which Gregory would refer to under oath, then the material disclosed would not lead to the identification of the individual or individuals who supplied Gregory with the material. Gregory wishes to appeal this ruling to the High Court, as is provided for by the statue governing the inquiry. He has asked for your advice as to whether there are any grounds of Irish constitutional law which he might rely on in his appeal. Advise Gregory',
      },
      {
        examType: 'Problem',
        description:
          'Following a terrorist attack in Kilkenny in March 2012, the government… Constitutional, Fundamental Rights.',
        text: 'Following a terrorist attack in Kilkenny in March 2012, the government announce a plan to suspend the fundamental rights provisions of the Constitution and to establish a Military Council with the power to order the imprisonment or execution of any person suspected of terrorist sympathies. Following legal advice, the government indicate that they plan to introduce this scheme by way of a constitutional amendment. They announce that the referendum will be held in June 2012 but do not specify the exact date. They also repeal the Referendum Acts and abolish the Referendum Commission. In April and May, the government append a significant amount of public money on an advertising campaign in support of a Military Council. Advertising warns of the "terrorists all around us" and call upon citizens to "Protect Ireland. Protect yourself. Support the Military Council". On May 31st, the government announce that the referendum will be held on June 3rd. They announce that they will prohibit all advertising on the referendum proposal after May 31st (including their own) "in the interest of equality and fairness". A group of concerned citizens wish to prevent the holding of the referendum. They have asked you for advice on: (a) Whether the courts are able or likely to interfere with the holding of a referendum; [And]{.underline} (b) Whether there are any grounds of Irish constitutional law upon which they might be able to challenge the government\'s behaviour. Advise them, making sure to refer in your advice to both issues.',
      },
      {
        examType: 'Essay',
        description:
          '"Despite the courts\' repeated reliance on the principle, the separation of powers theory suffers from a number of…',
        text: '"Despite the courts\' repeated reliance on the principle, the separation of powers theory suffers from a number of serious problems which have had a detrimental impact on the integrity of Irish Constitutional law". Do you agree? You should support your answer with references to specific decisions of the Irish courts.',
      },
      {
        examType: 'Essay',
        description: '"The recognition of \'the individual personality of the citizen ...',
        text: "\"The recognition of 'the individual personality of the citizen ... as a vital human component of the social, political and moral order posited by the Constitution' (per Henchy J., Norris v. A.G [1984]1 I.R.36, at 71) has been the driving force for the courts' approach to fundamental rights protection since the 1960's\". Do you agree? Discuss with reference to specific decisions of the Irish courts.",
      },
      {
        examType: 'Essay',
        description:
          'The Minister for Justice is concerned about the damaging impact which the effect of a finding of unconstitutionally can…',
        text: 'The Minister for Justice is concerned about the damaging impact which the effect of a finding of unconstitutionally can have upon the efficiency of government. She is particularly concerned about the situation where the courts declare an Act to be unconstitutional. She has asked you to prepare a report which will consider the following issues: (i) The consequences under Irish constitutional law of the finding that an Act is unconstitutional for the persons who have brought the legal challenge. (ii) The consequences under Irish constitutional law of the finding that an Act is unconstitutional for other persons who may have been affected in the past by the Act. (iii) The circumstances, if any, where the courts may decline to make an order that an Act must be invalidated immediately. (iv) Whether there are any alternative remedies which it might be advisable to introduce. Provide a summary of your findings on each of these points.',
      },
      {
        examType: 'Problem',
        description:
          'Sarah and Róisín have been in a long term relationship for 8 years. Constitutional.',
        text: 'Sarah and Róisín have been in a long term relationship for 8 years. Sarah has four children from a previous relationship. Róisín has no legal relationship with the children but is heavily involved in their care. Both Sarah and Róisín have recently lost their jobs. They have applied for local authority housing as a co-habiting couple with four children. They are particularly hopeful as they know that a four-bedroom unit has recently become available in their neighbourhood. The local council apply a policy in accordance with which preference for housing is given to married couples with children. Because Róisín has no legal relationship with the children, Sarah is treated by the council as a single parent with four children. The council decide to allocate the house which Sarah and Róisín wanted to a couple who are married and who have a 16 year old son. Sarah and Róisín are very upset by this. They want to know if there are any grounds of Irish constitutional law upon which the decision could be challenged. Advise them.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2012,
    questions: [
      {
        examType: 'Essay',
        description:
          'Write a short note on [TWO]{.underline} of the following four decisions of the Irish courts.',
        text: 'Write a short note on [TWO]{.underline} of the following four decisions of the Irish courts. Explain. [In particular]{.underline}, the influence which the decision had or may have on the development of Irish constitutional law. (i) John Grace Fried Chicken Ltd v. Catering JLC & Ors [2011] IEHC 277. (ii) Byrne v. Ireland [1972] IR241. (iii) A.G. v. X. [1992]1 I.R. 1. (iv) Corway v. Independent Newspapers [1999] 4 I.R. 484',
      },
      {
        examType: 'Problem',
        description: 'Paul was seriously injured in a road traffic accident. Injunction.',
        text: "Paul was seriously injured in a road traffic accident. He was taken to hospital where he showed initial signs of life. However, these symptoms came to an end after a few weeks. Since then, he has been in a medically induced coma for 18 months with very few signs of brain activity. His family disagree about the approach to be taken to his care. His wife Mary insists that he had told her he never wanted to be on a life support machine and that it would be his wish to have the machine turned off. She has asked the hospital to give him a cocktail of drugs which would ensure that he has a painless death. His mother and father oppose this course of action and are of the view that he may recover with time. Doctors have estimated that his chances of recovery are approximately 0.5%. His mother and father want to obtain an injunction preventing the hospital taking any steps to end Paul's life on the basis of Mary's instructions. They have asked you for advice about the attitude an Irish court might take to such an application. Advise them.",
      },
      {
        examType: 'Problem',
        description:
          'Gregory is a journalist working for the Daily Recorder newspaper. Constitutional.',
        text: 'Gregory is a journalist working for the Daily Recorder newspaper. One day, he receives an envelope in the post containing copies of a plan by the military to overthrow the Irish government and establish martial law. There is no indication of who sent Gregory the material except for the postmark which records that it was posted in Dundalk the previous day. Following a publication of a story about the attempted coup, the Minister for Defence launches an inquiry into the possibility that members of the army have been plotting to overthrow the government. The inquiry is to be headed by a High Court judge and will have "such powers as are vested in the High Court concerning the calling of witnesses and evidence". The inquiry asks Gregory to answer questions concerning his knowledge of the plans. Gregory refused on the grounds that this could lead to the identification of his sources. The judge heading the inquiry rules that Gregory can be compelled to answer questions on the basis that: (i) The military plot threatened public order and the security of the State and this is a legitimate basis to make an order compelling Gregory to answer questions asked. (ii) Gregory had referred to his article to the circumstances in which he came into possession of material and so waived any privilege he may have had. (iii) If the circumstances referred to in the article are those which Gregory would refer to under oath, then the material disclosed would not lead to the identification of the individual or individuals who supplied Gregory with the material. Gregory wishes to appeal this ruling to the High Court, as is provided for by the statue governing the inquiry. He has asked for your advice as to whether there are any grounds of Irish constitutional law which he might rely on in his appeal. Advise Gregory',
      },
      {
        examType: 'Problem',
        description:
          'Following a terrorist attack in Kilkenny in March 2012, the government… Constitutional, Fundamental Rights.',
        text: 'Following a terrorist attack in Kilkenny in March 2012, the government announce a plan to suspend the fundamental rights provisions of the Constitution and to establish a Military Council with the power to order the imprisonment or execution of any person suspected of terrorist sympathies. Following legal advice, the government indicate that they plan to introduce this scheme by way of a constitutional amendment. They announce that the referendum will be held in June 2012 but do not specify the exact date. They also repeal the Referendum Acts and abolish the Referendum Commission. In April and May, the government append a significant amount of public money on an advertising campaign in support of a Military Council. Advertising warns of the "terrorists all around us" and call upon citizens to "Protect Ireland. Protect yourself. Support the Military Council". On May 31st, the government announce that the referendum will be held on June 3rd. They announce that they will prohibit all advertising on the referendum proposal after May 31st (including their own) "in the interest of equality and fairness". A group of concerned citizens wish to prevent the holding of the referendum. They have asked you for advice on: (a) Whether the courts are able or likely to interfere with the holding of a referendum; [And]{.underline} (b) Whether there are any grounds of Irish constitutional law upon which they might be able to challenge the government\'s behaviour. Advise them, making sure to refer in your advice to both issues.',
      },
      {
        examType: 'Essay',
        description:
          '"Despite the courts\' repeated reliance on the principle, the separation of powers theory suffers from a number of…',
        text: '"Despite the courts\' repeated reliance on the principle, the separation of powers theory suffers from a number of serious problems which have had a detrimental impact on the integrity of Irish Constitutional law". Do you agree? You should support your answer with references to specific decisions of the Irish courts.',
      },
      {
        examType: 'Essay',
        description: '"The recognition of \'the individual personality of the citizen ...',
        text: "\"The recognition of 'the individual personality of the citizen ... as a vital human component of the social, political and moral order posited by the Constitution' (per Henchy J., Norris v. A.G [1984]1 I.R.36, at 71) has been the driving force for the courts' approach to fundamental rights protection since the 1960's\". Do you agree? Discuss with reference to specific decisions of the Irish courts.",
      },
      {
        examType: 'Essay',
        description:
          'The Minister for Justice is concerned about the damaging impact which the effect of a finding of unconstitutionally can…',
        text: 'The Minister for Justice is concerned about the damaging impact which the effect of a finding of unconstitutionally can have upon the efficiency of government. She is particularly concerned about the situation where the courts declare an Act to be unconstitutional. She has asked you to prepare a report which will consider the following issues: (i) The consequences under Irish constitutional law of the finding that an Act is unconstitutional for the persons who have brought the legal challenge. (ii) The consequences under Irish constitutional law of the finding that an Act is unconstitutional for other persons who may have been affected in the past by the Act. (iii) The circumstances, if any, where the courts may decline to make an order that an Act must be invalidated immediately. (iv) Whether there are any alternative remedies which it might be advisable to introduce. Provide a summary of your findings on each of these points.',
      },
      {
        examType: 'Problem',
        description:
          'Sarah and Róisín have been in a long term relationship for 8 years. Constitutional.',
        text: 'Sarah and Róisín have been in a long term relationship for 8 years. Sarah has four children from a previous relationship. Róisín has no legal relationship with the children but is heavily involved in their care. Both Sarah and Róisín have recently lost their jobs. They have applied for local authority housing as a co-habiting couple with four children. They are particularly hopeful as they know that a four-bedroom unit has recently become available in their neighbourhood. The local council apply a policy in accordance with which preference for housing is given to married couples with children. Because Róisín has no legal relationship with the children, Sarah is treated by the council as a single parent with four children. The council decide to allocate the house which Sarah and Róisín wanted to a couple who are married and who have a 16 year old son. Sarah and Róisín are very upset by this. They want to know if there are any grounds of Irish constitutional law upon which the decision could be challenged. Advise them.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2013,
    questions: [
      {
        examType: 'Problem',
        description:
          'Brian is a member of the religious organisation, the United Apostles of… Constitutional, Company.',
        text: "Brian is a member of the religious organisation, the United Apostles of Abraham, which has a small presence in Ireland. One of the core beliefs of the group is that plants are sacred and should neither be eaten nor used in any form of economic activity. Brian is employed by a state-run company which is responsible for the production of electricity in Ireland. As part of the state's commitment to reducing carbon emissions, the Dáil passes the Biofuels Act 2013. This requires the addition of biofuel to all forms of fuel imported into Ireland so that each consists of at least 20% plant-based substances. Brian is extremely concerned by this development as it means that any use of vehicles or electricity is incompatible with his religious belief. Furthermore, when he informs his employer that he is unwilling to participate in any work connected with the production of electricity that may use biofuels, the employer's response is that this is impossible and that he will have to either perform his work as usual or leave his position. Brian asks for your advice as to whether there are any grounds of Irish constitutional law upon which he can oppose his removal from his position and challenge the Act. Advise him.",
      },
      {
        examType: 'Problem',
        description: 'Áine is accused of having assisted in an alleged sexual assault against a…',
        text: "Áine is accused of having assisted in an alleged sexual assault against a teenager in 1984. Following the making of the original allegation in 1990, the teenager's family left Ireland. At some point in the next 12 months, the file was lost by the investigating authorities. Nothing further happened with the investigation and Áine assumed that is had been closed. In 2011, the alleged victim returned to Ireland and made enquiries about what has happened with the investigation. It was discovered that it had never been completed so a new investigation was begun. The new investigating team decided to arrest Aine and to search her home. A search warrant was issued by the Superintendent who was in charge of the investigation. The warrant incorrectly referred to the house beside Áine's. The search of her home does not discover any evidence of value. Following her arrest and questioning, Áine is charged with conspiracy to commit a sexual assault. You have been asked to advise Áine: 1. Whether the investigation or prosecution interferes with any of her rights under the Constitution; 2. Whether any such interferences might be unlawful; [And]{.underline} 3. What remedy she might expect to obtain if a court agreed that the interference was unlawful.",
      },
      {
        examType: 'Essay',
        description:
          'Write a short note on [TWO]{.underline} of the following FOUR decisions, explaining their significance for Irish…',
        text: 'Write a short note on [TWO]{.underline} of the following FOUR decisions, explaining their significance for Irish constitutional law: 1. McKenna v. An Taoiseach (no. 2) [1995] 2 IR 10. 2. Doherty v. Referendum Commission [2012] IEHC 211. 3. McDonald v. Bord na gCon [1965] IR 217. 4. East Donegal Co-op v. A.G. [1970] IR 317.',
      },
      {
        examType: 'Essay',
        description: '"Both Clarke and Hardiman JJ have ...',
        text: "\"Both Clarke and Hardiman JJ have ... emphasised that the Constitution recognises the exclusive powers of the Legislative, Executive and Judicial branches, within their proper spheres. This is of course true. But it is perhaps noteworthy, as the late Professor Kelly was wont to observe, that the form of separation of powers adopted in the Irish Constitution was not the hermetically sealed branches of Government posited by Montesquieu, but rather involved points of intersection, interaction and occasional friction between the branches of Government so established\". (O'Donnell J., Pringle v. Ireland) What, in your view, is the significance of O'Donnell J.'s observation about the separation of powers under the Irish Constitution? Discuss with reference to the case-law of the Irish courts.",
      },
      {
        examType: 'Essay',
        description:
          '"The historical method of interpretation had limited value for constitutional law in Ireland given the Irish courts\'…',
        text: '"The historical method of interpretation had limited value for constitutional law in Ireland given the Irish courts\' belief in the notion of a living constitution." Do you agree? You should support your opinion with reference to relevant decisions of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          "Following a decline in sales, William's company is wound up. Injunction, Constitutional.",
        text: "Following a decline in sales, William's company is wound up. All of the employees are made redundant and given their minimum redundancy entitlements under employment law. The employees are dissatisfied as they believe that the assets of the company were sufficient to allow higher redundancy payments to be made. Their anger is increased when it is revealed that William paid himself a substantial bonus in the previous financial year and used it to buy a large house in the area. The former employees organise to hold an ongoing demonstration outside William's new house. The demonstration is peaceful and takes place on area of common ground across the road from the house. The former employees hold placards criticising 'FAT CAT CAPITALISM' and engage in regular chants about what they regard as the failures in Ireland's political and economic regime. William applies to court for an injunction to remove the employees on the basis that their presence is a breach of his rights under Article 40.5 of the Irish Constitution. You have been asked to advise the employees (i) whether William has any prospect of success [and]{.underline} (ii) if there are any grounds of Irish constitutional law that may assist them in resisting the application. Advise them.",
      },
      {
        examType: 'Essay',
        description:
          '"The right to fair procedures in non-criminal matters under Article 40.3.1 is amongst the most fundamental of all…',
        text: '"The right to fair procedures in non-criminal matters under Article 40.3.1 is amongst the most fundamental of all rights under the Constitution because of the way in which it has been broadly interpreted and applied by the Irish courts". Do you agree? Support your answer with reference to relevant cases.',
      },
      {
        examType: 'Problem',
        description:
          'Following reports in some newspapers of planned terrorist attacks against… Negligenc, Constitutional.',
        text: 'Following reports in some newspapers of planned terrorist attacks against Ireland, the Dáil enacts the Protection of Life and Liberty Act 2013. Section 3 vests the power in the Minister for Justice to "adopt any measures which he believes to be capable of assisting in the investigation or detection of criminal or other unlawful activity". In the exercise of this power, the Minister orders that CCTV cameras be installed on every street in any town with a population of more than 10,000 people. The cameras will be monitored at all times by members of An Garda Síochána. The footage from the cameras is also stored on a permanent basis on a website which is accessible to all citizens. John is being sued for negligence by his next door neighbour as a result of an incident in which the neighbour\'s dog drowned in the fish pond in his back garden. His neighbour has downloaded footage of the incident from the website and seeks to use it in the proceedings. John has consulted you for advice about whether there are any grounds of Irish constitutional law upon which he could challenge either the recording or the use of the footage. Advise him.',
      },
      {
        examType: 'Problem',
        description:
          'The courts have used a number of methods to interpret the Constitution. Constitutional.',
        text: 'The courts have used a number of methods to interpret the Constitution. Which, if any, is the preferable approach to the task of constitutional interpretation? Your answer should compare and contrast how different methods have been applied by the Irish courts in individual cases.',
      },
      {
        examType: 'Problem',
        description:
          'John is the sole owner of a large plot of agricultural land in the West of… Constitutional, Company.',
        text: "John is the sole owner of a large plot of agricultural land in the West of Ireland. He is elderly and in poor health and has not worked the land since 2001 when his nephew, who had been assisting him, emigrated. The government recently passed the Productive Land Use Act 2013 (\"the Act\"). The Act in its entirety was commenced on 30th August 2013. The Long Title to the Act provides that it is \"An Act to ensure that property in the State is used productively in the interests of the common good\". Section 1 of the Act provides for the establishment of a body called the Productive Land Use Agency (''the Agency''). The Agency was established on 2nd September 2013. The Agency is given a number of powers under the Act including the power to serve a Compulsory Acquisition Notice on property owners whose property is over a certain size threshold and who cannot demonstrate that they have made any productive use of the land over the last ten years. John's plot meets the size criteria and he is served with a Compulsory Acquisition Notice. The Notice, which was issued in accordance with the scheme set up under the Act on 30th August 2013, gives John two weeks to make submissions concerning his use of the land in the past 10 years, following which the Agency may proceed to acquire his property at a value to be assessed by an Independent Assessor appointed under the Act. Section 3 of the Act provides that the amount payable for agricultural land cannot be greater than the existing market value for land with that zoning. Under Section 4 of the Act, once a Compulsory Acquisition Notice is served, the landowner to whom it is addressed cannot sell or lease the property pending the withdrawal of the Notice (following submissions or otherwise) or its acquisition by the Agency. In the past week, John has been approached by a Chinese owned manufacturing company that is interested in buying property in the area and they have made an offer for the property which is far in excess of the value which it would attract under the Act. John never responded to the Compulsory Acquisition Notice within the two week time limit but he has since shown the letter to his niece, Sarah, who advised him to seek legal advice. Advise John on any constitutional issues which he may raise in order to preclude the acquisition of his property by the Agency.",
      },
      {
        examType: 'Essay',
        description:
          'The right to a jury trial in criminal matters is one of the features of the administration of justice at common law…',
        text: 'The right to a jury trial in criminal matters is one of the features of the administration of justice at common law that was reproduced in the 1937 Constitution. Describe and discuss critically the case law concerning jury trials under the 1937 Constitution.',
      },
      {
        examType: 'Problem',
        description:
          'Stephen is a member of an advocacy group called HELP which promotes… Advise Stephen.',
        text: "Stephen is a member of an advocacy group called HELP which promotes awareness of the human rights of habitual drug users and lobbies for the decriminalisation of drug use and better health care and rehabilitation facilities for drug users. HELP's current campaign is for the establishment of State funded needle exchange facilities in urban areas so as to reduce the risk of HIV and Hepatitis transfer between users of intravenous drugs. HELP has been lobbying a number of city councillors and TDs as part of this campaign but has not succeeded in garnering much support. Stephen has some experience in the field of advertising and he wants to provide his services to HELP to produce a television advertisement which would set out the benefits of a needle exchange programme. The advertisement he has in mind would include short extracts from interviews with users of intravenous drugs and health care professionals from jurisdictions which have such programmes in place. Stephen is surprised when his offer to produce the advertisement is rejected by HELP on the grounds that it cannot broadcast a political advertisement in the State under the existing law. Stephen has read Article 40 of the Constitution and is convinced that this must be a mistake as it guarantees freedom of expression. Alternatively, he wants to know whether the European Convention on Human Rights is of any assistance in this situation. Please advise Stephen.",
      },
      {
        examType: 'Essay',
        description: 'The judiciary are expected to be an independent source of justice.',
        text: 'The judiciary are expected to be an independent source of justice. There are, however, inevitably situations where a conflict of interest for members of the judiciary, or for the judiciary as a whole, might arise. Discuss, with examples from the case law, how judges have dealt with these issues where they have occurred.',
      },
      {
        examType: 'Problem',
        description:
          'Sam and James are a homosexual couple who have entered into a civil… Constitutional.',
        text: 'Sam and James are a homosexual couple who have entered into a civil partnership. They wish to adopt a child together but have been informed that they cannot do this and that only one of them can actually adopt the child but that the other can apply for guardianship rights. They have taken legal advice and are unhappy because they have been told that guardianship rights are not equal to parental rights. They have discussed this with some friends and have discovered that the same rule applies to unmarried heterosexual couples. They have come to you seeking advice on the constitutionality of the rule as it applies to them. Advise Sam and James.',
      },
      {
        examType: 'Essay',
        description:
          'The Irish Constitution protects a number of unenumerated rights including the right to privacy.',
        text: 'The Irish Constitution protects a number of unenumerated rights including the right to privacy. Discuss critically the development of the Irish case law which has interpreted this right since its initial recognition.',
      },
      {
        examType: 'Problem',
        description:
          'The government has recently announced that it will hold a referendum to… Consideration, Constitutional.',
        text: 'The government has recently announced that it will hold a referendum to repeal Article 26 of the Constitution in its entirety. A judge of the High Court, Fictitious J., has been appointed to chair the Referendum Commission which has been convened following the announcement of the referendum. A few weeks later, a journalist has uncovered an article which Fictitious J. published when he was a postgraduate law student in which he highlighted several flaws in the Article 26 procedure and questioned whether it should be retained in the Constitution. The same week, the Department of the Taoiseach has published and distributed a leaflet concerning the referendum proposal. It sets out several arguments why the Article 26 procedure is flawed including the limited time for consideration of the issues, the disadvantages of adducing a hypothetical fact scenario and the danger that a future litigant with a new and valid argument would be shut out from challenging legislation which has been subject to the procedure. These arguments are printed in bold type and take up 3 pages of the leaflet. The heading at the start of this text reads (in bold large capitals) "PROBLEMS WITH ARTICLE 26". Following on from these pages is a single page headed "SUPPOSED ADVANTAGES OF RETAINING ARTICLE 26". The text that follows under this heading comprises a single paragraph which states simply that "Article 26 has been in the Constitution since its promulgation in 1937 and some people think that it is a useful mechanism". Laura is a law student who believes passionately in the merits of the Article 26 procedure. She believes that the debate over the referendum has been one sided. She wants to know whether there are any constitutional arguments on the basis of the above facts which might assist her in restraining the government from holding the referendum. As the date of the referendum is very close, she also wants to know whether it might be possible to have the referendum result declared void by the courts after the event if she cannot get legal representation in time to stop the vote. Advise Laura.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2014,
    questions: [
      {
        examType: 'Essay',
        description:
          '"The jurisprudence of the Irish courts have confirmed that the guarantee of equality under Article 40.',
        text: '"The jurisprudence of the Irish courts have confirmed that the guarantee of equality under Article 40. 1 is ineffective and inadequate, and imposes little if any limitation on the ability of the Oireachtas to discriminate between different groups". Do you agree? In your answer, you should make reference to specific decisions of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'Gráinne is a widow with two children who has been told by a friend that… Consideration, Constitutional.',
        text: 'Gráinne is a widow with two children who has been told by a friend that she may be entitled to a widow support payment under the social welfare code. Section 103 of the Social Welfare Act 2014 states that "a support payment may be made, at the full discretion of the Minister for Social Protection, to any widow or widower with children who is unable to provide a reasonable standard of support for a child\'s education". Gráinne applies for this payment on the basis that she has substantial mortgage arrears and has little, if any, money left once payments on outstanding loans and food are made. Following her application, she receives a letter from the Department of Social Protection which states that "Following a consideration of your application, I regret to inform you that it is not possible to make a payment to you." Gráinne is confused as to why her application was refused and telephones the Department. She is told by an official within the Department that "the letter tells you everything you need to know". The official also points out that any payment is made at the full discretion of the Minister. Gráinne has asked for advice as to whether there are any grounds of Irish constitutional law upon which she might challenge the refusal. Advise her.',
      },
      {
        examType: 'Essay',
        description:
          '"The Presidency of Ireland is an office with significant constitutional prominence but no practical power." Do you…',
        text: '"The Presidency of Ireland is an office with significant constitutional prominence but no practical power." Do you agree? Support your argument, where appropriate, with reference to the relevant provisions of the Constitution and caselaw of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          'Write a short note on TWO of the following four decisions of the Irish courts.',
        text: 'Write a short note on TWO of the following four decisions of the Irish courts. Explain, in particular, the influence which the decision had on the development of Irish constitutional law. i. Mahon v Post Publications [2007] IESC 15. ii. Damache v DPP [2012] IESC 11 61. iii. Maguire v Ardagh [2002] 1 I.R. 385. iv. In the matter of Article 26 of the Constitution and in the matter of the v. Employment Equality Bill, 1996 [1997] 2 IR 321.',
      },
      {
        examType: 'Problem',
        description:
          'Section 4 of the Fair Elections Act 2014 introduces a ban on (i) corporate… Constitutional, Company.',
        text: 'Section 4 of the Fair Elections Act 2014 introduces a ban on (i) corporate political advertising and (ii) caps election expenditure for all candidates at €1,000. John is a local election candidate in Cork. He is standing for election for the first time. His mother is a successful business owner and is willing to provide substantial money from her company to fund his campaign and advertising for him. He objects to the new Act as he thinks he has no prospect of success without advertising because the local voters are more familiar with the incumbent candidates than with him. John and his mother ask you to advise them if there are any grounds under Irish constitutional law upon which they could challenge the Fair Elections Act 2014. Advise them.',
      },
      {
        examType: 'Essay',
        description: '"The decision of the Supreme Court in Pringle v.',
        text: '"The decision of the Supreme Court in Pringle v. Government of Ireland [2012] IESC 47 re­ interprets Crotty v. An Taoiseach in such a way as to bring about a fundamental change in the limits which Article 29 imposes on the executive power". Do you agree with this statement? Give reasons for your answer.',
      },
      {
        examType: 'Essay',
        description:
          '"As a figure who is close to the operation of Government but independent of it, the Attorney General occupies a curious…',
        text: '"As a figure who is close to the operation of Government but independent of it, the Attorney General occupies a curious but constitutionally vital role in Ireland\'s system of government." Discuss.',
      },
      {
        examType: 'Problem',
        description: 'The Oireachtas passes the Protection of Wages Act 2014. Constitutional.',
        text: 'The Oireachtas passes the Protection of Wages Act 2014. This Act allows an application to be made to the Labour Relations Commission to set wages for a specific industry if it is satisfied that this is "appropriate on the basis of the evidence before it in order to protect wages from undue reductions". An application may be made by any individual or group. If the Labour Relations Commission decides to set wages, any employee within the sector identified is entitled to request their employer to pay such wages. In the event that the employer refuses, the employee can apply to the Labour Relations Commission to enforce payment. An Order of the Labour Relations Commission must be laid before the Dáil and does not take effect until 21 days after that date. It can be annulled by the Dáil at any time within that 21 day period by a simple majority vote. William is an employer who is planning to reduce wages because of a downturn in his business and is concerned that this Act might prevent him doing so. He has asked your advice as to whether there are any grounds of Irish constitutional law which would allow him to challenge the Act. Advise William.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2015,
    questions: [
      {
        examType: 'Essay',
        description:
          '"The right to a fair and democratic referendum process is a right vested in the People as the ultimate ·guardians, of…',
        text: '"The right to a fair and democratic referendum process is a right vested in the People as the ultimate ·guardians, of the Constitution. Once the constitutional process of consulting the people by way of referendum has been initiated on the passing of an appropriate Bill, that right must be respected. Such a right means that the use of funds from the public purse to promote one side of the referendum campaign to the detriment of the others would be in breach of that constitutional right. {Murray J., McCrystal v Minister for Children [2012] IESC 53) What is the relationship between this principle and the entitlement of Ministers, as elected representatives of the People, to campaign in favour of a referendum? Do you support the current approach of the Supreme Court, as outlined in the McCrystal decision?',
      },
      {
        examType: 'Problem',
        description:
          'Allegations have been made that the Minister for Fishing has made a number… Advise them.',
        text: 'Allegations have been made that the Minister for Fishing has made a number of decisions to spend money on a marine project in Co. Carlow that may result in substantial financial benefits for her brother, who is a landowner in the area. The decision is announced after a meeting of the Cabinet on January 5th, 2015. The controversy increases when a spokesperson for her Department is unable to explain why Carlow was chosen for the projects when it does not have direct access to the sea. The Oireachtas establishes a Committee of Inquiry to examine the decision. The Committee orders the Minister and her Department to provide it with "all documents relating to the decision to construct a marine project in Co Carlow". The Minister refuses to provide the following documents on the grounds that this would contravene Article 28. 4. 3: i. A document setting out the Department\'s decision, and the reason for it, which was prepared for a meeting of the Cabinet on January 5th, 2015. ii. Various drafts of the document prepared for a meeting of the Cabinet on January 5th, 2015, some of which contain material which was removed from the final draft. iii. Internal Department e-mails prior to the decision being made which expressed different views about where the project should be constructed. iv. A document giving further background to the decision which was prepared for a meeting between the Minister and the Taoiseach on January 18th, 2015 to consider the public controversy. The Committee wants to confirm that Article 28.3.4 applies to this material and seeks your opinion. Advise them.',
      },
      {
        examType: 'Essay',
        description: '"Criticism of the unenumerated rights doctrine is simplistic and overstated.',
        text: '"Criticism of the unenumerated rights doctrine is simplistic and overstated. The doctrine is an innovative and flexible way of responding to changing social and political circumstances" Do you agree with this statement? Give reasons for your answer. In your answer, you should make reference to relevant decisions of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'Section 11 (a) of the Regulation of Medical Professionals Act 2015… Constitutional, Regulation.',
        text: 'Section 11 (a) of the Regulation of Medical Professionals Act 2015 prohibits the broadcast or display of any form of advertising by a medical professional to whom the Act applies, unless it has been approved by the Medical Council\'s Protection of Professional Reputation Board in advance. Following the commencement of the Act, the Board issues guidelines as to the kind of advertisements which, in its view; ring the reputation of the medical profession into disrepute. These include any advertisement which refers, by name or implication, to another medical professional. John is a recently qualified doctor who has set his own private practice. He pays for an advertisement in his lo°t11 newspaper which statesthat his practice is "the cheapest in town" as well as "the only one that has never been sued". Following complaints from other practices in the area, the Board directs John to cease the publication immediately. John is reluctant to do so and wants advice as to whether he can oppose the direction on any grounds of Irish constitutional law. Advise John.',
      },
      {
        examType: 'Problem',
        description:
          'Patricia is charged with manslaughter following a road traffic accident in… Constitutional, Manslaughter.',
        text: "Patricia is charged with manslaughter following a road traffic accident in which two children died. Patricia was driving one of the cars and was, at the time, over the legal alcohol limit. The accident attracted a lot of publicity with Patricia being described in one headline as an 'alcoholic child killer'. Two months before her trial is due to commence, a newspaper carries an extensive interview with one of the parents of the children. The interview describes the details of the accident but does not name Patricia. In the course of the interview, the parent states that 'the woman whose fault this was ... they should throw away the key'. At the start of her trial, Patricia's barrister applies for an order prohibiting the prosecution on the basis that Patricia cannot get a fair trial. He also applies, in the alternative, for an order to be made prohibiting any coverage of the trial until it is over. The judge denies both applications. Patricia wants to challenge the judge's refusal. Advise her as to whether there are any grounds of Irish constitutional law on which she might do so. Advise her.",
      },
      {
        examType: 'Essay',
        description:
          '"No one denies that the [1937] Constitution was influenced to some extent by Catholic teaching and doctrine ....',
        text: '"No one denies that the [1937] Constitution was influenced to some extent by Catholic teaching and doctrine .... What is more remarkable, however, is the extent to which that document also reflected secular ... values of liberal democracy, respect for individual rights, and the separation of the Church and State and the extent to which it does not reflect Catholic teaching." Do you agree with this statement? Give reasons for your answer, making reference (where appropriate) to specific provisions of the Constitution and/or decided cases of the Irish courts.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on [TWO]{.underline} of the following FOUR decisions.',
        text: 'Write a short note on [TWO]{.underline} of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: i. Damache v. OPP [2012] IESC 11. ii. Daly v. Revenue Commissioners [1995] IR iii. SPUC Ltd v. Coogan [1989] l.R. 734. iv. Buckley vs. A. G. [1950] I.R. 1',
      },
      {
        examType: 'Essay',
        description: '"By reason of [Mr.',
        text: '"By reason of [Mr. Callelly\'s membership] of the Oireachtas ... it is said that the High Court could not, and thus on appeal this Court cannot, exercise the very functions for which the courts exist, namely, in a case such as this, the vindication of core constitutional rights, such as the right to one\'s good name, the right\'to earn a livelihood and - as part of a process which is claimed to have irreparably eroded such rights - the right to fair procedures . In short, the Superior Courts must stand aside even if otherwise satisfied that what is asserted would justify their intervention. Such an outcome, surprising as it must be to a great number, is said to be mandated by the Constitution of Ireland, 1937 itself ("the Constitution" or "the 1937 Constitution"), so as to give due recognition to the legislative power, when exercising a sub-set of that power, namely parliamentary privilege. In essence it is essential to and demanded by the separation of powers. In the absence of an express immunity for parliamentary privilege, it becomes necessary to establish, if such is to be inferred, that [the Oireachtas\'] constitutional role will otherwise be critically impaired. I cannot see how this would result or follow if the actions of the respondents are subject to judicial review. How such might impact on good governance or why the suggested immunity is central to the form of governance required by the Constitution, have never been satisfactorily answered. Consequently, I do not believe, at the level of principle, that the immunity argued for can be inferred either as a constitutional imperative or otherwise to achieve some overriding constitutional objective." McKechnie J., Callely v. Moylan [2014] IESC 26. Do you agree that the courts should be entitled to judicially review decisions of the Oireachtas regarding its members? Is this a breach of the separation of powers? In your answer, you should make reference to decisions of the Irish courts, including Callely v. Moylan [2014] IESC 26.',
      },
      {
        examType: 'Essay',
        description:
          '"There has been a noticeable evolution in judicial attitudes to freedom of expression so that the Irish courts now…',
        text: '"There has been a noticeable evolution in judicial attitudes to freedom of expression so that the Irish courts now provide robust constitutional protection to the position and privileges of the press". Do you agree? You should refer in your answer to specific decisions of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'The Government introduces the Payment of Arrears Bill 2015 in an effort to… Constitutional.',
        text: 'The Government introduces the Payment of Arrears Bill 2015 in an effort to establish a more efficient system for the recovery of monies owed to various State bodies. Section 2 of the Act establishes the State Debt Recovery Agency ("The Agency") which has a responsibility "to pursue and obtain all outstanding debts owed to the State". The Agency is entitled to bring actions for debt recovery in the courts. It is also granted the power by section 2 (4) to issue a \'Debt Owed Order\' without any court process once the Agency is satisfied that a debt is owed and that this would be more efficient than issuing court proceedings. A \'Debt Owed Order\' allows the Agency to make deductions at source from wages or social welfare payments. Section 4 of the Act allows for a debt to be recovered from "a related person" and "in the case of a tenant, the registered landlord of that person". The President is concerned that aspects of the Bill may be unconstitutional and may convene a meeting of the Council of State for the purposes of considering making an Article 26 reference. You have been asked to advise the President on (i) any aspects of the Bill that may be unconstitutional; and (ii) the advantages or disadvantages of making an Article 26 reference.',
      },
      {
        examType: 'Essay',
        description: '"The Supreme Court\'s finding in Fleming v.',
        text: '"The Supreme Court\'s finding in Fleming v. Ireland [2013] IESC 19 that the Constitution does not provide for a right to assisted suicide falls to show adequate regard for the Constitution\'s, underlying values ,of dignity and autonomy". Do you agree? Give reasons for your answer. You may wish to refer in your answer to specific decisions of the Irish courts, the- European Court of Human Rights or courts of other common law jurisdictions.',
      },
      {
        examType: 'Problem',
        description:
          'The Promotion of Agricultural Innovation Act 2015 permits the use of… Constitutional, Director.',
        text: 'The Promotion of Agricultural Innovation Act 2015 permits the use of cloning and genetic modification techniques in the Irish cattle industry The Minister, in announcing the introduction of the Bill, expresses the desire that it will put Ireland "at the forefront of a new breed of super-cows". As part of the scheme, section 3 of the Act requires the Dublin Animal Research Centre (DARC) to mae it\'s data and materials available to those in charge of new research and techniques. DARC is a charitable intuition which was founded in the 18th century by a religious order that believed strongly in promoting animal welfare as a recognition of God\'s role in their creation. DARC has been in receipt of State funds for several decades, has two Government appointees among its 10 board members and has a number of civil servants operating there in secondment. The Director of DARC objects to the proposed transfer of data and materials on the grounds that he believes it to be contrary to the core values of the Centre and its founders. Separately, Beth, a civil servant on secondment in DARC writes to the Minister indicating that she has a strong ethical and conscientious objection to the proposed transfer of data and that she will refuse \'to co-operate in any way with the process. This is problematic for the transfer as Beth has particular knowledge about matters that are important to the new research proposed. The Government wishes to make sure that the transfer proceeds without delay on the basis that it .is in the public interest and will have substantial financial benefits to the ·State. Section 12 of the Act ·allows the Minister to issue directions "compelling the taking of any necessary steps by a public official or agency, or anybody in receipt of public funds". The Minister asks for your advice as to whether there are any potential constitutional difficulties in issuing directions ·against (a) the Director of DARC [and]{.underline} (b) Beth. Advise the Minister.',
      },
      {
        examType: 'Essay',
        description: '"The stipulation in Article 40.',
        text: '"The stipulation in Article 40. 4.1 of the Constitution that a .citizen may not be deprived of his liberty save "in accordance With law\' does not mean that a convicted person must be released on habeas corpus merely because some defect .or illegality attaches to his detention. The phrase means that there trust be such default of fundamental requirements that the detention may be said to be wanting in due process of law. For habeas corpus purposes, therefore, it is insufficient for the person to show that there has been a legal error or impropriety, or even that jurisdiction has been inadvertently exceeded." (McDonagh) v Frawley [1978] IR 131 per O\'Higgins G.J.) Do you think that this approach provides adequate protection for the liberty of the person, as guaranteed by the Constitution? You should refer in your answer to specific decisions of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          'There is a lacuna in the law as to ·certain rights, especially those of the children born in such circumstances.',
        text: "There is a lacuna in the law as to ·certain rights, especially those of the children born in such circumstances. Such lacuna should be addressed in legislation and not by this Court. There is clearly merit in the legislature addressing this lacuna, and providing for retrospective situations of surrogacy. Under the current legislative framework it is not possible to address issues rising on surrogacy including the issue of who is i the mother for the purpose of the registration of the birth. The issues raised in this case are important, complex and social, which are matters of public policy for the Oireachtas. They relate to the status and rights of children and a family. It is important that the rights of the twins, the parent respondents, the notice party and the family are vindicated pursuant to the law and the Constitution.\" (M.R. and D.R. -v- An t-Ard-Chláraitheoir [2014] IESC 60) Is there a contradiction between the Court's identification of a lacuna (gap) in the law regarding the rights of children and a family in a surrogacy situation, and the Court's decision that it cannot act to vindicate those rights in the absence of legislation? What does this indicate about the relationship between the Supreme Court and the Oireachtas?",
      },
      {
        examType: 'Essay',
        description:
          'William is charged with an offence of unlawful membership of an illegal organisation under the Offences against the…',
        text: "William is charged with an offence of unlawful membership of an illegal organisation under the Offences against the State Act 2015. He is sent for trial before a Jury. ·· Section 27 of the Act creates an exception from the rule against hearsay to permit a police officer to give evidence of his belief about the accused's membership. During his trial, a Chief Superintendent expresses his belief that William is a founding member of The Irish League of Gentlemen ('the League'), a recently established organisation which has claimed responsibility for the vandalism of a number of government properties. Threats have also been made via phone calls against individual Ministers in the name of the League. This is the only evidence offered by the prosecution against William. During cross examination, the Chief Superintendent is asked what the evidence or basis for his belief is. He refuses to .answer on the grounds that the information has been provided by the intelligence servic.es and that disclosure of it may pose a risk to the life or property of certain individuals. William requested that the material be disclosed to his lawyers l only on the basis that he would not receive the· information so that there could be no alleged risk to life. This was rejected by the Court. William then asked that his disclosure be made to the jury. This was again rejected by the Court. Finally, an application was made for the trial to be discontinued and sent to the non-jury Special Criminal Court where William wished to argue that the judge should review the evidence; This was dismissed by ·the Court on the basis that William had no automatic right to a Special Criminal Cou.rt trial and that the failure to make the application at the start of the trial constituted a waiver of his rights. William is convicted of the offence. William requests your advice as to whether there are any grounds of Irish constitutional law upon which he could challenge (a) his trial and conviction and (b) the constitutionality of section 27 of the Act.",
      },
      {
        examType: 'Essay',
        description:
          '"The doctrine of harmonious interpretation assumes a consistency and coherence on the part of the drafters of the…',
        text: '"The doctrine of harmonious interpretation assumes a consistency and coherence on the part of the drafters of the Constitution that is absent, and which becomes all the more unreal with every change made by referendum. The courts should a.bandon the doctrine in favour of other techniques of constitutional interpretation. Do you agree with this statement? What other methods of constitutional interpretation, if any, do you think should be used by the Irish courts? You should refer in your answer to specific decisions of the Irish courts.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2016,
    questions: [
      {
        examType: 'Essay',
        description:
          '"The recent commencement of Article 42A is a moment with significant implications for the balance of constitutional…',
        text: '"The recent commencement of Article 42A is a moment with significant implications for the balance of constitutional rights and interests between children, parents and the State. It is likely to lead to a departure from some of the Irish courts\' previous jurisprudence on the welfare of children and the rights of parents." Do you agree? You should refer in your answer to specific decisions of the Irish courts for which Article 42A may have implications.',
      },
      {
        examType: 'Essay',
        description: '"The decision of the Supreme Court in Jordan v.',
        text: '"The decision of the Supreme Court in Jordan v. Minister for Children and Youth Affairs shows a lack of regard for the constitutional requirements of fairness, equality and integrity in a referendum. It also suggests that a challenge to a referendum result will never succeed". Do you agree\'? Give reasons for your answer. You should refer in your answer to relevant decisions of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          'International Sugar Distributors Limited is a major multi-national food corporation which specialises in sweet goods.',
        text: 'International Sugar Distributors Limited is a major multi-national food corporation which specialises in sweet goods. It employs 200 people in Ireland and has annual sales here in the region of €20m. One of its most well-known brands in Ireland is a drink called Sugar Rush. The drink contains 40% sugar. The product was first launched in 1984 and has been advertised since that time by a cartoon cat, also called Sugar Rush. The cat is a registered trademark. The Oireachtas passes the Prevention of Childhood Obesity Act 2016. - Section 4 of the Act introduces a 500% levy on products comprising more than 20% sugar. The levy for products below the 20% threshold is 1% per 1% of sugar. - Section 11 of the Act prohibits any television or radio advertising of products comprising more than 20% sugar. - Section 12 prohibits the use of any depiction of a person or animal in any advertising, communication or packaging of a product comprising more than 20% sugar. International Sugar Distributors Limited seeks your advice as to whether there are any grounds of Irish constitutional law upon which they might challenge sections 4, 11 and 12 of the Act.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on [TWO]{.underline} of the following FOUR decisions.',
        text: 'Write a short note on [TWO]{.underline} of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: (i) DPP v. JC [2015] IESC 31. (ii) Crotty v. An Taoiseach [1987] I.R. 713. (iii) Heaney v. Ireland [1994] 3 IR 593. (iv) A.G. v. Hamilton [1993] 2 IR 250.',
      },
      {
        examType: 'Problem',
        description:
          'A complaint of professional misconduct was made to the Medical Council… Constitutional.',
        text: 'Gary is a doctor. A complaint of professional misconduct was made to the Medical Council against Gary. The complaint was notified to Gary by a letter. The letter indicated that a copy of the complaint would be provided to Gary at a meeting of the Preliminary Investigation Committee the following week. The letter also stated that the Committee could at this meeting consider whether there was any merit in the complaint such as would warrant continuing the investigation. It was also indicated that Gary could provide any additional material which he felt to be relevant. Gary replied requesting (i) a copy of the complaint in advance and (ii) an extension of time to respond to the complaint. The Committee replied indicating that the meeting would go ahead on the basis that it was a preliminary meeting only and that no final ·determination of misconduct would be made at that stage. Gary has requested your advice as to whether there are any grounds of constitutional law upon which he might seek to prevent the meeting going ahead. Advise Gary.',
      },
      {
        examType: 'Essay',
        description: '"McGowan v.',
        text: '"McGowan v. Labour Court Ireland [2013] IESC 21 signals the revival of a strict non­ delegation doctrine by the Supreme Court in a manner which has major implications for how the Oireachtas delegates power to administrative bodies or agencies." Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Essay',
        description:
          '"The Article 40.6.1 guarantee of freedom of association and freedom of assembly has been a disappointment when compared…',
        text: '"The Article 40.6.1 guarantee of freedom of association and freedom of assembly has been a disappointment when compared with how the freedom of expression guarantee has been treated by the courts." Do you agree? In your answer, you should refer to decided cases of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          '"The independence of the Attorney General from Government is a constitutional principle of fundamental importance".',
        text: '"The independence of the Attorney General from Government is a constitutional principle of fundamental importance". Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Problem',
        description:
          'Section 27 (1) of the Protection of Minors in Care Act 2016 prohibits any… Director.',
        text: "Section 27 (1) of the Protection of Minors in Care Act 2016 prohibits any person from publishing information concerning a minor in care that could lead to the identification of the minor or any other person or institution involved in the minor's care. Section 27 (2) specifies that any breach of section 27 (1) is a criminal offence. TV6 have been working on a documentary relating to the system of care for minors in Ireland. In the course of their investigation, they receive information alleging that potentially harmful practices are being used in one particular institution. On further investigation, they leam that one of the individuals involved in the management of this institution was convicted of serious charges of child neglect in Luxembourg before coming to work in Ireland. TV6 wants to broadcast a special programme focusing on the allegations relating to this institution. As part of this programme, they plan to broadcast interviews with former residents in the institution who have come forward to support the allegations made. Before the programme is broadcast, W6 receives a letter from the Director of Public Prosecutions drawing its attention to section 27. You have been asked to advise TV6 whether a prosecution under section 27 might be contrary to the Constitution of Ireland. Advise them.",
      },
      {
        examType: 'Essay',
        description:
          '"The Irish courts\' application of the proportionality doctrine in their property rights jurisprudence imposes too great…',
        text: '"The Irish courts\' application of the proportionality doctrine in their property rights jurisprudence imposes too great an obstacle to government action in the pursuit of policies that are in the public interest". Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Problem',
        description:
          'As a person under the age of 18, he is eligible to be considered for… Constitutional.',
        text: 'Michael is 15 years old. He is convicted of then. As a person under the age of 18, he is eligible to be considered for "educational detention" under the Sentencing of Minors Act 2016. This is a form of detention which involves the placing of minors in prisons but in a unit separate from the main population where there is greater access to training and other educational supports, and where the detainees are subject to less restrictions than those provided for by the Prison Rules. lt is also a form of detention which is not treated in law as a criminal conviction. The judge directs that Michael be subject to "educational detention" for a period of 2 years. Rule 26 (1) of the Prison Rules 2016 allows a prisoner to earn remission on a sentence of 25% "for good conduct, as judged by a prison governor". However, the Prison Rules 2016 are specified in their definition to apply only to "persons detained on foot of a criminal conviction." Michael considers it unfair that he is not eligible to apply for remission. He asks your advice as to whether there are any grounds of Irish constitutional law upon which he can challenge this. Advise Michael.',
      },
      {
        examType: 'Problem',
        description:
          'Patricia is a member of an animal rights organisation with a particular… Advise her as to the prospects of her bringing…',
        text: 'Patricia is a member of an animal rights organisation with a particular interest in the protection of marine life. As a result of negotiations over many months, the Irish government announces that it intends to sign a free trade deal with the Icelandic government. The government states that this is a "very good deal for Ireland" which will bring many economic benefits. One part of the agreement involves allowing boats registered in Iceland access to Irish waters for the purposes of "scientific research." Patricia is concerned about the participation of Icelandic boats in catching whales. She believes that the right of access for scientific research may lead to an increased threat of whales which pass through Irish waters being caught. Patricia believes that this is a use of Irish sovereignty and territory that should be subject to political debate and to the approval of the Oireachtas. She has asked to you advise her as to the prospects of her bringing litigation to prevent the ratification of the agreement without the approval of the Oireachtas. Advise Patricia.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on of the following FOUR decisions.',
        text: 'Write a short note on of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: (i) Jordan -v- Minister for Children and Youth Affairs [2015] ESC 33. (ii) M.R. and D.R. -v-An Ard-Chlaraitheoir [2014] 60. (iii) In re Article 26 and the Regulation of Information (Services outside the State for the Termination of Pregnancies) Bill 1995 [19951 1 IR 1. (iv) Leontjava v Director of Public Prosecutions and others [2004] IESC 37.',
      },
      {
        examType: 'Essay',
        description:
          '"The harmonious method of constitutional interpretation is the only logical approach to construing the text of the…',
        text: '"The harmonious method of constitutional interpretation is the only logical approach to construing the text of the Constitution of Ireland, especially given how frequently it is amended". Do you agree? You should refer in your answer to specific decisions of the Irish courts.',
      },
      {
        examType: 'Problem',
        description: 'The Oireachtas passes the Anti-Social Behaviour Act 2016. Constitutional.',
        text: 'The Oireachtas passes the Anti-Social Behaviour Act 2016. This is stated in its Long Title to be intended to "prevent anti-social behaviour and promote civic respect and community harmony". Section 47 of the Act provides for the possibility that a person may be prevented from residing in public authority housing for a specified period of up to 5 years. This is described in the Act as a \'suspension of housing entitlement order\'. Section 47 can be applied to any person who is "habitually resident in public authority housing". There is no equivalent provision in the Act for persons resident in other forms of housing. A suspension of housing entitlement order can be made by a District Court upon the application to it by "a public body with statutory responsibility for housing, or by any other interested person". The District Court is entitled to make a suspension order where it "forms the view that this would be beneficial to the local community". Martina has been -resident in public authority housing for more than 20 years. She was granted the opportunity to purchase a life tenancy in her home in 2012 at the cost of €30,000. She purchased this with a loan. Martina\'s son has previously been convicted of possession of €10,000 worth of cannabis with intent to supply. Following his conviction, she asked him to leave her home. However, he makes regular visits to the house. On one of these occasions, he is involved in an argument with Martina\'s neighbour John. John makes an application to the District Court to have a section 47 order made against Martina. The District Court makes the order on the basis that removing Martina from the neighbourhood would also mean that her son would unlikely to be present and that this would be beneficial to the local community. Martina wishes to challenge the constitutionality of section 47 of the Act and has asked you to advise her if there are any grounds upon which she might do so. Advise her.',
      },
      {
        examType: 'Essay',
        description:
          '"The office of the President is weak, ineffective, lacking in any form of constitutional power and ought to be…',
        text: '"The office of the President is weak, ineffective, lacking in any form of constitutional power and ought to be abolished". Do you agree? Give reasons for your answer.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2017,
    questions: [
      {
        examType: 'Problem',
        description:
          'Section 42(1) of the Protection of the Peace Act 2017 prohibits any person… Constitutional.',
        text: 'Section 42(1) of the Protection of the Peace Act 2017 prohibits any person from "assembling or consorting with other person in a manner deemed by a member of An Garda Síochána to be liable to cause harm or offence to others." Section 42(2) specifies that any breach of section 42(1) is a criminal offence. Mark is a member of an animal rights organisation. Mark is concerned by recently announced government proposals to allow Irish universities to carry out drug trials and other forms of experiments on animals. Mark and a friend Alan decide to demonstrate outside the Dáil against the proposals. They chain themselves to the gates. They also bring placards which include some visual depictions of animal suffering. Mark and Alan are charged with criminal offence under section 42 They have asked you for advice as to VM1ether there are any grounds of Irish constitutional on which they might challenge the prosecution. Advise them.',
      },
      {
        examType: 'Essay',
        description:
          '"The relationship between freedom of religion and freedom of conscience is a matter on which the courts have failed to…',
        text: '"The relationship between freedom of religion and freedom of conscience is a matter on which the courts have failed to give clarity in their previous caselaw. This has led to a damaging uncertainty about the scope and limits of these rights under the Constitution". Do you agree? Give reasons for your answer. You should also refer in your answer to relevant decisions of the Irish courts.',
      },
      {
        examType: 'Problem',
        description: "Rachel's father is suffering from a rare form of illness. Constitutional.",
        text: "Rachel's father is suffering from a rare form of illness. His doctor has advised that the illness is likely to prove fatal and that his life expectancy is approximately 12 months. Rachel hears about a new treatment for the illness which has just been launched in Canada. She makes enquiries and leams that the treatment may be suitable for her father. However, the process for approving the treatment as safe and legally available in Ireland is likely to take another 6 months. A further difficulty is that the treatment is expensive and will cost €150,000. The Provision of Medical Treatment Act 2017 provides that the State will fund treatment on an emergency basis where a doctor has estimated life expectancy to be less than 6 months without treatment. This is subject to an overall monetary limit of €100,000. Where a treatment costs more than this, no funding will be provided at all. Rachel has asked you for advice as to whether there are any grounds of Irish constitutional law upon which she might be able to challenge (i) the delay in making the treatment available, and (ii) the fact that her father does not qualify for treatment under the 2017 Act. Advise Rachel.",
      },
      {
        examType: 'Problem',
        description:
          'Paul is fired from his job after being accused by the investment bank… Constitutional.',
        text: 'Paul is fired from his job after being accused by the investment bank where he works of fraud. The accusation relates to €1.4 billion loss incurred by the bank on unauthorised trading. Paul denies the accusation and sues his employer for wrongful dismissal. His employer reports the matter to the Gardai but, after some preliminary investigations, no charges are brought. The bank makes an application to the High Court to have the matter dealt with under assumed names because oi the risk of bad publicity for the bank. It relies on the claim that banking matters involve constitutional rights of privacy and commercial confidentiality. Paul does not oppose this application because he feels that this will protect his privacy and his good name. The High Court judge orders that the matter be listed as J v. A Bank. He also makes an order that the identity of the parties and the size of the loss not be revealed by any reports of the hearing. The Irish Observer asks you for advice as to whether there any grounds of Irish constitutional law upon which they might challenge this order. Advise them.',
      },
      {
        examType: 'Essay',
        description:
          '"The Supreme Court\'s decision in DPP v JC [2015] IESC 31 is a regrettable one which risks reducing the level of…',
        text: '"The Supreme Court\'s decision in DPP v JC [2015] IESC 31 is a regrettable one which risks reducing the level of protection for constitutional rights in Ireland to a substantial degree". Do you agree? Gives reasons for your answer.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on [TWO]{.underline} of the following FOUR decisions.',
        text: 'Write a short note on [TWO]{.underline} of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: i. Bederev v Ireland [2016] IESC 34. ii. Jordan v Minister for Children & Youth Affairs [2015] IESC 33. iii. De Burca v AG [1976] IR 38. iv. State (Quinn) v Ryan [1965] IR 70.',
      },
      {
        examType: 'Problem',
        description:
          'The Specialised Courts Act 2017 gives the Minister for Justice the power… Constitutional, Regulation.',
        text: 'The Specialised Courts Act 2017 gives the Minister for Justice the power under section 4(2) to establish "specialist courts in the manner and subject to such restrictions as she deems appropriate." The Minister is entitled to do so by way of ministerial regulations under section 4(3). Any such regulations must, pursuant to section 4(4) be laid before the Houses of the Oireachtas. The Minister issues the Court of Political Sanctions Regulations 20i7. This creates a new Court of Political Sanctions which has jurisdiction to hear "all maters arising from disputes relating to political parties, elected officials or the conduct of matters in the Houses of the Oireachtas". The Regulations specify that judges of the court must have previously held elected office for a period of at least 5 years. You have been asked by an opposition party whether there are any grounds of Irish constitutional law upon which a challenge could be brought to (i) section 4 of the 2017 Act; and (ii) the 2017 Regulations. Advise the party.',
      },
      {
        examType: 'Essay',
        description:
          '"The office of Attorney General is an important but often misunderstood element of the Constitution\'s systems of checks…',
        text: '"The office of Attorney General is an important but often misunderstood element of the Constitution\'s systems of checks and balances". Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Problem',
        description:
          'Gemma has a current account with the Celtic National Bank. Constitutional, Company.',
        text: 'Gemma has a current account with the Celtic National Bank. She uses the account to hold money that she receives from selling second-hand cars which she imports from the United Kingdom. She sells the cars online. Gemma is contacted by a man about a premium executive car which was advertised for €25,000. The man sees the car and offers to pay for it in cash immediately. Gemma sells the car and lodges the €25,000 in cash to her account. The following week, Gemma is contacted by her electricity company to inform her that her standing order has failed to clear from her account. Gemma is puzzled and phones the bank. The manager tells her that "the Gardai have frozen the account" and that "they have told us not to talk about it". Upon making contact with the Gardai, Gemma is told that there are suspicions about the large cash deposit made and the Gardai have requested the bank not to allow anyone to access the account while they make enquiries. The Gardai tell her that they have made this request using their powers under the Investigation Assistance Act 2016. Section 4 of this Act states that the Gardai can "make a request that any bank with responsibility for an account deny access to it where it is believed that this may assist an ongoing investigation". Gemma asks for but is given no estimate of how long this process will take. Gemma has asked you for advice as to whether there are any grounds of Irish constitutional law upon which she might challenge the denial of access to her account. Advise her.',
      },
      {
        examType: 'Essay',
        description:
          'You are asked by the Minister for Foreign Affairs to produce a report on the relationship between the Constitution and…',
        text: 'You are asked by the Minister for Foreign Affairs to produce a report on the relationship between the Constitution and the law of the European Union. This follows the decision of the United Kingdom to withdraw from the European Union and calls within Ireland to "take back control of the Constitution". You have been asked in your report to consider, in particular: (a) The way in which the Irish courts have dealt with the relationship between the Constitution and the law of the European Union; (b) Whether the Irish Constitution is superior to the law of the European Union; (c) Whether the Supreme Court is entitled in reliance on the Irish Constitution to disregard or reject decisions of the Court of Justice of the European Union; and (d) (d) Any other matters which you may consider relevant.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on [TWO]{.underline} of the following FOUR decisions.',
        text: "Write a short note on [TWO]{.underline} of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: (i) O'Byrne v. Minister for Finance [1951] IR 1. (ii) State (Nicolaou) v. An Bord Uchtåla [1966] I.R. 567. (iii) East Donegal Co-operative Ltd v. A.G. [1970] IR 317. (iv) Collins v. Minister for Finance [201 6] IESC 73",
      },
      {
        examType: 'Problem',
        description: 'Compare and contrast the approach to Article 152.1 of the Constitution…',
        text: 'Compare and contrast the approach to Article 152.1 of the Constitution adopted by the Supreme Court in McGowan v. Labour Court [2013] IESC 21 and Bederev v Ireland [2016] IESC 34. In your answer, you should consider, in particular, whether there are any significant differences in the approach adopted, and what the implications of any such differences are for the application of Article 15.2.1 in the future.',
      },
      {
        examType: 'Problem',
        description:
          'Section 15 of the Public Spaces Act 2017 provides that a Garda not below… Constitutional.',
        text: 'Section 15 of the Public Spaces Act 2017 provides that a Garda not below the rank of sergeant is entitled to "temporarily prohibit the display in a public place of any material which is likely, in his view, to undermine public order or morality". A temporary prohibition order may last for 36 hours. A march is being organised to protest against the erection of a statute of a partially-clothed figure in close proximity to the headquarters of a local (non-Christian) religious group. Hannah is a passionate atheist. She wishes to organise a counter-protest. She advertised the counter-protest online and asks people to design and bring their own placards. The day before the event, she is contacted by the local Garda sergeant to inform her that she has exercised her powers under section 15 to prohibit the counter-protest on the grounds that she believes it may lead to disagreement between the groups and undermine public order. The sergeant states that she has viewed some of the proposed placards online and believes them to be "deliberately disrespectful and provocative". Hannah asks if the other protest is going ahead and is told that it is. When she asks why, she is told by the sergeant that they had organised the event first which meant that they had not, in law, created a risk of public disorder. The sergeant also stated that their protest was a religious one and so was protected by Article 44 of the Constitution. Hannah has asked you whether there are any grounds of Irish constitutional law on which she can challenge (i) the decision of the sergeant and (ii) section 15. Advise her.',
      },
      {
        examType: 'Essay',
        description:
          '"There has been a gradual but steady decline over recent decades in the level of protection provided to the individual…',
        text: '"There has been a gradual but steady decline over recent decades in the level of protection provided to the individual facing potential prosecution under Article 38.1 of the Constitution". Do you agree? Give reasons for your answer. In your answer, you should refer to specific decisions of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'The Oireachtas enacts the Limitation of Medical Costs Act 2017. Negligenc, Constitutional.',
        text: 'The Oireachtas enacts the Limitation of Medical Costs Act 2017. The Long Title of the Act states that it has been enacted "to address the increasing costs of medical practice in Ireland, especially costs created by legal claims". Section 4 of the Act provides that the Minister may introduce regulations "on courts fees and related matters". Using this power, the Minister introduces the Medical Claims Regulations 2017. These introduce court fees of €3,000 for "any action where the defendant is a medical practitioner". The fee must be paid in full before a legal action to which the Regulations apply can be commenced. Section 12 (1) of the Act provides that in "any action involving alleged negligence on the part of a medical practitioner", a litigant will not be able to recover from the defendant the cost of legal advices obtained prior to the initiation of the proceedings. Section 12 (2) prohibits the recovery of any legal costs incurred in the course of the proceedings from the defendant with the sole exception of the costs of the hearing of the action. William is the father of two children and has take home pay of €1,200 per month. He believes that his GP negligently failed to diagnose a serious medical condition. However, he is concerned about bringing the action as he cannot afford either the court fees or to pay for legal advice in advance. He visits his local free legal clinic and asks for advice. The clinic believe that there may be grounds of Irish constitutional law upon which to challenge the 2017 Act and/or the 2017 Regulations and has asked you for advice.',
      },
      {
        examType: 'Essay',
        description:
          '"The historical method of interpretation is unjustified and inappropriate as a matter of Irish constitutional law.',
        text: '"The historical method of interpretation is unjustified and inappropriate as a matter of Irish constitutional law. It risks freezing the Constitution in the 1930\'s without providing any real certainty or clarity on questions of constitutional meaning." Do you agree? Explain your opinion with reference to relevant decisions of the Irish courts.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2018,
    questions: [
      {
        examType: 'Essay',
        description:
          '"The President of Ireland occupies a ceremonial position with little power or influence over the conduct of politics or…',
        text: '"The President of Ireland occupies a ceremonial position with little power or influence over the conduct of politics or government in the State" Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on [TWO]{.underline} of the following FOUR decisions.',
        text: "Write a short note on [TWO]{.underline} of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: i. Sunday Newspapers Limited v. Gilchrist and Rogers [20171 IESC 18. ii. DPP v. O'Shea [1982] IR 384. iii. In re Article 26 and Pad V of the Planning and Development Bill [2000] 2 IR 321 iv. McGee v AG [1974] IR 284.",
      },
      {
        examType: 'Problem',
        description:
          'The Oireachtas has enacted the Regulation of External Relations Act 2018. Constitutional, Regulation.',
        text: "The Oireachtas has enacted the Regulation of External Relations Act 2018. The Act is described in its Long Title as 'An Act to make rules and regulations to govern the conduct of external relations, to control the making of international agreements, and to provide for a legislative veto on the entry into agreements that are against the public interest' Section 3 of the Act specifies that the Minister for Foreign Affairs must give 28 days notice to the Oireachtas Committee on External Relations that he intends to undertake discussions with other nations with the intention of concluding an international agreement; must provide the Committee with access to information on the discussions; and must consult the Committee before signing any such agreement. Section 5 of the Act states that any agreement that is signed by the Minister without the permission of the Oireachtas Committee will be automatically null and void. The Department of Foreign Affairs is concerned about the implications of the Act for the conduct of sensitive discussions at an international level. They have requested your advice as to whether section 3 and section 5 may give rise to constitutional concerns. Advise the Department.",
      },
      {
        examType: 'Problem',
        description: 'Paul is the father to a 12 month old child called Anna. Constitutional.',
        text: 'Paul is the father to a 12 month old child called Anna. He was in a relationship with Anna\'s mother at the time of her birth and has taken an active role in caring for her over the first year of her life. However, the couple subsequently broke up and no longer live together. They were not married at any point. Anna\'s mother has entered into a new relationship and is engaged to be married. She has spoken about how she would like for her new partner to adopt Anna so that "she could be his daughter too" Paul is concerned about this and applies for full-time custody of Anna. His application is rejected by the Court. The judge stated in delivering the decision that "there is a presumption that the best interests of the child are in being with her mother; the mother has constitutional pre-eminence over the father; and I have seen nothing in the evidence to suggest that that presumption should be rebutted here" Paul asks for your advice as to (i) whether there are any grounds of Irish constitutional law upon which he can challenge the judge\'s decision; and (ii) whether the position under the Constitution will change if Anna\'s mother and her new partner get married. Advise Paul.',
      },
      {
        examType: 'Essay',
        description:
          '"It is perhaps noteworthy, as the late Professor Kelly was wont to observe, that the form of separation of powers…',
        text: '"It is perhaps noteworthy, as the late Professor Kelly was wont to observe, that the form of separation of powers adopted in the Irish Constitution was not the hermetically sealed branches of Government posited by Montesquieu, but rather involved points of intersection, interaction and occasional friction between the branches of Government so established". (O\'Donnell J., Pringle v Ireland [2012] ESC 47, at para. 17). Do you agree? Has the Irish caselaw on the separation of powers tended to emphasise separation between the branches on the one hand or checks and balances on the other? You should refer in your answer to decided cases of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'Jean is a journalist in full-time employment with the Daily Herald. Constitutional.',
        text: 'Jean is a journalist in full-time employment with the Daily Herald. While researching a story about possible corruption in a semi-state body, Jean is provided with information by the auditor of the agency that suggests that one of the board members has been claiming expenses for meetings that she has not attended. When Jean publishes the information on her personal blog page, the government announces an inquiry will be held into possible corruption in the agency in question. Jean is called as a witness by the inquiry. She is also asked to make available all documentation and information which was provided to her as part of her research. The inquiry has the legal power to compel witnesses to attend and provide documents requested. Jean replies to the inquiry chair indicating that she will not provide the information or documentation; and that she will not answer any questions. The inquiry replies requesting her to confirm: (i) if she was asked to give any assurances of confidentiality by the person who gave her the information; (ii) if she informed the person that the information would be confidential; (iii) if she had confirmed with the person that they believed the material to be confidential. Jean never discussed confidentiality with the auditor. She is also aware that the auditor has himself agreed to appear before the inquiry and hand over any documentation in his possession. Jean asks you for advice as to whether she is entitled under Irish constitutional law to refuse to answer questions and/or to provide the documentation requested. Advise her.',
      },
      {
        examType: 'Essay',
        description:
          '"Liberalising the rules on standing to make it easier for constitutional issues to be litigated by professional…',
        text: '"Liberalising the rules on standing to make it easier for constitutional issues to be litigated by professional advocacy or representative groups would enhance access to justice in the Irish courts" Do you agree? In your answer you must (i) explain the current law on standing in constitutional litigation; and (ii) consider the advantages and disadvantages of reform.',
      },
      {
        examType: 'Essay',
        description:
          '"The Irish courts\' approach to referenda is technical, legalistic and represents a serious and unwarranted interference…',
        text: '"The Irish courts\' approach to referenda is technical, legalistic and represents a serious and unwarranted interference with the political process, and with the rights of political parties." Do you agree? Give reasons for your answer. You should refer in your answer to the decided cases of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'Section 25(1) of the Pharmaceutical Regulation Act 2018 introduces a… Constitutional, Regulation.',
        text: 'Section 25(1) of the Pharmaceutical Regulation Act 2018 introduces a prohibition on any publication which might encourage the taking of pharmaceutical products other than in circumstances where they have been prescribed by a doctor. Section 25(4) creates a criminal offence for breach of the prohibition. IrishBay Inc is an online website hosted in Ireland and run by Alice which allows private individuals to offer products or services for sale. The website has been known in the past to feature a number of providers of online medicines and other similar products. In response to the passing of the Act, the site introduces a notification system under which users can inform the site\'s operators if online medicines are being offered for sale. One of the vendors removes his products and replaces it with the statement "Liberty and freedom fail when government interferes with individual choice. Resist big government. Contract online meds.ie." Alice is prosecuted for breach of section 25(4). She seeks your advices as to whether there are any grounds of Irish constitutional law upon which she can challenge the proposed prosecution. Advise her.',
      },
      {
        examType: 'Essay',
        description:
          '"The decision of the Supreme Court in Sunday Newspapers v Gilchrist and Rogers [2017] IESC 18 departs from the courts\'…',
        text: '"The decision of the Supreme Court in Sunday Newspapers v Gilchrist and Rogers [2017] IESC 18 departs from the courts\' traditional approach to Article 34.1 and is likely to lead to a weakening of the principle of open justice." Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Essay',
        description:
          '"The influence of natural law theory on the development of Irish constitutional law was significant and had both…',
        text: '"The influence of natural law theory on the development of Irish constitutional law was significant and had both positive and negative elements." Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on [TWO]{.underline} of the following FOUR decisions.',
        text: "Write a short note on [TWO]{.underline} of the following FOUR decisions. Your answer should explain the significance of the decision of Irish constitutional law: i. Re Haughey [1971] IR 217 ii. Maguire v Ardagh [2002] 1 IR 385 iii. Re Article 26 and the Employment Equality Bill 1996 [1997] 2 IR 321 iv. O'Sullivan v Sea Fishers Protection Authority [2017] IESC 75",
      },
      {
        examType: 'Problem',
        description:
          'Jane and Michael have been living in a cohabiting relationship for 5 years. Constitutional.',
        text: 'Jane and Michael have been living in a cohabiting relationship for 5 years. They have a 4 year old son Paul. They are not married and live with Jane\'s mother Anne. Jane is tragically killed in a car accident. Anne and Michael have a major disagreement and Michael leaves the home, taking Paul with him. He does not tell Anne where they have gone. Anne applies to the High Court for an order compelling Michael to tell her the whereabouts of Paul and to grant her access to Paul. The High Court judges grants her the order. The judge bases her decision on Article 8 of the European Convention on Human Rights. She states that: "I am satisfied that Anne and Paul are a family within the meaning of Article 8 of the European Convention on Human Rights. Ireland has signed up to Article 8 and Anne is entitled to its full protection. This Court has the obligation and the power under Article 8 to require Michael to give Ann full information about their whereabout, and regular access to him." Michael wishes to appeal the order and seeks your advice as to whether there are any possible grounds of appeal under Irish constitutional law. Advise him.',
      },
      {
        examType: 'Problem',
        description:
          'The Oireachtas enacts the Regulation of Elections Act 2018. Constitutional, Regulation.',
        text: 'The Oireachtas enacts the Regulation of Elections Act 2018. Section 17 of the Act establishes a process for challenging the legality of an election result. Section 17(5) provides that a person wishing to challenge the legality of an election result must pay a deposit of €3,000. This will be refunded in the event that the challenge is successful. William is a self-employed childminder who has a monthly income of approximately €2,000. He has two children who live with him. He is concerned that a recent by-election held in his local area was tainted by one of the candidates exceeding the spending limits imposed by the Oireachtas. He wishes to challenge the results but is concerned about the deposit. He seeks your advice. Advise William as to: i. Whether there are any grounds in Irish constitutional law upon which he can challenge section 17(5). ii. What remedies might be ordered by a court if it finds section 17(5) to be unconstitutional.',
      },
      {
        examType: 'Essay',
        description:
          '"The limited impact which Article 42A has had suggests that the claims made for it were overstated.',
        text: '"The limited impact which Article 42A has had suggests that the claims made for it were overstated. The Constitution always protected the rights of children and nothing in the Article 42A changes how the courts deal with cases involving children." Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Essay',
        description:
          '"The Supreme Court\'s recent caselaw on Article 40.1 suggests that the Court is increasingly willing to adopt a stricter…',
        text: '"The Supreme Court\'s recent caselaw on Article 40.1 suggests that the Court is increasingly willing to adopt a stricter approach to the equality guarantee, especially for measures that can be said to affect human personality. Given that Article 40.1 has traditionally been seen as one of the weaker constitutional rights, this is long overdue. Do you agree? Give reasons for your answer.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2019,
    questions: [
      {
        examType: 'Problem',
        description:
          'Anthony is an academic with a strong interest in environmental issues. Constitutional.',
        text: 'Anthony is an academic with a strong interest in environmental issues. He is concerned to learn that the Government has recently signed an agreement with other states to investigate the possibility of developing floating nuclear power stations. As part of the agreement, the Government announces that is has approved the borrowing of €50 million by Ireland in order to fund the construction of the Galway Floating Nuclear Research facility. This borrowing was ordered by the Minister for Finance in the exercise of a power granted to him under section 2 of the Research and Development Act 2019 to "provide financial support in respect of the borrowings, liabilities and obligations of any research or educational institution where he is satisfied that that is in the public interest". Anthony wishes to challenge these developments. He seeks your advice as to whether there are any grounds of Irish constitutional law upon which he can challenge (i) the decision to sign the agreement [and]{.underline} (ii) the decision to borrow €50 million. Advise Anthony.',
      },
      {
        examType: 'Essay',
        description: '"Since its decision in Mallak v.',
        text: '"Since its decision in Mallak v. Minister for Justice, the Supreme Court has gradually Waterford down the obligation on decision-makers to give reasons for their actions." Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Essay',
        description: '"The Irish courts\' decisions in McKenna v.',
        text: '"The Irish courts\' decisions in McKenna v. An Taoiseach (No.2) [1995] 2 I.R. 10 and McCrystal v. Minister for Children [2012] IESC 53 are an inappropriate interference with the practical business of politics". Do you agree? Discuss with reference to the caselaw of the Irish courts.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on [TWO]{.underline} of the following FOUR decisions.',
        text: 'Write a short note on [TWO]{.underline} of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: i. M v Minister for Justice and Equality [2018] IESC 14. ii. Meadows v Minister for Justice [2010] 2 IR 701. iii. Re Article 26 and the Employment Equality Bill 1996 [1997] 2 I.R. 321. iv. Persona Digital Telephony Limited v. Minister for Public Enterprise [2017] IESC 27.',
      },
      {
        examType: 'Essay',
        description:
          'Paula was involved in a road traffic accident when a car she was driving collided with another vehicle.',
        text: 'Paula was involved in a road traffic accident when a car she was driving collided with another vehicle. She was a 17 year old learner driver at the time. Following the accident, a Garda officer attended at the scene and required her provide a blood sample to test for the presence of alcohol or other substances. It tested negative. She was not charged with any offence relating to the accident. Several years later, Paula applied for a job as a teaching assistant in a primary school. She was unsuccessful and requested feedback from the school. She received a letter from the school which stated: "We did not proceed to interview because we were informed by our local Garda that you had been involved in a road traffic accident where you were likely to have been driving under the influence of alcohol\'. Paula is shocked and upset by this. In particular, she is concerned about (i) whether the Garda may still be in the possession of the blood sample; and (ii) how the information came to be provided to the school. She seeks your advice as to whether there are any grounds of Irish constitutional law upon which she can challenge (i) the retention of her blood sample and (ii) the disclosure of this information.',
      },
      {
        examType: 'Problem',
        description:
          "Betty's house is searched by the Garda on foot of a warrant issued by a… Constitutional.",
        text: 'Betty\'s house is searched by the Garda on foot of a warrant issued by a local District Court judge. The Garda find a firearm which they believe has been used for criminal activities. Betty is charged with possession of the firearm, and conspiracy to commit robbery. However, it later emerges that the address of the property was incorrectly stated on the warrant. Betty lives at 12 Harbour Street whereas the warrant stated "12 Harbour Road". A Garda investigation into the mistake concludes that the sergeant in charge noticed the mistake a few minutes prior to the search commencing but decided to proceed with the search because of a concern that they had been seen, and that evidence might be moved or destroyed if they left the area. The sergeant also stated that he believed they would have had a power to enter the house at common law anyway because of their concerns about the destructions of evidence. Betty has asked for your advice as to whether there are any grounds of Irish constitutional law upon which she can challenge the admissibility of the evidence obtained during the search at her trial. Advise Betty.',
      },
      {
        examType: 'Essay',
        description:
          'The widespread belief that the Irish Constitution gives unusually strong protection to property rights, and that this…',
        text: 'The widespread belief that the Irish Constitution gives unusually strong protection to property rights, and that this makes and legislative regulation of property rights very difficult is overstated. The Constitution gives considerable latitude to the Oireachtas to enact measures that impact on property rights". Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Problem',
        description:
          'Michael is a member of a religious group that believe strongly in the… Constitutional.',
        text: "Michael is a member of a religious group that believe strongly in the importance of 'public worship'. All members of the group are required by the teachings of the group to wear a religious cross in a manner that is visible to all as a demonstration of their faith. Michael is employed by the Department of Agriculture. He is informed by his immediate supervisor one day that a new Department circular has banned all employees from wearing jewellery of any kind. The stated justification for the policy is to minimise the possibility of infections being spread to animals as a result of employees travelling from farm to farm. Michael's position does not require him to visit farms at any point. He asks his supervisor for an exemption but is informed that the policy applies to all staff in full. Michael is upset and wants to take judicial review proceedings challenging this refusal. He asked you if there are any constitutional grounds on which he can challenge the measure. Advise Michael.",
      },
      {
        examType: 'Problem',
        description:
          'The Oireachtas passes the Regulation of Emissions Act 2019. Regulation, Company.',
        text: 'The Oireachtas passes the Regulation of Emissions Act 2019. The Long Title of the Act states that its purpose is to "promote clean air and reduce harmful emissions". - Section 4 of the Act establishes the Emissions Control Agency. Section 4 (2) of the Act defines the Agency\'s functions as including "the achievement of the purposes of this Act". - Section 6 confers a power on the Agency to "impose such rules on procedures of emissions as are necessary to achieve the purposes of this Act". Section 6 (2) provides that "the powers are conferred by section 6 (1) may include the power to regulate emissions thresholds and all relevant powers". - Section 8 provides that a failure to comply with a provision of the Act, or any exercise of a power thereunder, is a criminal offence which can be prosecuted by the Agency. The Agency set strict limits on production of nitrous oxide, a substance which is linked to respiratory difficulties in children and elderly adults. When announcing these limits, the Agency indicate that they will impose penalties on companies deemed to be in breach of these rules. These penalties will include a formal warning being \'named and shamed\', and ultimately a financial penalty equal to 10% of a company\'s annual turnover. Diesel Fuels Ltd is warned by the Agency that it is in breach of the limits. When it fails to take steps to remedy the position, it is named and fined by the Agency. The Agency then initiates a criminal prosecution against Diesel Fuels Ltd. Diesel Fuels Ltd have asked to you advise them if there are any grounds upon which they could challenge the actions of the Agency. Advise them.',
      },
      {
        examType: 'Essay',
        description: 'Blanaid has funds of €150,000 in account at the Irish Banking Union.',
        text: 'Blanaid has funds of €150,000 in account at the Irish Banking Union. The money has been on deposit with the bank since she received it as a cash gift from an elderly relative. The elderly relative did not trust banks and never had a bank account. Blanaid makes a request to withdraw money from the account. However, the bank contacted her to say that the Revenue Regulation Bureau have frozen her account and that she cannot access it. The Bureau is established by the Revenue Regulation Act 2019. Section 4 of the Act provides that the Bureau can order a bank to cease all transactions on an account for a period up to 5 years where a Bureau official is "of the belief that an account warrants further investigation for reasons associated with the Act". The Act also provides that decisions of an official under section 4 are final. Blanaid contacts the Bureau seeking information about why her account has been frozen. She receives a short reply stating that "the Bureau has concerns about the account and is of the view that a section 4 order is necessary to allow those concerns to be investigated". It is also stated that the order will be in place "for an indefinite period of up to 5 years". Blanaid seeks your advice as to whether there are any grounds of Irish constitutional law upon which she can challenge (i) the section 4 order; and, if appropriate, (ii) the 2019 Act.',
      },
      {
        examType: 'Essay',
        description:
          '"Article 45 is a constitutional curiosity which, rather than signalling respect for the rights to which it refers, has…',
        text: '"Article 45 is a constitutional curiosity which, rather than signalling respect for the rights to which it refers, has instead discouraged the courts from giving them any kind of practical protection." Do you agree? Discuss this statement with reference to caselaw, as appropriate.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on [TWO]{.underline} of the following FOUR decisions.',
        text: 'Write a short note on [TWO]{.underline} of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: i. McCrystal v Minister for Children [2012] 2 IR 726; ii. C v Minister for Social Protection [2018] IESC 57; iii. Campaign to Separate Church and State Ltd v Minister for Education [1998] 3 IR 321; iv. Meskell v CIE [1973] IR 121.',
      },
      {
        examType: 'Essay',
        description:
          '"Irish constitutional law on equality has failed to reflect its importance as a value in modern Irish society".',
        text: '"Irish constitutional law on equality has failed to reflect its importance as a value in modern Irish society". Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Essay',
        description:
          '"The Supreme Court\'s recognition in NVH v Minister for Justice [2017] IESC 35 of a power to defer the making of a…',
        text: '"The Supreme Court\'s recognition in NVH v Minister for Justice [2017] IESC 35 of a power to defer the making of a declaration of unconstitutionally has the potential to radically alter the principles and practice of the constitutional litigation in Ireland". Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Essay',
        description:
          'The widespread view of the 1937 Constitution as a religious text is overstated.',
        text: 'The widespread view of the 1937 Constitution as a religious text is overstated. The parts of the Constitution that are expressed in strongly Catholic terms have had a less influence in practice than might have been expected". Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Problem',
        description:
          'Billy is a cricket player who has played internationally for the Scotland… Injunction, Constitutional.',
        text: "Billy is a cricket player who has played internationally for the Scotland cricket team. He has recently retired from the sport and is pursuing a career in coaching younger players in Ireland. He has been married to his wife Maria for a number of years but the marriage has been encountering difficulties and they have recently separated. Maria is a well known celebrity who regularly refers to her family life on her Instagram feed. She has recently given an interview to the Irish Daily News. In the course of the interview, she discusses her separation from Billy and claims that he was regularly aggressive towards her and towards their child. She claims that he has 'anger issues' and 'needs help'. The newspaper contacted Billy to inform him that it proposes to run the interview in the following day's newspaper and asking him for comments. He has contacted you seeking your advice as to the prospects under Irish constitutional law of securing an injunction preventing publication of the interview. Advise Billy.",
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2020,
    questions: [
      {
        examType: 'Essay',
        description:
          'Write a short note on [TWO]{.underline} of the following four decision of the Irish Courts.',
        text: 'Write a short note on [TWO]{.underline} of the following four decision of the Irish Courts. Explain, [in particular]{.underline}, the significance of the decision for Irish constitutional law i. Shatter v. Guerin [2019] IESC 9. ii. McCrystal v. Minister for Children [2012] IESC 53. iii. M v. Minister for Justice and Equality [2018] IESC 14. iv. DPP v. JC [2015] IESC 31.',
      },
      {
        examType: 'Problem',
        description: 'Compare and contrast the approach to Article 15 of the Constitution…',
        text: "Compare and contrast the approach to Article 15 of the Constitution adopted by the Supreme Court in Leontjava v. Minister for Justice [2004] 1 IR 591 and O'Sullivan v. Sea Fisheries Protection Authority [2017] IESC 75. In your answer, you should consider, in particular, whether there are any significant differences in the approach adopted, and what the implications of any such differences are for the application of Article 15. in the future.",
      },
      {
        examType: 'Problem',
        description:
          'In response to concerns about the long-term sustainability of pension… Constitutional.',
        text: "In response to concerns about the long-term sustainability of pension entitlements in Ireland, the Oireachtas enacts the Preservation of Pension Act 2020. The Act provides that: i. All employees over the age of 30 must pay a minimum of 20% of their gross income into a pension fund of their choice. ii. All Employers must pay a minimum of an additional 20% into their employee's pension funds. iii. All current persons in receipt of pensions must be means tested and will have their State pensions reduced if they are in receipt of an income of more than €85,000 per annum. The Hands Off Our Pension Pots organisation has approached you for advice as to the constitutionality of the legislation. Advise them as to whether there are potential grounds to challenge the Act on the measures at (i), (ii) and (iii).",
      },
      {
        examType: 'Essay',
        description:
          'The Supreme Court has found that the Protection of the Environment Act 2016 is unconstitutional as an interference with…',
        text: "The Supreme Court has found that the Protection of the Environment Act 2016 is unconstitutional as an interference with the property rights of landowners. The Act had obliged landowners to pay a levy, calculated on the basis of the number of non-planted trees which the relevant property was assessed as being capable of hosting. Proceeds from the levy were used to discharge the costs of a tree-planting programme. These funds have been discharged and the trees planted. Belinda was subject to the levy over a number of years and wishes to: i. Secure a re-payment of the monies paid by her in previous years; ii. Seek damages for the inconvenience and expense caused in paying the levy, which she believes led her to fall into debt and incur significant additional interest charges. Belinda has sought your advice as to the prospects of her being entitled to these remedies following the Supreme Court's finding of unconstitutionality.",
      },
      {
        examType: 'Essay',
        description:
          '"[I]t is clear that there remains a wide area of non-justiciability in respect of the actions of the Houses of their…',
        text: '"[I]t is clear that there remains a wide area of non-justiciability in respect of the actions of the Houses of their committees. First, it must be said that full effect needs to be given to the clear prohibitions which are expressly set out in the relevant Articles of the Constitution. Top make a member of a House of the Oireachtas amenable to a court in respect of something said in the House or in that committee, would be a clear breach of Article 15. It also seems to the Court to follow that that which cannot be achieved directly cannot be achieved by collateral means. It would clearly be impermissible to ask a court to intervene in a way which would, by necessary implication, require the Court to at least indirectly make a member amenable or breach a privilege conferred on a member. Thus, there is a clear area of non-justiciability which surrounds utterances made in the Houses or their committees or matters which are sufficiently closely connected to such utterances and to enjoy the same privileges and immunities". (Kerins v McGuinness [2019] IESC 11) Discuss whether and to what extent Irish constitutional law recognises a doctrine of non-justiciability. You should refer in your answer to relevant decisions of the Irish superior courts.',
      },
      {
        examType: 'Essay',
        description:
          'John and Paula are a married couple who have been living in Ireland for 1 year.',
        text: 'John and Paula are a married couple who have been living in Ireland for 1 year. Paula is Irish while John is a UK citizen. Following the departure of the UK from the European Union, controversy emerges over the treatment of EU citizens in the UK which prompts EU Member States to withdraw resident rights from UK citizens. John applies for permission to be allowed to stay in Ireland. This is refused on the basis that he has only been living in the jurisdiction for a short period. Paula is upset as she wishes to remain in Ireland but is unsure if she will be able to do so when she and John have decided that they want to have children very shortly. She seeks your advice as the whether there are any grounds of Irish constitutional law upon which she can challenge the decision and/or claim a right of residence for John.',
      },
      {
        examType: 'Essay',
        description: '"The decision of the Supreme Court in Gilchrist & Rogers v.',
        text: '"The decision of the Supreme Court in Gilchrist & Rogers v. Garda Commissioner [2017] IESC 18 is the death knell in the principle of open justice in Ireland". Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Problem',
        description:
          'Rachel suffered a serious injury as a result of negligence of a driver who… Negligenc, Damages.',
        text: 'Rachel suffered a serious injury as a result of negligence of a driver who crashed into her parents\' car. The medical advice is that she will suffer long-term consequences and will require expensive medical care for at least 40 years. It is unclear how much these costs may be but they have been loosely estimated at €500,000 per annum (or €20m over 40 years). The driver was insured so that there are, in principle, funds available to discharge these costs. Rachel has initiated a claim in negligence before the courts. Before her case is heard, the Oireachtas enacts the Capping of Insurance Costs Acts 2020. Section 1 of the Act provides that it applies "to all actions currently in being and subsequently initiated before the courts". Section 4 of the Act imposes a maximum cap on damages in a claim involving personal injuries of €10m. Rachel\'s guardian has asked you for the legal advice as to whether there are grounds of Irish constitutional law upon which she might challenge the Act, Advise her.',
      },
      {
        examType: 'Essay',
        description:
          '"The Supreme Court\'s decisions in Mohan v Ireland [2019] IESC 18 and P v Judges of the Circuit Court [2019] IESC 26…',
        text: '"The Supreme Court\'s decisions in Mohan v Ireland [2019] IESC 18 and P v Judges of the Circuit Court [2019] IESC 26 provide important clarifications on the rules relating to standing in Irish constitutional cases. In particular, the decisions highlight the ongoing significance of the jus tertii principle". Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Problem',
        description:
          'Gerry is a political commentator for a leading Irish newspaper. Constitutional.',
        text: 'Gerry is a political commentator for a leading Irish newspaper. He has recently published an article which suggests that the Government is about to make a court application to freeze accounts in a major Irish bank. The article is stated to be based on "information from a public official". The article leads to a run on all Irish banks. There are long queues outside branches across the country, with riots occurring in some locations when the bank branches lock their doors. The Government deny the story and announce that they are to hold an immediate preliminary inquiry into the incident. A retired judge is requested by the Government to produce a report within 8 weeks on: (i) How the information came into the possession of the journalist; (ii) (ii) Whether the failure to confirm the information was a prima facie breach of journalistic ethics; (iii) Whether a further enquiry or investigation was justified; and (iv) If so, what kind of investigation and sanctions might be involved. Gerry has asked for legal advice as to whether there are any grounds of Irish constitutional law upon which he can seek to prevent the holding of the inquiry. Advise Gerry.',
      },
      {
        examType: 'Essay',
        description:
          '"The decisions in Kerins v McGuinness [2019] IESC 11 and O\'Brien v Clerk of Dáil Eireann [2019] IESC 12 represented a…',
        text: '"The decisions in Kerins v McGuinness [2019] IESC 11 and O\'Brien v Clerk of Dáil Eireann [2019] IESC 12 represented a further encroachment by the courts on matters that are reserved by the Constitution to the Oireachtas". Do you agree? Discuss with reference to the caselaw of the Irish courts.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on TWO of the following FOUR decisions.',
        text: 'Write a short note on TWO of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: i. McGee v AG [1974] I.R. 284; ii. Roche v Roche [2010] 2 IR 321; iii. People (DPP) v Doyle [2017] IESC 1; iv. Connelly v An Bord Pleanála [2018] IESC 36.',
      },
      {
        examType: 'Problem',
        description:
          'The Oireachtas has enacted the Protection of Waterways Act 2020. Constitutional.',
        text: 'The Oireachtas has enacted the Protection of Waterways Act 2020. The Long Title of the Act states that it is "An Act to address the problem of over-fishing in Irish rivers; and to preserve the natural resources of the State in its fish stocks". Section 2 of the Act allows the Minister for the Environment to make a River Cessation Order. Such an Order "has the effect of prohibiting all fishing on the designated river for a minimum of 10 years, or such longer period as the Order may prescribe". Section 11 provides that a breach of such an Order is a criminal offence. Cathy\'s family\'s property does not adjoin their local river but the landowner has permitted them to fish there for decades. During the fishing season, Cathy sells the fish caught in her local farmer\'s market. She holds a 20-year trading licence in the market. This cost her €2500. The Minister has recently introduced a River Cessation Order for the local river for a 25-year period. Cathy is concerned about the loss of her family traditional pastime and the impact on their finances. She is also angry that she has paid for a licence which she now does not have the stock to use and for which there is no refund available. She requests your advice as to whether there are any grounds of Irish constitutional law upon which she might bring an action against the Act and/or the River Cessation Order. Advise Cathy.',
      },
      {
        examType: 'Essay',
        description:
          '"The Irish courts\' interpretation of the scope and content of the right to earn a livelihood means that it has limited,…',
        text: '"The Irish courts\' interpretation of the scope and content of the right to earn a livelihood means that it has limited, if any value, as a separate constitutional entitlement; and would more usefully be regarded as part of the Constitution\'s broad commitment to the protection of property rights". Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Problem',
        description:
          'The Oireachtas has enacted the Regulation of Political Lobbying Act 2020. Constitutional, Regulation.',
        text: 'The Oireachtas has enacted the Regulation of Political Lobbying Act 2020. The Act is described in its Long Title as \'An Act to regulate efforts to influence public policy in order to ensure the public interest in democracy\'. - Section 3 of the Act specifies that "any person engaged in an act intended to influence an elected representative to form a particular view on a matter of public policy" is required to enter their details on the Register of Policy Influencers. - Section 5 of the Act provides that the Minister for the Environment has the power to make "such regulations as appear appropriate for the Register of Policy Influencers". Following the enactment of the Act, the Minister issues the Register Regulations 2020. These impose a €750 fee for all applications to be entered on the Register. The Protection of Furry Friends Society is a group dedicated to the banning of fur products in Ireland. It is a small organisation funded by the subscriptions of its 25 members. Its efforts consist only in letter writing campaigns to TDs and Senators. The Society are concerned about the impact of the fee in its resources; and on any adverse publicity that it might attract from fur farm owners who have, up to now, been unaware of their actions. Advise the Society if there are any grounds of Irish constitutional law upon which it can challenge (i) the Act; and (ii) (ii) the Regulations.',
      },
      {
        examType: 'Essay',
        description:
          'Pádraig is a 21-year-old who has recently experienced a series of bereavements in his immediate family.',
        text: "Pádraig is a 21-year-old who has recently experienced a series of bereavements in his immediate family. Pádraig was previously diagnosed with a mild cognitive disability. He has begun drinking heavily and was recently hospitalised following an incident in which he fell off a bridge into a river and was rescued by a passer-by. During his time in the hospital, he has refused to engage with the doctors treating him. He has been observed by nurses to laugh at unusual times. The hospital are concerned about his mental well-being and decide to apply to the High Court to have him made a ward of court. The application is based solely on evidence from the hospital staff. The High Court grants the application and directs that Pádraig be detained in a secure unit and sedated until further notice. The hospital are told to make a fresh application to have him released when they believe his condition has improved. Pádraig's sister Jennifer is concerned about the situation and seeks your advice as to whether there are any grounds of constitutional law upon which she could seek to challenge the process that led to his detention.",
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2021,
    questions: [
      {
        examType: 'Essay',
        description:
          '"The creation of a Judicial Council with a power to sanction individual member of the judiciary is constitutionally…',
        text: '"The creation of a Judicial Council with a power to sanction individual member of the judiciary is constitutionally suspect in light of the commitment to judicial independence in Articles 35 and 36 of the constitution." Do you agree? Discuss, giving reasons for your answer.',
      },
      {
        examType: 'Problem',
        description: 'William is charged with assault. Constitutional.',
        text: "William is charged with assault. The alleged incidents occurred in May 1974 when William was 18 years old, and his alleged victim was 16. The allegation is that William assaulted another teenager in a local park in an argument after they had been drinking with another friend. At the trial, evidence is given by the alleged victim that he did not realise the seriousness of the injuries at the time and so did not attend at a hospital or doctor for medical treatment. The first time he attended at a doctor was 14 months later for ongoing headaches and dizziness. These had, in his evidence, commenced after the assault. He also gave evidence that he was afraid his parents would find out he had been drinking, and that it was only on the death of his father in 2015 that he had felt able to go the Gardai. William's legal representative sought to call evidence from the other friend who was present in the park at the time. However, that individual had died in a road traffic accident in 2018. The Gardai had not sought to interview or take evidence from him prior to this as the file was not allocated to an investigating officer until 2019. At the end of evidence, William's legal representatives applied to the trial judge for a direction that the trial could not proceed further on the basis that it was unfair due to the lapse of time. The trial judge rejects this. William is ultimately convicted. William seeks your advice as to whether there is any grounds of constitutional law upon which he can challenge his conviction. Advise William.",
      },
      {
        examType: 'Problem',
        description:
          'Paul is a member other organisation called the "Fighters for Freedom". Advise Paul.',
        text: 'Paul is a member other organisation called the "Fighters for Freedom". Members of the organisation believe that state institutions and laws are illegitimate as an interference with the freedom of individuals to live their life in whatever way they wish the only legal document which they recognize as legitimate is the constitution of Ireland. The organisation are planning to organise a series of marches in Dublin. They intend to blockade some of the main streets and hope that any delays cause will attract media attention and greater public interest. Section 4 (1) of the Utilisation of Public Space Act 2021 provides that any assembly by more than 10 persons in a public space which has the potential to cause inconvenience to others is unlawful. Section 4 (2) provides for an exemption to this where the organizers of the assembly are in possession of a permit from An Garda Siochana. Permits must be sought at least 60 days in advance and are subject to a fee of €1500. Paul and his associates do not recognize An Garda Siochana or the authority of the Act so refused to apply for permit. When the March begins the members are detained by An Garda Siochana and are charged with breaching Section 4 (1) of the Act. Paul seeks your advice as to whether there are grounds under the constitution upon which he can challenge his prosecution. Advise Paul.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on [TWO]{.underline} of the following FOUR decisions.',
        text: 'Write a short note on [TWO]{.underline} of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: i. Kerins v. McGuiness [2019] IESC 11. ii. Maher v. Minister for Agriculture and Food [2001] 2 I.R. 139. iii. In re Haughey [1971] IR 217. iv. McDonald v. Bord na gCon (No. 2) [1965] IR 217.',
      },
      {
        examType: 'Essay',
        description:
          '"The function of the Irish Courts is to uphold the Constitution, and that duty cannot be performed if the scope of…',
        text: '"The function of the Irish Courts is to uphold the Constitution, and that duty cannot be performed if the scope of rights protected under the Constitution is to be determined by the jurisprudence of [the ECHR] which is not established under the Constitution and has no obligation to uphold it. While it is to be expected that the two instruments guaranteeing rights considered fundamental would tend to cover much of the same ground, and the interpretation of one is often helpful in understanding similar provisions contained in the other, they are different instruments and there will be many areas, particularly at the margins (which are often the subject to litigation) where the approach, or substance, may be different." (O\'Donnell J, Simpson v Governor of Mountjoy [2019] IESC 81). Discuss, by reference to the above statement: i. The status of the ECHR in Irish law; and ii. The relationship between the ECHR and the Constitution.',
      },
      {
        examType: 'Problem',
        description:
          'Chris is informed that the Irish Veterinary Organisation, the governing… Constitutional.',
        text: 'Chris is informed that the Irish Veterinary Organisation, the governing body for vets in Ireland, has initiated disciplinary proceedings against him following the making of a complaint against him in respect of his treatment of a dog If the complaint is upheld, Chris is liable to be struck off the register of practicing vets for a period of five years. Chris is provided with a copy of the complaint and is invited to submit a written response within 14 days. The identity and other personal details are redacted from the complaint "to preserve the privacy and confidentiality of the complainant". The complaint alleges that Chris was careless in his treatment and handling of the dog; that he failed to diagnose an eye condition; and that the dog suffered irredeemable damage as a result. Chris isn\'t sure which dog to complaint relates to but submits a written denial, adding that no complaint of any kind like this was ever made to him. An oral hearing is then held before the disciplinary committee. Chris is informed that he may be accompanied by an official from the Irish Veterinary Union, the trade union body for Irish vets but not by illegal representative. At the start of the hearing, he is asked if he has anything further to add to his written statement. He said that he does not think there is anything to add at that point. The chairman of the disciplinary committee then announces the committee\'s decision to strike Chris from the register for two years, stating that the complaint is credible and we have not seen any relevant evidence to the contrary. Chris wishes to challenge this decision advise him as to whether there are any grounds of constitutional law upon which he could bring such a challenge.',
      },
      {
        examType: 'Essay',
        description:
          '"The increasing use by the Oireachtas of delegated legislation has given rise to a concern that parliamentary democracy…',
        text: '"The increasing use by the Oireachtas of delegated legislation has given rise to a concern that parliamentary democracy is being stealthily subverted and crucial decision-making powers being handed over to the unelected and unaccountable officials". Do you think that the Irish courts treatment of the non-delegation doctrine adequately addresses this concern?',
      },
      {
        examType: 'Problem',
        description:
          'The Public Health and Prevention of Communicable Diseases Act 2021… Constitutional, Regulation.',
        text: 'The Public Health and Prevention of Communicable Diseases Act 2021 provides for a system of detention of persons who are believed to be "at risk of having been infected with a communicable disease". A person can be classified as "at risk" by a public health official; or by falling into a category of persons who have been identified by the Minister of Health as an "at risk" category. This power is conferred on the Minister by section 4 of the Act which provides that the minister can designate "such categories of persons as are advised to him, and which he reasonably believes to be, comprised of persons who may have a communicable disease". Following a severe outbreak of swine flu in Portugal, the Minister enacts the Influenza Regulations Act 2021. These define persons as "at risk" if they arrive into Ireland from Portugal or have spent any time in Portugal in the previous 14 days. Jennifer is an Irish citizen who has spent the last six months working in a research station in the Antarctic. She has been working alone during that period. On her flight home, her plane is diverted to Portugal because my major storm in the Atlantic. The passengers do not disembark from the plane for the seven hours that it is it is in Portugal. A number of local ground crew present on the plane during the stop. When she arrives at Dublin airport, Jennifer is taken to a nearby army base which is being used to detain "at risk" persons. She is informed that she will be provided with her own accommodation, comprising a bedroom and kitchenette, for the next 14 days. Jennifer seeks your advice as to whether there are any ground of Irish constitutional law upon which he can challenge her detention. Advise Jennifer.',
      },
      {
        examType: 'Essay',
        description:
          'The (hypothetical) Ending Vehicle Emissions Act 2021 establishes a body known as Emission Elimination Ireland (EEI).',
        text: 'The (hypothetical) Ending Vehicle Emissions Act 2021 establishes a body known as Emission Elimination Ireland (EEI). Under section 1 of the Act, this body is charged with the function of "securing the elimination of unnecessary vehicle emissions in Ireland by promoting the use of zero-emission transport". Section 2 of the Act vests "all powers necessary for the performance of its function" in EEI. EEI establishes an \'Electric Haulage Advancement\' scheme. This aims to ensure that hauliers in Ireland are not using vehicles which generate a lot of pollution. EEI announces that this scheme will require all persons engaged in the commercial transport of goods to have all-electric vehicles within 3 years. John does occasional work helping local farmers to transport their produce at harvest time. He has recently purchased a new diesel vehicle for €25,000. This is the first vehicle he has purchased in 15 years. The scheme provides that any person who has purchased a non-electric vehicle in the last 10 years is entitled to tax relief on a new purchase. This is capped at a maximum of €12,500. John tries to sell his diesel vehicle to a local dealer but is only offered €2,500 on the basis that there is no market for vehicles that will be prohibited in the near future. John is upset at the scheme as he feels he has made a loss on his purchase. He requests your advice as to whether there are any grounds to challenge the Electric Haulage Advancement scheme under Irish constitutional law.',
      },
      {
        examType: 'Essay',
        description:
          '"The courts\' assertion of a power to judicially review decisions of the Oireachtas regarding its members undermines the…',
        text: '"The courts\' assertion of a power to judicially review decisions of the Oireachtas regarding its members undermines the independence and integrity of elected officials and is a threat to the democratic character of government". Do you agree? Give reasons for your answer. You must in your answer refer to decided cases of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          'The Minister for Justice is concerned about the damaging impact which the effect of a finding of unconstitutionality…',
        text: 'The Minister for Justice is concerned about the damaging impact which the effect of a finding of unconstitutionality can have upon the efficiency of government. She is particularly concerned about the situation where the courts declare an Act to be unconstitutional. She has asked you to prepare a report which will consider the following issues: i. The consequences under Irish constitutional law of the finding that an Act is unconstitutional for the persons who have brought the legal challenge. ii. The consequences under Irish constitutional law of the finding that an Act is unconstitutional for other persons who may have been affected in the past by the act. iii. The circumstances, if any, where the courts may decline to make an order that an Act must be invalidated immediately. iv. Whether there are any alternative remedies which it might be advisable to introduce. Provide a summary of your findings on each of these points.',
      },
      {
        examType: 'Essay',
        description:
          'Write a short note on [TWO]{.underline} of the following [FOUR]{.underline} decisions.',
        text: "Write a short note on [TWO]{.underline} of the following [FOUR]{.underline} decisions. Your answer should explain the significance of the decision for Irish constitutional law: i. Friends of the Irish Environment CLG [2020] IESC 49. ii. O'Sullivan v. Sea Fisheries Protection Authority [2017] 3 IR 751. iii. Pringle v. Ireland [2013] 3 I.R. 1. iv. Curtin v. Dail Eireann [2006] 2 IR 556.",
      },
      {
        examType: 'Essay',
        description:
          'The Constitution, as the fundamental law of the State, must be accepted, interpreted and construed according to the…',
        text: "The Constitution, as the fundamental law of the State, must be accepted, interpreted and construed according to the words which are used; and these words, where the meaning is plain and unambiguous, must be given their literal meaning. Of course, the Constitution must be looked at as a whole and not merely in parts and, where doubt or ambiguity exists, regard may be had to other provisions of the Constitution and to the situation which obtained and the laws which were in force when it was enacted. Plain words must, however, be given their plain meaning unless qualified or restricted by the Constitution itself. People (DPP) v. O'Shea [1982] IR 384, per O'Higgins CJ. Do you agree? Does this statement still accurately describe the courts' current approach to constitutional interpretation? You should refer in your answer to the decided cases of the Irish courts.",
      },
      {
        examType: 'Problem',
        description:
          'Wilma is charged with murder arising from an incident in June 2014 in… Constitutional, Murder.',
        text: "Wilma is charged with murder arising from an incident in June 2014 in which a Garda was knocked down by a stolen car. She has decided to plead not guilty. The prosecution case is that she was travelling in a stolen car driven by her husband William. The car was being chased by Gardai when the car did a u-turn and drove directly into the Garda car. William and one of the Gardai in the car were killed instantly. The prosecution case is that this was deliberate and pre-planned. The prosecution proposes to rely on text messages which an Garda read on Williams' phone at the scene. The trial is set down for hearing on May 27th, 2022. On January 5th, 2022, Wilma's solicitor writes to the Gardai seeking access to the phone to facilitate an examination of it. This is the first occasion that this access is sought. The Gardi no longer have the phone in their possession as it appears to have been lost at some point after 2015. Wilma asks for advice as to whether there are any grounds of Irish constitutional law upon which you can seek to prohibit her trial. Advise her.",
      },
      {
        examType: 'Problem',
        description:
          'Paul has been charged with an offence under the (hypothetical) s. Constitutional.',
        text: "Paul has been charged with an offence under the (hypothetical) s. 10 of the Waste and Pollution Act 2021 which provides simply that: \"It shall be an offence to fail to prevent waste from entering public waters\". Under section 20 of the same Act, the offence carries a potential fine of €25,000- or six-years imprisonment or both. The offence relates to a leakage from Pauls' sewage system into a neighboring stream. A neighbour complained to Irish Water that there was a smell from the stream. Irish Water engineers attended at the site and identified that waste was entering the stream from a property in the vicinity. Irish Water called to all of the properties to request access to inspect in order to identify the source of the waste. Paul was away on holiday so they were unable to gain access to his property. After a few days, the quality of the water continued to deteriorate and there was a concern that the waste could contaminate a larger river nearby. Gardai were called and gained access to Pauls' property by breaking the front door. They discovered that there was a leak in the pipe bringing waste from Pauls' property to the sewage system. When Paul returned from holidays, on 20th May, he was charged with breaching section 10 of the Waste and Pollution Act 2021. He was angry when he discovered that no effort had been made to contact him when the issue was first identified. He was also surprised that he could be charged with an offence for what appears to be a defect in the piping of which he was not aware. Advise Paul as to whether there is any basis in Irish constitutional law upon which he may challenge or prevent his prosecution.",
      },
      {
        examType: 'Problem',
        description:
          "Barbara is a physiotherapist with over 20 years' experience in general… Constitutional.",
        text: 'Barbara is a physiotherapist with over 20 years\' experience in general practice. She is a practicing Christian who believes that pharmacological treatment should be complemented by other practices that support the spiritual and psychological wellbeing of patients. As such, her physio practice offers a variety of evening classes such as yoga, meditation, breathing exercises and Bible reading. In January 2021, Barbara was contacted by the Physiotherapy Board to say that a patient has made a complaint against her and that they are considering suspension. Barbara requests details of the complaint. She is informed that the complaint was made by a patient who attended at her clinic and reported that he was "very uncomfortable by the presence in the waiting room of a timetable for a Bible reading class, as well as by the presence of a cross on the outside of the building". No complaint was made about the standard of care provided by Barbara. Barbara seeks your advice as to whether there are any grounds of Irish constitutional law upon which she can challenge the proposed suspension. Advise her.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2022,
    questions: [
      {
        examType: 'Essay',
        description:
          'Write a short note on [TWO]{.underline} of the following four decisions of the Irish courts.',
        text: 'Write a short note on [TWO]{.underline} of the following four decisions of the Irish courts. Explained, in particular, the significance of the decision for Irish constitutional law. I. McGee v A.G. [1974] I.R. 284. II. In re Article 26 and Part V of the Planning and Development Bill [2000] 2 IR 321. III. McCrystal v Minister for Children [2012] IESC 53. IV. Damache v Minister for Justice [2021] IESC 63.',
      },
      {
        examType: 'Problem',
        description: 'Compare and contrast the approach to article 15.2.1 of the Constitution…',
        text: 'Compare and contrast the approach to article 15.2.1 of the Constitution adopted by the Supreme Court in McGowan v Labour Court [2013] IESC 21 and NECI v Labour Court [2021] IESC 36. In your answer, you should consider, in particular, whether there are any significant differences in the approach adopted, and what the implications of any such differences are for the application of article 15.2.1 in the future.',
      },
      {
        examType: 'Problem',
        description:
          'The Oireachtas enacts the Climate Levy Act 2022 as part of a strategy to… Constitutional.',
        text: 'The Oireachtas enacts the Climate Levy Act 2022 as part of a strategy to ensure that "energy companies make a fair contribution to Ireland\'s climate change responsibilities". The Act comes into force on April 1st, 2021. Section 2 of the Act provides that a 25% levy will be applied to profits from any "excessive climate emissions". "Excessive climate emissions" is defined by Section 1 as "emissions beyond what would normally be expected of an efficient market operator". Decisions as to what emissions are excessive, and how the levy should be calculated, will be made by the Climate Levy Board, and are appealable to the High Court. You have been asked by the Irish Energy Providers Association (EPA) to consider whether the Act, or any part of the Act, might be capable of being challenged on constitutional grounds. You have also been asked to consider if the EPA could bring an action to challenge the constitutionality of the act. Advise the EPA',
      },
      {
        examType: 'Essay',
        description:
          '"The treatment of the criteria in McDonald [v Bord na gCon] as a checklist which must be minutely and precisely…',
        text: '"The treatment of the criteria in McDonald [v Bord na gCon] as a checklist which must be minutely and precisely complied with risks missing the wood for the trees. It also encourages an approach to drafting that could remove proceedings from the field of the administration of justice because of some small, and in truth insignificant, deviation from the checklist. That would be a triumph of form over substance". O\'Donnell J, Zalewski v WRC [2021] IESC 24 What are the implications of the supreme court\'s decision in Zalewski for how article 34.1 will be interpreted and applied in future cases? In your answer, you should refer to decided cases of Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'Section 27 of the Safe Spaces Act 2022 provides that a Garda not below the… Constitutional.',
        text: 'Section 27 of the Safe Spaces Act 2022 provides that a Garda not below the rank of Sergeant is entitled to "temporarily prohibit the display in a public place of any material which is likely, in his view, to intimidate, harass or otherwise adversely affect persons in the vicinity". A temporary probation order may last for 36 hours. A March is being organised by an atheist group to protest against the continued involvement of the Catholic Church in the primary education system. The march is intended to go from the local parish church to the nearby school. The day before the event, Kevin, the primary organiser, is contacted by the local Garda Sergeant to inform her that she has exercised her powers under section 27 to prohibit the march from going near the church and the school. The Sergeant states that she has viewed some of the proposed placards online, including ones which feature references to child abuse, and she believes them to be "provocative and likely to upset or offend". She informs Kevin that she believes that the material will be regarded as intimidating or harassing by churchgoers; And that it will be upsetting for children. The Garda Sergeant also indicates that the march can proceed in other parts of the town. Kevin has asked you whether there are grounds of Irish constitutional law on which he can challenge (i) the decision of the Sergeant and (ii) (ii) section 27. Advise Kevin.',
      },
      {
        examType: 'Problem',
        description: 'Paul was seriously injured in a road traffic accident. Injunction.',
        text: "Paul was seriously injured in a road traffic accident. He was taken to hospital where he showed initial signs of life. However, these symptoms came to an end after a few weeks. Since then, he has been in a medically induced coma for 18 months with very few signs of brain activity. His family disagrees about the approach to be taken to his care. His wife Mary insists that he had told her that he never intended to be on a life support machine and that it would be his wish to have the machine turned off. She has asked the hospital to give him a cocktail of drug which would ensure that he has a painless death. His mother and father opposed this course of action and are of the view that he may recover with time. Doctors have estimated that his chances of recovery are approximately 0.5%. His mother and father want to obtain an injunction preventing the hospital taking any steps to end Paul's life on the basis of Mary's instructions. They have asked you for advice about the attitude and Irish court may take to such an application. Advise them.",
      },
      {
        examType: 'Essay',
        description:
          '"The right to equality under the Constitution of Ireland is weak, subject to too many restrictions and has had little…',
        text: '"The right to equality under the Constitution of Ireland is weak, subject to too many restrictions and has had little impact in practice". Do you agree? Give reasons for your answer. In your answer, you should refer to decided cases of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'Jenny suffered personal injuries as a result of medical malpractice by a… Negligenc, Constitutional.',
        text: 'Jenny suffered personal injuries as a result of medical malpractice by a local doctor. She was contemplating bringing legal action against the doctor and the state as his employer; and had consulted a local solicitor about the proposed action. Before a decision is made, the Oireachtas enacts the Lowering Medical Insurance Costs Act 2022. This establishes a \'no-fault\' redress system for personal injuries due to medical negligence. Persons injured may apply to an Injury Calculation Agency. The Agency will identify the amount which it believes the person should receive. The amount is to be calculated by reference to "the medical care which the person has received and is likely to receive in the future". The amount is also subject to an overall total cap of €250,000. The Act provides that, from the date of its enactment, the bringing of actions for personal injuries to the courts is prohibited. Jenny is reluctant to submit to a new system and would prefer to have brought her case to the courts. You have been asked to advise her as to whether there are any grounds upon which she might be able to bring a constitutional challenge to the act comment or any part of it. Advise her.',
      },
      {
        examType: 'Essay',
        description:
          '"While the constitutional protection of the family under Articles 41 and 42 of the Constitution used to place a higher…',
        text: '"While the constitutional protection of the family under Articles 41 and 42 of the Constitution used to place a higher emphasis on the rights of parents rather than the welfare of children, the reverse is now true following the enactment of Article 42A." Do you agree? Give reasons for your answer, which should also be supported by reference to the decided cases of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'Ben is a 50-year-old man who was convicted of bombing of an embassy in… Constitutional, Company.',
        text: "Ben is a 50-year-old man who was convicted of bombing of an embassy in Dublin when he was 20 years old. At the time, Ben said that the attack was carried out as a political protest against the country's foreign policy. The attack received a great deal of media attention at the time. Ben was sentenced to 20 years in prison. Upon his release from prison, he moved to a new area and began a new life. He also changed his name from Ben George to George Benson. He is required to sign in with the Gardai in his locality every six months. He has a wife and one daughter, aged 2. Since his release, he has never been in trouble with the Gardai, and has refrained from all forms of political activity. Crime Shows Ltd, a television production company, propose to make a documentary about the bombing. They intend the programme to include material about Ben's new life, including secretly filmed footage of him with his new family in the street. Ben has asked you for advice about the remedies, if any, which he might have under Irish Constitutional law. Advise him.",
      },
      {
        examType: 'Essay',
        description:
          '"The doctrine of unenumerated rights has fallen into disuse, with the decision in [Friends of the Irish Environment v…',
        text: '"The doctrine of unenumerated rights has fallen into disuse, with the decision in [Friends of the Irish Environment v Government of Ireland [2002 IESC 49]{.underline} marking its final and permanent demise." Do you agree with this statement? Give reasons for your answer, which should also be supported by reference to the decided cases of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          "Controversy arises over the Government's decision to build a nuclear power… Constitutional.",
        text: "Controversy arises over the Government's decision to build a nuclear power station. It is rumoured in some reports that the original recommendation of the Minister for Energy was that the station should be built in the constituency of the Taoiseach, but that it was subsequently decided to build the station elsewhere. A Dail committee proposes to investigate the siting of the station. As part of their investigation, they would like access to a series of Government documents. In particular, they are eager to see copies of documents in which the Minister for Energy set out his opinion on the appropriate place for the station. Preliminary drafts of these documents were circulated to other members of the Cabinet. They were subsequently amended to reflect the views of these other Ministers. The amended versions were then used at the Cabinet meeting, at which the decision about the location of the plant was made. The Dail committee wants access to both the amended and draft versions of these documents. You have been asked to advise them of the possibility of obtaining such access, by reference to the principles of Irish Constitutional law.",
      },
      {
        examType: 'Essay',
        description: 'Write a short note on [TWO]{.underline} of the following FOUR decisions.',
        text: 'Write a short note on [TWO]{.underline} of the following FOUR decisions. Your answer should explain the significance of the decision for Irish Constitutional law: I. NECI v The Labour Court [2021] IESC 36. II. Zalewski v Adjudication Officer [2021] IESC 24. III. De Burca v AG [1976] IR 38. IV. State (Quinn) v Ryan [1965] IR 70.',
      },
      {
        examType: 'Essay',
        description:
          'International Sugar Distributors Limited is a major multinational food corporation which specialises in sweet goods.',
        text: 'International Sugar Distributors Limited is a major multinational food corporation which specialises in sweet goods. It employs 200 people in Ireland and has annual sales here in the region of €20m. One of its most well-known brands in Ireland is a drink called Sugar Rush. The drink contains 40% sugar. The product was first launched in 1984 and has been advertised since that time by a cartoon cat, also called Sugar Rush. The cat is a registered trademark. The Oireachtas passes the (hypothetical) Prevention of Childhood Obesity Act 2022. - Section 4 of the Act introduces a 500% levy on products comprising more than 20% sugar. The levy for products below the 20% threshold is 1% per 1% of sugar. - Section 11 of the Act prohibits any television or radio advertising of products comprising more than 20% sugar. International Sugar Distributors Limited seek your advice as to whether there are any grounds of Irish Constitutional law upon which they might challenge sections 4 and 11 of the Act.',
      },
      {
        examType: 'Problem',
        description:
          "'[In challenges to the constitutionality of an Act], the plaintiff cannot,… Constitutional.",
        text: "'[In challenges to the constitutionality of an Act], the plaintiff cannot, as it were, seek a general review of the legislation, which is under attack, but may rely only on such arguments as bear on his or her own personal circumstances'. Do you agree? Discuss this statement, with reference to the rules in Ireland on standing in constitutional cases.",
      },
      {
        examType: 'Problem',
        description:
          'Mary was convicted in December 2017 of the murder of her husband, Adam; in… Murder.',
        text: "Mary was convicted in December 2017 of the murder of her husband, Adam; in March of the same year. She was sentenced to life imprisonment and is currently serving that sentence in the Dochas Centre, Mountjoy Prison. Mary's conviction was based mainly on evidence gleaned during a search of the family home, No. 8 Williams Lane. It has recently been brought to her attention that the search warrant under which the home was entered and searched was for a different house in the same area -- No. 8 Williams Terrace. Mary's brother-in-law, Paul, lives at No. 7 Williams Terrace and it has emerged that the Gardai in fact suspected him of the murder and thought that they were searching his house at the time the warrant was executed. Mary is very hopeful that this information might be sufficient to gain her release from custody. Advise Mary on whether there are any (i) grounds; and (ii) (ii) procedures under the Constitution of Ireland upon which she could seek her release.",
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2023,
    questions: [
      {
        examType: 'Problem',
        description:
          'As a result of severe injuries sustained in a road traffic accident, Alice… Constitutional.',
        text: "As a result of severe injuries sustained in a road traffic accident, Alice has been in a coma for 15 years. The doctors are satisfied that she is not brain dead and feel that she may have a basic level of cognition. However, their professional opinion is that it is highly unlikely that she will ever awake from the coma. Alice's mother is 70. Her father is deceased. Her mother is concerned about what may happen to Alice after her death. She is also convinced that Alice would not wish to remain in a coma. Before her injuries, Alice had told her that she would \"hate to be cooped up inside for a long time\". Alice's mother asks the doctors if they can turn off the machine that assists her breathing. They refuse on the grounds that this would contravene her right to life. You have been asked to advise Alice's mother whether there are any alternative courses of action open to her under Irish constitutional law.",
      },
      {
        examType: 'Problem',
        description:
          'In response to concerns about the long-term sustainability of pension… Constitutional.',
        text: "In response to concerns about the long-term sustainability of pension entitlements in Ireland, the Oireachtas enacts the Preservation of Pension Act 2023. The Act provides that: i. All employees over the age of 30 must pay a minimum of 20% of their gross income into a pension fund of their choice. ii. ii. All employers must pay a minimum of an additional 20% into their employee's pension funds. iii. iii. All current persons in receipt of pensions must be means tested and will have their State pensions reduced if they are in receipt of an income of more than €85,000 per annum. The Hands Off Our Pension Pots organisation has approached you for advice as to the constitutionality of the legislation. Advise them as to whether there are potential grounds to challenge the Act on the measures at (i), (ii) and (iii).",
      },
      {
        examType: 'Essay',
        description:
          'The decision of the Supreme Court in Donnelly v Minister for Social Protection provides important clarification on the…',
        text: "The decision of the Supreme Court in Donnelly v Minister for Social Protection provides important clarification on the principles to be applied in what the Court described as a 'pure' equality challenge to legislation\". Do you agree with this statement? Give reasons for your answer, which should include a discussion of the Court's decision in Donnell.",
      },
      {
        examType: 'Problem',
        description:
          'The Oireachtas enacts the Prevention of Frivolous Litigation Act 2023. Constitutional.',
        text: 'The Oireachtas enacts the Prevention of Frivolous Litigation Act 2023. Section 2 of the Act provides that a person seeking to bring an application in respect of a "designated class of litigation" will have to obtain the permission of the High Court to do so. To grant permission, the High Court must be satisfied that the litigation is "highly likely to succeed", and that "its prosecution is in the public interest". Section 4 of the Act confers a power on the Minister for Justice to designate the class of litigation to be covered by section 2. This power must be exercised "having regard to the financial interests of the State, the necessity for balanced economic and social development, the protection of national heritage and natural resources, and the public interest in expeditious delivery of services". Section 5 of the Act provides that a litigant seeking to bring an action in respect of a "designated class of litigation" must lodge €5,000 in advance in the High Court to be available in the event that costs are awarded against the litigant. William has regularly brought actions in relation to various government decisions and is concerned that the Act may affect his entitlement to do so. You have been asked to advise him as to whether there are any grounds of Irish constitutional law on which he might challenge the legislation.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on TWO of the following FOUR decisions.',
        text: "Write a short note on TWO of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: (i) O'Doherty v Minister for Health (ii) Fleming v. Ireland [2013] IESC 19. (iii) NHV v Minister for Justice (iv) Murphy v. Attorney General [1982] I.R. 241",
      },
      {
        examType: 'Essay',
        description:
          '"The judicially-imposed rules relating to the conduct of referendum campaigns are overly intrusive and interfere with…',
        text: '"The judicially-imposed rules relating to the conduct of referendum campaigns are overly intrusive and interfere with the democratic rights of activists and citizens". Do you agree with this statement? Give reasons for your answer, referring as appropriate to the decided caselaw of the Irish courts.',
      },
      {
        examType: 'Essay',
        description:
          '"Article 45 is a politician\'s solution to the problem of socio-economic rights: a rhetorical flourish that has no legal…',
        text: '"Article 45 is a politician\'s solution to the problem of socio-economic rights: a rhetorical flourish that has no legal impact whatsoever. It should be replaced by legal commitments that are binding on the Government and the Oireachtas." Do you agree? Give reasons for your answer',
      },
      {
        examType: 'Essay',
        description:
          'Adrian is a member of the religious organisation, the Resurrection Club, which has a small presence in Ireland.',
        text: "Adrian is a member of the religious organisation, the Resurrection Club, which has a small presence in Ireland. One of the core beliefs of the group is that they must wear a special pin badge at all times. Every member is also subject to an obligation to recruit new members where possible. Adrian is employed by a state-run company in the transport sector. The company introduces a policy which prohibits the wearing of any jewellery or metallic objects. This is stated to be for health and safety reasons after an incident where an employee's necklace became caught in machinery. Wedding rings are exempt from the policy. Adrian continues to wear his pin badge. The company convene a disciplinary process to deal with the breach of rule",
      },
      {
        examType: 'Problem',
        description: 'William is a part-time honeymaker. Injunction, Constitutional.',
        text: 'William is a part-time honeymaker. He operates the business from his home, and has permission from the local authority to do so. In recent months, William\'s sales have been very low and he is concerned about the future of his business. He decides that he needs to advertise his business more widely but does not have the money to take out an advertisement in his local newspaper. He decides to use mobile advertising to attract passing trade. He erects a four foot high wooden board in land near his home with the consent of the landowner. He places lights on the board which spell out the phrase "Local honey for sale here". After two weeks, William\'s sales have increased substantially. However, his neighbour complains to the local authority about the fact that the sign is lit all day and night. William receives a letter from the local authority which states that the sign is contrary to a local by-law which prohibits "all forms of advertising, signage or sloganeering on private property". The letter requests that he remove the sign immediately. The letter also states that the local authority will apply for an injunction requiring the immediate removal of the sign if it has not been removed within 24 hours. William seeks your advice about whether there are any arguments available to him under Irish constitutional law which would allow him to keep the sign and/or to resist the council\'s application for an injunction. Advise him.',
      },
      {
        examType: 'Essay',
        description:
          '"As a figure who is close to the operation of Government but independent of it, the Attorney General occupies a curious…',
        text: '"As a figure who is close to the operation of Government but independent of it, the Attorney General occupies a curious but constitutionally vital role in Ireland\'s system of government." Discuss.',
      },
      {
        examType: 'Problem',
        description:
          'The Government announces that it intends to hold a referendum to change… Advise them if there are any grounds upon…',
        text: "The Government announces that it intends to hold a referendum to change the voting system for general elections to a 'first-past-the-post' system. Following the passing of the (hypothetical) 50th Amendment to the Constitution (Voting Reform) Act 2023 on August 30th, 2023, it is announced that the referendum will be held on December 1st, 2023. The Oireachtas votes to allow the Government €5 million to fund what is described as a \"citizen's educational update\" about Ireland's electoral system. This programme operates during the months of September and October. It involves radio and television broadcasts about the 'problems of Ireland's PR system', as well as a 'civic responsibility video' which all schoolchildren and recipients of social welfare and pension payments are obliged to watch. The programme concludes on October 15th, which is the same day that the writ for the referendum is moved by the Minister for the Environment. A small surplus in the programme is allocated to the two main political parties for the purposes of furthering civic education. Both parties are in favour of the proposed change to the Constitution. One of the parties uses the money to fund a poster campaign arguing for a Yes vote in the referendum. The other uses the money to fund the party leader's daily expenses, which includes the cost of travelling to meetings and other political events, some of which will be connected with the party's referendum campaign. The 'Citizens Against First-Past-the-Post' group are opposed to the referendum and are concerned about the way in which this money has been used. They have asked you to advise them if there are any grounds upon which they could challenge the legality of the expenditure by the Government and by both political parties. Advise them.",
      },
      {
        examType: 'Essay',
        description:
          'You are asked by the Minister for Justice, Equality and Law Reform to produce a report on the possible reform of the…',
        text: "You are asked by the Minister for Justice, Equality and Law Reform to produce a report on the possible reform of the provisions of the Constitution dealing with religion. This follows calls by a prominent group of atheists for all references to religion to be removed from the Constitution. This group has argued that the Constitution's protection of religion is outdated, unsuitable for a more secular society, and poses a threat to freedom of expression and of belief. You have been asked in your report to consider, in particular: a. The way in which the Irish courts have dealt with the provisions of the Constitution that deal with religion; b. The advantages and/or disadvantages of maintaining the provisions in their current form. c. The various options for reform or removal of these provisions. d. Any other matters which you may consider relevant.",
      },
      {
        examType: 'Problem',
        description:
          'The Oireachtas passes the Regulation of Tenant Rights Act 2023. Constitutional, Regulation.',
        text: 'The Oireachtas passes the Regulation of Tenant Rights Act 2023. Section 4 of the Act establishes the (hypothetical) Tenant Protection Board (\'the Board\'). Section 5 of the Act gives the Board the power to review and re-adjust the monthly rent owed to a landlord "where it believes it to be appropriate to do so". The Board will make up the difference between the amount paid by the tenant and that due under the original lease. Section 12 defines land on which a planning application for more than 10 houses has been allowed to expire within the previous 5 years as "ineffectively used". While this is not a criminal offence, the Board has the power to seize any ineffectively used land without compensation. Ann is a large land-owner in Dublin. She obtained planning permission for several developments in the period prior to 2008 but did not proceed to build any of the developments because of the fall in the value of property. The permission for each of these developments expired in the period from 2013-2018. Ann is concerned about the possibility of either section 5 or section 12 being applied to her. She has asked you to advise her as to whether there are any grounds of Irish constitutional law upon which she could challenge (i) section 5 and (ii) section 12.',
      },
      {
        examType: 'Problem',
        description:
          'Greg is arrested by the Gardai on suspicion of inciting public disorder. Constitutional.',
        text: 'Greg is arrested by the Gardai on suspicion of inciting public disorder. He was arrested by the Gardai near a student protest which had turned violent. Upon his arrest, he was found to be carrying a loudhailer and a Che Guevara poster. Section 15 of the (hypothetical) Public Order Act 2008 provides that: "In the course of a trial on a charge of inciting public disorder, adverse inferences may be drawn from the failure of an accused during questioning to provide an explanation for his possession of any item which might have been used to incite the said disorder." Section 16 of the Act provides that inference may also be drawn from the fact that an accused subsequently provides an explanation which was not provided to the Gardai during initial questioning. Section 25 provides that an inference may also be drawn from the possession of an item which, in the opinion of a Superintendent, reasonably suggests that the accused was involved in the commission of any offence under the Act. During questioning, the Gardai ask Greg why he had the loudhailer in his possession. Greg responds that he wishes to speak to his solicitor first. This request is made at 6pm. The Gardai phone his solicitor\'s office at 6.30pm and leave a message asking the solicitor to attend at the Gardai station. The solicitor does not receive the message until 9.30am the next morning. At 9am, Greg is released. He refused to answer any question without his solicitor present so has not provided any explanation to the Gardai for his possession of the loudhailer. At his summary trial in the District Court, the local Superintendent testifies that, in his opinion, possession of a Che Guevara poster "is usually consistent with support for student radicalism and a willingness to engage in violent demonstrations". The prosecution counsel also relies heavily on section 15 and 16 in urging the Court to convict Greg. Greg explains that he is involved in coaching a boys\' football team and had been using the loudhailer at a training session that evening. The District Court judge convicts Greg and sentences him to five months\' imprisonment. Greg wishes to challenge the decision immediately and seeks your advice about whether there are any grounds of Irish constitutional law upon which he could have his conviction judicially reviewed by the High Court. Advise Greg',
      },
      {
        examType: 'Essay',
        description:
          'Write a short note on TWO of the following FOUR decisions of the Irish courts.',
        text: "Write a short note on TWO of the following FOUR decisions of the Irish courts. (i) Quinn's Supermarket v. Attorney General [1972] 1 IR 1. (ii) Curtin v. Dáil Eireann [2006] 2 IR 556. (iii) O'Doherty & Waters v Minister for Health [2022] IESC 32. (iv) Costello v Government of Ireland [2022] IESC 44.",
      },
      {
        examType: 'Essay',
        description:
          '"The creation and evolution of a constitutional right to privacy is perhaps the most striking example of the way in…',
        text: '"The creation and evolution of a constitutional right to privacy is perhaps the most striking example of the way in which the Irish courts\' treatment of the Constitution as a living instrument has evolved and changed over time". Do you agree? Discuss with reference to the caselaw of the Irish courts on the right to privacy.',
      },
    ],
  },
  {
    subject: 'Constitutional Law',
    year: 2024,
    questions: [
      {
        examType: 'Problem',
        description:
          'Padraig is a farmer who owns a significant portion of land on the edge of… Constitutional.',
        text: 'Padraig is a farmer who owns a significant portion of land on the edge of Mullingar. The land is valued at €1.5m. He applies for planning permission for a housing development on the land. The permission is granted and the land is put up for sale. A developer agrees to buy the site for €2m. However, when the sale goes through, Padraig is surprised to learn that the payment is subject to a 50% withholding tax so that he only receives €1m. When he queries this with his local TD, he is told that the tax is to "allow the State to take a share of the profits created by the grant of planning permission". He also finds the Minister\'s statement in the Dáil to explain this in which the Minister says that the tax will "mean we get something back from greedy capitalists who are making money off the misery of the Irish people". Padraig is annoyed at this and asks for your advice on (i) whether there are any grounds of Irish constitutional law upon which he can challenge the tax; and (ii) whether the Minister\'s statements will be useful to him in that challenge. Advise Padraig.',
      },
      {
        examType: 'Essay',
        description: 'Blanaid has funds of €150,000 in an account at the Irish Banking Union.',
        text: 'Blanaid has funds of €150,000 in an account at the Irish Banking Union. The money has been on deposit with the bank since she received it as a cash gift from an elderly relative. The elderly relative did not trust banks and never had a bank account. Blanaid makes a request to withdraw money from the account. However, the bank contact her to say that the Revenue Regulation Bureau have frozen her account and that she cannot access it. The Bureau is established by the Revenue Regulation Act 2023. Section 4 of the Act provides that the Bureau can order a bank to cease all transactions on an account for a period up to 5 years where an Bureau official is "of the belief that an account warrants further investigation for reasons associated with the Act". The Act also provides that decisions of an official under section 4 are final. Blanaid contacts the Bureau seeking information about why her account has been frozen. She receives a short reply stating that "the Bureau has concerns about the account and is of the view that a section 4 order is necessary to allow those concerns to be investigated". It is also stated that the order will be in place "for an indefinite period of up to 5 years". Blanaid seeks your advice as to whether there are any grounds of Irish constitutional law upon which she can challenge (i) the section 4 order; and, if appropriate, (ii) the 2023 Act.',
      },
      {
        examType: 'Problem',
        description:
          'You learn that the Government has called an election for January 2025. Constitutional.',
        text: 'You learn that the Government has called an election for January 2025. It is proposed that the constituencies for this upcoming election will be identical to those used in the 2020 election. These had been based on the results of a census taken in 2015. Results of a census carried out in January 2024 have however disclosed substantial population changes in a number of constituencies. Nationally, the average ratio of TDs to voters is 1:28,000. However, Dublin East is a three seat constituency with a population of 91,500. Its ratio of 1:30,500 is a deviation of approximately 9% from the national average. Furthermore, the constituency of Kildare Central has a population of 90,000 but elects a total of four TDs. Mark is a constituent in Dublin East who questions the constitutionality of the proposed constituency arrangements. Advise Mark.',
      },
      {
        examType: 'Essay',
        description: 'Write a short note on TWO of the following FOUR decisions.',
        text: 'Write a short note on TWO of the following FOUR decisions. Your answer should explain the significance of the decision for Irish constitutional law: i. DPP v. Quirke [2023] IESC 5. ii. ii. HAH v SAA [2017] IESC 40. iii. In re Haughey [1971] IR 217. iv. State (Nicolaou) v An Bord Uachtála [1966] IR 567.',
      },
      {
        examType: 'Essay',
        description:
          '"The Supreme Court\'s judgments in Heneghan v Minister for Housing [2023] IESC 7 represent a clear rejection of the…',
        text: '"The Supreme Court\'s judgments in Heneghan v Minister for Housing [2023] IESC 7 represent a clear rejection of the literal approach to constitutional interpretation". Do you agree? Give reasons for your answer.',
      },
      {
        examType: 'Problem',
        description: 'Eithne is a widowed mother of seven children. Constitutional.',
        text: "Eithne is a widowed mother of seven children. She is not in full-time employment and has applied to her local authority for housing for her family. She is particularly hopeful as she knows that a four-bedroom unit has recently become available in her neighbourhood. The local council apply a policy in accordance with which preference for housing is given to married couples with children. The council decide to allocate the house which Eithne wanted to a couple who are married and who have a 16 year old son. Eithne is very upset by this. She wants to know if the council's decision can be challenged under Irish constitutional law. Advise her.",
      },
      {
        examType: 'Essay',
        description:
          '"The obligations on the State to defend and vindicate the person under Article 40.3.2 has been interpreted by the Irish…',
        text: '"The obligations on the State to defend and vindicate the person under Article 40.3.2 has been interpreted by the Irish courts in a narrow and disappointing manner. A more expansive right to personhood would be a welcome development in Irish constitutional law". Do you agree? Support your argument, where appropriate, with reference to the relevant provisions of the Constitution and caselaw of the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'Gregory is a journalist working for the Daily Recorder newspaper. Constitutional.',
        text: 'Gregory is a journalist working for the Daily Recorder newspaper. One day, he receives an envelope in the post containing copies of a plan by the military to overthrow the Irish government and establish martial law. There is no indication of who sent Gregory the material except for the postmark which records that it was posted in Dundalk the previous day. Following a publication of a story about the attempted coup, the Minister for Defence launches an inquiry into the possibility that members of the army have been plotting to overthrow the government. The inquiry is to be headed by a High Court judge and will have "such powers as are vested in the High Court concerning the calling of witnesses and evidence". The inquiry asks Gregory to answer questions concerning his knowledge of the plans. Gregory refuses on the grounds that this could lead to the identification of his sources. The judge heading the inquiry rules that Gregory can be compelled to answer questions on the basis that: i. The military plot threatened public order and the security of the State and this is a legitimate basis to make an order compelling Gregory to answer questions asked. ii. Gregory had referred in his article to the circumstances in which he came into possession of the material and so had waived any privilege he may have had. iii. If the circumstances referred to in the article are those which Gregory would refer to under oath, then the material disclosed would not lead to the identification of the individual or individuals who supplied Gregory with the material. Gregory wishes to appeal this ruling to the High Court, as is provided for by the statute governing the inquiry. He has asked for your advice as to whether there are any grounds of Irish constitutional law which he might rely on in his appeal. Advise Gregory. **',
      },
    ],
  },
];

async function main() {
  console.log('🌱 Starting past questions seed...\n');

  console.log('🗑️  Wiping related records...');
  await prisma.quizAttempt.deleteMany({});
  await prisma.questionAttempt.deleteMany({});
  await prisma.essayAttempt.deleteMany({});
  await prisma.timedSession.deleteMany({});
  await prisma.question.deleteMany({ where: { type: 'ESSAY' } });
  console.log('✅ Essay questions cleared\n');

  let totalSeeded = 0;

  for (const entry of pastQuestions) {
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
  for (const entry of pastQuestions) {
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
