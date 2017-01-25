import * as vscode from 'vscode';
import * as actions from '../src/actions';
import * as navigation from '../src/navigation';

export class InputState {

    count: number;
    action: string;
    text: string;
    pos: number;
    args: any;

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
        return ch        
    }

    peek() {
        return this.pos >= this.text.length ? null : this.text[this.pos];
    }

    readWhile(predicate) {
        let readVal: string = '';
        let ch: string = this.peek();
        while (ch !== null && predicate(ch)) {
            this.next();
            readVal += ch;
            ch = this.peek();
        }
        return readVal;
    }

    readCount() {
        this.count = parseInt(this.readWhile((ch) => !isNaN(ch)))
        if (isNaN(this.count)) this.count = 1;
    }

    readAction() {
        const ch = this.next();
        this.action = {
            'd': actions.DIRECTION,
            'f': actions.FIND,
        }[ch];
    }

    readArgs() {
        let selectCh;
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
        }
    }

    reset() {
        this.text = ''
        this.pos = 0
        this.count = null;
        this.action = null;
        this.args = {};
    }

}