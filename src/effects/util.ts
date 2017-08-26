import { Action, Store } from '../store';
export function toPayload(action: Action) {
  return action.payload;
}
