import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { createReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import {
  addToFavourites,
  removeFromFavourites,
  updateFavourityPrice,
} from './actions';
import { initialState } from './state';
export const favouritesReducer = createReducer(
  initialState,
  on(addToFavourites, (state, payload) => ({
    list: [...state.list, { ...payload.asset, price: 0 }],
    filters: [
      ...state.filters,
      payload.asset.asset_id + '/' + environment.base_currency,
    ],
  })),
  on(removeFromFavourites, (state, payload) => ({
    list: state.list.filter((item) => item.asset_id != payload.asset.asset_id),
    filters: state.filters.filter(
      (item) => item != payload.asset.asset_id + '/' + environment.base_currency
    ),
  })),
  on(updateFavourityPrice, (state, payload) => {
    const list = [...state.list];
    let targetItemIndex = list.findIndex(
      (item) => item.asset_id == payload.xChange.asset_id_base
    );
    if (targetItemIndex > -1) {
      list[targetItemIndex] = {
        ...list[targetItemIndex],
        price: payload.xChange.rate,
      };
    }
    return {
      ...state,
      list: [...list],
    };
  })
);
