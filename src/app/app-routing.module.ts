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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
