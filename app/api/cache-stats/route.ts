import { NextResponse } from 'next/server';
import { getCacheStats } from '../../lib/cache-utils';
import { NO_LIMIT } from '../../lib/redis-config';

// Đánh dấu route này là động
export const dynamic = 'force-dynamic';

// API route để xem thông tin về cache
export async function GET(request: Request) {
  try {
    const stats = await getCacheStats();
    
    return NextResponse.json({
      cache: {
        ...stats,
        noLimit: NO_LIMIT
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting cache stats:', error);
    
    return NextResponse.json(
      { error: 'Failed to get cache stats' },
      { status: 500 }
    );
  }
} 