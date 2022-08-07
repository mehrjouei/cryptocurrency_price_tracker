import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/models/AppState.model';
import { CurrencyAsset, FavouiteAsset } from 'src/app/models/currencyAsset.model';
import { AssetsState } from './state';

const getAssetsState = createFeatureSelector<AssetsState>('crypto-assets');


export const selectCryptoAssets = createSelector(
  getAssetsState,
  (state: AppState) => state.favourites.list,
  (assets: AssetsState, favourites: CurrencyAsset[]) => {
    return assets.assets.map((asset) => ({
      ...asset,
      isSelected: !!favourites.find((f) => f.asset_id == asset.asset_id),
    }));
  }
);
export const selectCryptoAssetsLoading = createSelector(
  getAssetsState,
  (state: AssetsState) => state.loading
);
export const selectCryptoAssetsByName = createSelector(
  getAssetsState,
  (state: AppState) => state.favourites.list,
  (assets: AssetsState, favourites: FavouiteAsset[], props: { term: string }) => {
    return assets.assets
      .filter((a) => a.name.toUpperCase().includes(props.term.toUpperCase()))
      .map((asset) => ({
        ...asset,
        isSelected: !!favourites.find((f) => f.asset_id == asset.asset_id),
      }));
  }
);
