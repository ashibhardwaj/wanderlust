import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const fontDir = join(process.cwd(), 'src', 'og-fonts');
const fraunces = readFileSync(join(fontDir, 'fraunces-500.ttf'));
const mono = readFileSync(join(fontDir, 'jetbrains-mono-500.ttf'));
const inter = readFileSync(join(fontDir, 'inter-400.ttf'));

const CREAM = '#faf7f2';
const INK = '#1a1614';
const MUTED = '#6e6357';

interface CardOptions {
  eyebrow: string;
  title: string;
  body: string;
  bandColor: string;
  wordmark?: string;
}

// Color-band OG card (design B): coloured band with an eyebrow line, then the
// title + body on cream, with a wordmark in the corner. Shared by the per-trip
// images and the site-wide default.
export async function renderOgCard(opts: CardOptions): Promise<Buffer> {
  const { eyebrow, title, body, bandColor, wordmark = 'WANDERLUST' } = opts;

  const node = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: CREAM,
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              height: '264px',
              backgroundColor: bandColor,
              color: '#ffffff',
              padding: '0 72px',
              fontFamily: 'JetBrains Mono',
              fontSize: '26px',
              letterSpacing: '4px',
            },
            children: eyebrow,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: '56px 72px',
              position: 'relative',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', fontFamily: 'Fraunces', fontSize: '78px', color: INK, lineHeight: 1.05 },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontFamily: 'Inter',
                    fontSize: '28px',
                    color: MUTED,
                    marginTop: '24px',
                    lineHeight: 1.45,
                  },
                  children: body,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    position: 'absolute',
                    bottom: '40px',
                    right: '72px',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '24px',
                    letterSpacing: '4px',
                    color: MUTED,
                  },
                  children: wordmark,
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(node as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Fraunces', data: fraunces, weight: 500, style: 'normal' },
      { name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' },
      { name: 'Inter', data: inter, weight: 400, style: 'normal' },
    ],
  });

  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
