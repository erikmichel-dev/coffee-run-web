import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend.service';
import { Coffee } from 'src/app/shared/models/coffee';
import { BehaviorSubject, Observable, map, tap, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrewerService {
  public brewedCoffee$: Observable<Coffee | null>;
  public fakeLoading$: Observable<boolean | null>;
  public isLoading$: Observable<boolean | null>;
  private readonly _brewedCoffee = new BehaviorSubject<Coffee | null>(null);
  private readonly _isLoading = new BehaviorSubject<boolean | null>(false);
  private readonly _fakeLoading = new BehaviorSubject<boolean | null>(false);

  constructor(private _backend: BackendService) {
    this.brewedCoffee$ = this._brewedCoffee.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
    this.fakeLoading$ = this._fakeLoading.asObservable();
  }

  getCoffeeCard(): void {
    this.reset();
    this.startLoading();
    
    this._backend.getItem('/daily-coffee')
      .pipe(map(item => item as Coffee))
      .subscribe(coffee => {
        this._brewedCoffee.next(coffee);
      });

      combineLatest([this.brewedCoffee$, this.fakeLoading$])
        .subscribe(([brewedCoffee, fakeLoading]) => {
        if (brewedCoffee && !fakeLoading) {
            this._isLoading.next(false);
        }
    });
  }

  startLoading(): void {
    this._isLoading.next(true);
    this._fakeLoading.next(true);
    setTimeout(() => {this._fakeLoading.next(false)}, 2000);
  }

  reset(): void {
    this._brewedCoffee.next(null);
    this._fakeLoading.next(false);
  }
}