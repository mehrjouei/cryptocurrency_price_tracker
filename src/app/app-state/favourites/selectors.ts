import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/models/AppState.model';
import { environment } from 'src/environments/environment';
import { FavouritesState } from './state';

export const selectFavourites = createSelector(
  (state: AppState) => state.favourites,
  (state: FavouritesState) => state.list
);

export const selectFavouritesKeyFilters = createSelector(
  (state: AppState) => state.favourites,
  (state: FavouritesState): String[] => state.filters
);
