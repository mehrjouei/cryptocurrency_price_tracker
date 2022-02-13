import * as fromSelector from './selectors';
import { filterMock, mockAsset } from './test.mocks';
describe('Favourites selector', () => {
  it('should select Favourites', () => {
    const result = fromSelector.selectFavourites.projector({
      list: [mockAsset],
    });
    expect(result).toEqual([mockAsset]);
  });
  it('should select filters', () => {
    const result = fromSelector.selectFavouritesKeyFilters.projector({
      filters: [filterMock],
    });
    expect(result).toEqual([filterMock]);
  });
});
