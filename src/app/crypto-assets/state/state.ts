import { CurrencyAsset } from 'src/app/models/currencyAsset.model';

export interface AssetsState {
  assets: CurrencyAsset[];
  loading: boolean;
}

export const initialState: AssetsState = {
  assets: [],
  loading: false,
};
