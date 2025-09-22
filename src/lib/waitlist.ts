import { getDatabase, generateRefCode, generateToken } from './database';
import crypto from 'crypto';

export interface User {
  id: string;
  email: string;
  ref_code: string;
  status: 'waitlist' | 'early_access' | 'banned';
  progress_level: 'wl_joined' | 'referral_milestone' | 'early_access_unlocked';
  position: number | null;
  email_verified: boolean;
  invited_referrals: number;
  paid_referrals: number;
  utm_source?: string;
  utm_campaign?: string;
  referred_by?: string;
  created_at: string;
  updated_at: string;
}

export interface MagicLink {
  id: string;
  user_id: string;
  token_hash: string;
  purpose: 'login' | 'email_verification';
  expires_at: string;
  used_at?: string;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  ref_code_used: string;
  is_paid: boolean;
  paid_at?: string;
  created_at: string;
}

export class WaitlistService {
  private db = getDatabase();

  // User operations
  async createUser(data: {
    email: string;
    utm_source?: string;
    utm_campaign?: string;
    referred_by?: string;
  }): Promise<User> {
    const refCode = await this.generateUniqueRefCode();
    const position = await this.getNextPosition();
    
    const stmt = this.db.prepare(`
      INSERT INTO users (email, ref_code, position, utm_source, utm_campaign, referred_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      data.email,
      refCode,
      position,
      data.utm_source || null,
      data.utm_campaign || null,
      data.referred_by || null
    );
    
    const user = this.getUserById(result.lastInsertRowid as string);
    if (!user) throw new Error('Failed to create user');
    
    // Create referral relationship if referred
    if (data.referred_by) {
      await this.createReferral(data.referred_by, user.id, refCode);
    }
    
    return user;
  }

  getUserById(id: string): User | null {
    const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
    const row = stmt.get(id) as any;
    return row ? this.mapUserRow(row) : null;
  }

  getUserByEmail(email: string): User | null {
    const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
    const row = stmt.get(email) as any;
    return row ? this.mapUserRow(row) : null;
  }

  getUserByRefCode(refCode: string): User | null {
    const stmt = this.db.prepare('SELECT * FROM users WHERE ref_code = ?');
    const row = stmt.get(refCode) as any;
    return row ? this.mapUserRow(row) : null;
  }

  async updateUserEmailVerified(id: string): Promise<void> {
    const stmt = this.db.prepare('UPDATE users SET email_verified = 1 WHERE id = ?');
    stmt.run(id);
  }

  async updateUserProgress(id: string, level: User['progress_level']): Promise<void> {
    const stmt = this.db.prepare('UPDATE users SET progress_level = ? WHERE id = ?');
    stmt.run(level, id);
  }

  // Magic link operations
  async createMagicLink(userId: string, purpose: MagicLink['purpose']): Promise<{ token: string; link: MagicLink }> {
    const token = generateToken();
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours
    
    const stmt = this.db.prepare(`
      INSERT INTO magic_links (user_id, token_hash, purpose, expires_at)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(userId, tokenHash, purpose, expiresAt.toISOString());
    
    const link = this.db.prepare('SELECT * FROM magic_links WHERE id = ?').get(result.lastInsertRowid) as any;
    
    return {
      token,
      link: this.mapMagicLinkRow(link)
    };
  }

  async verifyMagicLink(token: string): Promise<User | null> {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    const stmt = this.db.prepare(`
      SELECT ml.*, u.* 
      FROM magic_links ml
      JOIN users u ON ml.user_id = u.id
      WHERE ml.token_hash = ? 
        AND ml.used_at IS NULL 
        AND ml.expires_at > datetime('now')
    `);
    
    const row = stmt.get(tokenHash) as any;
    if (!row) return null;
    
    // Mark as used
    const updateStmt = this.db.prepare('UPDATE magic_links SET used_at = datetime(\'now\') WHERE id = ?');
    updateStmt.run(row.id);
    
    return this.mapUserRow(row);
  }

  // Referral operations
  async createReferral(referrerId: string, referredId: string, refCodeUsed: string): Promise<void> {
    const stmt = this.db.prepare(`
      INSERT INTO referrals (referrer_id, referred_id, ref_code_used)
      VALUES (?, ?, ?)
    `);
    
    try {
      stmt.run(referrerId, referredId, refCodeUsed);
    } catch (error) {
      // Ignore if referral already exists (UNIQUE constraint)
      if (!(error as any).message.includes('UNIQUE constraint failed')) {
        throw error;
      }
    }
  }

  async markReferralAsPaid(referredUserId: string): Promise<void> {
    const stmt = this.db.prepare('UPDATE referrals SET is_paid = 1 WHERE referred_id = ?');
    stmt.run(referredUserId);
  }

  getReferralStats(userId: string): { invited: number; paid: number } {
    const user = this.getUserById(userId);
    return {
      invited: user?.invited_referrals || 0,
      paid: user?.paid_referrals || 0
    };
  }

  // Helper methods
  private async generateUniqueRefCode(): Promise<string> {
    let refCode: string;
    let attempts = 0;
    
    do {
      refCode = generateRefCode();
      attempts++;
      
      if (attempts > 10) {
        throw new Error('Failed to generate unique ref code');
      }
    } while (this.getUserByRefCode(refCode));
    
    return refCode;
  }

  private async getNextPosition(): Promise<number> {
    const stmt = this.db.prepare('SELECT COALESCE(MAX(position), 0) + 1 as next_position FROM users');
    const result = stmt.get() as any;
    return result.next_position;
  }

  private mapUserRow(row: any): User {
    return {
      ...row,
      email_verified: Boolean(row.email_verified),
    };
  }

  private mapMagicLinkRow(row: any): MagicLink {
    return row;
  }

  // Analytics
  getWaitlistStats() {
    const totalUsers = this.db.prepare('SELECT COUNT(*) as count FROM users').get() as any;
    const verifiedUsers = this.db.prepare('SELECT COUNT(*) as count FROM users WHERE email_verified = 1').get() as any;
    const earlyAccessUsers = this.db.prepare('SELECT COUNT(*) as count FROM users WHERE status = "early_access"').get() as any;
    const totalReferrals = this.db.prepare('SELECT COUNT(*) as count FROM referrals').get() as any;
    const paidReferrals = this.db.prepare('SELECT COUNT(*) as count FROM referrals WHERE is_paid = 1').get() as any;
    
    return {
      totalUsers: totalUsers.count,
      verifiedUsers: verifiedUsers.count,
      earlyAccessUsers: earlyAccessUsers.count,
      totalReferrals: totalReferrals.count,
      paidReferrals: paidReferrals.count,
    };
  }
}
