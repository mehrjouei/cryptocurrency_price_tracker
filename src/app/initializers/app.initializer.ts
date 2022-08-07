import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectFavourites } from '../app-state/favourites/selectors';
import { AppState } from '../models/AppState.model';

export function AppInitializerFactory(store: Store<AppState>, router: Router) {
  return () =>
    new Promise<any>((resolve: any) => {
      store
        .select(selectFavourites)
        .pipe(take(1))
        .subscribe((favourites) => {
          if (favourites && favourites.length) {
            router.navigate(['/favourites']);
          } else {
            router.navigate(['/cryptocurrencies']);
          }
          resolve(true);
        });
    });
}
