#!/bin/bash

echo "🚀 Publishing Flutter Dev Commands Extension to VS Code Marketplace"
echo "=================================================================="

# Check if user is logged in
echo "📋 Checking login status..."
if npx vsce ls-publishers | grep -q "jazib"; then
    echo "✅ Already logged in as publisher 'jazib'"
else
    echo "❌ Not logged in. Please run: npx vsce login jazib"
    echo "   You'll need a Personal Access Token from Azure DevOps"
    echo "   Go to: https://dev.azure.com/ → User Settings → Personal Access Tokens"
    echo "   Create token with 'Marketplace (manage)' scope"
    exit 1
fi

# Compile the extension
echo "🔨 Compiling TypeScript..."
npm run compile

# Package the extension
echo "📦 Packaging extension..."
npx vsce package

# Publish the extension
echo "🚀 Publishing to marketplace..."
npx vsce publish

echo "✅ Extension published successfully!"
echo "🌐 View your extension at: https://marketplace.visualstudio.com/items?itemName=jazib.flutter-dev-commands"
