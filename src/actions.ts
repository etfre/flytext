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
    let editor = vscode.window.activeTextEditor;
    let document = editor.document;
    let seenCount = 0;
    let text = document.getText();
    let position = editor.selection.active;
    if (state.args.increment === -1) position = navigation.nextPos(document, text, position, state.args.increment)
    let prevPos = position;
    while (position !== null && seenCount < state.count) {
        prevPos = position;
        let char = text[document.offsetAt(position)];
        if (char === state.args.char) seenCount++;
        position = navigation.nextPos(document, text, position, state.args.increment);
    }
    if (state.args.offsetBy1) prevPos = prevPos.translate(0, 1);
    const anchor = state.args.select ? editor.selection.anchor : prevPos;
    editor.selections = [new vscode.Selection(anchor, prevPos)]
    let x = 4;
}