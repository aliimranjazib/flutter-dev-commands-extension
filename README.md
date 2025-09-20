# Flutter Dev Commands Extension

A VS Code extension that provides a convenient sidebar with common Flutter development commands.

## Features

- **📁 Organized Categories**: Commands grouped by type (Development, Build, Testing, etc.)
- **🎯 Smart Interface**: Collapsible categories with clear visual hierarchy
- **⚡ Enhanced UX**: Progress indicators, better error handling, and validation
- **⌨️ Keyboard Shortcuts**: Quick access to common commands (Ctrl+Shift+F5, Ctrl+Shift+R)
- **🔧 Advanced Project Creation**: Template selection and name validation
- **📂 Project Management**: Open project folder, better workspace integration
- **🚀 Terminal Integration**: Commands executed in VS Code's integrated terminal
- **💡 Visual Feedback**: Clear icons, descriptions, and status notifications

## Available Commands

### 🚀 Development
- **Run Flutter App** - Run the Flutter app in debug mode
- **Hot Reload** - Hot reload the running app
- **Hot Restart** - Hot restart the running app
- **Open DevTools** - Open Flutter DevTools

### 📱 Build & Deploy
- **Build APK** - Build Android APK
- **Build iOS** - Build iOS app
- **Build Web** - Build for web platform
- **Build Desktop** - Build for desktop platforms

### 🧪 Testing & Quality
- **Run Tests** - Run Flutter tests
- **Flutter Analyze** - Analyze Flutter code
- **Format Code** - Format Dart code
- **Flutter Doctor** - Check Flutter installation

### 📦 Dependencies
- **Get Packages** - Get Flutter dependencies
- **Pub Upgrade** - Upgrade Flutter dependencies
- **Flutter Clean** - Clean build artifacts

### 📁 Project Management
- **Create New Project** - Create a new Flutter project (with template selection)
- **Open Project Folder** - Open project in file explorer

## Installation

### Option 1: Install from VSIX (Recommended)
1. Clone this repository
2. Run the installation script: `./install.sh`
3. Install the generated `.vsix` file in VS Code:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Click the '...' menu and select 'Install from VSIX...'
   - Select the generated `.vsix` file

### Option 2: Development Installation
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to build the extension
4. Press `F5` to run the extension in a new Extension Development Host window

### Option 3: Manual Installation
1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Run `npx vsce package` to create a `.vsix` file
5. Install the `.vsix` file in VS Code

## Usage

1. Open a Flutter project in VS Code
2. Look for the "Flutter Dev" icon in the activity bar (left sidebar)
3. Click on it to open the Flutter Commands panel
4. Click on any command button to execute it
5. Use keyboard shortcuts for quick access to common commands

## Keyboard Shortcuts

- **Ctrl+Shift+F5** (Mac: Cmd+Shift+F5) - Run Flutter App
- **Ctrl+Shift+R** (Mac: Cmd+Shift+R) - Hot Reload
- **Ctrl+Shift+Shift+R** (Mac: Cmd+Shift+Shift+R) - Hot Restart

## Requirements

- VS Code 1.74.0 or higher
- Flutter SDK installed and configured
- Dart SDK (usually comes with Flutter)

## Development

To contribute to this extension:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the extension
5. Submit a pull request

## License

MIT License
