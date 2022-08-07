import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    FavouritesRoutingModule
  ]
})
export class FavouritesModule { }
