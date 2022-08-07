import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { CoinapiService } from 'src/app/services/coinapi.service';
import { AssetsEffects } from './effects';
import { AssetsState } from './state';
import { TestScheduler } from 'rxjs/testing';
import { getAssets, getAssetsSuccess } from './actions';
import { CurrencyAsset } from 'src/app/models/currencyAsset.model';
import { mockAsset } from './test.mocks';

describe('favourites', () => {
  const initialState: AssetsState = {
    assets: [],
    loading: false,
  };
  const coinApiService = jasmine.createSpyObj('coinApiService', ['getAssets']);
  let effects: AssetsEffects;
  let actions: Observable<any>;
  let store: MockStore<AssetsState>;
  let testScheduler:TestScheduler;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AssetsEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        {
          provide: CoinapiService,
          useValue: coinApiService,
        },
      ],
    });
    effects = TestBed.inject(AssetsEffects);
    store = TestBed.inject(MockStore);
    store.setState({ assets: [], loading: false });
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should get Assets', () => {
    const assets: CurrencyAsset[] = [mockAsset];
    const action = getAssets();
    const outCome = getAssetsSuccess({ assets });
    testScheduler.run(({hot,cold,expectObservable})=>{
        actions = hot('-a',{a:action});
        const response = cold('-b|',{b:assets});
        coinApiService.getAssets.and.returnValue(response);
        expectObservable(effects.loadAssets$).toBe('--b',{b:outCome});
    })
  });
});
