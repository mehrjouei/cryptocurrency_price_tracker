import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AssetsState } from './state';

const getAssetsState = createFeatureSelector<AssetsState>('crypto-assets');

export const selectCryptoAssets = createSelector(
  getAssetsState,
  (state: AssetsState) => state.assets
);
export const selectCryptoAssetsLoading = createSelector(
  getAssetsState,
  (state: AssetsState) => state.loading
);
export const selectCryptoAssetsByName = createSelector(
  getAssetsState,
  (state: AssetsState, props: { term: string }) =>
    state.assets.filter((a) =>
      a.name.toUpperCase().includes(props.term.toUpperCase())
    )
);
