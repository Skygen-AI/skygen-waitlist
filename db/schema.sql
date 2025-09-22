-- Skygen Waitlist Database Schema
-- SQLite implementation based on database-schema.md

-- Users table - основная таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    email TEXT UNIQUE NOT NULL,
    ref_code TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'waitlist' CHECK (status IN ('waitlist', 'early_access', 'banned')),
    progress_level TEXT NOT NULL DEFAULT 'wl_joined' CHECK (progress_level IN ('wl_joined', 'referral_milestone', 'early_access_unlocked')),
    position INTEGER,
    email_verified INTEGER NOT NULL DEFAULT 0 CHECK (email_verified IN (0, 1)),
    invited_referrals INTEGER NOT NULL DEFAULT 0,
    paid_referrals INTEGER NOT NULL DEFAULT 0,
    utm_source TEXT,
    utm_campaign TEXT,
    referred_by TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (referred_by) REFERENCES users(id)
);

-- Magic links table - для passwordless аутентификации
CREATE TABLE IF NOT EXISTS magic_links (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    token_hash TEXT UNIQUE NOT NULL,
    purpose TEXT NOT NULL CHECK (purpose IN ('login', 'email_verification')),
    expires_at TEXT NOT NULL,
    used_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sessions table - активные сессии пользователей
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    token_hash TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    last_used_at TEXT NOT NULL DEFAULT (datetime('now')),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Referrals table - реферальные связи
CREATE TABLE IF NOT EXISTS referrals (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    referrer_id TEXT NOT NULL,
    referred_id TEXT UNIQUE NOT NULL, -- один пользователь может быть приглашен только один раз
    ref_code_used TEXT NOT NULL,
    is_paid INTEGER NOT NULL DEFAULT 0 CHECK (is_paid IN (0, 1)),
    paid_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (referrer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (referred_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Payments table - отслеживание оплат EA
CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    provider TEXT NOT NULL, -- 'stripe', 'paddle', etc.
    external_id TEXT NOT NULL, -- ID в платежной системе
    amount_cents INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    product_type TEXT NOT NULL DEFAULT 'early_access' CHECK (product_type IN ('early_access', 'priority_boost')),
    paid_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(provider, external_id) -- предотвращаем дублирование платежей
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_ref_code ON users(ref_code);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_referred_by ON users(referred_by);
CREATE INDEX IF NOT EXISTS idx_magic_links_token_hash ON magic_links(token_hash);
CREATE INDEX IF NOT EXISTS idx_magic_links_user_id ON magic_links(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_id ON referrals(referred_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Triggers for automatic updates
CREATE TRIGGER IF NOT EXISTS update_users_updated_at 
    AFTER UPDATE ON users
    BEGIN
        UPDATE users SET updated_at = datetime('now') WHERE id = NEW.id;
    END;

-- Trigger для автоматического обновления счетчиков рефералов
CREATE TRIGGER IF NOT EXISTS update_referral_counts
    AFTER INSERT ON referrals
    BEGIN
        -- Увеличиваем invited_referrals у реферера
        UPDATE users 
        SET invited_referrals = invited_referrals + 1,
            updated_at = datetime('now')
        WHERE id = NEW.referrer_id;
    END;

-- Trigger для обновления paid_referrals при оплате
CREATE TRIGGER IF NOT EXISTS update_paid_referrals
    AFTER UPDATE OF is_paid ON referrals
    WHEN NEW.is_paid = 1 AND OLD.is_paid = 0
    BEGIN
        -- Увеличиваем paid_referrals у реферера
        UPDATE users 
        SET paid_referrals = paid_referrals + 1,
            updated_at = datetime('now')
        WHERE id = NEW.referrer_id;
        
        -- Обновляем paid_at
        UPDATE referrals 
        SET paid_at = datetime('now') 
        WHERE id = NEW.id;
    END;
