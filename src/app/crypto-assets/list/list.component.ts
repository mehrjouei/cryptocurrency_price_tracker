import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAssets } from '../state/actions';
import { debounceTime, switchMap, tap } from 'rxjs';
import { AssetsState } from '../state/state';
import {
  selectCryptoAssets,
  selectCryptoAssetsByName,
  selectCryptoAssetsLoading,
} from '../state/selectors';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  list$ = this.store.select(selectCryptoAssets);
  loading$ = this.store.select(selectCryptoAssetsLoading);
  searchInput = new FormControl('');
  constructor(private store: Store<AssetsState>) {}
  ngOnInit(): void {
    this.store.dispatch(getAssets());
    this.searchInput.valueChanges
      .pipe(
        debounceTime(200),
        switchMap(
          (term) =>
            (this.list$ = this.store.select(selectCryptoAssetsByName, {
              term,
            }))
        )
      )
      .subscribe();
  }
}
