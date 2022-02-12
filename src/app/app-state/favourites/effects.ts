import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, filter } from 'rxjs/operators';
import { CoinapiService } from 'src/app/services/coinapi.service';
import { getFavouritesPricesSuccess, getFavouritesPrices } from './actions';

@Injectable()
export class favouritesEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFavouritesPrices),
      mergeMap(() =>
        this.coinapiService.getAssets().pipe(
          map((assets) =>
            getFavouritesPricesSuccess({
              assets: assets.filter((a) => a.type_is_crypto == 1),
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private coinapiService: CoinapiService
  ) {}
}
