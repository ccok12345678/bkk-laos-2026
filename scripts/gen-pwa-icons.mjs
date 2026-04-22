import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');

// Generate a solid-background square PNG with a centered glyph rendered as pixel blocks.
// Colors in HSL → RGB approx: --luangprabang 43 80% 46% ≈ #D4A017
const BG = [0xd4, 0xa0, 0x17];
const FG = [0xff, 0xff, 0xff];

// 11x11 pixel art of the character "七" mapped to 0/1 grid.
const GLYPH = [
  '00000000000',
  '00000000000',
  '00000100000',
  '01111111110',
  '00000100000',
  '00000100000',
  '00000100000',
  '00000100000',
  '10000100000',
  '01111111100',
  '00000000000',
].map((row) => row.split('').map((c) => c === '1'));

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[i] = c >>> 0;
    }
    crc32.table = table;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function makePng(size, { maskable = false } = {}) {
  const w = size;
  const h = size;
  const cellSize = Math.floor(w / 14);
  const glyphSize = cellSize * GLYPH.length;
  const offsetX = Math.floor((w - glyphSize) / 2);
  const offsetY = Math.floor((h - glyphSize) / 2);

  // build raw pixel rows: RGB, 3 bytes per pixel
  const rows = [];
  for (let y = 0; y < h; y++) {
    const row = Buffer.alloc(1 + w * 3);
    row[0] = 0; // filter type none
    for (let x = 0; x < w; x++) {
      let color = BG;
      if (!maskable) {
        const gx = Math.floor((x - offsetX) / cellSize);
        const gy = Math.floor((y - offsetY) / cellSize);
        if (
          gx >= 0 && gx < GLYPH.length &&
          gy >= 0 && gy < GLYPH.length &&
          GLYPH[gy][gx]
        ) {
          color = FG;
        }
      } else {
        // maskable: draw glyph inside safe zone (center 80%)
        const inset = Math.floor(w * 0.1);
        const inW = w - inset * 2;
        const cellM = Math.floor(inW / 14);
        const glyphM = cellM * GLYPH.length;
        const oxM = inset + Math.floor((inW - glyphM) / 2);
        const oyM = inset + Math.floor((inW - glyphM) / 2);
        const gx = Math.floor((x - oxM) / cellM);
        const gy = Math.floor((y - oyM) / cellM);
        if (
          gx >= 0 && gx < GLYPH.length &&
          gy >= 0 && gy < GLYPH.length &&
          GLYPH[gy][gx]
        ) {
          color = FG;
        }
      }
      row[1 + x * 3 + 0] = color[0];
      row[1 + x * 3 + 1] = color[1];
      row[1 + x * 3 + 2] = color[2];
    }
    rows.push(row);
  }
  const raw = Buffer.concat(rows);
  const idat = deflateSync(raw);

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

writeFileSync(resolve(publicDir, 'pwa-192x192.png'), makePng(192));
writeFileSync(resolve(publicDir, 'pwa-512x512.png'), makePng(512));
writeFileSync(
  resolve(publicDir, 'pwa-512x512-maskable.png'),
  makePng(512, { maskable: true }),
);
writeFileSync(resolve(publicDir, 'apple-touch-icon.png'), makePng(180));
// minimal favicon.ico: use the 48 png directly, browsers accept png-in-ico via .png ext
writeFileSync(resolve(publicDir, 'favicon.ico'), makePng(48));

console.log('Generated PWA icons into public/');
