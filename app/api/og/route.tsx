import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
}

export async function GET() {
  const boldFont = readFileSync(
    join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf')
  )
  const screenshot = readFileSync(
    join(process.cwd(), 'public/screenshots/session-score.png')
  )
  const screenshotSrc = `data:image/png;base64,${screenshot.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#111111',
          fontFamily: 'Geist',
        }}
      >
        {/* Left: brand + headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '60px 64px',
          }}
        >
          {/* Logo row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '60px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#e5322d',
                borderRadius: '8px',
              }}
            />
            <span
              style={{
                fontSize: '28px',
                fontWeight: 800,
                color: '#f0f0f0',
                letterSpacing: '-0.5px',
              }}
            >
              BellSense
            </span>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '88px',
                fontWeight: 800,
                color: '#f0f0f0',
                lineHeight: '0.92',
                letterSpacing: '-4px',
              }}
            >
              The sensor
            </span>
            <span
              style={{
                fontSize: '88px',
                fontWeight: 800,
                color: '#e5322d',
                lineHeight: '0.92',
                letterSpacing: '-4px',
              }}
            >
              doesn&apos;t lie.
            </span>
          </div>

          {/* Spacer */}
          <div style={{ display: 'flex', flex: 1 }} />

          {/* Bottom label */}
          <span
            style={{
              fontSize: '16px',
              color: '#4b5563',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            Kettlebell training feedback
          </span>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: '1px',
            alignSelf: 'stretch',
            backgroundColor: 'rgba(255,255,255,0.07)',
          }}
        />

        {/* Right: screenshot */}
        <div
          style={{
            display: 'flex',
            width: '380px',
            height: '630px',
            overflow: 'hidden',
            backgroundColor: '#0a0a0a',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screenshotSrc}
            alt=""
            width={380}
            height={820}
            style={{
              width: '380px',
              height: '820px',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: toArrayBuffer(boldFont),
          weight: 800,
          style: 'normal',
        },
      ],
    }
  )
}
