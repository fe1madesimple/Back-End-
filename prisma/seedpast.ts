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
  {
    subject: 'Criminal Law',
    year: 2014,
    questions: [
      {
        examType: 'Problem',
        description:
          'Declan, an accountant, suffers from paranoia and manic psychotic episodes. Advise Declan on his possible criminal…',
        text: 'Declan, an accountant, suffers from paranoia and manic psychotic episodes. He has recently lost his job and had become more and more psychotic and paranoid. He decided to plant a bomb in a bank in Dublin city centre. Taking care to conceal the bomb and his identity, he placed the bomb under a desk in the reception area of the bank. There was no one in this reception area when he planted the bomb. The bomb exploded later that day, causing extensive damage to the building. It was very fortunate that no one was killed, though a number of people suffered serious-non-life threatening injuries. It seems that the bomb had been timed to explode when the bank was at its busiest. However, a fault in the timer caused the bomb to explode in the late afternoon when there were less people in the bank. On his arrest Declan explained that he had been "urged by God to punish the bankers and those who use banks for what they did to the Irish nation". It emerged in evidence that had anybody been in the room at the relevant time he would have desisted from planting the bomb. Advise Declan on his possible criminal liability.',
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions as to the sexual offences… Director.',
        text: "Advise the Director of Public Prosecutions as to the sexual offences charges, if any, that might be brought to [each]{.underline} of the following four cases, referring to appropriate law, and giving reasons for your advice: (i) Niamh is a 16 year old girl who has consensual sexual intercourse with Tom, a 21 year old university student, who she met in a nightclub in Galway. Tom genuinely believed that Niamh was 18 years of age. When Niamh's parents discovered what happened, they rang the Gardaí. (ii) Michael has been sentenced to a five year term of imprisonment. He is taken to Cork prison. Two nights into his detention, his cell mate, Lee, woke him up. Lee had placed a cup in a sock and was threatening to use it as a weapon. He promised Michael that he would 'beat him black and blue' with it, unless Michael performed oral intercourse on him. Michael was very afraid of Lee, as he had a reputation for violence. He engaged in oral intercourse with Lee. (iii) David went to an area frequented by prostitutes. He met with Jersey who worked as a prostitute. David did not have any money but decided that he wanted free sexual gratification. He grabbed Jersey and groped her breasts and buttocks. He then attempted to have sexual intercourse with her, but ran away when a passer-by came to her assistance. Jersey was horrified and reported the matter to the Gardaí. (iv) Frank has known Annie for a number of years. They both live in Tralee. Frank is 40 years of age and single. Annie is 35 years of age and has cerebral palsy with a moderate degree of mental impairment. She works in the local pharmacy. Frank met Annie at a local GAA event. The spent the evening chatting, and got on very well. Frank walked Annie home and they had consensual sexual intercourse in the sitting room of Annie's parents' house. They agreed to meet up again for a coffee later that week. After saying goodnight to Frank, Annie went and told her mother about her new boyfriend. Her mother immediately rang the Gardaí.",
      },
      {
        examType: 'Problem',
        description:
          'Noel is an animal lover and is vehemently opposed to blood sports in… Advise Noel.',
        text: 'Noel is an animal lover and is vehemently opposed to blood sports in Ireland. He lives in an area of Tipperary where there is a strong tradition of hare coursing and hunting of wild animals. Noel has recently criticized blood sports and those who engage in it in an article in a local newspaper. He claims that blood sports are most uncivilised and anyone who watches or engages in such activity is cruel and barbaric. This has stirred up a lot of local reaction, most of which was unfavourable to Noel. One evening a few weeks later, after a local hare coursing event, one of the participants, Tom took a hare which had been badly injured in the in the course of the event and threw it into Noel\'s front garden. Noel happened to be digging a flower bed in his front garden at the time and saw Tom throwing the injured hare. In a rage, he ran at Tom and hit him with the spade he had in his hand. Tom was killed by the blow of the spade. When questioned by the Gardaí, Noel said that he just "completely lost it" when he saw what Tom had done. Advise Noel.',
      },
      {
        examType: 'Problem',
        description: 'Luke and his girlfriend Mary went to a nightclub in Galway to celebrate…',
        text: "Luke and his girlfriend Mary went to a nightclub in Galway to celebrate going out together for six months. Jim was also present in the nightclub. He used to be Mary's boyfriend, until she decided to leave him because of his heavy drinking and his tendency to be controlling of her. Jim had a lot to drink on the evening in question. When he saw Luke and Mary dancing together and appearing to be very happy, he went on to the dance floor and stuck a pint glass into Luke's face. He also threatened to kill Mary. The impact of the pint glass caused severe lacerations to Luke's face. He will have a permanent facial scar as a result of the incident. Jim has been arrested and formally charged in relation to the incident that occurred in the nightclub in Galway. He wishes to make an application for bail. Jim has a long line of previous convictions and the Gardaí are of the opinion that there is also a strong possibility that he will flee the jurisdiction if he is given bail. Advise Jim on his possible criminal liability [and]{.underline} on his bail application.",
      },
      {
        examType: 'Essay',
        description: "'The criminal law, in general, does not penalize a failure to act.",
        text: '\'The criminal law, in general, does not penalize a failure to act. It focuses for the most part on prohibiting certain conduct rather than requiring individuals to do particular acts. As was noted in R v Paine (The Times, February 25, 1980): "If I see a man, who is not under my charge, taking up a tumble of poison. I should not become guilty of any crime by not stopping him. I am under no legal obligation to protect a stranger." With reference to appropriate law, critically discuss this statement.',
      },
      {
        examType: 'Problem',
        description:
          'Sean, Shane, Ray and Eoin are four friends who live in Donegal. Advise Sean, Shane, Ray and Eoin on their possible…',
        text: "Sean, Shane, Ray and Eoin are four friends who live in Donegal. All are unemployed and in need of some money to go on their holidays to Magaluf. The four friends decided to break-in to the house of a wealthy lawyer, Lawrence, who lives in Letterkenny. They agreed that they would steal all the valuables that they could find and would share the spoils. They also agreed that they would not use any force during the break-in, though each man brought a large wrench with him for protection. The plan was that Shane would not enter the house - he would remain in the car outside, and would act as the getaway driver. On the night of the break-in, Shane parked the getaway car near Lawrence's house. Sean, Ray and Eoin got out of the car and approached the house. At this point Sean's conscience got the better of him. He decided to go home, telling the other men that he had a migraine. Ray and Eoin decided to continue with their plan. They entered the house by breaking a window on the ground floor. They started to put all the valuables they could find into bin bags. They were just about to leave, when Ray decided to go upstairs to 'mess up Lawrence'. Eoin pleaded with him not to, but Ray ignored him. He went upstairs and hit Lawrence repeatedly with the wrench. He then locked Lawrence in his own bathroom. Ray and Eoin then left the house with the bags of valuables. They got into the car driven by Shane and drove away at high speed. Lawrence was badly hurt, but he knew that his three young children were sleeping in their bedrooms. Unaware that Ray and Eoin had left his house, he decided to try to get out the upstairs bathroom window and climb across the roof to one of his daughter's bedrooms. Unfortunately he slipped and fell to the ground. He died from the injuries he suffered in the fall. Advise Sean, Shane, Ray and Eoin on their possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'Larry has a business producing wood pellets in Waterford. Advise Larry on the criminal law on strict liability.',
        text: 'Larry has a business producing wood pellets in Waterford. He has a large diesel tank located outside his premises and near to a river. The diesel in the tank is regulated by a tap. There is no lock on the tap and it is relatively easy for anyone to access it. One evening, an unknown person or persons-but thought to be young people in the local area-opened the tap. Roughly 800 gallons of diesel flowed into the river causing it to pollute. As a result a large number of fish were killed, and their spawning grounds were damaged. Larry is now being prosecuted under the Fisheries Consolidation Act, 1959, as amended, for "permitting or causing to fall onto any waters deleterious matter". Larry asks you to discuss his potential criminal liability. In particular he wants to know how he could be criminally liable when he lacked any intention and took all reasonable care to avoid the entry of pollutants into the river. He thought that a person had to be mentally culpable for a wrongdoing before he or she could be held criminally liable in Ireland. With reference to appropriate law, advise Larry on the criminal law on strict liability.',
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions as to the charges, if any, that… Company, Director.',
        text: "Advise the Director of Public Prosecutions as to the charges, if any, that might be brought in [each]{.underline} of the following four cases, referring to appropriate law, and giving reasons for your advice: (i) John brought his new girlfriend, Helen, to a very expensive restaurant in Cork. After eating the meal, John told Helen that he had already paid for everything. They then both left the restaurant together. John had not in fact paid for the meal. (ii) Kevin took an expensive book from a shop shelf, and replaced its existing price with a label showing a lower price. He then took the book to the checkout and purchased it at the lower price. (iii) Tríona was having a coffee with a friend in a city centre hotel in Limerick. She had her handbag on the floor beside her chair. Suddenly, a rough-looking man, Liam, who was lurking about the place, threatened Tríona with a syringe. He then grabbed her handbag and ran away-with it. (iv) Kenneth worked as a supervisor in a company. One of his duties was to make out cheques in relation to the work related activity of the company. These cheques were then signed by his boss. Kenneth has fallen behind on his credit card payments. One morning he made a cheque payable to himself for €500. He then forged his boss's signature on the cheque and cashed it in his local grocery store.",
      },
    ],
  },
  {
    subject: 'Criminal Law',
    year: 2015,
    questions: [
      {
        examType: 'Problem',
        description:
          'James a drug addict arranged to meet Ian at a snooker club in Dublin. Advise James on his possible criminal liability.',
        text: 'James a drug addict arranged to meet Ian at a snooker club in Dublin. Once Ian walked into the club, James shot him with a sawn-off shotgun. Ian sustained one gunshot wound to the right hand side of the head. He remained in a permanent vegetative state for two years, before he died. The immediate cause of his death was bronchial pneumonia brought about as a result of being in a permanent vegetative state. There was consensus amongst the ·medical professionals who gave evidence at the trial that infections, mostly of the kidneys and the lungs, such as pneumonia , are common in individuals in a permanent vegetative state. James claims in his defence that he owed money to a notorious drug gang in Dublin. They told him that if he killed Ian, a member of a rival drug gang, his drug debt would be forgiven. He claims that they also told him that if he did not kill Ian, he (James) would be killed, and his mother and sister would be brutally raped. Advise James on his possible criminal liability.',
      },
      {
        examType: 'Problem',
        description:
          "Jim and Maria spent the evening at Maria's apartment watching DVDs. Advise Jim on his possible criminal liability.",
        text: "Jim and Maria spent the evening at Maria's apartment watching DVDs. They had one glass of Martini each. They both fell asleep on the couch. At some point during the evening, Jim hit Maria over the head with a bottle and then grasped her around the throat. When she cried out he appeared to come: to his senses and showed great anxiety over what he had done. He called for an ambulance for Maria, who had been severely cut on the head. She was also very traumatised, and believes that Jim's behaviour was 'quite out of character'. Jim claims he was sleepwalking when he attached Maria. He remembered waking up, coming into focus and feeling confused. It then dawned on him that he was holding Maria down on the floor. He had no memory of hitting her with the bottle or of grabbing her by the throat and holding her down. He claims that he had a blackout. Advise Jim on his possible criminal liability.",
      },
      {
        examType: 'Essay',
        description:
          "'An attempt consists of an act done by the accused with a specific intent to commit a particular crime;...it must go…",
        text: "'An attempt consists of an act done by the accused with a specific intent to commit a particular crime;...it must go beyond mere preparation, and must be a direct movement towards the commission after the preparations have been made; some such act is required, and if it only remotely leads to the commission of the offence and is not immediately connected therewith, it cannot be considered as an attempt to commit an offence.' People (Attorney General) v Thornton [1952] 1 IR 91, per Haugh J at p. 93. With reference to appropriate law, critically discuss the law on criminal attempt in the light of this statement.",
      },
      {
        examType: 'Problem',
        description:
          'Advise the OPP as to the criminal charges, if any, that may be brought in… Advise the OPP as to the criminal charges,…',
        text: "Advise the OPP as to the criminal charges, if any, that may be brought in both of the foll.owing situations; (i) Lucy, a 25 year old woman, has grown tired of being inactive. She decided to get some exercise by taking up swimming. On her first visit to the club, she met Mark, the very friendly swimming instructor. In instructing Lucy how to swim during her first lesson, he touched her breasts and buttocks on several occasions. Lucy was very embarrassed by this experience. Lucy decided not to go to swimming lessons anymore. Over the next couple of weeks, however, Mark texted her on more than 40 occasions requesting a date. He has also been seen outside her house twice. When she texted back refusing a date, Mark rang her mobile on three separate occasions but refused to speak each time Lucy answered. She only heard the sound of heavy breathing, which really frightened her. (ii) Tom is the local bank manager. He is approached by Tina, an attractive middle­ aged woman who has a gambling addiction. She is seeking a loan of €30, 000 to repay a loan shark. Tom tells her that he will give her the loan on normal terms if she has anal intercourse with him. Though horrified, Tina reluctantly agrees to this as she desperately wants the money. After engaging in anal intercourse with Tom, Tina reported the matter to the Gardaí. Whilst investigating the complaint, it also came to the Gardaí's attention that Tom recently had sexual intercourse with Mary, a 23 year old woman with an intellectual disability. Tom does not deny having sexual intercourse with Mary but claims that she fully consented.",
      },
      {
        examType: 'Problem',
        description:
          'One evening you an instructed to meet your client Tara at the local Garda… Advise Tara.',
        text: 'You are a solicitor. One evening you an instructed to meet your client Tara at the local Garda station. Tara has been detained for questioning at the station on suspicion of having killed her boyfriend, Luke. Upon arrival at the station you are afforded the opportunity to confer with your client. Tara does not understand how she can be detained when she has not been charged with an actual offence. She asks you to give her an explanation. Tara is also wondering whether or not you can sit in on the Garda questioning and whether or not she has to answer Garda questions. In particular, she would like you to explain to her the right to silence as it applies in Ireland. Advise Tara.',
      },
      {
        examType: 'Problem',
        description:
          'Kevin, a very handsome though troubled 24 year old, met Lisa, a 15 year… Advise Kevin on his possible criminal…',
        text: "Kevin, a very handsome though troubled 24 year old, met Lisa, a 15 year old, after a disco in Terenure. Lisa was very taken with Kevin. She invited him back to her parent's house. Kevin went with her. Lisa assured him that all of her family were asleep upstairs. Whilst she was making him a cup of tea in the kitchen, Kevin went into the sitting room of the house. He stuffed an expensive necklace and a wallet - which he discovered on a sitting room table - into a rucksack that he had with him. He then went back into the kitchen. Kevin found Lisa to be spoilt and immature. When she said she had to go to the toilet he followed her and locked the door behind him so that Lisa was not free to leave. He then put the key in his pocket. Lisa found this odd and scary, and she was unsure what to do. Kevin then began to kiss her very forcibly and to remove her clothes. He then had sexual intercourse with Lisa. She claims that she was completely overwhelmed and was too intimidated and traumatised to resist, particularly given that the door of the toilet was locked. Before leaving the house, Kevin then told Lisa that he would kill her if she told anyone that he had been in her house. It seems that Kevin is currently out on bail awaiting trial in respect of a number of burglary and robbery charges. :... Though Kevin was completely dominant in respect of the relations that took place in the bathroom, he will claim that it was entirely consensual and that he would have stopped if Lisa had requested him to do so. He will also claim that he only locked the door 'for a bit of fun' and that he would have opened the door if Lisa had requested it. He does not deny that he threatened to kill Lisa, but claims that he only did it to frighten her and that he would never kill her. Advise Kevin on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'Advise on [both]{.underline} of the following : (i) Peter is a member of a… Director.',
        text: "Advise on [both]{.underline} of the following : (i) Peter is a member of a crime gang and has been charged with a number of serious offences including possession of a firearm, threats to kill, and robbery. The Director of Public Prosecutions has requested that he be sent forward for trial to the Special Criminal Court. Peter thought he had a right to a jury trial in Ireland when charged with a serious criminal offence, and does not understand how he can be sent forward for trial to a non-jury court. He asks you to explain to him the jurisdiction and composition of the Special Criminal Court. (ii) Sean was found guilty of the rape of Lisa after a trial in the Central Criminal Court. Sean has always vehemently denied the charge. In sentencing him, the trial judge was heavily influenced by Sean's individual circumstances which included his troubled background, alcohol difficulties and the fact that this was his first offence. A six year suspended sentence was imposed. The Director of Public Prosecutions has taken the view that the sentence imposed was very lenient having regard to the offence committed, and that undue credit was given by the trial judge to the mitigating factors in the case. After the trial, Sean's legal team discovered new evidence that indicates that he may have been innocent of the offence. Discuss and outline the composition and jurisdiction of the court to which the Director of Public Prosecutions and Sean's legal team can appeal, paying particular attention to the issues raised.",
      },
      {
        examType: 'Problem',
        description: "'It seems to me clear that a proceeding, the course of which permits the…",
        text: "'It seems to me clear that a proceeding, the course of which permits the detent ion of the person concerned , the bringing of him into custody to a Garda station, the entry of a charge in all respects appropriate to the charge of a criminal offence, the searching of the person detained and the examination of papers and other things found upon him, the bringing of him before a District Justice in custody , the admission to bail to stand his trial and the detention in custody if bail be not granted or is not forthcoming, the imposition of a pecuniary penalty with the liability to imprisonment if the penalty is not paid has all the indicia of a criminal charge .' Melling v O'Mathghamhna [1962] IR 1 at 9 per Lavery J. With reference to appropriate law, discuss and outline how criminal law is defined in Ireland.",
      },
      {
        examType: 'Essay',
        description:
          'Write a note on [both]{.underline} of the following: (i) Charleton J in Joel v OPP ([2012] IEHC 295) stated that…',
        text: "Write a note on [both]{.underline} of the following: (i) Charleton J in Joel v OPP ([2012] IEHC 295) stated that 'criminally negligent manslaughter arises where the death of another person is caused in circumstances which objectively amount to a very high degree of negligence and which, in the circumstances in question, to any reasonable person the fact that a serious risk was unjustifiably taken with the life of another would be apparent'. With reference to appropriate law, discuss this statement (ii) Discuss and outline the criminal law in Ireland as it relates to sexual relations with person with a disability.",
      },
      {
        examType: 'Problem',
        description:
          'Edward was charged with assaulting David in October 2014. Mens Rea, Actus Reus.',
        text: 'Edward was charged with assaulting David in October 2014. In November 2011, Edward allegedly made a statement threatening David. As a result, he was also charged with an offence under s41 of the Criminal Justice Act 1999, which provides that an act carried out by A person that harms or threatens, menaces or in any other way intimidates a person assisting in the investigation of an offence shall be evidence of an intention to interfere with the course of justice. Section 41(3) provides as follows: "In proceedings for an offence under this section, proof to the satisfaction of the court or jury, as the case may be, that the accused did an act referred to...shall be evidence that the act was done with the intention required..." Edward believes that section 41(3) is contrary to the presumption of innocence as it allows evidence of the actus reus of an offence to also be evidence of the mens rea, and that, therefore, the prosecution was no longer required to prove their case beyond reasonable doubt. He asks you to explain to him, with reference to appropriate law, the presumption of innocence as it exists in Irish law, and how it might apply in this particular instance. Advise Edward.',
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions on the possible criminal… Director.',
        text: "Advise the Director of Public Prosecutions on the possible criminal liability arising in all four of the following scenarios: a) Sharon needed to go into hospital for brain surgery. Since she would be away for two weeks, she decided to give her valuable painting by Jack B. Yeats to her lifelong friend, Carmel, for safekeeping. Unfortunately Sharon's surgery has not been a complete success and her memory has been impaired. She has forgotten that she has given the painting to Carmel. Realising this, Carmel decides to say nothing about it and continues to maintain possession of the painting. b) Larry is a computer engineering graduate. He has always held a grievance against the University of Mullingar where he graduated with a very high 2(i) degree. Larry always felt that he should have been awarded a first class honours degree, to reflect 'his genius and creativity'. He hacked into the university's secure computer network, and altered the overall award he received so that it presented as a first class honours award. c) Tom likes to live the high life, though unfortunately his means do not align with his attraction to grandeur and opulence. One evening, he decided to impress his friend Mary by taking her to the Manor, the most expensive hotel in Cork, for a nice meal. Once they finished their meal, Tom insisted on being the gentleman by paying for the meal. He asked for the bill and pretended to pay at the bar. Instead of paying, however, Tom only engaged the barman in friendly conversation. He then returned to Mary, and they both walked out of the hotel. The hotel manager discovered what had happened and rang the Gardai. It seems that Tom has a habit of not paying his hotel and restaurant bills in Cork. d) Patricia and Joan are neighbours. Joan likes Patricia, though she knows that Patricia has criminal tendencies. One evening, Patricia ran into Joan's house. She handed a small package to Joan, requesting that Joan hide the package for a few days. Joan is a good neighbour and did what she was asked without questioning Patricia. She hid the package under her bed. The package contained four valuable stolen watches. Unfortunately for Joan, the Gardai saw Patricia entering Joan's house. They lawfully entered Joan's house, and discovered the package containing the stolen watches (for the purposes of this scenario, you need only advise the Director of Public Prosecutions on the possible criminal liability of Joan).",
      },
      {
        examType: 'Problem',
        description:
          'Liam, an 80 year old man, lives alone on an isolated farm in Sligo. Director.',
        text: "Liam, an 80 year old man, lives alone on an isolated farm in Sligo. One night Noel and Eamon, who also live in the locality, targeted his house in the belief that Liam kept a substantial amount of money under his mattress. Noel and Eamon owe a gambling debt and decided that a 'soft burglary' would help them clear it. They had never committed a crime before, but felt that Liam would be an easy target given his age and the fact that he lived alone in an isolated area. They entered Liam's farmhouse by breaking a window on the ground floor. They were wearing balaclavas, and brought a shotgun and holdall bags with them. They also possessed duct tape, some rope and a knife. Their intention was to frighten Liam a little, and take the money under the mattress. It was not their intention to physically hurt Liam. Liam's dog started to bark once they broke the window. Liam woke immediately and grabbed the double barrel gun which he kept by his bedside. He also grabbed some spare shotgun cartridges. He ran down stairs and fired immediately at the intruders. The first cartridge hit - Noel in the head, killing him instantly. Eamon, shocked at this, attempted to get out the window they had broken, but he was shot in the shoulder by Liam. He lay screaming on the ground. Liam calmly reloaded the shotgun and shot Eamon in the head, killing him. He then searched his property to see if there were other intruders. When he was satisfied that his property was secure and that his life was not under threat, he rang the Gardai. He was shocked and very saddened when he discovered that the intruders were Eamon and Noel. Advise the Director of Public Prosecutions on Liam's possible criminal liability.",
      },
      {
        examType: 'Problem',
        description: '"The modern approach to mistake eschews the requirement that mistakes must…',
        text: '"The modern approach to mistake eschews the requirement that mistakes must approximate to the normal pattern of inductive reasoning. Mistake is conceptualised as a simple - knowledge deficit without moral implications. The guiding principle is that where an offence requires knowledge of a given circumstance, a defendant who is ignorant of the relevant circumstance has not committed the offence so defined. Whether his ignorance is due to mistake or failure to investigate the facts is irrelevant, since in either case the result - lack of knowledge - is the same." F McAuley, (1996) \'The Grammar of Mistake in Criminal Law\' Irish Jurist Vol. .XXXI, 56- 82 at 67. Critically discuss the defence of mistake in Irish criminal law in the light of this statement.',
      },
      {
        examType: 'Problem',
        description:
          'Denis, a Mayo football fan, is a very mild mannered, inoffensive… Advise Denis on his possible criminal liability.',
        text: "Denis, a Mayo football fan, is a very mild mannered, inoffensive individual. He suffers from severe migraines and is required to take powerful painkillers to alleviate the symptoms. He has been warned by his doctor not to combine alcohol with this medication. Whilst attending the All Ireland football final, Denis developed a migraine. He took the painkillers and continued to watch the match. Surprisingly Mayo won. Denis could not contain his excitement and went to the pub with friends where he drank five pints of beer. The combination of alcohol and medication has a powerful intoxicating effect on Denis. He approached Mary, a friend, and squeezed her buttocks and breasts. She was horrified and very embarrassed. He also exposed himself to a group of five women in the pub. They were shocked by his behaviour. At this point, Denis was asked to leave the pub. As he was being escorted out by James, the pub manager, Denis bit off the top of his (James) ear, and spat it on the ground. Denis took a taxi home where his wife, Anne, was asleep in bed. Denis demanded 'his right to marital intercourse'. When Anne refused, Denis had non-consensual sexual intercourse with her. When Denis woke up the next morning, he had no recollection of what had happened the day before. He is horrified and deeply embarrassed when the full details are revealed to him. Advise Denis on his possible criminal liability.",
      },
      {
        examType: 'Essay',
        description:
          '"There is an abundance of empirical decisions upon particular instances of conduct which has been held to constitute…',
        text: '"There is an abundance of empirical decisions upon particular instances of conduct which has been held to constitute contempt of court. There is a dearth of rational explanation or analysis of the general concept of contempt of court which is common to the cases where it has been found to exist." Attorney General v Times Newspapers Ltd. [1974] AC 273 a 308, per Denham J. Discuss and outline the criminal law on contempt of court in Ireland in the light of this statement.',
      },
      {
        examType: 'Problem',
        description:
          'Peter, a politician, was invited to open a new library in Ballylongford. Advise on the possible criminal liability…',
        text: "Peter, a politician, was invited to open a new library in Ballylongford. He turned up at the appropriate time, but his speech was interrupted by an angry group of 30 people (who refer to themselves as People against Politicians) who are disillusioned by politicians in Ireland. Matters quickly turned nasty. The crowd of 30 people rushed the stage. They overturned tables and chairs, and threw glasses and bottles. Peter, fearing for his safety, attempted to leave the event as quickly as possible. As he tried to leave, he was met by Seamus and Linda, the ringleaders of the group, who -threatened that they would kill Peter if he did not resign from politics. Peter was then pushed into the hallway of the library and was prevented from leaving. He was confined in this hallway for about three hours. He eventually managed to escape, and ran to his car. He was spotted, however, by Michael, another member of the People against Politicians protest group. He threw a breeze block at Peter. Fortunately the block missed Peter, but it hit his car, causing extensive damage to the windscreen. When Peter got home, he received 20 or so calls from Larry, another member of the group. Larry said nothing when Peter answered the phone, but he did intend that his silent calls would cause fear. Over the past two days, Larry has also been seen on nine separate occasions outside Peter's house, standing in silent protest. Larry's phone calls and silent presence has caused Peter great distress. Advise on the possible criminal liability arising in this fact pattern.",
      },
    ],
  },
  {
    subject: 'Criminal Law',
    year: 2016,
    questions: [
      {
        examType: 'Problem',
        description: 'Your client, William, has been charged with an offence of assault under…',
        text: 'You are a solicitor. Your client, William, has been charged with an offence of assault under section 3 of the Non-Fatal Offences against the Person Act 1997. William is accused of attacking an elderly man, Frank, in Athlone. He is alleged to have struck Frank on the head with a cider bottle. Section 3 is a hybrid offence. A person guilty of an offence under the section shall be liable on summary conviction to imprisonment for a term not exceeding 12 months or to a fine not exceeding £1,500, or to both, or on conviction on indictment to a fine or to imprisonment for a term not exceeding 5 years or to both. The prosecutor has initially determined that the charge should be prosecuted summarily. A District Court judge, however, was not satisfied that the offence was minor in nature and so refused jurisdiction to try the offence summarily. It now appears that William will be sent forward for trial on indictment. William does not understand the significance of the offence being classified as indictable or summary, minor or non-minor. He asks you to explain the classification of criminal offences to him with reference to appropriate case law and legislation.',
      },
      {
        examType: 'Problem',
        description:
          'Lawrence and Kevin are friends. Advise Lawrence on his possible criminal liability.',
        text: "Lawrence and Kevin are friends. They both are members of a drug gang in Galway. The gang is run by a notoriously cruel individual, Noel. It appears that Kevin has recently become a Garda informant, providing vital information on the gang and its activities. When Noel finds this out, he orders Lawrence to kill Kevin. Lawrence at first refuses,explaining that they are friends. Noel told Lawrence that if he continued to refuse to undertake the order, 'both he and his family would be wiped out'. In the circumstances Lawrence believes that he has no option but to kill Kevin. He convinces himself .that it is a case of 'kill or be killed'. Lawrence knew that Kevin would be at a local football match that evening. He approached Kevin and shot him at point-blank range. The bullet lodged in Kevin's brain, but he did not die from his injuries. Instead he has .been left in a permanent vegetative state. When Lawrence was arrested for the crime, he confessed to shooting Kevin but claimed that the leader of the gang, Noel, had threatened his life and the lives of his family. Advise Lawrence on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'as to the criminal charges, if any,that may be brought in all of the… Advise the D.',
        text: "Advise the D.P.P. as to the criminal charges, if any,that may be brought in all of the following four situations: (i) Tara was talking on her new A.pple lphone6 in Carlow. She was approached by Fergus, a drug addict, who threatened her with a blood- filled syringe. Tara was shocked by the suddenness of the threat. Fergus then grabbed her phone and ran away with it. (ii) Linda is infatuated with Eddie. She has sent him 20 or so text messages a day over the last six months. At first Eddie found this somewhat flattering, but he has become increasingly concerned about Linda's conduct. He has repeatedly asked her to stop sending him text messages, but to no avail. Over the past two days, Linda has been seen on five separate occasions outside Eddie's house. This has caused Eddie to suffer a mild nervous breakdown. (iii) One night Sean went out celebrating his third level exam results with some friends in Waterford. For a dare, he ran across some parked cars in Parnell Street, causing some minor damage to wing mirrors and windscreen wipers. He also lay down in the middle of the road, forcing passing motorists to swerve to avoid him. (iv) Declan saw his friend, John; commit a serious assault on Maria. He was called upon as a prosecution witness to give evidence in the trial of the offence. In order to save his friend, Declan lied under oath in the witness box. In particular, he claimed that he 'did not see John do anything wrong to Maria'.",
      },
      {
        examType: 'Problem',
        description:
          'His job is very busy and stressful. Advise Denis on his possible criminal liability.',
        text: "Denis is a surgeon in Cork. His job is very busy and stressful. He often parties very hard to alleviate the pressures of work. After a particularly stressful day, Denis decided to go to the pub where he consumed 12 pints of beer. As he left the pub, he was approached by a student, Con, who was looking for directions to the university's halls of residence. Denis mistook Con's simple request for information· as an aggressive act. He punched Con in the face. Startled by the punch, Con fell backwards hitting his head off a concrete step. Con suffered a traumatic brain injury, and lost consciousness immediately. He died two days later as a result of his injuries. Denis was shocked when he heard what he had done. He claims that if he had been sober he would never have considered attacking con. Advise Denis on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'Martin, Sean, Ray, David, and Roddy are friends and all play rugby for a… Advise Martin, Sean, Ray, David, and Roddy on…',
        text: "Martin, Sean, Ray, David, and Roddy are friends and all play rugby for a team in Donegal. After a game in Dublin, Martin met Mary in a nightclub and brought her back to his hotel room where they had consensual sexual intercourse. Martin then fell asleep in the room. Shortly afterwards, all of his friends entered Martin's room and invited Mary to have sex with them. Mary told them that she would not have sexual intercourse with any of them. Sean then told Mary that all of the group of men were going to have sexual intercourse with her, and that all four would claim that it was consensual (Martin was still asleep). Sean then looked at the other three men. All nodded, which Sean took as agreement. He then started to forcibly remove Mary's clothes. Ray held Mary as Sean removed her clothes. At this point David said 'he wanted nothing to do with what was about to happen'. He left the bedroom and went for a drink in the hotel bar. Ray followed David to see if he was alright. Neither David nor Ray returned to the hotel bedroom that evening. Sean then had intercourse with Mary who was too frightened to resist. Roddy just watched silently, but did not attempt to have sexual relations with Mary. Roddy, it transpires, is gay and was entirely disinterested in having sexual relations with Mary. When Sean and Roddy fell asleep, Mary fled from the hotel room and quickly informed the Gardaí about what had happened'. Mary is 16 years of age. Advise Martin, Sean, Ray, David, and Roddy on their possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          "'Central to strict liability is the dilution of the normal requirement… Mens Rea.",
        text: "'Central to strict liability is the dilution of the normal requirement that the accused's conduct be accompanied by a mens rea. The concerns of liberty and fairness which underlie a general requirement of culpability are dispensed with in the interests of some other social goal. Thus, apparently innocuous and inadvertent conduct may result in conviction even where the accused was unaware of the circumstances which made his conduct criminal or where he took all reasonable efforts to avoid the mischief at which the law is directed.' F McAuley and P McCutcheon, Criminal Liability (2000), p. 314. Using relevant legal authority to support your answer, critically discuss this statement.",
      },
      {
        examType: 'Problem',
        description:
          'Liam is an active member of a radical environmental group. Constitutional, Director.',
        text: "Liam is an active member of a radical environmental group. He is very anxious about rising sea levels. He believes that the political community has not taken the· issue seriously. When a senior politician, Michael, visited his house looking for his vote in the next general election, Liam invited him in for a cup of herbal tea. Michael took up the offer, but he quickly rued that decision. Once he stepped inside the house, Liam quickly pushed him into his office and locked the door. He then tied Michael to a chair and forced him to look at tide gauge readings and satellite measurements which demonstrated how the Global Mean Sea Level has risen over the last number of years. Michael was held against his will for a full six hours. He was only released when he signed a statement to say that he would 'do everything in his power to save planet Earth'. Liam has been charged with false imprisonment. The Director of Public Prosecutions has also certified that the ordinary courts are inadequate to secure the effective administration of justice in his case and he has been sent forward for trial to the Special Criminal Court. Liam cannot understand this because he did not physically harm Michael. He is not a terrorist and thought that he had a constitutional right to a jury trial. He asks you to advise him on [both]{.underline} of the following: (i) the law as it relates to false imprisonment in Ireland. (ii) the scope, composition and jurisdiction of the Special Criminal Court.",
      },
      {
        examType: 'Problem',
        description: 'You are a solicitor working in Kilkenny. Constitutional.',
        text: 'You are a solicitor working in Kilkenny. One evening you are instructed to meet your client at the local Garda station. Your client, Peter, has been arrested and is being detained for questioning without charge at the local Garda station. Peter is suspected of a serious assault as provided for under section 4 of the Non-Fatal Offences Against the Person Act 1997, but when he was arrested he was not told of the reasons for his arrest. Upon your arrival at the station, you are afforded the opportunity to confer with your client. Peter does not understand how he can be detained when he has not been charged with any actual offence. He asks you to give him an explanation particularly in the light of his constitutional right to liberty. Peter is also wondering if he has to answer any Garda questions while he is detained in Garda custody. If Icharged with the offence, Peter is also anxious about bail. He already has convictions for a number of serious assaults, one of which was committed while he was previously on bail. Advise Peter on the issues that arise relating to: (i) The arrest. (ii) The law relating to detention without charge. (iii) His right to silence in Garda custody. (iv) Any possible bail application',
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions as to the offence charges, if… Director.',
        text: "Advise the Director of Public Prosecutions as to the offence charges, if any, that might be brought in each of the fodlowöng two cases, referring to appropriate law, and giving reasons for your advice: (i) Liam and Sean are to testify for the prosecution in an upcoming case in which Mirium is charged with the possession of drugs with intent to supply. Both men met and agreed to give consistent but false evidence under oath in the witness box to help ensure that Mirium would be convicted. The case against Miriurn subsequently collapsed when it was discovered that the controlled drugs at issue in the case had been 'planted' in her home. Liam and Sean never gave testimony in the case. (ii) William has four previous convictions for rape. Despite long prison sentences, he has not changed his ways. One evening, while in a park in Cork, he spotted Jean jogging. He pushed her from behind and dragged her in to a wooded area. He placed his hand over Jean's mouth and forcibly removed her clothes. Fortunately another jogger saw what happened and alerted other passers-by who went to the scene. They detained William until the Gardai arrived. Jean was very startled and upset by what happened. She was bruised and scratched from the forceful removal of her clothes, but no sexual penetration had occurred.",
      },
      {
        examType: 'Problem',
        description:
          'Kevin, a 12 year old boy, was assaulted by two other boys, Tom and Tieman,… Advise Kevin on his possible criminal…',
        text: "Kevin, a 12 year old boy, was assaulted by two other boys, Tom and Tieman, who are both aged 14, as he went home from a summer camp on carpentry. Both boys pushed Kevin against a wall, and punched him repeatedly in the stomach and face. The attack was unprovoked. Kevin responded by grabbing a screwdriver from his bag. When Tom saw this, he backed off, but Kevin stepped forward and stabbed him in the thigh with the screwdriver. The cut was deep and partially served Tom's femoral artery. Tom limped away, and took refuge in a nearby disused garage. He did not seek help or apply pressure to the wound. He lost consciousness after three minutes. When Tiernan saw Kevin stabbing Tom, he attempted to run across the road to get away. He did so without looking to see whether there was any traffic on the road. Unfortunately he was hit by a passing motorist, Steven, who was driving with due care and attention. Tieman hit his head hard off the ground. At this point, Kevin ran home. Steven tended to Tiernan who was unconscious. He rang for an ambulance. When it arrived, Steven followed the blood trail and discovered Tom. He immediately called for the assistance of the ambulance crew. Unfortunately Tom had bled to death. Tiernan has suffered a frontal lobe injury which will permanently impair his functioning and his personality. Advise Kevin on his possible criminal liability.",
      },
      {
        examType: 'Essay',
        description:
          'With reference to appropriate law, discuss the scope, composition and jurisdiction of ago of the criminal courts in…',
        text: 'With reference to appropriate law, discuss the scope, composition and jurisdiction of ago of the criminal courts in Ireland.',
      },
      {
        examType: 'Problem',
        description:
          'Patricia, Margaret and Lilly all live in the same neighbourhood in… Advise Margaret and Patricia on their possible…',
        text: "Patricia, Margaret and Lilly all live in the same neighbourhood in Waterford. Margaret is a kind neighbour. It is well known that she has schizophrenia. She has successfully managed the illness for years. Recently, however, she has become more chaotic and disorganised in her thinking, and is increasingly finding it difficult to differentiate between what is reaf and unreal. She lives in dread of returning to an approved unit and she likes the freedom that living in the community provides. Patricia is very jealous of Lilly and is always looking for ways to undermine her. She also knows that Margret's ability to function has recently become more impaired. Patricia told Margaret that Lilly had said that she (Margaret) was a 'terrible blight on the locality and that she (Lilly) was going to recommend that she should be removed to an approved unit under the care of the HSE'. Lilly never said this and Patricia knew that what she said to Margaret was untrue. Patricia also told Margaret that it was time for her to put Lilly back in her box with a good slap'. Margaret would ordinarily never hurt Lilly, but she has an obsessive fear of being forced to go to an approved unit. She went directly around to Lilly's house. When Lilly opened the door, Margaret punched her, breaking her jaw. She then locked Lilly in a bathroom whilst she broke all the furniture in the sitting room. She then set fire to Lilly's car, with the result that it was completely engulfed in flames. At this point, Margaret went home. Other concerned neighbours immediately went to see how she was. They found her to be incoherent, irrational in her thoughts, and obsessively repeating the mantra that 'she did not want to go back to hospital'. Advise Margaret and Patricia on their possible criminal liability.",
      },
      {
        examType: 'Problem',
        description: 'You are asked to advise your clients on the criminal procedure issues…',
        text: "You are a solicitor. You are asked to advise your clients on the criminal procedure issues arising in [both]{.underline} of the following scenarios. (i) Pat was driving in Waterford when he was stopped by Garda Cleary. Garda Cleary searched his car and discovered a holdall bag containing a quantity of cannabis. Pat was immediately taken to a Garda station in Waterford where he was detained under section 4 of the Criminal Justice Act 1984, as amended. It appears however that Pat was not expressly informed that he was under arrest. Nor was he informed of the statutory powers upon which the actual arrest was made. Pat wants to know if his arrest is unlawful. (ii) Larry was charged with offences under Safety, Health and Welfare at Work Act 2005. He is surprised by the wording of section 81 of the Act which provides that 'in any proceedings for an offence under any of the relevant provisions consisting of e failure to comply with a duty or requirement to do something so far as is practicable or so far as is reasonably practicable, or to use the best practicable means to do something, it shall be for the accused to prove (as the case may be) that it was not practicable or not reasonably practicable to do more than was in fact done to satisfy the duty or requirement'. Larry was under the assumption that an accused party was under no obligation to prove anything in a criminal trial. He asks you to explain to him the presumption of innocence in Irish law, and how it would apply in relation to section 81 of the Safety, Health and Welfare at Work Act 2005.",
      },
      {
        examType: 'Essay',
        description: 'In Clifford v DPP [2008] IEHC 322 Charlton J.',
        text: 'In Clifford v DPP [2008] IEHC 322 Charlton J. noted that recklessness can be defined as "subjectively taking a serious risk, involving high moral culpability, that his conduct will bring about the wrong defined by the charge. For an accused to be reckless, it must occur to the mind of the accused that his conduct will bring about the consequence impugned but, nonetheless, he proceeds to act." With reference to appropriate case law, discuss and outline the concept of criminal recklessness in Ireland.',
      },
      {
        examType: 'Problem',
        description:
          'Jason has been stalking Dervilla for a number of months. Advise Jason on his possible criminal liability.',
        text: "Jason has been stalking Dervilla for a number of months. Despite her protests, he repeatedly sent her texts claiming to be in love with her. In the last three weeks, Dervilla observed him on 16 separate occasions hanging around outside her apartment. Jason has also rang Dervilla's mobile number from a public payphone on five separate occasions. When she answered, Jason always remained completely silent, despite Dervilla's requests for the caller to reveal himself. All of this has upset Dervilla. She cannot sleep at night and has become increasingly anxious. Last night Jason (wearing a balaclava) broke in to Dervilla's apartment. He forced Dervilla to perform oral intercourse on him. He also held a knife to Dervilla's throat and demanded that she give him her wallet. After Dervilla had handed over her wallet, Jason, knowing that Dervilla would never love him, cut her on the face with the knife. The wound was five inches in length and will leave a permanent scar. A concemed neighbour, who heard the screams in Dervilla's apartment, rang the Gardai. Jason, who is out on bail on a robbery charge, was arrested as he was leaving Dervilla's apartment. Advise Jason on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'John recently won the lottery and purchased a very expensive Audi car. Advise on the possible criminal liability…',
        text: "John recently won the lottery and purchased a very expensive Audi car. To show off, he took three of his friends, Michael, Roddy, and Declan, with him for a drive around Wicklow. Despite the protests of his three friends, John drove at an excessive speed and, at times, on the incorrect side of the road. As a result he crashed at high speed. The fallout from the accident was horrific. Roddy, who had a weak heart, suffered a cardiac arrest upon impact. He died at the scene of the accident. Declan had to be cut from the wreckage. in order to remove him from the car which was about to go on fire, three members of the fire brigade, Jack, Jim and Joe, had to make the decision to server Declan's left arm which was trapped under a car seat. Declan was unconscious at the time and so could not give his consent. This action on the part of the fire brigade crew saved Declan's life, but he is not very pleased. He feels they committed a criminal act in severing his arm without his consent. Michael had deep lacerations to his left leg and was taken to hospital in Dublin where he was treated by a young doctor, Tom. Tom only had 5 hours sleep in the previous 72 hours when he saw Michael. Due to tiredness he did not treat Michael's wounds properly. Michael developed gangrene in his cuts (which Tom did not diagnose), which spread rapidly due to blockage of arterial blood flow. The toxic products formed by bacteria brought about sepsis from which Michael died. Advise on the possible criminal liability arising.",
      },
    ],
  },
  {
    subject: 'Criminal Law',
    year: 2017,
    questions: [
      {
        examType: 'Problem',
        description: 'Anna celebrated her birthday with some friends in Galway city. Company.',
        text: "Anna celebrated her birthday with some friends in Galway city. She and her friends had initially had dinner in the apartment which they shared, following which they visited a number of bars in Galway city. At 2.30 am, they went home by taxi. Anna met a man outside the apartment, Luke, and suggested to him that as she and her friends would be staying up for a while to celebrate further, and that the was welcome to call over. Luke accepted the invite. Anna and Luke, and the others stayed up for another two hours drinking. For fifty minutes or so, Anna and Luke danced together, and seemed to enjoy each other's company. At about 5.30 am, however, Anna concluded that the night was over and went to bed upstairs. She had at this point consumed an estimated ten drinks, and was very intoxicated. Anna got into bed and went to sleep. The next thing she recalled was waking up due to a stabbing pain in her vaginal area. She opened her eyes and found a man's body on top of hero It was Luke and he was putting his penis in and out of her vagina, and breathing heavily. Anna claimed that she had not physically resisted because she felt completely paralysed and that she could not move or breathe. After Luke had stopped, Anna got up, turned on the light and told him to leave the apartment. Luke claims that he also had ten alcoholic drinks on the night in question. He claims that the intercourse which he had with Anna was entirely consensual. He only went to her bedroom because he believed that 'there was a chemistry between them' o He also claims that he never ejaculated. Luke is currently out on bail on a robbery charge. Advise Luke on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'Lorna lives in Waterford where she works as an accountant. Advise Mark on his possible criminal liability.',
        text: 'Lorna lives in Waterford where she works as an accountant. She shared a rented house with three other young adults, including Mark who is a postgraduate computer science student. Mark fell in love with Lorna. He has repeatedly asked her to go on dates with him, but she has always declined these invites. It became so awkward that Lorna moved out of the house and found new accommodation. Recently Mark has started to turn up at Lorna\'s place of work at lunch times, and on three occasions followed her on a bus journey to the gym. He has also emailed her over 100 times in a month, and sent her up to 300 texts. All of this has really upset Lorna and caused her great distress. She has stopped going out in Waterford and will not now go to the gym. Last week, Mark turned up uninvited at her new apartment, and again expressed his love for her. Lorna was very frightened and refused to let him in. At this point, Mark became angry and kicked the front door, which caused it to be forced inwards. The edge of the door hit Lorna in the face, breaking her nose. Mark then entered the apartment and locked Lorna in a bedroom where he tended to her injuries. He also explained to her how much he loved her, and how he needed to be with her for the rest of his life. He gently lay his head on her chest, and caressed her hair, breasts and buttocks. Lorna was too frightened to resist. Over the course of two hours, she calmed him down by talking to him. He eventually agreed to leave the apartment. He did however take her mobile phone, and he threatened that he would kill her if she refused to be his partner. He also told her that after killing her, he would take his own life, as "life would not be worth living without her." When he left, Lorna ran immediately to a Garda station and reported what had happened. Mark cannot understand why she would do this. In his opinion, his actions were those of a romantic, desperately seeking to kindle a loving relationship with Lorna. Advise Mark on his possible criminal liability.',
      },
      {
        examType: 'Problem',
        description: 'Deirdre went for some drinks with her friends in a bar in Castlebar. Murder.',
        text: "Deirdre went for some drinks with her friends in a bar in Castlebar. She met Alan, an old friend. They both left the bar and went to Alan's house where they had consensual sexual relations. During the night, Alan claims that he formed the view that Deirdre was possessed by an evil spirit. He claims that he heard a voice in his head telling him to beat Deirdre to death with a golf club. He did as he was told and killed Deirdre. He then concealed her body in a shed, The next morning, Alan rang the Gardai stating that he had killed Deirdre. The Gardai arrived to find Alan in a distressed state. He accepted that he had killed Deirdre but denied intending to kill her, stating that 'an evil spirit had taken her over'. He believed that he had 'done the world a service by removing this evil spirit'. Mary was one of the psychiatrists who examined Alan. She noted that there were some symptoms that supported a diagnosis of schizophrenia. However, there were others which did not support such a diagnosis, including the lack of any symptoms of a psychotic illness. Moreover, there was no evidence of deterioration in his condition after he was taken off antipsychotic medication. Ultimately she expressed the opinion that while Alan was suffering from a mental disorder, it was not such as would in her opinion render him 'unable to refrain from murdering Deirdre'. She is of the opinion that Alan knew what he was doing, and pointed to the fact that Alan had tried to conceal evidence by hiding the body, and by burning Deirdre's clothes, phone and wallet immediately after her death. Alan asks you to advise him on [two]{.underline} issues: (i) His possible criminal liability, including any defences open to him. (ii) The extent to which he bears the burden of proving any defences which he might like to raise.",
      },
      {
        examType: 'Problem',
        description: "In Melling v O'Mathghamhna [1962] IR 1, Lavery J, in discussing whether an…",
        text: "In Melling v O'Mathghamhna [1962] IR 1, Lavery J, in discussing whether an offence was minor or not, stated the following: Regarded from the point of view of the citizen offender, the difference between a minor offence and a major offence depends chiefly on the punishment which is meted out to the convicted criminal. It is this which stamps an offence as serious or not serious in his eyes. From a moral point of view the offence of smuggling varies enormously. The importation of a pair of silk stockings for personal use would not be to sternly reprobated even by strict moralists, but large scale smuggling of valuable articles, organised and conducted as a profitable business, has not only been reprobated in severe terms by judges but would be regarded by most people as involving moral delinquency. Referring to appropriate law, discuss and outline the classification of criminal offences in Ireland.",
      },
      {
        examType: 'Problem',
        description:
          'John is a 45 year old man who has a long history of criminal offences. Advise both John and Larry on their possible…',
        text: "John is a 45 year old man who has a long history of criminal offences. He has a son Larry, who is 12 years of age. Recently, and at John's request, they both followed Peter, person with a mild intellectual disability on a night bus from Dublin city centre to Newbridge. They then followed Peter from the bus stop before John hit him across the head with a rock, knocking him to the ground. Larry then stole Peter's wallet, Larry felt really bad about taking the wallet from Peter, but he lived in fear of his father. He knew that the consequences would be severe if he did not do what his father wanted. These consequences would include severe physical beatings, food deprivation, and the threat of homelessness. Both John and Larry then needed to get back to Dublin. John used a rock to break a, car window so that he could gain entry. Larry jumped in to the passenger seat whilst John hotwired the car. John drove off at speed towards Dublin city centre and turned off the lights in the car. Larry was shocked and horrified. He pleaded with his father to slow down. John however ignored Larry's pleas. He drove at approximately 100krn per hour at times along a road which had a 50km per hour speed limit, continuously crossing the white line overtaking other cars and causing other cars coming in the opposite direction to swerve and use their emergency breaking in order to avoid head on collisions. He drove through a red light causing opposing traffic to take heavy evasive action. He then drove the wrong way down a slip road and on to the M50 traveling the wrong way against oncoming traffic. He hit a black Volkswagen Tourer which was being driven by Mary. Unfortunately Mary died as a result oi the collision. John and Larry were arrested at the scene Advise both John and Larry on their possible criminal liability,",
      },
      {
        examType: 'Essay',
        description:
          'Discuss the scope, composition and criminal jurisdiction of both of the following courts: (i) The Special Criminal…',
        text: 'Discuss the scope, composition and criminal jurisdiction of both of the following courts: (i) The Special Criminal Court (ii) The Court of Appeal',
      },
      {
        examType: 'Problem',
        description:
          'Tim and May are partners and live together in Tralee. Advise Tim and Mary on any possible criminal liability.',
        text: "Tim and May are partners and live together in Tralee. Mary's mother, Alice, moved in to live with them in January 2016. Alice was an 82 year old women suffering from advanced primary progressive multiple sclerosis. The expectation initially was that would noi be long term arrangement, but would last until Alice was offered suitable accommodation by the Local Authority. In December 201, Tracy, a neighbour of Tim and Mary, had called to their house for a social visit. She was shocked when she saw the condition of Alice and immediately rang for an ambulance. The ambulance personnel who were called were greatly disturbed at the condition in which they found Alice. The bed that she was lying in was filthy, due the fact that she was doubly incontinent and her lower body was covered in faeces. She had extensive bed sores (ulcers) which were infected. On admission to hospital, she was bathed, her bed sores were attended to, she was provided with antibiotics to which she responded. Following admission, she initially made progress in response to treatment, but unfortunately while in hospital she developed pneumonia due to her weakened condition. In January 2017, Alice died in Kerry General Hospital from pneumonia. It is clear that neither Tim nor Mary cared properly for Alice. Nor did they call for timely medical attention. Had they done so, it was a possibility that the ulcers could have been treated and, had they been treated, Alice might not have died. Earlier intervention would have ensured better treatment. Tim and Mary claim that any failure by them to care for Alice could not be said to be the substantial cause of her death. As far as they are concerned, the substantial responsibility for Alice's death rested with the HSE and its employees given that she died from pneumonia. Moreover, Tim argues that he never undertook to care for Alice. He claims that he 'had made it clear at all times and right from the outset that he did not want the old bat in the house.' Advise Tim and Mary on any possible criminal liability.",
      },
      {
        examType: 'Essay',
        description:
          'In People (DPP) v Kelly [2000] 2 IR 11, Barrington J in outlining the defence of provocation, noted as follows: The…',
        text: "In People (DPP) v Kelly [2000] 2 IR 11, Barrington J in outlining the defence of provocation, noted as follows: The question they [the jury] have to decide is not whether a normal or reasonable man would have been so provoked by the matters complained of as totally to lose his self-control but whether this particular accused with his peculiar history and personality was so provoked. At the same 'time they are entitled to rely upon their common sense and experience of life in deciding this as in all other matters. If the reaction of the accused in totally losing his self- control in response to the provocation appears to them to have been strange, odd, or disproportionate that is a matter which they are entitled to take into consideration in deciding whether the evidence on which the plea of provocation rests is credible. With reference to appropriate law, critically discuss the defence of provocation in the light of this statement.",
      },
      {
        examType: 'Problem',
        description:
          'Larry is a bank official working in Dublin. Advise Larry on his possible criminal liability.',
        text: "Larry is a bank official working in Dublin. Recently he has run up some large gambling debts, and owes a crime gang about €150,000. Wearing a balaclava, he broke in to a private dwelling of his boss, Denis, who lives in a wealthy part of the city with his wife, Denise. Larry was looking for cash and jewellery which he believed would be found in the house. He brought a machete with him in case he was disturbed by Denis or Denise. When he was confronted by Denis in the bedroom of the house, Larry struck him with the machete, causing very severe injuries to Denis's face. He then locked Larry and Denise in the bathroom. Denise became hysterical as she was being locked in the bathroom. The violence of the incident, the amount of blood and the injuries that Denis had suffered, and the fear that she would not survive caused her to suffer a post- traumatic stress disorder. This was aggravated by the fact Larry also threatened to kill her if she did not go into the bathroom. After locking both Denis and Denise in the bathroom, Larry panicked. He left the property without taking any jewellery or cash. Denis fortunately had his mobile phone with him. He was immediately able to ring Gardai who entered the house and rescued them from the bathroom. The Gardai also discovered Larry in the grounds of the house. When he was arrested, Larry maintained that he had been threatened and intimidated by members of the crime gang both in his home and in his place of work. He claims that he was threatened with severe violence if he did not 'rob the home of his boss', and he claims that members of the gang told that there were large amounts of cash and jewellery in the house which would help discharge his debts. He was also given the machete by a member of the gang Advise Larry on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description: 'Michael and Lilly had been living together for 15 years. Advise Michael.',
        text: "Michael and Lilly had been living together for 15 years. Michael is addicted to alcohol and abuses it regularly in conjunction with prescription drugs. One morning, he started drinking vodka, cider and cheap larger, and also took a prescription drug, diazepam. By the afternoon, Michael was very drunk. Lilly has been doing her best to maintain the relationship but she became very angry when she saw how intoxicated Michael was. She picked up a small log of timber, about one foot in length, which was lying near the fireplace. She threw it at Michael but it missed him. Michael was enraged by Lilly's attempt to hit him with the log, He ran at Lilly and punched her in the face, hitting her at least four times. Lilly fell back and hit her head off the corner of the fireplace. Michael also kicked her four more times as she lay prostrate on the ground. Michael then went to bed. He awoke nine hours later and discovered that Lilly was still lying on the floor in a pool of blood. He immediately rang for an ambulance, but Lilly was dead. Michael is distraught. He loved Lilly and claims that he would never intentionally harm her. Forensic evidence revealed that Lilly had suffered a fracture at the base of the skull and fractures of the cheekbone and jawbone on the left side of her face. She died as a result of the fracture at the base of the skull. This was mainly caused by the manner in which her head impacted against the corner of the fireplace. Advise Michael.",
      },
      {
        examType: 'Problem',
        description:
          'One morning you are instructed to meet your client at the local Garda… Advise Tim.',
        text: 'You are a solicitor. One morning you are instructed to meet your client at the local Garda station. Your client, Tim, has been arrested and is being detained for questioning at the local Garda station on suspicion of the sale or supply of cocaine. When Tim was arrested, he had in his possession €200,000 worth of cocaine, a scales, aluminium foil, empty plastic bags which had cocaine residue on the edges, and a number of chemicals that can be used to dilute illegal drugs. Upon arrival at the station, you are afforded the opportunity to confer with your client. Tim does not understand how he can be detained when he has not been charged with any actual offence. He asks you to give him an explanation of the law on detention without charge in Ireland and the safeguards that he is entitled to whilst so detained. Tim is also wondering about his right to silence in Garda custody, and whether he has to answer any questions about the possessions he had with him when he was arrested. Advise Tim.',
      },
      {
        examType: 'Essay',
        description:
          'With reference to appropriate law, discuss and outline the defence of diminished responsibility in Irish criminal law.',
        text: 'With reference to appropriate law, discuss and outline the defence of diminished responsibility in Irish criminal law.',
      },
      {
        examType: 'Problem',
        description:
          'Davinia is a 22 year woman who lives in a house with her step-father,… Advise Nathan on his possible criminal liability.',
        text: "Davinia is a 22 year woman who lives in a house with her step-father, Nathan. Davinia has a mild intellectual disability and is unemployed. Nathan is her primary support as Davina's mother died ten years ago. Nathan has had sexual relations with Davinia for the past two years. The relations comprised of the following activities. On at least eight or nine occasions, Nathan entered Davina's room at night and requested that she masturbate him. He indicated on each occasion that he 'would throw her out on the streets' if she did not do as he suggested. Davinia complied on each occasion, but only because she was so fearful of becoming homeless. On two other occasions, when Davinia was intoxicated, Nathan digitally penetrated her vagina. Nathan claims that she consented on both occasions. There is also evidence that he orally and anally penetrated Davinia with his penis on two occasions. Nathan does not deny this, but claims that Davinia consented on each occasion. Last week, Nathan entered Davina's room at night when she was asleep. He attempted to have vaginal intercourse with her but was too intoxicated to perform the act. Though feeling very sad and terrified, and concerned that she might become homeless, Davina told a care worker about this the next day. She also outlined all of the other incidents. Advise Nathan on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'Your client, Mahon, was driving on the public road in Co. Advise Mahon on the criminal law on strict liability in…',
        text: 'You are a solicitor. Your client, Mahon, was driving on the public road in Co. Donegal in April. He collided with another car, causing the death of the other driver, Jenny. Mahon was prosecutedfor the offence of careless driving contrary to s. 52 of the Road Traffic Act 1961 in Letterkenny Circuit Court. The offence reads as follows: 1) A person shall not drive a vehicle in a public place without due care and attention. A person found guilty of the offence is liable on conviction on indictment to imprisonment for a term not exceeding 2 years or to a fine not exceeding €10,000 or to both. The trial judge, Judge James, instructed the jury that the offence in question was a strict liability offence. As a result, the jury found Mahon guilty and he was later sentenced to a fine €5,000 and was disqualified from driving for a period offour years. He was also directed to re-sit a driver competency test at the expiry ofthat disqualification period. Mahon is shocked by the verdict and sentence. He is adamant that he had no moral culpability for what happened, It was, according to him, an accident, and he claims that he did not intentionally, recklessly or negligently cause the death of Jenny. He was also under the impression that he had to be culpable in order to be found guilty of a serious crime. With reference to case law, advise Mahon on the criminal law on strict liability in Ireland and whether Judge James was correct to interpret the provision as he did.',
      },
      {
        examType: 'Essay',
        description:
          'Jason has been illegally poaching fish in lakes and rivers in the West of Ireland area for a number of years.',
        text: "Jason has been illegally poaching fish in lakes and rivers in the West of Ireland area for a number of years. Acting on a tip-off, Inland Fisheries officers carried out a surveillance operation on Jason's fishing activities. He was discovered to be fishing illegally in Lough Corrib. As a result, his fishing equipment, including rod, reels, nets, high powered lamps, and a sophisticated fish-finder device, were seized by Inland Fisheries officers. This equipment cost about €3,500. Jason was also prosecuted in the District Court for an offence under the Fisheries Act, 1959. In addition to having his equipment seized, Jason was also fined €500. Jason cannot understand how the offence in question could be a minor offence when the equipment which was seized was worth so much money. He asks you to explain to him how all criminal offences are classified in Ireland. With reference to appropriate law, discuss and outline the classification of offences in Ireland.",
      },
      {
        examType: 'Essay',
        description:
          "'The Special Criminal Court is a distinct and separate court in the Irish criminal justice system it operates when the…",
        text: "'The Special Criminal Court is a distinct and separate court in the Irish criminal justice system it operates when the ordinary courts are deemed inadequate'. Fergal Davies, 'Trial by Jury, Terrorism and Gangs: a comparative study of Ireland and New Zealand' Journal of Commonwealth Criminal Law [2012], 283 at 292. With reference to appropriate law, discuss the scope, composition and jurisdiction of the Special Criminal Court in the light of this statement.",
      },
    ],
  },
  {
    subject: 'Criminal Law',
    year: 2018,
    questions: [
      {
        examType: 'Problem',
        description:
          'Gavin, an only child, is an 11 year old boy who lived with his mother,… Advise Gavin on his possible criminal liability.',
        text: 'Gavin, an only child, is an 11 year old boy who lived with his mother, Lisa, in Cork. One evening Lisa organised a party for neighbours and friends. The party was enjoyed by all. At the end, when everyone had gone home, Gavin started to behave strangely. For no apparent reason, he locked Lisa in her bedroom and then attacked her with a baseball bat. He knocked her to the ground, and then strangled her with a phone charger. The compression of her neck caused a hypoxic state in the brain which resulted in her death. Gavin, it seems, is suffering from an adjustment disorder, which can on occasion lead to outbursts of violence. This disorder was brought on by the recent divorce of his parents which unsettled him terribly. Since then, Gavin has had a very hard time coping, and he seems to have irrationally blamed his mother, Lisa, for the divorce of his parents. He could not understand how she could enjoy herself at the party when his life --- it seemed to him --- had fallen apart as a result of the divorce. Advise Gavin on his possible criminal liability.',
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions as to the charges, if any, that… Director.',
        text: "Advise the Director of Public Prosecutions as to the charges, if any, that might be brought in all of the following cases, referring to appropriate law, and giving reasons for your advice: (i) Jack, a violent man, told his wife Mary that he would kill her if she did not have sexual intercourse with his friend, Liam. Mary would not ordinarily have sexual intercourse with Liam but consented out of fear. She had sexual intercourse with Liam, who did not know that Mary only consented because of the threat made by Jack. (ii) Lorna is 14 years of age. She met Peter who is 19 in a nightclub on a particular evening. They have consensual sexual relations. Peter is shocked to hear afterwards that Lorna is only 14. He claims that he believed that she was 18 or 19 years of age when they met in the nightclub. He argues that this belief is reasonable, particularly having regard to the fact that Lorna gained admittance to the nightclub which has an age requirement of 18. (iii) Jim and Kelly are married. On their wedding anniversary, they go for an expensive dinner to celebrate and both consume 6 glasses of wine. When they were in bed later, Jim asked Kelly if they could have sex. Kelly refused, indicating that she was tired. Jim was furious, and forced himself on Kelly. He had sexual intercourse with her. Kelly was always a little frightened of Jim, particularly when he had consumed alcohol. She did not resist at any point. (iv) Martin is a 25 year old man who has a severe intellectual disability. He is incapable of independent living and has two permanent carers looking after him on a rotational basis. One of the carers, Helen, does not like working with him. She wanted to humiliate him. One evening, Helen grabbed Mark's testicles and massaged his penis. Martin became very distressed. On seeing this distress, Helen laughed and walked away.",
      },
      {
        examType: 'Essay',
        description: "In DPP v O'Callaghan [1966] IR 501, Walsh J.",
        text: "In DPP v O'Callaghan [1966] IR 501, Walsh J. noted as follows: \"From the earliest times it was appreciated that detention in custody pending trial could be a cause of great hardship and it is true now as it was in ancient times that it is desirable to release on bail as large a number of accused persons as possible who may be safely released pending trial. From time to time necessity demands that some unconvicted persons should be held in custody pending trial to secure their attendance at the trial but in such cases 'necessity' is the operative word.\" Discuss and outline the law on bail in Ireland in the light of this statement.",
      },
      {
        examType: 'Problem',
        description:
          'Jack and Fidelma are happily married, or so it seemed. Advise Jack on his possible criminal liability.',
        text: "Jack and Fidelma are happily married, or so it seemed. Jack is a stay-at-home father who looks after their three children in Limerick. He really enjoys being the main caregiver of the children, and the primary homemaker of the household. Fidelma is a senior partner in a law firm in the city centre and works very long hours. This is accepted by both of them as being necessary to ensure that they have an excellent standard of living. One evening, Jack decided to surprise Fidelma by taking her for a dinner in their favourite restaurant. He organised a childminder to mind the children, and arrived at her office at 6 p.m. He walked in to her office with a large bunch of flowers only to find Fidelma having sexual relations with Leonard, another partner in the firm and a family friend, on the floor. Jack flew in to a rage. He punched Leonard twice in the face, shattering his jaw. Fidelma, seeing the anger in Jack's eyes (which she had never seen before), backed out in to the hallway that led to the stairs. Jack picked up a heavy glass paperweight. He threw it at Fidelma with as much force as he could muster. The paperweight hit Fidelma on the head, causing her to stumble and fall. The impact of the paperweight dazed her temporarily, which affected her coordination. When she got to her feet, she stumbled again, falling down the stairs. This fall caused her to fracture her skull and break her neck. She died from these injuries. Jack is devastated. He loved his wife and had never been violent previously. The sexual infidelity of his wife, displayed so graphically in front of him, caused a loss of control which he cannot explain. Advise Jack on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'In Director of Public Prosecutions v Armstrong [2000] Crim LR 379, Tuckey… Mens Rea, Actus Reus.',
        text: "In Director of Public Prosecutions v Armstrong [2000] Crim LR 379, Tuckey LJ stated as follows: Incitement, like attempt and conspiracy, is an 'auxiliary'...or 'inchoate'...offence. It is one of the ways in which criminal responsibility attaches to conduct short of the commission of the full offence. The actus reus of the offence is the incitement by the defendant of another to do something which is a criminal offence. He must do so with the intention that if the other person does as he asks he will commit a criminal offence. That is the mens rea. Critically discuss the law of incitement in the light of this statement.",
      },
      {
        examType: 'Problem',
        description:
          'Michael and Peter are two university students who joined in a protest… Advise Michal and Peter on their possible…',
        text: 'Michael and Peter are two university students who joined in a protest march in Galway in connection with increases in student fees. The protest took place in the city centre. Both individuals were generally badly behaved, shouting obscenities and being disruptive and noisy during the march. When the President of the local university, Professor Bookbright, drove past in his car, Michael grabbed a brick off the ground and gave it to Peter, saying: "Quick, throw it at the car." Peter threw the brick. It hit the windscreen of Professor Bookbright\'s car, causing him to swerve in to a wall. At the time, Caoimhe was sitting on the wall watching the protest. She was forced to jump off in order to avoid direct impact from the car. Though she avoided a direct collision, she did break two bones in her leg as a result of jumping off the wall. Michael and Peter fled the scene. For a number of days after the event, however, they followed Professor Bookbright around the campus. They rang his phone over 40 times and left many insulting voicemails. They were also seen on numerous occasions outside the windows of his university office and the gates of his private residence. Professor Bookbright was very intimidated by their behaviour, and unsuccessfully pleaded with them to stop. Michael and Peter agree together that if they are charged with any criminal offences, they will make false statements under oath, claiming that they were not at the protest march. They also agree that they will disrupt any court proceedings involving them by chanting songs about reductions in student fees. Advise Michal and Peter on their possible criminal liability.',
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions as to the charges, if any, that… Consideration, Company.',
        text: "Advise the Director of Public Prosecutions as to the charges, if any, that might be brought in all of the following cases, referring to appropriate law, and giving reasons for your advice: (i) James bought two gold necklaces from a well-known criminal for €300 each. The necklaces had been stolen. Their real value is €3,000 each. When James was found in possession of the necklaces, he argued that he bought them for consideration. (ii) John, a financial accountant, works for a company involved in retail software. He reported false profits by inflating the cash-at-bank/revenue figures by 2 million euro in the company's interim results in order to show very healthy trading figures. This helped to win some new customers by making the company appear more successful than it was. (iii) Tom is a senior executive in Bitlreland Ltd, a telecoms company. He induced the company to make payments of €30,000 to a named business entity (which he created) for his own gain. Fortunately. the deception was discovered before the transfer took place. (iv) William is a drug addict desperately in need of a fix. Wearing a balaclava and carrying a knife, he burst in to a pharmacy in Letterkenny, demanding money and drugs from Mary who was working at the counter. Mary handed over what was in the till, about €300 in cash, and a quantity of drugs.",
      },
      {
        examType: 'Problem',
        description: '"Given the potential infringement on the right of the individual to…',
        text: '"Given the potential infringement on the right of the individual to autonomy and liberty, the criminal law does not often impose liability for omissions. In instances where it does impose such liability, this may be for reasons of public health and safety or for the purpose of state security." L Campbell, S Kiicommins, and C O\'Sullivan, Criminal Law in Ireland (2010), p. 81 With reference to appropriate law, critically discuss this statement.',
      },
      {
        examType: 'Problem',
        description: 'Jim and Jade had been involved in a relationship for some time. Frustrat.',
        text: "Jim and Jade had been involved in a relationship for some time. They lived together in a flat in the centre of Waterford. The relationship between them was difficult, and Jade had a serious drinking problem. She could become 'difficult' and argumentative when she was intoxicated. Indeed their landlord had given both a warning about having to leave the flat as a result of Jade's disruptive behaviour. This worried Jim greatly, as he feared they would become homeless. One evening, Jade returned to their flat after consuming a lot of alcohol. Jim was very frustrated by this, particularly her loud behaviour. He claims that Jade had threatened to burn the whole building down, and that she was shouting about this in the stairwell of the building. Provoked by her bad and reckless behaviour, Jim lost his temper and admitted to grabbing Jade by the throat in the flat. Jim accepted that he might have caused some injury to her throat, but denied that this could have intentionally caused her death, as he had no intention to strangle her. He said that Jade went 'to sleep' on the sofa immediately after the incident. Jim woke up the next morning and left to do some shopping. He returned in the early afternoon and was surprised that Jade had still not awoken. When he shook her arm, he discovered that there was no reaction. He made a phone call to the emergency services at approximately 2 p.m. in the afternoon. Jade was dead. She had, in fact, been grabbed by the throat in such a forceful manner that two cartilage bones in her neck were fractured. She had died as a result of a larynx fracture which caused internal bleeding, leading to a narrowing of her airways. Advise Jim on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'You are asked to advise your clients on the criminal procedure issues… Murder.',
        text: "You are a solicitor. You are asked to advise your clients on the criminal procedure issues arising in [both]{.underline} of the following scenarios: (i) Ray became a suspect in a murder investigation. He was arrested on suspicion of having committed the murder and was detained in Sligo Garda Station pursuant to Section 4 of the Criminal Justice Act 1984. He was interrogated during the course of his detention and cautioned. During the course of his detention in Garda custody, he was informed by a member of An Garda Siochåna that he should be aware of Section 9 (1) of the Offences Against the State (Amendment) Act 1998, which provides that a person shall be guilty of an offence if he or she has information which he or she knows or believes might be of material assistance in securing the apprehension, prosecution or conviction of any other person for a serious offence, and fails without reasonable excuse to disclose that information as soon as it is practicable to a member of the Garda Siochåna. On the advice of his solicitor, Ray remained silent. He was subsequently released without charge. It now appears that Ray will be charged with an offence of failing to disclose information contrary to Section 9 (1) of the Act of 1998. Ray is surprised by this, as he understood that he has a right to silence during Garda questioning. Advise Ray on the right to silence as it applies during Garda questioning. (ii) Peter was out with friends in Limerick after watching the All Ireland hurling final. He was very excited, not least because Limerick had only one previous success since 1940. Giddy with excitement, he threw a chair through a large plate glass window of a coffee shop on O'Connell Street. He did this for a dare with some friends. The people sitting inside the coffee shop were startled but fortunately no one was injured by the broken glass or the chair. Garda Canning, who had recently graduated from Templemore Garda Training College, witnessed Peter committing the offence. He arrested Peter and brought him into Garda custody in Henry Street station where he was charged with various offences including criminal damage to property. It appears however that Peter was not expressly informed that he was under arrest. Nor was he informed of the statutory powers upon which the actual arrest was made. Peter wants to know if his arrest is unlawful.",
      },
      {
        examType: 'Problem',
        description:
          'Henrietta is the financial controller of a charity managing residential… Advise Henrietta on her possible criminal…',
        text: "Henrietta is the financial controller of a charity managing residential care homes for elderly people in Dublin. She has responsibility for the general running of the charity. Her responsibilities extend to the payroll of all employed staff, including herself. It is an agreed term that when she does overtime, or covers for other members of staff, she is entitled to claim additional payment. She is also entitled to claim payment in lieu of holidays not taken. A recent audit has revealed that Henrietta has defrauded the charity by submitting inflated overtime claims and false claims in lieu of holiday entitlements. The total amount said to be involved was quantified at €52,000 for the period between January 2007 and September 2017. The audit has also revealed that Henrietta accessed the payroll system on the charity's computer system two years ago, and altered her salary upwards by €1,OOO monthly. Henrietta also adjusted profit and loss accounts for the charity to conceal this salary increase. Henrietta has a history of mental disorder leading to outpatient treatment and medication. Two consultant forensic psychiatrists suggest that she has an abnormality of mental functioning arising from paranoid schizophrenia. In particular, Henrietta is continuously experiencing auditory command hallucinations instructing her to take the money. She has therefore the persistent and continuous deluded belief that she is receiving divine orders to do so. She knows what she is doing is legally wrong, but she feels compelled to do it given the divine nature of the commands. Henrietta has not spent any of the money she has taken over the last 10 years. She has told the psychiatrists that she will receive an auditory command about what to do with the money she has accumulated when the time is right. Advise Henrietta on her possible criminal liability.",
      },
      {
        examType: 'Essay',
        description:
          "In Melling v O'Mathghamhna [1962] IR 1 at 23, Kingsmill Moore J identified the following features which can be regarded…",
        text: "In Melling v O'Mathghamhna [1962] IR 1 at 23, Kingsmill Moore J identified the following features which can be regarded as indicia of crimes: (i) \"They are offences against the community at large and not against an individual... (ii) The sanction is punitive, and not merely a matter of fiscal reparation... (iii) They require mens rea for the act must be done 'knowingly' and with 'intent to evade the prohibition or restriction'... Mens rea is not an invariable ingredient of a criminal offence but where mens rea is made an element of an offence it is generally an indication of criminality. With reference to appropriate law, discuss the definition of a crime in the light of this statement.",
      },
      {
        examType: 'Problem',
        description: 'Lucy left her husband, Daniel, after 24 years of marriage. Frustrat.',
        text: "Lucy left her husband, Daniel, after 24 years of marriage. She was no longer able to accept his moods, his jealous nature, and his constant criticism of her. She has been living on her own for the last six months in an upstairs flat in Waterford. Daniel was shocked by the marriage separation and never believed it was possible that Lucy would leave him. He is now living alone and is unemployed. Frustrated by his inability to no longer control Lucy, he started to send her texts, almost 30 each day for the last four months. Up to last week, the texts mostly related to requests for her to come back, to forgive him, and to tell her how much he loved her. More recently, however, they have become more nasty. He sent her 20 texts about how much he hated her, and two texts mentioned how he was going to send naked photos of her to her family and friends. In one text, he stated that she 'should watch out' because he was going to 'slit her throat from ear to ear'. Lucy was horrified by all of these texts and was very frightened. Last night, Daniel broke in to Lucy's flat. He trapped Lucy in the bedroom and attempted to have anal intercourse with her. Lucy fought him off by biting his hand. She managed to escape from the flat. Advise Daniel on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions as to the offence charges, if… Frustrat, Director.',
        text: "Advise the Director of Public Prosecutions as to the offence charges, if any, that might be brought in [each]{.underline} of the following four cases, referring to appropriate law, and giving reasons for your advice: (i) Linda is a 33 year old woman who is an alcoholic. She also has a drug problem and was recently made homeless. Kevin, who is 64 years of age, permitted her to sleep on his couch for a number of weeks. One night, she was woken from sleep in the middle of the night to find her pyjamas had been taken off by Kevin. He had inserted his hand in to her vagina. The pain was excruciating. Linda was shocked and in terrible pain, but she managed to escape. She was taken to hospital by nambulance, and a Consultant Obstetrician/Gynaecologist attended to her. He discovered a 7 centimetre laceration very high up in Linda's vaginal wall. (ii) Mary is a 14 year old girl who lives in Longford. Recently her brother, Jason, who is 22 years of age, came into her room late at night. Jason got into Mary's bed and had consensual sexual intercourse with her. Jason then told Mary that they 'would both go to prison' if she ever told anyone about it. (iii) Alan was desperately in need of money to feed a drug habit. He armed himself with a knife, which had a nine inch blade, and entered a supermarket in Tralee. He produced the knife to the shop assistant, Theresa, who got a very serious fright He demanded that she open the till and give him the money. Theresa opened the till and Alan took the money himself. (iv) Fergus is appearing in the Circuit Court in Galway in repossession proceedings relating to his family home. He is representing himself, but becomes very frustrated when he realises that his house will, in all likelihood, be repossessed. He decides that he needs to protest by disrupting the proceedings. He repeatedly shouts at the legal representatives for the bank, suggesting that they are 'parasites' and 'scumbags'. He also shouts at the judge hearing the case, Judge O'Shea, and refers to her as a 'puppet for the banks'. Despite a warning from the judge about his behaviour, Fergus continues to disrupt the proceedings.",
      },
      {
        examType: 'Problem',
        description:
          'Gordon and his girlfriend, Mary, reside in an apartment in Cork. Advise Gordon and Mary on their possible criminal…',
        text: "Gordon and his girlfriend, Mary, reside in an apartment in Cork. Gordon did not like his neighbour, Dervilla, a transgender person living in the same apartment block. One night, as Dervilla was coming home late from work, Gordon approached her and asked if 'she was a guy or a girl'. Dervilla is a very mild mannered, inoffensive individual. Though scared, she politely requested to be let through the stairwell so that she could get to her apartment. Gordon then proceeded to attack Dervilla with a claw hammer. Derviila was very badly injured in the vicious attack. She suffered a fractured skull and extensive lacerations to the back of her scalp. The injuries to her head were so severe that they necessitated plastic surgery to replace skin on her scalp. The transphobic attack left her with postwtraumatic-stress disorder, and she is now very reluctant to leave her apartment. Mary was with Gordon when the attack took place. She did not participate, but observed the incident in full as it was occurring. She also knew that Gordon was waiting for Dervilla in the stairwell with the hammer prior to the attack, and that there was a strong likelihood, given his level of hatred, that he would attack Dervilla with the implement. After the attack, she held the door for Gordon so that he could leave. She also threw the hammer that was used in the incident in to the River Lee. Mary is adamant that she did not participate in the attack. She claims that she only got rid of the hammer so as to ensure that such a gruesome attack weapon did not remain in her apartment. She was happy to throw it in the river as she was frightened that Gordon would use the same implement to attack her. She also claims that she was at all times acting in fear of Gordon. She alleges, in particular, that he threatened to kill her if she attempted to intervene to stop the assault on Dervilla. Advise Gordon and Mary on their possible criminal liability.",
      },
      {
        examType: 'Essay',
        description: 'Noel was in a nightclub in Tralee.',
        text: "Noel was in a nightclub in Tralee. He met a woman, Nora, who was quite intoxicated. They started kissing in the nightclub and shortly thereafter had sexual intercourse in the carpark outside the club. They both then went back in to the nightclub and parted company. Nora was very unhappy with the encounter. She believes that she did not consent to sexual intercourse and that Noel exploited her lack of capacity to consent given her intoxicated state. She believes that she was raped. In particular, she believes that Noel knew that she was not consenting or was reckless as to whether she did or did not consent. She reports the matter to the Gardai. Noel is shocked by this allegation and seeks your advice. He accepts that he had sexual intercourse with Nora. He acknowledges that he knew that Nora was intoxicated, but is adamant that he still believed that she was consenting. He does not believe that he was reckless as to Nora's consent. With reference to appropriate law, he asks you to explain both of the following issues to him: (i) The law on consent as it relates to the offence of rape in Ireland. (ii) How recklessness is defined in Irish criminal law.",
      },
    ],
  },
  {
    subject: 'Criminal Law',
    year: 2019,
    questions: [
      {
        examType: 'Problem',
        description:
          'Norah was employed as a secretary and personal assistant to three medical… Advise Norah on her possible criminal…',
        text: "Norah was employed as a secretary and personal assistant to three medical consultants. Her duties and responsibilities were secretarial, administrative and accounting. In order to discharge her duties, Norah had been giving full access to her employers' banking details, and she was required to lodge cheques received by them to their respective bank accounts, and to make appropriate book-keeping entries to record such receipts. Since 2001, Norah had been lodging a number of cheques, which had been payable to her employers, to her own bank account. She also amended the book-keeping entries to conceal what she was doing. The total loss for the consultants was €720,000. When the fraud was discovered, Norah admitted her wrongdoing immediately. Norah has experienced suicidal ideation, and her psychiatrist has expressed concern that she is at high risk for suicide. He also noted the Norah has a long history of drug addiction and bipolar disorder. The illness has a strong, recurrent nature with predominately manic episodes, with increased probability of impulsivity and lack of self-control. This impulsivity would have affected Norah's judgement, and would have caused her to take cheques, even though she knew it was wrong. Advise Norah on her possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'She entered the State on the 3rd April, 2018, via Dublin Airport. Advise Delia on the classification of offences in…',
        text: 'Delia is a citizen of Liberia. She entered the State on the 3rd April, 2018, via Dublin Airport. She had travelled to Ireland from Nigeria transiting through a European airport. Upon her arrival at Dublin Airport, she was arrested and charged with an offence under the Immigration Act 2004, as amended, of being a non-national who failed to produce a valid passport or other equivalent document which established her identity and nationality. She has been told that the relevant offence is classified as a summary offence, liable on conviction to a fine not exceeding €3,000 or to imprisonment for a term not exceeding 12 months or to both. Delia comes to you, a solicitor, and asks you to explain to her in full how offences are classified in Ireland. With reference to appropriate case law, advise Delia on the classification of offences in Ireland.',
      },
      {
        examType: 'Problem',
        description:
          'Cillian plays football for Rosscommon Harps. Advise Tim, Mark, Luke and John on their possible criminal liability.',
        text: "Cillian plays football for Rosscommon Harps. After beating a rival club, Castlerea Pearses, in an ill-tempered and controversial county final last Sunday, Cillian went of social media to gloat about his club's success. He also made derogatory remarks about the players from Castlerea, saying that 'they lacked courage' and \"were not men'. This incensed the players from Catlerea. Four of their players, Tim, Mark, Luke and John, met to discuss the social media remarks. They decided that they needed to teach Cillian a lesson by 'roughing him up' and 'giving him a good hiding'. They knew where he worked in Rosscommon, and decided they would wait for him in the car park of his employer the following Friday evening. On the Friday evening, Tim, Mark and Luke met as planned in the car park. John did show up -- it appears that in the intervening days he had time to reflect and cool down. He decided not to go through with the plan but did not communicate this to any of the others. When Cillian came out of work, he was attacked by Tim, Mark, and Luke. He collapsed to the ground, where he was further assaulted and kicked. He was also stabbed when he was on the ground. Cillian died from the assault. The cause of death was the two knife wounds, the infliction of which would have required considerable force. Tim had inflicted the knife wounds. He suggested that he only stabbed Cillian because he was so angry with him. He did not intend to kill him or cause him serious injury. Mark and Luke are suggesting that they had only agreed to 'rough Cillian up' and to 'give him a good hiding'. They had joined the group attack with at most an intention to cause harm, without knowledge or foresight that anyone else involved in the assault intended to kill. They had no idea that Tim would produce and use a knife. Advise Tim, Mark, Luke and John on their possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'Michael is a drug addict living in Athlone. Advise Michael on his possible criminal liability.',
        text: 'Michael is a drug addict living in Athlone. For some time now, he has been watching Mary, a local primary school teacher, leaving the school each evening. He has followed her home to her house on at least 10 occasions. Mary was unaware that she was being followed. One evening, Michael attacked Mary at the door of her house. He pointed a syringe at her neck and demanded her purse. Mary broke free from him, and ran into her house. Michael ran after her and kicked in the front door of her house. He head-butted Mary and threw her to the ground. He told her that if she moved, he would kill her. He then attempted to rape her. Fortunately Mary got away from him by kneeing him in the groin. In a panic, she sprinted from the house in to the street where she sought to flag down a passing motorist, David. Unfortunately David did not see Mary on time due to the darkness and the wet conditions. His car struck Mary, killing her instantly. Advise Michael on his possible criminal liability.',
      },
      {
        examType: 'Problem',
        description: 'Advise the DPP as to the charges, if any that might be brought in all of…',
        text: "Advise the DPP as to the charges, if any that might be brought in all of the following cases, referring to appropriate law, and giving reasons for your advice: (i) Tom is an anaesthetist working in Limerick University Hospital. His hours of work are very long. One afternoon, at the end of a very long 12 hour shift, Tom was called to give an anaesthetic to Mary, who was having an eye operation. This involved paralysing the patient, but permitting her to breathe through a ventilator. Unfortunately Tom was very careless in his approach. He accidently disconnected the tube supplying Mary with oxygen from the ventilator. As a result, Mary was no longer ventilated. She suffered a cardiac arrest and subsequently died. (ii) Declan and Mark are friends and both are third level students in Galway. They had an argument after a night out in the city. It related to the payment for the taxi service which took them back to their student accommodation. Declan had to pay as Mark had no money. He told Mark that he was 'tired od being used by him'. Mark lost his temper and threw his umbrella -- like a spear -- at Declan. Declan managed to deflect it away from him, with the result that the sharp metal tip of the umbrella now struck the taxi driver, Paul, in the eye. Paul underwent multiple surgeries for this injury but ultimately lost his vision in the eye. (iii) Linda was in a rush to work in Limerick. She drove at speeds in excess of 100km per hour in a 50 km zone. As a result she was unable to stop in time at a pedestrian crossing where Sheila, a 70 year old woman, was crossing. Linda's car struck Sheila, who was knocked to the ground. She was brought to hospital and received medical attention but was pronounced dead a short time later. A state pathologist concluded her death was caused by head and chest trauma as a result of vehicular impact. (iv) Alan is a married man and, during the course of his married life, he and his wife fostered four children, one of whom was Fidelma who came to live with them when she was 12 for four months. One evening, whilst Fidelma was bathing, Alan entered the bathroom and rubbed her genitalia and breasts. Later that evening, Alan entered Fidelma's bedroom when the rest if the family were sleeping. He knelt down by the side of Fidelma's bed and showed her a large knife that he was carrying. He then proceeded to touch her vagina and bottom. Fidelma was very frightened and distressed and complained to the Garda after she had moved from that foster home.",
      },
      {
        examType: 'Problem',
        description: 'Kevin was working in Canada and had come home for a three week holiday in…',
        text: "Kevin was working in Canada and had come home for a three week holiday in Kerry. Whilst home, he was arrested, detained and charged with the offence of committing a sexual act with a protected person uder section 21 of the Criminal Law (Sexual Offences) Act 2017. Section 21(3) of the Act provides that in proceedings for an offence under this section, it is presumed, unless the contrary is shown, that the defendant knew or was reckless as to whether the person against whom offence is alleged to have been committed was a protected person'. Kevin is surprised by the wording of section 21(3), and in particular the requirement that he has rebut the presumption arising. He was under the assumption that an accused party was under no obligation to prove anything in a criminal trial. Kevin also wishes to apply for bail. He informs you that he has two previous offences for sexual assault, and wishes to return to Canada as soon as possible. With reference to appropriate law, he asks you to explain [both]{.underline} of the following to him: (i) The presumption of innocence in Irish law, and how it would apply in relation to section 21(3) of the Criminal Law ( Sexual Offences) Act 2017, [AND]{.underline} (ii) The factors that are relevant in the decision to grant bail, and any conditions that may apply to bail.",
      },
      {
        examType: 'Essay',
        description: 'You are a solicitor.',
        text: "You are a solicitor. You have a client, Paul, who allegedly is a member of an organised crime gang involved in the illegal drug trade in Dublin. It is alleged that Paul recently shot a rival gang member, Eoin, in relation to a drug debt. Eoin was standing beside his car when Paul allegedly ran up to him. Eoin tried to get away but was shot a number of times in the head and collapsed at the side of the road. Paul was arrested, detained and charged with the crime of murder as provided for under section 4 of criminal Justice Act 1964. Paul has read the provision and he knows that the prosecution must prove that he 'intended to kill, or cause serious injury to' Eoin to be guilty of the offence. His trial on the charge of the murder will run in the special court. Paul meets with you and seeks your advice on [both]{.underline} of the following issues: (i) An explanation, with reference to appropriate case law, of the mens rea requirement for intention in Irish Criminal Law, [AND]{.underline} (ii) An explanation with reference to appropriate law of the scope, composition and jurisdiction of the Special Criminal Court.",
      },
      {
        examType: 'Essay',
        description: '"Self-defence is a powerful defence.',
        text: '"Self-defence is a powerful defence. It brings a complete acquittal to any offence for which force is a definitional element or which can be committed by force... For fatal cases, there is an additional halfway house defence,... that reduces murder to manslaughter. This... defence is available where the killing occasioned excessive defensive force... There is no equivalent partial defence in non-fatal cases." David Prendergast, \'A critical review of the Court Appeal interpretation of self-defence in the Non-Fatal Offences Against the Person Act 1997\' Irish Criminal Law Journal 2018, 28(3), 58-63. Critically discuss the defence of self-defence in fatal and non-fatal cases in the light of this statement.',
      },
      {
        examType: 'Problem',
        description:
          'Dieter, a German national was a third level student in Galway. Advise Dieter on his possible criminal liability.',
        text: 'Dieter, a German national was a third level student in Galway. One night, he had been socialising in the city with two friends. They had been drinking in various licensed premises and playing pool. At 3am, and whilst quite intoxicated, Dieter became separated from his friends and left to go back to his student apartment. Whilst making his way home he encountered Liam and Conor. He was subjected to racist taunts by both of them, and both proceeded to assault him by kicking and punching him. Following this initial incident, Dieter continued home. He then armed himself with a kitchen knife and took it with him as he left the apartment. He contends that he had gone out again to look for two of his friends with whom he had been with earlier, and he had brought the knife with him because he was concerned about the safety of those friends. He met Liam and Conor again, and they taunted him again, this time with sexual innuendos. They also assaulted him again. This was only an estimated 15 minutes after the first assault. It was clear that Dieter was not the aggressor in either of the incidents. On this occasion, however, Dieter ran after Liam and Conor as they were leaving. He produced the kitchen knife which he had armed himself and stabbed both of them. Liam sustained only superficial wounds to his face but Conor was fatally injured. He bled quite severally after being stabbed. Although he was removed to hospital, all attempts to resuscitate him were unsuccessful and he was pronounced dead. Advise Dieter on his possible criminal liability.',
      },
      {
        examType: 'Problem',
        description:
          'Laura lived in a house in Waterford. Advise Laura, Luke and Paul on their possible criminal liability.',
        text: "Laura lived in a house in Waterford. One night at 10pm, her nephew, paul visited her with his friend, Luke. Paul and Luke were preparing for a burglary at the home of a local jeweller, Maurice. They asked Laura if they could prepare for the crime in her house. They had initially planned to prepare in Luke's mothers house, bur she had returned unexpectedly, requiring them to go somewhere else. Though not part of the plan, Laura reluctantly allowed them to prepare for the crime in her kitchen. She provided them with duck tape to tie up Maurice. She also helped them to put their balaclavas, a lock cutter, and a large knife into a holdall bag. Paul and Luke then left to commit the crime. They both agreed they would 'use the knife, if necessary'. They entered Maurice's house by breaking a downstairs window. They were confronted by Maurice. Luke stabbed Maurice with a knife, inflicting a 8 inch non-fatal shoulder wound. They both tied up Maurice and ransacked the house. They left with €3,000 worth of jewellery. They then returned to Laura's house, where she helped them to wash blood of their faces. She also helped them to burn their clothes and balaclavas. Laura claims that she only assisted them our of fear. She had four young children in the house, and she believed that if she did not help them, they would have 'been trouble for her and her children'. Advise Laura, Luke and Paul on their possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of the Public Prosecutions as to the charges, if any,… Director.',
        text: "Advise the Director of the Public Prosecutions as to the charges, if any, that might be brought in all of the following cases, referring to appropriate law, and giving reasons for your advise. (i) William owns what he calls 'a shaker', and adventure ride where people are strapped in and from which they are sun 25 meters into the air. William takes the shaker to various carnivals and festivals that take place around the country. The shaker is not well maintained, and one of its arms has badly rusted, weakening the mental structure. William knew this, but he decided to continue operating in the hope that he could generate sufficient revenue to carry out full repairs. During the operation of the ride at weekend festival in Letterkenny, one of the rotating arms on the ride snapped, killing Denise, a 20 year old who was attending the festival and who had taken the ride with some friends. (ii) Eddie and Paul were walking home from a night out in Dublin. They took a pedestrian bridge over a motorway. Eddie decided for a laugh to throw Paul's coat off the bridge. It was not his intention to kill or injure anyone. Unfortunately the coat landed on the windscreen of Tom's car, causing Tom to swerve in to another lane where he collided with an articulated lorry which was traveling in the same direction. Tom died from the injuries which he received. (iii) Tim has developed an obsession with Linda, a fellow colleague in the workplace. He has followed her every day for the last 6 weeks in their workplace. He has also sent her over 200 texts and left 40 messages on her work phone. None of the texts or messages had any connection with work related activity. Despite being repeatedly asked by Linda to leave her alone, Tim continues to send hr texts and to follow her around the workplace. Linda is very distressed and alarmed by Tim's behaviour. After discovering Tim attempting to securely take photographs of her as she left work, Linda decided that it was time to report the matter to the Garda. (iv) Jason believes that there is a strong lack of moral values in Irish society. He believes that Irish people need to change their ways. As a protest, he handed out leaflets on O'Connell Street in Limerick. These leaflets contained very graphic images of abuse, violence, and greed. Many people who saw the images found them to be very insulting, obscene and frightening. Jason was also verbally abusive and threatening. He repeatedly confronted passers-by, shouting directly at them that they were 'evil' and that there were 'going to burn in hell'.",
      },
      {
        examType: 'Problem',
        description:
          'John asked if he could take her home. Advise John on his possible criminal liability.',
        text: "John met Sarah at a disco. Sarah was intoxicated. John asked if he could take her home. As they were walking home, John pushed Sarah into a bush. Despite her protests, John then removed Sarah's clothes, and attempted to have sexual intercourse with her. Fortunately, a later night jogger, Tim, heard Sarah's screams and went to investigate. When John saw Tim coming over to the bush, he fled the scene. No sexual penetration had taken place, tough Sarah was horrified by the incident and was certain that she would have been raped but for Tim's intervention. Some days later, John was diagnosed with erectile dysfunction. Though he did not know it at that time, it would have been physically impossible for him to have had sexual intercourse with Sarah. John is relieved, as he now believes that it was factually impossible for him to commit rape. Advise John on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'He really dislikes the idea of the water meters, finding them invasive and… Occupiers.',
        text: 'Larry lives in Rooskey. He really dislikes the idea of the water meters, finding them invasive and disruptive of his property and privacy rights. He was contacted by Irish Water who notified him that sub-contractors would arrive at his home to install a mater. He was also notified of the date when the installation would occur. When the sub-contractors arrived at Larry\'s home, he obstructed the van carrying the relevant employees and equipment. When the workers attempted to work on the water meter, Larry jumped up and down on the water meter preventing its installation. Larry believes that he was justified in doing this as part of his general right to protest. Larry was arrested, and charged with an offence under section 12 of the Water Services Act, 2007 which provided as follows: "(1) A person who obstructs or interferes with -- (a) the exercise by a water services authority or any other prescribed person of powers vested in it or him or her under, or by virtue of, this Act, or (b) the compliance by any person, including the owner or occupier of a premises, with the provisions of this Act or of any notice, direction or order issued under it, commits an offence." Under section 8 of the 2007 Act it is provided that a person who commits an offence under section 12 (1) is liable on summary conviction, to a fine not exceeding €5,000, or imprisonment for a term not exceeding €15,000, or imprisonment for a term not exceeding 5 years, or both. Larry contacts you his solicitor with two specific questions: (i) He wonders if the offence under section 12 is a strict liability offence. With reference to appropriate case law, he asks you to explain strict liability in Irish Criminal Law to him, and how that law may apply in relation to section 12. [And]{.underline} (ii) Larry is also confused by section 8 of the Water Services Act, 2007, particularly the reference to summary and indictable convictions. He asks you to explain the classification of offences in Irish Criminal Law to him, with reference to appropriate case law and with particular reference to the provision as set out in section 8.',
      },
      {
        examType: 'Problem',
        description:
          'One afternoon whilst driving her car in the town, she caused the death of… Advise Mary on her possible criminal…',
        text: "Mary is 25 and lives in Sligo. One afternoon whilst driving her car in the town, she caused the death of Michael who was crossing the road at a pedestrian crossing. The evidence is that Mary's car was weaving across the road immediately before the incident. The evidence also discloses excessive speed, and that Mary did not brake at or after the impact. After colliding with Michael, Mary's car stopped only as a result of hitting the barrier at the pedestrian crossing. Prior to this incident, Mary had an unblemished driving record. She is normally a very careful driver. She had not suffered from any significant illness prior to that day. Mary claims that she experienced an altered an altered state of consciousness when she was driving the car immediately before the incident. First, she became aware of a strange smell and reported noticing colours to be unusually vivid. She also had a strange ringing sensation in her ears. The next thing she remembered was being spoken to by a member of An Garda Siochana after the incident. She has no recollection of the incident and was very unclear of the exact sequence of events. The Garda who spoke with her initially thought she had either taken alcohol or drug, neither of which pertained. The medical evidence suggests that Mary had an epileptic fit at the time of the incident, something which she never had previously and which she could not have known at the relevant time. Mary has now been diagnosed with temporal lobe epilepsy. Advise Mary on her possible criminal liability.",
      },
      {
        examType: 'Problem',
        description: 'One evening you are instructed to meet your client, Eoin, at the local…',
        text: 'You are a solicitor. One evening you are instructed to meet your client, Eoin, at the local Garda station. Eoin has been detained for questioning at the station on suspicion of having committed arson with intent to endanger life. Upon arrival at the station you are afforded the opportunity to confer with your client. Eoin denies the charge and he is adamant that he did not commit the crime. He does not understand how he can be detained when he has not been charged with an actual offence. He asks you to give him an explanation. Eoin is also wondering whether or nor you can sit in on the Garda questioning and whether or not he has to answer Garda questions. In particular, he would like you to explain to him the right to silence as it applies in Ireland. With reference to appropriate law, advise Eoin on [both]{.underline} of the following: (i) The law on detention without charge in Ireland, and the extent to which a right of access to a lawyer exists for a suspect who is detained in such circumstances. [And]{.underline} (ii) The right to silence as it applies in Garda custody.',
      },
      {
        examType: 'Essay',
        description:
          'With reference to appropriate case laws and legislation, discuss and outline the way in which the criminal law in…',
        text: 'With reference to appropriate case laws and legislation, discuss and outline the way in which the criminal law in Ireland deals with the issue of consent in relation to sexual offences.',
      },
    ],
  },
  {
    subject: 'Criminal Law',
    year: 2020,
    questions: [
      {
        examType: 'Problem',
        description:
          'Kevin was married to Elaine for 10 years. Advise Kevin on his possible criminal liability.',
        text: "Kevin was married to Elaine for 10 years. Difficulties had arisen in their marriage. Elaine erroneously suspected that Kevin was having an extramarital affair. One evening, she questioned Kevin on this suspicion in the garage of their family home. Kevin denied that he was having an affair and threatened that he would take his own life if his wife did not believe his denial. He then took a shotgun (for which he had a licence) with the intent, he claims, to put it to his own head. He also claims that the gun 'discharged accidentally' due to the unexpected movement of Elaine. This resulted in Elaine being fatally shot. Kevin alleges that Elaine lurched towards him (to prevent him from committing suicide), pushing the gun, which resulted in a shot being discharged. Kevin denies that he intended to kill his wife and claims that her death was an accident. Advise Kevin on both of the following: (a) With reference to appropriate law, advise Kevin on his possible criminal liability. [AND ]{.underline} (b) With reference to appropriate law, advise Kevin on the presumption of innocence which exists in Irish law and the obligation for the prosecution to prove the case against him.",
      },
      {
        examType: 'Problem',
        description: 'Adam was a former partner of Emma.',
        text: "Adam was a former partner of Emma. Last week, he forcibly entered Emma's house. Emma was asleep in the living room and awoke to Adam placing a hand over her mouth and pressing a knife against her neck. When Emma attempted to raise the alarm by screaming her threatened to kill her. He instructed her to remove her clothing and when she refused, he struck her to the face on a number of occasions. He proceeded to rape her vaginally while threatening her with a knife. Emma was also subjected by force to oral intercourse. These events occurred over a 4-hour period, during which Emma was confined in the living room. Emma only escaped when Adam fell asleep. With reference to appropriate law, outline and discuss Adam's potential criminal liability",
      },
      {
        examType: 'Problem',
        description:
          "'Generally speaking, positive conduct on the part of the accused is… Actus Reus.",
        text: "'Generally speaking, positive conduct on the part of the accused is required before liability can be established... This principle derived from the nature of criminal law as proscriptive, that is, as a social construct that prohibits some things and imposes punishment for the commission of these forbidden acts. Nevertheless, in some limited circumstances the actus reus for a given offence may also comprise an omission. On such occasions the criminal law is concerned with the failure of a person to act' L Campbell et al, Criminal Law in Ireland (2010, Clarus Press), p. 81 With reference to appropriate law, critically discuss criminal omissions in the light of this statement.",
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecution as to the charges, if any, that… Director.',
        text: "Advise the Director of Public Prosecution as to the charges, if any, that might be brought in all of the following cases, referring to appropriate law, and give reasons for your advice. a. John is good at computers. He decided to put his skills to use by engaging in a scam with customers of the Bank of Munster. He sent the customers deceptive emails claiming to be from the Bank of Munster and requiring them to follow a link embedded in the in the false email to a website mimicking the banks own e-banking application. Unsuspecting customers entered their e-banking details on the fake website. John then used these details to transfer fuds from the customers' bank accounts to so-called 'mule' accounts in the same bank. He then extracted the funds from the mule accounts at the bank counter or at ATMs. b. Larry, a drug addict, was desperately in need of cash. He approached, Paulo and Maria, an Italian couple who were visiting Dublin for the weekend. He pointed a blood-filled syringe at Maria, and told Paulo that he would stab her if unless Paulo handed over his wallet to him. Paulo handed over his wallet to Larry, but he was caught by two members of An Garda Siochana before he could leave the scene. c. Melissa was very jealous of her cousin, Ann. She was recently invited to a party at Ann's apartment. Melissa behaved very badly at the party and was rude to all of Ann's guests. Ann asked Melissa to leave. Melissa was shocked she was asked to leave by Ann. In protest, she locked herself in the bathroom. She then put a blanket down the toilet and repeatedly flushed it to flood the bathroom. The bathroom flooded quickly, and it also spread to the entrance hall. The flooding damaged Ann's new wood floors. d. Mal and Tom are friends. Mal dislikes his wife, Mary. One evening, whilst in the pub, Mal encouraged Tom to go home to his (Mal's) house, and have sexual intercourse with Mary, who had gone to bed. Mal suggested disingenuously that if she resisted, this was part of the pretence. Tom was not influenced by Mal's encouragement and refused to go to Mal's house.",
      },
      {
        examType: 'Problem',
        description:
          'Liam is a 22 year old man living with his father, Mike, in Cork. Advise Liam on his possible criminal liability.',
        text: "Liam is a 22 year old man living with his father, Mike, in Cork. Liam has had a substance addiction problem for approximately five years. Apart from alcohol, he had been spending €200 a week on cocaine, crystal ecstasy and cannabis. He has never previously been violent to his father. One evening, after consuming large quantities of alcohol and cocaine, Liam returned home and met his father. Liam claims that he was internally very perplexed on the evening in question. He was also very intoxicated. He believed as part of a delusion that terrorists were invading his home, and that he was being pursued by them. When Liam's father asked him if he was alright, Liam repeatedly stabbed him with a kitchen knife. Mike died as a result of the multiple stab wounds. Liam claimed that he killed him with a knife because he 'was an imposter and was not his real father', and that he 'received a message from the television to do so'. There is some medical evidence to suggest that Liam's many years of drug misuse has damaged his brain function and has reduced his control over his actions. Advise Liam on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description: 'Your client Philip has been arrested and is being held in Tralee Garda…',
        text: "You are a solicitor. Your client Philip has been arrested and is being held in Tralee Garda station. You visit him there. Philip informs you that he had consumed a large amount of alcohol that evening. He walked to his car, sat in the driver's seat, turned on the engine and the lights, and then fell asleep. Garda Flannery knocked on the car window and then opened the car door. He discovered that there was a strong smell of alcohol coming from Philip, and that his eyes were glazed and his speech slurred. Philip indicated to him that he wished to drive home. At his point, Garda Flannery formed the opinion that Philip was under the influence of an intoxicant to such an extent as to render him incapable of having proper control of a mechanically propelled vehicle in a public place. He also formed the opinion that Philip was in charge of the car and had the 'intent' to drive. He told Philip that he was under arrest for being 'drunk in charge of a motor vehicle with intent to drive it'. Philip claims Garda Flannery did not inform him of the relevant statutory provision under which he was being arrested. Philips also tells you that he has three previous convictions for drunk driving, and that he is planning to leave Ireland for the US next week to start a job. He wonders if this will impact on any bail application which he might make, and what, if any bail conditions, might apply. With reference to appropriate law, advise Philip on [both]{.underline} of the following: a. The requirements for a lawful arrest, particularly the extent to which he should be informed of the factual basis and legal authority for his arrest. [AND]{.underline} b. The factors that will be taken into account in his bail application, and the types of conditions which can attach if Philip is admitted to bail.",
      },
      {
        examType: 'Problem',
        description:
          'Larry was convicted of the murder of his daughter in 2015 in the Central… Murder.',
        text: "Larry was convicted of the murder of his daughter in 2015 in the Central Criminal Court. During his trial, he raised the defence of insanity, and stated that at the time of the relevant act, he was suffering from schizophrenia. The jury rejected Larry's defence of insanity. Larry has commenced his prison sentence. Recently new evidence has come to light, which was not available at trial, which shows that Larry was suffering from paranoid schizophrenia at the time he committed the crime. Larry believes he is a victim of a miscarriage of justice. He asks you to which court he can appeal, and he also asks you to outline the scope, composition and jurisdiction of this court. Bernie was a member of the IRA and has a long list of convictions for terrorist related offences. Recently he has been charged with indicatable tax offences under the Taxes Consolidation Act 1997. The DPP is concerned that the ordinary Courts are inadequate to secure the effective administration of justice and the preservation of public peace and order in relation to Bernie's trial. Bernie asks you explain to him where the case will be held given the DPP's concerns, and he also asks you to outline the scope, composition and jurisdiction of this court. Advise [both]{.underline} Larry and Bernie on the scope, composition and jurisdiction of the respective courts where their cases will be heard.",
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions as to the charges, if any, that… Mortgage, Company.',
        text: "Advise the Director of Public Prosecutions as to the charges, if any, that might be brought in [all]{.underline} of the following cases, referring to appropriate law and giving reasons for your advice. a. Gavin lives in Cork. His friend, Tommy, recently called to his house. Tommy took 4 kayaks out of a van and told Gavin that he had stolen them from a shop in Waterford. He asked Gavin to mind them for a few weeks until he figured out what to do with them. Gavin did as requested, though he was not involved in the theft of the kayaks. The Gardai subsequently discovered the kayaks in Gavin's shed. b. Dennis and Michael run a company selling health products. In order to attract a new investor, Seamus, they altered their financial accounts by misstating 15 transactions. These misstatements purported to show a positive balance in the company's accounts of €750,000 when in reality it was operating at a loss. Seamus invested €200,000 in the company and soon discovered the fraud. c. Petra is a witness in an action between her and the Bank of Leinster. The proceedings were an application by the bank in respect of a mortgage which it had entered into with Petra. There was an outstanding sum of €40,000 on the mortgage. Petra was very emotional and started to object during the proceedings, claiming that Ms Justice Lex was doing her 'a grave injustice'. Ms Justice Lex tried to continue with the proceedings, but she was interrupted, repeatedly, by Petra who claimed that the judge was a 'puppet in the hands of the banks', and that she 'had a right to speak in court'. Petra also shouted at the lawyers for the bank and the judge that they 'had blood on [their] hands', she also threw leaflets around the court which stated that the justice system 'only protected big business'. d. Dan is a farmer living I Co Mayo. He hired Mary, an accountant, to do his accounts. Mary did the work and charged him an agreed rate which was fair having regard to industry norms. Dan, however, thinks that Mary's prices were exorbitant and decided to take some revenge. He recently sent her three anonymous letters which contained numerous profanities and insults, suggesting she was a 'horrible person' and a 'corrupt cow'. Mary was very shocked on receiving these letters and passed them on to the Gardai. Dan also sent an anonymous letter to Mary's employer 'to warm him' about Mary, stating that she was a 'corrupt and exploitative bean counter'. Leaflets were also put on the car windscreens of Mary's neighbours, claiming that she was a 'corrupt swindler' and a 'fraudster'. Dan also sent emails from a hushmail account to Mary and her colleagues in work alleging that she is a 'fraudster'. Mary is very shocked and frightened by all of these communications. She has never engaged in fraudulent behaviour.",
      },
      {
        examType: 'Problem',
        description: 'Joan has links with a criminal gang. Mens Rea.',
        text: "Joan has links with a criminal gang. Her neighbour, Fidelma, is a key prosecution witness in a serious assault case involving one of the gang members. Joan allegedly approached Fidelma and told her that 'her house would be burnt to the ground' if she gave evidence in the case. Joan has now been charged with the offence of intimidation under section 41 of the Criminal Justice Act 1999. This provision creates the offence of intimidation of certain classes of persons, 'with the 'intention thereby of causing the investigation or the course of justice to be obstructed, perverted or interfered with'. Section 41(3) of the Act provides that proof that an act of intimidation was committed 'shall be evidence that the act was done with the intention required'. Joan approaches you, her solicitor, with two specific questions. First, she wishes you to explain to her what is meant by a mens rea requirement of intention. Secondly, she believes that she has a right to a presumption of innocence, yet section 41 (3) appears to relieve the prosecution of the requirement to prove the mens rea element of the offence, specifically an intention to pervert or interfere with the course of justice. With reference to appropriate law, advise Joan on both of the following: (a) The law on the mens rea requirement of intention; AND (b) The right to a presumption of innocence in Ireland, and how it would apply in relation to section 41(3) of the Criminal Justice Act, 1999.",
      },
      {
        examType: 'Essay',
        description:
          '"It cannot be that provocation exists as a defence which is so wide as to offend the administration of justice by it…',
        text: '"It cannot be that provocation exists as a defence which is so wide as to offend the administration of justice by it potentially excusing revenge, cold-blooded killing, thought-out vengeance, gangland retribution, the generation of reaction for the purpose of dispatching a targeted victim, inducing disputes with minorities for the purpose of terrifying them through the homicide of one of their number, undermining the security of women, or enabling murder to cease to be the crime of ultimate obloquy through partially excusing it by calling an intentional killing using disproportionate force in response to a trivial insult, manslaughter...Provocation is a defence which has always been limited by objective elements and by the need for the account of loss of self-control to be genuine and not contrived or bogus or set up to enable murder. There must be a sudden, and not a considered or planned, loss of self-control." The People (DPP) v McNamara [2020] IESC 34, per Charleton J at paras 31-40 With reference to appropriate law, critically discuss the law on provocation in Ireland in the light of this statement. [You should note that you are not expected to be familiar with the judgment in answering the question].',
      },
      {
        examType: 'Problem',
        description:
          'Declan was a 55-year-old man, who was not liked in his local community. Advise Michael, Mark, Matt and Luke on their…',
        text: "Declan was a 55-year-old man, who was not liked in his local community. For the most part, he was perceived as an annoying, grumpy individual who was very critical and judgmental of neighbours. He was not helpful or generous and was also prone to making inappropriate statements and gestures. Most people tolerated him, however, because he was viewed as harmless. Michael, however, did not like Declan. He (Michael) had developed a tough reputation in the neighbourhood, as a 'local enforcer'. He was also an active member of a violent criminal gang. Despite the absence of any specific act of provocation, Michael decided that he was going to teach Declan a lesson. This would help to confirm his reputation in the community. He met three of his friends, Matt, Mark and Luke, and agreed with them that they would give Declan a 'good hiding, a lesson that he would never forget'. They armed themselves with various blunt weapons, including hurleys and hockey sticks, and waited outside Declan's house. When Declan came out, they attacked him. Declan collapsed to the ground, where he was further assaulted with blunt weapons and kicked. At this point, Luke produced a knife, and stabbed Declan four times, killing him. Michael, Matt and Mark claim that they did not actually know that Luke would stab and kill Declan. All three, however, will make different claims in relation to their enterprise. Michael claims that he agreed and intended to cause serious harm to Declan, but never agreed to kill him. Matt claims that he believed that they were only going to cause harm to Declan, and that he never agreed to cause serious harm or to kill the deceased. He also claims that he only agreed to take part in the attack because he was afraid of Michael, who had threatened 'to beat him within an inch of his life if he chickened out'. Matt took this threat seriously. Mark claims that he also only agreed to commit an assault causing no more than harm to Declan. He did foresee the possibility that Luke, who is also a member of the violent gang, might possibly bring a knife to the attack on Declan, 'because he often has a knife on him'. He also did foresee that Luke might possibly use a knife, 'because he is that sort'. Nevertheless, Mark claims that he proceeded with the enterprise with at most an intention to cause harm. Advise Michael, Mark, Matt and Luke on their possible criminal liability.",
      },
      {
        examType: 'Problem',
        description: 'Your client, Terence, makes an appointment to seek your advice. Director.',
        text: 'You are a solicitor. Your client, Terence, makes an appointment to seek your advice. Terence is alleged to be a member of an organised crime gang operating in Cork. He has been charged with an assault causing harm under section 3 of the Non-Fatal Offences Against the Person Act 1997. Section 3(2) provides as follows: (2) A person guilty of an offence under this section shall be liable--- (a) on summary conviction, to imprisonment for a term not exceeding 12 months or to a fine not exceeding £1,500 or to both, or (b) on conviction on indictment to a fine or to imprisonment for a term not exceeding 5 years or to both. It seems that the Director of Public Prosecutions will be electing for trial on indictment and will also issue a certificate stating that in its opinion the ordinary courts are inadequate to secure the effective administration of justice and the preservation of public peace and order. Terence wants to have a fuller understanding of both matters. With reference to appropriate law, advise him on both of the following: (i) The classification of offences, particularly the distinction between summary and indicatable offences, and (ii) The scope, composition and jurisdiction of the Special Criminal Court to hear the case.',
      },
      {
        examType: 'Problem',
        description: 'With reference to appropriate law, advise the Director of Public… Director.',
        text: "With reference to appropriate law, advise the Director of Public Prosecutions as to the offences, if any, which may have been committed in each of the scenarios set out below: (i) Peter and Mary met initially online and started to engage in a consensual sexual relationship. One evening, Mary agreed to have sexual intercourse with Peter, but only if he used a condom. Peter agreed, but secretly removed the condom before penetration had occurred. Mary was horrified when she discovered that Peter had unilaterally removed the condom prior to sexual intercourse with her. (ii) Tom and Anne are married. They have not had any sexual relations in three years. Tom was very annoyed by this. One evening, he locked Anne in the bedroom, and forcibly removed her clothes. He then had sexual intercourse with her. Anne did not resist or scream, but she was deeply traumatised by the incident. (iii) Veronica attended a house party organised by her friend, Dave. They both study the same degree course in university. Veronica drank a lot at the party and was sleeping it off on Dave's couch. For 'a laugh', Dave removed Veronica's underwear whilst she slept. He also inserted a small hand sanitiser bottle into her vagina. He then beckoned some of his friends to show them what he had done. Another friend of Veronica's, Paul, intervened at this point to protect Veronica. He also called An Garda Síochána. (iv) Linda is a 24-year-old woman. Two years ago, she suffered brain damage as a result of a motorcycle accident. As a result, she has a permanent cognitive impairment, which is classified in the moderate range. One afternoon, Linda's mother, Mary, asked Linda to go to the shop to purchase some food items. Whilst in the shop, Linda met John, a 60-year-old man who lives in the neighbourhood. John invited Linda back to his house to see his stamp collection. John then invited her upstairs where he had sexual intercourse with Linda. John claims that it was consensual. Linda's mother, Mary, claims that Linda was not capable of consenting and that she was very distressed when she came home from John's house.",
      },
      {
        examType: 'Problem',
        description: 'With reference to appropriate law, advise the Director of Public… Director.',
        text: "With reference to appropriate law, advise the Director of Public Prosecutions as to the possible criminal liability arising in both of the following scenarios: (i) Peter is a 13-year-old boy. He often visits his neighbour's house, where he plays with Norah, a 10-year-old girl. Norah claims that Peter made her feel very uncomfortable, as he often squeezed and fondled her buttocks and chest when they played together. She also claims that Peter told her that this was 'their secret', and that he would kill her if she told anyone. AND (ii) John is a beekeeper. He decided to transport his collection of bees in his car, to bring them to the garden of the new home which he has recently purchased. He got up very early in the morning and secured the hives in the back seat of his car, ensuring that the entrances were blocked. He then commenced the 5-mile journey to his new home. Just as he was passing a cyclist on the road, Mary, a number of bees escaped from their hives in the car. Approximately 200 or so bees began to sting John as he was driving. This caused John to lose control. He crashed into Mary, killing her instantly. John has been very badly stung in the incident and is very shocked at what has happened. He is a very careful driver who has never previously had a driving accident.",
      },
      {
        examType: 'Problem',
        description:
          'Helen lives in Dublin and has a very bad drug habit. Advise Mark and Helen on their possible criminal liability.',
        text: "Helen lives in Dublin and has a very bad drug habit. After consuming a cocktail of drugs and alcohol, she approached Mark, a pedestrian who is walking on Grafton Street on a Friday afternoon. She pointed a syringe at Mark and demanded that he give her his wallet. Mark was slow in handing over his wallet, as he could see that she was clearly in an inebriated state. Helen panicked, and stabbed Mark in the arm with the syringe. She then grabbed the wallet and ran off. Mark followed Helen and quickly caught up with her. He knocked her to the ground and proceeded to kick and punch Helen repeatedly in the legs, arms and chest. He also stamped on Helen's head on a number of occasions. The attack lasted for 10 minutes. Helen lost five teeth and had five ribs and her jaw broken as a result of Mark's actions. Mark claims that the force he used was necessary in the light of Helen's initial attack. He also claims that his wallet was precious to him, and that he needed to ensure that he retrieved it. Advise Mark and Helen on their possible criminal liability.",
      },
      {
        examType: 'Problem',
        description: 'With reference to appropriate law, advise the DPP as to the offences, if…',
        text: "With reference to appropriate law, advise the DPP as to the offences, if any, which may arise in each of the following scenarios: (i) Roddy and Martin work together in a carpet factory. One morning, Roddy gave Martin an envelope and asked him to look after it for a while. The envelope contained four small uncut diamonds which had been stolen from a jewellery shop in Galway. Martin, who had nothing to do with the theft of the diamonds, did not open the envelope. He took it and placed it in a secure locker in his workplace. Two days later, the Gardaí, in a lawful search, discovered the envelope in Martin's locker (in answering this section of the question, you are only concerned with Martin's possible criminal liability). (ii) Liam is a computer engineer. He is disappointed that his nephew, Tim, missed his first choice engineering course in Galway by 3 CAO points. Deciding that he could put his skills to good use, he hacked into the secure computer network of the Central Applications Office, and increased Tim's overall CAO points total by 10 points so that he was awarded a place on the engineering degree in Galway. Tim did not know that Liam did this. (iii) David, aged 40, encourages Patrick, aged 18, to have consensual sexual intercourse with Debbie who is aged 15 but looks older. David knows that Debbie is aged 15. Patrick thinks that Debbie is 18. Just as Patrick and Debbie are about to embark on consensual sexual intercourse, Debbie's mother interrupts them. She reports the matter to the Gardaí. Alan and Barry have allegedly engaged in a number of high-profile burglaries and robberies. The Gardaí have both of them lawfully under surveillance under the Criminal Justice (Surveillance) Act 2009. On one particular evening, the Gardaí, with the assistance of surveillance devices, listened to and made a recording of Alan and Barry agreeing to break into a high-profile banker's house to steal all of the artwork. They have not yet decided on the specific date, equipment to be used, or entry and exit details, but they have agreed to do 'the job'.",
      },
    ],
  },
  {
    subject: 'Criminal Law',
    year: 2021,
    questions: [
      {
        examType: 'Problem',
        description:
          'The Gardaí receive information that two anarchists, Jim and Jane, are… Advise Michael, Mary and John on their possible…',
        text: "The Gardaí receive information that two anarchists, Jim and Jane, are planning to detonate a bomb in Grafton Street in Dublin imminently. It is intended that the bomb will cause widespread damage and loss of life. The Gardaí are also aware that Jim and Jane are on route to Dublin city centre and that they are carrying a large holdall bag. Michael, Mary and John are members of the Garda Armed Response unit. They have been given instructions to stop Jim and Jane at all costs so as to safeguard innocent lives. They confront Jim and Jane as they approach Grafton Street and ask them to step away from the holdall bag and put their hands up above their heads. Jim and Jane hesitate. Jim reaches into his pocket and Jane reaches into the bag. All three members of the Garda Armed Response Unit open fire, killing Jim and Jane. According to the pathologist's evidence, Jim was hit by eight bullets, and Jane was hit by six. It transpires that Jim was reaching into his pocket for his identity card, and Jane was reaching into the holdall bag to get her phone so that she could record her interaction with the Armed Response Unit. Apart from her phone, the only other items in the holdall bag were two rain jackets. It is likely that both were on a reconnaissance mission and a bomb is subsequently discovered in a search of their house. Michael, Mary and John admitted that they shot to kill. They honestly believed, in the light of the information that they had been given that it was necessary to shoot Jim and Jane in order to prevent them from detonating a bomb and causing serious loss of life. The actions which they took, in obedience to superior orders, were thus perceived by them as absolutely necessary in order to safeguard innocent lives. They also accept that their honest beliefs subsequently turned out to be mistaken. Advise Michael, Mary and John on their possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions as to the homicide charges, if… Director.',
        text: "Advise the Director of Public Prosecutions as to the homicide charges, if any, that might be brought in each of the following cases, referring to appropriate law, and giving reasons for your advice: (i) Alan drives a courier van. One particular day, he was late with his deliveries. Whilst driving too fast, he was involved in a very serious traffic incident in which the driver of a car, Tina, was killed. It appears that Alan had tried to overtake another vehicle at excessive speed. He lost control of the van on a wet road and crashed into Tina's car. (ii) William and Patricia have a difficult relationship. During a row, William flung Patricia to the ground. He then kicked her a number of times whilst she was on the ground. As a result of the kicks, Patricia's liver ruptured. William knew that Patricia's injuries were serious, and he immediately sought help. It was too late however, and Patricia died on her way to hospital. William claims that he did not intend to kill or cause serious injury to Patricia. (iii) Liam worked as a steeplejack for Larry's firm. He fell to his death one afternoon whilst carrying out repair work on a high building. Liam was using the firm's Cherry Picker which had a telescopic boom. The cause of death appears to be that the cherry picker was defective -- the cage broke whilst Liam was working, causing him to fall 80 feet on to hard ground. It appears that Larry was aware that the cage was somewhat defective. He planned to fix it the following week.",
      },
      {
        examType: 'Essay',
        description:
          "'The defence of duress arises when an accused claims that a person or set of circumstances forced them to act in an…",
        text: "'The defence of duress arises when an accused claims that a person or set of circumstances forced them to act in an unlawful way that would not have been their free choice. When duress comes from an individual it is known as duress by threats or duress per minas; when the threat arises from an emergency situation rather than from an explicit threat by another it is known as duress by circumstances.' Campbell, L., Kilcommins, S, O'Sullivan, C and Cusack, Criminal Law in Ireland: cases and materials (2nd ed) (Dublin: Clarus Press, 2020), p. 929 Critically discuss the defence of duress in Ireland in the light of this statement.",
      },
      {
        examType: 'Problem',
        description:
          'Jim worked as a bin man in Galway. Advise Jim on his possible criminal liability.',
        text: "Jim worked as a bin man in Galway. One day, he saw Victoria, a stranger passing him on the street. Jim followed her, to find out where she lived. Three days later, Jim forced his way into Victoria's apartment, threatening to kill her with a knife and making aggressive sexual advances towards her. It was clear to Victoria that he would rape her. Though very frightened, she attempted to manage the situation so as to protect herself. She sought to dissuade Jim by 'trying to make him believe that he could be her boyfriend and he did not have to do it this way'. Despite these efforts, Jim carried her into the bedroom where he continued to touch and rub himself against her and tried to pull down her underwear. After the complainant 'told him he could come to her house anytime', he relented and they 'went back to the living room and started talking'. He took off the surgical gloves he had been wearing during the attack, saying that he was 'not going to be needing these anymore'. Victoria later managed to escape from the apartment and informed the Garda Síochána of what had happened. Advise Jim on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'Tim has been found in possession of cannabis with a market value of… Regulation.',
        text: "Tim has been found in possession of cannabis with a market value of €30,000. He has been charged with an offence under section 15A of the Misuse of Drugs Act 1977, as amended, which reads as follows: (1) A person shall be guilty of an offence under this section where -- (a) the person has in his possession, whether lawfully or not, one or more controlled drugs for the purpose of selling or otherwise supplying the drug or drugs to another in contravention of regulations under section 5 of this Act, and (b) at any time while the drug or drugs are in the person's possession the market value of the controlled drug or the aggregate of the market values of the controlled drugs, as the case may be, amounts to £10,000 or more. Tim knows that ordinarily the prosecution must prove each element of an offence. In this instance, he is of the view that it is a necessary element of the offence that he has to be aware that the quantity of the controlled drug alleged to have been in his possession exceeded the statutory amount. The prosecution, however, will argue that this element of the offence is strict liability. Tim asks you, as his solicitor, to explain, with reference to appropriate law, the concept of strict liability to him and to advise him on whether you believe it will apply in respect of this particular element of the offence.",
      },
      {
        examType: 'Problem',
        description:
          'With reference to appropriate law, advise the DPP as to the offences, if… Frustrat.',
        text: "With reference to appropriate law, advise the DPP as to the offences, if any, which arise in all of the following scenarios: (i) Martin is a prisoner in Mountjoy prison. One evening, he asks his friend and fellow inmate, Luke, to hit him as hard as he can with a mug so that he 'draws blood'. Martin wants Luke to do this so that he can be transferred to a single cell for a few days - to get some 'rest and relaxation'. Luke did as requested and hit Martin three times over the head with a mug which was wrapped up in a sock. He only did it because Martin pleaded with him to help. Martin will have a permanent 20-centimetre scar as a result of the injuries which he received. [For the purposes of this question, you are only required to advise the DPP on Luke's liability]. (ii) Dan had been in a relationship with Tina. They are both students in Cork. Two weeks ago, Tina broke up with him, telling him that they could only be friends. Dan has taken this badly. He rang her 20 times begging her to go back out with him. He also left 40 text messages and has waited a number of times outside her student residence. Last week Tina travelled from Cork to Letterkenny to visit her grandmother. She was shocked to discover that Dan had followed her in his car as she travelled on a bus. He tried to speak to her as she disembarked, but Tina ran into a shop to get away from him. Dan waited for her outside and refused to leave until she spoke with him. Tina was terrified and reported the incidents to An Garda Síochána. (iii) Tom is taking part in what was supposed to be a peaceful demonstration in Dublin city centre. He is protesting about restrictions on freedom which have been introduced as a result of Covid-19. As he marched, he also carried and displayed a placard depicting representations which could be viewed as insulting or obscene particularly to members of An Garda Síochána and members of the government. He was warned by the Gardaí to desist from displaying the placard but ignored that warning. When the placard was taken from him by members of An Garda Síochána, he was part of a group of 18 people who were present together who threatened to use violence against Garda members. (iv) Jack is a member of a terrorist organisation, the IRA. He regularly arranges meetings to discuss their activities. Recently he attended a 'court of inquiry' at a house in Sligo. The purpose of the inquiry was to ascertain how certain IRA operations were frustrated, involving the arrest and prosecution of IRA members. He is well known to An Garda Síochána, and many high ranking officers have a very strong belief that he is a member of the IRA.",
      },
      {
        examType: 'Problem',
        description: 'Eileen and Niall had no recorded employment or business.',
        text: "Eileen and Niall had no recorded employment or business. Their sole recorded income consisted of social welfare payments. In 2018 they bought a strip of land in Waterford for €300,000. The Criminal Assets Bureau (CAB) now claims that land was acquired with assets derived from the proceeds of crime. They claim that Eileen and Niall are drug dealers and that the property 'constitutes, directly or indirectly, proceeds of crime\" as provided for under section 3 of the Proceeds of Crime Act 1996 Act. Eileen and Niall have not been found guilty of any drug trafficking offences. Nor have they been charged with any such offences. They are shocked that their land could be seized from them without any need for CAB to prove that they committed criminal offences. They believe that CAB's investigation and actions relate to criminal rather than civil wrongdoing. They also believe that they are deprived of important criminal law safeguards, such as the presumption of innocence, the standard of proof beyond reasonable doubt, the right to a jury trial and the rule against double jeopardy. They come to you, a solicitor, to seek your advice on how the criminal law is defined in Ireland, and whether CAB's investigation could be seen as a criminal rather than civil matter. With reference to appropriate law, advise Eileen and Niall on the definition of criminal wrongdoing in Ireland and whether CAB's investigation under the Proceeds of Crime Act 1996 could be seen as a criminal law matter.",
      },
      {
        examType: 'Essay',
        description: 'Terence has three previous convictions for robbery and assault.',
        text: "Terence has three previous convictions for robbery and assault. He committed one of those offences whilst he was on bail. He recently approached his girlfriend's ex-boyfriend, Seamus, and in an unprovoked attack threatened him with a gun and bit a large piece off his nose. The Gardaí gave chase immediately and stopped his car some five minutes after the incident. When they stopped his car, they saw a firearm in the front passenger seat. He was arrested on suspicion of possessing a firearm and committing a serious assault. He was detained without charge under section 4 of the Criminal Justice Act 1984, as amended. During his detention in custody -- in which he is afforded all of his custody rights -- he was asked, as provided for under section 18 of the Criminal Justice Act 1984, as amended, to account for his possession of the firearm. Terence remained silent throughout. It now seems likely that the prosecution will seek to have his silence on the presence of a firearm in his car admitted as part of the evidence against him in the case. Terence knows that you are a solicitor. He seeks your advice on both of the following issues: a. He asks you to explain to him, with reference to appropriate law, the right to silence in Garda custody in Ireland and whether an adverse inference can be drawn from his silence in this case. AND b. He also wonders if his previous convictions will be significant in his forthcoming bail hearing. He asks you to explain this to him by referencing appropriate law.",
      },
      {
        examType: 'Problem',
        description:
          'Kevin, John and Jack are members of a small and inexperienced crime gang… Advise Kevin, John, Jack and Deco on their…',
        text: "Kevin, John and Jack are members of a small and inexperienced crime gang based in Galway. They have loose affiliations with a much bigger and more organised crime gang in Dublin. They like the notoriety which this association brings them, but most of their criminal wrongdoing to-date has been non-serious in nature. Recently, Kevin received a call from a crime gang boss in Dublin, Deco, requesting that Kevin's gang carry out a 'small job' in Galway. Deco also told Kevin that he 'would be very, very disappointed with him, if he did not do the job'. In particular, he wanted the Galway gang to kidnap the parents of a high-ranking Garda officer who had Deco under investigation in Dublin. Deco gave Kevin their names, Jim and Mary, and their address in Galway. He instructed Kevin to break into their house with his gang, and to 'rough them up for a few hours'. Kevin, John and Jack planned the crime. They entered the house of Jim and Mary on a particular night, carrying baseball bats. They hit Mary and Jim a few times and then locked them in a bedroom. Mary had a phone and called the emergency services. Jack heard her whispering and burst into the room to discover Mary on the phone. He pulled out a gun and shot Mary, killing her. The Armed Response Unit of An Garda Síochána arrived a short time later. All three men were arrested in the house, and Deco was arrested a short time later. Kevin, John and Deco claim that they did not know that Jack had brought a gun with him. They claim that it was never part of the plan, and they never agreed that they would kill Mary. Kevin also claims that he was afraid of Deco, particularly if he did not carry out his instructions as requested. He claims that he had nothing against Mary or Jim and would not have entered their house, except 'out of fear of not doing as Deco requested'. Advise Kevin, John, Jack and Deco on their possible criminal liability.",
      },
      {
        examType: 'Problem',
        description: 'You are requested to meet your client, Roy, at the local Garda station.',
        text: "You are a solicitor. You are requested to meet your client, Roy, at the local Garda station. Roy has been detained for questioning in relation to an aggravated burglary in Blackrock in Cork. He was arrested at the scene and detained without charge under section 4 of the Criminal Justice Act, 1984. Having met with you and having received your advice, he has been requested by a Garda interviewer to account for his presence in the house in Blackrock at or about the time the offence is alleged to have been committed. The Garda interviewer puts it to Roy that he reasonably believes that his presence in the house at the time may be attributable to his participation in the offence. He also informs Roy that a failure or refusal to account for his presence at the house may corroborate other evidence in relation to his involvement in the aggravated burglary. This is Roy's first time in Garda custody. He does not understand how he can be detained when he was not charged with any actual offence. He asks you to give him an explanation of the law of detention without charge in Ireland and the safeguards that he is entitled to whilst so detained. Roy is also wondering about his right to silence in Garda custody, and whether he has to answer any questions, but particularly in relation to his presence in the house in Blackrock. Advise Roy on both of the following: (i) the law of detention without charge in Ireland and the safeguards that he is entitled to whilst so detained. (ii) his right to silence in Garda custody, particularly in relation to his presence in the house in Blackrock.",
      },
      {
        examType: 'Problem',
        description:
          'Charlie is a student at college in Waterford. Advise Charlie on his possible criminal liability.',
        text: 'Charlie is a student at college in Waterford. He is an outstanding computer hacker and has recently become much bolder in demonstrating his talents. Last week, he hacked into the computer system of the Department of Defence. The data of numerous employees has been compromised as a result, and it is still not certain how many people were affected. The type of information that was exposed included personal and salary data, as well as PPS numbers and medical information. Charlie also surfed around the system copying files and passwords. He wanted the Department of Defence to know that he had been in the system and inserted the following strange note on the system: "Your security system is terrible. I will continue to disrupt your systems until you admit that you are corresponding with aliens." He also brought down the Department of Defence\'s computer network in the country, taking about 1,500 computers out of service for six hours. Charlie was traced to a student bedsit on the Cork Road in Waterford. When arrested, Charlie claimed that Unidentified Flying Objects (UFOs) were the reason for his hack. Charlie is convinced that the Department of Defence is hiding alien antigravity devices and advanced energy technologies which, he believes, were discovered in a bog in Mayo. He claims that he hacked into the Department\'s computer system to ensure that this information was released for the benefit of society. Charlie has been diagnosed with treatment- resistant acute schizophrenia. His delusions regarding UFOs are almost a permanent feature of his illness and have been repeatedly documented in his medical records. Advise Charlie on his possible criminal liability.',
      },
      {
        examType: 'Problem',
        description:
          'John is a 23-year-old man who started work in a factory in Carlow. Advise John on his possible criminal liability.',
        text: "John is a 23-year-old man who started work in a factory in Carlow. After three days in the job, a colleague, Michael, who was 36 years of age, asked if he would like to go to a movie in the town. John thought that the request was unusual, but Michael seemed popular, and he thought it would be impolite to refuse. When he accepted the invite, they agreed that John would pick Michael up from his apartment and that they would then drive from there to the cinema. After John had picked up Michael and was driving to the cinema, Michael suddenly leaned across and started kissing and touching him. John was shocked and stopped the car. He asked Michael to get out of his car. Michael did so but proceeded to kick the car door. When John got out of the car to prevent Michael from causing further damage, he was kicked and punched by Michael. At this point, John reached into the side pocket of the car door and pulled out a Stanley knife. He slashed frantically. One of the slashes partially cut Michael's carotid artery. Michael instantly fell to the ground. It was clear that there was active arterial bleeding. John immediately rang for an ambulance and tried to stop the bleeding by applying pressure to the wound. Unfortunately, the ambulance crashed on the way to the incident, which delayed its arrival by 4 minutes. As it arrived at the scene, Michael died, having lost too much blood from the injuries received. John is devastated. The knife was only in the car because he had been fitting a carpet for his mother earlier that evening. He only used it against Michael, he claims, to defend himself against the attack. Advise John on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'In People (DPP) v Reilly [2005] 3 IR 111, McCracken J noted the following… Intoxication.',
        text: 'In People (DPP) v Reilly [2005] 3 IR 111, McCracken J noted the following about the defence of intoxication: "It is...illogical that a person should escape the consequences of an action which he performed while drunk, while he would be liable for the results of such action had he been less drunk, provided of course that his consumption of alcohol was voluntary...The court must have regard to the rights of an accused person, but it must also have regard to the interest of the public at large who are entitled to be protected from acts of violence. If a person by consuming alcohol induces in himself a situation in which his likelihood to commit acts of violence is increased, particularly to the stage where he commits an act which he would not have committed had he not consumed the alcohol, then surely the courts would be failing in their obligations to the public if they allowed the cause of his violence, namely the alcohol, to excuse his actions. The reasoning behind the Majewski decision appears to this court to achieve the balance between the rights of the accused...as against the rights of the public to ensure that the accused will be held liable for actions which were induced by alcohol voluntarily consumed". With reference to appropriate law, discuss the defence of intoxication in the light of this statement.',
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions as to the charges, if any, that… Director.',
        text: "Advise the Director of Public Prosecutions as to the charges, if any, that might be brought in both of the following cases, referring to appropriate law, and giving reasons for your advice: (i) Mick has a long history of crime. One night, he broke into an apartment in Tralee looking for any valuables which he could steal. He saw that the occupant, Lynn, was asleep in her bed. Though he did not know her, he climbed on top of her, putting a knife to her throat. He then tried to have sexual intercourse with her but was unable to do so due to erectile dysfunction. He got up from the bed, and punched Lynn twice in the face, breaking her nose. He then left the apartment. (ii) Luke and Mike act respectively as the Chief Executive Officer and the Chief Financial Officer of a private financial institution, Blunderbus, in Dublin. Due to very poor and very risky lending practices, Blunderbus has found itself in great financial difficulty and it is unlikely that it will be able to continue trading. Luke and Mike met in the latter's office and hatched a plan to deceive depositors and investors in to believing that Blunderbus was healthier than it actually was. In particular they agreed to falsify their accounts so as to create the impression that the deposits in Blunderbus were €1.2 billion larger than the actual figure. Fortunately, Mike's Personal Assistant, Jacinta, overheard their conversation, and reported the matter to the Office of the Director of Corporate Enforcement.",
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions as to the charges, if any, that… Company, Director.',
        text: "Advise the Director of Public Prosecutions as to the charges, if any, that might be brought in all of the following cases, referring to appropriate law, and giving reasons for your advice: (i) David expected his rich uncle, Toby, to leave him a valuable site, in Wexford, as a gift or in his will. The site is situated adjacent to David's house. This did not happen, and Toby lawfully sold the site to a property developer, Linda. She bought the site for a fair price and received planning to build 24 houses on the site. A construction company moved in last week to commence the building work. Yesterday, David, broke the locks on the gates and used an excavator on the site to dig up trenches and ditches, causing €25,000 worth of damage. He also set fire to the excavator. David does not deny causing the damage but claims that he is protecting his land. He stated: 'It was my property from day one. It should have been given to me'. (ii) Lisa, a 22 year from Sligo, witnessed her friend, Danny, seriously assaulting an elderly man in the town centre. She has been called by the prosecution to testify in the case as a witness. Lisa is a reluctant witness and hates the Gardaí. When she was called to give evidence, she stepped into the witness box and swore the oath. She then shouted obscenities at other prosecution witnesses who were present in court, and at the trial judge. Before the trial judge could restore order, she threw hundreds of skittles across the well of the courtroom, and then attempted to leave. (iii) Tim has a gambling problem and urgently needed €10,000 to pay a debt. In desperation, he stood outside the post office in Drumcondra with a baseball bat. He also filled a syringe with red ink. As Sheila, a post office employee, entered the building with a cash box containing €4,000, Tim approached her and threatened to hit her or spray her if she did not give him the cash box. Sheila was terrified and gave him the cash box. Tim fled the scene in his car. CCTV footage at the scene revealed the number plate of Tim's car and it was not long before he was arrested. (iv) Tom is married to Mary. They live on a rural farm in Co Tipperary. Tom is very controlling and abusive to Mary. He follows her constantly to make sure that she is not having an affair. He also eavesdrops on her conversations with friends, and regularly checks her bank account and her purse to monitor her spending. Last night, Mary was two hours late coming home from her mother's house. This enraged Tom. When Mary arrived home, he took her to one of the sheds at the back of the house and told her that he would 'hang her from the rafters'. He also threw a rope at her, the one he said he would use. He then took her mobile phone and locked her in the shed for the night. He only opened the door the following morning. Mary was very frightened and distressed.",
      },
      {
        examType: 'Essay',
        description:
          'With reference to appropriate law, please provide advice on both of the following: (i) Lydia was tried in the Central…',
        text: "With reference to appropriate law, please provide advice on both of the following: (i) Lydia was tried in the Central Criminal Court in 2010 with the murder of her mother. She was convicted of the murder, as the jury did not accept her defence that the evidence established that she killed her mother whilst legally insane. Subsequently new evidence in the form of psychiatric assessments has come to light which demonstrates that Lydia's symptoms and behaviour were consistent with schizophrenia, and that this diagnosis was present in 2010 when she killed her mother. Lydia believes that the medical assessments and report constitute 'newly discovered facts' which indicate that there was a real risk that the murder conviction involved a 'miscarriage of justice'. She believes that if this diagnosis of schizophrenia was an accepted fact at the time of the original trial, the jury may have taken a different view of the evidence and concluded that Lydia was insane at the time of the killing. Lydia now wishes to know the court to which she should apply to have her conviction overturned. She asks you, by referencing appropriate law, to fully discuss the composition, scope, and jurisdiction of this court. (ii) One evening, Denis was at a party with his friend Luke. He spotted his sister, Lucy, lying asleep on a couch, having drank too much alcohol. Denis despises Lucy. He feels that she is a 'drama queen', and that she has taken up far too much of the love and attention of their parents. Denis suggests to his friend, Luke, that he should fondle Lucy's breasts, and perhaps engage in anal intercourse with her. Denis also says that although Lucy cannot expressly consent because she is so intoxicated, he knows that she would if she could as she really likes Luke, and she 'dreams of sexual encounters of this kind'. Denis knows that what he has suggested is completely untrue. He just wants to see Lucy humiliated. Luke is very suspicious. He refuses to do as Denis suggests. He told Lucy the following day about what had happened. Lucy referred the matter to the Gardaí.",
      },
    ],
  },
  {
    subject: 'Criminal Law',
    year: 2022,
    questions: [
      {
        examType: 'Problem',
        description: 'Advise the DPP as to the charge, if any, that might be brought in…',
        text: "Advise the DPP as to the charge, if any, that might be brought in [all]{.underline} four of the following scenarios, referring to appropriate law, and giving reasons for your advice. i. Tim was at a student house party in Waterford. He decided in the middle of the night to go into a bedroom upstairs. Angela, a diligent student who resides in the house, had gone to bed early in order to be up in time for her 9:00 AM lecture the following morning. She was asleep in the bedroom. Tim got into bed beside Angela and began kissing her. Angela, believing the person in the bed with her to be her boyfriend Daniel, had sexual intercourse with Tim. Angela was horrified and very upset to discover that she had sexual relations with Tim. ii. Dennis's HIV positive. Given his condition, he was informed by his doctors not to have unprotected sexual relations with anyone. Dennis had unprotected consensual sexual relations with Nina but did not inform her that he was HIV positive. Furthermore, Nina has requested that Dennis wear a condom and consented to sexual relations on that basis. She was horrified to discover later that Dennis was HIV positive, and that he did not wear a condom during the sexual relations with her. She claims that she would never have consented to sexual intercourse with him if she knew that he had a condition, and that she certainly would not have consented to unprotected sexual relations. Nina has now been diagnosed as HIV positive. iii. Hannah is a 30-year-old woman with a very severe intellectual disability. Patrick, who is aged 11 and knows that Hannah has a disability, asks her to perform oral sexual intercourse on him. Hannah does as he asks. Hannah's parents were horrified to discover what happened and rang the gardai. iv. Tina, who was 18, agreed to meet Michael, who was also 18, in Tralee. They were expected to go to a youth club after meeting. When she met up with Michael, he asked her to go down the laneway with him. Tina was reluctant to do so but she proceeded down the laneway. Michael then pushed her against the wall and began pushing up against her while she continually attempted to get away. At one stage, Michael pulled down the zip of her jacket and bit her on her right breast area. Tina was able to escape at this point and managed to inform her mother what had happened. ──────────────────────────────────────────────────────────────────────",
      },
      {
        examType: 'Problem',
        description: 'Terry, who lives in Cork, suffers from paranoia and manic psychotic…',
        text: "Terry, who lives in Cork, suffers from paranoia and manic psychotic episodes. He has recently lost his job and has become more and more psychotic. He has not slept in four days. He has also not taken his antipsychotic medication for some time. Terry believes to have heard voices telling him to burn down the local church in Douglas. Terry believed he would be 'condemned to hell' if he did not do as instructed by the command hallucinations. He walked into a church and Douglas in Cork with three petrol bombs. A priest was saying a daily mass at the time, with a congregation of 50 or so people. Terry stood in the middle of the church. He lit all three petrol bombs and threw them in different directions. All three exploded, causing extensive damage to the building. It was very fortunate that no one was killed, though a number of people suffered serious non-life-threatening injuries, relating mostly to smoke inhalation and burns. Terry exhibited florid psychotic symptoms of hallucinations and paranoid delusions on his arrest. Advised Terry on his possible criminal liability.",
      },
      {
        examType: 'Essay',
        description:
          "'An attempt consists of an act done by the accused with a specific intent to commit a particular crime; It must go…",
        text: "'An attempt consists of an act done by the accused with a specific intent to commit a particular crime; It must go beyond mere preparation and must be a direct movement towards the commission after the preparations have been made; some such act as required, and if it only remotely leads to the commission of the offence and is not immediately connected therewith, it cannot be considered as an attempt to commit an offence'. People (Attorney General) v Thornton [1952] 1 IR 91, per Haugh J at p 93. With reference to appropriate law, critically discussed the law on criminal attempt in light of this statement.",
      },
      {
        examType: 'Problem',
        description:
          'Kevin is 22 years of age and he met Ana who was 16 years of age, in a… Advise Kevin on the offence with which he may be…',
        text: "Kevin is 22 years of age and he met Ana who was 16 years of age, in a nightclub in Wexford. They had consensual sexual intercourse on the night in question. The following day, however, it appears that Ana's parents rang the Gardai when they found out that their daughter was 'exploited in this way'. Kevin is really worried by this development. He claims that he believed Anna was 18, though he never asked her specific questions as to her age. He has also undertaken a 'google search' and discovered that section 3(5) of the Criminal Law Sexual Offences Act 2006, as inserted by section 17 of the Criminal Law (Sexual Offences) Act 2017 provides as follows: 'The standard of proof required to prove that the defendant was reasonably mistaken that the child had attained the age of 17 years shall be that applicable to civil proceedings'. Kevin is confused by the provision. He thought that he has a right to presumption of innocence in criminal proceedings, where the prosecution has to prove its case against him beyond a reasonable doubt. He asks you for legal advice on both of the following: i. With reference to appropriate law, advise Kevin on the offence with which he may be charged, and any possible defence on the facts as presented. [ and]{.underline} ii. With reference to appropriate law, advise Kevin on the presumption of innocence that exists in Irish criminal law, and how it applies in this particular case",
      },
      {
        examType: 'Problem',
        description:
          "She is looked after by her mother, Tina, and Tina's partner, Tommy. Advise Tina and Tommy on their possible criminal…",
        text: "Laura is a four-year-old girl. She is looked after by her mother, Tina, and Tina's partner, Tommy. Unfortunately, neither Tina nor Tommy took any great care of Laura. Her bed sheets and bedclothes were never changed, and Laura was only fed sporadically. She had a severe head lice infestation and that had spread to her face and chest. She was extremely thin, with her shoulders, ribs and backbone being 'very visible' through her skin. The palms of her hands showed black dirt in the creases and the soles of her feet were also blackened. Her baby teeth were already showing signs of decay and there was evidence of severe nutritional deficiencies. Despite observing Laura's deteriorating condition, Tommy and Tina never made any attempt to obtain medical attention for her. They continue to leave her in the bedroom, without adequate nourishment, sanitation or medical attention. Acting on a tip off, a community nurse visited the flat. When she saw Laura's condition, she immediately ran for an ambulance. Laura was found emaciated, malnourished and unresponsive. An admission to hospital, Laura initially made progress in response to treatment, but unfortunately developed pneumonia due to her severely weakened condition. Laura died in the hospital from pneumonia. Tina and Tommy claimed that any failure by them to care for Laura could not be said to be the substantial cause of her death. As far as they are concerned, the substantial responsibility for Laura's death rested with the HSE and its employees given that she died from pneumonia. Moreover, Tommy argues that he never undertook to care for Laura. He's not her biological father and had 'made it clear at all times that he did not want that child in the flat'. Advise Tina and Tommy on their possible criminal liability.",
      },
      {
        examType: 'Problem',
        description: 'Liam is a final year music student in Dublin. Mens Rea.',
        text: "Liam is a final year music student in Dublin. After his exams had finished for the semester, he went drinking in the city centre. He consumed a large volume of alcohol, including whiskey shots which made him very aggressive. At some point during the evening, Liam was accidentally nudged by Brian, a fellow student, in a crowded bar. Liam responded aggressively. He picked up a pint glass and shoved it into Brian's face. Brian suffered horrific injuries including the loss of an eye. Liam is devastated. The aggressiveness was quite out of character for him. He seeks your advice on both of the following: i. With reference to appropriate law, advise Liam on his possible criminal liability. And ii. Liam is aware from a friend who is a law student that the offence of causing serious harm is provided for under Section 4 one of the Non-Fatal Offences Against the Persons Act 1997. It provides that 'a person who intentionally or recklessly causes serious harm to another shall be guilty of an offence'. With reference to appropriate law, he asks you to explain to him how the criminal law defines either 'recklessness' or 'intention'. For the purposes of part (ii), you can answer on either form of mens rea, intention or recklessness. You are not expected to answer on both forms.",
      },
      {
        examType: 'Problem',
        description:
          'With reference to appropriate law, advise on [both]{.underline} of the… Director.',
        text: "With reference to appropriate law, advise on [both]{.underline} of the following: i. Sean, a 22-year-old, crashed a car in Co Tipperary whilst driving at high speed. He reached the speed of 160 km/ph over a short distance. Unfortunately, he lost control of the car, and his two friends, Bob and Ben, were flung from the car when it crashed. They both died at the scene. Sean was sentenced at Tipperary Circuit Court after previously pleading guilty to charges including dangerous driving causing the deaths of his friends. In sentencing him, the trial judge in the Circuit Court was heavily influenced by Sean's individual circumstances, which included his young age, the fact that he had no previous convictions, and that he had just commenced work in a bank. A five-year suspended sentence was imposed. The Director of Public Prosecutions has taken the view that the sentence imposed was very lenient having regard to the offence committed, and that undue credit was given by the trial judge to the mitigating factors in the case. Discussing and outline the composition and jurisdiction of the court to which the Director of Public Prosecutions can appeal, paying particular attention to the issues raised. And ii. Adrian is involved in organized crime in Dublin. Along with other gang members, he has been charged with a number of offences relating to the serious assault and false imprisonment of a businessman in Mayo. The director of public prosecutions has requested that he be sent forward for trial to the special Criminal Court. Adrian thought that he had a right to a jury trial in Ireland when charged with a serious criminal offence and does not understand how he can be sent forward for trial to a non-jury court. He asked you to explain to him the jurisdiction and composition of the special Criminal Court.",
      },
      {
        examType: 'Problem',
        description: 'Advise the DPP as to the criminal charges, if any, that may be brought in…',
        text: "Advise the DPP as to the criminal charges, if any, that may be brought in all of the following four scenarios: i. Tyler was relaxing in her home and her Friday night in Galway. She was horrified to see two men, Dan and Peter, break in through a patio door. Dan held a knife to her throat whilst Peter stole jewelry and electronic items. Before leaving, Dan and Peter threatened that they would kill her if she rang the Gardai. Both men then jumped in the car and made a speedy getaway via the motorway. Fortunately, Gardai patrol car gave chase, resulting in the arrest of both men ii. Lisa is infatuated with Edmond. She has sent him 20 or so text messages a day over the last six months. Edmond is very concerned by her conduct. He has repeatedly asked her to stop sending him text messages, but to no avail. Over the past two days, Lisa has been seen on five separate occasions outside Edmond's house. Edmond has a nervous disposition. Lisa's conduct has caused him to suffer a mild nervous breakdown. iii. One evening Garda Murphy received a call to attend at Washington street in Cork. Upon arrival at the scene, Garda Murphy met Mary. She was outside her property and verbally shouting at her former partner so much as to cause a breach of the peace. She was also drunk. Mary told Garda Murphy to 'F-off' and also do to do your 'F- job' and that he was 'not to be annoying me'. Garda Murphy asked Mary to refrain from swearing, at which point the respondent told him to 'F-off'. Members of the public were present. Garda Murphy directed Mary to leave the area and outlined the consequences of failure to comply with this direction. Mary failed to comply with this direction and remained abusive and threatening. iv. Fidelma and Declan are accountants. They both agree to work together to defraud Connacht Bank Ltd by creating false identities for the purpose of obtaining credit dishonestly with the effect of causing financial loss to the bank. Fortunately, staff and Connacht Bank discovered the fraud before they suffered any loss.",
      },
      {
        examType: 'Problem',
        description:
          'Advise the Director of Public Prosecutions as to the homicide charges, if… Director.',
        text: 'Advise the Director of Public Prosecutions as to the homicide charges, if any, that might be brought in [each]{.underline} of the following cases, referring to appropriate law, and giving reasons for your advice: (i) Sue, an experienced driver, is driving slowly on a country road as the setting sun is in her eyes which is impairing her vision. She notices there is a pedestrian up ahead standing at the verge of the road and further ahead that there is a car approaching on the other side of the road. She decides to speed up to the legal speed limit on this side of the road so that she can safely pass the pedestrian and then pull into the side to let the other car pass. Unfortunately, Sue mistimes her planned manoeuvre and reaches the pedestrian and the other car at the same time. She hits the pedestrian who dies instantly from the force of the impact. (ii) Olive and Paul are friends and are training together to compete in the next Dublin City marathon. During the course of a training run Olive states that she will easily complete the marathon in a faster time than Paul. In response Paul says "not if you are carrying an injury" and he pushes olive who falls over and hits her head off the corner of the footpath and falls unconscious. Paul knows olive\'s injuries are serious and he immediately rings for an ambulance. Whilst waiting for the ambulance a passer-by, James, stopped to offer assistance and moved Olive fully onto the footpath in case she was hit by a passing vehicle. When the ambulance arrived 10 minutes later olive had already died, and the paramedics confirmed that if olive had not been moved there was a chance her life could have been saved. Paul claims that he did not intend to kill or cause serious injury to Olive and that it was just a foolish prank. (iii) Al owns and runs a mini golf (also known as crazy golf) course which was closed for two years due to Covid 19 lockdown restrictions. As al had to terminate the employment contracts of all of his staff during this time no maintenance was carried out on the course. The course has now reopened with a small number of staff and is fully booked out for the entire season. Some timber railings over a mini waterfall have rotted and whilst still standing they are no longer structurally sound. Al intends to repair the railings, but he and his staff have been so busy dealing with customers there has not been time for any maintenance or repairs. Mary, who occasionally suffers from dizzy spells, is playing a round of golf and leans against the rotten railings to get her balance. The railing breaks under her weight and Mary falls into the waterfall and drowns.',
      },
      {
        examType: 'Problem',
        description:
          "In the case of The People (DPP) v David Curran it was noted by O'Donnall J… Murder, Manslaughter.",
        text: "In the case of The People (DPP) v David Curran it was noted by O'Donnall J that: \"Provocation is unusual in that it operates only to reduce murder to manslaughter. In any other offence matters alleged to amount to provocation operate only as an element going to sentence. The roots of the defence lie therefore in the history of the mandatory death penalty and as a consequence, a desire to distinguish between different homicides.one such homicide was where the victim had in some sense provoked the fatal attack. The historical origins of the defence are important. As Lord Hoffman put it in the House of Lords decision in R v Smith (Morgan) [2001] 1 A.C. 146, at p. 159, the doctrine \"comes from a world of Restoration gallantry in which gentlemen habitually carried lethal weapons, acted in accordance with a code of honour which required insult to be personally avenged by instant angry retaliation.....to show anger 'in hot blood' for a proper reason.....was not merely permissible but the badge of a man of honour\". (As per O'Donnell J in the People (DPP) v Curran [2011] 3 IR 785 at 792. In light of this statement and based on recent case law developments in the area you are now required to discuss [and reach a conclusion]{.underline} on whether provocation still has a part to play in modern Irish criminal law or whether it should be confined to the history books.",
      },
      {
        examType: 'Problem',
        description:
          'Advise the DPP as to the criminal charges, if any, that may be brought in… Frustrat.',
        text: "Advise the DPP as to the criminal charges, if any, that may be brought in [all]{.underline} of the following: (i) Ann sets up an online dating profile for her boyfriend Joe with the intention of attracting women, pretending that he is in love with them and then fraudulently extracting money from these women. A number of women contact Joe and Ann tells him what to say to pretend he is interested in a relationship. Joe regularly video calls one lady, Liz, and over time he tells her he is in a dire financial state and urgently require €3,000 or his life could be in danger. This statement is completely untrue. Liz sends him the money and never hears from Joe again. (ii) Terry is 16 years of age. He met Phyllis who is 19 in a nightclub on a particular evening. They have consensual sexual relations. Phyllis is shocked to hear afterwards that terry is only 16. She claims that she believed he was 18 or 19 years of age when they met in the nightclub. She argues that this belief is reasonable, particularly having regard to the fact that Terry had a manicured beard and gained admittance to the nightclub which has an age requirement of 18. (iii) Ted, a university student, was walking home from his summer job of working with a gardener and was carrying a large set of very sharp shears. He finds the work physically demanding and decides that simply taking money from the local shop, Quickfood, would be a much easier and more efficient way to make money. Jess was working in Quickfood on her own and decides to close early as she has basketball training and doesn't want to be late. She locks the front door of the shop and decides to have a quick coffee before she starts counting the days takings from the shop till. When ted gets to the shop, he finds it closed and in a fit of frustration he kicks the locked door, and it swings open. He entered the shop and points the garden shears at Jess who gets a very serious fright. He demanded that Jess open the cash till and hand him the contents. Jess opened the till and ted took all of the money himself. (iv) Bill and six of his friends are supporters of Offaly Town hurling club who has just been beaten by Tipperary Town hurling club due to the scoring of a very late penalty. Bill and his friends believe the referee was completely wrong to have awarded the penalty and outside the sports ground they form a human barricade in front of the referee's car. They have armed themselves with small rocks and are wildly waving their hurleys in the direction of the car and passers-by on the footpath. They claim that the referee deliberately caused Offaly Town to lose the game and state they will not allow the car to leave unless the referee publicly admits that he made a mistake in awarding the penalty. The group are directed to leave the area by the Gardai who outline the consequences of failure to comply with this direction. However, they only allow the car to leave when extra Gardai and security officers arrive on the scene.",
      },
      {
        examType: 'Problem',
        description:
          'Bertha and Dan are both 19 and are the two finalists in a national singing… Advise the parties in this scenario on…',
        text: 'Bertha and Dan are both 19 and are the two finalists in a national singing contest. Bertha knows Dan is the better singer. In order to try secure the title for herself she decides to distract him by giving him unrequested shoulder massages during breaks in the rehearsals for the final. Dan asks her to stop this behaviour as it makes him uncomfortable. Bertha states that the massages will help him to relax. Immediately prior to a live television interview bertha slaps dan on the backside and dan is very distracted by how enjoyable he found the slap and performs very badly in the interview. Bertha later informs him that it is just a normal way of wishing luck to someone in the entertainment industry and, additionally, that many artists use this method as a way to de-stress. Dan is unaware of whether this is true but asks bertha to do it again. She complies with his request, and he enjoys receiving a number of slaps from Bertha after their rehearsal sessions. The night before the final Dan is very stressed and asks Bertha to give him several slaps to relieve his stress. Bertha is distracted by her own thoughts about the final and with unfocussed strokes hits dan considerably harder than normal and twice hits him in the groin area. This causes Dan a considerable amount of pain and he visits the emergency department of his local hospital. At this stage bertha regrets her treatment of Dan and she send him a message from her mobile phone stating: "Sorry for trying to distract you with the massages. This was my one chance at success, and I just desperately wanted to win. Can we still be friends when all this is over." Dan reads the text message but chooses not to reply. Due to the fact that she does not get a reply Bertha assumes that the mobile network must not be working correctly due to the volume of people already voting for the contest winner, and she resend the message eight times over a two-hour period. She also messages dan on his four social media channels. Dan ignores all the attempts at communication. At the final Dan wins the vote of the professional judges, but bertha wins the public vote which means she wins the overall competition. However, she is worried for her career as it turns out the doctor at the local hospital has reported Dan\'s visit to the relevant authorities as the doctor suspects Dan may have been a victim of abuse. Advise the parties in this scenario on their possible criminal liability.',
      },
      {
        examType: 'Problem',
        description: 'With refence to appropriate law, advise on both of the following: (i)…',
        text: "With refence to appropriate law, advise on both of the following: (i) Larry was a career criminal with a long history of convictions for serious crimes. When he turned 50, he announced that he was retiring from criminality as it was a 'young man's game'. Privately he informs you that he feels he was very badly treated by the Irish criminal justice system as he was a recidivist youth offender. Then, as an adult, he was never given what he believes is his right to a jury trial and all his trials occurred in the Special Criminal Court where he feels, given its history, he never had a chance of being acquitted. He asks you to explain to him the concept, jurisdiction and composition of the Special Criminal Court and to consider the validity of his opinions on the court. [AND]{.underline} (ii) Compare and contrast the concepts and operation of necessity and duress as potential defences in Irish criminal law",
      },
      {
        examType: 'Problem',
        description:
          'Eric is 25-year-old man living with his father, Gerry, in Waterford. Advise eric on his possible criminal liability.',
        text: 'Eric is 25-year-old man living with his father, Gerry, in Waterford. Eric has had a substance addiction problem for approximately seven years. Apart from alcohol, he had been spending €300 a week on cocaine and cannabis. He has never previously been violent with his father. One evening, after consuming large quantities of cocaine and alcohol, Eric returned home and met his father. Eric claims that he was internally perplexed on the evening in question. He was also very intoxicated. He believed as a result of a delusional episode that giant spiders were invading his home, and that he was being pursued by them. When Eric\'s father asked him if he was alright, eric repeatedly stabbed him with a kitchen knife. Gerry died as a result of the multiple stab wounds. Eric claimed that he killed him with a knife because he "was an imposter and was not his real father", and that he "received a message from the all-knowing television in the kitchen to do so". There is some medical evidence to suggest that Eric\'s any years of drug misuse has damaged his brain function and has reduced his control over his actions. Advise eric on his possible criminal liability.',
      },
      {
        examType: 'Problem',
        description:
          'You are requested to meet your client, Jake, at the local Garda station. Mens Rea.',
        text: "You are a solicitor. You are requested to meet your client, Jake, at the local Garda station. Jake has been detained for questioning as he allegedly hit his girlfriend across the face with a broken wine bottle that she has accidentally knocked over. This is Jake's first time in Gard custody. He does not understand how he can be detained when he was not charged with any actual offence. He asks you to give him and explanation of the law of detention without charge in Ireland and the safeguards that he is entitled to whilst detained. Furthermore, he asks you to explain to him what is meant by his level of intention if it turns out he is charged with an offence. Advise Jake on [both]{.underline} of the following: (i) The law of detention without charge in Ireland and the safeguards that he is entitled to whilst so detained, [AND ]{.underline} (ii) With reference to appropriate law, how the criminal law defines either 'recklessness' or 'intention'. [For the purposes of part (ii), you can answer on either form of mens rea, intention or recklessness. You are not expected to answer on both forms]",
      },
      {
        examType: 'Problem',
        description:
          '(i) Pat and Carol are work colleagues and attend the company Christmas… Company.',
        text: "(i) Pat and Carol are work colleagues and attend the company Christmas party. The company has provided free alcohol for the event and both parties have consumed a considerable amount of wine. Pat asks Carol if she would like to go on a date with him in the future. Carol says she has fancied him for a long time, but he should ask when they both sober up. On the walk home they start kissing and Pat starts to remove carol's clothes. After a few moments Carol says she does not want to continue as they are still in public. Despite this Pat continues and attempts to have sexual intercourse with her. Carol manages to push him over and runs home. No sexual penetration had taken place, but Carol was horrified by the incident and feels certain she would have been raped if she had not escaped. Pat feels that they both wished to have intercourse and the only thing in dispute was the venue. Advise Pat on his possible criminal liability [AND]{.underline} (ii) Len and Jane are both married to other people but are having an affair with each other. Jane emphasises the importance of always wearing a condom during their sexual activities and that she will only have sex with him on this basis. During the course of one sexual encounter the condom breaks but Len does not inform Jane of this fact. As a result of this encounter, Jane falls pregnant. When she informs her husband, Brad, of her pregnancy he is furious. He holds a syringe to her throat and threatens to kill her if she does not tell him the name of her new lover. When jane refused to divulge this information, Brad took her mobile phone from her and locked her in the garden shed overnight. He only let her out of the shed the following day at which stage she is very distressed. Advise Len and Brad on their possible criminal liability. Criminal Law",
      },
    ],
  },
  {
    subject: 'Criminal Law',
    year: 2023,
    questions: [
      {
        examType: 'Problem',
        description:
          'He is owed money by Brendan for the supply of cocaine for personal use. Advise Mike, David and Liam on their possible…',
        text: "Henry is a drug dealer. He is owed money by Brendan for the supply of cocaine for personal use. Brendan is 25 but has the intellectual and emotional maturity of a 12 year old. In order to frighten him to pay the debt, Henry went to Brandon's family home which is 5 miles from Longford town. He discharged his shotgun at the house, damaging a window. Henry then fled the scene in a car. Brendan was not at the house at the time of the incident. Brendan's father, Mike, and his two brothers, Liam and David, were present, however, at the time the gun was discharged. They know Henry is a drug dealer and that he has been encouraging Brendan to take drugs. They also saw him leaving the scene. Mike's suggested that they follow Hnery and 'give him the beating of his life'. David and Lim agree. All three set off in pursuit of Henry in Mike's ear. They deliberately crash into Henry's car in Longford town. Henry is already injured as a result of the crash. Mike, however, dragged him from the car and David and Liam started to kick and punch him. He is unable to resist and receives several blows to the head and torso. The injuries are serious but not life threatening. Satisfied that they have hurt Henry sufficiently, they leave him lying prostrate on the road. Mike, however, is still angry. He jumped into his car and drove over Henry, who died as a result of the injuries which he received. David and Liam did not expect Mike to do this but get get into the car and flee the scene. CCTV recordings harvested by the Gardai from cameras at various locations helped to build a picture of what occurred in Longford on the night in question. Advise Mike, David and Liam on their possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          '"It is a fundamental concept of our criminal justice system that there be… Mens Rea.',
        text: '"It is a fundamental concept of our criminal justice system that there be a criminal mind, or, as described traditionally, that there be mens rea. The doctrine of mens rea, the presumption of mens rea, is part of our common law. This means that whenever a section of a statute is silent as to mens rea there is a presumption that we must read in water appropriate to require mens rea". CC v Ireland [2006] 4 IR 1, per Denham J at para 38 Discuss the law o strict liability offences in light of this statement.',
      },
      {
        examType: 'Essay',
        description:
          'With reference to appropriate law, advised the Director of Public Prosecutions as to the charges, if any, which may…',
        text: "With reference to appropriate law, advised the Director of Public Prosecutions as to the charges, if any, which may arise in both of the following cases: i. Mary is a senior bank official with Munster bank. She agrees with Lucinda, a senior banker in the Royal Bank of Canada, to engage in a series of transfers between both banks, for a total of EUR1.2 billion. They make this agreement via e-mail, and it would have the effect of significantly increasing Munster bank's accounts in regard to deposits for a limited period. The purpose of the transactions would be to deceive the market (potential and actual investors, depositors and tenders) by giving the false impression that Munster Bank was in a financially stronger position than it actually was at their end of year annual results. Fortunately, the Royal Bank of Canada has for some time been suspicious of the behaviour of Lucinda and her relationship with Mary. They have been lawfully mentoring Lucinda's emails. They intervene immediately and prevent the agreement from ever being actioned or implemented. Both Lucinda and Mary are dismissed for gross misconduct by their respective employers, and the relevant authorities, including an Garda Siochana, have been notified. and",
      },
      {
        examType: 'Problem',
        description:
          'QUESTION FOUR Bertha and Dan are both 19 and are the two finalists in a… Advise the parties in this scenario on their…',
        text: 'QUESTION FOUR Bertha and Dan are both 19 and are the two finalists in a national singing contest. Bertha knows Dan is the better singer. In order to try secure the title for herself she decides to distract him by giving him unrequested shoulder massages during breaks in the rehearsals for the final. Dan asks her to stop this behaviour as it makes him uncomfortable. Bertha states that the massages will help him to relax. Immediately prior to a live television interview bertha slaps dan on the backside and dan is very distracted by how enjoyable he found the slap and performs very badly in the interview. Bertha later informs him that it is just a normal way of wishing luck to someone in the entertainment industry and, additionally, that many artists use this method as a way to de-stress. Dan is unaware of whether this is true but asks bertha to do it again. She complies with his request, and he enjoys receiving a number of slaps from Bertha after their rehearsal sessions. The night before the final Dan is very stressed and asks Bertha to give him several slaps to relieve his stress. Bertha is distracted by her own thoughts about the final and with unfocussed strokes hits dan considerably harder than normal and twice hits him in the groin area. This causes Dan a considerable amount of pain and he visits the emergency department of his local hospital. At this stage bertha regrets her treatment of Dan and she send him a message from her mobile phone stating: "Sorry for trying to distract you with the massages. This was my one chance at success, and I just desperately wanted to win. Can we still be friends when all this is over." Dan reads the text message but chooses not to reply. Due to the fact that she does not get a reply Bertha assumes that the mobile network must not be working correctly due to the volume of people already voting for the contest winner, and she resend the message eight times over a two-hour period. She also messages dan on his four social media channels. Dan ignores all the attempts at communication. At the final Dan wins the vote of the professional judges, but bertha wins the public vote which means she wins the overall competition. However, she is worried for her career as it turns out the doctor at the local hospital has reported Dan\'s visit to the relevant authorities as the doctor suspects Dan may have been a victim of abuse. Advise the parties in this scenario on their possible criminal liability.',
      },
      {
        examType: 'Problem',
        description: 'QUESTION FIVE With refence to appropriate law, advise on both of the…',
        text: "QUESTION FIVE With refence to appropriate law, advise on both of the following: Larry was a career criminal with a long history of convictions for serious crimes. When he turned 50, he announced that he was retiring from criminality as it was a 'young man's game'. Privately he informs you that he feels he was very badly treated by the Irish criminal justice system as he was a recidivist youth offender. Then, as an adult, he was never given what he believes is his right to a jury trial and all his trials occurred in the Special Criminal Court where he feels, given its history, he never had a chance of being acquitted. He asks you to explain to him the concept, jurisdiction and composition of the Special Criminal Court and to consider the validity of his opinions on the court. AND Compare and contrast the concepts and operation of necessity and duress as potential defences in Irish criminal law",
      },
      {
        examType: 'Problem',
        description:
          'QUESTION SIX Eric is 25-year-old man living with his father, Gerry, in… Advise eric on his possible criminal liability.',
        text: 'QUESTION SIX Eric is 25-year-old man living with his father, Gerry, in Waterford. Eric has had a substance addiction problem for approximately seven years. Apart from alcohol, he had been spending €300 a week on cocaine and cannabis. He has never previously been violent with his father. One evening, after consuming large quantities of cocaine and alcohol, Eric returned home and met his father. Eric claims that he was internally perplexed on the evening in question. He was also very intoxicated. He believed as a result of a delusional episode that giant spiders were invading his home, and that he was being pursued by them. When Eric\'s father asked him if he was alright, eric repeatedly stabbed him with a kitchen knife. Gerry died as a result of the multiple stab wounds. Eric claimed that he killed him with a knife because he "was an imposter and was not his real father", and that he "received a message from the all-knowing television in the kitchen to do so". There is some medical evidence to suggest that Eric\'s any years of drug misuse has damaged his brain function and has reduced his control over his actions. Advise eric on his possible criminal liability.',
      },
      {
        examType: 'Problem',
        description:
          'Danny lives in Tipperary town where he rents an apartment. Advise Danny on his possible criminal liability.',
        text: "Danny lives in Tipperary town where he rents an apartment. He has a diagnosis of schizophrenia and has had repeated admissions to various approved units for treatmenet. On 15^th^ of February 2023, the Garda were called to the apartment. When they arrived, they met Danny outside. It seems that he has set fire to the curtains and carpet in his apartment using petrol as an accelerant. He then raised the alarm with other residents, telling them to get out of the apartment bock so 'that God's work could be done'. The fire had taken hold, causing extensive damage to furnityre, furnishing and fittings. Other residents in the apartment block had to be evacuated for a number of weeks until the building could be made safe, and the damage repaired. The damage, exams, will cost EUR95,000 to repair. One of the residents of the apartment block, Ciara, has come forward to say that Danny has been following her to work for a month or so, and can often be seen loitering outside her workplace and apartment. She suspected that he also left messages on the windscreen of her car, suggesting that she is 'the devil'. She has repeatedly requested that he stop following her, but to no avail. It seems that Danny stopped taking his prescribed medication for schizophrenia 2 months before the incident at the apartment. This has caused his mental health to deteriorate rapidly. He claims that he had set fire to the curtains after a local priest, FR Malachy, had put words in his head. He said that the priest had taken the code for his DNA and communicated with him via the television, instructing him to burn the apartment block and pursue the she devil, Ciara. Many of Danny's delusions in the past have had a religious aspect. Fr Malachy does know Danny and works with a local community support service to support him. He does not know Ciara. Advise Danny on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          'In July 2026, Tim suffered a catastrophic stroke. Advise Mary on her possible criminal liability.',
        text: "In July 2026, Tim suffered a catastrophic stroke. He was almost completely paralyzed, was unable to speak and was able to carry out any physical functions on his own except limited movement of the eyes and head. He uses an eye blink computer. He was only able to eat soft mashed food and was virtually housebound. He was in regular physical and mental pain and discomfort Tim decided that he did not wish to continue living. However becayse of his disabilities, he was unable to kill himsfel without assistance other than by refusing food and water. His wife, Mary, is really sorry for him, and finds his protracted decline 'too painful to watch'. She agrees to assist him with his death. This agreement is driven entirely by Mary's kindness and love for time. She purchased barbiturate capsules on the internet and mixed the contents into his mashed food. Tim took it willingly, inducing a peaceful, swift and uneventful death. Mary claims that what she did was motivated entirely by humanity and necessity. She also claims that it was a private matter between two consenting adults. Advise Mary on her possible criminal liability.",
      },
      {
        examType: 'Problem',
        description:
          "Kevin and David went for drinks one afternoon in Murphy's Bar in Cork. Murder, Selfdefence.",
        text: "Kevin and David went for drinks one afternoon in Murphy's Bar in Cork. They were acquaintances but not close friends. Matters became tense between both individuals later in the evening, with Kevin suggesting to David that 'he needed to buy the next round of drinks'. At this point, David stood up. He looked annoyed. Kevin then broke a glass bottle and stabbed David six times in the neck, chest, back and arms. The stab wound to the neck proved fatal. Kevin fled the scene, but was later arrested and detained by An Garda Siochana on suspicion of murder. In a memorandum of the second interview in custody, Kevin maintained that he had stabbed David in self-defence as he believed he was imminently about to attack him, stating: \"He was mouthing off at me. I thought he was going to go for me so I broke the bottle and stabbed him. I thought he probably would have killed me. I was afraid that I was going to be done. I was frightened for my life.\" The Prosecution will claim that the force used was not reasonable, that David was only standing up to protest the fact that he was being asked to buy the next round of drinks. They will claim that an attack was not imminent, and that David had no record of violence Advise Kevin on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description: 'Your client, Denis, is a 50 year old man who was convicted of an…',
        text: 'You are a solicitor. Your client, Denis, is a 50 year old man who was convicted of an aggravated sexual assault under section 3 of the Criminal Law Rape (Amendment) Act 1990. Denis served a six year prison sentence for the offence. As a sex offender, Denis was required under section 10 of the Sex Offenders Act 2001 to keep the Gardaí notified of certain details about his life, including his home address and changes to his home address. Denis recently changed address moving from Ballina in Co. Mayo to Navan in Co. Meath. He failed to notify the Gardaí about this change. He is now being prosecuted under section 12 of the Sex Offenders Act 2001, as amended, which provides under subsection 3 that: "(3) A person guilty of an offence under this section shall be liable- (a) on summary conviction, to a fine not exceeding €5,000, or imprisonment for a term not exceeding 12 months, or both, or (b) on conviction on indictment to a fine not exceeding €10,000, or imprisonment for a term not exceeding 5 years, or both." Denis asks for your advice. He asks you to explain to him, with reference to appropriate law, how criminal offences are classified in Ireland, and whether you think the prosecution of his offence will proceed summarily or on indictment.',
      },
      {
        examType: 'Problem',
        description: 'You are the solicitor for James. Mens Rea, Intoxication.',
        text: 'You are the solicitor for James. He was convicted of the offence of rape in the Central Criminal Court three weeks ago. A sentence of six years imprisonment was imposed. The facts are as follows. James met Patricia in a disco last April. They both were drinking shots of whisky, and each had eight or so drinks. They both went outside for a cigarette in an archway adjacent to the disco. They proceeded to have sexual intercourse. James was adamant that the sexual intercourse was consensual. Patricia, in her statement to the Gardaí, stated that she was aware that they had sexual intercourse, but that she would not have consented if she was sober. At the close of the trial, the judge instructed the jury on the law, providing a number of directions. The following three directions are now directly relevant. The judge directed the jury as follows: i. "A complainant who is intoxicated cannot, in law, consent to a sexual act. In cases where there\'s a high level of intoxication, but no evidence of verbal communication of consent, this will constitute evidence of a lack of consent, particularly where the complainant claims that she would not have consented if she was sober." ii. "As a matter of law, if a person drunkenly had sexual intercourse with an intoxicated woman, that constitutes the recklessness required for the offence of rape, in terms of any mental state that is required. That is the core issue here, as I mentioned: was the complainant drunk and did the act of sexual penetration occur at that time as she alleges?" iii. "The presumption of innocence is a very important part of the Irish criminal process, which includes the requirement to prove something beyond a reasonable doubt. This means that if you\'ve a balancing exercise in that respect where it\'s equal, you would have to give the benefit of the doubt in the circumstances to the accused. So if it\'s a 50/50 situation as to the issue of consent, if you really want to go into figures, you have to give the benefit of the doubt to the accused person. Now, that\'s the best way I can explain it to you." In order to determine if there are relevant grounds for overturning hisconviction, you are now asked to advise James on all three directions, as they relate to: - the issue of consent, - the mens rea for rape with particular regard to recklessness, - and the presumption of innocence.',
      },
      {
        examType: 'Problem',
        description:
          'One Friday night, Dan, Liam, and Jim, who are all 19, met at the local… Advise Dan, Liam and Jim of their possible…',
        text: 'One Friday night, Dan, Liam, and Jim, who are all 19, met at the local hurling pitch. They were bored and had been drinking. A kiddies disco was taking place at the clubhouse the next evening. For some fun, Dan said: "It would be cool to light a big fire outside the clubhouse to frighten parents and children after the disco starts." Liam, who has developmental (intellectual) difficulties resulting in delayed cognitive development which restricts his ability to monitor and control his behaviour, replied, "Yeah, cool, let\'s do it. I will get some old tyres and petrol from my father\'s farm. Let\'s go for it." Jim said: "Right. Let\'s do it tomorrow night." The next morning Dan woke up feeling pretty awful. He decided not to participate in any scheme to frighten the children. He tried to call Liam but could not reach him. That night, Liam brought the tyres and the petrol to the clubhouse. Jim accompanied him, but other than being present did not assist. Liam placed the tyres up against an emergency exit door, doused them in petrol, and then set them on fire. The fire took hold quickly causing extensive damage to the clubhouse. The children and parents were badly frightened and traumatised by the incident, but all were evacuated safely. Advise Dan, Liam and Jim of their possible criminal liability.',
      },
      {
        examType: 'Problem',
        description:
          'One afternoon, Tim asked his friend Robert to drive him to the Lidl store… Advise Robert on his possible criminal…',
        text: 'One afternoon, Tim asked his friend Robert to drive him to the Lidl store in Thurles as he had some shopping to do for the week. When they arrived at the Lidl car park, Tim got out his wallet and noticed he had no money. He asked Robert for the loan of €300 but Robert told him he had no money with him. Tim replied: "Never mind, I will not need any money. Can you please stay here but just keep the car running." Tim has a history of stealing from shops in the Thurles area. About 40 minutes later, Tim came running out of the store with groceries to the value of €260 in his shopping trolley. An alarm was sounding and a security guard was following Tim. Tim ran to the car, threw the bags of shopping in the back seat, got in, and shouted, "Move it". Robert then drove quickly away from the store, and reached a speed of 100 miles per hour in a residential area. He had to swerve to avoid a cyclist which forced him to slam on his brakes. Unfortunately, he crashed in to a wall, causing the airbag to deploy. Tim is obese. He suffered a heart attack caused by the trauma of the accident. The trauma to the chest caused a heart arrhythmia that brought about the attack which proved fatal. A medical expert report suggests that his level of obesity had put increased pressure on his heart, which was aggravated by the strain caused by running from the shop Advise Robert on his possible criminal liability.',
      },
      {
        examType: 'Essay',
        description:
          'In The People (Director of Public Prosecutions) v Klubikowski, [2023] IECA 137, at paras.',
        text: 'In The People (Director of Public Prosecutions) v Klubikowski, [2023] IECA 137, at paras. 77-78, Kennedy J stated the following in relation to the defence of duress in criminal law: "The defence of duress may apply where an individual feels under a compulsion to commit an offence as a result of threats made to him or to another person. The person will of course have the necessary mens rea but his will is overborne by virtue of the threats made to him and so he commits the offence.... There are three aspects to the defence...; that is first, that the threats must be of death or serious harm, second, the threats must be immediate, and third, those threats must be so great so as to overbear the resistance of the person to whom they are made." With reference to appropriate case law, discuss the defence of duress in the light of this statement.',
      },
      {
        examType: 'Problem',
        description:
          'Kevin is a thirteen year old boy. Advise Kevin on his possible criminal liability.',
        text: "Kevin is a thirteen year old boy. He lives in Sligo with his parents and his 15 year old sister, Tracy. One evening, his sister's friend, Amy, who was also 15, visited their house. At a particular point, Tracy left the bedroom where both friends were listening to music. Kevin entered the room and engaged in some horseplay with Amy. The behaviour quickly became less consensual. Kevin grabbed Amy by the buttocks and placed his hands over her breast and groin areas. Amy was very distressed and pleaded with Kevin to stop. Fortunately for Amy, Kevin heard his sister returning and stopped. Amy indicated to Tracy that she wanted to go home. After she left, Kevin followed her along the road. When he caught up with her, he told her that if she told anybody about what happened, he would 'stab her in the face until she died'. Amy was terrified. Since then, Kevin has been messaging her daily on Instagram and Snapchat with sinister comments. When she blocked him on both, he started to appear regularly outside her school, her home, and even outside her hockey training sessions with her local club. This has caused Amy huge distress. She has not been eating or sleeping. Last night, she finally confided in her parents. They immediately contacted the Gardaí. Advise Kevin on his possible criminal liability.",
      },
      {
        examType: 'Problem',
        description: 'Advise the DPP as to the charges, if any, that might be brought in all…',
        text: "Advise the DPP as to the charges, if any, that might be brought in all four of the following scenarios, referring to appropriate law, and giving reasons for your advice: i. The local Gardaí in Mitchelstown recently received a number of complaints. Barry reported that at 6:35am the previous morning he was leaving his house and he observed the cover of a chainsaw outside the garage. He noticed a footprint on the windowsill and that the latch was off the garage door. He then noticed that certain items were gone, including a leaf blower, a chainsaw, and an Apple watch. Terry reported that he went for a jog yesterday morning and when he came home noticed that the large garage door had been forced open and that some items, including a lawnmower, were gone. A third party, Alex reported that a power washer was taken from his garage. The Gardaí carried out house to house inquiries, and received a strong lead which caused them to lawfully search Jacob's residence. All of the reported stolen property was in his garage. ii. While serving a sentence in the Midlands Prison for aggravated burglary, Lawrence was convicted by a jury before the Circuit Court for other offences relating to assault causing harm and a robbery. Lawrence was remanded in custody and produced before the Circuit Court for sentencing. Lawrence really dislikes lawyers and judges. During the course of the sentence hearing, he threw a bible at the sentencing judge, Ms Justice Murphy. He also shouted obscenities at her, as well as at defence and prosecution lawyers who were present at the hearing. It took ten minutes to restore order in the courtroom. iii. John is the owner of a scrap metal business in Tralee. In order to avoid a tax liability, he has altered his business records, by creating incorrect invoices for transactions which had not occurred, and with persons who had not run any business. A tax audit revealed that the business's books and records were not reliable and that John was producing incorrect invoices to avoid tax liability. iv. Larry and David were opposing players in a rugby match between bitter rivals in Galway. Each played at scrum half for their respective teams. Close to the end of the game, and with both sides level, David made a brilliant, jinking run which brought him close to the opposition try line. He was stopped by Larry, who tackled David very aggressively to the ground. The referee deemed the tackle to be fair and awarded no penalty. David was hurt by the tackle but also very angry. He immediately grabbed Larry in a fit of rage and threw him to the ground. He punched and kicked Larry on the head and arms in a frenzied attack, resulting in numerous skin abrasions on the head, face, hips, left hand and the neck. He also knocked out two of Larry's front teeth. The injuries led to the loss of consciousness, to bleeding into the respiratory tract and to the swallowing of blood into the alimentary tract. Larry spent a week in hospital but is recovering.",
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2008,
    questions: [
      {
        examType: 'Problem',
        description: 'Betty died recently, in contentious circumstances. Succession.',
        text: "Betty died recently, in contentious circumstances. She had been suffering from cancer which was, unfortunately, at a most advanced stage. She refused to go into hospital and was being cared for at home by a nurse and an attending doctor. Her close friends, Mary and Jane, moved into the house to be with her around the clock. Approximately a fortnight before her death, Betty was told by the doctor that she had only about a month to live. Betty was in agony and not receiving comfort from the medication provided. Her only comfort was derived from her friends who were most attentive and spent their day by her bedside. One day, while her closest friend Jane was with her, Betty opened her bedside locker and presented her with a key to a box which was downstairs in the kitchen of the house and which contained her personal papers. Betty told Jane that the title deeds to an old house that she bought some years ago were in that box. Expressing her gratitude to Jane for her devoted friendship, Betty told Jane that she wished her to have the house. Some days later, Betty was in very considerable pain and asked Mary, who was by her side at the time, to assist her in her efforts to end her life. Mary resisted originally but, watching her friend's pain, eventually acceded to Betty's request. While cleaning out Betty's belongings some days ago, Jane came across a locked box. Using the key that Betty had given her, she opened the box and found the deeds to the house to which Betty had referred. Advise Jane as to her entitlement in relation to Betty's house. Students do not heed to consider whether any possible issues arise pursuant to the Succession Act, 1965.",
      },
      {
        examType: 'Essay',
        description:
          'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects"…',
        text: 'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" [and]{.underline} one of the other two "certainties" which must be deemed to exist in order to ensure the creation of a valid express trust.',
      },
      {
        examType: 'Essay',
        description: 'Answer (a) [and]{.underline} (b).',
        text: 'Answer (a) [and]{.underline} (b). Both parts carry equal marks. (a) Non-charitable purposes trusts are not generally regarded as valid. Discuss, with reference to relevant case law, why this is so. [And]{.underline} (b) Discuss those exceptional categories of cases in which non-charitable purpose trusts may be enforced. Make reference, where appropriate, to relevant case law.',
      },
      {
        examType: 'Problem',
        description: 'James, a widower, owned a large house. Succession.',
        text: "James, a widower, owned a large house. In his Will, he bequeathed that house to his son John. In discussions with John, he mentioned to him that the house would be his after his death and on the strength of that assurance, John took his name off the local authority housing list. Some months later, however, James and John had a blazing row and were no longer on speaking terms. In anger, James had changed the terms of his Will and left the house to John's sister, Karen. James died last month. Advise John, making reference to relevant case law. Students do not need to consider whether any possible issues arise pursuant to the Succession Act, 1965.",
      },
      {
        examType: 'Essay',
        description: 'Write a note on [any two]{.underline} of the following three topics.',
        text: 'Write a note on [any two]{.underline} of the following three topics. Make reference to relevant case law where appropriate. (a) Charitable Trusts for the relief of poverty. (b) Mandatory Interlocutory Injunctions. (c) Automatic Resulting Trusts which arise in the event of the failure to exhaust a beneficial interest under an express trust.',
      },
      {
        examType: 'Problem',
        description:
          'Jack and Derek are brothers who live in a house together which they… Company, Shareholder.',
        text: "Jack and Derek are brothers who live in a house together which they jointly own. Neither party ever married and they have lived together for all their adult life. Jack has always been the stronger personality of the two, and Derek is inclined to follow his lead without question. This is particularly the case in relation to all matters financial and Jack makes all decisions of a monetary nature which have a bearing on them. Jack is a businessman and for the past number of years, he has run a construction business, Getrichquick Ltd, of which he is the major shareholder. Derek works as a labourer for this company on a part-time basis. While the business was very successful initially, the recent slowdown in the housing market has hit Getrichquick Ltd badly and its profits have declined considerably in the past two years. Jack is convinced that the company needs to adapt and become involved in construction in the commercial sector if it is to survive. In order to adapt the business in this manner, however, Getrichquick Ltd needs a considerable injection of capital. Jack is convinced that the company will not survive without it. He approached Derek with the suggestion that they should together join in the execution of a charge over their home in favour of Hasty Banks in order to obtain a loan for Getrichquick Ltd. Derek had little understanding of such matters but was somewhat anxious about this suggestion. Jack, convinced that this loan represented Getrichquick Ltd's only chance for financial security, was dismayed at his brother's reluctance to do as he wished and, over a period of weeks, began to nag him about the matter until eventually Derek agreed to go into Hasty Banks and do as Jack wished. Jack immediately rang Sean, bank manager at Hasty Banks, who has been a close friend of the two brothers for many years, to make an arrangement to meet to discuss this matter. Derek attended at the bank with Jack and, in discussion with Sean, told him about his anxiety about the proposal but added that he supposed that he had no choice as the company would not continue to function without the loan. While Jack was out putting money into the car meter, Sean told Derek that he could seek legal advice about this matter and stated that a solicitor would explain the repercussions to him of executing the charge. He suggested to Derek that he might go down the road to see Bridget, a solicitor, and Derek agreed that he would do so. The following week, Derek and Jack came back into the bank and signed the necessary documents for the purpose of executing the charge. Sean did not check whether Derek had ever gone to see Bridget for legal advice. In fact, Derek never did so, as he decided to leave such matters to Jack. Getrichquick Ltd has defaulted on the loan repayments for the past ten months. Hasty Banks wishes to enforce the charge. Advise Sean accordingly, making reference in your advice to relevant case law.",
      },
      {
        examType: 'Essay',
        description:
          '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its…',
        text: '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its traceable proceeds also, and his interest binds everyone who takes the property or its traceable proceeds except a bona fide purchaser for value without notice." Foskett v McKeown, [2001] 1 AC 102 at 127 per Millet LJ. Discuss, with reference to relevant case law, the principles applicable in relation to tracing in equity.',
      },
      {
        examType: 'Problem',
        description:
          'George and Anne died recently, leaving four young children under the age… Trustee.',
        text: 'George and Anne died recently, leaving four young children under the age of 8. They had made a joint Will in which they appointed David as trustee of a considerable sum of money to be used for the benefit of the children once they reach their majority. There are no specific provisions in the Will regulating the investment of the trust fund. David is anxious to preserve the value of the trust fund for the children until they reach their majority. Advise him in relation to both (a) [and]{.underline} (b) (a) The investments that he may lawfully make in order to preserve the trust fund. [And]{.underline} (b) The standard of care which he must employ in exercising those powers of investment.',
      },
      {
        examType: 'Problem',
        description:
          'Alan, a wealthy bachelor, died recently. Advise Sean on his entitlements, if any, in relation to the villa and the…',
        text: 'Alan, a wealthy bachelor, died recently. He died testate. During his life, he fathered a son, Sean, for whom he wished to make provision upon his death, although he did not wish to make specific reference to him on the face of the Will for fear of upsetting the older members of his extended family. He wished to devise his title in a holiday villa and in a city centre apartment to Sean. To that end, he stated in his Will that he left the villa to Jane and Rita, "as tenants in common for the purpose as disclosed by me to them". The Will also stated that the apartment was left to Jane and Rita for the same purpose as disclosed by Alan to them, albeit in this instance as joint tenants. Some weeks before he died, Alan had a conversation with Jane in which he told her that he had set out his wishes as far as the villa and the apartment were concerned in a sealed envelope which he then handed to her and indicated that it was not to be opened until after his death. Jane agreed during that conversation to abide by Alan\'s wishes as set out in the letter contained in the envelope, whatever those wishes might be. Neither she nor Alan ever mentioned this conversation to Rita nor mentioned the existence of the sealed envelope to her. After Alan\'s death, Jane opened the letter and learnt that Alan had stated clearly that he intended that Sean should enjoy the benefit of both the villa and the apartment. Sean had a close relationship with his father and met him frequently. Indeed he was with his father when Alan was writing his Will and witnessed that instrument. Advise Sean on his entitlements, if any, in relation to the villa and the apartment.',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: 'Write a note on any two of the following three topics. Refer, where appropriate, to relevant case law: (i) The equitable doctrine of satisfaction; (ii) The rule in Strong v Bird [1874] LR18 Eq 315; (iii) Quistclose trusts.',
      },
      {
        examType: 'Problem',
        description: 'She died testate and with a number of adult children. Succession.',
        text: "Sheila died recently. She died testate and with a number of adult children. In her Will, she appointed her husband, Robin, as executor. She made adequate provision for each of her children and Robin in the Will and thereafter left it to Robin's discretion as to which of her relatives and descendants should benefit under the residuary clause. Robin has approached you, inquiring about the validity of the residuary bequest, as he would prefer to spend the residuary estate on a world cruise ticket for himself. Advise him, making reference to relevant case law. Students need not address any issues arising under the Succession Act 1965.",
      },
      {
        examType: 'Essay',
        description:
          'Consider, with reference to relevant case law, the traditional reluctance of the courts to grant specific performance…',
        text: 'Consider, with reference to relevant case law, the traditional reluctance of the courts to grant specific performance of contracts requiring supervision.',
      },
      {
        examType: 'Problem',
        description:
          'Some years ago, when made redundant in his city job, Conor bought a new… Estoppel.',
        text: "Some years ago, when made redundant in his city job, Conor bought a new house next to his father's house as he wished to return to live in the rural area in which he grew up and to resume farming as his father before him had done. His redundancy payment did not, however, run to covering the expense of buying both a house and land. His father, Tom, however, retained ownership of a large farm adjacent to Conor's new house and, as Tom was now elderly, Conor hoped to earn his living from farming this land. Tom helped Conor out sometimes on the farm and Conor, in turn, took over the management of his father's business accounts. Conor spent a considerable amount of money developing and modernising the farm. Although Conor had a close relationship with his father, the parties did not address the issue of interest, if any, which Conor would have in the land during Tom's lifetime or thereafter, as they found it very difficult to discuss such matters amongst themselves. On one occasion, however, Tom was present when Conor spoke to a builder who was undertaking some work on the farm. Conor told the builder of his desire to maximise the farm's potential as he understood that his father Tom was happy to regard him as beneficial owner of the farm, in light of all the work that he had done thereon. Tom was standing beside Conor during this conversation but remained silent when his son expressed this hope. Afterwards, Tom made a general comment to Conor to the effect that the latter \"need not have any worries about his financial well-being\". Conor felt awkward when his father said this and so did not probe the comment, but took it to mean that he and his father were at one as far as the issue of Conor's interest in the farm was concerned. During this time, Conor was married to Aine. Unfortunately, the relationship has broken down and Aine now seeks a divorce and ancillary reliefs. She seeks, amongst other things, a share of what she alleges is Conor's beneficial interest in the farm. Tom is amazed at this development and seeks your legal assistance. Advise Tom with reference to the relevant principles of proprietary estoppel.",
      },
      {
        examType: 'Essay',
        description:
          'It is a fundamental principle of equity that an incompletely constituted trust shall not be perfected in favour of a…',
        text: 'It is a fundamental principle of equity that an incompletely constituted trust shall not be perfected in favour of a volunteer. Discuss, with reference to relevant case law, the legal requirements for the complete constitution of a trust both by transfer of trust property and by declaration by the settler of himself or herself as a trustee. Students are not required to address the exceptions to this principle.',
      },
      {
        examType: 'Problem',
        description:
          'Sally Anne, an interior decorator, recently bought and paid for three… Breach Of Contract, Company.',
        text: 'Sally Anne, an interior decorator, recently bought and paid for three sofas for use in a hotel that she was renovating. She purchased them from Homeware Limited, and Irish company with a large number of branches in both Britain and Ireland. She bought the sofas in its Dublin store and paid €25,000 in total for same. When the sofas were delivered, however, she was disappointed to discover that they were in fact made of a particularly soft wood that was entirely unsuitable for sustaining the inevitable wear and tear involved in the use of sofas. The sofas are unusable and Sally Anne is most anxious to recoup the cost thereof. She also had bad luck with some period furniture that she purchased in an English branch of Homeware Limited some years ago. The furniture, contrary to assurances given at the time by Homeware Limited, was full of woodworm and could not be used for the purposes intended. The contract of sale governing the sale of this particular period furniture stated that English law would govern any dispute arising on foot of the contract and that the English courts would have jurisdiction in relation to any issues arising. Sally Anne therefore instituted proceedings for breach of contract before the courts in England and succeeded in obtaining judgment against Homeware Limited to the value of €40,000 from those courts. The judgment has not, however, yet been enforced. The recent economic downturn has hit many companies trading in furniture very badly and it is rumoured in interior designing circles that a number of furniture providers are about to close down. Sally Anne recently read in a trade magazine that Homeware Limited is facing a very uncertain future in both Britain and Ireland and may indeed be forced to cease trading in the coming months. All of the bank accounts held by Homeware Limited are in Irish banks, and it is understood that the total amount in those accounts has not exceeded €60,000 in the past number of months. Sally Anne is anxious to ensure that she is in a position to recover the monies which she feels are owed to her in light of the above. Advise Sally Anne.',
      },
      {
        examType: 'Essay',
        description: 'Answer both (a) [and]{.underline} (b).',
        text: 'Answer both (a) [and]{.underline} (b). Both parts carry equal marks. (a) Outline the circumstances in which a trustee may retire or be removed from his or her position, [and]{.underline}; (b) Discuss the exceptions to the rule that a trustee is not entitled to remuneration for work which he or she performs as a trustee.',
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2009,
    questions: [
      {
        examType: 'Essay',
        description:
          'Sean, who died recently, was a life-long member of the Irish Athletic Association, an amateur sport organisation.',
        text: "Sean, who died recently, was a life-long member of the Irish Athletic Association, an amateur sport organisation. He devoted much of his free time to the activities of the organisation, both as a player and official, for many years of his long life. His love of sport and of the Association are reflected in a number of legacies in his Will which are bequeathed to his executor on trust for a number of distinct purposes. In the first bequest, Sean has directed that the sum of €2,000,000 ought to be used by the executor in such manner as he sees fit to promote the playing of football in rural communities. In the second bequest, Sean directed that the sum of €1,000,000 ought to be used by the executor to ensure the provision of playing fields in Sean's home town. Finally, he has bequeathed the sum of €100,000 to his executor for the purpose of organising a campaign to promote the introduction of legislation criminalising certain conduct on the playing pitch, such as remonstrating with referees. Discuss, with reference to relevant case law, whether the above bequests constitute valid charitable trusts.",
      },
      {
        examType: 'Essay',
        description:
          'Answer (a) [or]{.underline} (b): (a) Consider, with reference to relevant case law, the circumstances in which it has…',
        text: 'Answer (a) [or]{.underline} (b): (a) Consider, with reference to relevant case law, the circumstances in which it has been deemed necessary to depart from the Cyanamid principles regarding applications for interlocutory injunctions, as first adopted in this jurisdiction in Campus Oil Ltd v The Minister for Industry and Energy (No. 2) [1983] IR 88. [Or]{.underline} (b) "The draconian and essentially unfair nature of Anton Piller orders from the point of view of respondents against whom they are made requires, in my view, that they be so drawn as to extend no further than the minimum extent necessary to achieve the purpose for which they are granted, namely the preservation of documents or articles which might otherwise be destroyed or concealed." Per Scott J in Columbia Pictures Industry v Robinson [1987] Ch 38. Discuss, with reference to the relevant case law, the principles governing applications for Anton Piller Orders.',
      },
      {
        examType: 'Essay',
        description: 'John, a bachelor, died suddenly last week.',
        text: "John, a bachelor, died suddenly last week. He died testate. John does not have any children, and is survived by three brothers. He was closest to Patrick, his youngest brother. Approximately six months ago, John told Patrick that he wished to transfer his leasehold interest in his shop to Patrick there and then, as he, John, wished to take life at an easier pace and enjoy himself while he was still in good health. John made it clear to Patrick that it was a gift which was to take effect immediately and was not to be postponed until his death. John did not, however, take any steps to complete the fit and no lease was executed in order to give effect thereto. The shop remained open and the staff previously employed by John ran the business until his death. Patrick did not take any part in running the shop before John's death and incurred no expenses in relation to same. John appointed Patrick as executor in his will. He devised his leasehold interest to his three brothers equally. Answer (a) [and]{.underline} (b) (a) Patrick asks you to clarify whether he may take the leasehold interest in the shop himself or whether he is obliged to share that interest with his two other brothers equally. [And]{.underline} (b) Indicate, giving reasons for your answer, whether your advices would be different if John's will was invalid and he therefore died intestate. Note that John's parents have pre-deceased him and his three brothers are his next of kin.",
      },
      {
        examType: 'Problem',
        description:
          '"There is a general consensus of opinion that, if liability as… Trustee, Constructive Trust.',
        text: '"There is a general consensus of opinion that, if liability as constructive trustee is sought to be imposed...on the basis that the defendant has assisted in the misapplication of trust property (knowing assistance) \'something amounting to dishonesty or want of probity on the part of the defendant must be shown\' (see per Vinelott J in Eagle Trust plc v SBC Securities Ltd [1993] All ER 488 at 499). Vinelott J described as "settled law" the proposition that \'a stranger cannot be made liable for knowing assistance in a fraudulent break of trust unless knowledge of the fraudulent design can be imputed to him...\' I respectfully agree." Polly Peck International plc v Nadir (No. 2) [1992] 4 All ER 769 at 777, per Scott LJ. Discuss, with reference to the relevant case law, the degree of knowledge of a breach of trust which a stranger to that trust must possess in order to be held liable as a constructive trustee for his or her "knowing assistance".',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: 'Write a note on any two of the following three topics. Refer to case law, where relevant. (i) The principle in Re Hastings-Bass [1975] Ch 25 (ii) Rectification (iii) The Presumption of Advancement',
      },
      {
        examType: 'Problem',
        description:
          'William, a solicitor, died recently, having mixed his own money in a… Trustee.',
        text: "William, a solicitor, died recently, having mixed his own money in a current account with certain funds from two other accounts, one containing monies from the Blackjack trust of which he was a trustee, and the other containing the monies belonging to Eileen, a client. Having mixed the said monies, he made numerous payments out of, and some lesser payments into, that current account. He also made certain payments from that account to the beneficiaries under the trust in accordance with the terms thereof. At the time of his death, there were insufficient funds to meet his personal debts and to meet Eileen's claim and the claim of the beneficiaries under the Blackjack trust. Advise Eileen, making reference to relevant case law.",
      },
      {
        examType: 'Essay',
        description:
          'In exercising his discretion a trustee must act honestly and must use as much diligence as a prudent man of business…',
        text: 'In exercising his discretion a trustee must act honestly and must use as much diligence as a prudent man of business would exercise in dealing with his own private affairs; in selecting an investment he must take as much care as a prudent man would take in making an investment for the benefit of persons for whom he felt morally bound to provide. Businessmen of ordinary prudence may, and frequently do, select investments which are more or less of a speculative character; but it is the duty of a trustee to confine himself not only to the class of investment which are permitted by the settlement or by statute, but to avoid all such investments of that class as are attended with hazard." Per Murphy J in Stacey v Branch [1995] 2 ILRM 136. Consider the law regarding the duty of trustees in relation to the investment of trust property. Support your answer by reference to relevant case law.',
      },
      {
        examType: 'Essay',
        description: 'Maria died recently, aged 90.',
        text: "Maria died recently, aged 90. She lived the final years of her life in a state of some confusion and fear for her personal safety. Her house is located in a quiet rural spot and Maria was often petrified by news reports of attacks on elderly persons in circumstances similar to her own. Thus, she was very relieved when Bridget, a young neighbour, began to visit her on a regular basis. Bridget began to take charge of the day-to-day running of Maria's life and, having gained Maria's confidence, suggested to her that she should transfer the house to Bridget. Bridget argued that if she did this, Maria would acquire peace of mind and freedom from constant worry about intruders. Before making any decision, Maria spoke to her solicitor who advised strongly against the transfer to Bridget. Despite this advice, Maria, being timid in nature and not wishing to offend Bridget or lose her companionship, transferred the property into Bridget's name. Maria's nephew, Conor, to whom Maria left all of her property by will, now wishes to challenge the transfer to Bridget and seeks your opinion on the matter. ──────────────────────────────────────────────────────────────────────",
      },
      {
        examType: 'Essay',
        description:
          'You have been approached by Deirdre, the former treasurer of the Female Lawyers Association, an unincorporated…',
        text: 'You have been approached by Deirdre, the former treasurer of the Female Lawyers Association, an unincorporated association which sought to promote the interests of its female members. All persons wishing to become members paid a fee, although there were different categories of member, each with its own fee rate. In recent years, a dispute arose within the Association as to how best to promote the interests of female lawyers, due to in-fighting, a considerable number of members left before the Association was ultimately dissolved some months ago. At the time of its dissolution, the Association had a surplus of €20,000 derived from the fees paid by its various members. Deirdre also has possession of a separate sum of €1,240 which was left over after a fundraising effort organised to meet the cost of an annual Christmas party run by the Association for the benefit of children residing n the area in which the Association had its headquarters. The funds were raised by means both of contributors to collection boxes and by sponsorship of persons undertaking a mini-marathon. As far as the latter means of donation was concerned, persons placed their name and address on a sponsorship card and indicated the amount donated. Deirdre seeks your advice regarding the distribution of both the €20,000 and the €1,240 sums.',
      },
      {
        examType: 'Essay',
        description:
          'Discuss, making reference to relevant case law, the defences to an application for specific performance.',
        text: 'Discuss, making reference to relevant case law, the defences to an application for specific performance.',
      },
      {
        examType: 'Problem',
        description:
          'Brian, who died recently, was a committed environmentalist throughout his… Advise Bridget on the likely validity of…',
        text: 'Brian, who died recently, was a committed environmentalist throughout his life. He died testate, and his bequests in his Will reflect his commitment to environmental issues. First of all, he directed that a sum of €500,000 be held on trust by his Executor, Bridget, to raise awareness and to promote discussion amongst the general public of issues pertaining to environmental sustainability. Brian also directed Bridget in his Will to use €400,000 for the promotion of a campaign to secure the enactment of legislation compelling members of the public to recycle at least 50% of all their domestic waste. Finally, he left €100,000 to Bridget to be used to promote a group of artists who sought to create works of art using only compost materials. Unknown to Brian, this group of artists had disbanded before his death, but subsequently re-formed seeking to make art from used toner cartridges. Advise Bridget on the likely validity of these three gifts.',
      },
      {
        examType: 'Problem',
        description: 'Answer (a) [AND]{.underline} (b). Frustrat, Injunction.',
        text: 'Answer (a) [AND]{.underline} (b). Both parts carry equal marks. (a) The courts in this jurisdiction have accepted that an application for a Mareva injunction must adduce evidence of: "an intention on the part of the defendant to dispose of his assets with a view to evading [the defendant\'s] obligation to the plaintiff and to frustrate the anticipated order of the court. It is not sufficient to establish that the assets are likely to be dissipated in the ordinary course of business or in the payment of lawful debts." (Hamilton CJ in O\'Mahony v Horgan [1995] 2 IR 411 at 419.) Discuss the nature of this requirement, supporting your answer by reference to relevant case law. [AND]{.underline} (b) Discuss, with reference to relevant case law, the duty upon an applicant for a Mareva injunction to make "full and frank disclosure" to the court of all matters relevant to the exercise by that court of its discretion whether or not to grant the injunctive relief sought.',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: 'Write a note on any two of the following three topics. All questions carry equal marks. (a) The doctrine of satisfaction. (b) Donatio Mortis Causa. (c) The equitable remedy of rectification.',
      },
      {
        examType: 'Essay',
        description: 'You act for Gaelic Bank.',
        text: "You act for Gaelic Bank. In the light of recent developments in the banking sector, your client is reviewing its loans policies and procedures. The Bank is anxious to ensure that it is in a position to safeguard the monies that it lends. To that end, Gaelic Banks asks you to prepare guidelines regarding the matters that the Bank must attend to in order to ensure that it can enforce loan agreements entered into with customers when the spouse of that customer has acted as guarantor of liabilities or has agreed to create a charge over assets in respect of the customer's liabilities. In drafting these guidelines for your client you should, where appropriate, refer to relevant case law to illustrate and clarify for your client the points that you are making.",
      },
      {
        examType: 'Essay',
        description:
          'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" and one of…',
        text: 'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" and one of the other two "certainties" which must be deemed to exist in order to ensure the creation of a valid express trust. (60 marks will be allocated for that part of the question dealing with certainty of objects and 40 marks for that part dealing with the other certainty as chosen by the student.)',
      },
      {
        examType: 'Problem',
        description: 'James, a widower, owned a large house. Succession.',
        text: "James, a widower, owned a large house. In his Will, he bequeathed that house to his son John. In discussions with John, he mentioned to him that the house would be his after his death and on the strength of that assurance, John took his name off the local authority housing list. Some months later, however, James and John had a blazing row and were no longer on speaking terms. In his anger, James changed the terms of his Will and left the house to John's sister, Karen. James died last month. Advise John, making reference to relevant case law. Students do not need to consider whether any possible issues arise pursuant to the Succession Act 1965.",
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2010,
    questions: [
      {
        examType: 'Essay',
        description:
          '"Where there is a transfer by a person into his own name jointly with that of a person who is not his or her child, of…',
        text: '"Where there is a transfer by a person into his own name jointly with that of a person who is not his or her child, of money on deposit receipt there is, prima facie, a resulting trust to the transferor." Per Gordon J in Doyle v Byrne (1922) 56 ILTR 125 at 126-127. Discuss the above statement in the context of joint bank accounts, supporting your answer by reference to relevant case law.',
      },
      {
        examType: 'Problem',
        description:
          'You act on behalf of a group of elderly individuals who have recently… Advise your clients, supporting your answer with…',
        text: "You act on behalf of a group of elderly individuals who have recently booked a package holiday abroad with Holy Holidays Ltd, a travel group specialising in religious holidays to foreign destinations. Your clients are all devout people who booked an Easter holiday to Jerusalem with Holy Holidays Ltd. The holiday itinerary, at the time of booking, included trips to various religious shrines and attendance at an Easter pageant which is only performed once every ten years. All of your clients booked the holiday specifically to attend this pageant and, being of advanced years, believe that this may be their last opportunity to see this spectacle. They are therefore most distressed when they read in their monthly parish newsletter that, on a recent visit to Jerusalem by the newsletter's editor, the editor heard talk that Holy Holidays Ltd did not propose to bring its customers to the pageant but was instead going to book seats for its customers at a free singing competition in a local hotel. Some of your clients then approached the staff in Holy Holidays Ltd, who refused to comment on this speculation, although one staff member did refer to the difficulties that the travel industry was encountering at present and for the need to save money where possible. Your clients have discussed this situation amongst themselves and instruct you now that they are all most anxious to enjoy their forthcoming holiday, but are adamant that they must attend the religious pageant. They wish to take steps to prevent Holy Holidays Ltd from changing the itinerary in this way and, as the holiday is to take place in Easter time, they are anxious to proceed to Court promptly. Advise your clients, supporting your answer with reference to relevant case law.",
      },
      {
        examType: 'Problem',
        description:
          '"A stranger cannot be made liable for knowing assistance in a fraudulent… Trustee, Constructive Trust.',
        text: '"A stranger cannot be made liable for knowing assistance in a fraudulent breach of trust unless knowledge of the fraudulent design can be imputed to him." Per Vinelott J in Eagle Trust plc v SBC Securities Ltd [1992] 4 All ER 488 at 499. Discuss, with reference to relevant case law, the degree of knowledge of a breach of trust which a stranger to that trust must possess in order to be held liable as a constructive trustee for his or her "knowing assistance".',
      },
      {
        examType: 'Essay',
        description: 'Answer (a) [and]{.underline} (b).',
        text: 'Answer (a) [and]{.underline} (b). Both parts carry equal marks. (a) Non-charitable purpose trusts are not generally regarded as valid. Discuss, with reference to relevant case law, why this is so. [And]{.underline} (b) Discuss those exceptional categories of cases in which non-charitable purpose trusts may be enforced. Make reference, where appropriate, to relevant case law.',
      },
      {
        examType: 'Problem',
        description:
          'George and Anne died recently, leaving four young children under the age… Trustee, Company.',
        text: "George and Anne died recently, leaving four young children under the age of 10. They had made a joint Will in which they appointed David as trustee of a considerable sum of money to be used for the benefit of the children once they reach their majority. There are no specific provisions in the Will regulating the investment of the trust fund. David is anxious to preserve the value of the trust fund for the children until they reach their majority. Advise him in relation to both (a) [and]{.underline} (b). (a) The investments that he may lawfully make in order to preserve the trust fund [And]{.underline} (b) The standard of care which he must employ in exercising those powers of investment. 6 marks will be allocated for part (a) and 14 marks for part (b). Jack and Derek are brothers who live in a house together which they jointly own. Neither party ever married and they have lived together for all of their adult life. Jack has always been the stronger personality of the two, and Derek is inclined to follow his lead without question. This is particularly the case in relation to all matters financial and Jack makes all decisions of a monetary nature which have a bearing on them. Jack is a businessman and for the past number of years, he has run a computer sales business, Laptop Ltd, of which he is the major shareholder. Derek works as a salesman for this company on a part-time basis. While the business was very successful initially, the recession has hit Laptop Ltd badly and its profits have declined considerably in the past two years. Jack is convinced that the company needs to adapt and become involved in construction in the commercial sector if it is to survive. In order to adapt the business in this manner, however, Laptop Ltd needs a considerable injection of capital. Jack is convinced that the company will not survive without it. He approached Derek with the suggestion that they should together join in the execution of a charge over their home in favour of Hasty Banks in order to obtain a loan for Laptop Ltd. Derek had little understanding of such matters but was somewhat anxious about this suggestion. Jack, convinced that this loan represented Laptop Ltd's only chance for financial security, was dismayed at his brother's reluctance to do as he wished, and over a period of weeks, began to nag him about the matter until eventually Derek agreed to go into Hasty Banks and do as Jack wished. Jack immediately rang Sean, bank manager at Hasty Banks, who has been a close friend of the two brothers for many years, to make an arrangement to meet to discuss this matter. Derek attended the bank with Jack and, in discussion with Sean, told him about his anxiety about the proposal but added that the supposed that he had no choice as the company could not continue to function without the loan. While Jack was out getting a coffee, Sean told Derek that he could seek legal advice about this matter and stated that a solicitor would explain the repercussions to him of executing the charge. He suggested to Derek that he might go down the road to see Bridget, a solicitor, and Derek agreed that he would do so. The following week, Derek and Jack came back into the bank and signed the necessary documents to execute the charge. Sean did not check whether Derek had ever gone to see Bridget for legal advice. In fact, Derek never did so, as he decided to leave such matters to Jack. Laptop Ltd has defaulted on the loan repayments for the past ten months. Hasty Banks wishes to enforce the charge. Advise Sean accordingly, making reference in your advice to relevant case law.",
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: 'Write a note on any two of the following three topics. Refer, where appropriate, to relevant case law: (a) Rectification; (b) The continued relevance in modern law of any four equitable maxims; (c) The rule in Strong v Bird [1874] LR 18 Eq315.',
      },
      {
        examType: 'Problem',
        description:
          'James, a solicitor, was unmarried and had been in a relationship for many… Advise Aoife.',
        text: 'James, a solicitor, was unmarried and had been in a relationship for many years with Aoife. While he wished to make provision for her in the event of his death, he did not wish to do so in a manner which would disclose said relationship on the face of his Will. Thus, when executing his Will some three years ago, he devised his leasehold interest in an apartment "to Jack and Mary as tenants in common on the understanding that they will use it for the purpose as disclosed by me to them." Some weeks later, James in the course of a conversation with his friend Jack, said to Jack that "I am only leaving that apartment to Mary and yourself on the understanding that you will hold it for Aoife\'s benefit". Jack assured James that he would comply with his wishes but failed to ever mention the matter to Mary. James died some weeks ago. Mary is now claiming entitlement to half the apartment. Advise Aoife.',
      },
      {
        examType: 'Essay',
        description:
          'Paul and John concluded an argument in 2007 for the sale of land by Paul to John for €500,000.',
        text: "Paul and John concluded an argument in 2007 for the sale of land by Paul to John for €500,000. When John saw the document recording the contract for the sale of the land, he was incensed as a particular site that he wished to acquire was not included in the sale. He contacted Paul about this and Paul was adamant that when they were negotiating the sale, that particular site of land was never included in their discussions. John is somewhat confused as he had assumed that the site in question was a core part of the deal. He therefore instructed proceedings seeking rectification. Paul is now counter-claiming for specific performance of the contract actually concluded between the parties. John is most distressed by this development as he fears that he will suffer huge financial loss if he is compelled to go through with the sale as it is. Although at the time of the contract, he had intended to develop all parts of the land, the downturn in the economy means that only the excluded site remains a viable option for development. John attends your office seeking advice. He is wondering whether he can resist Paul's application for specific performance by relying upon the mistake on his part. Consider also whether he can defend that application by relying upon the defence of hardship. Support your answer by reference to relevant case law.",
      },
      {
        examType: 'Essay',
        description:
          'When the relationship between a donor and a donee of a gift at, or shortly before, the time of the execution of the…',
        text: 'When the relationship between a donor and a donee of a gift at, or shortly before, the time of the execution of the gift if such as to give rise to a presumption that the done had influence over the donor, a Court shall "set aside the voluntary gift, unless it is proved that in fact the gift was the spontaneous act of the donor acting under circumstances which enabled him to exercise an independent will and which justifies the Court in holding that the gift was the result of a free exercise of the donor\'s will... The Court interferes, not on the ground that any wrongful act has been committed by the done, but on the ground of public policy, and to prevent the relations which existed between the parties and the influence that arises therefrom being abused." Allcard v Skinner (1887) 36 Ch.D 145 at 171 per Cotton L.J. Discuss each of the assertions made by Cotton L.J. in the above quotation, making reference to relevant case law.',
      },
      {
        examType: 'Problem',
        description: 'She was a widow and is survived by four children. Succession.',
        text: "Jane died last month. She died testate. She was a widow and is survived by four children. Helen is the youngest of these four children. Helen qualified as a doctor and practised that profession for a number of years. Although she was going very well, and had indeed been offered a prestigious promotion, Helen abandoned her job in order to help her mother, then recently widowed, develop the family businesses as property developers and construction engineers. Helen also lived at home with her mother and cared for her during bouts of illness on her mother's part. Approximately two years ago, Helen decided that she wished to buy a house for herself but when her mother, Jane, heard this, she became upset. Jane asked her to stay with her at home and asked \"why would you want to get yourself a house? Then you would have two houses as you know that this house and all I have is yours when I die.\" After that conversation with her mother, Helen decided not to buy herself a house but instead began an extensive redecoration of the family home on the basis that she would inherit it after her mother's death. No costs were incurred when redecorating due to the contacts she and her mother had in various construction and interior decorating businesses. Helen has now learnt, however, that Jane's will leaves her estate, which includes the family home and the property development and construction engineering business, to her four children in equal shares. She seeks your advice. (Students need not advise in relation to any possible reliefs under the Succession Act 1965).",
      },
      {
        examType: 'Essay',
        description:
          'Write a note on any [two]{.underline} of the following [three]{.underline} topics.',
        text: 'Write a note on any [two]{.underline} of the following [three]{.underline} topics. Make reference to relevant case law where appropriate. All parts carry equal marks. (a) Charitable Trusts for the relief of poverty (b) Mandatory Interlocutory Injunctions (c) Quistclose Trusts',
      },
      {
        examType: 'Problem',
        description:
          'William, a solicitor, died recently, having mixed his own money in a… Trustee.',
        text: "William, a solicitor, died recently, having mixed his own money in a current account with certain funds from two other accounts, one containing monies from a trust of which he was a trustee, and the other containing the monies belonging to Eileen, a client. Having mixed the said monies, he made numerous payments out of, and some lesser payments into, that current account. He also made certain payments from that account to the beneficiaries under the trust in accordance with the terms thereof. At the time of his death, there were insufficient funds to meet his personal debts and to meet Eileen's claim and the claim of the beneficiaries under the trust. Advise Eileen, making reference to relevant case law.",
      },
      {
        examType: 'Essay',
        description:
          '"Where there is a transfer by a person into his own name jointly with that of a person who is not his or her child, of…',
        text: '"Where there is a transfer by a person into his own name jointly with that of a person who is not his or her child, of money on deposit receipt there is, prima facie, a resulting trust to the transferor." Per Gordon J in Doyle v Byrne (1922) 56 ILTR 125 at 126-127. Discuss the above statement in the context of joint bank accounts. Make reference to relevant case law.',
      },
      {
        examType: 'Problem',
        description:
          'Felicity and Abigail are the executrixes of the Will of their Uncle… Trustee, Company.',
        text: "Felicity and Abigail are the executrixes of the Will of their Uncle Jeremy, which contains a number of detailed bequests. In his Will, Jeremy has provided that the two women shall hold the family clothes store on trust for the benefit of his widow and their three youngest children. Felicity if very anxious to proceed with her duties as trustee and takes a very keen interest in the running of the store, scrutinising accounts and maintaining good contacts with the shop's suppliers. Abigail, however, is a successful businesswoman in her own right and adopts a more hands-off approach to the running of the store. She has not come to any of the meetings arranged by Felicity to discuss the future of the store but has expressed the view to Felicity that she does not think the store is a viable prospect in the long term and suggested that it ought to be sold and the monies invested in stocks and shares. Some months after Jeremy's death, Abigail opened up her own clothes shop on the street adjoining the above store, using contacts that she had obtained from her access to the records as forwarded to her by Felicity. As Abigail is selling goods at a discount, the trust store has begun to show considerable decline in profit. Jeremy also bequeathed €100,000 to Felicity and Abigail on trust for his eldest child for life and thereafter to Jeremy's grandchild. The Will provides that the two trustees shall have an absolute discretion in relation to the investment of the monies. Felicity is a committed animal rights activist and decides, without discussing the matter with Abigail, to invest the monies in a fledgling cosmetics company that does not test products on animals. Unfortunately Felicity, though well intentioned, failed to research the potential for, and likelihood of, economic growth of these investments and the company performs very poorly, making considerable losses before going into liquidation. Advise the beneficiaries under the two trusts. Make reference, where appropriate to relevant case law and statutory provisions.",
      },
      {
        examType: 'Essay',
        description:
          '"A gift is a gift, and, of course, if a donor, while expressing an intention to give something and taking certain steps…',
        text: '"A gift is a gift, and, of course, if a donor, while expressing an intention to give something and taking certain steps in the direction of giving it, has not gone the whole way, the expectant done has no equity to compel the completion of the gift. It is good sense and good law." Per Johnston J in Re Wilson [1933] IR 729 at 739 In light of the above statement, discuss what is required of a settlor to ensure that a trust is completely constituted. Support your answer with relevant case law.',
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2011,
    questions: [
      {
        examType: 'Essay',
        description: 'You act for Gaelic Bank.',
        text: "You act for Gaelic Bank. In the light of recent developments in the banking sector, your client is reviewing its loans policies and procedures. The Bank is anxious to ensure that it is in a position to safeguard the monies that it lends. To that end, Gaelic Bank asks you to prepare guidelines regarding the matters that the Bank must attend to in order to ensure that it can enforce loan agreements entered into with customers when the spouse of that customer has acted as guarantor of liabilities or has agreed to create a charge over assets in respect of the customer's liabilities. In drafting these guidelines for your client you should, where appropriate, refer to relevant case law to illustrate and clarify for your client the points that you are making.",
      },
      {
        examType: 'Essay',
        description:
          '"In exercising his discretion a trustee must act honestly and must use as much diligence as a prudent man of business…',
        text: '"In exercising his discretion a trustee must act honestly and must use as much diligence as a prudent man of business would exercise in dealing with his own private affairs; in selecting an investment he must take as much care as a prudent man would take in making an investment for the benefit of persons for whom he felt morally bound to provide. Businessmen of ordinary prudence may, and frequently do, select investments which are more or less of a speculative character; but it is the duty of a trustee to confine himself not only to the class of investment which are permitted by the settlement or by statute, but to avoid all such investments of that class as are attended with hazard." Per Murphy J in Stacey v Branch [1995] 2 ILRM 136. Consider the law regarding the duty of trustees in relation to the investment of trust property. Support your answer by reference to relevant authority.',
      },
      {
        examType: 'Problem',
        description:
          'Sean, a self-made millionaire, has recently retired. Advise on the likelihood that his proposed trusts will obtain…',
        text: 'Sean, a self-made millionaire, has recently retired. He is conscious of how fortunate he has been in his life and now wishes to help out certain members of his family who have struggled to make ends meet. He proposes creating a trust in favour of "his brothers and sisters who are experiencing economic hardship". He has also decided to make a generous donation to his beloved sports club, the Phoenix Polo club, of which he was agreed to act as treasurer since his retirement. The club is an exclusive club with approximately 500 members and a small but committed staff. The members pay an annual membership fee of 10,000 Euro. The club is non-profit making and the fees are invested in the club to maintain the grounds and to care for the horses. Sean proposes to create trust in favour of the club for the purpose of mounting a promotional campaign to attract foreign tourists to the Club. Sean feels that the sport has a huge untapped potential as a tourist attraction and feels that the Club could do its bit for the economy in these difficult times by enticing tourists to Ireland to enjoy the experience of the sport which has been played in the country for over 400 years. He also proposes specifying in the trust document that 10% of the trust fund be used to permit the young people who are resident in the area in which the club is situated to avail of healthy recreation by partaking in his beloved sport free of charge for two hours each week. Sean approaches you asking you to advise on the likelihood that his proposed trusts will obtain charitable status. Support your answer, where appropriate, by reference to relevant case law and the provisions of the Charities Act, 2009.',
      },
      {
        examType: 'Essay',
        description: 'Answer (a) [or]{.underline} (b).',
        text: 'Answer (a) [or]{.underline} (b). Support your answer by reference to relevant case law. (a) Consider the approach adopted by the Irish courts in relation to applications for interlocutory injunctions in defamation cases. [OR]{.underline} (b) Consider the obligation upon an applicant for a Mareva injunction to adduce evidence on an intention on part of the respondent to dispose of his or her assets with a view to evading his or her obligation to the applicant.',
      },
      {
        examType: 'Problem',
        description:
          'Mary Hayes who died recently, lived a long and happy life surrounded by… Advise Brian as to who shall take the benefit…',
        text: 'Mary Hayes who died recently, lived a long and happy life surrounded by her very large group of friends and by her family in her home town of Ballysalmon, a town of some 10,000 inhabitants. She was very involved in all aspects of life in the town and was very well known and liked by most people in the town. In her later years, Mary became most interested in the study of local history and that of her own family in particular. She was very proud of the fact that the land that she owned and on which her house was situated had been in the Hayes family for over 250 years. She died testate, survived by her husband. They did not have any children but Mary was very close to her 4 nephews and nieces, all of whom went by the surname Hayes. In her Will, she appointed one of her nephews, Brian, as her Executor. She devised the fee simple in her land to her husband, John, for his absolute use and benefit, "subject to my sincere wish" that he would not sell the land but would retain it for her 4 nephews and nieces. She also bequeathed the sum of €250,000 to Brian on trust for "those of my relatives and friends in the town of Ballysalmon as he shall choose". Finally, she nominated the Ballysalmon Historical Society as the beneficiary under her residuary clause. Advise Brian as to who shall take the benefit of the above devise and bequest. Support your answer by reference to relevant case law.',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any [two]{.underline} of the following three topics.',
        text: 'Write a note on any [two]{.underline} of the following three topics. Refer to case law, where relevant. (i) The exceptional categories of non-charitable purpose trusts which may be enforced. (ii) Rectification. (iii) Quistclose trusts.',
      },
      {
        examType: 'Problem',
        description:
          'Two years ago, when made redundant from his job as an engineer, Conor… Advise Tom.',
        text: "Two years ago, when made redundant from his job as an engineer, Conor bought a house next to his father's house as he wished to return to live in the rural area in which he grew up and resume farming as his father before him had done. His redundancy payment did not, however, run to covering the expense of buying both a house and land. His father Tom, however, retained ownership of a large farm adjacent to Conor's new house and, as Tom was now elderly, Conor hoped to earn a living from farming this land. Although Conor had a close relationship with his father and his father knew of Conor's plans and intentions, the parties never actually addressed the issue of whether Conor would have an interest in the land during Tom's lifetime or thereafter. Conor nonetheless spent a considerable amount of money developing and modernising the farm. Tom helped him out sometimes on the farm and Conor, in turn, took over the management of his father's business accounts. They maintained a close and trusting relationship throughout. During this time, Conor was married to Aoife. Unfortunately, the relationship has broken down and Aoife now seeks a divorce and ancillary reliefs. She seeks, amongst other things, a share of what she alleges in Conor's beneficial interest in the farm. Tom is amazed at this development and seeks your legal assistance. Advise Tom.",
      },
      {
        examType: 'Essay',
        description:
          'Consider, with reference to relevant case law, the traditional reluctance of the courts to grant specific performance…',
        text: 'Consider, with reference to relevant case law, the traditional reluctance of the courts to grant specific performance of contracts requiring supervision.',
      },
      {
        examType: 'Problem',
        description: 'James, a widower, owned a large house. Succession.',
        text: 'James, a widower, owned a large house. He died testate, and drafted his initial Will in 2007. At the time, he had a very good relationship with his son David and was very concerned about David\'s financial circumstances. David was unemployed and, although he had placed his name on the local authority housing list in 2004, he had not yet been offered a house by the authority. Although it appeared that David would soon reach the top of the local authority list and hence be offered a house in which to reside, James remained uneasy about the certainty of it all and so, in his Will, he bequeathed the house to David. A number of months passed by and still no offer of a house was made to David by the local authority. James assured his son that he need not worry, stating that "he was an old man now who not long for this world and that my house will be yours when I am gone". David was delighted to hear this and, on the strength of his father\'s words, took his name off the local authority housing list. James died last week and David believes that the house is now his. Unbeknown to him, however, his father changed his Will last month after a blazing row between the two of them. James felt that his son was no longer looking for work and expressed this view to David quite forcefully. They argued and, in his anger, James changed his will, leaving the house to his daughter Karen. David is most surprised when he learns that the house has been bequeathed to Karen. He seeks your advice as to his entitlements, if any. Advise David, making reference to relevant case law. Students do not need to consider whether any possible issues arise pursuant to the Succession Act, 1965.',
      },
      {
        examType: 'Essay',
        description:
          '"It is well established that the ordinary test of a fair case to be tried is not sufficient to meet the first leg of…',
        text: '"It is well established that the ordinary test of a fair case to be tried is not sufficient to meet the first leg of the test for the grant of an interlocutory injunction where the injunction sought is in effect mandatory. In such a case it is necessary for the applicant to show at least that he has a strong case that he is likely to succeed at the hearing of the action." per Fennelly J in Lingham v Health Services Executive [2006] ELR 137 at 140 Despite the above statement, there is still some uncertainty regarding the test to be applied in this jurisdiction in the context of mandatory interlocutory relief, as some judgements do appear to endorse the Campus Oil Standards in this context. Consider the relevant Irish Case law, showing in your answer evidence of the different approaches adopted by the Courts in relation to this test.',
      },
      {
        examType: 'Essay',
        description:
          'Write a note on any [two]{.underline} of the following [three]{.underline} topics.',
        text: 'Write a note on any [two]{.underline} of the following [three]{.underline} topics. All questions carry equal marks. a) The doctrine of satisfaction; b) Charitable Trusts for the relief of poverty; c) The equitable remedy of rectification.',
      },
      {
        examType: 'Problem',
        description:
          'George and Anne died recently, leaving four young children under the age… Trustee.',
        text: 'George and Anne died recently, leaving four young children under the age of 10. They had made a joint Will in which they appointed David as trustee of a considerable sum of money to be used for the benefit of the children once they reach their majority. There was no specific provisions in the Will regulating the investment of the trust fund. David is anxious to preserve the value of the trust fund for the children until their majority. Advise him in relation to both (a) [and]{.underline} (b) (a) The investments that he may lawfully make in order to preserve the trust fund; [And]{.underline} (b) The standard of care which he must employ in exercising those powers of investment.',
      },
      {
        examType: 'Essay',
        description:
          'Ian, a businessman, owns a number of properties and a number of years ago, he transferred many of those properties into…',
        text: "Ian, a businessman, owns a number of properties and a number of years ago, he transferred many of those properties into the name of his nephew, Martin. He did this in order to protect those properties from claims of his creditors. Martin was like a son to Ian, who did not have children of his own. When Martin was a toddler, his parents died and Ian agreed that he would assume responsibility for the care of his nephew. He stuck to his word and he and martin always had a great relationship. When Ian transferred properties into Martin's name, Martin was twelve years of age. Since that time, Ian has discharged all of his debts to his former creditors, but the properties have remained in Martin's name. Recently, Ian had a new business idea which will require a considerable amount of collateral if it is to be put into effect. In order to get the funding from his bank for this proposed project, Ian must satisfy his bank manager that he is the beneficial owner of the properties. Unfortunately, when he mentions this to Martin, it puts a strain on their relationship as Martin, who has just finished his college, was hoping to sell some of those properties to fund setting up of his own business. Martin is adamant that he is entitled to enjoy the beneficial ownership of the properties in question. Ian seeks your advice regarding the ownership of properties. Support your answer with reference to relevant case law.",
      },
      {
        examType: 'Essay',
        description:
          'I do not think that it should be assumed that as soon as any element of personal service or continuous services can be…',
        text: 'I do not think that it should be assumed that as soon as any element of personal service or continuous services can be discerned in a contract the court will, without more, refuse specific performance...... As is so often the case in equity, the matter is one of balance of advantage and the disadvantage in relation to the particular obligations in question; and the fact that the balance will usually lie on one side does not turn this probability into a rule." Per Megarry J in C.H. Giles and Co. v Morris [1972] 1 WLR 307 at 318 Consider how the courts have dealt with the specific performance of contracts for personal services. Support your answer by reference to the relevant case law.',
      },
      {
        examType: 'Problem',
        description: 'John, a bachelor, died suddenly last week.',
        text: "John, a bachelor, died suddenly last week. He died in testate. John does not have any children, and is survived by three brothers. He was closest to Patrick, his youngest brother. Approximately six months ago, John told Patrick that he wished to transfer his leasehold interest in his shop to Patrick there and then, as he, John, wished to take life at an easier pace and enjoy himself while he was in good health. John made it clear to Patrick that it was a gift which was to be postponed until his death. John did not, however, take any steps to complete the gift and no lease was executed in order to give effect thereto. The shop remained open and the staff previously employed by John ran the business until his death. Patrick did not take any part in running the shop before John's death and incurred no expenses in relation to the same. John appointed Patrick as the executor in his will. He devised his leasehold interest to his three brothers equally. Answer (a) [and]{.underline} (b) (a) Patrick asks you to clarify whether he may take the leasehold interest in the shop himself or whether he is obliged to share that interest with his two other brothers equally. 12 marks [And]{.underline} (b) Indicate, giving reasons for your answer, whether your advises would be different if John's will was invalid and he therefore died intestate. Note that John's parents have pre-deceased him and his three brothers are his next of Kin.",
      },
      {
        examType: 'Essay',
        description: 'Mary died recently at the age of 92.',
        text: "Mary died recently at the age of 92. She lived the final years of her life in a state of some confusion and fear for her personal safety. Her house is located in a quite rural spot and Mary was often petrified by news reports of attacks on elderly persons in circumstances similar to her own. Thus she was relieved when Betty, a young neighbour, began to visit her on a regular basis. Betty began to take charge of the day-to-day running of Mary's life and/having gained Mary's confidence, suggested to her that she should transfer the house to Betty. Betty argued that if she did this, Mary would acquire peace of mind and freedom from constant worry about intruders. Before making any decisions, Mary spoke to her solicitor who advised strongly against this the transfer to Betty. Despite this advice, Mary being timid in nature and not wishing to offend Betty or lose her companionship, transferred the property into Betty's name. Mary's nephew, Conor to whom Mary left all her property by will, now wishes to challenge the transfer to Betty and seeks your opinion on the matter.",
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2012,
    questions: [
      {
        examType: 'Problem',
        description:
          'In recent years, the Irish courts have begun to adopt a less restrictive… Damages, Injunction.',
        text: 'In recent years, the Irish courts have begun to adopt a less restrictive approach to the requirement that a plaintiff seeking a mareva injunction must show that there is a real risk that the defendant will dispose of his or her assets for the purpose of preventing the plaintiff from recovering damages. This approach will help plaintiffs striving to recover large debts from debtors, making mareva injunctions a very real and powerful tool in debt recovery litigation. Discuss the above, supporting your answer with reference to relevant case law.',
      },
      {
        examType: 'Problem',
        description:
          'Paul and John concluded an agreement in 2008 for the sale of land by Paul… Specific Performance.',
        text: "Paul and John concluded an agreement in 2008 for the sale of land by Paul to John for €500,000. Recently, when reviewing the paperwork recording the sale contract, John was shocked to discover that a particular site that he wished to acquire was not included in the sale. He contacted Paul about this and Paul was adamant that when they were negotiating the sale, that particular site of land was never included in their discussions. John is somewhat confused as he had assumed that the site in question was a core part of the deal. He therefore instituted proceedings seeking rectification. Paul is now counter-claiming for specific performance of the contract actually concluded between the parties. John is most distressed by this development as he fears that he will suffer huge financial loss if he is compelled to go through with the sale as it is. Although at the time of the contract, he had intended to develop all parts of the land, the downturn in the economy means that only the excluded site remains a viable option for development. John attends your office seeking advice. First of all, advise John of his prospects of success in relation to the rectification of the document recording the contract. John is wondering whether he can resist Paul's application for specific performance by relying upon the mistake on his part. Advise him in that regard and, finally, consider whether he can defend that application by relying upon the defences of hardship and impossibility. Support your answer with reference to relevant case law.",
      },
      {
        examType: 'Problem',
        description:
          'Discuss, with reference to relevant case law, the degree of knowledge of a… Trustee, Constructive Trust.',
        text: 'Discuss, with reference to relevant case law, the degree of knowledge of a breach of trust which a stranger to that trust must possess in order to be held liable as a constructive trustee for his or her "knowing assistance".',
      },
      {
        examType: 'Problem',
        description: 'Betty died recently, in contentious circumstances. Succession.',
        text: "Betty died recently, in contentious circumstances. She had been suffering from cancer which was, unfortunately, at a most advanced stage. She refused to go into hospital and was being cared for at home by a nurse and an attending doctor. Her close friends, Mary and Jane, moved into the house to be with her around the clock. Approximately a fortnight before her death, Betty was told by the doctor that she had only about a month to live. Betty was in agony and not receiving comfort from the medication provided. Her only comfort was derived from her friends who were most attentive and spent their day by her bedside. One day, while her closest friend Jane was with her, Betty opened her bedside locker and presented her with a key to a box which was downstairs in the kitchen of the house and which contained her personal papers. Betty told Jane that the title deeds to an old house that she bought some years ago were in that box. Expressing her gratitude to Jane for her devoted friendship, Betty told Jane that she wished her to have the house. Some days later, Betty was in very considerable pain and asked Mary, who was by her side at the time, to assist her in her efforts to end her life. Mary resisted originally but, watching her friend's pain, eventually acceded to Betty's request. While cleaning out Betty's belongings some days ago Jane came across a locked box. Using the key that Betty had given her, she opened the box and found the deeds to the house to which Betty had referred. Advise Jane as to her entitlement in relation to Betty's house. Students do not need to consider whether any possible issues arise pursuant to the Succession Act, 1965.",
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: 'Write a note on any two of the following three topics. Refer to case law, where relevant. (i) The exceptional categories in which non-charitable purpose trusts may be enforced. (ii) The doctrine of satisfaction. (iii) Quistclose trusts.',
      },
      {
        examType: 'Essay',
        description:
          'You have been approached by Deirdre, the former treasurer of the Female Lawyers Association, an unincorporated…',
        text: 'You have been approached by Deirdre, the former treasurer of the Female Lawyers Association, an unincorporated association which sought to promote the interests of its female members. All persons wishing to become members paid a fee, although there were different categories of member, each with its own fee rate. In recent years, a dispute arose within the Association as to how best to promote the interests of female lawyers and due to in-fighting, a considerable number of members left before the Association was ultimately dissolved some months ago. At the time of its dissolution, the Association had a surplus of €20,000, derived from the fees paid by its various members. Deirdre also has possession of a separate sum of €1,240 which was left over after a fundraising effort organised to meet the cost of an annual Christmas party run by the Association for the benefit of children residing in the area in which the Association had its headquarters. The funds were raised by means both of contributions to collection boxes and by sponsorship of persons undertaking a mini-marathon. As far as the latter means of donation was concerned, persons placed their name and addresses on a sponsorship card and indicated the amount donated. Deirdre seeks your advice regarding the distribution of both the €20,000 and the €1,240 sums.',
      },
      {
        examType: 'Essay',
        description:
          '"A wife who has been induced to stand as a surety for her husband\'s debts by his undue influence, misrepresentation or…',
        text: "\"A wife who has been induced to stand as a surety for her husband's debts by his undue influence, misrepresentation or some other legal wrong has an equity against him to set aside that transaction. Under the ordinary principles of equity, her right to set aside that transaction will be enforceable against third parties (e.g. against a creditor) if either the husband was acting as the third party's agent or the third party had actual or constructive notice of the facts giving rise to her equity.\" Per Lord Browne-Wilkinson in Barclay's Bank v O'Brien [1994] AC 180 at 195 Answer (a) [and]{.underline} (b); (a) Consider, with reference to relevant case law, whether the husband/wife relationship gives rise to any presumption of undue influence. [And]{.underline} (b) Discuss the relevant case law regarding the circumstances in which a wife's right to rescind a transaction shall be enforceable against third parties. Consider the significance of the presence or absence of independent legal advice in this context.",
      },
      {
        examType: 'Problem',
        description:
          'Brian, a solicitor, died recently, having mixed his own money in a current… Trustee.',
        text: "Brian, a solicitor, died recently, having mixed his own money in a current account with certain funds from two other accounts, one containing monies from a trust of which he was a trustee, and the other containing the monies belonging to Eileen, a client. Having mixed the said monies, he made numerous payments out of, and some lesser payments into, that current account. He also made certain payments from the current account to the beneficiaries under the trust in accordance with the terms thereof. At the time of Brian's death, there were insufficient funds to meet his personal debts and to meet the Eileen's claim and the claim of the beneficiaries under the trust. Advise Eileen, making reference to relevant case law.",
      },
      {
        examType: 'Problem',
        description:
          'Last year, Jimmy and Michael became registered as civil partners. Company, Shareholder.',
        text: 'Last year, Jimmy and Michael became registered as civil partners. Jimmy has always been the stronger personality in the relationship and Michael is inclined to follow his lead without question. This is particularly the case in relation to all matters financial and Jimmy makes all decisions of a monetary nature which have a bearing on them. Jimmy is a businessman and for the past number of years, he has run a computer sales business, Laptop Ltd., of which he is the major shareholder. Michael works as a salesman for this company on a part-time basis. While the business was very successful initially, the recession hit Laptop Ltd., badly and its profits have declined considerably in the past two years. Jimmy is convinced that company can survive, however, if it gets a cash injection of €50,000. He approached Michael proposing that they should together execute a charge over their home in favour of Hasty Banks in order to obtain a loan for Laptop Ltd. Michael has little grasp of such matter but was somewhat anxious about this suggestion. Jimmy, convinced that this loan represents Laptop Ltd\'s only chance for financial security, was dismayed at his partner\'s reluctance to do as he wished and, over a period of weeks, persistently brought up the topic until eventually Michael agreed to go into Hasty Banks and do as Jimmy wished. Jimmy immediately rang Deirdre, bank manager at Hasty Banks, who has been a close friend of the two men for many years, to make an arrangement to meet to discuss this matter. Michael attended the bank with Jimmy and, in discussion with Deirdre, told her that, he did "not feel sure" about the proposal, but added that he supposed that he had no choice as the company could not continue to function without the loan. While Jimmy was out getting a coffee, Deirdre told Michael that he could seek legal advice about this matter and stated that a solicitor would explain the repercussions to him of executing the charge. She suggested to Michael that he might go down the road to see Bridget, a solicitor, and Michael agreed that he would do so. The following week, Jimmy and Michael came back into the bank and signed the necessary documents to execute the charge. Deirdre did not check whether Michael had ever gone to see Bridget for legal advice. In fact, Michael never did so, as he decided to leave such matters to Jimmy. Laptop Ltd. has defaulted on the loan repayments for the past ten months. Hasty Banks wishes to enforce the charge. Advise Deirdre accordingly, making reference in your advice to relevant case law. Students do not need to consider the application of the Civil Partnership and Certain Rights and Obligations of Cohabitants Act, 2010 for the purposes of this answer.',
      },
      {
        examType: 'Essay',
        description:
          '"It is indeed an essential feature of all charity in the legal sense that there must be in it some element of public…',
        text: '"It is indeed an essential feature of all charity in the legal sense that there must be in it some element of public benefit." Per Viscount Simmonds in Baddeley v IRC [1954] 1 WLR 84 Discuss the above statement, making reference to relevant case law and the relevant provisions of the Charities Act, 2009.',
      },
      {
        examType: 'Essay',
        description:
          'Write an essay on any [TWO]{.underline} of the following [THREE]{.underline} topics.',
        text: 'Write an essay on any [TWO]{.underline} of the following [THREE]{.underline} topics. All essays carry equal marks; (a) The Rule in Strong v Bird (1874) LR 18 Eq 315; (b) The Principles governing the distribution of surplus funds upon the dissolution of an unincorporated association; (c) Rebutting the Presumption of Advancement.',
      },
      {
        examType: 'Problem',
        description: 'James, a widower, owned a large house. Succession.',
        text: "James, a widower, owned a large house. In his Will, he bequeathed that house to his son William. In discussions with William, he mentioned to him that the house would be his after his death and on the strength of that assurance, William took his name off the local authority housing list. Some months later, however, James and William had a blazing row and were no longer on speaking terms. In his anger, and unbeknownst to William, James changed the terms of his Will and left the house to William's sister, Karen. James died last month. Advise William, making reference to relevant case law. Students do not need to consider whether any possible issues arise pursuant to the Succession Act, 1965.",
      },
      {
        examType: 'Essay',
        description: 'Trustees must not just act honestly.',
        text: "Trustees must not just act honestly. They must be prudent and exercise the degree of care which they would in conducting their own affairs but at the same time mindful that they are dealing with another's property. Consider the above statement in the context of a trustee's duties in relation to investment, supporting your answer by reference to relevant case law.",
      },
      {
        examType: 'Problem',
        description:
          'Holiday Bliss Ltd is a company which specialises in building holiday homes… Company, Director.',
        text: "Holiday Bliss Ltd is a company which specialises in building holiday homes in remote locations and in letting those holiday homes once built. The company has recently spent very considerable amounts of money developing a particular site which will be ready to receive holiday-makers in the upcoming tourist season, due to commence in or about one month's time. Brochures have been prepared which highlight the natural beauty and isolation of the location and quite a number of bookings have already been taken. Sheila, the managing director of Holiday Bliss Ltd, recently visited the site. While there, she was appalled to see John, director of a company called Noise Unlimited which engages in large-scale quarrying, inspecting the adjoining site. She approached him and he told her that Noise Unlimited proposes to commence quarrying in two weeks' time on the site for a rare and valuable mineral. He envisages that the quarrying will continue unabated for a number of years. Sheila has heard of Noise Unlimited from her friend Anne who completed her undergraduate thesis in environmental science on the health and environmental impacts of large scale quarrying. Sheila reads Anne's thesis and learns that such quarrying has on some (admittedly rare) occasions caused subsidence in lands adjoining those sites on which the quarrying takes place. John admits to Sheila that it is likely that the quarrying will cause considerable noise in the area and adds that it may also generate dust which will affect neighbouring lands. Some of Holiday Bliss Ltd's clients have also heard of this development and are considering cancelling their holidays. Sheila is distraught and realises that the entire holiday home site may have to be shut down if the nuisance caused by the quarrying proceeds in this manner. Sheila wants to take action on behalf of Holiday Bliss Ltd before the quarrying commences. Advise Holiday Bliss Ltd.",
      },
      {
        examType: 'Essay',
        description:
          'Discuss, with reference to relevant case law, the requirement of "certainty of intention" and "certainty of objects"…',
        text: 'Discuss, with reference to relevant case law, the requirement of "certainty of intention" and "certainty of objects" which must be satisfied in order to ensure the creation of a valid express trust. (8 marks will be allocated for the "certainty of intention" answer and 12 marks allocated for the "certainty of objects" answer).',
      },
      {
        examType: 'Problem',
        description:
          'David was an unmarried man who had been having a relationship for many… Advise Aoife.',
        text: 'David was an unmarried man who had been having a relationship for many years with Aoife. While he wished to make provision for her in the event of his death, he did not wish to do so in a manner which would disclose the said relationship on the face of his Will. Thus, when executing his Will some three years ago, he devised his apartment "to Jack and Mary as tenants in common in full confidence that they will use it for the purpose as disclosed by me to them". Some weeks later, David in the course of a conversation with his friend Jack, said to Jack that "I am only leaving that apartment to Mary and yourself on the understanding that you will hold it for Aoife\'s benefit". Jack assured David that he would comply with his wishes but failed to ever mention the matter to Mary. David died some weeks ago. Mary is now claiming entitlement to half the apartment. Advise Aoife. Students do not need to consider the application of the Civil Partnership and Certain Rights and Obligations of Cohabitants Act, 2010 for the purposes of this answer.',
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2013,
    questions: [
      {
        examType: 'Essay',
        description: '"It seems to me that the academic criticism of Ulster Bank Ltd.',
        text: '"It seems to me that the academic criticism of Ulster Bank Ltd. v Fitzgerald is well founded. A regime which places no obligation on a bank to take any steps to ascertain whether, in the presence of circumstances suggesting a non-commercial aspect to a guarantee, the party offering the guarantee may not be freely and fully entering into same, gives insufficient protection to potentially vulnerable sureties. While not necessarily accepting that the precise parameters, identified in Etridge, are those which give rise to an obligation on the bank to inquire, and thus represent the law in this jurisdiction, I am satisfied that the general principle, which underlies Etridge, is to the effect that a bank is placed on inquiry where it is aware of facts which suggest, or ought to suggest, that there may be a non-commercial element to a guarantee." Per Clarke J in Ulster Bank Ltd v Roche and Buttimer ([2012] IEHC 166). Consider the above statement, expressing your view in relation to the approach endorsed by Clarke J. Support your answer by reference to relevant case law.',
      },
      {
        examType: 'Essay',
        description:
          'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" and one of…',
        text: 'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" and one of the other two "certainties" which must be deemed to exist in order to ensure the creation of a valid express trust. (60 marks will be allocated for that part of the question dealing with certainty of objects and 40 marks for that part dealing with the other certainty as chosen by a student.)',
      },
      {
        examType: 'Essay',
        description:
          'Discuss the law in relation to [any two]{.underline} of the following three topics.',
        text: 'Discuss the law in relation to [any two]{.underline} of the following three topics. All questions carry equal marks. Make reference to relevant case law and relevant statutory provisions, if any. (a) Those exceptional categories of case in which non-charitable purpose trusts may be enforced. (b) Charitable Trusts for the relief of poverty. (c) The standard of care which a trustee must employ when exercising the powers of investment in relation to trust property.',
      },
      {
        examType: 'Problem',
        description:
          'Brian, a wealthy farmer, died recently. Advise Patrick, making reference to relevant case law.',
        text: "Brian, a wealthy farmer, died recently. He was a widower for some years prior to his death and died without issue. He died testate and in his Will bequeathed the fee simple in his sizeable farm to his beloved grandniece, Meabh. Brian had had bouts of ill-health for many years prior to his death and would not have been able to run the farm but for the help of Patrick, his nephew who did most of the heavy day-to-day work on the farm for the last fifteen years prior to Brian's death, commencing in 1997. Patrick, now in his 30's, had not done well in school and left after he completed primary school. Soon afterwards, Patrick began to do bits and pieces of work on Brian's farm and gradually assumed responsibility for most tasks, especially as Brian's health deteriorated. Brian's health got more fragile as time progressed. Brian was a gruff man and Patrick was shy and reluctant to ask him for more than the 25 Euro a week pocket money that Brian gave him. Brian did not feel the need to give any more to Patrick as the young man was living at home with his mother. By 2008, however, Patrick had spent ten years working on the farm and began to think about where his future lay. He started to think about the need to get a better education in order to get a better job in the future. When Brian heard of this plan, however, he dismissed as nonsense any need on Patrick's part to progress his education, as \"he would always be working on the farm\". This comment led Patrick to think that perhaps Brian was planning to leave the farm to him but he wasn't confident enough to pursue the topic further with Brian. With this hope in mind, Patrick abandoned the plan to go back to school and continued working on the farm. Nonetheless, Patrick wanted to feel more secure about his financial position and, as he was not confident enough to address the transfer of the farm to him in the future, Patrick decided instead to ask Brian for a salary which reflected the value of his labours. When he gathered the nerve to mention it to Brian, Brian refused to give him a proper wage on the basis that Patrick \"was working the farm for himself as it would be his\" after Brian was gone. This gave Patrick some comfort and he began to see his future in terms of ownership of the farm. He decided to erect some new badly needed sheds and used what little money he had saved to pay for them. He also researched the possibility of using better quality seeds on the farm and decided to buy them in the hope of yielding a better crop, meeting the additional cost of those expenses himself. Brian knew of these changes being made by Patrick, and did not object to them. Life continued in this way on the farm, with Brian making similar statements to Patrick about the future of the farm and Patrick assuming ever greater responsibility for the farm work and the cost of running it. It was therefore with some considerable surprise and disappointment that Patrick learnt in the weeks after Brian's death that Brian's Will did not reflect this state of affairs and that there was in fact no reference to Patrick in it. He approaches you, asking if there is anything that he can do to secure an interest for himself in the farm. Advise Patrick, making reference to relevant case law.",
      },
      {
        examType: 'Essay',
        description:
          '"It is well established that the ordinary test of a fair case to be tried is not sufficient to meet the first leg of…',
        text: '"It is well established that the ordinary test of a fair case to be tried is not sufficient to meet the first leg of the test for the grant of an interlocutory injunction where the injunction sought is in effect mandatory. In such a case it is necessary for the applicant to show at least that he has a strong case that he is likely to succeed at the hearing of the action." per Fennelly J in Lingham v Health Services Executive [2006) ELR 137 at 140. Despite the above statement, there is still some uncertainty regarding the test to be applied in this jurisdiction in the context of mandatory interlocutory relief, as some judgments do appear to endorse the Campus Oil standards in this context. Consider the relevant Irish case law, showing in your answer evidence of the different approaches adopted by the Courts in relation to this test.',
      },
      {
        examType: 'Problem',
        description: 'Deirdre died recently, in contentious circumstances. Succession.',
        text: "Deirdre died recently, in contentious circumstances. She had been suffering from cancer which was, unfortunately, at a most advanced stage. She refused to go into hospital and was being cared for at home by a nurse and an attending doctor. Her close friends, Mary and Jane, moved in to the house to be with her around the clock. Approximately a fortnight before her death, Deirdre was told by the doctor that she had only about a month to live. Deirdre was in agony and not receiving comfort from the medication provided. Her only comfort was derived from her friends who were most attentive and spent their day by her bedside. One day, while her closest friend Jane was with her, Deirdre opened her bedside locker and presented her with a key to a box which was downstairs in the kitchen of the house and which contained her personal papers. Deirdre told Jane that the title deeds to an old house that she bought some years ago were in that box. Expressing her gratitude to Jane for her devoted friendship, Deirdre told Jane that she wished her to have the house. Some days later, Deirdre was in very considerable pain and asked Mary, who was by her side at the time, to assist her in her efforts to end her life. Mary resisted originally but, watching her friend's pain, eventually acceded to Deirdre's request. While cleaning out Deirdre's belongings some days ago, Jane came across a locked box. Using the key that Deirdre had given her, she opened the box and found the deeds to the house to which Deirdre had referred. Advise Jane as to her entitlement in relation to Deirdre's house. Students do not need to consider whether any possible issues arise pursuant to the Succession Act, 1965.",
      },
      {
        examType: 'Essay',
        description:
          'Ian, a businessman, owns a number of properties and a number of years ago, he transferred many of those properties into…',
        text: "Ian, a businessman, owns a number of properties and a number of years ago, he transferred many of those properties into the name of his nephew, Martin. He did this in order to protect those properties from the claims of his creditors. Martin was like a son to Ian, who did not have any children of his own. When Martin was a toddler, his parents died and Ian agreed that he would assume responsibility for the care of his nephew. He stuck to his word and he and Martin always had a great relationship. When Ian transferred the properties into Martin's name, Martin was twelve years of age. Since that time, Ian has discharged all of his debts to his former creditors, but the properties have remained in Martin's name. Recently, Ian had a new business idea which will require a considerable amount of collateral if it is to be put into effect. In order to get the funding from his bank for this proposed project, Ian must satisfy his bank manager that he is the beneficial owner of those properties. Unfortunately, when he mentions this to Martin, it puts a strain on their relationship as Martin, who has just finished his college, was hoping to sell some of those properties to fund the setting up of his own business. Martin is adamant that he is entitled to claim the legal ownership of the properties in question. Ian seeks your advice regarding the ownership of the properties. Support your answer with reference to relevant case law.",
      },
      {
        examType: 'Essay',
        description:
          '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its…',
        text: '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its traceable proceeds also, and his interest binds everyone who takes the property or its traceable proceeds except a bona fide purchaser for value without notice." Per Millett LJ in Foskett v McKeown, [2001] 1AC 102 at 127. Discuss, with reference to relevant case law, the principles applicable in relation to tracing in equity.',
      },
      {
        examType: 'Problem',
        description: 'In the recent High Court decision of Eugene F. Frustrat, Injunction.',
        text: "In the recent High Court decision of Eugene F. Collins v Gharion [2013] IEHC 316, Birmingham J endorsed the following extract from Courtney on Mareva Injunctions and Related Orders to the effect that: ''There must be a risk that the defendant will... dispose of [his assets] with the intention of defeating of his obligation to a plaintiff and frustrating the anticipated court order... Indeed, it can be said that a defendant's nefarious intention has become the raison d'etre of the Mareva injunction in Ireland.\" Indicate, with reference to relevant Irish case law, whether you agree with the statement in the above extract.",
      },
      {
        examType: 'Problem',
        description:
          'Eileen Hayes who died recently, lived a long and happy life surrounded by… Advise Brian as to who shall take the…',
        text: 'Eileen Hayes who died recently, lived a long and happy life surrounded by her very large group of friends and by her family in her home town of Ballysalmon, a town of some 10,000 inhabitants. She was very involved in all aspects of life in the town and was very well known and liked by most people in the town. In her later years, Eileen became most interested in the study of local history and that of her own family in particular. She was very proud of the fact that the land that she owned and on which her house was situate had been in the Hayes family for over 250 years. She died testate, survived by her husband. They did not have any children but Eileen was always very close to her four nephews and nieces, all of whom went by the surname Hayes. In her Will, Eileen appointed one of her nephews, Brian, as her Executor. She devised the fee simple in her land to her husband, John, for his own absolute use and benefit, "subject to my sincere wish" that he would not sell the land but would retain it for her four nephews and nieces. She also bequeathed the sum of €250,000 to Brian on trust for "those of my relatives and friends in the town of Ballysalmon as he shall choose". Finally, she nominated the Ballysalmon Historical Society as the beneficiary under her residuary clause. Advise Brian as to who shall take the benefit of the above devise and bequest. Support your answer by reference to relevant case law.',
      },
      {
        examType: 'Essay',
        description:
          'Write an essay on any [TWO]{.underline} of the following [THREE]{.underline} topics.',
        text: 'Write an essay on any [TWO]{.underline} of the following [THREE]{.underline} topics. All essays carry equal marks; (a) The Rule in Strong v Bird (1874) LR 18 Eq 315; (b) The Principles governing the distribution of surplus funds upon the dissolution of an unincorporated association; (c) Trusts for the relief of poverty.',
      },
      {
        examType: 'Problem',
        description:
          'Paul and John concluded an agreement in 2011 for the sale of land by Paul… Specific Performance.',
        text: "Paul and John concluded an agreement in 2011 for the sale of land by Paul to John for €500,000. Recently, when reviewing the paperwork recording the sale contract, John was shocked to discover that a particular site that he wished to acquire was not included in the sale. He contacted Paul about this and Paul was adamant that when they were negotiating the sale, that particular site of land was never included in their discussions. John is somewhat confused as he had assumed that the site in question was a core part of the deal. He therefore instituted proceedings seeking rectification. Paul is now counter-claiming for specific performance of the contract actually concluded between the parties. John is most distressed by this development as he fears that he will suffer huge financial loss if he is compelled to go through with the sale as it is. Although at the time of the contract, he had intended to develop all parts of the land, the on-going economic recession means that only the excluded site remains a viable option for development. John attends your office seeking advice. First of all, advise John on his prospects of success in relation to the rectification of the document recording the contract. John is wondering whether he can resist Paul's application for specific performance by relying upon the mistake on his part. Advise him in that regard and, finally, consider whether he can defend that application by relying upon the defences of hardship and impossibility. Support your answer with reference to relevant case law.",
      },
      {
        examType: 'Essay',
        description: 'In N.A.D.',
        text: 'In N.A.D. v. T.D. Barron J. stated:- "The constructive trust is imposed by operation of law independently of intention in order to satisfy the demands of justice and good conscience. Its imposition is dependent upon the conduct of the person upon whom the trust is imposed and prevents him from acting in breach of good faith. There is no fixed set of circumstances in which such a trust is imposed." In the recent judgment of Gilligan J in In Re Varko Ltd. in Liquidation [2012} IEHC 278, the Court noted that this "new model constructive trust" has met with limited approval in this jurisdiction. Discuss the case law of the Irish courts in which the new model constructive trust was considered.',
      },
      {
        examType: 'Problem',
        description: 'Jeremy, an uncle of Felicity and Abigail, died last year. Trustee, Company.',
        text: "Jeremy, an uncle of Felicity and Abigail, died last year. In his Will, he appointed Felicity and Abigail as his executrixes. The Will provided that the two women were to hold the family clothes store on trust for the benefit of his widow and their three youngest children. Felicity is very anxious to proceed with her duties as trustee and takes a very keen interest in the running of the store, scrutinising accounts and maintaining good contacts with the shop's suppliers. Abigail, however, is a successful businesswoman in her own right and adopts a more hands-off approach to the running of the store. She has not come to any of the meetings arranged by Felicity to discuss the future of the store but has expressed the view to Felicity that she does not think the store is a viable prospect in the long term and suggested that it ought to be sold and the monies invested in stocks and shares. Some months after Jeremy's death, Abigail opened up her own clothes shop on the street adjoining the above store, using contacts that she had obtained from her access to the records as forwarded to her by Felicity. As Abigail is selling goods at a discount, the trust store has begun to show a considerable decline in profit. Jeremy also bequeathed €100,000 to Felicity and Abigail on trust for his eldest child for life and thereafter to Jeremy's grandchild. The Will provided that the two trustees shall have an absolute discretion in relation to the investment of the monies. Felicity is a committed animal rights activist and decides, without discussing the matter with Abigail, to invest the monies in a fledgling cosmetics company that does not test its products on animals. Unfortunately Felicity, though well-intentioned, failed to research the potential for, and likelihood of, economic growth of these investments and the company performs very poorly, making considerable losses before going into liquidation. Advise the beneficiaries under the two trusts. Make reference, where appropriate, to relevant case law and statutory provisions.",
      },
      {
        examType: 'Problem',
        description:
          'In Allied Irish Banks v Diamond [2011] IEHC 505, Clarke J commented that;… Injunction.',
        text: "In Allied Irish Banks v Diamond [2011] IEHC 505, Clarke J commented that; ''It is now well settled that in cases involving a mandatory injunction the court will normally require a higher level of likelihood that the plaintiff has a good case before granting an interlocutory injunction (see for example Lingam v Health Service Executive (Unrep., Supreme Court, Fennelly J. 4th October, 2005). It may well be that the logic behind that departure from the normal rule can be found in the added risk of injustice that may arise where the court is asked not just to keep things as they were by means of a prohibitory injunction but to require someone to actively take a step which may, with the benefit of hindsight after a trial, turn out not to have been justified. The risk of injustice in the court taking such a step is obviously higher. In order to minimise the overall risk of injustice the court requires a higher level of likelihood about the strength of the plaintiff's case before being prepared to make such an order''. Discuss, making reference to relevant case law, the issues to which a court shall have regard when considering an application for a mandatory interlocutory injunction.",
      },
      {
        examType: 'Essay',
        description:
          'Answer (a) [and]{.underline} (b) (a) Richard died recently, having made a short will in which he provided that €100,000…',
        text: "Answer (a) [and]{.underline} (b) (a) Richard died recently, having made a short will in which he provided that €100,000 shall be held on trust for the maintenance of his brother George for his life, as George had no independent source of income. George, however, died very soon thereafter, and never used any of the monies bequeathed to him. Richard's will also provides that €50,000 shall be held on trust to fund the legal studies of his only nephew, Hugh. Hugh commenced his studies in law but hated it and neglected to attend any of the exams. He was given a limited number of opportunities to re-sit his exams but has now used up all of those options. Hugh is now precluded from pursuing further studies in law and €40,000 of the €50,000 assigned to fund those studies remains unused. Hugh is considering taking a break from it all and spending the unused funds on a backpacking trip around the world. Richard's will also provides that the Indigent Inn Keepers Association should enjoy the residue, if any, of his estate. The Secretary of the Association has become aware of the terms of Richard's will and seeks your advice as to the prospects of securing any of the above unused funds. [And]{.underline} (b) Discuss the law relating to the presumption of advancement.",
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2014,
    questions: [
      {
        examType: 'Problem',
        description:
          'In January 2010, James opened a joint deposit account in the names of… Advise Brian.',
        text: 'In January 2010, James opened a joint deposit account in the names of himself and his friend Brian and lodged the sum of 50,000 Euro in the account. Both James and Brian attended at the bank for the purpose of opening the account and the manager endorsed the deposit book as "payable to James only or survivor". James made a number of additional payments into the account in the period since it was opened but Brian never had any dealings with the account. James died last year and in his will dated June 2009, he left all of his property to another friend Harry. Brian was quite surprised and seeks your advices regarding his entitlement to the monies in the joint deposit account. James was not survived by any relatives. Advise Brian.',
      },
      {
        examType: 'Essay',
        description:
          'Answer (a) [and]{.underline} (b); (a) In Re Basham [1986] 1 WLR 1498, the Court noted that the expenditure of money by…',
        text: 'Answer (a) [and]{.underline} (b); (a) In Re Basham [1986] 1 WLR 1498, the Court noted that the expenditure of money by one person on another person\'s property was "not the only kind of detriment that gives rise to a proprietary estoppel". Discuss the above. [And]{.underline} (b) Consider the role which the concept of unconscionability plays in the modem doctrine of proprietary estoppel.',
      },
      {
        examType: 'Problem',
        description: 'David, a solicitor, recently suffered a fatal heart attack. Trustee.',
        text: "David, a solicitor, recently suffered a fatal heart attack. Some time prior to his death, he added to monies in his own current account by lodging funds from two other accounts. One of those accounts contained the monies from a trust of which he was a trustee, and the other contained the monies belonging to George, a client. Having mixed the said monies, he made numerous payments out of, and some lesser payments into, that current account. He also made certain payments from that account to the beneficiaries under the trust in accordance with the terms thereof. At the time of his death, there were insufficient funds to meet his personal debts and to meet George's claim and the claim of the beneficiaries under the trust. Advise George, making reference to relevant case law.",
      },
      {
        examType: 'Problem',
        description:
          '"The Mareva injunction is a very powerful remedy which if improperly… Injunction.',
        text: '"The Mareva injunction is a very powerful remedy which if improperly invoked will bring about an injustice, something that it was designed to prevent". per O\'Flaherty J in O\'Mahony v Horgan [1995] 2 IR 411 at 423 Consider how the Irish courts have sought to balance the rights of plaintiff and defendants in deciding whether to grant relief in the form of Mareva injunctions.',
      },
      {
        examType: 'Problem',
        description:
          'Barry, a bachelor who did not have any children, died recently at the age… Company.',
        text: "Barry, a bachelor who did not have any children, died recently at the age of 95. For the last four years of his life, he had lived in a nursing home for the elderly. He received few visitors and was very lonely for company. As time progressed in the nursing home, he became physically weaker and unable to do ordinary day-to-day tasks such as washing and feeding himself independently. His memory was poor intermittently and he forgot many things from his past. As a result his self-confidence diminished greatly and he sought assistance and guidance in most matters. While all of the staff tended to him, he began to rely more and more over time upon one particular care worker called Derek. Derek paid particular attention to the care of Barry, spending time chatting every day and reading from the newspaper for him. Derek always tended to Barry at mealtimes and helped to dress him in the mornings and to prepare him for bed. Barry was very grateful for Derek's company and help. He began to talk to Derek about his worries about what best to do with his house after he died. He had inherited that house from his own family and wanted to make sure that it went into the hands of somebody who would maintain it with loving care after he died. Derek suggested to Barry that he could transfer the house to him and assured him that he would maintain it to the highest of standards. Barry considered this and asked his solicitor to attend at the nursing home for the purpose of putting this proposal to him. Barry's solicitor first of all satisfied himself that Barry was capable of giving instructions at the time and then advised him strongly against the transfer to Derek. Nonetheless, Barry felt grateful to Derek for the care he had received and did not wish to offend him or lose his daily company, and thus transferred the property into Derek's name. After Barry's death, his old housekeeper Mary was cleaning out his house and found a Will which provides that Barry left all of his property to her. Mary now wishes to challenge the transfer to Derek. Advise Mary.",
      },
      {
        examType: 'Essay',
        description: 'Write a note on any [two]{.underline} of the following three topics.',
        text: 'Write a note on any [two]{.underline} of the following three topics. Refer, where appropriate, to relevant case law; . (a) The circumstances in which a trustee may be removed from his or her position; (b) The rule in Strong v Bird.',
      },
      {
        examType: 'Problem',
        description:
          'William approaches you asking who has the beneficial entitlement to the… Advise William.',
        text: 'William approaches you asking who has the beneficial entitlement to the holiday home. Advise William.',
      },
      {
        examType: 'Essay',
        description:
          '"I do not think that it should be assumed that as soon as any element of personal service or continuous services can be…',
        text: '"I do not think that it should be assumed that as soon as any element of personal service or continuous services can be discerned in a contract the court will, without more, refuse specific performance... As is so often the case in equity, the matter is one of balance of advantage and disadvantage in relation to the particular obligations in question; and the fact that the balance will usually lie on one side does not turn this probability into a rule." Per Megarry J in C.H. Giles and Co. V Morris [1972] 1 WLR 307 at 318. Consider how the courts have dealt with the specific performance of contracts for personal services.',
      },
      {
        examType: 'Problem',
        description:
          '"It is well established that the ordinary test of a fair case to be tried… Injunction.',
        text: '"It is well established that the ordinary test of a fair case to be tried is not sufficient to meet the first leg of the test for the grant of an interlocutory injunction where the injunction sought is in effect mandatory. In such a case it is necessary for the applicant to show at least that he has a strong case that he is likely to succeed at the hearing of the action." per Fennelly J in Lingham v Health Services Executive [2006] ELR 137 at 140. Despite the above statement, there is still some uncertainty regarding the test to be applied in this jurisdiction in the context of mandatory interlocutory relief, as some judgments appear to endorse the Campus Oil standards in this context. Consider the relevant Irish case law, showing in your answer evidence of the different approaches adopted by the Courts in relation to this test. Advise Brian.',
      },
      {
        examType: 'Essay',
        description: 'a Consider whether the above bequests constitute valid charitable trusts.',
        text: 'a Consider whether the above bequests constitute valid charitable trusts.',
      },
      {
        examType: 'Essay',
        description:
          '"A wife who has been induced to stand as a surety for her husband\'s debts by his undue influence, misrepresentation or…',
        text: "\"A wife who has been induced to stand as a surety for her husband's debts by his undue influence, misrepresentation or some other legal wrong has an equity against him to set aside that transaction. Under the ordinary principles of equity, her right to set aside that transaction will be enforceable against third parties (e.g. against a creditor) if either the husband was acting as the third party's agent or the third party had actual or constructive notice of the facts giving rise to her equity.\" per Lord Browne-Wilkinson in Barclay's Bank v 0 'Brien [1994] 1 AC 180 at 195. Answer (a) [and]{.underline} (b): (a) Consider whether the husband/wife relationship gives rise to any presumption of undue influence. [and]{.underline} (b) Discuss the circumstances in which a wife's right to rescind a transaction shall be enforceable against third parties. Consider the significance of the presence or absence of independent legal advice in this context.",
      },
      {
        examType: 'Essay',
        description:
          'Ian, a businessman, owns a number of properties and a number of years ago, he transferred many of those properties into…',
        text: "Ian, a businessman, owns a number of properties and a number of years ago, he transferred many of those properties into the name of his nephew, Martin. He did this in order to protect those properties from the claims of his creditors. Martin was like a son to Ian, who did not have any children of his own. When Martin was a toddler, his parents died and Ian agreed that he would assume responsibility for the care of his nephew. He stuck to his word and he and Martin always had a great relationship. When Ian transferred the properties into Martin's name, Martin was twelve years of age. Since that time, Ian has discharged all of his debts to his former creditors, but the properties have remained in Martin's name. Recently, Ian had a new business idea which will require a considerable amount of collateral if it is to be put into effect. In order to get the funding from his bank for this proposed project, Ian must satisfy his bank manager that he is the beneficial owner of those properties. Unfortunately, when he mentions this to Martin, it puts a strain on their relationship as Martin, who has just finished college, was hoping to sell some of those properties to fund the setting up of his own business. Martin is adamant that he is entitled to enjoy the beneficial ownership of the properties in question. Ian seeks your advice regarding the ownership of the properties.",
      },
      {
        examType: 'Essay',
        description:
          'Write an essay on the various defences to an application for specific performance.',
        text: 'Write an essay on the various defences to an application for specific performance.',
      },
      {
        examType: 'Essay',
        description: 'John, a bachelor, died suddenly last week.',
        text: "John, a bachelor, died suddenly last week. He died testate. John does not have any children, and is survived by three brothers. He was closest to Patrick, his youngest brother. Approximately six months ago, John told Patrick that he wished to transfer his leasehold interest in his shop to Patrick there and then, as he, John, wished to take life at an easier pace and enjoy himself while he was still in good health. John made it clear to Patrick that it was a gift which was to take effect immediately and was not to be postponed until his death. John did not, however, take any steps to complete the gift and no lease was executed in order to give effect thereto. The shop remained open and the staff previously employed by John ran the business until his death. Patrick did not take any part in running the shop before John's death and incurred no expenses in relation to same. John appointed Patrick as executor in his will. He devised his leasehold interest to his three brothers equally. Answer (a) [and]{.underline} (b): (a) Patrick asks you to clarify whether he may take the leasehold interest in the shop himself or whether he is obliged to share that interest with his two other brothers equally. [and]{.underline} (b) Indicate, giving reasons for your answer, whether your advices would be different if John's will was invalid and he therefore died intestate. Note that John's parents have pre-deceased him and his three brothers are his next of kin.",
      },
      {
        examType: 'Essay',
        description:
          'Write a note on any [two]{.underline} of the following [three]{.underline} topics.',
        text: "Write a note on any [two]{.underline} of the following [three]{.underline} topics. (a) Equity's approach to the rectification of mistakes by parties to an agreement; (b) The doctrine of satisfaction; (c) The standard of care which a trustee must employ when exercising the powers of investment in relation to trust property.",
      },
      {
        examType: 'Essay',
        description: 'Jane died last month.',
        text: "Jane died last month. She died testate. She was a widow and is survived by four children. Helen is the youngest of these four children. Helen qualified as a doctor and practised that profession for a number of years. Although she was doing very well, and had indeed been offered a prestigious promotion, Helen abandoned her job in order to help her mother, then recently widowed, develop the family businesses as property developers and construction engineers. Helen also lived at home with her mother and cared for her during bouts of illness on her mother's part. Approximately two years ago, Helen decided that she wished to buy a house for herself but when her mother, Jane, heard this, she became upset. Jane asked her to stay with her at home and asked \"why would you want to get yourself a house? Then you would have two houses as you know that this house and all I have is yours when I die.\" After that conversation with her mother, Helen decided not to buy herself a house but instead began an extensive redecoration of the family home on the basis that she would inherit it after her mother's death. No costs were incurred when redecorating due to the contacts she and her mother had in various construction and interior decorating businesses. Helen has now learnt, however, that Jane's will leaves her estate, which includes the family home and the property development and construction engineering businesses, to her four children in equal shares. She seeks your advice.",
      },
      {
        examType: 'Problem',
        description: 'John Smith died some months ago. Advise Mr.',
        text: "John Smith died some months ago. During his lifetime, John was an extremely successful and wealthy businessman who employed approximately 1,200 people. In his will, he has provided that a sum of €1,500,000 should be held by his Executor on trust for the benefit of those employees who fall on hard financial times. These funds are to be distributed at the discretion of the Executor. He also bequeathed a sum of €500,000 to a neighbouring seminary in order to secure the saying of masses for the repose of his soul in the Privacy of the seminary. Advise Mr. Smith's Executor about the nature and validity of these bequests. Students should consider the relevant case law and relevant statutory provisions, including the relevant provisions of the Charities Act 2009, in their answer.",
      },
      {
        examType: 'Essay',
        description:
          '"A gift is a gift, and, of course, if a donor, while expressing an intention to give something and taking certain steps…',
        text: '"A gift is a gift, and, of course, if a donor, while expressing an intention to give something and taking certain steps in the direction of giving it, has not gone the whole way, the expectant donee has no equity to compel the completion of the gift. It is good sense and good law." Per Johnston J in Re Wilsor [1933] IR 729 at 739. In light of the above statement, discuss what is required of a settler to ensure that a trust is completely constituted. Support your answer with relevant case law.',
      },
      {
        examType: 'Problem',
        description:
          'You have been approached by Tom, a businessman involved in providing… Advise Tom.',
        text: 'You have been approached by Tom, a businessman involved in providing tourist facilities in your local area, a popular seaside town. His main source of income stems from boat trips which he organises for tourists wishing to see the many dolphins based in the sea waters at the mouth of the town\'s bay. Many others in the area make their living in similar ways. Tom has learnt recently that Robert, a local man who used to make his living as a fisherman, plans to set up a fish farm to the left side of the bay. Having done some internet research into the issue, Tom is now aware that some people have concerns about the negative impact of fish farms on the neighbouring marine ecosystems. Of particular concern to him is the published postgraduate thesis of a marine biologist which argues that dolphins are particularly affected by the ecosystem changes brought about by fish farming and have been known, due to those changes, to leave the area in which the fish farm is based in search of new "homes". Tom is very worried as he fears that his main source of livelihood, and indeed that of others, may about to be destroyed if Robert\'s fish farm goes ahead. He is also genuinely concerned about the loss to the community if the dolphins leave the area as he considers that they enhance the natural environment greatly and are a source of great joy for the local children and adults alike. He asks you if there is anything that he can do to prevent the fish farm becoming operational. Advise Tom. Make reference in your answer to relevant case law. Students do not need to look at any planning law issues that may arise in this question.',
      },
      {
        examType: 'Essay',
        description: 'Answer any [two]{.underline} of the following three questions.',
        text: 'Answer any [two]{.underline} of the following three questions. Refer to case law, where appropriate; (a) The rule in Strong v Bird [1874] LR 18 Eq315; (b) The equitable remedy of rectification; (c) The presumption of advancement.',
      },
      {
        examType: 'Problem',
        description:
          'Deirdre Hayes who died recently, lived a long and happy life surrounded by… Advise Briar as to who shall take the…',
        text: 'Deirdre Hayes who died recently, lived a long and happy life surrounded by her very large group of friends and by her family in her hometown of Ballygrange, a town of some 10,000 inhabitants. She was very involved in all aspects of life in the town and was very well known and liked by most people in the town. In her later years, Deirdre became most interested in the study of local history and that of her own family in particular. She was very proud of the fact that the land that she owned and on which her house was situate had been in the Hayes family for over 250 years. She died testate, survived by her husband. They did not have any children but Deirdre was always very close to her 4 nephews and nieces, all of whom went by the surname Hayes. In her Will, Deirdre appointed one of her nephews, Brian, as her Executor. She devised the fee simple in her land to her husband, John, for his own absolute use and benefit, "subject to my sincere wish" that he would not sell the land but would retain it for her 4 nephews and nieces. She also bequeathed the sum of €250,000 to Brian on trust for "those of my relatives and friends in the town of Ballygrange as he shall choose". Finally, she nominated the Ballygrange Historical Society as the beneficiary under her residuary clause. Advise Briar as to who shall take the benefit of the above devise and bequest. Support your answer by reference to relevant case law.',
      },
      {
        examType: 'Problem',
        description:
          '"A stranger cannot be made liable for knowing assistance in a fraudulent… Trustee, Constructive Trust.',
        text: '"A stranger cannot be made liable for knowing assistance in a fraudulent breach of trust unless knowledge of the fraudulent design can be imputed to him." per Vinelott J in Eagle Trust pie. v SBC Securities Ltd [ 1992] 4 All ER 488 at 499. Discuss, with reference to relevant case law, the degree of knowledge of a breach of trust which a stranger to that trust must possess in order to be held liable as a constructive trustee for his or her "knowing assistance".',
      },
      {
        examType: 'Essay',
        description: 'You act for Gaelic Bank.',
        text: "You act for Gaelic Bank. Conscious of the turbulence in the banking sector in recent years, your client is reviewing its loans policies and procedures. The Bank is anxious to ensure that it is in a position to safeguard the monies that it lends. To that end, Gaelic Bank asks you to prepare guidelines regarding the matters that the Bank must attend to in order to ensure that it can enforce loan agreements entered into with customers when the spouse or partner of that customer has acted as guarantor of liabilities or has agreed to create a charge over assets in respect of the customer's liabilities. In drafting these guidelines for your client you should, where appropriate, refer to relevant case law to illustrate and clarify for your client the points that you are making.",
      },
      {
        examType: 'Problem',
        description:
          'David and Anne died recently, leaving four young children under the age of… Trustee.',
        text: 'David and Anne died recently, leaving four young children under the age of 10. They had made a joint Will in which they appointed Mary as trustee of a considerable sum of money to be used for the benefit of the children once they reach their majority. There are no specific provisions in the Will regulating the investment of the trust fund. Mary is anxious to preserve the value of the trust fund for the children until they reach their majority. Advise her in relation to both (a) [and]{.underline} (b) (a) The investments that she may lawfully make in order to preserve the trust fund; [AND]{.underline} (b)The standard of care which she must employ in exercising those powers of investment',
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2015,
    questions: [
      {
        examType: 'Problem',
        description:
          'Brian, a wealthy farmer, died recently. Advise Patrick, making reference to relevant case law.',
        text: "Brian, a wealthy farmer, died recently. He was a widower for some years prior to his death and died without issue. He died testate and in his Will bequeathed the fee simple in his sizeble farm to his beloved grandniece, Meabh. Brian had bouts of ill-health for many years prior to his death and would not have been able to run the farm but for the help of Patrick, his nephew, who did most of the heavy day-to-day work on the farm for the last fifteen years prior to Brian's death commencing in 1999. Patrick, now in his 30's, had not done well in school and left after he completed primary school. Soon afterwards, Patrick began to do bits and pieces of work on Brian's farm and gradually assumed responsibility for most tasks, especially as Brian's health deteriorated. Brian's health got more fragile as time progressed. Brian was a gruff man and Patrick was shy and reluctant to ask him for more than the 25 Euro a week pocket money that ·Brian gave him. Brian did not feel the need to give any n.ore to Patrick as the young man was living at home with his mother. By 2008, however, Patrick had spent ten years working on the farm and began to think about where his future lay. He started to think about the need to get a better education in order to get a better job in the future. When Brian heard of this plan, however, he dismissed as nonsense any need on Patrick's part to progress his education as \"he would always be working on the farm.\" This comment led Patrick to think that perhaps Brian was planning to leave the farm to him but he wasn't confident enough to pursue the topic further with Brian. With this hope in mind, Patrick abandoned the plan to go back to school and continued working on the farm. Seeking greater security about his financial position and, not being confident enough to address the issue of the future transfer of the farm to him, Patrick approached Brian for a salary which reflected the value of his labours. When he gathered the nerve to mention it to Brian, Brian refused to give him a proper wage on the basis that Patrick \"was working the farm for himself as it would be his.' after Brian was gone. This gave Patrick some comfort and he began. to see his future in terms of ownership of the farm. He decided to erect some new badly needed sheds and used what little money he had saved to pay for them. He also researched the possibility of using better quality seed on the farm and decided to buy some in the hope of yielding a better crop, meeting the additional cost of those expenses himself. Brian knew of these changes being made by Patrick, and did not object to them. Life continued in this way on the farm, with Brian making similar statements to Patrick about the future of the farm and Patrick assuming ever greater responsibility for the farm work and the cost of running it. It was therefore with some considerable surprise and disappointment that Patrick learnt in the weeks after Brian's death that Brian's Will did not reflect this state of affairs and that there was in fact no reference to Patrick in it. He approaches you, asking if there is anything that he can do to secure an interest for himself in the farm. Advise Patrick, making reference to relevant case law.",
      },
      {
        examType: 'Essay',
        description:
          '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its…',
        text: '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its traceable proceeds also, and his interest binds everyone who takes the property or its traceable proceeds except a bona fide purchaser for value without notice." per Millett LJ in Foskett v McKeown,[2001] 1 AC 102 at 127. Discuss, with reference to relevant case law, the principles applicable in relation to tracing in equity.',
      },
      {
        examType: 'Problem',
        description:
          'James, a solicitor, had been in a loving relationship for many years with… Advise Graham.',
        text: 'James, a solicitor, had been in a loving relationship for many years with Graham. While James wished to make provision for Graham in the event of his death, he did not wish to do so in a manner which would disclose the relationship on the face of his Will. Thus, when executing his Will some three years ago, he devised his leasehold interest in an apartment "to Jack and Angela as tenants in common on the understanding that they will use it for the purpose as disclosed by me to them." Some weeks later, James in the course of a conversation with his friend Jack, said to Jack that "I am only leaving that apartment to Angela and yourself on the understanding that you will hold it for Graham\'s benefit." Jack assured James that he would comply with his wishes but failed to ever mention the matter to Angela. James died some weeks ago. Angela is now claiming entitlement to half the apartment. Advise Graham.',
      },
      {
        examType: 'Essay',
        description:
          '"I do not think that it should be assumed that as soon as any element of personal service or continuous services can be…',
        text: '"I do not think that it should be assumed that as soon as any element of personal service or continuous services can be discerned in a contract the court will, without more, refuse specific performance . . . . As is so often the case in equity, the matter is one of balance of advantage and disadvantage in relation to the particular obligations in question; and the fact that the balance will usually lie on one side does not turn this probability into a rule." Per Megarry J in C.H. Giles and Co. v Morris [1972]1 WLR 307 at 318. Consider how the courts have dealt with the specific performance of contracts for personal services. Support your answer by reference to relevant case law.',
      },
      {
        examType: 'Problem',
        description: 'Gráinne died recently in contentious circumstances. Succession.',
        text: "Gráinne died recently in contentious circumstances. She had - been suffering from cancer which was, unfortunately, at a most advanced stage. She refused to go into hospital and was being cared for at home by a nurse and an attending doctor. Her close friends, Mary and Jane, moved in to the house to be with her around the clock. Approximately a fortnight before her death, Gráinne's doctor told her that she had only about a month to live. Gráinne was in very severe pain and not receiving comfort from the medication provided. Her only comfort was derived from her friends who were most attentive and spent their day by her bedside. One day, while her closest friend Jane was with her, Gráinne opened her bedside locker and presented Jane with a key to a box which was downstairs in the kitchen of the house and which contained her personal papers. Gráinne told Jane that the title deeds to an old house that she bought some years ago were in that box. Expressing her gratitude to Jane for her devoted friendship, Gráinne told Jane that she wished for her to have the house. Some days later, Gráinne was in acute pain and asked Mary, who was by her side at the time, to assist her in her efforts to end her life. Mary resisted originally but, watching her friend's pain, eventually acceded to Gráinne's request. While cleaning out Gráinne's belongings some days ago, Jane came across a locked box. Using the key that Gráinne had given her, she opened the box and found the deeds to the house to which Gráinne had referred. Advise Jane as to her entitlement in relation to Gráinne's house. Students do not need to consider whether any possible issues arise pursuant to the Succession Act, 1965.",
      },
      {
        examType: 'Problem',
        description:
          'In recent years, the Irish courts have begun to adopt a less restrictive… Damages, Injunction.',
        text: 'In recent years, the Irish courts have begun to adopt a less restrictive approach to the requirement that a plaintiff seeking a mareva injunction must show that there is a real risk that the defendant will dispose of his or her assets for the purpose of preventing the plaintiff from recovering damages. This approach will help plaintiffs striving to recover large debts from debtors, making mareva injunctions a very real and powerful tool in debt recovery litigation. Discuss the above statement, supporting your answer with reference to relevant case law.',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any [two]{.underline} of the following three topics.',
        text: 'Write a note on any [two]{.underline} of the following three topics. Refer to case law, where relevant. (iv) The exceptional categories in which non-charitable purpose trusts may be enforced. (v) The position under both the common law and the Charities Act, 2009 regarding valid gifts for the relief of poverty. (vi) The doctrine of satisfaction.',
      },
      {
        examType: 'Essay',
        description:
          'Ian, a businessman, owns a number of properties and a number of years ago, he transferred many of those properties into…',
        text: "Ian, a businessman, owns a number of properties and a number of years ago, he transferred many of those properties into the name of his nephew, Martin. He did this in order to protect those properties from the claims of his creditors . Martin was like a son to Ian, who did not have any children of his own. When Martin was a toddler, his parents died and Ian agreed that he would assume responsibility for the care of his nephew. He stuck to his word and he and Martin always had a great relationship. When Ian transferred the properties into Martin's name, Martin was twelve years of age. Since that time, Ian has discharged all of his debts to his former creditors, but the properties have remained in Martin's name. Recently, Ian had a new business idea which will require a considerable amount of collateral if it is to be put into effect. In order to get the funding from his bank for this proposed project, Ian must satisfy his bank manager that he is the beneficial owner of those properties. Unfortunately, when he mentions this to Martin, it puts a strain on their relationship as Martin, who has just finished college, was hoping to sell some of those properties to fund the setting up of his own business. Martin is adamant that he is entitled to claim the legal ownership of the properties in question. Ian seeks your advice regarding the ownership of the properties. Support your answer with reference to relevant case law",
      },
      {
        examType: 'Essay',
        description:
          "'It is an inflexible rule of a Court of Equity that a person in a fiduciary position...",
        text: "'It is an inflexible rule of a Court of Equity that a person in a fiduciary position... is not, unless otherwise expressly provided, entitled to make a profit; he is not allowed to put himself in a position where his interest and his duty conflict.' Lord Herschell in Bray v Ford (1896) AC 44 at 51. Consider, making reference to relevant case law, whether the above statement accurately represents the position with regard to trustees' duties.",
      },
      {
        examType: 'Essay',
        description:
          '"It is well established that the ordinary test of a fair case to be tried is not sufficient to meet the first leg of…',
        text: '"It is well established that the ordinary test of a fair case to be tried is not sufficient to meet the first leg of the test for the grant of an interlocutory injunction where the injunction sought is in effect mandatory. In such a case it is necessary for the applicant to show at least that he has a strong case that he is likely to succeed at the hearing of the action." per Fennelly J in Lingham v Health Services Executive [2006) ELR 137 at 140. Despite the above statement, there is still some uncertainty regarding the test to be applied in this jurisdiction in the context of mandatory interlocutory relief, as some judgments do appear to endorse the Campus Oil standards in this context. Consider the relevant Irish case law, showing in your answer evidence of the different approaches adopted by the Courts in relation to this test.',
      },
      {
        examType: 'Essay',
        description:
          'Sean, who died recently, was a life-long member of the Irish Athletic Association, an organisation dedicated to the…',
        text: "Sean, who died recently, was a life-long member of the Irish Athletic Association, an organisation dedicated to the promotion of certain amateur sports. He devoted much of his free time to the activities of the organisation, both as a player and official, for many years of his long life. His love of sport and of the Association are reflected in a number of legacies in his Will which are bequeathed to his executor on trust for a number of distinct purposes. In the first bequest, Sean has directed that the sum of €2,000,000 ought to be used by the executor in such manner as he sees fit to promote the playing. of football in rural communities. In the second bequest, Sean directed that the sum of €1,000,000 ought to be used by the executor to ensure the provision of playing fields in Sean's home town. Finally, he has bequeathed the sum of €100,000 to his executor for the purpose of organising a campaign to promote the introduction of legislation criminalising certain conduct on the · playing pitch, such as remonstrating with referees. Consider whether the above bequests constitute valid charitable trusts. Support your answer by reference to relevant case law and statutory provisions.",
      },
      {
        examType: 'Essay',
        description: '"It seems to me that the academic criticism of Ulster Bank Ltd.',
        text: '"It seems to me that the academic criticism of Ulster Bank Ltd. v Fitzgerald is well founded. A regime which places no obligation on a bank to take any steps to ascertain whether, in the presence of circumstances suggesting a non-commercial aspect to a guarantee, the party offering the guarantee may not be freely and fully entering into same, gives insufficient protection to potentially vulnerable sureties. While not necessarily accepting that the precise parameters, identified in Etridge, are those which give rise to an obligation on the bank to inquire, and thus represent the law in this jurisdiction, I am satisfied that the general principle, which underlies Elridge, is to the effect that a bank is placed on inquiry where it is aware of facts which suggest, or ought to suggest, that there may be a non-commercial element to a guarantee." Per Clarke J in Ulster Bank Ltd. v Roche and Buttimer ([2012] /EHC 166) Discuss the nature of a bank\'s obligation to conduct inquiries into whether or not, in a "non­ commercial" context, a party giving a guarantee is entering into same under the undue influence of another. Support your answer by reference to relevant case law.',
      },
      {
        examType: 'Problem',
        description:
          'Discuss, with reference to relevant case law, the degree of knowledge of a… Trustee, Constructive Trust.',
        text: 'Discuss, with reference to relevant case law, the degree of knowledge of a breach of trust which a stranger to that trust must possess in order to be held liable as a constructive trustee for his or her "knowing assistance."',
      },
      {
        examType: 'Essay',
        description:
          'Answer (a) [and]{.underline} (b) a) Richard died recently, having made a short will in which he provided that €100,000…',
        text: "Answer (a) [and]{.underline} (b) a) Richard died recently, having made a short will in which he provided that €100,000 shall be held on trust for the maintenance of his brother George for his life, as George had no independent source of income. George, however, died very soon thereafter, and never used any of the monies bequeathed to him. Richard's will also provides that €50,000 shall be held on trust to fund the legal studies of his only nephew, Hugh. Hugh commenced his studies in law but hated it and neglected to attend any of the exams'. He was given a limited number of opportunities to re·-sit his exams but has now used up all of those options. Hugh is now precluded from pursuing further studies in law and €40,000 of the €50,000 as·signed to fund those · studies remains unused. Hugh is considering taking a break from it all and spending the unused funds on a backpacking trip around the world. Richard's will also provides that the Indigent Inn Keepers Association should enjoy the residue, if any, of his estate. The Secretary of the Association has become aware of the terms of Richard's will and seeks your advice as to the prospects of securing any of the above unused funds. b) Discuss the law relating to the presumption of advancement.",
      },
      {
        examType: 'Essay',
        description:
          'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" and one of…',
        text: 'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" and one of the other two "certainties" which must be deemed to exist in order to ensure the creation of a valid express trust. (12 marks will be allocated for that part of the question dealing with certainty of objects and 8 marks for that part dealing with the other certainty as chosen by a student.)',
      },
      {
        examType: 'Essay',
        description:
          'Write a note on any [two]{.underline} or the following three topics · (a) The equitable doctrine of satisfaction; (b)…',
        text: 'Write a note on any [two]{.underline} or the following three topics · (a) The equitable doctrine of satisfaction; (b) Quistclose Trusts; (c) The continued relevance in modern law of any four equitable maxims.',
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2016,
    questions: [
      {
        examType: 'Problem',
        description:
          'Last year, John and Brian reached an agreement to the effect that John… Specific Performance.',
        text: "Last year, John and Brian reached an agreement to the effect that John would sell his interest in a parcel of land to Brian for €300,000. While it was John's intention to exclude one particularly valuable site from the deal, he never communicated this to Brian and that site was included in the contract when their agreement was recorded in writing. Subsequently, John realised the mistake and sought rectification of the contract to exclude this valuable site. Brian wishes to secure the entirety of the lands and so has counterclaimed for specific performance of the contract. John has argued in his defence to the counterclaim that the contract ought not to be specifically performed because of the mistake regarding the inclusion of the valuable site. He has also argued that, as land prices have increased significantly in the past year, it would impose an unfair and unnecessary hardship upon him if specific performance of the contract was granted. Advise John about his prospects of obtaining rectification of the contract. Advise Brian about the likely response of the Court to his counterclaim for specific performance and of John's potential defences to it.",
      },
      {
        examType: 'Essay',
        description:
          'The Mareva injunction is a very powerful remedy which if improperly invoked will bring about an injustice, something…',
        text: "The Mareva injunction is a very powerful remedy which if improperly invoked will bring about an injustice, something that it was designed to prevent.\" Per O'Flaherty J in O'Mahony v Horgan [1995] 2 IR 411 at 423 Discuss how the Courts have endeavoured to balance the rights of plaintiffs and defendants when faced with an application for a mareva injunction. Make reference in your answer to relevant case law.",
      },
      {
        examType: 'Problem',
        description:
          'Anna, Bridget and Clara are the trustees of a trust established by a… Trustee, Company.',
        text: 'Anna, Bridget and Clara are the trustees of a trust established by a testator for the benefit of his niece, Deirdre. At the time that the trust came into operation in 2009, the trust assets comprised a house and a sum of €50,000 in cash. The Will states that the trustees shall have full power to invest the trust assets "in such a manner as they in their absolute discretion see fit." It also provides for the payment of monies to Deirdre for her maintenance every year until she reaches the age of 18. Anna has never taken any active part in the management of the trust and has told the other two trustees on numerous occasions that she has no interest in its affairs. In 2009, the other two trustees put a caretaker into possession of the house, which was then worth about €150,000. While the caretaker has ensured that all essential maintenance was carried out on the house, the trustees have never taken any steps to rent out the house in those intervening years. Bridget and Clara decided to invest the monies in a number of speculative pharmaceutical company ventures which have sustained substantial financial losses. By the beginning of 2016, the house has almost doubled in value from its 2009 recessionary value of €150,000 but the other trust assets left are now only worth approximately €1,000. Deirdre, who has just turned 18, seeks your advice about whether a court is likely to find any or all of the trustees have acted in breach of trust. Advise her also on the remedies that she may obtain, should a court find a breach of trust. Refer in your answer to relevant case law.',
      },
      {
        examType: 'Essay',
        description:
          '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its…',
        text: '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its traceable proceeds also, and his interest binds everyone who takes the property or its traceable proceeds except a bona fide purchaser for value without notice." per Millett LJ in Foskett v McKeown, [2001] 1 AC 102 at 127. Discuss, with reference to relevant case law, the principles applicable in relation to tracing in equity.',
      },
      {
        examType: 'Problem',
        description:
          'Mary died recently in December 2015 at the age of 85. Advise the Donkey Sanctuary.',
        text: 'Mary died recently in December 2015 at the age of 85. She was unmarried and died without issue. She was well known throughout her life for her love of animals and in her Will left all of her property to The Donkey Sanctuary. In October 2015 her niece, Noelle, who lives in London, visited her on a trip home to Dublin, as she knew that Mary had suffered a severe bout of pneumonia the preceding month. Noelle found Mary in poor health, bed-ridden and coughing very badly. Noelle suggested that she would bring Mary to the doctor but Mary refused to go, saying she had been to all manner of doctors in the past year and there was nothing they could do, that she knew herself that she was getting weaker and weaker. Noelle spent the day with Mary and as evening approached, she gathered her things in order to leave, saying that she would come back and visit Mary when she was next back in Dublin at Christmas time. At that point, Mary told Noelle that she did not expect to live much longer and might not be alive at Christmas. She then asked Noelle to go to the sideboard in the dining room and bring her up the bundle of documents kept inside. Noelle did as she was asked. Mary feebly rooted through them and, having found the documents that she was looking for, handed them to Noelle. Mary then said to Noelle "here are the deeds of this house, this will be yours when I am gone". Noelle became quite emotional and could not discuss the matter further. She did, however, take the documents with her upon leaving the house. Noelle is now claiming that the house is hers. Advise the Donkey Sanctuary. Make reference in your answer, to relevant case law.',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any [two]{.underline} of the following three topics.',
        text: 'Write a note on any [two]{.underline} of the following three topics. Refer to case law, where relevant. (i) The doctrine of election (ii) Those exceptional categories of case in which non-charitable purpose trusts will be enforced (iii) The rule in Strong v Bird (1874) LR 18 Eq 315',
      },
      {
        examType: 'Problem',
        description:
          'Answer Part (a) [AND]{.underline} Part (b). Advise Derek, making reference to relevant case law.',
        text: 'Answer Part (a) [AND]{.underline} Part (b). Both parts carry equal marks. (a) In 2010, William Byrne opened a joint deposit account in his name and that of his younger brother Derek. He lodged the sum of €100,000 in the account at the time. Derek travelled a considerable distance to the bank to open the account with William. The deposit book was signed by both William and Derek, and the manager endorsed the book "payable to William Byrne only or survivor". Subsequently, William made a number of further lodgements but Derek had no dealings with the account. William died last year without issue and in his Will, dated 2009, he left all his property to his other brother Fred. Derek was most surprised when he learnt of the contents of the Will as he claims that he is entitled to whatever monies were in the joint deposit account at the time of William\'s death. Advise Derek, making reference to relevant case law. AND (b) Discuss, making reference to relevant case law, the circumstances in which a presumption of advancement between father and child may be rebutted.',
      },
      {
        examType: 'Essay',
        description:
          'The [cy-près doctrine]{.mark} is applied; "where the method indicated by the donor of carrying out his charitable…',
        text: 'The [cy-près doctrine]{.mark} is applied; "where the method indicated by the donor of carrying out his charitable intentions becomes impracticable, or his intentions cannot be executed literally, most frequently owing to altered circumstances." Per Budd J. in Re Royal Kilmainham Hospital [1966] I.R. 451 at 469. Discuss the circumstances in which the [cy-près doctrine]{.mark} is invoked, referring both to initial and subsequent failures of charitable purposes. Refer to relevant case law and statutory provisions.',
      },
      {
        examType: 'Essay',
        description:
          'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" and one of…',
        text: 'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" and one of the other two "certainties" which must be deemed to exist in order to ensure the creation of a valid express trust. (60 marks will be allocated for that part of the question dealing with certainty of objects and 40 marks for that part dealing with the other certainty as chosen by a student.)',
      },
      {
        examType: 'Problem',
        description:
          'Brian, a wealthy farmer, died recently. Advise Dermot, making reference to relevant case law.',
        text: 'Brian, a wealthy farmer, died recently. He was a bachelor and died without issue. He died intestate and his next of kin wish to administer his estate in the normal way. However, you have been approached by Dermot who claims that he is entitled to the farm of the deceased. Brian was 75 when he died, and for over 30 years had worked the farm with the help of Dermot who began to help out at weekends as a young boy of 10. Although Dermot was bright at primary school, he did not progress to secondary school but instead began to work full time on the farm. He usually worked seven days a week and well into the evening, working considerably more hours than would be expected of a farm labourer. He was not paid a regular salary but received his meals and, on occasion once he reached adulthood, Brian would give him a few pounds to go into town and have a night out. Demot got married at age 27 and he and his wife put their names on the local council housing list in the hope of getting a home of their own; in the meantime they lived with Dermot\'s in-laws just down the road from Brian\'s farm. After some four years on the list, they were offered a house about 40 miles away and while Dermot and his wife were delighted at the prospect of a home of their own, Brian feared that if they moved that far away, Dermot would get a farming job closer to his new home and so he repeatedly pleaded with Dermot and his wife not to accept the county council\'s offer. He led them to understand that if they did not do so, but remained living where they were, they would ^U^have their own home on this farm when he was gone." Much to the disappointment of his wife and children, Dermot agreed to forego the offer of the council house. During the Celtic tiger years, Dermot approached Brian, saying that he no longer wished to work full-time on the farm as he wished to do as many of his friends were doing and take up construction work, where considerable eamings could be made. When he said this, Brian responded by saying words to the effect that "remember, this will be yours after my day." Dermot understood this to mean that he would inherit the farm if he continued working on the farm as he always had. As the years progressed, Dermot noticed that Brian would increasingly refer to ^c^our cattle" and "our fields". As he aged, Brian let most of the heavier farming tasks to Dermot and Dermot also did some construction work on the farm and made general improvements to it. Since Brian\'s death, Dermot has discussed his claim to the farm with Brian\'s next-of-kin but they do not accept that he is entitled to any interest in the farm. Advise Dermot, making reference to relevant case law.',
      },
      {
        examType: 'Essay',
        description:
          'In Re Varko Ltd in Liquidation [20121 IEHC 278, Gilligan J expressed the view that the ^u^new model constructive trust"…',
        text: 'In Re Varko Ltd in Liquidation [20121 IEHC 278, Gilligan J expressed the view that the ^u^new model constructive trust" has met with limited approval in this jurisdiction. Consider, making reference to relevant case law, the use made by the Irish courts of the new model constructive trust.',
      },
      {
        examType: 'Problem',
        description: 'During his lifetime, Derek was an extremely successful and wealthy…',
        text: "Derek died some months ago. During his lifetime, Derek was an extremely successful and wealthy businessman who employed approximately 1,200 people. In his will, he has provided that a sum of €1million should be held by his Executor on trust for the benefit of those employees who fall on hard financial times. These funds are to be distributed at the discretion of the Executor. He also bequeathed a sum of €500,000 to a neighbouring seminary in order to secure the saying of masses for the repose of his soul in the privacy of the seminary. Advise Derek's Executor about the nature and validity of these bequests. Students should consider the relevant case law and relevant statutory provisions, including the provisions of the Charities Act, 2009 in their answer.",
      },
      {
        examType: 'Essay',
        description:
          '"l do not think that it should be assumed that as soon as any element of personal service or continuous services can be…',
        text: '"l do not think that it should be assumed that as soon as any element of personal service or continuous services can be discerned in a contract the court will, without more, refuse specific performance...... As is so often the case in equity, the matter is one of balance of advantage and disadvantage in relation to the particular obligations in question; and the fact that the balance will usually lie on one side does not tum this probability into a rule." Per Megarry J in C.H. Giles and Co. v Moms [1972] 11 WLR 307 at 318. Consider how the courts have dealt with the specific performance of contracts for personal services. Support your answer by reference to relevant case law.',
      },
      {
        examType: 'Essay',
        description:
          'Over 10 years ago, Mary built a retreat centre in a remote location in Connemara.',
        text: 'Over 10 years ago, Mary built a retreat centre in a remote location in Connemara. Visitors to her centre spend a week or so doing yoga and meditation and it has acquired a considerable reputation as a place of refuge for tired urban dwellers seeking to spend time in silent contemplation. Much of the time, her clients meditate outdoors, making use of the surrounding natural beauty and silence. The business has done extremely well during that time but recently Mary has received promotional fliers through her door announcing that a television production company will commence filming on a site adjoining her centre in the next few weeks. Over a period of the next five months, they will be shooting a new TV series "Army Families^"^ in which families will volunteer to be trained by army personnel in the hope of passing stringent tests set for them by the army personnel. The fliers state that the filming will take place outdoors and offers interested persons a small fee if they attend at the T/ site during filming, "to enjoy the noisy fun of hearing the army men bark their orders and to scream your support for our volunteer families". Mary is very fearful about the possible impact of this filming upon her business, as she is approaching the busiest season for visitors to her centre. She is extremely concerned that it will impact upon her ability to earn a livelihood but is also concerned about the overall impact of this proposal upon the peaceful and settled life of the local community, which comprises mostly elderly people. She seeks your advice about whether or not she can stop the filming going ahead.',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any [two]{.underline} of the following three topics.',
        text: "Write a note on any [two]{.underline} of the following three topics. All questions carry equal marks. (a) The doctrine of satisfaction; (b) The standard of care which a trustee must employ when exercising the powers of investment in relation to trust property; (c) Equity's approach to the rectification of unilateral mistakes by parties to an agreement.",
      },
      {
        examType: 'Problem',
        description: 'Last year, Jimmy and Michael married. Company, Shareholder.',
        text: 'Last year, Jimmy and Michael married. Jimmy has always been the stronger personality in the relationship and Michael is inclined to follow his lead without question. This is particularly the case in relation to all matters financial and Jimmy makes all decisions of a monetary nature which have a bearing on them. Jimmy is a businessman and for the past number of years, he has run a computer sales business, Laptop Ltd., of which he is the major shareholder. Michael works as a salesman for this company on a part-time basis. While the business was very successful initially, the recession has hit Laptop Ltd. badly and its profits have declined considerably in the past Ovo years. Jimmy is convinced that the company can survive, however, if it gets a cash injection of 50,000 Euro. He approached Michael proposing that they should together execute a charge over their home in favour of Hasty Banks in order to obtain a loan for Laptop Ltd. Michael has little grasp of such matters but was somewhat anxious about this suggestion. Jimmy, convinced that this loan represents Laptop Ltd\'s only chance for financial security, was dismayed at his partner\'s reluctance to do as he wished and, over a period of weeks, persistently brought up the topic until eventually Michael agreed to go into Hasty Banks and do as Jimmy wished. Jimmy immediately rang Deirdre, bank manager at Hasty Banks, who has been a close friend of the men for many years, to make an arrangement to meet to discuss this mater. Michael attended the bank with Jimmy and, in discussion with Deirdre, told her that, he did "not feet sure" about the proposal, but added that he supposed that he had no choice as the company could not continue to function without the loan. While Jimmy was out getting a coffee, Deirdre told Michael that he could seek legal advice about this matter and stated that a solicitor would explain the repercussions to him of executing the charge. She suggested to Michael that he might go down the road to see Bridget, a solicitor, and Michael agreed that he would do so. The following week, Jimmy and Michael came back into the bank and signed the necessary documents to execute the charge. Deirdre did not check whether Michael had ever gone to see Bridget for legal advice. In fact, Michael never did so, as he decided to leave such matters to Jimmy. Laptop Ltd. has defaulted on the loan repayments for the past ten months. Hasty Banks wishes to enforce the charge. Advise Deirdre accordingly, making reference in your advice to relevant case law. Students do not need to consider the application of the Marriage Act, 2015 for the purposes of this answer.',
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2017,
    questions: [
      {
        examType: 'Essay',
        description:
          'David, a businessman, owns number of properties and a number of years ago, he transferred many of those properties into…',
        text: "David, a businessman, owns number of properties and a number of years ago, he transferred many of those properties into the name of his niece, Clare. He did this in order to protect those properties from the claims of his creditors. Clare was like a daughter to David, who did not have any children of his own. When Clare was a toddler, her parents were killed in a car crash and David agreed that he would assume responsibility for the care of his niece. He stuck to his word and he and Clare always had a great relationship. When David transferred the properties into Clare's name, she was twelve years of age. Since that time, David has discharged all of his debts to his former creditors, the properties have remained in Clare's name. Recently, David had new business idea which require a considerable amount of collateral if it is to be put into effect. In order to get the funding from his bank for this proposed project, he must satisfy his bank manager that he is the beneficial owner of those properties. Unfortunately, when he mentions this to Clare, it puts something of a stain on their relationship as Clare, who has just finished college, was hoping to sell some of those properties to fund the setting up of her own business. Clare is insistent that she is entitled to claim the legal ownership of the properties in question. David seeks your advice regarding the ownership oi the properties. Support your answer with reference to relevant case law.",
      },
      {
        examType: 'Essay',
        description:
          'In Royal Bank of Scotland v Etridge (No.2) [2001] UKHL 44, the House of Lords endorsed the view that "Whenever a wife…',
        text: 'In Royal Bank of Scotland v Etridge (No.2) [2001] UKHL 44, the House of Lords endorsed the view that "Whenever a wife offers to stand surety for the indebtedness of her husband or his business, or a company in which they both had some shareholding, the lender [is] put on inquiry and [is] obliged to take reasonable steps to satisfy itself that she had understood and freely entered into the transaction". Consider the extent to which this statement accurately reflects the position adopted by the Irish courts.',
      },
      {
        examType: 'Problem',
        description:
          'In recent years, the Irish courts have begun to adopt a less restrictive… Damages, Injunction.',
        text: 'In recent years, the Irish courts have begun to adopt a less restrictive approach to the requirement that a plaintiff seeking a mareva injunction must show that there is a real risk that the defendant wili dispose of his or her assets for the purpose of preventing the plaintiff from recovering damages. This approach will help plaintiffs striving to recover large debts from debtors, making mareva injunctions a very real and powerful tool in debt recovery litigation. Discuss the above statement, supporting your answer with reference to relevant case law.',
      },
      {
        examType: 'Problem',
        description: 'James, a widower, owned a large house. Succession.',
        text: "James, a widower, owned a large house. He wrote his will in 2007 and in it bequeathed that house to his son John. In discussions with John around the year 2010. James mentioned to him that the house would be his after his death. John was delighted with this news, as he was out of work and struggling financially. He had placed his name on the local authority housing list come years previously but, on the strength of his father's assurance about the house, he went into the local authority's offices in 2011 and took his name off the housing list. In or about 2014, however, James and John had a blazing row and were no longer on speaking terms. In anger, James had changed the terms of his will in 2015 and left the house to John's sister, Karen. James died last month. Advise John, making reference to relevant case law. Students do not need to consider whether any possible issues arise pursuant to the Succession Act, 1965.",
      },
      {
        examType: 'Essay',
        description:
          'The cy-prés doctrine is applied; "where the method indicated by the donor of carrying out his charitable intentions…',
        text: 'The cy-prés doctrine is applied; "where the method indicated by the donor of carrying out his charitable intentions becomes impracticable, or his intentions cannot be executed literally, most frequently owing to altered circumstances." Per Budd J. in Re Royal Kilmainham Hospital [1966] IR. 451 at 469. Discuss the circumstances in which the cy-prés doctrine is invoked, referring both to initial and subsequent failures of charitable purposes. Refer to relevant case law and statutory provisions.',
      },
      {
        examType: 'Essay',
        description:
          "'It is an inflexible rule of a Court of Equity that a person in a fiduciary position...",
        text: "'It is an inflexible rule of a Court of Equity that a person in a fiduciary position... is not, unless otherwise expressly provided, entitled to make a profit; he is not allowed to put himself in a position where his interest and his duty conflict.' Lord Herschell in Bray v Ford (1896) AC 44 at 51. Consider, making reference to relevant case law, whether the above statement accurately represents the position with regard to trustees' duties.",
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: 'Write a note on any two of the following three topics. Refer to case law, where relevant. (i) The continued relevance of any four equitable maxims (ii) The rule in Hastings-Bass (1975) Ch 25 (iii) The rule in Strong v Bird (1874) LR 18 Eq 315',
      },
      {
        examType: 'Problem',
        description: 'Betty died recently, in contentious circumstances. Succession.',
        text: "Betty died recently, in contentious circumstances. She had been suffering from cancer which was, unfortunately, at a most advanced stage. She refused to go into hospital and was being cared for at home by a nurse and an attending doctor. Her close friends, Matthew and Jane, moved in to the house to be with her around the clock. Approximately a fortnight before her death, Betty was told by the doctor that she had only about a month to Jive. Betty was in agony and not receiving comfort from the medication provided. Her only comfort was derived from her friends who were most attentive and spent their day by her bedside. One day, while her closest friend Jane was with her, Betty opened her bedside locker and presented her with a key to a box which was downstairs in the kitchen of the house and which contained her personal papers. Betty told Jane that the title deeds to an old house that she bought some years ago were in that box. Expressing her gratitude to Jane for her devoted friendship, Betty told Jane that she wished her to have the house. Some days later, Betty was in very considerable pain and asked Matthew, who was by her side at the time, to assist her in her efforts to end her life by bringing in all of the medication in the house to her. Matthew resisted originally but, watching his friend's pain, eventually acceded to Betty's request, and Betty took an overdose of tablets While cleaning out Betty's belongings some days ago, Jane came across a locked box. Using the key that Betty had given her, she opened the box and found the deeds to the house to which Betty had referred. Advise Jane as to her entitlement in relation to Betty's house. Students do not need to consider whether any possible issues arise pursuant to the Succession Act, 1965.",
      },
      {
        examType: 'Problem',
        description:
          'He never married or had children but he had, for many years, been having a… Advise Amy and James as to their…',
        text: 'Derek O\'Donnell died recently. He never married or had children but he had, for many years, been having a secret relationship with a much younger woman named Amy and was anxious to ensure that she would be provided for in the event of his death. In his Will, executed in 2014, he bequeathed his house "to his sister Teresa absolutely, she knowing full well what my intention is in relation to same". Some weeks after executing the Will, Derek met Teresa and informed her of his intentions in relation to the house, Teresa assured him that she would do as he wished. Also, last year Derek opened a joint deposit account in his name and the name of his brother James and lodged €50,000 into the account at the time of opening. James, who dived in Donegal travelled to Dublin to be in the bank when the account was being opened. When the account was opened, the bank manager endorsed the deposit book as "payable to Derek O\'Donnell only or the survivor." After that date, Derek made a number of other lodgements to the account but James had no dealings with it. Advise Amy and James as to their entitlements to the house and the monies in the joint deposit account respectively. Support your answer by reference to relevant case law.',
      },
      {
        examType: 'Essay',
        description:
          '"The draconian and essentially unfair nature of Anton Piller orders from the point of view of respondents against whom…',
        text: '"The draconian and essentially unfair nature of Anton Piller orders from the point of view of respondents against whom they are made requires, in my view, that they be so drawn as to extend no further than the minimum extent necessary to achieve the purpose for which they are granted, namely the preservation of documents or articles which might otherwise be destroyed or concealed." Per Scott J in Columbia Picture Industries v Robinson [1987] Ch 38. Discuss, with reference to relevant case law, the principles governing applications for Anton Piller orders.',
      },
      {
        examType: 'Problem',
        description:
          'Audrey Hayes who died recently, lived a long and happy life surrounded by… Advise Brian as to who shall take the…',
        text: 'Audrey Hayes who died recently, lived a long and happy life surrounded by her very large group of friends and by her family in her hometown of Ballygranges a town of some 10,000 inhabitants. She was very involved in all aspects of life in the town and was very well known and liked by most people in the town. In her later years, Audrey became most interested in the study of local history and that of her own family in particular. She was very proud of the fact that the land that she owned and on which her house was situate had been in the Hayes family for over 250 years. She died testate, survived by her husband. They did not have any children but Audrey was always very close to her 4 nephews and nieces, all of whom went by the surname Hayes. In her Will, Audrey appointed one of her nephews, Brian, as her Executor. She devised the fee simple in her land to her husband, John, for his own absolute use and benefit, "subject to my sincere wish" that he would not sell the land but would retain it for her 4 nephews and nieces. She also bequeathed the sum of €250,000 to Brian on trust for "those of my relatives and friends in the town of Ballygrange as he shall choose". Finally, she nominated the Ballygrange Historical Society as the beneficiary under her residuary clause. Advise Brian as to who shall take the benefit of the above devise and bequest. Support your answer by reference to relevant case law.',
      },
      {
        examType: 'Essay',
        description:
          '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its…',
        text: '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its traceable proceeds also, and his interest binds everyone who takes the property or its traceable proceeds except a bona fide purchaser for value without notice." per Millett LJ in Foskett v McKeown [2001] 1 AC 102 at 127. Discuss, with reference to relevant case law, the principles applicable in relation to tracing in equity.',
      },
      {
        examType: 'Problem',
        description:
          'He had lived all of his life in the small village of Ardaghee and was… Advise Peter as appropriate.',
        text: "John died recently. He had lived all of his life in the small village of Ardaghee and was survived by his wife Mary. He had one daughter, Bridget, who predeceased him as she had died tragically in a car accident some years ago. Bridget had always loved sport and was an active member of the Ardaghee Sports Association. John died testate and in his Will he bequeathed all of his property to his wife Mary, save for a specific bequest in the residuary clause in which he bequeathed the residue of his estate; \"to the Bridget Murphy fund, to be administered by the board of the Ardaghee Sports Association for the promotion of sport jn the two primary schools in my home village of Ardaghee.\" John and Mary never had any interest in sport themselves but, wanting to do something in Bridget's memory, intended to arrange for the setting up of a fund to promote sport in their village. They had intended to hold fundraising events during their lifetime and provide the monies funds raised to the Fund but unfortunately, they never actually took any steps in this regard and the Bridget Murphy Fund was never established. John's brother, Peter, is the executor of John's estate and he has approached you asking how the residue of the estate ought to be administered. He is anxious to determine whether the residuary bequest is a charitable one and if so, how it can be administered, as the Bridget Murphy fund never existed. Advise Peter as appropriate.",
      },
      {
        examType: 'Essay',
        description:
          'Write an essay on the various defences to an application for specific performance.',
        text: 'Write an essay on the various defences to an application for specific performance.',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: "Write a note on any two of the following three topics. Make reference to relevant case law where appropriate. All parts carry equal marks. (a) The Principles governing the distribution of surplus funds upon the dissolution of an unincorporated association; (b) Equity's approach to the rectification of unilateral mistakes by parties to an agreement; (c) The doctrine of satisfaction.",
      },
      {
        examType: 'Problem',
        description:
          'Last year, Anthony entered into an agreement with Splendid and Lavish, a… Injunction, Specific Performance.',
        text: "Last year, Anthony entered into an agreement with Splendid and Lavish, a hotel group, to buy five paintings owned by the hotel group and hanging in the foyer of one of their hotels. Subsequently, a dispute arose between himself and the group about the terms of the agreement and also whether Anthony had, in failing to pay the monies for the art by the specified date, terminated the agreement. Anthony has instituted proceedings for specific performance and the hotel group intend to contest his claim. He is aware that it will take some months for the proceedings to get a hearing and is most anxious to get possession of the paintings in the coming weeks, as he wishes to hang them in a guest house that he is opening in five weeks' time. Anthony instituted the specific performance proceedings without legal advice or assistance but now seeks your help regarding the advisability of seeking an injunction, before the hearing of the specific performance proceedings, to compel Splendid and Lavish to deliver up the five paintings to him. Advise him accordingly in relation to his injunction query. In answering the question, students need only address the interlocutory injunctive relief now sought by Anthony and need not address the final relief sought in the proceedings that he has instituted.",
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2018,
    questions: [
      {
        examType: 'Problem',
        description: 'Two years ago, Beatific Bank Ltd. Company, Shareholder.',
        text: 'Two years ago, Beatific Bank Ltd. entered into a loan agreement with Rusty Retail Ltd. on foot of which it agreed to provide Rusty Retail Ltd. with €100,000 to fund the expansion of its chain of shops selling and repairing bicycles. Rusty Retail Ltd. was the brainchild of Anthony Watson, who ran the shops and made all of the related commercial and staffing decisions. He was the managing director of, and 95% shareholder in, the company. He appointed his younger brother, Jason, as director and gave him the remaining 5% shareholding in the company. Anthony and Jason\'s father had died when the boys were small and, as Anthony was eight years older than his brother, Jason had always admired and looked up to him, tending to take his advice in relation to most matters. In turn, Anthony tended to behave in a kindly and paternal way towards Jason, offering advice and help when appropriate. Ironically, Jason had done better for himself in life than Anthony and held down a steady job in the civil service, while Anthony had flitted from job to job, never really finding his niche apart from his love of bicycles. Neither brother married or had children. Jason bought his own house, Ballymac Lodge, while Anthony never bought a home for himself and lived in a rented apartment. Apart from his directorship and 5% shareholding in the company, Jason never had any material involvement in the day-to-day running of the shops nor was he otherwise involved in the activities of Rusty Retail Ltd. The loan agreement between Beatific Bank Ltd. and the company stipulated, amongst other things, that Rusty Retail Ltd. would provide the Bank with a guarantee which was to be supported by a legal charge over Ballymac Lodge. When the Bank had told Anthony that it would not proceed with the loan agreement unless it obtained a charge over a suitable property as a form of guarantee, Anthony had suggested to the Bank that Jason might be willing to permit the creation of a charge over Ballymac Lodge but added that he would have to ask Jason about that. Anthony had then asked Jason if he was willing to let this happen, making it clear to Jason that he would not be able to make the business profitable without the loan monies. Jason, feeling indebted to his brother for all of his help since childhood, did not have the heart to say "no" to this arrangement. The loan agreement also stated that Beatific Bank Ltd. would release the €100,000 loan fund to the company on receipt of a letter from Jason\'s solicitor confirming that he had received independent legal advice prior to the execution of the guarantee document. To this end, Jason and Anthony attended at the offices of Black, White and Sons. , Solicitors, who advised them both of the consequences of the guarantee. Black, White and Sons Solicitors also acted for Rusty Retail Ltd., advising Rusty Retail Ltd in relation to a number of matters, including the loan agreement with Beatific Bank Ltd. After this meeting, the principal of Black, White and Sons Solicitors wrote to the manager of Beatific Bank Ltd., stating that; "We confirm that we act for Rusty Retail Ltd and also for Jason Watson of Ballymac Lodge. We further confirm that on the day of both Anthony Watson, managing director of Rusty Retail Ltd., and his brother Jason Watson attended at our offices whereupon the nature and consequence of both the loan and the guarantee were explained to them in full. " The manager of the Bank, Anthony and Jason signed the loan and guarantee agreement, and the loan monies were forwarded to the company. Unfortunately, Anthony never managed to make a success of the business and Rusty Retail Ltd. went into liquidation before it repaid the monies advanced in the loan. Beatific Bank Ltd. now wishes to enforce the charge over Ballymac Lodge to recoup the loan monies. Advise it of its likelihood of msuccess, of the defences, if any, that may be available to Jason and of the merit of those defences.',
      },
      {
        examType: 'Essay',
        description:
          'When considering how best a Court might determine whether or not an estoppel arises in any given case, the English High…',
        text: 'When considering how best a Court might determine whether or not an estoppel arises in any given case, the English High Court in Taylor Fashions Ltd v Liverpool Victoria Trustees Co Ltd [19811 1 All ER 897 at 915-916 suggested that the most appropriate approach is to ascertain whether, in the particular circumstances; "it would be unconscionable for a party to be permitted to deny that which, knowingly or unknowingly, he has allowed or encouraged another to assume to his detriment rather than to inquiring whether the circumstances can be fitted within the confines of some preconceived formula serving as a universal yardstick for every form of unconscionable behaviour. " Consider whether the Courts have adopted this suggested test of "unconscionability" in subsequent estoppel cases.',
      },
      {
        examType: 'Problem',
        description: 'Betty died recently, in contentious circumstances. Succession.',
        text: "Betty died recently, in contentious circumstances. She had been suffering from cancer which was, unfortunately, at a most advanced stage. She refused to go into hospital and was being cared for at home by a nurse and an attending doctor. Her close friends, Mary and Jane, moved in to the house to be with her around the clock. Approximately a fortnight before her death, Betty was told by the doctor that she had only about a month to live. Betty was in agony and not receiving comfort from the medication provided. Her only comfort was derived from her friends who were most attentive and spent their day by her bedside. One day, while her closest friend Jane was with her, Betty opened her bedside locker and presented her with a key to a box which was downstairs in the kitchen of the house and which contained her personal papers. Betty told Jane that the title deeds to an old house that she bought some years ago were in that box. Expressing her gratitude to Jane for her devoted friendship, Betty told Jane that she wished her to have the house. Some days later, Betty was in very considerable pain and asked Mary, who was by her side at the time, to assist her in her efforts to end her life. Mary resisted originally but, watching her friend's pain, eventually acceded to Betty's request. While cleaning out Betty's belongings some days ago, Jane came across a locked box. Using the key that Betty had given her, she opened the box and found the deeds to the house to which Betty had referred. Advise Jane as to her entitlement in relation to Betty's house. Students do not need to consider whether any possible issues arise pursuant to the Succession Act, 1965.",
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: "Write a note on any two of the following three topics. Refer to case law, where relevant. All parts carry equal marks. (a) The doctrine of satisfaction; (b) Equity's approach to the rectification of unilateral mistakes by parties to an agreement; (c) The rule in Strong v Bird.",
      },
      {
        examType: 'Problem',
        description: 'Tom died testate some months ago. Advise Diarmuid as appropriate.',
        text: "Tom died testate some months ago. In his Will, he appointed his son Diarmuid as his executor. During Tom's lifetime, he was a committed linguist, historian and environmentalist and his interests are reflected in a bequest of €100,000 to the executor, in which he directed that the money be used to facilitate the discovery by post-graduate students of any poetry by W.B. Yeats which remained unknown at the date of the testator's death. In a second bequest, Tom bequeathed €250,000 to Domhain Glan, an environmental group with charitable status, which aims to promote environmentally sustainable and beneficial practices among members of the Irish public. He bequeathed that sum to the group for the purpose of supporting a political campaign to change the law by prohibiting the use of disposable coffee cups. Tom also bequeathed €50,000 to Domhain Glan to be used to fund the Seanad electoral campaign of such member of the Board's choosing of the Environmental Alliance, a political party advancing environmental policies which mirror the principles of Domhain Glan. Finally, Tom bequeathed the sum of €400,000 for \"the purpose of helping members of my family who have fallen on hard financial times\". In addition to being the executor of Tom's Will, Diarmuid is also a member of the Board of Domhain Glan. He seeks your advice as to whether or not each of the bequests is charitable. Advise Diarmuid as appropriate.",
      },
      {
        examType: 'Problem',
        description:
          'In recent years, the Irish courts have begun to adopt a less restrictive… Damages, Injunction.',
        text: 'In recent years, the Irish courts have begun to adopt a less restrictive approach to the requirement that a plaintiff seeking a Mareva injunction must show that there is a real risk that the defendant will dispose of his or her assets for the purpose of preventing the plaintiff from recovering damages. This approach will help plaintiffs striving to recover large debts from debtors, making Mareva injunctions a very real and powerful tool in debt recovery litigation. Discuss the above statement, supporting your answer with reference to relevant case law.',
      },
      {
        examType: 'Problem',
        description:
          'In 2014, John Murphy, a developer, entered into a loan agreement with Get… Company.',
        text: 'In 2014, John Murphy, a developer, entered into a loan agreement with Get Rich Quick Ltd., an investment company, for the sum of €10,000,000 for the purpose of enabling him to build a block of apartments in the midlands and on the understanding that Get Rich Quick Ltd. would at all times retain the beneficial interest in the loan monies. John gratefully took the money and, as agreed with Get Rich Quick Ltd., lodged it in a bank account opened specifically for that purpose. He ran into business difficulties, however, and never actually built the apartments. He had a number of creditors whom he never repaid. Due to his ongoing inability to meet his debts, he was declared bankrupt last month. Get Rich Quick Ltd. is anxious to secure the return of the monies that it forwarded by loan to John. It is aware that he has many creditors but asks you if the specific circumstances of its loan to John may, despite the lack of any specific wording referring to a "trust" create any form of trust in its favour? Advise Get Rich Quick Ltd.',
      },
      {
        examType: 'Essay',
        description:
          "Write a note on each of the following: (a) A trustee's duty to invest; and (b) A trustee's duty to properly exercise…",
        text: "Write a note on each of the following: (a) A trustee's duty to invest; and (b) A trustee's duty to properly exercise his or her discretion.",
      },
      {
        examType: 'Essay',
        description:
          'Answer (a) and (b) (a) In Re Basham [1986] 1 WLR 1498, the Court noted that the expenditure of money by one person or…',
        text: 'Answer (a) and (b) (a) In Re Basham [1986] 1 WLR 1498, the Court noted that the expenditure of money by one person or another person\'s property was "not the only kind of detriment that gives rise to proprietary estoppel." Discuss the above. (b) Consider the role which the concept of unconscionability plays in the modern doctrine of proprietary estoppel.',
      },
      {
        examType: 'Problem',
        description: 'David, a solicitor, recently suffered a fatal heart attack. Trustee.',
        text: "David, a solicitor, recently suffered a fatal heart attack. Some time prior to his death, he added to monies in his own current account by lodging funds from two other accounts. One of those accounts contained monies from a trust of which he was a trustee, and the other contained the monies belonging to George, a client. Having mixed the said monies, he made numerous payments out of, and some lesser payments into, that current account. He also made certain payments from that account to the beneficiaries under the trust in accordance with the terms of thereof. At the time of his death, there was insufficient funds to meet his personal debts and to meet George's claim and the claim of the beneficiaries under the trust. Advise George, making reference to relevant case law.",
      },
      {
        examType: 'Problem',
        description:
          '"The Mareva injunction is a very powerful remedy which if improperly… Injunction.',
        text: "\"The Mareva injunction is a very powerful remedy which if improperly invoked will bring about injustice, something that it was designed to prevent. per O'Flaherty J in O'Mahony v Horgan [1995[ 2 IR 411 at 423. Consider how the Irish courts have sought to balance the rights of the plaintiff and defendants in deciding whether to grant relief in the form of Mareva injunctions.",
      },
      {
        examType: 'Essay',
        description:
          'In January 2010, Richard opened a joint deposit account in the names of himself and his friend Brian and lodged the sum…',
        text: 'In January 2010, Richard opened a joint deposit account in the names of himself and his friend Brian and lodged the sum of €50,000 in the account. Both Richard and Brian attended at the bank for the purpose of opening the account and the manager endorsed the deposit book as "payable to Richard only or survivor". Richard made a number of additional payments into the account in the period since it was opened but Brian never had any dealings with the account. Richard died last year, and in his Will dated June 2009, he left all of his property to another friend Harry. Brian was quite surprised and seeks your advices regarding his entitlement to the monies in the joint deposit account. Richard was not survived by any relatives.',
      },
      {
        examType: 'Essay',
        description:
          'The cy-près doctrine is applied: "Where the method indicated by the donor of carrying out his charitable intentions…',
        text: 'The cy-près doctrine is applied: "Where the method indicated by the donor of carrying out his charitable intentions becomes impracticable, or his intentions cannot be executed literally, most frequently owing to altered circumstances." per Budd J in Re Royal Kilmainham Hospital [1966] IR 451 at 469. Discuss the circumstances in which the cy-près doctrine is invoked, referring both to initial and subsequent failures of charitable purposes. Refer to relevant case law and statutory provisions.',
      },
      {
        examType: 'Problem',
        description:
          'Barry, a bachelor who did not have any children died recently at the age… Undue Influence, Company.',
        text: "Barry, a bachelor who did not have any children died recently at the age of 95. For the last four years of his life, he had lived in a nursing home for the elderly. He received few visitors and was very lonely for company. As time progressed in the nursing home, he became physically weaker and unable to do ordinary day-to-day tasks such as washing and feeding himself independently. His memory was poor intermittently and he forgot many things from his past. As a result his self-confidence diminished greatly and he sought assistance and guidance in most matters. While all of the staff tended to him, he began to rely more and more over time upon one particular care worker called Derek. Derek paid particular attention to the care of Barry, spending time chatting every day and reading the newspaper for him. Derek always tended to Barry at mealtimes and helped to dress him in the mornings and to prepare him for bed. Barry was very grateful for Derek's company and help. He began to talk to Derek about his worries about what best to do with his house after he died. He had inherited that house from his own family and wanted to make sure that it went into the hands of somebody who would maintain it with loving care after he died. Derek suggested to Barry that he could transfer the house to him and assured him that he would maintain it to the highest standards. Barry considered this and asked his solicitor to attend at the nursing home for the purpose of putting this proposal to him. Barry's solicitor first of all satisfied himself that Barry was capable of giving instructions at the time and then advised him strongly against the transfer to Derek. Nonetheless, Barry felt grateful to Derek for the care he had received and did not wish to offend him or lose his daily company, and thus made a Will in which he bequeathed the property to Derek. Barry appointed his nephew, Dermot, as the Executor of his Will. Dermot is concerned that the house has been left to Derek, and queries whether the bequest may be set aside on the grounds of undue influence. Advise Dermot.",
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: 'Write a note on any two of the following three topics. Refer, where appropriate, to relevant case law: (a) The Rule in Hastings Bass (b) The circumstances in which a trustee may be removed from his or her position (c) The rule in Strong v Bird',
      },
      {
        examType: 'Problem',
        description:
          'Richard, a wealthy businessman who never married, had for many years been… Advise William.',
        text: 'Richard, a wealthy businessman who never married, had for many years been having a relationship with Deirdre, a woman much younger than him. He wanted to make provision for her in the event of his death but wished to do so in a way that would not attract public attention. In his Will executed in 2010, Richard left his luxury holiday home in Connemara "to William and Michael as co-owners in full confidence that they will use it for the purposes indicated to them by me." Three months after the execution of the Will, Richard arranged to meet William and told him that he was leaving the holiday home to him and Michael, and added that "you know that I\'m only leaving it to you because I trust you and know that you will use it for the benefit of Deirdre." William assured Richard that he and Michael would carry out his wishes but he never mentioned this conversation to Michael. Last summer, Richard was killed tragically in a car accident. William approaches you asking who has the beneficial entitlement to the holiday home. Advise William.',
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2019,
    questions: [
      {
        examType: 'Problem',
        description:
          'Andrew, Brian and Conor are the trustees of a trust established by a… Trustee, Company.',
        text: 'Andrew, Brian and Conor are the trustees of a trust established by a testator for the benefit of his nephew, Declan. At the time that the trust came into operation in 2019, the trust assets comprised a house and a sum of €50,000 in cash. The Will states that the trustees shall have full power to invest the trust assets "in such a manner as they in their absolute discretion see fit". It also provides for the payment of monies to Declan for his maintenance every year until he reaches the ages of 18. Andrew has never taken any active part in the management of the trust and has told the other two trustees on numerous occasions that he has no interest in its affairs. In 2019, the other two trustees put a caretaker into possession of the house, which was then worth about €150,000. While the caretaker has ensured that all essential maintenance was carried out on the house, the trustees have never taken any steps to rent out the house in those intervening years. Brian and Conor decided to invest the monies in a number of speculative pharmaceutical company ventures which have sustained substantial financial losses. By the beginning of 2019, the house has almost tripled in value from its 2009 recessionary value of €150,000 but the other trust assets left are now only worth approximately €1,000. Declan, who has just turned 18, seeks your advice about whether a court is likely to find any or all of the trustees have acted in breach of trust. Advise him also in relation to remedies that he may obtain, should a court find a breach of trust. Refer in your answer to relevant case law.',
      },
      {
        examType: 'Essay',
        description:
          'In recent years, the Irish courts have given, considerable attention to the question of whether or not, when one family…',
        text: 'In recent years, the Irish courts have given, considerable attention to the question of whether or not, when one family member guarantees a business loan for another member of his or her family, the lending bank is obliged to take appropriate steps to ensure that the family member acting as guarantor has received independent legal advice prior to the execution of the guarantee. Beginning with the decision in Ulster Bank v Fitzgerald [2001] IEHC 159, consider the law in Ireland regarding the role of banks in ensuring that independent legal advice is given to a family member when he/she guarantees a business loan for another family member. To what extent have the Irish courts adopted the principles set out in Royal Bank of Scotland v Entridge [2001] UKHL 44?',
      },
      {
        examType: 'Problem',
        description:
          'You have been approached by Tom, a businessman involved in providing… Advise Tom.',
        text: 'You have been approached by Tom, a businessman involved in providing tourist facilities in your local area, a popular seaside town. His main source of income stems from boat trips which he organises for tourists wishing to see the many dolphins based in the sea waters at the mouth of the town\'s bay. Many others in the area make their living in similar ways. Tom has learnt recently that Robert, a local man who used to make his living as a fisherman, plans to set up a fish farm to the left side of the bay. Having done some internet research into the issue, Tom is now aware that some people have concerns about the negative impact of fish farms on the neighbouring marine ecosystems. Of particular concern to him is the published postgraduate thesis of a marine biologist which argues that dolphins are particularly affected by the ecosystem changes brought about by fish farming and have been known, due to those changes, to leave the area in which the fish farm is based in search of new "homes". Tom is very worried as he fears that his main source of livelihood, and indeed that of others, may about to be destroyed if Robert\'s fish farm goes ahead. He is also genuinely concerned about the loss to the community if the dolphins leave the area as he considers that they enhance the natural environment greatly and are a source of great joy for the local children and adults alike. He asks you if there is anything that he can do to prevent the fish farm becoming operational. Advise Tom. Make reference in your answer to relevant case law. Students do not need to look at any planning law issues that may arise in this question.',
      },
      {
        examType: 'Problem',
        description:
          'A stranger cannot be made liable for knowing assistance in a fraudulent… Trustee, Constructive Trust.',
        text: 'A stranger cannot be made liable for knowing assistance in a fraudulent breach of trust unless knowledge of the fraudulent design can be imputed to him". Per Vinelott J in Eagle Trust plc. V SBC Securities Ltd [1992] 4 ALL ER 488 at 499. Discuss, with reference to relevant case law, the degree of knowledge of a breach of trust which a stranger to that must possess in order to be held liable as a constructive trustee for his or her "knowing assistance".',
      },
      {
        examType: 'Problem',
        description: 'Eileen died in December 2018 at the age of 85. Advise the Donkey Sanctuary.',
        text: 'Eileen died in December 2018 at the age of 85. She was unmarried and died without issue. She was well known throughout her life for her love of animals and in her Will left all of her property to The Donkey Sanctuary. In October 2018 her niece, Noelle, who lives in London, visited her on a trip home to Dublin, as she knew that Eileen has suffered a severe bout of pneumonia the preceding month. Noelle found Eileen in poor health, bed-ridden and coughing very badly. Noelle suggested that she would bring Eileen to the doctor but Eileen refused to go, saying she had been to all manner of doctors in the past year and there was nothing they could do, that she knew herself that she was getting weaker and weaker. Noelle spent the day with Eileen and as evening approached, she gathered her things in order to leave, saying that she would come back and visit Eileen when she was next back in Dublin at Christmas time. At that point, Eileen told Noelle that she did not expect to live much longer and might not be alive at Christmas. She then asked Noelle to go to the sideboard in the dining room and bring her up the bundle of documents kept inside. Noelle did as she was asked. Eileen feebly rooted through them and, having found documents that she was looking for, handed them to Noelle. Eileen then said to Noelle "here are the deeds of this house; this will be yours when I am gone". Noelle became quite emotional and could not discuss the matter further. She did, however, take the documents with her upon leaving the house. Noelle is claiming that the house is hers. Advise the Donkey Sanctuary. Make reference in your answer, to relevant case law.',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: 'Write a note on any two of the following three topics. Refer to case law, where relevant. (a) The exceptional categories in which non-charitable purpose trusts may be enforced. (b) The position under both the common law and the Charities Act, 2009 regarding valid gifts for the relief of poverty. (c) The doctrine of satisfaction.',
      },
      {
        examType: 'Problem',
        description:
          'Last year, John and Brian reached an agreement to the effect that John… Specific Performance.',
        text: "Last year, John and Brian reached an agreement to the effect that John would sell his interest in a parcel of land to Brian for €300,000. While it was John's intention to exclude one particularly valuable site from the deal, he never communicated this to Brian and that site was included in the contract when their agreement was recorded in writing. Subsequently, John realised the mistake and sought rectification of the contract to exclude this valuable site. Brian wishes to secure the entirety of the lands and so has counterclaimed for specific performance of the contract. John has argued in his defence to the counterclaim that the contract ought not be specifically performed because of the mistake regarding the inclusion of the valuable site. He also argued that, as land prices have increased significantly in the past year, it would impose an unfair and unnecessary hardship upon him if specific performance of the contract was granted. Advise John about his prospects of obtaining rectification of the contract. Advise him also about the likely response of the Court to Brian's counterclaim for specific performance and of John's potential defences to it.",
      },
      {
        examType: 'Problem',
        description:
          '(a) In 2015, William Byrne opened a joint deposit account in his name and… Advise Derek, making reference to relevant…',
        text: 'Answer Part (a) AND Part (b). Both parts carry equal marks. (a) In 2015, William Byrne opened a joint deposit account in his name and that of his younger brother Derek. He lodged the sum of €100,000 in the account at the time. Derek travelled a considerable distance to the bank to open the account with William. The deposit book was signed by both William and Derek, and the manager endorsed the book "payable to William Byrne only or survivor. Subsequently, William made a number of further lodgements but Derek has no dealings with the account. William died last year without issue and in his Will, dated 2014, he left all his property to his other brother Fred. Derek was most surprised when he learnt of the contents of the Will as he claims that he is entitled to whatever monies were in the joint deposit account at the time of William\'s death. Advise Derek, making reference to relevant case law. AND Discuss, making reference to relevant case law, the circumstances in which a presumption of advancement between father and child may be rebutted.',
      },
      {
        examType: 'Essay',
        description:
          "'It is an inflexible rule of a Court of Equity that a person is a fiduciary position...",
        text: "'It is an inflexible rule of a Court of Equity that a person is a fiduciary position... is not, unless otherwise expressly provided, entitled to make a profit; he is not allowed to put himself in a apposition where his interest and his duty conflict.' Lord Herschell in Bray v Ford (1986) AC 44 at 51. Consider whether the above statement accurately represents the position with regard to trustees' duties.",
      },
      {
        examType: 'Problem',
        description:
          'Brian, a wealthy farmer, died recently. Advise Dermot, making reference to relevant case law.',
        text: 'Brian, a wealthy farmer, died recently. He was a bachelor and died without issue. He died intestate and his next of kin with to administer his estate in the normal way. However, you have been approached by Dermot who claims that he is entitled to the farm of the deceased. Brian was 75 when he died, and for over 30 years had worked the farm with the help of Dermot who began to help out at weekends as a young boy of 10. Although Dermot was at primary school, he did not progress to secondary school but instead began to work fulltime on a farm. He usually worked seven days a week and well into the evening, working considerably more hours than would be expected of a farm labourer. He was not paid a regular salary but received his meals and, on occasion once he reached adulthood, Brian would give him a few pounds to go into town and have a night out. Dermot got married at age 27 and his wife put their names on the local council housing list in the hope of getting a home of their own; Brian feared that if they moved that far away, Dermot would get a farming job closer to his new home and so he repeatedly pleased with Dermot and his wife not to accept the county council\'s offer. He led them to understand that if they did not do so, but remained living where they were, they would "have their own home on this farm when he was gone". Much to the disappointment of his wife and children, Dermot agreed to forego the offer of the council house. During the Celtic tiger years, Dermot approached Brian, saying that he no longer wished to work full-time on the farm as he wished to do as many of his friends were doing and take up construction work, where considerable earnings could be made. When he said this, Brian responded by saying words to the effect that "remember, this will be yours after my day". Dermot understood this to mean that he would inherit the farm if he continued working on the farm as he always had. As the years progresses, Dermot noticed that Brian would increasingly refer to "our cattle" and "our fields". As he aged, Brian left most of the heavier farming tasks to Dermot and Dermot also did some construction work on the farm and made general improvements to it. Since Brian\'s death, Dermot has discussed his claim to the farm with Brian\'s next-of-kin but they do not accept that he is entitled to any interest in the farm. Advise Dermot, making reference to relevant case law.',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: "Write a note on any two of the following three topics. Refer to case law, where relevant. All parts carry equal marks. (a) Equity's approach to the rectification of unilateral mistakes by parties to an agreement; (b) The rule in Hastings-Bass [1975] Ch 25; (c) The rule in Strong v Bird (1874) LR 18 Eq 315",
      },
      {
        examType: 'Problem',
        description:
          'In 2017, John Murphy, a developer, entered into a loan agreement with Get… Company.',
        text: 'In 2017, John Murphy, a developer, entered into a loan agreement with Get Rich Quick Ltd., and investment company, for the sum of €10,000,000 for the purpose of enabling him to build a block of apartments in the midlands and on the understanding that Get Rich Quick ltd. would at all times retain the beneficial interest in the loan monies. John gratefully took the money and, as agreed with Ger-Rich Quick Ltd., lodged it in a bank account opened specifically for that purpose. He ran into business difficulties, however, and never actually built the apartments. He had a number of creditors whom he never repaid. Due to his ongoing inability to meet his debts, he was declared bankrupt last month. Get Rich Quick Ltd. is anxious to secure the return of the monies that it forwarded by loan to John. It is aware that he has many creditors but asks you if the specific circumstances of its loan to John may, despite the lack of any specific wording referring to a "trust", create any form of trust in its favour? Advise Get Rich Quick Ltd.',
      },
      {
        examType: 'Essay',
        description:
          '" I do not think that is should be assumed that as soon as any element of personal service or continuous services can…',
        text: '" I do not think that is should be assumed that as soon as any element of personal service or continuous services can be discerned in a contract the court will, without more, refuse specific performance..... As is so often the case in equity, the matter is one of balance of advantage and disadvantage in relation to the particular obligations in question; and the fact that the balance will usually lie on one side does not turn this probability into a rule." Per Megarry J in C.H. Giles and Co. v Morris [1972] 1 WLR 307 at 318. Consider how the courts have dealt with the specific performance of contracts for personal services.',
      },
      {
        examType: 'Problem',
        description:
          'He had lived all of his life in the small village of Ardaghee and was… Advise Peter as appropriate.',
        text: "John died recently. He had lived all of his life in the small village of Ardaghee and was survived by his wife Mary. He had one daughter, Bridget, who predeceased him as she had died tragically in a car accident some years ago. Bridget had always loved sport and was an active member of the Ardaghee Sports Association. John died testate and his Will he bequeathed all of his property to his wife Mary, save for a specific bequest in the residuary clause in which he bequeathed the residue of his estate; \"to the Bridget Murphy fund, to be administered by the board of the Ardaghee Sports Association for the promotion of sport in the two primary schools in my home village of Ardaghee.\" John and Mary never had any interest in sport themselves but, wanting to do something in Bridget's memory, intended to arrange for the setting up of a fund to promote sport in their village. They had intended to hold fundraising events during their lifetime and provide the monies raised to the Fund but unfortunately, they never actually took any steps in this regard and the Bridget Murphy fund was never established. John's brother, Peter, is the executor of John's estate and he was approached you asking how the residue of the estate ought to be administered. He is anxious to determine whether the residuary bequest is a charitable one and if so, how it can be administered, as the Bridget Murphy fund never existed. Advise Peter as appropriate.",
      },
      {
        examType: 'Essay',
        description:
          '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its…',
        text: '"A beneficiary of a trust is entitled to a continuing beneficial interest not merely in the trust property but in its traceable proceeds also, and his interest binds everyone who takes the property or its traceable proceeds except a bona fide purchaser for value without notice". Per Millet LJ in Foskett v McKeown [2001] 1 AC 102 ar 127. Discuss, making reference to relevant case law, the principles applicable in relation to tracing in equity.',
      },
      {
        examType: 'Problem',
        description:
          'Last year, Ashling entered into an agreement with Splendid and Lavish, a… Injunction, Specific Performance.',
        text: "Last year, Ashling entered into an agreement with Splendid and Lavish, a total group, to buy five paintings owned by the hotel group and hanging in the foyer of one of their hotels. Subsequently, a dispute arose between herself and the group about the terms of the agreement and also whether Ashling had, in failing to pay monies for the art by the specified date, terminated the agreement. Ashling has instituted proceedings for specific performance and the hotel group intend to contest her claim. She is aware that it will take some months for the proceedings to get a hearing and is most anxious to get possession of the paintings in the coming weeks, as she wishes to hang them in a guest house that she is opening in five weeks' time. Aisling instituted the specific performance proceedings without legal advice or assistance but now seeks your help regarding the advisability of seeking an injunction, before the hearing of the specific performance proceedings, to compel Spendid and lavish to deliver up the five paintings to her. Advise her accordingly in relation to her injunction query. In answering the question, students need only address the interlocutory injunctive relief now sought by Ashling and need not address the final (i.e specific performance) relief sought in the proceedings that she has instituted.",
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2020,
    questions: [
      {
        examType: 'Essay',
        description: 'In N.A.D v.',
        text: 'In N.A.D v. T.D [1985] ILRM 153, Barron J. stated:- "The constructive trust is imposed by operation of law independently of intention in order to satisfy the demands of justice and good conscience. Its imposition is dependent upon the conduct of the person upon whom the trust is imposed and prevents him from acting in breach of good faith. There is no fixed set of circumstances in which such a trust is imposed" In Varko Ltd. (in liquidation) [2012] IEHC 278, Gilligan noted that this "new model constructive trust" has met with limited approval in this jurisdiction. Discuss the Irish case law in which the new model constructive trust has been invoked by the courts.',
      },
      {
        examType: 'Problem',
        description: 'Anne, an aunt of Bridget and Clare, died last year. Trustee, Company.',
        text: "Anne, an aunt of Bridget and Clare, died last year. In her Will, she appointed Bridget and Clare as her executrixes. The Will provided that the two women were to hold the family clothes shop on trust for the benefit of Anne's three children. Bridget is very anxious to proceed with her duties as trustees and has taken a keen interest in the running of the shop -- scrutinising accounts and maintaining good contacts with the shop's suppliers. Clare, however, is a successful businesswoman in her own right and adopts a more hands-off approach to the running of the shop. She has not come to any of the meetings arranged by Bridget to discuss the shop's future and has, in fact, expressed the view to Bridget that she does not think the shop is a viable prospect in the long term and suggested that it ought to be sold and the monies invested in stocks and shares. Some months after Anne's death, Clare opened up her own clothes shop on the street adjoining the trust shop, using contacts that she had obtained from her access to the records as forwarded to her by Bridget. As Clare is selling goods at a discount, the trust store has begun to show a considerable decline in profit. Anne also bequeathed €100,000 to Bridget and Clare on trust for her eldest child for life and thereafter to her eldest grandchild. The Will provided that the two trustees shall have an absolute discretion in relation to the investment of those monies. Bridget is a committed environmentalist and decides, without discussing the matter with Clare, to invest the monies in a fledgling cosmetics company that makes its products primarily from compost. Unfortunately, Bridget failed to research the potential for, and likelihood of, economic growth of these investments and the company performs very poorly, making considerable losses before going into liquidation. Advise the beneficiaries under the two trusts. Make reference, where appropriate, to relevant case law and statutory provisions.",
      },
      {
        examType: 'Problem',
        description: 'ANSWER (A) [OR]{.underline} (B): A. Frustrat, Injunction.',
        text: 'ANSWER (A) [OR]{.underline} (B): A. "There must be a risk that the defendant will . . . dispose of [his assets] with the intention of defeating of his obligation to a plaintiff and frustrating the anticipated court order . . Indeed, it can be said that a defendant\'s nefarious intention has become the raison d\'étre of the Mareva injunction in Ireland." Indicate, with reference to relevant Irish case law, whether you agree with the statement in the above extract. OR B. "The draconian and essentially unfair nature of Anton Piller orders from the point of view of respondents against whom they are made requires, in my view, that they be so drawn as to extend no further than the minimum extent necessary to achieve the purpose for which they are granted, namely the preservation of documents or articles which might otherwise be destroyed or concealed." Per Scott J in Columbia Picture Industries v Robinson [1987] Ch 38. Discuss, with reference to relevant case law, the principles governing applications for Anton Piller orders.',
      },
      {
        examType: 'Problem',
        description:
          'He never married or had children but he had, for many years, been having a… Advise Eleanor and George as to their…',
        text: 'Derek O\'Donnell died recently. He never married or had children but he had, for many years, been having a secret relationship with a much younger woman named Eleanor and was anxious to ensure that she would be provided for in the event of his death. In his Will, executed in 2014, he bequeathed his house "to his sister Fiona absolutely, she knowing full well what my intention is in relation to same". Some weeks after executing the Will, Derek met Fiona and informed her of his intention in relation to the house. Fiona assured him that she would do as he wished. Also, last year Derek opened a joint deposit account in his name and the name of his brother George and lodged €50,000 into the account at the time of opening. George, who lived in Donegal travelled to Dublin to be in the bank when the account was being opened. When the account was opened, the bank manager endorsed the deposit book as "payable to Derek O\'Donnell only or the survivor". After that date, Derek made a number of other lodgements to the account, but George had no dealings with it. Advise Eleanor and George as to their entitlements to the house and the monies in the joint deposit account respectively. Support your answer by reference to relevant case law.',
      },
      {
        examType: 'Essay',
        description:
          'In recent years, the Irish courts have given considerable attention to the question of whether or not, when one family…',
        text: 'In recent years, the Irish courts have given considerable attention to the question of whether or not, when one family member guarantees a business loan for another member of his or her family, the lending bank is obliged to take appropriate steps to ensure that the family member acting as guarantor has received independent legal advice prior to the execution of the guarantee. Beginning with the decision in Ulster Bank v Fitzgerald [2001] IEHC 159, consider the law in Ireland regarding the role of banks in ensuring that independent legal advice is given to a family member when he/she guarantees a business loan for another family member. To what extent have the Irish courts adopted the principles set out in Royal Bank of Scotland v Etridge [2001] UKHL 44?',
      },
      {
        examType: 'Problem',
        description:
          'Hubert, a self-made millionaire, has recently retired. Advise on the likelihood that his proposed trusts will obtain…',
        text: 'Hubert, a self-made millionaire, has recently retired. He is conscious of how fortunate he has been in his life and now wishes to help out certain members of his family who have struggled to meet their basic day-to-day living expenses. He proposes creating a trust in favour of "his brothers and sisters who are experiencing economic hardship". He has also decided to make a generous donation to his beloved sports club, the Phoenix Polo club, of which he has agreed to act as treasurer since his retirement. The club is an exclusive club with approximately 500 members and a small but committed staff. The members pay an annual membership fee of 10,000 Euro. The club is non-profit making, and the fees are invested in the club to maintain the ground and to care for the horses. Hubert proposes to create a trust in favour of the club for the purpose of paying for necessary gym training equipment to ensure that the club members achieve their best fitness potential. Hubert also proposes specifying in the trust document that 10% of the trust fund be used to permit the children of poor families resident in the area in which the club is situated to avail of healthy recreation by partaking in his beloved sport free of charge for two hours each week. Hubert approaches you asking you to advise on the likelihood that his proposed trusts will obtain charitable status. Support your answer, where appropriate, by reference to relevant case law and the provisions of the Charities Act, 2009.',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any TWO of the following three topics.',
        text: 'Write a note on any TWO of the following three topics. (i) The exceptional categories in which non-charitable purpose trusts may be enforced. (ii) The Principles governing the distribution of surplus funds upon the dissolution of an unincorporated association. (iii) Quistclose trusts.',
      },
      {
        examType: 'Essay',
        description:
          'When considering how best a Court might determine whether or not an estoppel arises in any given case, the English High…',
        text: 'When considering how best a Court might determine whether or not an estoppel arises in any given case, the English High Court in Taylor Fashions Ltd. V Liverpool Victoria Trustees Co Ltd [1981] 1 All ER 897 at 915-916 suggested that the most appropriate approach is to ascertain whether, in the particular circumstances; "it would be unconscionable for a party to be permitted to deny that which, knowingly or unknowingly, he has allowed or encouraged another to assume to his detriment rather than to inquiring whether the circumstances can be fitted within the confines of some preconceived formula serving as a universal yardstick for every form of unconscionable behaviour". Consider whether the courts have adopted this suggested test of "unconscionability" in subsequent estoppel cases. In your answer, make reference to the jurisprudence of Irish courts and, where appropriate, to the jurisprudence of the courts of other jurisdictions.',
      },
      {
        examType: 'Essay',
        description:
          'Joe, who died recently, was a life-long member of the Irish Sports Association, an organisation dedicated to the…',
        text: "Joe, who died recently, was a life-long member of the Irish Sports Association, an organisation dedicated to the promotion of certain amateur sports. He devoted much of his free time to the activities of the organisation, both as a player and official, for many years of his long life. His love of sport and of the Association are reflected in a number of legacies in his Will which are bequeathed to his executor on trust for a number of distinct purposes. In the first bequest, Joe has directed that the sum of €2,000,000 ought to be used by the executor in such manner as he sees fit to promote the playing of football in rural communities. In the second bequest, Joe directed that the sum of €1,000,000 ought to be used by the executor to ensure the provision of playing fields in Joe's hometown. Finally. he has bequeathed the sum of €100,000 to his executor for the purpose of organising a campaign to promote the introduction of legislation criminalising certain conduct on the playing pitch, such as remonstrating with referees. Consider whether the above bequests constitute valid charitable trusts. Support your answer by reference to relevant case law and any relevant provisions of the Charities Act. 2009.",
      },
      {
        examType: 'Essay',
        description:
          "'It is an inflexible rule of a Court of Equity that a person in a fiduciary position...",
        text: "'It is an inflexible rule of a Court of Equity that a person in a fiduciary position... is not, unless otherwise expressly provided. entitled to make a profit; he is not allowed to put himself in a position where his interest and his duty conflict.' Lord Herschell in Bray v Ford (1896) AC 44 at 51. Consider, making reference to relevant case law, whether the above statement accurately represents the position with regard to trustees' duties.",
      },
      {
        examType: 'Essay',
        description:
          'David, a businessman, owns a number of properties and a number of years ago, he transferred many of those properties…',
        text: "David, a businessman, owns a number of properties and a number of years ago, he transferred many of those properties into the name of his niece, Clare. He did this in order to protect those properties from the claims of his creditors. Clare was like a daughter to David, who did not have any children of his own. When Clare was a toddler, her parents were killed in a car crash and David agreed that he would assume responsibility for the care of his niece. He stuck to his word and he and Clare always had a great relationship. When David transferred the properties into Clare's name, she was twelve years of age. Since that time, David has discharged all of his debts to his former creditors, but the properties have remained in Clare's name. Recently, David had a new business idea which will require a considerable amount of collateral if it is to be put into effect. In order to get the funding from his bank for this proposed project, he must satisfy his bank manager that he is the beneficial owner of those properties. Unfortunately, when he mentions this to Clare, it puts something of a strain on their relationship as Clare, who has just finished college, was hoping to sell some of those properties to fund the setting up of her own business. Clare is insistent that she is entitled to claim the legal ownership of the properties in question. David seeks your advice regarding the ownership of the properties. Support your answer with reference to relevant case law.",
      },
      {
        examType: 'Problem',
        description: 'Betty died recently, in contentious circumstances. Succession.',
        text: "Betty died recently, in contentious circumstances. She had been suffering from cancer which was, unfortunately, at a most advanced stage. She refused to go into hospital and was being cared for at home by a nurse and an attending doctor. Her close friends, Mary and Jane, moved into the house to be with her around the clock. Approximately a fortnight before her death, Betty was told by the doctor that she had only about a month to live. Betty was in agony and not receiving comfort from the medication provided. Her only comfort was derived from her friends who were most attentive and spent their day by her bedside. One day, while her closest friend Jane was with her, Betty opened her bedside locker and presented her with a key to a box which was downstairs in the kitchen of the house and which contained her personal papers. Betty told Jane that the title deeds to an old house that she bought some years ago were in that box. Expressing her gratitude to Jane for her devoted friendship, Betty told Jane that she wished her to have the house. Some days later, Betty was in very considerable pain and asked Mary, who was by her side at the time, to assist her in her efforts to end her life by bringing in all of the medication in the house to her. Mary resisted originally but, watching her friend's pain, eventually acceded to Betty's request. and Betty took an overdose of tablets. While cleaning out Betty's belongings some days ago, Jane came across a locked box. Using the key that Betty had given her, she opened the box and found the deeds to the house to which Betty had referred. Advise Jane as to her entitlement in relation to Betty's house. Students do not need to consider whether any possible issues arise pursuant to the Succession Act, 1965.",
      },
      {
        examType: 'Essay',
        description:
          'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" and one of…',
        text: 'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" and one of the other two "certainties" which must be deemed to exist in order to ensure the creation of a valid express trust. (60 marks will be allocated for that part of the question dealing with certainty of objects and 40 marks for that part dealing with the other certainty as chosen by a student.)',
      },
      {
        examType: 'Problem',
        description: 'Last year, Jimmy and Michael married. Company, Shareholder.',
        text: 'Last year, Jimmy and Michael married. Jimmy has always been the stronger personality in the relationship and Michael is inclined to follow his lead without question. This is particularly the case in relation to all matters financial and Jimmy makes all decisions of a monetary nature which have a bearing on them. Jimmy is a businessman and for the past 15 years or so, he has run a computer sales business, Laptop Ltd., of which he is the major shareholder. Michael works as a salesman for this company on a part-time basis. While the business was very successful initially, the recession hit Laptop Ltd. badly and its profits have declined considerably in the past number of years. Jimmy is convinced that the company can survive. however, if it gets a cash injection of 50.000 Euro. He approached Michael proposing that they should together execute a charge over their home in favour of Hasty Banks in order to obtain a loan for Laptop Ltd. Michael has little grasp of such matters but was somewhat anxious about this suggestion. Jimmy, convinced that this loan represents Laptop Ltd.\'s only chance for financial security, was dismayed at his partner\'s reluctance to do as he wished and, over a period of weeks. persistently brought up the topic until eventually Michael agreed to go into Hasty Banks and do as Jimmy wished. Jimmy immediately rang Deirdre, bank manager at Hasty Banks, who has been a close friend of the two men for many years, to make an arrangement to meet to discuss this matter. Michael attended the bank with Jimmy and, in discussion with Deirdre, told her that, he did "not feel sure" about the proposal, but added that he supposed that he had no choice as the company could not continue to function without the loan. While Jimmy was out getting a coffee, Deirdre told Michael that he could seek legal advice about this matter and stated that a solicitor would explain the repercussions to him of executing the charge. She suggested to Michael that he might go down the road to see Bridget, a solicitor, and Michael agreed that he would do so. The following week, Jimmy and Michael came back into the bank and signed the necessary documents to execute the charge. Deirdre did not check whether Michael had ever gone to see Bridget for legal advice. In fact, Michael never did so, as he decided to leave such matters to Jimmy. Laptop Ltd. has defaulted on the loan repayments for the past ten months. Hasty Banks wishes to enforce the charge. Advise Deirdre, accordingly, making reference in your advice to relevant case law. Students do not need to consider the application of the Marriage Act. 2015 for the purposes of this answer.',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: "Write a note on any two of the following three topics. Refer to case law, where relevant. (i) Equity's approach to the rectification of unilateral mistakes by parties to an agreement. (ii) The rule in Hastings-Bass (1975) Ch. 25. (iii) The rule in Strong v Bird (1874) LR 18 Eq 315.",
      },
      {
        examType: 'Problem',
        description:
          'Brian, a wealthy farmer, died recently. Advise Patrick, making reference to relevant case law.',
        text: "Brian, a wealthy farmer, died recently. He was a widower for some years prior to his death and died without issue. He died testate and, in his Will, bequeathed the fee simple in his sizeable farm to his beloved grandniece, Meabh. Brian had had bouts of ill-health for many years prior to his death and would not have been able to run the farm but for the help of Patrick, his nephew, who did most of the heavy day-to-day work on the farm for the last fifteen years prior to Brian's death, commencing in 2001. Patrick, now in his 30's, had not done well in school and left after he completed primary school. Soon afterwards, Patrick began to do bits and pieces of work on Brian's farm and gradually assumed responsibility for most tasks, especially as Brian's health deteriorated. Brian's health got more fragile as time progressed. Brian was a gruff man and Patrick was shy and reluctant to ask him for more than the 25 Euro a week pocket money that Brian gave him. Brian did not feel the need to give any more to Patrick as the young man was living at home with his mother. By 2011, however, Patrick had spent ten years working on the farm and began to think about where his future lay. He started to think about the need to get a better education in order to get a better job in the future. When Brian heard of this plan, however, he dismissed as nonsense any need on Patrick's part to progress his education, as he would always be working on the farm. This comment led Patrick to think that perhaps Brian was planning to leave the farm to him, but he wasn't confident enough to pursue the topic further with Brian. With this hope in mind, Patrick abandoned the plan to go back to school and continued working on the farm. Seeking greater security about his financial position and, not being confident enough to address the issue of the future transfer of the farm to him, Patrick approached Brian for a salary which reflected the value of his labours. When he gathered the nerve to mention it to Brian, Brian refused to give him a proper wage on the basis that Patrick \"was working the farm for himself as it would be his\" after Brian was gone. This gave Patrick some comfort and he began to see his future in terms of ownership of the farm. He decided to erect some new badly needed sheds and used what little money he had saved to pay for them. He also researched the possibility of using better quality seed on the farm and decided to buy some in the hope of yielding a better crop, meeting the additional cost of those expenses himself. Brian knew of these changes being made by Patrick and did not object to them. Life continued in this way on the farm, with Brian making similar statements to Patrick about the future of the farm and Patrick assuming ever greater responsibility for the farm work and the cost of running it. It was therefore with some considerable surprise and disappointment that Patrick learnt in the weeks after Brian's death that Brian's Will did not reflect this state of affairs and that there was in fact no reference to Patrick in it. He approaches you, asking if there is anything that he can do to secure an interest for himself in the farm. Advise Patrick, making reference to relevant case law.",
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2021,
    questions: [
      {
        examType: 'Problem',
        description:
          'In 2018, Mary Murphy, a developer, entered into a loan agreement with Get… Company.',
        text: 'In 2018, Mary Murphy, a developer, entered into a loan agreement with Get Rich Quick Ltd., an investment company, for the sum of €10,000,000 for the purpose of enabling her to build a block of apartments in the midlands and did so on the understanding that Get Rich Quick Ltd. would at all times retain the beneficial interest in the loan monies. Mary gratefully took the money and as agreed with Get Rich Quick Ltd., lodged it in a bank account open specifically for that purpose. She ran into business difficulties, however, and never actually built the apartments. She had a number of creditors whom she never repaid. Due to her ongoing inability to meet her debts, she was declared bankrupt last month. Get Rich Quick Ltd. is anxious to secure the return of the monies that it forwarded by loan to Mary. It is aware that she has many creditors but asks you if the specific circumstances of its loan to Mary may, despite the lack of any specific wording referring to a "trust", create any form of trust in its favor? Advise Get Rich Quick Ltd.',
      },
      {
        examType: 'Essay',
        description:
          'When considering how best a Court might determine whether or not an estoppel arises in any given case, the English High…',
        text: 'When considering how best a Court might determine whether or not an estoppel arises in any given case, the English High Court in Taylor Fashions Ltd v Liverpool Victoria Trustees Co Ltd [1981] 1 All ER 897 at 915-916 suggested that the most appropriate approach is to ascertain whether, in the particular circumstances; "It would be unconscionable for a party to be permitted to deny that which, knowingly or unknowingly, he has allowed or encouraged in order to assume to his detriment rather than to inquiring whether the circumstances can be fitted within the confines of some preconceived formula serving as a universal yardstick for every form of unconscionable behavior". Consider whether the Courts have adopted this suggested test of "unconscionability" in subsequent estoppel cases.',
      },
      {
        examType: 'Problem',
        description: 'Brian, a solicitor, recently suffered a fatal heart attack. Trustee.',
        text: "Brian, a solicitor, recently suffered a fatal heart attack. Sometime prior to his death, he added to monies in his own current account by lodging funds from two other accounts. One of those accounts contained monies from a trust of which he was a trustee, and the other contained the monies belonging to George, a client. Having mixed the said monies, he made numerous payments out of, and some lesser payments into, that current account. He also made certain payments from that account to beneficiaries under the trust in accordance with the terms thereof. At the time of his death, there were insufficient funds to meet his personal debts and to meet George's claim and the claim of the beneficiaries under the trust. Advise George comment making reference to relevant case law.",
      },
      {
        examType: 'Problem',
        description:
          'In recent years comment the Irish courts have begun to adopt a less… Damages, Injunction.',
        text: 'In recent years comment the Irish courts have begun to adopt a less restrictive approach to the requirement that a plaintiff seeking an Mareva injunction must show that there is a real risk that the defendant will dispose of his or her assets for the purpose of preventing the plaintiff from recovering damages. This approach will help plaintiffs striving to recover large debts from debtors, making Mareva injunctions a very real and powerful tool in debt recovery litigation. Discuss the above statement, supporting your answer with reference to relevant case law.',
      },
      {
        examType: 'Problem',
        description:
          'Richard, a wealthy businessman who never married, had for many years been… Advise William.',
        text: 'Richard, a wealthy businessman who never married, had for many years been having a relationship with Deirdre, a woman much younger than him. He wanted to make provisions for her in the event of his death but wish to do so in a way that would not attract public attention. In his Will executed in 2010, Richard left his luxury holiday home in Connemara "to William and Michael as co-owners in full confidence that they will use it for the purposes indicated to them by me". Three months after the execution of the Will, Richard arranged to meet William and told him that he was leaving the holiday home to him and Michael and added that "you know that I\'m only leaving it to you because I trust you and know you will use it for the benefit of Deirdre". William assured Richard that he and Michael would carry out his wishes, but he never mentioned this conversation to Michael. Last summer, Richard was killed tragically in a car accident. William approaches you, asking who has the beneficial entitlement to the holiday home. Advise William.',
      },
      {
        examType: 'Essay',
        description: 'Write a note until of the following tree topics.',
        text: 'Write a note until of the following tree topics. Refer to case law and statutory provisions, where relevant. (i) The exceptional categories in which non-charitable purpose trusts may be enforced. (ii) The possession under both the common law and the Charities Act, 2009 regarding valid gifts for the relief of poverty. (iii) The doctrine of satisfaction.',
      },
      {
        examType: 'Problem',
        description:
          'Barry, a Bachelor who did not have any children, died recently at the age… Undue Influence, Company.',
        text: "Barry, a Bachelor who did not have any children, died recently at the age of 95. For the last four years of his life, he lived in a nursing home for the elderly. He received few visitors and was very lonely for company. As time progressed in the nursing home, he became physically weaker and unable to do ordinary day-to-day tasks such as washing and feeding himself independently. His memory was poor intermittently and he forgot many things from his past. As a result, his self-confidence diminished greatly, and he saw assistance and guidance in most matters. While all of the staff tended to him, he began to rely more and more over time upon one particular care worker called Derek. Derek paid particular attention to the care of Barry, spending time chatting every day and reading from the newspaper for him. Derek always tended to Barry at mealtimes and helped to dress him in the mornings and to prepare him for bed. Barry was very grateful for Derek's company and help. He began to talk to Derek about his worries about what best to do with his house after he died. He had inherited the house from his own family and wanted to make sure that it went into the hands of somebody who would maintain it with loving care after he died. Derek suggested to Barry that he could transfer the house to him and assured him that he would maintain it to the highest of standards. Barry considered this and asked his solicitor to attend at the nursing home for the purpose of putting this proposal to him. Barry's solicitor first of all satisfied himself that Barry was capable of giving instructions at the time and then advised him strongly against the transfer to Derek. Nonetheless, Barry felt grateful to Derek for the care he had received and did not wish to offend him or lose his daily company, and thus made a Will in which he bequeathed the property to Derek. Barry appointed his nephew, Dermot, as the Executor of his Will. Dermot is concerned that the house has been left to Derek, and queries whether the bequest may be set aside on the grounds of undue influence. Advise Dermot.",
      },
      {
        examType: 'Essay',
        description:
          "Write a note on each of the following: (a) A trustee's duty to invest; [and]{.underline} (b) A trustee's duty to…",
        text: "Write a note on each of the following: (a) A trustee's duty to invest; [and]{.underline} (b) A trustee's duty to properly exercise his or her discretion. Both parts carry equal marks.",
      },
      {
        examType: 'Problem',
        description:
          'Tom died testate some months ago. Advise Diarmuid as appropriate, making reference to relevant case law and any…',
        text: 'Tom died testate some months ago. In his Will, he appointed his son Diarmuid as his executor. During Tom\'s lifetime, he was a committed linguist and environmentalist, and his interests are reflected in some of the bequests made in his Will. First of all, he bequeathed €100,000 to the executor, in which he directed that the money be used to facilitate the discovery by post-graduate students of any poetry by W.B. Yeats which remained unknown at the date of the testator\'s death. In a second bequest, Tom bequeathed €250,000 to Domhain Glan, an environmental group with charitable status, which aims to promote environmentally sustainable and beneficial practices among members of the Irish public. He bequeathed that sum to the group for the purpose of supporting a political campaign to change the law by prohibiting the use of disposable coffee cups. Finally, Tom bequeathed the sum of €400,000 for "the purpose of helping members of my family who have fallen on hard financial times". As executor of Toms Will, Diarmuid seeks your advice as to whether or not each of the bequests is charitable. Advise Diarmuid as appropriate, making reference to relevant case law and any relevant statutory provisions.',
      },
      {
        examType: 'Essay',
        description:
          'Answer (a) OR (b); (a) "It is well established that the ordinary test of a fair case to be tried is not sufficient to…',
        text: 'Answer (a) OR (b); (a) "It is well established that the ordinary test of a fair case to be tried is not sufficient to meet the first leg of the test for the grant of the interlocutory injunction where the injunction sought is in effect mandatory. In such a case it is necessary for the applicant to show at least that he has a strong case that he is likely to succeed at the hearing of the action." Per Fennelly J in Lingham v Health Services Executive [2006] ELR 137 at 140. Despite the above statement, there is still some uncertainty regarding the test to be applied in this jurisdiction in the context of mandatory interlocutory relief, as some judgments to appear to endorse their Campus Oil standards in this context. Considered the relevant Irish case law, showing in your answer evidence of the different approaches adopted by the Courts in relation to this test. (b) "The draconian an essentially unfair nature of Anton Piller orders from the point of view of respondents against whom they are made requires, in my view, that they be so drawn as to extend no further than the minimum extent necessary to achieve the purpose for which they are granted, namely the preservation of documents or articles which might otherwise be destroyed or concealed." Per Scott J in Columbia Picture Industries v Robinson [1987] Ch 38. Discuss, with reference to relevant case law, the principles governing applications for Anton Piller orders.',
      },
      {
        examType: 'Essay',
        description: 'John, a bachelor, died suddenly last week.',
        text: "John, a bachelor, died suddenly last week. He died testate. John does not have any children and is survived by three brothers. He was closest to Patrick, his youngest brother. Approximately six months ago, John told Patrick that he wished to transfer his leasehold interest in his shop to Patrick there and then, as he, John, wished to take life at an easier pace and enjoy himself while he was still in good health. John made it clear to Patrick that it was a gift which was to take effect immediately and was not to be postponed until his death. John did not, however, take any steps to complete the gift and no lease was executed in order to give effect thereto. The shop remained open, and the staff previously employed by John ran the business until his death. Patrick did not take any part in running the shop before John's death and accord no expenses in relation to same. John appointed Patrick as executor of his will. He devised his leasehold interest to his three brothers equally. Answer (a) and (b) (a) Patrick asks you to clarify whether he may take the leasehold interest in the shop himself or whether he is obliged to share that interest with his two other brothers equally. [and]{.underline} 12 marks (b) Indicate, giving reasons for your answer, whether your advice would be different if John's will was invalid, and he therefore died intestate. Note that John's parents have predeceased him, and his three brothers are his next of kin.",
      },
      {
        examType: 'Problem',
        description:
          '"There is a general consensus of opinion that, if liability as… Trustee, Constructive Trust.',
        text: '"There is a general consensus of opinion that, if liability as constructive trustee is sought to be imposed ......... on the basis that the defendant has assisted in the misapplication of trust property (knowing assistance) something amounting to dishonesty or want of probity on the part of the defendant must be shown\' (see per Vinelott J in Eagle Trust plc v SBC Securities ltd [1992] 4 All Er 488 at 499). Vinelott J described as "settled law" the proposition that \'a stranger cannot be made liable for knowing assistance in a fraudulent breach of trust unless knowledge of the fraudulent design can be imputed to him .....\' I respectfully agree." Polly Peck International plc v Nadir (No. 2) [1992] 4 All ER 769 at 777, per Scott LJ. Discuss, with reference to relevant case law, the degree of knowledge of a breach of trust which a stranger to that trust must possess in order to be held liable as a constructive trustee for his or her "knowing assistance".',
      },
      {
        examType: 'Essay',
        description: 'Write a note on any [two]{.underline} of the following three topics.',
        text: 'Write a note on any [two]{.underline} of the following three topics. Refer to case law, where relevant. (i) The continued relevance of any four equitable maxims. (ii) The equitable remedy of rectification. (iii) The presumption of advancement.',
      },
      {
        examType: 'Essay',
        description: 'You act for Gaelic bank.',
        text: "You act for Gaelic bank. Conscious of the turbulence in the banking sector in recent years, your client is reviewing its loans policies and procedures. The Bank is anxious to ensure that it is in a position to safeguard the monies that it lends. To that end, Gaelic bank asks you to prepare guidelines regarding the matters that the Bank must attend to in order to ensure that it can enforce loan agreements entered into with customers when the spouse or partner of that customer has acted as guarantor of liabilities or has agreed to create a charge over assets in respect of the customer's liabilities. In drafting these guidelines for your client, you should, where appropriate, refer to relevant case law to illustrate and clarify for your client the points that you are making.",
      },
      {
        examType: 'Problem',
        description:
          'David and Anne died recently, leaving four young children under the age of… Trustee.',
        text: 'David and Anne died recently, leaving four young children under the age of 12. They had made a joint Will in which they appointed Mary as trustee of a considerable sum of money to be used for the benefit of the children once they reached their majority. There are no specific provisions in the Will regulating the investment of the trust fund. Mary is anxious to preserve the value of the trust fund for the children until they reach their majority. Advise her in relation to both (a) [and]{.underline} (b) (a) The investments that she may lawfully make in order to preserve the trust fund; [and]{.underline} 6 marks (b) The standard of care which she must employ in exercising those powers of investment. 14 marks',
      },
      {
        examType: 'Essay',
        description:
          '"I do not think that it should be assumed that as soon as any element of personal service or continuous services can be…',
        text: '"I do not think that it should be assumed that as soon as any element of personal service or continuous services can be discerned in a contract the court will, without more, refuse specific performance ......... As is so often the case in equity, the matter is one of balance of advantage and disadvantage in relation to the particular obligations in question; and the fact that the balance will usually lie on one side does not turn this probability into a rule." Per Megarry J in C.H. Giles and Co v Morris [1972] 1 WLR 307 at 318. Discuss whether you agree with the above statement, making reference to relevant case law in your answer.',
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2022,
    questions: [
      {
        examType: 'Problem',
        description: 'Brian, a solicitor, recently suffered a fatal heart attack. Trustee.',
        text: "Brian, a solicitor, recently suffered a fatal heart attack. Sometime prior to his death, he added to monies in his own current account by lodging funds from two other accounts. One of those accounts contained monies from a trust of which he was a trustee, and the other contained the monies belonging to George, a client. Having mixed the said monies, he made numerous payments out of, and some lesser payments into, that current account. He also made certain payments from that account to the beneficiaries under the trust in accordance with the terms thereof. At the time of Brian's death, there were insufficient funds to meet his personal debt and to meet George's claim and the claim of the beneficiaries under the trust. Advise George how the money should be distributed.",
      },
      {
        examType: 'Problem',
        description: "The Mixed Vegetables Club ['the club'] is an unincorporated association…",
        text: "The Mixed Vegetables Club ['the club'] is an unincorporated association that owns 10 acres of garden allotments. The club has an account with €1000 in it that comes from money raised by the club to buy a new greenhouse. The money was raised from donations made by some members of the club and from donations by visitors to the allotments. The club has now decided not to build the greenhouse. Instead, the current members of the club have voted to disband and sell the land the club owns to a developer. Advise the members of the Mixed Vegetables Club how the proceeds of the sale of the land and the €1000 in the club's account should be distributed.",
      },
      {
        examType: 'Essay',
        description: 'Write a note on any two of the following three topics.',
        text: 'Write a note on any two of the following three topics. Refer, where appropriate, to relevant case law: (a) The Rule in Hastings bass; (b) The circumstances in which a trustee may be removed from his or her position; (c) The Rule in Strong v Bird.',
      },
      {
        examType: 'Essay',
        description: 'Annie died recently.',
        text: "Annie died recently. According to her Will, the residue of her estate is to be held in trust for so long as the law allows: a. to promote ice skating among the public in the Republic of Ireland; b. to construct and maintain a monument to the memory of the great Irish skater. Noeline Wall who died some years ago; c. to improve the facilities of the Dublin Ice Skating Club (DISC). Geraldine has been appointed as the executor of Annie's estate. She has done an 'Introduction to Law' course and is aware of charitable and non-charitable purpose trusts and wonders if these bequests fall under any of those headings. DISC is a Sports Club which owns and operates 2 ice skating rinks, changing rooms, a dining lounge, a bar, and other facilities for use by its members. Annual memberships due Jews are €2500 per adult and €1500 per child. Advised Geraldine.",
      },
      {
        examType: 'Essay',
        description:
          '"To prevent the jurisdiction of the Courts being stultified, equity has invented the quia timet injunction, that is an…',
        text: '"To prevent the jurisdiction of the Courts being stultified, equity has invented the quia timet injunction, that is an action for an injunction to prevent an apprehended legal wrong, though no one has occurred at present". Per Lord Upjohn in Redland Bricks v Morris [1970] AC 652 at 664. Discuss the considerations to which a court dealing with an application for a quia timet injunction will have regard.',
      },
      {
        examType: 'Problem',
        description: 'She was a widow and is survived by four children. Succession.',
        text: "Mary died last month. She died testate. She was a widow and is survived by four children. Helen is the youngest of these four children. Helen qualified as a doctor and practiced that profession for a number of years. Although she was doing very well and had indeed been offered a prestigious promotion, Helen abandoned her job in order to help her mother, then recently widowed, develop the family businesses, the developers and construction engineers. Helen also lived at home with her mother and cared for her during bouts of illness on her mother's part. Approximately two years ago, Helen decided that she wished to buy a house for herself but when her mother, Mary, heard this, she became upset. Mary asked her to stay with her at home and asked \"why would you want to get yourself a house? Then you would have two houses as you know that this house and all I have is yours when I die\". After that conversation with her mother, Helen decided not to buy herself a house but instead began an extensive redecoration of the family home on the basis that she would inherit it after her mother's death. No costs were incurred when redecorating due to the contacts she and her mother had in various construction and interior decorating businesses. Helen has now learned, however, that Mary's Will leaves her estate, which includes the family home and the property development and construction engineering businesses, to her four children in equal shares. She seeks your advice. (Students need not advise in relation to any possible reliefs under their succession act, 1965).",
      },
      {
        examType: 'Essay',
        description: '"The mere promise of a gift creates no legal obligation.',
        text: '"The mere promise of a gift creates no legal obligation. A Donatio Mortus Causa is an exception to that basic rule in that it allows the donor to promise the donee that he or she will receive a gift when the donor dies. That promise is binding, and the gift is completed when the donor dies, even though the donor never transferred ownership of the property to the donee". Making a Will, The Law Commission of England and Wales (2017), at p226. Discuss the criteria necessary to create a valid Donatio Mortus Causa.',
      },
      {
        examType: 'Essay',
        description: 'Jim died recently.',
        text: "Jim died recently. He had lived all of his life in the small village of Ardaghee and was survived by his wife, Mary. He had one daughter, Bridget, who predeceased him as she had died tragically in a car accident some years ago. Bridget had always loved sport and was an active member of the Ardaghee Sports Association. Jim died testate and, in his Will, he bequeathed all of his property to his wife Mary, save for a specific bequest in the residuary clause in which he bequeathed the residue of his estate; \"to the Bridget Murphy fund, to be administered by the board of the Ardaghee Sports Association for the promotion of sport in the two primary schools in my home village of Ardaghee. Jim and Mary never had any interest in sport themselves but, wanting to do something in Bridget's memory, intended to arrange for the setting up of a fund to promote sports in their village. They had intended to hold fundraising events during Jim's lifetime and provide the monies raised to the fund but unfortunately, they never actually took many steps in this regard and the Bridget Murphy fund was never established. Jim's brother, Peter, is the executor of Jim's estate and he has approached you asking how the residue of the estate ought to be administered. He is anxious to determine whether the residuary bequest is a charitable one and if so, how it can be administered, as the Bridget Murphy fund never existed. Advised Peter as appropriate",
      },
      {
        examType: 'Essay',
        description:
          'In recent years, the Irish courts have given considerable attention to the question of whether or not, when one family…',
        text: 'In recent years, the Irish courts have given considerable attention to the question of whether or not, when one family member guarantees a business loan for another member of his or her family, the lending bank is obliged to take appropriate steps to ensure that the family member acting as guarantor has received independent legal advice prior to the execution of the guarantee. Beginning with the decision in Ulster Bank v Fitzgerald [2001] IEHC 159, consider the law in Ireland regarding the role of banks in ensuring that independent legal advice is given to a family member when he/she guarantees a business loan for another family member. To what extent have the Irish courts adopted the principles set out in Royal Bank of Scotland v Etridge (No. 2) [2002] 2 AC 773?',
      },
      {
        examType: 'Essay',
        description:
          'Professor murphy, who died recently, was a leading academic historian and a committed socialist.',
        text: 'Professor murphy, who died recently, was a leading academic historian and a committed socialist. That commitment is reflected in three legacies in his Will bequeathed to the executor appointed under that Will on trust for a number of distinct purposes. In the first bequest, Professor Murphy has directed that the sum of €1,000,000 be used by the executor in such manner as he sees fir for the improvement of the living conditions of the working classes in a number of specified Irish towns adversely affected by the closure of multinational companies. In the second bequest, Professor murphy directed that the sum of €500,000 be held by the executor on trust for the Irish branch of the Marx/Engels institute, a body which seeks to advance socialist politics in this State. Finally, the Will provides €400,000 shall be used by the executor for the promotion of a political debate among the Irish public, stating specifically that those monies shall not be used to advance any cause or ideology but shall merely seek to provide a neutral forum for public debate on political debate. Discuss, with reference to relevant case law and statutory provisions, whether the above bequests constitute valid charitable trusts.',
      },
      {
        examType: 'Essay',
        description:
          'Discuss, with reference to relevant case law, the criteria necessary for the creation of a valid gift by way of…',
        text: 'Discuss, with reference to relevant case law, the criteria necessary for the creation of a valid gift by way of donation mortis causa.',
      },
      {
        examType: 'Problem',
        description:
          'In recent years, the Irish courts have begun to adopt a less restrictive… Damages, Injunction.',
        text: 'Answer (A) or (B) a. In recent years, the Irish courts have begun to adopt a less restrictive approach to the requirement that a plaintiff seeking a Mareva injunction must show that there is a real risk that the defendant will dispose of his or her assets for the purpose of preventing the plaintiff from recovering damages. This approach will help plaintiffs striving to recover large debts from debtors, making Mareva injunctions a very real and powerful tool in debt recovery litigation. Discuss the above statement, supporting your answer with reference to relevant case law. OR b. "It is well established that the ordinary test of a fair case to be tried is not sufficient to meet the first leg of the test for the grant of an interlocutory injunction where the injunction sought is in effect mandatory. In such a case it is necessary for the applicant to show at least that he has a strong case that is likely to succeed at the hearing of the action." Per Fennelly J in Lingham v Health Service Executive [2006] ELR 137 at 140. Despite the above statement, there is still some uncertainty regarding the test to be applied in this jurisdiction in the context of mandatory interlocutory relief, as some judgements do appear to endorse the Campus Oil standards in this context. Consider the relevant Irish case law, showing in your answer evidence of the different approaches adopted by the Courts in relation to this test.',
      },
      {
        examType: 'Problem',
        description:
          'Mary and Nora are the executrixes of the Will of their Uncle Jimmy, which… Trustee.',
        text: "Mary and Nora are the executrixes of the Will of their Uncle Jimmy, which contains a number of detailed bequests. In his Will, Jimmy has provided that the two women shall hold the family grocery store on trust for the benefit of his widow and their three children. Mary is very anxious to proceed with her duties as trustee and takes a very keen interest in the running of the store, scrutinising the accounts and maintaining good contacts with the shop's suppliers. Nora, however, is a successful businesswoman in her own right and adopts a more hands-off approach to the running of the store as she is too busy with her own career. She has not come to any of the meetings arranged by Mary to discuss the future of the store but has expressed the view to Mary that she does not think the store is a viable prospect in the long term and suggested that it ought to be sold and the monies invested in stocks and shares. Some months after Jimmy's death, Nora opened up her own grocery store some fifty yards from the above store, using contacts she had obtained from her access to the records as forwarded to her by Mary. As Nora is selling goods at a discount, the trust store has begun to show considerable decline in profit. Jimmy also bequeathed €100,000 to Mary and Nora on trust for his eldest child for life and thereafter to Jimmy's grandchild. The Will provides that the two trustees shall have an absolute discretion in relation to the investment of the monies. Mary is a committed environmentalist and decides, without discussing the matter with Nora, to invest the monies in environmentally sustainable projects. Unfortunately, Mary, though well-intentioned, fails to research the potential for, and likelihood of, economic growth of these investments. The investments perform very badly. Advise the beneficiaries under the two trusts. Make reference, where appropriate to relevant case law and statutory provisions.",
      },
      {
        examType: 'Essay',
        description: 'Answer any [two]{.underline} of the following three questions.',
        text: 'Answer any [two]{.underline} of the following three questions. Refer to case law, where appropriate; a. The rule in Strong v Bird (1874) LR 18 Eq 315; b. The equitable remedy of rectification in the context of unilateral mistake; c. The presumption of advancement.',
      },
      {
        examType: 'Problem',
        description:
          'Harry, a solicitor, was unmarried, and had been having a relationship for… Advise Aoife.',
        text: 'Harry, a solicitor, was unmarried, and had been having a relationship for many years with Aoife. While he wishes to make provisions for her in the event of his death, h did not wish to do so in a manner which would disclose the said relationship on the face of his Will. Thus, when executing his Will some three years ago, he devised his leasehold interest in an apartment "to Jack and Mary as tenants in common in full confidence that they will use it for the purpose as disclosed by me to them". Some weeks later, Harry, in the course of a conversation with his friend Jack, said to Jack that "I am only leaving the apartment to Mary and yourself on the understanding that you will hold it for Aoife\'s benefit." Jack assured Harry that he would comply with his wishes but failed to ever mention this matter to Mary. Harry died some weeks ago. Mary is now claiming entitlement to half of the apartment. Advise Aoife.',
      },
      {
        examType: 'Essay',
        description:
          'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects"…',
        text: 'Discuss, with reference to relevant case law, the law regarding the requirement of "certainty of objects" [and]{.underline} one of the other two "certainties" which must be deemed to exist in order to ensure the creation of a valid express trust.',
      },
    ],
  },
  {
    subject: 'Equity Law',
    year: 2023,
    questions: [
      {
        examType: 'Essay',
        description: 'Answer (a) [and]{.underline} (b).',
        text: 'Answer (a) [and]{.underline} (b). Both parts carry equal marks. a. In Re Basham [1986] 1 WLR 1498, the Court noted that the expenditure of money by one person on another person\'s property was "not the only kind of detriment that gives rise to a proprietary estoppel". Discuss the above. [And]{.underline} b. Consider the role which the concept of unconscionability plays in the modern doctrine of proprietary estoppel.',
      },
      {
        examType: 'Essay',
        description: 'Catherine, a self-made millionaire, has recently retired.',
        text: 'Catherine, a self-made millionaire, has recently retired. She is extremely conscious of how fortunate she has been in her life and now wishes to help certain members of her family who have struggled to meet their day-to-day living expenses. She intends to create a trust in favour of her "brothers and sisters who are experiencing economic hardship". She has also decided to make a generous donation to her beloved sports association, the Phoenix Polo Club, to which she has acted as treasurer since her recent retirement. This club is an exclusive club with approximately 500 members and a small but committed staff. The club is non-profit making as the fees are invested in the club to maintain the grounds and to care for the horses. Catherine proposes creating a trust in favour of the club for the purpose of paying for necessary gym equipment to ensure that the club members obtain optimum fitness. She also proposes specifying in the trust document that 20% of the trust fund be used to permit the children of poor families from the area in which the club is situate to avail of healthy recreation by partaking in her beloved sport free of charge for two hours each week. Catherine approaches you, asking whether her intended trusts will obtain charitable status.',
      },
      {
        examType: 'Essay',
        description:
          '"In exercising his discretion, a trustee must act honestly and must use as much diligence as a prudent man of business…',
        text: '"In exercising his discretion, a trustee must act honestly and must use as much diligence as a prudent man of business would exercise in dealing with his own private affairs; in selecting an investment he must take as much care as a prudent man would take In making an investment for the benefit of persons for whom he felt morally bound to provide, Businessmen of ordinary prudence may, and frequently do, select investments which are more or less of a speculative character; but it is the duty of a trustee to confine himself not only to the class of investment which are permitted by the settlement or by statute, but to avoid all such investments of that class as are attended with hazard." Per Murphy J. in Stacey v Branch [7995] 2 LRM 136. Consider the law regarding the duty of trustees in relation to the investment of trust property.',
      },
      {
        examType: 'Problem',
        description:
          'Bawled Tyres Limited is an Irish company which supplies Alfie Romeo Ltd… Damages, Company.',
        text: 'Bawled Tyres Limited is an Irish company which supplies Alfie Romeo Ltd with specialist tyres for use in grand-prix racing. Although Alfie Romeo Ltd is an Italian company, it has branches in a number of Member States of the European Union, including Ireland, and in the United States. Two disputes have arisen over the years between Bawled Tyres Ltd and Aifie Romeo Ltd. and all have now found their way into the courts of various jurisdictions. One case instituted by Bawled Tyres Ltd. and which is expected to come before the Irish courts in the near future, stems from a refusal on the part of Alfie Romeo Ltd. to pay for a consignment of tyres from Bawled Tyres Ltd. as the former alleges that the tyres did not meet the standard specified in the contract for sale. Damages of 500,000 Euro are sought by Bawled Tyres Ltd. in that action. In the second case, judgement has already been given against Alfie Romeo Limited by the Italian courts in a matter between the two companies. [n that case, also instituted by Bawlec Tyres Ltd., it was successfully argued that Alfie Romeo Ltd. Had also breached the terms of a different contract between the parties for the exclusive provision by Bawled Tyres Ltd. to Alfie Romeo Ltd. of a unique design of tyre. The terms of that contract indicated that Italian law should govern any dispute arising pursuant thereto and it was furthermore indicated that the matter should be resolved in the courts of Florence. Damages to the value of €2 million have been awarded to Bawled Tyres Ltd by a Florentine Court but the judgment has not yet been enforced. Alfie Romeo Ltd. have not been faring well in grand prix in recent years and the company is now fn severe financial difficulty. It is rumoured in tyre-manufacturing circles that the company intends to streamline its operations by, amongst other things, closing down a number of its smaller offices, of which the Irish office is an exarnple. The Irish office has a number of Irish bank accounts but, reflecting the poor state of the business, the total amount in all of those Irish accounts has not exceeded 1 million Euro for at least one year. The directors of Bawled Tyres Ltd are concerned that the trish branch of Alfie Romeo Limited will clase down soon and are anxious that their company will thus not be in a position to recover either of the sums in question. Advise Bawled Tyres Limited.',
      },
      {
        examType: 'Essay',
        description: 'In N.A.D.',
        text: 'In N.A.D. v. T.D. Barron J. stated:- "The constructive trust is imposed by operation of law independently of intention in order to satisfy the demands of justice and good conscience. Its imposition Is dependent upon the conduct of the person upon whom the trust is Imposed and prevents him from acting in breach of good faith, There is no fixed set of circumstances in which such a trust is imposed," In the subsequent Judgment of Gilligan } in fn Re Varko Ltd, in Liquidation {2012} IEHC 278, the Court noted that this "new model constructive trust\' has met with limited approval in this jurisdiction. Discuss the case law of the Irish courts in which the new model constructive trust has been considered.',
      },
      {
        examType: 'Essay',
        description: 'John, a bachelor, died suddenly last week.',
        text: "John, a bachelor, died suddenly last week. He died testate, John does not have any children and is survived by three brothers. He was closest to Patrick, his youngest brother. Approximately six months ago, John told Patrick that he wished to transfer his leasehold interest in his shop to Patrick there and then, as he, John, wished to take life at an easier pace and enjay himself while he was still in good health. John made it clear to Patrick that it was a gift which was to take effect immediately and was not to be postponed until his death. John did not, however, take any steps to complete the gift and no lease was executed in order to give effect thereto. The shop remained open and the staff previously employed by John ran the business unti! his death, Patrick did not take any part in running the shop before John's death and incurred no expenses in relation to same. John appointed Patrick as executor in his will. He devised his leasehold interest to his three brothers equally. Answer (a) [and]{.underline} (b). [Part (g) corries 12 morks ond Port (b) corries 8 marks,]{.underline} a. Patrick asks you to clarify whether he may take the leasehold interest in the shop himself or whether he is obliged to share that interest with his two other brothers equally. [and:]{.underline} b. Indicate, giving reasons for your answer, whether your advices would be different if John's Will were invalid and he therefore died intestate. Note that John's parents have pre-deceased him and his three brothers are his next of kin.",
      },
      {
        examType: 'Essay',
        description: 'Write an essay on any [TWO]{.underline} of the following THREE topics.',
        text: 'Write an essay on any [TWO]{.underline} of the following THREE topics. a. The Principles governing the distribution of surplus funds upon the dissolution of an unincorporated association; b. The doctrine of satisfaction; c. The circumstances in which non-charitable purpose trusts may be enforced,',
      },
      {
        examType: 'Problem',
        description:
          'In 2019, Kate Murphy, a developer, entered into a loan agreement with Get… Company.',
        text: 'In 2019, Kate Murphy, a developer, entered into a loan agreement with Get Rich Quick Ltd., an investment company, for the sum of €10,000,000 for the purpase of enabling her to build a block of apartments in the midlands and on the understanding that Get Rich Quick Ltd. would at all times retain the beneficial interest in the loan monies, Kate gratefully took the money and, as agreed with Get Rich Quick Ltd., lodged it in a bank account opened specifically for that purpose. She ran into business difficulties, however, and never actually built the apartments. She has a number of creditors whom she has not repaid. Due to her ongoing inability to meet her debts, she was declared bankrupt last month. , Get Rich Quick Ltd. is anxious to secure the return of the monies that it forwarded by loan to Kate. It is aware that she has many creditors but asks you if the specific circumstances of its loan to her may, despite the lack of any specific wording referring to a "trust", create any form of trust in its favour? Advise Get Rich Quick Ltd.',
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
