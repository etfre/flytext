import * as vscode from 'vscode';

export const motionMap = {
    'w': 'up',
    'd': 'right',
    's': 'down',
    'a': 'left',
    'f': 'wrappedLineFirstNonWhitespaceCharacter',
    'l': 'wrappedLineLastNonWhitespaceCharacter',
    'z': 'wrappedLineStart',
    'e': 'wrappedLineEnd',
}

export function nextPos(document: vscode.TextDocument, position: vscode.Position, increment: number) {
    let line = document.lineAt(position.line);
    const endOfLine = increment === -1 && position.character <= 0 || increment === 1 && position.character >= line.range.end.character;
    if (!endOfLine) return position.translate(0, increment);
    let nextLineNum = position.line + increment;
    if (nextLineNum < 0 || nextLineNum >= document.lineCount) return null;
    let nextLine = document.lineAt(nextLineNum);
    let lineChar = increment === 1 ? 0 : nextLine.range.end.character;
    return new vscode.Position(nextLineNum, lineChar);
}