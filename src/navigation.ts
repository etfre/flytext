import * as vscode from 'vscode';

export function shiftOrMove() {
    var editor = vscode.window.activeTextEditor;
    var document = editor.document;
    editor.edit((editbuilder) => {
        editbuilder.insert(editor.selection.active, "hello daisy");
    });
    vscode.commands.executeCommand('moveLeft')
}

export function moveWhile() {
    vscode.commands.executeCommand('cursorMove', {to: 'left', select: true});
}