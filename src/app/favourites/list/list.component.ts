import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import {
  removeFromFavourites,
  updateFavourityPrice,
} from 'src/app/app-state/favourites/actions';
import {
  selectFavourites,
  selectFavouritesKeyFilters,
} from 'src/app/app-state/favourites/selectors';
import { AppState } from 'src/app/models/AppState.model';
import { FavouiteAsset } from 'src/app/models/currencyAsset.model';
import { Xchange } from 'src/app/models/exchange.model';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  list$ = this.store.select(selectFavourites);
  filters$ = this.store.select(selectFavouritesKeyFilters);
  filterSub!: Subscription;
  constructor(
    private store: Store<AppState>,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.checkSocketFilterChange();
  }

  remove(item: FavouiteAsset) {
    this.store.dispatch(removeFromFavourites({ asset: item }));
  }
  connect(){
    this.websocketService.connect().subscribe((xChange: Xchange) => {
      this.store.dispatch(updateFavourityPrice({ xChange }));
    });
  }
  checkSocketFilterChange() {
    this.filterSub = this.filters$.subscribe((filters) => {
      if (filters && filters.length > 0) {
        this.connect();
        this.websocketService.send({
          type: 'hello',
          apikey: environment.apiKey,
          heartbeat: false,
          subscribe_data_type: ['exrate'],
          subscribe_filter_asset_id: filters,
          subscribe_update_limit_ms_quote: 5000,
        });
      }
      else{
        this.websocketService.closeConnection();
      }
    });
  }
  ngOnDestroy(): void {
    this.websocketService.closeConnection();
    this.filterSub?.unsubscribe();
  }
}
