import * as vscode from 'vscode';

export const motionMap = {
    'w': 'up',
    'd': 'right',
    's': 'down',
    'a': 'left',
}

export function shiftOrMove() {
    var editor = vscode.window.activeTextEditor;
    var document = editor.document;
    editor.edit((editbuilder) => {
        editbuilder.insert(editor.selection.active, "hello daisy");
    });
    vscode.commands.executeCommand('moveLeft')
}

export function nextPos(document, text, position, increment) {
    let line = document.lineAt(position.line);
    const endOfLine = increment === -1 && position.character <= 0 || increment === 1 && position.character >= line.range.end.character;
    if (!endOfLine) return position.translate(0, increment);
    let nextLineNum = position.line + increment;
    if (nextLineNum < 0 || nextLineNum >= document.lineCount) return null;
    let nextLine = document.lineAt(nextLineNum);
    let lineChar = increment === 1 ? 0 : nextLine.range.end;
    return new vscode.Position(nextLineNum, lineChar);
}