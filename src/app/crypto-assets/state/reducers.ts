import { createFeature, createReducer, on } from '@ngrx/store';
import { getAssets, getAssetsSuccess } from './actions';
import { initialState } from './state';

export const assetsFeature = createFeature({
  name: 'crypto-assets',
  reducer: createReducer(
    initialState,
    on(getAssets, (state) => ({
      ...state,
      loading: true,
    })),
    on(getAssetsSuccess, (state, payload) => ({
      assets: [...payload.assets],
      loading: false,
    }))
  ),
});
