#!/bin/bash

# Database backup script for Skygen Waitlist
# Creates timestamped backups of the SQLite database

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Load environment
ENV_FILE="$PROJECT_DIR/.env.production"
if [[ -f "$ENV_FILE" ]]; then
    source "$ENV_FILE"
fi

DATABASE_PATH=${DATABASE_PATH:-"./data/waitlist.db"}
BACKUP_DIR="$PROJECT_DIR/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/waitlist_backup_$TIMESTAMP.db"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_status "🗃️  Starting database backup..."

# Check if database exists
if [[ ! -f "$DATABASE_PATH" ]]; then
    print_error "Database file not found: $DATABASE_PATH"
    exit 1
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Create backup
print_status "Creating backup: $BACKUP_FILE"
cp "$DATABASE_PATH" "$BACKUP_FILE"

# Verify backup
if [[ -f "$BACKUP_FILE" ]]; then
    ORIGINAL_SIZE=$(stat -c%s "$DATABASE_PATH" 2>/dev/null || stat -f%z "$DATABASE_PATH")
    BACKUP_SIZE=$(stat -c%s "$BACKUP_FILE" 2>/dev/null || stat -f%z "$BACKUP_FILE")
    
    if [[ "$ORIGINAL_SIZE" == "$BACKUP_SIZE" ]]; then
        print_status "✅ Backup created successfully!"
        print_status "📁 Location: $BACKUP_FILE"
        print_status "📊 Size: $BACKUP_SIZE bytes"
    else
        print_error "❌ Backup size mismatch. Backup may be corrupted."
        exit 1
    fi
else
    print_error "❌ Failed to create backup file"
    exit 1
fi

# Clean up old backups (keep last 10)
print_status "🧹 Cleaning up old backups (keeping last 10)..."
cd "$BACKUP_DIR"
ls -t waitlist_backup_*.db | tail -n +11 | xargs -r rm --

REMAINING_BACKUPS=$(ls -1 waitlist_backup_*.db 2>/dev/null | wc -l)
print_status "📦 Total backups: $REMAINING_BACKUPS"

print_status "🎉 Backup complete!"

# Show restore command
echo ""
print_status "To restore from this backup:"
echo "  docker-compose down"
echo "  cp $BACKUP_FILE $DATABASE_PATH"
echo "  docker-compose up -d"
