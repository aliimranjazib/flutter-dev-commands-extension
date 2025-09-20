#!/bin/bash

echo "🔄 Flutter Dev Commands Extension - Upgrade Script"
echo "=================================================="

# Check if user is logged in
echo "📋 Checking login status..."
if npx vsce ls-publishers | grep -q "aliemranj"; then
    echo "✅ Logged in as publisher 'aliemranj'"
else
    echo "❌ Not logged in. Please run: npx vsce login aliemranj"
    exit 1
fi

# Show current version
CURRENT_VERSION=$(grep '"version"' package.json | cut -d'"' -f4)
echo "📦 Current version: $CURRENT_VERSION"

# Ask for version type
echo ""
echo "Select version bump type:"
echo "1) Patch (1.0.0 → 1.0.1) - Bug fixes"
echo "2) Minor (1.0.0 → 1.1.0) - New features"
echo "3) Major (1.0.0 → 2.0.0) - Breaking changes"
echo "4) Custom version"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo "🔧 Bumping patch version..."
        npx vsce publish patch
        ;;
    2)
        echo "🆕 Bumping minor version..."
        npx vsce publish minor
        ;;
    3)
        echo "🚀 Bumping major version..."
        npx vsce publish major
        ;;
    4)
        read -p "Enter new version (e.g., 1.2.3): " new_version
        echo "📝 Updating to version $new_version..."
        # Update package.json manually
        sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"$new_version\"/" package.json
        # Compile and publish
        npm run compile
        npx vsce publish
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✅ Extension upgraded successfully!"
echo "🌐 View your extension at: https://marketplace.visualstudio.com/items?itemName=aliemranj.flutter-dev-commands"
