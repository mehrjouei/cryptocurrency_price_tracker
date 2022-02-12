export interface CurrencyAsset {
  asset_id: string;
  name: string;
  type_is_crypto: 1 | 0;
}
export interface FavouiteAsset extends CurrencyAsset {
  price?: number;
}
