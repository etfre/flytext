"use strict";
const vscode = require("vscode");
exports.motionMap = {
    'w': 'up',
    'd': 'right',
    's': 'down',
    'a': 'left',
};
function nextPos(document, position, increment) {
    let line = document.lineAt(position.line);
    const endOfLine = increment === -1 && position.character <= 0 || increment === 1 && position.character >= line.range.end.character;
    if (!endOfLine)
        return position.translate(0, increment);
    let nextLineNum = position.line + increment;
    if (nextLineNum < 0 || nextLineNum >= document.lineCount)
        return null;
    let nextLine = document.lineAt(nextLineNum);
    let lineChar = increment === 1 ? 0 : nextLine.range.end.character;
    return new vscode.Position(nextLineNum, lineChar);
}
exports.nextPos = nextPos;
//# sourceMappingURL=navigation.js.map