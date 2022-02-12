import { AppState } from 'src/app/models/AppState.model';
import { CurrencyAsset } from 'src/app/models/currencyAsset.model';

export interface Assets {
  assets: CurrencyAsset[];
  loading: boolean;
}

export const initialState: Assets = {
  assets: [],
  loading: false,
};

export interface State extends AppState {
  'crypto-assets': Assets;
}
