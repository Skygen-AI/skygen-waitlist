#!/bin/bash

# Skygen Waitlist Deployment Script
# Usage: ./scripts/deploy.sh [production|staging]

set -e

ENVIRONMENT=${1:-staging}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "🚀 Deploying Skygen Waitlist to $ENVIRONMENT..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if environment file exists
ENV_FILE="$PROJECT_DIR/.env.$ENVIRONMENT"
if [[ ! -f "$ENV_FILE" ]]; then
    print_error "Environment file not found: $ENV_FILE"
    print_warning "Please create $ENV_FILE based on env.example"
    exit 1
fi

# Load environment variables
print_status "Loading environment variables from $ENV_FILE"
set -a
source "$ENV_FILE"
set +a

# Validate required environment variables
required_vars=("DATABASE_PATH" "NEXTAUTH_SECRET" "EMAIL_FROM")
for var in "${required_vars[@]}"; do
    if [[ -z "${!var}" ]]; then
        print_error "Required environment variable $var is not set"
        exit 1
    fi
done

# Create data directory
DATA_DIR=$(dirname "$DATABASE_PATH")
print_status "Creating data directory: $DATA_DIR"
mkdir -p "$DATA_DIR"

# Build and start services
print_status "Building Docker image..."
cd "$PROJECT_DIR"

if [[ "$ENVIRONMENT" == "production" ]]; then
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
else
    docker-compose up --build -d
fi

# Wait for service to be ready
print_status "Waiting for service to be ready..."
sleep 10

# Health check
print_status "Performing health check..."
if curl -f "http://localhost:3000/api/health" > /dev/null 2>&1; then
    print_status "✅ Deployment successful! Service is running."
    print_status "🌐 Application URL: http://localhost:3000"
else
    print_error "❌ Health check failed. Service may not be running properly."
    print_warning "Check logs with: docker-compose logs waitlist"
    exit 1
fi

# Show useful commands
echo ""
print_status "Useful commands:"
echo "  📊 View logs:          docker-compose logs -f waitlist"
echo "  🔄 Restart service:    docker-compose restart waitlist"
echo "  🛑 Stop service:       docker-compose down"
echo "  💾 Backup database:    ./scripts/backup-db.sh"
echo "  🗃️  Access database:    ./scripts/db-shell.sh"
echo ""

print_status "Deployment complete! 🎉"
