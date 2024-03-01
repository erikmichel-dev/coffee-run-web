import { Component } from '@angular/core';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { BackendService } from 'src/app/shared/services/backend.service';
import { BrewerService } from './resources/services/brewer.service';
import { Coffee } from 'src/app/shared/models/coffee';


@Component({
  selector: 'app-brewer',
  templateUrl: './brewer.component.html',
  styleUrls: ['./brewer.component.css']
})
export class BrewerComponent {
  public brewedCoffee$: Observable<Coffee | null>;
  public isLoading$: Observable<boolean | null>;
  private _unsubscribe = new Subject<void>();

  constructor(private _brewerService: BrewerService) {
    this.brewedCoffee$ = this._brewerService.brewedCoffee$;
    this.isLoading$ = this._brewerService.isLoading$;
  }

  ngOnInit(): void {
    this.brewedCoffee$.pipe(takeUntil(this._unsubscribe)).subscribe()
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  getCoffeeCard(): void {
    this._brewerService.getCoffeeCard();
  }
}
