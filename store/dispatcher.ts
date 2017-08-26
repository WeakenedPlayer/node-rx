import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface Action {
    type: string;
    payload?: any;
}

export class Dispatcher extends BehaviorSubject<Action> {
    static INIT = '@node-rx/store/init';

    constructor() {
        // console.log( '[dispatcher] constructor ');
        super({ type: Dispatcher.INIT });
    }

    dispatch(action: Action): void {
        // console.log( '[dispatcher] dispatch ');
        this.next(action);
    }

    complete() {
        // noop
    }
}
