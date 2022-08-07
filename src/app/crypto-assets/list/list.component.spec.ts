import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CurrencyAsset } from 'src/app/models/currencyAsset.model';
import { selectCryptoAssets } from '../state/selectors';
import { mockAsset } from '../state/test.mocks';
import { addToFavourites } from 'src/app/app-state/favourites/actions';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: MockStore;
  const mockData: CurrencyAsset[] = [
    mockAsset,
    {
      asset_id: 'ADA',
      name: 'ADA',
      type_is_crypto: 1,
    },
  ];
  const initialState = { assets: mockData };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectCryptoAssets,
              value: mockData,
            },
          ],
        }),
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show cryptocurrencies list', () => {
    const fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('ul.currencies-list li').length).toEqual(2)
  });
  it('should add favourity item', () => {
    fixture.detectChanges();
    fixture.nativeElement.querySelector('ul li:first-child').click();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(
      addToFavourites({ asset: mockAsset })
    );
  });
});
