# Flutter Dev Commands Extension - Installation Guide

## Quick Installation

1. **Download the extension**: The extension is packaged as `flutter-dev-commands-1.0.0.vsix`

2. **Install in VS Code**:
   - Open VS Code
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Extensions: Install from VSIX..."
   - Select the `flutter-dev-commands-1.0.0.vsix` file
   - Click "Install"

3. **Activate the extension**:
   - Look for the "Flutter Dev" icon in the activity bar (left sidebar)
   - Click on it to open the Flutter Commands panel

## Features

The extension provides a sidebar with the following Flutter commands:

### Development Commands
- 🚀 **Run Flutter App** - `flutter run`
- 🔄 **Hot Reload** - Hot reload running app
- 🔄 **Hot Restart** - Hot restart running app

### Build Commands
- 📱 **Build APK** - `flutter build apk`
- 🍎 **Build iOS** - `flutter build ios`
- 📊 **Build Web** - `flutter build web`
- 🖥️ **Build Desktop** - `flutter build windows`

### Maintenance Commands
- 🧹 **Flutter Clean** - `flutter clean`
- 📦 **Get Packages** - `flutter pub get`
- ⬆️ **Pub Upgrade** - `flutter pub upgrade`
- 🔍 **Flutter Analyze** - `flutter analyze`
- 🧪 **Run Tests** - `flutter test`
- ❤️ **Flutter Doctor** - `flutter doctor`
- ✨ **Format Code** - `dart format .`

### Project Commands
- 📁 **Create New Project** - Interactive project creation
- 🛠️ **Open DevTools** - Launch Flutter DevTools

## Usage

1. Open any Flutter project in VS Code
2. Click the "Flutter Dev" icon in the activity bar
3. Click any command button to execute it
4. Commands will run in VS Code's integrated terminal

## Requirements

- VS Code 1.74.0 or higher
- Flutter SDK installed and configured
- Dart SDK (comes with Flutter)

## Troubleshooting

- **Commands not working**: Ensure Flutter is installed and in your PATH
- **Extension not showing**: Restart VS Code after installation
- **Terminal issues**: Check that VS Code's integrated terminal is working

## Development

To modify or extend the extension:

1. Clone the source code
2. Run `npm install`
3. Make your changes
4. Run `npm run compile`
5. Press `F5` to test in a new Extension Development Host window
