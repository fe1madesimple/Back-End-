// scripts/fix-playlist.ts
import { prisma } from '@/shared/config';

async function main() {
  console.log('\n🔧 Starting playlist fix...\n');

  // ── 1. DELETE DUPLICATES ──────────────────────────────────────────────────
  console.log('🗑️  Deleting duplicate records...');
  await prisma.podcast.deleteMany({
    where: {
      id: { in: ['cmmzplu400002bpwitckto7ig', 'cmmzplu4m000dbpwin0c5ldrc'] },
    },
  });
  console.log('✅ Duplicates deleted\n');

  // ── 2. FIX EQUITY BONUS LESSON ───────────────────────────────────────────
  console.log('📝 Fixing Equity Bonus Lesson...');
  await prisma.podcast.update({
    where: { id: 'cmmzplu8h002vbpwiooiz9d3o' },
    data: {
      title: 'Breach of Trust: Personal Liability and Defences',
      notes:
        'A trustee who acts in breach of trust is personally liable to restore the trust fund to the position it would have been in had the breach not occurred. This episode covers how loss is measured following Knapp v Knapp, the joint and several liability of co-trustees, and the four key defences available to a trustee: court relief under section 62 of the Trustee Act 1893, consent and concurrence of beneficiaries, the rule in Saunders v Vautier, and the six-year limitation period under section 43 of the Statute of Limitations 1957.',
    },
  });
  console.log('✅ Equity bonus lesson fixed\n');

  // ── 3. RESOLVE MISSING ID ────────────────────────────────────────────────
  const transferOfShares = await prisma.podcast.findFirst({
    where: { publicId: 'fe1/podcasts/company-law/Module_9_Lesson_9_2' },
    select: { id: true },
  });

  if (!transferOfShares) {
    throw new Error('Could not find Transfer of Shares podcast — check publicId');
  }

  // ── 4. REORDER ALL SUBJECTS ───────────────────────────────────────────────
  console.log('📋 Reordering all subjects...');

  const updates: Array<{ id: string; order: number }> = [
    // ── CRIMINAL LAW (27 episodes) ──
    { id: 'cmmzplu4d0008bpwirr1v0nhf', order: 1 },
    { id: 'cmmzplu4f0009bpwiohnmth2g', order: 2 },
    { id: 'cmmzplu4h000abpwi8nvrk54e', order: 3 },
    { id: 'cmmzplu4i000bbpwid5cs38zl', order: 4 },
    { id: 'cmmzplu4k000cbpwi5nr8rzbk', order: 5 },
    { id: 'cmmzplu4n000ebpwiryamhrec', order: 6 },
    { id: 'cmmzplu4p000fbpwimev5j3uc', order: 7 },
    { id: 'cmmzplu4r000gbpwivhsaz01p', order: 8 },
    { id: 'cmmzplu4t000hbpwi657iz339', order: 9 },
    { id: 'cmmzplu4u000ibpwi15noa6jp', order: 10 },
    { id: 'cmmzplu4w000jbpwinhj3olxe', order: 11 },
    { id: 'cmmzplu4y000kbpwicp1rcv63', order: 12 },
    { id: 'cmmzplu50000lbpwi2xw5qf4y', order: 13 },
    { id: 'cmmzplu51000mbpwi1zthiunb', order: 14 },
    { id: 'cmmzplu53000nbpwi5w580rez', order: 15 },
    { id: 'cmmzplu54000obpwizpeqf2w8', order: 16 },
    { id: 'cmmzplu56000pbpwiq9ns4o8u', order: 17 },
    { id: 'cmmzplu57000qbpwima2bc9af', order: 18 },
    { id: 'cmmzplu59000rbpwivlvy58vi', order: 19 },
    { id: 'cmmzplu5a000sbpwigmko1lne', order: 20 },
    { id: 'cmmzplu3u0000bpwioker0fwt', order: 21 },
    { id: 'cmmzplu3y0001bpwic71p2u9w', order: 22 },
    { id: 'cmmzplu420003bpwiomy2mzpv', order: 23 },
    { id: 'cmmzplu440004bpwiq7vuv76s', order: 24 },
    { id: 'cmmzplu460005bpwiqw3ea5tr', order: 25 },
    { id: 'cmmzplu480006bpwij78l59w4', order: 26 },
    { id: 'cmmzplu4b0007bpwicnrt7eeh', order: 27 },

    // ── TORT LAW (33 episodes) ──
    { id: 'cmmzplu71001xbpwitye7nzjc', order: 1 },
    { id: 'cmmzplu73001ybpwikqlbbrxk', order: 2 },
    { id: 'cmmzplu74001zbpwila33rdok', order: 3 },
    { id: 'cmmzplu760020bpwir8e6zeir', order: 4 },
    { id: 'cmmzplu770021bpwillruyvib', order: 5 },
    { id: 'cmmzplu790022bpwi2j6oen8t', order: 6 },
    { id: 'cmmzplu7a0023bpwirbe7wohz', order: 7 },
    { id: 'cmmzplu7c0024bpwil6bxso6y', order: 8 },
    { id: 'cmmzplu7d0025bpwi6z4vl4g1', order: 9 },
    { id: 'cmmzplu7e0026bpwidmlcos2t', order: 10 },
    { id: 'cmmzplu7g0027bpwiylowhk19', order: 11 },
    { id: 'cmmzplu7i0028bpwi5sabylsk', order: 12 },
    { id: 'cmmzplu7j0029bpwiwkdgmhx9', order: 13 },
    { id: 'cmmzplu7l002abpwi558pbwpc', order: 14 },
    { id: 'cmmzplu7m002bbpwikkacnag9', order: 15 },
    { id: 'cmmzplu7o002cbpwitjgewjmx', order: 16 },
    { id: 'cmmzplu7p002dbpwi9ii72wlh', order: 17 },
    { id: 'cmmzplu7r002ebpwihw6pcq32', order: 18 },
    { id: 'cmmzplu6e001ibpwib1t83pp1', order: 19 },
    { id: 'cmmzplu6f001jbpwi3uacp59b', order: 20 },
    { id: 'cmmzplu6h001kbpwiheewfv9s', order: 21 },
    { id: 'cmmzplu6i001lbpwi8l0o24v1', order: 22 },
    { id: 'cmmzplu6k001mbpwiv918gb8v', order: 23 },
    { id: 'cmmzplu6l001nbpwifoivl7pj', order: 24 },
    { id: 'cmmzplu6n001obpwizebdwvc8', order: 25 },
    { id: 'cmmzplu6o001pbpwi3ehz4ath', order: 26 },
    { id: 'cmmzplu6q001qbpwixutlcqup', order: 27 },
    { id: 'cmmzplu6s001rbpwia5jj6v0b', order: 28 },
    { id: 'cmmzplu6t001sbpwifebz2ooy', order: 29 },
    { id: 'cmmzplu6v001tbpwic2l8sgcd', order: 30 },
    { id: 'cmmzplu6x001ubpwik7ulydot', order: 31 },
    { id: 'cmmzplu6y001vbpwi6lj73z8t', order: 32 },
    { id: 'cmmzplu70001wbpwiwf0lffqi', order: 33 },

    // ── EQUITY (17 episodes) ──
    { id: 'cmmzplu7t002fbpwim6aksa8s', order: 1 },
    { id: 'cmmzplu7u002gbpwil2c07a8g', order: 2 },
    { id: 'cmmzplu7w002hbpwiixeev2fr', order: 3 },
    { id: 'cmmzplu88002pbpwicq07vvd7', order: 4 },
    { id: 'cmmzplu89002qbpwii2nl6pun', order: 5 },
    { id: 'cmmzplu7x002ibpwi7wv9g0xk', order: 6 },
    { id: 'cmmzplu7z002jbpwijgcwrb1q', order: 7 },
    { id: 'cmmzplu80002kbpwipy1a11zw', order: 8 },
    { id: 'cmmzplu82002lbpwi33g1oyir', order: 9 },
    { id: 'cmmzplu83002mbpwi2m9q4ax7', order: 10 },
    { id: 'cmmzplu85002nbpwixfqffb1k', order: 11 },
    { id: 'cmmzplu8b002rbpwikvxkie1j', order: 12 },
    { id: 'cmmzplu8d002sbpwi6fa1xmmt', order: 13 },
    { id: 'cmmzplu8h002vbpwiooiz9d3o', order: 14 },
    { id: 'cmmzplu8e002tbpwivhxtw216', order: 15 },
    { id: 'cmmzplu8g002ubpwi5iz9sh80', order: 16 },
    { id: 'cmmzplu86002obpwigtthpidb', order: 17 },

    // ── PROPERTY LAW (37 episodes) ──
    { id: 'cmmzplu8s0032bpwi2dus34nf', order: 1 },
    { id: 'cmmzplu8u0033bpwihie65k1b', order: 2 },
    { id: 'cmmzplu8v0034bpwi0g5kpu62', order: 3 },
    { id: 'cmmzplu8x0035bpwik2ubc0g5', order: 4 },
    { id: 'cmmzplu8y0036bpwit0qjkii2', order: 5 },
    { id: 'cmmzplu900037bpwi80k49vk1', order: 6 },
    { id: 'cmmzplu910038bpwijj9keb06', order: 7 },
    { id: 'cmmzplu930039bpwilj0atay0', order: 8 },
    { id: 'cmmzplu94003abpwifgpo8qnm', order: 9 },
    { id: 'cmmzplu96003bbpwi1r3kzet5', order: 10 },
    { id: 'cmmzplu97003cbpwis4ug49zu', order: 11 },
    { id: 'cmmzplu99003dbpwih5no99r7', order: 12 },
    { id: 'cmmzplu9a003ebpwi6qsl5hon', order: 13 },
    { id: 'cmmzplu9c003fbpwij4xf7kcu', order: 14 },
    { id: 'cmmzplu9d003gbpwiaheyci9u', order: 15 },
    { id: 'cmmzplu9e003hbpwikzj3us61', order: 16 },
    { id: 'cmmzplu9g003ibpwixjyq9kr5', order: 17 },
    { id: 'cmmzplu9h003jbpwiqz99su23', order: 18 },
    { id: 'cmmzplu9j003kbpwiuj7yg2wd', order: 19 },
    { id: 'cmmzplu9k003lbpwixz1ybsea', order: 20 },
    { id: 'cmmzplu9l003mbpwi6j0dbly6', order: 21 },
    { id: 'cmmzplu9n003nbpwikz534kc5', order: 22 },
    { id: 'cmmzplu9o003obpwi9e4ihyf2', order: 23 },
    { id: 'cmmzplu9q003pbpwiwarzayj7', order: 24 },
    { id: 'cmmzplu9r003qbpwif3butebi', order: 25 },
    { id: 'cmmzplu9t003rbpwihc7a5vkm', order: 26 },
    { id: 'cmmzplu9u003sbpwifpadfkb3', order: 27 },
    { id: 'cmmzplu9w003tbpwia80fsy5d', order: 28 },
    { id: 'cmmzplu9y003ubpwit2576431', order: 29 },
    { id: 'cmmzplu9z003vbpwirsts2jt0', order: 30 },
    { id: 'cmmzplua1003wbpwi7crqr2bv', order: 31 },
    { id: 'cmmzplu8j002wbpwicq1hzoqz', order: 32 },
    { id: 'cmmzplu8k002xbpwiiu6x35qw', order: 33 },
    { id: 'cmmzplu8m002ybpwi8amqejr7', order: 34 },
    { id: 'cmmzplu8n002zbpwil1w4l4w9', order: 35 },
    { id: 'cmmzplu8p0030bpwiafl1s2i1', order: 36 },
    { id: 'cmmzplu8q0031bpwi2rv0nzp8', order: 37 },

    // ── EU LAW (43 episodes) ──
    { id: 'cmmzpluak0048bpwibg8y7nwa', order: 1 },
    { id: 'cmmzpluam0049bpwiqla86rud', order: 2 },
    { id: 'cmmzpluan004abpwidr7ab49p', order: 3 },
    { id: 'cmmzpluap004bbpwizn2avuuy', order: 4 },
    { id: 'cmmzpluar004cbpwiy73nb82d', order: 5 },
    { id: 'cmmzpluas004dbpwit7806wds', order: 6 },
    { id: 'cmmzpluat004ebpwi1jdbslnf', order: 7 },
    { id: 'cmmzpluav004fbpwihi11uksf', order: 8 },
    { id: 'cmmzpluax004gbpwiayr8bexn', order: 9 },
    { id: 'cmmzpluaz004hbpwihbkwwp26', order: 10 },
    { id: 'cmmzplub0004ibpwiqbsheo6m', order: 11 },
    { id: 'cmmzplub2004jbpwizza1dr6m', order: 12 },
    { id: 'cmmzplub3004kbpwi774nrghj', order: 13 },
    { id: 'cmmzplub4004lbpwiqxo8p3ra', order: 14 },
    { id: 'cmmzplub6004mbpwiqz5mppaf', order: 15 },
    { id: 'cmmzplub7004nbpwic6ltwf39', order: 16 },
    { id: 'cmmzplub9004obpwino9w35tn', order: 17 },
    { id: 'cmmzpluba004pbpwi41mcldoy', order: 18 },
    { id: 'cmmzplubc004qbpwiuftc2sji', order: 19 },
    { id: 'cmmzplube004rbpwibe0alwgd', order: 20 },
    { id: 'cmmzplubf004sbpwiw3wpee5f', order: 21 },
    { id: 'cmmzplubg004tbpwif69h3nmj', order: 22 },
    { id: 'cmmzplubi004ubpwiben5d0lv', order: 23 },
    { id: 'cmmzplubj004vbpwi1aale81n', order: 24 },
    { id: 'cmmzplubl004wbpwighff0iur', order: 25 },
    { id: 'cmmzplubm004xbpwiz3lxqsa3', order: 26 },
    { id: 'cmmzplubo004ybpwi2pchj62d', order: 27 },
    { id: 'cmmzplubp004zbpwiliex3rrn', order: 28 },
    { id: 'cmmzplubr0050bpwijglvothn', order: 29 },
    { id: 'cmmzplubs0051bpwihon76jtr', order: 30 },
    { id: 'cmmzplubu0052bpwies4zxku9', order: 31 },
    { id: 'cmmzplubw0053bpwi82o0bo23', order: 32 },
    { id: 'cmmzplua2003xbpwi74510zzb', order: 33 },
    { id: 'cmmzplua4003ybpwigm025kgn', order: 34 },
    { id: 'cmmzplua6003zbpwiluoajpo8', order: 35 },
    { id: 'cmmzplua80040bpwi0ycitnwe', order: 36 },
    { id: 'cmmzplua90041bpwibh6vnly8', order: 37 },
    { id: 'cmmzpluab0042bpwiqmopsqhw', order: 38 },
    { id: 'cmmzpluac0043bpwil5ztqi06', order: 39 },
    { id: 'cmmzpluae0044bpwihgargsdj', order: 40 },
    { id: 'cmmzpluaf0045bpwiv8qq6tmg', order: 41 },
    { id: 'cmmzpluah0046bpwimo5o3i1m', order: 42 },
    { id: 'cmmzpluai0047bpwicee9acxo', order: 43 },

    // ── CONSTITUTIONAL LAW (37 episodes) ──
    { id: 'cmmzplubx0054bpwid94sa4f0', order: 1 },
    { id: 'cmmzpluby0055bpwivwtrhkn5', order: 2 },
    { id: 'cmmzpluc00056bpwike32wzt7', order: 3 },
    { id: 'cmmzpluc10057bpwidxlohivw', order: 4 },
    { id: 'cmmzpluc30058bpwi3qb5dnws', order: 5 },
    { id: 'cmmzpluc40059bpwid5v9k4yt', order: 6 },
    { id: 'cmmzpluc6005abpwiznrofbfz', order: 7 },
    { id: 'cmmzpluc7005bbpwihe71rvr2', order: 8 },
    { id: 'cmmzpluc9005cbpwij2fzhfq0', order: 9 },
    { id: 'cmmzpluca005dbpwiagt33mvt', order: 10 },
    { id: 'cmmzplucb005ebpwic7qoop0e', order: 11 },
    { id: 'cmmzplucd005fbpwizfoxbwzn', order: 12 },
    { id: 'cmmzpluce005gbpwi6lkh2ody', order: 13 },
    { id: 'cmmzplucg005hbpwioxztbpn6', order: 14 },
    { id: 'cmmzpluch005ibpwi5x184bib', order: 15 },
    { id: 'cmmzplucj005jbpwidg3tc4x4', order: 16 },
    { id: 'cmmzplucl005kbpwi9863tio1', order: 17 },
    { id: 'cmmzplucm005lbpwif06i97v8', order: 18 },
    { id: 'cmmzpluco005mbpwircp6s8mc', order: 19 },
    { id: 'cmmzplucp005nbpwit8p24mxe', order: 20 },
    { id: 'cmmzplucr005obpwi2c7vj5xe', order: 21 },
    { id: 'cmmzpluct005pbpwi9bxs0gmg', order: 22 },
    { id: 'cmmzplucu005qbpwikctrfyks', order: 23 },
    { id: 'cmmzplucv005rbpwi5fyfthzf', order: 24 },
    { id: 'cmmzplucx005sbpwi1qmmdf3h', order: 25 },
    { id: 'cmmzplucy005tbpwi5v6icou6', order: 26 },
    { id: 'cmmzplud0005ubpwi1qd78n5o', order: 27 },
    { id: 'cmmzplud2005vbpwi5mahf85v', order: 28 },
    { id: 'cmmzplud3005wbpwi0w9x6tjf', order: 29 },
    { id: 'cmmzplud5005xbpwi28afip7n', order: 30 },
    { id: 'cmmzplud6005ybpwi2zr39gbt', order: 31 },
    { id: 'cmmzplud8005zbpwizc40qlus', order: 32 },
    { id: 'cmmzpluda0060bpwicji594jp', order: 33 },
    { id: 'cmmzpludb0061bpwige1ugbjv', order: 34 },
    { id: 'cmmzpludd0062bpwis659q53j', order: 35 },
    { id: 'cmmzplude0063bpwibfqfjwcj', order: 36 },
    { id: 'cmmzpludg0064bpwiyirago0g', order: 37 },

    // ── COMPANY LAW (30 episodes) ──
    { id: 'cmmzpludu006dbpwic5o29z6t', order: 1 },
    { id: 'cmmzpludv006ebpwim79azj3n', order: 2 },
    { id: 'cmmzpludx006fbpwivi1pcpg5', order: 3 },
    { id: 'cmmzpludz006gbpwip1iheuz6', order: 4 },
    { id: 'cmmzplue0006hbpwi1m88ouda', order: 5 },
    { id: 'cmmzplue2006ibpwism3b15py', order: 6 },
    { id: 'cmmzplue3006jbpwiwcadiv9h', order: 7 },
    { id: 'cmmzplue5006kbpwi3dbqmgt4', order: 8 },
    { id: 'cmmzplue6006lbpwirp35iook', order: 9 },
    { id: 'cmmzplue8006mbpwi3k8bfn3h', order: 10 },
    { id: 'cmmzplue9006nbpwihbblb8a4', order: 11 },
    { id: 'cmmzplueb006obpwicvqvd55t', order: 12 },
    { id: 'cmmzplued006pbpwi2gy6jw46', order: 13 },
    { id: 'cmmzpluee006qbpwi49x9t1f0', order: 14 },
    { id: 'cmmzplueg006rbpwiqe7chcwm', order: 15 },
    { id: 'cmmzplueh006sbpwiq9ehwo0h', order: 16 },
    { id: 'cmmzpluej006tbpwiqeqo05aj', order: 17 },
    { id: 'cmmzpluek006ubpwiitlojfdn', order: 18 },
    { id: 'cmmzpluem006vbpwi4u8vumvw', order: 19 },
    { id: 'cmmzplueo006wbpwit2mntncv', order: 20 },
    { id: 'cmmzpluep006xbpwiv651izsj', order: 21 },
    { id: transferOfShares.id, order: 22 }, // Transfer of Shares
    { id: 'cmmzpludi0065bpwiko8lab1s', order: 23 },
    { id: 'cmmzpludj0066bpwi4wkujhhi', order: 24 },
    { id: 'cmmzpludl0067bpwiupqden92', order: 25 },
    { id: 'cmmzpludm0068bpwiego1lejz', order: 26 },
    { id: 'cmmzpludo0069bpwivv2yxbbi', order: 27 },
    { id: 'cmmzpludp006abpwie0jf3bwd', order: 28 },
    { id: 'cmmzpludr006bbpwin25pxsw6', order: 29 },
    { id: 'cmmzpluds006cbpwi3x2wn1q2', order: 30 },
  ];

  for (const { id, order } of updates) {
    await prisma.podcast.update({
      where: { id },
      data: { order },
    });
  }

  console.log('\n✅ All done!\n');
  console.log('─────────────────────────────────────────');
  console.log('SUMMARY:');
  console.log('  Duplicates deleted:    2');
  console.log('  Equity bonus fixed:    1');
  console.log(`  Order updates applied: ${updates.length}`);
  console.log('─────────────────────────────────────────\n');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
