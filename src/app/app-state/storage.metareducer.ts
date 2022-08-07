import { ActionReducer, Action } from '@ngrx/store';

function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(localStorageKey: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey) as string);
}

const stateKeys = ['favourites'];
const localStorageKey = '__app_storage__';

export function storageMetaReducer<S, A extends Action = Action>(
  reducer: ActionReducer<S, A>
) {
  let onInit = true;
  return function (state: S, action: A): S {
    const nextState: any = reducer(state, action);
    if (onInit) {
      onInit = false;
      const savedState = getSavedState(localStorageKey);
      return { ...nextState, ...savedState };
    }
    const stateToSave: any = {};
    stateKeys.forEach((key) => {
      stateToSave[key] = nextState[key];
    });
    setSavedState(stateToSave, localStorageKey);
    return nextState;
  };
}
