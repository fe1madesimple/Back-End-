// upload-to-cloudinary.js
// Run from: C:\Users\User\Desktop\fe-1-backend\server\
// Command: node upload-to-cloudinary.js
//
// Uploads all podcast audio files to the client's Cloudinary account
// and outputs a JSON mapping file for DB update

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'db3waebh7',
  api_key: '878231689173552',
  api_secret: 'VBnmL8vR1Ua9YlMVWzCdGC-CWI8',
});

// Folder mapping — local folder name → Cloudinary folder path
const FOLDER_MAP = [
  {
    localFolder: 'CRIMINAL LAW - Eleven Labs',
    cloudinaryFolder: 'fe1/podcasts/criminal-law',
  },
  {
    localFolder: 'CONTRACT LAW - Eleven Labs',
    cloudinaryFolder: 'fe1/podcasts/contract-law',
  },
  {
    localFolder: 'CONSTITUTIONAL LAW - Eleven Labs',
    cloudinaryFolder: 'fe1/podcasts/constitutional-law',
  },
  {
    localFolder: 'COMPANY LAW - Eleven Labs',
    cloudinaryFolder: 'fe1/podcasts/company-law',
  },
  {
    localFolder: 'EQUITY Eleven Labs',
    cloudinaryFolder: 'fe1/podcasts/equity',
  },
  {
    localFolder: 'EU LAW - Eleven Labs',
    cloudinaryFolder: 'fe1/podcasts/eu-law',
  },
  {
    localFolder: 'PROPERTY LAW - Eleven Labs',
    cloudinaryFolder: 'fe1/podcasts/property-law',
  },
  {
    localFolder: 'TORT LAW - Eleven Labs',
    cloudinaryFolder: 'fe1/podcasts/tort-law',
  },
  {
    localFolder: 'BONUS EPISODES - Eleven Labs',
    cloudinaryFolder: 'fe1/podcasts/bonus',
  },
];

const AUDIO_EXTENSIONS = ['.mp3', '.m4a'];

async function uploadFile(filePath, cloudinaryFolder, filename) {
  const nameWithoutExt = path.basename(filename, path.extname(filename));
  const publicId = `${cloudinaryFolder}/${nameWithoutExt}`;

  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video', // Cloudinary uses 'video' for audio files
    public_id: publicId,
    overwrite: true,
    use_filename: false,
  });

  return {
    filename,
    publicId: result.public_id,
    audioUrl: result.secure_url,
    duration: result.duration ? Math.round(result.duration) : null,
  };
}

async function main() {
  console.log('\n🚀 Starting Cloudinary upload to client account (db3waebh7)...\n');

  const results = [];
  const failed = [];
  let totalFiles = 0;
  let uploadedCount = 0;

  // Count total files first
  for (const { localFolder } of FOLDER_MAP) {
    if (!fs.existsSync(localFolder)) continue;
    const files = fs
      .readdirSync(localFolder)
      .filter((f) => AUDIO_EXTENSIONS.includes(path.extname(f).toLowerCase()));
    totalFiles += files.length;
  }

  console.log(`📁 Total files to upload: ${totalFiles}\n`);

  for (const { localFolder, cloudinaryFolder } of FOLDER_MAP) {
    if (!fs.existsSync(localFolder)) {
      console.log(`⚠️  Folder not found, skipping: ${localFolder}`);
      continue;
    }

    const files = fs
      .readdirSync(localFolder)
      .filter((f) => AUDIO_EXTENSIONS.includes(path.extname(f).toLowerCase()))
      .sort();

    console.log(`\n📂 ${localFolder} (${files.length} files)`);
    console.log(`   → Uploading to: ${cloudinaryFolder}`);

    for (const filename of files) {
      const filePath = path.join(localFolder, filename);
      uploadedCount++;

      try {
        process.stdout.write(`   [${uploadedCount}/${totalFiles}] ${filename} ... `);
        const result = await uploadFile(filePath, cloudinaryFolder, filename);
        results.push(result);
        console.log(`✅ ${result.audioUrl}`);
      } catch (err) {
        console.log(`❌ FAILED: ${err.message}`);
        failed.push({ filename, localFolder, error: err.message });
      }
    }
  }

  // Write results to JSON
  const outputFile = 'cloudinary-upload-results.json';
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));

  console.log('\n');
  console.log('═'.repeat(60));
  console.log('UPLOAD COMPLETE');
  console.log('═'.repeat(60));
  console.log(`  Total uploaded:  ${results.length}`);
  console.log(`  Failed:          ${failed.length}`);
  console.log(`  Results saved:   ${outputFile}`);
  console.log('═'.repeat(60));

  if (failed.length > 0) {
    console.log('\n❌ Failed files:');
    failed.forEach((f) => console.log(`   ${f.localFolder}/${f.filename}: ${f.error}`));
  }

  console.log(
    '\n✅ Next step: copy cloudinary-upload-results.json to the VM and run the DB update script.\n'
  );
}

main().catch(console.error);
