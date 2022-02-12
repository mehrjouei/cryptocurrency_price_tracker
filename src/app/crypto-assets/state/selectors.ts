import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/models/AppState.model';
import { CurrencyAsset, FavouiteAsset } from 'src/app/models/currencyAsset.model';
import { Assets } from './state';

const getAssetsState = createFeatureSelector<Assets>('crypto-assets');

export const selectCryptoAssets = createSelector(
  getAssetsState,
  (state: Assets) => state.assets
);
export const selectCryptoAssetsWithFavouritySelectFlag = createSelector(
  getAssetsState,
  (state: AppState) => state.favourites.list,
  (assets: Assets, favourites: CurrencyAsset[]) => {
    return assets.assets.map((asset) => ({
      ...asset,
      isSelected: !!favourites.find((f) => f.asset_id == asset.asset_id),
    }));
  }
);
export const selectCryptoAssetsLoading = createSelector(
  getAssetsState,
  (state: Assets) => state.loading
);
export const selectCryptoAssetsByName = createSelector(
  getAssetsState,
  (state: Assets, props: { term: string }) =>
    state.assets.filter((a) =>
      a.name.toUpperCase().includes(props.term.toUpperCase())
    )
);
export const selectCryptoAssetsWithFavouritySelectFlagByName = createSelector(
  getAssetsState,
  (state: AppState) => state.favourites.list,
  (assets: Assets, favourites: FavouiteAsset[], props: { term: string }) => {
    return assets.assets
      .filter((a) => a.name.toUpperCase().includes(props.term.toUpperCase()))
      .map((asset) => ({
        ...asset,
        isSelected: !!favourites.find((f) => f.asset_id == asset.asset_id),
      }));
  }
);
