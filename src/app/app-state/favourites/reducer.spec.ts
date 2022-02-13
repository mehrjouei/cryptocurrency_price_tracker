import { FavouiteAsset } from 'src/app/models/currencyAsset.model';
import {
  addToFavourites,
  removeFromFavourites,
  updateFavourityPrice,
} from './actions';
import * as fromReducer from './reducers';
import * as fromState from './state';
import { exchangeMock, mockAsset } from './test.mocks';
describe('favourities Reducer', () => {

  it('should return Default state', () => {
    const { initialState } = fromState;
    const action = {
      type: 'unknow',
    };
    const state = fromReducer.favouritesReducer(initialState, action);
    expect(state).toBe(initialState);
  });
  it('should add to Favourites', () => {
    const { initialState } = fromState;
    const action = addToFavourites({ asset: mockAsset });
    const state = fromReducer.favouritesReducer(initialState, action);
    expect(state.list).toEqual([mockAsset]);
  });
  it('should remove from Favourites', () => {
    const { initialState } = fromState;
    const action = addToFavourites({ asset: mockAsset });
    let state = fromReducer.favouritesReducer(initialState, action);
    const removeAction = removeFromFavourites({ asset: mockAsset });
    state = fromReducer.favouritesReducer(state, removeAction);
    expect(state).toEqual(initialState);
  });
  it('should update Favourites price', () => {
    const { initialState } = fromState;
    const action = addToFavourites({ asset: mockAsset });
    let state = fromReducer.favouritesReducer(initialState, action);
    const updateAction = updateFavourityPrice({ xChange: exchangeMock });
    state = fromReducer.favouritesReducer(state, updateAction);
    expect(state.list[0].price).toEqual(exchangeMock.rate);
  });
});
