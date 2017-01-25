'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as navigation from '../src/navigation';
import * as actions from '../src/actions';
import * as inputstate from '../src/inputstate';

let state = new inputstate.InputState();
let flyModeEnabled = false;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "flytext" is now active!');
    let disposable = vscode.commands.registerCommand('extension.enableFlyMode', () => {
        flyModeEnabled = true;
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        var selection = editor.selection;
        var text = editor.document.getText(selection);
    });

    context.subscriptions.push(disposable);

    vscode.commands.registerCommand('type', async (args) => {
        if (flyModeEnabled) state.text += args.text;
        else vscode.commands.executeCommand('default:type', args);
    });

    vscode.commands.registerCommand('extension.disableFlyMode', async (args) => {
        flyModeEnabled = false;
        state.resolve();
        actions.perform(state);
        state.reset();
    });

}

// this method is called when your extension is deactivated
export function deactivate() {
}