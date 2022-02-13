import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MetaReducer, Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { favouritesReducer } from './app-state/favourites/reducers';
import { storageMetaReducer } from './app-state/storage.metareducer';
import { AppInitializerFactory } from './initializers/app.initializer';
import { Router } from '@angular/router';

export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        favourites: favouritesReducer,
      },
      {
        metaReducers: metaReducers,
      }
    ),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializerFactory,
      deps: [Store,Router],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
