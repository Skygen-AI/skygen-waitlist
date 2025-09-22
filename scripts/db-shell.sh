#!/bin/bash

# Database shell access script for Skygen Waitlist
# Provides direct SQLite access to the database

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Load environment
ENV_FILE="$PROJECT_DIR/.env.production"
if [[ -f "$ENV_FILE" ]]; then
    source "$ENV_FILE"
fi

DATABASE_PATH=${DATABASE_PATH:-"./data/waitlist.db"}

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

# Check if database exists
if [[ ! -f "$DATABASE_PATH" ]]; then
    print_error "Database file not found: $DATABASE_PATH"
    print_warning "Make sure the application has been deployed and the database initialized."
    exit 1
fi

print_status "🗃️  Connecting to database: $DATABASE_PATH"
print_warning "⚠️  You have direct access to the production database!"
print_warning "⚠️  Be careful with DELETE and UPDATE operations!"

echo ""
echo "Useful commands:"
echo "  .tables                 - List all tables"
echo "  .schema                 - Show table schemas"  
echo "  .headers on             - Show column headers"
echo "  .mode table             - Pretty table output"
echo "  SELECT * FROM users;    - List all users"
echo "  .quit                   - Exit"
echo ""

# Start SQLite shell
sqlite3 "$DATABASE_PATH"
