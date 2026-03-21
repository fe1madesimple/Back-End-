import * as cloudinary from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';

cloudinary.v2.config({
  cloud_name: 'dscjsf8ln',
  api_key: '592478813335756',
  api_secret: 'zzfYQjywUOiIcO3uDDErU-Nd3Dw',
});

const THUMBNAIL =
  'https://res.cloudinary.com/db3waebh7/image/upload/v1770073930/ideogram-v3.0_Minimalist_law_podcast_cover_Irish_legal_education_theme_single_golden_scale_ico-0_ojxvyo.png';

const SUBJECT_MAP: Record<string, { name: string; color: string }> = {
  'CRIMINAL LAW - Eleven Labs': { name: 'Criminal Law', color: '#E6027D' },
  'CONTRACT LAW - Eleven Labs': { name: 'Contract Law', color: '#FDC300' },
  'TORT LAW - Eleven Labs': { name: 'Tort Law', color: '#B38513' },
  'EQUITY Eleven Labs': { name: 'Equity', color: '#63C0F2' },
  'PROPERTY LAW - Eleven Labs': { name: 'Property Law', color: '#5F3EB5' },
  'EU LAW - Eleven Labs': { name: 'EU Law', color: '#009DDD' },
  'CONSTITUTIONAL LAW - Eleven Labs': { name: 'Constitutional Law', color: '#961C81' },
  'COMPANY LAW - Eleven Labs': { name: 'Company Law', color: '#8659FB' },
  'BONUS EPISODES - Eleven Labs': { name: 'Bonus', color: '#10B981' },
};

const ROOT = 'C:\\Users\\User\\Desktop\\fe-1-backend\\server';
const OUTPUT_PATH = path.join(ROOT, 'uploaded-podcasts.json');

// Delay helper — waits ms milliseconds
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function parseFileName(fileName: string, folderName: string) {
  if (fileName.startsWith('ElevenLabs_')) {
    const title = fileName
      .replace('ElevenLabs_', '')
      .replace(/_/g, ' ')
      .replace(/\.[^.]+$/, '')
      .trim();
    return {
      title,
      moduleNumber: null,
      lessonNumber: null,
      part: null,
      partSuffix: '',
      isBonus: true,
    };
  }

  const base = fileName.replace(/\.[^.]+$/, '');
  const lower = base.toLowerCase();
  const parts = base.split('_');

  const modIdx = parts.findIndex((p) => p.toLowerCase() === 'module');
  const lesIdx = parts.findIndex((p) => p.toLowerCase() === 'lesson');

  if (modIdx === -1 || lesIdx === -1) {
    return {
      title: base.replace(/_/g, ' '),
      moduleNumber: null,
      lessonNumber: null,
      part: null,
      partSuffix: '',
      isBonus: false,
    };
  }

  const moduleNumber = parseInt(parts[modIdx + 1]);
  const lessonNumber = parseInt(parts[lesIdx + 1]);
  const afterLesson = parts.slice(lesIdx + 2);

  let part: number | null = null;
  let partSuffix = '';

  if (afterLesson.length > 0) {
    const partNum = parseInt(afterLesson[0]);
    if (!isNaN(partNum)) {
      part = partNum;
      // Check for _b suffix
      if (afterLesson.length > 1 && afterLesson[1].toLowerCase() === 'b') {
        partSuffix = 'b';
      }
    }
  }

  const subject = SUBJECT_MAP[folderName]?.name ?? folderName;
  const partLabel = part ? ` (Part ${part}${partSuffix})` : '';
  const title = `${subject}: Module ${moduleNumber} Lesson ${lessonNumber}${partLabel}`;

  return { title, moduleNumber, lessonNumber, part, partSuffix, isBonus: false };
}

async function main() {
  // Load existing results if script was interrupted — resume from where we left off
  let results: any[] = [];
  if (fs.existsSync(OUTPUT_PATH)) {
    console.log('📂 Found existing uploaded-podcasts.json — resuming from last save...');
    results = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
    console.log(`   Already processed: ${results.length} files`);
  }

  const alreadyUploaded = new Set(results.map((r: any) => r.originalFile + '|' + r.folder));

  const folders = Object.keys(SUBJECT_MAP);
  let globalOrder = results.length + 1;

  for (const folderName of folders) {
    const folderPath = path.join(ROOT, folderName);

    if (!fs.existsSync(folderPath)) {
      console.log(`⚠ Folder not found: ${folderName}`);
      continue;
    }

    const files = fs
      .readdirSync(folderPath)
      .filter((f) => f.endsWith('.mp3') || f.endsWith('.m4a'))
      .sort();

    const subject = SUBJECT_MAP[folderName];
    const pending = files.filter((f) => !alreadyUploaded.has(f + '|' + folderName));

    if (pending.length === 0) {
      console.log(`✅ Already complete: ${folderName}`);
      continue;
    }

    console.log(`\n📁 Processing: ${folderName} (${pending.length} remaining of ${files.length})`);

    for (const file of pending) {
      const filePath = path.join(folderPath, file);
      const baseName = file.replace(/\.[^.]+$/, '');
      const publicId = `fe1/podcasts/${subject.name.toLowerCase().replace(/\s+/g, '-')}/${baseName}`;
      const parsed = parseFileName(file, folderName);

      console.log(`  ⬆ Uploading: ${file}`);

      try {
        const result = await cloudinary.v2.uploader.upload(filePath, {
          resource_type: 'video',
          public_id: publicId,
          overwrite: false,
          chunk_size: 6000000, // 6MB chunks — handles large files
        });

        results.push({
          fileName: baseName,
          originalFile: file,
          folder: folderName,
          subjectName: subject.name,
          subjectColor: subject.color,
          moduleNumber: parsed.moduleNumber,
          lessonNumber: parsed.lessonNumber,
          part: parsed.part,
          partSuffix: parsed.partSuffix,
          isBonus: parsed.isBonus,
          title: parsed.title,
          audioUrl: result.secure_url,
          publicId: result.public_id,
          duration: Math.round(result.duration ?? 0),
          thumbnail: THUMBNAIL,
          order: globalOrder++,
        });

        console.log(`  ✅ Done: ${parsed.title} (${Math.round(result.duration ?? 0)}s)`);
      } catch (err: any) {
        console.error(`  ❌ Failed: ${file} — ${err.message}`);
        results.push({
          fileName: baseName,
          originalFile: file,
          folder: folderName,
          subjectName: subject.name,
          subjectColor: subject.color,
          moduleNumber: parsed.moduleNumber,
          lessonNumber: parsed.lessonNumber,
          part: parsed.part,
          partSuffix: parsed.partSuffix,
          isBonus: parsed.isBonus,
          title: parsed.title,
          audioUrl: '',
          publicId: '',
          duration: 0,
          thumbnail: THUMBNAIL,
          order: globalOrder++,
          uploadError: err.message,
        });
      }

      // Save after EVERY file — never lose progress
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));

      // Wait 1.5 seconds between uploads to avoid rate limiting
      await delay(1500);
    }
  }

  console.log(`\n✅ All done — ${results.length} files processed`);
  console.log(`📄 JSON saved to: ${OUTPUT_PATH}`);
  console.log(`Successful: ${results.filter((r: any) => r.audioUrl).length}`);
  console.log(`Failed:     ${results.filter((r: any) => !r.audioUrl).length}`);
}

main().catch(console.error);
