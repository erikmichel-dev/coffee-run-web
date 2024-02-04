import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, throwError } from 'rxjs';
import { Coffee } from '../models/coffee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  private _baseUrl: string = environment.apiEndpoint;

  constructor(
    private _http: HttpClient
  ) { }

  resolveUrl(uri: string | undefined): string | undefined {
    if (!uri) {
      return void 0;
    }

    return `${this._baseUrl}${uri}`
  }

  getItem<T>(uri: string | undefined): Observable<T> {
    const url = this.resolveUrl(uri);
    let headers = new HttpHeaders().set('x-api-key', environment.apiKey)

    if (!url) {
      return throwError('getItem: URI not set');
    }

    return this._http.get<Coffee>(url, { headers: headers }).pipe(map(res => <T>res));
  }
}
