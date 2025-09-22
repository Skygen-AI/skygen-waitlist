-- Migration: Add indexes and triggers
-- Created: 2025-09-21
-- Description: Adds performance indexes and automatic triggers

-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_ref_code ON users(ref_code);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_referred_by ON users(referred_by);
CREATE INDEX idx_magic_links_token_hash ON magic_links(token_hash);
CREATE INDEX idx_magic_links_user_id ON magic_links(user_id);
CREATE INDEX idx_sessions_token_hash ON sessions(token_hash);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX idx_referrals_referred_id ON referrals(referred_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);

-- Automatic update trigger for users.updated_at
CREATE TRIGGER update_users_updated_at 
    AFTER UPDATE ON users
    BEGIN
        UPDATE users SET updated_at = datetime('now') WHERE id = NEW.id;
    END;

-- Trigger для автоматического обновления счетчиков рефералов
CREATE TRIGGER update_referral_counts
    AFTER INSERT ON referrals
    BEGIN
        UPDATE users 
        SET invited_referrals = invited_referrals + 1,
            updated_at = datetime('now')
        WHERE id = NEW.referrer_id;
    END;

-- Trigger для обновления paid_referrals при оплате
CREATE TRIGGER update_paid_referrals
    AFTER UPDATE OF is_paid ON referrals
    WHEN NEW.is_paid = 1 AND OLD.is_paid = 0
    BEGIN
        UPDATE users 
        SET paid_referrals = paid_referrals + 1,
            updated_at = datetime('now')
        WHERE id = NEW.referrer_id;
        
        UPDATE referrals 
        SET paid_at = datetime('now') 
        WHERE id = NEW.id;
    END;

-- Record migration
INSERT INTO schema_migrations (version) VALUES ('002_add_indexes_and_triggers');
