import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FavouiteAsset } from 'src/app/models/currencyAsset.model';
import { selectFavourites } from 'src/app/app-state/favourites/selectors';
import { removeFromFavourites } from 'src/app/app-state/favourites/actions';
import { mockAsset } from 'src/app/app-state/favourites/test.mocks';

describe('Favourites List', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: MockStore;
  const mockData: FavouiteAsset[] = [
    mockAsset,
    {
      asset_id: 'ADA',
      name: 'ADA',
      type_is_crypto: 1,
      price: 1.06,
    },
  ];
  const initialState = { list: mockData };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectFavourites,
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

  it('should show favourites list', () => {
    const fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('ul li').length).toEqual(2)
  });

  it('should remove favourity item', () => {
    fixture.detectChanges();
    fixture.nativeElement.querySelector('ul li:first-child .remove').click();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(
      removeFromFavourites({ asset: mockAsset })
    );
  });
});
