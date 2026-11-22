// test-bose-fit.js — Test drawing JCBose with contain fit and photo-fitted gold frame
import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1640 });
  await page.goto('http://localhost:5173/scientists/jcbose.JPG');
  
  const dataUrl = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 1640;
    const ctx = canvas.getContext('2d');
    const W = 1400;
    const H = 1640;

    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#151923');
    bgGrad.addColorStop(0.4, '#10131c');
    bgGrad.addColorStop(0.8, '#0b0d14');
    bgGrad.addColorStop(1, '#07090e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Frame outer beveled border
    ctx.strokeStyle = '#262f3f';
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, W - 14, H - 14);

    // Gold hairline
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(22, 22, W - 44, H - 44);

    // Corner decorative brackets
    const bracketSize = 28;
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(26, 26, bracketSize, bracketSize);
    ctx.strokeRect(W - 26 - bracketSize, 26, bracketSize, bracketSize);
    ctx.strokeRect(26, H - 26 - bracketSize, bracketSize, bracketSize);
    ctx.strokeRect(W - 26 - bracketSize, H - 26 - bracketSize, bracketSize, bracketSize);

    // Portrait frame bounds
    const maxPhotoW = 1200;
    const maxPhotoH = 1260;
    const photoY = 75;

    // Contain scaling: preserve 100% of the image without any cropping
    const scale = Math.min(maxPhotoW / img.naturalWidth, maxPhotoH / img.naturalHeight);
    const drawW = Math.round(img.naturalWidth * scale);
    const drawH = Math.round(img.naturalHeight * scale);
    const drawX = Math.round((W - drawW) / 2);
    const drawY = Math.round(photoY + (maxPhotoH - drawH) / 2);

    // Photo shadow backing
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = '#06080d';
    ctx.fillRect(drawX, drawY, drawW, drawH);
    ctx.shadowColor = 'transparent';

    // Draw the image completely uncropped
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, drawX, drawY, drawW, drawH);

    // Gold inner rim and border directly around photograph
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.85)';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(drawX, drawY, drawW, drawH);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(drawX + 6, drawY + 6, drawW - 12, drawH - 12);

    // Name in large and bold letters
    const nameY = photoY + maxPhotoH + 125;
    let fontSize = 72;
    ctx.font = `900 ${fontSize}px "Inter", "Segoe UI", "Arial Black", sans-serif`;
    while (ctx.measureText('SIR JAGADISH CHANDRA BOSE').width > W - 180 && fontSize > 48) {
      fontSize -= 2;
      ctx.font = `900 ${fontSize}px "Inter", "Segoe UI", "Arial Black", sans-serif`;
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '4px';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 4;
    ctx.fillText('SIR JAGADISH CHANDRA BOSE', W / 2, nameY);
    ctx.shadowColor = 'transparent';

    // Accent line
    const textWidth = ctx.measureText('SIR JAGADISH CHANDRA BOSE').width;
    const barWidth = Math.min(textWidth + 80, W - 280);
    const barY = nameY + 46;

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.65)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - barWidth / 2, barY);
    ctx.lineTo(W / 2 + barWidth / 2, barY);
    ctx.stroke();

    ctx.fillStyle = '#d4af37';
    ctx.font = '16px "Inter", sans-serif';
    ctx.fillText('◆', W / 2, barY);

    return canvas.toDataURL('image/png');
  });

  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('public/test_bose.png', base64Data, 'base64');
  console.log('Saved public/test_bose.png');
  await browser.close();
}

test().catch(console.error);
