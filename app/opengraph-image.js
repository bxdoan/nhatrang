import { ImageResponse } from 'next/og';
import { SITE_NAME } from './lib/metadata';

// Route segment config
export const runtime = 'edge';

// Metadata cho hình ảnh
export const alt = 'Nha Trang Insight - Thông tin du lịch và đời sống Nha Trang';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Hàm tạo hình ảnh
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #1e40af, #3b82f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 'bold', marginBottom: 20 }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 32, fontWeight: 'normal', opacity: 0.9 }}>
          Thông tin du lịch & đời sống Nha Trang
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 24,
            opacity: 0.8,
          }}
        >
          nhatranginsight.com
        </div>
      </div>
    ),
    { ...size }
  );
} 