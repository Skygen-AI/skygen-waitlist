import { NextRequest, NextResponse } from 'next/server';
import { WaitlistService } from '@/lib/waitlist';
import { z } from 'zod';

const joinSchema = z.object({
  email: z.string().email('Invalid email address'),
  utm_source: z.string().optional(),
  utm_campaign: z.string().optional(),
  ref_code: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, utm_source, utm_campaign, ref_code } = joinSchema.parse(body);
    
    const waitlist = new WaitlistService();
    
    // Check if user already exists
    const existingUser = waitlist.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }
    
    // Find referrer if ref_code provided
    let referrerId: string | undefined;
    if (ref_code) {
      const referrer = waitlist.getUserByRefCode(ref_code);
      if (referrer) {
        referrerId = referrer.id;
      }
    }
    
    // Create user
    const user = await waitlist.createUser({
      email,
      utm_source,
      utm_campaign,
      referred_by: referrerId,
    });
    
    // Create email verification magic link
    const { token } = await waitlist.createMagicLink(user.id, 'email_verification');
    
    // TODO: Send email with magic link
    const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/verify?token=${token}`;
    console.log('Send verification email to:', email, 'URL:', verificationUrl);
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        position: user.position,
        ref_code: user.ref_code,
      },
      verification_url: verificationUrl, // Remove in production
    });
    
  } catch (error) {
    console.error('Join waitlist error:', error);
    
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
