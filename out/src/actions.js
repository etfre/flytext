"use strict";
const vscode = require("vscode");
const navigation = require("../src/navigation");
exports.DIRECTION = 'direction';
exports.FIND = 'find';
exports.MAYBE_SPACE = 'maybe space';
const actionMap = {};
actionMap[exports.DIRECTION] = moveDirection;
actionMap[exports.FIND] = findCharacter;
actionMap[exports.MAYBE_SPACE] = maybeSpace;
function perform(state) {
    actionMap[state.action](state);
}
exports.perform = perform;
function moveDirection(state) {
    // vscode.window.activeTextEditor.selection[0] 
    const args = { to: state.args.motion, select: state.args.select, value: state.count };
    vscode.commands.executeCommand('cursorMove', args);
}
exports.moveDirection = moveDirection;
function findCharacter(state) {
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    let seenCount = 0;
    const text = document.getText();
    let nextPos = editor.selection.active;
    if (state.args.increment === -1)
        nextPos = navigation.nextPos(document, nextPos, state.args.increment);
    let position = nextPos;
    while (nextPos !== null && seenCount < state.count) {
        position = nextPos;
        let char = text[document.offsetAt(nextPos)];
        if (char === state.args.char)
            seenCount++;
        nextPos = navigation.nextPos(document, nextPos, state.args.increment);
    }
    if (state.args.offsetBy1)
        position = position.translate(0, 1);
    const anchor = state.args.select ? editor.selection.anchor : position;
    editor.selections = [new vscode.Selection(anchor, position)];
}
exports.findCharacter = findCharacter;
function maybeSpace(state) {
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    const text = document.getText();
    let pos = editor.selection.active;
    let line = document.lineAt(pos.line);
    let insertSpace = false;
    if (state.args.forward) {
        insertSpace = text[document.offsetAt(pos)] !== ' ';
    }
    else if (pos.character > line.firstNonWhitespaceCharacterIndex) {
        pos = navigation.nextPos(document, pos, -1);
        insertSpace = text[document.offsetAt(pos)] !== ' ';
    }
    if (insertSpace)
        vscode.commands.executeCommand('default:type', { text: ' ' });
}
exports.maybeSpace = maybeSpace;
//# sourceMappingURL=actions.js.map