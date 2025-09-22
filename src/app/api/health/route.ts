import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET() {
  try {
    // Test database connection
    const db = getDatabase();
    const result = db.prepare('SELECT 1 as test').get();
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: result ? 'connected' : 'error',
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed',
      },
      { status: 500 }
    );
  }
}
