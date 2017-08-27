import { Observable } from 'rxjs';  // https://github.com/redux-observable/redux-observable/issues/78

export * from './node-rx';
export { Action, nextState, toAction, Store, State } from './store';
export { Actions, Effect, toPayload } from './effects';
