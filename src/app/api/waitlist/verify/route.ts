import { NextRequest, NextResponse } from 'next/server';
import { WaitlistService } from '@/lib/waitlist';
import { z } from 'zod';

const verifySchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = verifySchema.parse(body);
    
    const waitlist = new WaitlistService();
    
    // Verify magic link
    const user = await waitlist.verifyMagicLink(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification link' },
        { status: 400 }
      );
    }
    
    // Mark email as verified
    await waitlist.updateUserEmailVerified(user.id);
    
    // Create login session
    const { token: sessionToken } = await waitlist.createMagicLink(user.id, 'login');
    
    // Set session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        position: user.position,
        ref_code: user.ref_code,
        progress_level: user.progress_level,
        email_verified: true,
        invited_referrals: user.invited_referrals,
        paid_referrals: user.paid_referrals,
      },
    });
    
    response.cookies.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
    
    return response;
    
  } catch (error) {
    console.error('Verify email error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Also support GET for email links
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  
  if (!token) {
    return new Response('Missing token', { status: 400 });
  }
  
  try {
    const waitlist = new WaitlistService();
    const user = await waitlist.verifyMagicLink(token);
    
    if (!user) {
      return new Response('Invalid or expired verification link', { status: 400 });
    }
    
    await waitlist.updateUserEmailVerified(user.id);
    
    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
    
  } catch (error) {
    console.error('Verify email error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
