import { NextRequest, NextResponse } from 'next/server';
import { WaitlistService } from '@/lib/waitlist';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const waitlist = new WaitlistService();
    
    // Verify session
    const user = await waitlist.verifyMagicLink(sessionToken);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }
    
    // Get referral stats
    const referralStats = waitlist.getReferralStats(user.id);
    
    // Generate referral link
    const referralLink = `${process.env.APP_URL || 'http://localhost:3000'}?ref=${user.ref_code}`;
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        position: user.position,
        ref_code: user.ref_code,
        progress_level: user.progress_level,
        email_verified: user.email_verified,
        status: user.status,
      },
      referral: {
        link: referralLink,
        invited_count: referralStats.invited,
        paid_count: referralStats.paid,
      },
      progress: {
        current_level: user.progress_level,
        levels: [
          {
            key: 'wl_joined',
            name: 'WL Joined',
            description: "You've joined the waitlist. Stay tuned for updates.",
            completed: true,
          },
          {
            key: 'referral_milestone',
            name: 'Referral Milestone',
            description: 'Invite friends who purchase EA to unlock special rewards.',
            completed: user.progress_level === 'referral_milestone' || user.progress_level === 'early_access_unlocked',
          },
          {
            key: 'early_access_unlocked',
            name: 'Early Access Unlocked',
            description: "You've secured your Early Access — enjoy all Skygen perks first.",
            completed: user.progress_level === 'early_access_unlocked',
          },
        ],
      },
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
