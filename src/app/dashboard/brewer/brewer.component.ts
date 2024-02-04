import { Component } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { BackendService } from 'src/app/shared/services/backend.service';
import { DashboardService } from '../dashboard.service';
import { Coffee } from 'src/app/shared/models/coffee';


@Component({
  selector: 'app-brewer',
  templateUrl: './brewer.component.html',
  styleUrls: ['./brewer.component.css']
})
export class BrewerComponent {
  public brewedCoffee$: Observable<Coffee | null>;
  private _unsubscribe = new Subject<void>();

  constructor(private _dashboardService: DashboardService) {
    this.brewedCoffee$ = this._dashboardService.brewedCoffee$;
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  getCoffee(): void {
    this._dashboardService.getCoffee();
  }
}
