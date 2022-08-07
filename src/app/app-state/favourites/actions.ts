import { createAction, props } from '@ngrx/store';
import { FavouiteAsset } from 'src/app/models/currencyAsset.model';
import { Xchange } from 'src/app/models/exchange.model';

export const addToFavourites = createAction(
  '[Favourites] add to favourites',
  props<{ asset: FavouiteAsset }>()
);
export const removeFromFavourites = createAction(
  '[Favourites] remove from favourites',
  props<{ asset: FavouiteAsset }>()
);

export const updateFavourityPrice = createAction(
  '[Favourites] update favourity price',
  props<{ xChange: Xchange }>()
);

