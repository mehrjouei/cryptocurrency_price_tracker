import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptoAssetsRoutingModule } from './cryptoAssets-routing.module';
import { ListComponent } from './list/list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { assetsFeature } from './state/reducers';
import { AssetsEffects } from './state/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    CryptoAssetsRoutingModule,
    StoreModule.forFeature(assetsFeature),
    EffectsModule.forFeature([AssetsEffects]),
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CryptoAssetsModule {}
