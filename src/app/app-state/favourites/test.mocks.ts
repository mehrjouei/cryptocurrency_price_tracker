import { FavouiteAsset } from "src/app/models/currencyAsset.model";
import { Xchange } from "src/app/models/exchange.model";

export const mockAsset: FavouiteAsset = {
  asset_id: 'BTC',
  name: 'BTC',
  type_is_crypto: 1,
  price: 0,
};
export const exchangeMock:Xchange = {
  asset_id_base: 'BTC',
  asset_id_quote: 'USD',
  rate: 123,
  type: 'xChange',
};
export const filterMock="BTC/USD";
