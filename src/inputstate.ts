import * as actions from '../src/actions';
import * as navigation from '../src/actions';

export class InputState {

    count: number;
    action: string;
    text: string;
    pos: number;
    args: Object;

    constructor() {
        this.reset();
    }

    resolve() {
        this.readCount();
        this.readAction();
    }

    next() {
        this.pos++; 
        return this.pos >= this.text.length ? null : this.text[this.pos];
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
        if (isNaN(this.count)) this.count = null;
    }

    readAction() {
        const ch = this.next();
        this.action = {
            'd': actions.DIRECTION
        }[ch];
    }

    reset() {
        this.text = ''
        this.pos = 0
        this.count = null;
        this.action = null;
        this.args = {}
    }

}