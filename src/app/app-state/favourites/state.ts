import { FavouiteAsset } from 'src/app/models/currencyAsset.model';

export interface FavouritesState {
  list: FavouiteAsset[];
  filters:String[]
}

export const initialState: FavouritesState = {
  list: [],
  filters:[]
};
