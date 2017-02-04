"use strict";
const vscode = require("vscode");
const actions = require("../src/actions");
const navigation = require("../src/navigation");
class InputState {
    constructor() {
        this.reset();
    }
    resolve() {
        this.readCount();
        this.readAction();
        this.readArgs();
    }
    next() {
        let ch = this.pos >= this.text.length ? null : this.text[this.pos];
        this.pos++;
        return ch;
    }
    peek() {
        return this.pos >= this.text.length ? null : this.text[this.pos];
    }
    readWhile(predicate) {
        let readVal = '';
        let ch = this.peek();
        while (ch !== null && predicate(ch)) {
            this.next();
            readVal += ch;
            ch = this.peek();
        }
        return readVal;
    }
    readCount() {
        this.count = parseInt(this.readWhile((ch) => !isNaN(ch)));
        if (isNaN(this.count))
            this.count = 1;
    }
    readAction() {
        const ch = this.next();
        this.action = {
            'd': actions.DIRECTION,
            'f': actions.FIND,
            's': actions.MAYBE_SPACE,
        }[ch];
    }
    readArgs() {
        let selectCh;
        let ch;
        switch (this.action) {
            case actions.DIRECTION:
                this.args.motion = navigation.motionMap[this.next()];
                selectCh = this.next();
                this.args.select = selectCh === 's' || selectCh === 'c' && !vscode.window.activeTextEditor.selection.isEmpty;
                break;
            case actions.FIND:
                const searchChar = this.next();
                this.args.increment = searchChar === 't' || searchChar === 'f' ? 1 : -1;
                this.args.offsetBy1 = searchChar === 'T' || searchChar === 'f';
                this.args.char = this.next();
                selectCh = this.next();
                this.args.select = selectCh === 's' || selectCh === 'c' && !vscode.window.activeTextEditor.selection.isEmpty;
                break;
            case actions.MAYBE_SPACE:
                ch = this.next();
                this.args.ahead = ch === 'a';
                break;
        }
    }
    reset() {
        this.text = '';
        this.pos = 0;
        this.count = null;
        this.action = null;
        this.args = {};
    }
}
exports.InputState = InputState;
//# sourceMappingURL=inputstate.js.map