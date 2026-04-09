const fs = require('fs');

const now           = new Date();
const defaultYear   = now.getUTCFullYear() + (now.getUTCMonth() === 0 && now.getUTCDate() === 1 ? 0 : 1);
const TARGET_YEAR   = process.env.TARGET_YEAR ? parseInt(process.env.TARGET_YEAR) : defaultYear;
const TARGET_LABEL  = process.env.TARGET_LABEL || String(TARGET_YEAR);

const ACCENT       = '#CCFF00';
const BG           = '#0A0A0A';
const FG           = '#F5F5F0';
const DIM          = '#555555';
const BORDER       = '#222222';
const FONT         = 'JetBrains Mono, Courier New, monospace';

const target = new Date(`January 1 ${TARGET_YEAR} 00:00:00 UTC`);
const diff   = Math.max(0, target - now);

const totalSeconds = Math.floor(diff / 1000);
const days         = Math.floor(totalSeconds / 86400);
const hours        = Math.floor((totalSeconds % 86400) / 3600);
const minutes      = Math.floor((totalSeconds % 3600)  / 60);
const seconds      = totalSeconds % 60;

const pad = n => String(n).padStart(2, '0');

const D = pad(days);
const H = pad(hours);
const M = pad(minutes);
const S = pad(seconds);

const updatedAt = now.toUTCString().replace(/:\d{2} GMT/, ' UTC');

const yearStart  = new Date(`January 1 ${now.getUTCFullYear()} 00:00:00 UTC`);
const yearEnd    = new Date(`January 1 ${now.getUTCFullYear() + 1} 00:00:00 UTC`);
const progress   = Math.min(1, (now - yearStart) / (yearEnd - yearStart));
const progressPct = (progress * 100).toFixed(1);

const W = 860;
const H_SVG = 220;

function segment(x, value, label) {
    const bw = 160;
    const bh = 110;
    const by = 42;

    return `
  <rect x="${x}" y="${by}" width="${bw}" height="${bh}" fill="${BORDER}" rx="0"/>
  <rect x="${x + 1}" y="${by + 1}" width="${bw - 2}" height="${bh - 2}" fill="${BG}" rx="0"/>
  <text
    x="${x + bw / 2}"
    y="${by + 72}"
    font-family="${FONT}"
    font-size="56"
    font-weight="800"
    fill="${ACCENT}"
    text-anchor="middle"
    dominant-baseline="auto"
    letter-spacing="-2"
  >${value}</text>
  <text
    x="${x + bw / 2}"
    y="${by + bh + 22}"
    font-family="${FONT}"
    font-size="11"
    font-weight="700"
    fill="${DIM}"
    text-anchor="middle"
    letter-spacing="3"
  >${label}</text>`;
}

const barX   = 40;
const barY   = H_SVG - 32;
const barW   = W - 80;
const barH   = 6;
const filled = Math.round(barW * progress);

const progressBar = `
  <rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" fill="${BORDER}" rx="0"/>
  <rect x="${barX}" y="${barY}" width="${filled}" height="${barH}" fill="${ACCENT}" rx="0"/>
  <text
    x="${barX}"
    y="${barY - 8}"
    font-family="${FONT}"
    font-size="9"
    fill="${DIM}"
    letter-spacing="1"
  >${now.getUTCFullYear()} ELAPSED</text>
  <text
    x="${barX + barW}"
    y="${barY - 8}"
    font-family="${FONT}"
    font-size="9"
    fill="${DIM}"
    text-anchor="end"
    letter-spacing="1"
  >${progressPct}%</text>
`;

const SEG_GAP  = 20;
const SEG_W    = 160;
const startX   = (W - (4 * SEG_W + 3 * SEG_GAP)) / 2;

const seg1X = startX;
const seg2X = startX + SEG_W + SEG_GAP;
const seg3X = startX + (SEG_W + SEG_GAP) * 2;
const seg4X = startX + (SEG_W + SEG_GAP) * 3;

function sepDots(x) {
    return `
  <text x="${x}" y="102" font-family="${FONT}" font-size="28" font-weight="800" fill="${ACCENT}" text-anchor="middle">:</text>`;
}

const svg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${W}"
  height="${H_SVG}"
  viewBox="0 0 ${W} ${H_SVG}"
  role="img"
  aria-label="Countdown to ${TARGET_LABEL}: ${D} days ${H} hours ${M} minutes ${S} seconds"
>
  <rect width="${W}" height="${H_SVG}" fill="${BG}"/>

  <rect x="0" y="0" width="${W}" height="3" fill="${ACCENT}"/>

  <text
    x="40"
    y="26"
    font-family="${FONT}"
    font-size="11"
    font-weight="700"
    fill="${FG}"
    letter-spacing="3"
  >COUNTDOWN TO ${TARGET_LABEL}</text>

  <text
    x="${W - 40}"
    y="26"
    font-family="${FONT}"
    font-size="9"
    fill="${DIM}"
    text-anchor="end"
    letter-spacing="1"
  >UPDATED ${updatedAt}</text>

  ${segment(seg1X, D, 'DAYS')}
  ${sepDots(seg2X - SEG_GAP / 2)}
  ${segment(seg2X, H, 'HOURS')}
  ${sepDots(seg3X - SEG_GAP / 2)}
  ${segment(seg3X, M, 'MINUTES')}
  ${sepDots(seg4X - SEG_GAP / 2)}
  ${segment(seg4X, S, 'SECONDS')}

  ${progressBar}
</svg>`;

fs.writeFileSync('countdown.svg', svg.trim(), 'utf8');
console.log(`✓ countdown.svg generated — ${D}d ${H}h ${M}m ${S}s remaining`);