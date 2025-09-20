"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlutterCommand = exports.CommandCategory = exports.FlutterCommandsProvider = void 0;
const vscode = require("vscode");
class FlutterCommandsProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            return Promise.resolve(this.getCommandCategories());
        }
        if (element instanceof CommandCategory) {
            return Promise.resolve(element.commands);
        }
        return Promise.resolve([]);
    }
    getCommandCategories() {
        return [
            new CommandCategory('🚀 Development', [
                new FlutterCommand('Run Flutter App', 'flutterDev.runFlutter', 'Run the Flutter app in debug mode', 'play'),
                new FlutterCommand('Hot Reload', 'flutterDev.hotReload', 'Hot reload the running app', 'sync'),
                new FlutterCommand('Hot Restart', 'flutterDev.hotRestart', 'Hot restart the running app', 'debug-restart'),
                new FlutterCommand('Open DevTools', 'flutterDev.openDevTools', 'Open Flutter DevTools', 'tools')
            ]),
            new CommandCategory('📱 Build & Deploy', [
                new FlutterCommand('Build APK', 'flutterDev.buildApk', 'Build Android APK', 'package'),
                new FlutterCommand('Build iOS', 'flutterDev.buildIos', 'Build iOS app', 'device-mobile'),
                new FlutterCommand('Build Web', 'flutterDev.buildWeb', 'Build for web platform', 'globe'),
                new FlutterCommand('Build Desktop', 'flutterDev.buildDesktop', 'Build for desktop platforms', 'desktop-download')
            ]),
            new CommandCategory('🧪 Testing & Quality', [
                new FlutterCommand('Run Tests', 'flutterDev.test', 'Run Flutter tests', 'beaker'),
                new FlutterCommand('Flutter Analyze', 'flutterDev.analyze', 'Analyze Flutter code', 'search'),
                new FlutterCommand('Format Code', 'flutterDev.format', 'Format Dart code', 'symbol-misc'),
                new FlutterCommand('Flutter Doctor', 'flutterDev.doctor', 'Check Flutter installation', 'heart')
            ]),
            new CommandCategory('📦 Dependencies', [
                new FlutterCommand('Get Packages', 'flutterDev.getPackages', 'Get Flutter dependencies', 'download'),
                new FlutterCommand('Pub Upgrade', 'flutterDev.pubUpgrade', 'Upgrade Flutter dependencies', 'arrow-up'),
                new FlutterCommand('Flutter Clean', 'flutterDev.clean', 'Clean build artifacts', 'trash')
            ]),
            new CommandCategory('📁 Project Management', [
                new FlutterCommand('Create New Project', 'flutterDev.createProject', 'Create a new Flutter project', 'new-folder'),
                new FlutterCommand('Open Project Folder', 'flutterDev.openFolder', 'Open project in file explorer', 'folder-opened')
            ]),
            new CommandCategory('ℹ️ Information', [
                new FlutterCommand('Check Flutter Version', 'flutterDev.checkVersion', 'Check Flutter SDK version', 'info'),
                new FlutterCommand('Flutter Doctor', 'flutterDev.doctor', 'Check Flutter installation', 'heart')
            ])
        ];
    }
}
exports.FlutterCommandsProvider = FlutterCommandsProvider;
class CommandCategory extends vscode.TreeItem {
    constructor(label, commands) {
        super(label, vscode.TreeItemCollapsibleState.Expanded);
        this.label = label;
        this.commands = commands;
        this.tooltip = `${label} Commands`;
        this.iconPath = new vscode.ThemeIcon('folder');
        this.contextValue = 'category';
    }
}
exports.CommandCategory = CommandCategory;
class FlutterCommand extends vscode.TreeItem {
    constructor(label, commandId, description, icon) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.label = label;
        this.commandId = commandId;
        this.description = description;
        this.icon = icon;
        this.tooltip = description;
        this.command = {
            command: commandId,
            title: label
        };
        this.iconPath = new vscode.ThemeIcon(icon);
        this.contextValue = 'command';
    }
}
exports.FlutterCommand = FlutterCommand;
//# sourceMappingURL=flutterCommandsProvider.js.map