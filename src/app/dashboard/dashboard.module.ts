import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BrewerComponent } from './brew-hub/brewer/brewer.component';
import { DetailsComponent } from './brew-hub/details/details.component';
import { CoffeeCardComponent } from './brew-hub/brewer/coffee-card/coffee-card.component';
import { BrewHubComponent } from './brew-hub/brew-hub.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BrewerComponent,
    DetailsComponent,
    CoffeeCardComponent,
    BrewHubComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
