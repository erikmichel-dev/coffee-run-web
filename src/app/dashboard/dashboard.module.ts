import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BrewerComponent } from './brew-hub/brewer/brewer.component';
import { DetailsComponent } from './brew-hub/details/details.component';
import { CoffeeCardComponent } from './shared/coffee-card/coffee-card.component';
import { BrewHubComponent } from './brew-hub/brew-hub.component';
import { DeckComponent } from './deck/deck.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BrewerComponent,
    DetailsComponent,
    CoffeeCardComponent,
    BrewHubComponent,
    DeckComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
