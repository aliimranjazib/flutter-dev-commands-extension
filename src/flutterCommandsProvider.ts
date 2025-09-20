import * as vscode from 'vscode';

export class FlutterCommandsProvider implements vscode.TreeDataProvider<FlutterCommand | CommandCategory> {
    private _onDidChangeTreeData: vscode.EventEmitter<FlutterCommand | CommandCategory | undefined | null | void> = new vscode.EventEmitter<FlutterCommand | CommandCategory | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<FlutterCommand | CommandCategory | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: FlutterCommand | CommandCategory): vscode.TreeItem {
        return element;
    }

    getChildren(element?: FlutterCommand | CommandCategory): Thenable<(FlutterCommand | CommandCategory)[]> {
        if (!element) {
            return Promise.resolve(this.getCommandCategories());
        }
        if (element instanceof CommandCategory) {
            return Promise.resolve(element.commands);
        }
        return Promise.resolve([]);
    }

    private getCommandCategories(): CommandCategory[] {
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

export class CommandCategory extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly commands: FlutterCommand[]
    ) {
        super(label, vscode.TreeItemCollapsibleState.Expanded);
        this.tooltip = `${label} Commands`;
        this.iconPath = new vscode.ThemeIcon('folder');
        this.contextValue = 'category';
    }
}

export class FlutterCommand extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly commandId: string,
        public readonly description: string,
        public readonly icon: string
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.tooltip = description;
        this.command = {
            command: commandId,
            title: label
        };
        this.iconPath = new vscode.ThemeIcon(icon);
        this.contextValue = 'command';
    }
}
