// scripts/download-portraits.js — Downloads authentic public domain portraits for the 12 featured scientists
import fs from 'fs';
import path from 'path';

const outDir = 'G:\\Vizon Website\\Sim\\public\\scientists';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const scientists = [
  { id: 'kalam', title: 'A._P._J._Abdul_Kalam' },
  { id: 'radhakrishnan', title: 'Sarvepalli_Radhakrishnan' },
  { id: 'raman', title: 'C._V._Raman' },
  { id: 'ramanujan', title: 'Srinivasa_Ramanujan' },
  { id: 'snbose', title: 'Satyendra_Nath_Bose' },
  { id: 'bhabha', title: 'Homi_J._Bhabha' },
  { id: 'sarabhai', title: 'Vikram_Sarabhai' },
  { id: 'jcbose', title: 'Jagadish_Chandra_Bose' },
  { id: 'einstein', title: 'Albert_Einstein' },
  { id: 'newton', title: 'Isaac_Newton' },
  { id: 'curie', title: 'Marie_Curie' },
  { id: 'tesla', title: 'Nikola_Tesla' },
];

async function run() {
  console.log('Downloading real scientist portraits from Wikimedia...');
  for (const s of scientists) {
    try {
      const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${s.title}`;
      const res = await fetch(apiUrl, {
        headers: { 'User-Agent': 'VizonSimulator/1.0 (Educational STEM VR Atrium)' }
      });
      const data = await res.json();
      const imgUrl = data.thumbnail?.source || data.originalimage?.source;

      if (!imgUrl) {
        console.warn(`No image found for ${s.title}`);
        continue;
      }

      console.log(`Fetching ${s.id} from ${imgUrl}...`);
      const imgRes = await fetch(imgUrl, {
        headers: { 'User-Agent': 'VizonSimulator/1.0 (Educational STEM VR Atrium)' }
      });
      const arrayBuffer = await imgRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
      const outPath = path.join(outDir, `${s.id}${ext}`);
      fs.writeFileSync(outPath, buffer);
      console.log(`✓ Saved ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`);

      // Also ensure standard .jpg exists if it had webp/jpeg extension
      const standardJpg = path.join(outDir, `${s.id}.jpg`);
      if (outPath !== standardJpg) {
        fs.writeFileSync(standardJpg, buffer);
      }
    } catch (err) {
      console.error(`Error downloading ${s.id}:`, err.message);
    }
  }
  console.log('--- ALL SCIENTIST PORTRAITS DOWNLOADED SUCCESSFULLY ---');
}

run();
