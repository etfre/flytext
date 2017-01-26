import * as vscode from 'vscode';
import * as navigation from '../src/navigation';

export const DIRECTION = 'direction';
export const FIND = 'find';

const actionMap = {}
actionMap[DIRECTION] = moveDirection
actionMap[FIND] = findCharacter

export function perform(state) {
    actionMap[state.action](state)
}

export function moveDirection(state) {
    // vscode.window.activeTextEditor.selection[0] 
    const args = {to: state.args.motion, select: state.args.select, value: state.count}
    vscode.commands.executeCommand('cursorMove', args);
}

export function findCharacter(state) {
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    let seenCount = 0;
    const text = document.getText();
    let nextPos = editor.selection.active;
    if (state.args.increment === -1) nextPos = navigation.nextPos(document, nextPos, state.args.increment)
    let position = nextPos;
    while (nextPos !== null && seenCount < state.count) {
        position = nextPos;
        let char = text[document.offsetAt(nextPos)];
        if (char === state.args.char) seenCount++;
        nextPos = navigation.nextPos(document, nextPos, state.args.increment);
    }
    if (state.args.offsetBy1) position = position.translate(0, 1);
    const anchor = state.args.select ? editor.selection.anchor : position;
    editor.selections = [new vscode.Selection(anchor, position)]
}