import * as vscode from 'vscode';

export const DIRECTION = 'direction';

export const actionMap = {
    DIRECTION: moveDirection
}

export function perform(state) {
    actionMap[state.action](...state.args)
}

export function moveDirection() {
    
}