#!/bin/bash

echo "Installing Flutter Dev Commands Extension..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Compile TypeScript
echo "Compiling TypeScript..."
npm run compile

# Package the extension
echo "Packaging extension..."
npx vsce package

echo "Extension packaged successfully!"
echo "To install the extension:"
echo "1. Open VS Code"
echo "2. Go to Extensions (Ctrl+Shift+X)"
echo "3. Click the '...' menu and select 'Install from VSIX...'"
echo "4. Select the generated .vsix file"
echo ""
echo "Or run: code --install-extension flutter-dev-commands-1.0.0.vsix"
