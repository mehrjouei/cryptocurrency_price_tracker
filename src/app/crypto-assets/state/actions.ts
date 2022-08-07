import { createAction, props } from '@ngrx/store';
import { CurrencyAsset } from 'src/app/models/currencyAsset.model';
export const getAssets = createAction(
  '[Assets] get assets'
);
export const getAssetsSuccess = createAction(
  '[Assets] get assets Success',
  props<{ assets: CurrencyAsset[] }>()
);
