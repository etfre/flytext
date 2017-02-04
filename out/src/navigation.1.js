"use strict";
const vscode = require("vscode");
function shiftOrMove() {
    var editor = vscode.window.activeTextEditor;
    var document = editor.document;
    editor.edit((editbuilder) => {
        editbuilder.insert(editor.selection.active, "hello daisy");
    });
    vscode.commands.executeCommand('moveLeft');
}
exports.shiftOrMove = shiftOrMove;
function moveWhile() {
    vscode.commands.executeCommand('cursorMove', { to: 'left', select: true });
}
exports.moveWhile = moveWhile;
//# sourceMappingURL=navigation.1.js.map