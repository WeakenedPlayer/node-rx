import { Observable } from 'rxjs';  // https://github.com/redux-observable/redux-observable/issues/78

export * from './src/node-rx';
export { Action, nextState, toAction } from './src/store';
export { Actions, Effect, toPayload } from './src/effects';