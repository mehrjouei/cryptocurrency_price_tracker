import { CurrencyAsset } from 'src/app/models/currencyAsset.model';
import {
  getAssets,getAssetsSuccess
} from './actions';
import * as fromReducer from './reducers';
import * as fromState from './state';
describe('cryptoCurrencies Reducer', () => {
  const mockAsset: CurrencyAsset = {
    asset_id: 'BTC',
    name: 'BTC',
    type_is_crypto: 1,
  };

  it('should return Default state', () => {
    const { initialState } = fromState;
    const action = {
      type: 'unknow',
    };
    const state = fromReducer.assetsFeature.reducer(initialState, action);
    expect(state).toBe(initialState);
  });
  it('should change loading to true on getting state', () => {
    const { initialState } = fromState;
    const action = getAssets();
    const state = fromReducer.assetsFeature.reducer(initialState, action);
    expect(state.loading).toBeTrue();
  });
  it('should set assets to state', () => {
    const { initialState } = fromState;
    const action = getAssetsSuccess({assets:[mockAsset]});
    const state = fromReducer.assetsFeature.reducer(initialState, action);
    expect(state.assets).toEqual([mockAsset]);
  });
});
