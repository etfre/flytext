'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const actions = require("../src/actions");
const inputstate = require("../src/inputstate");
let state = new inputstate.InputState();
let flyModeEnabled = false;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log('Congratulations, your extension "flytext" is now active!');
    let disposable = vscode.commands.registerCommand('extension.enableFlyMode', () => {
        flyModeEnabled = true;
        state.reset();
    });
    context.subscriptions.push(disposable);
    vscode.commands.registerCommand('type', (args) => __awaiter(this, void 0, void 0, function* () {
        if (flyModeEnabled)
            state.text += args.text;
        else
            vscode.commands.executeCommand('default:type', args);
    }));
    vscode.commands.registerCommand('extension.disableFlyMode', (args) => __awaiter(this, void 0, void 0, function* () {
        flyModeEnabled = false;
        state.resolve();
        actions.perform(state);
        state.reset();
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map