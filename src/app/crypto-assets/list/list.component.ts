import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAssets } from '../state/actions';
import { debounceTime, switchMap } from 'rxjs';
import {
  selectCryptoAssetsLoading,
  selectCryptoAssets,
  selectCryptoAssetsByName,
} from '../state/selectors';
import { FormControl } from '@angular/forms';
import { CurrencyAsset } from 'src/app/models/currencyAsset.model';
import {
  addToFavourites,
  removeFromFavourites,
} from 'src/app/app-state/favourites/actions';
import { State } from '../state/state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  list$ = this.store.select(selectCryptoAssets);
  loading$ = this.store.select(selectCryptoAssetsLoading);
  searchInput = new FormControl('');
  constructor(private store: Store<State>) {}
  ngOnInit(): void {
    this.store.dispatch(getAssets());
    this.searchInput.valueChanges
      .pipe(
        debounceTime(200),
        switchMap(
          (term) =>
            (this.list$ = this.store.select(
              selectCryptoAssetsByName,
              {
                term,
              }
            ))
        )
      )
      .subscribe();
  }
  toggleFavourity(asset: CurrencyAsset & { isSelected: boolean }) {
    if (asset.isSelected) {
      this.store.dispatch(removeFromFavourites({ asset }));
    } else {
      asset.asset_id = asset.asset_id;
      this.store.dispatch(addToFavourites({ asset }));
    }
  }
}
