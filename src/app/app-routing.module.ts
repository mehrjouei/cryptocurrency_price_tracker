import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cryptocurrencies',
    loadChildren: () =>
      import('./crypto-assets/cryptoAssets.module').then(
        (m) => m.CryptoAssetsModule
      ),
  },
  {
    path: 'favourites',
    loadChildren: () =>
      import('./favourites/favourites.module').then((m) => m.FavouritesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
