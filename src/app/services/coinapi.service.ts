import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrencyAsset } from '../models/currencyAsset.model';

@Injectable({
  providedIn: 'root',
})
export class CoinapiService {
  baseUrl = environment.apiUrl;
  constructor(private httpCient: HttpClient) {}
  getAssets(): Observable<CurrencyAsset[]> {
    return of([
      {
        asset_id:'BTC',
        name:'BTC',
        type_is_crypto:1
      },
      {
        asset_id:'GRC',
        name:'GRC',
        type_is_crypto:1
      },
      {
        asset_id:'XPM',
        name:'XPM',
        type_is_crypto:1
      },
      {
        asset_id:'XRP',
        name:'XRP',
        type_is_crypto:1
      },
    ]);
    return this.httpCient.get<CurrencyAsset[]>(`${this.baseUrl}assets`);
  }
}
