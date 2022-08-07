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
    return this.httpCient.get<CurrencyAsset[]>(`${this.baseUrl}assets`);
  }

}
