"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const cp = require("child_process");
const flutterCommandsProvider_js_1 = require("./flutterCommandsProvider.js");
function activate(context) {
    console.log('Flutter Dev Commands extension is now active!');
    // Create the tree data provider
    const flutterCommandsProvider = new flutterCommandsProvider_js_1.FlutterCommandsProvider();
    // Register the tree view
    vscode.window.createTreeView('flutterDevCommands', {
        treeDataProvider: flutterCommandsProvider,
        showCollapseAll: true
    });
    // Register all commands
    const commands = [
        { command: 'flutterDev.runFlutter', callback: () => executeFlutterCommand('flutter run') },
        { command: 'flutterDev.buildApk', callback: () => executeFlutterCommand('flutter build apk') },
        { command: 'flutterDev.buildIos', callback: () => executeFlutterCommand('flutter build ios') },
        { command: 'flutterDev.clean', callback: () => executeFlutterCommand('flutter clean') },
        { command: 'flutterDev.getPackages', callback: () => executeFlutterCommand('flutter pub get') },
        { command: 'flutterDev.pubUpgrade', callback: () => executeFlutterCommand('flutter pub upgrade') },
        { command: 'flutterDev.analyze', callback: () => executeFlutterCommand('flutter analyze') },
        { command: 'flutterDev.test', callback: () => executeFlutterCommand('flutter test') },
        { command: 'flutterDev.doctor', callback: runFlutterDoctor },
        { command: 'flutterDev.checkVersion', callback: checkFlutterVersion },
        { command: 'flutterDev.format', callback: () => executeFlutterCommand('dart format .') },
        { command: 'flutterDev.createProject', callback: createNewProject },
        { command: 'flutterDev.openFolder', callback: openProjectFolder },
        { command: 'flutterDev.openDevTools', callback: () => executeFlutterCommand('flutter pub global activate devtools && flutter pub global run devtools') },
        { command: 'flutterDev.hotReload', callback: () => executeFlutterCommand('r') },
        { command: 'flutterDev.hotRestart', callback: () => executeFlutterCommand('R') },
        { command: 'flutterDev.buildWeb', callback: () => executeFlutterCommand('flutter build web') },
        { command: 'flutterDev.buildDesktop', callback: () => executeFlutterCommand('flutter build windows') },
        { command: 'flutterDev.refresh', callback: () => flutterCommandsProvider.refresh() }
    ];
    commands.forEach(({ command, callback }) => {
        const disposable = vscode.commands.registerCommand(command, callback);
        context.subscriptions.push(disposable);
    });
}
exports.activate = activate;
async function checkFlutterAvailable() {
    return new Promise((resolve) => {
        cp.exec('flutter --version', { timeout: 5000 }, (error) => {
            resolve(!error);
        });
    });
}
async function executeFlutterCommand(command) {
    try {
        // Check if Flutter is available
        const isFlutterAvailable = await checkFlutterAvailable();
        if (!isFlutterAvailable) {
            vscode.window.showErrorMessage('Flutter SDK not found. Please install Flutter and add it to your PATH.');
            return;
        }
        const terminal = vscode.window.createTerminal('Flutter Commands');
        terminal.show();
        // Show a notification with better formatting
        const displayCommand = command.length > 50 ? command.substring(0, 50) + '...' : command;
        vscode.window.showInformationMessage(`🚀 Executing: ${displayCommand}`);
        // Send the command to terminal
        terminal.sendText(command);
        // Show progress for long-running commands
        if (command.includes('build') || command.includes('create')) {
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Flutter Command Running",
                cancellable: false
            }, async (progress) => {
                progress.report({ message: "Command is running in terminal..." });
                // Simulate progress for long commands
                await new Promise(resolve => setTimeout(resolve, 2000));
            });
        }
    }
    catch (error) {
        vscode.window.showErrorMessage(`Failed to execute command: ${error}`);
    }
}
async function createNewProject() {
    const projectName = await vscode.window.showInputBox({
        prompt: 'Enter project name',
        placeHolder: 'my_flutter_app',
        validateInput: (value) => {
            if (!value || value.trim().length === 0) {
                return 'Project name cannot be empty';
            }
            if (!/^[a-z_][a-z0-9_]*$/.test(value)) {
                return 'Project name must contain only lowercase letters, numbers, and underscores, and start with a letter or underscore';
            }
            return null;
        }
    });
    if (projectName) {
        const template = await vscode.window.showQuickPick([
            { label: 'app', description: 'Standard Flutter app template' },
            { label: 'module', description: 'Flutter module for embedding' },
            { label: 'package', description: 'Flutter package template' },
            { label: 'plugin', description: 'Flutter plugin template' }
        ], {
            placeHolder: 'Select project template'
        });
        if (template) {
            const terminal = vscode.window.createTerminal('Flutter Commands');
            terminal.show();
            terminal.sendText(`flutter create --template=${template.label} ${projectName}`);
            vscode.window.showInformationMessage(`Creating new Flutter ${template.label} project: ${projectName}`);
        }
    }
}
async function checkFlutterVersion() {
    try {
        const isFlutterAvailable = await checkFlutterAvailable();
        if (!isFlutterAvailable) {
            vscode.window.showErrorMessage('Flutter SDK not found. Please install Flutter and add it to your PATH.');
            return;
        }
        const terminal = vscode.window.createTerminal('Flutter Version');
        terminal.show();
        terminal.sendText('flutter --version');
        vscode.window.showInformationMessage('ℹ️ Checking Flutter version - Check terminal for output');
    }
    catch (error) {
        vscode.window.showErrorMessage(`Failed to check Flutter version: ${error}`);
    }
}
async function runFlutterDoctor() {
    try {
        const isFlutterAvailable = await checkFlutterAvailable();
        if (!isFlutterAvailable) {
            vscode.window.showErrorMessage('Flutter SDK not found. Please install Flutter and add it to your PATH.');
            return;
        }
        const terminal = vscode.window.createTerminal('Flutter Doctor');
        terminal.show();
        terminal.sendText('flutter doctor -v');
        vscode.window.showInformationMessage('🔍 Running Flutter Doctor - Check terminal for detailed output');
    }
    catch (error) {
        vscode.window.showErrorMessage(`Failed to run Flutter Doctor: ${error}`);
    }
}
async function openProjectFolder() {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (workspaceFolder) {
        const uri = vscode.Uri.file(workspaceFolder.uri.fsPath);
        await vscode.commands.executeCommand('revealFileInOS', uri);
        vscode.window.showInformationMessage('Project folder opened in file explorer');
    }
    else {
        vscode.window.showWarningMessage('No workspace folder found');
    }
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map