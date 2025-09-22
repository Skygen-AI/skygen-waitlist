import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Database configuration
const DATABASE_PATH = process.env.DATABASE_PATH || './data/waitlist.db';
const MIGRATIONS_DIR = path.join(process.cwd(), 'db/migrations');

// Ensure data directory exists
const dataDir = path.dirname(DATABASE_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database connection
let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(DATABASE_PATH);
    
    // Enable foreign key constraints
    db.pragma('foreign_keys = ON');
    
    // Set WAL mode for better concurrency
    db.pragma('journal_mode = WAL');
    
    // Run migrations
    runMigrations();
  }
  
  return db;
}

function runMigrations() {
  if (!db) return;
  
  // Create schema_migrations table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  
  // Get applied migrations
  const appliedMigrations = db
    .prepare('SELECT version FROM schema_migrations')
    .all()
    .map((row: any) => row.version);
  
  // Read migration files
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    console.warn('Migrations directory not found:', MIGRATIONS_DIR);
    return;
  }
  
  const migrationFiles = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter(file => file.endsWith('.sql'))
    .sort();
  
  // Apply new migrations
  for (const file of migrationFiles) {
    const version = file.replace('.sql', '');
    
    if (!appliedMigrations.includes(version)) {
      console.log(`Applying migration: ${version}`);
      
      const migrationPath = path.join(MIGRATIONS_DIR, file);
      const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');
      
      try {
        db.exec(migrationSQL);
        console.log(`✅ Migration ${version} applied successfully`);
      } catch (error) {
        console.error(`❌ Migration ${version} failed:`, error);
        throw error;
      }
    }
  }
}

// Utility functions for common operations
export function generateRefCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateToken(): string {
  return require('crypto').randomBytes(32).toString('hex');
}

// Close database connection
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}

// Export database instance for direct access
export { db };
