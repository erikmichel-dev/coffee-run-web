import { Injectable } from '@angular/core';
import { BackendService } from '../shared/services/backend.service';
import { Coffee, CoffeeWrapper } from '../shared/models/coffee';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public brewedCoffee$: Observable<Coffee | null>;
  private readonly _brewedCoffee = new BehaviorSubject<Coffee | null>(null);

  constructor(private _backend: BackendService) {
    this.brewedCoffee$ = this._brewedCoffee.asObservable();
  }

  getCoffee(): void {
    this._backend.getItem('/daily-coffee')
      .pipe(map(item => item as Coffee), tap(r => console.log(r)))
      .subscribe(coffee => this._brewedCoffee.next(coffee));
  }

  reset(): void {
    this._brewedCoffee.next(null);
  }
}