import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BrewerComponent } from './brewer/brewer.component';
import { DetailsComponent } from './details/details.component';
import { CoffeeCardComponent } from './brewer/coffee-card/coffee-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BrewerComponent,
    DetailsComponent,
    CoffeeCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
