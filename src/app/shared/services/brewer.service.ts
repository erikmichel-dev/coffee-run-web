import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Coffee } from '../models/coffee';
import { BehaviorSubject, Observable, map, tap, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrewerService {
  public brewedCoffee$: Observable<Coffee | null>;
  public collectedCardDeck$: Observable<Coffee[]>
  public isLoading$: Observable<boolean | null>;
  private readonly _brewedCoffee = new BehaviorSubject<Coffee | null>(null);
  private readonly _collectedCardDeck = new BehaviorSubject<Coffee[]>([]);
  private readonly _isLoading = new BehaviorSubject<boolean | null>(false);

  constructor(private _backend: BackendService) {
    this.brewedCoffee$ = this._brewedCoffee.asObservable();
    this.collectedCardDeck$ = this._collectedCardDeck.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
  }

  getCoffeeCard(): void {
    this.reset();
    this._isLoading.next(true);

    this._backend.getItem<Coffee>('/daily-coffee')
      .subscribe(coffee => {
        setTimeout(() => {
          this._brewedCoffee.next(coffee);
          this._isLoading.next(false);
          this._collectedCardDeck.next([...this._collectedCardDeck.getValue(), coffee]);
        }, 1800)
      });
  }

  reset(): void {
    this._brewedCoffee.next(null);
  }
}